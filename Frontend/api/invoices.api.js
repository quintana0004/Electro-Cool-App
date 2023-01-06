import axios from "./axios";

export async function httpGetAllInvoices(take, skip, searchTerm) {
  const queryParams = `?take=${take}&skip=${skip}&${searchTerm}`;
  const invoices = await axios("/invoices" + queryParams);
  return invoices;
}
