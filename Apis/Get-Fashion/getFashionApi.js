import { api } from "../api";
const getFashionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllFashionTechpacks: build.query({
      query: () => "fashion/techpacks/table/",
        providesTags: ["fashionTechpacks"]
    }),
    getFashionTechpackById: build.query({
      query: (techpack_id) => `fashion/techpacks/${techpack_id}/export/`,
      providesTags: ["fashionTechpacks"]
    }),
  }),
});

export const { useGetAllFashionTechpacksQuery, useGetFashionTechpackByIdQuery } = getFashionApi;