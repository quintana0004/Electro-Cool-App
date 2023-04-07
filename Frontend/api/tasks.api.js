import axios from "./axios";
async function httpGetAllTasks(take, page, searchTerm) {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/tasks" + queryParams);
  return response;
}

//?Task Information has to be an object
async function httpCreateTask(taskInfo) {
  const response = await axios.post("/tasks", taskInfo);
  return response;
}

export { httpGetAllTasks, httpCreateTask };
