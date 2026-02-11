import React from 'react';
import StorageManager from '../engines/StorageManager';

export default function Header({ currentView, onNavigate, lang, setLang }) {
  const projectCount = StorageManager.getProjects().length;

  const navItems = [
    { key: "home", icon: "\u{1F3E0}", label: lang === "fr" ? "Accueil" : "Home" },
    { key: "adaptive", icon: "\u{1F39B}\uFE0F", label: "Cockpit", isGold: true },
    { key: "grants", icon: "\u{1F4B0}", label: "Grants", isGold: true },
    { key: "benchmark", icon: "\u{1F4CA}", label: "Benchmark", isGold: true },
    { key: "digitaltwin", icon: "\u{1F3D7}\uFE0F", label: "Twin", isGold: true },
    { key: "budgetimpact", icon: "\u{1F4B5}", label: "BIA", isGold: true, isNew: true },
    { key: "stakeholders", icon: "\u{1F310}", label: "SNA", isGold: true, isNew: true },
    { key: "consensus", icon: "\u{1F91D}", label: lang === "fr" ? "Consensus" : "Consensus", isGold: true, isNew: true, isV10: true },
    { key: "security", icon: "\u{1F510}", label: lang === "fr" ? "Sécurité" : "Security", isGold: true, isNew: true, isV10: true },
    { key: "npt", icon: "\u{1F9E9}", label: "NPT", isGold: true, isNew: true, isV11: true },
    { key: "frameTracker", icon: "\u{1F504}", label: "FRAME", isGold: true, isNew: true, isV11: true },
    { key: "proctorOutcomes", icon: "\u{1F3AF}", label: lang === "fr" ? "Outcomes" : "Outcomes", isGold: true, isNew: true, isV11: true },
    { key: "smartDesign", icon: "\u{1F500}", label: "SMART", isGold: true, isNew: true, isV11: true },
    { key: "protocolAnalyzer", icon: "\u{1F916}", label: lang === "fr" ? "AI Copilot" : "AI Copilot", isGold: true, isNew: true, isV11: true },
    { key: "ontology", icon: "\u{1F9EC}", label: lang === "fr" ? "Ontologie IS" : "IS Ontology", isGold: true, isNew: true, isV11: true },
    { key: "evidenceRepo", icon: "\u{1F5C4}\uFE0F", label: lang === "fr" ? "Répertoire" : "Repository", isGold: true, isNew: true, isV11: true },
    { key: "apiSdk", icon: "\u{1F50C}", label: "API & SDK", isGold: true, isNew: true, isV11: true },
    { key: "cfirGuide", icon: "\u{1F4D6}", label: lang === "fr" ? "Guide CFIR" : "CFIR Guide", isGold: true, isNew: true, isV11: true },
    { key: "prism", icon: "\u{1F3E5}", label: "PRISM + RE-AIM", isGold: true, isNew: true, isV11: true },
    { key: "irlm", icon: "\u{1F517}", label: "IRLM", isGold: true, isNew: true, isV11: true },
    { key: "comB", icon: "\u{1F9E0}", label: "COM-B / TDF", isGold: true, isNew: true, isV11: true },
    { key: "hybridDesign", icon: "\u{1F9EA}", label: lang === "fr" ? "Design Hybride" : "Hybrid Design", isGold: true, isNew: true, isV11: true },
    { key: "sustainability", icon: "\u{1F331}", label: lang === "fr" ? "Pérennisation" : "Sustainability", isGold: true, isNew: true, isV11: true },
    { key: "qualitative", icon: "\u{1F4DD}", label: lang === "fr" ? "Qualitatif" : "Qualitative", isGold: true, isNew: true, isV11: true },
    { key: "product", icon: "\u{1F4E6}", label: lang === "fr" ? "Produit" : "Product" },
    { key: "myProjects", icon: "\u{1F4C2}", label: lang === "fr" ? "Projets" : "Projects", badge: projectCount },
    { key: "space", icon: "\u{1F464}", label: lang === "fr" ? "Mon espace" : "My space" },
    { key: "analyzer", icon: "\u{1F52C}", label: lang === "fr" ? "Analyser" : "Analyze" },
    { key: "wizard", icon: "\u2728", label: lang === "fr" ? "Nouveau" : "New" },
    { key: "diagnostic", icon: "\u{1F4CB}", label: "Diagnostic" }
  ];

  return (
    <header
      className="gradient-main text-white py-3 px-4 shadow-xl sticky top-0 z-50"
      role="banner"
      aria-label="En-tête principal MOUDAR"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="url(#logoGrad)"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M12 28V14L20 22L28 14V28"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="12" r="3" fill="#34d399" />
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold">MOUDAR</h1>
              <span className="px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900 text-xs font-bold rounded">
                v9.0
              </span>
              <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded border border-yellow-500/30">
                GOLD
              </span>
            </div>
            <p className="text-blue-200 text-xs hidden md:block">
              {lang === "fr"
                ? "Co-pilote Science de la mise en œuvre — Gold Standard"
                : "Implementation Science Co-pilot — Gold Standard"}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="flex items-center gap-1 flex-wrap"
          role="navigation"
          aria-label="Navigation principale"
        >
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={
                "px-2 py-1 rounded-lg text-xs font-medium transition-all relative " +
                (currentView === item.key
                  ? "bg-white text-blue-900"
                  : item.isGold
                    ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300"
                    : "bg-blue-800/30 hover:bg-blue-700/50")
              }
              aria-label={item.label}
              aria-current={currentView === item.key ? "page" : undefined}
            >
              <span aria-hidden="true">{item.icon}</span>{" "}
              <span className="hidden lg:inline">{item.label}</span>
              {item.badge > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                  aria-label={item.badge + " projets"}
                >
                  {item.badge}
                </span>
              )}
              {item.isNew && (
                <span
                  className="absolute -top-1 -right-1 bg-green-500 text-white text-[8px] rounded px-0.5 font-bold animate-pulse"
                  aria-label="Nouveau"
                >
                  NEW
                </span>
              )}
              {item.isGold && !item.isNew && (
                <span
                  className="absolute -top-1 -right-1 bg-yellow-500 text-yellow-900 text-[8px] rounded px-0.5 font-bold"
                  aria-label="Version 9.0"
                >
                  9.0
                </span>
              )}
            </button>
          ))}

          {/* Language Switcher */}
          <div
            className="flex ml-2 bg-blue-800/50 rounded-lg overflow-hidden"
            role="group"
            aria-label="Sélection de la langue"
          >
            <button
              onClick={() => setLang("fr")}
              className={"px-2 py-1 text-xs " + (lang === "fr" ? "bg-white text-blue-900" : "")}
              aria-label="Français"
              aria-pressed={lang === "fr"}
            >
              FR
            </button>
            <button
              onClick={() => setLang("en")}
              className={"px-2 py-1 text-xs " + (lang === "en" ? "bg-white text-blue-900" : "")}
              aria-label="English"
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
