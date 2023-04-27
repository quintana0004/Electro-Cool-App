import axios from "./axios";

export async function httpLogin(username, password) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/auth/login", { username, password });
    responseToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    responseToReturn.hasError = true;
    responseToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return responseToReturn;
}

export async function httpSignup(
  email,
  password,
  firstName,
  lastName,
  phone,
  username
) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/auth/signup", {
      email,
      password,
      firstName,
      lastName,
      phone,
      username,
    });
    responseToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    responseToReturn.hasError = true;
    responseToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return responseToReturn;
}
