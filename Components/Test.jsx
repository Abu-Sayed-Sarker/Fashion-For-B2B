// import { useState, useEffect } from 'react';
// import { ArrowRight, ArrowLeft, Plus, X, AlertCircle, Lock } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Textarea } from './ui/textarea';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from './ui/select';
// import { Alert, AlertDescription } from './ui/alert';
// import type { TechPackData } from '../App';
// import { motion, AnimatePresence } from 'motion/react';
// import { toast } from 'sonner';

// interface MeasurementSpecificationProps {
//     data: TechPackData;
//     onUpdate: (data: Partial<TechPackData>) => void;
//     onNext: () => void;
//     onBack: () => void;
// }

// // Measurement template type
// interface MeasurementTemplate {
//     pom: string;
//     instruction: string;
//     defaultTolerance: string;
// }

// // Garment-type-specific mandatory measurements
// const GARMENT_MEASUREMENTS: Record<string, MeasurementTemplate[]> = {
//     'shirt': [
//         { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
//         { pom: 'Body Length', instruction: 'Measure from HPS (high point shoulder) to bottom hem', defaultTolerance: '±0.5' },
//         { pom: 'Sleeve Length', instruction: 'Measure from shoulder seam to sleeve hem, following sleeve curve', defaultTolerance: '±0.5' },
//         { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam across back', defaultTolerance: '±0.5' },
//         { pom: 'Armhole', instruction: 'Measure armhole circumference from shoulder seam', defaultTolerance: '±0.5' },
//         { pom: 'Cuff Opening', instruction: 'Measure width of sleeve cuff opening when laid flat', defaultTolerance: '±0.5' },
//         { pom: 'Hem Width', instruction: 'Measure bottom hem width edge to edge when laid flat', defaultTolerance: '±0.5' },
//         { pom: 'Neck Opening', instruction: 'Measure neckline opening circumference', defaultTolerance: '±0.5' },
//     ],
//     't-shirt': [
//         { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
//         { pom: 'Body Length', instruction: 'Measure from HPS (high point shoulder) to bottom hem', defaultTolerance: '±0.5' },
//         { pom: 'Sleeve Length', instruction: 'Measure from shoulder seam to sleeve hem', defaultTolerance: '±0.5' },
//         { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam across back', defaultTolerance: '±0.5' },
//         { pom: 'Armhole', instruction: 'Measure armhole circumference from shoulder seam', defaultTolerance: '±0.5' },
//         { pom: 'Hem Width', instruction: 'Measure bottom hem width edge to edge when laid flat', defaultTolerance: '±0.5' },
//         { pom: 'Neck Opening', instruction: 'Measure neckline opening circumference', defaultTolerance: '±0.5' },
//     ],
//     'polo': [
//         { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
//         { pom: 'Body Length', instruction: 'Measure from HPS to bottom hem', defaultTolerance: '±0.5' },
//         { pom: 'Sleeve Length', instruction: 'Measure from shoulder seam to sleeve hem', defaultTolerance: '±0.5' },
//         { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam', defaultTolerance: '±0.5' },
//         { pom: 'Armhole', instruction: 'Measure armhole circumference', defaultTolerance: '±0.5' },
//         { pom: 'Neck Opening', instruction: 'Measure neckline opening circumference', defaultTolerance: '±0.5' },
//         { pom: 'Placket Length', instruction: 'Measure from collar to end of button placket', defaultTolerance: '±0.3' },
//     ],
//     'pants': [
//         { pom: 'Waist', instruction: 'Measure waistband width edge to edge when laid flat', defaultTolerance: '±0.5' },
//         { pom: 'Hip', instruction: 'Measure at fullest part of hip, straight across', defaultTolerance: '±0.5' },
//         { pom: 'Inseam', instruction: 'Measure from crotch seam to bottom hem along inner leg', defaultTolerance: '±0.5' },
//         { pom: 'Outseam', instruction: 'Measure from waist to bottom hem along outer leg', defaultTolerance: '±0.5' },
//         { pom: 'Thigh', instruction: 'Measure across thigh at fullest point', defaultTolerance: '±0.5' },
//         { pom: 'Knee', instruction: 'Measure across knee when laid flat', defaultTolerance: '±0.5' },
//         { pom: 'Leg Opening', instruction: 'Measure hem opening width when laid flat', defaultTolerance: '±0.3' },
//         { pom: 'Front Rise', instruction: 'Measure from crotch seam to top of waistband (front)', defaultTolerance: '±0.3' },
//         { pom: 'Back Rise', instruction: 'Measure from crotch seam to top of waistband (back)', defaultTolerance: '±0.3' },
//     ],
//     'jeans': [
//         { pom: 'Waist', instruction: 'Measure waistband width edge to edge when laid flat', defaultTolerance: '±0.5' },
//         { pom: 'Hip', instruction: 'Measure at fullest part of hip', defaultTolerance: '±0.5' },
//         { pom: 'Inseam', instruction: 'Measure from crotch seam to bottom hem', defaultTolerance: '±0.5' },
//         { pom: 'Outseam', instruction: 'Measure from waist to bottom hem', defaultTolerance: '±0.5' },
//         { pom: 'Thigh', instruction: 'Measure across thigh at fullest point', defaultTolerance: '±0.5' },
//         { pom: 'Knee', instruction: 'Measure across knee', defaultTolerance: '±0.5' },
//         { pom: 'Leg Opening', instruction: 'Measure hem opening width', defaultTolerance: '±0.3' },
//         { pom: 'Front Rise', instruction: 'Measure from crotch to waistband (front)', defaultTolerance: '±0.3' },
//         { pom: 'Back Rise', instruction: 'Measure from crotch to waistband (back)', defaultTolerance: '±0.3' },
//     ],
//     'shorts': [
//         { pom: 'Waist', instruction: 'Measure waistband width edge to edge when laid flat', defaultTolerance: '±0.5' },
//         { pom: 'Hip', instruction: 'Measure at fullest part of hip', defaultTolerance: '±0.5' },
//         { pom: 'Inseam', instruction: 'Measure from crotch seam to bottom hem', defaultTolerance: '±0.5' },
//         { pom: 'Outseam', instruction: 'Measure from waist to bottom hem', defaultTolerance: '±0.5' },
//         { pom: 'Thigh', instruction: 'Measure across thigh at fullest point', defaultTolerance: '±0.5' },
//         { pom: 'Leg Opening', instruction: 'Measure hem opening width', defaultTolerance: '±0.3' },
//         { pom: 'Front Rise', instruction: 'Measure from crotch to waistband (front)', defaultTolerance: '±0.3' },
//     ],
//     'dress': [
//         { pom: 'Bust', instruction: 'Measure at fullest part of bust, straight across', defaultTolerance: '±0.5' },
//         { pom: 'Waist', instruction: 'Measure at natural waistline', defaultTolerance: '±0.5' },
//         { pom: 'Hip', instruction: 'Measure at fullest part of hip', defaultTolerance: '±0.5' },
//         { pom: 'Body Length', instruction: 'Measure from HPS to bottom hem', defaultTolerance: '±0.5' },
//         { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam', defaultTolerance: '±0.5' },
//         { pom: 'Armhole', instruction: 'Measure armhole circumference', defaultTolerance: '±0.5' },
//         { pom: 'Sleeve Length', instruction: 'Measure from shoulder to sleeve hem (if applicable)', defaultTolerance: '±0.5' },
//         { pom: 'Neck Opening', instruction: 'Measure neckline opening circumference', defaultTolerance: '±0.5' },
//     ],
//     'jacket': [
//         { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
//         { pom: 'Body Length', instruction: 'Measure from HPS to bottom hem', defaultTolerance: '±0.5' },
//         { pom: 'Sleeve Length', instruction: 'Measure from shoulder to sleeve hem', defaultTolerance: '±0.5' },
//         { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam', defaultTolerance: '±0.5' },
//         { pom: 'Armhole', instruction: 'Measure armhole circumference', defaultTolerance: '±0.5' },
//         { pom: 'Cuff Opening', instruction: 'Measure sleeve cuff opening', defaultTolerance: '±0.5' },
//         { pom: 'Hem Width', instruction: 'Measure bottom hem width', defaultTolerance: '±0.5' },
//         { pom: 'Collar Height', instruction: 'Measure collar height at center back', defaultTolerance: '±0.3' },
//     ],
//     'hoodie': [
//         { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
//         { pom: 'Body Length', instruction: 'Measure from HPS to bottom hem', defaultTolerance: '±0.5' },
//         { pom: 'Sleeve Length', instruction: 'Measure from shoulder to sleeve hem', defaultTolerance: '±0.5' },
//         { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam', defaultTolerance: '±0.5' },
//         { pom: 'Armhole', instruction: 'Measure armhole circumference', defaultTolerance: '±0.5' },
//         { pom: 'Cuff Opening', instruction: 'Measure sleeve cuff opening', defaultTolerance: '±0.5' },
//         { pom: 'Hem Width', instruction: 'Measure bottom hem width', defaultTolerance: '±0.5' },
//         { pom: 'Hood Height', instruction: 'Measure hood from neckline to top of hood', defaultTolerance: '±0.5' },
//     ],
//     'skirt': [
//         { pom: 'Waist', instruction: 'Measure waistband width edge to edge when laid flat', defaultTolerance: '±0.5' },
//         { pom: 'Hip', instruction: 'Measure at fullest part of hip', defaultTolerance: '±0.5' },
//         { pom: 'Length', instruction: 'Measure from waist to bottom hem', defaultTolerance: '±0.5' },
//         { pom: 'Hem Width', instruction: 'Measure bottom hem width', defaultTolerance: '±0.5' },
//     ],
// };

