"use client";
import { useForm } from "react-hook-form";
import { AlertCircle, ArrowRight, Book } from "lucide-react";
import { Input, Select } from "@/Libs/Form-components/FormComponent";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useGetFashionTechpackByIdQuery } from "@/Apis/Get-Fashion/getFashionApi";
import { useEffect, useState } from "react";
import { useIncludedConstructionDetailsMutation, useUpdateConstructionDetailsMutation } from "@/Apis/Poast-a-fashion/postAFashionApi";

// Garment-type specific construction areas
const GARMENT_CONSTRUCTION_AREAS = {
  "t-shirt": [
    {
      area: "neck",
      title: "Neck Construction",
      icon: "👔",
      description: "Collar, neckline, and neck binding specifications",
      required: true,
    },
    {
      area: "sleeve",
      title: "Sleeve Construction",
      icon: "👕",
      description: "Sleeve attachment, armhole, and sleeve hem details",
      required: true,
    },
    {
      area: "hem",
      title: "Hem Construction",
      icon: "📏",
      description: "Bottom hem and hemline finishing",
      required: true,
    },
    {
      area: "side",
      title: "Side Seam Construction",
      icon: "📐",
      description: "Side seam assembly and finishing",
      required: false,
    },
  ],
  polo: [
    {
      area: "neck",
      title: "Neck/Collar Construction",
      icon: "👔",
      description: "Collar attachment and placket specifications",
      required: true,
    },
    {
      area: "sleeve",
      title: "Sleeve Construction",
      icon: "👕",
      description: "Sleeve attachment and cuff details",
      required: true,
    },
    {
      area: "hem",
      title: "Hem Construction",
      icon: "📏",
      description: "Bottom hem and side vents",
      required: true,
    },
    {
      area: "side",
      title: "Side Seam Construction",
      icon: "📐",
      description: "Side seam assembly",
      required: false,
    },
  ],
  hoodie: [
    {
      area: "hoodCuff",
      title: "Hood Construction",
      icon: "🧢",
      description: "Hood assembly, lining, and drawstring details",
      required: true,
    },
    {
      area: "sleeve",
      title: "Sleeve Construction",
      icon: "👕",
      description: "Sleeve attachment and cuff details",
      required: true,
    },
    {
      area: "hem",
      title: "Hem/Waistband Construction",
      icon: "📏",
      description: "Bottom rib or hem finishing",
      required: true,
    },
    {
      area: "side",
      title: "Side Seam Construction",
      icon: "📐",
      description: "Side seam assembly",
      required: false,
    },
  ],
  jacket: [
    {
      area: "neck",
      title: "Collar/Neckline Construction",
      icon: "👔",
      description: "Collar, lapel, and neck facing details",
      required: true,
    },
    {
      area: "sleeve",
      title: "Sleeve Construction",
      icon: "👕",
      description: "Sleeve attachment and lining details",
      required: true,
    },
    {
      area: "hem",
      title: "Hem Construction",
      icon: "📏",
      description: "Bottom hem and lining hem",
      required: true,
    },
    {
      area: "side",
      title: "Side Seam Construction",
      icon: "📐",
      description: "Side seam and lining assembly",
      required: false,
    },
  ],
  jeans: [
    {
      area: "waistband",
      title: "Waistband Construction",
      icon: "⚡",
      description: "Waistband assembly, button, and fly specifications",
      required: true,
    },
    {
      area: "inseam",
      title: "Inseam Construction",
      icon: "📏",
      description: "Inner leg seam assembly",
      required: true,
    },
    {
      area: "outseam",
      title: "Outseam Construction",
      icon: "📐",
      description: "Outer leg seam assembly",
      required: true,
    },
    {
      area: "hem",
      title: "Hem Construction",
      icon: "📏",
      description: "Bottom hem finishing",
      required: true,
    },
  ],
  pants: [
    {
      area: "waistband",
      title: "Waistband Construction",
      icon: "⚡",
      description: "Waistband assembly and closure",
      required: true,
    },
    {
      area: "inseam",
      title: "Inseam Construction",
      icon: "📏",
      description: "Inner leg seam assembly",
      required: true,
    },
    {
      area: "outseam",
      title: "Outseam Construction",
      icon: "📐",
      description: "Outer leg seam assembly",
      required: true,
    },
    {
      area: "hem",
      title: "Hem Construction",
      icon: "📏",
      description: "Bottom hem finishing",
      required: true,
    },
  ],
  shorts: [
    {
      area: "waistband",
      title: "Waistband Construction",
      icon: "⚡",
      description: "Waistband assembly and closure",
      required: true,
    },
    {
      area: "inseam",
      title: "Inseam Construction",
      icon: "📏",
      description: "Inner leg seam assembly",
      required: true,
    },
    {
      area: "hem",
      title: "Hem Construction",
      icon: "📏",
      description: "Bottom hem finishing",
      required: true,
    },
  ],
  dress: [
    {
      area: "neck",
      title: "Neckline Construction",
      icon: "👔",
      description: "Neckline and collar specifications",
      required: true,
    },
    {
      area: "sleeve",
      title: "Sleeve Construction",
      icon: "👕",
      description: "Sleeve attachment details (if applicable)",
      required: false,
    },
    {
      area: "hem",
      title: "Hem Construction",
      icon: "📏",
      description: "Bottom hem and lining hem",
      required: true,
    },
    {
      area: "side",
      title: "Side Seam Construction",
      icon: "📐",
      description: "Side seam and zipper assembly",
      required: false,
    },
  ],
  skirt: [
    {
      area: "waistband",
      title: "Waistband Construction",
      icon: "⚡",
      description: "Waistband assembly and closure",
      required: true,
    },
    {
      area: "hem",
      title: "Hem Construction",
      icon: "📏",
      description: "Bottom hem finishing",
      required: true,
    },
  ],
};

