import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFabricsData } from "../../Features/addFashionSlice";

export default function StapesThree({ goToPreviousStep, goToNextStep }) {
  const fabricsInfo = useSelector((state) => state.addFashion.fabrics);
  const dispatch = useDispatch();
  const [fabrics, setFabrics] = useState([
    {
      id: 1,
      type: "Primary",
      composition: "",
      finish: "",
      gsm: "",
      color: "#a22020",
      construction: "",
    },
  ]);

  const updateFabric = (id, field, value) => {
    setFabrics(
      fabrics.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const addSecondaryFabric = () => {
    const newFabric = {
      id: Date.now(),
      type: "Secondary",
      composition: "",
      finish: "",
      gsm: "",
      color: "#000000",
      construction: "",
    };
    setFabrics([...fabrics, newFabric]);
  };

  const removeFabric = (id) => {
    setFabrics(fabrics.filter((f) => f.id !== id));
  };

  const handleSubmit = () => {
    const formattedData = fabrics.map(
      ({ composition, finish, gsm, color, construction }) => ({
        composition,
        finish,
        gsm,
        color,
        construction,
      })
    );
    dispatch(setFabricsData(formattedData));
    goToNextStep();
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  useEffect(() => {
    if (fabricsInfo) {
      setFabrics(
        fabricsInfo.map((fabric, index) => ({ ...fabric, id: index + 1 }))
      );
    }
  }, [fabricsInfo]);

  return (
    <div className="bg-gray-50 p-8">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Fabric & Materials
          </h1>
          <p className="text-gray-600">
            Specify all fabric materials and their properties
          </p>
        </div>

        {/* Fabric Cards */}
        {fabrics.map((fabric, index) => (
          <div
            key={fabric.id}
            className="bg-white rounded-lg border-2 border-gray-900 p-8 mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900">
                  {index === 0 ? "Primary Fabric" : `Secondary Fabric ${index}`}
                </h2>
              </div>
              {index > 0 && (
                <button
                  onClick={() => removeFabric(fabric.id)}
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
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Composition */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Composition
                </label>
                <textarea
                  value={fabric.composition}
                  onChange={(e) =>
                    updateFabric(fabric.id, "composition", e.target.value)
                  }
                  placeholder="e.g., 100% Cotton, 60% Cotton 40% Polyester"
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Finish / Treatment */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Finish / Treatment
                </label>
                <textarea
                  value={fabric.finish}
                  onChange={(e) =>
                    updateFabric(fabric.id, "finish", e.target.value)
                  }
                  placeholder="e.g., Pre-washed, Enzyme washed, Anti-pilling"
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* GSM */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  GSM (Grams per Square Meter)
                </label>
                <input
                  type="text"
                  value={fabric.gsm}
                  onChange={(e) =>
                    updateFabric(fabric.id, "gsm", e.target.value)
                  }
                  placeholder="e.g., 180"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Color
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={fabric.color}
                    onChange={(e) =>
                      updateFabric(fabric.id, "color", e.target.value)
                    }
                    placeholder="#a22020"
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="color"
                    value={fabric.color}
                    onChange={(e) =>
                      updateFabric(fabric.id, "color", e.target.value)
                    }
                    className="w-14 h-11 rounded-lg border border-gray-300 cursor-pointer"
                  />
                </div>
              </div>

              {/* Construction */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Construction
                </label>
                <input
                  type="text"
                  value={fabric.construction}
                  onChange={(e) =>
                    updateFabric(fabric.id, "construction", e.target.value)
                  }
                  placeholder="e.g., Jersey, Twill, Plain Weave"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Secondary Fabric Button */}
        <button
          onClick={addSecondaryFabric}
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
