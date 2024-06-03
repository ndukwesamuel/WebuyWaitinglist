import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const Base_URL = `${process.env.REACT_APP_Url}user/register`;
console.log("baseUrl", Base_URL);

const tokengot = localStorage.getItem("token");

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  data: null,
};
const RegisterFunService = async (data) => {
  let api_url = Base_URL;
  const response = await axios.post(api_url, data);
  return response.data;
};

export const RegisterFun = createAsyncThunk(
  "Authentication/register",
  async (data, thunkAPI) => {
    try {
      return await RegisterFunService(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.response.data.error ||
        error.response.data.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const Auth = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(RegisterFun.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterFun.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.registereduser = action.payload;
        state.message = action.payload;
        toast.success(`${state.message.message}`, {
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
      .addCase(RegisterFun.rejected, (state, action) => {
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

// const Login_fun_Service = async (data) => {
//   console.log({ data });
//   try {
//     console.log(data);
//     const response = await axios.post(Base_URL, data);

//     console.log(response.data);

//     return response.data;
//     // Process the response data here
//   } catch (error) {
//     console.error(error);
//     // Handle the error here
//   }
// };

// export const Login_fun = createAsyncThunk(
//   "Auth/Login_fun",
//   async (data, thunkAPI) => {
//     try {
//       return await Login_fun_Service(data);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const Auth = createSlice({
//   name: "Auth",
//   initialState,

//   reducers: {
//     resetSignup: (state) => initialState,
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(Login_fun.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(Login_fun.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.data = action.payload;
//       })
//       .addCase(Login_fun.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       });
//   },
// });

export const { resetSignup } = Auth.actions;
export default Auth.reducer;
