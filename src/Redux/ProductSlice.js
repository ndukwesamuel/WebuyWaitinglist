import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorFunc } from "../utilities/ApiErrorFun";

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

    console.log({ response: response.data });

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
        thunkAPI.getState()?.reducer?.AuthenticationSlice?.data?.token;
      console.log({ token });
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

const Profile_fun_Service = async (data, token) => {
  let profile_url = Base_URL + "user/profile";

  try {
    const response = await axios.get(profile_url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
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
    throw error;

    // Handle the error here
  }
};
const ProfileUpdate_fun_Service = async (data, token) => {
  let profile_url = Base_URL + "user/profile";

  try {
    const response = await axios.put(profile_url, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
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
    throw error;

    // Handle the error here
  }
};

export const Profile_fun = createAsyncThunk(
  "AuthenticationSlice/Profile_fun",
  async (data, thunkAPI) => {
    try {
      let token = thunkAPI.getState().reducer.AuthenticationSlice.data.token;
      return await Profile_fun_Service(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.msg ||
        error.response.data.message ||
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
      let token = thunkAPI.getState().reducer.AuthenticationSlice.data.token;
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

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(Profile_fun.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Profile_fun.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(Profile_fun.rejected, (state, action) => {
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
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = ProductSlice.actions;

export default ProductSlice.reducer;
