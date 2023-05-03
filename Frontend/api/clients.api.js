import axios from "./axios";

async function httpGetAllClients(take, page, searchTerm = "") {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/customers" + queryParams);
  console.log("cambiaron esto", response.data);
  return response;
}

//?Client Information must be an object
async function httpUpsertClient(clientInfo) {
  const response = await axios.post("/customers", clientInfo);
  return response;
}

//?Client will need ID
async function httpGetClient(id) {
  const response = await axios(`/customers/${id}`);
  return response;
}

export { httpGetAllClients, httpUpsertClient, httpGetClient };
