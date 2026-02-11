import React, { useState } from 'react';

/* global AdaptiveImplementationEngine */

export default function AdaptiveCockpitView({ lang = 'fr' }) {
  const demoKPIs = {
    adoption_rate: {
      value: 45,
      target: 70,
      label: {
        fr: "Taux d'adoption",
        en: 'Adoption rate'
      }
    },
    fidelity_score: {
      value: 72,
      target: 80,
      label: {
        fr: 'Score de fid\u00e9lit\u00e9',
        en: 'Fidelity score'
      }
    },
    milestone_completion: {
      value: 60,
      target: 75,
      label: {
        fr: 'Jalons compl\u00e9t\u00e9s',
        en: 'Milestones completed'
      }
    }
  };

  const demoProject = {
    id: 'DEMO_PROJECT',
    title: 'Projet d\u00e9mo',
    budget: 500000,
    strategies: ['S19', 'S04'],
    baselineKPIs: {},
    kpiHistory: {}
  };

  const [drifts, setDrifts] = useState([]);
  const [planB, setPlanB] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);

  const runAnalysis = () => {
    const detected = AdaptiveImplementationEngine.analyzeRealTime(demoProject, demoKPIs);
    setDrifts(detected);
    setAnalyzed(true);
    setPlanB(null);
  };

  const generatePlanB = (drift) => {
    const plan = AdaptiveImplementationEngine.generatePlanB(drift, demoProject, demoProject.strategies);
    setPlanB(plan);
  };

  const severityColors = {
    critical: 'bg-red-500',
    moderate: 'bg-orange-500',
    minor: 'bg-yellow-500'
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/50 to-purple-700/30 rounded-xl border border-purple-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\uD83C\uDF9B\uFE0F"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {lang === 'fr' ? 'Cockpit Adaptatif v11.0' : 'Adaptive Cockpit v11.0'}
            </h1>
            <p className="text-purple-300 text-sm">
              {lang === 'fr'
                ? 'D\u00e9tection des d\u00e9rives + Plans B automatiques + Design SMART'
                : 'Drift detection + Automatic Plan B + SMART Design'}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {Object.keys(demoKPIs).map((kpiId) => {
          const kpi = demoKPIs[kpiId];
          const variance = ((kpi.target - kpi.value) / kpi.target * 100).toFixed(1);
          const isNegative = kpi.value < kpi.target;

          return (
            <div key={kpiId} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-sm">{kpi.label[lang]}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    isNegative ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {isNegative ? '\u2193' : '\u2191'} {variance}%
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{kpi.value}%</div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${isNegative ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: kpi.value / kpi.target * 100 + '%' }}
                />
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {lang === 'fr' ? 'Cible' : 'Target'}: {kpi.target}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Analyze Button */}
      <div className="text-center mb-6">
        <button
          onClick={runAnalysis}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-xl transition-all shadow-lg"
        >
          {"\uD83D\uDD0D"} {lang === 'fr' ? 'Analyser les d\u00e9rives' : 'Analyze drifts'}
        </button>
      </div>

      {/* Detected Drifts */}
      {analyzed && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {"\uD83D\uDEA8"} {lang === 'fr' ? 'D\u00e9rives d\u00e9tect\u00e9es' : 'Detected drifts'}
            <span className="text-sm font-normal text-slate-400">({drifts.length})</span>
          </h2>

          {drifts.map((drift, idx) => {
            const driftInfo = AdaptiveImplementationEngine.driftTypes[drift.type];

            return (
              <div key={idx} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{driftInfo ? driftInfo.icon : '\u26A0\uFE0F'}</span>
                    <div>
                      <h3 className="font-semibold text-white">
                        {driftInfo ? driftInfo.label[lang] : drift.type}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {lang === 'fr' ? '\u00C9cart' : 'Variance'}:{' '}
                        <span className="text-red-400 font-mono">-{drift.variance}%</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs text-white ${severityColors[drift.severity]}`}>
                      {drift.severity.toUpperCase()}
                    </span>
                    {drift.severity === 'critical' && (
                      <button
                        onClick={() => generatePlanB(drift)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-all"
                      >
                        {lang === 'fr' ? 'G\u00e9n\u00e9rer Plan B' : 'Generate Plan B'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Plan B Panel */}
      {planB && (
        <div className="mt-6 bg-gradient-to-r from-blue-900/50 to-blue-700/30 rounded-xl p-6 border border-blue-500/30">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            {"\uD83D\uDCCB"} {lang === 'fr' ? 'Plan B g\u00e9n\u00e9r\u00e9' : 'Generated Plan B'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-slate-400 text-sm mb-1">
                {lang === 'fr' ? 'Strat\u00e9gies de soutien' : 'Support strategies'}
              </div>
              <div className="flex gap-2 flex-wrap">
                {planB.supportStrategies.map((s) => (
                  <span key={s} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-slate-400 text-sm mb-1">
                {lang === 'fr' ? 'Probabilit\u00e9 de succ\u00e8s' : 'Success probability'}
              </div>
              <div className="text-2xl font-bold text-green-400">{planB.successProbability}%</div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
            <div className="text-slate-400 text-sm mb-2">
              {lang === 'fr' ? 'Actions recommand\u00e9es' : 'Recommended actions'}
            </div>
            <ul className="space-y-1">
              {planB.actions[lang].map((action, i) => (
                <li key={i} className="text-white text-sm flex items-center gap-2">
                  <span className="text-green-400">{"\u2713"}</span> {action}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-slate-400 text-xs">
                {lang === 'fr' ? 'Co\u00fbt additionnel' : 'Additional cost'}
              </div>
              <div className="text-lg font-bold text-yellow-400">
                ${planB.estimatedCost.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-slate-400 text-xs">
                {lang === 'fr' ? 'D\u00e9lai' : 'Timeline'}
              </div>
              <div className="text-lg font-bold text-white">{planB.timeline}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
