import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ContextAPI } from "../../../helpers/ContextType";
import {resolvers, typeDefs} from "./schema";

export const serverFarmerCreate = new ApolloServer<ContextAPI>({
    typeDefs,
    resolvers,
    introspection: true
});