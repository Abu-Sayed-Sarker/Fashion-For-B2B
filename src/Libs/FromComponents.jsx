import React, { useState } from "react";

// Reusable Form Field Components
export const FormField = ({ label, required, children, helperText }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {helperText && (
        <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export const SelectField = ({
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
  helperText,
}) => {
  return (
    <FormField label={label} required={required} helperText={helperText}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
};

export const InputField = ({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = "text",
  helperText,
}) => {
  return (
    <FormField label={label} required={required} helperText={helperText}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </FormField>
  );
};

// Reusable Form Container
export const FormContainer = ({ children }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="grid grid-cols-2 gap-8">{children}</div>
    </div>
  );
};
