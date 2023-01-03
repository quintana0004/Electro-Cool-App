import cron from "node-cron";
import {
  updateTemporaryAdminsByEndDate,
  updateTemporaryAdminsByStartDate,
} from "../models/users.model";

function scheduleJobs() {
  activateTemporaryAdminsDaily();
  deactivateTemporaryAdminsDaily();
}

function activateTemporaryAdminsDaily() {
  cron.schedule("* * * * 0-7", async () => {
    await updateTemporaryAdminsByStartDate();
  });
}

function deactivateTemporaryAdminsDaily() {
  cron.schedule("* * * * 0-7", async () => {
    await updateTemporaryAdminsByEndDate();
  });
}

export default scheduleJobs;
