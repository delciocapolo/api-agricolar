import express from "express";
import http from "node:http";
import cors, { CorsRequest } from "cors";
import { expressMiddleware } from "@apollo/server/express4";

import { ApolloServer } from "@apollo/server";
import { debuglog } from "node:util";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { resolvers, typeDefs } from "./schemaMainServer";

const app = express();
const httpServer = http.createServer(app);
const log = debuglog("MainServer");

app.use(
  cors<CorsRequest>({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MainServer = new ApolloServer({
  resolvers, typeDefs,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

try {
  await MainServer.start();

  app.use(
    "/v1/api",
    (req, res,next) => {
      console.log(req.cookies);
      next();
    },
    expressMiddleware(MainServer, {
      context: async ({ req, res }) => ({
        token: "",
      }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 5055 }, resolve)
  );
  log(`📬 SERVER IS RUNNIG AT: http://localhost:5055/v1/api`);
} catch (error) {
  console.error(error);
}
