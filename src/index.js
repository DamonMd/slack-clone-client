import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Routes from "./routes";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import "semantic-ui-css/semantic.min.css";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql"
// });

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      xToken: token,
      xRefresh: refreshToken
    }
  };
});

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const {
      response: { headers }
    } = operation.getContext();
    if (headers) {
      const token = headers.get("xToken");
      const refreshToken = headers.get("xRefresh");
      if (token) {
        localStorage.setItem("token", token);
      }
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    }
    return response;
  })
);

const client = new ApolloClient({
  link: afterwareLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache()
});

console.log(client);

const App = (
  <ApolloProvider client={client} r>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
