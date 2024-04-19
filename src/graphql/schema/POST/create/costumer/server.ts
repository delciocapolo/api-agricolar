import { ApolloServer } from "@apollo/server";
import { ContextAPI } from "../../../helpers/ContextType";
import {resolvers, typeDefs} from "./schema.js";

export const serverCostumerCreate = new ApolloServer<ContextAPI>({
    typeDefs,
    resolvers,
    introspection: true
});