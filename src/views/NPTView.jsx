import React, { useState } from 'react';
/* global NPTEvaluator */

export default function NPTView({ lang = 'fr', project }) {
  const [scores, setScores] = useState({});

  const evaluation = NPTEvaluator.evaluate(project, scores, lang);

  const handleScore = (subId, value) => {
    setScores((prev) => ({ ...prev, [subId]: Number(value) }));
  };

  const scoreColor = (pct) =>
    pct >= 70 ? 'text-green-600' : pct >= 40 ? 'text-yellow-600' : 'text-red-500';

  const scoreBg = (pct) =>
    pct >= 70
      ? 'bg-green-50 border-green-200'
      : pct >= 40
        ? 'bg-yellow-50 border-yellow-200'
        : 'bg-red-50 border-red-200';

  const normBadge = (level) => {
    if (level === 'normalized') return 'bg-green-100 text-green-700';
    if (level === 'emerging') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto fade-in">
      {/* Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-900/50 to-indigo-700/30 rounded-xl border border-blue-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{"\uD83E\uDDE9"}</span>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                {lang === 'fr' ? 'NPT \u2014 Normalization Process Theory' : 'NPT \u2014 Normalization Process Theory'}
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-normal">v11.0</span>
              </h1>
              <p className="text-blue-300 text-sm">
                May &amp; Finch (2009) {"\u2022"} 4 constructs {"\u2022"} 16 sub-constructs
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={"text-4xl font-bold " + scoreColor(evaluation.globalScore)}>
              {evaluation.globalScore}%
            </div>
            <p className="text-xs text-gray-400">
              {lang === 'fr' ? 'Score global NPT' : 'Global NPT Score'}
            </p>
          </div>
        </div>
      </div>

      {/* Construct cards — 2-column grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {Object.keys(evaluation.constructs).map((constructId) => {
          const construct = evaluation.constructs[constructId];
          return (
            <div
              key={constructId}
              className="bg-white rounded-xl shadow-md overflow-hidden border"
              style={{ borderColor: construct.color + '40' }}
            >
              {/* Card header */}
              <div
                className="p-4 flex items-center justify-between"
                style={{ backgroundColor: construct.color + '15' }}
              >
                <div>
                  <h3 className="font-bold text-gray-800">{construct.label}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{construct.description}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-2xl font-bold" style={{ color: construct.color }}>
                    {construct.score}%
                  </div>
                  <span className={"px-2 py-0.5 rounded-full text-xs font-medium " + normBadge(construct.normalizationLevel)}>
                    {construct.normalizationLabel}
                  </span>
                </div>
              </div>

              {/* Sub-constructs with range sliders */}
              <div className="p-4 space-y-4">
                {construct.subConstructs.map((sub) => (
                  <div key={sub.id}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 font-mono">{sub.id}</span>
                        <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                      </div>
                      <span className={"text-sm font-bold " + scoreColor(sub.score)}>
                        {sub.score}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{sub.description}</p>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={scores[sub.id] || 0}
                      onChange={(e) => handleScore(sub.id, e.target.value)}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${construct.color} ${scores[sub.id] || 0}%, #e5e7eb ${scores[sub.id] || 0}%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Citation footer */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500 space-y-1">
        <p className="font-medium text-gray-600">
          {"\uD83D\uDCDA "}{lang === 'fr' ? 'R\u00e9f\u00e9rences' : 'References'}
        </p>
        <p>{"\u2022"} May C &amp; Finch T (2009). Implementation Science, 4:29.</p>
        <p>{"\u2022"} Finch TL et al. (2018). BMC Medical Research Methodology, 18:133 (NoMAD instrument).</p>
        <p>{"\u2022"} Generated by MOUDAR&reg; v11.0 &mdash; AI-Powered Implementation Science Platform. &copy; 2025 Younes MOUDAR.</p>
      </div>
    </div>
  );
}
