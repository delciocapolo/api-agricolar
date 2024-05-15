import { ApolloServer } from "@apollo/server";
import {resolvers,typeDefs} from "./schemaGetSet";
import { buildSubgraphSchema } from "@apollo/subgraph";

const serverGeneralEndpoint = new ApolloServer({
    schema: buildSubgraphSchema({resolvers, typeDefs}),
    introspection: true,
});

export default serverGeneralEndpoint;