// // Default measurements for unlisted garment types
// const DEFAULT_MEASUREMENTS: MeasurementTemplate[] = [
//     { pom: 'Chest', instruction: 'Measure 1" below armhole, straight across chest', defaultTolerance: '±0.5' },
//     { pom: 'Body Length', instruction: 'Measure from HPS (high point shoulder) to bottom hem', defaultTolerance: '±0.5' },
//     { pom: 'Sleeve Length', instruction: 'Measure from shoulder seam to sleeve hem, following sleeve curve', defaultTolerance: '±0.5' },
//     { pom: 'Shoulder Width', instruction: 'Measure from shoulder seam to shoulder seam across back', defaultTolerance: '±0.5' },
//     { pom: 'Armhole', instruction: 'Measure armhole circumference from shoulder seam', defaultTolerance: '±0.5' },
//     { pom: 'Hem Width', instruction: 'Measure bottom hem width edge to edge when laid flat', defaultTolerance: '±0.5' },
// ];

// // Function to get measurements for a specific garment type
// const getMeasurementsForGarmentType = (garmentType: string): MeasurementTemplate[] => {
//     // Check for exact match
//     if (GARMENT_MEASUREMENTS[garmentType]) {
//         return GARMENT_MEASUREMENTS[garmentType];
//     }

