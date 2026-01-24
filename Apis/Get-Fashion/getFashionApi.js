import { api } from "../api";
const getFashionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllFashionTechpacks: build.query({
      query: () => "fashion/techpacks/table/",
        providesTags: ["fashionTechpacks"]
    }),
  }),
});

export const { useGetAllFashionTechpacksQuery } = getFashionApi;