import axios from "axios";
export const ApiConfig = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    timeout: 200000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const ApiConfigFormData = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    timeout: 200000,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
