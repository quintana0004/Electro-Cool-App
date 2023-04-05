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
  try {
  const response = await axios.post("/invoices", invoiceInfo);
  return response;
  }
  catch (error) {
    if (error.response) {
      console.log("Error on Http Upsert Invoice Message: ", error.message);
      console.log("Error on Http Upsert Invoice Data: ", error.response.data);
    }
  }
}
