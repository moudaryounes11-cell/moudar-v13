import React from 'react';

export default function InvestorsView({ lang }) {
  return (
    <div className="fade-in max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {"📈 "}
          {lang === "fr" ? "Pour les investisseurs" : "For investors"}
        </h1>
        <p className="text-lg text-gray-600">
          {lang === "fr"
            ? "Moudar — Le copilote numérique pour la Science de la mise en œuvre"
            : "Moudar — The digital co-pilot for Implementation Science"}
        </p>
      </div>

      {/* MVP Status */}
      <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-200">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold uppercase">
            {lang === "fr" ? "MVP fonctionnel" : "Working MVP"}
          </span>
        </div>
        <p className="text-green-800 font-medium mb-2">
          {lang === "fr"
            ? "Ce que vous pouvez tester dès maintenant :"
            : "What you can test right now:"}
        </p>
        <div className="grid md:grid-cols-4 gap-4 text-sm text-green-700">
          <div className="flex items-center gap-2">
            <span>✓</span>{" "}
            {lang === "fr" ? "Wizard conception protocole" : "Protocol design wizard"}
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>{" "}
            {lang === "fr" ? "Diagnostic maturité 6 dimensions" : "6-dimension maturity diagnostic"}
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>{" "}
            {lang === "fr" ? "Export Word professionnel" : "Professional Word export"}
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>{" "}
            {lang === "fr" ? "Gestion multi-projets" : "Multi-project management"}
          </div>
        </div>
      </div>

      {/* Product Vision */}
      <div className="bg-white rounded-xl p-8 shadow-sm mb-8 border-l-4 border-blue-600">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {"🚀 "}
          {lang === "fr" ? "Vision produit" : "Product vision"}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">
              {lang === "fr" ? "Aujourd'hui (MVP)" : "Today (MVP)"}
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Application web standalone</li>
              <li>• Stockage local navigateur</li>
              <li>• Export Word professionnel</li>
              <li>• Diagnostic de maturité</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">
              {lang === "fr" ? "Demain (SaaS)" : "Tomorrow (SaaS)"}
            </h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Plateforme multi-organisations</li>
              <li>• Cloud UE (RGPD), SSO/SAML</li>
              <li>• API REDCap, modules IA</li>
              <li>• Tableaux de bord IHI</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Target Market */}
      <div className="bg-blue-50 rounded-xl p-8 mb-8 border border-blue-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {"🎯 "}
          {lang === "fr" ? "Marché cible" : "Target market"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">400+</div>
            <div className="text-sm text-gray-600">CHU</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">50+</div>
            <div className="text-sm text-gray-600">
              {lang === "fr" ? "Ministères" : "Ministries"}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">200+</div>
            <div className="text-sm text-gray-600">ONG</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">~10k</div>
            <div className="text-sm text-gray-600">Consultants</div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">
          {lang === "fr"
            ? "Potentiel ARR estimé : ~$245k (650+ cibles × $375/an)"
            : "Estimated ARR potential: ~$245k (650+ targets × $375/year)"}
        </p>
      </div>

      {/* Why Now */}
      <div className="bg-amber-50 rounded-xl p-8 mb-8 border border-amber-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {"⏰ "}
          {lang === "fr" ? "Pourquoi maintenant ?" : "Why now?"}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm text-gray-600">
              {lang === "fr"
                ? "Pression OMS croissante sur la preuve d'impact des interventions"
                : "Growing WHO pressure on intervention impact evidence"}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="text-2xl mb-2">💻</div>
            <p className="text-sm text-gray-600">
              {lang === "fr"
                ? "Explosion de la digital health et des outils d'aide à la décision"
                : "Digital health explosion and decision support tools"}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="text-2xl mb-2">🌍</div>
            <p className="text-sm text-gray-600">
              {lang === "fr"
                ? "Gap critique dans les pays à revenus faibles et intermédiaires (PRFI)"
                : "Critical gap in low and middle-income countries (LMICs)"}
            </p>
          </div>
        </div>
      </div>

      {/* Funding Goal */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">
            {lang === "fr" ? "Objectif de levée" : "Funding goal"}
          </h3>
          <div className="text-4xl font-bold text-teal-400 mb-2">
            $85 – $130K USD
          </div>
          <p className="text-slate-300">
            {lang === "fr" ? "Pré-seed / Seed pour 18 mois" : "Pre-seed / Seed for 18 months"}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-slate-700/50 rounded-lg text-center">
            <div className="text-2xl mb-1">👨‍💻</div>
            <p className="text-sm text-slate-300">
              {lang === "fr"
                ? "Tech & Dev (backend SaaS, sécurité, API)"
                : "Tech & Dev (SaaS backend, security, API)"}
            </p>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg text-center">
            <div className="text-2xl mb-1">🎨</div>
            <p className="text-sm text-slate-300">
              {lang === "fr" ? "UX/UI (expérience utilisateur)" : "UX/UI (user experience)"}
            </p>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg text-center">
            <div className="text-2xl mb-1">🤝</div>
            <p className="text-sm text-slate-300">
              {lang === "fr" ? "Premiers clients pilotes" : "First pilot customers"}
            </p>
          </div>
        </div>
        <div className="text-center">
          <a
            href="mailto:contact@moudar.com?subject=Moudar%20-%20Investisseur"
            className="inline-block px-8 py-4 bg-white text-slate-800 rounded-xl font-bold text-lg hover:bg-slate-100 transition shadow-lg"
          >
            {"📩 "}
            {lang === "fr" ? "Demander une démo" : "Request a demo"}
            {" : contact@moudar.com"}
          </a>
        </div>
      </div>
    </div>
  );
}
