import React from "react";
import { Modal, Input, Button, Form } from "semantic-ui-react";
import { withFormik } from "formik";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";

const AddChannelModal = ({
  open,
  onClose,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Modal open={open} onClose={onClose} closeOnDimmerClick={true}>
    <Modal.Header>Add a Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            value={values.name}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            fluid
            placeholder="Channel Name"
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            positive
          >
            Create Channel
          </Button>
          <Button onClick={onClose} negative>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name)
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: "" }),
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting }
    ) => {
      alert(JSON.stringify(values, null, 2));
      const response = await mutate({
        variables: { teamId, name: values.name }
      });
      console.log("create channel response", response);
      setSubmitting(false);
      onClose();
    }
  })
)(AddChannelModal);
