import { ApolloServer } from "@apollo/server";
import { ContextAPI } from "../../helpers/ContextType.js";
import { resolvers, typeDefs } from "./schema.js";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { PORT } from "../../../../utils/EnvConfigs.js";

const serverCostumerCreate = new ApolloServer<ContextAPI>({
  schema: buildSubgraphSchema({ resolvers, typeDefs }),
  introspection: true,
});

serverCostumerCreate["info"] = {
  server: "GRAPHQL",
  name: "Create Costumer 📬",
  adress: `http://localhost:${PORT}/v1/costumer/create`,
};

export default serverCostumerCreate;