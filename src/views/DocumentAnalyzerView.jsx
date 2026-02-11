import React, { useState } from 'react';
/* global MoudarEngine */

export default function DocumentAnalyzerView({ onClose, lang, onImportProtocol }) {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [generatedSection, setGeneratedSection] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = MoudarEngine.analyzeDocument(text, lang);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleGenerateSection = (sectionId) => {
    const section = MoudarEngine.generateSection(sectionId, {}, lang);
    setGeneratedSection(section);
  };

  const copyToClipboard = (txt) => {
    navigator.clipboard.writeText(txt);
  };

  const scoreColor = analysis ? (analysis.score >= 80 ? 'from-green-500 to-emerald-500' : analysis.score >= 60 ? 'from-blue-500 to-cyan-500' : analysis.score >= 40 ? 'from-yellow-500 to-amber-500' : 'from-red-500 to-orange-500') : '';
  const scoreEmoji = analysis ? (analysis.score >= 80 ? '\uD83C\uDFC6' : analysis.score >= 60 ? '\uD83D\uDC4D' : analysis.score >= 40 ? '\u26A0\uFE0F' : '\uD83D\uDD34') : '';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {"\uD83D\uDCC4 "}{lang === "fr" ? "Analyseur de Protocole IA" : "AI Protocol Analyzer"}
              </h2>
              <p className="text-white/80">
                {lang === "fr" ? "Collez votre protocole \u2192 Moudar identifie les gaps IS" : "Paste your protocol \u2192 Moudar identifies IS gaps"}
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg text-xl">{"\u2715"}</button>
          </div>
        </div>

        <div className="flex h-[calc(95vh-180px)]">
          {/* Left Panel - Input */}
          <div className="w-1/2 p-6 border-r bg-gray-50 flex flex-col">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              {"\uD83D\uDCDD "}{lang === "fr" ? "Votre protocole existant" : "Your existing protocol"}
            </h3>
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setAnalysis(null); setGeneratedSection(null); }}
              placeholder={lang === "fr"
                ? "Collez ici votre protocole de recherche, demande de financement, ou description de projet...\n\nExemple:\n- Contexte et justification\n- Population cible\n- Objectifs\n- M\u00E9thodologie\n- Calendrier\n- Budget\n\nMoudar analysera automatiquement la compl\u00E9tude IS de votre document."
                : "Paste your research protocol, funding application, or project description here...\n\nExample:\n- Background and rationale\n- Target population\n- Objectives\n- Methodology\n- Timeline\n- Budget\n\nMoudar will automatically analyze your document's IS completeness."}
              className="flex-1 w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-purple-500 focus:outline-none text-sm"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {text.split(/\s+/).filter((w) => w).length} {lang === "fr" ? "mots" : "words"}
              </span>
              <button
                onClick={handleAnalyze}
                disabled={!text.trim() || isAnalyzing}
                className={"px-6 py-3 rounded-xl font-bold text-white transition flex items-center gap-2 " + (text.trim() && !isAnalyzing ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" : "bg-gray-300 cursor-not-allowed")}
              >
                {isAnalyzing ? (
                  <><span className="animate-spin">{"\u2699\uFE0F"}</span> {lang === "fr" ? "Analyse en cours..." : "Analyzing..."}</>
                ) : (
                  <>{"\uD83D\uDD0D "}{lang === "fr" ? "Analyser avec l'IA" : "Analyze with AI"}</>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {/* Empty State */}
            {!analysis && !isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <div className="text-6xl mb-4">{"\uD83D\uDD2C"}</div>
                <p className="text-center">{lang === "fr" ? "Collez votre texte et cliquez sur Analyser" : "Paste your text and click Analyze"}</p>
                <p className="text-sm text-center mt-2">{lang === "fr" ? "Moudar \u00E9valuera la compl\u00E9tude IS de votre document" : "Moudar will evaluate your document's IS completeness"}</p>
              </div>
            )}

            {/* Loading */}
            {isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="text-6xl mb-4 animate-pulse">{"\uD83E\uDDE0"}</div>
                <p className="text-purple-600 font-medium">{lang === "fr" ? "L'IA analyse votre document..." : "AI is analyzing your document..."}</p>
                <div className="mt-4 flex gap-1">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Results */}
            {analysis && (
              <div className="space-y-6">
                {/* Score */}
                <div className={"p-6 rounded-2xl bg-gradient-to-r " + scoreColor + " text-white text-center"}>
                  <div className="text-5xl mb-2">{scoreEmoji}</div>
                  <div className="text-5xl font-bold mb-1">{analysis.score}/100</div>
                  <div className="text-xl font-medium opacity-90">{analysis.scoreInterpretation}</div>
                  <div className="text-sm opacity-75 mt-2">{analysis.wordCount} {lang === "fr" ? "mots analys\u00E9s" : "words analyzed"}</div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">{analysis.summary.strengths}</div>
                    <div className="text-xs text-green-700">{lang === "fr" ? "Forces" : "Strengths"}</div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-red-600">{analysis.summary.criticalGaps}</div>
                    <div className="text-xs text-red-700">{lang === "fr" ? "Gaps critiques" : "Critical gaps"}</div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-amber-600">{analysis.summary.importantGaps}</div>
                    <div className="text-xs text-amber-700">{lang === "fr" ? "Gaps importants" : "Important gaps"}</div>
                  </div>
                </div>

                {/* Strengths */}
                {analysis.strengths.length > 0 && (
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      {"\u2705 "}{lang === "fr" ? "Forces d\u00E9tect\u00E9es" : "Detected strengths"}
                    </h4>
                    <ul className="space-y-1">
                      {analysis.strengths.map((s, i) => (
                        <li key={i} className="text-green-700 text-sm flex items-center gap-2">
                          <span className="text-green-500">{"\u2713"}</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Gaps */}
                {analysis.gaps.length > 0 && (
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                      {"\u274C "}{lang === "fr" ? "\u00C9l\u00E9ments IS manquants" : "Missing IS elements"}
                    </h4>
                    <div className="space-y-3">
                      {analysis.gaps.map((gap, i) => {
                        const canGenerate = ['framework', 'strategies', 'outcomes_impl', 'sustainment'].includes(gap.id);
                        return (
                          <div key={i} className={"p-3 rounded-lg " + (gap.severity === 'critical' ? 'bg-red-100' : 'bg-amber-100')}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={gap.severity === 'critical' ? 'text-red-600' : 'text-amber-600'}>
                                    {gap.severity === 'critical' ? '\uD83D\uDD34' : '\uD83D\uDFE1'}
                                  </span>
                                  <span className="font-medium text-gray-800 text-sm">{gap.description}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 ml-6">{gap.suggestion}</p>
                              </div>
                              {canGenerate && (
                                <button
                                  onClick={() => handleGenerateSection(gap.id)}
                                  className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 whitespace-nowrap"
                                >
                                  {"\u2728 "}{lang === "fr" ? "G\u00E9n\u00E9rer" : "Generate"}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Generated Section */}
                {generatedSection && (
                  <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-purple-800 flex items-center gap-2">
                        {"\u2728 "}{lang === "fr" ? "Section g\u00E9n\u00E9r\u00E9e par l'IA" : "AI-generated section"}
                      </h4>
                      <button
                        onClick={() => copyToClipboard(generatedSection.title + '\n\n' + generatedSection.content)}
                        className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700"
                      >
                        {"\uD83D\uDCCB "}{lang === "fr" ? "Copier" : "Copy"}
                      </button>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h5 className="font-bold text-gray-800 mb-2">{generatedSection.title}</h5>
                      <p className="text-gray-700 text-sm whitespace-pre-line">{generatedSection.content}</p>
                    </div>
                    <p className="text-xs text-purple-600 mt-2 italic">
                      {"\uD83D\uDCA1 "}{lang === "fr" ? "Copiez ce texte et adaptez-le \u00E0 votre contexte sp\u00E9cifique" : "Copy this text and adapt it to your specific context"}
                    </p>
                  </div>
                )}

                {/* Extracted Elements */}
                {analysis.extractedElements && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                      {"\uD83D\uDD0E "}{lang === "fr" ? "\u00C9l\u00E9ments extraits automatiquement" : "Automatically extracted elements"}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {analysis.extractedElements.context && (
                        <div className="bg-white p-2 rounded-lg">
                          <span className="text-gray-500">{lang === "fr" ? "Contexte:" : "Context:"}</span>
                          <span className="ml-2 font-medium">{analysis.extractedElements.context}</span>
                        </div>
                      )}
                      {analysis.extractedElements.population && (
                        <div className="bg-white p-2 rounded-lg">
                          <span className="text-gray-500">{lang === "fr" ? "Population:" : "Population:"}</span>
                          <span className="ml-2 font-medium">{analysis.extractedElements.population}</span>
                        </div>
                      )}
                      {analysis.extractedElements.phase && (
                        <div className="bg-white p-2 rounded-lg">
                          <span className="text-gray-500">{lang === "fr" ? "Phase EPIS:" : "EPIS Phase:"}</span>
                          <span className="ml-2 font-medium">{analysis.extractedElements.phase}</span>
                        </div>
                      )}
                      {analysis.extractedElements.timeline && (
                        <div className="bg-white p-2 rounded-lg">
                          <span className="text-gray-500">{lang === "fr" ? "Dur\u00E9e:" : "Duration:"}</span>
                          <span className="ml-2 font-medium">{analysis.extractedElements.timeline} {lang === "fr" ? "mois" : "months"}</span>
                        </div>
                      )}
                      {analysis.extractedElements.barriers && analysis.extractedElements.barriers.length > 0 && (
                        <div className="bg-white p-2 rounded-lg col-span-2">
                          <span className="text-gray-500">{lang === "fr" ? "Barri\u00E8res d\u00E9tect\u00E9es:" : "Detected barriers:"}</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {analysis.extractedElements.barriers.map((b, i) => (
                              <span key={i} className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">{b}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
          <p className="text-xs text-gray-500">
            {"\uD83D\uDCA1 "}{lang === "fr" ? "L'analyse est bas\u00E9e sur 10 crit\u00E8res IS essentiels (CFIR, RE-AIM, EPIS, ERIC, Proctor, TIDieR)" : "Analysis is based on 10 essential IS criteria (CFIR, RE-AIM, EPIS, ERIC, Proctor, TIDieR)"}
          </p>
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
