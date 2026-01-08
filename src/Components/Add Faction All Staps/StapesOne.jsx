import { useEffect, useState } from "react";

import {
  FormContainer,
  SelectField,
  InputField,
} from "../../Libs/FromComponents.jsx";
import { toast } from "react-toastify";
import {
  useCreateFashionByIdAndStepMutation,
  useGetFashionByIdQuery,
} from "../../Api/allApi.js";
import { useSelector } from "react-redux";

export default function StapesOne({ goToNextStep }) {
  const parentId = useSelector((state) => state.addFashion.id);

  const [createFashionByIdAndStep] = useCreateFashionByIdAndStepMutation();
  const { data: fashionInfo } = useGetFashionByIdQuery(parentId, {
    skip: !parentId,
  });

  const [formData, setFormData] = useState({
    garment_type: "",
    garment_category: "",
    fit: "",
    target_gender: "",
    season: "",
    style_code: "",
    date: new Date().toISOString().split("T")[0],
    version: "1.0",
    base_size: "M",
    measurement_unit: "",
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user changes the value
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const garmentTypes = [
    { value: "Shirt", label: "Shirt" },
    { value: "T-Shirt", label: "T-Shirt" },
    { value: "Polo Shirt", label: "Polo Shirt" },
    { value: "Blouse", label: "Blouse" },
    { value: "Tank Top", label: "Tank Top" },
    { value: "Jacket", label: "Jacket" },
    { value: "Coat", label: "Coat" },
    { value: "Blazer", label: "Blazer" },
    { value: "Vest", label: "Vest" },
    { value: "Parka", label: "Parka" },
    { value: "Pants", label: "Pants" },
    { value: "Jeans", label: "Jeans" },
    { value: "Shorts", label: "Shorts" },
    { value: "Skirt", label: "Skirt" },
    { value: "Dress", label: "Dress" },
    { value: "Jumpsuit", label: "Jumpsuit" },
    { value: "Sweater", label: "Sweater" },
    { value: "Cardigan", label: "Cardigan" },
    { value: "Hoodie", label: "Hoodie" },
    { value: "Sweatshirt", label: "Sweatshirt" },
    { value: "Joggers", label: "Joggers" },
    { value: "Leggings", label: "Leggings" },
  ];

  const seasons = [
    { value: "Spring", label: "Spring (SS)" },
    { value: "Summer", label: "Summer (SU)" },
    { value: "Fall", label: "Fall (FA)" },
    { value: "Winter", label: "Winter (WI)" },
    { value: "All Seasons", label: "All Seasons" },
  ];

  const categories = [
    { value: "Tops", label: "Tops" },
    { value: "Bottoms", label: "Bottoms" },
    { value: "Outerwear", label: "Outerwear" },
    { value: "Dresses", label: "Dresses" },
    { value: "Activewear", label: "Activewear" },
    { value: "Knitwear", label: "Knitwear" },
  ];

  const sizes = [
    { value: "XXS", label: "XXS" },
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "XXXL", label: "XXXL" },
  ];

  const fits = [
    { value: "Regular", label: "Regular Fit" },
    { value: "Slim", label: "Slim Fit" },
    { value: "Relaxed", label: "Relaxed Fit" },
    { value: "Oversized", label: "Oversized Fit" },
    { value: "Tailored", label: "Tailored" },
    { value: "Loose", label: "Loose" },
  ];

  const genders = [
    { value: "Man", label: "Man" },
    { value: "Woman", label: "Woman" },
    { value: "Unisex", label: "Unisex" },
    { value: "Child", label: "Child" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.garment_type)
      newErrors.garment_type = "Garment Type is required";
    if (!formData.garment_category)
      newErrors.garment_category = "Garment Category is required";
    if (!formData.style_code) newErrors.style_code = "Style Code is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return toast.error("Please fill in all required fields.");
    }

    const data = {
      data: [formData],
      is_completed: true,
    };

    try {
      await createFashionByIdAndStep({
        id: parentId,
        step: 1,
        data: data,
      });
      toast.success("Garment data saved successfully!");
      goToNextStep();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save garment data.");
    }
  };

  useEffect(() => {
    const garmentTypeToCategory = {
      Shirt: "Tops",
      "T-Shirt": "Tops",
      "Polo Shirt": "Tops",
      Blouse: "Tops",
      "Tank Top": "Tops",
      Jacket: "Outerwear",
      Coat: "Outerwear",
      Blazer: "Outerwear",
      Vest: "Outerwear",
      Parka: "Outerwear",
      Pants: "Bottoms",
      Jeans: "Bottoms",
      Shorts: "Bottoms",
      Skirt: "Bottoms",
      Dress: "Dresses",
      Jumpsuit: "Dresses",
      Sweater: "Knitwear",
      Cardigan: "Knitwear",
      Hoodie: "Activewear",
      Sweatshirt: "Activewear",
      Joggers: "Activewear",
      Leggings: "Activewear",
    };

    const category = garmentTypeToCategory[formData.garment_type];
    if (category) {
      updateField("garment_category", category);
    }
  }, [formData.garment_type]);

  useEffect(() => {
    if (fashionInfo?.steps) {
      setFormData(fashionInfo.steps[0]?.data[0]);
    }
  }, [fashionInfo]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
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
            error={errors.garment_type}
            helperText="Category will be auto-filled based on garment type"
          />

          <SelectField
            label="Season"
            value={formData.season}
            onChange={(value) => updateField("season", value)}
            options={seasons}
            placeholder="Select season"
          />

          <div>
            <SelectField
              label="Garment Category"
              required
              value={formData.garment_category}
              onChange={(value) => updateField("garment_category", value)}
              options={categories}
              placeholder="Select category"
              error={errors.garment_category}
            />
            <p className="mt-1 text-xs text-orange-600 font-medium">
              (Auto-mapped, editable)
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-gray-900">
                Base Size (Reference)
              </label>
              <div
                className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center cursor-help"
                title="All measurements will reference this size"
              >
                <span className="text-xs text-gray-600">i</span>
              </div>
            </div>
            <SelectField
              value={formData.base_size}
              onChange={(value) => updateField("base_size", value)}
              options={sizes}
              placeholder="Select base size"
              helperText="All measurements will reference this size"
            />
          </div>

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
            placeholder="e.g., TP-2026-001"
            error={errors.style_code}
            helperText="Unique identifier for this tech pack"
          />

          <SelectField
            label="Target Gender"
            value={formData.target_gender}
            onChange={(value) => updateField("target_gender", value)}
            options={genders}
            placeholder="Select gender"
          />

          {/* Read-only Date Created */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Date Created
            </label>
            <input
              type="text"
              value={formData.date}
              readOnly
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          <div></div>

          {/* Read-only Version */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Version
            </label>
            <input
              type="text"
              value={formData.version}
              readOnly
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>
        </FormContainer>

        {/* Auto-Mapping Logic Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Auto-Mapping Logic
              </h3>
              <p className="text-sm text-blue-800">
                When you select a Garment Type, the system automatically
                suggests the appropriate Category (e.g., Jacket → Outerwear,
                Shirt → Tops). You can override this if needed.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            type="button"
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
    </div>
  );
}
