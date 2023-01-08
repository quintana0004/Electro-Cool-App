import axios from "./axios";

export async function httpGetAllDeposits(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&${searchTerm}`;
  const deposits = await axios("/deposits" + queryParams);
  return deposits;
}
