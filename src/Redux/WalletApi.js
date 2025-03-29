import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_Url,
    prepareHeaders: (headers, { getState }) => {
      // Add your token to the headers
      const token = getState().reducer.AuthenticationSlice.data.data?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTransactionHistory: builder.query({
      query: () => "wallet/history",
    }),
    // getProduct: builder.query({
    //   query: (id) => `product/${id}`,
    // }),
  }),
});

export const { useGetTransactionHistoryQuery } = walletApi;
