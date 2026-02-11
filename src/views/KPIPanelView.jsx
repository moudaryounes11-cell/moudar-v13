import React from 'react';
/* global MoudarEngine */

export default function KPIPanelView({ strategies, lang, onClose }) {
  if (!strategies || strategies.length === 0) return null;

  const kg = MoudarEngine.getKnowledgeGraph();
  const strategiesWithKPIs = strategies
    .map((s) => {
      const fullStrategy = kg.nodes.strategies[s.id];
      return {
        id: s.id,
        label: s.label,
        score: s.score,
        kpis: fullStrategy && fullStrategy.kpis ? fullStrategy.kpis : []
      };
    })
    .filter((s) => s.kpis.length > 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDCCA "}{lang === "fr" ? "Indicateurs de Suivi (KPIs)" : "Key Performance Indicators (KPIs)"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr" ? "Mesurez l'impl\u00E9mentation de chaque strat\u00E9gie" : "Measure the implementation of each strategy"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {strategiesWithKPIs.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {lang === "fr" ? "Aucun indicateur disponible" : "No indicators available"}
            </p>
          ) : (
            <div className="space-y-6">
              {strategiesWithKPIs.map((strategy) => (
                <div key={strategy.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-3 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm font-bold">
                        {strategy.id}
                      </span>
                      <span className="font-medium">{strategy.label[lang]}</span>
                    </div>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded">
                      Score: {(strategy.score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-600 font-medium">
                            {lang === "fr" ? "Indicateur" : "Indicator"}
                          </th>
                          <th className="px-4 py-2 text-center text-gray-600 font-medium">
                            {lang === "fr" ? "Cible" : "Target"}
                          </th>
                          <th className="px-4 py-2 text-center text-gray-600 font-medium">
                            {lang === "fr" ? "Fr\u00E9quence" : "Frequency"}
                          </th>
                          <th className="px-4 py-2 text-left text-gray-600 font-medium">
                            {lang === "fr" ? "Source" : "Source"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {strategy.kpis.map((kpi, idx) => (
                          <tr key={kpi.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-4 py-3 font-medium text-gray-800">{kpi.indicator[lang]}</td>
                            <td className="px-4 py-3 text-center">
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                {kpi.target}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center text-gray-600">{kpi.frequency[lang]}</td>
                            <td className="px-4 py-3 text-gray-500 text-xs">{kpi.source[lang]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tips */}
          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <h4 className="font-medium text-amber-800 mb-2">
              {"\uD83D\uDCA1 "}{lang === "fr" ? "Conseils de suivi" : "Monitoring Tips"}
            </h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>{"\u2022 "}{lang === "fr" ? "Int\u00E9grez ces indicateurs dans votre tableau de bord projet" : "Integrate these indicators into your project dashboard"}</li>
              <li>{"\u2022 "}{lang === "fr" ? "Collectez les donn\u00E9es d\u00E8s le d\u00E9marrage pour avoir une baseline" : "Collect data from the start to establish a baseline"}</li>
              <li>{"\u2022 "}{lang === "fr" ? "Partagez les r\u00E9sultats avec les \u00E9quipes pour maintenir la motivation" : "Share results with teams to maintain motivation"}</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between gap-3">
          <button
            onClick={() => {
              const csvLines = [lang === "fr" ? "Strat\u00E9gie;Indicateur;Cible;Fr\u00E9quence;Source" : "Strategy;Indicator;Target;Frequency;Source"];
              strategiesWithKPIs.forEach((s) => {
                s.kpis.forEach((kpi) => {
                  csvLines.push([s.label[lang], kpi.indicator[lang], kpi.target, kpi.frequency[lang], kpi.source[lang]].join(";"));
                });
              });
              const blob = new Blob([csvLines.join("\n")], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "moudar_kpis_" + new Date().toISOString().split("T")[0] + ".csv";
              a.click();
            }}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center gap-2"
          >
            {"\uD83D\uDCE5 "}{lang === "fr" ? "Exporter CSV" : "Export CSV"}
          </button>
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
