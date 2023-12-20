import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const passwordResetApi = createApi({
  reducerPath: "passwordRestApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_Url }),
  endpoints: (builder) => ({
    reqPasswordReset: builder.mutation({
      query: (data) => ({
        url: "user/passwordResetEmail",
        method: "POST",
        body: data,
      }),
    }),
    PasswordReset: builder.mutation({
      query: (data) => ({
        url: "user/resetPassword",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useReqPasswordResetMutation, usePasswordResetMutation } =
  passwordResetApi;
