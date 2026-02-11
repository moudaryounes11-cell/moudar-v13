import React, { useState, useEffect } from 'react';
/* global BenchmarkingEngine */

export default function BenchmarkView({ lang = 'fr' }) {
  const demoProject = {
    domain: 'mental_health',
    adoptionRate: 68,
    fidelityScore: 75,
    strategies: ['S19', 'S04', 'S08']
  };

  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    const result = BenchmarkingEngine.compareToPool(demoProject);
    setComparison(result);
  }, []);

  if (!comparison) {
    return (
      <div className="text-white">
        {lang === 'fr' ? 'Chargement...' : 'Loading...'}
      </div>
    );
  }

  const categoryColors = {
    'Excellence': 'text-green-400',
    'Above Average': 'text-blue-400',
    'Average': 'text-yellow-400',
    'Below Average': 'text-orange-400',
    'Needs Improvement': 'text-red-400'
  };

  return (
    <div className="fade-in">
      {/* Header banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-amber-900/50 to-amber-700/30 rounded-xl border border-amber-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\uD83D\uDCCA"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {lang === 'fr' ? 'Benchmarking Global v9.0' : 'Global Benchmarking v9.0'}
            </h1>
            <p className="text-amber-700 text-sm">
              {lang === 'fr'
                ? 'Comparez votre projet au pool anonymis\u00e9 mondial'
                : 'Compare your project to the global anonymized pool'}
            </p>
          </div>
        </div>
      </div>

      {/* KPI cards: percentile, category, vs average */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-slate-400 text-sm mb-2">
            {lang === 'fr' ? 'Votre percentile' : 'Your percentile'}
          </div>
          <div className="text-5xl font-bold text-amber-400">
            {comparison.percentileRank}
          </div>
          <div className="text-slate-500 text-sm">/ 100</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-slate-400 text-sm mb-2">
            {lang === 'fr' ? 'Cat\u00e9gorie' : 'Category'}
          </div>
          <div className={"text-2xl font-bold " + categoryColors[comparison.category]}>
            {comparison.category}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-slate-400 text-sm mb-2">
            {lang === 'fr' ? 'vs Moyenne' : 'vs Average'}
          </div>
          <div className={"text-2xl font-bold " + (comparison.vsAverage.adoption.startsWith('+') ? "text-green-400" : "text-red-400")}>
            {comparison.vsAverage.adoption}
          </div>
          <div className="text-slate-500 text-xs">
            {lang === 'fr' ? 'Adoption' : 'Adoption'}
          </div>
        </div>
      </div>

      {/* Pool statistics & top strategies */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Pool statistics */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">
            {"\uD83D\uDCC8"} {lang === 'fr' ? 'Statistiques du pool' : 'Pool statistics'}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">
                {lang === 'fr' ? 'Projets dans le pool' : 'Projects in pool'}
              </span>
              <span className="text-white font-medium">
                {comparison.benchmarks.poolSize}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">
                {lang === 'fr' ? 'Taux de succ\u00e8s' : 'Success rate'}
              </span>
              <span className="text-green-400 font-medium">
                {comparison.benchmarks.successRate}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">
                {lang === 'fr' ? 'Adoption moyenne' : 'Avg adoption'}
              </span>
              <span className="text-white font-medium">
                {comparison.benchmarks.avgAdoptionRate}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">
                {lang === 'fr' ? 'Fid\u00e9lit\u00e9 moyenne' : 'Avg fidelity'}
              </span>
              <span className="text-white font-medium">
                {comparison.benchmarks.avgFidelityScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Top pool strategies */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">
            {"\uD83C\uDFC6"} {lang === 'fr' ? 'Top strat\u00e9gies du pool' : 'Top pool strategies'}
          </h3>
          <div className="space-y-2">
            {comparison.benchmarks.topStrategies.map((ts, i) => (
              <div key={ts.strategy} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-white font-medium">{ts.strategy}</span>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: ts.percentage + '%' }}
                  />
                </div>
                <span className="text-sm text-amber-400">{ts.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      {comparison.insights.length > 0 && (
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">
            {"\uD83D\uDCA1"} {lang === 'fr' ? 'Insights' : 'Insights'}
          </h3>
          <div className="space-y-2">
            {comparison.insights.map((insight, i) => (
              <div
                key={i}
                className={"p-3 rounded-lg " + (insight.priority === 'high'
                  ? "bg-red-500/10 border border-red-500/30"
                  : "bg-yellow-500/10 border border-yellow-500/30")}
              >
                <span className={insight.priority === 'high' ? "text-red-400" : "text-yellow-400"}>
                  {insight.priority === 'high' ? '\u26A0\uFE0F' : '\uD83D\uDCA1'} {insight.message[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
