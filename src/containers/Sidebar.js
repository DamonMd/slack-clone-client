import React from "react";
import { graphql } from "react-apollo";
import Teams from "../components/Teams";
import Channels from "../components/Channels";
import decode from "jwt-decode";
import gql from "graphql-tag";

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

const Sidebar = ({ data: { loading, allTeams }, currentTeamId }) => {
  if (loading) {
    return null;
  }

  console.log("all", allTeams);
  const team = allTeams.filter(t => t.id === currentTeamId);
  console.log("got the team?", team);
  let username = "";
  try {
    const token = localStorage.getItem("token");
    const { user } = decode(token);
    username = user.username;
  } catch (err) {}

  return [
    <Teams
      key="t-sidebar"
      teams={allTeams.map(team => {
        return { id: team.id, letter: team.name.charAt(0).toUpperCase() };
      })}
    >
      Team
    </Teams>,
    <Channels
      key="c-sidebar"
      channels={team[0].channels}
      username={username}
      teamName={team[0].name}
      messages={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
    >
      Channelaaas
    </Channels>
  ];
};

export default graphql(allTeamsQuery)(Sidebar);
