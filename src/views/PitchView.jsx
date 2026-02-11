import React from 'react';

export default function PitchView({ lang, onNavigate }) {
  return (
    <div className="fade-in">
      {/* Problem Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              {lang === "fr" ? "LE PROBL\u00C8ME" : "THE PROBLEM"}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-red-400">70%</span>{" "}
              {lang === "fr" ? "des projets de changement" : "of change projects"}
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-white/80 mb-6">
              {lang === "fr" ? "\u00E9chouent ou sous-performent" : "fail or underperform"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {lang === "fr"
                ? "Pas par manque de volont\u00E9, mais par manque de m\u00E9thodologie scientifique d\u2019impl\u00E9mentation."
                : "Not from lack of will, but from lack of scientific implementation methodology."}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10">
              <div className="text-4xl mb-2">{"\uD83D\uDCB0"}</div>
              <div className="text-2xl font-bold text-red-400">$17B</div>
              <p className="text-sm text-slate-400">
                {lang === "fr"
                  ? "perdus en \u00E9checs d\u2019impl\u00E9mentation/an (US sant\u00E9)"
                  : "lost to implementation failures/year (US health)"}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10">
              <div className="text-4xl mb-2">{"\u23F1\uFE0F"}</div>
              <div className="text-2xl font-bold text-amber-400">
                17 {lang === "fr" ? "ans" : "years"}
              </div>
              <p className="text-sm text-slate-400">
                {lang === "fr"
                  ? "pour traduire la recherche en pratique clinique"
                  : "to translate research into clinical practice"}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10">
              <div className="text-4xl mb-2">{"\uD83D\uDCC9"}</div>
              <div className="text-2xl font-bold text-orange-400">85%</div>
              <p className="text-sm text-slate-400">
                {lang === "fr"
                  ? "des interventions efficaces ne sont jamais adopt\u00E9es"
                  : "of effective interventions are never adopted"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white mb-8">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm font-medium mb-4">
            {lang === "fr" ? "LA SOLUTION" : "THE SOLUTION"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Moudar</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {lang === "fr"
              ? "Le copilote IA pour la Science de la mise en \u0153uvre"
              : "The AI copilot for Implementation Science"}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">{"1\uFE0F\u20E3"}</div>
            <h3 className="text-xl font-bold mb-2">
              {lang === "fr" ? "D\u00E9crivez votre projet" : "Describe your project"}
            </h3>
            <p className="text-white/70">
              {lang === "fr"
                ? "7 questions simples sur votre contexte, population, barri\u00E8res"
                : "7 simple questions about your context, population, barriers"}
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">{"2\uFE0F\u20E3"}</div>
            <h3 className="text-xl font-bold mb-2">
              {lang === "fr" ? "L\u2019IA recommande" : "AI recommends"}
            </h3>
            <p className="text-white/70">
              {lang === "fr"
                ? "Strat\u00E9gies ERIC, cadres CFIR/RE-AIM, timeline EPIS, budget estim\u00E9"
                : "ERIC strategies, CFIR/RE-AIM frameworks, EPIS timeline, estimated budget"}
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">{"3\uFE0F\u20E3"}</div>
            <h3 className="text-xl font-bold mb-2">
              {lang === "fr" ? "Exportez & Certifiez" : "Export & Certify"}
            </h3>
            <p className="text-white/70">
              {lang === "fr"
                ? "Protocole Word, certification Moudar Ready, int\u00E9gration REDCap"
                : "Word protocol, Moudar Ready certification, REDCap integration"}
            </p>
          </div>
        </div>
      </div>

      {/* Differentiators Section */}
      <div className="bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-xl">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            {lang === "fr" ? "DIFF\u00C9RENCIANTS" : "DIFFERENTIATORS"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {lang === "fr" ? "Ce que personne d\u2019autre ne fait" : "What no one else does"}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{"\uD83D\uDD0D"}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {lang === "fr" ? "IA Expliqu\u00E9e (XAI)" : "Explainable AI (XAI)"}
                </h3>
                <p className="text-gray-600">
                  {lang === "fr"
                    ? "Moudar explique POURQUOI il recommande chaque strat\u00E9gie. Pas une bo\u00EEte noire, mais un copilote transparent."
                    : "Moudar explains WHY it recommends each strategy. Not a black box, but a transparent copilot."}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{"\uD83C\uDFC6"}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {lang === "fr" ? "Certification Moudar Ready" : "Moudar Ready Certification"}
                </h3>
                <p className="text-gray-600">
                  {lang === "fr"
                    ? "Un label qualit\u00E9 pour les protocoles d\u2019impl\u00E9mentation. Score 0-100 bas\u00E9 sur 10 crit\u00E8res IS."
                    : "A quality label for implementation protocols. Score 0-100 based on 10 IS criteria."}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{"\uD83D\uDCC4"}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {lang === "fr" ? "Analyseur de Document" : "Document Analyzer"}
                </h3>
                <p className="text-gray-600">
                  {lang === "fr"
                    ? "Collez un protocole existant \u2192 Moudar identifie les gaps IS et g\u00E9n\u00E8re les sections manquantes."
                    : "Paste an existing protocol \u2192 Moudar identifies IS gaps and generates missing sections."}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{"\uD83C\uDF0D"}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {lang === "fr" ? "Multi-secteurs" : "Multi-sector"}
                </h3>
                <p className="text-gray-600">
                  {lang === "fr"
                    ? "Sant\u00E9, \u00E9ducation, justice, RH, environnement... La Science de l\u2019impl\u00E9mentation s\u2019applique \u00E0 tout changement."
                    : "Health, education, justice, HR, environment... Implementation Science applies to any change."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Platform Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white mb-8">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-medium mb-4">
            {lang === "fr" ? "PLATEFORME MONDIALE" : "GLOBAL PLATFORM"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            {lang === "fr" ? "Donn\u00E9es de r\u00E9f\u00E9rence mondiale" : "Global reference data"}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-teal-400">2,847</div>
            <p className="text-slate-400">
              {lang === "fr" ? "Projets analys\u00E9s" : "Projects analyzed"}
            </p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-blue-400">89</div>
            <p className="text-slate-400">{lang === "fr" ? "Pays" : "Countries"}</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-purple-400">73</div>
            <p className="text-slate-400">
              {lang === "fr" ? "Strat\u00E9gies ERIC" : "ERIC strategies"}
            </p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-amber-400">24</div>
            <p className="text-slate-400">
              {lang === "fr" ? "Modules IA" : "AI modules"}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {lang === "fr" ? "Pr\u00EAt \u00E0 voir Moudar en action ?" : "Ready to see Moudar in action?"}
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate("wizard")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
          >
            {"\u2728 "}{lang === "fr" ? "Essayer maintenant" : "Try now"}
          </button>
          <a
            href="mailto:contact@moudar.com?subject=Demande%20de%20d%C3%A9mo%20Moudar"
            className="px-8 py-4 bg-white text-gray-800 rounded-xl font-bold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition"
          >
            {"\uD83D\uDCE9 "}{lang === "fr" ? "Demander une d\u00E9mo" : "Request a demo"}
          </a>
        </div>
      </div>
    </div>
  );
}
