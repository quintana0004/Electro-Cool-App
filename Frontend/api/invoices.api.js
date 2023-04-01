import axios from "./axios";

export async function httpGetAllInvoices(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/invoices" + queryParams);
  return response;
}

export async function httpGetInvoice(id) {
  const response = await axios(`/invoices/${id}`);
  return response;
}

export async function httpUpsertInvoice(invoiceInfo) {
  const response = await axios("/invoices", {invoiceInfo});
  return response;
}
