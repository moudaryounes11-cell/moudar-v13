import React, { useState } from 'react';

/* global OnboardingWizard */

export default function OnboardingWizardView({ lang = 'fr', onComplete, onNavigate }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    profile: null,
    objective: null
  });

  const steps = OnboardingWizard.getSteps(lang);
  const step = steps[currentStep];

  const handleChoice = (choiceId) => {
    const newPrefs = Object.assign({}, preferences);
    if (step.id === 'profile') newPrefs.profile = choiceId;
    else if (step.id === 'objective') newPrefs.objective = choiceId;
    setPreferences(newPrefs);
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleComplete = (action) => {
    OnboardingWizard.savePreferences(preferences);
    OnboardingWizard.markCompleted();
    if (onComplete) onComplete(preferences, action);
    if (onNavigate) {
      if (action === 'create') onNavigate('wizard');
      else if (action === 'cases') onNavigate('cases');
      else onNavigate('space');
    }
  };

  const handleSkip = () => {
    OnboardingWizard.markCompleted();
    if (onComplete) onComplete(null, 'skip');
    if (onNavigate) onNavigate('home');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
            style={{ width: ((currentStep + 1) / steps.length) * 100 + '%' }}
          />
        </div>

        <div className="p-8">
          {/* Step header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{step.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{step.title}</h2>
            {step.subtitle && <p className="text-gray-500">{step.subtitle}</p>}
          </div>

          {/* Step content */}
          {step.content && (
            <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">{step.content}</p>
          )}

          {/* Choice type step */}
          {step.type === 'choice' && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {step.choices.map((choice) => {
                const isSelected =
                  (step.id === 'profile' && preferences.profile === choice.id) ||
                  (step.id === 'objective' && preferences.objective === choice.id);
                return (
                  <button
                    key={choice.id}
                    onClick={() => { handleChoice(choice.id); }}
                    className={
                      "p-4 rounded-xl border-2 text-left transition-all " +
                      (isSelected
                        ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300 hover:shadow")
                    }
                  >
                    <div className="text-3xl mb-2">{choice.icon}</div>
                    <div className="font-semibold text-gray-800">{choice.label}</div>
                    <div className="text-sm text-gray-500">{choice.description}</div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Tour type step */}
          {step.type === 'tour' && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {step.features.map((feature, i) => (
                <div key={i} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="font-semibold text-gray-800 text-sm">{feature.title}</div>
                  <div className="text-xs text-gray-500">{feature.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          {step.actions && (
            <div className="flex gap-4 justify-center mb-4">
              {step.actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => { handleComplete(action.id); }}
                  className={
                    action.primary
                      ? "px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
                      : "px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                  }
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation footer */}
        <div className="px-8 pb-8 flex justify-between items-center">
          {currentStep > 0 ? (
            <button onClick={handlePrev} className="px-4 py-2 text-gray-500 hover:text-gray-700">
              {"\u2190"} {lang === 'fr' ? 'Retour' : 'Back'}
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div
                key={i}
                className={
                  "w-2 h-2 rounded-full transition-all " +
                  (i === currentStep
                    ? "bg-blue-500 w-6"
                    : i < currentStep
                      ? "bg-blue-300"
                      : "bg-gray-300")
                }
              />
            ))}
          </div>

          {step.showSkip ? (
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-400 hover:text-gray-600 text-sm"
            >
              {lang === 'fr' ? 'Passer' : 'Skip'}
            </button>
          ) : !step.actions && currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              {lang === 'fr' ? 'Suivant' : 'Next'} {"\u2192"}
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
