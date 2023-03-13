import axios from "./axios";

async function httpGetAllClients(take, page, searchTerm = "") {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/customers" + queryParams);
  return response;
}

//?Client Information must be an object
async function httpUpsertClient(clientInfo) {
  const response = await axios.post("/customers", clientInfo);
  return response;
}

export { httpGetAllClients, httpUpsertClient };
