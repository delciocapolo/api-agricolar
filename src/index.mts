import { PORT } from "./utils/EnvConfigs";
import {server} from './server.mjs';
import { debuglog } from "node:util";

const log = debuglog('main')

await new Promise<void>((resolve) => server.listen({port: PORT}, resolve));
log(`Server is listen http://localhost:${PORT}/`);