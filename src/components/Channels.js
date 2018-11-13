import React from "react";
import styled from "styled-components";
import { list } from "postcss";

const paddingLeft = "padding-left: 10px";

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #4e3a4c;
  color: #958993;
`;

const ChannelList = styled.ul`
  width: 100%;
  list-style-type: none;
  padding-left: 0px;
`;

const ChannelListItem = styled.li`
  ${paddingLeft};
  &:hover {
    background: #3e313c;
    cursor: pointer;
  }
`;

const Green = styled.span`
  color: #38978d;
`;

const TeamNameHeader = styled.h1`
  font-size: 20px;
  color: #fff;
`;

const Bubble = ({ on = true }) => (on ? <Green>&.</Green> : "o");

const Channels = ({ channels, messages, team }) => {
  const channelList = channels.map(({ id, name }) => {
    return <ChannelListItem key={id}># {name}</ChannelListItem>;
  });

  const messageList = messages.map(({ id, user }) => {
    return (
      <ChannelListItem key={id}>
        <Bubble /> {user}
      </ChannelListItem>
    );
  });
  return (
    <ChannelWrapper>
      <div>
        <TeamNameHeader>{team}</TeamNameHeader>
      </div>
      <div>
        <p>Channels</p>
        <ChannelList>{channelList}</ChannelList>
      </div>
      <div>
        <p>Direct Messages</p>
        <ChannelList>{messageList}</ChannelList>
      </div>
    </ChannelWrapper>
  );
};

export default Channels;
