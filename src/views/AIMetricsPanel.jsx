import React, { useState, useEffect } from 'react';
/* global MoudarEngine */

export default function AIMetricsPanel({ lang }) {
  const [expanded, setExpanded] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [learningState, setLearningState] = useState(null);
  const [strategyPerf, setStrategyPerf] = useState(null);

  useEffect(() => {
    try {
      const m = MoudarEngine.getPerformanceMetrics();
      const ls = MoudarEngine.getLearningState();
      const sp = MoudarEngine.getStrategyPerformance(1);
      setMetrics(m);
      setLearningState(ls);
      setStrategyPerf(sp);
    } catch (e) {
      console.warn("Could not load AI metrics:", e);
    }
  }, [expanded]);

  const handleCalibrate = () => {
    const result = MoudarEngine.adjustWeightsFromFeedback({ learningRate: 0.1, minSamples: 3 });
    if (result.adjusted) {
      alert(lang === "fr"
        ? "\u2705 Moteur IA recalibré!\n" + result.strategiesUpdated + " stratégies ajustées.\n" + result.totalAdjustments + " poids modifiés."
        : "\u2705 AI Engine recalibrated!\n" + result.strategiesUpdated + " strategies adjusted.\n" + result.totalAdjustments + " weights modified.");
      setLearningState(MoudarEngine.getLearningState());
      setMetrics(MoudarEngine.getPerformanceMetrics());
    } else {
      alert(lang === "fr"
        ? "\u26A0\uFE0F Pas assez de données.\nMinimum 3 feedbacks par stratégie requis."
        : "\u26A0\uFE0F Not enough data.\nMinimum 3 feedbacks per strategy required.");
    }
  };

  const handleExport = () => {
    const snapshot = MoudarEngine.exportCalibratedGraph();
    const dataStr = JSON.stringify(snapshot, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "moudar_engine_v" + MoudarEngine.VERSION + "_" + new Date().toISOString().split("T")[0] + ".json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (confirm(lang === "fr" ? "\u26A0\uFE0F Réinitialiser tous les feedbacks et l'apprentissage ?" : "\u26A0\uFE0F Reset all feedbacks and learning?")) {
      MoudarEngine.resetLearning();
      setMetrics(null);
      setLearningState(null);
      setStrategyPerf(null);
      alert(lang === "fr" ? "\u2713 Apprentissage réinitialisé" : "\u2713 Learning reset");
    }
  };

  let topStrategies = [];
  if (strategyPerf && Object.keys(strategyPerf).length > 0) {
    topStrategies = Object.entries(strategyPerf)
      .map(([id, data]) => ({ id, perf: data.performance, uses: data.uses }))
      .sort((a, b) => b.perf - a.perf)
      .slice(0, 3);
  }

  if (!expanded) {
    return (
      <div className="mb-4">
        <button
          onClick={() => setExpanded(true)}
          className="text-xs text-indigo-400 hover:text-indigo-300 transition flex items-center justify-center gap-1 mx-auto group"
        >
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
          {"\uD83E\uDD16"} Moudar Engine v{MoudarEngine.VERSION}
          <span className="text-slate-600 group-hover:text-indigo-300">{"\u25BC"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4 p-4 bg-gradient-to-br from-slate-800/80 to-indigo-900/30 rounded-xl border border-indigo-500/30 max-w-lg mx-auto shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-indigo-300 font-semibold text-sm">{"\uD83E\uDD16"} Moudar Engine v{MoudarEngine.VERSION}</span>
          <span className="text-xs bg-indigo-600/50 text-indigo-200 px-2 py-0.5 rounded">AdaptiveKG</span>
        </div>
        <button onClick={() => setExpanded(false)} className="text-slate-400 hover:text-white transition">{"\u2715"}</button>
      </div>

      {metrics ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-2 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-white">{metrics.totalFeedbacks}</div>
              <div className="text-xs text-slate-400">Feedbacks</div>
            </div>
            <div className="text-center p-2 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{(metrics.acceptanceRate * 100).toFixed(0)}%</div>
              <div className="text-xs text-slate-400">{lang === "fr" ? "Acceptation" : "Acceptance"}</div>
            </div>
            <div className="text-center p-2 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{metrics.averageRating.toFixed(1)}<span className="text-sm">{"\u2605"}</span></div>
              <div className="text-xs text-slate-400">{lang === "fr" ? "Note moy." : "Avg. rating"}</div>
            </div>
          </div>

          {topStrategies.length > 0 && (
            <div className="pt-3 border-t border-slate-700/50">
              <div className="text-xs text-indigo-300 mb-2 font-medium">
                {"\uD83C\uDFC6 "}{lang === "fr" ? "Top stratégies terrain" : "Top field strategies"}
              </div>
              <div className="space-y-1">
                {topStrategies.map((s, i) => {
                  const perfColor = s.perf >= 0.7 ? "text-green-400" : s.perf >= 0.5 ? "text-yellow-400" : "text-red-400";
                  return (
                    <div key={s.id} className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">
                        {i === 0 ? "\uD83E\uDD47" : i === 1 ? "\uD83E\uDD48" : "\uD83E\uDD49"} {s.id}
                      </span>
                      <span className={perfColor + " font-mono"}>{(s.perf * 100).toFixed(0)}% ({s.uses} uses)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {learningState && (
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-700/50">
              <span className="text-indigo-400">{"\u26A1"}</span>{" "}
              {lang === "fr" ? "Dernière calibration" : "Last calibration"}: {new Date(learningState.lastCalibration).toLocaleDateString()}
              <span className="text-slate-600"> {"\u2022"} </span>
              {learningState.strategiesUpdated} {lang === "fr" ? "stratégies" : "strategies"}, {learningState.totalAdjustments} {lang === "fr" ? "poids" : "weights"}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="text-3xl mb-2">{"\uD83D\uDCCA"}</div>
          <p className="text-slate-400 text-sm">{lang === "fr" ? "Aucun feedback collecté" : "No feedback collected"}</p>
          <p className="text-slate-600 text-xs mt-1">{lang === "fr" ? "Le moteur apprendra des retours utilisateurs" : "The engine will learn from user feedback"}</p>
        </div>
      )}

      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-700/50">
        <button
          onClick={handleCalibrate}
          className="flex-1 text-xs py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg transition font-medium"
        >
          {"\u26A1 "}{lang === "fr" ? "Recalibrer" : "Recalibrate"}
        </button>
        <button
          onClick={handleExport}
          aria-label={lang === "fr" ? "Exporter le moteur Moudar en JSON" : "Export Moudar engine as JSON"}
          className="text-xs py-2 px-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition"
          title={lang === "fr" ? "Exporter le graphe calibré" : "Export calibrated graph"}
        >
          {"\uD83D\uDCE5"}
        </button>
        <button
          onClick={handleReset}
          className="text-xs py-2 px-3 bg-red-900/30 hover:bg-red-800/50 text-red-400 rounded-lg transition"
          title={lang === "fr" ? "Réinitialiser" : "Reset"}
        >
          {"\uD83D\uDDD1\uFE0F"}
        </button>
      </div>

      <p className="text-xs text-slate-600 text-center mt-3 italic">
        {lang === "fr" ? "Panneau admin — visible uniquement pour démo" : "Admin panel — visible for demo only"}
      </p>
    </div>
  );
}
