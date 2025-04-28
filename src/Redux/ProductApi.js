import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// REACT_APP_Local;
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_Local,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().reducer.AuthenticationSlice.data.data?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: ({ page, limit }) => `products?page=${page}&limit=${limit}`,
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    //Combo products
    getComboProducts: builder.query({
      query: () => "combo",
    }),
    getComboProductById: builder.query({
      query: (id) => `combo/${id}`,
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductQuery,
  useGetComboProductsQuery,
  useGetComboProductByIdQuery,
} = productApi;
