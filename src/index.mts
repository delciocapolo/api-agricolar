import { PORT } from "./utils/EnvConfigs";
import { httpServer } from './server.mjs';
import { debuglog } from "node:util";
import { statistic } from "./DTO/statistic";
import { DatabaseConnectionPOST } from "./model/databaseConnection";

const log = debuglog('main');

await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
statistic.push({
    server: "HTTP",
    status: "Running",
    name: "HTTP 📬",
    adress: `http://localhost:${PORT}/v1/`,
});

console.table(statistic);