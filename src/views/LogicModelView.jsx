import React from 'react';
/* global MoudarEngine */

export default function LogicModelView({ project, strategies: strategiesProp, lang, onClose }) {
  const strategies = strategiesProp || [];
  const model = MoudarEngine.generateLogicModel(project, strategies, lang);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDD04 "}{lang === "fr" ? "Mod\u00E8le Logique" : "Logic Model"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr" ? "Inputs \u2192 Activit\u00E9s \u2192 Outputs \u2192 Outcomes \u2192 Impact" : "Inputs \u2192 Activities \u2192 Outputs \u2192 Outcomes \u2192 Impact"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Logic Model Flow */}
          <div className="flex gap-2 overflow-x-auto pb-4">
            {/* Inputs */}
            <div className="min-w-48 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3 text-center">INPUTS</h3>
              <div className="space-y-2">
                {model.inputs.map((input) => (
                  <div key={input.id} className="p-2 bg-white rounded text-sm">
                    <div className="font-medium">{input.label}</div>
                    <div className="text-blue-600">{input.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center text-3xl text-gray-400">{"\u2192"}</div>

            {/* Activities */}
            <div className="min-w-48 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <h3 className="font-bold text-purple-800 mb-3 text-center">
                {lang === "fr" ? "ACTIVIT\u00C9S" : "ACTIVITIES"}
              </h3>
              <div className="space-y-2">
                {model.activities.map((act) => (
                  <div key={act.id} className="p-2 bg-white rounded text-sm">{act.label}</div>
                ))}
              </div>
            </div>

            <div className="flex items-center text-3xl text-gray-400">{"\u2192"}</div>

            {/* Outputs */}
            <div className="min-w-48 p-4 bg-green-50 rounded-xl border border-green-200">
              <h3 className="font-bold text-green-800 mb-3 text-center">OUTPUTS</h3>
              <div className="space-y-2">
                {model.outputs.map((output) => (
                  <div key={output.id} className="p-2 bg-white rounded text-sm">
                    <div className="font-medium">{output.label}</div>
                    <div className="text-green-600">{output.target}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center text-3xl text-gray-400">{"\u2192"}</div>

            {/* Outcomes */}
            <div className="min-w-56 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-3 text-center">OUTCOMES</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium text-amber-600 mb-1">
                    {lang === "fr" ? "Court terme" : "Short term"}
                  </div>
                  {model.outcomes.shortTerm.map((o) => (
                    <div key={o.id} className="p-1 bg-white rounded text-xs mb-1">{o.label}</div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-medium text-amber-600 mb-1">
                    {lang === "fr" ? "Moyen terme" : "Medium term"}
                  </div>
                  {model.outcomes.mediumTerm.map((o) => (
                    <div key={o.id} className="p-1 bg-white rounded text-xs mb-1">{o.label}</div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-medium text-amber-600 mb-1">
                    {lang === "fr" ? "Long terme" : "Long term"}
                  </div>
                  {model.outcomes.longTerm.map((o) => (
                    <div key={o.id} className="p-1 bg-white rounded text-xs mb-1">{o.label}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center text-3xl text-gray-400">{"\u2192"}</div>

            {/* Impact */}
            <div className="min-w-48 p-4 bg-red-50 rounded-xl border border-red-200">
              <h3 className="font-bold text-red-800 mb-3 text-center">IMPACT</h3>
              <div className="p-3 bg-white rounded text-sm text-center">
                <div className="text-3xl mb-2">{"\uD83C\uDFAF"}</div>
                <p className="text-gray-700">{model.impact.statement}</p>
              </div>
            </div>
          </div>

          {/* Assumptions & External Factors */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-gray-700 mb-2">
                {lang === "fr" ? "Hypoth\u00E8ses" : "Assumptions"}
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {model.assumptions.map((a, i) => (
                  <li key={i}>{"\u2022 "}{a}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-gray-700 mb-2">
                {lang === "fr" ? "Facteurs externes" : "External factors"}
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {model.externalFactors.map((f, i) => (
                  <li key={i}>{"\u2022 "}{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
