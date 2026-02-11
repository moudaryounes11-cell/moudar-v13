import React, { useState, useEffect } from 'react';
/* global IRLMGenerator, DOMPurify, mermaid */

export default function IRLMView({ lang = 'fr' }) {
  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const [barriers, setBarriers] = useState('');
  const [facilitators, setFacilitators] = useState('');
  const [strategies, setStrategies] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [irlm, setIrlm] = useState(null);
  const [mermaidCode, setMermaidCode] = useState('');
  const [renderKey, setRenderKey] = useState(0);

  const parseLines = (text) =>
    text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

  const handleGenerate = () => {
    const projectData = {
      title: t('Modele Logique IRLM', 'IRLM Logic Model'),
      barriers: parseLines(barriers),
      facilitators: parseLines(facilitators),
      strategies: parseLines(strategies).map((s) => ({ name: s })),
      implOutcomes: parseLines(outcomes).length > 0
        ? parseLines(outcomes)
        : ['Adoption', 'Fidelity', 'Acceptability', 'Feasibility'],
      clinOutcomes: [t('Resultats patients', 'Patient outcomes')]
    };

    const generated = IRLMGenerator.generate(projectData, lang);
    setIrlm(generated);

    const code = IRLMGenerator.generateMermaid(generated, lang);
    setMermaidCode(code);
    setRenderKey((prev) => prev + 1);
  };

  // Mermaid rendering
  useEffect(() => {
    if (!mermaidCode) return;

    const renderDiagram = async () => {
      try {
        const container = document.getElementById('irlm-mermaid-container');
        if (!container) return;

        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'strict',
          flowchart: { useMaxWidth: true, htmlLabels: true }
        });

        const { svg } = await mermaid.render('irlm-diagram-' + renderKey, mermaidCode);
        const cleanSvg = typeof DOMPurify !== 'undefined'
          ? DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } })
          : svg;
        container.innerHTML = cleanSvg;
      } catch (err) {
        console.error('[MOUDAR] Mermaid render error:', err);
        const container = document.getElementById('irlm-mermaid-container');
        if (container) {
          container.innerHTML =
            '<p class="text-red-500 text-sm p-4">' +
            t('Erreur de rendu du diagramme', 'Diagram rendering error') +
            '</p>';
        }
      }
    };

    renderDiagram();
  }, [mermaidCode, renderKey, lang]);

  const handleExportSVG = () => {
    const container = document.getElementById('irlm-mermaid-container');
    if (!container) return;
    const svgEl = container.querySelector('svg');
    if (!svgEl) return;

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'IRLM-diagram.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPNG = () => {
    const container = document.getElementById('irlm-mermaid-container');
    if (!container) return;
    const svgEl = container.querySelector('svg');
    if (!svgEl) return;

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      ctx.scale(2, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = 'IRLM-diagram.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          {"\uD83D\uDD17 "}
          {t('Generateur IRLM', 'IRLM Generator')}
          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-normal">
            D3
          </span>
          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-normal animate-pulse">
            WORLD FIRST
          </span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {IRLMGenerator.citation}
        </p>
      </div>

      {/* Input Grid: 4-column textareas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Barriers */}
        <div className="bg-white rounded-xl shadow border p-4">
          <label className="block text-sm font-bold text-red-700 mb-2">
            {"\uD83D\uDEA7 "}{t('Barrieres (CFIR)', 'Barriers (CFIR)')}
          </label>
          <textarea
            value={barriers}
            onChange={(e) => setBarriers(e.target.value)}
            placeholder={t(
              'Une barriere par ligne...\nEx: Manque de formation\nResistance au changement',
              'One barrier per line...\nEx: Lack of training\nResistance to change'
            )}
            className="w-full h-40 p-3 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-red-300 focus:border-red-400 outline-none"
          />
        </div>

        {/* Facilitators */}
        <div className="bg-white rounded-xl shadow border p-4">
          <label className="block text-sm font-bold text-green-700 mb-2">
            {"\u2705 "}{t('Facilitateurs', 'Facilitators')}
          </label>
          <textarea
            value={facilitators}
            onChange={(e) => setFacilitators(e.target.value)}
            placeholder={t(
              'Un facilitateur par ligne...\nEx: Leadership engagé\nRessources disponibles',
              'One facilitator per line...\nEx: Engaged leadership\nAvailable resources'
            )}
            className="w-full h-40 p-3 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-green-300 focus:border-green-400 outline-none"
          />
        </div>

        {/* Strategies */}
        <div className="bg-white rounded-xl shadow border p-4">
          <label className="block text-sm font-bold text-blue-700 mb-2">
            {"\uD83D\uDCA1 "}{t('Strategies (ERIC)', 'Strategies (ERIC)')}
          </label>
          <textarea
            value={strategies}
            onChange={(e) => setStrategies(e.target.value)}
            placeholder={t(
              'Une strategie par ligne...\nEx: Formation continue\nAudit & feedback',
              'One strategy per line...\nEx: Ongoing training\nAudit & feedback'
            )}
            className="w-full h-40 p-3 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none"
          />
        </div>

        {/* Outcomes */}
        <div className="bg-white rounded-xl shadow border p-4">
          <label className="block text-sm font-bold text-amber-700 mb-2">
            {"\uD83C\uDFAF "}{t('Outcomes (Proctor)', 'Outcomes (Proctor)')}
          </label>
          <textarea
            value={outcomes}
            onChange={(e) => setOutcomes(e.target.value)}
            placeholder={t(
              'Un outcome par ligne...\nEx: Adoption\nFidelite\nAcceptabilite',
              'One outcome per line...\nEx: Adoption\nFidelity\nAcceptability'
            )}
            className="w-full h-40 p-3 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={handleGenerate}
          className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-lg"
        >
          {"\u26A1 "}{t('Generer le IRLM', 'Generate IRLM')}
        </button>
        {irlm && (
          <>
            <button
              onClick={handleExportSVG}
              className="px-4 py-2.5 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors border shadow"
            >
              {"\uD83D\uDCBE "}{t('Exporter SVG', 'Export SVG')}
            </button>
            <button
              onClick={handleExportPNG}
              className="px-4 py-2.5 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors border shadow"
            >
              {"\uD83D\uDDBC\uFE0F "}{t('Exporter PNG', 'Export PNG')}
            </button>
          </>
        )}
      </div>

      {/* Mermaid Diagram Container */}
      {irlm && (
        <div className="bg-white rounded-xl shadow border overflow-hidden mb-6">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-bold text-gray-800">
              {"\uD83D\uDD17 "}{t('Diagramme IRLM', 'IRLM Diagram')}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {irlm.causalChain}
            </p>
          </div>
          <div
            id="irlm-mermaid-container"
            className="p-6 overflow-x-auto flex justify-center min-h-[200px]"
          />

          {/* Code View */}
          <details className="border-t">
            <summary className="p-3 cursor-pointer text-sm text-gray-600 hover:bg-gray-50 font-medium">
              {"\uD83D\uDCBB "}{t('Voir le code Mermaid', 'View Mermaid Code')}
            </summary>
            <div className="p-4 bg-gray-900 text-green-400 text-xs font-mono overflow-x-auto">
              <pre>{mermaidCode}</pre>
            </div>
          </details>
        </div>
      )}

      {/* Empty State */}
      {!irlm && (
        <div className="bg-white rounded-xl shadow border p-12 text-center">
          <div className="text-5xl mb-4">{"\uD83D\uDD17"}</div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            {t(
              'Remplissez les champs et generez votre IRLM',
              'Fill in the fields and generate your IRLM'
            )}
          </h3>
          <p className="text-sm text-gray-500">
            {t(
              'Le premier generateur automatise de Implementation Research Logic Model au monde (Smith et al. 2020)',
              'The first automated Implementation Research Logic Model generator in the world (Smith et al. 2020)'
            )}
          </p>
        </div>
      )}

      {/* Footer Citation */}
      <div className="mt-6 text-center text-xs text-gray-400">
        {IRLMGenerator.citation} {'\u2022'} MOUDAR{'\u00AE'} v{IRLMGenerator.VERSION}
      </div>
    </div>
  );
}
