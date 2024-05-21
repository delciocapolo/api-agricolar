import { expressMiddleware } from "@apollo/server/express4";
import http from "node:http";
import express from "express";
import cors, { CorsRequest } from "cors";
import { debuglog } from "node:util";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const app = express();
const httpServer = http.createServer(app);
const log = debuglog("CustomerServer");

const Gateway = new ApolloServer({
  gateway: new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: "Farmer", url: "http://127.0.0.1:5051/v1/farmer" },
        { name: "Set", url: "http://127.0.0.1:5052/v1/set" },
        { name: "Customer", url: "http://127.0.0.1:5050/v1/customer" },
      ],
    }),
  }),
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use(
  cors<CorsRequest>({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try {
  await Gateway.start();

  app.use("/v1/api", expressMiddleware(Gateway));

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 5055 }, resolve)
  );
  log(
    `SERVER IS RUNNIG AT: http://localhost:${5055}/v1/api`
  );
} catch (error) {
  console.error(error);
}
