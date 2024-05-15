import { PORT } from "./utils/EnvConfigs";
import { statistic } from "./DTO/statistic";
import { httpServer } from "./server.mjs";

(
    async () => {
        await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
        statistic.push({
            server: "HTTP",
            status: "running",
            name: "HTTP 📬",
            adress: `http://localhost:${PORT}/v1/`,
        });

        console.table(statistic);
    }
)()
