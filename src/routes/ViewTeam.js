import React from "react";
// teams: far left column
// channels: to the right of teams, column
// header: top row to the right of channels
// messages: below header
// input: below messages

import AppLayout from "../components/AppLayout";
import Header from "../components/Header";
import Messages from "../components/Messages";
import Input from "../components/SendMessage";
import SideBar from "../containers/Sidebar";

const channel = "partytime";

export default () => (
  <AppLayout>
    <SideBar currentTeamId={11} />
    <Header channel={"partytime"} />
    <Messages>Messages</Messages>
    <Input channel={channel} />
  </AppLayout>
);
