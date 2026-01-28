"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, X, Tag, Zap, Scissors, Package, ArrowRight, Loader2 } from "lucide-react";
import { Input, Select } from "@/Libs/Form-components/FormComponent";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useGetFashionTechpackByIdQuery } from "@/Apis/Get-Fashion/getFashionApi";
import React from "react";
import {
  useIncludedTrimsMutation,
  useUpdateTrimsMutation,
} from "@/Apis/Poast-a-fashion/postAFashionApi";
import { toast } from "react-toastify";

const trimIcons = {
  button: Tag,
  zipper: Zap,
  label: Tag,
  thread: Scissors,
  elastic: Scissors,
  drawcord: Package,
  snap: Tag,
  hook: Tag,
  velcro: Tag,
  rivet: Tag,
};

export default function TrimsAccessories() {
  const router = useRouter();
  
  const {techpack_id} = useParams();
  const [haveId, setHaveId] = React.useState(null);
  //////// All api call are here ////////
  const { data: techpackData = {}, isLoading } = useGetFashionTechpackByIdQuery(
    techpack_id,
    { skip: !techpack_id },
  );
  const trimData = techpackData?.step_four || [];

  const [includedTrims, { isLoading: isIncludingTrims }] =
    useIncludedTrimsMutation();
  const [updateTrims, { isLoading: isUpdatingTrims }] =
    useUpdateTrimsMutation();

  ///----------------------------------------///

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      trims: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "trims",
  });

  const handleAddTrim = () => {
    append({
      trimType: "",
      material: "",
      size: "",
      color: "",
      finish: "",
      placement: "",
      consumption: "",
      brandOrGeneric: "generic",
      supplier: "",
      colorLogic: "match",
    });
  };

  const onSubmit = async (data) => {
    if (haveId) {
      const updatePayload = {
        techpack_id,
        data: data.trims.map((trim) => ({
          id: trim.id,
          trim_type: trim.trimType,
          material: trim.material,
          placement: trim.placement,
          finish: trim.finish,
          consumption: trim.consumption,
          size: trim.size,
          color: trim.color,
          brand_type: trim.brandOrGeneric,
          color_logic: trim.colorLogic,
          supplier: trim.supplier,
        })),
      };
      try {
        await updateTrims(updatePayload).unwrap();
        toast.success("Trims & Accessories updated successfully!");
        router.push(`/${techpack_id}/construction`);
      } catch (error) {
        toast.error("Failed to update Trims & Accessories.");
        console.error("Error updating Trims & Accessories:", error);
      }
    } else {
      const payload = {
        techpack_id,
        data: data.trims.map((trim) => ({
          trim_type: trim.trimType,
          material: trim.material,
          placement: trim.placement,
          consumption: trim.consumption,
          size: trim.size,
          finish: trim.finish,
          color: trim.color,
          brand_type: trim.brandOrGeneric,
          color_logic: trim.colorLogic,
          supplier: trim.supplier,
        })),
      };
      try {
        console.log("payload", payload);
        await includedTrims(payload).unwrap();
        toast.success("Trims & Accessories added successfully!");
        router.push(`/${techpack_id}/construction`);
      } catch (error) {
        toast.error("Failed to add Trims & Accessories.");
        console.error("Error adding Trims & Accessories:", error);
      }
    }
  };

  const trimTypeOptions = [
    { value: "button", label: "Button" },
    { value: "zipper", label: "Zipper" },
    { value: "label", label: "Label" },
    { value: "thread", label: "Thread" },
    { value: "elastic", label: "Elastic" },
    { value: "drawcord", label: "Drawcord" },
    { value: "snap", label: "Snap" },
    { value: "hook", label: "Hook & Eye" },
    { value: "velcro", label: "Velcro" },
    { value: "rivet", label: "Rivet" },
  ];

  const brandOptions = [
    { value: "generic", label: "Generic" },
    { value: "branded", label: "Branded" },
  ];

  const colorLogicOptions = [
    { value: "match", label: "Match Garment" },
    { value: "contrast", label: "Contrast" },
    { value: "pantone", label: "Pantone (Specify)" },
    { value: "custom", label: "Custom Color" },
  ];


  React.useEffect(() => {
    if (trimData && trimData.length > 0 && !isLoading) {
      setHaveId(trimData[0].id);
      const formattedTrims = trimData.map((trim) => ({
        id: trim.id,
        trimType: trim.trim_type || "",
        material: trim.material || "",
        placement: trim.placement || "",
        consumption: trim.consumption || "",
        size: trim.size || "",
        color: trim.color || "",
        finish: trim.finish || "",
        brandOrGeneric: trim.brand_type || "",
        supplier: trim.supplier || "",
        colorLogic: trim.color_logic || "",
      }));
      setValue("trims", formattedTrims);
    }
  }, [trimData]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Trims & Accessories
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Define all trims, closures, and accessories for your garment
          </p>
        </div>

        {/* Trims List */}
        <div className="space-y-6">
          {fields.map((field, index) => {
            const trimType = watch(`trims.${index}.trimType`);
            const Icon = trimIcons[trimType] || Tag;

            return (
              <div
                key={field.id}
                className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden"
              >
                {/* Card Header */}
                <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {trimType && <Icon className="w-4 h-4 text-gray-600" />}
                    <h3 className="text-base font-semibold text-gray-900">
                      Trim {index + 1}
                    </h3>
                    {trimType && (
                      <span className="text-sm text-gray-600 font-normal">
                        ({trimType.charAt(0).toUpperCase() + trimType.slice(1)})
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Row 1: Trim Type, Material, Size */}
                    <Select
                      label="Trim Type"
                      name={`trims.${index}.trimType`}
                      control={control}
                      errors={errors.trims?.[index] || {}}
                      options={trimTypeOptions}
                      required={true}
                      placeholder="Select type"
                      helperText="Type of trim or accessory"
                    />

                    <Input
                      label="Material"
                      name={`trims.${index}.material`}
                      register={register}
                      errors={errors.trims?.[index] || {}}
                      required={true}
                      placeholder="e.g., Metal, Plastic, Polyester"
                      helperText="Material composition"
                    />

                    <Input
                      label="Size"
                      name={`trims.${index}.size`}
                      register={register}
                      errors={errors.trims?.[index] || {}}
                      placeholder="e.g., 15mm, 5 inches"
                      helperText="Dimensions or size specification"
                    />

                    {/* Row 2: Color, Finish, Placement */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={watch(`trims.${index}.color`) || '#000000'}
                          onChange={(e) => {
                            const hexValue = e.target.value;
                            // Convert hex to a readable format but keep hex for picker
                            const fieldValue = watch(`trims.${index}.color`);
                            // If current value is hex-like, update it; otherwise preserve name
                            if (!fieldValue || fieldValue.startsWith('#')) {
                              setValue(`trims.${index}.color`, hexValue);
                            }
                          }}
                          className="h-10 w-14 rounded border border-gray-300 cursor-pointer hover:border-gray-400"
                          title="Pick a color"
                        />
                        <input
                          type="text"
                          value={watch(`trims.${index}.color`) || ''}
                          onChange={(e) => {
                            const textValue = e.target.value;
                            setValue(`trims.${index}.color`, textValue);
                          }}
                          placeholder="e.g., Black, Silver, #33445F"
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Color name or code</p>
                    </div>

                    <Input
                      label="Finish"
                      name={`trims.${index}.finish`}
                      register={register}
                      errors={errors.trims?.[index] || {}}
                      placeholder="e.g., Matt, Glossy, Brushed"
                      helperText="Surface finish or treatment"
                    />

                    <Input
                      label="Placement"
                      name={`trims.${index}.placement`}
                      register={register}
                      errors={errors.trims?.[index] || {}}
                      required={true}
                      placeholder="e.g., Center Front, Pocket, Waistband"
                      helperText="Location on garment"
                    />

                    {/* Row 3: Consumption, Brand/Generic, Color Logic */}
                    <Input
                      label="Consumption"
                      name={`trims.${index}.consumption`}
                      register={register}
                      errors={errors.trims?.[index] || {}}
                      required={true}
                      placeholder="e.g., 6 pcs, 1.5 meters"
                      helperText="Quantity required per garment"
                    />

                    <Select
                      label="Brand / Generic"
                      name={`trims.${index}.brandOrGeneric`}
                      control={control}
                      errors={errors.trims?.[index] || {}}
                      options={brandOptions}
                      placeholder="Select option"
                      helperText="Specific brand or generic alternative"
                    />

                    <Select
                      label="Color Logic"
                      name={`trims.${index}.colorLogic`}
                      control={control}
                      errors={errors.trims?.[index] || {}}
                      options={colorLogicOptions}
                      placeholder="Select logic"
                      helperText="How trim color relates to garment"
                    />

                    {/* Row 4: Supplier (full width) */}
                    <div className="md:col-span-3">
                      <Input
                        label="Supplier"
                        name={`trims.${index}.supplier`}
                        register={register}
                        errors={errors.trims?.[index] || {}}
                        placeholder="e.g., YKK, Coats, XYZ Trims Co."
                        helperText="Supplier name or code (locked for factory use)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Trim Button */}
        <button
          type="button"
          onClick={handleAddTrim}
          className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Trim / Accessory
        </button>

        {/* Navigation */}
        <div className="flex justify-between items-center my-6">
          <Link
            href={`/${techpack_id}/fabrics`}
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Fabrics
          </Link>
          <div className="flex flex-col items-end gap-2">
            <button
              type="submit"
              disabled={!isValid || isIncludingTrims || isUpdatingTrims}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                !isValid || isIncludingTrims || isUpdatingTrims
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Next: Construction Details {isIncludingTrims || isUpdatingTrims ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
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
