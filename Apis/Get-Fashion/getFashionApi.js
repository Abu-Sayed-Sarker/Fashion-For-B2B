import { api } from "../api";
const getFashionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllFashionTechpacks: build.query({
      query: () => "fashion/techpacks/table/",
      providesTags: ["fashionTechpacks"],
    }),
    getFashionTechpackById: build.query({
      query: (techpack_id) => `fashion/techpacks/${techpack_id}/export/`,
      providesTags: ["fashionTechpacks"],
    }),
    deleteFashionTechpack: build.mutation({
      query: (techpack_id) => ({
        url: `/fashion/techpacks/delete/${techpack_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["fashionTechpacks"],
    }),
    cloneFashionTechpack: build.mutation({
      query: (techpack_id) => ({
        url: `/fashion/techpacks/${techpack_id}/clone/`,
        method: "POST",
      }),
      invalidatesTags: ["fashionTechpacks"],
    }),
  }),
});

export const {
  useGetAllFashionTechpacksQuery,
  useGetFashionTechpackByIdQuery,
  useDeleteFashionTechpackMutation,
  useLazyGetFashionTechpackByIdQuery,
  useCloneFashionTechpackMutation,
} = getFashionApi;
