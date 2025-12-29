import { useEffect, useState } from "react";

import {
  FormContainer,
  SelectField,
  InputField,
} from "../../Libs/FromComponents.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setGarmentSetup } from "../../Features/addFashionSlice.js";

export default function StapesOne({ goToNextStep }) {
  const garmentInfo = useSelector((state) => state.addFashion.garment_setup);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    garment_type: "",
    garment_category: "",
    fit: "",
    target_gender: "",
    season: "",
    size: "",
    style_code: "",
    date: "",
    version: "1.0",
    base_size: "",
    measurement_unit: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const garmentTypes = [
    { value: "Dabid Woven Shirt", label: "Dabid Woven Shirt" },
    { value: "T-Shirt", label: "T-Shirt" },
    { value: "Hoodie", label: "Hoodie" },
    { value: "Jeans", label: "Jeans" },
  ];

  const seasons = [
    { value: "Summer", label: "Summer" },
    { value: "Fall", label: "Fall" },
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
  ];

  const categories = [
    { value: "Top", label: "Top" },
    { value: "Tops", label: "Tops" },
    { value: "Bottoms", label: "Bottoms" },
    { value: "Outerwear", label: "Outerwear" },
  ];

  const sizes = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
  ];

  const fits = [
    { value: "Regular", label: "Regular" },
    { value: "Slim", label: "Slim" },
    { value: "Relaxed", label: "Relaxed" },
    { value: "Oversized", label: "Oversized" },
  ];

  const genders = [
    { value: "Male", label: "Male" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const measurementUnits = [
    { value: "CM", label: "CM" },
    { value: "INCH", label: "INCH" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.garment_type ||
      !formData.garment_category ||
      !formData.date ||
      !formData.fit ||
      !formData.target_gender ||
      !formData.season ||
      !formData.size ||
      !formData.style_code ||
      !formData.base_size ||
      !formData.measurement_unit
    ) {
      return alert("Please fill in all required fields.");
    }

    console.log("Garment Setup Data:", formData);
    dispatch(setGarmentSetup(formData));
    goToNextStep();
  };

  useEffect(() => {
    if (garmentInfo) {
      setFormData(garmentInfo);
    }
  }, [garmentInfo]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <form onSubmit={handleSubmit}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Garment Setup
            </h1>
            <p className="text-gray-600">
              Define the basic specifications for your garment
            </p>
          </div>

          <FormContainer>
            <SelectField
              label="Garment Type"
              required
              value={formData.garment_type}
              onChange={(value) => updateField("garment_type", value)}
              options={garmentTypes}
              placeholder="Select garment type"
            />

            <SelectField
              label="Season"
              value={formData.season} // Changed to match new field names
              onChange={(value) => updateField("season", value)}
              options={seasons}
              placeholder="Select season"
            />

            <SelectField
              label="Garment Category"
              value={formData.garment_category}
              onChange={(value) => updateField("garment_category", value)}
              options={categories}
              placeholder="Select category"
            />

            <SelectField
              label="Size"
              value={formData.size} // Changed to match new field names
              onChange={(value) => updateField("size", value)}
              options={sizes}
              placeholder="Select size"
              helperText="Base size for measurement reference"
            />

            <SelectField
              label="Fit / Silhouette"
              value={formData.fit}
              onChange={(value) => updateField("fit", value)}
              options={fits}
              placeholder="Select fit"
            />

            <InputField
              label="Style Code"
              required
              value={formData.style_code}
              onChange={(value) => updateField("style_code", value)}
              placeholder="Enter style code"
            />

            <SelectField
              label="Target Gender"
              value={formData.target_gender}
              onChange={(value) => updateField("target_gender", value)}
              options={genders}
              placeholder="Select target gender"
            />

            <InputField
              label="Date"
              value={formData.date} // Changed to match new field names
              onChange={(value) => updateField("date", value)}
              type="date"
            />

            <SelectField
              label="Base Size"
              value={formData.base_size}
              onChange={(value) => updateField("base_size", value)}
              options={sizes}
              placeholder="Select base size"
            />

            <SelectField
              label="Measurement Unit"
              value={formData.measurement_unit}
              onChange={(value) => updateField("measurement_unit", value)}
              options={measurementUnits}
              placeholder="Select unit"
            />

            <InputField
              label="Version"
              value={formData.version} // Changed to match new field names
              onChange={(value) => updateField("version", value)}
              type="text"
            />
          </FormContainer>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              Next: Measurements
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
