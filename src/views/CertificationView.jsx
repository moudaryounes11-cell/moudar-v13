import React from 'react';

export default function CertificationView({ onClose, lang, protocol, answers }) {
  // Inline certification function
  const evaluateCertificationLocal = (proto, ctx, l) => {
    l = l || 'fr';
    const results = [];
    let totalScore = 0;
    const criteria = [
      { id: 'framework', weight: 15, label: { fr: "Cadre th\u00E9orique IS explicite", en: "Explicit IS theoretical framework" } },
      { id: 'strategies', weight: 15, label: { fr: "Strat\u00E9gies d'impl\u00E9mentation d\u00E9finies", en: "Implementation strategies defined" } },
      { id: 'outcomes', weight: 15, label: { fr: "Outcomes d'impl\u00E9mentation mesurables", en: "Measurable implementation outcomes" } },
      { id: 'barriers', weight: 10, label: { fr: "Analyse barri\u00E8res/facilitateurs", en: "Barriers/facilitators analysis" } },
      { id: 'stakeholders', weight: 10, label: { fr: "Parties prenantes identifi\u00E9es", en: "Stakeholders identified" } },
      { id: 'adaptation', weight: 10, label: { fr: "Plan d'adaptation contextuelle", en: "Contextual adaptation plan" } },
      { id: 'evaluation', weight: 10, label: { fr: "Plan d'\u00E9valuation", en: "Evaluation plan" } },
      { id: 'timeline', weight: 5, label: { fr: "Timeline EPIS", en: "EPIS timeline" } },
      { id: 'sustainment', weight: 5, label: { fr: "Plan de p\u00E9rennisation", en: "Sustainability plan" } },
      { id: 'equity', weight: 5, label: { fr: "Consid\u00E9rations d'\u00E9quit\u00E9", en: "Equity considerations" } }
    ];

    criteria.forEach((criterion) => {
      let passed = false;
      switch (criterion.id) {
        case 'framework':
          passed = (proto.frameworks && proto.frameworks.length > 0) || (proto.aiConfidence && proto.aiConfidence > 0.5);
          break;
        case 'strategies':
          passed = proto.strategies && proto.strategies.length >= 2;
          break;
        case 'outcomes':
          passed = proto.outcomes && proto.outcomes.length > 0;
          break;
        case 'barriers':
          passed = proto.aiDetectedBarriers && proto.aiDetectedBarriers.length > 0;
          break;
        case 'stakeholders':
          passed = (ctx && ctx.organization) || (proto.title && proto.title.length > 0);
          break;
        case 'adaptation':
          passed = proto.aiRawRecommendations && proto.aiRawRecommendations.input && proto.aiRawRecommendations.input.resourceLevel;
          break;
        case 'evaluation':
          passed = proto.outcomes && proto.outcomes.length > 0;
          break;
        case 'timeline':
          passed = proto.keyActivities && proto.keyActivities.length > 0;
          break;
        case 'sustainment':
          passed = proto.recommendations && proto.recommendations.length > 0;
          break;
        case 'equity':
          passed = proto.aiRawRecommendations && proto.aiRawRecommendations.input && (proto.aiRawRecommendations.input.resourceLevel === 'LMIC' || proto.aiRawRecommendations.input.resourceLevel === 'LIC');
          break;
        default:
          passed = false;
      }
      const score = passed ? criterion.weight : 0;
      totalScore += score;
      results.push({ criterion: criterion.id, label: criterion.label[l], weight: criterion.weight, passed, score });
    });

    let level = 'none';
    let levelLabel = { fr: "Non certifiable", en: "Not certifiable" };
    let color = '#ef4444';
    if (totalScore >= 90) {
      level = 'gold'; levelLabel = { fr: "Certification Or", en: "Gold Certification" }; color = '#f59e0b';
    } else if (totalScore >= 75) {
      level = 'silver'; levelLabel = { fr: "Certification Argent", en: "Silver Certification" }; color = '#9ca3af';
    } else if (totalScore >= 60) {
      level = 'bronze'; levelLabel = { fr: "Certification Bronze", en: "Bronze Certification" }; color = '#b45309';
    }

    const certId = 'MR-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    return {
      projectTitle: proto.title || (ctx && ctx.title),
      score: totalScore, maxScore: 100, level, levelLabel: levelLabel[l], color,
      certified: totalScore >= 60,
      certificationId: totalScore >= 60 ? certId : null,
      results,
      passedCriteria: results.filter((r) => r.passed).length,
      totalCriteria: results.length,
      recommendations: results.filter((r) => !r.passed).map((r) => l === 'fr' ? "Ajouter : " + r.label : "Add: " + r.label),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      generatedAt: new Date().toISOString()
    };
  };

  // Defensive check
  let certification;
  const defaultCert = {
    certified: false, level: 'none', score: 0,
    levelLabel: lang === "fr" ? "Non certifi\u00E9" : "Not certified",
    color: "#6b7280", certificationId: "N/A", validUntil: "-",
    passedCriteria: 0, totalCriteria: 10, results: [], criteria: [],
    recommendations: [lang === "fr" ? "Compl\u00E9tez le protocole pour obtenir la certification" : "Complete the protocol to get certification"],
    badge: null
  };
  try {
    if (!protocol) {
      certification = defaultCert;
    } else {
      certification = evaluateCertificationLocal(protocol, answers, lang);
      certification.results = certification.results || [];
      certification.recommendations = certification.recommendations || [];
      certification.levelLabel = certification.levelLabel || defaultCert.levelLabel;
      certification.color = certification.color || defaultCert.color;
      certification.passedCriteria = certification.passedCriteria || 0;
      certification.totalCriteria = certification.totalCriteria || 10;
    }
  } catch (e) {
    console.error("[MOUDAR] Erreur Certification:", e);
    certification = defaultCert;
  }

  const levelIcon = certification.level === 'gold' ? '\uD83E\uDD47' : certification.level === 'silver' ? '\uD83E\uDD48' : certification.level === 'bronze' ? '\uD83E\uDD49' : '\u274C';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className={"p-6 text-white " + (certification.certified ? "bg-gradient-to-r from-amber-500 to-yellow-500" : "bg-gradient-to-r from-gray-500 to-slate-600")}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {"\uD83C\uDFC6 "}{lang === "fr" ? "Certification Moudar Ready" : "Moudar Ready Certification"}
              </h2>
              <p className="text-white/80">
                {lang === "fr" ? "Label qualit\u00E9 Science de la mise en \u0153uvre" : "Implementation Science quality label"}
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">{"\u2715"}</button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Score */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{levelIcon}</div>
            <h3 className="text-3xl font-bold" style={{ color: certification.color }}>{certification.score}/100</h3>
            <p className="text-xl font-medium text-gray-700">{certification.levelLabel}</p>
            {certification.certified && (
              <div className="mt-4 inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                {"\u2713 "}{lang === "fr" ? "Certifi\u00E9" : "Certified"} {"\u2022"} ID: {certification.certificationId}
              </div>
            )}
          </div>

          {/* Criteria */}
          <h4 className="font-bold text-gray-800 mb-4">
            {lang === "fr" ? "Crit\u00E8res \u00E9valu\u00E9s" : "Evaluated criteria"} ({certification.passedCriteria || 0}/{certification.totalCriteria || 10})
          </h4>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(certification.results || []).map((r, i) => (
              <div key={i} className={"p-3 rounded-lg border " + (r.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200")}>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{r.label || ""}</span>
                  <span className="text-lg">{r.passed ? '\u2705' : '\u274C'}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{r.weight || 0} pts</div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          {certification.recommendations && certification.recommendations.length > 0 && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <h4 className="font-medium text-amber-800 mb-2">
                {lang === "fr" ? "Pour am\u00E9liorer votre score" : "To improve your score"}
              </h4>
              <ul className="space-y-1">
                {(certification.recommendations || []).slice(0, 5).map((r, i) => (
                  <li key={i} className="text-sm text-amber-700">{"\u2022 "}{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-between">
          {certification.certified && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {"\uD83D\uDCE5 "}{lang === "fr" ? "T\u00E9l\u00E9charger le badge" : "Download badge"}
            </button>
          )}
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg ml-auto">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
