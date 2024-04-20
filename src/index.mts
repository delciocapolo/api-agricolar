import { PORT } from "./utils/EnvConfigs";
import { server } from './server.mjs';
import { debuglog } from "node:util";
import { statistic } from "./DTO/statistic";

const log = debuglog('main');

await new Promise<void>((resolve) => server.listen({ port: PORT }, resolve));
statistic.push({
    server: "HTTP",
    message: "HTTP -> SERVER IS RUNNING 📬",
    adress: `http://localhost:${PORT}/v1/`,
});

console.table(statistic);