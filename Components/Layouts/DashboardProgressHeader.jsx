"use client";
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { usePathname } from "next/navigation";

const DashboardProgressHeader = () => {
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(1);


  const getPathStep = (path) => {
    switch (path) {
      case "/dashboard":
        return 1;
      case "/dashboard/measurements":
        return 2;
      case "/dashboard/fabrics":
        return 3;
      case "/dashboard/trims":
        return 4;
      case "/dashboard/construction":
        return 5;
      case "/dashboard/artwork":
        return 6;
      case "/dashboard/bom":
        return 7;
      case "/dashboard/review":
        return 8;
      default:
        return 1;
    }
  };

  const steps = [
    { id: 1, label: "Setup" },
    { id: 2, label: "Measurements" },
    { id: 3, label: "Fabrics" },
    { id: 4, label: "Trims" },
    { id: 5, label: "Construction" },
    { id: 6, label: "Artwork" },
    { id: 7, label: "BOM" },
    { id: 8, label: "Review" },
  ];

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "active";
    return "upcoming";
  };

  useEffect(() => {
    const step = getPathStep(pathname);
    setCurrentStep(step);
  }, [pathname]);

  return (
    <>
      <div className="w-full container mx-auto">
        {/* Progress Stepper */}
        <div className="rounded-lg shadow-sm p-8 sm:p-12">
          <div className="relative">
            {/* Progress Line Background */}
            <div
              className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"
              style={{ marginLeft: "2.5rem", marginRight: "2.5rem" }}
            ></div>

            {/* Animated Progress Line */}
            <div
              className="absolute top-5 left-0 h-0.5 bg-gray-900 transition-all duration-500 ease-in-out"
              style={{
                marginLeft: "2.5rem",
                width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 2.5rem)`,
              }}
            ></div>

            {/* Steps Container */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const status = getStepStatus(step.id);

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => handleStepClick(step.id)}
                  >
                    {/* Circle */}
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                        transition-all duration-300 ease-in-out
                        ${
                          status === "completed"
                            ? "bg-gray-900 text-white scale-100"
                            : status === "active"
                              ? "bg-white border-2 border-gray-900 text-gray-900 scale-110 shadow-lg"
                              : "bg-white border-2 border-gray-200 text-gray-400 scale-100"
                        }
                        group-hover:scale-110 group-hover:shadow-md
                      `}
                    >
                      {status === "completed" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`
                        mt-3 text-sm font-medium whitespace-nowrap transition-colors duration-300
                        ${
                          status === "completed" || status === "active"
                            ? "text-gray-900"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          {/* <div className="flex justify-between mt-16">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`
                px-6 py-2.5 rounded-lg font-medium transition-all duration-200
                ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }
              `}
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentStep(Math.min(steps.length, currentStep + 1))
              }
              disabled={currentStep === steps.length}
              className={`
                px-6 py-2.5 rounded-lg font-medium transition-all duration-200
                ${
                  currentStep === steps.length
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }
              `}
            >
              Next
            </button>
          </div> */}
        </div>

        {/* Current Step Info */}
        {/* <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Step {currentStep}: {steps[currentStep - 1].label}
          </h3>
          <p className="text-gray-600">
            You are currently on the {steps[currentStep - 1].label} step. Click
            on any step above or use the navigation buttons to move between
            steps.
          </p>
        </div> */}
      </div>
    </>
  );
};

export default DashboardProgressHeader;
