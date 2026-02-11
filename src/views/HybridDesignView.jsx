import React, { useState } from 'react';
/* global HybridDesignWizard */

export default function HybridDesignView({ lang = 'fr' }) {
  const [answers, setAnswers] = useState({
    evidenceLevel: '',
    primaryQuestion: '',
    adoptionConcern: '',
    resources: '',
    ethicalWithhold: ''
  });
  const [result, setResult] = useState(null);

  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const handleSelect = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleRecommend = () => {
    setResult(HybridDesignWizard.recommend(answers, lang));
  };

  const allAnswered = Object.values(answers).every((v) => v !== '');

  const questions = [
    {
      key: 'evidenceLevel',
      label: t('Niveau de preuve de l\'intervention', 'Evidence level of the intervention'),
      description: t(
        'Quel est le niveau actuel de preuve pour votre intervention clinique?',
        'What is the current evidence level for your clinical intervention?'
      ),
      options: [
        { value: 'preliminary', label: t('Pr\u00E9liminaire (pilote, \u00E9tudes de faisabilit\u00E9)', 'Preliminary (pilot, feasibility studies)') },
        { value: 'moderate', label: t('Mod\u00E9r\u00E9 (quelques essais contr\u00F4l\u00E9s)', 'Moderate (some controlled trials)') },
        { value: 'strong', label: t('Fort (multiples RCTs, m\u00E9ta-analyses)', 'Strong (multiple RCTs, meta-analyses)') }
      ]
    },
    {
      key: 'primaryQuestion',
      label: t('Question de recherche primaire', 'Primary research question'),
      description: t(
        'Quel est le focus principal de votre \u00E9tude?',
        'What is the primary focus of your study?'
      ),
      options: [
        { value: 'effectiveness', label: t('Efficacit\u00E9 clinique', 'Clinical effectiveness') },
        { value: 'both', label: t('Les deux \u00E9galement', 'Both equally') },
        { value: 'implementation', label: t('Impl\u00E9mentation', 'Implementation') }
      ]
    },
    {
      key: 'adoptionConcern',
      label: t('Pr\u00E9occupation d\'adoption', 'Adoption concern'),
      description: t(
        'Y a-t-il des pr\u00E9occupations connues sur l\'adoption de l\'intervention?',
        'Are there known concerns about intervention adoption?'
      ),
      options: [
        { value: 'low', label: t('Faible (bonne acceptabilit\u00E9 attendue)', 'Low (good acceptability expected)') },
        { value: 'high', label: t('\u00C9lev\u00E9e (r\u00E9sistance ou barri\u00E8res connues)', 'High (known resistance or barriers)') }
      ]
    },
    {
      key: 'resources',
      label: t('Ressources disponibles', 'Available resources'),
      description: t(
        'Quel niveau de ressources est disponible pour le design?',
        'What level of resources is available for the design?'
      ),
      options: [
        { value: 'low', label: t('Limit\u00E9es (budget restreint)', 'Limited (tight budget)') },
        { value: 'moderate', label: t('Mod\u00E9r\u00E9es', 'Moderate') },
        { value: 'high', label: t('\u00C9lev\u00E9es (design complexe possible)', 'High (complex design possible)') }
      ]
    },
    {
      key: 'ethicalWithhold',
      label: t('Pr\u00E9occupation \u00E9thique', 'Ethical concern'),
      description: t(
        'Serait-il \u00E9thiquement difficile de retenir l\'intervention d\'un groupe contr\u00F4le?',
        'Would it be ethically difficult to withhold the intervention from a control group?'
      ),
      options: [
        { value: 'no', label: t('Non (groupe contr\u00F4le acceptable)', 'No (control group acceptable)') },
        { value: 'yes', label: t('Oui (intervention d\u00E9j\u00E0 prouv\u00E9e / urgence)', 'Yes (intervention already proven / urgency)') }
      ]
    }
  ];

  const confidenceColors = {
    high: 'text-green-400 bg-green-500/20',
    moderate: 'text-yellow-400 bg-yellow-500/20',
    low: 'text-red-400 bg-red-500/20'
  };

  return (
    <div className="fade-in">
      {/* Header banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/50 to-purple-700/30 rounded-xl border border-purple-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\uD83E\uDDEA"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t('Design Hybride', 'Hybrid Design')}
              <span className="ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full font-normal">D5</span>
            </h1>
            <p className="text-purple-300 text-sm">
              {HybridDesignWizard.citation}
            </p>
          </div>
        </div>
      </div>

      {/* Question cards */}
      <div className="space-y-4 mb-6">
        {questions.map((q, idx) => (
          <div
            key={q.key}
            className="bg-slate-800 rounded-xl p-5 border border-slate-700"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold shrink-0">
                {idx + 1}
              </span>
              <div>
                <h3 className="text-white font-semibold text-sm">{q.label}</h3>
                <p className="text-slate-400 text-xs mt-0.5">{q.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 ml-10">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(q.key, opt.value)}
                  className={
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all " +
                    (answers[q.key] === opt.value
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                      : "bg-slate-900/50 text-slate-300 border border-slate-600 hover:border-purple-500/50 hover:text-white")
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recommend button */}
      <button
        onClick={handleRecommend}
        disabled={!allAnswered}
        className={
          "w-full py-4 rounded-xl font-semibold text-lg transition-all mb-6 " +
          (allAnswered
            ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg"
            : "bg-slate-700 text-slate-500 cursor-not-allowed")
        }
      >
        {"\uD83E\uDDEA"} {t('Recommander le design hybride', 'Recommend hybrid design')}
      </button>

      {/* Result card */}
      {result && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          {/* Result header */}
          <div
            className="p-6"
            style={{ backgroundColor: result.type.color + '20', borderBottom: '1px solid ' + result.type.color + '40' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-3 py-1 rounded-lg text-white text-sm font-bold"
                    style={{ backgroundColor: result.type.color }}
                  >
                    {result.type.label[lang]}
                  </span>
                  <span className={"px-2 py-0.5 rounded-full text-xs font-medium " + (confidenceColors[result.confidence] || '')}>
                    {t('Confiance:', 'Confidence:')} {result.confidence}
                  </span>
                </div>
                <p className="text-white font-medium text-sm">{result.type.focus[lang]}</p>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-xs mb-1">{t('Scores', 'Scores')}</div>
                <div className="text-xs text-slate-300">
                  T1: {result.scores.type1} | T2: {result.scores.type2} | T3: {result.scores.type3}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                {t('Description', 'Description')}
              </h4>
              <p className="text-slate-300 text-sm">{result.type.description[lang]}</p>
            </div>

            {/* When to use */}
            <div>
              <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                {t('Quand utiliser', 'When to use')}
              </h4>
              <ul className="space-y-1">
                {result.type.whenToUse.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-purple-400 mt-0.5">{"\u2713"}</span>
                    <span>{item[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Measures grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Clinical measures */}
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-blue-400 text-sm font-semibold mb-3">
                  {t('Mesures cliniques', 'Clinical Measures')}
                </h4>
                <ul className="space-y-1">
                  {result.type.clinicalMeasures.map((m, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Implementation measures */}
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-green-400 text-sm font-semibold mb-3">
                  {t('Mesures d\'impl\u00E9mentation', 'Implementation Measures')}
                </h4>
                <ul className="space-y-1">
                  {result.type.implementationMeasures.map((m, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Weight percentages */}
            <div>
              <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                {t('Pond\u00E9ration du design', 'Design Weighting')}
              </h4>
              <div className="flex gap-2 items-center">
                <div
                  className="h-4 rounded-l-full"
                  style={{
                    width: (result.type.clinicalWeight * 100) + '%',
                    backgroundColor: '#3b82f6'
                  }}
                />
                <div
                  className="h-4 rounded-r-full"
                  style={{
                    width: (result.type.implementationWeight * 100) + '%',
                    backgroundColor: '#059669'
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>{t('Clinique', 'Clinical')}: {Math.round(result.type.clinicalWeight * 100)}%</span>
                <span>{t('Impl\u00E9mentation', 'Implementation')}: {Math.round(result.type.implementationWeight * 100)}%</span>
              </div>
            </div>

            {/* Typical designs */}
            <div>
              <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                {t('Designs typiques', 'Typical Designs')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.type.typicalDesigns.map((d, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-900/50 text-slate-300 text-xs rounded-lg border border-slate-600"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Rationale */}
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-purple-300">
                {"\uD83D\uDCA1"} {result.rationale}
              </p>
            </div>
          </div>

          {/* Citation footer */}
          <div className="px-6 py-3 border-t border-slate-700 text-xs text-slate-600">
            {result.citation} {"\u2022"} MOUDAR&reg; v11.0
          </div>
        </div>
      )}
    </div>
  );
}
