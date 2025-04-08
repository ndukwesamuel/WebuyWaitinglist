import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_Local + "cart/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.reducer?.AuthenticationSlice?.data?.data?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "",
    }),
    addToCart: builder.mutation({
      query: (productId) => ({
        url: `addItem?productId=${productId}`,
        method: "GET",
      }),
    }),
    decreaseItem: builder.mutation({
      query: (productId) => ({
        url: `decreaseItem?productId=${productId}`,
        method: "GET",
      }),
    }),
    deleteItem: builder.mutation({
      query: (productId) => ({
        url: `deleteItem?productId=${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useDecreaseItemMutation,
  useDeleteItemMutation,
} = cartApi;
