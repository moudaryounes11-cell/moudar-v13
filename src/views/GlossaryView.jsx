import React, { useState } from 'react';
/* global MoudarEngine */

export default function GlossaryView({ onClose, lang }) {
  const [selected, setSelected] = useState('CFIR');
  let glossary = MoudarEngine.getGlossary ? MoudarEngine.getGlossary(lang) : [];
  const entry = MoudarEngine.getGlossaryEntry ? MoudarEngine.getGlossaryEntry(selected, lang) : null;

  // Fallback if glossary empty
  if (!glossary || glossary.length === 0) {
    glossary = [
      { term: 'CFIR', fullName: 'Consolidated Framework for Implementation Research' },
      { term: 'RE-AIM', fullName: 'Reach Effectiveness Adoption Implementation Maintenance' },
      { term: 'ERIC', fullName: 'Expert Recommendations for Implementing Change' }
    ];
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {"\uD83D\uDCDA "}{lang === "fr" ? "Glossaire Science de la mise en \u0153uvre" : "Implementation Science Glossary"}
              </h2>
              <p className="text-white/80">
                {lang === "fr" ? "Cadres, mod\u00E8les et concepts cl\u00E9s" : "Key frameworks, models and concepts"}
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">{"\u2715"}</button>
          </div>
        </div>

        <div className="flex h-[60vh]">
          {/* Sidebar */}
          <div className="w-1/3 border-r bg-gray-50 p-4 overflow-y-auto">
            {glossary.map((g) => (
              <button
                key={g.term}
                onClick={() => setSelected(g.term)}
                className={"w-full text-left p-3 rounded-lg mb-2 transition " + (selected === g.term ? "bg-emerald-100 border-2 border-emerald-500" : "bg-white hover:bg-gray-100")}
              >
                <div className="font-bold text-gray-800">{g.term}</div>
                <div className="text-xs text-gray-500 truncate">{g.fullName}</div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="w-2/3 p-6 overflow-y-auto">
            {entry && (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{entry.term}</h3>
                <p className="text-emerald-600 mb-4">{entry.fullName}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">{lang === "fr" ? "D\u00E9finition" : "Definition"}</h4>
                  <p className="text-gray-600">{entry.definition}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">{lang === "fr" ? "Composantes" : "Components"}</h4>
                  <div className="flex flex-wrap gap-2">
                    {entry.domains.map((d, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">{d}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">{lang === "fr" ? "Cas d'usage" : "Use cases"}</h4>
                  <ul className="space-y-1">
                    {entry.useCases.map((u, i) => (
                      <li key={i} className="text-gray-600 flex items-center gap-2">
                        <span className="text-emerald-500">{"\u2713"}</span> {u}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs text-gray-400">
                  {lang === "fr" ? "R\u00E9f\u00E9rence" : "Reference"}: {entry.reference}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
