"use client";
import { useState, useEffect, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, X, Info, ArrowRight } from "lucide-react";
import { Select } from "@/Libs/Form-components/FormComponent";

// Garment-type-specific mandatory measurements
const GARMENT_MEASUREMENTS = {
  shirt: [
    {
      pom: "Chest",
      instruction: 'Measure 1" below armhole, straight across chest',
      defaultTolerance: "±0.5",
    },
    {
      pom: "Body Length",
      instruction: "Measure from HPS to bottom hem",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Sleeve Length",
      instruction: "Measure from shoulder to sleeve hem",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Shoulder Width",
      instruction: "Measure from shoulder seam to shoulder seam",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Armhole",
      instruction: "Measure armhole circumference",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Cuff Opening",
      instruction: "Measure sleeve cuff opening",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Hem Width",
      instruction: "Measure bottom hem width",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Collar Height",
      instruction: "Measure collar height at center back",
      defaultTolerance: "±0.3",
    },
  ],
  coat: [
    {
      pom: "Chest",
      instruction: 'Measure 1" below armhole, straight across chest',
      defaultTolerance: "±0.5",
    },
    {
      pom: "Body Length",
      instruction: "Measure from HPS to bottom hem",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Sleeve Length",
      instruction: "Measure from shoulder to sleeve hem",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Shoulder Width",
      instruction: "Measure from shoulder seam to shoulder seam",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Armhole",
      instruction: "Measure armhole circumference",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Cuff Opening",
      instruction: "Measure sleeve cuff opening",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Hem Width",
      instruction: "Measure bottom hem width",
      defaultTolerance: "±0.5",
    },
    {
      pom: "Collar Height",
      instruction: "Measure collar height at center back",
      defaultTolerance: "±0.3",
    },
  ],
};

const getMeasurementsForGarmentType = (garmentType) => {
  return GARMENT_MEASUREMENTS[garmentType] || GARMENT_MEASUREMENTS["shirt"];
};

