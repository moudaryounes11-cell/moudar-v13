import React from 'react';
/* global MoudarEngine */

export default function RiskAnalysisView({ project, strategies: strategiesProp, lang, onClose }) {
  const strategies = strategiesProp || [];
  const analysis = MoudarEngine.analyzeRisks(project, strategies, lang);
  const overallColor = analysis.summary.overallLevel === 'critical' ? 'bg-red-500' : analysis.summary.overallLevel === 'high' ? 'bg-orange-500' : analysis.summary.overallLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\u26A0\uFE0F "}{lang === "fr" ? "Analyse des Risques" : "Risk Analysis"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr" ? "Identification et mitigation des risques projet" : "Project risk identification and mitigation"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Summary */}
          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <div className="col-span-2 p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">{lang === 'fr' ? 'Niveau global' : 'Overall level'}</div>
              <div className={"inline-block px-4 py-2 rounded-full text-white font-bold " + overallColor}>
                {analysis.summary.overallLevel.toUpperCase()}
              </div>
            </div>
            <div className="p-4 bg-red-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-red-600">{analysis.summary.critical}</div>
              <div className="text-xs text-gray-600">{lang === 'fr' ? 'Critiques' : 'Critical'}</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-orange-600">{analysis.summary.high}</div>
              <div className="text-xs text-gray-600">{lang === 'fr' ? '\u00C9lev\u00E9s' : 'High'}</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-yellow-600">{analysis.summary.medium}</div>
              <div className="text-xs text-gray-600">{lang === 'fr' ? 'Moyens' : 'Medium'}</div>
            </div>
          </div>

          {/* Risk Matrix */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-3">{lang === 'fr' ? 'Matrice des risques' : 'Risk matrix'}</h3>
            <div className="grid grid-cols-4 gap-1 text-xs">
              <div className="p-2" />
              <div className="p-2 text-center font-medium">{lang === 'fr' ? 'Faible' : 'Low'}</div>
              <div className="p-2 text-center font-medium">{lang === 'fr' ? 'Moyen' : 'Medium'}</div>
              <div className="p-2 text-center font-medium">{lang === 'fr' ? '\u00C9lev\u00E9' : 'High'}</div>

              <div className="p-2 font-medium">{lang === 'fr' ? 'Probable' : 'Likely'}</div>
              <div className="p-2 bg-yellow-200 rounded text-center">{analysis.risks.filter((r) => r.probability >= 60 && r.impact === 'low').length}</div>
              <div className="p-2 bg-orange-300 rounded text-center">{analysis.matrix.highProb_medImpact.length}</div>
              <div className="p-2 bg-red-400 rounded text-center text-white">{analysis.matrix.highProb_highImpact.length}</div>

              <div className="p-2 font-medium">{lang === 'fr' ? 'Possible' : 'Possible'}</div>
              <div className="p-2 bg-green-200 rounded text-center">{analysis.risks.filter((r) => r.probability >= 40 && r.probability < 60 && r.impact === 'low').length}</div>
              <div className="p-2 bg-yellow-200 rounded text-center">{analysis.risks.filter((r) => r.probability >= 40 && r.probability < 60 && r.impact === 'medium').length}</div>
              <div className="p-2 bg-orange-300 rounded text-center">{analysis.matrix.medProb_highImpact.length}</div>

              <div className="p-2 font-medium">{lang === 'fr' ? 'Rare' : 'Rare'}</div>
              <div className="p-2 bg-green-100 rounded text-center">{analysis.matrix.lowRisk.length}</div>
              <div className="p-2 bg-green-200 rounded text-center">{analysis.risks.filter((r) => r.probability < 40 && r.impact === 'medium').length}</div>
              <div className="p-2 bg-yellow-200 rounded text-center">{analysis.risks.filter((r) => r.probability < 40 && r.impact === 'high').length}</div>
            </div>
          </div>

          {/* Risk Details */}
          <h3 className="font-bold text-gray-800 mb-3">{lang === 'fr' ? 'D\u00E9tail des risques' : 'Risk details'}</h3>
          <div className="space-y-3">
            {analysis.risks.map((risk) => {
              const levelColor = risk.level === 'critical' ? 'border-red-400 bg-red-50' : risk.level === 'high' ? 'border-orange-400 bg-orange-50' : risk.level === 'medium' ? 'border-yellow-400 bg-yellow-50' : 'border-green-400 bg-green-50';
              const levelBadge = risk.level === 'critical' ? 'bg-red-500 text-white' : risk.level === 'high' ? 'bg-orange-500 text-white' : risk.level === 'medium' ? 'bg-yellow-500 text-gray-800' : 'bg-green-500 text-white';
              return (
                <div key={risk.id} className={"p-4 rounded-xl border-l-4 " + levelColor}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-gray-800">{risk.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({risk.category})</span>
                    </div>
                    <span className={"px-2 py-1 rounded text-xs font-medium " + levelBadge}>{risk.level}</span>
                  </div>
                  <div className="flex gap-4 text-sm mb-2">
                    <span>{lang === 'fr' ? 'Probabilit\u00E9' : 'Probability'}: {risk.probability}%</span>
                    <span>{lang === 'fr' ? 'Impact' : 'Impact'}: {risk.impact}</span>
                  </div>
                  {risk.mitigationsPresent.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {risk.mitigationsPresent.map((m) => (
                        <span key={m} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">{"\u2713 "}{m}</span>
                      ))}
                    </div>
                  )}
                  {risk.mitigationsMissing.length > 0 && (
                    <div className="text-sm text-blue-700">
                      {"\uD83D\uDCA1 "}{risk.recommendation}
                    </div>
                  )}
                </div>
              );
            })}
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
