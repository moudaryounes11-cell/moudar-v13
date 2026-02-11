import React from 'react';

export default function AboutView({ lang }) {
  return (
    <div className="fade-in max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {lang === "fr" ? "Qui sommes-nous ?" : "Who are we?"}
        </h1>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm mb-8 border-l-4 border-blue-600">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {lang === "fr"
            ? "Younes MOUDAR, créateur de MOUDAR®"
            : "Younes MOUDAR, creator of MOUDAR®"}
        </h2>
        <p className="text-gray-600 mb-4">
          {lang === "fr"
            ? "Spécialiste de la Science de la mise en œuvre et des politiques sociales complexes, Younes MOUDAR combine de solides qualifications académiques à une expertise pratique en recherche et évaluation. Son parcours est axé sur la traduction des données probantes en pratiques opérationnelles pérennes, y compris dans des environnements exigeants. Actuellement, directeur pédagogique de Ardévaz Medical School en Suisse et fondateur de Swiss Medical Academy Maroc. Perspective globale : fort de son expérience acquise en Suisse 🇨🇭 et au Maroc 🇲🇦, l'approche de MOUDAR est ancrée dans une compréhension nuancée des facteurs organisationnels et culturels (CFIR) essentiels à la réussite des politiques et des innovations en santé."
            : "Specialist in Implementation Science and complex social policies, Younes MOUDAR combines strong academic credentials with hands-on expertise in research and evaluation. His career focuses on translating evidence into sustainable operational practices, including in demanding environments. He is currently Academic Director of Ardévaz Medical School in Switzerland and founder of Swiss Medical Academy Morocco. Global perspective: drawing on experience in Switzerland 🇨🇭 and Morocco 🇲🇦, MOUDAR's approach is grounded in a nuanced understanding of organisational and cultural factors (CFIR) that are essential for successful health policies and innovations."}
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">146</div>
            <div className="text-xs text-gray-500">Participants</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">6</div>
            <div className="text-xs text-gray-500">Sites</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">36</div>
            <div className="text-xs text-gray-500">
              {lang === "fr" ? "Mois" : "Months"}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {"🎯 "}
          {lang === "fr" ? "Notre mission" : "Our mission"}
        </h2>
        <p className="text-gray-600">
          {lang === "fr"
            ? "Démocratiser la Science de la mise en œuvre en offrant des outils accessibles et intelligents pour concevoir, piloter et évaluer les projets de changement dans tous les secteurs d'activité."
            : "Democratize Implementation Science by providing accessible and intelligent tools to design, manage and evaluate change projects across all industries."}
        </p>
      </div>

      <div className="text-center">
        <a
          href="mailto:contact@moudar.com"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
        >
          {"📧 contact@moudar.com"}
        </a>
      </div>
    </div>
  );
}
