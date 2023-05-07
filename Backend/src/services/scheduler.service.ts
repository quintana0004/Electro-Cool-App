import cron from "node-cron";
import {
  updateTemporaryAdminsByEndDate,
  updateTemporaryAdminsByStartDate,
  updateUsersExpiredPasswords,
} from "../models/users.model";
import { updatePolicyAmount } from "../models/invoices.model";

function scheduleJobs() {
  activateTemporaryAdminsDaily();
  deactivateTemporaryAdminsDaily();
  updatePendingInvoicesDaily();
  invalidateTemporaryPasswordsEvery12Hours();
}

function activateTemporaryAdminsDaily() {
  cron.schedule("* * * * 0-6", async () => {
    await updateTemporaryAdminsByStartDate();
  });
}

function deactivateTemporaryAdminsDaily() {
  cron.schedule("* * * * 0-6", async () => {
    await updateTemporaryAdminsByEndDate();
  });
}

function updatePendingInvoicesDaily() {
  cron.schedule("0 0 * * *", async () => {
    await updatePolicyAmount();
  });
}

function invalidateTemporaryPasswordsEvery12Hours() {
  cron.schedule("0 */12 * * *", async () => {
    await updateUsersExpiredPasswords();
  });
}

export default scheduleJobs;
