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
      team {
        id
      }
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

class CreateTeam1 extends React.Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      name: "",
      nameError: "",
      errors: {}
    });
  }

  onSubmit = async () => {
    console.log("what is this", this);
    debugger;
    const { name } = this;
    let response = null;
    try {
      response = await this.props.mutate({
        variables: { name }
      });
      console.log("response of creation??", response);
    } catch (err) {
      console.log("errrrr of create", err);
      alert("sorry, but you must be logged in to create a team");
      this.props.history.push("/login");
      return;
    }
    const errObj = {};
    const { ok, errors } = response.data.createTeam;

    if (ok) {
      alert("team created!");
      this.props.history.push(`/view-team/${response.data.createTeam.team.id}`);
    } else {
      errors.forEach(({ path, message }) => {
        errObj[`${path}Error`] = message;
      });
      console.log("err obj", errObj);
    }

    this.errors = errObj;
  };

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
    console.log("what is this in the change", this);
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

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: "",
      errors: {}
    });
  }

  onSubmit = async () => {
    const { name } = this;
    let response = null;
    console.log("name?", name);

    try {
      response = await this.props.mutate({
        variables: { name }
      });
      console.log("response?");
    } catch (err) {
      console.log("errrr", err);
      this.props.history.push("/login");
      return;
    }

    console.log(response);

    const { ok, errors, team } = response.data.createTeam;

    if (ok) {
      this.props.history.push(`view-team/${team.id}`);
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const {
      name,
      errors: { nameError }
    } = this;

    const errorList = [];

    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <Container text>
        <Header as="h2">Create a team</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input
              name="name"
              onChange={this.onChange}
              value={name}
              placeholder="Name"
              fluid
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

// export default graphql(CreateTeamMutation)(observer(CreateTeam));
export default graphql(createTeamMutation)(observer(CreateTeam));
