import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "node:http";
import cors, { CorsRequest } from "cors";
import { debuglog } from "node:util";

import { serverFarmerCreate } from "./graphql/schema/POST/create/farmer/server";
import { serverCostumerCreate } from "./graphql/schema/POST/create/costumer/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { generateToken } from "./utils/getToken";
import getCredentialRoute from "./services/ExistenceBIOrNIF/route";
import { PORT } from "./utils/EnvConfigs";
import { statistic } from "./DTO/statistic";

const app = express();
const server = http.createServer(app);
const log = debuglog('server');

app.use(
  cors<CorsRequest>({
    origin: "*",
    optionsSuccessStatus: 200
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Plugin para as rotas
serverFarmerCreate.addPlugin(
  ApolloServerPluginDrainHttpServer({
    httpServer: server
  })
);
serverCostumerCreate.addPlugin(
  ApolloServerPluginDrainHttpServer({
    httpServer: server
  })
);

// definindo os servidores
await serverFarmerCreate.start()
  .then((_) => {
    statistic.push({
      server: "GraphQL",
      message: "Create Farmer -> SERVER IS RUNNING 📬",
      adress: `http://localhost:${PORT}/v1/farmer/create`,
    });
  });
await serverCostumerCreate.start()
  .then((_) => {
    statistic.push({
      server: "GRAPHQL",
      message: "Create Costumer -> SERVER IS RUNNING 📬",
      adress: `http://localhost:${PORT}/v1/costumer/create`,
    });
  })

// Definindo as rotas
app.use('/v1/farmer/create', expressMiddleware(
  serverFarmerCreate, {
  context: async ({ req, res }) => ({
    // token: generateToken(req, res) as string,
    token: "",
  }),
},
));
app.use('/v1/costumer/create', expressMiddleware(serverCostumerCreate, {
  context: async ({ req, res }) => ({
    // token: generateToken(req, res) as string,
    token: ""
  }),
}));
app.use(getCredentialRoute);
app.get('/v1/', (_, res) => (res.status(200).json({ message: "NÃO HÁ NADA AQUI! VOCÊ SE FUD3U" })));

export {
  server,
  app
};