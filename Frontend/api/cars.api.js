import axios from "./axios";

async function httpGetAllCars(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/cars" + queryParams);
  console.log("API", response);
  return response;
}

//?Car Information has to be an object
async function httpCreateCar(carInfo) {
  const response = await axios.post("/cars", carInfo);
  return response;
}

export async function httpGetAllOfCustomer(searchTerm = "", customerId) {
  const queryParams = `?searchTerm=${searchTerm}&customerId=${customerId}`;
  const response = await axios("/cars/customer/" + queryParams);
  return response;
}

export { httpGetAllCars, httpCreateCar };
