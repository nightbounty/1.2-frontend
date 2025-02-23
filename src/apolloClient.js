import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://soen-487-12-production.up.railway.app/graphql", // GraphQL Server
    cache: new InMemoryCache(),
});

export default client;
