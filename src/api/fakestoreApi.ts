import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/product";

export const fakestoreApi = createApi({
  reducerPath: "fakestoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  tagTypes: ["Products", "Categories"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      keepUnusedDataFor: 300,
      providesTags: ["Products"],
    }),

    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      keepUnusedDataFor: 300,
      providesTags: (_, __, id) => [{ type: "Products", id }],
    }),

    getCategories: builder.query<string[], void>({
      query: () => "products/categories",
      keepUnusedDataFor: 3600,
      providesTags: ["Categories"],
    }),

    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `products/category/${encodeURIComponent(category)}`,
      keepUnusedDataFor: 300,
      providesTags: (_, __, category) => [{ type: "Products", id: category }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = fakestoreApi;
