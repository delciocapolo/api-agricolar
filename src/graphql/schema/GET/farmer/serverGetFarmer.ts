import { ApolloServer } from "@apollo/server";
import {resolvers,typeDefs} from "./schemaGetFarmer";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { PORT } from "../../../../utils/EnvConfigs";

const serverGetFarmerRoute = new ApolloServer({
  schema: buildSubgraphSchema({ resolvers, typeDefs }),
  introspection: true,
});

serverGetFarmerRoute["info"] = {
  server: "GRAPHQL",
  name: "Get Farmer 📬",
  adress: `http://localhost:${PORT}/v1/farmer/farmID`,
};
export default serverGetFarmerRoute;