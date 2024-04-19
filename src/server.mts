import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "node:http";
import cors, { CorsRequest } from "cors";
import { debuglog } from "node:util";

import getCredentialRoute from "./services/ExistenceBIOrNIF/route.mjs";
import { serverFarmerCreate } from "./graphql/schema/POST/create/farmer/server";
import { serverCostumerCreate } from "./graphql/schema/POST/create/costumer/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { generateToken } from "./utils/getToken";

const app = express();
const server = http.createServer(app);
const log = debuglog('server');

app.use(
  cors<CorsRequest>({
    origin: "*",
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
    log(`GRAPHQL [Create Farmer] SERVER IS RUNNING AT [http://localhost:5003/v1/farmer/create] 📬`)
  });
await serverCostumerCreate.start()
  .then((_) => {
    log(`GRAPHQL [Create Costumer] SERVER IS RUNNING AT [http://localhost:5003/v1/costumer/create] 📬`)
  })

// Definindo as rotas
app.use(getCredentialRoute);
app.use('/v1/farmer/create', expressMiddleware(
  serverFarmerCreate, {
    context: async ({req, res}) => ({
      token: generateToken(req, res),
    })
  }
));
app.use('/v1/costumer/create', expressMiddleware(serverCostumerCreate, {
  context: async ({req, res}) => ({
    token: generateToken(req, res)
  })
}));
app.get('/v1/', (_, res) => (res.status(200).json({message: "NAO HA NADA AQUI! SE FUDEU"})));

export {
  server,
  app
};