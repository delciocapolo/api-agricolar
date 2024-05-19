import { expressMiddleware } from "@apollo/server/express4";
import http from "node:http";
import express from "express";
import cors, {CorsRequest} from "cors";
import { debuglog } from "node:util";

import { ApolloServer } from "@apollo/server";
import { ContextAPI } from "../helpers/ContextType";
import { resolvers, typeDefs } from "./schemaPostCostumer";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { CUSTOMER_SERVER_PORT } from "../../../utils/EnvConfigs";

const app = express();
const httpServer = http.createServer(app);
const log = debuglog("CustomerServer");

const CustomerServer = new ApolloServer<ContextAPI>({
  schema: buildSubgraphSchema([{ resolvers, typeDefs }]),
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use(cors<CorsRequest>({
  origin: '*',
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

try {
  await CustomerServer.start();

  app.use("/v1/customer", expressMiddleware(CustomerServer, {
    context: async ({req, res}) => ({
      token: ""
    })
  }));

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: CUSTOMER_SERVER_PORT }, resolve)
  );
  log(`SERVER IS RUNNIG AT: http://localhost:${CUSTOMER_SERVER_PORT}/v1/customer`);
} catch (error) {
  console.error(error);
}