export default function MeasurementSpecification() {
  const [garmentType] = useState("shirt");
  const mandatoryMeasurements = getMeasurementsForGarmentType(garmentType);
  const [error, setError] = useState("");

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      baseSize: "M",
      measurementUnit: "cm",
      measurements: mandatoryMeasurements.map((m) => ({
        pom: m.pom,
        value: "0.2",
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

  const handlePomChange = (event, index) => {
    const newPom = event.target.value.toLowerCase();
    const instruction = pomInstructionMap[newPom];

    if (fields[index].required) {
      // For originally mandatory rows, keep instruction in sync or clear it.
      setValue(`measurements.${index}.instruction`, instruction || "");
    } else {
      // For custom rows, only fill if a match is found. Don't clear user input.
      if (instruction) {
        setValue(`measurements.${index}.instruction`, instruction);
      }
    }
  };
  const measurementUnit = watch("measurementUnit");

  // Update all measurement units when the global unit changes
  useEffect(() => {
    fields.forEach((_, index) => {
      setValue(`measurements.${index}.unit`, measurementUnit);
    });
  }, [measurementUnit, fields, setValue]);

  const handleAddRow = () => {
    append({
      pom: "",
      value: "0.2",
      tolerance: "±0.5",
      unit: measurementUnit,
      instruction: "",
      required: false,
    });
  };

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

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // console.log('Base Size:', data.baseSize);
    // console.log('Measurement Unit:', data.measurementUnit);
    // console.log('Measurements:', data.measurements);
    // console.log('Total Measurements:', data.measurements.length);
    // console.log('Required Measurements:', data.measurements.filter(m => m.required).length);
  };

  let hasError = false;
  useEffect(() => {
    const subscription = watch((value) => {
      hasError = false;
      Object.keys(value).forEach((key) => {
        const errors = value[key];
        if (errors) {
          hasError = true;
        }
      });
      setError(hasError);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  console.log("hasError:", hasError);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
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

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex gap-2 md:gap-3">
            <Info className="w-4 h-4 md:w-5 md:h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm">
              <p className="font-medium text-blue-900 mb-1">
                {mandatoryMeasurements.length} Mandatory Measurements for{" "}
                {garmentType}
              </p>
              <p className="text-blue-800">
                Required measurements are automatically loaded based on garment
                type. You can add additional custom measurements using the
                button below.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: Card View */}
        <div className="block md:hidden space-y-4 mb-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-white rounded-lg border border-gray-200 p-4 relative"
            >
              {/* Required Badge */}
              {field.required && (
                <span className="absolute top-2 right-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                  Required
                </span>
              )}

              {/* POM ID */}
              <div className="text-xs text-gray-500 mb-3">POM #{index + 1}</div>

              {/* POM Name */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  POM Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`measurements.${index}.pom`)}
                  onChange={(e) => handlePomChange(e, index)}
                  placeholder="e.g., Waist Width"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                {/* Value */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register(`measurements.${index}.value`)}
                    type="number"
                    step="0.1"
                    placeholder="0.2"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Tolerance */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tolerance <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register(`measurements.${index}.tolerance`)}
                    placeholder="±0.5"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Unit */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <div className="text-sm text-gray-600 font-medium px-3 py-2 bg-gray-50 rounded-md">
                  {watch(`measurements.${index}.unit`)}
                </div>
              </div>

              {/* Instruction */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Measurement Instruction
                </label>
                {field.required ? (
                  <p className="text-xs text-gray-600 italic px-3 py-2 bg-gray-50 rounded-md">
                    {watch(`measurements.${index}.instruction`)}
                  </p>
                ) : (
                  <input
                    {...register(`measurements.${index}.instruction`)}
                    placeholder="How to measure (optional)"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => remove(index)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50"
              >
                <X className="w-4 h-4" />
                Remove Measurement
              </button>
            </div>
          ))}
        </div>

        {/* Desktop: Table View */}
        <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-20">
                    POM ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    POM Name <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-32">
                    Value <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-32">
                    Tolerance <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">
                    Unit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Measurement Instruction
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fields.map((field, index) => {
                  return (
                    <tr key={field.id} className="hover:bg-gray-50">
                      {/* POM ID */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {index + 1}
                          </span>
                        </div>
                      </td>

                      {/* POM Name */}
                      <td className="px-4 py-3">
                        <input
                          {...register(`measurements.${index}.pom`)}
                          onChange={(e) => handlePomChange(e, index)}
                          placeholder="e.g., Waist Width"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>

                      {/* Value */}
                      <td className="px-4 py-3">
                        <input
                          {...register(`measurements.${index}.value`)}
                          type="number"
                          step="0.1"
                          placeholder="0.2"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>

                      {/* Tolerance */}
                      <td className="px-4 py-3">
                        <input
                          {...register(`measurements.${index}.tolerance`)}
                          placeholder="±0.5"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>

                      {/* Unit */}
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 font-medium">
                          {watch(`measurements.${index}.unit`)}
                        </span>
                      </td>

                      {/* Measurement Instruction */}
                      <td className="px-4 py-3">
                        {field.required ? (
                          <p className="text-xs text-gray-600 italic">
                            {watch(`measurements.${index}.instruction`)}
                          </p>
                        ) : (
                          <input
                            {...register(`measurements.${index}.instruction`)}
                            placeholder="How to measure (optional)"
                            className="w-full px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3 text-center">
                        <div className="relative inline-block">
                          {field.required && (
                            <span className="absolute -top-7 -right-4 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200 whitespace-nowrap">
                              Required
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Button and Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <button
            type="button"
            onClick={handleAddRow}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
            Add Custom Measurement Row
          </button>

          <div className="text-xs md:text-sm text-gray-600 text-center md:text-right">
            <span className="font-medium">{fields.length}</span> measurements
            total
            <span className="mx-2">•</span>
            <span className="font-medium text-orange-600">
              {requiredCount}
            </span>{" "}
            required
          </div>
        </div>

        {/* Submit Button */}
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Library
          </button>
          <div className="flex flex-col items-end gap-2">
            <button
              type="submit"
              disabled={hasError}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors bg-gray-900 text-white hover:bg-gray-800`}
            >
              Next: Measurements
              <ArrowRight className="w-4 h-4" />
            </button>

            {hasError && (
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
