import React, { useState } from 'react';
/* global MoudarEngine */

export default function NLPBarrierAnalyzerView({ project, lang, onClose }) {
  const [text, setText] = useState(project.barriers || project.context || '');
  const [analysis, setAnalysis] = useState(null);

  const runAnalysis = () => {
    const result = MoudarEngine.analyzeBarriersNLP(text, lang);
    setAnalysis(result);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83E\uDDE0 "}{lang === "fr" ? "Analyseur NLP des Barri\u00E8res" : "NLP Barrier Analyzer"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr" ? "Intelligence artificielle pour d\u00E9tecter les barri\u00E8res" : "AI to detect barriers"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Text Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === "fr" ? "Texte \u00E0 analyser (contexte, barri\u00E8res, d\u00E9fis...)" : "Text to analyze (context, barriers, challenges...)"}
            </label>
            <textarea
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              rows="6"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={lang === "fr" ? "Collez ou tapez le texte d\u00E9crivant votre contexte et les d\u00E9fis anticip\u00E9s..." : "Paste or type text describing your context and anticipated challenges..."}
            />
            <button
              onClick={runAnalysis}
              className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {"\uD83D\uDD0D "}{lang === "fr" ? "Analyser" : "Analyze"}
            </button>
          </div>

          {/* Results */}
          {analysis && (
            <div className="space-y-4">
              {/* Detected Barriers */}
              <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                <h3 className="font-bold text-red-800 mb-3">
                  {"\u26A0\uFE0F "}{lang === "fr" ? "Barri\u00E8res d\u00E9tect\u00E9es" : "Detected barriers"} ({analysis.barriers.length})
                </h3>
                <div className="space-y-3">
                  {analysis.topBarriers.map((barrier, i) => (
                    <div key={i} className="p-3 bg-white rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800">{barrier.label}</span>
                        <span className={"px-2 py-0.5 rounded text-xs " + (barrier.confidence === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')}>
                          {barrier.score}% {barrier.confidence}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {barrier.keywords.map((kw, j) => (
                          <span key={j} className="px-2 py-0.5 bg-gray-100 rounded text-xs">{kw}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Strategies */}
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h3 className="font-bold text-green-800 mb-3">
                  {"\uD83D\uDCA1 "}{lang === "fr" ? "Strat\u00E9gies recommand\u00E9es" : "Recommended strategies"}
                </h3>
                <div className="space-y-2">
                  {analysis.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-white rounded">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-mono text-sm">{rec.strategyId}</span>
                      <div>
                        <span className="font-medium">{rec.strategyName}</span>
                        <span className="text-gray-500 text-sm ml-2">{rec.reason}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
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
