import { api } from "./api";

const allApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllFashion: builder.query({
      query: () => "fashion/techpacks/table/",
      providesTags: ["fashion"],
    }),
    createFashion: builder.mutation({
      query: (body) => ({
        url: "fashion/techpacks/table/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["fashion"],
    }),
    getSingleFashion: builder.query({
      query: (id) => `fashion/techpacks/table/${id}/`,
      providesTags: ["fashion"],
    }),
    updateFashion: builder.mutation({
      query: (body) => ({
        url: `fashion/techpacks/table/${body.id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["fashion"],
    }),
  }),
});

export const { useGetAllFashionQuery } = allApi;
