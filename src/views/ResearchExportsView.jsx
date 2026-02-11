import React, { useState } from 'react';
/* global MoudarEngine, MOUDAR_API_BASE, MOUDAR_API_KEY, safeMoudarFetch */

export default function ResearchExportsView({ project, strategies: strategiesProp, lang, onClose }) {
  const strategies = strategiesProp || [];
  const [selectedExport, setSelectedExport] = useState('SPIRIT');
  const [evaluationPlan, setEvaluationPlan] = useState(null);
  const [evalLoading, setEvalLoading] = useState(false);
  const [evalError, setEvalError] = useState(null);

  const exports = {
    SPIRIT: MoudarEngine.generateSPIRIT(project, strategies, lang),
    TIDieR: MoudarEngine.generateTIDieR(project, strategies, lang),
    StaRI: MoudarEngine.generateStaRI(project, strategies, lang)
  };
  const currentExport = exports[selectedExport];

  const handleGenerateEvaluationPlan = () => {
    if (!MOUDAR_API_BASE) {
      setEvalError(lang === 'fr' ? "API Moudar non configur\u00E9e (MOUDAR_API_BASE)." : "Moudar API not configured (MOUDAR_API_BASE).");
      return;
    }
    setEvalLoading(true);
    setEvalError(null);
    const payload = {
      mode: "evaluation_plan",
      language: lang === 'fr' ? 'fr' : 'en',
      projectPlan: {
        title: project && project.title ? project.title : "",
        domain: project && project.domain ? project.domain : null,
        country: project && project.country ? project.country : null,
        resourceLevel: project && project.resourceLevel ? project.resourceLevel : null,
        setting: project && project.context ? project.context : null,
        phase: project && project.phase ? project.phase : null,
        population: project && project.population ? project.population : null,
        targets: project && project.targets ? project.targets : null,
        barriers: project && project.barriers ? project.barriers : null,
        frameworks: project && project.frameworks ? project.frameworks : null,
        outcomesPlanned: project && project.outcomes ? project.outcomes : null
      },
      recommendation: {
        strategies: (strategies || []).map((s) => ({
          id: s.id || s.code || s.name,
          code: s.code || s.id || null,
          label: s.label && s.label[lang] ? s.label[lang] : s.label || s.name || s.id || "",
          cost: s.cost || null,
          complexity: s.complexity || null
        })),
        frameworks: project && project.frameworks ? project.frameworks : [],
        outcomes: project && project.outcomes ? project.outcomes : []
      },
      constraints: {
        maxWords: 600,
        tone: "academic",
        includeCitations: false
      }
    };
    safeMoudarFetch("/llm_generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": MOUDAR_API_KEY ? "Bearer " + MOUDAR_API_KEY : ""
      },
      body: JSON.stringify(payload)
    }).then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    }).then((data) => {
      if (data && data.text) {
        setEvaluationPlan(data.text);
      } else if (typeof data === "string") {
        setEvaluationPlan(data);
      } else {
        setEvalError(lang === 'fr' ? "R\u00E9ponse inattendue du g\u00E9n\u00E9rateur." : "Unexpected generator response.");
      }
    }).catch((err) => {
      console.error("Moudar /llm_generate error", err);
      setEvalError((lang === 'fr' ? "Erreur de g\u00E9n\u00E9ration : " : "Generation error: ") + err.message);
    }).finally(() => {
      setEvalLoading(false);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDCC4 "}{lang === "fr" ? "Exports Standards Recherche" : "Research Standards Exports"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr" ? "Templates SPIRIT, TIDieR, StaRI pr\u00E9-remplis" : "Pre-filled SPIRIT, TIDieR, StaRI templates"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateEvaluationPlan}
              className="px-3 py-1.5 rounded-lg text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-sm flex items-center gap-2"
            >
              <span>{"\u270D\uFE0F"}</span>
              <span>{lang === "fr" ? "G\u00E9n\u00E9rer le plan d'\u00E9valuation" : "Generate evaluation plan"}</span>
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
          </div>
        </div>

        <div className="p-6">
          {/* Format Selector */}
          <div className="flex gap-3 mb-6">
            {['SPIRIT', 'TIDieR', 'StaRI'].map((format) => {
              const exp = exports[format];
              return (
                <button
                  key={format}
                  onClick={() => setSelectedExport(format)}
                  className={"flex-1 p-4 rounded-xl border-2 transition " + (selectedExport === format ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-400')}
                >
                  <div className="font-bold text-gray-800">{format}</div>
                  <div className="text-sm text-gray-500">{exp.version}</div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={"h-2 rounded-full " + (exp.completionRate >= 70 ? 'bg-green-500' : exp.completionRate >= 40 ? 'bg-yellow-500' : 'bg-red-500')}
                        style={{ width: exp.completionRate + '%' }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{exp.completionRate}% {lang === 'fr' ? 'compl\u00E9t\u00E9' : 'complete'}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Checklist */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-gray-100 p-3 border-b">
              <h3 className="font-bold">{currentExport.type} {currentExport.version} Checklist</h3>
            </div>
            {currentExport.type === 'SPIRIT' ? (
              Object.values(currentExport.sections).map((section, si) => (
                <div key={si} className="border-b last:border-b-0">
                  <div className="bg-gray-50 p-3 font-medium">{section.title}</div>
                  {section.items.map((item, ii) => {
                    const statusColor = item.status === 'complete' ? 'bg-green-100 text-green-700' : item.status === 'partial' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
                    const statusIcon = item.status === 'complete' ? '\u2713' : item.status === 'partial' ? '\u25D0' : '\u25CB';
                    return (
                      <div key={ii} className="p-3 border-t flex gap-3 hover:bg-gray-50">
                        <span className={"w-6 h-6 rounded-full flex items-center justify-center text-xs " + statusColor}>{statusIcon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.id}. {item.item}</div>
                          <div className="text-sm text-gray-600 mt-1">{item.content}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <div>
                {currentExport.items.map((item, i) => {
                  const statusColor = item.status === 'complete' ? 'bg-green-100 text-green-700' : item.status === 'partial' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
                  const statusIcon = item.status === 'complete' ? '\u2713' : item.status === 'partial' ? '\u25D0' : '\u25CB';
                  return (
                    <div key={i} className="p-3 border-t flex gap-3 hover:bg-gray-50">
                      <span className={"w-6 h-6 rounded-full flex items-center justify-center text-xs " + statusColor}>{statusIcon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.id}. {item.item}</div>
                        <div className="text-sm text-gray-600 mt-1">{item.content}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Evaluation Plan */}
        {evaluationPlan && (
          <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4 mx-4 mb-2">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
              {"\u270D\uFE0F "}{lang === 'fr' ? "Plan d'\u00E9valuation g\u00E9n\u00E9r\u00E9 (LLM)" : "Generated evaluation plan (LLM)"}
            </h3>
            {evalError && <p className="text-sm text-red-600 mb-2">{evalError}</p>}
            <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed max-h-64 overflow-auto">
              {evaluationPlan}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {lang === 'fr' ? "Astuce : copiez-collez ce plan dans votre section 'M\u00E9thodes' / 'Plan d'\u00E9valuation' du protocole." : "Tip: copy-paste this plan into your Methods / Evaluation section."}
            </p>
          </div>
        )}

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
