import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_Url,
    prepareHeaders: (headers, { getState }) => {
      // Add your token to the headers
      const token = getState().reducer.AuthenticationSlice.data.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "category",
    }),
    // getProduct: builder.query({
    //   query: (id) => `product/${id}`,
    // }),
  }),
});

export const { useGetCategoryQuery } = categoryApi;
