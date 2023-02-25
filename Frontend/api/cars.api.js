import axios from "./axios";

export async function httpGetAllCars(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/cars" + queryParams);
  return response;
}
