import { config } from "./config/config";
import server from "./server";

server.listen(config.PORT, () => {
  console.log(`Server is running on PORT ${config.PORT}`);
});
