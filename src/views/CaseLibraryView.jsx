import React, { useState } from 'react';
/* global MoudarEngine */

export default function CaseLibraryView({ project, protocol, lang, onClose }) {
  const enrichedProject = { ...project, strategies: protocol && protocol.strategies ? protocol.strategies : [] };
  const similarCases = MoudarEngine.findSimilarCases(enrichedProject, 5);
  const stats = MoudarEngine.getCaseStats();
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDCDA "}{lang === "fr" ? "Biblioth\u00E8que de Cas R\u00E9els" : "Real Case Library"}
            </h2>
            <p className="text-sm text-gray-500">
              {stats.totalCases} {lang === "fr" ? "cas document\u00E9s" : "documented cases"} {"\u2022"} {stats.successRate}% {lang === "fr" ? "de succ\u00E8s" : "success rate"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {selectedCase ? (
            /* Case Detail */
            <div>
              <button onClick={() => setSelectedCase(null)} className="text-blue-600 hover:text-blue-800 mb-4">
                {"\u2190 "}{lang === "fr" ? "Retour \u00E0 la liste" : "Back to list"}
              </button>

              <div className={"p-4 rounded-xl border mb-6 " + (selectedCase.outcome === 'success' ? 'bg-green-50 border-green-200' : selectedCase.outcome === 'partial' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200')}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{selectedCase.title[lang]}</h3>
                  <span className={"px-3 py-1 rounded-full text-sm font-medium " + (selectedCase.outcome === 'success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>
                    {selectedCase.outcome === 'success' ? (lang === 'fr' ? 'Succ\u00E8s' : 'Success') : (lang === 'fr' ? 'Partiel' : 'Partial')}
                  </span>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                  <div><strong>{lang === 'fr' ? 'Pays' : 'Country'}:</strong> {selectedCase.country}</div>
                  <div><strong>{lang === 'fr' ? 'Dur\u00E9e' : 'Duration'}:</strong> {selectedCase.duration} {lang === 'fr' ? 'mois' : 'months'}</div>
                  <div><strong>Sites:</strong> {selectedCase.sites}</div>
                  <div><strong>Budget:</strong> ${selectedCase.budget.toLocaleString()}</div>
                </div>

                <div className="mb-4">
                  <strong>{lang === 'fr' ? "Taux d'adoption" : 'Adoption rate'}:</strong>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                    <div
                      className={"h-4 rounded-full " + (selectedCase.adoptionRate >= 70 ? 'bg-green-500' : selectedCase.adoptionRate >= 50 ? 'bg-yellow-500' : 'bg-red-500')}
                      style={{ width: selectedCase.adoptionRate + '%' }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{selectedCase.adoptionRate}%</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">
                    {"\uD83D\uDCCB "}{lang === 'fr' ? 'Strat\u00E9gies utilis\u00E9es' : 'Strategies used'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedCase.strategies || []).map((sid) => {
                      const strat = MoudarEngine.getKnowledgeGraph().nodes.strategies[sid];
                      return (
                        <span key={sid} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {strat ? strat.label[lang] : sid}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">
                    {"\u26A0\uFE0F "}{lang === 'fr' ? 'D\u00E9fis rencontr\u00E9s' : 'Challenges encountered'}
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {(selectedCase.challenges && selectedCase.challenges[lang] || []).map((c, i) => (
                      <li key={i}>{"\u2022 "}{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-bold text-green-800 mb-3">
                  {"\uD83D\uDCA1 "}{lang === 'fr' ? 'Le\u00E7ons apprises' : 'Lessons learned'}
                </h4>
                <ul className="space-y-2">
                  {(selectedCase.lessons && selectedCase.lessons[lang] || []).map((l, i) => (
                    <li key={i} className="flex items-start gap-2 text-green-700">
                      <span>{"\u2713"}</span> {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            /* Case List */
            <>
              <h3 className="font-bold text-gray-800 mb-4">
                {"\uD83D\uDD0D "}{lang === 'fr' ? 'Cas similaires \u00E0 votre projet' : 'Cases similar to your project'}
              </h3>
              <div className="space-y-4">
                {similarCases.map((item) => {
                  const c = item.case;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCase(c)}
                      className={"p-4 rounded-xl border cursor-pointer transition hover:shadow-md " + (c.outcome === 'success' ? 'bg-green-50 border-green-200 hover:border-green-400' : 'bg-yellow-50 border-yellow-200 hover:border-yellow-400')}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800">{c.title[lang]}</h4>
                          <p className="text-sm text-gray-600">
                            {c.country} {"\u2022"} {c.duration} {lang === 'fr' ? 'mois' : 'months'} {"\u2022"} {c.year}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={"text-lg font-bold " + (c.outcome === 'success' ? 'text-green-600' : 'text-yellow-600')}>
                            {item.similarity}% {lang === 'fr' ? 'similaire' : 'similar'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {c.adoptionRate}% {lang === 'fr' ? 'adoption' : 'adoption'}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {c.strategies.slice(0, 4).map((sid) => (
                          <span key={sid} className="px-2 py-0.5 bg-white/50 rounded text-xs">{sid}</span>
                        ))}
                        {c.strategies.length > 4 && (
                          <span className="px-2 py-0.5 bg-white/50 rounded text-xs">+{c.strategies.length - 4}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
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
