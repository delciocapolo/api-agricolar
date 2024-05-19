// Modules core
import express from "express";
import http from "node:http";
import cors, { CorsRequest } from "cors";

// Serviço
import getCredentialRoute from "./services/ExistenceBIOrNIF/routeNIF";

const app = express();
const httpServer = http.createServer(app);

app.use(
  cors<CorsRequest>({
    origin: "*",
    optionsSuccessStatus: 200
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Definindo as rotas
app.use(getCredentialRoute);
app.get('/v1/', (_, res) => (res.status(200).json({ message: "NÃO HÁ NADA AQUI! VOCÊ SE FUD3U" })));

export {
  httpServer,
  app
};