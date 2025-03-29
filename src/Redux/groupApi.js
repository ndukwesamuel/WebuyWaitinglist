import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupApi = createApi({
  reducerPath: "groupApi",
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
    getAllGroups: builder.query({
      query: () => "group/all",
    }),
  }),
});

export const { useGetAllGroupsQuery } = groupApi;
