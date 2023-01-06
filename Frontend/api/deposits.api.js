import axios from "./axios";

export async function httpGetAllDeposits(take, skip, searchTerm) {
  const queryParams = `?take=${take}&skip=${skip}&${searchTerm}`;
  const deposits = await axios("/deposits" + queryParams);
  return deposits;
}
