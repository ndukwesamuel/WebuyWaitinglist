import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const Base_URL = process.env.REACT_APP_Url;

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  data: null,
};

const Category_fun_Service = async (token) => {
  let API_URL = `${Base_URL}category`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  console.log({ ss: response.data });

  return response.data;
};

export const Category_fun = createAsyncThunk(
  "ProductSlice/Category_fun",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().reducer.AuthenticationSlice.data.token;
      return await Category_fun_Service(token);
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

export const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

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
export const {} = CategorySlice.actions;

export default CategorySlice.reducer;
