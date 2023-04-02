import axios from "./axios";

async function httpGetAllJobOrders(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/job-orders" + queryParams);
  return response;
}

//?Must include an id in the jobOrderInfo for it to be update it
async function httpUpsertJobOrder(jobOrderInfo) {
  console.log("Job Order Info to Post: ", jobOrderInfo);
  const response = await axios.post("/job-orders", jobOrderInfo);
  return response;
}

async function httpUpdateStatusJobOrder(id, status) {
  const response = await axios.post("/job-orders/status", {
    id: id,
    status: status,
  });
  return response;
}

async function httpGetJobOrder(id) {
  const response = await axios(`/job-orders/${id}`);
  return response;
}

export {
  httpGetAllJobOrders,
  httpUpsertJobOrder,
  httpUpdateStatusJobOrder,
  httpGetJobOrder,
};