export default function ConstructionDetails() {
  
  const {techpack_id} = useParams();
  const router = useRouter();
  const [haveId, setHaveId] = useState(null);
  const [garmentType, setGarmentType] = useState("");
  const currentAreas =
    GARMENT_CONSTRUCTION_AREAS[garmentType] ||
    GARMENT_CONSTRUCTION_AREAS["t-shirt"];

  ///////////////////// all api calls are here //////////////////////////////
  const { data: techpackData = {}, isLoading } = useGetFashionTechpackByIdQuery(
    techpack_id,
    { skip: !techpack_id },
  );
  const garmentData = techpackData?.step_one || {};
  const constructionData = techpackData?.step_five || [];

  console.log("construction data", constructionData);
  const [includedConstructionDetails, { isLoading: isIncludingConstruction }] =
    useIncludedConstructionDetailsMutation();
  const [updateConstructionDetails, { isLoading: isUpdatingConstruction }] =
    useUpdateConstructionDetailsMutation();
  // ---------------------------------------//

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      garmentType: "polo",
      specialInstructions: "",
      ...currentAreas.reduce((acc, area) => {
        acc[area.area] = {
          stitchType: "",
          spi: "",
          seamAllowance: "",
          reinforcement: "",
          topstitch: "",
        };
        return acc;
      }, {}),
    },
  });

  const formValues = watch();

  // Calculate missing fields dynamically
  const missingFields = [];
  currentAreas.forEach((area) => {
    if (area.required) {
      const areaValues = formValues[area.area] || {};
      if (!areaValues.stitchType)
        missingFields.push(`${area.title} Stitch Type is required`);
      if (!areaValues.spi) missingFields.push(`${area.title} SPI is required`);
    }
  });

  const hasErrors = missingFields.length > 0;

  // "construction_name": "Nechk Type",
  //       "stitch_type": "Tank df step -5 ",
  //       "spi": "18"
  const onSubmit = async(data) => {
    if (hasErrors) {
      return;
    }
    const payload = {
      techpack_id,
      data: {
        construction_details: currentAreas.map((area) => ({
          construction_name: area.title,
          stitch_type: data[area.area].stitchType,
          spi: data[area.area].spi,
          seam_allowance: data[area.area].seamAllowance,
          reinforcement: data[area.area].reinforcement,
          topstitch: data[area.area].topstitch,
        })),
        special_instructions: data.specialInstructions,
      },
    };


    // console.log("Construction Details:", data);
    // router.push("/dashboard/artwork");
  };

  const stitchTypeOptions = [
    { value: "301", label: "301 - Lockstitch" },
    { value: "401", label: "401 - Chain Stitch" },
    { value: "504", label: "504 - Overlock (3-thread)" },
    { value: "514", label: "514 - Overlock (4-thread)" },
    { value: "516", label: "516 - Safety Stitch" },
    { value: "602", label: "602 - Coverstitch" },
    { value: "406", label: "406 - Flatlock" },
  ];

  const spiOptions = [
    { value: "10-12", label: "10-12 SPI" },
    { value: "12-14", label: "12-14 SPI" },
    { value: "14-16", label: "14-16 SPI" },
    { value: "8-10", label: "8-10 SPI" },
  ];

  const seamAllowanceOptions = [
    { value: "1cm", label: '1cm (3/8")' },
    { value: "1.5cm", label: '1.5cm (5/8")' },
    { value: "0.6cm", label: '0.6cm (1/4")' },
    { value: "0.3cm", label: '0.3cm (1/8")' },
  ];

  const reinforcementOptions = [
    { value: "bartack", label: "Bartack" },
    { value: "double-stitch", label: "Double Stitch" },
    { value: "tape", label: "Reinforcement Tape" },
    { value: "none", label: "None" },
  ];

  useEffect(() => {
    if (garmentData) {
      setGarmentType(garmentData?.garment_type?.toLowerCase() || "t-shirt");
    }
  }, [garmentData]);
  return (
    <>
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Construction Details
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Define stitch-specific construction specifications for precise
            manufacturing
          </p>
        </div>

        {/* Error Alert */}
        {hasErrors && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                  {missingFields.map((field, index) => (
                    <li key={index}>{field}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {currentAreas.map((area) => (
            <div
              key={area.area}
              className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6 relative"
            >
              {area.required && (
                <span className="absolute -top-2 right-4 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded">
                  Required
                </span>
              )}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 text-lg">{area.icon}</span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {area.title}{" "}
                    {area.required && <span className="text-red-500">*</span>}
                  </h3>
                  <p className="text-xs text-gray-600">{area.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Select
                  label="Stitch Type"
                  name={`${area.area}.stitchType`}
                  control={control}
                  errors={errors[area.area] || {}}
                  options={stitchTypeOptions}
                  required={area.required}
                  placeholder="Select stitch type"
                />

                <Select
                  label="SPI (Stitches Per Inch)"
                  name={`${area.area}.spi`}
                  control={control}
                  errors={errors[area.area] || {}}
                  options={spiOptions}
                  required={area.required}
                  placeholder="Select SPI"
                />

                <Select
                  label="Seam Allowance"
                  name={`${area.area}.seamAllowance`}
                  control={control}
                  errors={errors[area.area] || {}}
                  options={seamAllowanceOptions}
                  placeholder="Select seam allowance"
                />

                <Select
                  label="Reinforcement Points"
                  name={`${area.area}.reinforcement`}
                  control={control}
                  errors={errors[area.area] || {}}
                  options={reinforcementOptions}
                  placeholder="Select reinforcement"
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Topstitch / Coverstitch Logic"
                  name={`${area.area}.topstitch`}
                  register={register}
                  errors={errors[area.area] || {}}
                  placeholder="e.g., Single needle 0.5cm from edge, Double needle 0.6cm spacing"
                  helperText="e.g., Single needle 0.5cm from edge, Double needle 0.6cm spacing"
                />
              </div>
            </div>
          ))}

          {/* Special Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 md:p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                <span className="text-yellow-600 text-lg">📝</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Special Instructions & Notes
                </h3>
                <p className="text-xs text-yellow-700">
                  Additional construction notes, critical points, or special
                  requirements
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Special Construction Instructions
              </label>
              <textarea
                {...register("specialInstructions")}
                rows={4}
                placeholder="e.g., Use interfacing (thread) for all seams, Reinforce all stress points with bartack, Apply fusible interlining to collar..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none focus:ring-2 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Include any critical construction notes, quality requirements,
                or special techniques
              </p>
            </div>
          </div>

          {/* Quick Reference Guide */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Book className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-semibold text-blue-900">
                Quick Reference Guide
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Stitch Types
                </h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Lockstitch: 301 - General sewing</li>
                  <li>• Overlock: 504 - Edge finishing</li>
                  <li>• Coverstitch: 602 - Hemming</li>
                  <li>• Flatlock: 607 - Sportswear</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  SPI Guidelines
                </h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Light: 14-16 SPI</li>
                  <li>• Medium: 12-14 SPI</li>
                  <li>• Heavy: 8-10 SPI</li>
                  <li>• Stretch: 10-12 SPI</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Seam Allowances
                </h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• General: 1cm (3/8")</li>
                  <li>• Neckline: 0.6cm (1/4")</li>
                  <li>• Narrow: 0.6cm ~ 1cm</li>
                  <li>• Flat-felled: 1.5cm total</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          {/* Navigation */}
          <div className="flex justify-between items-center my-6">
            <Link
              href={`/${techpack_id}/trims`}
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Trims & Accessories
            </Link>
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
                Next: Artwork & Graphics
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
    </>
  );
}
