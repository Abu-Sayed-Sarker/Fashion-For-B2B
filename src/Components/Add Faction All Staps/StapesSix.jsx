import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateFashionByIdAndStepMutation,
  useGetFashionByIdQuery,
} from "../../Api/allApi";
import { useSelector } from "react-redux";

export default function StapesSix({ goToPreviousStep, goToNextStep }) {
  const parentId = useSelector((state) => state.addFashion.id);

  const [createFashionByIdAndStep] = useCreateFashionByIdAndStepMutation();
  const { data: fashionInfo } = useGetFashionByIdQuery(parentId, {
    skip: !parentId,
  });

  const [artworks, setArtworks] = useState([
    {
      id: 1,
      artwork_name: "",
      artwork_size: "",
      artwork_type: "",
      color_count: "",
      placement_location: "",
      application_method: "",
      coordinates: "",
      front_logo: null,
    },
  ]);

  const artworkTypes = [
    { value: "", label: "Select type" },
    { value: "Embroidery", label: "Embroidery" },
    { value: "Screen Print", label: "Screen Print" },
    { value: "Heat Transfer", label: "Heat Transfer" },
    { value: "Digital Print", label: "Digital Print" },
    { value: "Patch", label: "Patch" },
    { value: "Applique", label: "Applique" },
    { value: "Sublimation", label: "Sublimation" },
  ];

  const updateArtwork = (id, field, value) => {
    const updatedArtworks = artworks.map((a) =>
      a.id === id ? { ...a, [field]: value } : a
    );
    setArtworks(updatedArtworks);
  };

  const addArtwork = () => {
    const newArtwork = {
      id: Date.now(),
      artwork_name: "",
      artwork_size: "",
      artwork_type: "",
      color_count: "",
      placement_location: "",
      application_method: "",
      coordinates: "",
      front_logo: null,
    };
    const updatedArtworks = [...artworks, newArtwork];
    setArtworks(updatedArtworks);
  };

  const removeArtwork = (id) => {
    if (artworks.length > 1) {
      const updatedArtworks = artworks.filter((a) => a.id !== id);
      setArtworks(updatedArtworks);
    }
  };

  const handleFileUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      updateArtwork(id, "front_logo", file);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    // const hasEmptyRequired = artworks.some(
    //   (artwork) => !artwork.artwork_name || !artwork.artwork_type || !artwork.placement_location
    // );

    // if (hasEmptyRequired) {
    //   return toast.error("Please fill in all required fields for each artwork.");
    // }

    const formattedData = artworks.map(({ id, front_logo, ...rest }) => ({
      ...rest,
    }));

    const data = {
      data: formattedData,
      is_complete: true,
    };
    try {
      await createFashionByIdAndStep({
        id: parentId,
        step: 6,
        data: data,
      });
      toast.success("Trims data saved successfully!");
      goToNextStep();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save trims data.");
    }
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  useEffect(() => {
    if (fashionInfo && fashionInfo?.steps?.artwork?.length > 0) {
      const loadedArtworks = fashionInfo.steps.artwork.map((a, index) => ({
        ...a,
        id: index + 1,
        front_logo: null,
      }));
      setArtworks(loadedArtworks);
    }
  }, [fashionInfo]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Artwork & Placement
          </h1>
          <p className="text-gray-600">
            Define artwork specifications and placement locations
          </p>
        </div>

        {/* Artwork Cards */}
        {artworks.map((artwork, index) => (
          <div
            key={artwork.id}
            className="bg-white rounded-lg border border-gray-300 overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-gray-900">
                  Artwork {index + 1}
                </h2>
              </div>
              {artworks.length > 1 && (
                <button
                  onClick={() => removeArtwork(artwork.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove artwork"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Form Fields */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Row 1 */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Artwork Name
                  </label>
                  <input
                    type="text"
                    value={artwork.artwork_name}
                    onChange={(e) =>
                      updateArtwork(artwork.id, "artwork_name", e.target.value)
                    }
                    placeholder="e.g., Brand Logo, Graphic Print"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Artwork Size (W × H)
                  </label>
                  <input
                    type="text"
                    value={artwork.artwork_size}
                    onChange={(e) =>
                      updateArtwork(artwork.id, "artwork_size", e.target.value)
                    }
                    placeholder="e.g., 15cm × 10cm"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Row 2 */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Artwork Type
                  </label>
                  <select
                    value={artwork.artwork_type}
                    onChange={(e) =>
                      updateArtwork(artwork.id, "artwork_type", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {artworkTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Color Count
                  </label>
                  <input
                    type="text"
                    value={artwork.color_count}
                    onChange={(e) =>
                      updateArtwork(artwork.id, "color_count", e.target.value)
                    }
                    placeholder="e.g., 3 colors"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Row 3 */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Placement Location
                  </label>
                  <input
                    type="text"
                    value={artwork.placement_location}
                    onChange={(e) =>
                      updateArtwork(
                        artwork.id,
                        "placement_location",
                        e.target.value
                      )
                    }
                    placeholder="e.g., Center chest, Left sleeve"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Application Method
                  </label>
                  <input
                    type="text"
                    value={artwork.application_method}
                    onChange={(e) =>
                      updateArtwork(
                        artwork.id,
                        "application_method",
                        e.target.value
                      )
                    }
                    placeholder="e.g., Screen print, Heat transfer"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Row 4 */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Coordinates (X, Y)
                  </label>
                  <input
                    type="text"
                    value={artwork.coordinates}
                    onChange={(e) =>
                      updateArtwork(artwork.id, "coordinates", e.target.value)
                    }
                    placeholder="e.g., 10cm from left, 5cm from top"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Artwork Preview
                  </label>
                  <label className="w-full h-[120px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50">
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(artwork.id, e)}
                      accept="image/*"
                      className="hidden"
                    />
                    <svg
                      className="w-10 h-10 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-gray-500">
                      {artwork.front_logo
                        ? artwork.front_logo.name
                        : "Upload artwork file"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Artwork Button */}
        <button
          onClick={addArtwork}
          className="w-full py-4 mb-6 bg-white border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
        >
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Artwork
        </button>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Next: Bill of Materials
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
