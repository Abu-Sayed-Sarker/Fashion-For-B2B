import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBom } from "../../Features/addFashionSlice";

export default function StapesSeven({ goToPreviousStep, goToNextStep }) {
  const bomInfo = useSelector((state) => state.addFashion.bom);
  const dispatch = useDispatch();
  const [bomItems, setBomItems] = useState([
    {
      id: 1,
      category: "",
      component_name: "",
      material_composition: "",
      supplier: "",
      unit: "",
      consumption: "",
      wastage_percent: "",
      moq: "",
      lead_time: "Days",
      notes: "",
    },
  ]);

  const updateBomItem = (id, field, value) => {
    setBomItems(
      bomItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addBomRow = () => {
    const newItem = {
      id: Date.now(),
      category: "",
      component_name: "",
      material_composition: "",
      supplier: "",
      unit: "",
      consumption: "",
      wastage_percent: "",
      moq: "",
      lead_time: "",
      notes: "",
    };
    setBomItems([...bomItems, newItem]);
  };

  const removeBomItem = (id) => {
    if (bomItems.length > 1) {
      setBomItems(bomItems.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = () => {
    const formattedData = bomItems.map(({ id, ...rest }) => rest);
    dispatch(setBom(formattedData));
    // goToNextStep();
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  useEffect(() => {
    if (bomInfo) {
      setBomItems(bomInfo.map((item, index) => ({ ...item, id: index + 1 })));
    }
  }, [bomInfo]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
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
            className="bg-white rounded-lg border border-gray-200 p-8 mb-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                BOM Item {index + 1}
              </h3>
              <button
                onClick={() => removeBomItem(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
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

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={item.category}
                  onChange={(e) =>
                    updateBomItem(item.id, "category", e.target.value)
                  }
                  placeholder="Fabric"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Component Name
                </label>
                <input
                  type="text"
                  value={item.component_name}
                  onChange={(e) =>
                    updateBomItem(item.id, "component_name", e.target.value)
                  }
                  placeholder="Main Body Fabric"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Material / Composition
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
                  placeholder="Material"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Supplier
                </label>
                <input
                  type="text"
                  value={item.supplier}
                  onChange={(e) =>
                    updateBomItem(item.id, "supplier", e.target.value)
                  }
                  placeholder="Supplier"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Unit
                </label>
                <input
                  type="text"
                  value={item.unit}
                  onChange={(e) =>
                    updateBomItem(item.id, "unit", e.target.value)
                  }
                  placeholder="meter"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Consumption
                </label>
                <input
                  type="text"
                  value={item.consumption}
                  onChange={(e) =>
                    updateBomItem(item.id, "consumption", e.target.value)
                  }
                  placeholder="0.0"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Wastage %
                </label>
                <input
                  type="text"
                  value={item.wastage_percent}
                  onChange={(e) =>
                    updateBomItem(item.id, "wastage_percent", e.target.value)
                  }
                  placeholder="5"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  MOQ
                </label>
                <input
                  type="text"
                  value={item.moq}
                  onChange={(e) =>
                    updateBomItem(item.id, "moq", e.target.value)
                  }
                  placeholder="MOQ"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Lead Time
                </label>
                <input
                  type="text"
                  value={item.lead_time}
                  onChange={(e) =>
                    updateBomItem(item.id, "lead_time", e.target.value)
                  }
                  placeholder="Days"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Notes
                </label>
                <input
                  type="text"
                  value={item.notes}
                  onChange={(e) =>
                    updateBomItem(item.id, "notes", e.target.value)
                  }
                  placeholder="Notes"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add BOM Row Button */}
        <button
          onClick={addBomRow}
          className="w-full py-4 mb-6 bg-white border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
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
