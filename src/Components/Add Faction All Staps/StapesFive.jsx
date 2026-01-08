import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateFashionByIdAndStepMutation,
  useGetFashionByIdQuery,
} from "../../Api/allApi";
import { useSelector } from "react-redux";

export default function StapesFive({ goToPreviousStep, goToNextStep }) {
  const parentId = useSelector((state) => state.addFashion.id);

  const [createFashionByIdAndStep] = useCreateFashionByIdAndStepMutation();
  const { data: fashionInfo } = useGetFashionByIdQuery(parentId, {
    skip: !parentId,
  });

  const [constructions, setConstructions] = useState([
    {
      id: 1,
      section_name: "Neck Construction",
      icon: "👔",
      description: "Collar, neckline, and neck binding specifications",
      stitch_type: "",
      spi: "",
      seam_allowance: "",
      reinforcement_points: "",
      topstitch_logic: "",
    },
    {
      id: 2,
      section_name: "Sleeve Construction",
      icon: "👕",
      description: "Sleeve attachment, armhole, and sleeve hem details",
      stitch_type: "",
      spi: "",
      seam_allowance: "",
      reinforcement_points: "",
      topstitch_logic: "",
    },
    {
      id: 3,
      section_name: "Hem Construction",
      icon: "📏",
      description: "Bottom hem, side slits, and hemline finishing",
      stitch_type: "",
      spi: "",
      seam_allowance: "",
      reinforcement_points: "",
      topstitch_logic: "",
    },
    {
      id: 4,
      section_name: "Hood / Cuff Construction",
      icon: "🧢",
      description: "Hood, cuff, waistband, and rib construction",
      stitch_type: "",
      spi: "",
      seam_allowance: "",
      reinforcement_points: "",
      topstitch_logic: "",
    },
  ]);

  const [specialInstructions, setSpecialInstructions] = useState("");

  const updateConstruction = (id, field, value) => {
    const updatedConstructions = constructions.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    setConstructions(updatedConstructions);
  };

  const handleSubmit = async () => {
    // Validate that at least some fields are filled
    // const hasData = constructions.some(
    //   (c) => c.stitch_type || c.spi || c.seam_allowance || c.reinforcement_points || c.topstitch_logic
    // );

    // if (!hasData) {
    //   return toast.error("Please fill in construction details for at least one section.");
    // }

    const formattedData = {
      constructions: constructions.map(({ id, icon, ...rest }) => rest),
      special_instructions: specialInstructions,
    };
    const data = {
      data: [formattedData],
      is_complete: true,
    };
    try {
      await createFashionByIdAndStep({
        id: parentId,
        step: 5,
        data: data,
      });
      toast.success("Construction data saved successfully!");
      goToNextStep();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save construction data.");
    }
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  useEffect(() => {
    if (fashionInfo?.steps[4]) {
      if (fashionInfo.steps[4]?.data[0].constructions) {
        setConstructions(
          fashionInfo.steps[4]?.data[0]?.constructions.map((c, index) => ({
            ...c,
            id: index + 1,
            icon: ["📘", "🟢", "🔧", "🧢"][index] || "📋",
          }))
        );
      }
      if (fashionInfo.steps[4]?.data[0]?.special_instructions) {
        setSpecialInstructions(
          fashionInfo.steps[4]?.data[0]?.special_instructions
        );
      }
    }
  }, [fashionInfo]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Construction Details
          </h1>
          <p className="text-gray-600">
            Define area-specific construction specifications for precise
            manufacturing
          </p>
        </div>

        {/* Construction Sections */}
        <div className="space-y-6 mb-6">
          {constructions.map((construction) => (
            <div
              key={construction.id}
              className="bg-white rounded-lg border border-gray-300 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{construction.icon}</span>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {construction.section_name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {construction.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Row 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stitch Type
                    </label>
                    <input
                      type="text"
                      value={construction.stitch_type}
                      onChange={(e) =>
                        updateConstruction(
                          construction.id,
                          "stitch_type",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Lockstitch 301, Overlock 504s"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SPI (Stitches Per Inch)
                    </label>
                    <input
                      type="text"
                      value={construction.spi}
                      onChange={(e) =>
                        updateConstruction(
                          construction.id,
                          "spi",
                          e.target.value
                        )
                      }
                      placeholder="e.g., 12, 14, 16"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Row 2 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seam Allowance
                    </label>
                    <input
                      type="text"
                      value={construction.seam_allowance}
                      onChange={(e) =>
                        updateConstruction(
                          construction.id,
                          "seam_allowance",
                          e.target.value
                        )
                      }
                      placeholder="e.g., 1cm, 3/8, 0.5cm"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reinforcement Points
                    </label>
                    <input
                      type="text"
                      value={construction.reinforcement_points}
                      onChange={(e) =>
                        updateConstruction(
                          construction.id,
                          "reinforcement_points",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Bartack, Double stitch"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Row 3 - Full Width */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Topstitch / Coverstitch Logic
                    </label>
                    <input
                      type="text"
                      value={construction.topstitch_logic}
                      onChange={(e) =>
                        updateConstruction(
                          construction.id,
                          "topstitch_logic",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Single needle 0.5cm from edge, Double needle 0.6cm spacing, Coverstitch 406"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Instructions & Notes */}
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg overflow-hidden mb-6">
          <div className="bg-yellow-100 border-b border-yellow-400 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📋</span>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Special Instructions & Notes
                </h3>
                <p className="text-sm text-red-600 mt-0.5">
                  Additional construction notes, critical points, or special
                  requirements
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Special Construction Instructions
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => {
                  setSpecialInstructions(e.target.value);
                  console.log("Special Instructions Updated:", e.target.value);
                }}
                placeholder="e.g., Use matching thread for all seams, Reinforce all stress points with bartack, Apply fusible interfacing to collar..."
                rows={5}
                className="w-full px-4 py-3 bg-white border border-yellow-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-600 mt-2">
                Include any critical construction notes, quality requirements,
                or special techniques
              </p>
            </div>
          </div>
        </div>

        {/* Quick Reference Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-base font-semibold text-blue-900 mb-4">
            Quick Reference Guide
          </h3>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                Common Stitch Types:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Lockstitch 301 - General seaming</li>
                <li>• Overlock 504 - Edge finishing, shoulders</li>
                <li>• Coverstitch 406 - Hemming, neckline</li>
                <li>• Chainstitch 401 - Side seams</li>
                <li>• Chain Stitch 401 - Decorative, temporary</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                Typical SPI Values:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Light fabrics: 14-16 SPI</li>
                <li>• Medium fabrics: 10-12 SPI</li>
                <li>• Heavy fabrics: 8-10 SPI</li>
                <li>• Stretch fabrics: 10-14 SPI (with stretch stitch)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                Standard Seam Allowances:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• General seams: 1cm (3/8")</li>
                <li>• Neckline/armhole: 0.6cm (1/4")</li>
                <li>• French seams: 0.6cm + 1cm (two step)</li>
                <li>• Flat-felled: 1.5cm total</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                Common Reinforcements:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Bartack - Stress points (pockets, belt loops)</li>
                <li>• Double stitch - Extra strength seams</li>
                <li>• Backstitch - Start/end of seams</li>
                <li>• Fusible tape - Seam reinforcement</li>
              </ul>
            </div>
          </div>
        </div>

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
            Back to Trims
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Next: Artwork & Placement
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
