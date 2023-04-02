import axios from "./axios";

export async function httpGetAllTasks(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/tasks" + queryParams);
  return response;
}
