import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "node:http";
import cors, { CorsRequest } from "cors";

import { PORT } from "./utils/EnvConfigs";
import getCredentialRoute from "./services/ExistenceBIOrNIF/route.mjs";

export const app = express();
const server = http.createServer(app);

app.use(
  cors<CorsRequest>({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route for bi checking
app.use(getCredentialRoute);

server.listen(PORT, () => {
  console.log(`Server is listen http://localhost:${PORT}/`);
});
