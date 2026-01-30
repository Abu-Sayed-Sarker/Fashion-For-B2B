"use client";
import { useState, useMemo } from 'react';
import { ArrowLeft, Download, FileText, AlertCircle, Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useGetFashionTechpackByIdQuery } from '@/Apis/Get-Fashion/getFashionApi';


export default function ReviewExport() {
  const { techpack_id } = useParams();
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();
  /////////////// all api call are here//////////////
  const { data: techpackData = {}, isLoading } = useGetFashionTechpackByIdQuery(
    techpack_id,
    { skip: !techpack_id },
  );



  /// get completed steps ///
  const getCompletedSteps = () => {
    const completed = [];
    if (!techpackData) return completed;

    // Step 1: Check if step_one object has status "completed"
    if (techpackData.step_one?.status === "completed") {
      completed.push(1);
    }

    // Steps 2-7: Check if arrays have items and all items are "completed"
    const stepKeys = [
      { key: "step_two", id: 2 },
      { key: "step_three", id: 3 },
      { key: "step_four", id: 4 },
      { key: "step_five", id: 5 },
      { key: "step_six", id: 6 },
      { key: "step_seven", id: 7 },
    ];

    stepKeys.forEach(({ key, id }) => {
      const stepData = techpackData[key];
      if (Array.isArray(stepData) && stepData.length > 0) {
        if (stepData.every((item) => item.status === "completed")) {
          completed.push(id);
        }
      }
    });

    // Step 8: Review step is complete if the whole techpack is marked as completed
    if (techpackData.status === "completed") {
      completed.push(8);
    }

    return completed;
  };

  const completedSteps = getCompletedSteps();

  // Check for incomplete steps and generate validation errors
  const validationErrors = useMemo(() => {
    const errors = [];
    const stepLabels = {
      step_one: 'Garment Setup',
      step_two: 'Measurements',
      step_three: 'Fabrics',
      step_four: 'Trims',
      step_five: 'Construction',
      step_six: 'Artwork',
      step_seven: 'Bill of Materials'
    };

    // Check each step for in_progress status
    const stepsToCheck = ['step_one', 'step_two', 'step_three', 'step_four', 'step_five', 'step_six', 'step_seven'];

    stepsToCheck.forEach((step) => {
      const stepData = techpackData[step];

      if (!stepData) {
        errors.push({
          message: `${stepLabels[step]}: No data provided`,
          step: stepLabels[step]
        });
      } else if (Array.isArray(stepData)) {
        // For array steps, check if any item is in_progress
        const inProgressItems = stepData.filter(item => item.status === 'in_progress');
        if (inProgressItems.length > 0) {
          errors.push({
            message: `${stepLabels[step]}: ${inProgressItems.length} item(s) still in progress`,
            step: stepLabels[step]
          });
        }
      } else if (typeof stepData === 'object') {
        // For single object steps, check status
        if (stepData.status === 'in_progress') {
          errors.push({
            message: `${stepLabels[step]}: Still in progress`,
            step: stepLabels[step]
          });
        }
      }
    });

    return {
      errors,
      isValid: errors.length === 0,
      hasData: Object.keys(techpackData).length > 0
    };
  }, [techpackData]);

  const data = {
    styleCode: techpackData?.step_one?.style_code || 'N/A',
    garmentType: techpackData?.step_one?.garment_type || 'N/A',
    garmentCategory: techpackData?.step_one?.garment_category || 'N/A',
    fitSilhouette: techpackData?.step_one?.fit || 'N/A',
    targetGender: techpackData?.step_one?.target_gender || 'N/A',
    date: techpackData?.step_one?.date_created || 'N/A',
    season: techpackData?.step_one?.season || 'N/A',
    baseSize: techpackData?.step_one?.base_size || 'N/A',
    version: techpackData?.step_one?.version || 'N/A',
    measurements: techpackData?.step_two || [],
    fabrics: techpackData?.step_three || [],
    trims: techpackData?.step_four || [],
    constructions: techpackData?.step_five || [],
    artworks: techpackData?.step_six || [],
    bomItems: techpackData?.step_seven || [],
  };


  const handleBack = (step) => {
    if (step === 1) {
      router.push(`/${techpack_id}`);
    } else if (step === 2) {
      router.push(`/${techpack_id}/measurements`);
    } else if (step === 3) {
      router.push(`/${techpack_id}/fabrics`);
    } else if (step === 4) {
      router.push(`/${techpack_id}/trims`);
    } else if (step === 5) {
      router.push(`/${techpack_id}/construction`);
    } else if (step === 6) {
      router.push(`/${techpack_id}/artwork`);
    } else if (step === 7) {
      router.push(`/${techpack_id}/bom`);

    } else if (step === 8) {
      router.push(`/${techpack_id}/bom`);
    }
    else {
      router.push(`/${techpack_id}/review`);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Review & Export</h1>
        <p className="text-sm text-gray-500">Review your complete tech pack before exporting</p>
      </div>

      {/* Not Factory-Ready Alert */}
      {/* <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-900 mb-1">
                {validationErrors.isValid ? '✓ Factory-Ready' : 'Not Factory-Ready'}
              </p>
              <p className="text-sm text-red-700">
                {validationErrors.isValid 
                  ? 'All steps completed. Ready for export.' 
                  : `${validationErrors.errors.length} error(s) must be fixed before export`}
              </p>
            </div>
          </div>
        </div> */}

      {/* Validation Errors */}
      {/* {validationErrors.errors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900 mb-3">Steps in Progress or Incomplete:</p>
                <ul className="space-y-2">
                  {validationErrors.errors.map((error, index) => (
                    <li key={index}>
                      <button className="flex items-center gap-2 text-sm text-left hover:underline w-full group text-red-800">
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        <span className="flex-1">{error.message}</span>
                        <span className="px-2 py-0.5 bg-red-100 border border-red-300 text-red-700 text-xs rounded capitalize">
                          {error.step}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )} */}

      {/* Garment Information */}
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Garment Information</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Style Code</p>
              <p className="text-sm text-gray-900">{data.styleCode}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Garment Type</p>
              <p className="text-sm text-gray-900">{data.garmentType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Category</p>
              <p className="text-sm text-gray-900">{data.garmentCategory}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Fit / Silhouette</p>
              <p className="text-sm text-gray-900">{data.fitSilhouette}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Target Gender</p>
              <p className="text-sm text-gray-900">{data.targetGender}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Season</p>
              <p className="text-sm text-gray-900">{data.season}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Base Size</p>
              <p className="text-sm text-gray-900">{data.baseSize}</p>
            </div>
            {/* <div>
                <p className="text-xs text-gray-500 mb-1">Measurement Unit</p>
                <p className="text-sm text-gray-900">{data.measurementUnit}</p>
              </div> */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Version</p>
              <p className="text-sm text-gray-900">{data.version}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Date</p>
              <p className="text-sm text-gray-900">{data.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Measurements */}
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Measurements ({data.baseSize} - {data.measurementUnit})</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {data.measurements.length > 0 ? (
              data.measurements.map((m) => (
                <div key={m.id} className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">{m.pom_name}</span>
                  <span className="text-sm text-gray-900">
                    {m.value} {m.unit} <span className="text-gray-500">(±{m.tolerance})</span>
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No measurements defined</p>
            )}
          </div>
        </div>
      </div>

      {/* Fabrics & Materials */}
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Fabrics & Materials</h2>
        </div>
        <div className="p-6">
          {data.fabrics.length > 0 ? (
            data.fabrics.map((fabric, index) => (
              <div key={fabric.id} className="mb-4 last:mb-0">
                <p className="text-sm font-medium text-gray-900 mb-2">{fabric.composition}</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">GSM:</span>
                    <span className="ml-2 text-gray-900">{fabric.gsm}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Construction:</span>
                    <span className="ml-2 text-gray-900">{fabric.construction}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Color:</span>
                    <span className="ml-2 text-gray-900">{fabric.color}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Stretch:</span>
                    <span className="ml-2 text-gray-900">{fabric.stretch}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No fabrics defined</p>
          )}
        </div>
      </div>

      {/* Trims & Accessories */}
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Trims & Accessories</h2>
        </div>
        <div className="p-6">
          {data.trims.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.trims.map((trim) => (
                <div
                  key={trim.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Color Header */}
                  <div
                    className="h-12 flex items-center px-4"
                    style={{
                      backgroundColor: trim.color || '#f3f4f6',
                      borderBottom: '1px solid #e5e7eb'
                    }}
                  >
                    {trim.color && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border border-white shadow-sm"
                          style={{ backgroundColor: trim.color }}
                        />
                        <span className="text-sm font-semibold text-gray-900">{trim.color}</span>
                      </div>
                    )}
                  </div>

                  {/* Trim Details */}
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-600">Type</span>
                      <span className="text-sm font-semibold text-gray-900 capitalize">{trim.trim_type}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-600">Material</span>
                      <span className="text-sm text-gray-900">{trim.material}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-600">Size</span>
                      <span className="text-sm text-gray-900">{trim.size}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-600">Finish</span>
                      <span className="text-sm text-gray-900">{trim.finish}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-600">Placement</span>
                      <span className="text-sm text-gray-900">{trim.placement}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-600">Consumption</span>
                      <span className="text-sm text-gray-900">{trim.consumption}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-600">Brand Type</span>
                      <span className="text-sm text-gray-900">{trim.brand_type}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-600">Color Logic</span>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-900 text-xs font-semibold rounded capitalize">
                        {trim.color_logic}
                      </span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-600">Supplier</span>
                      <span className="text-sm text-gray-900">{trim.supplier}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No trims defined</p>
          )}
        </div>
      </div>

      {/* Construction Details */}
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Construction Details</h2>
        </div>
        <div className="p-6">
          {data.constructions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.constructions.map((construction) => (
                <div
                  key={construction.id}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border font-bold">
                      {data.constructions.indexOf(construction) + 1}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {construction.construction_name}
                    </h3>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start bg-white rounded px-3 py-2">
                      <span className="text-xs font-medium text-gray-600">Stitch Type</span>
                      <span className="text-sm font-semibold text-gray-900">{construction.stitch_type}</span>
                    </div>

                    <div className="flex justify-between items-start bg-white rounded px-3 py-2">
                      <span className="text-xs font-medium text-gray-600">SPI</span>
                      <span className="text-sm font-semibold text-gray-900">{construction.spi}</span>
                    </div>

                    <div className="flex justify-between items-start bg-white rounded px-3 py-2">
                      <span className="text-xs font-medium text-gray-600">Seam Allowance</span>
                      <span className="text-sm font-semibold text-blue-600">{construction.seam_allowance}</span>
                    </div>

                    <div className="flex justify-between items-start bg-white rounded px-3 py-2">
                      <span className="text-xs font-medium text-gray-600">Reinforcement</span>
                      <span className="inline-block px-2 py-1 bg-blue-200 text-blue-900 text-xs font-semibold rounded">
                        {construction.reinforcement_points}
                      </span>
                    </div>

                    <div className="bg-white rounded px-3 py-2">
                      <p className="text-xs font-medium text-gray-600 mb-1">Topstitch Logic</p>
                      <p className="text-sm text-gray-800 line-clamp-2">{construction.topstitch_logic}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500">No construction details defined</p>
            </div>
          )}
        </div>
      </div>

      {/* Artwork & Placement */}
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Artwork & Placement</h2>
        </div>
        <div className="p-6">
          {data.artworks.length > 0 ? (
            <div className="space-y-4">
              {data.artworks.map((artwork) => (
                <div key={artwork.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-start gap-4">
                    {artwork.artwork_preview_url && (
                      <img
                        src={artwork.artwork_preview_url}
                        alt={artwork.artwork_name}
                        className="w-20 h-20 object-cover rounded border border-gray-200"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">{artwork.artwork_name}</h4>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <span className="ml-2 text-gray-900">{artwork.artwork_type}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Location:</span>
                          <span className="ml-2 text-gray-900">{artwork.placement_location}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Size:</span>
                          <span className="ml-2 text-gray-900">{artwork.artwork_size}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Pantone/CMYK:</span>
                          <span className="ml-2 text-gray-900">{artwork.pantone_cmyk}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No artwork defined</p>
          )}
        </div>
      </div>

      {/* Bill of Materials Summary */}
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Bill of Materials Summary</h2>
        </div>
        <div className="p-6">
          {data.bomItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-medium text-gray-600 py-2 px-4">Component</th>
                    <th className="text-left text-xs font-medium text-gray-600 py-2 px-4">Material</th>
                    <th className="text-left text-xs font-medium text-gray-600 py-2 px-4">Unit</th>
                    <th className="text-left text-xs font-medium text-gray-600 py-2 px-4">Consumption</th>
                    <th className="text-left text-xs font-medium text-gray-600 py-2 px-4">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bomItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="text-sm text-gray-900 py-2 px-4">{item.component_name}</td>
                      <td className="text-sm text-gray-700 py-2 px-4">{item.material_composition}</td>
                      <td className="text-sm text-gray-700 py-2 px-4">{item.unit}</td>
                      <td className="text-sm text-gray-700 py-2 px-4">{item.consumption}</td>
                      <td className="text-sm text-gray-700 py-2 px-4">{item.cost_per_unit} {item.currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No BOM items defined</p>
          )}
        </div>
      </div>

      {/* Confirmation */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="confirm"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            // disabled={!validationErrors.isValid}
            className="mt-1 w-4 h-4 rounded border-gray-300 disabled:opacity-50"
          />
          <div className="flex-1">
            <label
              htmlFor="confirm"
              className={`text-sm font-medium cursor-pointer ${confirmed ? 'text-blue-900' : 'text-gray-400'
                }`}
            // className="text-sm font-medium cursor-pointer text-gray-400"
            >
              I confirm that all information is accurate and ready for export
            </label>
            <p
              className={`text-xs mt-1 ${confirmed ? 'text-blue-700' : 'text-gray-400'
                }`}
            // className="text-xs mt-1 text-gray-400"
            >
              {/* {validationErrors.isValid 
                  ? 'This tech pack will be saved and can be exported in multiple formats'
                  : 'Please fix all errors before confirming'} */}
              This tech pack will be saved and can be exported in multiple formats
            </p>
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => {
            if (confirmed) {
              window.open(techpackData.pdf_url, '_blank');
            }
          }}
          disabled={!confirmed}
          title={!confirmed ? 'Please confirm before exporting' : !validationErrors.isValid ? 'Please fix all errors before exporting' : 'Export Tech Pack PDF'}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${!confirmed
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
            : 'bg-gray-800 text-white hover:bg-gray-700 cursor-pointer'
            }`}
        >
          <FileText className="w-4 h-4" />
          <span className="text-sm">Export Tech Pack PDF</span>
        </button>
        <button
          onClick={() => {
            if (confirmed) {
              window.open(techpackData.xlsx_url, '_blank');
            }
          }}
          disabled={!confirmed}
          title={!confirmed ? 'Please confirm before exporting' : !validationErrors.isValid ? 'Please fix all errors before exporting' : 'Export BOM XLSX'}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${!confirmed
            ? 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed opacity-50'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
            }`}
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">Export BOM XLSX</span>
        </button>
      </div>


      <div className="flex justify-between items-center my-6">
        <button
          onClick={() => {
            handleBack(completedSteps?.length > 0 ? completedSteps[completedSteps?.length - 1] : 1);
          }}
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
        > <ArrowLeft className="w-4 h-4" />
          Back to Edit
        </button>
        <div className="flex flex-col items-end gap-2">
          <Link
            href={`/`}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors bg-gray-900 text-white hover:bg-gray-800`}
          >
            <Home className="w-4 h-4" />
            Return to Library
          </Link>
        </div>
      </div>
    </div>
  );
}