"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, X, Info, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Select } from "@/Libs/Form-components/FormComponent";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useGetFashionTechpackByIdQuery } from "@/Apis/Get-Fashion/getFashionApi";
import {
  useIncludedMaterialsMutation,
  useUpdateIncludedMaterialsMutation,
} from "@/Apis/Poast-a-fashion/postAFashionApi";
import { toast } from "react-toastify";

// Garment-type-specific mandatory measurements
const GARMENT_MEASUREMENTS = {
  shirt: [
    {
      pom: "Chest",
      instruction: 'Measure 1" below armhole, straight across chest',
      defaultTolerance: 0.5,
    },
    {
      pom: "Body Length",
      instruction: "Measure from HPS (high point shoulder) to bottom hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Sleeve Length",
      instruction:
        "Measure from shoulder seam to sleeve hem, following sleeve curve",
      defaultTolerance: 0.5,
    },
    {
      pom: "Shoulder Width",
      instruction: "Measure from shoulder seam to shoulder seam across back",
      defaultTolerance: 0.5,
    },
    {
      pom: "Armhole",
      instruction: "Measure armhole circumference from shoulder seam",
      defaultTolerance: 0.5,
    },
    {
      pom: "Cuff Opening",
      instruction: "Measure width of sleeve cuff opening when laid flat",
      defaultTolerance: 0.5,
    },
    {
      pom: "Hem Width",
      instruction: "Measure bottom hem width edge to edge when laid flat",
      defaultTolerance: 0.5,
    },
    {
      pom: "Neck Opening",
      instruction: "Measure neckline opening circumference",
      defaultTolerance: 0.5,
    },
  ],
  "t-shirt": [
    {
      pom: "Chest",
      instruction: 'Measure 1" below armhole, straight across chest',
      defaultTolerance: 0.5,
    },
    {
      pom: "Body Length",
      instruction: "Measure from HPS (high point shoulder) to bottom hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Sleeve Length",
      instruction: "Measure from shoulder seam to sleeve hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Shoulder Width",
      instruction: "Measure from shoulder seam to shoulder seam across back",
      defaultTolerance: 0.5,
    },
    {
      pom: "Armhole",
      instruction: "Measure armhole circumference from shoulder seam",
      defaultTolerance: 0.5,
    },
    {
      pom: "Hem Width",
      instruction: "Measure bottom hem width edge to edge when laid flat",
      defaultTolerance: 0.5,
    },
    {
      pom: "Neck Opening",
      instruction: "Measure neckline opening circumference",
      defaultTolerance: 0.5,
    },
  ],
  polo: [
    {
      pom: "Chest",
      instruction: 'Measure 1" below armhole, straight across chest',
      defaultTolerance: 0.5,
    },
    {
      pom: "Body Length",
      instruction: "Measure from HPS to bottom hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Sleeve Length",
      instruction: "Measure from shoulder seam to sleeve hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Shoulder Width",
      instruction: "Measure from shoulder seam to shoulder seam",
      defaultTolerance: 0.5,
    },
    {
      pom: "Armhole",
      instruction: "Measure armhole circumference",
      defaultTolerance: 0.5,
    },
    {
      pom: "Neck Opening",
      instruction: "Measure neckline opening circumference",
      defaultTolerance: 0.5,
    },
    {
      pom: "Placket Length",
      instruction: "Measure from collar to end of button placket",
      defaultTolerance: 0.3,
    },
  ],
  pants: [
    {
      pom: "Waist",
      instruction: "Measure waistband width edge to edge when laid flat",
      defaultTolerance: 0.5,
    },
    {
      pom: "Hip",
      instruction: "Measure at fullest part of hip, straight across",
      defaultTolerance: 0.5,
    },
    {
      pom: "Inseam",
      instruction: "Measure from crotch seam to bottom hem along inner leg",
      defaultTolerance: 0.5,
    },
    {
      pom: "Outseam",
      instruction: "Measure from waist to bottom hem along outer leg",
      defaultTolerance: 0.5,
    },
    {
      pom: "Thigh",
      instruction: "Measure across thigh at fullest point",
      defaultTolerance: 0.5,
    },
    {
      pom: "Knee",
      instruction: "Measure across knee when laid flat",
      defaultTolerance: 0.5,
    },
    {
      pom: "Leg Opening",
      instruction: "Measure hem opening width when laid flat",
      defaultTolerance: 0.3,
    },
    {
      pom: "Front Rise",
      instruction: "Measure from crotch seam to top of waistband (front)",
      defaultTolerance: 0.3,
    },
    {
      pom: "Back Rise",
      instruction: "Measure from crotch seam to top of waistband (back)",
      defaultTolerance: 0.3,
    },
  ],
  jeans: [
    {
      pom: "Waist",
      instruction: "Measure waistband width edge to edge when laid flat",
      defaultTolerance: 0.5,
    },
    {
      pom: "Hip",
      instruction: "Measure at fullest part of hip",
      defaultTolerance: 0.5,
    },
    {
      pom: "Inseam",
      instruction: "Measure from crotch seam to bottom hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Outseam",
      instruction: "Measure from waist to bottom hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Thigh",
      instruction: "Measure across thigh at fullest point",
      defaultTolerance: 0.5,
    },
    { pom: "Knee", instruction: "Measure across knee", defaultTolerance: 0.5 },
    {
      pom: "Leg Opening",
      instruction: "Measure hem opening width",
      defaultTolerance: 0.3,
    },
    {
      pom: "Front Rise",
      instruction: "Measure from crotch to waistband (front)",
      defaultTolerance: 0.3,
    },
    {
      pom: "Back Rise",
      instruction: "Measure from crotch to waistband (back)",
      defaultTolerance: 0.3,
    },
  ],
  shorts: [
    {
      pom: "Waist",
      instruction: "Measure waistband width edge to edge when laid flat",
      defaultTolerance: 0.5,
    },
    {
      pom: "Hip",
      instruction: "Measure at fullest part of hip",
      defaultTolerance: 0.5,
    },
    {
      pom: "Inseam",
      instruction: "Measure from crotch seam to bottom hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Outseam",
      instruction: "Measure from waist to bottom hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Thigh",
      instruction: "Measure across thigh at fullest point",
      defaultTolerance: 0.5,
    },
    {
      pom: "Leg Opening",
      instruction: "Measure hem opening width",
      defaultTolerance: 0.3,
    },
    {
      pom: "Front Rise",
      instruction: "Measure from crotch to waistband (front)",
      defaultTolerance: 0.3,
    },
  ],
  dress: [
    {
      pom: "Bust",
      instruction: "Measure at fullest part of bust, straight across",
      defaultTolerance: 0.5,
    },
    {
      pom: "Waist",
      instruction: "Measure at natural waistline",
      defaultTolerance: 0.5,
    },
    {
      pom: "Hip",
      instruction: "Measure at fullest part of hip",
      defaultTolerance: 0.5,
    },
    {
      pom: "Body Length",
      instruction: "Measure from HPS to bottom hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Shoulder Width",
      instruction: "Measure from shoulder seam to shoulder seam",
      defaultTolerance: 0.5,
    },
    {
      pom: "Armhole",
      instruction: "Measure armhole circumference",
      defaultTolerance: 0.5,
    },
    {
      pom: "Sleeve Length",
      instruction: "Measure from shoulder to sleeve hem (if applicable)",
      defaultTolerance: 0.5,
    },
    {
      pom: "Neck Opening",
      instruction: "Measure neckline opening circumference",
      defaultTolerance: 0.5,
    },
  ],
  jacket: [
    {
      pom: "Chest",
      instruction: 'Measure 1" below armhole, straight across chest',
      defaultTolerance: 0.5,
    },
    {
      pom: "Body Length",
      instruction: "Measure from HPS to bottom hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Sleeve Length",
      instruction: "Measure from shoulder to sleeve hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Shoulder Width",
      instruction: "Measure from shoulder seam to shoulder seam",
      defaultTolerance: 0.5,
    },
    {
      pom: "Armhole",
      instruction: "Measure armhole circumference",
      defaultTolerance: 0.5,
    },
    {
      pom: "Cuff Opening",
      instruction: "Measure sleeve cuff opening",
      defaultTolerance: 0.5,
    },
    {
      pom: "Hem Width",
      instruction: "Measure bottom hem width",
      defaultTolerance: 0.5,
    },
    {
      pom: "Collar Height",
      instruction: "Measure collar height at center back",
      defaultTolerance: 0.3,
    },
  ],
  hoodie: [
    {
      pom: "Chest",
      instruction: 'Measure 1" below armhole, straight across chest',
      defaultTolerance: 0.5,
    },
    {
      pom: "Body Length",
      instruction: "Measure from HPS to bottom hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Sleeve Length",
      instruction: "Measure from shoulder to sleeve hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Shoulder Width",
      instruction: "Measure from shoulder seam to shoulder seam",
      defaultTolerance: 0.5,
    },
    {
      pom: "Armhole",
      instruction: "Measure armhole circumference",
      defaultTolerance: 0.5,
    },
    {
      pom: "Cuff Opening",
      instruction: "Measure sleeve cuff opening",
      defaultTolerance: 0.5,
    },
    {
      pom: "Hem Width",
      instruction: "Measure bottom hem width",
      defaultTolerance: 0.5,
    },
    {
      pom: "Hood Height",
      instruction: "Measure hood from neckline to top of hood",
      defaultTolerance: 0.5,
    },
  ],
  skirt: [
    {
      pom: "Waist",
      instruction: "Measure waistband width edge to edge when laid flat",
      defaultTolerance: 0.5,
    },
    {
      pom: "Hip",
      instruction: "Measure at fullest part of hip",
      defaultTolerance: 0.5,
    },
    {
      pom: "Length",
      instruction: "Measure from waist to bottom hem",
      defaultTolerance: 0.5,
    },
    {
      pom: "Hem Width",
      instruction: "Measure bottom hem width",
      defaultTolerance: 0.5,
    },
  ],
};

