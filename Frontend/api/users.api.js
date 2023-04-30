import axios from "./axios";

async function httpGetAllUsers(searchTerm) {
  const searchVal = searchTerm ?? "";

  const queryParams = `?searchTerm=${searchVal}`;
  const response = await axios("/users" + queryParams);
  return response;
}

async function httpUpsertUsers(usersInfo) {
  const response = await axios.post("/users/access", usersInfo);
  return response;
}

async function httpUpdateUserProfile(usersInfo) {
  const response = await axios.post("/users/profile", usersInfo);
  return response;
}

async function httpDeleteUser(id) {
  const response = await axios.delete("/users/" + id);
  return response;
}

export {
  httpGetAllUsers,
  httpUpsertUsers,
  httpUpdateUserProfile,
  httpDeleteUser,
};
