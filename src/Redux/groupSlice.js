import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorFunc } from "../utilities/ApiErrorFun";

// let main_url = process.env.REACT_APP_Url;
let main_url = process.env.REACT_APP_Local;
const initialState = {
  get_all_group_isError: false,
  get_all_group_isSuccess: false,
  get_all_group_isLoading: false,
  get_all_group_message: null,
  get_all_group: null,
};

const getallGroup_fun_Service = async (token) => {
  let Base_URL = main_url + "group";

  try {
    const response = await axios.get(Base_URL, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
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

export const getallGroup_fun = createAsyncThunk(
  "groupSlice/getallGroup_fun",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().reducer.AutenticationSlice.data.token;

      return await getallGroup_fun_Service(token);
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

export const groupSlice = createSlice({
  name: "groupSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getallGroup_fun.pending, (state) => {
        state.get_all_group_isLoading = true;
      })
      .addCase(getallGroup_fun.fulfilled, (state, action) => {
        state.get_all_group_isLoading = false;
        state.get_all_group_isSuccess = true;
        state.get_all_group = action.payload;
      })
      .addCase(getallGroup_fun.rejected, (state, action) => {
        state.get_all_group_isLoading = false;
        state.get_all_group_isError = true;
        state.get_all_group_message = action.payload;
        toast.error(`${state.get_all_group_message}`, {
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
export const {} = groupSlice.actions;

export default groupSlice.reducer;
