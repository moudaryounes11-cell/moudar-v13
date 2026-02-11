import React from 'react';
/* global docx, saveAs */

export default function TrainingPlanView({ project, protocol, lang, onClose }) {
  if (!protocol || !protocol.aiRawRecommendations) return null;
  const strategies = protocol.aiRawRecommendations.strategies.top || [];

  const trainingStrategies = ["S01", "S03", "S10", "S14", "S15"];
  const relevantStrategies = strategies.filter((s) => trainingStrategies.includes(s.id));

  const generateTrainingPlan = () => {
    const plan = { objectives: [], modules: [], audiences: [], totalHours: 0 };

    relevantStrategies.forEach((s) => {
      if (s.id === "S01") {
        plan.objectives.push(lang === "fr" ? "Renforcer les comp\u00E9tences techniques des \u00E9quipes" : "Strengthen team technical skills");
        plan.modules.push({
          name: lang === "fr" ? "Formation initiale" : "Initial Training",
          duration: lang === "fr" ? "5 jours" : "5 days",
          hours: 35,
          format: lang === "fr" ? "Pr\u00E9sentiel + cas pratiques" : "In-person + case studies",
          frequency: lang === "fr" ? "Une fois au d\u00E9marrage" : "Once at start",
          content: [
            lang === "fr" ? "Concepts fondamentaux" : "Core concepts",
            lang === "fr" ? "Protocoles et proc\u00E9dures" : "Protocols and procedures",
            lang === "fr" ? "Exercices pratiques" : "Practical exercises",
            lang === "fr" ? "\u00C9valuation des acquis" : "Knowledge assessment"
          ]
        });
        plan.modules.push({
          name: lang === "fr" ? "Formation continue" : "Continuous Training",
          duration: lang === "fr" ? "1 jour/trimestre" : "1 day/quarter",
          hours: 28,
          format: lang === "fr" ? "Pr\u00E9sentiel ou e-learning" : "In-person or e-learning",
          frequency: lang === "fr" ? "Trimestriel" : "Quarterly",
          content: [
            lang === "fr" ? "Mises \u00E0 jour protocoles" : "Protocol updates",
            lang === "fr" ? "Retour sur les difficult\u00E9s" : "Review of challenges",
            lang === "fr" ? "Nouvelles pratiques" : "New practices"
          ]
        });
      }
      if (s.id === "S10") {
        plan.objectives.push(lang === "fr" ? "Assurer un accompagnement clinique de qualit\u00E9" : "Ensure quality clinical support");
        plan.modules.push({
          name: lang === "fr" ? "Supervision clinique" : "Clinical Supervision",
          duration: lang === "fr" ? "8h/mois/\u00E9quipe" : "8h/month/team",
          hours: 96,
          format: lang === "fr" ? "Sessions individuelles + groupe" : "Individual + group sessions",
          frequency: lang === "fr" ? "Hebdomadaire" : "Weekly",
          content: [
            lang === "fr" ? "Revue de cas cliniques" : "Clinical case review",
            lang === "fr" ? "Discussion des difficult\u00E9s" : "Discussion of challenges",
            lang === "fr" ? "Soutien \u00E9motionnel" : "Emotional support",
            lang === "fr" ? "Feedback constructif" : "Constructive feedback"
          ]
        });
      }
      if (s.id === "S03") {
        plan.objectives.push(lang === "fr" ? "Faciliter le changement de pratiques" : "Facilitate practice change");
        plan.modules.push({
          name: lang === "fr" ? "Sessions de facilitation" : "Facilitation Sessions",
          duration: lang === "fr" ? "2h/quinzaine" : "2h/fortnight",
          hours: 52,
          format: lang === "fr" ? "R\u00E9unions d'\u00E9quipe facilit\u00E9es" : "Facilitated team meetings",
          frequency: lang === "fr" ? "Bimensuel" : "Biweekly",
          content: [
            lang === "fr" ? "R\u00E9solution de probl\u00E8mes" : "Problem solving",
            lang === "fr" ? "Planification des actions" : "Action planning",
            lang === "fr" ? "Suivi des engagements" : "Commitment tracking"
          ]
        });
      }
      if (s.id === "S14") {
        plan.objectives.push(lang === "fr" ? "Favoriser l'apprentissage collectif inter-sites" : "Promote collective learning across sites");
        plan.modules.push({
          name: lang === "fr" ? "Collaborative d'apprentissage" : "Learning Collaborative",
          duration: lang === "fr" ? "1 jour/trimestre" : "1 day/quarter",
          hours: 32,
          format: lang === "fr" ? "Ateliers multi-sites" : "Multi-site workshops",
          frequency: lang === "fr" ? "Trimestriel" : "Quarterly",
          content: [
            lang === "fr" ? "Partage de bonnes pratiques" : "Best practice sharing",
            lang === "fr" ? "Benchmarking inter-sites" : "Cross-site benchmarking",
            lang === "fr" ? "Co-construction de solutions" : "Co-creating solutions"
          ]
        });
      }
      if (s.id === "S15") {
        plan.objectives.push(lang === "fr" ? "Cr\u00E9er un r\u00E9seau de soutien par les pairs" : "Create peer support network");
        plan.modules.push({
          name: lang === "fr" ? "Formation pairs aidants" : "Peer Supporter Training",
          duration: lang === "fr" ? "3 jours" : "3 days",
          hours: 21,
          format: lang === "fr" ? "Pr\u00E9sentiel intensif" : "Intensive in-person",
          frequency: lang === "fr" ? "Une fois" : "Once",
          content: [
            lang === "fr" ? "Techniques d'\u00E9coute active" : "Active listening techniques",
            lang === "fr" ? "Gestion des situations difficiles" : "Managing difficult situations",
            lang === "fr" ? "Auto-soin et limites" : "Self-care and boundaries"
          ]
        });
      }
    });

    plan.totalHours = plan.modules.reduce((sum, m) => sum + m.hours, 0);
    plan.audiences = [
      {
        name: lang === "fr" ? "Personnel soignant de premi\u00E8re ligne" : "Frontline healthcare staff",
        count: project.population ? (project.population.match(/\d+/) ? parseInt(project.population.match(/\d+/)[0]) : 50) : 50
      },
      { name: lang === "fr" ? "Superviseurs/R\u00E9f\u00E9rents" : "Supervisors/Referents", count: 10 },
      { name: lang === "fr" ? "Champions locaux" : "Local champions", count: 5 }
    ];
    return plan;
  };

  const trainingPlan = generateTrainingPlan();

  const exportTrainingPlan = () => {
    const doc = new docx.Document({
      sections: [{
        properties: {},
        children: [
          new docx.Paragraph({ text: lang === "fr" ? "PLAN DE FORMATION ET SUPERVISION" : "TRAINING AND SUPERVISION PLAN", heading: docx.HeadingLevel.TITLE, spacing: { after: 400 } }),
          new docx.Paragraph({ text: project.title || "Projet", heading: docx.HeadingLevel.HEADING_1, spacing: { after: 200 } }),
          new docx.Paragraph({ text: (lang === "fr" ? "G\u00E9n\u00E9r\u00E9 par Moudar le " : "Generated by Moudar on ") + new Date().toLocaleDateString(), spacing: { after: 400 } }),
          new docx.Paragraph({ text: lang === "fr" ? "1. OBJECTIFS DE FORMATION" : "1. TRAINING OBJECTIVES", heading: docx.HeadingLevel.HEADING_2, spacing: { before: 400, after: 200 } }),
          ...trainingPlan.objectives.map((obj) => new docx.Paragraph({ text: "\u2022 " + obj, spacing: { after: 100 } })),
          new docx.Paragraph({ text: lang === "fr" ? "2. MODULES DE FORMATION" : "2. TRAINING MODULES", heading: docx.HeadingLevel.HEADING_2, spacing: { before: 400, after: 200 } }),
          ...trainingPlan.modules.flatMap((mod) => [
            new docx.Paragraph({ text: mod.name, heading: docx.HeadingLevel.HEADING_3, spacing: { before: 200 } }),
            new docx.Paragraph({ text: (lang === "fr" ? "Dur\u00E9e: " : "Duration: ") + mod.duration }),
            new docx.Paragraph({ text: (lang === "fr" ? "Format: " : "Format: ") + mod.format }),
            new docx.Paragraph({ text: (lang === "fr" ? "Fr\u00E9quence: " : "Frequency: ") + mod.frequency }),
            new docx.Paragraph({ text: lang === "fr" ? "Contenu:" : "Content:", spacing: { before: 100 } }),
            ...mod.content.map((c) => new docx.Paragraph({ text: "  - " + c }))
          ]),
          new docx.Paragraph({ text: (lang === "fr" ? "TOTAL HEURES ANNUELLES ESTIM\u00C9ES: " : "ESTIMATED ANNUAL HOURS: ") + trainingPlan.totalHours + "h", spacing: { before: 400 }, bold: true })
        ]
      }]
    });
    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Plan_Formation_" + (project.title || "Moudar").replace(/\s+/g, "_") + ".docx");
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83C\uDF93 "}{lang === "fr" ? "Plan de Formation & Supervision" : "Training & Supervision Plan"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr" ? "G\u00E9n\u00E9r\u00E9 automatiquement \u00E0 partir des strat\u00E9gies recommand\u00E9es" : "Auto-generated from recommended strategies"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {relevantStrategies.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-3">{"\uD83D\uDCDA"}</div>
              <p>{lang === "fr" ? "Aucune strat\u00E9gie de formation/supervision dans les recommandations" : "No training/supervision strategies in recommendations"}</p>
            </div>
          ) : (
            <>
              {/* Detected Strategies */}
              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2">
                  {lang === "fr" ? "\uD83D\uDCCC Strat\u00E9gies formation/accompagnement d\u00E9tect\u00E9es" : "\uD83D\uDCCC Training/support strategies detected"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relevantStrategies.map((s) => (
                    <span key={s.id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {s.id} - {s.label[lang]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Objectives */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">
                  {"\uD83C\uDFAF "}{lang === "fr" ? "Objectifs de formation" : "Training Objectives"}
                </h3>
                <ul className="space-y-2">
                  {trainingPlan.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600">{"\u2713"}</span> {obj}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modules */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">
                  {"\uD83D\uDCDA "}{lang === "fr" ? "Modules de formation" : "Training Modules"}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {trainingPlan.modules.map((mod, i) => (
                    <div key={i} className="p-4 bg-white rounded-xl border shadow-sm">
                      <h4 className="font-bold text-indigo-700 mb-2">{mod.name}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div><span className="text-gray-500">{"\u23F1\uFE0F"}</span> {mod.duration}</div>
                        <div><span className="text-gray-500">{"\uD83D\uDCC5"}</span> {mod.frequency}</div>
                        <div className="col-span-2"><span className="text-gray-500">{"\uD83D\uDCCD"}</span> {mod.format}</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-1">{lang === "fr" ? "Contenu:" : "Content:"}</p>
                        <ul className="space-y-1">
                          {mod.content.map((c, j) => (
                            <li key={j} className="text-gray-600">{"\u2022 "}{c}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 text-right">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                          {mod.hours}h/{lang === "fr" ? "an" : "year"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-600">{trainingPlan.totalHours}h</div>
                    <div className="text-sm text-gray-600">{lang === "fr" ? "Heures/an estim\u00E9es" : "Estimated hours/year"}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{trainingPlan.modules.length}</div>
                    <div className="text-sm text-gray-600">{lang === "fr" ? "Modules" : "Modules"}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{trainingPlan.audiences[0].count}</div>
                    <div className="text-sm text-gray-600">{lang === "fr" ? "Personnes \u00E0 former" : "People to train"}</div>
                  </div>
                </div>
              </div>

              {/* Audiences */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">
                  {"\uD83D\uDC65 "}{lang === "fr" ? "Publics cibles" : "Target Audiences"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {trainingPlan.audiences.map((a, i) => (
                    <div key={i} className="px-4 py-2 bg-gray-100 rounded-lg">
                      <span className="font-medium">{a.name}</span>
                      <span className="ml-2 text-gray-500">({a.count} pers.)</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between gap-3">
          {relevantStrategies.length > 0 && (
            <button
              onClick={exportTrainingPlan}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              {"\uD83D\uDCDD "}{lang === "fr" ? "Exporter Word" : "Export Word"}
            </button>
          )}
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 ml-auto">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
