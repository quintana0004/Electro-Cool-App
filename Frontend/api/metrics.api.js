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
