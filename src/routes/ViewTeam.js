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
import Input from "../components/SendMessage";

const channelList = [{ id: 1, name: "general" }, { id: 2, name: "partytime" }];
const messageList = [{ id: 4, user: "mike" }, { id: 9, user: "steve" }];
const teamList = [
  { id: 88, name: "Wapopopopo" },
  { id: 12, name: "The Lagoonies" }
];
const channel = "partytime";

export default () => (
  <AppLayout>
    <Teams teams={teamList}>Team</Teams>
    <Channels
      channels={channelList}
      messages={messageList}
      team={"The Lagoonies"}
    >
      Channelaaas
    </Channels>
    <Header channel={"partytime"} />
    <Messages>Messages</Messages>
    <Input channel={channel} />
  </AppLayout>
);
