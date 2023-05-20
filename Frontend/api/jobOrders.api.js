import axios from "./axios";

export async function httpGetAllJobOrders(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  return await axios("/job-orders" + queryParams);
}

export async function httpUpsertJobOrder(jobOrderInfo) {
  return await axios.post("/job-orders", jobOrderInfo);
}

export async function httpCreateJobOrderTransaction(
  customerInfo,
  carInfo,
  jobOrderInfo
) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/job-orders/transaction", {
      customer: customerInfo,
      car: carInfo,
      jobOrder: jobOrderInfo,
    });
    responseToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    responseToReturn.hasError = true;
    responseToReturn.errorMessage = errorResponse.error;
  }

  return responseToReturn;
}

export async function httpUpdateStatusJobOrder(id, status) {
  return await axios.post("/job-orders/status", {
    id: id,
    status: status,
  });
}

export async function httpGetJobOrder(id) {
  return await axios(`/job-orders/${id}`);
}
