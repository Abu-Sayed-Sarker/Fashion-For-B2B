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
    ////////// Construction Details //////////

    includedConstructionDetails: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-5/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedConstructionDetails"],
    }),
    updateConstructionDetails: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-5/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["includedConstructionDetails"],
    }),
    ////////// Artwork Placement //////////

    includedArtworkPlacement: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-6/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedArtworkPlacement"],
    }),
    updateArtworkPlacement: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-6/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["includedArtworkPlacement"],
    }),
    ////////// Bill of Materials //////////
    includedBillOfMaterials: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-7/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedBillOfMaterials"],
    }),
    updateBillOfMaterials: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-7/`,
        method: "PATCH",
        body: data.data,  
      }),
      invalidatesTags: ["includedBillOfMaterials"],
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
  useIncludedConstructionDetailsMutation,
  useUpdateConstructionDetailsMutation,
  useIncludedArtworkPlacementMutation,
  useUpdateArtworkPlacementMutation,
  useIncludedBillOfMaterialsMutation,
  useUpdateBillOfMaterialsMutation,
} = postAFashionApi;
