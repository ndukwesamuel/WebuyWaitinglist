import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorFunc } from "../utilities/ApiErrorFun";

let main_url = process.env.REACT_APP_Url;
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  data: null,
  logout: null,
};

const Logout_fun_Service = async (data, token) => {
  let log_outurl = main_url + "user/logout";

  try {
    const response = await axios.get(log_outurl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(`${response.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // return response.data;
    // Process the response data here
  } catch (error) {
    toast.error(`${error}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "Forbidden403",
    });
    throw error;

    // Handle the error here
  }
};

export const Logout_fun = createAsyncThunk(
  "AuthenticationSlice/Logout_fun",
  async (data, thunkAPI) => {
    try {
      let token = thunkAPI.getState().reducer.AuthenticationSlice.data.token;
      return await Logout_fun_Service(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const Login_fun_Service = async (data) => {
  let Base_URL = main_url + "user/login";

  try {
    const response = await axios.post(Base_URL, data);
    // toast.success(`${response.data?.message}`, {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
    return response.data;
    // Process the response data here
  } catch (error) {
    // toast.error(`${error}`, {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   className: "Forbidden403",
    // });
    // Handle the error here

    throw error;
  }
};

export const Login_fun = createAsyncThunk(
  "AuthenticationSlice/Login_fun",
  async (data, thunkAPI) => {
    try {
      return await Login_fun_Service(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.msg ||
        error.response.data.msg ||
        error.response.data.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const AuthenticationSlice = createSlice({
  name: "AuthenticationSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(Login_fun.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Login_fun.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(Login_fun.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`${state.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
