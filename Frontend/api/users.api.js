import axios from "./axios";

async function httpGetAllUsers(searchTerm) {
  const searchVal = searchTerm ?? "";
  const queryParams = `?searchTerm=${searchVal}`;

  return await axios("/users" + queryParams);
}

async function httpGetUserProfile() {
  return await axios("/users/profile");
}

async function httpUpsertUsers(usersInfo) {
  return await axios.post("/users/access", usersInfo);
}

async function httpUpdateUserProfile(usersInfo) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/users/profile", usersInfo);
    responseToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    responseToReturn.hasError = true;
    responseToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return responseToReturn;
}

async function httpUpdateUserAccessState(userId, accessState) {
  return await axios.post("/users/updateState", {
    userId,
    accessState,
  });
}

async function httpDeleteUser(id) {
  return await axios.delete("/users/" + id);
}

export {
  httpGetAllUsers,
  httpGetUserProfile,
  httpUpsertUsers,
  httpUpdateUserProfile,
  httpUpdateUserAccessState,
  httpDeleteUser,
};
