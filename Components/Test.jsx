import React from 'react'

const Test = () => {
  return (
    <div>
      {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex gap-2 md:gap-3">
            <Info className="w-4 h-4 md:w-5 md:h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm">
              <p className="font-medium text-blue-900 mb-1">
                {mandatoryMeasurements.length} Mandatory Measurements for{" "}
                {garmentType}
              </p>
              <p className="text-blue-800">
                Required measurements are automatically loaded based on garment
                type. You can add additional custom measurements using the
                button below.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: Card View */}
        <div className="block md:hidden space-y-4 mb-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-white rounded-lg border border-gray-200 p-4 relative"
            >
              {/* Required Badge */}
              {field.required && (
                <span className="absolute top-2 right-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                  Required
                </span>
              )}

              {/* POM ID */}
              <div className="text-xs text-gray-500 mb-3">POM #{index + 1}</div>

              {/* POM Name */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  POM Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`measurements.${index}.pom`, {
                    required: true,
                    onChange: (e) => handlePomChange(e, index),
                  })}
                  placeholder="e.g., Waist Width"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                {/* Value */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register(`measurements.${index}.value`, {
                      required: "Value is required",
                      min: { value: 0.1, message: "Value must be greater than 0" },
                      validate: (val) => (val !== "" && val !== null && val !== undefined && !isNaN(val)) || "Value cannot be empty",
                      valueAsNumber: true,
                      onChange: (e) => {
                        const val = e.target.value;
                        if (val === "" || val === null) {
                          e.target.value = "0.2";
                        }
                      },
                    })}
                    type="number"
                    step="0.1"
                    min="0.1"
                    placeholder="0.2"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Tolerance */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tolerance <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register(`measurements.${index}.tolerance`, {
                      required: "Tolerance is required",
                      min: { value: 0.1, message: "Tolerance must be greater than 0" },
                      validate: (val) => (val !== "" && val !== null && val !== undefined && !isNaN(val)) || "Tolerance cannot be empty",
                      valueAsNumber: true,
                      onChange: (e) => {
                        const val = e.target.value;
                        if (val === "" || val === null) {
                          e.target.value = "0.5";
                        }
                      },
                    })}
                    type="number"
                    step="0.1"
                    min="0.1"
                    placeholder="0.5"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Unit */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <div className="text-sm text-gray-600 font-medium px-3 py-2 bg-gray-50 rounded-md">
                  {watch(`measurements.${index}.unit`)}
                </div>
              </div>

              {/* Instruction */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Measurement Instruction
                </label>
                {field.required ? (
                  <p className="text-xs text-gray-600 italic px-3 py-2 bg-gray-50 rounded-md">
                    {watch(`measurements.${index}.instruction`)}
                  </p>
                ) : (
                  <input
                    {...register(`measurements.${index}.instruction`)}
                    placeholder="How to measure (optional)"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => remove(index)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50"
              >
                <X className="w-4 h-4" />
                Remove Measurement
              </button>
            </div>
          ))}
        </div>

        {/* Desktop: Table View */}
        <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          {/* Error Summary at Top */}
          {errors.measurements && Object.keys(errors.measurements).length > 0 && (
            <div className="bg-red-50 border-b border-red-200 p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Validation Errors</h3>
                  <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                    {fields.map((field, index) => {
                      const fieldErrors = errors.measurements?.[index];
                      if (!fieldErrors) return null;
                      return (
                        <li key={`error-${index}`}>
                          <strong>{field.pom || `Row ${index + 1}`}:</strong>
                          {fieldErrors.pom && ` ${fieldErrors.pom.message}`}
                          {fieldErrors.value && ` ${fieldErrors.value.message}`}
                          {fieldErrors.tolerance && ` ${fieldErrors.tolerance.message}`}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-20">
                    POM ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    POM Name <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-32">
                    Value <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-32">
                    Tolerance <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">
                    Unit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Measurement Instruction
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fields.map((field, index) => {
                  return (
                    <tr key={field.id} className="hover:bg-gray-50">
                      {/* POM ID */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {index + 1}
                          </span>
                        </div>
                      </td>

                      {/* POM Name */}
                      <td className="px-4 py-3">
                        <input
                          {...register(`measurements.${index}.pom`, {
                            required: true,
                            onChange: (e) => handlePomChange(e, index),
                          })}
                          placeholder="e.g., Waist Width"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>

                      {/* Value */}
                      <td className="px-4 py-3">
                        <input
                          {...register(`measurements.${index}.value`, {
                            required: "Value is required",
                            min: { value: 0.1, message: "Value must be greater than 0" },
                            validate: (val) => (val !== "" && val !== null && val !== undefined && !isNaN(val)) || "Value cannot be empty",
                            valueAsNumber: true,
                            onChange: (e) => {
                              const val = e.target.value;
                              if (val === "" || val === null) {
                                e.target.value = "0.2";
                              }
                            },
                          })}
                          type="number"
                          step="0.1"
                          min="0.1"
                          placeholder="0.2"
                          className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.measurements?.[index]?.value
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                          }`}
                        />
                      </td>

                      {/* Tolerance */}
                      <td className="px-4 py-3">
                        <input
                          {...register(`measurements.${index}.tolerance`, {
                            required: "Tolerance is required",
                            min: { value: 0.1, message: "Tolerance must be greater than 0" },
                            validate: (val) => (val !== "" && val !== null && val !== undefined && !isNaN(val)) || "Tolerance cannot be empty",
                            valueAsNumber: true,
                            onChange: (e) => {
                              const val = e.target.value;
                              if (val === "" || val === null) {
                                e.target.value = "0.5";
                              }
                            },
                          })}
                          type="number"
                          step="0.1"
                          min="0.1"
                          placeholder="0.5"
                          className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.measurements?.[index]?.tolerance
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                          }`}
                        />
                      </td>

                      {/* Unit */}
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 font-medium">
                          {watch(`measurements.${index}.unit`)}
                        </span>
                      </td>

                      {/* Measurement Instruction */}
                      <td className="px-4 py-3">
                        {field.required ? (
                          <p className="text-xs text-gray-600 italic">
                            {watch(`measurements.${index}.instruction`)}
                          </p>
                        ) : (
                          <input
                            {...register(`measurements.${index}.instruction`)}
                            placeholder="How to measure (optional)"
                            className="w-full px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3 text-center">
                        <div className="relative inline-block">
                          {field.required && (
                            <span className="absolute -top-7 -right-4 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200 whitespace-nowrap">
                              Required
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
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
          <button
            type="button"
            onClick={handleAddRow}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
            Add Custom Measurement Row
          </button>

          <div className="text-xs md:text-sm text-gray-600 text-center md:text-right">
            <span className="font-medium">{fields.length}</span> measurements
            total
            <span className="mx-2">•</span>
            <span className="font-medium text-orange-600">
              {requiredCount}
            </span>{" "}
            required
          </div>
        </div>
    </div>
  )
}

export default Test
