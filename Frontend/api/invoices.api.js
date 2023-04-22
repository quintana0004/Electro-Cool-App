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

export async function httpGetInvoiceByCustomerId(customerId) {
  const queryParams = `?customerId=${customerId}`;
  const response = await axios("/invoices/customer" + queryParams);
  return response;
}

export async function httpUpsertInvoice(invoiceInfo) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/invoices", invoiceInfo);
    responseToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    responseToReturn.hasError = true;
    responseToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return responseToReturn;
}
