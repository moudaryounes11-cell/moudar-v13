import React from 'react';

export default function ProductView({ onNavigate, lang }) {
  return (
    <div className="fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
          {lang === "fr" ? "Détail du produit" : "Product details"}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {lang === "fr"
            ? "Tout ce que fait Moudar pour vos projets d'implémentation"
            : "Everything Moudar does for your implementation projects"}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          {lang === "fr"
            ? "Un assistant de conception, un diagnostic de maturité et un dossier vivant, dans un seul outil, pour les hôpitaux, ONG, ministères et équipes de recherche."
            : "A design assistant, maturity diagnostic and living file, in one tool, for hospitals, NGOs, ministries and research teams."}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onNavigate("pricing")}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            {lang === "fr" ? "Voir les offres" : "See pricing"}
          </button>
          <a
            href="mailto:contact@moudar.com?subject=Demande%20de%20d%C3%A9mo%20Moudar"
            className="px-6 py-3 bg-white text-gray-800 rounded-full font-semibold border border-gray-300 hover:bg-gray-50 transition"
          >
            {lang === "fr" ? "Demander une démo" : "Request a demo"}
          </a>
        </div>
      </div>

      {/* Section 1: Design Assistant */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {"✨ "}
              {lang === "fr"
                ? "Assistant de conception – du contexte au protocole structuré"
                : "Design Assistant – from context to structured protocol"}
            </h2>
            <p className="text-gray-600 mb-4">
              {lang === "fr"
                ? "L'assistant de Moudar transforme quelques réponses clés en un protocole d'implémentation argumenté, appuyé sur les principaux cadres de la Science de la mise en œuvre. Pas besoin d'être expert CFIR/RE-AIM pour produire un document solide."
                : "Moudar's assistant transforms a few key answers into an evidence-based implementation protocol, supported by major Implementation Science frameworks. No need to be a CFIR/RE-AIM expert to produce a solid document."}
            </p>
            <p className="font-semibold text-gray-800 mb-2">
              {lang === "fr"
                ? "Vous répondez à des questions simples sur :"
                : "You answer simple questions about:"}
            </p>
            <ul className="text-gray-600 space-y-1 mb-4 list-disc list-inside">
              <li>{lang === "fr" ? "le contexte (type d'établissement, région, contraintes, ressources)" : "context (facility type, region, constraints, resources)"}</li>
              <li>{lang === "fr" ? "la population cible (patients, professionnels, communauté, élèves…)" : "target population (patients, professionals, community, students...)"}</li>
              <li>{lang === "fr" ? "les barrières perçues (résistance, surcharge, manque de données, culture, stigma…)" : "perceived barriers (resistance, overload, lack of data, culture, stigma...)"}</li>
              <li>{lang === "fr" ? "la phase EPIS (exploration, préparation, implémentation, pérennisation)" : "EPIS phase (exploration, preparation, implementation, sustainment)"}</li>
            </ul>
            <p className="font-semibold text-gray-800 mb-2">
              {lang === "fr" ? "Moudar suggère alors automatiquement :" : "Moudar then automatically suggests:"}
            </p>
            <ul className="text-gray-600 space-y-1 list-disc list-inside">
              <li>{lang === "fr" ? "des cadres d'implémentation adaptés (CFIR 2.0, EPIS, RE-AIM, Proctor, TIDieR)" : "suitable implementation frameworks (CFIR 2.0, EPIS, RE-AIM, Proctor, TIDieR)"}</li>
              <li>{lang === "fr" ? "des stratégies d'implémentation (inspirées d'ERIC)" : "implementation strategies (inspired by ERIC)"}</li>
              <li>{lang === "fr" ? "des résultats d'implémentation à suivre (acceptabilité, faisabilité, adoption, pérennité, coût, équité…)" : "implementation outcomes to track (acceptability, feasibility, adoption, sustainability, cost, equity...)"}</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold uppercase mb-3">
                {lang === "fr" ? "Livrable" : "Deliverable"}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {lang === "fr" ? "Protocole d'implémentation (Word)" : "Implementation Protocol (Word)"}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {lang === "fr" ? "Le document généré contient :" : "The generated document contains:"}
              </p>
              <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                <li>{lang === "fr" ? "Résumé du projet (objet, contexte, population, objectifs)" : "Project summary (subject, context, population, objectives)"}</li>
                <li>{lang === "fr" ? "Cadre conceptuel d'implémentation (CFIR/EPIS/RE-AIM)" : "Implementation conceptual framework (CFIR/EPIS/RE-AIM)"}</li>
                <li>{lang === "fr" ? "Stratégies sélectionnées et justifications" : "Selected strategies and justifications"}</li>
                <li>{lang === "fr" ? "Barrières et leviers identifiés" : "Identified barriers and facilitators"}</li>
                <li>{lang === "fr" ? "Résultats d'implémentation visés" : "Targeted implementation outcomes"}</li>
                <li>{lang === "fr" ? "Plan d'action initial" : "Initial action plan"}</li>
                <li>{lang === "fr" ? "Notes TIDieR pour décrire l'intervention" : "TIDieR notes to describe the intervention"}</li>
              </ul>
              <p className="text-gray-500 text-xs mt-4">
                {lang === "fr"
                  ? "Le protocole peut ensuite être affiné avec vos équipes, intégré à un dossier éthique ou utilisé comme base pour un article scientifique."
                  : "The protocol can then be refined with your teams, integrated into an ethics file or used as a basis for a scientific article."}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate("wizard")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {"✨ "}
            {lang === "fr" ? "Créer un protocole" : "Create a protocol"}
          </button>
        </div>
      </div>

      {/* Section 2: Maturity Diagnostic */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {"📊 "}
              {lang === "fr"
                ? "Diagnostic de maturité – savoir d'où vous partez"
                : "Maturity Diagnostic – know where you stand"}
            </h2>
            <p className="text-gray-600 mb-4">
              {lang === "fr"
                ? "Moudar propose un diagnostic de maturité d'implémentation en 6 dimensions, pour évaluer à quel point votre organisation est prête à porter une innovation."
                : "Moudar offers an implementation maturity diagnostic in 6 dimensions, to assess how ready your organization is to carry an innovation."}
            </p>
            <p className="font-semibold text-gray-800 mb-2">
              {lang === "fr" ? "Les 6 dimensions évaluées :" : "The 6 dimensions assessed:"}
            </p>
            <ul className="text-gray-600 space-y-1 mb-4 list-disc list-inside">
              <li>{lang === "fr" ? "Leadership & gouvernance" : "Leadership & governance"}</li>
              <li>{lang === "fr" ? "Culture & climat organisationnel" : "Culture & organizational climate"}</li>
              <li>{lang === "fr" ? "Ressources & capacités opérationnelles" : "Resources & operational capabilities"}</li>
              <li>{lang === "fr" ? "Systèmes d'information & données" : "Information systems & data"}</li>
              <li>{lang === "fr" ? "Compétences & capacité de changement" : "Skills & change capacity"}</li>
              <li>{lang === "fr" ? "Partenariats & ancrage externe" : "Partnerships & external anchoring"}</li>
            </ul>
            <p className="text-gray-600">
              {lang === "fr"
                ? "En 30 à 45 minutes, une équipe projet ou un groupe d'acteurs clés peut compléter le questionnaire et obtenir une vision claire de ses atouts et de ses zones à renforcer."
                : "In 30 to 45 minutes, a project team or group of key stakeholders can complete the questionnaire and get a clear view of their strengths and areas to strengthen."}
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
              <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold uppercase mb-3">
                {lang === "fr" ? "Résultats" : "Results"}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {lang === "fr" ? "Score global, forces, priorités" : "Global score, strengths, priorities"}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {lang === "fr" ? "Le diagnostic produit :" : "The diagnostic produces:"}
              </p>
              <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                <li>{lang === "fr" ? "un score global de maturité" : "a global maturity score"}</li>
                <li>{lang === "fr" ? "des scores par dimension" : "scores by dimension"}</li>
                <li>{lang === "fr" ? "une liste de forces : ce qui fonctionne déjà bien" : "a list of strengths: what already works well"}</li>
                <li>{lang === "fr" ? "des points de vigilance et des priorités d'action" : "areas of concern and action priorities"}</li>
                <li>{lang === "fr" ? "un rapport Word/PDF avec résumé exécutif" : "a Word/PDF report with executive summary"}</li>
              </ul>
              <p className="text-gray-500 text-xs mt-4">
                {lang === "fr"
                  ? "Ce rapport peut être utilisé dans vos comités de pilotage, réunions de direction ou échanges avec les bailleurs."
                  : "This report can be used in your steering committees, management meetings or exchanges with funders."}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate("diagnostic")}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            {"📊 "}
            {lang === "fr" ? "Lancer un diagnostic" : "Start a diagnostic"}
          </button>
        </div>
      </div>

      {/* Section 3: Living File */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {"📂 "}
              {lang === "fr"
                ? "Dossier vivant – l'histoire complète de chaque projet"
                : "Living File – the complete history of each project"}
            </h2>
            <p className="text-gray-600 mb-4">
              {lang === "fr"
                ? "Dans Moudar, chaque projet devient un dossier vivant d'implémentation. Vous ne perdez plus la trace des décisions et des versions."
                : "In Moudar, each project becomes a living implementation file. You no longer lose track of decisions and versions."}
            </p>
            <p className="font-semibold text-gray-800 mb-2">
              {lang === "fr" ? "Pour chaque projet, vous conservez :" : "For each project, you keep:"}
            </p>
            <ul className="text-gray-600 space-y-1 mb-4 list-disc list-inside">
              <li>{lang === "fr" ? "Une fiche projet : titre, organisation, domaine, phase EPIS, tags" : "A project sheet: title, organization, domain, EPIS phase, tags"}</li>
              <li>{lang === "fr" ? "Un statut : brouillon, protocole généré, diagnostiqué, en cours, clôturé" : "A status: draft, protocol generated, diagnosed, in progress, closed"}</li>
              <li>{lang === "fr" ? "Un historique des diagnostics : dates, scores, évolution" : "A diagnostic history: dates, scores, evolution"}</li>
              <li>{lang === "fr" ? "Un historique des protocoles : versions successives exportables" : "A protocol history: successive exportable versions"}</li>
            </ul>
            <p className="text-gray-600">
              {lang === "fr"
                ? "Vous pouvez suivre un projet sur 6, 12 ou 24 mois, et produire à tout moment une trace structurée pour vos directions, vos bailleurs ou vos audits."
                : "You can track a project over 6, 12 or 24 months, and produce a structured record at any time for your management, funders or audits."}
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold uppercase mb-3">
                {lang === "fr" ? 'Vue "Mes projets"' : '"My Projects" view'}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {lang === "fr" ? "Une vue claire pour piloter" : "A clear view for steering"}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {lang === "fr" ? 'La vue "Mes projets" permet de voir :' : 'The "My Projects" view shows:'}
              </p>
              <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                <li>{lang === "fr" ? "le statut de chaque projet" : "the status of each project"}</li>
                <li>{lang === "fr" ? "la phase EPIS et le domaine concerné" : "the EPIS phase and related domain"}</li>
                <li>{lang === "fr" ? "la date du dernier diagnostic et du dernier protocole" : "the date of the last diagnostic and last protocol"}</li>
                <li>{lang === "fr" ? 'les tags (ex. "mhGAP", "suicide", "Digital health")' : 'tags (e.g. "mhGAP", "suicide", "Digital health")'}</li>
              </ul>
              <p className="text-gray-500 text-xs mt-4">
                {lang === "fr"
                  ? 'C\'est votre "cockpit" d\'implémentation : vous savez où vous en êtes et ce qui doit être retravaillé en priorité.'
                  : "It's your implementation \"cockpit\": you know where you stand and what needs to be reworked as a priority."}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate("myProjects")}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
          >
            {"📂 "}
            {lang === "fr" ? "Voir mes projets" : "View my projects"}
          </button>
        </div>
      </div>

      {/* Section 4: Science Frameworks */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {"🔬 "}
          {lang === "fr"
            ? "La science de la mise en œuvre, sans la lourdeur du jargon"
            : "Implementation science, without the jargon"}
        </h2>
        <p className="text-gray-600 mb-4">
          {lang === "fr"
            ? "Moudar s'appuie sur les principaux cadres de la Science de la mise en œuvre, mais les rend utilisables par des équipes qui n'ont pas le temps de lire des dizaines d'articles scientifiques."
            : "Moudar builds on major Implementation Science frameworks, but makes them usable by teams who don't have time to read dozens of scientific articles."}
        </p>
        <p className="font-semibold text-gray-800 mb-3">
          {lang === "fr" ? "Parmi les références intégrées :" : "Among the integrated references:"}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">CFIR 2.0</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">EPIS</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">RE-AIM</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Proctor et al.</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">TIDieR</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {lang === "fr" ? "73 stratégies ERIC" : "73 ERIC strategies"}
          </span>
        </div>
        <p className="text-gray-600 mb-6">
          {lang === "fr"
            ? "Le moteur de Moudar fait le lien entre vos réponses et ces cadres pour générer des propositions cohérentes (cadres, stratégies, résultats d'implémentation), que vous pouvez ensuite ajuster et enrichir avec vos équipes."
            : "Moudar's engine links your answers to these frameworks to generate consistent proposals (frameworks, strategies, implementation outcomes), which you can then adjust and enrich with your teams."}
        </p>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-blue-800 text-sm">
            <strong>{lang === "fr" ? "Version actuelle :" : "Current version:"}</strong>{" "}
            {lang === "fr"
              ? "Moudar est disponible en version MVP démo avec stockage local (navigateur). La version SaaS (backend cloud, multi-utilisateurs, RGPD) est en cours de préparation."
              : "Moudar is available as a demo MVP version with local storage (browser). The SaaS version (cloud backend, multi-user, GDPR) is in preparation."}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={() => onNavigate("wizard")}
          className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
        >
          {"✨ "}
          {lang === "fr" ? "Commencer maintenant" : "Start now"}
        </button>
      </div>
    </div>
  );
}
