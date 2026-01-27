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
    getGarmentSetup: build.query({
      query: (techpack_id) => `fashion/techpacks/${techpack_id}/step-1/`,
      providesTags: ["garmentSetup"],
    }),
    postGarmentSetup: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-1/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["garmentSetup", "fashionTechpacks"],
    }),
    updateGarmentSetup: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-1/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["garmentSetup", "fashionTechpacks"],
    }),
    ////////// Included Materials //////////
    getIncludedMaterials: build.query({
      query: (techpack_id) => `fashion/techpacks/${techpack_id}/step-2/`,
      providesTags: ["includedMaterials"],
    }),
    includedMaterials: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-2/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedMaterials", "fashionTechpacks"],
    }),
    updateIncludedMaterials: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-2/`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["includedMaterials", "fashionTechpacks"],
    }),
    deleteAMaterialObject: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-2/${data?.material_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["includedMaterials", "fashionTechpacks"],
    }),
    ////////// Included Fabrics //////////
    getIncludedFabrics: build.query({
      query: (techpack_id) => `fashion/techpacks/${techpack_id}/step-3/`,
      providesTags: ["includedFabrics"],
    }),
    includedFabrics: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-3/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedFabrics", "fashionTechpacks"],
    }),
    updateFabrics: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-3/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["includedFabrics", "fashionTechpacks"],
    }),
    ////////// Included Trims //////////
    getIncludedTrims: build.query({
      query: (techpack_id) => `fashion/techpacks/${techpack_id}/step-4/`,
      providesTags: ["includedTrims"],
    }),
    includedTrims: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-4/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedTrims", "fashionTechpacks"],
    }),
    updateTrims: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-4/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["includedTrims", "fashionTechpacks"],
    }),
    ////////// Construction Details //////////

    getIncludedConstructionDetails: build.query({
      query: (techpack_id) => `fashion/techpacks/${techpack_id}/step-5/`,
      providesTags: ["includedConstructionDetails"],
    }),

    includedConstructionDetails: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-5/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedConstructionDetails", "fashionTechpacks"],
    }),
    updateConstructionDetails: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-5/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["includedConstructionDetails", "fashionTechpacks"],
    }),
    ////////// Artwork Placement //////////
    getIncludedArtworkPlacement: build.query({
      query: (techpack_id) => `fashion/techpacks/${techpack_id}/step-6/`,
      providesTags: ["includedArtworkPlacement"],
    }),
    includedArtworkPlacement: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-6/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedArtworkPlacement", "fashionTechpacks"],
    }),
    updateArtworkPlacement: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-6/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["includedArtworkPlacement", "fashionTechpacks"],
    }),
    ////////// Bill of Materials //////////

    getIncludedBillOfMaterials: build.query({
      query: (techpack_id) => `fashion/techpacks/${techpack_id}/step-7/`,
      providesTags: ["includedBillOfMaterials"],
    }),

    includedBillOfMaterials: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-7/`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["includedBillOfMaterials", "fashionTechpacks"],
    }),
    updateBillOfMaterials: build.mutation({
      query: (data) => ({
        url: `fashion/techpacks/${data?.techpack_id}/step-7/`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["includedBillOfMaterials", "fashionTechpacks"],
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

  /// all get queries

  useGetGarmentSetupQuery,
  useGetIncludedMaterialsQuery,
  useGetIncludedFabricsQuery,
  useGetIncludedTrimsQuery,
  useGetIncludedConstructionDetailsQuery,
  useGetIncludedArtworkPlacementQuery,
  useGetIncludedBillOfMaterialsQuery,
} = postAFashionApi;