//     // Check for similar types (e.g., 'coat' should use jacket measurements)
//     if (garmentType === 'coat' || garmentType === 'blazer' || garmentType === 'parka' || garmentType === 'vest') {
//         return GARMENT_MEASUREMENTS['jacket'] || DEFAULT_MEASUREMENTS;
//     }
//     if (garmentType === 'blouse' || garmentType === 'tank-top') {
//         return GARMENT_MEASUREMENTS['t-shirt'] || DEFAULT_MEASUREMENTS;
//     }
//     if (garmentType === 'sweater' || garmentType === 'cardigan' || garmentType === 'sweatshirt') {
//         return GARMENT_MEASUREMENTS['hoodie'] || DEFAULT_MEASUREMENTS;
//     }
//     if (garmentType === 'joggers' || garmentType === 'leggings') {
//         return GARMENT_MEASUREMENTS['pants'] || DEFAULT_MEASUREMENTS;
//     }
//     if (garmentType === 'jumpsuit') {
//         return GARMENT_MEASUREMENTS['dress'] || DEFAULT_MEASUREMENTS;
//     }

//     return DEFAULT_MEASUREMENTS;
// };

// export function MeasurementSpecification({ data, onUpdate, onNext, onBack }: MeasurementSpecificationProps) {
//     // Get mandatory measurements based on garment type
//     const mandatoryMeasurements = getMeasurementsForGarmentType(data.garmentType || '');

//     const [measurements, setMeasurements] = useState(() => {
//         // If measurements exist, keep them but mark which are mandatory for current garment type
//         if (data.measurements.length > 0) {
//             return data.measurements;
//         }

//         // Initialize with mandatory POMs for the garment type
//         return mandatoryMeasurements.map((m, i) => ({
//             id: `pom-${i + 1}`,
//             pom: m.pom,
//             value: '',
//             tolerance: m.defaultTolerance,
//             unit: 'cm',
//             instruction: m.instruction,
//         }));
//     });

//     const [baseSize, setBaseSize] = useState(data.baseSize || 'M');
//     const [measurementUnit, setMeasurementUnit] = useState(data.measurementUnit || 'cm');
//     const [validationErrors, setValidationErrors] = useState < string[] > ([]);

