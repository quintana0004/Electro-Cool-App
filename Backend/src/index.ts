import http from "http";
import app from "./app";
import scheduleJobs from "./services/scheduler.service";

import { createDummyCompany } from "./utils/db.utils";

const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

const server = http.createServer(app);

// --- Insert Dummy Company Information: Temporary ---
(async () => {
  await createDummyCompany();
})();

scheduleJobs();

server.listen(SERVER_PORT, () => console.log(`Server is running ${SERVER_HOST}:${SERVER_PORT}`));
