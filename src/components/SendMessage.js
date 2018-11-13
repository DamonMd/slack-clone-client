import React from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

const InputWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
`;

const PUPPYMONKEYBABY = ({ channel }) => {
  return (
    <InputWrapper>
      <Input fluid type="text" placeholder={`Message #${channel}`} />
    </InputWrapper>
  );
};

export default PUPPYMONKEYBABY;
