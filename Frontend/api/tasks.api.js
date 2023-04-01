import axios from "./axios";

async function httpGetAllTasks(take, page, searchTerm = "") {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/tasks" + queryParams);
  return response;
}
async function httpGetTasksbyId(id) {
  const response = await axios(`/tasks/${id}`);
  return response;
}
//?Client Information must be an object
async function httpUpsertTasks(taskInfo) {
  const response = await axios.post("/tasks", taskInfo);
  return response;
}

export { httpGetAllTasks, httpUpsertTasks, httpGetTasksbyId };
