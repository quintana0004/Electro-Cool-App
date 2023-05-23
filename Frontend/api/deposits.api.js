import axios from "./axios";

export async function httpGetAllDeposits(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const deposits = await axios("/deposits" + queryParams);

  return deposits;
}

export async function httpGetAllAvailableDeposits(
  take,
  page,
  searchTerm,
  customerId
) {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const deposits = await axios("/deposits" + queryParams);

  let depositLength = deposits.data.data.length;
  if (depositLength > 0) {
    let filteredDesposits = deposits.data.data;
    filteredDesposits = filteredDesposits.filter(
      (d) =>
        d.isAvailable === true &&
        d.status === "Paid" &&
        d.customer.id === customerId
    );
    deposits.data.data = filteredDesposits;
  }

  return deposits;
}

export async function httpGetDepositsByInvoiceId(invoiceId) {
  const deposits = await axios("/deposits/invoice/" + invoiceId);
  return deposits;
}

export async function httpGetDeposit(id) {
  const deposit = await axios("/deposits/" + id);
  return deposit;
}

export async function httpUpsertDeposit(depositInfo) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/deposits", depositInfo);
    responseToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    responseToReturn.hasError = true;
    responseToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return responseToReturn;
}
