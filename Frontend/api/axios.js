import Axios from "axios";

// The base url is "http://10.0.2.2" because in our android simulator
// we cannot reach "http://localhost" directly.
const axios = Axios.create({ baseURL: "http://10.0.2.2:8000" });

export default axios;
