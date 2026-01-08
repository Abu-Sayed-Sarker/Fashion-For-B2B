import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateFashionByIdAndStepMutation,
  useGetFashionByIdQuery,
  useUpdateFashionByIdMutation,
} from "../../Api/allApi";

// Mock SelectField component for demonstration
const SelectField = ({
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
  helperText,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
  </div>
);

export default function StapesTow({ goToNextStep, goToPreviousStep }) {
  const parentId = useSelector((state) => state.addFashion.id);

  const [currentStepId, setCurrentStepId] = useState(null);
  const [updateFashionById] = useUpdateFashionByIdMutation();

  const [createFashionByIdAndStep] = useCreateFashionByIdAndStepMutation();
  const { data: fashionInfo } = useGetFashionByIdQuery(parentId, {
    skip: !parentId,
  });

  const [baseSize, setBaseSize] = useState("M");
  const [defaultUnit, setDefaultUnit] = useState("CM");

  // Mandatory measurements for tank-top
  const mandatoryMeasurements = [
    {
      id: 1,
      pom: "Chest",
      instruction: 'Measure 1" below armhole, straight across chest',
      locked: false,
    },
    {
      id: 2,
      pom: "Body Length",
      instruction: "Measure from HPS (high point shoulder) to bottom hem",
      locked: false,
    },
    {
      id: 3,
      pom: "Sleeve Length",
      instruction: "Measure from shoulder seam to sleeve hem",
      locked: false,
    },
    {
      id: 4,
      pom: "Shoulder Width",
      instruction: "Measure from shoulder seam to shoulder seam across back",
      locked: false,
    },
    {
      id: 5,
      pom: "Armhole",
      instruction: "Measure armhole circumference from shoulder seam",
      locked: false,
    },
    {
      id: 6,
      pom: "Hem Width",
      instruction: "Measure bottom hem width edge to edge when laid flat",
      locked: false,
    },
    {
      id: 7,
      pom: "Neck Opening",
      instruction: "Measure neckline opening circumference",
      locked: false,
    },
    {
      id: 8,
      pom: "Waist",
      instruction: "Measure waist circumference",
      locked: false,
    },
  ];

  const [measurements, setMeasurements] = useState([
    ...mandatoryMeasurements.map((m) => ({
      ...m,
      measurement_value: "0.2",
      tolerance: "±0.5",
      unit: defaultUnit,
    })),
  ]);

  const sizes = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
  ];

  const units = [
    { value: "CM", label: "Centimeters (cm)" },
    { value: "INCH", label: "Inches (in)" },
    { value: "MM", label: "Millimeters (mm)" },
  ];

  const addMeasurementRow = () => {
    const newMeasurement = {
      id: Date.now(),
      pom: "",
      measurement_value: "0.2",
      tolerance: "±0.5",
      unit: defaultUnit,
      instruction: "",
      locked: false,
    };
    setMeasurements([...measurements, newMeasurement]);
  };

  const updateMeasurement = (id, field, value) => {
    setMeasurements(
      measurements.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const removeMeasurement = (id) => {
    const measurement = measurements.find((m) => m.id === id);
    if (!measurement.locked) {
      setMeasurements(measurements.filter((m) => m.id !== id));
    }
  };

  const handleSubmit = async () => {
    if (!baseSize || !defaultUnit) {
      return toast.error("Please fill in all required fields.");
    }

    const requiredMeasurements = measurements.filter((m) => m.locked);
    if (
      !requiredMeasurements.every(
        (m) => m.pom && m.measurement_value && m.unit && m.tolerance
      )
    ) {
      return toast.error("Please fill in all required measurements.");
    }

    const formattedData = measurements
      .filter((m) => m.pom.trim() !== "")
      .map(({ locked, ...rest }) => rest);
    if (currentStepId) {
      const data = {
        data: { data: formattedData },
        is_completed: true,
        stepsId: currentStepId,
        parentId: parentId,
      };
      try {
        await updateFashionById(data);
        toast.success("Measurement data updated successfully!");
        goToNextStep();
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to save measurement data.");
      }
    } else {
      const data = {
        data: formattedData,
        is_complete: true,
      };
      try {
        await createFashionByIdAndStep({
          id: parentId,
          step: 2,
          data: data,
        });
        toast.success("Measurement data saved successfully!");
        goToNextStep();
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to save measurement data.");
      }
    }
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  const requiredCount = measurements.filter((m) => m.locked).length;
  const totalCount = measurements.filter((m) => m.pom.trim() !== "").length;

  ///// set measurement data

  useEffect(() => {
    if (fashionInfo?.steps[1]) {
      const requiredMeasurements =
        fashionInfo.steps[1]?.data?.slice(0, 8).map((m) => ({
          ...m,
          locked: false,
        })) || [];

      const customMeasurements =
        fashionInfo?.steps[1]?.data
          ?.slice(8, fashionInfo.steps[1].data.length + 1)
          .map((m) => ({
            ...m,
            locked: false,
          })) || [];

      setMeasurements([...requiredMeasurements, ...customMeasurements]);
      setBaseSize(fashionInfo.steps[0]?.data[0]?.base_size);
      setCurrentStepId(fashionInfo.steps[1]?.step_id);
    }
  }, [fashionInfo]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Measurement Specification
          </h1>
          <p className="text-gray-600">
            Define point-of-measure (POM) specifications for your tank-top
          </p>
        </div>

        {/* Base Size and Default Unit */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <SelectField
              label="Base Size (Reference Size)"
              required
              value={baseSize}
              onChange={setBaseSize}
              options={sizes}
              placeholder="Select size"
              helperText="All measurements reference this size"
            />

            <SelectField
              label="Measurement Unit"
              required
              value={defaultUnit}
              onChange={setDefaultUnit}
              options={units}
              placeholder="Select unit"
              helperText="Will apply to all measurements"
            />
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-semibold text-blue-900 text-sm">
              {requiredCount} Mandatory Measurements for tank-top
            </p>
            <p className="text-blue-700 text-sm">
              Required measurements are automatically loaded based on garment
              type. You can add additional custom measurements using the button
              below.
            </p>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">
                    POM ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    POM Name <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                    Value <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                    Tolerance <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">
                    Unit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Measurement Instruction
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {measurements.map((measurement, index) => (
                  <tr
                    key={measurement.id}
                    className={measurement.locked ? "bg-yellow-50" : "bg-white"}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {measurement.locked && (
                          <svg
                            className="w-4 h-4 text-yellow-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span className="text-sm font-medium text-gray-700">
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={measurement.pom}
                        onChange={(e) =>
                          updateMeasurement(
                            measurement.id,
                            "pom",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Waist Width"
                        disabled={measurement.locked}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          measurement.locked
                            ? "bg-yellow-50 border-yellow-200 text-gray-700"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={measurement.measurement_value}
                        onChange={(e) =>
                          updateMeasurement(
                            measurement.id,
                            "measurement_value",
                            e.target.value
                          )
                        }
                        placeholder="0.2"
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                          ±
                        </span>
                        <input
                          type="number"
                          value={measurement.tolerance.replace("±", "")}
                          onChange={(e) =>
                            updateMeasurement(
                              measurement.id,
                              "tolerance",
                              `±${e.target.value}`
                            )
                          }
                          placeholder="0.5"
                          className="w-full pl-7 pr-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">
                        {defaultUnit || "cm"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={measurement.instruction}
                        onChange={(e) =>
                          updateMeasurement(
                            measurement.id,
                            "instruction",
                            e.target.value
                          )
                        }
                        placeholder="How to measure (optional)"
                        disabled={measurement.locked}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          measurement.locked
                            ? "bg-yellow-50 border-yellow-200 text-gray-600 italic"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      {measurement.locked ? (
                        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded">
                          Required
                        </span>
                      ) : (
                        <button
                          onClick={() => removeMeasurement(measurement.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-gray-50">
            <button
              onClick={addMeasurementRow}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Custom Measurement Row
            </button>
            <div className="text-sm text-gray-600">
              <span className="font-medium">{totalCount}</span> measurements
              total • <span className="font-medium">{requiredCount}</span>{" "}
              required
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Garment Setup
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Next: Fabrics & Materials
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
