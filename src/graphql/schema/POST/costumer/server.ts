import { ApolloServer } from "@apollo/server";
import { ContextAPI } from "../../helpers/ContextType.js";
import { resolvers, typeDefs } from "./schema.js";

export const serverCostumerCreate = new ApolloServer<ContextAPI>({
    typeDefs,
    resolvers,
    introspection: true
});