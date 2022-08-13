import * as React from "react";
import Router from "./routes";
import { BrowserRouter as Routers } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { setContext } from "@apollo/client/link/context";

function App() {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_END_POINT,
    // uri: "http://192.168.2.101:4550/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: user ? user?.token : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const [prefersDarkMode, setPrefersDarkMode] = React.useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: "#F8F8F8",
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Routers>
          <Router />
        </Routers>
        <CssBaseline />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
