import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetFashionByIdQuery } from "../../Api/allApi";
import { BASE_URL } from "../../env";
import { useNavigate } from "react-router-dom";

export default function ReviewExport({ goToPreviousStep }) {
  const parentId = useSelector((state) => state.addFashion.id);
  const navigate = useNavigate();

  const { data: fashionInfo } = useGetFashionByIdQuery(parentId, {
    skip: !parentId,
  });

  const [confirmed, setConfirmed] = useState(false);

  const {
    garmentData,
    measurements,
    fabrics,
    trims,
    constructionSections,
    specialInstructions,
    artworks,
    bomItems,
  } = useMemo(() => {
    const getStepData = (stepName) => {
      return (
        fashionInfo?.steps?.find(
          (step) => step.step_name.toLowerCase() === stepName.toLowerCase()
        )?.data || []
      );
    };

    const setup = getStepData("Setup")[0] || {};
    const constructionsData = getStepData("Construction")[0] || {};
    const measurementsData = getStepData("Measurements");
    const fabricsData = getStepData("Fabrics");
    const trimsData = getStepData("Trims");
    const artworkData = getStepData("Artwork");
    const bomData = getStepData("BOM");

    const getIconForSection = (name) => {
      const lower = name.toLowerCase();
      if (lower.includes("neck")) return "👔";
      if (lower.includes("sleeve")) return "👕";
      if (lower.includes("hem")) return "📏";
      if (lower.includes("hood")) return "🧢";
      return "📋";
    };

    return {
      garmentData: {
        styleCode: setup.style_code || "-",
        garmentType: setup.garment_type || "-",
        category: setup.garment_category || "-",
        fitSilhouette: setup.fit || "-",
        targetGender: setup.target_gender || "-",
        season: setup.season || "-",
        size: setup.base_size || "-",
        sizeRange: "XS - XL",
        version: setup.version || "1.0",
        date: setup.date || "-",
      },
      measurements: measurementsData.map((m) => ({
        name: m.pom,
        value: `${m.measurement_value} ${m.unit}`,
        tolerance: `(${m.tolerance})${m.instruction ? ` (${m.instruction})` : ""
          }`,
      })),
      fabrics: fabricsData.map((f, i) => ({
        name: f.construction || `Fabric ${i + 1}`,
        composition: f.composition,
        color: f.color,
      })),
      trims: trimsData.map((t) => ({
        name: t.trim_type,
        color: t.color,
        description: [t.material, t.size, t.placement]
          .filter(Boolean)
          .join(", "),
      })),
      constructionSections: (constructionsData.constructions || []).map(
        (c) => ({
          title: c.section_name,
          icon: getIconForSection(c.section_name),
          fields: [
            { label: "Stitch Type", value: c.stitch_type },
            { label: "SPI", value: c.spi },
            { label: "Seam Allowance", value: c.seam_allowance },
            { label: "Reinforcement", value: c.reinforcement_points },
            { label: "Topstitch / Coverstitch", value: c.topstitch_logic },
          ],
        })
      ),
      specialInstructions:
        constructionsData.special_instructions ||
        "No special instructions provided.",
      artworks: artworkData.map((a) => ({
        name: a.artwork_name,
        placement: a.placement_location,
        method: a.artwork_type,
        size: a.artwork_size,
      })),
      bomItems: bomData.map((b) => ({
        name: b.component_name,
        category: b.category,
        consumption: `${b.consumption} ${b.unit}`,
      })),
    };
  }, [fashionInfo]);

  const handleBackToEdit = () => {
    goToPreviousStep();
  };

  const handleReturnToLibrary = () => {
    toast.info("Returning to library...");
    navigate("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Review & Export
          </h1>
          <p className="text-gray-600">
            Review your complete tech pack before exporting
          </p>
        </div>

        {/* Garment Information */}
        <div className="bg-white rounded-lg border border-gray-300 mb-6">
          <div className="border-b border-gray-300 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Garment Information
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-x-8 gap-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Style Code</div>
                <div className="text-sm text-gray-900">
                  {garmentData.styleCode}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Garment Type</div>
                <div className="text-sm text-gray-900">
                  {garmentData.garmentType}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Category</div>
                <div className="text-sm text-gray-900">
                  {garmentData.category}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  Fit / Silhouette
                </div>
                <div className="text-sm text-gray-900">
                  {garmentData.fitSilhouette}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Target Gender</div>
                <div className="text-sm text-gray-900">
                  {garmentData.targetGender}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Season</div>
                <div className="text-sm text-gray-900">
                  {garmentData.season}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Size</div>
                <div className="text-sm text-gray-900">{garmentData.size}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Size Range</div>
                <div className="text-sm text-gray-900">
                  {garmentData.sizeRange}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Version</div>
                <div className="text-sm text-gray-900">
                  {garmentData.version}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Date</div>
                <div className="text-sm text-gray-900">{garmentData.date}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Measurements */}
        <div className="bg-white rounded-lg border border-gray-300 mb-6">
          <div className="border-b border-gray-300 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Measurements (M - cm)
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {measurements.map((measurement, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start text-sm"
                >
                  <span className="text-gray-700">{measurement.name}</span>
                  <span className="text-gray-900 text-right">
                    <span className="font-medium">{measurement.value}</span>
                    <span className="text-gray-500 ml-2">
                      {measurement.tolerance}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fabrics & Materials */}
        <div className="bg-white rounded-lg border border-gray-300 mb-6">
          <div className="border-b border-gray-300 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Fabrics & Materials
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {fabrics.map((fabric, index) => (
                <div key={index}>
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {fabric.name}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Composition:</span>
                    <span className="text-gray-900">{fabric.composition}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-500">Color:</span>
                    <div className="flex items-center gap-2">
                      {fabric.color && (
                        <div
                          className="w-4 h-4 rounded border border-gray-200 shadow-sm"
                          style={{ backgroundColor: fabric.color }}
                        />
                      )}
                      <span className="text-gray-900">{fabric.color}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trims & Accessories */}
        <div className="bg-white rounded-lg border border-gray-300 mb-6">
          <div className="border-b border-gray-300 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Trims & Accessories
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {trims.map((trim, index) => (
                <div key={index}>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {trim.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {trim.description}
                  </div>
                  {trim.color && (
                    <div className="flex justify-between text-sm items-center mt-1">
                      <span className="text-gray-500">Color:</span>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded border border-gray-200 shadow-sm"
                          style={{ backgroundColor: trim.color }}
                        />
                        <span className="text-gray-900">{trim.color}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Construction Details */}
        <div className="bg-white rounded-lg border border-gray-300 mb-6">
          <div className="border-b border-gray-300 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Construction Details
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {constructionSections.map((section, index) => (
              <div key={index}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{section.icon}</span>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {section.fields.map((field, fieldIndex) => (
                    <div
                      key={fieldIndex}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600">{field.label}</span>
                      <span className="text-gray-900">
                        {field.value || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Special Instructions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📋</span>
                <h3 className="text-sm font-semibold text-gray-900">
                  Special Instructions
                </h3>
              </div>
              <div className="text-sm text-gray-700 bg-yellow-50 p-3 rounded border border-yellow-200">
                {specialInstructions}
              </div>
            </div>
          </div>
        </div>

        {/* Artwork & Placement */}
        <div className="bg-white rounded-lg border border-gray-300 mb-6">
          <div className="border-b border-gray-300 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Artwork & Placement
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {artworks.map((artwork, index) => (
                <div key={index}>
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {artwork.name}
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Placement:</span>
                      <span className="text-gray-900">{artwork.placement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Method:</span>
                      <span className="text-gray-900">{artwork.method}</span>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span className="text-gray-500">Size:</span>
                      <span className="text-gray-900">{artwork.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bill of Materials Summary */}
        <div className="bg-white rounded-lg border border-gray-300 mb-6">
          <div className="border-b border-gray-300 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Bill of Materials Summary
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-4 text-sm">
              <span className="text-gray-500">Total Components: </span>
              <span className="font-semibold text-gray-900">
                {bomItems.length}
              </span>
            </div>
            <div className="space-y-3">
              {bomItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start text-sm"
                >
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    {item.category && (
                      <div className="text-gray-500">{item.category}</div>
                    )}
                  </div>
                  <div className="text-gray-700 text-right">
                    {item.consumption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
          <a
            href={BASE_URL + fashionInfo?.files?.pdf}
            disabled={!confirmed}
            className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${confirmed
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
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
            Export Tech Pack PDF
          </a>
          <a
            href={BASE_URL + fashionInfo?.files?.xlsx}
            disabled={!confirmed}
            className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${confirmed
              ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
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
          </a>
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
            Return to Library
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
          </button>
        </div>
      </div>
    </div>
  );
}
