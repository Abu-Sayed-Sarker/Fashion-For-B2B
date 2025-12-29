import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrimsData } from "../../Features/addFashionSlice";

export default function StapesFour({ goToPreviousStep, goToNextStep }) {
  const trimsInfo = useSelector((state) => state.addFashion.trims);
  const dispatch = useDispatch();
  const [trims, setTrims] = useState([
    {
      id: 1,
      trim_type: "",
      material: "",
      size: "",
      color: "",
      finish: "",
      placement: "",
    },
  ]);

  const updateTrim = (id, field, value) => {
    setTrims(trims.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
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
    };
    setTrims([...trims, newTrim]);
  };

  const removeTrim = (id) => {
    if (trims.length > 1) {
      setTrims(trims.filter((t) => t.id !== id));
    }
  };

  const handleSubmit = () => {
    const formattedData = trims.map(({ id, ...rest }) => rest);
    dispatch(setTrimsData(formattedData));
    goToNextStep();
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  const trimTypes = [
    { value: "Button", label: "Button" },
    { value: "Zipper", label: "Zipper" },
    { value: "Label", label: "Label" },
    { value: "Thread", label: "Thread" },
    { value: "Elastic", label: "Elastic" },
    { value: "Ribbon", label: "Ribbon" },
  ];

  useEffect(() => {
    if (trimsInfo) {
      setTrims(trimsInfo.map((trim, index) => ({ ...trim, id: index + 1 })));
    }
  }, [trimsInfo]);

  return (
    <div className=" bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Trim Cards */}
        {trims.map((trim, index) => (
          <div
            key={trim.id}
            className="bg-white rounded-lg border border-gray-200 p-8 mb-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Trim {index + 1}
              </h3>
              <button
                onClick={() => removeTrim(trim.id)}
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
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
                  TRIM TYPE
                </label>
                <select
                  value={trim.trim_type}
                  onChange={(e) =>
                    updateTrim(trim.id, "trim_type", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  {trimTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
                  MATERIAL
                </label>
                <input
                  type="text"
                  value={trim.material}
                  onChange={(e) =>
                    updateTrim(trim.id, "material", e.target.value)
                  }
                  placeholder="Material"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
                  SIZE
                </label>
                <input
                  type="text"
                  value={trim.size}
                  onChange={(e) => updateTrim(trim.id, "size", e.target.value)}
                  placeholder="Size"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
                  COLOR
                </label>
                <input
                  type="text"
                  value={trim.color}
                  onChange={(e) => updateTrim(trim.id, "color", e.target.value)}
                  placeholder="Color"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
                  FINISH
                </label>
                <input
                  type="text"
                  value={trim.finish}
                  onChange={(e) =>
                    updateTrim(trim.id, "finish", e.target.value)
                  }
                  placeholder="Finish"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
                  PLACEMENT
                </label>
                <input
                  type="text"
                  value={trim.placement}
                  onChange={(e) =>
                    updateTrim(trim.id, "placement", e.target.value)
                  }
                  placeholder="Placement"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Trim Button */}
        <button
          onClick={addTrim}
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
