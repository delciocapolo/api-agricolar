// Modules core
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "node:http";
import cors, { CorsRequest } from "cors";
import { debuglog } from "node:util";

// Servidores
import serverFarmerCreate from "./graphql/schema/POST/farmer/serverPostFarmer";
import serverCostumerCreate from "./graphql/schema/POST/costumer/serverPostCostumer";
import serverGeneralEndpoint from "./graphql/schema/GET/set/serverGetSet";
import serverGetFarmerRoute from "./graphql/schema/GET/farmer/serverGetFarmer";
// Servidor -> Serviço
import getCredentialRoute from "./services/ExistenceBIOrNIF/route";

// Utils
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { generateToken } from "./utils/getToken";
import { statistic } from "./DTO/statistic";
import { ArrayApolloServerType } from "./graphql/@types/graphqlType";

const app = express();
const httpServer = http.createServer(app);
const log = debuglog('server');

const activePublicFn = (...servers: ArrayApolloServerType) =>
  servers.map((server) =>
    server.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }))
  );

app.use(
  cors<CorsRequest>({
    origin: "*",
    optionsSuccessStatus: 200
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const SERVERS: ArrayApolloServerType = [
  serverFarmerCreate,
  serverCostumerCreate,
  serverGeneralEndpoint,
  serverGetFarmerRoute,
];
// Plugin para as rotas
activePublicFn(...SERVERS);

// definindo os servidores
await Promise.all(SERVERS.map(servers => (servers.start())))
  .then(servers => {
    log('All server are running')
  })
  .catch(error => {
    log('ERRO AO EXECUTAR TODOS OS SERVIDORES');
    log(error);
  });

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