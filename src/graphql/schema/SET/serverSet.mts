import express from "express";
import http from "node:http";
import cors, { CorsRequest } from "cors";
import { expressMiddleware } from "@apollo/server/express4";

import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "./schemaSet";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { debuglog } from "node:util";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { SET_SERVER_PORT } from "../../../utils/EnvConfigs";

const app = express();
const httpServer = http.createServer(app);
const log = debuglog("SetServer");

app.use(
  cors<CorsRequest>({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const SetServer = new ApolloServer({
  schema: buildSubgraphSchema([{ resolvers, typeDefs }]),
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

try {
  await SetServer.start();

  app.use(
    "/v1/set",
    expressMiddleware(SetServer, {
      context: async ({ req, res }) => ({
        token: "",
      }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: SET_SERVER_PORT }, resolve)
  );
  log(
    `📬 SERVER IS RUNNIG AT: http://localhost:${SET_SERVER_PORT}/v1/set`
  );
} catch (error) {
  console.error(error);
}

