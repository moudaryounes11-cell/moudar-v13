/* global StakeholderMapper */
import React, { useState } from 'react';

export default function StakeholderMapView({ lang: propLang }) {
  const lang = propLang || 'fr';
  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const [stakeholders, setStakeholders] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [newStakeholder, setNewStakeholder] = useState({
    name: '',
    category: 'implementers',
    position: 'neutral',
    influence: 5,
    interest: 5
  });
  const [showForm, setShowForm] = useState(false);

  const runAnalysis = () => {
    const result = StakeholderMapper.analyze(
      stakeholders.length > 0 ? stakeholders : null,
      {},
      lang
    );
    setAnalysis(result);
    if (stakeholders.length === 0) {
      setStakeholders(
        result.stakeholders.map((s) => ({
          id: s.id,
          name: s.name,
          category: s.category,
          position: s.position,
          influence: s.influence / 10,
          interest: s.interest / 10
        }))
      );
    }
  };

  const addStakeholder = () => {
    const sh = { ...newStakeholder, id: 'SH_' + Date.now() };
    setStakeholders([...stakeholders, sh]);
    setNewStakeholder({
      name: '',
      category: 'implementers',
      position: 'neutral',
      influence: 5,
      interest: 5
    });
    setShowForm(false);
  };

  const removeStakeholder = (id) => {
    setStakeholders(stakeholders.filter((s) => s.id !== id));
  };

  const categories = StakeholderMapper.stakeholderCategories;
  const positions = StakeholderMapper.positionMatrix;

  return (
    <div className="space-y-6">
      {/* Header gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{"\uD83C\uDF10"}</span>
          <div>
            <h1 className="text-2xl font-bold">
              {t('Cartographie des Acteurs', 'Stakeholder Mapping')}
            </h1>
            <p className="text-purple-100">
              {t(
                "Analyse des r\u00e9seaux sociaux (SNA) pour l'impl\u00e9mentation",
                'Social Network Analysis (SNA) for implementation'
              )}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            {"\uD83D\uDC65"} {stakeholders.length} {t('acteurs', 'stakeholders')}
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            {"\uD83C\uDFAF"} {t('Quadrant Power/Interest', 'Power/Interest Quadrant')}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
        >
          {"\u2795"} {t('Ajouter un acteur', 'Add Stakeholder')}
        </button>
        <button
          onClick={runAnalysis}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          {"\uD83D\uDCCA"} {t('Analyser', 'Analyze')}{' '}
          {stakeholders.length === 0 ? t('(donn\u00e9es d\u00e9mo)', '(demo data)') : ''}
        </button>
      </div>

      {/* Form (conditional) */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <h3 className="font-bold text-gray-800 mb-4">
            {t('Nouvel acteur', 'New Stakeholder')}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Name input */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t('Nom/R\u00f4le', 'Name/Role')}
              </label>
              <input
                type="text"
                value={newStakeholder.name}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, name: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
                placeholder={t('Ex: Dr. Martin', 'Ex: Dr. Martin')}
              />
            </div>

            {/* Category select */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t('Cat\u00e9gorie', 'Category')}
              </label>
              <select
                value={newStakeholder.category}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, category: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              >
                {Object.keys(categories).map((key) => (
                  <option key={key} value={key}>
                    {categories[key].icon} {categories[key].label[lang]}
                  </option>
                ))}
              </select>
            </div>

            {/* Position select */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t('Position', 'Position')}
              </label>
              <select
                value={newStakeholder.position}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, position: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              >
                {Object.keys(positions).map((key) => (
                  <option key={key} value={key}>
                    {positions[key].icon} {positions[key].label[lang]}
                  </option>
                ))}
              </select>
            </div>

            {/* Influence range */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t('Influence', 'Influence')}: {newStakeholder.influence}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={newStakeholder.influence}
                onChange={(e) =>
                  setNewStakeholder({
                    ...newStakeholder,
                    influence: parseInt(e.target.value)
                  })
                }
                className="w-full"
              />
            </div>

            {/* Interest range */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t('Int\u00e9r\u00eat', 'Interest')}: {newStakeholder.interest}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={newStakeholder.interest}
                onChange={(e) =>
                  setNewStakeholder({
                    ...newStakeholder,
                    interest: parseInt(e.target.value)
                  })
                }
                className="w-full"
              />
            </div>

            {/* Add button */}
            <div className="flex items-end">
              <button
                onClick={addStakeholder}
                disabled={!newStakeholder.name}
                className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
              >
                {"\u2713"} {t('Ajouter', 'Add')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stakeholder list */}
      {stakeholders.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <h3 className="font-bold text-gray-800 mb-4">
            {t('Acteurs identifi\u00e9s', 'Identified Stakeholders')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stakeholders.map((sh) => {
              const cat = categories[sh.category] || categories.partners;
              const pos = positions[sh.position] || positions.neutral;
              return (
                <div
                  key={sh.id}
                  className="p-3 rounded-lg border flex items-center gap-3 hover:bg-gray-50"
                >
                  <div className="text-2xl" style={{ color: cat.color }}>
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{sh.name}</div>
                    <div className="text-xs text-gray-500">{cat.label[lang]}</div>
                  </div>
                  <div
                    className="px-2 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: pos.color + '20',
                      color: pos.color
                    }}
                  >
                    {pos.icon} {pos.label[lang]}
                  </div>
                  <button
                    onClick={() => removeStakeholder(sh.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    {"\u2715"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Analysis results */}
      {analysis && (
        <div className="space-y-6">
          {/* Metrics grid */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg border text-center">
              <div className="text-3xl font-bold text-purple-600">
                {analysis.metrics.championsCount}
              </div>
              <div className="text-sm text-gray-500">
                {t('Champions', 'Champions')}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border text-center">
              <div className="text-3xl font-bold text-red-500">
                {analysis.metrics.blockersCount}
              </div>
              <div className="text-sm text-gray-500">
                {t('Bloqueurs', 'Blockers')}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border text-center">
              <div className="text-3xl font-bold text-green-600">
                {analysis.readinessScore}%
              </div>
              <div className="text-sm text-gray-500">
                {t('Score de pr\u00e9paration', 'Readiness Score')}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border text-center">
              <div className="text-3xl font-bold text-amber-500">
                {analysis.riskScore}%
              </div>
              <div className="text-sm text-gray-500">
                {t('Score de risque', 'Risk Score')}
              </div>
            </div>
          </div>

          {/* Power/Interest Matrix */}
          <div className="bg-white rounded-xl p-6 shadow-lg border">
            <h3 className="font-bold text-gray-800 mb-4">
              {t('Matrice Power/Interest', 'Power/Interest Matrix')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(analysis.quadrantDistribution).map((key) => {
                const q = analysis.quadrantDistribution[key];
                return (
                  <div
                    key={key}
                    className="p-4 rounded-lg border"
                    style={{ borderColor: q.color }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{q.label}</span>
                      <span
                        className="text-2xl font-bold"
                        style={{ color: q.color }}
                      >
                        {q.count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-6 shadow-lg border">
            <h3 className="font-bold text-gray-800 mb-4">
              {t("Recommandations d'engagement", 'Engagement Recommendations')}
            </h3>
            <div className="space-y-3">
              {analysis.recommendations.map((rec, i) => {
                const bgColor =
                  rec.priority === 'high'
                    ? 'bg-red-50 border-red-300'
                    : rec.priority === 'medium'
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-gray-50 border-gray-300';
                return (
                  <div key={i} className={`p-4 rounded-lg border ${bgColor}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{rec.icon}</span>
                      <span className="text-gray-800">{rec.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
