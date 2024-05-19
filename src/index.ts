import { HTTP_SERVER_PORT } from "./utils/EnvConfigs";
import { httpServer } from "./server";

httpServer.listen(HTTP_SERVER_PORT, () => {
  console.log(
    `HTTP 📬 Server is runnig at http://localhost:${HTTP_SERVER_PORT}/v1/`
  );
});

