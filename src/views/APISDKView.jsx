import React, { useState } from 'react';
/* global MoudarSDK */

export default function APISDKView({ lang = 'fr' }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLang, setSelectedLang] = useState('python');

  const docs = MoudarSDK.generateDocs(lang);
  const endpoints = Object.keys(MoudarSDK.endpoints);
  const samples = MoudarSDK.codeSamples;

  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const methodColor = (endpoint) => {
    if (endpoint.startsWith('GET')) return { bg: 'bg-green-500/20', text: 'text-green-400', badge: 'bg-green-600' };
    if (endpoint.startsWith('POST')) return { bg: 'bg-blue-500/20', text: 'text-blue-400', badge: 'bg-blue-600' };
    if (endpoint.startsWith('PUT')) return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', badge: 'bg-yellow-600' };
    if (endpoint.startsWith('DELETE')) return { bg: 'bg-red-500/20', text: 'text-red-400', badge: 'bg-red-600' };
    return { bg: 'bg-slate-500/20', text: 'text-slate-400', badge: 'bg-slate-600' };
  };

  const tabs = [
    { id: 'overview', label: t('Vue d\u2019ensemble', 'Overview'), icon: '\uD83C\uDFE0' },
    { id: 'endpoints', label: 'Endpoints', icon: '\uD83D\uDD17' },
    { id: 'sdk', label: 'SDK', icon: '\uD83D\uDCE6' },
    { id: 'integrations', label: t('Int\u00e9grations', 'Integrations'), icon: '\uD83D\uDD0C' }
  ];

  const sdkLanguages = [
    { id: 'python', label: 'Python', icon: '\uD83D\uDC0D' },
    { id: 'r', label: 'R', icon: '\uD83D\uDCCA' },
    { id: 'stata', label: 'Stata', icon: '\uD83D\uDCC8' }
  ];

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-indigo-900/50 to-indigo-700/30 rounded-xl border border-indigo-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\uD83D\uDD17"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {docs.title}
            </h1>
            <p className="text-indigo-300 text-sm">
              {docs.totalEndpoints} endpoints
              {' \u2022 '}{docs.sdkLanguages.length} SDK {t('langages', 'languages')}
              {' \u2022 '}{docs.rateLimit}
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
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white')
            }
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ TAB: Overview ═══ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Hero Card */}
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-3">
                {t('API REST pour la Science de l\u2019Impl\u00e9mentation', 'REST API for Implementation Science')}
              </h2>
              <p className="text-indigo-300 max-w-2xl mx-auto">
                {t(
                  'Int\u00e9grez MOUDAR dans vos workflows de recherche. \u00C9valuez CFIR 2.0, RE-AIM, Proctor, NPT et 73 strat\u00e9gies ERIC via une API unifi\u00e9e.',
                  'Integrate MOUDAR into your research workflows. Evaluate CFIR 2.0, RE-AIM, Proctor, NPT and 73 ERIC strategies through a unified API.'
                )}
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-600/50">
                <div className="text-3xl font-bold text-indigo-400">{docs.totalEndpoints}</div>
                <div className="text-slate-400 text-sm">Endpoints</div>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-600/50">
                <div className="text-3xl font-bold text-green-400">{docs.sdkLanguages.length}</div>
                <div className="text-slate-400 text-sm">SDK {t('Langages', 'Languages')}</div>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-600/50">
                <div className="text-3xl font-bold text-amber-400">1000</div>
                <div className="text-slate-400 text-sm">{t('Requ\u00eates/heure', 'Requests/hour')}</div>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-600/50">
                <div className="text-3xl font-bold text-purple-400">REST</div>
                <div className="text-slate-400 text-sm">JSON API</div>
              </div>
            </div>

            {/* Quick Start */}
            <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-600">
              <h3 className="text-white font-semibold mb-3">
                {"\u26A1"} {t('D\u00e9marrage rapide', 'Quick Start')}
              </h3>
              <p className="text-slate-400 text-sm mb-2">Base URL: <code className="text-indigo-400">{docs.baseUrl}</code></p>
            </div>
          </div>

          {/* Authentication Example */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">
              {"\uD83D\uDD10"} {t('Authentification', 'Authentication')}
            </h3>
            <p className="text-slate-400 text-sm mb-4">{docs.authentication}</p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
              <p className="text-slate-500"># {t('Exemple d\u2019authentification', 'Authentication example')}</p>
              <p className="text-green-400">curl -X POST {docs.baseUrl}/cfir/evaluate \</p>
              <p className="text-green-400 pl-4">-H "Authorization: Bearer YOUR_API_KEY" \</p>
              <p className="text-green-400 pl-4">-H "Content-Type: application/json" \</p>
              <p className="text-green-400 pl-4">-d '{"{"}"project_data": {"{"}"name": "My Project"{"}"}{"}"}' </p>
            </div>
            <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <p className="text-amber-400 text-sm">
                {"\u26A0\uFE0F"} {t(
                  'Limite: ' + docs.rateLimit + '. Contactez-nous pour un plan Enterprise.',
                  'Rate limit: ' + docs.rateLimit + '. Contact us for Enterprise plan.'
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB: Endpoints ═══ */}
      {activeTab === 'endpoints' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">
              {"\uD83D\uDD17"} {t('Liste des endpoints', 'Endpoint List')} ({endpoints.length})
            </h2>
            <span className="text-slate-400 text-sm">
              Base: <code className="text-indigo-400">{docs.baseUrl}</code>
            </span>
          </div>

          {endpoints.map((ep) => {
            const info = MoudarSDK.endpoints[ep];
            const colors = methodColor(ep);
            const method = ep.split(' ')[0];
            const path = ep.split(' ').slice(1).join(' ');

            return (
              <details
                key={ep}
                className={'bg-slate-800 rounded-xl border border-slate-700 overflow-hidden'}
              >
                <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={
                      'px-2.5 py-1 rounded text-xs font-bold text-white ' + colors.badge
                    }>
                      {method}
                    </span>
                    <span className="text-white font-mono text-sm">{path}</span>
                    <span className="text-slate-400 text-sm ml-auto hidden md:inline">
                      {info.description}
                    </span>
                    {info.auth === 'none' && (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
                        {t('Public', 'Public')}
                      </span>
                    )}
                    {info.auth === 'API key' && (
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded">
                        {"\uD83D\uDD11"} API Key
                      </span>
                    )}
                  </div>
                </summary>
                <div className="p-4 border-t border-slate-700 bg-slate-900/50">
                  <p className="text-slate-300 text-sm mb-3">{info.description}</p>

                  {info.params && info.params.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">
                        {t('Param\u00e8tres', 'Parameters')}
                      </h4>
                      <div className="space-y-1">
                        {info.params.map((param, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-indigo-400 font-mono text-xs">{param}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase mb-1">
                      {t('R\u00e9ponse', 'Response')}
                    </h4>
                    <p className="text-slate-300 text-sm">{info.returns}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase mb-1">
                      {t('Authentification', 'Authentication')}
                    </h4>
                    <span className={
                      'px-2 py-0.5 rounded text-xs ' +
                      (info.auth === 'none'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-amber-500/20 text-amber-400')
                    }>
                      {info.auth === 'none' ? t('Aucune', 'None') : info.auth}
                    </span>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      )}

      {/* ═══ TAB: SDK ═══ */}
      {activeTab === 'sdk' && (
        <div className="space-y-4">
          {/* Language Selector */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-4">
              {"\uD83D\uDCE6"} {t('SDK & Biblioth\u00e8ques', 'SDK & Libraries')}
            </h2>
            <div className="flex gap-2 flex-wrap">
              {sdkLanguages.map((sdkLang) => (
                <button
                  key={sdkLang.id}
                  onClick={() => setSelectedLang(sdkLang.id)}
                  className={
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all ' +
                    (selectedLang === sdkLang.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white')
                  }
                >
                  {sdkLang.icon} {sdkLang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Code Samples */}
          {samples[selectedLang] && (
            <div className="space-y-4">
              {/* Install */}
              {samples[selectedLang].install && (
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-white font-semibold mb-3">
                    {"\u2699\uFE0F"} {t('Installation & Configuration', 'Installation & Configuration')}
                  </h3>
                  <pre className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 whitespace-pre-wrap overflow-x-auto">
                    {samples[selectedLang].install}
                  </pre>
                </div>
              )}

              {/* Evaluate */}
              {samples[selectedLang].evaluate && (
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-white font-semibold mb-3">
                    {"\uD83C\uDFD7\uFE0F"} {t('\u00C9valuation CFIR 2.0', 'CFIR 2.0 Evaluation')}
                  </h3>
                  <pre className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 whitespace-pre-wrap overflow-x-auto">
                    {samples[selectedLang].evaluate}
                  </pre>
                </div>
              )}

              {/* Export */}
              {samples[selectedLang].export && (
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-white font-semibold mb-3">
                    {"\uD83D\uDCE4"} {t('Export de donn\u00e9es', 'Data Export')}
                  </h3>
                  <pre className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 whitespace-pre-wrap overflow-x-auto">
                    {samples[selectedLang].export}
                  </pre>
                </div>
              )}

              {/* Evidence */}
              {samples[selectedLang].evidence && (
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-white font-semibold mb-3">
                    {"\uD83D\uDCDA"} {t('R\u00e9pertoire de preuves', 'Evidence Repository')}
                  </h3>
                  <pre className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 whitespace-pre-wrap overflow-x-auto">
                    {samples[selectedLang].evidence}
                  </pre>
                </div>
              )}

              {/* Description (for REDCap/DHIS2) */}
              {samples[selectedLang].description && (
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-white font-semibold mb-3">
                    {"\uD83D\uDCC4"} {t('Description', 'Description')}
                  </h3>
                  <p className="text-slate-300 text-sm">{samples[selectedLang].description}</p>
                  {samples[selectedLang].fields && (
                    <div className="mt-3 bg-slate-900 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">
                        {t('Champs', 'Fields')}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {samples[selectedLang].fields.map((field, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded font-mono">
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {samples[selectedLang].dataElements && (
                    <div className="mt-3 bg-slate-900 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">
                        Data Elements
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {samples[selectedLang].dataElements.map((el, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded font-mono">
                            {el}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══ TAB: Integrations ═══ */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white mb-4">
            {"\uD83D\uDD0C"} {t('Int\u00e9grations \u00c9cosyst\u00e8me', 'Ecosystem Integrations')}
          </h2>

          {/* REDCap */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">{"\uD83D\uDFE5"}</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">REDCap</h3>
                <p className="text-slate-400 text-sm">
                  {t('Dictionnaire de donn\u00e9es d\u2019impl\u00e9mentation', 'Implementation Data Dictionary')}
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-3">
              {samples.redcap
                ? samples.redcap.description
                : t(
                    'G\u00e9n\u00e9rez des dictionnaires REDCap compatibles pour la collecte de donn\u00e9es d\u2019outcomes Proctor et de construits CFIR 2.0.',
                    'Generate REDCap-compatible dictionaries for Proctor outcome and CFIR 2.0 construct data collection.'
                  )}
            </p>
            {samples.redcap && samples.redcap.fields && (
              <div className="bg-slate-900 rounded-lg p-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">
                  {t('Champs g\u00e9n\u00e9r\u00e9s', 'Generated Fields')}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {samples.redcap.fields.slice(0, 8).map((field, i) => (
                    <span key={i} className="px-2 py-0.5 bg-red-500/10 text-red-300 text-xs rounded font-mono">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-3 text-sm">
              <code className="text-indigo-400">GET {docs.baseUrl}/export/redcap</code>
            </div>
          </div>

          {/* DHIS2 */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">{"\uD83C\uDF10"}</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">DHIS2</h3>
                <p className="text-slate-400 text-sm">
                  {t('Paquet de m\u00e9tadonn\u00e9es pour HMIS', 'Metadata Package for HMIS')}
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-3">
              {samples.dhis2
                ? samples.dhis2.description
                : t(
                    'Exportez les indicateurs d\u2019impl\u00e9mentation sous forme de paquets DHIS2 pour les syst\u00e8mes d\u2019information sanitaire nationaux.',
                    'Export implementation indicators as DHIS2 packages for national health information systems.'
                  )}
            </p>
            {samples.dhis2 && samples.dhis2.dataElements && (
              <div className="bg-slate-900 rounded-lg p-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">
                  Data Elements
                </h4>
                <div className="flex flex-wrap gap-1">
                  {samples.dhis2.dataElements.map((el, i) => (
                    <span key={i} className="px-2 py-0.5 bg-blue-500/10 text-blue-300 text-xs rounded font-mono">
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-3 text-sm">
              <code className="text-indigo-400">GET {docs.baseUrl}/export/dhis2</code>
            </div>
          </div>

          {/* Jupyter Notebook */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">{"\uD83D\uDCD3"}</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Jupyter Notebook</h3>
                <p className="text-slate-400 text-sm">
                  {t('Analyse interactive en Python', 'Interactive Python Analysis')}
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-3">
              {t(
                'Utilisez le SDK Python dans vos notebooks Jupyter pour des analyses interactives. Export en CSV, JSON ou Parquet.',
                'Use the Python SDK in your Jupyter notebooks for interactive analyses. Export to CSV, JSON or Parquet.'
              )}
            </p>
            <pre className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400 whitespace-pre-wrap overflow-x-auto">
              {samples.python ? samples.python.export : '# pip install moudar\nimport moudar\nclient = moudar.Client(api_key="YOUR_KEY")'}
            </pre>
            <div className="mt-3 text-sm">
              <code className="text-indigo-400">GET {docs.baseUrl}/export/python</code>
            </div>
          </div>

          {/* R / RStudio */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">{"\uD83D\uDCCA"}</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">R / RStudio</h3>
                <p className="text-slate-400 text-sm">
                  {t('Package R pour analyses statistiques', 'R Package for Statistical Analysis')}
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-3">
              {t(
                'Le package R `moudar` permet d\u2019\u00e9valuer les cadres IS, d\u2019exporter en RDS et de g\u00e9n\u00e9rer des visualisations ggplot2.',
                'The R package `moudar` allows IS framework evaluation, RDS export and ggplot2 visualization.'
              )}
            </p>
            <pre className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400 whitespace-pre-wrap overflow-x-auto">
              {samples.r ? samples.r.export : '# install.packages("moudar")\nlibrary(moudar)'}
            </pre>
            <div className="mt-3 text-sm">
              <code className="text-indigo-400">GET {docs.baseUrl}/export/r</code>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-slate-500">
        {docs.citation}
      </div>
    </div>
  );
}
