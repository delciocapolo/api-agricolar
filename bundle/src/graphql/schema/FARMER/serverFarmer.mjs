import express from "express";
import http from "node:http";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "./schemaFarmer";
import { buildSubgraphSchema, } from "@apollo/subgraph";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { FARMER_SERVER_PORT } from "../../../utils/EnvConfigs";
import { debuglog } from "node:util";
const app = express();
const httpServer = http.createServer(app);
const log = debuglog('FarmerServer');
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const FarmerServer = new ApolloServer({
    schema: buildSubgraphSchema([{ resolvers, typeDefs }]),
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
try {
    await FarmerServer.start();
    app.use("/v1/farmer", expressMiddleware(FarmerServer, {
        context: async ({ req, res }) => ({
            token: ""
        })
    }));
    await new Promise((resolve) => httpServer.listen({ port: FARMER_SERVER_PORT }, resolve));
    log(`📬 SERVER IS RUNNIG AT: http://localhost:${FARMER_SERVER_PORT}/v1/farmer`);
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=serverFarmer.mjs.map