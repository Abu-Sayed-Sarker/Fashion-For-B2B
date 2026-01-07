import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateFashionByIdAndStepMutation,
  useGetFashionByIdQuery,
} from "../../Api/allApi";

export default function StapesFour({ goToPreviousStep, goToNextStep }) {
  const parentId = useSelector((state) => state.addFashion.id);

  const [createFashionByIdAndStep] = useCreateFashionByIdAndStepMutation();
  const { data: fashionInfo } = useGetFashionByIdQuery(parentId, {
    skip: !parentId,
  });

  const [trims, setTrims] = useState([
    {
      id: 1,
      trim_type: "",
      material: "",
      size: "",
      color: "",
      finish: "",
      placement: "",
      consumption: "",
    },
  ]);

  const trimTypes = [
    { value: "", label: "Select type" },
    { value: "Button", label: "Button" },
    { value: "Zipper", label: "Zipper" },
    { value: "Label", label: "Label" },
    { value: "Thread", label: "Thread" },
    { value: "Elastic", label: "Elastic" },
    { value: "Ribbon", label: "Ribbon" },
    { value: "Snap", label: "Snap" },
    { value: "Hook & Eye", label: "Hook & Eye" },
    { value: "Drawstring", label: "Drawstring" },
    { value: "Patch", label: "Patch" },
    { value: "Applique", label: "Applique" },
  ];

  const updateTrim = (id, field, value) => {
    const updatedTrims = trims.map((t) =>
      t.id === id ? { ...t, [field]: value } : t
    );
    setTrims(updatedTrims);
  };

  const addTrim = () => {
    const newTrim = {
      id: Date.now(),
      trim_type: "",
      material: "",
      size: "",
      color: "",
      finish: "",
      placement: "",
      consumption: "",
    };
    const updatedTrims = [...trims, newTrim];
    setTrims(updatedTrims);
  };

  const removeTrim = (id) => {
    if (trims.length > 1) {
      const updatedTrims = trims.filter((t) => t.id !== id);
      setTrims(updatedTrims);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    const hasEmptyRequired = trims.some(
      (trim) =>
        !trim.trim_type ||
        !trim.material ||
        !trim.placement ||
        !trim.consumption
    );

    if (hasEmptyRequired) {
      return toast.error("Please fill in all required fields for each trim.");
    }

    const formattedData = trims.map(({ id, ...rest }) => rest);

    const data = {
      data: formattedData,
      is_complete: true,
    };
    try {
      await createFashionByIdAndStep({
        id: parentId,
        step: 4,
        data: data,
      });
      toast.success("Trims data saved successfully!");
      goToNextStep();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save trims data.");
    }
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  useEffect(() => {
    if (fashionInfo?.steps?.trims) {
      setTrims(
        fashionInfo?.steps?.trims.map((trim, index) => ({
          ...trim,
          id: index + 1,
        }))
      );
    }
  }, [fashionInfo]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Trims & Accessories
          </h1>
          <p className="text-gray-600">
            Define all trims, closures, and accessories for your garment
          </p>
        </div>

        {/* Trim Cards */}
        {trims.map((trim, index) => (
          <div
            key={trim.id}
            className="bg-white rounded-lg border border-gray-300 overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                Trim {index + 1}
              </h3>
              {trims.length > 1 && (
                <button
                  onClick={() => removeTrim(trim.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Remove trim"
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
            </div>

            {/* Form Fields */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-6">
                {/* Row 1 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trim Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={trim.trim_type}
                    onChange={(e) =>
                      updateTrim(trim.id, "trim_type", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {trimTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Type of trim or accessory
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Material <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={trim.material}
                    onChange={(e) =>
                      updateTrim(trim.id, "material", e.target.value)
                    }
                    placeholder="e.g., Metal, Plastic, Polyester"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Material composition
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    type="text"
                    value={trim.size}
                    onChange={(e) =>
                      updateTrim(trim.id, "size", e.target.value)
                    }
                    placeholder="e.g., 15mm, 5 inches"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Dimensions or size specification
                  </p>
                </div>

                {/* Row 2 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={trim.color}
                      onChange={(e) =>
                        updateTrim(trim.id, "color", e.target.value)
                      }
                      placeholder="e.g., Black, Silver, #33445F"
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="color"
                      value={
                        trim.color.startsWith("#") ? trim.color : "#000000"
                      }
                      onChange={(e) =>
                        updateTrim(trim.id, "color", e.target.value)
                      }
                      className="w-12 h-[38px] rounded-lg border border-gray-300 cursor-pointer"
                      title="Pick a color"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Color name or code
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Finish
                  </label>
                  <input
                    type="text"
                    value={trim.finish}
                    onChange={(e) =>
                      updateTrim(trim.id, "finish", e.target.value)
                    }
                    placeholder="e.g., Matt, Glossy, Brushed"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Surface finish or treatment
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Placement <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={trim.placement}
                    onChange={(e) =>
                      updateTrim(trim.id, "placement", e.target.value)
                    }
                    placeholder="e.g., Center Front, Pocket, Waistband"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Location on garment
                  </p>
                </div>

                {/* Row 3 - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consumption <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={trim.consumption}
                    onChange={(e) =>
                      updateTrim(trim.id, "consumption", e.target.value)
                    }
                    placeholder="e.g., 6 pcs, 1.5 meters"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Quantity required per garment
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Trim Button */}
        <button
          onClick={addTrim}
          className="w-full py-4 mb-6 bg-white border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Trim / Accessory
        </button>

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
            Next: Construction Details
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
