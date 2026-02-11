import React from 'react';
/* global MoudarEngine */

export default function MonteCarloView({ project, strategies: strategiesProp, lang, onClose }) {
  const strategies = strategiesProp || [];
  const simulation = MoudarEngine.runMonteCarloSimulation(project, strategies, 10000, lang);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {"\uD83C\uDFB2 "}{lang === "fr" ? "Simulation Monte Carlo (heuristique)" : "Monte Carlo Simulation (heuristic)"}
            </h2>
            <p className="text-sm text-indigo-200">
              {simulation.iterations.toLocaleString()}{lang === "fr" ? " iterations \u2014 Randomisation d'un modele heuristique, non calibre sur donnees empiriques" : " iterations \u2014 Randomized heuristic model, not calibrated on empirical data"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-indigo-500 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Median Score */}
          <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 mb-6">
            <div className="text-6xl font-bold text-indigo-700 mb-2">{simulation.statistics.median}%</div>
            <p className="text-gray-600">{lang === "fr" ? "Probabilit\u00E9 de succ\u00E8s m\u00E9diane" : "Median success probability"}</p>
            <p className="text-sm text-gray-500 mt-2">{simulation.interpretation}</p>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-700">{simulation.statistics.mean}%</div>
              <div className="text-xs text-gray-500">{lang === "fr" ? "Moyenne" : "Mean"}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-700">{simulation.statistics.stdDev}%</div>
              <div className="text-xs text-gray-500">{lang === "fr" ? "\u00C9cart-type" : "Std Dev"}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-700">{simulation.statistics.min}%</div>
              <div className="text-xs text-gray-500">Min</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-700">{simulation.statistics.max}%</div>
              <div className="text-xs text-gray-500">Max</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-700">{simulation.percentiles.p50}%</div>
              <div className="text-xs text-gray-500">P50</div>
            </div>
          </div>

          {/* Confidence Intervals */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">
              {lang === "fr" ? "Intervalles de confiance" : "Confidence intervals"}
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>IC 90%</span>
                  <span className="font-medium">{simulation.confidenceIntervals.ci90.lower}% - {simulation.confidenceIntervals.ci90.upper}%</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full relative">
                  <div
                    className="absolute h-4 bg-blue-400 rounded-full"
                    style={{
                      left: simulation.confidenceIntervals.ci90.lower + '%',
                      width: (simulation.confidenceIntervals.ci90.upper - simulation.confidenceIntervals.ci90.lower) + '%'
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>IC 50%</span>
                  <span className="font-medium">{simulation.confidenceIntervals.ci50.lower}% - {simulation.confidenceIntervals.ci50.upper}%</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full relative">
                  <div
                    className="absolute h-4 bg-blue-600 rounded-full"
                    style={{
                      left: simulation.confidenceIntervals.ci50.lower + '%',
                      width: (simulation.confidenceIntervals.ci50.upper - simulation.confidenceIntervals.ci50.lower) + '%'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Histogram */}
          <div className="p-4 border rounded-xl">
            <h3 className="font-bold text-gray-800 mb-3">
              {lang === "fr" ? "Distribution des r\u00E9sultats" : "Results distribution"}
            </h3>
            <div className="flex items-end gap-1 h-32">
              {simulation.histogram.filter((h, i) => i % 2 === 0).map((h, i) => {
                const height = Math.min(100, parseFloat(h.percentage) * 3);
                return (
                  <div
                    key={i}
                    className="flex-1 bg-indigo-500 rounded-t"
                    style={{ height: height + '%' }}
                    title={h.range + ': ' + h.percentage + '%'}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className={"p-4 rounded-xl " + (simulation.riskAssessment.probabilityBelow50 > 30 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200')}>
              <div className="text-2xl font-bold">{simulation.riskAssessment.probabilityBelow50}%</div>
              <div className="text-sm text-gray-600">
                {lang === "fr" ? "Probabilit\u00E9 d'\u00E9chec (<50%)" : "Failure probability (<50%)"}
              </div>
            </div>
            <div className={"p-4 rounded-xl " + (simulation.riskAssessment.probabilityAbove70 > 50 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200')}>
              <div className="text-2xl font-bold">{simulation.riskAssessment.probabilityAbove70}%</div>
              <div className="text-sm text-gray-600">
                {lang === "fr" ? "Probabilit\u00E9 de succ\u00E8s (>70%)" : "Success probability (>70%)"}
              </div>
            </div>
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
