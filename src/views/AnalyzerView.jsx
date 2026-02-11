import React, { useState } from 'react';
/* global MoudarEngine, MOUDAR_API_BASE, MOUDAR_API_KEY, safeMoudarFetch */

export default function AnalyzerView({ lang, onNavigate }) {
  const [protocolText, setProtocolText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [llmAnalysis, setLlmAnalysis] = useState(null);
  const [llmLoading, setLlmLoading] = useState(false);
  const [llmError, setLlmError] = useState(null);

  const exampleProtocol = lang === "fr"
    ? "Le programme pr\u00E9voit une formation de 5 jours pour les m\u00E9decins g\u00E9n\u00E9ralistes et les infirmiers des centres de sant\u00E9 primaires. Cette formation sera suivie d\u2019une supervision mensuelle par un psychiatre r\u00E9f\u00E9rent de la r\u00E9gion. Un syst\u00E8me de collecte de donn\u00E9es sera mis en place pour suivre le nombre de consultations. Des brochures d\u2019information seront distribu\u00E9es aux patients. Le programme sera adapt\u00E9 au contexte local marocain et des champions locaux seront identifi\u00E9s dans chaque centre pour porter le changement."
    : "The program includes a 5-day training course for general practitioners and nurses at primary health centers. This training will be followed by monthly supervision by a regional psychiatrist. A data collection system will be set up to track consultations. Patient information brochures will be distributed. The program will be adapted to the local Moroccan context and local champions will be identified in each center to drive change.";

  const handleAnalyze = () => {
    if (!protocolText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const result = MoudarEngine.analyzeProtocol(protocolText, lang);
      setAnalysis(result);
      const recs = MoudarEngine.getProtocolRecommendations(result, lang);
      setRecommendations(recs);
      setLoading(false);
    }, 800);
  };

  const handleAnalyzeLLM = () => {
    if (!protocolText.trim()) return;
    if (!MOUDAR_API_BASE) {
      setLlmError(lang === "fr" ? "API Moudar non configur\u00E9e (MOUDAR_API_BASE)." : "Moudar API not configured (MOUDAR_API_BASE).");
      return;
    }
    setLlmLoading(true);
    setLlmError(null);
    const payload = {
      text: protocolText,
      language: lang === "fr" ? "fr" : "en",
      options: {
        inferPhase: true,
        inferResourceLevel: true,
        maxBarriers: 10,
        maxStrategies: 15
      }
    };
    safeMoudarFetch("/llm_analyze", {
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
        setLlmAnalysis(data || null);
      })
      .catch((err) => {
        console.error("Moudar /llm_analyze error", err);
        setLlmError((lang === "fr" ? "Erreur LLM : " : "LLM error: ") + err.message);
      })
      .finally(() => {
        setLlmLoading(false);
      });
  };

  const handleLoadExample = () => {
    setProtocolText(exampleProtocol);
    setAnalysis(null);
    setRecommendations([]);
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "text-green-600 bg-green-100";
    if (score >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreBarColor = (score) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{"\uD83D\uDD2C"}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {lang === "fr" ? "Analyseur de Protocole" : "Protocol Analyzer"}
            </h1>
            <p className="text-gray-600">
              {lang === "fr"
                ? "\u00C9valuez la compl\u00E9tude de votre protocole existant"
                : "Evaluate the Implementation Science completeness of your existing protocol"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onNavigate("projects")}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
          >
            {"\u2190 "}{lang === "fr" ? "Mes projets" : "My projects"}
          </button>
          <button
            onClick={() => onNavigate("wizard")}
            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
          >
            {"\u2728 "}{lang === "fr" ? "Cr\u00E9er un projet" : "Create a project"}
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-gray-800">
            {"\uD83D\uDCCB "}{lang === "fr" ? "Collez votre protocole" : "Paste your protocol"}
          </h2>
          <button
            onClick={handleLoadExample}
            className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200"
          >
            {"\uD83D\uDCDD "}{lang === "fr" ? "Charger exemple" : "Load example"}
          </button>
        </div>
        <textarea
          value={protocolText}
          onChange={(e) => {
            setProtocolText(e.target.value);
            setAnalysis(null);
          }}
          placeholder={lang === "fr"
            ? "Collez ici le texte de votre protocole d\u2019impl\u00E9mentation, description de projet, ou document de conception..."
            : "Paste here the text of your implementation protocol, project description, or design document..."}
          className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none text-gray-700"
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {protocolText.length} {lang === "fr" ? "caract\u00E8res" : "characters"}
          </span>
          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={!protocolText.trim() || loading}
              className={"px-6 py-3 rounded-xl text-white shadow-md transition-all " +
                (protocolText.trim() && !loading
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-700"
                  : "bg-gray-300 cursor-not-allowed")}
            >
              {loading ? (
                <span>{"\u23F3 "}{lang === "fr" ? "Analyse en cours..." : "Analyzing..."}</span>
              ) : (
                <span>{"\uD83D\uDD0D "}{lang === "fr" ? "Analyser le protocole" : "Analyze protocol"}</span>
              )}
            </button>
            <button
              onClick={handleAnalyzeLLM}
              disabled={!protocolText.trim() || llmLoading}
              className={"px-6 py-3 rounded-xl text-white shadow-md transition-all flex items-center gap-2 " +
                (protocolText.trim() && !llmLoading
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  : "bg-gray-300 cursor-not-allowed")}
            >
              {llmLoading ? (
                <span>{"\uD83E\uDDE0 "}{lang === "fr" ? "Analyse LLM..." : "LLM analyzing..."}</span>
              ) : (
                <span>{"\uD83E\uDDE0 "}{lang === "fr" ? "Analyse LLM (beta)" : "LLM analysis (beta)"}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Global Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className={"w-24 h-24 rounded-2xl flex flex-col items-center justify-center " + getScoreColor(analysis.globalScore)}>
                  <span className="text-4xl font-bold">{analysis.globalScore}%</span>
                  <span className="text-xs">{lang === "fr" ? "Compl\u00E9tude" : "Completeness"}</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-1">
                    {lang === "fr" ? "Score de compl\u00E9tude" : "Implementation Science Completeness Score"}
                  </h3>
                  <p className="text-gray-600">
                    {analysis.totalDetected} / {analysis.totalStrategies}{" "}
                    {lang === "fr" ? "strat\u00E9gies ERIC d\u00E9tect\u00E9es" : "ERIC strategies detected"}
                  </p>
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl mb-1">
                  {analysis.globalScore >= 70 ? "\uD83C\uDFAF" : analysis.globalScore >= 40 ? "\uD83D\uDCCA" : "\u26A0\uFE0F"}
                </div>
                <div className="text-sm text-gray-600">
                  {analysis.globalScore >= 70
                    ? (lang === "fr" ? "Protocole bien structur\u00E9" : "Well-structured protocol")
                    : analysis.globalScore >= 40
                      ? (lang === "fr" ? "Protocole partiel" : "Partial protocol")
                      : (lang === "fr" ? "Protocole \u00E0 renforcer" : "Protocol needs strengthening")}
                </div>
              </div>
            </div>
          </div>

          {/* Dimension Analysis */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">
              {"\uD83D\uDCCA "}{lang === "fr" ? "Analyse par dimension" : "Analysis by dimension"}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analysis.categoryScores).map(([catId, cat]) => (
                <div key={catId} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">{cat.label}</span>
                    <span className={"px-2 py-1 rounded text-sm font-bold " + getScoreColor(cat.score)}>
                      {cat.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className={"h-2 rounded-full transition-all " + getScoreBarColor(cat.score)}
                      style={{ width: cat.score + "%" }}
                    />
                  </div>
                  <div className="space-y-1">
                    {cat.strategies.map((s) => (
                      <div key={s.id} className="flex items-center gap-2 text-xs">
                        <span className={s.detected ? "text-green-600" : "text-gray-400"}>
                          {s.detected ? "\u2713" : "\u25CB"}
                        </span>
                        <span className={s.detected ? "text-gray-800" : "text-gray-400"}>
                          {s.label}
                        </span>
                        {s.detected && s.keywords.length > 0 && (
                          <span className="text-blue-500 text-xs italic">
                            ({s.keywords.slice(0, 2).join(", ")})
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detected + Missing */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">{"\u2713"}</span>
                {lang === "fr" ? "Strat\u00E9gies d\u00E9tect\u00E9es" : "Detected strategies"} ({analysis.totalDetected})
              </h3>
              {Object.keys(analysis.detected).length > 0 ? (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {Object.entries(analysis.detected).map(([sid, data]) => (
                    <div key={sid} className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium text-green-800">{data.strategy.label[lang]}</span>
                          <span className="ml-2 text-xs text-green-600">({sid})</span>
                        </div>
                        <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded">
                          {Math.round(data.confidence * 100)}%
                        </span>
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        {lang === "fr" ? "Mots-cl\u00E9s:" : "Keywords:"} {data.keywords.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  {lang === "fr" ? "Aucune strat\u00E9gie d\u00E9tect\u00E9e" : "No strategies detected"}
                </p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">!</span>
                {lang === "fr" ? "\u00C0 ajouter (prioritaires)" : "To add (priority)"} ({analysis.missing.length})
              </h3>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {analysis.missing.map((m, idx) => {
                  const rationales = {
                    S01: { fr: "Renforce les comp\u00E9tences des professionnels", en: "Strengthens professional skills" },
                    S02: { fr: "Permet de mesurer les progr\u00E8s et d\u2019ajuster", en: "Enables progress measurement and adjustment" },
                    S03: { fr: "Accompagne le changement sur le terrain", en: "Supports field-level change" },
                    S04: { fr: "Cr\u00E9e des mod\u00E8les locaux et motive les \u00E9quipes", en: "Creates local role models and motivates teams" },
                    S05: { fr: "R\u00E9duit les oublis et standardise les pratiques", en: "Reduces oversights and standardizes practices" },
                    S06: { fr: "Motive l\u2019adoption par des incitations", en: "Motivates adoption through incentives" },
                    S07: { fr: "Ancre le changement dans les politiques", en: "Anchors change in policies" },
                    S08: { fr: "Implique la communaut\u00E9 et r\u00E9duit la stigmatisation", en: "Involves community and reduces stigma" },
                    S09: { fr: "R\u00E9sout les probl\u00E8mes techniques rapidement", en: "Resolves technical issues quickly" },
                    S10: { fr: "Assure la qualit\u00E9 et le soutien aux \u00E9quipes", en: "Ensures quality and team support" },
                    S11: { fr: "Adapte l\u2019intervention au contexte local", en: "Adapts intervention to local context" },
                    S12: { fr: "Cr\u00E9e des alliances durables", en: "Creates lasting alliances" },
                    S13: { fr: "Permet le suivi et la prise de d\u00E9cision bas\u00E9e sur les donn\u00E9es", en: "Enables monitoring and data-driven decisions" },
                    S14: { fr: "Favorise l\u2019apprentissage collectif", en: "Promotes collective learning" },
                    S15: { fr: "Apporte le soutien de personnes avec v\u00E9cu similaire", en: "Provides support from people with similar experiences" },
                    S16: { fr: "Institutionnalise l\u2019am\u00E9lioration continue", en: "Institutionalizes continuous improvement" },
                    S17: { fr: "Coordonne et harmonise \u00E0 grande \u00E9chelle", en: "Coordinates and harmonizes at scale" },
                    S18: { fr: "Am\u00E9liore l\u2019adh\u00E9sion des patients", en: "Improves patient adherence" },
                    S19: { fr: "Optimise les ressources humaines disponibles", en: "Optimizes available human resources" },
                    S20: { fr: "Assure l\u2019appropriation par toutes les parties", en: "Ensures ownership by all parties" }
                  };
                  return (
                    <div key={m.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-start gap-2">
                        <span className="w-6 h-6 bg-orange-200 text-orange-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-medium text-orange-800">{m.label}</span>
                          <span className="ml-2 text-xs text-orange-600">({m.id})</span>
                          <p className="text-xs text-orange-700 mt-1">
                            {"\uD83D\uDCA1 "}{rationales[m.id] ? rationales[m.id][lang] : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">{"\uD83D\uDCA1"}</span>
                {lang === "fr" ? "Recommandations Moudar" : "Moudar Recommendations"}
              </h3>
              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={"px-2 py-1 rounded text-xs font-bold " + getScoreColor(rec.score)}>
                        {rec.score}%
                      </span>
                      <span className="font-medium text-blue-900">{rec.categoryLabel}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{rec.message}</p>
                    <div className="space-y-2">
                      {rec.suggestions.map((sug) => (
                        <div key={sug.id} className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
                          <span className="text-blue-500">{"\u2192"}</span>
                          <div>
                            <span className="font-medium text-blue-800">{sug.label}</span>
                            <p className="text-xs text-blue-600">{sug.rationale}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">
              {"\uD83D\uDE80 "}{lang === "fr" ? "Prochaines \u00E9tapes" : "Next steps"}
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("wizard")}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2"
              >
                {"\u2728 "}{lang === "fr" ? "Cr\u00E9er un projet complet avec Moudar" : "Create a complete project with Moudar"}
              </button>
              <button
                onClick={() => {
                  let report = "ANALYSE DE PROTOCOLE - MOUDAR v" + MoudarEngine.VERSION + "\n";
                  report += "Date: " + new Date().toLocaleDateString() + "\n\n";
                  report += "SCORE GLOBAL: " + analysis.globalScore + "%\n";
                  report += "Strat\u00E9gies d\u00E9tect\u00E9es: " + analysis.totalDetected + "/" + analysis.totalStrategies + "\n\n";
                  report += "D\u00C9TAIL PAR CAT\u00C9GORIE:\n";
                  Object.entries(analysis.categoryScores).forEach((e) => {
                    report += "- " + e[1].label + ": " + e[1].score + "%\n";
                  });
                  report += "\nSTRAT\u00C9GIES MANQUANTES PRIORITAIRES:\n";
                  analysis.missing.forEach((m, i) => {
                    report += (i + 1) + ". " + m.label + " (" + m.id + ")\n";
                  });
                  const blob = new Blob([report], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'moudar_analyse_protocole_' + new Date().toISOString().split('T')[0] + '.txt';
                  a.click();
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
              >
                {"\uD83D\uDCE5 "}{lang === "fr" ? "Exporter l\u2019analyse" : "Export analysis"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How it works (shown when no analysis) */}
      {!analysis && (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4">
            {"\u2139\uFE0F "}{lang === "fr" ? "Comment \u00E7a marche ?" : "How does it work?"}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{"\uD83D\uDCCB"}</div>
              <h4 className="font-medium text-gray-800 mb-1">
                {lang === "fr" ? "1. Collez votre texte" : "1. Paste your text"}
              </h4>
              <p className="text-sm text-gray-600">
                {lang === "fr"
                  ? "Protocole, description de projet, document Word..."
                  : "Protocol, project description, Word document..."}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{"\uD83E\uDD16"}</div>
              <h4 className="font-medium text-gray-800 mb-1">
                {lang === "fr" ? "2. Moudar analyse" : "2. Moudar analyzes"}
              </h4>
              <p className="text-sm text-gray-600">
                {lang === "fr"
                  ? "D\u00E9tection des 20 strat\u00E9gies ERIC via mots-cl\u00E9s"
                  : "Detection of 20 ERIC strategies via keywords"}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{"\uD83D\uDCA1"}</div>
              <h4 className="font-medium text-gray-800 mb-1">
                {lang === "fr" ? "3. Recommandations" : "3. Recommendations"}
              </h4>
              <p className="text-sm text-gray-600">
                {lang === "fr"
                  ? "Strat\u00E9gies manquantes \u00E0 ajouter prioritairement"
                  : "Missing strategies to add as priority"}
              </p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-100 rounded-xl">
            <p className="text-sm text-blue-800">
              <strong>{"\uD83D\uDCA1 "}{lang === "fr" ? "Astuce" : "Tip"}:</strong>{" "}
              {lang === "fr"
                ? "Cliquez sur \"Charger exemple\" pour voir une analyse type sur un protocole de formation mhGAP."
                : "Click \"Load example\" to see a sample analysis on an mhGAP training protocol."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
