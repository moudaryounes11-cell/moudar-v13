import React, { useState } from 'react';
/* global PRISMEvaluator */

export default function PRISMView({ lang = 'fr' }) {
  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const [activeTab, setActiveTab] = useState('context');
  const [scores, setScores] = useState({});
  const [reaim, setReaim] = useState({
    reach: 0,
    effectiveness: 0,
    adoption: 0,
    implementation: 0,
    maintenance: 0
  });

  const evaluation = PRISMEvaluator.evaluate(scores, reaim, lang);

  const handleScoreChange = (itemId, value) => {
    setScores((prev) => ({ ...prev, [itemId]: Number(value) }));
  };

  const handleReaimChange = (dim, value) => {
    setReaim((prev) => ({ ...prev, [dim]: Number(value) }));
  };

  const globalScore = evaluation.context ? evaluation.context.globalScore : 0;
  const phase = evaluation.phase || { label: {}, icon: '' };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83C\uDFE5 "}PRISM + RE-AIM
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-normal">
                D2
              </span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {PRISMEvaluator.citation}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">{globalScore}%</div>
              <p className="text-xs text-gray-500">{t('Score global', 'Global Score')}</p>
            </div>
            <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border">
              <div className="text-xl">{phase.icon}</div>
              <p className="text-xs font-medium text-gray-700">
                {phase.label[lang] || phase.label.en || ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('context')}
          className={
            'px-4 py-2 rounded-xl text-sm font-medium transition-all ' +
            (activeTab === 'context'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 border')
          }
        >
          {"\uD83C\uDFDB\uFE0F "}{t('Contexte PRISM', 'PRISM Context')}
        </button>
        <button
          onClick={() => setActiveTab('reaim')}
          className={
            'px-4 py-2 rounded-xl text-sm font-medium transition-all ' +
            (activeTab === 'reaim'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 border')
          }
        >
          {"\uD83C\uDFAF "}RE-AIM
        </button>
      </div>

      {/* Context Tab */}
      {activeTab === 'context' && (
        <div className="space-y-4">
          {Object.keys(PRISMEvaluator.domains).map((domKey) => {
            const domain = PRISMEvaluator.domains[domKey];
            const domResult = evaluation.context && evaluation.context.domains
              ? evaluation.context.domains[domKey] || {}
              : {};

            return (
              <div
                key={domKey}
                className="bg-white rounded-xl shadow border overflow-hidden"
              >
                <div
                  className="p-4 flex items-center justify-between"
                  style={{ backgroundColor: domain.color + '10' }}
                >
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {domain.label[lang] || domain.label.en}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {domain.items.length} {t('items', 'items')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold" style={{ color: domain.color }}>
                      {domResult.score || 0}%
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {domain.items.map((item) => {
                    const value = scores[item.id] || 0;
                    return (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-700 truncate">
                              {item.name[lang] || item.name.en}
                            </span>
                            <span className="text-sm font-bold ml-2" style={{ color: domain.color }}>
                              {value}
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={value}
                            onChange={(e) => handleScoreChange(item.id, e.target.value)}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                            style={{
                              accentColor: domain.color,
                              background: `linear-gradient(to right, ${domain.color} ${value}%, #e5e7eb ${value}%)`
                            }}
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                            <span>0</span>
                            <span className="text-gray-300">
                              {t('poids', 'weight')}: {item.weight}
                            </span>
                            <span>100</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* RE-AIM Tab */}
      {activeTab === 'reaim' && (
        <div className="space-y-4">
          {Object.keys(PRISMEvaluator.reaimOutcomes).map((dimKey) => {
            const dim = PRISMEvaluator.reaimOutcomes[dimKey];
            const value = reaim[dimKey] || 0;
            const reaimAverage = evaluation.reaim ? evaluation.reaim.average : 0;

            return (
              <div
                key={dimKey}
                className="bg-white rounded-xl shadow border overflow-hidden"
              >
                <div
                  className="p-4 flex items-center justify-between"
                  style={{ backgroundColor: dim.color + '10' }}
                >
                  <h3 className="font-bold text-gray-800">
                    {dim.label[lang] || dim.label.en}
                  </h3>
                  <span className="text-xl font-bold" style={{ color: dim.color }}>
                    {value}
                  </span>
                </div>
                <div className="p-4">
                  {/* Slider */}
                  <div className="mb-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleReaimChange(dimKey, e.target.value)}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        accentColor: dim.color,
                        background: `linear-gradient(to right, ${dim.color} ${value}%, #e5e7eb ${value}%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>
                  {/* Questions */}
                  <div className="space-y-2">
                    {dim.questions.map((q, qi) => (
                      <div
                        key={qi}
                        className="flex items-start gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-gray-400 mt-0.5">{'\u2022'}</span>
                        <span>{q[lang] || q.en}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* RE-AIM Average */}
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {evaluation.reaim ? evaluation.reaim.average : 0}%
            </div>
            <p className="text-sm text-gray-600">
              {t('Score moyen RE-AIM', 'RE-AIM Average Score')}
            </p>
          </div>
        </div>
      )}

      {/* Footer Citation */}
      <div className="mt-6 text-center text-xs text-gray-400">
        {PRISMEvaluator.citation} {'\u2022'} {PRISMEvaluator.iPRISMcitation} {'\u2022'} MOUDAR{'\u00AE'} v{PRISMEvaluator.VERSION}
      </div>
    </div>
  );
}
