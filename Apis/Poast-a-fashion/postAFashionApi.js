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
  }),
});

export const { useCreateInitialFashionLibraryMutation, usePostGarmentSetupMutation, useUpdateGarmentSetupMutation, useIncludedMaterialsMutation, useUpdateIncludedMaterialsMutation } = postAFashionApi;