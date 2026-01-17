const { api } = require("../api");

const newApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllData: build.query({
      query: () => "profiles/",
    }),
  }),
});

export const { useGetAllDataQuery } = newApi;
