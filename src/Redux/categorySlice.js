import axios from "axios";
import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const Base_URL = process.env.REACT_APP_Url;

const initialState = {
  category_data: null,
  category_isError: false,
  category_isLoading: false,
  category_isSuccess: false,
  category_message: null,
};

const Category_fun_Service = async (token) => {
  let API_URL = `${Base_URL}category`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  // console.log(response.data, "category response");
  return response.data;
};

export const Category_fun = createAsyncThunk(
  "CategorySlice/Category_fun",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().reducer.AuthenticationSlice.data.token;
      console.log(token, "token here");
      if (!token) {
        throw new Error("Token is not available");
      }
      return await Category_fun_Service(token);
    } catch (error) {
      console.log(error, "category slice error");
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.msg ||
        error.response?.data?.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(Category_fun.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Category_fun.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(Category_fun.rejected, (state, action) => {
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
export const {} = CategorySlice.actions;

export default CategorySlice.reducer;
