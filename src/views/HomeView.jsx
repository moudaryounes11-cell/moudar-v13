import React, { useState } from 'react';

// TODO: Import these from data modules when available
/* global SECTOR_CATEGORIES, SECTOR_EXAMPLES, EXAMPLE_PROJECTS, DOMAINS, USE_CASES */

export default function HomeView({ onNavigate, onLoadDemo, lang, onStartSectorExample }) {
  const handleStartSectorExample = onStartSectorExample || (() => {});
  const [selectedSector, setSelectedSector] = useState("health");

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="gradient-hero rounded-2xl p-8 text-white text-center mb-8">
        <div className="flex justify-center mb-4">
          <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2" />
            <path d="M12 28V14L20 22L28 14V28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="20" cy="12" r="3" fill="#34d399" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Moudar</h1>
        <p className="text-xl text-white/90 mb-2">
          {lang === "fr"
            ? "Le copilote numérique pour la Science de la mise en œuvre"
            : "The digital co-pilot for Implementation Science"}
        </p>
        <p className="text-white/70 mb-6">
          {lang === "fr"
            ? "Concevez et pilotez vos projets de changement pour votre secteur d'activité"
            : "Design and manage your change projects for your industry"}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <button
            onClick={() => onNavigate("wizard")}
            className="px-6 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg"
          >
            {"✨ "}{lang === "fr" ? "Nouveau projet" : "New project"}
          </button>
          <button
            onClick={onLoadDemo}
            className="px-6 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition border border-white/30"
          >
            {"🎯 "}{lang === "fr" ? "Voir la démo" : "See demo"}
          </button>
        </div>
        <a
          href="mailto:contact@moudar.com?subject=Demande%20de%20d%C3%A9mo%20Moudar"
          className="text-white/80 hover:text-white text-sm underline"
        >
          {"📩 "}{lang === "fr" ? "Demander une démo" : "Request a demo"}{" : contact@moudar.com"}
        </a>
      </div>

      {/* Sector Selector */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {lang === "fr" ? "Choisissez votre secteur" : "Choose your sector"}
            </h3>
            <p className="text-xs text-gray-500">
              {lang === "fr"
                ? "Moudar s'adapte à la santé, à l'éducation, au social, à l'humanitaire, à l'agriculture..."
                : "Moudar adapts to health, education, social services, humanitarian, agriculture..."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(SECTOR_CATEGORIES).map((key) => {
              const cat = SECTOR_CATEGORIES[key];
              const isSelected = key === selectedSector;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedSector(key)}
                  className={
                    "px-3 py-1.5 rounded-full text-xs border transition " +
                    (isSelected
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50")
                  }
                >
                  {cat.label[lang] || cat.label.fr || cat.label.en}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-3 border-t pt-3 grid md:grid-cols-3 gap-3 items-start">
          <div className="md:col-span-2">
            {(() => {
              const meta = SECTOR_EXAMPLES[selectedSector] || null;
              if (!meta) {
                return (
                  <p className="text-sm text-gray-500">
                    {lang === "fr"
                      ? "Sélectionnez un secteur pour voir un scénario type."
                      : "Select a sector to view a typical scenario."}
                  </p>
                );
              }
              return (
                <div>
                  <p className="text-xs uppercase text-gray-400 mb-1">
                    {lang === "fr" ? "Scénario type" : "Typical scenario"}
                  </p>
                  <h4 className="font-semibold text-gray-800">
                    {meta.title[lang] || meta.title.fr || meta.title.en}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {meta.context[lang] || meta.context.fr || meta.context.en}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="font-medium">{lang === "fr" ? "Défi :" : "Challenge:"}</span>{" "}
                    {meta.challenge[lang] || meta.challenge.fr || meta.challenge.en}
                  </p>
                </div>
              );
            })()}
          </div>
          <div className="md:col-span-1 flex md:justify-end">
            <button
              type="button"
              onClick={() => handleStartSectorExample(selectedSector)}
              className="w-full md:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-semibold shadow hover:from-blue-700 hover:to-indigo-800"
            >
              {lang === "fr" ? "Utiliser ce scénario dans le Wizard" : "Use this scenario in the Wizard"}
            </button>
          </div>
        </div>
      </div>

      {/* Demo Scenarios */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-full mb-2">
            {"🎯 "}{lang === "fr" ? "CAS CONCRETS" : "REAL CASES"}
          </span>
          <h2 className="text-2xl font-bold text-gray-800">
            {lang === "fr" ? "Scénarios de démonstration" : "Demo Scenarios"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {lang === "fr"
              ? "Découvrez comment Moudar résout des problèmes réels de coordination et d'implémentation"
              : "See how Moudar solves real coordination and implementation challenges"}
          </p>
        </div>

        {/* INNOV5-MH-MAROC */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">{"⭐ PROJET PHARE"}</span>
              <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full">{"🌍 OMS"}</span>
              <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full">{"🔬 RCT"}</span>
              <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full">{"🇲🇦 Maroc"}</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">INNOV5-MH-MAROC</h3>
            <p className="text-white/90 mb-4 text-sm leading-relaxed">
              {lang === "fr"
                ? "Projet de recherche pilote (essai contrôlé randomisé en préparation) intégrant simultanément les 5 innovations OMS validées en santé mentale. 146 participants, 6 sites, 36 mois."
                : "World's first RCT simultaneously integrating all 5 WHO-validated mental health innovations. 146 participants, 6 sites, 36 months."}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-5">
              <div className="text-center p-3 bg-white/10 rounded-xl">
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs text-white/70">{lang === "fr" ? "Innovations OMS" : "WHO Innovations"}</div>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-xl">
                <div className="text-2xl font-bold">146</div>
                <div className="text-xs text-white/70">{lang === "fr" ? "Participants" : "Participants"}</div>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-xl">
                <div className="text-2xl font-bold">6</div>
                <div className="text-xs text-white/70">{lang === "fr" ? "Sites" : "Sites"}</div>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-xl">
                <div className="text-2xl font-bold">36</div>
                <div className="text-xs text-white/70">{lang === "fr" ? "Mois" : "Months"}</div>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-xl">
                <div className="text-2xl font-bold">6.46M</div>
                <div className="text-xs text-white/70">DH</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const demo = EXAMPLE_PROJECTS.find((p) => p.id === "DEMO_INNOV5_FULL");
                  if (demo) {
                    localStorage.setItem("moudar_current_project", JSON.stringify(demo));
                    onNavigate("wizard");
                  }
                }}
                className="px-5 py-2.5 bg-white text-indigo-900 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg"
              >
                {"🚀 "}{lang === "fr" ? "Explorer ce projet" : "Explore this project"}
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="px-5 py-2.5 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition border border-white/30"
              >
                {"ℹ️ "}{lang === "fr" ? "En savoir plus" : "Learn more"}
              </button>
            </div>
          </div>
        </div>

        {/* COVID + Multisite cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* COVID Vaccination */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-white/20 text-xs rounded-full">{"🌍 Multi-acteurs"}</span>
                <span className="px-2 py-0.5 bg-white/20 text-xs rounded-full">{"💉 Vaccination"}</span>
              </div>
              <h3 className="text-lg font-bold">
                {lang === "fr" ? "Campagne Vaccination COVID-19" : "COVID-19 Vaccination Campaign"}
              </h3>
              <p className="text-white/80 text-sm">
                {lang === "fr" ? "Coordination OMS + UNICEF + Ministère + ONG" : "WHO + UNICEF + Ministry + NGO Coordination"}
              </p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div>
                  <div className="text-xl font-bold text-green-600">5M</div>
                  <div className="text-xs text-gray-500">{lang === "fr" ? "Personnes" : "People"}</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">200</div>
                  <div className="text-xs text-gray-500">{lang === "fr" ? "Centres" : "Centers"}</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">4</div>
                  <div className="text-xs text-gray-500">{lang === "fr" ? "Acteurs" : "Actors"}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {lang === "fr"
                  ? "Comment coordonner une campagne massive avec des acteurs aux cultures et processus différents ?"
                  : "How to coordinate a massive campaign with actors having different cultures and processes?"}
              </p>
              <button
                onClick={() => {
                  const demo = EXAMPLE_PROJECTS.find((p) => p.id === "DEMO_VACCINATION");
                  if (demo) {
                    localStorage.setItem("moudar_current_project", JSON.stringify(demo));
                    onNavigate("wizard");
                  }
                }}
                className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                {lang === "fr" ? "Voir la démo" : "See demo"}
              </button>
            </div>
          </div>

          {/* Multisite Clinical Trial */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-white/20 text-xs rounded-full">{"🔬 Recherche"}</span>
                <span className="px-2 py-0.5 bg-white/20 text-xs rounded-full">{"🏥 3 CHU"}</span>
              </div>
              <h3 className="text-lg font-bold">
                {lang === "fr" ? "Essai clinique multisite" : "Multisite Clinical Trial"}
              </h3>
              <p className="text-white/80 text-sm">
                {lang === "fr" ? "Diabète type 2 – 3 protocoles comparés" : "Type 2 Diabetes – 3 protocols compared"}
              </p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div>
                  <div className="text-xl font-bold text-purple-600">450</div>
                  <div className="text-xs text-gray-500">{lang === "fr" ? "Patients" : "Patients"}</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-600">3</div>
                  <div className="text-xs text-gray-500">{lang === "fr" ? "Sites" : "Sites"}</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-600">24</div>
                  <div className="text-xs text-gray-500">{lang === "fr" ? "Mois" : "Months"}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {lang === "fr"
                  ? "Comment harmoniser les pratiques et garantir la qualité des données entre 3 CHU ?"
                  : "How to harmonize practices and ensure data quality across 3 university hospitals?"}
              </p>
              <button
                onClick={() => {
                  const demo = EXAMPLE_PROJECTS.find((p) => p.id === "DEMO_RESEARCH_MULTISITE");
                  if (demo) {
                    localStorage.setItem("moudar_current_project", JSON.stringify(demo));
                    onNavigate("wizard");
                  }
                }}
                className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
              >
                {lang === "fr" ? "Voir la démo" : "See demo"}
              </button>
            </div>
          </div>
        </div>

        {/* Sector Templates */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📋</span>
            <h3 className="font-bold text-gray-800">
              {lang === "fr" ? "Templates sectoriels prêts à l'emploi" : "Ready-to-use sector templates"}
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: "TEMPLATE_HEALTH_PUBLIC", icon: "🏥", name: { fr: "Santé publique", en: "Public Health" }, color: "from-blue-500 to-cyan-500" },
              { id: "TEMPLATE_EDUCATION", icon: "🎓", name: { fr: "Éducation", en: "Education" }, color: "from-amber-500 to-orange-500" },
              { id: "TEMPLATE_SOCIAL", icon: "🤝", name: { fr: "Social / Humanitaire", en: "Social / Humanitarian" }, color: "from-rose-500 to-pink-500" },
              { id: "TEMPLATE_INDUSTRY", icon: "🏭", name: { fr: "Industrie", en: "Industry" }, color: "from-slate-500 to-gray-600" }
            ].map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => {
                  const template = EXAMPLE_PROJECTS.find((p) => p.id === tpl.id);
                  if (template) {
                    const newProject = Object.assign({}, template, {
                      id: "PROJECT_" + Date.now(),
                      status: "draft",
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString()
                    });
                    localStorage.setItem("moudar_current_project", JSON.stringify(newProject));
                    onNavigate("wizard");
                  }
                }}
                className={"p-4 rounded-xl text-white text-center card-hover bg-gradient-to-br " + tpl.color}
              >
                <div className="text-3xl mb-2">{tpl.icon}</div>
                <div className="text-sm font-medium">{tpl.name[lang] || tpl.name.fr}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div
          onClick={() => onNavigate("wizard")}
          className="bg-gradient-to-br from-blue-500 to-teal-600 rounded-xl p-6 text-white card-hover cursor-pointer"
        >
          <div className="text-4xl mb-3">✨</div>
          <h3 className="text-xl font-bold mb-2">
            {lang === "fr" ? "Assistant de conception" : "Design Assistant"}
          </h3>
          <p className="text-white/90 text-sm mb-3">
            {lang === "fr"
              ? "En 10-15 minutes, obtenez un squelette de protocole CFIR/RE-AIM exportable en Word"
              : "In 10-15 minutes, get a CFIR/RE-AIM protocol skeleton exportable to Word"}
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-white/20 rounded text-xs">CFIR 2.0</span>
            <span className="px-2 py-1 bg-white/20 rounded text-xs">RE-AIM</span>
            <span className="px-2 py-1 bg-white/20 rounded text-xs">ERIC</span>
          </div>
        </div>
        <div
          onClick={() => onNavigate("analyzer")}
          className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white card-hover cursor-pointer relative overflow-hidden"
        >
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-400 text-green-900 text-xs font-bold rounded animate-pulse">
            NEW
          </span>
          <div className="text-4xl mb-3">🔬</div>
          <h3 className="text-xl font-bold mb-2">
            {lang === "fr" ? "Analyseur de protocole" : "Protocol Analyzer"}
          </h3>
          <p className="text-white/90 text-sm mb-3">
            {lang === "fr"
              ? "Collez votre protocole existant et obtenez un score de complétude"
              : "Paste your existing protocol and get an Implementation Science completeness score"}
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-white/20 rounded text-xs">{lang === "fr" ? "20 stratégies" : "20 strategies"}</span>
            <span className="px-2 py-1 bg-white/20 rounded text-xs">{lang === "fr" ? "Audit" : "Audit"}</span>
            <span className="px-2 py-1 bg-white/20 rounded text-xs">{lang === "fr" ? "Gaps" : "Gaps"}</span>
          </div>
        </div>
        <div
          onClick={() => onNavigate("diagnostic")}
          className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white card-hover cursor-pointer"
        >
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-xl font-bold mb-2">
            {lang === "fr" ? "Diagnostic de maturité" : "Maturity Diagnostic"}
          </h3>
          <p className="text-white/90 text-sm mb-3">
            {lang === "fr"
              ? "En 30 minutes, un rapport structuré avec forces, vigilances et plan d'action"
              : "In 30 minutes, a structured report with strengths, concerns and action plan"}
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-white/20 rounded text-xs">24 questions</span>
            <span className="px-2 py-1 bg-white/20 rounded text-xs">6 dimensions</span>
            <span className="px-2 py-1 bg-white/20 rounded text-xs">PDF/Word</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm tooltip-container">
          <span className="tooltip-text">CFIR, RE-AIM, EPIS, Proctor, TIDieR, Kotter...</span>
          <div className="text-3xl font-bold text-blue-600">6+</div>
          <div className="text-xs text-gray-500 mt-1">{lang === "fr" ? "Cadres théoriques" : "Frameworks"}</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm tooltip-container">
          <span className="tooltip-text">
            {lang === "fr"
              ? "73 stratégies d'implémentation standardisées (Powell et al.)"
              : "73 standardized implementation strategies (Powell et al.)"}
          </span>
          <div className="text-3xl font-bold text-blue-600">73</div>
          <div className="text-xs text-gray-500 mt-1">{lang === "fr" ? "Stratégies ERIC" : "ERIC Strategies"}</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm tooltip-container">
          <span className="tooltip-text">
            {lang === "fr"
              ? "Santé, santé mentale, éducation, agriculture, PRFI..."
              : "Health, mental health, education, agriculture, LMIC..."}
          </span>
          <div className="text-3xl font-bold text-blue-600">{Object.keys(DOMAINS).length}</div>
          <div className="text-xs text-gray-500 mt-1">{lang === "fr" ? "Domaines" : "Domains"}</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm tooltip-container">
          <span className="tooltip-text">
            {lang === "fr"
              ? "Cas inspirés de projets réels avec ROI documenté"
              : "Cases inspired by real projects with documented ROI"}
          </span>
          <div className="text-3xl font-bold text-blue-600">{USE_CASES.length}</div>
          <div className="text-xs text-gray-500 mt-1">{lang === "fr" ? "Cas d'usage" : "Use Cases"}</div>
        </div>
      </div>

      {/* Why Moudar */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8 border border-green-100">
        <h3 className="font-bold text-gray-800 mb-4 text-center">
          {"🎯 "}{lang === "fr" ? "Pourquoi Moudar ?" : "Why Moudar?"}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">30-50h</div>
            <p className="text-sm text-gray-600">
              {lang === "fr"
                ? "Économisées sur la rédaction du protocole d'implémentation"
                : "Saved on implementation protocol writing"}
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">30 min</div>
            <p className="text-sm text-gray-600">
              {lang === "fr"
                ? "Pour visualiser la maturité organisationnelle"
                : "To visualize organizational maturity"}
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
            <p className="text-sm text-gray-600">
              {lang === "fr"
                ? "Rapports standardisés prêts pour bailleurs"
                : "Standardized reports ready for funders"}
            </p>
          </div>
        </div>
      </div>

      {/* 3 Steps */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8 border-l-4 border-purple-500">
        <h3 className="font-bold text-gray-800 mb-4 text-center">
          {"🚀 "}{lang === "fr" ? "Comment utiliser Moudar en 3 étapes" : "How to use Moudar in 3 steps"}
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">1</div>
            <h4 className="font-semibold text-gray-800 mb-2">
              {lang === "fr" ? "Créez un projet" : "Create a project"}
            </h4>
            <p className="text-sm text-gray-600">
              {lang === "fr"
                ? "Définissez un titre, une organisation, un domaine et une phase (exploration, préparation, implémentation, pérennisation)."
                : "Define a title, organization, domain and phase (exploration, preparation, implementation, sustainment)."}
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">2</div>
            <h4 className="font-semibold text-gray-800 mb-2">
              {lang === "fr" ? "Lancez le Wizard" : "Run the Wizard"}
            </h4>
            <p className="text-sm text-gray-600">
              {lang === "fr"
                ? "Répondez à quelques questions clés. Moudar génère un squelette de protocole exportable en Word."
                : "Answer a few key questions. Moudar generates a draft protocol you can export to Word."}
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">3</div>
            <h4 className="font-semibold text-gray-800 mb-2">
              {lang === "fr" ? "Diagnostic de maturité" : "Maturity diagnostic"}
            </h4>
            <p className="text-sm text-gray-600">
              {lang === "fr"
                ? "En 30 minutes, obtenez un rapport Word (forces, faiblesses, priorités) pour la direction ou le bailleur."
                : "In 30 minutes, get a Word report (strengths, weaknesses, priorities) for management or funders."}
            </p>
          </div>
        </div>
        <p className="text-center text-sm text-blue-700 mt-4 font-medium">
          {"💡 "}
          {lang === "fr"
            ? "Moudar devient votre « dossier vivant » d'implémentation : tous vos projets, protocoles et diagnostics au même endroit."
            : "Moudar becomes your living implementation file: all your projects, protocols and diagnostics in one place."}
        </p>
      </div>

      {/* Use Cases */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-4 text-center text-xl">
          {"📋 "}{lang === "fr" ? "Cas d'usage concrets" : "Concrete use cases"}
        </h3>
        <div className="space-y-4">
          {/* Case 1 - CHU */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-blue-600 px-5 py-3">
              <h4 className="font-bold text-white">
                {"🏥 "}{lang === "fr" ? "Cas 1 – CHU : déploiement d'un nouveau parcours clinique" : "Case 1 – Hospital: deploying a new clinical pathway"}
              </h4>
              <p className="text-blue-100 text-sm">
                {lang === "fr"
                  ? "Standardiser la mise en œuvre d'un projet complexe dans un grand hôpital"
                  : "Standardize implementation of a complex project in a large hospital"}
              </p>
            </div>
            <div className="p-5">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">{"📍 "}{lang === "fr" ? "Contexte" : "Context"}</h5>
                  <p className="text-gray-600">
                    {lang === "fr"
                      ? "Un CHU déploie un nouveau parcours clinique dans plusieurs services. Les équipes sont motivées mais avancent avec leurs propres outils."
                      : "A teaching hospital deploys a new clinical pathway across departments. Teams are motivated but use their own tools."}
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">{"⚠️ "}{lang === "fr" ? "Défis" : "Challenges"}</h5>
                  <p className="text-gray-600">
                    {lang === "fr"
                      ? "Pas de protocole partagé, pas de vue sur la maturité des services, rapports rédigés au cas par cas."
                      : "No shared protocol, no view on service maturity, reports written case by case."}
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">{"✅ "}{lang === "fr" ? "Solution Moudar" : "Moudar Solution"}</h5>
                  <p className="text-gray-600">
                    {lang === "fr"
                      ? "Protocole généré en 15 min, diagnostic par service en 30 min, rapports standardisés pour la direction."
                      : "Protocol generated in 15 min, diagnostic per service in 30 min, standardized reports for management."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Case 2 - ONG */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-green-600 px-5 py-3">
              <h4 className="font-bold text-white">
                {"🌍 "}{lang === "fr" ? "Cas 2 – ONG : programme multi-sites en PRFI" : "Case 2 – NGO: multi-site program in LMIC"}
              </h4>
              <p className="text-green-100 text-sm">
                {lang === "fr"
                  ? "Aligner terrain, bailleurs et recherche autour d'un langage commun"
                  : "Align field, funders and research around a common language"}
              </p>
            </div>
            <div className="p-5">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">{"📍 "}{lang === "fr" ? "Contexte" : "Context"}</h5>
                  <p className="text-gray-600">
                    {lang === "fr"
                      ? "Une ONG met en œuvre un programme de santé dans 5-10 districts d'un PRFI, financé par un bailleur international."
                      : "An NGO implements a health program in 5-10 districts of a LMIC, funded by an international funder."}
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">{"⚠️ "}{lang === "fr" ? "Défis" : "Challenges"}</h5>
                  <p className="text-gray-600">
                    {lang === "fr"
                      ? "Contraintes locales variables, coordinateurs non formés à l'IS, exigences de documentation bailleur."
                      : "Variable local constraints, coordinators not trained in IS, funder documentation requirements."}
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">{"✅ "}{lang === "fr" ? "Solution Moudar" : "Moudar Solution"}</h5>
                  <p className="text-gray-600">
                    {lang === "fr"
                      ? "Protocole commun adapté PRFI, diagnostic par district, rapports Word pour bailleurs et éthique."
                      : "Common protocol adapted for LMIC, diagnostic per district, Word reports for funders and ethics."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Case 3 - Research */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-blue-600 px-5 py-3">
              <h4 className="font-bold text-white">
                {"🔬 "}{lang === "fr" ? "Cas 3 – Recherche : essai pragmatique multi-centrique" : "Case 3 – Research: multicenter pragmatic trial"}
              </h4>
              <p className="text-purple-100 text-sm">
                {lang === "fr"
                  ? "Intégrer la Science de la mise en œuvre dans un protocole de recherche"
                  : "Integrate Implementation Science into a research protocol"}
              </p>
            </div>
            <div className="p-5">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">{"📍 "}{lang === "fr" ? "Contexte" : "Context"}</h5>
                  <p className="text-gray-600">
                    {lang === "fr"
                      ? "Une équipe prépare un essai pragmatique dans plusieurs centres. Le comité demande un volet solide en Science de la mise en œuvre."
                      : "A team prepares a pragmatic trial in multiple centers. The committee requires a solid Implementation Science component."}
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">{"⚠️ "}{lang === "fr" ? "Défis" : "Challenges"}</h5>
                  <p className="text-gray-600">
                    {lang === "fr"
                      ? "Choisir et justifier les cadres, documenter stratégies et outcomes, peu de temps et peu de soutien méthodologique."
                      : "Choose and justify frameworks, document strategies and outcomes, little time and methodological support."}
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">{"✅ "}{lang === "fr" ? "Solution Moudar" : "Moudar Solution"}</h5>
                  <p className="text-gray-600">
                    {lang === "fr"
                      ? "Protocole IS pré-structuré pour SPIRIT/CONSORT, cadres/outcomes/stratégies cohérents, Word prêt pour éthique."
                      : "Pre-structured IS protocol for SPIRIT/CONSORT, coherent frameworks/outcomes/strategies, Word ready for ethics."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beyond Health - All Sectors */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-4 text-center text-xl">
          {"🌐 "}{lang === "fr" ? "Au-delà de la santé : tous les secteurs" : "Beyond health: all sectors"}
        </h3>
        <p className="text-center text-gray-600 mb-6">
          {lang === "fr"
            ? "Moudar s'adapte à tous les projets de changement, pas seulement la santé"
            : "Moudar adapts to all change projects, not just healthcare"}
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-5 border border-yellow-200">
            <div className="text-3xl mb-2">🎓</div>
            <h4 className="font-bold text-gray-800 mb-2">{lang === "fr" ? "Éducation" : "Education"}</h4>
            <p className="text-sm text-gray-600 mb-3">{lang === "fr" ? "Pédagogie par projets en lycée professionnel" : "Project-based learning in vocational school"}</p>
            <div className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded inline-block">{lang === "fr" ? "200 enseignants • 15 établissements" : "200 teachers • 15 schools"}</div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-5 border border-pink-200">
            <div className="text-3xl mb-2">🤝</div>
            <h4 className="font-bold text-gray-800 mb-2">{lang === "fr" ? "Action sociale" : "Social Services"}</h4>
            <p className="text-sm text-gray-600 mb-3">{lang === "fr" ? "Programme Logement d'Abord" : "Housing First Program"}</p>
            <div className="text-xs text-rose-700 bg-rose-100 px-2 py-1 rounded inline-block">{lang === "fr" ? "12 services • 500k habitants" : "12 services • 500k pop."}</div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-5 border border-slate-200">
            <div className="text-3xl mb-2">⚖️</div>
            <h4 className="font-bold text-gray-800 mb-2">{lang === "fr" ? "Justice" : "Justice"}</h4>
            <p className="text-sm text-gray-600 mb-3">{lang === "fr" ? "Préparation à la sortie de prison" : "Prison Reentry Preparation"}</p>
            <div className="text-xs text-slate-700 bg-slate-200 px-2 py-1 rounded inline-block">{lang === "fr" ? "Réduire récidive de 40%" : "Reduce recidivism by 40%"}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
            <div className="text-3xl mb-2">🏢</div>
            <h4 className="font-bold text-gray-800 mb-2">{lang === "fr" ? "Transformation RH" : "HR Transformation"}</h4>
            <p className="text-sm text-gray-600 mb-3">{lang === "fr" ? "Déploiement du télétravail hybride" : "Hybrid Remote Work Deployment"}</p>
            <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded inline-block">{lang === "fr" ? "2,000 employés" : "2,000 employees"}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
            <div className="text-3xl mb-2">🌱</div>
            <h4 className="font-bold text-gray-800 mb-2">{lang === "fr" ? "Agriculture / Climat" : "Agriculture / Climate"}</h4>
            <p className="text-sm text-gray-600 mb-3">{lang === "fr" ? "Adoption de l'agroécologie" : "Agroecology Adoption"}</p>
            <div className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded inline-block">{lang === "fr" ? "150 agriculteurs" : "150 farmers"}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-200">
            <div className="text-3xl mb-2">💻</div>
            <h4 className="font-bold text-gray-800 mb-2">{lang === "fr" ? "Transformation digitale" : "Digital Transformation"}</h4>
            <p className="text-sm text-gray-600 mb-3">{lang === "fr" ? "Dossier patient en EHPAD" : "EHR in Nursing Homes"}</p>
            <div className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded inline-block">{lang === "fr" ? "25 établissements • 800 soignants" : "25 facilities • 800 staff"}</div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4 italic">
          {lang === "fr"
            ? "💡 La Science de la mise en œuvre s'applique à tout changement de pratiques, quel que soit le secteur."
            : "💡 Implementation Science applies to any practice change, regardless of sector."}
        </p>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mb-8">
        <p>{lang === "fr" ? "Développé par Younes MOUDAR" : "Developed by Younes MOUDAR"}</p>
      </div>

      {/* Demo Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
        <p className="text-amber-800 text-sm text-center">
          <strong>{"⚠️ "}{lang === "fr" ? "Version démo" : "Demo version"}</strong>
          {" — "}
          {lang === "fr"
            ? "Merci de ne pas saisir de données patients nominatives. Les données sont stockées localement dans votre navigateur."
            : "Please do not enter patient-identifying data. Data is stored locally in your browser."}
        </p>
      </div>

      {/* CTA */}
      <div className="text-center p-6 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl text-white">
        <h3 className="text-xl font-bold mb-2">
          {lang === "fr" ? "Prêt à structurer votre projet ?" : "Ready to structure your project?"}
        </h3>
        <p className="text-white/80 mb-4">
          {lang === "fr" ? "Demandez une démonstration personnalisée" : "Request a personalized demonstration"}
        </p>
        <a
          href="mailto:contact@moudar.com?subject=Demande%20de%20d%C3%A9mo%20Moudar"
          className="px-8 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg hover:bg-blue-50 inline-block transition shadow-lg"
        >
          {"📩 "}{lang === "fr" ? "Demander une démo" : "Request a demo"}
        </a>
      </div>
    </div>
  );
}