//     // Update measurements when garment type changes
//     useEffect(() => {
//         const currentMandatory = getMeasurementsForGarmentType(data.garmentType || '');
//         const currentPOMs = measurements.map(m => m.pom);

//         // Add any missing mandatory POMs
//         const missingPOMs = currentMandatory.filter(
//             m => !currentPOMs.includes(m.pom)
//         );

//         if (missingPOMs.length > 0) {
//             const newMeasurements = missingPOMs.map((m, i) => ({
//                 id: `pom-${Date.now()}-${i}`,
//                 pom: m.pom,
//                 value: '',
//                 tolerance: m.defaultTolerance,
//                 unit: measurementUnit,
//                 instruction: m.instruction,
//             }));

//             setMeasurements(prev => [...newMeasurements, ...prev]);
//             toast.info(`${missingPOMs.length} mandatory measurements added for ${data.garmentType}`);
//         }
//     }, [data.garmentType]);

//     // Auto-save measurements
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             onUpdate({
//                 measurements,
//                 baseSize,
//                 measurementUnit
//             });
//         }, 500);
//         return () => clearTimeout(timer);
//     }, [measurements, baseSize, measurementUnit, onUpdate]);

//     const handleAddRow = () => {
//         const newMeasurement = {
//             id: `pom-custom-${Date.now()}`,
//             pom: '',
//             value: '',
//             tolerance: '±0.5',
//             unit: measurementUnit,
//             instruction: '',
//         };
//         const updated = [...measurements, newMeasurement];
//         setMeasurements(updated);
//         toast.success('New measurement row added');
//     };

//     const handleRemoveRow = (id: string) => {
//         // Check if it's a mandatory POM for current garment type
//         const measurement = measurements.find(m => m.id === id);
//         const isMandatory = mandatoryMeasurements.some(mp => mp.pom === measurement?.pom);

//         if (isMandatory) {
//             toast.error(`Cannot remove mandatory measurement for ${data.garmentType}`);
//             return;
//         }

//         const updated = measurements.filter(m => m.id !== id);
//         setMeasurements(updated);
//         toast.success('Measurement row removed');
//     };

//     const handleChange = (id: string, field: string, value: string) => {
//         const updated = measurements.map(m =>
//             m.id === id ? { ...m, [field]: value } : m
//         );
//         setMeasurements(updated);
//     };

//     const handleBaseSizeChange = (value: string) => {
//         setBaseSize(value);
//     };

//     const handleUnitChange = (value: string) => {
//         setMeasurementUnit(value);
//         // Update all measurement units
//         const updated = measurements.map(m => ({ ...m, unit: value }));
//         setMeasurements(updated);
//     };

//     const validateMeasurements = (): boolean => {
//         const errors: string[] = [];

//         // Check if all mandatory POMs for current garment type are filled
//         for (const mandatoryPOM of mandatoryMeasurements) {
//             const measurement = measurements.find(m => m.pom === mandatoryPOM.pom);

//             if (!measurement) {
//                 errors.push(`Missing mandatory POM: ${mandatoryPOM.pom}`);
//             } else if (!measurement.value || measurement.value.trim() === '') {
//                 errors.push(`${mandatoryPOM.pom}: Measurement value is required`);
//             } else if (!measurement.tolerance || measurement.tolerance.trim() === '') {
//                 errors.push(`${mandatoryPOM.pom}: Tolerance is required`);
//             }
//         }

//         // Check all rows for completeness
//         measurements.forEach((m, index) => {
//             if (m.pom && (!m.value || m.value.trim() === '')) {
//                 errors.push(`Row ${index + 1} (${m.pom}): Value is required`);
//             }
//             if (m.value && (!m.pom || m.pom.trim() === '')) {
//                 errors.push(`Row ${index + 1}: POM name is required`);
//             }
//         });

//         setValidationErrors(errors);
//         return errors.length === 0;
//     };

//     const handleNext = () => {
//         if (validateMeasurements()) {
//             onNext();
//             toast.success('Measurements saved successfully');
//         } else {
//             toast.error(`Please fix ${validationErrors.length} validation error(s)`);
//         }
//     };

//     const isMandatoryPOM = (pomName: string): boolean => {
//         return mandatoryMeasurements.some(m => m.pom === pomName);
//     };

//     const getMandatoryInstruction = (pomName: string): string => {
//         const mandatory = mandatoryMeasurements.find(m => m.pom === pomName);
//         return mandatory?.instruction || '';
//     };

//     const isRowValid = (measurement: typeof measurements[0]): boolean => {
//         return !!(measurement.pom && measurement.value && measurement.tolerance);
//     };

//     return (
//         <div className="container mx-auto px-6 py-8 max-w-7xl">
//             <div className="mb-8">
//                 <h2 className="text-2xl font-semibold text-slate-900 mb-2">Measurement Specification</h2>
//                 <p className="text-slate-600">
//                     Define point-of-measure (POM) specifications for your {data.garmentType || 'garment'}
//                 </p>
//             </div>

//             {/* Validation Errors */}
//             {validationErrors.length > 0 && (
//                 <Alert variant="destructive" className="mb-6">
//                     <AlertCircle className="h-4 w-4" />
//                     <AlertDescription>
//                         <p className="font-medium mb-2">Please fix the following errors:</p>
//                         <ul className="list-disc list-inside space-y-1 text-sm">
//                             {validationErrors.slice(0, 5).map((error, index) => (
//                                 <li key={index}>{error}</li>
//                             ))}
//                             {validationErrors.length > 5 && (
//                                 <li className="text-red-700">... and {validationErrors.length - 5} more errors</li>
//                             )}
//                         </ul>
//                     </AlertDescription>
//                 </Alert>
//             )}

//             {/* Size and Unit Selection */}
//             <div className="bg-white rounded-lg border border-stone-200 p-6 mb-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                         <Label htmlFor="baseSize">Base Size (Reference Size)</Label>
//                         <Select value={baseSize} onValueChange={handleBaseSizeChange}>
//                             <SelectTrigger id="baseSize" className="border-stone-300">
//                                 <SelectValue placeholder="Select base size" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="XXS">XXS</SelectItem>
//                                 <SelectItem value="XS">XS</SelectItem>
//                                 <SelectItem value="S">S</SelectItem>
//                                 <SelectItem value="M">M</SelectItem>
//                                 <SelectItem value="L">L</SelectItem>
//                                 <SelectItem value="XL">XL</SelectItem>
//                                 <SelectItem value="XXL">XXL</SelectItem>
//                                 <SelectItem value="XXXL">XXXL</SelectItem>
//                             </SelectContent>
//                         </Select>
//                         <p className="text-xs text-slate-500">All measurements reference this size</p>
//                     </div>

//                     <div className="space-y-2">
//                         <Label htmlFor="measurementUnit">Measurement Unit</Label>
//                         <Select value={measurementUnit} onValueChange={handleUnitChange}>
//                             <SelectTrigger id="measurementUnit" className="border-stone-300">
//                                 <SelectValue placeholder="Select unit" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="cm">Centimeters (cm)</SelectItem>
//                                 <SelectItem value="inches">Inches (")</SelectItem>
//                             </SelectContent>
//                         </Select>
//                         <p className="text-xs text-slate-500">Will apply to all measurements</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Info Box */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                 <div className="flex gap-3">
//                     <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
//                     <div className="text-sm text-blue-900">
//                         <p className="font-medium mb-1">
//                             {mandatoryMeasurements.length} Mandatory Measurements for {data.garmentType || 'this garment'}
//                         </p>
//                         <p className="text-blue-700">
//                             Required measurements are automatically loaded based on garment type.
//                             You can add additional custom measurements using the button below.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Measurements Table */}
//             <div className="bg-white rounded-lg border border-stone-200 overflow-hidden mb-6">
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="border-b border-stone-200 bg-stone-50">
//                                 <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider w-20">
//                                     POM ID
//                                 </th>
//                                 <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
//                                     POM Name <span className="text-red-500">*</span>
//                                 </th>
//                                 <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider w-32">
//                                     Value <span className="text-red-500">*</span>
//                                 </th>
//                                 <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider w-32">
//                                     Tolerance <span className="text-red-500">*</span>
//                                 </th>
//                                 <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider w-24">
//                                     Unit
//                                 </th>
//                                 <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
//                                     Measurement Instruction
//                                 </th>
//                                 <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider w-24">
//                                     Action
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-stone-200">
//                             <AnimatePresence>
//                                 {measurements.map((measurement, index) => {
//                                     const mandatory = isMandatoryPOM(measurement.pom);
//                                     const instruction = measurement.instruction || getMandatoryInstruction(measurement.pom);
//                                     const hasError = !isRowValid(measurement);

//                                     return (
//                                         <motion.tr
//                                             key={measurement.id}
//                                             initial={{ opacity: 0, y: -10 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             exit={{ opacity: 0, y: -10 }}
//                                             className={`hover:bg-stone-50 ${hasError ? 'bg-red-50/30' : ''} ${mandatory ? 'bg-amber-50/30' : ''}`}
//                                         >
//                                             {/* POM ID */}
//                                             <td className="px-4 py-3">
//                                                 <div className="flex items-center gap-2">
//                                                     {mandatory && <Lock className="w-3 h-3 text-amber-600" />}
//                                                     <span className="text-sm font-mono text-slate-600">{index + 1}</span>
//                                                 </div>
//                                             </td>

//                                             {/* POM Name */}
//                                             <td className="px-4 py-3">
//                                                 <Input
//                                                     value={measurement.pom}
//                                                     onChange={(e) => handleChange(measurement.id, 'pom', e.target.value)}
//                                                     placeholder="e.g., Waist Width"
//                                                     disabled={mandatory}
//                                                     className={`text-sm ${mandatory ? 'bg-amber-50 font-medium cursor-not-allowed' : ''} ${!measurement.pom && 'border-red-300'}`}
//                                                 />
//                                             </td>

//                                             {/* Value */}
//                                             <td className="px-4 py-3">
//                                                 <Input
//                                                     value={measurement.value}
//                                                     onChange={(e) => handleChange(measurement.id, 'value', e.target.value)}
//                                                     placeholder="0.2"
//                                                     type="number"
//                                                     step="0.1"
//                                                     className={`text-sm ${!measurement.value && 'border-red-300'}`}
//                                                 />
//                                             </td>

//                                             {/* Tolerance */}
//                                             <td className="px-4 py-3">
//                                                 <Input
//                                                     value={measurement.tolerance}
//                                                     onChange={(e) => handleChange(measurement.id, 'tolerance', e.target.value)}
//                                                     placeholder="±0.5"
//                                                     className={`text-sm ${!measurement.tolerance && 'border-red-300'}`}
//                                                 />
//                                             </td>

//                                             {/* Unit */}
//                                             <td className="px-4 py-3">
//                                                 <span className="text-sm text-slate-600 font-medium">
//                                                     {measurement.unit}
//                                                 </span>
//                                             </td>

//                                             {/* Measurement Instruction */}
//                                             <td className="px-4 py-3">
//                                                 {instruction ? (
//                                                     <p className="text-xs text-slate-600 italic">{instruction}</p>
//                                                 ) : (
//                                                     <Input
//                                                         value={measurement.instruction || ''}
//                                                         onChange={(e) => handleChange(measurement.id, 'instruction', e.target.value)}
//                                                         placeholder="How to measure (optional)"
//                                                         className="text-xs"
//                                                     />
//                                                 )}
//                                             </td>

//                                             {/* Action */}
//                                             <td className="px-4 py-3 text-center">
//                                                 {!mandatory ? (
//                                                     <Button
//                                                         variant="ghost"
//                                                         size="sm"
//                                                         onClick={() => handleRemoveRow(measurement.id)}
//                                                         className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
//                                                     >
//                                                         <X className="w-4 h-4" />
//                                                     </Button>
//                                                 ) : (
//                                                     <span className="text-xs text-amber-600 font-medium">Required</span>
//                                                 )}
//                                             </td>
//                                         </motion.tr>
//                                     );
//                                 })}
//                             </AnimatePresence>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Add Measurement Button */}
//             <div className="flex justify-between items-center mb-8">
//                 <Button
//                     onClick={handleAddRow}
//                     variant="outline"
//                     className="gap-2 border-stone-300"
//                 >
//                     <Plus className="w-4 h-4" />
//                     Add Custom Measurement Row
//                 </Button>

//                 <div className="text-sm text-slate-600">
//                     <span className="font-medium">{measurements.length}</span> measurements total
//                     <span className="mx-2">•</span>
//                     <span className="font-medium text-amber-600">{mandatoryMeasurements.length}</span> required
//                 </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex justify-between gap-4">
//                 <Button
//                     variant="outline"
//                     onClick={onBack}
//                     className="gap-2 border-stone-300"
//                 >
//                     <ArrowLeft className="w-4 h-4" />
//                     Back to Garment Setup
//                 </Button>
//                 <Button
//                     onClick={handleNext}
//                     className="bg-slate-900 hover:bg-slate-800 gap-2"
//                 >
//                     Next: Fabrics & Materials
//                     <ArrowRight className="w-4 h-4" />
//                 </Button>
//             </div>
//         </div>
//     );
// }
