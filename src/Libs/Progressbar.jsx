import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
const ProgressStepper = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div
                  // onClick={() => onStepClick(step.number)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-500 transform ${
                    step.number === currentStep
                      ? "bg-gray-900 text-white scale-110 shadow-lg"
                      : step.number < currentStep
                      ? "bg-gray-700 text-white scale-100"
                      : "bg-white border-2 border-gray-300 text-gray-400 scale-100"
                  } hover:scale-105`}
                >
                  {step.number < currentStep ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium transition-all duration-300 ${
                    step.number === currentStep
                      ? "text-gray-900 scale-105"
                      : "text-gray-500 scale-100"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 bg-gray-200 relative overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full bg-gray-700 transition-all duration-700 ease-in-out ${
                      step.number < currentStep ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Step Content Wrapper
const StepContent = ({ fadeIn, children }) => {
  return (
    <div
      className={`transition-all duration-300 ${
        fadeIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      {children}
    </div>
  );
};

// Reusable Page Header
const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

// Reusable Navigation Buttons
const StepNavigation = ({
  onPrevious,
  onNext,
  showPrevious,
  showNext,
  isLastStep,
}) => {
  return (
    <div className="flex justify-between mt-8">
      <div>
        {showPrevious && (
          <button
            onClick={onPrevious}
            className="px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
        )}
      </div>
      <div>
        {showNext && (
          <button
            onClick={onNext}
            className="px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors bg-gray-600 hover:bg-gray-700 text-white"
          >
            {isLastStep ? "Complete" : "Next"}
            {!isLastStep && <ChevronRight className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export { ProgressStepper, StepContent, PageHeader, StepNavigation };
