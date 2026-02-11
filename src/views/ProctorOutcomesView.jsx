import React, { useState } from 'react';
/* global ImplementationOutcomes */

export default function ProctorOutcomesView({ lang = 'fr', project }) {
  const [scores, setScores] = useState({});

  const evaluation = ImplementationOutcomes.evaluate(scores, lang);

  const handleScore = (outcomeId, value) => {
    setScores((prev) => ({ ...prev, [outcomeId]: Number(value) }));
  };

  const scoreColor = (pct) =>
    pct >= 70 ? 'text-green-600' : pct >= 40 ? 'text-yellow-600' : 'text-red-500';

  const statusBadge = (status) => {
    if (status === 'strong') return 'bg-green-100 text-green-700';
    if (status === 'moderate') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-600';
  };

  const statusLabel = (status) => {
    if (status === 'strong') return lang === 'fr' ? 'Fort' : 'Strong';
    if (status === 'moderate') return lang === 'fr' ? 'Mod\u00e9r\u00e9' : 'Moderate';
    return lang === 'fr' ? 'Faible' : 'Weak';
  };

  return (
    <div className="max-w-6xl mx-auto fade-in">
      {/* Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-teal-900/50 to-teal-700/30 rounded-xl border border-teal-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{"\uD83C\uDFAF"}</span>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                {lang === 'fr' ? 'Outcomes d\'Impl\u00e9mentation (Proctor)' : 'Implementation Outcomes (Proctor)'}
                <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full font-normal">v11.0</span>
              </h1>
              <p className="text-teal-300 text-sm">
                Proctor et al. (2011) {"\u2022"} 8 {lang === 'fr' ? 'outcomes distincts' : 'distinct outcomes'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={"text-4xl font-bold " + scoreColor(evaluation.globalScore)}>
              {evaluation.globalScore}%
            </div>
            <p className="text-xs text-gray-400">
              {lang === 'fr' ? 'Score global' : 'Global Score'}
            </p>
          </div>
        </div>
      </div>

      {/* Info box about Proctor taxonomy */}
      <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h4 className="font-bold text-blue-800 text-sm mb-1">
          {"\u2139\uFE0F "}{lang === 'fr' ? 'Taxonomie de Proctor' : 'Proctor Taxonomy'}
        </h4>
        <p className="text-xs text-blue-700">
          {lang === 'fr'
            ? 'La taxonomie de Proctor et al. (2011) distingue 8 outcomes d\'impl\u00e9mentation qui sont conceptuellement distincts des outcomes de service et des outcomes cliniques/patients. Ces outcomes sont des indicateurs interm\u00e9diaires essentiels pour \u00e9valuer le succ\u00e8s de l\'impl\u00e9mentation avant de mesurer l\'efficacit\u00e9 clinique.'
            : 'Proctor et al. (2011) taxonomy distinguishes 8 implementation outcomes that are conceptually distinct from service outcomes and clinical/patient outcomes. These outcomes are essential intermediate indicators for evaluating implementation success before measuring clinical effectiveness.'}
        </p>
      </div>

      {/* Outcome cards — 2-column grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {Object.keys(evaluation.outcomes).map((outcomeId) => {
          const outcome = evaluation.outcomes[outcomeId];
          return (
            <div
              key={outcomeId}
              className="bg-white rounded-xl shadow-md overflow-hidden border"
              style={{ borderColor: outcome.color + '40' }}
            >
              {/* Card header */}
              <div
                className="p-4"
                style={{ backgroundColor: outcome.color + '15' }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-800">{outcome.label}</h3>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold" style={{ color: outcome.color }}>
                      {outcome.score}%
                    </div>
                    <span className={"px-2 py-0.5 rounded-full text-xs font-medium " + statusBadge(outcome.status)}>
                      {statusLabel(outcome.status)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{outcome.definition}</p>
              </div>

              {/* Slider */}
              <div className="p-4">
                <div className="mb-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scores[outcomeId] || 0}
                    onChange={(e) => handleScore(outcomeId, e.target.value)}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${outcome.color} ${scores[outcomeId] || 0}%, #e5e7eb ${scores[outcomeId] || 0}%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                    <span>0</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Instruments */}
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    {lang === 'fr' ? 'Instruments de mesure' : 'Measurement instruments'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {outcome.instruments.map((inst, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CFIR links */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    {lang === 'fr' ? 'Liens CFIR' : 'CFIR Links'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {outcome.cfirLink.map((link, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full font-mono"
                      >
                        {link}
                      </span>
                    ))}
                  </div>
                </div>
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
        <p>{"\u2022"} Proctor E, Silmere H, Raghavan R, et al. (2011). Administration and Policy in Mental Health, 38:65-76.</p>
        <p>{"\u2022"} Weiner BJ et al. (2017). Implementation Science, 12:108 (AIM/IAM/FIM psychometric validation).</p>
        <p>{"\u2022"} Lewis CC et al. (2015). Implementation Science, 10:2 (Measurement instruments).</p>
        <p>{"\u2022"} Generated by MOUDAR&reg; v11.0 &mdash; AI-Powered Implementation Science Platform. &copy; 2025 Younes MOUDAR.</p>
      </div>
    </div>
  );
}
