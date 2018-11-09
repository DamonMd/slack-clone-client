import React from "react";
// teams: far left column
// channels: to the right of teams, column
// header: top row to the right of channels
// messages: below header
// input: below messages

import AppLayout from "../components/AppLayout";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import Header from "../components/Header";
import Messages from "../components/Messages";
import Input from "../components/Input";

export default () => (
  <AppLayout>
    <Teams>Team</Teams>
    <Channels>Channelaaas</Channels>
    <Header>head</Header>
    <Messages>Messages</Messages>
    <Input>
      <input type="text" placeholder="things go in here" />
    </Input>
  </AppLayout>
);
