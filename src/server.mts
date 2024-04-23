import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "node:http";
import cors, { CorsRequest } from "cors";
import { debuglog } from "node:util";

import { serverFarmerCreate } from "./graphql/schema/POST/farmer/server";
import { serverCostumerCreate } from "./graphql/schema/POST/costumer/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { generateToken } from "./utils/getToken";
import getCredentialRoute from "./services/ExistenceBIOrNIF/route";
import { PORT } from "./utils/EnvConfigs";
import { statistic } from "./DTO/statistic";
import serverGeneralEndpoint from "./graphql/schema/GET/set/server";
import { ApolloServer, BaseContext } from "@apollo/server";
import { ContextAPI } from "./graphql/schema/helpers/ContextType";
import serverGetFarmerRoute from "./graphql/schema/GET/farmer/server";

const app = express();
const httpServer = http.createServer(app);
const log = debuglog('server');
const activePublicFn = (...servers: Array<ApolloServer<BaseContext> | ApolloServer<ContextAPI>>) => servers.map((srv) => srv.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer })));

app.use(
  cors<CorsRequest>({
    origin: "*",
    optionsSuccessStatus: 200
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Plugin para as rotas
activePublicFn(serverCostumerCreate, serverFarmerCreate, serverGeneralEndpoint, serverGetFarmerRoute);

// definindo os servidores
await serverFarmerCreate.start()
  .then((_) => {
    statistic.push({
      server: "GraphQL",
      status: "Running",
      name: "Create Farmer 📬",
      adress: `http://localhost:${PORT}/v1/farmer/create`,
    });
  });
await serverCostumerCreate.start()
  .then((_) => {
    statistic.push({
      server: "GRAPHQL",
      status: "Running",
      name: "Create Costumer 📬",
      adress: `http://localhost:${PORT}/v1/costumer/create`,
    });
  });
await serverGeneralEndpoint.start()
  .then((_) => {
    statistic.push({
      server: "GRAPHQL",
      status: "Running",
      name: "General Endpoint 📬",
      adress: `http://localhost:${PORT}/v1/set`,
    });
  });
await serverGetFarmerRoute.start()
  .then((_) => {
    statistic.push({
      server: "GRAPHQL",
      status: "Running",
      name: "Get Farmer 📬",
      adress: `http://localhost:${PORT}/v1/farmer/farmID`,
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
app.use('/v1/set', expressMiddleware(serverGeneralEndpoint));
app.use('/v1/farmer/farmID', expressMiddleware(serverGetFarmerRoute));
app.use(getCredentialRoute);
app.get('/v1/', (_, res) => (res.status(200).json({ message: "NÃO HÁ NADA AQUI! VOCÊ SE FUD3U" })));

export {
  httpServer,
  app
};