'use client';
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, X, Package, ArrowLeft, ArrowRight } from 'lucide-react';
import { Select, Input } from '@/Libs/Form-components/FormComponent';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Textarea Component
const Textarea = ({ label, name, register, errors, placeholder = '', helperText = '' }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        {...register(name)}
        rows={2}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {errors[name] && <p className="text-xs text-red-600 mt-1">{errors[name].message}</p>}
    </div>
  );
};

export default function BOMGenerator() {
  const router = useRouter();
  const { register, control, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    defaultValues: {
      bomItems: [
        {
          category: 'Fabric',
          componentName: 'Primary Fabric 1',
          material: 'Dolore a voluptate a -',
          unit: 'Meter',
          consumption: '1.50',
          wastage: '10',
          supplier: 'In dolore magni nisi',
          moq: '335',
          leadTime: 'e.g., 30 days, 2 weeks',
          costPerUnit: 'e.g., 10.00, 5.50',
          currency: 'USD',
          notes: 'GSM: Aut eiusmod at quaer, Color: Ut esse omnis qui q, Finish:'
        },
        {
          category: 'Thread',
          componentName: 'Sewing Thread',
          material: 'Polyester',
          unit: '',
          consumption: '0.1',
          wastage: '5',
          supplier: 'e.g., ABC Textiles Ltd.',
          moq: 'e.g., 500 meters, 100 pieces',
          leadTime: 'e.g., 30 days, 2 weeks',
          costPerUnit: 'e.g., 10.00, 5.50',
          currency: 'USD',
          notes: 'Standard sewing thread'
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bomItems',
  });

  const handleAddBOM = () => {
    append({
      category: '',
      componentName: '',
      material: '',
      unit: '',
      consumption: '',
      wastage: '',
      supplier: '',
      moq: '',
      leadTime: '',
      costPerUnit: '',
      currency: 'USD',
      notes: ''
    });
  };

  const onSubmit = (data) => {
    console.log('BOM Data:', data);
    router.push('/dashboard/review');
  };

  const categoryOptions = [
    { value: 'Fabric', label: 'Fabric' },
    { value: 'Thread', label: 'Thread' },
    { value: 'Trim', label: 'Trim' },
    { value: 'Accessory', label: 'Accessory' },
    { value: 'Packaging', label: 'Packaging' },
  ];

  const unitOptions = [
    { value: 'Meter', label: 'Meter' },
    { value: 'Piece', label: 'Piece' },
    { value: 'Yard', label: 'Yard' },
    { value: 'Kilogram', label: 'Kilogram' },
    { value: 'Set', label: 'Set' },
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'INR', label: 'INR' },
    { value: 'CNY', label: 'CNY' },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Bill of Materials (BOM)
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Comprehensive material breakdown with supplier and costing information
          </p>
        </div>

        {/* BOM Items */}
        <div className="space-y-6">
          {fields.map((field, index) => {
            const category = watch(`bomItems.${index}.category`);
            const itemErrors = errors.bomItems?.[index] || {};
            
            return (
              <div key={field.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                {/* Card Header */}
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-gray-600" />
                      <h3 className="font-medium text-gray-900">
                        BOM Item {index + 1}
                        {category && <span className="text-gray-600 font-normal ml-2">({category})</span>}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Select
                        label="Category"
                        name={`bomItems.${index}.category`}
                        control={control}
                        errors={itemErrors}
                        options={categoryOptions}
                        required={true}
                        placeholder="Select category"
                        helperText="Item classification"
                      />

                      <Input
                        label="Component Name"
                        name={`bomItems.${index}.componentName`}
                        register={register}
                        errors={itemErrors}
                        required={true}
                        placeholder="e.g., Main Body Fabric, Care Label"
                        helperText="Specific component identifier"
                      />

                      <Input
                        label="Material / Composition"
                        name={`bomItems.${index}.material`}
                        register={register}
                        errors={itemErrors}
                        required={true}
                        placeholder="e.g., 100% Cotton, Metal Button"
                        helperText="Material description"
                      />
                    </div>
                  </div>

                  {/* Quantities & Consumption */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Quantities & Consumption</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Select
                        label="Unit"
                        name={`bomItems.${index}.unit`}
                        control={control}
                        errors={itemErrors}
                        options={unitOptions}
                        required={true}
                        placeholder="Select unit"
                        helperText="Unit of measurement"
                      />

                      <Input
                        label="Consumption"
                        name={`bomItems.${index}.consumption`}
                        register={register}
                        errors={itemErrors}
                        required={true}
                        placeholder="e.g., 1.5, 6"
                        helperText="Required quantity per garment"
                      />

                      <Input
                        label="Wastage %"
                        name={`bomItems.${index}.wastage`}
                        register={register}
                        errors={itemErrors}
                        placeholder="e.g., 5, 10"
                        helperText="Expected wastage percentage"
                      />
                    </div>
                  </div>

                  {/* Supplier Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Supplier Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="Supplier"
                        name={`bomItems.${index}.supplier`}
                        register={register}
                        errors={itemErrors}
                        placeholder="e.g., ABC Textiles Ltd."
                        helperText="Supplier name or code"
                      />

                      <Input
                        label="MOQ (Minimum Order Quantity)"
                        name={`bomItems.${index}.moq`}
                        register={register}
                        errors={itemErrors}
                        placeholder="e.g., 500 meters, 100 pieces"
                        helperText="Supplier minimum order"
                      />

                      <Input
                        label="Lead Time"
                        name={`bomItems.${index}.leadTime`}
                        register={register}
                        errors={itemErrors}
                        placeholder="e.g., 30 days, 2 weeks"
                        helperText="Production/delivery time"
                      />
                    </div>
                  </div>

                  {/* Costing Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Costing Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Cost per Unit"
                        name={`bomItems.${index}.costPerUnit`}
                        register={register}
                        errors={itemErrors}
                        required={true}
                        placeholder="e.g., 10.00, 5.50"
                        helperText="Cost per unit of measurement"
                      />

                      <Select
                        label="Currency"
                        name={`bomItems.${index}.currency`}
                        control={control}
                        errors={itemErrors}
                        options={currencyOptions}
                        required={true}
                        helperText="Currency for cost"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <Textarea
                      label="Notes"
                      name={`bomItems.${index}.notes`}
                      register={register}
                      errors={itemErrors}
                      placeholder="GSM: Aut eiusmod at quaer, Color: Ut esse omnis qui q, Finish:"
                      helperText="Additional specifications or requirements"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add BOM Item Button */}
        <button
          type="button"
          onClick={handleAddBOM}
          className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add BOM Item
        </button>

        {/* Navigation */}
        <div className="flex justify-between items-center my-6">
          <Link
            href="/dashboard/artwork"
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Artwork
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
              Next: Review & Submit
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