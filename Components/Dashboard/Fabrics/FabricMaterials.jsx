"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, X, Star, ArrowRight, Loader2 } from "lucide-react";
import { Input, Select } from "@/Libs/Form-components/FormComponent";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useGetFashionTechpackByIdQuery } from "@/Apis/Get-Fashion/getFashionApi";
import React, { useEffect } from "react";
import {
  // useDeleteAFabricObjectMutation,
  useIncludedFabricsMutation,
  useUpdateFabricsMutation,
} from "@/Apis/Poast-a-fashion/postAFashionApi";
import { toast } from "react-toastify";

export default function FabricMaterials() {
  const { techpack_id } = useParams();
  const route = useRouter();
  const [fabricId, setFabricId] = React.useState(null);

  /////////////// All api call here //////////////

  const { data: techpackData = {}, isLoading } = useGetFashionTechpackByIdQuery(
    techpack_id,
    { skip: !techpack_id },
  );
  const fabricData = techpackData?.step_three || [];
  const [includedFabrics, { isLoading: isFabricLoading }] =
    useIncludedFabricsMutation();
  const [updateFabrics, { isLoading: isUpdatingFabrics }] =
    useUpdateFabricsMutation();

  // const [deleteAFabricObject, { isLoading: isDeletingFabric }] =
  //   useDeleteAFabricObjectMutation();
  /// ------------------------------------------ ////////

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      fabrics: [
        {
          id: "",
          isPrimary: true,
          composition: "",
          gsm: "",
          construction: "",
          finish: "",
          color: "",
          shrinkage: "",
          stretch: "",
          faceback: "",
          direction: "",
          moq: "",
          testing: "",
          width: "",
          yarnType: "",
          countryOfOrigin: "",
          sustainability: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fabrics",
  });

  const handleAddFabric = () => {
    append({
      isPrimary: false,
      id: "",
      composition: "",
      gsm: "",
      construction: "",
      finish: "",
      color: "",
      shrinkage: "",
      stretch: "",
      faceback: "",
      direction: "",
      moq: "",
      testing: "",
      width: "",
      yarnType: "",
      countryOfOrigin: "",
      sustainability: "",
    });
  };

  const onSubmit = async (data) => {
    const payload = {
      techpack_id: techpack_id,
      data: data.fabrics.map((fabric) => ({
        fabric_type: fabric.isPrimary ? "primary" : "secondary",
        composition: fabric.composition,
        gsm: fabric.gsm,
        construction: fabric.construction,
        finish: fabric.finish,
        color: fabric.color,
        shrinkage: fabric.shrinkage,
        stretch: fabric.stretch,
        face_back: fabric.faceback,
        testing_required: fabric.testing,
        fabric_direction: fabric.direction,
        moq: fabric.moq,
        fabric_width: fabric.width,
        yarn_type: fabric.yarnType,
        country_of_origin: fabric.countryOfOrigin,
        sustainability_certifications: fabric.sustainability,
      })),
    };

    if (fabricId) {
      // add id in all payload
      const updatePayload = {
        techpack_id: techpack_id,
        data: data.fabrics.map((fabric) => ({
          fabric_type: fabric.isPrimary ? "primary" : "secondary",
          id: fabric.id,
          composition: fabric.composition,
          gsm: fabric.gsm,
          construction: fabric.construction,
          finish: fabric.finish,
          color: fabric.color,
          shrinkage: fabric.shrinkage,
          stretch: fabric.stretch,
          face_back: fabric.faceback,
          testing_required: fabric.testing,
          fabric_direction: fabric.direction,
          moq: fabric.moq,
          fabric_width: fabric.width,
          yarn_type: fabric.yarnType,
          country_of_origin: fabric.countryOfOrigin,
          sustainability_certifications: fabric.sustainability,
        })),
      };
      try {
        await updateFabrics(updatePayload).unwrap();
        toast.success("Fabrics updated successfully");
        route.push(`/${techpack_id}/trims`);
      } catch (error) {
        toast.error("Failed to update fabrics");
      }
    } else {
      try {
        await includedFabrics(payload).unwrap();
        toast.success("Fabrics included successfully");
        route.push(`/${techpack_id}/trims`);
      } catch (error) {
        toast.error("Failed to include fabrics");
      }
    }
  };

  const constructionOptions = [
    { value: "plain-weave", label: "Plain Weave" },
    { value: "twill", label: "Twill" },
    { value: "satin", label: "Satin" },
    { value: "jersey", label: "Jersey Knit" },
    { value: "rib", label: "Rib Knit" },
    { value: "interlock", label: "Interlock" },
    { value: "fleece", label: "Fleece" },
    { value: "french-terry", label: "French Terry" },
    { value: "pique", label: "Pique" },
  ];

  const finishOptions = [
    { value: "none", label: "None" },
    { value: "enzyme-wash", label: "Enzyme Wash" },
    { value: "stone-wash", label: "Stone Wash" },
    { value: "sand-wash", label: "Sand Wash" },
    { value: "brushed", label: "Brushed" },
    { value: "peached", label: "Peached" },
    { value: "mercerized", label: "Mercerized" },
    { value: "calendered", label: "Calendered" },
    { value: "water-repellent", label: "Water Repellent" },
    { value: "anti-pilling", label: "Anti-Pilling" },
  ];

  const stretchOptions = [
    { value: "none", label: "None" },
    { value: "warp", label: "Warp (Lengthwise)" },
    { value: "weft", label: "Weft (Widthwise)" },
    { value: "4-way", label: "4-Way Stretch" },
    { value: "2-way", label: "2-Way Stretch" },
  ];

  const directionOptions = [
    { value: "non-directional", label: "Non-Directional" },
    { value: "one-way", label: "One-Way (Nap/Print)" },
    { value: "two-way", label: "Two-Way" },
  ];

  const yarnTypeOptions = [
    { value: "carded", label: "Carded" },
    { value: "combed", label: "Combed" },
    { value: "ring-spun", label: "Ring Spun" },
    { value: "open-end", label: "Open End" },
    { value: "air-jet", label: "Air Jet" },
    { value: "compact", label: "Compact" },
  ];

  useEffect(() => {
    if (fabricData && fabricData.length > 0 && !isLoading) {
      const formattedFabrics = fabricData.map((fabric) => ({
        isPrimary: fabric.fabric_type === "primary",
        id: fabric.id,
        composition: fabric.composition,
        gsm: fabric.gsm,
        construction: fabric.construction,
        color: fabric.color,
        finish: fabric.finish,
        shrinkage: fabric.shrinkage,
        stretch: fabric.stretch,
        faceback: fabric.face_back,
        direction: fabric.fabric_direction,
        moq: fabric.moq,
        testing: fabric.testing_required,
        width: fabric.fabric_width,
        yarnType: fabric.yarn_type,
        countryOfOrigin: fabric.country_of_origin,
        sustainability: fabric.sustainability_certifications,
      }));
      setValue("fabrics", formattedFabrics);
      // Assuming the first fabric is primary
      const primaryFabric = fabricData.find(
        (fabric) => fabric.fabric_type === "primary",
      );
      if (primaryFabric) {
        setFabricId(primaryFabric.id);
      }
    }
  }, [fabricData, isLoading]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Fabrics & Materials
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Specify all fabric materials and their properties
          </p>
        </div>

        {/* Fabrics */}
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={`bg-white rounded-lg border-2 overflow-hidden ${
                field.isPrimary ? "border-amber-300" : "border-gray-200"
              }`}
            >
              {/* Card Header */}
              <div
                className={`px-4 md:px-6 py-3 md:py-4 border-b flex items-center justify-between ${
                  field.isPrimary
                    ? "bg-amber-50 border-amber-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {field.isPrimary && (
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  )}
                  <h3 className="text-base font-semibold text-gray-900">
                    Fabric {index + 1}
                  </h3>
                  {field.isPrimary && (
                    <span className="text-xs md:text-sm text-amber-700 font-normal">
                      (Primary Fabric)
                    </span>
                  )}
                </div>
                {!field.isPrimary && fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Row 1: Composition, GSM, Construction */}
                  <Input
                    label="Composition"
                    name={`fabrics.${index}.composition`}
                    register={register}
                    errors={errors.fabrics?.[index] || {}}
                    required={true}
                    placeholder="e.g., 100% Cotton, 65% Poly 35% Cotton"
                    helperText="Fiber content breakdown"
                  />

                  <Input
                    label="GSM (Weight)"
                    name={`fabrics.${index}.gsm`}
                    register={register}
                    errors={errors.fabrics?.[index] || {}}
                    required={true}
                    placeholder="e.g., 180, 220"
                    helperText="Grams per square meter"
                  />

                  <Select
                    label="Construction"
                    name={`fabrics.${index}.construction`}
                    control={control}
                    errors={errors.fabrics?.[index] || {}}
                    options={constructionOptions}
                    placeholder="Select construction"
                    helperText="Weave or knit type"
                  />

                  {/* Row 2: Color, Finish, Shrinkage */}
                  <Input
                    label="Color"
                    name={`fabrics.${index}.color`}
                    register={register}
                    errors={errors.fabrics?.[index] || {}}
                    required={true}
                    placeholder="e.g., Navy Blue, White, Black"
                    helperText="Color name or code"
                  />

                  <Select
                    label="Finish"
                    name={`fabrics.${index}.finish`}
                    control={control}
                    errors={errors.fabrics?.[index] || {}}
                    options={finishOptions}
                    placeholder="Select finish"
                    helperText="Finishing treatment"
                  />

                  <Input
                    label="Shrinkage %"
                    name={`fabrics.${index}.shrinkage`}
                    register={register}
                    errors={errors.fabrics?.[index] || {}}
                    placeholder="e.g., 3-5%, <2%"
                    helperText="Expected shrinkage after wash"
                  />

                  {/* Row 3: Stretch, Face/Back, Direction */}
                  <Select
                    label="Stretch"
                    name={`fabrics.${index}.stretch`}
                    control={control}
                    errors={errors.fabrics?.[index] || {}}
                    options={stretchOptions}
                    placeholder="Select stretch type"
                    helperText="Fabric stretch properties"
                  />

                  <Input
                    label="Face / Back"
                    name={`fabrics.${index}.faceback`}
                    register={register}
                    errors={errors.fabrics?.[index] || {}}
                    placeholder="e.g., Same both sides, Brushed inside"
                    helperText="Face and back characteristics"
                  />

                  <Select
                    label="Fabric Direction"
                    name={`fabrics.${index}.direction`}
                    control={control}
                    errors={errors.fabrics?.[index] || {}}
                    options={directionOptions}
                    placeholder="Select direction"
                    helperText="Cutting direction requirement"
                  />

                  {/* Row 4: MOQ, Testing */}
                  <Input
                    label="MOQ (Minimum Order Quantity)"
                    name={`fabrics.${index}.moq`}
                    register={register}
                    errors={errors.fabrics?.[index] || {}}
                    placeholder="e.g., 500 yards, 100 meters"
                    helperText="Supplier minimum order"
                  />

                  <div className="md:col-span-2">
                    <Input
                      label="Testing Requirements"
                      name={`fabrics.${index}.testing`}
                      register={register}
                      errors={errors.fabrics?.[index] || {}}
                      placeholder="e.g., AATCC 61 (Colorfastness), ASTM D3776 (Weight), Pilling Grade 4"
                      helperText="Required lab tests and standards"
                    />
                  </div>

                  {/* Row 5: Width, Yarn Type, Country of Origin */}
                  <Input
                    label="Fabric Width"
                    name={`fabrics.${index}.width`}
                    register={register}
                    errors={errors.fabrics?.[index] || {}}
                    placeholder="e.g., 60 inches, 150 cm"
                    helperText="Fabric roll width"
                  />

                  <Select
                    label="Yarn Type"
                    name={`fabrics.${index}.yarnType`}
                    control={control}
                    errors={errors.fabrics?.[index] || {}}
                    options={yarnTypeOptions}
                    placeholder="Select yarn type"
                    helperText="Yarn spinning method"
                  />

                  <Input
                    label="Country of Origin"
                    name={`fabrics.${index}.countryOfOrigin`}
                    register={register}
                    errors={errors.fabrics?.[index] || {}}
                    placeholder="e.g., China, India, Turkey, USA"
                    helperText="Manufacturing country"
                  />

                  {/* Row 6: Sustainability */}
                  <div className="md:col-span-3">
                    <Input
                      label="Sustainability & Certifications"
                      name={`fabrics.${index}.sustainability`}
                      register={register}
                      errors={errors.fabrics?.[index] || {}}
                      placeholder="e.g., GOTS Certified, Organic Cotton, Recycled Polyester, BCI, Oeko-Tex"
                      helperText="Environmental certifications and sustainable attributes"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Secondary Fabric Button */}
        <button
          type="button"
          onClick={handleAddFabric}
          className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Secondary Fabric
        </button>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center my-6">
          <Link
            href={`/${techpack_id}/measurements`}
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Measurements
          </Link>
          <div className="flex flex-col items-end gap-2">
            <button
              type="submit"
              disabled={!isValid || isFabricLoading || isUpdatingFabrics}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                !isValid || isFabricLoading || isUpdatingFabrics
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Next: Trims & Accessories{" "}
              {isFabricLoading || isUpdatingFabrics ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
            {!isValid && (
              <p className="text-sm text-red-600">
                Please fill all required fields (*) to continue
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
