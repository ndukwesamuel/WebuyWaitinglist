import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
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
    getUserOrder: builder.query({
      query: () => "orders/user-order",
    }),
  }),
});

export const groupOrderApi = createApi({
  reducerPath: "groupOrderApi",
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
    getGroupOrder: builder.query({
      query: () => "history/all-group",
    }),
  }),
});

export const { useGetGroupOrderQuery } = groupOrderApi;

export const { useGetUserOrderQuery } = orderApi;
