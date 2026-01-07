import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateFashionByIdAndStepMutation,
  useGetFashionByIdQuery,
} from "../../Api/allApi";
import { useSelector } from "react-redux";

export default function StapesSeven({ goToPreviousStep, goToNextStep }) {
  const parentId = useSelector((state) => state.addFashion.id);

  const [createFashionByIdAndStep] = useCreateFashionByIdAndStepMutation();
  const { data: fashionInfo } = useGetFashionByIdQuery(parentId, {
    skip: !parentId,
  });

  const [bomItems, setBomItems] = useState([
    {
      id: 1,
      category: "",
      component_name: "",
      material_composition: "",
      unit: "",
      consumption: "",
      wastage_percent: "",
      supplier: "",
      moq: "",
      lead_time: "",
      notes: "",
    },
  ]);

  const categoryOptions = [
    { value: "", label: "Select category" },
    { value: "Fabric", label: "Fabric" },
    { value: "Trim", label: "Trim" },
    { value: "Packaging", label: "Packaging" },
    { value: "Label", label: "Label" },
    { value: "Thread", label: "Thread" },
    { value: "Accessory", label: "Accessory" },
  ];

  const unitOptions = [
    { value: "", label: "Select unit" },
    { value: "Meter", label: "Meter" },
    { value: "Yard", label: "Yard" },
    { value: "Piece", label: "Piece" },
    { value: "Kilogram", label: "Kilogram" },
    { value: "Gram", label: "Gram" },
    { value: "Set", label: "Set" },
  ];

  const updateBomItem = (id, field, value) => {
    const updatedItems = bomItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setBomItems(updatedItems);
  };

  const addBomRow = () => {
    const newItem = {
      id: Date.now(),
      category: "",
      component_name: "",
      material_composition: "",
      unit: "",
      consumption: "",
      wastage_percent: "",
      supplier: "",
      moq: "",
      lead_time: "",
      notes: "",
    };
    const updatedItems = [...bomItems, newItem];
    setBomItems(updatedItems);
  };

  const removeBomItem = (id) => {
    if (bomItems.length > 1) {
      const updatedItems = bomItems.filter((item) => item.id !== id);
      setBomItems(updatedItems);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    const hasEmptyRequired = bomItems.some(
      (item) => !item.category || !item.component_name || !item.consumption
    );

    if (hasEmptyRequired) {
      return toast.error(
        "Please fill in all required fields for each BOM item."
      );
    }

    const formattedData = bomItems.map(({ id, ...rest }) => rest);
    const data = {
      data: formattedData,
      is_complete: true,
    };
    try {
      await createFashionByIdAndStep({
        id: parentId,
        step: 7,
        data: data,
      });
      toast.success("BOM data saved successfully!");
      goToNextStep();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save BOM data.");
    }
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  useEffect(() => {
    if (fashionInfo?.steps?.bom) {
      setBomItems(
        fashionInfo.steps.bom.map((item, index) => ({ ...item, id: index + 1 }))
      );
    }
  }, [fashionInfo]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Bill of Materials (BOM)
          </h1>
          <p className="text-gray-600">
            Comprehensive material breakdown with supplier and costing
            information
          </p>
        </div>

        {/* BOM Items */}
        {bomItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-300 overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-base font-semibold text-gray-900">
                  BOM Item {index + 1}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    ({item.category || "Uncategorized"})
                  </span>
                </h3>
              </div>
              {bomItems.length > 1 && (
                <button
                  onClick={() => removeBomItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Remove BOM item"
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

            {/* Form Content */}
            <div className="p-6">
              {/* Basic Information */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Basic Information
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={item.category}
                      onChange={(e) =>
                        updateBomItem(item.id, "category", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categoryOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Item classification
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Component Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={item.component_name}
                      onChange={(e) =>
                        updateBomItem(item.id, "component_name", e.target.value)
                      }
                      placeholder="e.g., Main Body Fabric, Care Label"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Specific component identifier
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Material / Composition{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={item.material_composition}
                      onChange={(e) =>
                        updateBomItem(
                          item.id,
                          "material_composition",
                          e.target.value
                        )
                      }
                      placeholder="e.g., 100% Cotton, Metal Button"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Material description
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantities & Consumption */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Quantities & Consumption
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={item.unit}
                      onChange={(e) =>
                        updateBomItem(item.id, "unit", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {unitOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Unit of measurement
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Consumption <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={item.consumption}
                      onChange={(e) =>
                        updateBomItem(item.id, "consumption", e.target.value)
                      }
                      placeholder="e.g., 1.5, 6"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Required quantity per garment
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Wastage %
                    </label>
                    <input
                      type="text"
                      value={item.wastage_percent}
                      onChange={(e) =>
                        updateBomItem(
                          item.id,
                          "wastage_percent",
                          e.target.value
                        )
                      }
                      placeholder="e.g., 5, 10"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Expected wastage percentage
                    </p>
                  </div>
                </div>
              </div>

              {/* Supplier Information */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Supplier Information
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supplier
                    </label>
                    <input
                      type="text"
                      value={item.supplier}
                      onChange={(e) =>
                        updateBomItem(item.id, "supplier", e.target.value)
                      }
                      placeholder="e.g., ABC Textiles Ltd."
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supplier name or code
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      MOQ (Minimum Order Quantity)
                    </label>
                    <input
                      type="text"
                      value={item.moq}
                      onChange={(e) =>
                        updateBomItem(item.id, "moq", e.target.value)
                      }
                      placeholder="e.g., 500 meters, 100 pieces"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supplier minimum order
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lead Time
                    </label>
                    <input
                      type="text"
                      value={item.lead_time}
                      onChange={(e) =>
                        updateBomItem(item.id, "lead_time", e.target.value)
                      }
                      placeholder="e.g., 30 days, 2 weeks"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Production/delivery time
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Notes
                </h4>
                <textarea
                  value={item.notes}
                  onChange={(e) =>
                    updateBomItem(item.id, "notes", e.target.value)
                  }
                  placeholder="e.g., Must pass AATCC test, Special color matching required"
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Additional specifications or requirements
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Add BOM Item Button */}
        <button
          onClick={addBomRow}
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
          Add BOM Item
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
            Next: Review & Export
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
