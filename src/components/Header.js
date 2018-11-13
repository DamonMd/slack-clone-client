import React from "react";
import styled from "styled-components";
import { Header } from "semantic-ui-react";

const HeaderWrapper = styled.div`
  grid-column: auto;
  grid-row: 1;
  background-color: white;
`;

const SlackHeader = ({ channel }) => {
  return (
    <HeaderWrapper>
      <Header textAlign="center">{channel}</Header>
    </HeaderWrapper>
  );
};

export default SlackHeader;
