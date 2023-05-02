import axios from "./axios";

export async function httpGetCurrentVehicles() {
  return await axios("/metrics/currentVehiclesWorking");
}

export async function httpGetVehiclesInShop() {
  return await axios("/metrics/vehiclesInShop");
}

export async function httpGetVehiclesNotStarted() {
  return await axios("/metrics/vehiclesNotStarted");
}

export async function httpGetNewVehiclesReceivedToday() {
  return await axios("/metrics/newVehiclesReceivedToday");
}

export async function httpGetFinishedVehiclesToday() {
  return await axios("/metrics/finishedVehiclesToday");
}

export async function httpGetTotalAmountPaidToday() {
  return await axios("/metrics/totalAmountPaidToday");
}

export async function httpGetTotalAmountInDraftsToday() {
  return await axios("/metrics/totalAmountInDraftsToday");
}

export async function httpGetTotalAmountPendingToday() {
  return await axios("/metrics/totalAmountPendingToday");
}

export async function httpGetTotalAmountCanceledToday() {
  return await axios("/metrics/totalAmountCanceledToday");
}

export async function httpGetTotalAmountAppointmentsToday() {
  return await axios("/metrics/totalAmountAppointmentsToday");
}

export async function httpGetTotalAmountTasksToday() {
  return await axios("/metrics/totalAmountTasksToday");
}
