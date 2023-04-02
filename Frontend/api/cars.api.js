import axios from "./axios";

async function httpGetAllCars(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/cars" + queryParams);
  return response;
}

//?Car Information has to be an object
async function httpCreateCar(carInfo) {
  const response = await axios.post("/cars", carInfo);
  return response;
}

//?Car Information must be an object
async function httpUpsertCar(carInfo) {
  const response = await axios.post("/cars", carInfo);
  return response;
}

export { httpGetAllCars, httpCreateCar, httpUpsertCar };
