import React from "react";
import {
  Message,
  Container,
  Header,
  Input,
  Button,
  Form
} from "semantic-ui-react";
import gql from "graphql-tag";
import { Mutation, graphql } from "react-apollo";

// const registerMutation = gql`
//   mutation RegisterUser(
//     $username: String!
//     $email: String!
//     $password: String!
//   ) {
//     register(username: $username, email: $email, password: $password)
//   }
// `;

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

class Register extends React.Component {
  state = {
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: ""
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  //   username: beardwind
  //   password: higekaze

  onSubmit = async () => {
    this.setState({
      usernameError: "",
      passwordError: "",
      emailError: ""
    });
    const { username, email, password } = this.state;
    const errObj = {};
    const response = await this.props.mutate({
      variables: { username, email, password }
    });
    //get ok and errors from response.data.register
    const { ok, errors } = response.data.register;
    if (ok) {
      //alert success message and redirect
      alert("registration successful (insert kiss face emoji here");
      this.props.history.push("/");
    } else {
      errors.forEach(({ path, message }) => {
        errObj[`${path}Error`] = message;
      });
    }
    this.setState(errObj);
  };

  //   render() {
  //     const { username, email, password } = this.state;

  //     return (
  //       <Mutation mutation={registerMutation} variables={this.state}>
  //         {RegisterUser => (
  //           <Container>
  //             <Header as="h2">Register</Header>
  //             <Input
  //               name="username"
  //               onChange={this.onChange}
  //               value={username}
  //               placeholder="Username"
  //               fluid
  //             />
  //             <Input
  //               name="email"
  //               onChange={this.onChange}
  //               value={email}
  //               placeholder="Email"
  //               fluid
  //             />
  //             <Input
  //               name="password"
  //               onChange={this.onChange}
  //               value={password}
  //               placeholder="Password"
  //               type="Password"
  //               fluid
  //             />
  //             <Button onClick={RegisterUser}>Submit</Button>
  //           </Container>
  //         )}
  //       </Mutation>
  //     );
  //   }
  // }

  render() {
    const {
      username,
      email,
      password,
      usernameError,
      passwordError,
      emailError
    } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container>
        <Header as="h2">Register</Header>
        <Form>
          <Form.Field error={!!usernameError}>
            <Input
              error={!!usernameError}
              name="username"
              onChange={this.onChange}
              value={username}
              placeholder="Username"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!emailError}>
            <Input
              error={!!emailError}
              name="email"
              onChange={this.onChange}
              value={email}
              placeholder="Email"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input
              error={!!passwordError}
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
          <Message error header="Registration failed" list={errorList} />
        ) : null}
      </Container>
    );
  }
}

// export default Register;
export default graphql(registerMutation)(Register);
