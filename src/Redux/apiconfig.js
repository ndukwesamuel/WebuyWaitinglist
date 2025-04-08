import axios from "axios";

export const ApiConfig = (getState) => {
  const token = getState()?.reducer?.AuthenticationSlice?.data?.data?.token;

  return axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_Url,
    timeout: 200000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export const ApiConfigFormData = (getState) => {
  const token = getState()?.reducer?.AuthenticationSlice?.data?.data?.token;

  return axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_Url,
    timeout: 200000,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
