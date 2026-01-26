const { api } = require("../api");

const postAFashionApi = api.injectEndpoints({
  endpoints: (build) => ({
    createInitialFashionLibrary: build.mutation({
      query: (data) => ({
        url: "fashion/techpacks/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["fashionLibrary"],
    }),
    ////////// Garment Setup //////////
    postGarmentSetup: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-1/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["garmentSetup"],
    }),
    updateGarmentSetup: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-1/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["garmentSetup"],
    }),
    ////////// Included Materials //////////
    includedMaterials: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-2/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedMaterials"],
    }),
    updateIncludedMaterials: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-2/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["includedMaterials"],
    }),
    ////////// Included Fabrics //////////
    includedFabrics: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-3/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedFabrics"],
    }),
    updateFabrics: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-3/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["includedFabrics"],
    }),
    ////////// Included Trims //////////
    includedTrims: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-4/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedTrims"],
    }),
    updateTrims: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-4/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["includedTrims"],
    }),
  }),
});

export const {
  useCreateInitialFashionLibraryMutation,
  usePostGarmentSetupMutation,
  useUpdateGarmentSetupMutation,
  useIncludedMaterialsMutation,
  useUpdateIncludedMaterialsMutation,
  useIncludedFabricsMutation,
  useUpdateFabricsMutation,
  useIncludedTrimsMutation,
  useUpdateTrimsMutation,
} = postAFashionApi;
