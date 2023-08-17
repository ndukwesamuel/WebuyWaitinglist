import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Base_URL = "https://webuyam.onrender.com/api/user/register";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  data: null,
};

const Login_fun_Service = async (data) => {
  try {
    const response = await axios.post(Base_URL, data.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(response.data);

    return response.data;
    // Process the response data here
  } catch (error) {
    console.error(error);
    // Handle the error here
  }
};

export const Login_fun = createAsyncThunk(
  "AutenticationSlice/Login_fun",
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

export const AutenticationSlice = createSlice({
  name: "AutenticationSlice",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
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

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
  AutenticationSlice.actions;

export default AutenticationSlice.reducer;
