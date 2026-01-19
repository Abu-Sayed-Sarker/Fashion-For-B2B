"use client";
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, X, Tag, Zap, Scissors, Package } from 'lucide-react';
import { Input, Select } from '@/Libs/Form-components/FormComponent';

const trimIcons = {
  button: Tag,
  zipper: Zap,
  label: Tag,
  thread: Scissors,
  elastic: Scissors,
  drawcord: Package,
  snap: Tag,
  hook: Tag,
  velcro: Tag,
  rivet: Tag,
};

export default function TrimsAccessories() {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      trims: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'trims',
  });

  const handleAddTrim = () => {
    append({
      trimType: '',
      material: '',
      size: '',
      color: '',
      finish: '',
      placement: '',
      consumption: '',
      brandOrGeneric: 'generic',
      supplier: '',
      colorLogic: 'match',
    });
  };

  const onSubmit = (data) => {
    console.log('Trims Data:', data);
    console.log('Total Trims:', data.trims.length);
  };

  const trimTypeOptions = [
    { value: 'button', label: 'Button' },
    { value: 'zipper', label: 'Zipper' },
    { value: 'label', label: 'Label' },
    { value: 'thread', label: 'Thread' },
    { value: 'elastic', label: 'Elastic' },
    { value: 'drawcord', label: 'Drawcord' },
    { value: 'snap', label: 'Snap' },
    { value: 'hook', label: 'Hook & Eye' },
    { value: 'velcro', label: 'Velcro' },
    { value: 'rivet', label: 'Rivet' },
  ];

  const brandOptions = [
    { value: 'generic', label: 'Generic' },
    { value: 'branded', label: 'Branded' },
  ];

  const colorLogicOptions = [
    { value: 'match', label: 'Match Garment' },
    { value: 'contrast', label: 'Contrast' },
    { value: 'pantone', label: 'Pantone (Specify)' },
    { value: 'custom', label: 'Custom Color' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Trims & Accessories
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Define all trims, closures, and accessories for your garment
          </p>
        </div>

        {/* Trims List */}
        <div className="space-y-6">
          {fields.map((field, index) => {
            const trimType = watch(`trims.${index}.trimType`);
            const Icon = trimIcons[trimType] || Tag;

            return (
              <div key={field.id} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                {/* Card Header */}
                <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {trimType && <Icon className="w-4 h-4 text-gray-600" />}
                    <h3 className="text-base font-semibold text-gray-900">
                      Trim {index + 1}
                    </h3>
                    {trimType && (
                      <span className="text-sm text-gray-600 font-normal">
                        ({trimType.charAt(0).toUpperCase() + trimType.slice(1)})
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Row 1: Trim Type, Material, Size */}
                    <Select
                      label="Trim Type"
                      name={`trims.${index}.trimType`}
                      control={control}
                      errors={errors.trims?.[index] || {}}
                      options={trimTypeOptions}
                      required={true}
                      placeholder="Select type"
                      helperText="Type of trim or accessory"
                    />

                    <Input
                      label="Material"
                      name={`trims.${index}.material`}
                      register={register}
                      errors={errors.trims?.[index] || {}}
                      required={true}
                      placeholder="e.g., Metal, Plastic, Polyester"
                      helperText="Material composition"
                    />

                    <Input
                      label="Size"
                      name={`trims.${index}.size`}
                      register={register}
                      errors={errors.trims?.[index] || {}}
                      placeholder="e.g., 15mm, 5 inches"
                      helperText="Dimensions or size specification"
                    />

                    {/* Row 2: Color, Finish, Placement */}
                    <Input
                      label="Color"
                      name={`trims.${index}.color`}
                      register={register}
                      errors={errors.trims?.[index] || {}}
                      placeholder="e.g., Black, Silver, #33445F"
                      helperText="Color name or code"
                    />

                    <Input
                      label="Finish"
                      name={`trims.${index}.finish`}
                      register={register}
                      errors={errors.trims?.[index] || {}}
                      placeholder="e.g., Matt, Glossy, Brushed"
                      helperText="Surface finish or treatment"
                    />

                    <Input
                      label="Placement"
                      name={`trims.${index}.placement`}
                      register={register}
                      errors={errors.trims?.[index] || {}}
                      required={true}
                      placeholder="e.g., Center Front, Pocket, Waistband"
                      helperText="Location on garment"
                    />

                    {/* Row 3: Consumption, Brand/Generic, Color Logic */}
                    <Input
                      label="Consumption"
                      name={`trims.${index}.consumption`}
                      register={register}
                      errors={errors.trims?.[index] || {}}
                      required={true}
                      placeholder="e.g., 6 pcs, 1.5 meters"
                      helperText="Quantity required per garment"
                    />

                    <Select
                      label="Brand / Generic"
                      name={`trims.${index}.brandOrGeneric`}
                      control={control}
                      errors={errors.trims?.[index] || {}}
                      options={brandOptions}
                      placeholder="Select option"
                      helperText="Specific brand or generic alternative"
                    />

                    <Select
                      label="Color Logic"
                      name={`trims.${index}.colorLogic`}
                      control={control}
                      errors={errors.trims?.[index] || {}}
                      options={colorLogicOptions}
                      placeholder="Select logic"
                      helperText="How trim color relates to garment"
                    />

                    {/* Row 4: Supplier (full width) */}
                    <div className="md:col-span-3">
                      <Input
                        label="Supplier"
                        name={`trims.${index}.supplier`}
                        register={register}
                        errors={errors.trims?.[index] || {}}
                        placeholder="e.g., YKK, Coats, XYZ Trims Co."
                        helperText="Supplier name or code (locked for factory use)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Trim Button */}
        <button
          type="button"
          onClick={handleAddTrim}
          className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Trim / Accessory
        </button>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Fabrics
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Next: Construction Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}