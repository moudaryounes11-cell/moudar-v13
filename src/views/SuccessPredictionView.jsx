import React, { useState } from 'react';
/* global MoudarEngine, MOUDAR_API_BASE, MOUDAR_API_KEY, safeMoudarFetch */

export default function SuccessPredictionView({ project, strategies: strategiesProp, lang, onClose }) {
  const strategies = strategiesProp || [];

  const defaultPrediction = {
    probability: 50,
    confidence: "medium",
    details: { positive: [], negative: [], synergies: [] },
    strategyContribution: 0,
    synergyBonus: 0,
    riskPenalty: 0,
    improvements: []
  };

  const [localPrediction] = useState(() => {
    try {
      const result = MoudarEngine.predictSuccess(project, strategies, lang);
      result.details = result.details || defaultPrediction.details;
      result.details.positive = result.details.positive || [];
      result.details.negative = result.details.negative || [];
      result.details.synergies = result.details.synergies || [];
      result.improvements = result.improvements || [];
      result.strategyContribution = result.strategyContribution || 0;
      result.synergyBonus = result.synergyBonus || 0;
      result.riskPenalty = result.riskPenalty || 0;
      return result;
    } catch (e) {
      console.error("Local prediction error", e);
      return defaultPrediction;
    }
  });

  const [apiPrediction, setApiPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const prediction = apiPrediction || localPrediction || defaultPrediction;
  const probColor = prediction.probability >= 70 ? "text-green-600" : prediction.probability >= 50 ? "text-yellow-600" : "text-red-600";
  const probBg = prediction.probability >= 70
    ? "from-green-50 to-emerald-50 border-green-200"
    : prediction.probability >= 50
      ? "from-amber-50 to-yellow-50 border-yellow-200"
      : "from-red-50 to-orange-50 border-red-200";

  const callApiPrediction = () => {
    if (!MOUDAR_API_BASE) {
      setError(lang === "fr" ? "API Moudar non configur\u00E9e (MOUDAR_API_BASE)." : "Moudar API not configured (MOUDAR_API_BASE).");
      return;
    }
    setLoading(true);
    setError(null);
    const payload = {
      projectPlan: {
        projectId: project && project.id ? project.id : "frontend-project",
        title: project && project.title ? project.title : "",
        domain: project && project.domain ? project.domain : null,
        country: project && project.country ? project.country : null,
        resourceLevel: project && project.resourceLevel ? project.resourceLevel : null,
        setting: project && project.context ? project.context : null,
        phase: project && project.phase ? project.phase : null,
        population: project && project.population ? project.population : null,
        targets: project && project.targets ? project.targets : null,
        barriers: project && project.barriers ? project.barriers : null,
        strategies: strategies.map((s) => ({
          id: s.id || s.code || s.name,
          code: s.code || s.id || null,
          label: s.label && s.label[lang] ? s.label[lang] : s.label || s.name || s.id || "",
          cost: s.cost || null,
          complexity: s.complexity || null
        })),
        frameworks: project && project.frameworks ? project.frameworks : null,
        outcomesPlanned: project && project.outcomes ? project.outcomes : null
      },
      context: {
        modelVersionRequested: "latest",
        source: "moudar_frontend_v8_0",
        includeExplanations: true
      }
    };
    safeMoudarFetch("/predict_success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": MOUDAR_API_KEY ? "Bearer " + MOUDAR_API_KEY : ""
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        if (data && data.prediction) {
          const p = data.prediction;
          const raw = p.probSuccess !== undefined && p.probSuccess !== null
            ? p.probSuccess
            : p.probability !== undefined && p.probability !== null ? p.probability : 0;
          const probValue = raw <= 1 ? raw * 100 : raw;
          let conf = "medium";
          if (p.calibrationBand === "robust") conf = "high";
          else if (p.calibrationBand === "preliminary") conf = "low";
          setApiPrediction({
            probability: Math.round(probValue),
            confidence: conf,
            band: p.calibrationBand || null,
            source: "api"
          });
        } else {
          setError(lang === "fr" ? "R\u00E9ponse API inattendue." : "Unexpected API response.");
        }
      })
      .catch((err) => {
        console.error("Moudar /predict_success error", err);
        setError((lang === "fr" ? "Erreur lors de l'appel API : " : "Error calling API: ") + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDD2E "}{lang === "fr" ? "Estimateur Heuristique de Succes" : "Heuristic Success Estimator"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr"
                ? "Estimation basee sur des coefficients heuristiques derives de la litterature IS (non-ML). Les resultats sont indicatifs, non predictifs au sens statistique."
                : "Estimation based on heuristic coefficients from IS literature (non-ML). Results are indicative, not statistically predictive."}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Probability Display */}
          <div className={"text-center p-8 rounded-2xl border bg-gradient-to-br mb-6 " + probBg}>
            <div className="text-6xl font-bold mb-2 flex items-center justify-center gap-3">
              <span className={probColor}>{prediction.probability}%</span>
            </div>
            <p className="text-lg font-medium text-gray-800">
              {lang === "fr" ? "Probabilit\u00E9 de succ\u00E8s estim\u00E9e" : "Estimated success probability"}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
              <span className="px-3 py-1 bg-white/50 rounded-full">
                {lang === "fr" ? "Confiance" : "Confidence"}: {prediction.confidence || "?"}
              </span>
              <span className="px-3 py-1 bg-white/50 rounded-full">
                {apiPrediction
                  ? (lang === "fr" ? "Source : mod\u00E8le ML (API)" : "Source: ML model (API)")
                  : (lang === "fr" ? "Source : simulation locale Moudar" : "Source: local Moudar simulation")}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={callApiPrediction}
                className="px-4 py-2 bg-white/80 border border-indigo-300 text-indigo-700 rounded-full text-sm flex items-center gap-2 hover:bg-indigo-50"
              >
                <span>{"\uD83D\uDCC8"}</span>
                <span>{lang === "fr" ? "Appeler l'API probabilit\u00E9 de succ\u00E8s" : "Call success probability API"}</span>
              </button>
              {loading && (
                <span className="text-sm text-gray-500">
                  {lang === "fr" ? "Calcul en cours..." : "Computing..."}
                </span>
              )}
            </div>
            {error && <p className="mt-3 text-sm text-red-600 text-center">{error}</p>}
            {apiPrediction && (
              <p className="mt-3 text-xs text-gray-500 text-center">
                {lang === "fr"
                  ? "Le score ci-dessus int\u00E8gre d\u00E9sormais le mod\u00E8le de pr\u00E9diction backend (API)."
                  : "The score above now uses the backend prediction model (API)."}
              </p>
            )}
          </div>

          {/* Factors */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Positive */}
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                {"\u2705 "}{lang === "fr" ? "Facteurs positifs" : "Positive factors"}
              </h3>
              <div className="space-y-2">
                {(prediction.details && prediction.details.positive || []).map((f, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-green-700">{f.label || "Facteur"}</span>
                    <span className="font-medium text-green-600">+{f.impact || 0}%</span>
                  </div>
                ))}
                {prediction.details && prediction.details.synergies && prediction.details.synergies.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <p className="text-xs text-green-600 mb-2">
                      {"\u26A1 "}{lang === "fr" ? "Synergies d\u00E9tect\u00E9es" : "Detected synergies"}
                    </p>
                    {(prediction.details.synergies || []).map((s, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-green-700">{(s.strategies || []).join(" + ")}</span>
                        <span className="font-medium text-green-600">+{s.impact || 0}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-green-200 text-right">
                <span className="text-green-800 font-bold">
                  +{(prediction.strategyContribution || 0) + (prediction.synergyBonus || 0)}%
                </span>
              </div>
            </div>

            {/* Negative */}
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                {"\u26A0\uFE0F "}{lang === "fr" ? "Facteurs de risque" : "Risk factors"}
              </h3>
              <div className="space-y-2">
                {(prediction.details && prediction.details.negative || []).map((f, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-red-700">{f.label || "Risque"}</span>
                    <span className="font-medium text-red-600">{f.impact || 0}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-red-200 text-right">
                <span className="text-red-800 font-bold">{prediction.riskPenalty || 0}%</span>
              </div>
            </div>
          </div>

          {/* Improvements */}
          {prediction.improvements && prediction.improvements.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3">
                {"\uD83D\uDCA1 "}{lang === "fr" ? "Pour am\u00E9liorer vos chances" : "To improve your chances"}
              </h3>
              <div className="space-y-2">
                {(prediction.improvements || []).map((imp, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="text-blue-700">{imp.reason || ""}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium text-sm">+{imp.gain || 0}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-6 p-3 bg-gray-100 rounded-lg text-center text-sm text-gray-600">
            {"\u2139\uFE0F "}{prediction.disclaimer}
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
