import React from 'react';
/* global PRICING, DOMAINS, tObj, StorageManager, MoudarEngine */

export default function PricingView({ lang }) {
  return (
    <div className="fade-in max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {"\uD83D\uDCB0 "}{lang === "fr" ? "Nos offres" : "Our plans"}
        </h1>
        <p className="text-gray-500 text-sm italic">
          {lang === "fr" ? "Prix indicatifs pour l'Europe — Tarification différenciée PRFI sur demande" : "Indicative prices for Europe — LMIC differentiated pricing on request"}
        </p>
      </div>

      {/* Plans grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {PRICING.plans.map((plan) => (
          <div key={plan.id} className={"bg-white rounded-2xl p-6 price-card " + (plan.popular ? "price-popular" : "shadow-lg")}>
            {plan.popular && (
              <div className="text-center mb-3">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-medium">{"\u2B50"} POPULAIRE</span>
              </div>
            )}
            <h3 className="text-xl font-bold text-center mb-1 text-gray-800">{tObj(plan.name, lang)}</h3>
            <p className="text-gray-500 text-center text-sm mb-4">{tObj(plan.description, lang)}</p>
            <div className="text-center mb-6">
              <span className="text-3xl font-bold text-gray-800">{tObj(plan.price, lang)}</span>
              <span className="text-gray-500">{tObj(plan.period, lang)}</span>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">{"\u2713"}</span>
                  <span className="text-gray-600">{tObj(f, lang)}</span>
                </li>
              ))}
            </ul>
            <button className={"w-full py-3 rounded-xl font-medium transition " + (plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}>
              {tObj(plan.cta, lang)}
            </button>
          </div>
        ))}
      </div>

      {/* Pilot offers */}
      <div className="mb-10">
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-full mb-3">
            {"\uD83D\uDE80 "}{lang === "fr" ? "OFFRES PILOTES 2025" : "2025 PILOT OFFERS"}
          </span>
          <h2 className="text-2xl font-bold text-gray-800">
            {lang === "fr" ? "Programmes clé en main" : "Turnkey Programs"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {lang === "fr" ? "Accompagnement complet pour démarrer avec Moudar" : "Complete support to get started with Moudar"}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Hospital pilot pack */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">{"\uD83C\uDFE5"}</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{lang === "fr" ? "Pack Hôpital Pilote" : "Pilot Hospital Pack"}</h3>
                <span className="text-blue-600 font-semibold">{lang === "fr" ? "À partir de $2,700" : "From $2,700"}</span>
              </div>
            </div>
            <ul className="space-y-2 mb-5">
              <li className="flex items-start gap-2 text-sm text-gray-600"><span className="text-blue-500 mt-0.5">{"\u2713"}</span> {lang === "fr" ? "5 projets d'implémentation inclus" : "5 implementation projects included"}</li>
              <li className="flex items-start gap-2 text-sm text-gray-600"><span className="text-blue-500 mt-0.5">{"\u2713"}</span> {lang === "fr" ? "1 atelier de 3h en présentiel/distanciel" : "1 workshop (3h) onsite or remote"}</li>
              <li className="flex items-start gap-2 text-sm text-gray-600"><span className="text-blue-500 mt-0.5">{"\u2713"}</span> {lang === "fr" ? "Formation CFIR/ERIC pour l'équipe" : "CFIR/ERIC training for your team"}</li>
              <li className="flex items-start gap-2 text-sm text-gray-600"><span className="text-blue-500 mt-0.5">{"\u2713"}</span> {lang === "fr" ? "Support email pendant 3 mois" : "Email support for 3 months"}</li>
              <li className="flex items-start gap-2 text-sm text-gray-600"><span className="text-blue-500 mt-0.5">{"\u2713"}</span> {lang === "fr" ? "Export des rapports Word personnalisés" : "Custom Word report exports"}</li>
            </ul>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
              <span className="px-2 py-0.5 bg-gray-100 rounded">{lang === "fr" ? "Durée: 3 mois" : "Duration: 3 months"}</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded">{lang === "fr" ? "1-3 utilisateurs" : "1-3 users"}</span>
            </div>
            <a href="mailto:contact@moudar.com?subject=Pack%20H%C3%B4pital%20Pilote" className="block w-full text-center py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
              {"\uD83D\uDCE9 "}{lang === "fr" ? "Demander un devis" : "Request a quote"}
            </a>
          </div>

          {/* National program pack */}
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl transition relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full font-medium">PREMIUM</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">{"\uD83C\uDFDB\uFE0F"}</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{lang === "fr" ? "Pack Programme National" : "National Program Pack"}</h3>
                <span className="text-purple-600 font-semibold">{lang === "fr" ? "Sur devis" : "Custom quote"}</span>
              </div>
            </div>
            <ul className="space-y-2 mb-5">
              <li className="flex items-start gap-2 text-sm text-gray-600"><span className="text-purple-500 mt-0.5">{"\u2713"}</span> {lang === "fr" ? "Licence annuelle illimitée" : "Unlimited annual license"}</li>
              <li className="flex items-start gap-2 text-sm text-gray-600"><span className="text-purple-500 mt-0.5">{"\u2713"}</span> {lang === "fr" ? "Accompagnement méthodologique complet (CFIR/RE-AIM)" : "Full methodological support (CFIR/RE-AIM)"}</li>
              <li className="flex items-start gap-2 text-sm text-gray-600"><span className="text-purple-500 mt-0.5">{"\u2713"}</span> {lang === "fr" ? "Formation certifiante pour 10 coordinateurs" : "Certified training for 10 coordinators"}</li>
              <li className="flex items-start gap-2 text-sm text-gray-600"><span className="text-purple-500 mt-0.5">{"\u2713"}</span> {lang === "fr" ? "Dashboard de suivi multi-projets" : "Multi-project monitoring dashboard"}</li>
              <li className="flex items-start gap-2 text-sm text-gray-600"><span className="text-purple-500 mt-0.5">{"\u2713"}</span> {lang === "fr" ? "Rapport PDF/Word pour bailleurs" : "PDF/Word report for funders"}</li>
              <li className="flex items-start gap-2 text-sm text-gray-600"><span className="text-purple-500 mt-0.5">{"\u2713"}</span> {lang === "fr" ? "Support technique prioritaire" : "Priority technical support"}</li>
            </ul>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
              <span className="px-2 py-0.5 bg-gray-100 rounded">{lang === "fr" ? "Durée: 12 mois" : "Duration: 12 months"}</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded">{lang === "fr" ? "Utilisateurs illimités" : "Unlimited users"}</span>
            </div>
            <a href="mailto:contact@moudar.com?subject=Pack%20Programme%20National" className="block w-full text-center py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition">
              {"\uD83D\uDCE9 "}{lang === "fr" ? "Contacter notre équipe" : "Contact our team"}
            </a>
          </div>
        </div>
      </div>

      {/* Target audience */}
      <div className="bg-slate-100 rounded-xl p-6 mb-8">
        <h3 className="font-bold text-gray-800 mb-4 text-center">
          {"\uD83D\uDC65 "}{lang === "fr" ? "Pour qui ?" : "For whom?"}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-center mb-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{lang === "fr" ? "Découverte" : "Discovery"}</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>{"\u2022 "}{lang === "fr" ? "Doctorants en Science de la mise en œuvre" : "Implementation Science PhD students"}</li>
              <li>{"\u2022 "}{lang === "fr" ? "Post-docs & chercheurs" : "Post-docs & researchers"}</li>
              <li>{"\u2022 "}{lang === "fr" ? "Petits projets exploratoires" : "Small exploratory projects"}</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
            <div className="text-center mb-2">
              <span className="px-3 py-1 bg-purple-100 text-blue-700 text-xs rounded-full">{lang === "fr" ? "Professionnel" : "Professional"}</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>{"\u2022 "}{lang === "fr" ? "Consultants santé publique" : "Public health consultants"}</li>
              <li>{"\u2022 "}{lang === "fr" ? "Équipes hospitalières" : "Hospital teams"}</li>
              <li>{"\u2022 "}{lang === "fr" ? "ONG de taille moyenne" : "Medium-sized NGOs"}</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-center mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{lang === "fr" ? "Organisationnel" : "Organizational"}</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>{"\u2022 "}{lang === "fr" ? "Ministères de la Santé" : "Ministries of Health"}</li>
              <li>{"\u2022 "}{lang === "fr" ? "Bailleurs (OMS, Gavi, GF)" : "Funders (WHO, Gavi, GF)"}</li>
              <li>{"\u2022 "}{lang === "fr" ? "CHU & grandes ONG" : "Teaching hospitals & large NGOs"}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data & Security */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8 border-l-4 border-green-500">
        <h3 className="font-bold text-gray-800 mb-3">
          {"\uD83D\uDD12 "}{lang === "fr" ? "Données & Sécurité" : "Data & Security"}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">{lang === "fr" ? "Version actuelle (Démo)" : "Current version (Demo)"}</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start gap-2"><span className="text-green-500">{"\u2713"}</span> {lang === "fr" ? "Données stockées localement (localStorage)" : "Data stored locally (localStorage)"}</li>
              <li className="flex items-start gap-2"><span className="text-green-500">{"\u2713"}</span> {lang === "fr" ? "Aucune donnée envoyée à un serveur" : "No data sent to any server"}</li>
              <li className="flex items-start gap-2"><span className="text-amber-500">{"\u26A0\uFE0F"}</span> {lang === "fr" ? "Ne pas saisir de données patients nominatives" : "Do not enter patient-identifying data"}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">{lang === "fr" ? "Version SaaS (2025)" : "SaaS version (2025)"}</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start gap-2"><span className="text-blue-500">{"\u25B8"}</span> {lang === "fr" ? "Hébergement UE (RGPD)" : "EU hosting (GDPR)"}</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">{"\u25B8"}</span> {lang === "fr" ? "Chiffrement des données au repos et en transit" : "Data encryption at rest and in transit"}</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">{"\u25B8"}</span> {lang === "fr" ? "Authentification sécurisée (SSO compatible)" : "Secure authentication (SSO compatible)"}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white">
        <h3 className="text-xl font-bold mb-2">
          {lang === "fr" ? "Prêt à transformer vos projets ?" : "Ready to transform your projects?"}
        </h3>
        <a
          href="mailto:contact@moudar.com?subject=Demande%20de%20d%C3%A9monstration%20Moudar"
          className="px-6 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-purple-50 inline-block transition mt-3"
        >
          {"\uD83D\uDCE7 "}{lang === "fr" ? "Demander une démo" : "Request a demo"}
        </a>
      </div>

      {/* Research / PhD Mode */}
      <div className="mt-10 bg-gradient-to-br from-slate-800 to-indigo-900 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">{"\uD83C\uDF93"}</div>
          <div>
            <h3 className="font-bold text-xl mb-1">{lang === "fr" ? "Mode Recherche / PhD" : "Research / PhD Mode"}</h3>
            <p className="text-indigo-200 text-sm">
              {lang === "fr" ? "Exportez vos données pour analyses R, Stata, Python — Compatible INNOV5-MH-MAROC" : "Export your data for R, Stata, Python — Compatible with INNOV5-MH-MAROC"}
            </p>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
          <h4 className="font-medium text-sm mb-2 text-indigo-300">
            {"\uD83D\uDD2C "}{lang === "fr" ? "Pourquoi utiliser Moudar pour la recherche ?" : "Why use Moudar for research?"}
          </h4>
          <ul className="text-xs text-indigo-200 space-y-1">
            <li>{"\u2022 "}{lang === "fr" ? "Versioning automatique des recommandations (traçabilité)" : "Automatic versioning of recommendations (traceability)"}</li>
            <li>{"\u2022 "}{lang === "fr" ? "Algorithme transparent et explainable (pas de boîte noire)" : "Transparent and explainable algorithm (no black box)"}</li>
            <li>{"\u2022 "}{lang === "fr" ? "Export des poids du graphe après calibration" : "Export of graph weights after calibration"}</li>
            <li>{"\u2022 "}{lang === "fr" ? "Compatible avec les designs multi-sites / stepped-wedge" : "Compatible with multi-site / stepped-wedge designs"}</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-lg mb-2">{"\uD83D\uDCCA"}</div>
            <h4 className="font-medium text-sm mb-1">{lang === "fr" ? "Paramètres projet" : "Project parameters"}</h4>
            <p className="text-xs text-indigo-200">{lang === "fr" ? "Domaine, phase EPIS, contexte, barrières, niveau ressources" : "Domain, EPIS phase, context, barriers, resource level"}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-lg mb-2">{"\uD83E\uDD16"}</div>
            <h4 className="font-medium text-sm mb-1">{lang === "fr" ? "Recommandations IA" : "AI recommendations"}</h4>
            <p className="text-xs text-indigo-200">{lang === "fr" ? "Stratégies, scores, frameworks, outcomes" : "Strategies, scores, frameworks, outcomes"}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-lg mb-2">{"\u2B50"}</div>
            <h4 className="font-medium text-sm mb-1">{lang === "fr" ? "Feedbacks terrain" : "Field feedback"}</h4>
            <p className="text-xs text-indigo-200">{lang === "fr" ? "Acceptation, notes, outcomes réels" : "Acceptance, ratings, actual outcomes"}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-lg mb-2">{"\u2699\uFE0F"}</div>
            <h4 className="font-medium text-sm mb-1">{lang === "fr" ? "Graphe calibré" : "Calibrated graph"}</h4>
            <p className="text-xs text-indigo-200">{lang === "fr" ? "Poids ajustés, métriques performance" : "Adjusted weights, performance metrics"}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => {
              const data = StorageManager.exportAllProjects('json');
              if (data) {
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'moudar_research_export_' + new Date().toISOString().split('T')[0] + '.json';
                a.click();
                URL.revokeObjectURL(url);
              }
            }}
            className="px-4 py-2 bg-white text-indigo-700 rounded-lg font-medium text-sm hover:bg-indigo-50 transition flex items-center gap-2"
          >
            {"\uD83D\uDCE5 "}{lang === "fr" ? "Export JSON (projets)" : "Export JSON (projects)"}
          </button>
          <button
            onClick={() => {
              const data = StorageManager.exportAllProjects('csv');
              if (data) {
                const blob = new Blob([data], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'moudar_research_export_' + new Date().toISOString().split('T')[0] + '.csv';
                a.click();
                URL.revokeObjectURL(url);
              }
            }}
            className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium text-sm hover:bg-white/30 transition flex items-center gap-2"
          >
            {"\uD83D\uDCCA "}{lang === "fr" ? "Export CSV (R/Stata)" : "Export CSV (R/Stata)"}
          </button>
          <button
            onClick={() => {
              const feedbackData = MoudarEngine.exportFeedbackData();
              const data = JSON.stringify(feedbackData, null, 2);
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'moudar_feedbacks_' + new Date().toISOString().split('T')[0] + '.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium text-sm hover:bg-white/30 transition flex items-center gap-2"
          >
            {"\u2B50 "}{lang === "fr" ? "Export feedbacks" : "Export feedbacks"}
          </button>
          <button
            onClick={() => {
              const graphData = MoudarEngine.exportCalibratedGraph();
              const data = JSON.stringify(graphData, null, 2);
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'moudar_calibrated_graph_v' + MoudarEngine.VERSION + '_' + new Date().toISOString().split('T')[0] + '.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium text-sm hover:from-purple-600 hover:to-indigo-600 transition flex items-center gap-2"
          >
            {"\u2699\uFE0F "}{lang === "fr" ? "Export graphe calibré" : "Export calibrated graph"}
          </button>
        </div>

        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <p className="text-xs text-indigo-300">
            {"\uD83D\uDCA1 "}<strong>{lang === "fr" ? "Pour votre publication / thèse :" : "For your publication / thesis:"}</strong>{" "}
            {lang === "fr"
              ? "Le graphe calibré contient les poids ajustés après N feedbacks terrain, permettant de documenter l'apprentissage du moteur IA sur votre cohorte."
              : "The calibrated graph contains adjusted weights after N field feedbacks, allowing you to document the AI engine's learning on your cohort."}
          </p>
        </div>

        <p className="text-xs text-indigo-400 mt-4 italic text-center">
          {lang === "fr"
            ? "Moudar Engine v" + MoudarEngine.VERSION + " — Algorithme AdaptiveKG — Développé dans le cadre de INNOV5-MH-MAROC"
            : "Moudar Engine v" + MoudarEngine.VERSION + " — AdaptiveKG Algorithm — Developed as part of INNOV5-MH-MAROC"}
        </p>
      </div>
    </div>
  );
}
