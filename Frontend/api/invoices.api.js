import axios from "./axios";

export async function httpGetAllInvoices(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&${searchTerm}`;
  const response = await axios("/invoices" + queryParams);
  return response;
}
