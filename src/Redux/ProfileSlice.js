import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorFunc } from "../utilities/ApiErrorFun";

// let main_url = process.env.REACT_APP_Url;
let main_url = process.env.REACT_APP_Local;
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  data: null,
};

const Profile_fun_Service = async (data, token) => {
  let profile_url = main_url + "user/profile";

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
  let profile_url = main_url + "user/profile";

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
    throw error;
  }
};
const ProfileImage_fun_Service = async (data, token) => {
  let profile_url = main_url + "user/upload-image";

  try {
    const response = await axios.put(profile_url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
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

export const ProfileUpdate_fun = createAsyncThunk(
  "AuthenticationSlice/ProfileUpdate_fun",
  async (data, thunkAPI) => {
    try {
      let token = thunkAPI.getState().reducer.AuthenticationSlice.data.token;
      return await ProfileUpdate_fun_Service(data, token);
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
export const ProfileImage_fun = createAsyncThunk(
  "AuthenticationSlice/ProfileImage_fun",
  async (data, thunkAPI) => {
    try {
      let token = thunkAPI.getState().reducer.AuthenticationSlice.data.token;
      return await ProfileImage_fun_Service(data, token);
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

export const ProfileSlice = createSlice({
  name: "ProfileSlice",
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
      .addCase(ProfileUpdate_fun.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ProfileUpdate_fun.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(ProfileUpdate_fun.rejected, (state, action) => {
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
      .addCase(ProfileImage_fun.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ProfileImage_fun.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(ProfileImage_fun.rejected, (state, action) => {
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
export const {} = ProfileSlice.actions;

export default ProfileSlice.reducer;
