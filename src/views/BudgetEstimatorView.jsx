import React, { useState } from 'react';
/* global MoudarEngine */

export default function BudgetEstimatorView({ project, protocol, lang, onClose }) {
  const strategies = protocol && protocol.strategies ? protocol.strategies : [];

  const [duration, setDuration] = useState(project.duration || 24);
  const [sites, setSites] = useState(project.sites || 1);
  const [population, setPopulation] = useState(project.population || 100);

  const enrichedProject = { ...project, duration, sites, population };
  const budget = MoudarEngine.estimateBudget(enrichedProject, strategies, lang);
  const benchmarkColor = budget.benchmark.status === 'low' ? 'text-green-600' : budget.benchmark.status === 'normal' ? 'text-blue-600' : 'text-orange-600';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDCB0 "}{lang === "fr" ? "Estimateur Budg\u00E9taire" : "Budget Estimator"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr" ? "Estimation automatique en USD" : "Automatic estimate in USD"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Parameters */}
          <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === "fr" ? "Dur\u00E9e (mois)" : "Duration (months)"}
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 12)}
                min="6"
                max="60"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === "fr" ? "Nombre de sites" : "Number of sites"}
              </label>
              <input
                type="number"
                value={sites}
                onChange={(e) => setSites(parseInt(e.target.value) || 1)}
                min="1"
                max="50"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === "fr" ? "Population cible" : "Target population"}
              </label>
              <input
                type="number"
                value={population}
                onChange={(e) => setPopulation(parseInt(e.target.value) || 50)}
                min="10"
                max="10000"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Total */}
          <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 mb-6">
            <div className="text-4xl font-bold text-indigo-700 mb-2">
              ${budget.summary.total.toLocaleString()} USD
            </div>
            <p className="text-gray-600">
              {lang === "fr" ? "Budget total estim\u00E9" : "Total estimated budget"}
            </p>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-gray-700">${budget.summary.setup.toLocaleString()}</div>
                <div className="text-gray-500">{lang === "fr" ? "D\u00E9marrage" : "Setup"}</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-700">${budget.summary.recurring.toLocaleString()}</div>
                <div className="text-gray-500">{lang === "fr" ? "R\u00E9current" : "Recurring"}</div>
              </div>
            </div>
          </div>

          {/* Benchmark */}
          <div className={"mb-6 p-4 rounded-xl border " + (budget.benchmark.status === 'low' ? 'bg-green-50 border-green-200' : budget.benchmark.status === 'normal' ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200')}>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">
                  {lang === "fr" ? "Co\u00FBt par b\u00E9n\u00E9ficiaire" : "Cost per beneficiary"}:{" "}
                </span>
                <span className={"font-bold " + benchmarkColor}>${budget.perBeneficiary}</span>
              </div>
              <div className={"px-3 py-1 rounded-full text-sm font-medium " + (budget.benchmark.status === 'low' ? 'bg-green-100 text-green-700' : budget.benchmark.status === 'normal' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700')}>
                {budget.benchmark.message}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {lang === "fr" ? "Benchmark" : "Benchmark"} ({budget.parameters.resourceLevel}): ${budget.benchmark.range.low} - ${budget.benchmark.range.high} USD
            </p>
          </div>

          {/* Line Items */}
          <h3 className="font-bold text-gray-800 mb-3">
            {lang === "fr" ? "D\u00E9tail par poste" : "Breakdown by item"}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">{lang === "fr" ? "Poste" : "Item"}</th>
                  <th className="p-3 text-right">{lang === "fr" ? "D\u00E9marrage" : "Setup"}</th>
                  <th className="p-3 text-right">{lang === "fr" ? "R\u00E9current" : "Recurring"}</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {(budget.lineItems || []).map((item, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium">{item.label || ""}</div>
                      {item.details && item.details.length > 0 && (
                        <div className="text-xs text-gray-500">{item.details.join(', ')}</div>
                      )}
                    </td>
                    <td className="p-3 text-right">${Math.round(item.setup || 0).toLocaleString()}</td>
                    <td className="p-3 text-right">${Math.round(item.recurring || 0).toLocaleString()}</td>
                    <td className="p-3 text-right font-medium">${Math.round((item.setup || 0) + (item.recurring || 0)).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-indigo-50 font-bold">
                <tr>
                  <td className="p-3">TOTAL</td>
                  <td className="p-3 text-right">${(budget.summary && budget.summary.setup || 0).toLocaleString()}</td>
                  <td className="p-3 text-right">${(budget.summary && budget.summary.recurring || 0).toLocaleString()}</td>
                  <td className="p-3 text-right text-indigo-700">${(budget.summary && budget.summary.total || 0).toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
