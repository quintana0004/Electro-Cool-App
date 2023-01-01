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
    console.log("-------------------");
    console.log("Running Activate Temporary Admins Daily");
    await updateTemporaryAdminsByStartDate();
  });
}

function deactivateTemporaryAdminsDaily() {
  cron.schedule("* * * * 0-7", async () => {
    console.log("-------------------");
    console.log("Running Deactivate Temporary Admins Daily");
    await updateTemporaryAdminsByEndDate();
  });
}

export default scheduleJobs;
