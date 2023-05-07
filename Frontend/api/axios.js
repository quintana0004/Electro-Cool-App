import Axios from "axios";
import Constants from "expo-constants";
import { getTokens, storeTokens } from "../Store/secureStore";
import { navigate } from "../utils/navigationRef.util";
const { manifest } = Constants;

// The base url is "http://10.0.2.2" because in our android simulator
// we cannot reach "http://localhost" directly.
// Axios.create({ baseURL: "http://10.0.2.2:8000" }); Old way in case the above doesn't work.

const axios = Axios.create({
  baseURL: `http://${manifest.debuggerHost.split(":").shift()}:8000`,
});

axios.interceptors.request.use(async (config) => {
  const { accessToken, refreshToken } = await getTokens();
  config.headers.Authorization = "Bearer " + accessToken;

  return config;
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (
      !originalConfig.url.includes("/auth/login") &&
      !originalConfig.url.includes("/auth/signup") &&
      err.response
    ) {
      // Access Token has expired
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const tokens = await getTokens();
          const response = await axios.post("/auth/refreshToken", {
            token: tokens.refreshToken,
          });

          const { accessToken, refreshToken } = response.data;
          originalConfig.headers.Authorization = "Bearer " + accessToken;
          await storeTokens(accessToken, refreshToken);

          return axios(originalConfig);
        } catch (_error) {
          await storeTokens("", "");
          navigate("LogIn");
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axios;
