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

const CreateTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

//createteam.js route
//only a name field
//create team mutation response and errors
//format errors file?
//check if user is logged in
//need to over-write the user:id:1 from the indexjs file with logged in person
//header middle ware from appollllooo to check token status

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      name: "",
      nameError: "",
      errors: {}
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = async () => {
    const { name } = this;
    let response = null;
    try {
      response = await this.props.mutate({
        variables: { name }
      });
    } catch (err) {
      alert("sorry, but you must be logged in to create a team");
      this.props.history.push("/login");
      return;
    }
    const errObj = {};
    const { ok, errors } = response.data.createTeam;

    if (ok) {
      alert("team created!");
      this.props.history.push("/");
    } else {
      errors.forEach(({ path, message }) => {
        errObj[`${path}Error`] = message;
      });
      console.log("err obj", errObj);
    }

    this.errors = errObj;
  };

  render() {
    const { name, errors } = this;

    const errorList = [];

    if (errors.nameError) {
      errorList.push(errors.nameError);
    }

    return (
      <Container>
        <Header as="h2">Create a Team</Header>
        <Form>
          <Form.Field error={!!errors.nameError}>
            <Input
              error={!!errors.passwordError}
              name="name"
              onChange={this.onChange}
              value={name}
              placeholder="Name"
              type="text"
              fluid
            />
          </Form.Field>

          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length > 0 ? (
          <Message error header="Creation failed" list={errorList} />
        ) : null}
      </Container>
    );
  }
}

export default graphql(CreateTeamMutation)(observer(CreateTeam));
