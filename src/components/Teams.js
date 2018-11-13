import React from "react";
import styled from "styled-components";

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1/4;
  background-color: #362234;
`;

const TeamList = styled.ul`
  width: 100%;
  list-style-type: none;
  padding-left: 0px;
`;

const TeamListItem = styled.li`
  background-color: #676066;
  color: #fff;
  border-radius: 10px;
  margin: auto;
  margin-bottom: 10px;
  align-items: center;
  padding: 7px;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  font-size: 24px;
  &:hover {
    cursor: pointer;
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;
const Teams = ({ teams }) => {
  const teamList = teams.map(({ id, name }) => {
    return <TeamListItem key={id}>{name.slice(0, 1)}</TeamListItem>;
  });

  return (
    <TeamWrapper>
      <TeamList>{teamList}</TeamList>
    </TeamWrapper>
  );
};

export default Teams;
