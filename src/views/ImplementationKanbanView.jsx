import React from 'react';

export default function ImplementationKanbanView({ lang }) {
  const phases = [
    { key: "Préparation", labelFr: "Préparation", labelEn: "Preparation", color: "bg-amber-50" },
    { key: "Lancement", labelFr: "Lancement", labelEn: "Launch", color: "bg-emerald-50" },
    { key: "Implémentation", labelFr: "Implémentation", labelEn: "Implementation", color: "bg-blue-50" },
    { key: "Suivi & Ajustement", labelFr: "Suivi & ajustement", labelEn: "Monitoring & adjustment", color: "bg-purple-50" },
    { key: "Consolidation", labelFr: "Consolidation", labelEn: "Sustainment", color: "bg-slate-50" }
  ];

  const cards = [
    { phase: "Préparation", titleFr: "Cartographier les parties prenantes", titleEn: "Map key stakeholders", owner: "Équipe projet" },
    { phase: "Préparation", titleFr: "Clarifier le problème et les objectifs", titleEn: "Clarify problem and objectives", owner: "Coordination" },
    { phase: "Lancement", titleFr: "Former les équipes locales", titleEn: "Train local teams", owner: "Référents terrain" },
    { phase: "Implémentation", titleFr: "Mettre en place le protocole dans 3 sites pilotes", titleEn: "Implement the protocol in 3 pilot sites", owner: "Équipe opérationnelle" },
    { phase: "Suivi & Ajustement", titleFr: "Analyser les premières données RE-AIM", titleEn: "Analyse first RE-AIM data", owner: "Cellule M&E" },
    { phase: "Consolidation", titleFr: "Formaliser les routines et les intégrer dans les procédures", titleEn: "Formalize routines and integrate into procedures", owner: "Direction / institution" }
  ];

  return (
    <div className="fade-in space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {lang === "fr" ? "Vue Kanban – Phases d'implémentation" : "Kanban view – Implementation phases"}
        </h1>
        <p className="text-slate-600 mt-2 max-w-3xl">
          {lang === "fr"
            ? "Visualisez votre projet comme un flux d'actions, de la préparation à la consolidation, en vous appuyant sur les phases classiques de la science de la mise en œuvre."
            : "See your project as a flow of actions, from preparation to sustainment, aligned with implementation science phases."}
        </p>
      </div>

      <div className="rounded-xl border border-emerald-100 bg-emerald-50 text-slate-800 px-4 py-3 text-sm">
        <p className="font-semibold">{lang === "fr" ? "Ce que montre cette vue" : "What this view shows"}</p>
        <p className="mt-1">
          {lang === "fr"
            ? "Cette vue transforme votre plan d'implémentation en colonnes (Préparation → Lancement → Implémentation → Suivi → Consolidation), à la manière d'un Trello spécialisé Implementation Science. Chaque carte correspond à une action concrète issue du protocole."
            : "This view turns your implementation plan into columns (Preparation → Launch → Implementation → Monitoring → Sustainment), like a Trello board specialized for Implementation Science. Each card corresponds to a concrete action from the protocol."}
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-4 overflow-x-auto pb-2">
        {phases.map((phase) => (
          <div key={phase.key} className={"rounded-xl border border-slate-200 shadow-sm p-3 flex flex-col " + phase.color}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-slate-800 text-sm">
                {lang === "fr" ? phase.labelFr : phase.labelEn}
              </h2>
            </div>
            <div className="space-y-2">
              {cards.filter((c) => c.phase === phase.key).map((card, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-2 text-xs shadow-sm dark:bg-slate-800 dark:border-slate-600">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {lang === "fr" ? card.titleFr : card.titleEn}
                  </p>
                  <p className="text-slate-500 mt-1">{"\uD83D\uDC64 "}{card.owner}</p>
                </div>
              ))}
              {cards.filter((c) => c.phase === phase.key).length === 0 && (
                <p className="text-xs text-slate-400 italic">
                  {lang === "fr" ? "Aucune action définie pour le moment." : "No actions defined yet."}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
