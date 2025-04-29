import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_Local + "fund_wallet",
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
      query: () => "/history",
    }),
    fundWallet: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
    // getProduct: builder.query({
    //   query: (id) => `product/${id}`,
    // }),
  }),
});

export const { useFundWalletMutation, useGetTransactionHistoryQuery } =
  walletApi;
