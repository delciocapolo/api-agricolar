import { ApolloServer } from "@apollo/server";
import {resolvers,typeDefs} from "./schema";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { PORT } from "../../../../utils/EnvConfigs";

const serverGeneralEndpoint = new ApolloServer({
    schema: buildSubgraphSchema({resolvers, typeDefs}),
    introspection: true,
});

serverGeneralEndpoint["info"] = {
  server: "GRAPHQL",
  name: "General Endpoint 📬",
  adress: `http://localhost:${PORT}/v1/set`,
};

export default serverGeneralEndpoint;