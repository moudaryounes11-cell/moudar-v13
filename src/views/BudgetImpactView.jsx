import React, { useState } from 'react';

/* global BudgetImpactAnalyzer */

export default function BudgetImpactView({ lang = 'fr' }) {
  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const [project, setProject] = useState({
    title: t('Projet de sant\u00e9 mentale', 'Mental Health Project'),
    domain: 'mental_health',
    resourceLevel: 'UMIC',
    population: 150,
    budget: 500000,
  });

  const [years, setYears] = useState(5);
  const [results, setResults] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState('moderate');

  const runAnalysis = () => {
    const budget = {
      summary: {
        total: project.budget,
      },
    };
    const analysis = BudgetImpactAnalyzer.analyze(project, budget, years, lang);
    setResults(analysis);
  };

  const updateProject = (field, value) => {
    const newProject = Object.assign({}, project);
    newProject[field] = value;
    setProject(newProject);
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{'\uD83D\uDCB0'}</span>
          <div>
            <h1 className="text-2xl font-bold">
              {t("Analyse d'Impact Budg\u00e9taire", 'Budget Impact Analysis')}
            </h1>
            <p className="text-emerald-100">
              {t(
                "Projections 3-5 ans pour le passage \u00e0 l'\u00e9chelle",
                '3-5 year projections for scaling-up'
              )}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            {'\uD83D\uDCCA'} BIA v1.0
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            {'\uD83C\uDFAF'} {t('Sc\u00e9narios multiples', 'Multiple scenarios')}
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            {'\uD83D\uDCC8'} ROI {years} {t('ans', 'years')}
          </span>
        </div>
      </div>

      {/* Project Parameters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          {'\u2699\uFE0F'} {t('Param\u00e8tres du projet', 'Project Parameters')}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Initial Budget */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('Budget initial ($)', 'Initial Budget ($)')}
            </label>
            <input
              type="number"
              value={project.budget}
              onChange={(e) => {
                updateProject('budget', parseInt(e.target.value) || 0);
              }}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Target Population */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('Population cible', 'Target Population')}
            </label>
            <input
              type="number"
              value={project.population}
              onChange={(e) => {
                updateProject('population', parseInt(e.target.value) || 0);
              }}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Horizon (years) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('Horizon (ann\u00e9es)', 'Horizon (years)')}
            </label>
            <select
              value={years}
              onChange={(e) => {
                setYears(parseInt(e.target.value));
              }}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="3">3 {t('ans', 'years')}</option>
              <option value="5">5 {t('ans', 'years')}</option>
              <option value="7">7 {t('ans', 'years')}</option>
            </select>
          </div>

          {/* Domain */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('Domaine', 'Domain')}
            </label>
            <select
              value={project.domain}
              onChange={(e) => {
                updateProject('domain', e.target.value);
              }}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="health">{t('Sant\u00e9', 'Health')}</option>
              <option value="mental_health">{t('Sant\u00e9 mentale', 'Mental Health')}</option>
              <option value="education">{t('\u00c9ducation', 'Education')}</option>
              <option value="social">{t('Social', 'Social')}</option>
            </select>
          </div>

          {/* Resource Level */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('Niveau de ressources', 'Resource Level')}
            </label>
            <select
              value={project.resourceLevel}
              onChange={(e) => {
                updateProject('resourceLevel', e.target.value);
              }}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="LIC">LIC - {t('Faible revenu', 'Low Income')}</option>
              <option value="LMIC">LMIC - {t('Revenu interm\u00e9diaire inf.', 'Lower Middle Income')}</option>
              <option value="UMIC">UMIC - {t('Revenu interm\u00e9diaire sup.', 'Upper Middle Income')}</option>
              <option value="HIC">HIC - {t('Revenu \u00e9lev\u00e9', 'High Income')}</option>
            </select>
          </div>

          {/* Analyze Button */}
          <div className="flex items-end">
            <button
              onClick={runAnalysis}
              className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition"
            >
              {'\uD83D\uDCCA'} {t('Analyser', 'Analyze')}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              {'\uD83D\uDCDD'} {t('R\u00e9sum\u00e9 ex\u00e9cutif', 'Executive Summary')}
            </h3>
            <p className="text-gray-700">{results.executiveSummary}</p>
          </div>

          {/* Scenario Selector Buttons */}
          <div className="flex gap-3">
            {Object.keys(results.scenarios).map((key) => {
              const scenario = results.scenarios[key];
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedScenario(key);
                  }}
                  className={
                    'flex-1 p-4 rounded-xl border-2 transition ' +
                    (selectedScenario === key
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-400')
                  }
                >
                  <div className="font-bold text-gray-800">{scenario.label}</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-1">
                    ROI: {scenario.summary.overallROI}%
                  </div>
                  <div className="text-sm text-gray-500">
                    {t('Ratio C/B', 'B/C Ratio')}: {scenario.summary.overallBCRatio}:1
                  </div>
                </button>
              );
            })}
          </div>

          {/* Yearly Projections Table */}
          <div className="bg-white rounded-xl p-6 shadow-lg border">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {t('Projections annuelles', 'Yearly Projections')} -{' '}
              {results.scenarios[selectedScenario].label}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left">{t('Ann\u00e9e', 'Year')}</th>
                    <th className="p-3 text-right">{t('Population', 'Population')}</th>
                    <th className="p-3 text-right">{t('Co\u00fbt', 'Cost')}</th>
                    <th className="p-3 text-right">{t('B\u00e9n\u00e9fices', 'Benefits')}</th>
                    <th className="p-3 text-right">{t('ROI cumul\u00e9', 'Cumulative ROI')}</th>
                    <th className="p-3 text-right">{t('Ratio C/B', 'B/C Ratio')}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios[selectedScenario].data.map((row) => (
                    <tr key={row.year} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-medium">
                        {t('An', 'Year')} {row.year}
                      </td>
                      <td className="p-3 text-right">{row.population.toLocaleString()}</td>
                      <td className="p-3 text-right text-red-600">
                        ${row.cost.toLocaleString()}
                      </td>
                      <td className="p-3 text-right text-green-600">
                        ${row.benefits.toLocaleString()}
                      </td>
                      <td className="p-3 text-right font-bold">{row.cumulativeROI}%</td>
                      <td className="p-3 text-right">{row.bcRatio}:1</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-emerald-50 font-bold">
                    <td className="p-3">{t('TOTAL', 'TOTAL')}</td>
                    <td className="p-3 text-right">
                      {results.scenarios[selectedScenario].summary.totalPopulation.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-red-600">
                      ${results.scenarios[selectedScenario].summary.totalCost.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-green-600">
                      ${results.scenarios[selectedScenario].summary.totalBenefit.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-emerald-700">
                      {results.scenarios[selectedScenario].summary.overallROI}%
                    </td>
                    <td className="p-3 text-right text-emerald-700">
                      {results.scenarios[selectedScenario].summary.overallBCRatio}:1
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-6 shadow-lg border">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {t(
                'Recommandations pour les d\u00e9cideurs',
                'Recommendations for Decision Makers'
              )}
            </h3>
            <div className="space-y-3">
              {results.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className={
                    'p-4 rounded-lg border-l-4 ' +
                    (rec.priority === 'high'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-300 bg-gray-50')
                  }
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{rec.icon}</span>
                    <span className="text-gray-800">{rec.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
