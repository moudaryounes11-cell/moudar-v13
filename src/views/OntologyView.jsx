import React, { useState } from 'react';
/* global ISOntologyEngine */

export default function OntologyView({ lang = 'fr' }) {
  const [activeTab, setActiveTab] = useState('frameworks');
  const [queryConstruct, setQueryConstruct] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [selectedFw, setSelectedFw] = useState(null);
  const [traceFrom, setTraceFrom] = useState('IS11');
  const [traceTo, setTraceTo] = useState('Adoption');
  const [traceResult, setTraceResult] = useState(null);

  const frameworks = ISOntologyEngine.frameworks;
  const fwArray = Object.values(frameworks);

  const typeColors = {
    determinant: 'from-blue-600 to-blue-500',
    evaluation: 'from-green-600 to-green-500',
    strategies: 'from-amber-600 to-amber-500',
    behavioral: 'from-pink-600 to-pink-500',
    process: 'from-purple-600 to-purple-500',
    outcomes: 'from-teal-600 to-teal-500',
    adaptation: 'from-orange-600 to-orange-500',
    reporting: 'from-slate-600 to-slate-500'
  };

  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const handleQuery = () => {
    if (!queryConstruct.trim()) return;
    const result = ISOntologyEngine.query({ construct: queryConstruct.trim() });
    setQueryResult(result);
  };

  const handleTrace = () => {
    const result = ISOntologyEngine.tracePath(traceFrom, traceTo);
    setTraceResult(result);
  };

  const tabs = [
    { id: 'frameworks', label: t('Cadres', 'Frameworks'), icon: '\uD83C\uDFD7\uFE0F' },
    { id: 'relationships', label: t('Relations', 'Relationships'), icon: '\uD83D\uDD17' },
    { id: 'mechanisms', label: t('M\u00e9canismes', 'Mechanisms'), icon: '\u2699\uFE0F' },
    { id: 'query', label: t('Requ\u00eate', 'Query'), icon: '\uD83D\uDD0D' },
    { id: 'trace', label: t('Tra\u00e7age', 'Trace'), icon: '\uD83D\uDDFA\uFE0F' },
    { id: 'export', label: t('Export', 'Export'), icon: '\uD83D\uDCE4' }
  ];

  const evidenceColors = {
    strong: 'bg-green-500/20 text-green-400 border-green-500/30',
    moderate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    weak: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const relationTypeColors = {
    maps_to: 'text-blue-400',
    addressed_by: 'text-green-400',
    complements: 'text-purple-400',
    measures: 'text-teal-400',
    tracked_by: 'text-orange-400',
    monitored_by: 'text-amber-400',
    targets: 'text-red-400',
    phase_includes: 'text-indigo-400',
    phase_targets: 'text-pink-400',
    operationalizes: 'text-cyan-400',
    reports_on: 'text-slate-400'
  };

  const jsonLdData = ISOntologyEngine.exportJSONLD();
  const jsonLdString = JSON.stringify(jsonLdData, null, 2);

  const copyToClipboard = (textToCopy) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
    }
  };

  const quickQueries = ['IS11', 'IC4', 'IN2', 'PR5', 'Adoption', 'Fidelity'];
  const traceConstructs = ['IS11', 'IS12', 'IN2', 'IN4', 'IC4', 'PR3', 'PR5'];
  const traceOutcomes = ['Adoption', 'Fidelity', 'Penetration', 'Sustainability', 'Appropriateness'];

  return (
    <div className="fade-in">
      {/* Header banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-indigo-900/50 to-indigo-700/30 rounded-xl border border-indigo-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\uD83E\uDDE0"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t('Ontologie des Sciences de l\'Impl\u00e9mentation', 'Implementation Science Ontology')}
            </h1>
            <p className="text-indigo-300 text-sm">
              {fwArray.length} {t('cadres', 'frameworks')} {"\u2022"} {ISOntologyEngine.relationships.length} {t('relations', 'relationships')} {"\u2022"} {ISOntologyEngine.causalMechanisms.length} {t('m\u00e9canismes causaux', 'causal mechanisms')}
            </p>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              "px-4 py-2 rounded-lg text-sm font-medium transition-all " +
              (activeTab === tab.id
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white")
            }
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Frameworks */}
      {activeTab === 'frameworks' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fwArray.map((fw) => (
              <div
                key={fw.id}
                onClick={() => setSelectedFw(selectedFw && selectedFw.id === fw.id ? null : fw)}
                className={
                  "bg-slate-800 rounded-xl p-4 border cursor-pointer transition-all hover:shadow-lg " +
                  (selectedFw && selectedFw.id === fw.id
                    ? "border-indigo-500 shadow-indigo-500/20"
                    : "border-slate-700 hover:border-slate-500")
                }
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-white">{fw.id}</span>
                  <span
                    className={"px-2 py-0.5 rounded text-xs font-medium text-white bg-gradient-to-r " + (typeColors[fw.type] || 'from-slate-600 to-slate-500')}
                  >
                    {fw.type}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-2">{fw.fullName}</p>
                <div className="flex gap-3 text-xs text-slate-500">
                  <span>{fw.domains} {t('domaines', 'domains')}</span>
                  <span>{"\u2022"}</span>
                  <span>{fw.constructs} constructs</span>
                  <span>{"\u2022"}</span>
                  <span>{fw.year}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Selected framework details */}
          {selectedFw && (
            <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500/50 mt-4">
              <h3 className="text-xl font-bold text-white mb-4">
                {"\uD83D\uDCCB"} {selectedFw.fullName}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('Auteurs', 'Authors')}</span>
                    <span className="text-white">{selectedFw.authors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('Ann\u00e9e', 'Year')}</span>
                    <span className="text-white">{selectedFw.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Version</span>
                    <span className="text-white">{selectedFw.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">DOI</span>
                    <span className="text-blue-400 text-sm">{selectedFw.doi}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Type</span>
                    <span
                      className={"px-2 py-0.5 rounded text-xs font-medium text-white bg-gradient-to-r " + (typeColors[selectedFw.type] || 'from-slate-600 to-slate-500')}
                    >
                      {selectedFw.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('Domaines', 'Domains')}</span>
                    <span className="text-white">{selectedFw.domains}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Constructs</span>
                    <span className="text-white">{selectedFw.constructs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Scope</span>
                    <span className="text-white">{selectedFw.scope}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Relationships */}
      {activeTab === 'relationships' && (
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">
            {"\uD83D\uDD17"} {t('Relations ontologiques inter-cadres', 'Cross-framework Ontological Relationships')}
          </h3>
          <div className="space-y-2">
            {ISOntologyEngine.relationships.map((rel, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-600"
              >
                <span className="px-2 py-1 bg-slate-700 text-white text-xs font-mono rounded">
                  {rel.from}
                </span>
                <span
                  className={"text-sm font-medium " + (relationTypeColors[rel.type] || 'text-slate-400')}
                >
                  {rel.type.replace(/_/g, ' ')}
                </span>
                <span className="text-slate-500">{"\u2192"}</span>
                <span className="px-2 py-1 bg-slate-700 text-white text-xs font-mono rounded">
                  {rel.to}
                </span>
                <span className="text-slate-500 text-xs ml-auto hidden md:inline">
                  {rel.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Mechanisms */}
      {activeTab === 'mechanisms' && (
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">
            {"\u2699\uFE0F"} {t('Cha\u00eenes causales', 'Causal Chains')}
          </h3>
          <div className="space-y-3">
            {ISOntologyEngine.causalMechanisms.map((mech, i) => (
              <div
                key={i}
                className="p-4 bg-slate-900/50 rounded-xl border border-slate-600"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{mech.strategy}</span>
                    <span className="px-1.5 py-0.5 bg-slate-700 text-slate-300 text-xs font-mono rounded">
                      {mech.ericCode}
                    </span>
                  </div>
                  <span
                    className={"px-2 py-0.5 rounded text-xs font-medium border " + (evidenceColors[mech.evidenceLevel] || '')}
                  >
                    {mech.evidenceLevel === 'strong'
                      ? t('\u00C9vidence forte', 'Strong evidence')
                      : mech.evidenceLevel === 'moderate'
                        ? t('\u00C9vidence mod\u00e9r\u00e9e', 'Moderate evidence')
                        : t('\u00C9vidence faible', 'Weak evidence')}
                  </span>
                </div>
                <div className="text-slate-300 text-sm mb-2 font-mono bg-slate-800 p-2 rounded">
                  {mech.mechanism}
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500">{t('Cibles CFIR', 'CFIR Targets')}:</span>
                  {mech.cfirTargets.map((ct) => (
                    <span
                      key={ct}
                      className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded font-mono"
                    >
                      {ct}
                    </span>
                  ))}
                  <span className="text-slate-600">{"\u2192"}</span>
                  <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded">
                    {mech.proctorOutcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Query */}
      {activeTab === 'query' && (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-3">
              {"\uD83D\uDD0D"} {t('Recherche dans l\'ontologie', 'Ontology Search')}
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={queryConstruct}
                onChange={(e) => setQueryConstruct(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleQuery(); }}
                placeholder={t('Entrez un construct (ex: IS11, IC4, Adoption...)', 'Enter a construct (e.g., IS11, IC4, Adoption...)')}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleQuery}
                disabled={!queryConstruct.trim()}
                className={
                  "px-6 py-2.5 font-semibold rounded-lg transition-all " +
                  (queryConstruct.trim()
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                    : "bg-slate-700 text-slate-500 cursor-not-allowed")
                }
              >
                {t('Chercher', 'Search')}
              </button>
            </div>

            {/* Quick query buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-slate-500 text-xs self-center">{t('Rapide', 'Quick')}:</span>
              {quickQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setQueryConstruct(q);
                    const result = ISOntologyEngine.query({ construct: q });
                    setQueryResult(result);
                  }}
                  className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-lg transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Query results */}
          {queryResult && (
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">
                {t('R\u00e9sultats pour', 'Results for')} &quot;{queryConstruct}&quot;
              </h3>

              {/* Related relationships */}
              {queryResult.relationships.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-400 mb-2">
                    {"\uD83D\uDD17"} {t('Relations trouv\u00e9es', 'Relationships found')} ({queryResult.relationships.length})
                  </h4>
                  <div className="space-y-2">
                    {queryResult.relationships.map((rel, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 bg-slate-900/50 rounded-lg text-sm"
                      >
                        <span className="text-white font-mono">{rel.from}</span>
                        <span className={relationTypeColors[rel.type] || 'text-slate-400'}>
                          {rel.type.replace(/_/g, ' ')}
                        </span>
                        <span className="text-slate-500">{"\u2192"}</span>
                        <span className="text-white font-mono">{rel.to}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related mechanisms */}
              {queryResult.mechanisms.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">
                    {"\u2699\uFE0F"} {t('M\u00e9canismes li\u00e9s', 'Related mechanisms')} ({queryResult.mechanisms.length})
                  </h4>
                  <div className="space-y-2">
                    {queryResult.mechanisms.map((mech, i) => (
                      <div
                        key={i}
                        className="p-3 bg-slate-900/50 rounded-lg border border-slate-600"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-bold">{mech.strategy}</span>
                          <span className={"px-2 py-0.5 rounded text-xs border " + (evidenceColors[mech.evidenceLevel] || '')}>
                            {mech.evidenceLevel}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm">{mech.mechanism}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {queryResult.relationships.length === 0 && queryResult.mechanisms.length === 0 && (
                <p className="text-slate-500 text-sm italic">
                  {t('Aucun r\u00e9sultat trouv\u00e9 pour ce construct.', 'No results found for this construct.')}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab: Trace */}
      {activeTab === 'trace' && (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-3">
              {"\uD83D\uDDFA\uFE0F"} {t('Tra\u00e7age Construct \u2192 Outcome', 'Construct \u2192 Outcome Trace')}
            </h3>
            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-sm text-slate-400 block mb-1">
                  {t('Construct CFIR', 'CFIR Construct')}
                </label>
                <select
                  value={traceFrom}
                  onChange={(e) => setTraceFrom(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  {traceConstructs.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400 block mb-1">
                  {t('Outcome Proctor', 'Proctor Outcome')}
                </label>
                <select
                  value={traceTo}
                  onChange={(e) => setTraceTo(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  {traceOutcomes.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleTrace}
                className="py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-lg transition-all"
              >
                {"\uD83D\uDDFA\uFE0F"} {t('Tracer', 'Trace')}
              </button>
            </div>
          </div>

          {/* Trace results */}
          {traceResult && (
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-3">
                {t('Chemins', 'Paths')}: {traceFrom} {"\u2192"} {traceTo}
                <span className="ml-2 px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs rounded-full">
                  {traceResult.length} {t('trouv\u00e9(s)', 'found')}
                </span>
              </h3>
              {traceResult.length === 0 ? (
                <p className="text-slate-500 text-sm italic">
                  {t('Aucun chemin trouv\u00e9 pour cette combinaison.', 'No path found for this combination.')}
                </p>
              ) : (
                <div className="space-y-3">
                  {traceResult.map((path, i) => (
                    <div
                      key={i}
                      className="p-4 bg-slate-900/50 rounded-xl border border-slate-600"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-sm font-mono rounded">
                          {path.construct}
                        </span>
                        <span className="text-slate-500">{"\u2192"}</span>
                        <span className="text-white font-medium">{path.strategy}</span>
                        <span className="px-1.5 py-0.5 bg-slate-700 text-slate-300 text-xs font-mono rounded">
                          {path.ericCode}
                        </span>
                        <span className="text-slate-500">{"\u2192"}</span>
                        <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-sm rounded">
                          {path.outcome}
                        </span>
                      </div>
                      <div className="text-slate-400 text-sm font-mono bg-slate-800 p-2 rounded mb-2">
                        {path.mechanism}
                      </div>
                      <span
                        className={"px-2 py-0.5 rounded text-xs font-medium border " + (evidenceColors[path.evidence] || '')}
                      >
                        {path.evidence === 'strong'
                          ? t('\u00C9vidence forte', 'Strong evidence')
                          : path.evidence === 'moderate'
                            ? t('\u00C9vidence mod\u00e9r\u00e9e', 'Moderate evidence')
                            : t('\u00C9vidence faible', 'Weak evidence')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab: Export */}
      {activeTab === 'export' && (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">
                {"\uD83D\uDCE4"} {t('Export JSON-LD', 'JSON-LD Export')}
              </h3>
              <button
                onClick={() => copyToClipboard(jsonLdString)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all"
              >
                {"\uD83D\uDCCB"} {t('Copier JSON-LD', 'Copy JSON-LD')}
              </button>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              {t(
                'Ontologie compl\u00e8te au format JSON-LD pour int\u00e9gration dans des syst\u00e8mes de connaissances.',
                'Complete ontology in JSON-LD format for integration into knowledge systems.'
              )}
            </p>
            <div className="bg-slate-900 rounded-lg border border-slate-600 p-4 max-h-96 overflow-auto">
              <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                {jsonLdString}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Footer citation */}
      <div className="mt-6 text-center text-xs text-slate-600">
        ISOntologyEngine v{ISOntologyEngine.VERSION} {"\u2022"} MOUDAR® v11.0
      </div>
    </div>
  );
}
