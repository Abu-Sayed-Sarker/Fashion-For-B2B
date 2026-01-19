"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { AlertCircle, Info, ArrowRight } from "lucide-react";
import { Input, Select } from "@/Libs/Form-components/FormComponent";
import { useRouter } from "next/navigation";

// Main Component
const GarmentSetup = () => {
  const route = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      garmentType: "",
      garmentCategory: "",
      fitSilhouette: "",
      targetGender: "",
      season: "",
      baseSize: "M",
      styleCode: "",
      dateCreated: "01/17/2026",
      version: "1.0",
    },
  });

  // Auto-mapping logic
  const GARMENT_CATEGORY_MAP = {
    Shirt: "Tops",
    "T-Shirt": "Tops",
    "Polo Shirt": "Tops",
    Blouse: "Tops",
    "Tank Top": "Tops",
    Jacket: "Outerwear",
    Coat: "Outerwear",
    Blazer: "Outerwear",
    Vest: "Outerwear",
    Parka: "Outerwear",
    Pants: "Bottoms",
    Jeans: "Bottoms",
    Shorts: "Bottoms",
    Skirt: "Bottoms",
    Dress: "Dresses",
    Jumpsuit: "Dresses",
    Sweater: "Knitwear",
    Cardigan: "Knitwear",
    Hoodie: "Knitwear",
    Sweatshirt: "Activewear",
    Joggers: "Activewear",
    Leggings: "Activewear",
  };

  const handleGarmentTypeChange = (value) => {
    const autoCategory = GARMENT_CATEGORY_MAP[value] || "";
    setValue("garmentCategory", autoCategory);
  };

  const onSubmit = (data) => {
    route.push('dashboard/measurements');
    console.log("Form Data:", data);
  };

  const garmentTypeOptions = [
    { value: "Shirt", label: "Shirt" },
    { value: "T-Shirt", label: "T-Shirt" },
    { value: "Polo Shirt", label: "Polo Shirt" },
    { value: "Blouse", label: "Blouse" },
    { value: "Tank Top", label: "Tank Top" },
    { value: "Jacket", label: "Jacket" },
    { value: "Coat", label: "Coat" },
    { value: "Blazer", label: "Blazer" },
    { value: "Vest", label: "Vest" },
    { value: "Parka", label: "Parka" },
    { value: "Pants", label: "Pants" },
    { value: "Jeans", label: "Jeans" },
    { value: "Shorts", label: "Shorts" },
    { value: "Skirt", label: "Skirt" },
    { value: "Dress", label: "Dress" },
    { value: "Jumpsuit", label: "Jumpsuit" },
    { value: "Sweater", label: "Sweater" },
    { value: "Cardigan", label: "Cardigan" },
    { value: "Hoodie", label: "Hoodie" },
    { value: "Sweatshirt", label: "Sweatshirt" },
    { value: "Joggers", label: "Joggers" },
    { value: "Leggings", label: "Leggings" },
  ];

  const categoryOptions = [
    { value: "Tops", label: "Tops" },
    { value: "Bottoms", label: "Bottoms" },
    { value: "Outerwear", label: "Outerwear" },
    { value: "Dresses", label: "Dresses" },
    { value: "Activewear", label: "Activewear" },
    { value: "Knitwear", label: "Knitwear" },
  ];

  const fitOptions = [
    { value: "Slim Fit", label: "Slim Fit" },
    { value: "Regular Fit", label: "Regular Fit" },
    { value: "Relaxed Fit", label: "Relaxed Fit" },
    { value: "Oversized", label: "Oversized" },
    { value: "Tailored", label: "Tailored" },
    { value: "Loose", label: "Loose" },
  ];

  const genderOptions = [
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Unisex", label: "Unisex" },
    { value: "Kids", label: "Kids" },
  ];

  const seasonOptions = [
    { value: "Spring", label: "Spring (SS)" },
    { value: "Summer", label: "Summer (SS)" },
    { value: "Fall", label: "Fall (FW)" },
    { value: "Winter", label: "Winter (FW)" },
    { value: "All Season", label: "All Season" },
  ];

  const sizeOptions = [
    { value: "XXS", label: "XXS" },
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "XXXL", label: "XXXL" },
  ];

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Garment Setup
        </h2>
        <p className="text-gray-600">
          Define the basic specifications for your garment
        </p>
      </div>

      {/* Error Alert */}
      {hasErrors && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              <Select
                label="Garment Type"
                name="garmentType"
                control={control}
                errors={errors}
                options={garmentTypeOptions}
                required={true}
                placeholder="Select garment type"
                helperText="Category will be auto-filled based on garment type"
                onChange={handleGarmentTypeChange}
              />

              <Select
                label="Garment Category"
                name="garmentCategory"
                control={control}
                errors={errors}
                options={categoryOptions}
                required={true}
                placeholder="Select category"
                badge="(Auto-mapped, editable)"
                highlighted={true}
              />

              <Select
                label="Fit / Silhouette"
                name="fitSilhouette"
                control={control}
                errors={errors}
                options={fitOptions}
                placeholder="Select fit"
              />

              <Select
                label="Target Gender"
                name="targetGender"
                control={control}
                errors={errors}
                options={genderOptions}
                placeholder="Select gender"
              />
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <Select
                label="Season"
                name="season"
                control={control}
                errors={errors}
                options={seasonOptions}
                placeholder="Select season"
              />

              <Select
                label="Base Size (Reference)"
                name="baseSize"
                control={control}
                errors={errors}
                options={sizeOptions}
                helperText="All measurements will reference this size"
                tooltip={
                  <>
                    <p className="font-semibold mb-1">Base Size:</p>
                    <p className="mb-2">
                      The reference size used for all measurements in this tech
                      pack.
                    </p>
                    <p className="font-semibold mb-1">Size Range:</p>
                    <p>
                      Full production size range (e.g., XS-XXL) - Currently
                      disabled in POC, will be enabled in production for grading
                      tables.
                    </p>
                  </>
                }
              />

              <Input
                label="Style Code"
                name="styleCode"
                register={register}
                errors={errors}
                required={true}
                placeholder="e.g., TP-2026-001"
                helperText="Unique identifier for this tech pack"
              />

              <Input
                label="Date Created"
                name="dateCreated"
                register={register}
                errors={errors}
                disabled={true}
              />

              <Input
                label="Version"
                name="version"
                register={register}
                errors={errors}
                disabled={true}
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">
                Auto-Mapping Logic
              </p>
              <p className="text-blue-800">
                When you select a Garment Type, the system automatically
                suggests the appropriate Category (e.g., Jacket → Outerwear,
                Shirt → Tops). You can override this if needed.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center my-6">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Library
          </button>
          <div className="flex flex-col items-end gap-2">
            <button
              type="submit"
              disabled={hasErrors}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                hasErrors
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Next: Measurements
              <ArrowRight className="w-4 h-4" />
            </button>
            {hasErrors && (
              <p className="text-sm text-red-600">
                Please fill all required fields (*) to continue
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default GarmentSetup;
