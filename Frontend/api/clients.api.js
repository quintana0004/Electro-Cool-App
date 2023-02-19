import axios from "./axios";

export async function httpGetAllClients(take, page, searchTerm = "") {
  console.log("Page: ", page);
  console.log("Take: ", take);
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/customers" + queryParams);
  return response;
}
