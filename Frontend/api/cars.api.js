import axios from "./axios";

async function httpGetAllCars(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/cars" + queryParams);
  console.log("API", response);
  return response;
}

//?Car will need ID
async function httpGetCar(id) {
  const response = await axios(`/cars/${id}`);
  return response;
}

async function httpGetCarsByCustomerId(searchTerm, customerId) {
  const queryParams = `?customerId=${customerId}&searchTerm=${searchTerm}`;
  const response = await axios("/cars/customer" + queryParams);
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

//?Car Information must be an object
async function httpUpsertCar(carInfo) {
  const response = await axios.post("/cars", carInfo);
  return response;
}

export {
  httpGetAllCars,
  httpCreateCar,
  httpUpsertCar,
  httpGetCar,
  httpGetCarsByCustomerId,
};
