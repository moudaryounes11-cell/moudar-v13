import React, { useState } from 'react';
/* global FRAMETracker */

export default function FRAMETrackerView({ lang = 'fr', project }) {
  const [adaptations, setAdaptations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    what: '',
    whom: '',
    level: '',
    type: '',
    reason: '',
    fidelityImpact: 'uncertain',
    description: '',
    justification: ''
  });

  const fidelityAnalysis = FRAMETracker.analyzeFidelity(adaptations, lang);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.what || !form.type) return;
    const adaptation = FRAMETracker.createAdaptation(form);
    setAdaptations((prev) => [...prev, adaptation]);
    setForm({
      what: '',
      whom: '',
      level: '',
      type: '',
      reason: '',
      fidelityImpact: 'uncertain',
      description: '',
      justification: ''
    });
    setShowForm(false);
  };

  const riskColor = (risk) => {
    if (risk === 'high') return { bg: 'bg-red-50 border-red-200', text: 'text-red-700', bar: 'bg-red-500' };
    if (risk === 'moderate') return { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700', bar: 'bg-yellow-500' };
    return { bg: 'bg-green-50 border-green-200', text: 'text-green-700', bar: 'bg-green-500' };
  };

  const fidelityColors = riskColor(fidelityAnalysis.risk);

  const getLabelForOption = (dimensionKey, optionId) => {
    const dim = FRAMETracker.dimensions[dimensionKey];
    if (!dim) return optionId;
    const opt = dim.options.find((o) => o.id === optionId);
    return opt ? opt.label[lang] : optionId;
  };

  const fidelityImpactBadge = (impact) => {
    if (impact === 'core_modified') return 'bg-red-100 text-red-700';
    if (impact === 'core_preserved') return 'bg-green-100 text-green-700';
    if (impact === 'periphery_only') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="max-w-6xl mx-auto fade-in">
      {/* Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/50 to-purple-700/30 rounded-xl border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{"\uD83D\uDD04"}</span>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                {lang === 'fr' ? 'FRAME \u2014 Suivi des Adaptations' : 'FRAME \u2014 Adaptation Tracker'}
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-normal">v11.0</span>
              </h1>
              <p className="text-purple-300 text-sm">
                Stirman et al. (2019) {"\u2022"} {lang === 'fr' ? 'Suivi syst\u00e9matique des modifications' : 'Systematic modification tracking'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition"
          >
            {showForm ? (lang === 'fr' ? 'Annuler' : 'Cancel') : (lang === 'fr' ? '+ Ajouter une adaptation' : '+ Add adaptation')}
          </button>
        </div>
      </div>

      {/* Fidelity score banner */}
      <div className={"p-4 rounded-xl border mb-6 " + fidelityColors.bg}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={"font-bold " + fidelityColors.text}>
              {lang === 'fr' ? 'Analyse de fid\u00e9lit\u00e9' : 'Fidelity Analysis'}
            </h3>
            <p className={"text-sm " + fidelityColors.text}>{fidelityAnalysis.label}</p>
          </div>
          <div className="text-right">
            <div className={"text-4xl font-bold " + fidelityColors.text}>
              {fidelityAnalysis.score}%
            </div>
            <p className="text-xs text-gray-500">
              {adaptations.length} {lang === 'fr' ? 'adaptation(s)' : 'adaptation(s)'}
            </p>
          </div>
        </div>
        {adaptations.length > 0 && (
          <div className="mt-3 h-2 bg-gray-200 rounded-full">
            <div
              className={"h-2 rounded-full transition-all " + fidelityColors.bar}
              style={{ width: fidelityAnalysis.score + '%' }}
            />
          </div>
        )}
        {adaptations.length > 0 && (
          <div className="mt-2 flex gap-4 text-xs text-gray-500">
            <span>{lang === 'fr' ? 'Coeur pr\u00e9serv\u00e9' : 'Core preserved'}: {fidelityAnalysis.corePreserved || 0}</span>
            <span>{lang === 'fr' ? 'Coeur modifi\u00e9' : 'Core modified'}: {fidelityAnalysis.coreModified || 0}</span>
            <span>{lang === 'fr' ? 'P\u00e9riph\u00e9rie' : 'Periphery'}: {fidelityAnalysis.peripheryOnly || 0}</span>
          </div>
        )}
      </div>

      {/* Conditional form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md border p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">
            {lang === 'fr' ? 'Documenter une adaptation (FRAME)' : 'Document an adaptation (FRAME)'}
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Dimension selects */}
            {['what', 'whom', 'level', 'type', 'reason', 'fidelityImpact'].map((dimKey) => {
              const dim = FRAMETracker.dimensions[dimKey];
              if (!dim) return null;
              return (
                <div key={dimKey}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dim.label[lang]}
                  </label>
                  <select
                    value={form[dimKey]}
                    onChange={(e) => handleFormChange(dimKey, e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                  >
                    <option value="">{lang === 'fr' ? 'S\u00e9lectionner...' : 'Select...'}</option>
                    {dim.options.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label[lang]}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'fr' ? 'Description de l\'adaptation' : 'Adaptation description'}
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              rows={3}
              placeholder={lang === 'fr' ? 'D\u00e9crivez la modification apport\u00e9e...' : 'Describe the modification made...'}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-sm resize-none"
            />
          </div>

          {/* Justification */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'fr' ? 'Justification' : 'Justification'}
            </label>
            <textarea
              value={form.justification}
              onChange={(e) => handleFormChange('justification', e.target.value)}
              rows={2}
              placeholder={lang === 'fr' ? 'Pourquoi cette adaptation a-t-elle \u00e9t\u00e9 n\u00e9cessaire ?' : 'Why was this adaptation necessary?'}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-sm resize-none"
            />
          </div>

          {/* Save button */}
          <button
            onClick={handleSubmit}
            disabled={!form.what || !form.type}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50"
          >
            {lang === 'fr' ? 'Enregistrer l\'adaptation' : 'Save adaptation'}
          </button>
        </div>
      )}

      {/* Adaptations list */}
      {adaptations.length > 0 && (
        <div className="space-y-3 mb-6">
          <h3 className="font-bold text-gray-800">
            {lang === 'fr' ? 'Adaptations document\u00e9es' : 'Documented adaptations'} ({adaptations.length})
          </h3>
          {adaptations.map((adapt) => (
            <div key={adapt.id} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-wrap gap-1">
                  {adapt.what && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {getLabelForOption('what', adapt.what)}
                    </span>
                  )}
                  {adapt.type && (
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                      {getLabelForOption('type', adapt.type)}
                    </span>
                  )}
                  {adapt.whom && (
                    <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full">
                      {getLabelForOption('whom', adapt.whom)}
                    </span>
                  )}
                  {adapt.level && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                      {getLabelForOption('level', adapt.level)}
                    </span>
                  )}
                  {adapt.reason && (
                    <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded-full">
                      {getLabelForOption('reason', adapt.reason)}
                    </span>
                  )}
                </div>
                <span className={"px-2 py-0.5 text-xs rounded-full font-medium " + fidelityImpactBadge(adapt.fidelityImpact)}>
                  {getLabelForOption('fidelityImpact', adapt.fidelityImpact)}
                </span>
              </div>
              {adapt.description && (
                <p className="text-sm text-gray-700 mb-1">{adapt.description}</p>
              )}
              {adapt.justification && (
                <p className="text-xs text-gray-500 italic">{adapt.justification}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(adapt.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {adaptations.length === 0 && !showForm && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="text-4xl mb-3">{"\uD83D\uDD04"}</div>
          <h3 className="text-lg font-medium text-gray-600 mb-1">
            {lang === 'fr' ? 'Aucune adaptation document\u00e9e' : 'No adaptations documented'}
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            {lang === 'fr'
              ? 'Utilisez le cadre FRAME pour documenter syst\u00e9matiquement chaque modification apport\u00e9e \u00e0 l\'intervention.'
              : 'Use the FRAME framework to systematically document each modification made to the intervention.'}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition"
          >
            {lang === 'fr' ? 'Documenter la premi\u00e8re adaptation' : 'Document first adaptation'}
          </button>
        </div>
      )}

      {/* Citation footer */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500 space-y-1 mt-6">
        <p className="font-medium text-gray-600">
          {"\uD83D\uDCDA "}{lang === 'fr' ? 'R\u00e9f\u00e9rences' : 'References'}
        </p>
        <p>{"\u2022"} Stirman SW, Baumann AA, Miller CJ (2019). Implementation Science, 14:58.</p>
        <p>{"\u2022"} Wiltsey Stirman S et al. (2013). Implementation Science, 8:65.</p>
        <p>{"\u2022"} Generated by MOUDAR&reg; v11.0 &mdash; AI-Powered Implementation Science Platform. &copy; 2025 Younes MOUDAR.</p>
      </div>
    </div>
  );
}
