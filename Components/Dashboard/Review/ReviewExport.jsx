"use client";
import { useState } from 'react';
import { ArrowLeft, Download, FileText, AlertCircle, Home, ChevronRight } from 'lucide-react';
import { useCheckReviewDataValidation } from '@/Hooks/useCheckReviewDataValidation';
import Link from 'next/link';

// Mock data for demonstration
const mockData = {
  styleCode: 'SKU',
  garmentType: 'patch',
  garmentCategory: 'bottoms',
  fitSilhouette: 'M / Silhouette',
  targetGender: 'Unisex',
  season: 'Season',
  baseSize: 'M',
  measurementUnit: 'cm',
  version: '1.0',
  date: '2025-01-10',
  measurements: [
    { id: 1, name: 'Waist', value: '34', tolerance: '1.5cm measurement ±t', unit: 'cm' },
    { id: 2, name: 'Hip', value: '54', tolerance: '1.5(digit not at tempus)', unit: 'cm' },
    { id: 3, name: 'Inseam', value: '68', tolerance: '1.Cum nascunt nist eq', unit: 'cm' },
    { id: 4, name: 'Outseam', value: '86', tolerance: '1.5fitium dolore iusto et', unit: 'cm' },
    { id: 5, name: 'Thigh', value: '10', tolerance: '1.Ad odio nasciant it', unit: 'cm' },
    { id: 6, name: 'Knee', value: '93', tolerance: '1.Enim malis discoetat an', unit: 'cm' },
    { id: 7, name: 'Leg Opening', value: '86', tolerance: '1.fitium consequatur el', unit: 'cm' },
    { id: 8, name: 'Front Rise', value: '30', tolerance: '1.5aert aliquam neino ta', unit: 'cm' },
    { id: 9, name: 'Back Rise', value: '91', tolerance: '1.5fite voluptaten odio t', unit: 'cm' },
    { id: 10, name: 'Super do quis incurato', value: '29', tolerance: '1. Accusantium amet nd', unit: 'cm' },
    { id: 11, name: 'Aut qui iflerictos as', value: '43', tolerance: '1. Voluptatem inventore', unit: 'cm' },
    { id: 12, name: 'Quis sit sunt nemo se', value: '93', tolerance: '1.Error in ad dolor fi', unit: 'cm' },
    { id: 13, name: 'Dolor dolore iusto do', value: '91', tolerance: '1.Molestiae quis duis i', unit: 'cm' },
    { id: 14, name: 'Ut aspernatur magni', value: '40', tolerance: '1?Vlosam modestius uti', unit: 'cm' },
    { id: 15, name: 'Odio as lahoretu ut i', value: '16', tolerance: '1. Vitae rescasellae Est', unit: 'cm' },
    { id: 16, name: 'Esse eggificitur artis', value: '10', tolerance: '1.Oload facilis rerum eft', unit: 'cm' }
  ],
  fabrics: [
    { id: 1, fabricName: 'Fabric 1', composition: 'Et excepturi iacune', gsm: 'Quasi consequatist.' }
  ],
  trims: [],
  construction: {
    neck: { stitchType: '571', seamAllowance: '—', reinforcement: '—' },
    sleeve: { stitchType: '—', spi: '571' },
    hem: { stitchType: '—', spi: '571' }
  },
  artworks: [],
  bomItems: []
};

const mockValidation = useCheckReviewDataValidation(mockData);

