import React, { useState } from 'react';
/* global QualitativeAssistant */

export default function QualitativeView({ lang = 'fr' }) {
  const [activeTab, setActiveTab] = useState('coding');
  const [text, setText] = useState('');
  const [codes, setCodes] = useState([]);

  const handleAutoCode = () => {
    setCodes(QualitativeAssistant.autoCode(text));
  };

  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const confidenceColors = {
    high: 'bg-green-100 text-green-700 border-green-300',
    moderate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    low: 'bg-red-100 text-red-700 border-red-300'
  };

  const tabs = [
    { id: 'coding', label: t('Codage', 'Coding'), icon: '\uD83D\uDD0D' },
    { id: 'scheme', label: t('Sch\u00e9ma de codage', 'Coding Scheme'), icon: '\uD83D\uDCCB' },
    { id: 'rating', label: t('\u00C9chelle de notation', 'Rating Scale'), icon: '\uD83D\uDCCA' }
  ];

  const codingScheme = QualitativeAssistant.codingScheme;
  const ratingScale = QualitativeAssistant.ratingScale;

  return (
    <div className="fade-in">
      {/* Header banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-violet-900/50 to-violet-700/30 rounded-xl border border-violet-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\uD83D\uDD0D"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t('Analyse Qualitative CFIR', 'CFIR Qualitative Analysis')}
            </h1>
            <p className="text-violet-300 text-sm">
              {t(
                'Codage d\u00e9ductif CFIR 2.0 \u2014 ' + QualitativeAssistant.citation,
                'CFIR 2.0 deductive coding \u2014 ' + QualitativeAssistant.citation
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              "px-4 py-2 rounded-lg text-sm font-medium transition-all " +
              (activeTab === tab.id
                ? "bg-violet-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white")
            }
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Coding */}
      {activeTab === 'coding' && (
        <div className="space-y-6">
          {/* Textarea for qualitative data */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-3">
              {"\uD83D\uDCDD"} {t('Donn\u00e9es qualitatives', 'Qualitative Data')}
            </h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t(
                'Collez ici un extrait d\'entrevue ou de notes de terrain pour le codage automatique CFIR...',
                'Paste an interview excerpt or field notes here for automatic CFIR coding...'
              )}
              className="w-full h-48 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 resize-y focus:outline-none focus:border-violet-500"
            />
            <button
              onClick={handleAutoCode}
              disabled={!text.trim()}
              className={
                "mt-3 w-full py-3 font-semibold rounded-xl transition-all " +
                (text.trim()
                  ? "bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white"
                  : "bg-slate-700 text-slate-500 cursor-not-allowed")
              }
            >
              {"\u2699\uFE0F"} {t('Auto-coder (mots-cl\u00e9s CFIR)', 'Auto-code (CFIR keywords)')}
            </button>
          </div>

          {/* Detected codes */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-3">
              {"\uD83C\uDFF7\uFE0F"} {t('Codes d\u00e9tect\u00e9s', 'Detected Codes')}
              {codes.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-violet-500/20 text-violet-400 text-xs rounded-full">
                  {codes.length}
                </span>
              )}
            </h3>
            {codes.length === 0 ? (
              <p className="text-slate-500 text-sm italic">
                {t(
                  'Aucun code d\u00e9tect\u00e9. Entrez du texte et lancez l\'auto-codage.',
                  'No codes detected. Enter text and run auto-coding.'
                )}
              </p>
            ) : (
              <div className="space-y-2">
                {codes.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-violet-500/20 text-violet-400 text-sm font-mono font-bold rounded">
                        {c.code}
                      </span>
                      <span className="text-slate-300 text-sm">
                        {t('Correspondances', 'Matches')}: {c.matchCount}
                      </span>
                    </div>
                    <span
                      className={"px-2 py-0.5 rounded text-xs font-medium border " + (confidenceColors[c.confidence] || '')}
                    >
                      {c.confidence === 'high'
                        ? t('\u00C9lev\u00e9e', 'High')
                        : c.confidence === 'moderate'
                          ? t('Mod\u00e9r\u00e9e', 'Moderate')
                          : t('Faible', 'Low')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Coding Scheme */}
      {activeTab === 'scheme' && (
        <div className="space-y-4">
          {Object.keys(codingScheme).map((domainKey) => {
            const domain = codingScheme[domainKey];
            return (
              <div
                key={domainKey}
                className="bg-slate-800 rounded-xl p-4 border border-slate-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: domain.color }}
                  />
                  <h3 className="text-lg font-bold text-white">
                    {domain.domain[lang] || domain.domain.fr}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {domain.codes.length} {t('codes', 'codes')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {domain.codes.map((code) => (
                    <span
                      key={code}
                      className="px-3 py-1 rounded-lg text-sm font-mono font-medium text-white"
                      style={{ backgroundColor: domain.color + '33', borderLeft: '3px solid ' + domain.color }}
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Rating Scale */}
      {activeTab === 'rating' && (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-4">
            <h3 className="text-lg font-bold text-white mb-1">
              {"\uD83D\uDCCA"} {t('\u00C9chelle de notation CFIR (-2 \u00e0 +2)', 'CFIR Rating Scale (-2 to +2)')}
            </h3>
            <p className="text-slate-400 text-sm">
              {t(
                'Source : ' + QualitativeAssistant.hamiltonCitation,
                'Source: ' + QualitativeAssistant.hamiltonCitation
              )}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(ratingScale).map((key) => {
              const rating = ratingScale[key];
              return (
                <div
                  key={key}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 flex items-start gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: rating.color }}
                  >
                    {key}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {rating.label[lang] || rating.label.fr}
                    </div>
                    <div className="text-slate-500 text-xs mt-1">
                      {t('Valeur', 'Value')}: {key}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer citation */}
      <div className="mt-6 text-center text-xs text-slate-600">
        {QualitativeAssistant.citation} {"\u2022"} MOUDAR® v11.0
      </div>
    </div>
  );
}
