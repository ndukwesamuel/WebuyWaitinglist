// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ErrorFunc } from "../utilities/ApiErrorFun";

// let main_url = process.env.REACT_APP_Url;
// const initialState = {
//   Admin_get_all_recipte: null,
//   Admin_get_all_recipte_isError: false,
//   Admin_get_all_recipte_isSuccess: false,
//   Admin_get_all_recipte_isLoading: false,
//   Admin_get_all_recipte_message: null,

//   Admin_get_single_recipte: null,
//   Admin_get_single_recipte_isError: false,
//   Admin_get_single_recipte_isSuccess: false,
//   Admin_get_single_recipte_isLoading: false,
//   Admin_get_single_recipte_message: null,
// };

// const Admin_get_all_recipte_fun_Service = async (token) => {
//   let Base_URL = main_url + "wallet/receipt";

//   try {
//     const response = await axios.get(Base_URL, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//     // Process the response data here
//   } catch (error) {
//     toast.error(`${error}`, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       className: "Forbidden403",
//     });
//     // Handle the error here

//     ErrorFunc(error);
//     throw error;
//   }
// };

// export const Admin_get_all_recipte_fun_ = createAsyncThunk(
//   "AdminRecipteSLice/Admin_get_all_recipte_fun_",
//   async (_, thunkAPI) => {
//     try {
//       let token = thunkAPI.getState().reducer.AuthenticationSlice.data.token;

//       return await Admin_get_all_recipte_fun_Service(token);
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

// const Admin_get_single_recipte_fun_Service = async (id, token) => {
//   let Base_URL = main_url + `wallet/receipt/${id}`;

//   try {
//     const response = await axios.get(Base_URL, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log({
//       qqwww: response.data,
//     });

//     // return response.data;
//     // Process the response data here
//   } catch (error) {
//     toast.error(`${error}`, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       className: "Forbidden403",
//     });
//     // Handle the error here

//     ErrorFunc(error);
//     throw error;
//   }
// };

// export const Admin_get_single_recipte_fun = createAsyncThunk(
//   "AdminRecipteSLice/Admin_get_single_recipte_fun",
//   async (id, thunkAPI) => {
//     try {
//       let token = thunkAPI.getState().reducer.AuthenticationSlice.data.token;

//       return await Admin_get_single_recipte_fun_Service(id, token);
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

// export const AdminRecipteSLice = createSlice({
//   name: "AdminRecipteSLice",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(Admin_get_all_recipte_fun_.pending, (state) => {
//         state.Admin_get_all_recipte_isLoading = true;
//       })
//       .addCase(Admin_get_all_recipte_fun_.fulfilled, (state, action) => {
//         state.Admin_get_all_recipte_isLoading = false;
//         state.Admin_get_all_recipte_isSuccess = true;
//         state.Admin_get_all_recipte = action.payload;
//       })
//       .addCase(Admin_get_all_recipte_fun_.rejected, (state, action) => {
//         state.Admin_get_all_recipte_isLoading = false;
//         state.Admin_get_all_recipte_isError = true;
//         state.Admin_get_all_recipte_message = action.payload;
//         toast.error(`${state.Admin_get_all_recipte_message}`, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//       })

//       .addCase(Admin_get_single_recipte_fun.pending, (state) => {
//         state.Admin_get_single_recipte_isLoading = true;
//       })
//       .addCase(Admin_get_single_recipte_fun.fulfilled, (state, action) => {
//         state.Admin_get_single_recipte_isLoading = false;
//         state.Admin_get_single_recipte_isSuccess = true;
//         state.Admin_get_single_recipte = action.payload;
//       })
//       .addCase(Admin_get_single_recipte_fun.rejected, (state, action) => {
//         state.Admin_get_single_recipte_isLoading = false;
//         state.Admin_get_single_recipte_isError = true;
//         state.Admin_get_single_recipte_message = action.payload;
//         toast.error(`${state.Admin_get_single_recipte_message}`, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//   }),
// });

// // Action creators are generated for each case reducer function
// export const {} = AdminRecipteSLice.actions;

// export default AdminRecipteSLice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorFunc } from "../utilities/ApiErrorFun";

let main_url = process.env.REACT_APP_Url;
const initialState = {
  Admin_get_all_recipte: null,
  Admin_get_all_recipte_isError: false,
  Admin_get_all_recipte_isSuccess: false,
  Admin_get_all_recipte_isLoading: false,
  Admin_get_all_recipte_message: null,

  Admin_get_single_recipte: null,
  Admin_get_single_recipte_isError: false,
  Admin_get_single_recipte_isSuccess: false,
  Admin_get_single_recipte_isLoading: false,
  Admin_get_single_recipte_message: null,
};

const Admin_get_all_recipte_fun_Service = async (token) => {
  let Base_URL = main_url + "wallet/receipt";

  try {
    const response = await axios.get(Base_URL, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
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

    // Handle the error here
    ErrorFunc(error);
    throw error;
  }
};

export const Admin_get_all_recipte_fun_ = createAsyncThunk(
  "AdminRecipteSLice/Admin_get_all_recipte_fun_",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().reducer.AuthenticationSlice.data.token;

      return await Admin_get_all_recipte_fun_Service(token);
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

const Admin_get_single_recipte_fun_Service = async (id, token) => {
  let Base_URL = main_url + `wallet/receipt/${id}`;

  try {
    const response = await axios.get(Base_URL, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
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

    // Handle the error here
    ErrorFunc(error);
    throw error;
  }
};

export const Admin_get_single_recipte_fun = createAsyncThunk(
  "AdminRecipteSLice/Admin_get_single_recipte_fun",
  async (id, thunkAPI) => {
    try {
      let token = thunkAPI.getState().reducer.AuthenticationSlice.data.token;

      return await Admin_get_single_recipte_fun_Service(id, token);
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

export const AdminRecipteSLice = createSlice({
  name: "AdminRecipteSLice",
  initialState,
  reducers: {
    AdminRecipteSLice_reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(Admin_get_all_recipte_fun_.pending, (state) => {
        state.Admin_get_all_recipte_isLoading = true;
      })
      .addCase(Admin_get_all_recipte_fun_.fulfilled, (state, action) => {
        state.Admin_get_all_recipte_isLoading = false;
        state.Admin_get_all_recipte_isSuccess = true;
        state.Admin_get_all_recipte = action.payload;
      })
      .addCase(Admin_get_all_recipte_fun_.rejected, (state, action) => {
        state.Admin_get_all_recipte_isLoading = false;
        state.Admin_get_all_recipte_isError = true;
        state.Admin_get_all_recipte_message = action.payload;
        toast.error(`${state.Admin_get_all_recipte_message}`, {
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

      .addCase(Admin_get_single_recipte_fun.pending, (state) => {
        state.Admin_get_single_recipte_isLoading = true;
      })
      .addCase(Admin_get_single_recipte_fun.fulfilled, (state, action) => {
        state.Admin_get_single_recipte_isLoading = false;
        state.Admin_get_single_recipte_isSuccess = true;
        state.Admin_get_single_recipte = action.payload;
      })
      .addCase(Admin_get_single_recipte_fun.rejected, (state, action) => {
        state.Admin_get_single_recipte_isLoading = false;
        state.Admin_get_single_recipte_isError = true;
        state.Admin_get_single_recipte_message = action.payload;
        toast.error(`${state.Admin_get_single_recipte_message}`, {
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
export const { AdminRecipteSLice_reset } = AdminRecipteSLice.actions;

export default AdminRecipteSLice.reducer;
