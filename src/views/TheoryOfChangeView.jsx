import React from 'react';
/* global DOMAINS, PHASES, tObj */

export default function TheoryOfChangeView({ project, protocol, lang, onClose }) {
  if (!project || !protocol) return null;

  const problem = project.context
    ? project.context.substring(0, 150) + "..."
    : (lang === "fr" ? "Probl\u00E8me non d\u00E9fini" : "Problem not defined");

  const barriers = project.barriers
    ? project.barriers.split(/[,;\n]/).slice(0, 4).map((b) => b.trim())
    : [];

  const strategies = protocol.aiRawRecommendations
    ? protocol.aiRawRecommendations.strategies.top.slice(0, 4)
    : [];

  const outcomes = protocol.outcomes
    ? protocol.outcomes.slice(0, 4)
    : ["Adoption", "Fid\u00E9lit\u00E9", "P\u00E9rennit\u00E9"];

  const domainInfo = DOMAINS[project.domain] || {};
  const phaseInfo = PHASES[project.phase] || {};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDD17 "}{lang === "fr" ? "Th\u00E9orie du Changement" : "Theory of Change"}
            </h2>
            <p className="text-sm text-gray-500">{project.title}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Context Tags */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {domainInfo.icon} {tObj(domainInfo, lang)}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {phaseInfo.icon} {tObj(phaseInfo, lang)}
              </span>
              {project.resourceLevel && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {"\uD83D\uDCB0 "}{project.resourceLevel}
                </span>
              )}
            </div>
          </div>

          {/* Causal Logic Diagram */}
          <div className="relative">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                </marker>
              </defs>
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative" style={{ zIndex: 1 }}>
              {/* Problem */}
              <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl p-4 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">{"\uD83C\uDFAF"}</span>
                  <h3 className="font-bold">{lang === "fr" ? "Probl\u00E8me" : "Problem"}</h3>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">{problem}</p>
                <div className="mt-3 text-right text-2xl">{"\u2192"}</div>
              </div>

              {/* Barriers */}
              <div className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl p-4 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">{"\uD83D\uDEA7"}</span>
                  <h3 className="font-bold">{lang === "fr" ? "Barri\u00E8res" : "Barriers"}</h3>
                </div>
                <ul className="space-y-2">
                  {barriers.length > 0 ? (
                    barriers.map((b, i) => (
                      <li key={i} className="text-sm bg-white/20 rounded px-2 py-1">
                        {"\u2022 "}{b}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm italic">
                      {lang === "fr" ? "Non sp\u00E9cifi\u00E9es" : "Not specified"}
                    </li>
                  )}
                </ul>
                <div className="mt-3 text-right text-2xl">{"\u2192"}</div>
              </div>

              {/* Strategies */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-4 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">{"\u26A1"}</span>
                  <h3 className="font-bold">{lang === "fr" ? "Strat\u00E9gies" : "Strategies"}</h3>
                </div>
                <ul className="space-y-2">
                  {strategies.map((s, i) => (
                    <li key={i} className="text-sm bg-white/20 rounded px-2 py-1 flex items-center gap-1">
                      <span className="text-xs opacity-70">{s.id}</span> {s.label ? s.label[lang] : s.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-right text-2xl">{"\u2192"}</div>
              </div>

              {/* Outcomes */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">{"\uD83C\uDFAF"}</span>
                  <h3 className="font-bold">{lang === "fr" ? "R\u00E9sultats attendus" : "Expected Outcomes"}</h3>
                </div>
                <ul className="space-y-2">
                  {outcomes.map((o, i) => {
                    const outcomeLabel = typeof o === "string" ? o : (o.label ? o.label[lang] : o);
                    return (
                      <li key={i} className="text-sm bg-white/20 rounded px-2 py-1">
                        {"\u2713 "}{outcomeLabel}
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3 text-right text-2xl">{"\uD83C\uDFC6"}</div>
              </div>
            </div>
          </div>

          {/* Diagram Legend */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-700 mb-2">
              {lang === "fr" ? "\uD83D\uDCA1 Lecture du diagramme" : "\uD83D\uDCA1 How to read this diagram"}
            </h4>
            <p className="text-sm text-gray-600">
              {lang === "fr"
                ? "Ce diagramme montre la logique causale de votre projet : le probl\u00E8me identifi\u00E9 g\u00E9n\u00E8re des barri\u00E8res, que les strat\u00E9gies s\u00E9lectionn\u00E9es visent \u00E0 surmonter, pour atteindre les r\u00E9sultats attendus."
                : "This diagram shows the causal logic of your project: the identified problem creates barriers, which the selected strategies aim to overcome, to achieve the expected outcomes."}
            </p>
          </div>

          {/* Critical Assumptions */}
          <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <h4 className="font-medium text-amber-800 mb-2">
              {"\u26A0\uFE0F "}{lang === "fr" ? "Hypoth\u00E8ses critiques" : "Critical Assumptions"}
            </h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>{"\u2022 "}{lang === "fr" ? "Les ressources humaines et financi\u00E8res sont disponibles" : "Human and financial resources are available"}</li>
              <li>{"\u2022 "}{lang === "fr" ? "Le contexte politique reste stable" : "Political context remains stable"}</li>
              <li>{"\u2022 "}{lang === "fr" ? "Les parties prenantes maintiennent leur engagement" : "Stakeholders maintain their commitment"}</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
