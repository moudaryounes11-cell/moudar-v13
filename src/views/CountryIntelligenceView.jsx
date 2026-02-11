import React, { useState } from 'react';
/* global MoudarEngine */

export default function CountryIntelligenceView({ project, lang, onClose, onSelectCountry }) {
  const countries = MoudarEngine.listCountries(lang);
  const [selectedCountry, setSelectedCountry] = useState(project.country || null);
  const report = selectedCountry ? MoudarEngine.getCountryReport(selectedCountry, lang) : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83C\uDF0D "}{lang === "fr" ? "Intelligence Contextuelle Pays" : "Country Context Intelligence"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr" ? "Adaptez vos strat\u00E9gies au contexte local" : "Adapt your strategies to local context"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Country Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === "fr" ? "S\u00E9lectionner un pays" : "Select a country"}
            </label>
            <select
              value={selectedCountry || ""}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-3 border rounded-xl text-lg"
            >
              <option value="">{lang === "fr" ? "-- Choisir --" : "-- Select --"}</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>{c.name} ({c.income})</option>
              ))}
            </select>
          </div>

          {report && (
            <>
              {/* Indicators */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-700">${report.indicators.gdpPerCapita.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{lang === "fr" ? "PIB/habitant" : "GDP/capita"}</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-purple-700">{report.indicators.psychiatristsPer100k}</div>
                  <div className="text-sm text-gray-600">{lang === "fr" ? "Psychiatres/100k" : "Psychiatrists/100k"}</div>
                </div>
                <div className="p-4 bg-green-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-green-700">{report.indicators.amoCouverage}%</div>
                  <div className="text-sm text-gray-600">{lang === "fr" ? "Couverture sant\u00E9" : "Health coverage"}</div>
                </div>
              </div>

              {/* Income Level */}
              <div className={"mb-6 p-4 rounded-xl border " + (report.income === 'HIC' ? 'bg-green-50 border-green-200' : report.income === 'UMIC' ? 'bg-blue-50 border-blue-200' : report.income === 'LMIC' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200')}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {report.income === 'HIC' ? '\uD83D\uDC8E' : report.income === 'UMIC' ? '\uD83D\uDD37' : report.income === 'LMIC' ? '\uD83D\uDD36' : '\uD83D\uDD38'}
                  </span>
                  <div>
                    <div className="font-bold">{report.incomeLevel}</div>
                    <div className="text-sm text-gray-600">
                      {lang === "fr" ? "Langues" : "Languages"}: {report.languages.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority Barriers */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">
                  {"\uD83D\uDEA7 "}{lang === "fr" ? "Barri\u00E8res prioritaires dans ce contexte" : "Priority barriers in this context"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(report.priorityBarriers || []).map((b) => {
                    const barrier = MoudarEngine.getKnowledgeGraph().nodes.barriers[b];
                    return (
                      <span key={b} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                        {barrier ? barrier.label[lang] : b}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                <h3 className="font-bold text-indigo-800 mb-3">
                  {"\uD83D\uDCA1 "}{lang === "fr" ? "Recommandations contextuelles" : "Contextual recommendations"}
                </h3>
                <ul className="space-y-2">
                  {(report.recommendations || []).map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-indigo-700">
                      <span className="text-indigo-500">{"\u2192"}</span> {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strategy Adaptations */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">
                  {"\u2699\uFE0F "}{lang === "fr" ? "Adaptations des strat\u00E9gies" : "Strategy adaptations"}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(report.adaptations || {}).map(([sid, mult]) => {
                    const strategy = MoudarEngine.getKnowledgeGraph().nodes.strategies[sid];
                    const color = mult > 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
                    return (
                      <div key={sid} className={"p-2 rounded-lg text-center text-sm " + color}>
                        <div className="font-medium">{strategy ? strategy.label[lang] : sid}</div>
                        <div>{mult > 1 ? '\u2191' : '\u2193'} {Math.round((mult - 1) * 100)}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between">
          {selectedCountry && onSelectCountry && (
            <button
              onClick={() => { onSelectCountry(selectedCountry); onClose(); }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {lang === "fr" ? "Appliquer ce contexte" : "Apply this context"}
            </button>
          )}
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 ml-auto">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
