import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArtworksData } from "../../Features/addFashionSlice";

export default function StapesSix({
  goToPreviousStep,
  goToNextStep,
  artworks,
  setArtworks,
}) {
  const artworkInfo = useSelector((state) => state.addFashion.artworks);
  const dispatch = useDispatch();

  // Update artwork in the state
  const updateArtwork = (id, field, value) => {
    setArtworks((prevArtworks) =>
      prevArtworks.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  // Add a new artwork
  const addArtwork = () => {
    const newId = Date.now();
    const newArtwork = {
      id: newId,
      artwork_name: "",
      artwork_size: "",
      artwork_type: "",
      color_count: "",
      placement_location: "",
      application_method: "",
      coordinates: "",
      front_logo: null,
    };
    setArtworks((prevArtworks) => [...prevArtworks, newArtwork]);
  };

  // Remove an artwork
  const removeArtwork = (id) => {
    setArtworks((prevArtworks) => prevArtworks.filter((a) => a.id !== id));
  };

  // Handle file upload for artwork
  const handleFileUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      updateArtwork(id, "front_logo", file);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formattedData = artworks.map(({ id, ...rest }) => ({
      artwork_id: rest.artwork_name.split(" ").join("_"),
      artwork_name: rest.artwork_name,
      artwork_size: rest.artwork_size,
      artwork_type: rest.artwork_type,
      color_count: rest.color_count,
      placement_location: rest.placement_location,
      application_method: rest.application_method,
      coordinates: rest.coordinates,
      artwork_file_key: rest.artwork_name.split(" ").join("_"),
    }));

    dispatch(setArtworksData(formattedData)); // Uncomment to dispatch to redux
    goToNextStep(); // Uncomment to go to the next step
  };

  // Log state updates for debugging
  // useEffect(() => {
  //   if (artworksIDAndFile instanceof FormData) {
  //     console.log("Updated artworksIDAndFile (FormData):");
  //     for (let [key, value] of artworksIDAndFile.entries()) {
  //       console.log(`${key}:`, value);
  //     }
  //   } else {
  //     console.log("Updated artworksIDAndFile:", artworksIDAndFile);
  //   }
  // }, [artworksIDAndFile]);

  // Handle "back" button
  const handleBack = () => {
    goToPreviousStep();
  };

  const artworkTypes = [
    { value: "Embroidery", label: "Embroidery" },
    { value: "Screen Print", label: "Screen Print" },
    { value: "Heat Transfer", label: "Heat Transfer" },
    { value: "Digital Print", label: "Digital Print" },
    { value: "Patch", label: "Patch" },
  ];

  // Update state when artworkInfo changes (useEffect for initial data)
  useEffect(() => {
    if (artworkInfo) {
      setArtworks(artworkInfo.map((a, index) => ({ ...a, id: index + 1 })));
    }
  }, [artworkInfo]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
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
            className="bg-white rounded-lg border border-gray-200 p-8 mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-500"
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
                <h2 className="text-lg font-semibold text-gray-900">
                  Artwork {index + 1}
                </h2>
              </div>
              <button
                onClick={() => removeArtwork(artwork.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
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
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Artwork Name */}
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
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Artwork Size */}
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
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Artwork Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Artwork Type
                </label>
                <select
                  value={artwork.artwork_type}
                  onChange={(e) =>
                    updateArtwork(artwork.id, "artwork_type", e.target.value)
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  {artworkTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Count */}
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
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Placement Location */}
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
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Application Method */}
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
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Coordinates */}
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
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Artwork Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Artwork Preview
                </label>
                <label className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50">
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(artwork.id, e)}
                    accept="image/*"
                    className="hidden"
                  />
                  <svg
                    className="w-12 h-12 text-gray-400 mb-2"
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
        ))}

        {/* Add Artwork Button */}
        <button
          onClick={addArtwork}
          className="w-full py-4 mb-6 bg-white border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
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
