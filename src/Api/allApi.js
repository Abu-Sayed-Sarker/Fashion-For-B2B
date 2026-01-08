import { api } from "./api";

const allApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllFashion: builder.query({
      query: () => "fashion/techpacks/table/",
      providesTags: ["fashion"],
    }),
    createFashionId: builder.mutation({
      query: () => ({
        url: "fashion/techpacks/",
        method: "POST",
      }),
      invalidatesTags: ["fashion"],
    }),
    createFashionByIdAndStep: builder.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data.id}/steps/${data.step}/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["fashion"],
    }),
    getFashionById: builder.query({
      query: (id) => `fashion/techpacks/${id}/export/`,
    }),
    updateFashionById: builder.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data.parentId}/steps/update/${data.stepsId}/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["fashion"],
    }),
  }),
});

export const {
  useGetAllFashionQuery,
  useCreateFashionIdMutation,
  useCreateFashionByIdAndStepMutation,
  useGetFashionByIdQuery,
  useUpdateFashionByIdMutation,
} = allApi;
