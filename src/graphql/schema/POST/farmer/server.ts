import { ApolloServer } from "@apollo/server";
import { ContextAPI } from "../../helpers/ContextType";
import { resolvers, typeDefs } from "./schema";
import { PORT } from "../../../../utils/EnvConfigs";
import { buildSubgraphSchema } from "@apollo/subgraph";

const serverFarmerCreate = new ApolloServer<ContextAPI>({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  introspection: true
});

serverFarmerCreate["info"] = {
  server: "GraphQL",
  name: "Create Farmer 📬",
  adress: `http://localhost:${PORT}/v1/farmer/create`,
};

export default serverFarmerCreate;