export default function ReviewExport() {
  const [confirmed, setConfirmed] = useState(false);
  const data = mockData;
  const validation = mockValidation;

  return (
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Review & Export</h1>
          <p className="text-sm text-gray-500">Review your complete tech pack before exporting</p>
        </div>

        {/* Not Factory-Ready Alert */}
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-900 mb-1">Not Factory-Ready</p>
              <p className="text-sm text-red-700">{validation.errors.length} error(s) must be fixed before export</p>
            </div>
          </div>
        </div>

        {/* Validation Errors */}
        {validation.errors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900 mb-3">Click on any error to navigate to that section:</p>
                <ul className="space-y-2">
                  {validation.errors.map((error, index) => (
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
        )}

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
              <div>
                <p className="text-xs text-gray-500 mb-1">Measurement Unit</p>
                <p className="text-sm text-gray-900">{data.measurementUnit}</p>
              </div>
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
              {data.measurements.map((m) => (
                <div key={m.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{m.name}</span>
                  <span className="text-sm text-gray-900">
                    {m.value} {m.unit} <span className="text-gray-500">({m.tolerance})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fabrics & Materials */}
        <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Fabrics & Materials</h2>
          </div>
          <div className="p-6">
            {data.fabrics.map((fabric, index) => (
              <div key={fabric.id} className="mb-4 last:mb-0">
                <p className="text-sm font-medium text-gray-900 mb-2">{fabric.fabricName}</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">Composition:</span>
                    <span className="ml-2 text-gray-900">{fabric.composition}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">GSM:</span>
                    <span className="ml-2 text-gray-900">{fabric.gsm}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trims & Accessories */}
        <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Trims & Accessories</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500">No trims defined</p>
          </div>
        </div>

        {/* Construction Details */}
        <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Construction Details</h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Neck Construction */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">👔</span> Neck Construction
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 pl-7">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stitch Type</p>
                  <p className="text-sm text-gray-900">{data.construction.neck.stitchType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">SPI</p>
                  <p className="text-sm text-gray-900">—</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Seam Allowance</p>
                  <p className="text-sm text-gray-900">{data.construction.neck.seamAllowance}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Reinforcement</p>
                  <p className="text-sm text-gray-900">{data.construction.neck.reinforcement}</p>
                </div>
              </div>
            </div>

            {/* Sleeve Construction */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-green-600">👕</span> Sleeve Construction
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 pl-7">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stitch Type</p>
                  <p className="text-sm text-gray-900">{data.construction.sleeve.stitchType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">SPI</p>
                  <p className="text-sm text-gray-900">{data.construction.sleeve.spi}</p>
                </div>
              </div>
            </div>

            {/* Hem Construction */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-orange-600">📏</span> Hem Construction
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 pl-7">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stitch Type</p>
                  <p className="text-sm text-gray-900">{data.construction.hem.stitchType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">SPI</p>
                  <p className="text-sm text-gray-900">{data.construction.hem.spi}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Artwork & Placement */}
        <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Artwork & Placement</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500">No artwork defined</p>
          </div>
        </div>

        {/* Bill of Materials Summary */}
        <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Bill of Materials Summary</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500">No BOM items defined</p>
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
              disabled={!validation.isValid}
              className="mt-1 w-4 h-4 rounded border-gray-300 disabled:opacity-50"
            />
            <div className="flex-1">
              <label
                htmlFor="confirm"
                className={`text-sm font-medium cursor-pointer ${
                  validation.isValid ? 'text-blue-900' : 'text-gray-400'
                }`}
              >
                I confirm that all information is accurate and ready for export
              </label>
              <p className={`text-xs mt-1 ${
                validation.isValid ? 'text-blue-700' : 'text-gray-400'
              }`}>
                {validation.isValid 
                  ? 'This tech pack will be saved and can be exported in multiple formats'
                  : 'Please fix all errors before confirming'}
              </p>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            disabled={!confirmed || !validation.isValid}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Export Tech Pack PDF</span>
          </button>
          <button
            disabled={!confirmed || !validation.isValid}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export BOM XLSX</span>
          </button>
        </div>


         <div className="flex justify-between items-center my-6">
          <Link
            href="/dashboard/bom"
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          > <ArrowLeft className="w-4 h-4" />
            Back to Edit
          </Link>
          <div className="flex flex-col items-end gap-2">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors bg-gray-900 text-white hover:bg-gray-800`}
            >
              <Home className="w-4 h-4" />
            Return to Library
            </button>
          </div>
        </div>
      </div>
  );
}