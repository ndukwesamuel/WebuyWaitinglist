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

  All_User_orders_isError: false,
  All_User_orders_isSuccess: false,
  All_User_orders_isLoading: false,
  All_User_orders_message: null,
  All_User_orders: null,
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
      let token =
        thunkAPI.getState().reducer.AuthenticationSlice.data.data?.token;
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

const Payment_fun_Service = async (paynow, token) => {
  let data = {
    orderItems: [
      {
        quantity: 10,
        product: "656ec883a71f3b20c1b70341",
      },
    ],
    shippingAddress1: "aquinas college",
    shippingAddress2: "hospital road ",
    city: "lagos",
    zip: "00000",
    country: "Nigeria",
    phone: "123456",
  };

  let API_URL = `${Base_URL}orders`;
  console.log({ token, API_URL });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, paynow, config);

  let paymenturl = `${Base_URL}checkout/payment`;
  let payment_Data = {
    firstname: "samheart",
    lastname: "Adewobi",
    email: "sam@mail.com",
    amount: "5000",
  };
  const response2 = await axios.post(paymenturl, payment_Data, config);
  let newpaydata = JSON.parse(response2?.data);
  console.log({ newpaydata: newpaydata });
  const { authorization_url } = newpaydata?.data;
  console.log({ authorization_url });

  let paymenturl_authorization_url = `${authorization_url}`;
  console.log({ paymenturl_authorization_url });

  window.location.href = paymenturl_authorization_url;

  return;
};
export const Payment_fun = createAsyncThunk(
  "PaymentSlice/Payment_fun",
  async (paynow, thunkAPI) => {
    try {
      let token =
        thunkAPI.getState().reducer.AuthenticationSlice.data.data?.token;
      return await Payment_fun_Service(paynow, token);
    } catch (error) {
      console.log({ error });
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

export const PaymentSlice = createSlice({
  name: "PaymentSlice",
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
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = PaymentSlice.actions;

export default PaymentSlice.reducer;
