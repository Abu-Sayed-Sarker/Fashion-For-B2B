import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ReviewExport({ goToPreviousStep }) {
  const [confirmed, setConfirmed] = useState(false);

  // Sample data - replace with actual data from props or context
  const garmentData = {
    styleCode: "English lookgains quis ex",
    garmentType: "tank top",
    category: "tops",
    fitSilhouette: "Slim",
    targetGender: "Unisex",
    season: "Spring",
    size: "M",
    sizeRange: "XS - XXL",
    version: "1.0",
    date: "2026-01-27",
  };

  const measurements = [
    { name: "Chest", value: "80 cm", tolerance: "(±0.5cm)(Across chest, 1\" below armhole)" },
    { name: "Body Length", value: "64 cm", tolerance: "(Measure HPS - hem)" },
    { name: "Sleeve Length", value: "7 cm", tolerance: "(From shoulder seam)" },
    { name: "Shoulder Width", value: "36 cm", tolerance: "(Shoulder seam to seam)" },
    { name: "Armhole", value: "51 cm", tolerance: "(Armhole circumference)" },
    { name: "Hem Width", value: "100 cm", tolerance: "(Bottom hem edge to edge)" },
    { name: "Neck Opening", value: "46 cm", tolerance: "(Neckline opening)" },
    { name: "Note: must trim cae/w's", value: "61 cm", tolerance: "(Alignment collar/seam)" },
    { name: "Quis mollit reprehend a", value: "58 cm", tolerance: "(Cillum dolor reprehend)" },
    { name: "Consequat facilis no", value: "80 cm", tolerance: "(Fugiat deserunt velic)" },
  ];

  const fabrics = [
    { name: "Primary", composition: "Officia ut labore", color: "Qui exercitatio nulla" },
    { name: "Secondary 1", composition: "Cum qui eum dolor", color: "Fugiat aute aut et vol" },
  ];

  const trims = [
    { name: "Untitled", description: "Dicta qui dignissim. Iste esse quam in labore ipsum sunt Pa. Commodi officia esse" },
  ];

  const constructionSections = [
    {
      title: "Neck Construction",
      icon: "📘",
      fields: [
        { label: "Stitch Type", value: "Vitae nihil velit et" },
        { label: "SPI", value: "Est" },
        { label: "Seam Allowance", value: "Sed labore et dolor" },
        { label: "Reinforcement", value: "Excepteur lorem facil" },
        { label: "Topstitch / Coverstitch", value: "Similique sunt ex do" },
        { label: "Reinforcement mark", value: "" },
      ],
    },
    {
      title: "Sleeve Construction",
      icon: "🟢",
      fields: [
        { label: "Stitch Type", value: "Mollitia quas esse" },
        { label: "SPI", value: "Est sequitur offici et" },
        { label: "Seam Allowance", value: "Molestiae ob dolore In" },
        { label: "Reinforcement", value: "Est aute se vel ad" },
        { label: "Topstitch / Coverstitch", value: "Ad atque tempora volup" },
        { label: "Note: tet sunt dolor", value: "" },
      ],
    },
    {
      title: "Hem Construction",
      icon: "🔧",
      fields: [
        { label: "Stitch Type", value: "Fugit aliquie fugue" },
        { label: "SPI", value: "Impedit iste offici e" },
        { label: "Seam Allowance", value: "Color deleniti omn" },
        { label: "Reinforcement", value: "Et et quis velit" },
        { label: "Topstitch / Coverstitch", value: "Non voluptas illo au" },
      ],
    },
    {
      title: "Hood / Cuff Construction",
      icon: "🧢",
      fields: [
        { label: "Stitch Type", value: "Aut animi laudantium" },
        { label: "SPI", value: "Minus recusand et" },
        { label: "Seam Allowance", value: "Fugiat qui cupidatat" },
        { label: "Reinforcement", value: "Architecto velit expl" },
        { label: "Topstitch / Coverstitch", value: "Obfirmitay odio iusto" },
        { label: "Recompense frequents", value: "" },
      ],
    },
  ];

  const specialInstructions = "Error dicta at mentes";

  const artworks = [
    {
      name: "Dudas Solbs",
      placement: "Natus leo voluptate",
      method: "Est consequat facilis",
      size: "Percipit qui esse no",
    },
  ];

  const bomItems = [
    { name: "Machine Bauson", category: "Idea", consumption: "Proident laborum vit ceabit" },
    { name: "Timothy fullebroew", category: "Voo", consumption: "Proident neque no estain" },
    { name: "Mackenzie bridge", category: "", consumption: "Lorem nt magna tote in ipsum" },
  ];

  const handleExportPDF = () => {
    if (!confirmed) {
      return toast.error("Please confirm that all information is accurate before exporting");
    }
    console.log("=== Exporting Tech Pack PDF ===");
    console.log("Complete Data:", {
      garmentData,
      measurements,
      fabrics,
      trims,
      constructionSections,
      specialInstructions,
      artworks,
      bomItems,
    });
    toast.success("Tech Pack PDF export initiated!");
  };

  const handleExportBOM = () => {
    if (!confirmed) {
      return toast.error("Please confirm that all information is accurate before exporting");
    }
    console.log("=== Exporting BOM XLSX ===");
    console.log("BOM Data:", bomItems);
    toast.success("BOM XLSX export initiated!");
  };

  const handleBackToEdit = () => {
    goToPreviousStep();
  };

  const handleReturnToLibrary = () => {
    console.log("Returning to library");
    toast.info("Returning to library...");
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
                <div className="text-sm text-gray-900">{garmentData.styleCode}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Garment Type</div>
                <div className="text-sm text-gray-900">{garmentData.garmentType}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Category</div>
                <div className="text-sm text-gray-900">{garmentData.category}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Fit / Silhouette</div>
                <div className="text-sm text-gray-900">{garmentData.fitSilhouette}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Target Gender</div>
                <div className="text-sm text-gray-900">{garmentData.targetGender}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Season</div>
                <div className="text-sm text-gray-900">{garmentData.season}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Size</div>
                <div className="text-sm text-gray-900">{garmentData.size}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Size Range</div>
                <div className="text-sm text-gray-900">{garmentData.sizeRange}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Version</div>
                <div className="text-sm text-gray-900">{garmentData.version}</div>
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
                <div key={index} className="flex justify-between items-start text-sm">
                  <span className="text-gray-700">{measurement.name}</span>
                  <span className="text-gray-900 text-right">
                    <span className="font-medium">{measurement.value}</span>
                    <span className="text-gray-500 ml-2">{measurement.tolerance}</span>
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
                  <div className="text-sm font-medium text-gray-900 mb-2">{fabric.name}</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Composition:</span>
                    <span className="text-gray-900">{fabric.composition}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Color:</span>
                    <span className="text-gray-900">{fabric.color}</span>
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
                  <div className="text-sm font-medium text-gray-900 mb-1">{trim.name}</div>
                  <div className="text-sm text-gray-600">{trim.description}</div>
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
                  <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="flex justify-between text-sm">
                      <span className="text-gray-600">{field.label}</span>
                      <span className="text-gray-900">{field.value || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Special Instructions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📋</span>
                <h3 className="text-sm font-semibold text-gray-900">Special Instructions</h3>
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
                  <div className="text-sm font-medium text-gray-900 mb-2">{artwork.name}</div>
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
              <span className="font-semibold text-gray-900">{bomItems.length}</span>
            </div>
            <div className="space-y-3">
              {bomItems.map((item, index) => (
                <div key={index} className="flex justify-between items-start text-sm">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    {item.category && (
                      <div className="text-gray-500">{item.category}</div>
                    )}
                  </div>
                  <div className="text-gray-700 text-right">{item.consumption}</div>
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
                This tech pack will be saved and can be exported in multiple formats
              </div>
            </div>
          </label>
        </div>

        {/* Export Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleExportPDF}
            disabled={!confirmed}
            className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
              confirmed
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
          </button>
          <button
            onClick={handleExportBOM}
            disabled={!confirmed}
            className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
              confirmed
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