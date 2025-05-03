import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = import.meta.env.VITE_APP_Local + "orders";
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
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
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
    getUserOrder: builder.query({
      query: ({ page, limit }) => `/user-order?page=${page}&limit=${limit}`,
    }),
  }),
});

export const groupOrderApi = createApi({
  reducerPath: "groupOrderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
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
    getGroupOrder: builder.query({
      query: () => "history/all-group",
    }),
    getRevenue: builder.query({
      query: () => "history/revenues",
    }),
  }),
});

export const { useGetGroupOrderQuery, useGetRevenueQuery } = groupOrderApi;

export const { useGetUserOrderQuery, useCreateOrderMutation } = orderApi;
