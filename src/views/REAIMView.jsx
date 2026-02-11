import React from 'react';
/* global MoudarEngine */

export default function REAIMView({ project, strategies: strategiesProp, lang, onClose }) {
  const strategies = strategiesProp || [];
  const evaluation = MoudarEngine.evaluateREAIM(project, strategies, [], lang);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83C\uDFAF "}{lang === "fr" ? "\u00C9valuation RE-AIM" : "RE-AIM Evaluation"}
            </h2>
            <p className="text-sm text-gray-500">
              Reach {"\u2022"} Effectiveness {"\u2022"} Adoption {"\u2022"} Implementation {"\u2022"} Maintenance
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Global Score */}
          <div className={"text-center p-6 rounded-2xl border mb-6 " + (evaluation.globalScore >= 70 ? 'bg-green-50 border-green-200' : evaluation.globalScore >= 50 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200')}>
            <div className={"text-5xl font-bold mb-2 " + ((evaluation.globalScore || 0) >= 70 ? 'text-green-600' : (evaluation.globalScore || 0) >= 50 ? 'text-yellow-600' : 'text-red-600')}>
              {evaluation.globalScore || 0}%
            </div>
            <p className="text-gray-600 font-medium">{evaluation.levelLabel || ""}</p>
          </div>

          {/* Radar Data */}
          <div className="grid md:grid-cols-5 gap-4 mb-6">
            {(evaluation.radarData || []).map((dim) => (
              <div
                key={dim.dimension}
                className="text-center p-4 rounded-xl border"
                style={{ borderColor: dim.color || '#6b7280' }}
              >
                <div className="text-3xl font-bold" style={{ color: dim.color || '#6b7280' }}>
                  {dim.score || 0}%
                </div>
                <div className="text-sm font-medium text-gray-700">{dim.dimension || ""}</div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: (dim.score || 0) + '%', backgroundColor: dim.color || '#6b7280' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dimensions Detail */}
          <div className="space-y-4">
            {Object.values(evaluation.dimensions || {}).map((dim) => (
              <div
                key={dim.id}
                className="p-4 rounded-xl border"
                style={{ borderColor: dim.color || '#6b7280' }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800">{dim.label || ""}</h3>
                    <p className="text-sm text-gray-500">{dim.description || ""}</p>
                  </div>
                  <span className="text-2xl font-bold" style={{ color: dim.color || '#6b7280' }}>
                    {dim.score || 0}%
                  </span>
                </div>
                {dim.strategiesMissing && dim.strategiesMissing.length > 0 && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                    <p className="text-sm text-amber-700">
                      {"\uD83D\uDCA1 "}{lang === 'fr' ? 'Strat\u00E9gies recommand\u00E9es:' : 'Recommended strategies:'} {dim.strategiesMissing.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            ))}
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
