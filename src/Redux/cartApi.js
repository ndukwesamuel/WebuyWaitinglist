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
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (productId) => ({
        url: `addItem?productId=${productId}`,
        method: "GET",
      }),
      invalidatesTags: ["Cart"],
    }),
    decreaseItem: builder.mutation({
      query: (productId) => ({
        url: `decreaseItem?productId=${productId}`,
        method: "GET",
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteItem: builder.mutation({
      query: (productId) => ({
        url: `deleteItem`,
        method: "DELETE",
        body: { productId },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useDecreaseItemMutation,
  useDeleteItemMutation,
} = cartApi;
export const selectCartItemCount = (state) => {
  const cartData = state.cartApi.queries["getCart(undefined)"]?.data;
  return cartData?.userCart?.items?.length || 0;
};
