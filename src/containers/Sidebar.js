import React from "react";
import { graphql } from "react-apollo";
import Teams from "../components/Teams";
import Channels from "../components/Channels";
import decode from "jwt-decode";
import gql from "graphql-tag";
import { renderReporter } from "mobx-react";
import AddChannelModal from "../components/AddChannelModal";

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

class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false
  };

  handleAddChannelClick = () => {
    this.setState({ openAddChannelModal: true });
  };

  handleCloseAddChannelModal = () => {
    console.log("closing time");
    this.setState({ openAddChannelModal: false });
  };

  closeChannelModal = () => {
    this.setState({ openAddChannelModal: false });
  };

  render() {
    const {
      data: { loading, allTeams },
      currentTeamId
    } = this.props;
    if (loading) {
      return null;
    }

    console.log("all", allTeams);
    const team = currentTeamId
      ? allTeams.filter(t => t.id === parseInt(currentTeamId, 10))
      : allTeams[0];
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
        onAddChannelClick={this.handleAddChannelClick}
      />,

      <AddChannelModal
        open={this.state.openAddChannelModal}
        onClose={this.closeChannelModal}
        key="sidebar-add-channel-modal"
        teamId={parseInt(currentTeamId, 10)}
      />
    ];
  }
}

export default graphql(allTeamsQuery)(Sidebar);
