import { ApolloServer } from "@apollo/server";
import { ContextAPI } from "../../../helpers/ContextType";
import * as schema from "./schema.js";

export const serverCostumerCreate = new ApolloServer<ContextAPI>({
    ...schema,
    introspection: true
});