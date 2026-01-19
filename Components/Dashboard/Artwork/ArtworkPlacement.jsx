"use client";
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, X, Image as ImageIcon, Upload, Trash2, ArrowRight } from 'lucide-react';

import { Input, Select } from '@/Libs/Form-components/FormComponent';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Image Upload Component
const ImageUpload = ({ index, preview, onImageChange, onImageRemove }) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload AI, PDF, PNG, JPG, or SVG files only');
        return;
      }
      
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onImageChange(index, reader.result, file);
        };
        reader.readAsDataURL(file);
      } else {
        // For PDFs, just store the file info
        onImageChange(index, null, file);
      }
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Artwork Preview
      </label>
      
      {preview ? (
        <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
          {preview.type === 'image' ? (
            <img 
              src={preview.url} 
              alt="Artwork preview" 
              className="w-full h-48 object-contain p-4"
            />
          ) : (
            <div className="flex items-center justify-center h-48 p-4">
              <div className="text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium text-gray-700">{preview.name}</p>
                <p className="text-xs text-gray-500">{(preview.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => onImageRemove(index)}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all">
          <input
            type="file"
            accept=".ai,.pdf,.png,.jpg,.jpeg,.svg"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-1 font-medium">Upload artwork file</p>
          <p className="text-xs text-gray-400">AI, PDF, PNG, JPG, SVG (Max 10MB)</p>
        </label>
      )}
    </div>
  );
};

export default function ArtworkPlacement() {
  const router = useRouter();
  const { register, control, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    defaultValues: {
      artworks: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'artworks',
  });

  const [artworkPreviews, setArtworkPreviews] = useState({});

  const handleAddArtwork = () => {
    append({
      artworkName: '',
      artworkType: '',
      fileReference: '',
      placementLocation: '',
      coordinates: '',
      artworkSize: '',
      placementTolerance: '',
      colorCount: '',
      colorSeparation: '',
      pantoneOrCMYK: '',
      underbaseRequired: 'no',
      perSizeOrGlobal: 'global',
      method: '',
    });
  };

  const handleImageChange = (index, previewUrl, file) => {
    setArtworkPreviews(prev => ({
      ...prev,
      [index]: {
        url: previewUrl,
        type: file.type.startsWith('image/') ? 'image' : 'pdf',
        name: file.name,
        size: file.size,
        file: file
      }
    }));
  };

  const handleImageRemove = (index) => {
    setArtworkPreviews(prev => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const onSubmit = (data) => {
    console.log('Artwork Data:', data);
    console.log('Artwork Files:', artworkPreviews);
    console.log('Total Artworks:', data.artworks.length);
    
    // You can handle file upload here
    Object.entries(artworkPreviews).forEach(([index, preview]) => {
      console.log(`Artwork ${index} file:`, preview.file);
    });
    router.push('/dashboard/bom');
  };

  const artworkTypeOptions = [
    { value: 'print', label: 'Print' },
    { value: 'embroidery', label: 'Embroidery' },
    { value: 'patch', label: 'Patch' },
    { value: 'applique', label: 'Appliqué' },
    { value: 'heat-transfer', label: 'Heat Transfer' },
    { value: 'screen-print', label: 'Screen Print' },
  ];

  const placementLocationOptions = [
    { value: 'center-chest', label: 'Center Chest' },
    { value: 'left-chest', label: 'Left Chest' },
    { value: 'right-chest', label: 'Right Chest' },
    { value: 'center-back', label: 'Center Back' },
    { value: 'left-sleeve', label: 'Left Sleeve' },
    { value: 'right-sleeve', label: 'Right Sleeve' },
    { value: 'hood', label: 'Hood' },
    { value: 'pocket', label: 'Pocket' },
    { value: 'hem', label: 'Hem' },
  ];

  const pantoneOptions = [
    { value: 'pantone', label: 'Pantone (Specify codes)' },
    { value: 'cmyk', label: 'CMYK Process' },
    { value: 'rgb', label: 'RGB (Digital Only)' },
    { value: 'spot', label: 'Spot Color' },
  ];

  const underbaseOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'white-only', label: 'White Underbase Only' },
  ];

  const scalingOptions = [
    { value: 'global', label: 'Same Size All Sizes' },
    { value: 'per-size', label: 'Scales Per Size' },
    { value: 'custom', label: 'Custom Per Size' },
  ];

  const methodOptions = [
    { value: 'screen-print', label: 'Screen Print' },
    { value: 'heat-transfer', label: 'Heat Transfer' },
    { value: 'dtg', label: 'Direct-to-Garment (DTG)' },
    { value: 'embroidery', label: 'Embroidery' },
    { value: 'sublimation', label: 'Sublimation' },
    { value: 'applique', label: 'Appliqué' },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Artwork & Placement
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Define artwork specifications and placement locations
          </p>
        </div>

        {/* Artworks List */}
        <div className="space-y-6">
          {fields.map((field, index) => {
            const artworkName = watch(`artworks.${index}.artworkName`);
            const artworkType = watch(`artworks.${index}.artworkType`);

            return (
              <div key={field.id} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-sm">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200">
                      <ImageIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {artworkName || `Artwork ${index + 1}`}
                      </h3>
                      {artworkType && (
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium border ${
                          artworkType === 'print' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          artworkType === 'embroidery' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                          artworkType === 'patch' ? 'bg-green-100 text-green-700 border-green-200' :
                          'bg-gray-100 text-gray-700 border-gray-200'
                        }`}>
                          {artworkType.charAt(0).toUpperCase() + artworkType.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      remove(index);
                      handleImageRemove(index);
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Card Content - Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <Input
                      label="Artwork Name"
                      name={`artworks.${index}.artworkName`}
                      register={register}
                      errors={errors.artworks?.[index] || {}}
                      required={true}
                      placeholder="e.g., Brand Logo, Graphic Print"
                      helperText="Unique identifier for this artwork"
                    />

                    <Select
                      label="Artwork Type"
                      name={`artworks.${index}.artworkType`}
                      control={control}
                      errors={errors.artworks?.[index] || {}}
                      options={artworkTypeOptions}
                      required={true}
                      placeholder="Select type"
                      helperText="Production method for this artwork"
                    />

                    <Input
                      label="File Reference"
                      name={`artworks.${index}.fileReference`}
                      register={register}
                      errors={errors.artworks?.[index] || {}}
                      required={true}
                      placeholder="e.g., Logo_V2_Final.ai, Print_A_2024.pdf"
                      helperText="Artwork file name or reference code"
                    />

                    <Select
                      label="Placement Location"
                      name={`artworks.${index}.placementLocation`}
                      control={control}
                      errors={errors.artworks?.[index] || {}}
                      options={placementLocationOptions}
                      required={true}
                      placeholder="Select location"
                      helperText="Garment location for artwork"
                    />

                    <Input
                      label="Coordinates (X, Y)"
                      name={`artworks.${index}.coordinates`}
                      register={register}
                      errors={errors.artworks?.[index] || {}}
                      placeholder="e.g., 10cm from left, 5cm from top"
                      helperText="Precise positioning from reference point"
                    />

                    <Input
                      label="Artwork Size (W × H)"
                      name={`artworks.${index}.artworkSize`}
                      register={register}
                      errors={errors.artworks?.[index] || {}}
                      required={true}
                      placeholder='e.g., 15cm x 10cm, 6" x 4"'
                      helperText="Final dimensions on garment"
                    />

                    <Input
                      label="Placement Tolerance"
                      name={`artworks.${index}.placementTolerance`}
                      register={register}
                      errors={errors.artworks?.[index] || {}}
                      placeholder="e.g., ±5mm, ±0.2 inches"
                      helperText="Acceptable placement variation"
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <Input
                      label="Color Count"
                      name={`artworks.${index}.colorCount`}
                      register={register}
                      errors={errors.artworks?.[index] || {}}
                      required={true}
                      placeholder="e.g., 3, 1 color"
                      helperText="Number of colors in artwork"
                    />

                    <Input
                      label="Color Separation"
                      name={`artworks.${index}.colorSeparation`}
                      register={register}
                      errors={errors.artworks?.[index] || {}}
                      placeholder="e.g., C1: Black, C2: Red, C3: White"
                      helperText="Color breakdown for production"
                    />

                    <Select
                      label="Pantone / CMYK"
                      name={`artworks.${index}.pantoneOrCMYK`}
                      control={control}
                      errors={errors.artworks?.[index] || {}}
                      options={pantoneOptions}
                      required={true}
                      placeholder="Select color system"
                      helperText="Color matching system"
                    />

                    <Select
                      label="Underbase Required"
                      name={`artworks.${index}.underbaseRequired`}
                      control={control}
                      errors={errors.artworks?.[index] || {}}
                      options={underbaseOptions}
                      placeholder="Select option"
                      helperText="For printing on dark fabrics"
                    />

                    <Select
                      label="Artwork Scaling"
                      name={`artworks.${index}.perSizeOrGlobal`}
                      control={control}
                      errors={errors.artworks?.[index] || {}}
                      options={scalingOptions}
                      required={true}
                      placeholder="Select scaling"
                      helperText="How artwork adapts to size range"
                    />

                    <Select
                      label="Application Method"
                      name={`artworks.${index}.method`}
                      control={control}
                      errors={errors.artworks?.[index] || {}}
                      options={methodOptions}
                      placeholder="Select method"
                      helperText="Production technique"
                    />

                    {/* Artwork Preview with Upload */}
                    <ImageUpload
                      index={index}
                      preview={artworkPreviews[index]}
                      onImageChange={handleImageChange}
                      onImageRemove={handleImageRemove}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Artwork Button */}
        <button
          type="button"
          onClick={handleAddArtwork}
          className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Artwork
        </button>

        {/* Navigation Buttons */}
           {/* Navigation */}
        <div className="flex justify-between items-center my-6">
          <Link
            href="/dashboard/construction"
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Construction Details
          </Link>
          <div className="flex flex-col items-end gap-2">
            <button
              type="submit"
              disabled={!isValid}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                !isValid
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Next: Bill of Materials
              <ArrowRight className="w-4 h-4" />
            </button>
            {!isValid && (
              <p className="text-sm text-red-600">
                Please fill all required fields (*) to continue
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}