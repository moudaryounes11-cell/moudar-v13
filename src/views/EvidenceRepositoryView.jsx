import React, { useState } from 'react';
/* global EvidenceRepository */

export default function EvidenceRepositoryView({ lang = 'fr' }) {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchCountry, setSearchCountry] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [recsContext, setRecsContext] = useState({
    country: '',
    setting: '',
    frameworks: [],
    tags: []
  });
  const [recsResult, setRecsResult] = useState(null);

  const stats = EvidenceRepository.getStats();
  const allCases = EvidenceRepository.cases;

  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const handleSearch = () => {
    const criteria = {};
    if (searchCountry.trim()) criteria.country = searchCountry.trim();
    if (searchTag.trim()) criteria.tag = searchTag.trim();
    const results = EvidenceRepository.search(criteria);
    setSearchResult(results);
  };

  const handleRecommendations = () => {
    const context = {
      country: recsContext.country || undefined,
      setting: recsContext.setting || undefined,
      frameworks: recsContext.frameworks.length > 0 ? recsContext.frameworks : undefined,
      tags: recsContext.tags.length > 0 ? recsContext.tags : undefined
    };
    const result = EvidenceRepository.getRecommendations(context);
    setRecsResult(result);
  };

  const tabs = [
    { id: 'browse', label: t('Explorer', 'Browse'), icon: '\uD83D\uDCDA' },
    { id: 'search', label: t('Rechercher', 'Search'), icon: '\uD83D\uDD0D' },
    { id: 'recommend', label: t('Recommandations', 'Recommendations'), icon: '\uD83E\uDD16' },
    { id: 'stats', label: t('Statistiques', 'Statistics'), icon: '\uD83D\uDCCA' },
    { id: 'contribute', label: t('Contribuer', 'Contribute'), icon: '\u2795' }
  ];

  const scoreColor = (score) => {
    if (score >= 75) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const scoreBg = (score) => {
    if (score >= 75) return 'bg-green-500/20 border-green-500/30';
    if (score >= 50) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-teal-900/50 to-teal-700/30 rounded-xl border border-teal-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\uD83D\uDCDA"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t('R\u00e9pertoire de Preuves', 'Evidence Repository')} v{EvidenceRepository.VERSION}
            </h1>
            <p className="text-teal-300 text-sm">
              {t(
                'Base de connaissances collabor\u00e9e de cas d\u2019impl\u00e9mentation',
                'Collaborative knowledge base of implementation cases'
              )}
              {' \u2022 '}{stats.totalCases} {t('cas', 'cases')}
              {' \u2022 '}{stats.countryCount} {t('pays', 'countries')}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              'px-4 py-2 rounded-lg text-sm font-medium transition-all ' +
              (activeTab === tab.id
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white')
            }
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ TAB: Browse ═══ */}
      {activeTab === 'browse' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white mb-4">
            {"\uD83D\uDCDA"} {t('Tous les cas', 'All Cases')} ({allCases.length})
          </h2>
          {allCases.map((c) => (
            <details
              key={c.id}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
              open={selectedCase === c.id}
              onClick={() => setSelectedCase(selectedCase === c.id ? null : c.id)}
            >
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold">{c.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {"\uD83C\uDF0D"} {c.country} ({c.region})
                      {' \u2022 '}{"\uD83C\uDFE5"} {c.setting}
                      {' \u2022 '}{"\uD83D\uDCCB"} {c.designType}
                    </p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {c.frameworks.map((fw) => (
                        <span
                          key={fw}
                          className="px-2 py-0.5 bg-teal-500/20 text-teal-300 text-xs rounded-full"
                        >
                          {fw}
                        </span>
                      ))}
                      {c.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-600 text-slate-300 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={
                    'px-2 py-1 rounded text-xs font-medium ' +
                    (c.status === 'published'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400')
                  }>
                    {c.status}
                  </span>
                </div>
              </summary>
              <div className="p-4 border-t border-slate-700 bg-slate-900/50">
                {/* Case details */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-teal-400 mb-2">
                      {t('Population', 'Population')}
                    </h4>
                    <p className="text-slate-300 text-sm">{c.population}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-teal-400 mb-2">
                      {t('Innovation', 'Innovation')}
                    </h4>
                    <p className="text-slate-300 text-sm">{c.innovation}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-teal-400 mb-2">
                      {t('Design', 'Design')}
                    </h4>
                    <p className="text-slate-300 text-sm">{c.designType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-teal-400 mb-2">
                      {t('Taille d\u2019\u00e9chantillon', 'Sample Size')}
                    </h4>
                    <p className="text-slate-300 text-sm">N = {c.sampleSize.toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-teal-400 mb-2">
                      {t('Dur\u00e9e', 'Duration')}
                    </h4>
                    <p className="text-slate-300 text-sm">{c.duration}</p>
                  </div>
                </div>

                {/* CFIR Scores */}
                {c.cfirScores && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">
                      {"\uD83C\uDFD7\uFE0F"} CFIR 2.0 Scores
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(c.cfirScores).map(([key, val]) => (
                        <div key={key} className="text-center p-2 bg-slate-800 rounded-lg">
                          <div className={'text-lg font-bold ' + scoreColor(val)}>{val}%</div>
                          <div className="text-xs text-slate-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* RE-AIM Scores */}
                {c.reaimScores && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">
                      {"\uD83C\uDFAF"} RE-AIM Scores
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(c.reaimScores).map(([key, val]) => (
                        <div key={key} className="text-center p-2 bg-slate-800 rounded-lg">
                          <div className={'text-lg font-bold ' + scoreColor(val)}>{val}%</div>
                          <div className="text-xs text-slate-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Proctor Outcomes */}
                {c.proctorOutcomes && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-amber-400 mb-2">
                      {"\uD83D\uDCCB"} Proctor Outcomes (2011)
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(c.proctorOutcomes).map(([key, val]) => (
                        <div key={key} className="text-center p-2 bg-slate-800 rounded-lg">
                          <div className={'text-lg font-bold ' + scoreColor(val)}>{val}%</div>
                          <div className="text-xs text-slate-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Findings & Lessons */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <h4 className="text-sm font-semibold text-green-400 mb-1">
                      {"\u2705"} {t('R\u00e9sultats cl\u00e9s', 'Key Findings')}
                    </h4>
                    <p className="text-slate-300 text-sm">{c.keyFindings}</p>
                  </div>
                  <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <h4 className="text-sm font-semibold text-amber-400 mb-1">
                      {"\uD83D\uDCA1"} {t('Le\u00e7ons apprises', 'Lessons Learned')}
                    </h4>
                    <p className="text-slate-300 text-sm">{c.lessonsLearned}</p>
                  </div>
                </div>

                {/* Strategies & Tags */}
                <div className="flex flex-wrap gap-1">
                  {c.strategies.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  {t('Cr\u00e9\u00e9 le', 'Created')} {c.createdAt}
                  {c.publicationDOI && (
                    <span> {'\u2022'} DOI: {c.publicationDOI}</span>
                  )}
                </div>
              </div>
            </details>
          ))}
        </div>
      )}

      {/* ═══ TAB: Search ═══ */}
      {activeTab === 'search' && (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-4">
              {"\uD83D\uDD0D"} {t('Rechercher des cas', 'Search Cases')}
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  {t('Pays', 'Country')}
                </label>
                <input
                  type="text"
                  value={searchCountry}
                  onChange={(e) => setSearchCountry(e.target.value)}
                  placeholder={t('Ex: Morocco, Rwanda...', 'Ex: Morocco, Rwanda...')}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  {t('Tag / Mot-cl\u00e9', 'Tag / Keyword')}
                </label>
                <input
                  type="text"
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                  placeholder={t('Ex: mental-health, digital-health...', 'Ex: mental-health, digital-health...')}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500"
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold rounded-xl transition-all"
            >
              {"\uD83D\uDD0D"} {t('Rechercher', 'Search')}
            </button>
          </div>

          {/* Search Results */}
          {searchResult && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-semibold mb-4">
                {searchResult.length} {t('r\u00e9sultat(s) trouv\u00e9(s)', 'result(s) found')}
              </h3>

              {searchResult.length === 0 && (
                <p className="text-slate-400 text-sm">
                  {t('Aucun cas ne correspond \u00e0 vos crit\u00e8res.', 'No cases match your criteria.')}
                </p>
              )}

              <div className="space-y-3">
                {searchResult.map((c) => (
                  <div key={c.id} className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                    <h4 className="text-white font-medium">{c.title}</h4>
                    <p className="text-slate-400 text-sm mt-1">
                      {"\uD83C\uDF0D"} {c.country} {'\u2022'} {c.setting} {'\u2022'} {c.designType}
                    </p>
                    <p className="text-slate-300 text-sm mt-2">{c.keyFindings}</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {c.frameworks.map((fw) => (
                        <span
                          key={fw}
                          className="px-2 py-0.5 bg-teal-500/20 text-teal-300 text-xs rounded-full"
                        >
                          {fw}
                        </span>
                      ))}
                      {c.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-600 text-slate-300 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ TAB: Recommendations ═══ */}
      {activeTab === 'recommend' && (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-4">
              {"\uD83E\uDD16"} {t('Recommandations bas\u00e9es sur les patterns', 'Pattern-Based Recommendations')}
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              {t(
                'D\u00e9crivez votre contexte pour recevoir des recommandations bas\u00e9es sur les cas similaires du r\u00e9pertoire.',
                'Describe your context to receive recommendations based on similar cases in the repository.'
              )}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  {t('Pays', 'Country')}
                </label>
                <input
                  type="text"
                  value={recsContext.country}
                  onChange={(e) => setRecsContext({ ...recsContext, country: e.target.value })}
                  placeholder={t('Ex: Morocco', 'Ex: Morocco')}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  {t('Milieu', 'Setting')}
                </label>
                <input
                  type="text"
                  value={recsContext.setting}
                  onChange={(e) => setRecsContext({ ...recsContext, setting: e.target.value })}
                  placeholder={t('Ex: Primary care', 'Ex: Primary care')}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  {t('Cadres (s\u00e9par\u00e9s par des virgules)', 'Frameworks (comma-separated)')}
                </label>
                <input
                  type="text"
                  value={recsContext.frameworks.join(', ')}
                  onChange={(e) =>
                    setRecsContext({
                      ...recsContext,
                      frameworks: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="Ex: CFIR, REAIM"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  {t('Tags (s\u00e9par\u00e9s par des virgules)', 'Tags (comma-separated)')}
                </label>
                <input
                  type="text"
                  value={recsContext.tags.join(', ')}
                  onChange={(e) =>
                    setRecsContext({
                      ...recsContext,
                      tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="Ex: mental-health, LMIC"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500"
                />
              </div>
            </div>

            <button
              onClick={handleRecommendations}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-xl transition-all"
            >
              {"\uD83E\uDD16"} {t('G\u00e9n\u00e9rer les recommandations', 'Generate Recommendations')}
            </button>
          </div>

          {/* Recommendations Results */}
          {recsResult && (
            <div className="space-y-4">
              {/* Confidence & summary */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">
                    {"\uD83D\uDCCA"} {t('R\u00e9sultats', 'Results')}
                  </h3>
                  <span className={
                    'px-3 py-1 rounded-full text-sm font-medium ' +
                    (recsResult.confidence === 'high'
                      ? 'bg-green-500/20 text-green-400'
                      : recsResult.confidence === 'moderate'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400')
                  }>
                    {t('Confiance', 'Confidence')}: {recsResult.confidence}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">
                  {t('Bas\u00e9 sur', 'Based on')} {recsResult.basedOn}
                </p>
                {recsResult.note && (
                  <p className="text-slate-500 text-xs mt-2 italic">{recsResult.note}</p>
                )}
              </div>

              {/* Recommended Strategies */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-white font-semibold mb-3">
                  {"\uD83C\uDFC6"} {t('Strat\u00e9gies recommand\u00e9es', 'Recommended Strategies')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recsResult.recommendedStrategies.map((s, i) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-medium"
                    >
                      #{i + 1} {s}
                      {recsResult.strategyFrequency[s] && (
                        <span className="ml-1 text-xs text-purple-400">
                          ({recsResult.strategyFrequency[s]}x)
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Average Outcomes */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-white font-semibold mb-3">
                  {"\uD83D\uDCCB"} {t('Outcomes moyens des cas similaires', 'Average Outcomes from Similar Cases')}
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(recsResult.averageOutcomes).map(([key, val]) => (
                    <div key={key} className="text-center p-3 bg-slate-900/50 rounded-lg">
                      <div className={'text-2xl font-bold ' + scoreColor(Math.round(val))}>
                        {Math.round(val)}%
                      </div>
                      <div className="text-xs text-slate-400 capitalize mt-1">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Cases */}
              {recsResult.similarCases && recsResult.similarCases.length > 0 && (
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-white font-semibold mb-3">
                    {"\uD83D\uDD17"} {t('Cas similaires', 'Similar Cases')}
                  </h3>
                  <div className="space-y-3">
                    {recsResult.similarCases.map((c) => (
                      <div key={c.id} className="p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium text-sm">{c.title}</h4>
                            <p className="text-slate-400 text-xs mt-1">
                              {c.country} {'\u2022'} {c.setting}
                            </p>
                          </div>
                          <span className="text-teal-400 text-xs font-medium">
                            {t('Score de similarit\u00e9', 'Similarity')}: {c._similarityScore}
                          </span>
                        </div>
                        <p className="text-slate-300 text-xs mt-2">{c.keyFindings}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══ TAB: Statistics ═══ */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
          {/* Overview KPIs */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
              <div className="text-slate-400 text-sm mb-2">{t('Total des cas', 'Total Cases')}</div>
              <div className="text-4xl font-bold text-teal-400">{stats.totalCases}</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
              <div className="text-slate-400 text-sm mb-2">{t('Pays repr\u00e9sent\u00e9s', 'Countries')}</div>
              <div className="text-4xl font-bold text-blue-400">{stats.countryCount}</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
              <div className="text-slate-400 text-sm mb-2">{t('Cadres utilis\u00e9s', 'Frameworks Used')}</div>
              <div className="text-4xl font-bold text-purple-400">
                {Object.keys(stats.frameworkUsage).length}
              </div>
            </div>
          </div>

          {/* Country Distribution */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">
              {"\uD83C\uDF0D"} {t('R\u00e9partition par pays', 'Distribution by Country')}
            </h3>
            <div className="space-y-2">
              {Object.entries(stats.countries)
                .sort(([, a], [, b]) => b - a)
                .map(([country, count]) => (
                  <div key={country} className="flex items-center gap-3">
                    <span className="text-white font-medium w-32">{country}</span>
                    <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: (count / stats.totalCases * 100) + '%' }}
                      />
                    </div>
                    <span className="text-teal-400 text-sm font-medium w-16 text-right">
                      {count} {t('cas', 'cases')}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Framework Usage */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">
              {"\uD83D\uDCCB"} {t('Utilisation des cadres', 'Framework Usage')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(stats.frameworkUsage)
                .sort(([, a], [, b]) => b - a)
                .map(([fw, count]) => (
                  <div key={fw} className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                    <div className="text-2xl font-bold text-purple-400">{count}</div>
                    <div className="text-sm text-slate-300 font-medium">{fw}</div>
                    <div className="text-xs text-slate-500">
                      {Math.round(count / stats.totalCases * 100)}% {t('des cas', 'of cases')}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Strategy Usage */}
          {stats.strategyUsage && Object.keys(stats.strategyUsage).length > 0 && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">
                {"\u2699\uFE0F"} {t('Strat\u00e9gies ERIC les plus utilis\u00e9es', 'Most Used ERIC Strategies')}
              </h3>
              <div className="space-y-2">
                {Object.entries(stats.strategyUsage)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10)
                  .map(([strategy, count]) => (
                    <div key={strategy} className="flex items-center gap-3">
                      <span className="text-white font-mono text-sm w-12">{strategy}</span>
                      <div className="flex-1 h-2.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{
                            width: (count / Math.max(...Object.values(stats.strategyUsage)) * 100) + '%'
                          }}
                        />
                      </div>
                      <span className="text-blue-400 text-sm w-8 text-right">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ TAB: Contribute ═══ */}
      {activeTab === 'contribute' && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="text-center mb-6">
            <span className="text-5xl">{"\u2795"}</span>
            <h2 className="text-xl font-bold text-white mt-3">
              {t('Contribuez au r\u00e9pertoire', 'Contribute to the Repository')}
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
              {t(
                'Partagez vos exp\u00e9riences d\u2019impl\u00e9mentation pour enrichir la base de connaissances collective. Toutes les donn\u00e9es sont anonymis\u00e9es automatiquement.',
                'Share your implementation experiences to enrich the collective knowledge base. All data is automatically anonymized.'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <h3 className="text-white font-semibold mb-2">
                {"\uD83D\uDD12"} {t('S\u00e9curit\u00e9 & Confidentialit\u00e9', 'Security & Privacy')}
              </h3>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>{'\u2022'} {t('Anonymisation automatique', 'Automatic anonymization')}</li>
                <li>{'\u2022'} {t('Consentement \u00e9clair\u00e9 requis', 'Informed consent required')}</li>
                <li>{'\u2022'} {t('Conforme RGPD / HIPAA', 'GDPR / HIPAA compliant')}</li>
                <li>{'\u2022'} {t('Donn\u00e9es agr\u00e9g\u00e9es uniquement', 'Aggregated data only')}</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <h3 className="text-white font-semibold mb-2">
                {"\uD83C\uDFC6"} {t('B\u00e9n\u00e9fices', 'Benefits')}
              </h3>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>{'\u2022'} {t('Citation dans les analyses', 'Citation in analyses')}</li>
                <li>{'\u2022'} {t('Acc\u00e8s au benchmarking avanc\u00e9', 'Access to advanced benchmarking')}</li>
                <li>{'\u2022'} {t('Recommandations personnalis\u00e9es', 'Personalized recommendations')}</li>
                <li>{'\u2022'} {t('Contribution \u00e0 la science ouverte', 'Contribution to open science')}</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
            <h3 className="text-teal-400 font-semibold mb-2">
              {"\uD83D\uDCE7"} {t('Comment contribuer', 'How to Contribute')}
            </h3>
            <p className="text-slate-300 text-sm">
              {t(
                'Utilisez l\u2019API MOUDAR (POST /evidence/case) ou contactez notre \u00e9quipe pour soumettre un cas. Les cas sont valid\u00e9s par un comit\u00e9 scientifique avant publication.',
                'Use the MOUDAR API (POST /evidence/case) or contact our team to submit a case. Cases are validated by a scientific committee before publication.'
              )}
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-slate-500">
              MOUDAR{'\u00AE'} Evidence Repository v{EvidenceRepository.VERSION}
              {' \u2022 '}{stats.totalCases} {t('cas index\u00e9s', 'indexed cases')}
              {' \u2022 '}{stats.countryCount} {t('pays', 'countries')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
