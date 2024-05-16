import { ApolloServer } from "@apollo/server";
import {resolvers,typeDefs} from "./schemaGetFarmer";
import { buildSubgraphSchema } from "@apollo/subgraph";

const serverGetFarmerRoute = new ApolloServer({
  schema: buildSubgraphSchema({ resolvers, typeDefs }),
  introspection: true,
});

export default serverGetFarmerRoute;