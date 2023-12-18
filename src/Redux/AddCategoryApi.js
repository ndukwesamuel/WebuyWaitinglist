import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const main_url = process.env.REACT_APP_Url;// Replace with your actual API base URL

export const addCategoryApi = createAsyncThunk(
  "category/addCategory",
  async (categoryData, { getState }) => {
    const token = getState().Auth.token; // Assuming Auth slice contains the token
    const addCategory_url = `${main_url}categories`; // Replace with your actual add categories endpoint

    try {
      const response = await axios.post(addCategory_url, categoryData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
