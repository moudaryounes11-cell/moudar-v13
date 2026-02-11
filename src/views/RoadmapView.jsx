import React from 'react';
/* global ROADMAP_IMPROVEMENT_AXES, ROADMAP_WEIGHTING_MODEL, ROADMAP_CRITICAL_RISKS, tObj */

export default function RoadmapView({ lang }) {
  const milestones = [
    {
      year: "2025",
      title: { fr: "MVP SaaS", en: "SaaS MVP" },
      items: [
        { fr: "Comptes utilisateurs et authentification", en: "User accounts and authentication" },
        { fr: "Stockage cloud sécurisé (UE, RGPD)", en: "Secure cloud storage (EU, GDPR)" },
        { fr: "Multi-projets et historique", en: "Multi-projects and history" },
        { fr: "Première cohorte clients pilotes (CHU, ONG)", en: "First pilot client cohort (hospitals, NGOs)" }
      ],
      status: "current"
    },
    {
      year: "2026",
      title: { fr: "Collaboration & API", en: "Collaboration & API" },
      items: [
        { fr: "Travail multi-équipes sur un projet", en: "Multi-team work on a project" },
        { fr: "Journal de bord d'implémentation", en: "Implementation logbook" },
        { fr: "API Moudar pour intégration santé digitale", en: "Moudar API for digital health integration" },
        { fr: "Templates bailleurs (OMS, UNICEF, Gavi)", en: "Funder templates (WHO, UNICEF, Gavi)" }
      ],
      status: "planned"
    },
    {
      year: "2027",
      title: { fr: "Extension globale", en: "Global Extension" },
      items: [
        { fr: "Interface multilingue (ES, AR, PT)", en: "Multilingual interface (ES, AR, PT)" },
        { fr: "Bibliothèque de cas vivants communautaire", en: "Community living case library" },
        { fr: "Intégration IA avancée (analyse barrières)", en: "Advanced AI integration (barrier analysis)" },
        { fr: "Certification Science de la mise en œuvre", en: "Implementation Science certification" }
      ],
      status: "future"
    }
  ];

  return (
    <div className="fade-in max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{"\uD83D\uDE80"} Roadmap</h1>
        <p className="text-gray-500">
          {lang === "fr" ? "Notre vision pour les 3 prochaines années" : "Our vision for the next 3 years"}
        </p>

        {/* Priority recommendations */}
        <div className="mt-8 mb-10">
          <div className="bg-slate-900 text-slate-50 rounded-2xl p-5 shadow-lg text-left">
            <h2 className="text-lg font-semibold mb-2">
              {lang === "fr" ? "Recommandations prioritaires (prototype actuel)" : "Priority recommendations (current prototype)"}
            </h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-100/90">
              <li>{lang === "fr" ? "Refactorer en architecture modulaire (front-end React séparé, API backend, base de données)" : "Refactor into a modular architecture (separate React front-end, backend API, database)"}</li>
              <li>{lang === "fr" ? "Ajouter une vraie couche IA pour le chatbot et les prédictions (copilote Implementation Science)" : "Add a real AI layer for the chatbot and predictions (Implementation Science copilot)"}</li>
              <li>{lang === "fr" ? "Créer un parcours guidé pour les nouveaux utilisateurs (onboarding et aide contextuelle)" : "Create a guided journey for new users (onboarding and contextual help)"}</li>
              <li>{lang === "fr" ? "Documenter le moteur algorithmique pour des publications scientifiques" : "Document the algorithmic engine for scientific publications"}</li>
            </ul>
          </div>
        </div>

        {/* 4 Axes grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-10">
          {/* Axis 1 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 text-left">
            <h3 className="text-base font-semibold mb-2">{lang === "fr" ? "Axe 1 – Architecture modulaire" : "Axis 1 – Modular architecture"}</h3>
            <p className="text-xs text-slate-600 mb-3">
              {lang === "fr" ? "Sortir du gros fichier HTML vers une vraie application (front React + API + base de données)." : "Move from a single HTML file to a real app (React front-end + API + database)."}
            </p>
            {lang === "fr" ? (
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                <li>Créer deux projets : <strong>moudar-app</strong> (front) et <strong>moudar-api</strong> (back).</li>
                <li>Extraire le moteur <strong>MoudarEngine</strong> dans un module dédié (<code>src/engine/</code>).</li>
                <li>Recomposer l&apos;interface en composants : Wizard, Protocole, Tableau de bord, Budget, Roadmap.</li>
                <li>Ajouter une API minimale pour sauvegarder / recharger les projets.</li>
                <li>Évoluer ensuite vers PostgreSQL pour un stockage structuré.</li>
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                <li>Create two projects: <strong>moudar-app</strong> (front) and <strong>moudar-api</strong> (back).</li>
                <li>Extract the <strong>MoudarEngine</strong> into a dedicated module (<code>src/engine/</code>).</li>
                <li>Rebuild the UI into components: Wizard, Protocol, Dashboard, Budget, Roadmap.</li>
                <li>Add a minimal API to save / load projects.</li>
                <li>Later migrate to PostgreSQL for structured storage.</li>
              </ul>
            )}
          </div>

          {/* Axis 2 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 text-left">
            <h3 className="text-base font-semibold mb-2">{lang === "fr" ? "Axe 2 – Couche IA (chatbot & prédictions)" : "Axis 2 – AI layer (chatbot & predictions)"}</h3>
            <p className="text-xs text-slate-600 mb-3">
              {lang === "fr" ? "Faire de Moudar un véritable copilote de la science de la mise en œuvre." : "Turn Moudar into a true Implementation Science copilot."}
            </p>
            {lang === "fr" ? (
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                <li>Définir les cas d&apos;usage IA (explication du protocole, suggestions, préparation dossiers bailleurs).</li>
                <li>Créer une route <code>/api/ai/chat</code> côté backend (proxy vers le modèle IA choisi).</li>
                <li>Ajouter un composant de chat contextuel dans la vue Protocole.</li>
                <li>Créer des boutons type &laquo;Améliorer ce protocole&raquo; / &laquo;Adapter pour bailleur&raquo;.</li>
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                <li>Define AI use cases (explain protocol, suggest improvements, prepare funder packages).</li>
                <li>Create a backend route <code>/api/ai/chat</code> (proxy to the chosen LLM provider).</li>
                <li>Add a contextual chat component in the Protocol view.</li>
                <li>Create buttons such as &ldquo;Improve this protocol&rdquo; / &ldquo;Format for funder&rdquo;.</li>
              </ul>
            )}
          </div>

          {/* Axis 3 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 text-left">
            <h3 className="text-base font-semibold mb-2">{lang === "fr" ? "Axe 3 – Parcours guidé utilisateurs" : "Axis 3 – Guided user journey"}</h3>
            <p className="text-xs text-slate-600 mb-3">
              {lang === "fr" ? "Permettre à un nouvel utilisateur de comprendre et utiliser Moudar en quelques minutes." : "Help new users understand and use Moudar in a few minutes."}
            </p>
            {lang === "fr" ? (
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                <li>Créer un écran d&apos;onboarding simple (secteur, type de projet, phase de maturité).</li>
                <li>Ajouter des aides contextuelles dans le Wizard (&laquo;Pourquoi cette question ?&raquo;).</li>
                <li>Proposer 2–3 parcours après génération : rigueur scientifique, bailleur, terrain.</li>
                <li>Prévoir quelques cas pré-remplis par secteur pour les démos.</li>
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                <li>Create a simple onboarding screen (sector, project type, maturity phase).</li>
                <li>Add contextual help in the Wizard (&ldquo;Why this question matters?&rdquo;).</li>
                <li>Offer 2–3 post-protocol paths: scientific rigor, funder, field operations.</li>
                <li>Provide a few pre-filled demo cases per sector.</li>
              </ul>
            )}
          </div>

          {/* Axis 4 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 text-left">
            <h3 className="text-base font-semibold mb-2">{lang === "fr" ? "Axe 4 – Documentation & publications" : "Axis 4 – Documentation & publications"}</h3>
            <p className="text-xs text-slate-600 mb-3">
              {lang === "fr" ? "Faire de Moudar un outil publiable dans le champ de la science de la mise en œuvre." : "Turn Moudar into a publishable tool in Implementation Science."}
            </p>
            {lang === "fr" ? (
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                <li>Geler une version de référence du moteur (<strong>Moudar Engine v1.0</strong>).</li>
                <li>Rédiger une spécification interne : entrées, transformations, sorties, hypothèses.</li>
                <li>Formaliser le moteur (schémas, pseudo-code, mapping vers les cadres CFIR/RE-AIM, etc.).</li>
                <li>Ébaucher un article de type &laquo;method paper&raquo; pour une revue d&apos;Implementation Science.</li>
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                <li>Freeze a reference engine version (<strong>Moudar Engine v1.0</strong>).</li>
                <li>Write an internal specification: inputs, transformations, outputs, assumptions.</li>
                <li>Formalize the engine (diagrams, pseudo-code, mapping to CFIR/RE-AIM, etc.).</li>
                <li>Draft a &ldquo;method paper&rdquo; style article for an Implementation Science journal.</li>
              </ul>
            )}
          </div>
        </div>

        {/* AI & product axes */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {lang === "fr" ? "\uD83E\uDDE0 Axes IA & produit" : "\uD83E\uDDE0 AI & product axes"}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {lang === "fr"
              ? "Synthèse des grands axes d'amélioration de Moudar (modélisation prédictive, NLP, mobile terrain, marketplace, etc.) pour devenir un copilote de référence mondial."
              : "Synthesis of the main improvement axes for Moudar (predictive modelling, NLP, field mobile app, marketplace, etc.) on the path to becoming a global reference copilot."}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {ROADMAP_IMPROVEMENT_AXES.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 text-left">
                <h3 className="text-sm font-semibold mb-1">{tObj(item.axis, lang)}</h3>
                <p className="text-xs text-slate-600 mb-2">
                  <span className="font-semibold">{lang === "fr" ? "\uD83C\uDFAF Objectif : " : "\uD83C\uDFAF Objective: "}</span>
                  {tObj(item.objective, lang)}
                </p>
                <p className="text-xs text-slate-600">
                  <span className="font-semibold">{lang === "fr" ? "\u2699\uFE0F Action : " : "\u2699\uFE0F Action: "}</span>
                  {tObj(item.action, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weighting model */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {lang === "fr" ? "\u2696\uFE0F Modèle de pondération" : "\u2696\uFE0F Weighting model"}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {lang === "fr"
              ? "Comment le moteur Moudar peut pondérer différemment les domaines CFIR et les contextes sectoriels pour refléter le risque réel d'échec."
              : "How Moudar's engine can weight CFIR domains and sector contexts differently to reflect real failure risk."}
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {ROADMAP_WEIGHTING_MODEL.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 text-left">
                <h3 className="text-sm font-semibold mb-1">{tObj(item.label, lang)}</h3>
                <p className="text-xs text-slate-600">{tObj(item.description, lang)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Critical risk variables */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {lang === "fr" ? "\uD83D\uDEA8 Variables critiques de risque" : "\uD83D\uDEA8 Critical risk variables"}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {lang === "fr"
              ? "Les cinq facteurs de risque majeurs que Moudar doit suivre systématiquement dans ses analyses."
              : "The five major risk factors that Moudar should systematically track in its analyses."}
          </p>
          <div className="space-y-3">
            {ROADMAP_CRITICAL_RISKS.map((risk) => (
              <div key={risk.id} className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-rose-700">{tObj(risk.label, lang)}</h3>
                </div>
                <p className="text-xs text-slate-600 mb-1">
                  <span className="font-semibold">{lang === "fr" ? "Facteurs impliqués : " : "Involved factors: "}</span>
                  {tObj(risk.factors, lang)}
                </p>
                <p className="text-xs text-slate-600">
                  <span className="font-semibold">{lang === "fr" ? "Pourquoi c'est critique : " : "Why it is critical: "}</span>
                  {tObj(risk.justification, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline milestones */}
        <div className="space-y-6">
          {milestones.map((m, idx) => {
            const statusColors = {
              current: "border-purple-500 bg-purple-50",
              planned: "border-blue-400 bg-blue-50",
              future: "border-gray-300 bg-gray-50"
            };
            const statusBadge = {
              current: { label: lang === "fr" ? "En cours" : "Current", bg: "bg-blue-600" },
              planned: { label: lang === "fr" ? "Planifié" : "Planned", bg: "bg-blue-500" },
              future: { label: lang === "fr" ? "Vision" : "Vision", bg: "bg-gray-400" }
            };
            return (
              <div key={idx} className={"border-l-4 rounded-xl p-6 " + statusColors[m.status]}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-800">{m.year}</span>
                  <span className={"px-3 py-1 text-white text-xs rounded-full " + statusBadge[m.status].bg}>
                    {statusBadge[m.status].label}
                  </span>
                  <span className="font-semibold text-gray-700">{tObj(m.title, lang)}</span>
                </div>
                <ul className="grid md:grid-cols-2 gap-2">
                  {m.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-purple-500 mt-0.5">{"\u25B8"}</span>
                      <span>{tObj(item, lang)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white text-center">
          <h3 className="text-xl font-bold mb-2">
            {lang === "fr" ? "Vous voulez façonner l'avenir de Moudar ?" : "Want to shape Moudar's future?"}
          </h3>
          <p className="text-white/80 mb-4">
            {lang === "fr" ? "Rejoignez notre programme pilote et bénéficiez de tarifs préférentiels" : "Join our pilot program and benefit from preferential rates"}
          </p>
          <a
            href="mailto:contact@moudar.com?subject=Programme%20pilote%20Moudar"
            className="px-6 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-purple-50 inline-block transition"
          >
            {"\uD83D\uDCE7 "}{lang === "fr" ? "Devenir pilote" : "Become a pilot"}
          </a>
        </div>
      </div>
    </div>
  );
}
