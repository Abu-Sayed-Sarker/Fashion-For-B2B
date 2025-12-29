import { useState } from "react";
import {
  ProgressStepper,
  StepContent,
  StepNavigation,
} from "../../Libs/Progressbar";
import StapesOne from "../../Components/Add Faction All Staps/StapesOne";
import useStepNavigation from "../../Libs/progressHooks";
import StapesTow from "../../Components/Add Faction All Staps/StapesTow";
import StapesThree from "../../Components/Add Faction All Staps/StapesThree";
import StapesFour from "../../Components/Add Faction All Staps/StapesFour";
import StapesFive from "../../Components/Add Faction All Staps/StapesFive";
import StapesSix from "../../Components/Add Faction All Staps/StapesSix";
import StapesSeven from "../../Components/Add Faction All Staps/StapesSeven";
import ReviewExport from "../../Components/Add Faction All Staps/ReviewExport";

const AddFactionLibrary = () => {
  const steps = [
    {
      number: 1,
      label: "Setup",
      title: "Garment Setup",
      subtitle: "Define the basic specifications for your garment",
    },
    {
      number: 2,
      label: "Measurements",
      title: "Measurements",
      subtitle: "Add garment measurements and specifications",
    },
    {
      number: 3,
      label: "Fabrics",
      title: "Fabrics",
      subtitle: "Select and specify fabric details",
    },
    {
      number: 4,
      label: "Trims",
      title: "Trims",
      subtitle: "Add trims and accessories information",
    },
    {
      number: 5,
      label: "Construction",
      title: "Construction",
      subtitle: "Define construction methods and techniques",
    },
    {
      number: 6,
      label: "Artwork",
      title: "Artwork",
      subtitle: "Upload and manage artwork specifications",
    },
    {
      number: 7,
      label: "BOM",
      title: "Bill of Materials",
      subtitle: "Review and manage bill of materials",
    },
    {
      number: 8,
      label: "Review",
      title: "Review",
      subtitle: "Final review before submission",
    },
  ];

  const { currentStep, goToStep, fadeIn, goToNextStep, goToPreviousStep } =
    useStepNavigation(steps.length);

  // Get current step data
  const currentStepData = steps[currentStep - 1];

  // Dynamic content renderer
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StapesOne goToNextStep={goToNextStep} />;
      case 2:
        return (
          <StapesTow
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        );
      case 3:
        return (
          <StapesThree
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        );
      case 4:
        return (
          <StapesFour
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        );
      case 5:
        return (
          <StapesFive
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        );
      case 6:
        return (
          <StapesSix
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        );
      case 7:
        return (
          <StapesSeven
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        );
      case 8:
        return <ReviewExport />;
      default:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 mb-8">{currentStepData.subtitle}</p>
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-600">
                This section is under construction. Use the navigation buttons
                to move between steps.
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressStepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={goToStep}
      />

      <div className="max-w-5xl mx-auto px-8 py-12">
        <StepContent fadeIn={fadeIn}>
          {renderStepContent()}

          {/* <StepNavigation
            onPrevious={goToPreviousStep}
            onNext={goToNextStep}
            showPrevious={currentStep > 1}
            showNext={true}
            isLastStep={currentStep === steps.length}
          /> */}
        </StepContent>
      </div>
    </div>
  );
};

export default AddFactionLibrary;
