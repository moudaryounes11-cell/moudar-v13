import React, { useState } from 'react';
/* global SustainabilityEngine */

export default function SustainabilityView({ lang = 'fr' }) {
  const [activeTab, setActiveTab] = useState('psat');
  const [psatScores, setPsatScores] = useState({});
  const [dsfScores, setDsfScores] = useState({});

  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const updatePsatScore = (key, value) => {
    setPsatScores((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const updateDsfScore = (key, value) => {
    setDsfScores((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const evaluation = SustainabilityEngine.evaluate(psatScores, dsfScores, lang);

  const psatDomains = SustainabilityEngine.psatDomains;
  const dsfDimensions = SustainabilityEngine.dsfDimensions;

  const scoreColor = (score) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const severityStyle = (severity) => {
    if (severity === 'critical') return 'bg-red-500/20 border-red-500/40 text-red-400';
    return 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400';
  };

  const tabs = [
    { id: 'psat', label: t('PSAT (8 domaines)', 'PSAT (8 domains)'), icon: '\uD83D\uDCCA' },
    { id: 'dsf', label: t('DSF (4 dimensions)', 'DSF (4 dimensions)'), icon: '\uD83D\uDD04' },
    { id: 'risks', label: t('Risques & Recommandations', 'Risks & Recommendations'), icon: '\u26A0\uFE0F' }
  ];

  return (
    <div className="fade-in">
      {/* Header banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-emerald-900/50 to-emerald-700/30 rounded-xl border border-emerald-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\u267B\uFE0F"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t('\u00C9valuation de la p\u00E9rennit\u00E9', 'Sustainability Assessment')}
              <span className="ml-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full font-normal">D6</span>
            </h1>
            <p className="text-emerald-300 text-sm">
              {SustainabilityEngine.psatCitation}
            </p>
          </div>
        </div>
      </div>

      {/* Global scores */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-slate-400 text-sm mb-2">
            {t('Score PSAT global', 'Global PSAT Score')}
          </div>
          <div className={"text-5xl font-bold " + scoreColor(evaluation.psat.globalScore)}>
            {evaluation.psat.globalScore}%
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-slate-400 text-sm mb-2">
            {t('Indice de p\u00E9rennit\u00E9', 'Sustainability Index')}
          </div>
          <div className={"text-5xl font-bold " + scoreColor(evaluation.sustainabilityIndex)}>
            {evaluation.sustainabilityIndex}%
          </div>
          <div className="text-slate-500 text-xs mt-1">PSAT 60% + DSF 40%</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-slate-400 text-sm mb-2">
            {t('Risques identifi\u00E9s', 'Risks Identified')}
          </div>
          <div className={
            "text-5xl font-bold " +
            (evaluation.risks.length === 0 ? "text-green-400" : evaluation.risks.length <= 2 ? "text-yellow-400" : "text-red-400")
          }>
            {evaluation.risks.length}
          </div>
          <div className="text-slate-500 text-xs mt-1">
            / {Object.keys(psatDomains).length} {t('domaines', 'domains')}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap " +
              (activeTab === tab.id
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700")
            }
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: PSAT */}
      {activeTab === 'psat' && (
        <div className="space-y-4">
          <p className="text-slate-400 text-xs mb-2">{SustainabilityEngine.psatCitation}</p>

          {Object.keys(psatDomains).map((domKey) => {
            const domain = psatDomains[domKey];
            const currentScore = psatScores[domKey] || 0;
            const evalDomain = evaluation.psat.domains[domKey] || {};

            return (
              <div
                key={domKey}
                className="bg-slate-800 rounded-xl p-5 border border-slate-700"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-sm" style={{ color: domain.color }}>
                    {domain.label[lang]}
                  </h3>
                  <span className={"text-xl font-bold " + scoreColor(currentScore)}>
                    {currentScore}%
                  </span>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={currentScore}
                  onChange={(e) => updatePsatScore(domKey, e.target.value)}
                  className="w-full mb-3"
                />
                <div className="flex justify-between text-xs text-slate-600 mb-4">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>

                {/* Domain items */}
                <div className="space-y-1">
                  {domain.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-400 p-1.5 rounded bg-slate-900/30"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: domain.color }}
                      />
                      {item[lang]}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: DSF */}
      {activeTab === 'dsf' && (
        <div className="space-y-4">
          <p className="text-slate-400 text-xs mb-2">{SustainabilityEngine.dsfCitation}</p>

          {Object.keys(dsfDimensions).map((dimKey) => {
            const dimension = dsfDimensions[dimKey];
            const currentScore = dsfScores[dimKey] || 0;

            return (
              <div
                key={dimKey}
                className="bg-slate-800 rounded-xl p-5 border border-slate-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-bold text-sm">{dimension.label[lang]}</h3>
                  <span className={"text-xl font-bold " + scoreColor(currentScore)}>
                    {currentScore}%
                  </span>
                </div>
                <p className="text-slate-400 text-xs mb-3">{dimension.description[lang]}</p>

                {/* Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={currentScore}
                  onChange={(e) => updateDsfScore(dimKey, e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            );
          })}

          {/* DSF summary from evaluation */}
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-white font-bold text-sm mb-3">
              {"\uD83D\uDD04"} {t('R\u00E9sum\u00E9 DSF', 'DSF Summary')}
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.keys(evaluation.dsf).map((dimKey) => {
                const dim = evaluation.dsf[dimKey];
                return (
                  <div
                    key={dimKey}
                    className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg"
                  >
                    <span className="text-slate-300 text-sm">{dim.label[lang]}</span>
                    <span className={"font-bold " + scoreColor(dim.score)}>{dim.score}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Risks */}
      {activeTab === 'risks' && (
        <div className="space-y-6">
          {/* Risk list */}
          {evaluation.risks.length > 0 ? (
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h3 className="text-white font-bold text-sm mb-4">
                {"\u26A0\uFE0F"} {t('Risques de p\u00E9rennit\u00E9 identifi\u00E9s', 'Identified Sustainability Risks')}
              </h3>
              <div className="space-y-3">
                {evaluation.risks.map((risk, i) => (
                  <div
                    key={i}
                    className={"p-4 rounded-lg border " + severityStyle(risk.severity)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>
                          {risk.severity === 'critical' ? '\uD83D\uDD34' : '\uD83D\uDFE1'}
                        </span>
                        <span className="font-semibold text-sm">
                          {risk.domain[lang]}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs uppercase tracking-wider">
                          {risk.severity === 'critical'
                            ? t('Critique', 'Critical')
                            : t('Mod\u00E9r\u00E9', 'Moderate')}
                        </span>
                        <span className="font-bold text-lg">{risk.score}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-xl p-8 border border-green-500/30 text-center">
              <div className="text-5xl mb-3">{"\u2705"}</div>
              <h3 className="text-green-400 font-bold text-lg mb-1">
                {t('Aucun risque majeur d\u00E9tect\u00E9', 'No Major Risks Detected')}
              </h3>
              <p className="text-slate-400 text-sm">
                {t(
                  'Tous les domaines PSAT sont au-dessus du seuil critique de 50%.',
                  'All PSAT domains are above the 50% critical threshold.'
                )}
              </p>
            </div>
          )}

          {/* Recommendations */}
          {evaluation.recommendations.length > 0 && (
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h3 className="text-white font-bold text-sm mb-4">
                {"\uD83D\uDCA1"} {t('Recommandations', 'Recommendations')}
              </h3>
              <div className="space-y-2">
                {evaluation.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                  >
                    <span className="text-blue-400 mt-0.5">{"\u2192"}</span>
                    <p className="text-slate-300 text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overall sustainability summary */}
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-white font-bold text-sm mb-4">
              {"\uD83D\uDCCB"} {t('R\u00E9sum\u00E9 global', 'Overall Summary')}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* PSAT domains overview */}
              <div className="space-y-2">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  {t('Domaines PSAT', 'PSAT Domains')}
                </h4>
                {Object.keys(evaluation.psat.domains).map((domKey) => {
                  const dom = evaluation.psat.domains[domKey];
                  return (
                    <div key={domKey} className="flex items-center gap-3">
                      <span className="text-slate-300 text-xs flex-1">{dom.label[lang]}</span>
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: dom.score + '%',
                            backgroundColor: dom.color
                          }}
                        />
                      </div>
                      <span className={"text-xs font-bold w-8 text-right " + scoreColor(dom.score)}>
                        {dom.score}%
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* DSF dimensions overview */}
              <div className="space-y-2">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  {t('Dimensions DSF', 'DSF Dimensions')}
                </h4>
                {Object.keys(evaluation.dsf).map((dimKey) => {
                  const dim = evaluation.dsf[dimKey];
                  return (
                    <div key={dimKey} className="flex items-center gap-3">
                      <span className="text-slate-300 text-xs flex-1">{dim.label[lang]}</span>
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: dim.score + '%' }}
                        />
                      </div>
                      <span className={"text-xs font-bold w-8 text-right " + scoreColor(dim.score)}>
                        {dim.score}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer citations */}
      <div className="mt-6 text-center text-xs text-slate-600">
        {SustainabilityEngine.psatCitation} {"\u2022"} {SustainabilityEngine.dsfCitation} {"\u2022"} MOUDAR&reg; v11.0
      </div>
    </div>
  );
}
