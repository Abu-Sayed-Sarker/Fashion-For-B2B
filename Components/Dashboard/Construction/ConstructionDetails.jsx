"use client";
import { useForm } from "react-hook-form";
import { AlertCircle, ArrowRight, Book } from "lucide-react";
import { Input, Select } from "@/Libs/Form-components/FormComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ConstructionDetails() {
const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      garmentType: "polo",
      neckCollar: {
        stitchType: "",
        spi: "",
        seamAllowance: "",
        reinforcement: "",
        topstitch: "",
      },
      sleeve: {
        stitchType: "",
        spi: "",
        seamAllowance: "",
        reinforcement: "",
        topstitch: "",
      },
      hem: {
        stitchType: "",
        spi: "",
        seamAllowance: "",
        reinforcement: "",
        topstitch: "",
      },
      sideSeam: {
        stitchType: "",
        spi: "",
        seamAllowance: "",
        reinforcement: "",
        topstitch: "",
      },
      specialInstructions: "",
    },
  });

  // Watch all required fields
  const neckStitchType = watch("neckCollar.stitchType");
  const neckSpi = watch("neckCollar.spi");
  const sleeveStitchType = watch("sleeve.stitchType");
  const sleeveSpi = watch("sleeve.spi");
  const hemStitchType = watch("hem.stitchType");
  const hemSpi = watch("hem.spi");

  // Calculate missing fields dynamically
  const missingFields = [];
  if (!neckStitchType)
    missingFields.push("Neck/Collar Stitch Type is required");
  if (!neckSpi) missingFields.push("Neck/Collar SPI is required");
  if (!sleeveStitchType) missingFields.push("Sleeve Stitch Type is required");
  if (!sleeveSpi) missingFields.push("Sleeve SPI is required");
  if (!hemStitchType) missingFields.push("Hem Stitch Type is required");
  if (!hemSpi) missingFields.push("Hem SPI is required");

  const hasErrors = missingFields.length > 0;

  const onSubmit = (data) => {
    if (hasErrors) {
      return;
    }
    console.log("Construction Details:", data);
    router.push("/dashboard/artwork");
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
          {/* Neck/Collar Construction */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6 relative">
            <span className="absolute -top-2 right-4 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded">
              Required
            </span>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-blue-600 text-lg">👔</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Neck/Collar Construction{" "}
                  <span className="text-red-500">*</span>
                </h3>
                <p className="text-xs text-gray-600">
                  Collar attachment and placket specifications
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Select
                label="Stitch Type"
                name="neckCollar.stitchType"
                control={control}
                errors={errors.neckCollar || {}}
                options={stitchTypeOptions}
                required={true}
                placeholder="Select stitch type"
              />

              <Select
                label="SPI (Stitches Per Inch)"
                name="neckCollar.spi"
                control={control}
                errors={errors.neckCollar || {}}
                options={spiOptions}
                required={true}
                placeholder="Select SPI"
              />

              <Select
                label="Seam Allowance"
                name="neckCollar.seamAllowance"
                control={control}
                errors={errors.neckCollar || {}}
                options={seamAllowanceOptions}
                placeholder="Select seam allowance"
              />

              <Select
                label="Reinforcement Points"
                name="neckCollar.reinforcement"
                control={control}
                errors={errors.neckCollar || {}}
                options={reinforcementOptions}
                placeholder="Select reinforcement"
              />
            </div>

            <div className="mt-4">
              <Input
                label="Topstitch / Coverstitch Logic"
                name="neckCollar.topstitch"
                register={register}
                errors={errors.neckCollar || {}}
                placeholder="e.g., Single needle 0.5cm from edge, Double needle 0.6cm spacing"
                helperText="e.g., Single needle 0.5cm from edge, Double needle 0.6cm spacing"
              />
            </div>
          </div>

          {/* Sleeve Construction */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6 relative">
            <span className="absolute -top-2 right-4 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded">
              Required
            </span>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                <span className="text-green-600 text-lg">👕</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Sleeve Construction <span className="text-red-500">*</span>
                </h3>
                <p className="text-xs text-gray-600">
                  Sleeve attachment and cuff details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Select
                label="Stitch Type"
                name="sleeve.stitchType"
                control={control}
                errors={errors.sleeve || {}}
                options={stitchTypeOptions}
                required={true}
                placeholder="Select stitch type"
              />

              <Select
                label="SPI (Stitches Per Inch)"
                name="sleeve.spi"
                control={control}
                errors={errors.sleeve || {}}
                options={spiOptions}
                required={true}
                placeholder="Select SPI"
              />

              <Select
                label="Seam Allowance"
                name="sleeve.seamAllowance"
                control={control}
                errors={errors.sleeve || {}}
                options={seamAllowanceOptions}
                placeholder="Select seam allowance"
              />

              <Select
                label="Reinforcement Points"
                name="sleeve.reinforcement"
                control={control}
                errors={errors.sleeve || {}}
                options={reinforcementOptions}
                placeholder="Select reinforcement"
              />
            </div>

            <div className="mt-4">
              <Input
                label="Topstitch / Coverstitch Logic"
                name="sleeve.topstitch"
                register={register}
                errors={errors.sleeve || {}}
                placeholder="e.g., Single needle 0.5cm from edge, Double needle 0.6cm spacing"
                helperText="e.g., Single needle 0.5cm from edge, Double needle 0.6cm spacing"
              />
            </div>
          </div>

          {/* Hem Construction */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6 relative">
            <span className="absolute -top-2 right-4 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded">
              Required
            </span>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                <span className="text-purple-600 text-lg">✂️</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Hem Construction <span className="text-red-500">*</span>
                </h3>
                <p className="text-xs text-gray-600">
                  Bottom hem and side vents
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Select
                label="Stitch Type"
                name="hem.stitchType"
                control={control}
                errors={errors.hem || {}}
                options={stitchTypeOptions}
                required={true}
                placeholder="Select stitch type"
              />

              <Select
                label="SPI (Stitches Per Inch)"
                name="hem.spi"
                control={control}
                errors={errors.hem || {}}
                options={spiOptions}
                required={true}
                placeholder="Select SPI"
              />

              <Select
                label="Seam Allowance"
                name="hem.seamAllowance"
                control={control}
                errors={errors.hem || {}}
                options={seamAllowanceOptions}
                placeholder="Select seam allowance"
              />

              <Select
                label="Reinforcement Points"
                name="hem.reinforcement"
                control={control}
                errors={errors.hem || {}}
                options={reinforcementOptions}
                placeholder="Select reinforcement"
              />
            </div>

            <div className="mt-4">
              <Input
                label="Topstitch / Coverstitch Logic"
                name="hem.topstitch"
                register={register}
                errors={errors.hem || {}}
                placeholder="e.g., Single needle 0.5cm from edge, Double needle 0.6cm spacing"
                helperText="e.g., Single needle 0.5cm from edge, Double needle 0.6cm spacing"
              />
            </div>
          </div>

          {/* Side Seam Construction */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-600 text-lg">📐</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Side Seam Construction
                </h3>
                <p className="text-xs text-gray-600">Side seam assembly</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Select
                label="Stitch Type"
                name="sideSeam.stitchType"
                control={control}
                errors={errors.sideSeam || {}}
                options={stitchTypeOptions}
                placeholder="Select stitch type"
              />

              <Select
                label="SPI (Stitches Per Inch)"
                name="sideSeam.spi"
                control={control}
                errors={errors.sideSeam || {}}
                options={spiOptions}
                placeholder="Select SPI"
              />

              <Select
                label="Seam Allowance"
                name="sideSeam.seamAllowance"
                control={control}
                errors={errors.sideSeam || {}}
                options={seamAllowanceOptions}
                placeholder="Select seam allowance"
              />

              <Select
                label="Reinforcement Points"
                name="sideSeam.reinforcement"
                control={control}
                errors={errors.sideSeam || {}}
                options={reinforcementOptions}
                placeholder="Select reinforcement"
              />
            </div>

            <div className="mt-4">
              <Input
                label="Topstitch / Coverstitch Logic"
                name="sideSeam.topstitch"
                register={register}
                errors={errors.sideSeam || {}}
                placeholder="e.g., Single needle 0.5cm from edge, Double needle 0.6cm spacing"
                helperText="e.g., Single needle 0.5cm from edge, Double needle 0.6cm spacing"
              />
            </div>
          </div>

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
              href="/dashboard/trims"
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
