import axios from "./axios";

export async function httpGetAllClients(take, page, searchTerm = "") {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/customers" + queryParams);
  return response;
}
