import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// REACT_APP_Local;
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_Local,
    // prepareHeaders: (headers, { getState }) => {
    //   // Add your token to the headers
    //   const token = getState().reducer.AuthenticationSlice.data.data?.token;
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "products",
    }),
    // getProduct: builder.query({
    //   query: (id) => `product/${id}`,
    // }),
  }),
});

export const { useGetAllProductQuery } = productApi;
