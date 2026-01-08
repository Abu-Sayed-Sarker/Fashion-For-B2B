import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateFashionByIdAndStepMutation,
  useGetFashionByIdQuery,
  useUpdateFashionByIdMutation,
} from "../../Api/allApi";

export default function StapesThree({ goToPreviousStep, goToNextStep }) {
  const parentId = useSelector((state) => state.addFashion.id);

  const [currentStepId, setCurrentStepId] = useState(null);
  const [updateFashionById] = useUpdateFashionByIdMutation();
  const [createFashionByIdAndStep] = useCreateFashionByIdAndStepMutation();

  const { data: fashionInfo } = useGetFashionByIdQuery(parentId, {
    skip: !parentId,
  });

  const [fabrics, setFabrics] = useState([
    {
      id: 1,
      type: "Primary",
      composition: "",
      gsm: "",
      construction: "",
      color: "",
      finish: "",
      stretch: "",
      faceBack: "",
      shrinkage: "",
      fabricDirection: "",
      moq: "",
      testingRequirements: "",
    },
  ]);

  const constructionOptions = [
    { value: "", label: "Select construction" },
    { value: "Jersey", label: "Jersey" },
    { value: "Twill", label: "Twill" },
    { value: "Plain Weave", label: "Plain Weave" },
    { value: "Rib", label: "Rib" },
    { value: "Interlock", label: "Interlock" },
    { value: "French Terry", label: "French Terry" },
    { value: "Fleece", label: "Fleece" },
  ];

  const finishOptions = [
    { value: "", label: "Select finish" },
    { value: "Pre-washed", label: "Pre-washed" },
    { value: "Enzyme Washed", label: "Enzyme Washed" },
    { value: "Garment Dyed", label: "Garment Dyed" },
    { value: "Anti-pilling", label: "Anti-pilling" },
    { value: "Water Repellent", label: "Water Repellent" },
    { value: "Soft Finish", label: "Soft Finish" },
  ];

  const stretchOptions = [
    { value: "", label: "Select stretch type" },
    { value: "No Stretch", label: "No Stretch" },
    { value: "Slight Stretch", label: "Slight Stretch" },
    { value: "Moderate Stretch", label: "Moderate Stretch" },
    { value: "High Stretch", label: "High Stretch" },
    { value: "4-Way Stretch", label: "4-Way Stretch" },
  ];

  const directionOptions = [
    { value: "", label: "Select direction" },
    { value: "Lengthwise", label: "Lengthwise" },
    { value: "Crosswise", label: "Crosswise" },
    { value: "Bias", label: "Bias" },
    { value: "Any", label: "Any" },
  ];

  const updateFabric = (id, field, value) => {
    const updatedFabrics = fabrics.map((f) =>
      f.id === id ? { ...f, [field]: value } : f
    );
    setFabrics(updatedFabrics);
  };

  const addSecondaryFabric = () => {
    const newFabric = {
      id: Date.now(),
      type: "Secondary",
      composition: "",
      gsm: "",
      construction: "",
      color: "",
      finish: "",
      stretch: "",
      faceBack: "",
      shrinkage: "",
      fabricDirection: "",
      moq: "",
      testingRequirements: "",
    };
    const updatedFabrics = [...fabrics, newFabric];
    setFabrics(updatedFabrics);
  };

  const removeFabric = (id) => {
    if (fabrics.length > 1) {
      const updatedFabrics = fabrics.filter((f) => f.id !== id);
      setFabrics(updatedFabrics);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields for primary fabric
    const primaryFabric = fabrics[0];
    if (
      !primaryFabric.composition ||
      !primaryFabric.gsm ||
      !primaryFabric.color
    ) {
      return toast.error(
        "Please fill in all required fields for the primary fabric."
      );
    }

    const formattedData = fabrics.map(({ id, type, ...rest }) => rest);

    if (currentStepId) {
      const data = {
        data: { data: formattedData },
        is_completed: true,
        stepsId: currentStepId,
        parentId: parentId,
      };
      try {
        await updateFashionById(data);
        toast.success("Fabrics data updated successfully!");
        goToNextStep();
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to update fabrics data.");
      }
    } else {
      const data = {
        data: formattedData,
        is_complete: true,
      };
      try {
        await createFashionByIdAndStep({
          id: parentId,
          step: 3,
          data: data,
        });
        toast.success("Fabrics data saved successfully!");
        goToNextStep();
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to save fabrics data.");
      }
    }
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  useEffect(() => {
    if (
      fashionInfo?.steps[2]?.data &&
      fashionInfo?.steps[2]?.data?.length > 0
    ) {
      const loadedFabrics = fashionInfo.steps[2].data.map((fabric, index) => ({
        ...fabric,
        id: index + 1,
        type: index === 0 ? "Primary" : "Secondary",
      }));
      setFabrics(loadedFabrics);
      setCurrentStepId(fashionInfo.steps[2]?.step_id);
    }
  }, [fashionInfo]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Fabrics & Materials
          </h1>
          <p className="text-gray-600">
            Specify all fabric materials and their properties
          </p>
        </div>

        {/* Fabric Cards */}
        {fabrics.map((fabric, index) => (
          <div
            key={fabric.id}
            className="bg-white rounded-lg border-2 border-yellow-400 overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="bg-yellow-50 border-b-2 border-yellow-400 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h2 className="text-base font-semibold text-gray-900">
                  Fabric {index + 1}{" "}
                  <span className="text-sm font-normal text-gray-600">
                    ({index === 0 ? "Primary Fabric" : "Secondary Fabric"})
                  </span>
                </h2>
              </div>
              {index > 0 && (
                <button
                  onClick={() => removeFabric(fabric.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove fabric"
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
                    Composition <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fabric.composition}
                    onChange={(e) =>
                      updateFabric(fabric.id, "composition", e.target.value)
                    }
                    placeholder="e.g., 100% Cotton, 65% Poly 35% Cotton"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Fiber content breakdown
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GSM (Weight) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fabric.gsm}
                    onChange={(e) =>
                      updateFabric(fabric.id, "gsm", e.target.value)
                    }
                    placeholder="e.g., 180, 220"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Grams per square meter
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Construction
                  </label>
                  <select
                    value={fabric.construction}
                    onChange={(e) =>
                      updateFabric(fabric.id, "construction", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {constructionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Weave or knit type
                  </p>
                </div>

                {/* Row 2 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fabric.color}
                    onChange={(e) =>
                      updateFabric(fabric.id, "color", e.target.value)
                    }
                    placeholder="e.g., Navy Blue, White, Black"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Color name or code
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Finish
                  </label>
                  <select
                    value={fabric.finish}
                    onChange={(e) =>
                      updateFabric(fabric.id, "finish", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {finishOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Finishing treatment
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shrinkage %
                  </label>
                  <input
                    type="text"
                    value={fabric.shrinkage}
                    onChange={(e) =>
                      updateFabric(fabric.id, "shrinkage", e.target.value)
                    }
                    placeholder="e.g., 3-5%, <2%"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Expected shrinkage after wash
                  </p>
                </div>

                {/* Row 3 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stretch
                  </label>
                  <select
                    value={fabric.stretch}
                    onChange={(e) =>
                      updateFabric(fabric.id, "stretch", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {stretchOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Fabric stretch properties
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Face / Back
                  </label>
                  <input
                    type="text"
                    value={fabric.faceBack}
                    onChange={(e) =>
                      updateFabric(fabric.id, "faceBack", e.target.value)
                    }
                    placeholder="e.g., Same both sides, Brushed inside"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Face and back characteristics
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fabric Direction
                  </label>
                  <select
                    value={fabric.fabricDirection}
                    onChange={(e) =>
                      updateFabric(fabric.id, "fabricDirection", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {directionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Cutting direction requirement
                  </p>
                </div>

                {/* Row 4 - Full Width Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    MOQ (Minimum Order Quantity)
                  </label>
                  <input
                    type="text"
                    value={fabric.moq}
                    onChange={(e) =>
                      updateFabric(fabric.id, "moq", e.target.value)
                    }
                    placeholder="e.g., 500 yards, 100 meters"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supplier minimum order
                  </p>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testing Requirements
                  </label>
                  <input
                    type="text"
                    value={fabric.testingRequirements}
                    onChange={(e) =>
                      updateFabric(
                        fabric.id,
                        "testingRequirements",
                        e.target.value
                      )
                    }
                    placeholder="e.g., AATCC 61 (Colorfastness), ASTM D3776 (Weight), Pilling Grade 4"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Required lab tests and standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Secondary Fabric Button */}
        <button
          onClick={addSecondaryFabric}
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
          Add Secondary Fabric
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
            Next: Trims & Accessories
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
