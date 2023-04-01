import axios from "./axios";

export async function httpGetAllDeposits(take, page, searchTerm) {
  try {
    const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
    const deposits = await axios("/deposits" + queryParams);
    return deposits;
  } catch (error) {
    console.log("Error at the Http Get All Deposits: ", error.response.data);
  }
}

export async function httpGetDepositsByInvoiceId(invoiceId) {
   try {
    const deposits = await axios("/deposits/invoice/" + invoiceId);
    return deposits;
  } catch (error) {
    console.log("Error at the Http Get Deposits By Invoice Id: ", error.response.data);
  } 
}

export async function httpGetDeposit(id) {
  try {
    const deposit = await axios("/deposits/" + id);
    return deposit;
  } catch (error) {
    console.log("Error at the Http Get Deposit: ", error.response.data);
  }
}

export async function httpUpsertDeposit(depositInfo) {
  try {
    const response = await axios.post("/deposits", depositInfo);
    return response;
  } catch (error) {
    console.log("Error at the Http Upsert Deposits: ", error.response.data);
  }
}
