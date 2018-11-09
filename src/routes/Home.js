import React from "react";
// import { gql, graphql } from "apollo-client";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const Home = () => (
  <Query
    query={gql`
      {
        getAllUsers {
          id
          email
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.getAllUsers.map(user => (
        <div key={user.id}>
          <p>{user.email}</p>
        </div>
      ));
    }}
  </Query>
);

export default Home;
