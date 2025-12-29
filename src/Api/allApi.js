import { api } from "./api";

const allApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllFashion: builder.query({
      query: () => "fashion/techpacks/table/",
      providesTags: ["fashion"],
    }),
    createFashion: builder.mutation({
      query: (body) => ({
        url: "fashion/techpack/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["fashion"],
    }),
    getSingleFashion: builder.query({
      query: (id) => `fashion/techpack/?id=${id}`,
      providesTags: ["fashion"],
    }),
    updateFashion: builder.mutation({
      query: (body) => ({
        url: `fashion/techpack/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["fashion"],
    }),
  }),
});

export const { useGetAllFashionQuery } = allApi;
