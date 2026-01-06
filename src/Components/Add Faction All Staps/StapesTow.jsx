import { useEffect, useState } from "react";
import { SelectField } from "../../Libs/FromComponents";
import { useDispatch, useSelector } from "react-redux";
import { setMeasurementsData } from "../../Features/addFashionSlice";
import { toast } from "react-toastify";

// Main Component
export default function StapesTow({ goToNextStep, goToPreviousStep }) {
  const garmentInfo = useSelector((state) => state.addFashion.garment_setup);
  const measurementsData = useSelector(
    (state) => state.addFashion.measurements
  );
  const dispatch = useDispatch();

  const [baseSize, setBaseSize] = useState("M");
  const [defaultUnit, setDefaultUnit] = useState("CM");
  const [measurements, setMeasurements] = useState([
    {
      id: 1,
      pom: "",
      measurement_value: "",
      tolerance: "",
      unit: "",
    },
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

  const measurementUnits = [
    { value: "CM", label: "CM" },
    { value: "INCH", label: "INCH" },
    { value: "MM", label: "MM" },
  ];

  const addMeasurementRow = () => {
    const newMeasurement = {
      id: Date.now(),
      pom: "",
      measurement_value: "0.0",
      tolerance: "±0.5",
      unit: "CM",
    };
    setMeasurements([...measurements, newMeasurement]);
  };

  const updateMeasurement = (id, field, value) => {
    setMeasurements(
      measurements.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const removeMeasurement = (id) => {
    if (measurements.length > 1) {
      setMeasurements(measurements.filter((m) => m.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!baseSize || !defaultUnit) {
      return toast.error("Please fill in all required fields.");
    }

    if (
      !measurements.every(
        (m) => m.pom && m.measurement_value && m.unit && m.tolerance
      )
    ) {
      return toast.error("Please fill in all required fields.");
    }

    const formattedData = measurements.map(({ id, ...rest }) => rest);
    dispatch(setMeasurementsData(formattedData));
    goToNextStep();
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  useEffect(() => {
    if (garmentInfo) {
      setBaseSize(garmentInfo.base_size);
      setDefaultUnit(garmentInfo.measurement_unit);
    }
  }, [garmentInfo]);

  useEffect(() => {
    if (measurementsData) {
      setMeasurements(
        measurementsData.map((m, index) => ({ ...m, id: index + 1 }))
      );
    }
  }, [measurementsData]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Measurement Specification
          </h1>
          <p className="text-gray-600">
            Define point-of-measure (POM) specifications for your garment
          </p>
        </div>

        {/* Base Size and Default Unit */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <div className="grid grid-cols-2 gap-8">
            <SelectField
              label="Base Size (Reference Size)"
              required
              value={baseSize}
              onChange={setBaseSize}
              options={sizes}
              placeholder="Select size"
              helperText="Select the reference size for measurement specifications"
            />

            <SelectField
              label="Default Measurement Unit"
              required
              value={defaultUnit}
              onChange={setDefaultUnit}
              options={units}
              placeholder="Select unit"
              helperText="Default unit for all measurements"
            />
          </div>
        </div>

        {/* Measurement Rows */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          {measurements.map((measurement) => (
            <div key={measurement.id} className="grid gap-4 mb-4">
              <div className="flex justify-end">
                <button
                  onClick={() => removeMeasurement(measurement.id)}
                  className="px-3 py-2.5 text-gray-400 hover:text-red-500 transition-colors"
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Point of Measure (POM)
                </label>
                <input
                  required
                  type="text"
                  value={measurement.pom}
                  onChange={(e) =>
                    updateMeasurement(measurement.id, "pom", e.target.value)
                  }
                  placeholder="e.g., Chest Width"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Measurement Value
                </label>
                <input
                  required
                  type="text"
                  value={measurement.measurement_value}
                  onChange={(e) =>
                    updateMeasurement(
                      measurement.id,
                      "measurement_value",
                      e.target.value
                    )
                  }
                  placeholder="0.0"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tolerance
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ±
                  </span>
                  <input
                    required
                    type="text"
                    value={measurement.tolerance.replace("±", "")}
                    onChange={(e) =>
                      updateMeasurement(
                        measurement.id,
                        "tolerance",
                        `±${e.target.value}`
                      )
                    }
                    placeholder="0.5"
                    className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  value={measurement.unit}
                  onChange={(e) =>
                    updateMeasurement(measurement.id, "unit", e.target.value)
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {measurementUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <button
            onClick={addMeasurementRow}
            className="mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
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
            Add Measurement Row
          </button>
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
            Back
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
