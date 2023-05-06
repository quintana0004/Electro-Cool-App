import axios from "./axios";

async function httpGetAllUsers(searchTerm) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const searchVal = searchTerm ?? "";
    const queryParams = `?searchTerm=${searchVal}`;
    const response = await axios("/users" + queryParams);
    responseToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    responseToReturn.hasError = true;
    responseToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return responseToReturn;
}

async function httpGetUserProfile() {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios("/users/profile");
    responseToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    responseToReturn.hasError = true;
    responseToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return responseToReturn;
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
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.delete("/users/" + id);
    responseToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    responseToReturn.hasError = true;
    responseToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return responseToReturn;
}

export {
  httpGetAllUsers,
  httpGetUserProfile,
  httpUpsertUsers,
  httpUpdateUserProfile,
  httpUpdateUserAccessState,
  httpDeleteUser,
};
