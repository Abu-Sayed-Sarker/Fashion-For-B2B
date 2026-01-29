"use client";
import { useState, useEffect } from "react";
import { Plus, X, Info, ArrowRight, Loader2, AlertCircle, Lock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useGetFashionTechpackByIdQuery } from "@/Apis/Get-Fashion/getFashionApi";
import {
  useIncludedMaterialsMutation,
  useUpdateIncludedMaterialsMutation,
} from "@/Apis/Poast-a-fashion/postAFashionApi";
import { toast } from "react-toastify";

// Garment-type-specific mandatory measurements
const GARMENT_MEASUREMENTS = {
  'shirt': [
    { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
    { pom: 'Body Length', instruction: 'Measure from HPS (high point shoulder) to bottom hem', defaultTolerance: '±0.5' },
    { pom: 'Sleeve Length', instruction: 'Measure from shoulder seam to sleeve hem, following sleeve curve', defaultTolerance: '±0.5' },
    { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam across back', defaultTolerance: '±0.5' },
    { pom: 'Armhole', instruction: 'Measure armhole circumference from shoulder seam', defaultTolerance: '±0.5' },
    { pom: 'Cuff Opening', instruction: 'Measure width of sleeve cuff opening when laid flat', defaultTolerance: '±0.5' },
    { pom: 'Hem Width', instruction: 'Measure bottom hem width edge to edge when laid flat', defaultTolerance: '±0.5' },
    { pom: 'Neck Opening', instruction: 'Measure neckline opening circumference', defaultTolerance: '±0.5' },
  ],
  't-shirt': [
    { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
    { pom: 'Body Length', instruction: 'Measure from HPS (high point shoulder) to bottom hem', defaultTolerance: '±0.5' },
    { pom: 'Sleeve Length', instruction: 'Measure from shoulder seam to sleeve hem', defaultTolerance: '±0.5' },
    { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam across back', defaultTolerance: '±0.5' },
    { pom: 'Armhole', instruction: 'Measure armhole circumference from shoulder seam', defaultTolerance: '±0.5' },
    { pom: 'Hem Width', instruction: 'Measure bottom hem width edge to edge when laid flat', defaultTolerance: '±0.5' },
    { pom: 'Neck Opening', instruction: 'Measure neckline opening circumference', defaultTolerance: '±0.5' },
  ],
  'polo': [
    { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
    { pom: 'Body Length', instruction: 'Measure from HPS to bottom hem', defaultTolerance: '±0.5' },
    { pom: 'Sleeve Length', instruction: 'Measure from shoulder seam to sleeve hem', defaultTolerance: '±0.5' },
    { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam', defaultTolerance: '±0.5' },
    { pom: 'Armhole', instruction: 'Measure armhole circumference', defaultTolerance: '±0.5' },
    { pom: 'Neck Opening', instruction: 'Measure neckline opening circumference', defaultTolerance: '±0.5' },
    { pom: 'Placket Length', instruction: 'Measure from collar to end of button placket', defaultTolerance: '±0.3' },
  ],
  'pants': [
    { pom: 'Waist', instruction: 'Measure waistband width edge to edge when laid flat', defaultTolerance: '±0.5' },
    { pom: 'Hip', instruction: 'Measure at fullest part of hip, straight across', defaultTolerance: '±0.5' },
    { pom: 'Inseam', instruction: 'Measure from crotch seam to bottom hem along inner leg', defaultTolerance: '±0.5' },
    { pom: 'Outseam', instruction: 'Measure from waist to bottom hem along outer leg', defaultTolerance: '±0.5' },
    { pom: 'Thigh', instruction: 'Measure across thigh at fullest point', defaultTolerance: '±0.5' },
    { pom: 'Knee', instruction: 'Measure across knee when laid flat', defaultTolerance: '±0.5' },
    { pom: 'Leg Opening', instruction: 'Measure hem opening width when laid flat', defaultTolerance: '±0.3' },
    { pom: 'Front Rise', instruction: 'Measure from crotch seam to top of waistband (front)', defaultTolerance: '±0.3' },
    { pom: 'Back Rise', instruction: 'Measure from crotch seam to top of waistband (back)', defaultTolerance: '±0.3' },
  ],
  'jeans': [
    { pom: 'Waist', instruction: 'Measure waistband width edge to edge when laid flat', defaultTolerance: '±0.5' },
    { pom: 'Hip', instruction: 'Measure at fullest part of hip', defaultTolerance: '±0.5' },
    { pom: 'Inseam', instruction: 'Measure from crotch seam to bottom hem', defaultTolerance: '±0.5' },
    { pom: 'Outseam', instruction: 'Measure from waist to bottom hem', defaultTolerance: '±0.5' },
    { pom: 'Thigh', instruction: 'Measure across thigh at fullest point', defaultTolerance: '±0.5' },
    { pom: 'Knee', instruction: 'Measure across knee', defaultTolerance: '±0.5' },
    { pom: 'Leg Opening', instruction: 'Measure hem opening width', defaultTolerance: '±0.3' },
    { pom: 'Front Rise', instruction: 'Measure from crotch to waistband (front)', defaultTolerance: '±0.3' },
    { pom: 'Back Rise', instruction: 'Measure from crotch to waistband (back)', defaultTolerance: '±0.3' },
  ],
  'shorts': [
    { pom: 'Waist', instruction: 'Measure waistband width edge to edge when laid flat', defaultTolerance: '±0.5' },
    { pom: 'Hip', instruction: 'Measure at fullest part of hip', defaultTolerance: '±0.5' },
    { pom: 'Inseam', instruction: 'Measure from crotch seam to bottom hem', defaultTolerance: '±0.5' },
    { pom: 'Outseam', instruction: 'Measure from waist to bottom hem', defaultTolerance: '±0.5' },
    { pom: 'Thigh', instruction: 'Measure across thigh at fullest point', defaultTolerance: '±0.5' },
    { pom: 'Leg Opening', instruction: 'Measure hem opening width', defaultTolerance: '±0.3' },
    { pom: 'Front Rise', instruction: 'Measure from crotch to waistband (front)', defaultTolerance: '±0.3' },
  ],
  'dress': [
    { pom: 'Bust', instruction: 'Measure at fullest part of bust, straight across', defaultTolerance: '±0.5' },
    { pom: 'Waist', instruction: 'Measure at natural waistline', defaultTolerance: '±0.5' },
    { pom: 'Hip', instruction: 'Measure at fullest part of hip', defaultTolerance: '±0.5' },
    { pom: 'Body Length', instruction: 'Measure from HPS to bottom hem', defaultTolerance: '±0.5' },
    { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam', defaultTolerance: '±0.5' },
    { pom: 'Armhole', instruction: 'Measure armhole circumference', defaultTolerance: '±0.5' },
    { pom: 'Sleeve Length', instruction: 'Measure from shoulder to sleeve hem (if applicable)', defaultTolerance: '±0.5' },
    { pom: 'Neck Opening', instruction: 'Measure neckline opening circumference', defaultTolerance: '±0.5' },
  ],
  'jacket': [
    { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
    { pom: 'Body Length', instruction: 'Measure from HPS to bottom hem', defaultTolerance: '±0.5' },
    { pom: 'Sleeve Length', instruction: 'Measure from shoulder to sleeve hem', defaultTolerance: '±0.5' },
    { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam', defaultTolerance: '±0.5' },
    { pom: 'Armhole', instruction: 'Measure armhole circumference', defaultTolerance: '±0.5' },
    { pom: 'Cuff Opening', instruction: 'Measure sleeve cuff opening', defaultTolerance: '±0.5' },
    { pom: 'Hem Width', instruction: 'Measure bottom hem width', defaultTolerance: '±0.5' },
    { pom: 'Collar Height', instruction: 'Measure collar height at center back', defaultTolerance: '±0.3' },
  ],
  'hoodie': [
    { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
    { pom: 'Body Length', instruction: 'Measure from HPS to bottom hem', defaultTolerance: '±0.5' },
    { pom: 'Sleeve Length', instruction: 'Measure from shoulder to sleeve hem', defaultTolerance: '±0.5' },
    { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam', defaultTolerance: '±0.5' },
    { pom: 'Armhole', instruction: 'Measure armhole circumference', defaultTolerance: '±0.5' },
    { pom: 'Cuff Opening', instruction: 'Measure sleeve cuff opening', defaultTolerance: '±0.5' },
    { pom: 'Hem Width', instruction: 'Measure bottom hem width', defaultTolerance: '±0.5' },
    { pom: 'Hood Height', instruction: 'Measure hood from neckline to top of hood', defaultTolerance: '±0.5' },
  ],
  'skirt': [
    { pom: 'Waist', instruction: 'Measure waistband width edge to edge when laid flat', defaultTolerance: '±0.5' },
    { pom: 'Hip', instruction: 'Measure at fullest part of hip', defaultTolerance: '±0.5' },
    { pom: 'Length', instruction: 'Measure from waist to bottom hem', defaultTolerance: '±0.5' },
    { pom: 'Hem Width', instruction: 'Measure bottom hem width', defaultTolerance: '±0.5' },
  ],
};

// Default measurements for unlisted garment types
const DEFAULT_MEASUREMENTS = [
  { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
  { pom: 'Body Length', instruction: 'Measure from HPS (high point shoulder) to bottom hem', defaultTolerance: '±0.5' },
  { pom: 'Sleeve Length', instruction: 'Measure from shoulder seam to sleeve hem, following sleeve curve', defaultTolerance: '±0.5' },
  { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam across back', defaultTolerance: '±0.5' },
  { pom: 'Armhole', instruction: 'Measure armhole circumference from shoulder seam', defaultTolerance: '±0.5' },
  { pom: 'Hem Width', instruction: 'Measure bottom hem width edge to edge when laid flat', defaultTolerance: '±0.5' },
];

// Function to get measurements for a specific garment type
const getMeasurementsForGarmentType = (garmentType) => {
  if (GARMENT_MEASUREMENTS[garmentType]) {
    return GARMENT_MEASUREMENTS[garmentType];
  }

  if (garmentType === 'coat' || garmentType === 'blazer' || garmentType === 'parka' || garmentType === 'vest') {
    return GARMENT_MEASUREMENTS['jacket'] || DEFAULT_MEASUREMENTS;
  }
  if (garmentType === 'blouse' || garmentType === 'tank-top') {
    return GARMENT_MEASUREMENTS['t-shirt'] || DEFAULT_MEASUREMENTS;
  }
  if (garmentType === 'sweater' || garmentType === 'cardigan' || garmentType === 'sweatshirt') {
    return GARMENT_MEASUREMENTS['hoodie'] || DEFAULT_MEASUREMENTS;
  }
  if (garmentType === 'joggers' || garmentType === 'leggings') {
    return GARMENT_MEASUREMENTS['pants'] || DEFAULT_MEASUREMENTS;
  }
  if (garmentType === 'jumpsuit') {
    return GARMENT_MEASUREMENTS['dress'] || DEFAULT_MEASUREMENTS;
  }

  return DEFAULT_MEASUREMENTS;
};

export default function MeasurementSpecification() {
  const { techpack_id } = useParams();
  const route = useRouter();

  const [garmentType, setGarmentType] = useState("");
  const mandatoryMeasurements = getMeasurementsForGarmentType(garmentType || 'shirt');
  const [measurementId, setMeasurementId] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [baseSize, setBaseSize] = useState("M");
  const [measurementUnit, setMeasurementUnit] = useState('cm');

  // API calls
  const { data: techpackData = {}, isLoading } = useGetFashionTechpackByIdQuery(techpack_id, { skip: !techpack_id });
  const garmentData = techpackData?.step_one || {};
  const measurementData = techpackData?.step_two || [];

  const [includedMaterials, { isLoading: isIncludingMaterials }] = useIncludedMaterialsMutation();
  const [updateIncludedMaterials, { isLoading: isUpdatingMaterials }] = useUpdateIncludedMaterialsMutation();

  // Sync state with fetched techpack data
  useEffect(() => {
    if (techpackData) {
      if (garmentData.garment_type) setGarmentType(garmentData.garment_type);
      if (garmentData.base_size) setBaseSize(garmentData.base_size);
      if (garmentData.measurement_unit) setMeasurementUnit(garmentData.measurement_unit);

      if (measurementData && measurementData.length > 0) {
        setMeasurements(measurementData.map(m => ({
          id: m.id,
          pom: m.pom_name,
          value: m.value,
          tolerance: m.tolerance,
          unit: m.unit,
          instruction: m.measurement_instruction
        })));
        setMeasurementId(true); // Simple flag to indicate we are in update mode
      } else if (garmentData.garment_type) {
        // Initialize with mandatory POMs if no data exists yet
        const initialMandatory = getMeasurementsForGarmentType(garmentData.garment_type);
        setMeasurements(initialMandatory.map((m, i) => ({
          id: `pom-${i + 1}`,
          pom: m.pom,
          value: '',
          tolerance: m.defaultTolerance,
          unit: garmentData.measurement_unit || 'cm',
          instruction: m.instruction,
        })));
      }
    }
  }, [techpackData]);

  // Update measurements when garment type changes (specifically to add missing mandatory ones)
  useEffect(() => {
    if (!garmentType) return;

    const currentMandatory = getMeasurementsForGarmentType(garmentType);
    const currentPOMs = measurements.map(m => m.pom);
    const missingPOMs = currentMandatory.filter(m => !currentPOMs.includes(m.pom));

    if (missingPOMs.length > 0 && measurements.length > 0) {
      const newMeasurements = missingPOMs.map((m, i) => ({
        id: `pom-${Date.now()}-${i}`,
        pom: m.pom,
        value: '',
        tolerance: m.defaultTolerance,
        unit: measurementUnit,
        instruction: m.instruction,
      }));
      setMeasurements(prev => [...prev, ...newMeasurements]);
      toast.info(`${missingPOMs.length} mandatory measurements added for ${garmentType}`);
    }
  }, [garmentType]);

  const handleAddRow = () => {
    const newMeasurement = {
      id: `pom-custom-${Date.now()}`,
      pom: '',
      value: '',
      tolerance: '±0.5',
      unit: measurementUnit,
      instruction: '',
    };
    setMeasurements(prev => [...prev, newMeasurement]);
    toast.success('New measurement row added');
  };

  const handleRemoveRow = (id) => {
    setMeasurements(prev => prev.filter(m => m.id !== id));
    toast.success('Measurement row removed');
  };

  const handleChange = (id, field, value) => {
    setMeasurements(prev =>
      prev.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleBaseSizeChange = (value) => setBaseSize(value);
  const handleUnitChange = (value) => {
    setMeasurementUnit(value);
    setMeasurements(prev => prev.map(m => ({ ...m, unit: value })));
  };

  const isRowValid = (measurement) => !!(measurement.pom && measurement.value && measurement.tolerance);

  const onSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill all required fields (*) for each measurement.");
      const errors = measurements
        .filter(m => !isRowValid(m))
        .map(m => `Missing data for POM: ${m.pom || 'Unnamed'}`);
      setValidationErrors(errors);
      return;
    }

    const payload = {
      techpack_id,
      data: measurements.map((m) => {
        const item = {
          pom_name: m.pom,
          value: m.value,
          tolerance: m.tolerance,
          unit: m.unit,
          measurement_instruction: m.instruction,
        };
        // Only include ID if it's an update and the ID doesn't start with 'pom-' (client-side prefix)
        if (measurementId && m.id && typeof m.id === 'string' && !m.id.startsWith('pom-')) {
          item.id = m.id;
        } else if (measurementId && typeof m.id === 'number') {
          // If the ID is a number from the database, include it
          item.id = m.id;
        }
        return item;
      }),
    };

    try {
      if (measurementId) {
        await updateIncludedMaterials(payload).unwrap();
        toast.success("Measurement specifications updated successfully!");
      } else {
        await includedMaterials(payload).unwrap();
        toast.success("Measurement specifications submitted successfully!");
      }
      route.push(`/${techpack_id}/fabrics`);
    } catch (error) {
      toast.error("Failed to submit measurements.");
      console.error("Error submitting measurements:", error);
    }
  };

  const baseSizeOptions = [
    { value: "XXS", label: "XXS" },
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "XXXL", label: "XXXL" },
  ];

  const unitOptions = [
    { value: "cm", label: "Centimeters (cm)" },
    { value: "inches", label: 'Inches (\")' },
  ];

  const requiredCount = mandatoryMeasurements.length;

  const isFormValid = measurements.every(isRowValid);

  useEffect(() => {
    if (!isFormValid) {
      console.log("Form is not valid. Next button should be disabled.");
    }
  }, [measurements, isFormValid]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">Measurement Specification</h1>
        <p className="text-gray-600 text-xs md:text-sm">Define point-of-measure (POM) specifications for your {garmentType}</p>
      </div>

      {/* Base Size and Unit Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={baseSize} onChange={(e) => handleBaseSizeChange(e.target.value)}>
            {baseSizeOptions.map((option) => (
              <option className="p-3" key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={measurementUnit} onChange={(e) => handleUnitChange(e.target.value)}>
            {unitOptions.map((option) => (
              <option className="p-3" key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
        <div className="flex gap-2 md:gap-3">
          <Info className="w-4 h-4 md:w-5 md:h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm">
            <p className="font-medium text-blue-900 mb-1">{mandatoryMeasurements.length} Mandatory Measurements for {garmentType}</p>
            <p className="text-blue-800">Required measurements are automatically loaded based on garment type. You can add additional custom measurements using the button below.</p>
          </div>
        </div>
      </div>

      {/* Mobile: Card View */}
      <div className="block md:hidden space-y-4 mb-6">
        {measurements.map((measurement, index) => {
          const mandatory = mandatoryMeasurements.some(m => m.pom === measurement.pom);
          const instruction = measurement.instruction || mandatoryMeasurements.find(m => m.pom === measurement.pom)?.instruction || '';
          const hasError = !isRowValid(measurement);

          return (
            <div key={measurement.id} className="bg-white rounded-lg border border-gray-200 p-4 relative">
              {mandatory && (
                <span className="absolute top-2 right-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">Required</span>
              )}
              <div className="text-xs text-gray-500 mb-3">POM #{index + 1}</div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">POM Name <span className="text-red-500">*</span></label>
                <input
                  value={measurement.pom}
                  onChange={(e) => handleChange(measurement.id, 'pom', e.target.value)}
                  placeholder="e.g., Waist Width"
                  disabled={mandatory}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-amber-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Value <span className="text-red-500">*</span></label>
                  <input
                    value={measurement.value}
                    onChange={(e) => handleChange(measurement.id, 'value', e.target.value)}
                    type="number"
                    step="0.1"
                    placeholder="0.2"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Tolerance <span className="text-red-500">*</span></label>
                  <input
                    value={measurement.tolerance}
                    onChange={(e) => handleChange(measurement.id, 'tolerance', e.target.value)}
                    step="0.1"
                    type="number"
                    placeholder="0.5"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Unit</label>
                <div className="text-sm text-gray-600 font-medium px-3 py-2 bg-gray-50 rounded-md">{measurementUnit}</div>
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Measurement Instruction</label>
                {mandatory ? (
                  <p className="text-xs text-gray-600 italic px-3 py-2 bg-gray-50 rounded-md">{instruction}</p>
                ) : (
                  <input
                    value={measurement.instruction}
                    onChange={(e) => handleChange(measurement.id, 'instruction', e.target.value)}
                    placeholder="How to measure (optional)"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
              <button type="button" onClick={() => handleRemoveRow(measurement.id)} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50">
                <X className="w-4 h-4" /> Remove Measurement
              </button>
            </div>
          );
        })}
      </div>

      {/* Desktop: Table View */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-20">POM ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">POM Name <span className="text-red-500">*</span></th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-32">Value <span className="text-red-500">*</span></th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-32">Tolerance <span className="text-red-500">*</span></th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">Unit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Measurement Instruction</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {measurements.map((measurement, index) => {
                const mandatory = mandatoryMeasurements.some(m => m.pom === measurement.pom);
                const instruction = measurement.instruction || mandatoryMeasurements.find(m => m.pom === measurement.pom)?.instruction || '';
                return (
                  <tr key={measurement.id} className={`hover:bg-gray-50 ${mandatory ? 'bg-amber-50/30' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {mandatory && <Lock className="w-3 h-3 text-amber-600" />}
                        <span className="text-sm text-gray-600">{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={measurement.pom}
                        onChange={(e) => handleChange(measurement.id, 'pom', e.target.value)}
                        placeholder="e.g., Waist Width"
                        disabled={mandatory}
                        className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${mandatory ? 'bg-amber-50 cursor-not-allowed' : ''}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={measurement.value}
                        onChange={(e) => handleChange(measurement.id, 'value', e.target.value)}
                        placeholder="0.2"
                        type="number"
                        step="0.1"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={measurement.tolerance}
                        onChange={(e) => handleChange(measurement.id, 'tolerance', e.target.value)}
                        step="0.1"
                        type="number"
                        placeholder="0.5"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600 font-medium">{measurementUnit}</span>
                    </td>
                    <td className="px-4 py-3">
                      {mandatory ? (
                        <p className="text-xs text-gray-600 italic">{instruction}</p>
                      ) : (
                        <input
                          value={measurement.instruction}
                          onChange={(e) => handleChange(measurement.id, 'instruction', e.target.value)}
                          placeholder="How to measure (optional)"
                          className="w-full px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button type="button" onClick={() => handleRemoveRow(measurement.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Button and Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <button type="button" onClick={handleAddRow} className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Plus className="w-4 h-4" /> Add Custom Measurement Row
        </button>
        <div className="text-xs md:text-sm text-gray-600 text-center md:text-right">
          <span className="font-medium">{measurements.length}</span> measurements total
          <span className="mx-2">•</span>
          <span className="font-medium text-orange-600">{requiredCount}</span> required
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-red-100 p-1">
              <AlertCircle className="h-4 w-4 text-red-700" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-red-900 mb-1">Please fix the following errors:</p>
              <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-red-800">
                {validationErrors.slice(0, 5).map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
                {validationErrors.length > 5 && (
                  <li className="text-red-700">... and {validationErrors.length - 5} more errors</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center my-6">
        <Link href={`/${techpack_id}`} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Back to Library
        </Link>
        <div className="flex flex-col items-end gap-2">
          <button onClick={() => onSubmit()} type="submit" disabled={isUpdatingMaterials || isIncludingMaterials} className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${isUpdatingMaterials || isIncludingMaterials ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-900 text-white hover:bg-gray-800"}`}>
            Next: Fabrics {isUpdatingMaterials || isIncludingMaterials ? (<Loader2 className="w-4 h-4 animate-spin" />) : (<ArrowRight className="w-4 h-4" />)}
          </button>
          {validationErrors.length > 0 && (<p className="text-sm text-red-600">Please fill all required fields (*) to continue</p>)}
        </div>
      </div>
    </div>
  );
}
