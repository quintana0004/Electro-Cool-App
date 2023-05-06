import axios from "./axios";

async function httpGetAllClients(take, page, searchTerm = "") {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  return await axios("/customers" + queryParams);
}

//?Client Information must be an object
async function httpUpsertClient(clientInfo) {
  return await axios.post("/customers", clientInfo);
}

//?Client will need ID
async function httpGetClient(id) {
  return await axios(`/customers/${id}`);
}

export { httpGetAllClients, httpUpsertClient, httpGetClient };
