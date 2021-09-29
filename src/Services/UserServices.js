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

const onRegister = (payload) => {
  const config = {
    method: "POST",
    url: "https://localhost:5001/api/fitness",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getExerciseData = (id) => {
  const config = {
    method: "GET",
    url: `https://localhost:5001/api/fitness/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

const getExercisesByDate = (id, date) => {
  const config = {
    method: "GET",
    url: `https://localhost:5001/api/fitness/${id}/${date}`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export { onLogin, getExerciseData, onRegister, getExercisesByDate };
