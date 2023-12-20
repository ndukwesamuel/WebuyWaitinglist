
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const Base_URL = process.env.REACT_APP_Url;

// Async action to fetch category options from an API
export const fetchCategoryOptions = createAsyncThunk(
  "categoryOptions/fetchCategoryOptions",
  async (data) => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to fetch categories
      let api_url = Base_URL;
      const response = await axios.get(api_url, data);
      return response.data; // Assuming the API response contains an array of category options
    } catch (error) {
      throw error;
    }
  }
);

const initialState = [
  { value: "", label: "category", disabled: true, hidden: true },
  { value: "computers", label: "computers" },
  { value: "groceries", label: "groceries" },
  {date:    null},
];

const categoryOptionsSlice = createSlice({
  name: "categoryOptions",
  initialState,
  reducers: {
    setCategoryOptions: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the result of fetchCategoryOptions
    builder.addCase(fetchCategoryOptions.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setCategoryOptions } = categoryOptionsSlice.actions;
export default categoryOptionsSlice.reducer;
