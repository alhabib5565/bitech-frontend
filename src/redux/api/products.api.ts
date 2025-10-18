import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    editProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    getAllProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params,
      }),
      providesTags: ["products"],
    }),
    searchProduct: builder.query({
      query: (searchText) => ({
        url: `/products/search?searchedText=${searchText}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
});

export const {
  useSearchProductQuery,
  useCreateProductMutation,
  useGetAllProductsQuery,
  useEditProductMutation,
} = productApi;
