import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// const Base_URL = `${process.env.REACT_APP_Local}/user/register`;

const Base_URL = `https://webuyam.onrender.com/api/user/register`;

const tokengot = localStorage.getItem("token");

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  data: null,
};

const Login_fun_Service = async (data) => {
  console.log({ data });
  try {
    console.log(data);
    const response = await axios.post(Base_URL, data);

    console.log(response.data);

    return response.data;
    // Process the response data here
  } catch (error) {
    console.error(error);
    // Handle the error here
  }
};

export const Login_fun = createAsyncThunk(
  "Auth/Login_fun",
  async (data, thunkAPI) => {
    try {
      return await Login_fun_Service(data);
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

export const Auth = createSlice({
  name: "Auth",
  initialState,

  reducers: {
    resetSignup: (state) => initialState,
  },

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
      });
  },
});

export const { resetSignup } = Auth.actions;
export default Auth.reducer;
