import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "node:http";
import cors, { CorsRequest } from "cors";

import { PORT } from "./utils/EnvConfigs";

export const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())