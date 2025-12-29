import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConstruction } from "../../Features/addFashionSlice";

export default function StapesFive({ goToPreviousStep, goToNextStep }) {
  const constructionInfo = useSelector(
    (state) => state.addFashion.construction
  );
  const dispatch = useDispatch();
  const [openSections, setOpenSections] = useState({
    stitching: true,
    topstitching: true,
    pocket: false,
    wash: true,
  });

  const [formData, setFormData] = useState({
    stitch_type: "",
    seam_allowance: "",
    topstitch_spec: "",
    paneling: "",
    pocket_construction: "",
    wash_treatment: "",
    special_instructions: "",
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.stitch_type ||
      !formData.seam_allowance ||
      !formData.topstitch_spec ||
      !formData.paneling ||
      !formData.pocket_construction ||
      !formData.wash_treatment
    )
      return alert("Please fill in all required fields.");
    dispatch(setConstruction(formData));
    goToNextStep();
  };

  const handleBack = () => {
    goToPreviousStep();};

  useEffect(() => {}, [formData]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Construction Details
          </h1>
          <p className="text-gray-600">
            Define construction methods and assembly specifications
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Stitching & Seams Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <button
              onClick={() => toggleSection("stitching")}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                Stitching & Seams
              </h2>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openSections.stitching ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openSections.stitching && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Stitch Type
                    </label>
                    <input
                      type="text"
                      value={formData.stitch_type}
                      onChange={(e) =>
                        updateField("stitch_type", e.target.value)
                      }
                      placeholder="e.g., Lock stitch 301, Chain stitch 401"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Seam Allowance
                    </label>
                    <input
                      type="text"
                      value={formData.seam_allowance}
                      onChange={(e) =>
                        updateField("seam_allowance", e.target.value)
                      }
                      placeholder="e.g., 1cm, 3/8 inch"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Topstitching & Details Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <button
              onClick={() => toggleSection("topstitching")}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                Topstitching & Details
              </h2>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openSections.topstitching ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openSections.topstitching && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Topstitch Specification
                    </label>
                    <input
                      type="text"
                      value={formData.topstitch_spec}
                      onChange={(e) =>
                        updateField("topstitch_spec", e.target.value)
                      }
                      placeholder="e.g., 0.5cm from edge, double needle"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Paneling / Piecing
                    </label>
                    <input
                      type="text"
                      value={formData.paneling}
                      onChange={(e) => updateField("paneling", e.target.value)}
                      placeholder="e.g., Side panels, Raglan sleeves"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pocket Construction Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <button
              onClick={() => toggleSection("pocket")}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                Pocket Construction
              </h2>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openSections.pocket ? "" : "-rotate-90"
                }`}
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
            {openSections.pocket && (
              <div className="px-6 pb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Pocket Construction
                  </label>
                  <input
                    type="text"
                    value={formData.pocket_construction}
                    onChange={(e) =>
                      updateField("pocket_construction", e.target.value)
                    }
                    placeholder="e.g., Patch pocket, Welt pocket"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Wash & Finishing Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <button
              onClick={() => toggleSection("wash")}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                Wash & Finishing
              </h2>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openSections.wash ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openSections.wash && (
              <div className="px-6 pb-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Wash Treatment
                  </label>
                  <input
                    type="text"
                    value={formData.wash_treatment}
                    onChange={(e) =>
                      updateField("wash_treatment", e.target.value)
                    }
                    placeholder="e.g., Stone wash, Enzyme wash, Garment dye"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    value={formData.special_instructions}
                    onChange={(e) =>
                      updateField("special_instructions", e.target.value)
                    }
                    placeholder="Any additional construction notes, special techniques, or quality requirements"
                    rows={4}
                    className="w-full px-4 py-2.5 bg-yellow-50 border border-yellow-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                  />
                  <p className="mt-2 text-sm text-yellow-700">
                    Highlighted for emphasis - use for critical construction
                    notes
                  </p>
                </div>
              </div>
            )}
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
            Back
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Next: Artwork & Placement
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
