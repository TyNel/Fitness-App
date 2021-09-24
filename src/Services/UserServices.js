import axios from "axios";

const onLogin = (payload) => {
  const config = {
    method: "POST",
    url: "https://localhost:5001/api/fitness/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export default onLogin;