const getMeasurementsForGarmentType = (garmentType) => {
  return GARMENT_MEASUREMENTS[garmentType] || GARMENT_MEASUREMENTS["shirt"];
};
export default function MeasurementSpecification() {
  
    const {techpack_id} = useParams();
  const route = useRouter();
  const [garmentType, setGarmentType] = useState("shirt");
  const mandatoryMeasurements = getMeasurementsForGarmentType(garmentType);
  const [measurementId, setMeasurementId] = useState(null);

  ///////////////////// all api calls are here //////////////////////////////
  const { data: techpackData = {}, isLoading } = useGetFashionTechpackByIdQuery(
    techpack_id,
    { skip: !techpack_id },
  );
  const garmentData = techpackData?.step_one || {};
  const measurementData = techpackData?.step_two || [];

  const [includedMaterials, { isLoading: isIncludingMaterials }] =
    useIncludedMaterialsMutation();
  const [updateIncludedMaterials, { isLoading: isUpdatingMaterials }] =
    useUpdateIncludedMaterialsMutation();

  // Form handling logic
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      baseSize: "M",
      measurementUnit: "cm",
      measurements: mandatoryMeasurements.map((m) => ({
        id: "",
        pom: m.pom,
        value: 0.2,
        tolerance: m.defaultTolerance,
        unit: "cm",
        instruction: m.instruction,
        required: true,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "measurements",
  });

  const pomInstructionMap = useMemo(() => {
    return mandatoryMeasurements.reduce((acc, m) => {
      acc[m.pom.toLowerCase()] = m.instruction;
      return acc;
    }, {});
  }, [mandatoryMeasurements]);

  const handlePomChange = useCallback((event, index) => {
    const newPom = event.target.value.toLowerCase();
    const instruction = pomInstructionMap[newPom];

    if (fields[index]?.required) {
      setValue(`measurements.${index}.instruction`, instruction || "");
    } else {
      if (instruction) {
        setValue(`measurements.${index}.instruction`, instruction);
      }
    }
  }, [pomInstructionMap, setValue]);

  const measurementUnit = watch("measurementUnit");

  // Update all measurement units when the global unit changes
  useEffect(() => {
    if (fields.length > 0 && measurementUnit) {
      const timer = setTimeout(() => {
        fields.forEach((_, index) => {
          setValue(`measurements.${index}.unit`, measurementUnit);
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [measurementUnit, fields.length, setValue]);

  const handleAddRow = useCallback(() => {
    append({
      pom: "",
      value: 0.2,
      tolerance: 0.5,
      unit: measurementUnit,
      instruction: "",
      required: false,
    });
  }, [append, measurementUnit]);

  const baseSizeOptions = [
    { value: "XXS", label: "XXS" },
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "XXXL", label: "XXXL" },
  ];

  const unitOptions = [
    { value: "cm", label: "Centimeters (cm)" },
    { value: "inches", label: 'Inches (")' },
  ];

  const requiredCount = fields.filter((f) => f.required).length;
  console.log("Required count:", measurementId);

  const onSubmit = async (data) => {
    if (measurementId) {
      const updatePayload = {
        techpack_id,
        data: data.measurements.map((m) => ({
          id: m.id,
          pom_name: m.pom,
          value: m.value,
          tolerance: m.tolerance,
          unit: m.unit,
          measurement_instruction: m.instruction,
        })),
      };
    try {
       await updateIncludedMaterials(updatePayload).unwrap();
      toast.success("Included Materials updated successfully!");
      route.push(`/${techpack_id}/fabrics`);
    } catch (error) {
      toast.error("Failed to update included materials.");
      console.error("Error updating included materials:", error);
    }
    } else {
      const payload = {
        techpack_id,
        data: [
          ...data.measurements.map((m) => ({
            pom_name: m.pom,
            value: m.value,
            tolerance: m.tolerance,
            unit: m.unit,
            measurement_instruction: m.instruction,
          })),
        ],
      };
      try {
        await includedMaterials(payload).unwrap();
        toast.success("Included Materials submitted successfully!");
        route.push(`/${techpack_id}/fabrics`);
      } catch (error) {
        toast.error("Failed to submit included materials.");
        console.error("Error submitting included materials:", error);
      }
    }

    // route.push("/dashboard/fabrics");
  };

  /// set measurement data

  useEffect(() => {
    if (measurementData && !isLoading && measurementData.length > 0) {
      const formattedMeasurements = measurementData.map((m) => ({
        id: m.id,
        pom: m.pom_name,
        value: m.value ? parseFloat(m.value) : 0.2,
        tolerance: m.tolerance ? parseFloat(m.tolerance) : 0.5,
        unit: m.unit,
        instruction: m.measurement_instruction,
        required: true,
      }));
      setValue("measurements", formattedMeasurements);
      setMeasurementId(formattedMeasurements[0]?.id || null);
    }
  }, [measurementData, isLoading, setValue]);

  useEffect(() => {
    if (garmentData && !isLoading) {
      setValue("baseSize", garmentData?.base_size);
      setGarmentType(garmentData?.garment_type?.toLowerCase());
    }
  }, [garmentData, isLoading, setValue]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Measurement Specification
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Define point-of-measure (POM) specifications for your {garmentType}
          </p>
        </div>

        {/* Base Size and Unit Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Select
              label="Base Size (Reference Size)"
              name="baseSize"
              control={control}
              errors={errors}
              options={baseSizeOptions}
              helperText="All measurements reference this size"
            />

            <Select
              label="Measurement Unit"
              name="measurementUnit"
              control={control}
              errors={errors}
              options={unitOptions}
              helperText="Will apply to all measurements"
            />
          </div>
        </div>

{/*        {/* Required Measurements starts */}

{/*        {/* Required Measurements ends */}
        
      <p className="flex items-center justify-center text-red-500 font-bold text-3xl">Work in progress 🙏🏻</p>
        {/* Submit Button */}
        {/* Navigation */}
        <div className="flex justify-between items-center my-6">
          <Link
            href={`/${techpack_id}`}
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Library
          </Link>
          <div className="flex flex-col items-end gap-2">
            <button
              type="submit"
              disabled={!isValid || isUpdatingMaterials || isIncludingMaterials}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                !isValid || isUpdatingMaterials || isIncludingMaterials
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Next: Fabrics{" "}
              {isUpdatingMaterials || isIncludingMaterials ? (
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
