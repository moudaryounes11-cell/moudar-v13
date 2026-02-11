import React, { useState } from 'react';
/* global CFIRUserGuide */

export default function CFIRUserGuideView({ lang = 'fr' }) {
  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const [activeTab, setActiveTab] = useState('steps');
  const [expanded, setExpanded] = useState(null);
  const [checks, setChecks] = useState({});

  const progress = CFIRUserGuide.assessProgress(checks);

  const toggleCheck = (taskId) => {
    setChecks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const toggleExpand = (stepKey) => {
    setExpanded((prev) => (prev === stepKey ? null : stepKey));
  };

  const stepColors = {
    step1: '#3b82f6',
    step2: '#10b981',
    step3: '#8b5cf6',
    step4: '#f59e0b',
    step5: '#ef4444'
  };

  const templateTypeColors = {
    interview: { bg: 'bg-blue-100', text: 'text-blue-700' },
    analysis: { bg: 'bg-purple-100', text: 'text-purple-700' },
    interpretation: { bg: 'bg-amber-100', text: 'text-amber-700' },
    reporting: { bg: 'bg-green-100', text: 'text-green-700' }
  };

  const tabs = [
    { id: 'steps', label: t('Etapes', 'Steps'), icon: '\uD83D\uDCCB' },
    { id: 'templates', label: t('Templates', 'Templates'), icon: '\uD83D\uDCC4' },
    { id: 'outcomes', label: t('Outcomes', 'Outcomes'), icon: '\uD83C\uDFAF' },
    { id: 'faq', label: 'FAQ', icon: '\u2753' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDCD6 "}
              {t('Guide Utilisateur CFIR', 'CFIR User Guide')}
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full font-normal">
                D1
              </span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {CFIRUserGuide.citation}
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">
              {progress.overall ? progress.overall.percent : 0}%
            </div>
            <p className="text-xs text-gray-500">
              {t('Progression globale', 'Overall progress')}
            </p>
            <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
              <div
                className="h-2 bg-indigo-500 rounded-full transition-all"
                style={{ width: `${progress.overall ? progress.overall.percent : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              'px-4 py-2 rounded-xl text-sm font-medium transition-all ' +
              (activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border')
            }
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Steps Tab */}
      {activeTab === 'steps' && (
        <div className="space-y-4">
          {Object.keys(CFIRUserGuide.steps).map((stepKey) => {
            const step = CFIRUserGuide.steps[stepKey];
            const stepProgress = progress[stepKey] || { completed: 0, total: 0, percent: 0 };
            const isExpanded = expanded === stepKey;
            const color = stepColors[stepKey] || '#6b7280';

            return (
              <div
                key={stepKey}
                className="bg-white rounded-xl shadow border overflow-hidden"
              >
                {/* Step Header */}
                <button
                  onClick={() => toggleExpand(stepKey)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: color }}
                    >
                      {step.number}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-800">
                        {step.label[lang] || step.label.en}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {step.description[lang] || step.description.en}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-sm font-bold" style={{ color }}>
                        {stepProgress.percent}%
                      </span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${stepProgress.percent}%`,
                            backgroundColor: color
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-gray-400 text-lg">
                      {isExpanded ? '\u25B2' : '\u25BC'}
                    </span>
                  </div>
                </button>

                {/* Step Tasks (expanded) */}
                {isExpanded && (
                  <div className="border-t px-4 pb-4">
                    <div className="mt-3 space-y-2">
                      {step.tasks.map((task) => (
                        <label
                          key={task.id}
                          className={
                            'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ' +
                            (checks[task.id]
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-gray-50 border border-gray-200 hover:bg-gray-100')
                          }
                        >
                          <input
                            type="checkbox"
                            checked={!!checks[task.id]}
                            onChange={() => toggleCheck(task.id)}
                            className="mt-0.5 w-4 h-4 rounded accent-indigo-600"
                          />
                          <div>
                            <span className="text-xs text-gray-400 font-mono mr-2">
                              {task.id}
                            </span>
                            <span className={
                              'font-medium ' +
                              (checks[task.id] ? 'text-green-700 line-through' : 'text-gray-700')
                            }>
                              {task.task[lang] || task.task.en}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {task.guidance[lang] || task.guidance.en}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-gray-400 text-right">
                      {stepProgress.completed}/{stepProgress.total} {t('taches completees', 'tasks completed')}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid md:grid-cols-2 gap-4">
          {Object.keys(CFIRUserGuide.templates).map((tplKey) => {
            const tpl = CFIRUserGuide.templates[tplKey];
            const typeStyle = templateTypeColors[tpl.type] || { bg: 'bg-gray-100', text: 'text-gray-700' };

            return (
              <div
                key={tplKey}
                className="bg-white rounded-xl shadow border p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-lg font-bold text-gray-400">{tpl.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}>
                    {tpl.type}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  {tpl.label[lang] || tpl.label.en}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="px-2 py-0.5 bg-gray-100 rounded">
                    StaRI: {tpl.stariRef}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Outcomes Tab */}
      {activeTab === 'outcomes' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Implementation Outcomes */}
          <div className="bg-white rounded-xl shadow border p-5">
            <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              {"\u2699\uFE0F "}
              {t('Outcomes d\'implementation (Proctor 2011)', 'Implementation Outcomes (Proctor 2011)')}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {t(
                'Indicateurs de la qualite du processus d\'implementation',
                'Indicators of implementation process quality'
              )}
            </p>
            <div className="space-y-2">
              {CFIRUserGuide.outcomesAddendum.implementationOutcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg border border-amber-100"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-700">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Innovation Outcomes */}
          <div className="bg-white rounded-xl shadow border p-5">
            <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              {"\uD83D\uDCA1 "}
              {t('Outcomes d\'innovation (Cliniques)', 'Innovation Outcomes (Clinical)')}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {t(
                'Resultats cliniques et pour les patients',
                'Clinical and patient-level results'
              )}
            </p>
            <div className="space-y-2">
              {CFIRUserGuide.outcomesAddendum.innovationOutcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-700">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Distinction note */}
          <div className="md:col-span-2 bg-indigo-50 rounded-xl border border-indigo-200 p-4">
            <p className="text-sm text-indigo-800 font-medium">
              {"\u2139\uFE0F "}{CFIRUserGuide.outcomesAddendum.distinction[lang] || CFIRUserGuide.outcomesAddendum.distinction.en}
            </p>
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          {CFIRUserGuide.faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow border p-5">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
                  Q
                </span>
                {faq.q[lang] || faq.q.en}
              </h3>
              <div className="ml-9 text-sm text-gray-600 leading-relaxed">
                {faq.a[lang] || faq.a.en}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Citation */}
      <div className="mt-6 text-center text-xs text-gray-400">
        {CFIRUserGuide.citation} {'\u2022'} MOUDAR{'\u00AE'} v{CFIRUserGuide.VERSION}
      </div>
    </div>
  );
}
