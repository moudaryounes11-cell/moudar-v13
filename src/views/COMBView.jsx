import React, { useState } from 'react';
/* global COMBDiagnostic */

export default function COMBView({ lang = 'fr' }) {
  const [activeTab, setActiveTab] = useState('diagnosis');
  const [scores, setScores] = useState({});

  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const updateScore = (id, value) => {
    setScores((prev) => ({ ...prev, [id]: Number(value) }));
  };

  const result = COMBDiagnostic.diagnose(scores, lang);

  const comB = COMBDiagnostic.comB;
  const tdfDomains = COMBDiagnostic.tdfDomains;
  const interventionFunctions = COMBDiagnostic.interventionFunctions;

  const scoreColor = (score) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const scoreBg = (score) => {
    if (score >= 70) return 'bg-green-500/20 border-green-500/30';
    if (score >= 40) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const tabs = [
    { id: 'diagnosis', label: t('Diagnostic COM-B', 'COM-B Diagnosis'), icon: '\uD83E\uDDE0' },
    { id: 'tdf', label: t('Domaines TDF', 'TDF Domains'), icon: '\uD83D\uDD2C' },
    { id: 'bcw', label: t('Fonctions BCW', 'BCW Functions'), icon: '\u2699\uFE0F' }
  ];

  return (
    <div className="fade-in">
      {/* Header banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-900/50 to-blue-700/30 rounded-xl border border-blue-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\uD83E\uDDE0"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t('Diagnostic COM-B', 'COM-B Diagnostic')}
              <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full font-normal">D4</span>
            </h1>
            <p className="text-blue-300 text-sm">
              {COMBDiagnostic.citation}
            </p>
          </div>
        </div>
      </div>

      {/* Global score */}
      <div className="mb-6 p-6 bg-slate-800 rounded-xl border border-slate-700 text-center">
        <div className="text-slate-400 text-sm mb-2">
          {t('Score global COM-B', 'Global COM-B Score')}
        </div>
        <div className={"text-5xl font-bold " + scoreColor(result.globalScore)}>
          {result.globalScore}%
        </div>
        <div className="text-slate-500 text-xs mt-1">
          {t('3 composantes, 6 sous-composantes', '3 components, 6 sub-components')}
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
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700")
            }
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Diagnosis */}
      {activeTab === 'diagnosis' && (
        <div className="space-y-6">
          {Object.keys(comB).map((compKey) => {
            const comp = comB[compKey];
            const compResult = result.components[compKey] || { score: 0, subScores: {} };

            return (
              <div
                key={compKey}
                className="bg-slate-800 rounded-xl p-5 border border-slate-700"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold" style={{ color: comp.color }}>
                    {comp.label[lang]}
                  </h3>
                  <span className={"text-2xl font-bold " + scoreColor(compResult.score)}>
                    {compResult.score}%
                  </span>
                </div>

                <div className="space-y-4">
                  {Object.keys(comp.subComponents).map((subKey) => {
                    const sub = comp.subComponents[subKey];
                    const currentScore = scores[sub.id] || 0;

                    return (
                      <div key={sub.id} className="bg-slate-900/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <span className="text-white font-medium">{sub.label[lang]}</span>
                            <p className="text-slate-500 text-xs mt-0.5">{sub.description[lang]}</p>
                          </div>
                          <span className={"text-lg font-bold " + scoreColor(currentScore)}>
                            {currentScore}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={currentScore}
                          onChange={(e) => updateScore(sub.id, e.target.value)}
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
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: TDF Domains */}
      {activeTab === 'tdf' && (
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-2">
            {"\uD83D\uDD2C"} {t('14 Domaines du Theoretical Domains Framework', '14 Theoretical Domains Framework Domains')}
          </h3>
          <p className="text-slate-400 text-xs mb-4">{COMBDiagnostic.tdfCitation}</p>

          <div className="space-y-2">
            {tdfDomains.map((tdf) => {
              const matchingAnalysis = result.tdfAnalysis.find(
                (a) => a.domain.fr === tdf.name.fr || a.domain.en === tdf.name.en
              );
              const isWeak = !!matchingAnalysis;

              return (
                <div
                  key={tdf.id}
                  className={
                    "flex items-start gap-3 p-3 rounded-lg border " +
                    (isWeak
                      ? "bg-red-500/10 border-red-500/30"
                      : "bg-slate-900/50 border-slate-700")
                  }
                >
                  <span className="text-xs font-mono text-slate-500 mt-0.5 w-12 shrink-0">
                    {tdf.id}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="text-white font-medium text-sm">{tdf.name[lang]}</span>
                      <span className="text-xs text-slate-500 shrink-0 ml-2">
                        {t('COM-B:', 'COM-B:')} {tdf.comB}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">{tdf.description[lang]}</p>
                    {isWeak && (
                      <div className="mt-2 text-xs text-red-400">
                        {"\u26A0\uFE0F"} {t('Score faible d\u00E9tect\u00E9:', 'Low score detected:')} {matchingAnalysis.score}%
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: BCW Intervention Functions */}
      {activeTab === 'bcw' && (
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-2">
            {"\u2699\uFE0F"} {t('9 Fonctions d\'intervention (BCW)', '9 Intervention Functions (BCW)')}
          </h3>
          <p className="text-slate-400 text-xs mb-4">{COMBDiagnostic.citation}</p>

          <div className="grid md:grid-cols-3 gap-4">
            {Object.keys(interventionFunctions).map((funcKey) => {
              const func = interventionFunctions[funcKey];
              const isRecommended = result.recommendations.some(
                (r) =>
                  (r.function.fr === func.label.fr || r.function.en === func.label.en)
              );

              return (
                <div
                  key={funcKey}
                  className={
                    "p-4 rounded-xl border transition-all " +
                    (isRecommended
                      ? "bg-green-500/10 border-green-500/40 shadow-lg shadow-green-500/10"
                      : "bg-slate-900/50 border-slate-700")
                  }
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-semibold text-sm">{func.label[lang]}</h4>
                    {isRecommended && (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                        {t('Recommand\u00E9', 'Recommended')}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs mb-3">{func.description[lang]}</p>
                  <div className="flex flex-wrap gap-1">
                    {func.comB.map((target) => (
                      <span
                        key={target}
                        className="px-1.5 py-0.5 bg-slate-700 text-slate-300 text-xs rounded"
                      >
                        {target}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendations summary */}
          {result.recommendations.length > 0 && (
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <h4 className="text-blue-400 font-semibold text-sm mb-3">
                {"\uD83D\uDCA1"} {t('Recommandations bas\u00E9es sur vos scores', 'Recommendations based on your scores')}
              </h4>
              <div className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-300"
                  >
                    <span className="text-blue-400 mt-0.5">{"\u2192"}</span>
                    <span>
                      <strong>{rec.function[lang]}</strong>
                      {' \u2192 '}
                      {rec.target[lang]}
                      <span className="text-slate-500 ml-1">({rec.rationale[lang]})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer citation */}
      <div className="mt-6 text-center text-xs text-slate-600">
        {COMBDiagnostic.citation} {"\u2022"} {COMBDiagnostic.tdfCitation} {"\u2022"} MOUDAR&reg; v11.0
      </div>
    </div>
  );
}
