import React, { useState, useEffect } from 'react';
/* global SensitivityAnalyzer */

export default function TornadoAnalysisView({ project, lang, onClose }) {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (project && window.SensitivityAnalyzer) {
      const result = SensitivityAnalyzer.runTornadoAnalysis(project, lang);
      setAnalysis(result);
    }
  }, [project]);

  if (!analysis) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md">
          <p>{lang === 'fr' ? "Analyse en cours..." : "Analyzing..."}</p>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    return priority === 'critical' ? 'bg-red-500' : priority === 'high' ? 'bg-orange-500' : priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500';
  };

  const getPriorityBg = (priority) => {
    return priority === 'critical' ? 'bg-red-50 border-red-200' : priority === 'high' ? 'bg-orange-50 border-orange-200' : priority === 'medium' ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {"\uD83C\uDF2A\uFE0F "}{lang === 'fr' ? "Analyse de Sensibilit\u00E9 Tornado" : "Tornado Sensitivity Analysis"}
              </h2>
              <p className="text-white/80 mt-1">
                {lang === 'fr' ? "Identifiez quelle barri\u00E8re impacte le plus votre succ\u00E8s" : "Identify which barrier most impacts your success"}
              </p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white text-2xl">{"\u00D7"}</button>
          </div>
        </div>

        {/* Global Score */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className={"text-5xl font-bold " + (analysis.baseSuccessPercent >= 60 ? "text-green-600" : analysis.baseSuccessPercent >= 40 ? "text-yellow-600" : "text-red-600")}>
                {analysis.baseSuccessPercent}%
              </div>
              <p className="text-sm text-gray-500">
                {lang === 'fr' ? "Probabilit\u00E9 de succ\u00E8s actuelle" : "Current success probability"}
              </p>
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={"h-full rounded-full transition-all " + (analysis.baseSuccessPercent >= 60 ? "bg-green-500" : analysis.baseSuccessPercent >= 40 ? "bg-yellow-500" : "bg-red-500")}
                  style={{ width: analysis.baseSuccessPercent + "%" }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tornado Chart */}
        <div className="p-6">
          <h3 className="font-bold text-gray-800 mb-4">
            {lang === 'fr' ? "Impact des barri\u00E8res sur le succ\u00E8s" : "Barrier Impact on Success"}
          </h3>
          <div className="space-y-3">
            {analysis.barriers.slice(0, 8).map((barrier, idx) => {
              const maxGain = Math.max(...analysis.barriers.map((b) => b.percentageGain));
              const barWidth = barrier.percentageGain / maxGain * 100;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-40 text-sm text-right text-gray-600 truncate">{barrier.barrierName}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <div
                      className={"h-full rounded-full transition-all flex items-center justify-end pr-2 " + getPriorityColor(barrier.priority)}
                      style={{ width: Math.max(barWidth, 10) + "%" }}
                    >
                      <span className="text-white text-xs font-bold">+{Math.round(barrier.percentageGain)}%</span>
                    </div>
                  </div>
                  <span className={"text-xs px-2 py-1 rounded " + getPriorityBg(barrier.priority)}>
                    {barrier.priority === 'critical' ? '\uD83D\uDD34' : barrier.priority === 'high' ? '\uD83D\uDFE0' : barrier.priority === 'medium' ? '\uD83D\uDFE1' : '\uD83D\uDFE2'}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 mt-4 italic">
            {lang === 'fr' ? "Les barres montrent le gain potentiel si la barri\u00E8re \u00E9tait r\u00E9solue \u00E0 100%" : "Bars show potential gain if the barrier was 100% resolved"}
          </p>
        </div>

        {/* Priority Recommendations */}
        <div className="p-6 bg-gray-50">
          <h3 className="font-bold text-gray-800 mb-4">
            {"\uD83D\uDCA1 "}{lang === 'fr' ? "Recommandations prioritaires" : "Priority Recommendations"}
          </h3>
          <div className="space-y-3">
            {analysis.barriers.slice(0, 3).map((barrier, idx) => (
              <div key={idx} className={"p-4 rounded-xl border " + getPriorityBg(barrier.priority)}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{idx === 0 ? "1\uFE0F\u20E3" : idx === 1 ? "2\uFE0F\u20E3" : "3\uFE0F\u20E3"}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{barrier.barrierName}</p>
                    <p className="text-sm text-gray-600 mt-1">{barrier.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between items-center">
          <span className="text-xs text-gray-400">
            {lang === 'fr' ? "Analyse g\u00E9n\u00E9r\u00E9e le " : "Analysis generated on "}{new Date(analysis.analysisDate).toLocaleDateString()}
          </span>
          <button onClick={onClose} className="px-6 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">
            {lang === 'fr' ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
