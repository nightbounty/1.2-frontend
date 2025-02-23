import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import Departments from "./Departments";

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Departments />
        </ApolloProvider>
    );
};

export default App;

