import React from "react";
import { observer } from "mobx-react";
import { extendObservable } from "mobx";
import {
  Message,
  Container,
  Header,
  Input,
  Button,
  Form
} from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      errors: {}
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password }
    });
    const errObj = {};
    const { ok, token, refreshToken, errors } = response.data.login;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.props.history.push("/");
    } else {
      errors.forEach(({ path, message }) => {
        errObj[`${path}Error`] = message;
      });
    }
    this.errors = errObj;
  };

  render() {
    const { email, password, errors } = this;

    const errorList = [];

    if (errors.emailError) {
      errorList.push(errors.emailError);
    }
    if (errors.passwordError) {
      errorList.push(errors.passwordError);
    }

    return (
      <Container>
        <Header as="h2">Login</Header>
        <Form>
          <Form.Field error={!!errors.emailError}>
            <Input
              error={!!errors.emailError}
              name="email"
              onChange={this.onChange}
              value={email}
              placeholder="Email"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!errors.passwordError}>
            <Input
              error={!!errors.passwordError}
              name="password"
              onChange={this.onChange}
              value={password}
              placeholder="Password"
              type="Password"
              fluid
            />
          </Form.Field>

          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length > 0 ? (
          <Message error header="Login failed" list={errorList} />
        ) : null}
      </Container>
    );
  }
}

export default graphql(loginMutation)(observer(Login));
