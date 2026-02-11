import React, { useState } from 'react';
/* global USE_CASES, DOMAINS, tObj */

export default function UseCasesView({ lang }) {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <div className="max-w-3xl mx-auto fade-in">
        <button onClick={() => setSelected(null)} className="text-blue-600 hover:text-blue-800 mb-4">
          {"\u2190 "}{lang === "fr" ? "Retour aux cas" : "Back to cases"}
        </button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="gradient-hero p-6 text-white">
            <h2 className="text-2xl font-bold mb-1">{tObj(selected.title, lang)}</h2>
            <p className="text-white/80">{selected.country} {"\u2022"} {selected.duration} {"\u2022"} {selected.budget}</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">{"\uD83D\uDCCD "}{lang === "fr" ? "Contexte" : "Context"}</h3>
              <p className="text-gray-600">{tObj(selected.context, lang)}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h3 className="font-bold text-green-800 mb-2">{"\uD83D\uDCCA "}{lang === "fr" ? "Résultats" : "Outcomes"}</h3>
                <p className="text-green-700">{tObj(selected.outcomes, lang)}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <h3 className="font-bold text-orange-800 mb-2">{"\uD83D\uDCB0"} ROI</h3>
                <p className="text-orange-700">{tObj(selected.roi, lang)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {"\uD83D\uDCC1 "}{lang === "fr" ? "Cas d'usage documentés" : "Documented use cases"}
        </h2>
        <p className="text-gray-400 text-sm italic mt-2">
          {"\u2139\uFE0F "}{lang === "fr" ? "Cas inspirés de situations réelles, recomposés à des fins pédagogiques" : "Cases inspired by real situations, recomposed for educational purposes"}
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {USE_CASES.map((c) => {
          const domainInfo = DOMAINS[c.domain] || {};
          return (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              className="bg-white rounded-xl shadow-md overflow-hidden card-hover cursor-pointer"
            >
              <div className="p-4 gradient-hero text-white">
                <h3 className="font-bold">{tObj(c.title, lang)}</h3>
                <p className="text-white/80 text-sm">{c.country}</p>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-2">
                  {domainInfo.icon} {tObj(domainInfo, lang)} {"\u2022"} {c.duration}
                </p>
                <p className="text-sm text-gray-600">{tObj(c.context, lang)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
