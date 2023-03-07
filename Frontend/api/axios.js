import Axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;

// The base url is "http://10.0.2.2" because in our android simulator
// we cannot reach "http://localhost" directly.
const axios = Axios.create({
  baseURL: `http://${manifest.debuggerHost.split(":").shift()}:8000`,
});

export default axios;

//"http://24.139.155.154:8000"
