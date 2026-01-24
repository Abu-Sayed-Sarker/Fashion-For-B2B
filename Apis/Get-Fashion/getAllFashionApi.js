import { api } from "../api";
const getAllFashionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllFashionTechpacks: build.query({
      query: () => "fashion/techpacks/table/",
        providesTags: ["fashionTechpacks"]
    }),
  }),
});

export const { useGetAllFashionTechpacksQuery } = getAllFashionApi;