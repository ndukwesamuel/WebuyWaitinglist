import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorFunc } from "../utilities/ApiErrorFun";
import Category from "../Page/Admin/Category";

const Base_URL = process.env.REACT_APP_Url;

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  AllProductData: null,

  cart_isError: false,
  cart_isSuccess: false,
  cart_isLoading: false,
  cart_message: null,
  cart_data: null,

  userOrders_isError: false,
  userOrders_isSuccess: false,
  userOrders_isLoading: false,
  userOrders_message: null,
  userOrders_data: null,

  category_data: null,
  category_isError: false,
  category_isLoading: false,
  category_isSuccess: false,
  category_message: null,
};

const GetUSerCart_Fun_Service = async (token) => {
  let url = `${Base_URL}cart`;

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(url, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetUSerCart_Fun = createAsyncThunk(
  "ProductSlice/GetUSerCart_Fun",
  async (_, thunkAPI) => {
    try {
      let token =
        thunkAPI.getState()?.reducer?.AuthenticationSlice?.data?.data?.token;
      return await GetUSerCart_Fun_Service(token);
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

const AllProduct_fun_Service = async (token) => {
  let API_URL = `${Base_URL}products`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};
export const AllProduct_fun = createAsyncThunk(
  "ProductSlice/AllProduct_fun",
  async (_, thunkAPI) => {
    try {
      let token =
        thunkAPI.getState().reducer.AuthenticationSlice.data.data?.token;
      return await AllProduct_fun_Service(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.msg ||
        error.response.data.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const UserOrders_fun_Service = async (token) => {
  let API_URL = `${Base_URL}orders/user-order`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};
export const UserOrders_fun = createAsyncThunk(
  "ProductSlice/UserOrders_fun",
  async (_, thunkAPI) => {
    try {
      let token =
        thunkAPI.getState().reducer.AuthenticationSlice.data.data?.token;
      return await UserOrders_fun_Service(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.msg ||
        error.response.data.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const Category_fun_Service = async (token) => {
  let API_URL = `${Base_URL}category`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

export const Category_fun = createAsyncThunk(
  "ProductSlice/Category_fun",
  async (_, thunkAPI) => {
    try {
      let token =
        thunkAPI.getState().reducer.AuthenticationSlice.data.data?.token;
      return await Category_fun_Service(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.msg ||
        error.response.data.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(AllProduct_fun.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllProduct_fun.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.AllProductData = action.payload;
      })
      .addCase(AllProduct_fun.rejected, (state, action) => {
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
      })
      .addCase(GetUSerCart_Fun.pending, (state) => {
        state.cart_isLoading = true;
      })
      .addCase(GetUSerCart_Fun.fulfilled, (state, action) => {
        state.cart_isLoading = false;
        state.cart_isSuccess = true;
        state.cart_data = action.payload;
      })
      .addCase(GetUSerCart_Fun.rejected, (state, action) => {
        state.cart_isLoading = false;

        state.cart_isError = true;
        state.cart_message = action.payload;
        toast.error(`${state.cart_message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })

      .addCase(UserOrders_fun.pending, (state) => {
        state.userOrders_isLoading = true;
      })
      .addCase(UserOrders_fun.fulfilled, (state, action) => {
        state.userOrders_isLoading = false;
        state.userOrders_isSuccess = true;
        state.userOrders_data = action.payload;
      })
      .addCase(UserOrders_fun.rejected, (state, action) => {
        state.userOrders_isLoading = false;

        state.userOrders_isError = true;
        state.userOrders_message = action.payload;
        toast.error(`${state.userOrders_message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })

      .addCase(Category_fun.pending, (state) => {
        state.category_isLoading = true;
      })
      .addCase(Category_fun.fulfilled, (state, action) => {
        state.category_isLoading = false;
        state.category_isSuccess = true;
        state.category_data = action.payload;
      })
      .addCase(Category_fun.rejected, (state, action) => {
        state.category_isLoading = false;

        state.category_isError = true;
        state.category_message = action.payload;
        toast.error(`${state.category_message}`, {
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
export const {} = ProductSlice.actions;

export default ProductSlice.reducer;
