import React from 'react';
/* global MoudarEngine */

export default function ScenarioComparatorView({ project, lang, onClose, onSelectScenario }) {
  if (!project) return null;

  const scenarios = [
    {
      id: "equity",
      name: { fr: "\uD83C\uDFAF \u00C9quit\u00E9 maximale", en: "\uD83C\uDFAF Maximum Equity" },
      objectives: ["equity", "sustainability"],
      description: {
        fr: "Priorise l\u2019acc\u00E8s \u00E9quitable et la p\u00E9rennit\u00E9. Id\u00E9al pour les contextes LMIC et les programmes de sant\u00E9 publique.",
        en: "Prioritizes equitable access and sustainability. Ideal for LMIC contexts and public health programs."
      },
      color: "from-purple-500 to-indigo-600",
      icon: "\u2696\uFE0F"
    },
    {
      id: "budget",
      name: { fr: "\uD83D\uDCB0 Budget optimis\u00E9", en: "\uD83D\uDCB0 Optimized Budget" },
      objectives: ["cost_effectiveness", "speed"],
      description: {
        fr: "Minimise les co\u00FBts tout en maximisant l\u2019impact. Adapt\u00E9 aux ressources limit\u00E9es et aux d\u00E9ploiements rapides.",
        en: "Minimizes costs while maximizing impact. Suited for limited resources and rapid deployments."
      },
      color: "from-green-500 to-emerald-600",
      icon: "\uD83D\uDCCA"
    },
    {
      id: "evidence",
      name: { fr: "\uD83D\uDCDA Evidence-based", en: "\uD83D\uDCDA Evidence-based" },
      objectives: ["evidence_based", "sustainability"],
      description: {
        fr: "S\u2019appuie sur les preuves scientifiques les plus solides. Recommand\u00E9 pour les projets de recherche et les CHU.",
        en: "Relies on the strongest scientific evidence. Recommended for research projects and university hospitals."
      },
      color: "from-blue-500 to-cyan-600",
      icon: "\uD83D\uDD2C"
    }
  ];

  const scenarioResults = scenarios.map((scenario) => {
    const baseStrategies = MoudarEngine.scoreStrategies(project);
    const adjustedStrategies = MoudarEngine.applyObjectives(baseStrategies, scenario.objectives, project.resourceLevel || null);
    const topStrategies = adjustedStrategies.slice(0, 5);

    const avgCost = topStrategies.reduce((sum, s) => {
      const costMap = { low: 1, medium: 2, high: 3, variable: 2 };
      return sum + (costMap[s.cost] || 2);
    }, 0) / topStrategies.length;

    const avgComplexity = topStrategies.reduce((sum, s) => {
      const compMap = { low: 1, medium: 2, high: 3 };
      return sum + (compMap[s.complexity] || 2);
    }, 0) / topStrategies.length;

    const totalScore = topStrategies.reduce((sum, s) => sum + s.score, 0);

    const equityStrategies = ["S08", "S18", "S19", "S20", "S12"];
    const equityCount = topStrategies.filter((s) => equityStrategies.includes(s.id)).length;
    const equityScore = equityCount >= 3 ? "high" : equityCount >= 1 ? "medium" : "low";

    const durationMonths = avgComplexity <= 1.5 ? 6 : avgComplexity <= 2.2 ? 12 : 18;

    return {
      scenario,
      strategies: topStrategies,
      metrics: {
        cost: avgCost,
        complexity: avgComplexity,
        score: totalScore,
        costLabel: avgCost <= 1.5 ? "$" : avgCost <= 2.2 ? "$$" : "$$$",
        costLevel: avgCost <= 1.5 ? "low" : avgCost <= 2.2 ? "medium" : "high",
        complexityLabel: avgComplexity <= 1.5
          ? (lang === "fr" ? "Simple" : "Simple")
          : avgComplexity <= 2.2
            ? (lang === "fr" ? "Mod\u00E9r\u00E9e" : "Moderate")
            : (lang === "fr" ? "Complexe" : "Complex"),
        complexityLevel: avgComplexity <= 1.5 ? "low" : avgComplexity <= 2.2 ? "medium" : "high",
        equityScore,
        equityLabel: equityScore === "high"
          ? (lang === "fr" ? "Fort" : "High")
          : equityScore === "medium"
            ? (lang === "fr" ? "Moyen" : "Medium")
            : (lang === "fr" ? "Faible" : "Low"),
        duration: durationMonths,
        durationLabel: durationMonths + " " + (lang === "fr" ? "mois" : "months")
      }
    };
  });

  const getLevelColor = (level, inverted) => {
    if (inverted) {
      return level === "low" ? "text-green-600 bg-green-100" : level === "medium" ? "text-yellow-600 bg-yellow-100" : "text-red-600 bg-red-100";
    }
    return level === "high" ? "text-green-600 bg-green-100" : level === "medium" ? "text-yellow-600 bg-yellow-100" : "text-red-600 bg-red-100";
  };

  const getLevelIcon = (level, type) => {
    if (type === "equity") {
      return level === "high" ? "\uD83C\uDF0D\uD83C\uDF0D\uD83C\uDF0D" : level === "medium" ? "\uD83C\uDF0D\uD83C\uDF0D" : "\uD83C\uDF0D";
    }
    if (type === "cost") {
      return level === "low" ? "\uD83D\uDCB8" : level === "medium" ? "\uD83D\uDCB8\uD83D\uDCB8" : "\uD83D\uDCB8\uD83D\uDCB8\uD83D\uDCB8";
    }
    if (type === "complexity") {
      return level === "low" ? "\u2699\uFE0F" : level === "medium" ? "\u2699\uFE0F\u2699\uFE0F" : "\u2699\uFE0F\u2699\uFE0F\u2699\uFE0F";
    }
    return "";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\u2696\uFE0F "}{lang === "fr" ? "Studio de Sc\u00E9narios d\u2019Impl\u00E9mentation" : "Implementation Scenarios Studio"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr"
                ? "3 trajectoires possibles \u2014 Choisissez le compromis qui vous convient"
                : "3 possible trajectories \u2014 Choose the trade-off that suits you"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Comparison Table */}
          <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border">
            <h4 className="font-medium text-gray-700 mb-3">
              {lang === "fr" ? "\uD83D\uDCCA Comparaison rapide" : "\uD83D\uDCCA Quick Comparison"}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left text-gray-500">
                      {lang === "fr" ? "Crit\u00E8re" : "Criteria"}
                    </th>
                    {scenarioResults.map((r) => (
                      <th key={r.scenario.id} className="py-2 text-center font-medium">
                        {r.scenario.icon} {r.scenario.name[lang].split(" ")[1]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">
                      {"\uD83C\uDF0D "}{lang === "fr" ? "Impact \u00E9quit\u00E9" : "Equity impact"}
                    </td>
                    {scenarioResults.map((r) => (
                      <td key={r.scenario.id} className="py-2 text-center">
                        <span className={"px-2 py-1 rounded text-xs font-medium " + getLevelColor(r.metrics.equityScore, false)}>
                          {getLevelIcon(r.metrics.equityScore, "equity")} {r.metrics.equityLabel}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">
                      {"\uD83D\uDCB8 "}{lang === "fr" ? "Niveau de co\u00FBts" : "Cost level"}
                    </td>
                    {scenarioResults.map((r) => (
                      <td key={r.scenario.id} className="py-2 text-center">
                        <span className={"px-2 py-1 rounded text-xs font-medium " + getLevelColor(r.metrics.costLevel, true)}>
                          {getLevelIcon(r.metrics.costLevel, "cost")} {r.metrics.costLabel}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">
                      {"\u2699\uFE0F "}{lang === "fr" ? "Complexit\u00E9" : "Complexity"}
                    </td>
                    {scenarioResults.map((r) => (
                      <td key={r.scenario.id} className="py-2 text-center">
                        <span className={"px-2 py-1 rounded text-xs font-medium " + getLevelColor(r.metrics.complexityLevel, true)}>
                          {getLevelIcon(r.metrics.complexityLevel, "complexity")} {r.metrics.complexityLabel}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">
                      {"\u23F1\uFE0F "}{lang === "fr" ? "Dur\u00E9e estim\u00E9e" : "Estimated duration"}
                    </td>
                    {scenarioResults.map((r) => (
                      <td key={r.scenario.id} className="py-2 text-center">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {r.metrics.durationLabel}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Scenario Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {scenarioResults.map((result) => (
              <div
                key={result.scenario.id}
                className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-400 transition overflow-hidden"
              >
                <div className={"bg-gradient-to-r " + result.scenario.color + " p-4 text-white"}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{result.scenario.icon}</span>
                    <h3 className="font-bold text-lg">{result.scenario.name[lang]}</h3>
                  </div>
                  <p className="text-sm text-white/90">{result.scenario.description[lang]}</p>
                </div>

                <div className="p-3 bg-gray-50 border-b">
                  <div className="flex justify-around text-center">
                    <div title={lang === "fr" ? "Impact \u00E9quit\u00E9" : "Equity impact"}>
                      <div className="text-lg">{getLevelIcon(result.metrics.equityScore, "equity")}</div>
                      <div className="text-xs text-gray-500">{lang === "fr" ? "\u00C9quit\u00E9" : "Equity"}</div>
                    </div>
                    <div title={lang === "fr" ? "Niveau co\u00FBts" : "Cost level"}>
                      <div className="text-lg">{getLevelIcon(result.metrics.costLevel, "cost")}</div>
                      <div className="text-xs text-gray-500">{lang === "fr" ? "Co\u00FBts" : "Costs"}</div>
                    </div>
                    <div title={lang === "fr" ? "Complexit\u00E9" : "Complexity"}>
                      <div className="text-lg">{getLevelIcon(result.metrics.complexityLevel, "complexity")}</div>
                      <div className="text-xs text-gray-500">{lang === "fr" ? "Complexit\u00E9" : "Complexity"}</div>
                    </div>
                    <div title={lang === "fr" ? "Dur\u00E9e" : "Duration"}>
                      <div className="text-lg font-bold text-blue-600">{result.metrics.duration}m</div>
                      <div className="text-xs text-gray-500">{lang === "fr" ? "Dur\u00E9e" : "Duration"}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-medium text-gray-700 mb-3 text-sm">
                    {lang === "fr" ? "Strat\u00E9gies recommand\u00E9es" : "Recommended strategies"}
                  </h4>
                  <ul className="space-y-2">
                    {result.strategies.map((s, i) => {
                      const costColor = s.cost === "low"
                        ? "bg-green-100 text-green-700"
                        : s.cost === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700";
                      return (
                        <li key={s.id} className="flex items-center gap-2 text-sm">
                          <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </span>
                          <span className="flex-1">{s.label[lang]}</span>
                          <span className={"px-1.5 py-0.5 rounded text-xs " + costColor}>
                            {s.cost === "low" ? "$" : s.cost === "medium" ? "$$" : "$$$"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="p-4 border-t">
                  <button
                    onClick={() => onSelectScenario(result)}
                    className={"w-full py-2 rounded-lg font-medium text-white bg-gradient-to-r " + result.scenario.color + " hover:opacity-90 transition"}
                  >
                    {lang === "fr" ? "Choisir ce sc\u00E9nario" : "Choose this scenario"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <h4 className="font-medium text-blue-800 mb-2">
              {"\uD83D\uDCA1 "}{lang === "fr" ? "Comment choisir ?" : "How to choose?"}
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-700">
              <div>
                <strong>{"\u2696\uFE0F "}{lang === "fr" ? "\u00C9quit\u00E9" : "Equity"}:</strong>{" "}
                {lang === "fr"
                  ? "Pour les programmes visant les populations vuln\u00E9rables ou en contexte LMIC"
                  : "For programs targeting vulnerable populations or LMIC contexts"}
              </div>
              <div>
                <strong>{"\uD83D\uDCB0 "}{lang === "fr" ? "Budget" : "Budget"}:</strong>{" "}
                {lang === "fr"
                  ? "Quand les ressources sont limit\u00E9es et le d\u00E9lai court"
                  : "When resources are limited and timeline is short"}
              </div>
              <div>
                <strong>{"\uD83D\uDCDA "}{lang === "fr" ? "Evidence" : "Evidence"}:</strong>{" "}
                {lang === "fr"
                  ? "Pour les projets de recherche ou les contextes \u00E0 haute exigence scientifique"
                  : "For research projects or contexts with high scientific requirements"}
              </div>
            </div>
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
