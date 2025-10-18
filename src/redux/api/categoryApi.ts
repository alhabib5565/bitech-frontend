import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (params) => ({
        url: "/categories",
        params,
      }),
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
