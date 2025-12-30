import React, { useState } from "react";
import { toast } from "react-toastify/unstyled";

export default function ReviewExport() {
  const [confirmed, setConfirmed] = useState(false);

  const garmentData = {
    styleCode: "as",
    garmentType: "jacket",
    category: "dresses",
    fitSilhouette: "—",
    targetGender: "unisex",
    season: "—",
    size: "M",
    version: "1.0",
    date: "2025-12-27",
  };

  const measurements = [{ name: "asa", value: "—", tolerance: "(±0.5sdadd)" }];

  const fabrics = [{ type: "Primary", color: "#a22020" }];

  const trims = [{ name: "Untitled" }];

  const construction = {
    stitchType: "—",
    seamAllowance: "—",
    topstitch: "—",
    washTreatment: "—",
  };

  const artwork = [{ name: "Untitled" }];

  const bom = {
    totalComponents: 1,
    items: [{ name: "Main Body Fabric", category: "Fabric" }],
  };

  const handleExportPDF = () => {
    if (!confirmed) {
      return toast.error(
        "Please confirm that all information is accurate before exporting"
      );
    }
    console.log("Exporting Tech Pack PDF...");
    console.log("Complete Garment Data:", {
      garmentData,
      measurements,
      fabrics,
      trims,
      construction,
      artwork,
      bom,
    });
  };

  const handleExportBOM = () => {
    if (!confirmed) {
      toast.error(
        "Please confirm that all information is accurate before exporting"
      );
      return;
    }
    console.log("Exporting BOM XLSX...");
    console.log("BOM Data:", bom);
  };

  const handleBackToEdit = () => {
    console.log("Going back to edit");
  };

  const handleReturnToLibrary = () => {
    console.log("Returning to library");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Review & Export
          </h1>
          <p className="text-gray-600">
            Review your complete tech pack before exporting
          </p>
        </div>

        {/* Garment Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Garment Information
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-gray-500 mb-1">Style Code</div>
              <div className="font-medium text-gray-900">
                {garmentData.styleCode}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Garment Type</div>
              <div className="font-medium text-gray-900">
                {garmentData.garmentType}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Category</div>
              <div className="font-medium text-gray-900">
                {garmentData.category}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Fit / Silhouette</div>
              <div className="font-medium text-gray-900">
                {garmentData.fitSilhouette}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Target Gender</div>
              <div className="font-medium text-gray-900">
                {garmentData.targetGender}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Season</div>
              <div className="font-medium text-gray-900">
                {garmentData.season}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Size</div>
              <div className="font-medium text-gray-900">
                {garmentData.size}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Version</div>
              <div className="font-medium text-gray-900">
                {garmentData.version}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Date</div>
              <div className="font-medium text-gray-900">
                {garmentData.date}
              </div>
            </div>
          </div>
        </div>

        {/* Measurements */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Measurements
          </h2>
          {measurements.map((measurement, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="text-gray-700">{measurement.name}</span>
              <span className="text-gray-500">
                {measurement.value} {measurement.tolerance}
              </span>
            </div>
          ))}
        </div>

        {/* Fabrics & Materials */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Fabrics & Materials
          </h2>
          {fabrics.map((fabric, index) => (
            <div key={index} className="flex items-center gap-3 py-2">
              <span className="text-gray-700">{fabric.type}</span>
              <div
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: fabric.color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Trims & Accessories */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Trims & Accessories
          </h2>
          {trims.map((trim, index) => (
            <div key={index} className="py-2">
              <span className="text-gray-700">{trim.name}</span>
            </div>
          ))}
        </div>

        {/* Construction Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Construction Details
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-gray-500 mb-1">Stitch Type</div>
              <div className="font-medium text-gray-900">
                {construction.stitchType}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Seam Allowance</div>
              <div className="font-medium text-gray-900">
                {construction.seamAllowance}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Topstitch</div>
              <div className="font-medium text-gray-900">
                {construction.topstitch}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Wash Treatment</div>
              <div className="font-medium text-gray-900">
                {construction.washTreatment}
              </div>
            </div>
          </div>
        </div>

        {/* Artwork & Placement */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Artwork & Placement
          </h2>
          {artwork.map((art, index) => (
            <div key={index} className="py-2">
              <span className="text-gray-700">{art.name}</span>
            </div>
          ))}
        </div>

        {/* Bill of Materials Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Bill of Materials Summary
          </h2>
          <div className="mb-4">
            <span className="text-sm text-gray-500">Total Components: </span>
            <span className="font-medium text-gray-900">
              {bom.totalComponents}
            </span>
          </div>
          {bom.items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 py-2">
              <span className="font-medium text-gray-900">{item.name}</span>
              <span className="text-sm text-gray-500">{item.category}</span>
            </div>
          ))}
        </div>

        {/* Confirmation Checkbox */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <div className="text-sm font-medium text-blue-900">
                I confirm that all information is accurate and ready for export
              </div>
              <div className="text-xs text-blue-700 mt-1">
                This tech pack will be saved and can be exported in multiple
                formats
              </div>
            </div>
          </label>
        </div>

        {/* Export Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleExportPDF}
            disabled={!confirmed}
            className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
              confirmed
                ? "bg-gray-700 text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-colors`}
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export Tech Pack PDF
          </button>
          <button
            onClick={handleExportBOM}
            disabled={!confirmed}
            className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
              confirmed
                ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
            } transition-colors`}
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export BOM XLSX
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBackToEdit}
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
            Back to Edit
          </button>

          <button
            onClick={handleReturnToLibrary}
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Return to Library
          </button>
        </div>
      </div>
    </div>
  );
}
