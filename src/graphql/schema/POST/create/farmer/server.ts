import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ContextAPI } from "../../../helpers/ContextType";
import * as createSchema from "./schema";

export const serverFarmerCreate = new ApolloServer<ContextAPI>({
    ...createSchema,
    introspection: true
});