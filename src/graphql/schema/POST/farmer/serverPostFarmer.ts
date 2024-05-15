import { ApolloServer } from "@apollo/server";
import { ContextAPI } from "../../helpers/ContextType";
import { resolvers, typeDefs } from "./schemaPostFarmer";
import { PORT } from "../../../../utils/EnvConfigs";
import { buildSubgraphSchema } from "@apollo/subgraph";

const serverFarmerCreate = new ApolloServer<ContextAPI>({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  introspection: true
});

export default serverFarmerCreate;