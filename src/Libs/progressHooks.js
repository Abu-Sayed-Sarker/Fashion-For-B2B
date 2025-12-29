// useStepNavigation.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "../Features/progressSlice";

const useStepNavigation = (stepsLength) => {
  const currentStep = useSelector((state) => state.progress.currentStep) || 1;
  const dispatch = useDispatch();
  const [fadeIn, setFadeIn] = useState(true);

  const goToNextStep = () => {
    if (currentStep < stepsLength) {
      transitionToStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      transitionToStep(currentStep - 1);
    }
  };

  const goToStep = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= stepsLength) {
      transitionToStep(stepNumber);
    }
  };

  const transitionToStep = (stepNumber) => {
    dispatch(setCurrentStep(stepNumber));
    setFadeIn(true);
  };
  return { currentStep, goToNextStep, goToPreviousStep, goToStep, fadeIn };
};

export default useStepNavigation;
