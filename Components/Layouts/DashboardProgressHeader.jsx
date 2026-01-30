"use client";
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useGetFashionTechpackByIdQuery } from "@/Apis/Get-Fashion/getFashionApi";

const DashboardProgressHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { techpack_id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);

  //// api call here////
  const { data: techpackData = {} } = useGetFashionTechpackByIdQuery(
    techpack_id,
    { skip: !techpack_id },
  );

  const getCompletedSteps = () => {
    const completed = [];
    if (!techpackData) return completed;

    // Step 1: Check if step_one object has status "completed"
    if (techpackData.step_one?.status === "completed") {
      completed.push(1);
    }

    // Steps 2-7: Check if arrays have items and all items are "completed"
    const stepKeys = [
      { key: "step_two", id: 2 },
      { key: "step_three", id: 3 },
      { key: "step_four", id: 4 },
      { key: "step_five", id: 5 },
      { key: "step_six", id: 6 },
      { key: "step_seven", id: 7 },
    ];

    stepKeys.forEach(({ key, id }) => {
      const stepData = techpackData[key];
      if (Array.isArray(stepData) && stepData.length > 0) {
        if (stepData.every((item) => item.status === "completed")) {
          completed.push(id);
        }
      }
    });

    // Step 8: Review step is complete if the whole techpack is marked as completed
    if (techpackData.status === "completed") {
      completed.push(8);
    }

    return completed;
  };

  const completedSteps = getCompletedSteps();


  const getPathStep = (path) => {
    switch (path) {
      case `/${techpack_id}`:
        return 1;
      case `/${techpack_id}/measurements`:
        return 2;
      case `/${techpack_id}/fabrics`:
        return 3;
      case `/${techpack_id}/trims`:
        return 4;
      case `/${techpack_id}/construction`:
        return 5;
      case `/${techpack_id}/artwork`:
        return 6;
      case `/${techpack_id}/bom`:
        return 7;
      case `/${techpack_id}/review`:
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
    // only clickable if stepId <= currentStep
    if (!completedSteps.includes(stepId)) return;
    setCurrentStep(stepId);
    if (stepId === 1) {
      router.push(`/${techpack_id}`);
    } else if (stepId === 2) {
      router.push(`/${techpack_id}/measurements`);
    } else if (stepId === 3) {
      router.push(`/${techpack_id}/fabrics`);
    } else if (stepId === 4) {
      router.push(`/${techpack_id}/trims`);
    } else if (stepId === 5) {
      router.push(`/${techpack_id}/construction`);
    } else if (stepId === 6) {
      router.push(`/${techpack_id}/artwork`);
    } else if (stepId === 7) {
      router.push(`/${techpack_id}/bom`);
    } else if (stepId === 8) {
      router.push(`/${techpack_id}/review`);
    }
  };

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return "completed";
    if (completedSteps.includes(stepId)) return "completed";
    if (stepId === currentStep) return "active";
    return "upcoming";
  };

  useEffect(() => {
    const step = getPathStep(pathname);
    setCurrentStep(step);
  }, [pathname]);

  return (
    <>
      <div className="w-full container mx-auto mb-6">
        {/* Progress Stepper */}
        <div className="rounded-lg shadow-sm p-6">
          <div className="relative">
            {/* Progress Line Background */}
            <div
              className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"
              style={{ marginLeft: "2.5rem", marginRight: "2.5rem" }}
            ></div>

            {/* Animated Progress Line */}
            <div
              className="absolute top-5 -left-1 h-0.5 bg-gray-900 transition-all duration-500 ease-in-out"
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
                        ${status === "completed"
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
                        ${status === "completed" || status === "active"
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
