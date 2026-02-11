import React, { useState } from 'react';
/* global LLMProtocolAnalyzer, DeepAIAnalyzer */

export default function ProtocolAnalyzerView({ lang = 'fr' }) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('protocol');
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [engine, setEngine] = useState('quick');
  const [deepResult, setDeepResult] = useState(null);
  const [deepLoading, setDeepLoading] = useState(false);
  const [deepError, setDeepError] = useState(null);
  const [sectionType, setSectionType] = useState('theoreticalFramework');
  const [generatedSection, setGeneratedSection] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [text2, setText2] = useState('');
  const [compareResult, setCompareResult] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [mainTab, setMainTab] = useState('analyze');

  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const scoreColor = (score) => {
    if (score >= 75) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    if (score >= 25) return 'text-orange-400';
    return 'text-red-400';
  };

  const scoreBg = (score) => {
    if (score >= 75) return 'bg-green-500/20 border-green-500/30';
    if (score >= 50) return 'bg-yellow-500/20 border-yellow-500/30';
    if (score >= 25) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const modes = Object.values(LLMProtocolAnalyzer.modes);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setDeepResult(null);
    setDeepError(null);

    // Quick NLP analysis
    try {
      const nlpResult = LLMProtocolAnalyzer.analyze(text, mode, lang);
      setResult(nlpResult);
    } catch (err) {
      console.error('[MOUDAR] Analysis error:', err);
    }

    // Deep AI analysis (if selected)
    if (engine === 'deep' || engine === 'both') {
      setDeepLoading(true);
      DeepAIAnalyzer.analyzeDeep(
        text,
        mode,
        lang,
        (deepRes) => {
          setDeepResult(deepRes);
          setDeepLoading(false);
        },
        (err) => {
          setDeepError(err.message || String(err));
          setDeepLoading(false);
        }
      );
    }

    setAnalyzing(false);
    setActiveTab('overview');
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setDeepResult(null);
    setDeepError(null);
    setActiveTab('overview');
  };

  const handleDeepAnalyze = () => {
    if (!text.trim()) return;
    setDeepLoading(true);
    setDeepError(null);
    DeepAIAnalyzer.analyzeDeep(
      text,
      mode,
      lang,
      (deepRes) => {
        setDeepResult(deepRes);
        setDeepLoading(false);
      },
      (err) => {
        setDeepError(err.message || String(err));
        setDeepLoading(false);
      }
    );
  };

  const handleGenerateSection = () => {
    if (!sectionType) return;
    setGenerating(true);
    setGeneratedSection(null);
    const context = text.trim() || t('Contexte non fourni', 'No context provided');
    DeepAIAnalyzer.generateSection(
      sectionType,
      context,
      lang,
      (generated) => {
        setGeneratedSection(generated);
        setGenerating(false);
      },
      (err) => {
        setGeneratedSection(t('Erreur: ', 'Error: ') + (err.message || String(err)));
        setGenerating(false);
      }
    );
  };

  const handleCompare = () => {
    if (!text.trim() || !text2.trim()) return;
    setComparing(true);
    setCompareResult(null);
    DeepAIAnalyzer.compareProtocols(
      text.trim(),
      text2.trim(),
      lang,
      (cmpResult) => {
        setCompareResult(cmpResult);
        setComparing(false);
      },
      (err) => {
        setCompareResult({ _rawText: t('Erreur: ', 'Error: ') + (err.message || String(err)), _parseError: true });
        setComparing(false);
      }
    );
  };

  const mainTabs = [
    { id: 'analyze', label: t('Analyser', 'Analyze'), icon: '\uD83D\uDD2C' },
    { id: 'generate', label: t('G\u00e9n\u00e9rer', 'Generate'), icon: '\u2728' },
    { id: 'compare', label: t('Comparer', 'Compare'), icon: '\u2696\uFE0F' }
  ];

  const subTabs = [
    { id: 'overview', label: t('Vue d\u2019ensemble', 'Overview'), icon: '\uD83C\uDFAF' },
    { id: 'extraction', label: t('Extraction', 'Extraction'), icon: '\uD83D\uDCCB' },
    { id: 'cfir', label: 'CFIR 2.0', icon: '\uD83C\uDFD7\uFE0F' },
    { id: 'reaim', label: 'RE-AIM', icon: '\uD83C\uDFAF' },
    { id: 'stari', label: 'StaRI', icon: '\u2705' },
    { id: 'gaps', label: t('Lacunes', 'Gaps'), icon: '\u26A0\uFE0F' },
    { id: 'recommendations', label: t('Recommandations', 'Recommendations'), icon: '\uD83D\uDCA1' }
  ];

  const sectionTypes = Object.entries(DeepAIAnalyzer.generableSections);

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-cyan-900/50 to-cyan-700/30 rounded-xl border border-cyan-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\uD83D\uDD2C"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t('Analyseur de Protocoles IS', 'IS Protocol Analyzer')} v{LLMProtocolAnalyzer.VERSION}
            </h1>
            <p className="text-cyan-300 text-sm">
              {t(
                'NLP + IA pour l\u2019analyse multi-cadres de protocoles de recherche en impl\u00e9mentation',
                'NLP + AI for multi-framework analysis of implementation research protocols'
              )}
              {' \u2022 '}{LLMProtocolAnalyzer.citation}
            </p>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {mainTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMainTab(tab.id)}
            className={
              'px-5 py-2.5 rounded-lg text-sm font-medium transition-all ' +
              (mainTab === tab.id
                ? 'bg-cyan-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white')
            }
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MAIN TAB: Analyze                                             */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {mainTab === 'analyze' && (
        <div className="space-y-4">
          {/* Mode Selector */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="text-white font-semibold mb-3">
              {t('Mode d\u2019analyse', 'Analysis Mode')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={
                    'p-3 rounded-lg text-left transition-all border ' +
                    (mode === m.id
                      ? 'bg-cyan-600/20 border-cyan-500 text-white'
                      : 'bg-slate-900/50 border-slate-600 text-slate-400 hover:border-slate-500')
                  }
                >
                  <div className="text-lg mb-1">{m.icon}</div>
                  <div className="text-sm font-medium">{m.label[lang]}</div>
                  <div className="text-xs text-slate-500 mt-1">{m.description[lang]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="text-white font-semibold mb-3">
              {t('Texte \u00e0 analyser', 'Text to Analyze')}
            </h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t(
                'Collez votre protocole, proposition de subvention ou manuscrit ici...',
                'Paste your protocol, grant proposal or manuscript here...'
              )}
              className="w-full h-48 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 resize-y font-mono text-sm"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-slate-500 text-xs">
                {text.split(/\s+/).filter(Boolean).length} {t('mots', 'words')}
              </span>

              {/* Engine Selector */}
              <div className="flex gap-2 items-center">
                <span className="text-slate-400 text-xs">{t('Moteur', 'Engine')}:</span>
                {[
                  { id: 'quick', label: t('Rapide (NLP)', 'Quick (NLP)') },
                  { id: 'deep', label: t('Deep IA', 'Deep AI') },
                  { id: 'both', label: t('Les deux', 'Both') }
                ].map((eng) => (
                  <button
                    key={eng.id}
                    onClick={() => setEngine(eng.id)}
                    className={
                      'px-3 py-1 rounded text-xs transition-all ' +
                      (engine === eng.id
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-700 text-slate-400 hover:text-white')
                    }
                  >
                    {eng.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !text.trim()}
              className={
                'flex-1 py-3 rounded-xl font-semibold transition-all ' +
                (analyzing || !text.trim()
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white')
              }
            >
              {analyzing
                ? (t('Analyse en cours...', 'Analyzing...'))
                : (t('\uD83D\uDD2C Analyser', '\uD83D\uDD2C Analyze'))}
            </button>
            {result && (
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 transition-all"
              >
                {t('Effacer', 'Clear')}
              </button>
            )}
          </div>

          {/* ═══ RESULTS SECTION ═══ */}
          {result && (
            <div className="space-y-4">
              {/* Sub-tab Navigation */}
              <div className="flex gap-1 flex-wrap bg-slate-800 rounded-xl p-2 border border-slate-700">
                {subTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all ' +
                      (activeTab === tab.id
                        ? 'bg-cyan-600 text-white'
                        : 'text-slate-400 hover:bg-slate-700 hover:text-white')
                    }
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* ─── Sub-tab: Overview ─── */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  {/* Global Score */}
                  <div className={'text-center p-6 rounded-xl border ' + scoreBg(result.scores.global)}>
                    <div className={'text-5xl font-bold ' + scoreColor(result.scores.global)}>
                      {result.scores.global}%
                    </div>
                    <p className="text-slate-300 mt-2">
                      {t('Score global IS', 'Global IS Score')}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      {t('Mots analys\u00e9s', 'Words analyzed')}: {result.wordCount}
                      {' \u2022 '}{t('Mode', 'Mode')}: {LLMProtocolAnalyzer.modes[result.mode]?.label[lang] || result.mode}
                    </p>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid md:grid-cols-4 gap-3">
                    {[
                      { label: 'CFIR 2.0', score: result.scores.cfir, color: '#3b82f6' },
                      { label: 'RE-AIM', score: result.scores.reaim, color: '#10b981' },
                      { label: 'StaRI', score: result.scores.stari || 0, color: '#8b5cf6' },
                      { label: t('\u00C9quit\u00e9', 'Equity'), score: result.extractedElements.equity?.detected ? 100 : 0, color: '#f59e0b' }
                    ].map((item) => (
                      <div key={item.label} className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700">
                        <div className="text-3xl font-bold" style={{ color: item.color }}>
                          {item.score}%
                        </div>
                        <div className="text-sm text-slate-400 mt-1">{item.label}</div>
                        <div className="mt-2 h-1.5 bg-slate-700 rounded-full">
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: item.score + '%', backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Strengths */}
                  {result.strengths && result.strengths.length > 0 && (
                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                      <h3 className="text-green-400 font-semibold mb-3">
                        {t('Forces identifi\u00e9es', 'Identified Strengths')}
                      </h3>
                      <div className="space-y-2">
                        {result.strengths.map((s, i) => (
                          <div key={i} className="p-2 bg-slate-900/30 rounded-lg">
                            <p className="text-slate-300 text-sm">{s.message}</p>
                            {s.items && s.items.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {s.items.slice(0, 5).map((item, j) => (
                                  <span key={j} className="px-2 py-0.5 bg-green-500/10 text-green-300 text-xs rounded">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Critical Gaps Summary */}
                  {result.gaps && result.gaps.filter((g) => g.severity === 'critical').length > 0 && (
                    <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                      <h3 className="text-red-400 font-semibold mb-3">
                        {t('Lacunes critiques', 'Critical Gaps')}
                      </h3>
                      <div className="space-y-2">
                        {result.gaps
                          .filter((g) => g.severity === 'critical')
                          .map((g, i) => (
                            <div key={i} className="p-2 bg-slate-900/30 rounded-lg">
                              <p className="text-slate-300 text-sm">{g.message}</p>
                              {g.reference && (
                                <p className="text-slate-500 text-xs mt-1">{g.reference}</p>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── Sub-tab: Extraction ─── */}
              {activeTab === 'extraction' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {"\uD83D\uDCCB"} {t('\u00C9l\u00e9ments extraits', 'Extracted Elements')}
                  </h3>
                  {Object.entries(result.extractedElements).map(([category, data]) => (
                    <div key={category} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium">{data.label}</h4>
                        <span className={
                          'px-2 py-0.5 rounded text-xs font-medium ' +
                          (data.detected
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400')
                        }>
                          {data.detected
                            ? (data.count + ' ' + t('trouv\u00e9(s)', 'found'))
                            : t('Non d\u00e9tect\u00e9', 'Not detected')}
                        </span>
                      </div>
                      {data.items && data.items.length > 0 && (
                        <div className="space-y-1">
                          {data.items.map((item, i) => (
                            <div key={i} className="p-2 bg-slate-900/50 rounded-lg text-slate-300 text-sm">
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ─── Sub-tab: CFIR 2.0 ─── */}
              {activeTab === 'cfir' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {"\uD83C\uDFD7\uFE0F"} CFIR 2.0 {t('Mapping', 'Mapping')}
                    </h3>
                    <span className={'text-2xl font-bold ' + scoreColor(result.scores.cfir)}>
                      {result.scores.cfir}%
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(result.cfirMapping).map(([constructId, data]) => (
                      <div
                        key={constructId}
                        className={
                          'p-3 rounded-lg border ' +
                          (data.detected
                            ? (data.strength === 'strong'
                              ? 'bg-green-500/10 border-green-500/20'
                              : 'bg-yellow-500/10 border-yellow-500/20')
                            : 'bg-slate-900/50 border-slate-600')
                        }
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white font-mono text-sm">{constructId}</span>
                          <span className={
                            'px-2 py-0.5 rounded text-xs ' +
                            (data.strength === 'strong'
                              ? 'bg-green-500/20 text-green-400'
                              : data.strength === 'partial'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-slate-700 text-slate-500')
                          }>
                            {data.strength === 'strong'
                              ? t('Fort', 'Strong')
                              : data.strength === 'partial'
                                ? t('Partiel', 'Partial')
                                : t('Absent', 'Absent')}
                          </span>
                        </div>
                        {data.matches && data.matches.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {data.matches.map((m, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-xs rounded">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── Sub-tab: RE-AIM ─── */}
              {activeTab === 'reaim' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {"\uD83C\uDFAF"} RE-AIM {t('Mapping', 'Mapping')}
                    </h3>
                    <span className={'text-2xl font-bold ' + scoreColor(result.scores.reaim)}>
                      {result.scores.reaim}%
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {Object.entries(result.reaimMapping).map(([dimId, data]) => {
                      const dimColors = {
                        reach: '#3b82f6',
                        effectiveness: '#10b981',
                        adoption: '#f59e0b',
                        implementation: '#8b5cf6',
                        maintenance: '#ef4444'
                      };
                      const color = dimColors[dimId] || '#6b7280';
                      return (
                        <div
                          key={dimId}
                          className="p-4 rounded-xl border text-center"
                          style={{
                            borderColor: data.detected ? color : '#334155',
                            backgroundColor: data.detected ? color + '15' : 'transparent'
                          }}
                        >
                          <div
                            className="text-2xl font-bold capitalize"
                            style={{ color: data.detected ? color : '#6b7280' }}
                          >
                            {dimId.charAt(0).toUpperCase()}
                          </div>
                          <div className="text-sm text-slate-300 capitalize mt-1">{dimId}</div>
                          <div className={
                            'mt-2 px-2 py-0.5 rounded text-xs font-medium ' +
                            (data.strength === 'strong'
                              ? 'bg-green-500/20 text-green-400'
                              : data.strength === 'partial'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400')
                          }>
                            {data.strength === 'strong'
                              ? t('Fort', 'Strong')
                              : data.strength === 'partial'
                                ? t('Partiel', 'Partial')
                                : t('Absent', 'Absent')}
                          </div>
                          {data.matches && data.matches.length > 0 && (
                            <div className="mt-2 text-xs text-slate-400">
                              {data.matches.length} {t('termes', 'terms')}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ─── Sub-tab: StaRI ─── */}
              {activeTab === 'stari' && result.stariCompliance && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {"\u2705"} StaRI {t('Conformit\u00e9', 'Compliance')}
                      </h3>
                      <p className="text-slate-500 text-xs">{result.stariCompliance.citation}</p>
                    </div>
                    <div className="text-right">
                      <span className={'text-2xl font-bold ' + scoreColor(result.stariCompliance.score)}>
                        {result.stariCompliance.score}%
                      </span>
                      <p className="text-slate-400 text-xs">
                        {result.stariCompliance.detectedItems}/{result.stariCompliance.totalItems} items
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {result.stariCompliance.items.map((item) => (
                      <div
                        key={item.id}
                        className={
                          'p-3 rounded-lg border flex items-start gap-3 ' +
                          (item.detected
                            ? 'bg-green-500/10 border-green-500/20'
                            : 'bg-red-500/10 border-red-500/20')
                        }
                      >
                        <span className="text-lg mt-0.5">
                          {item.detected ? '\u2705' : '\u274C'}
                        </span>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <span className="text-white text-sm font-medium">{item.item}</span>
                            <span className="text-slate-500 text-xs">{item.section} ({item.id})</span>
                          </div>
                          {item.matches && item.matches.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.matches.map((m, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-green-500/10 text-green-300 text-xs rounded">
                                  {m}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Missing Items */}
                  {result.stariCompliance.missingItems.length > 0 && (
                    <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20 mt-4">
                      <h4 className="text-amber-400 font-semibold mb-2">
                        {"\u26A0\uFE0F"} {result.stariCompliance.missingItems.length} {t('\u00e9l\u00e9ments manquants', 'missing items')}
                      </h4>
                      <ul className="space-y-1">
                        {result.stariCompliance.missingItems.map((item) => (
                          <li key={item.id} className="text-slate-300 text-sm">
                            {'\u2022'} <span className="text-slate-500">[{item.id}]</span> {item.item}
                            <span className="text-slate-500 text-xs ml-2">({item.section})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ─── Sub-tab: Gaps ─── */}
              {activeTab === 'gaps' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {"\u26A0\uFE0F"} {t('Lacunes identifi\u00e9es', 'Identified Gaps')} ({result.gaps.length})
                  </h3>
                  {result.gaps.map((gap, i) => (
                    <div
                      key={i}
                      className={
                        'p-4 rounded-lg border ' +
                        (gap.severity === 'critical'
                          ? 'bg-red-500/10 border-red-500/20'
                          : 'bg-amber-500/10 border-amber-500/20')
                      }
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={
                          'px-2 py-0.5 rounded text-xs font-medium uppercase ' +
                          (gap.severity === 'critical'
                            ? 'bg-red-600 text-white'
                            : 'bg-amber-600 text-white')
                        }>
                          {gap.severity}
                        </span>
                        <span className="text-slate-500 text-xs">{gap.category}</span>
                      </div>
                      <p className="text-slate-300 text-sm">{gap.message}</p>
                      {gap.reference && (
                        <p className="text-slate-500 text-xs mt-1">
                          {"\uD83D\uDCDA"} {gap.reference}
                        </p>
                      )}
                      {gap.action && (
                        <p className="text-cyan-400 text-xs mt-1">
                          {"\uD83D\uDCA1"} {gap.action}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ─── Sub-tab: Recommendations ─── */}
              {activeTab === 'recommendations' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {"\uD83D\uDCA1"} {t('Recommandations', 'Recommendations')} ({result.recommendations.length})
                  </h3>
                  {result.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className={
                        'p-4 rounded-lg border ' +
                        (rec.priority === 'critical'
                          ? 'bg-red-500/10 border-red-500/20'
                          : rec.priority === 'high'
                            ? 'bg-orange-500/10 border-orange-500/20'
                            : 'bg-yellow-500/10 border-yellow-500/20')
                      }
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{rec.icon}</span>
                        <div>
                          <span className={
                            'px-2 py-0.5 rounded text-xs font-medium uppercase ' +
                            (rec.priority === 'critical'
                              ? 'bg-red-600 text-white'
                              : rec.priority === 'high'
                                ? 'bg-orange-600 text-white'
                                : 'bg-yellow-600 text-white')
                          }>
                            {rec.priority}
                          </span>
                          <p className="text-slate-300 text-sm mt-2">{rec.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ═══ Deep AI Results ═══ */}
              {(deepLoading || deepResult || deepError) && (
                <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/30 mt-4">
                  <h3 className="text-lg font-bold text-white mb-4">
                    {"\uD83E\uDD16"} Deep AI {t('Analyse', 'Analysis')}
                    <span className="text-xs text-purple-400 ml-2">
                      ({DeepAIAnalyzer.MODEL})
                    </span>
                  </h3>

                  {deepLoading && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">{"\u23F3"}</div>
                      <p className="text-slate-400">
                        {t('Analyse Deep AI en cours...', 'Deep AI analysis in progress...')}
                      </p>
                    </div>
                  )}

                  {deepError && (
                    <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                      <p className="text-red-400 text-sm">{deepError}</p>
                    </div>
                  )}

                  {deepResult && !deepResult._parseError && (
                    <div className="space-y-4">
                      {/* Deep AI Scores */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: t('Score global', 'Global Score'), val: deepResult.globalScore },
                          { label: t('Publiabilit\u00e9', 'Publishability'), val: deepResult.publishabilityScore },
                          { label: t('Finan\u00e7abilit\u00e9', 'Fundability'), val: deepResult.fundabilityScore }
                        ].map((s) => (
                          <div key={s.label} className="text-center p-3 bg-slate-900/50 rounded-lg">
                            <div className={'text-3xl font-bold ' + scoreColor(s.val || 0)}>
                              {s.val || 0}%
                            </div>
                            <div className="text-xs text-slate-400 mt-1">{s.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Executive Summary */}
                      {deepResult.executiveSummary && (
                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          <h4 className="text-purple-400 font-semibold mb-2">
                            {t('R\u00e9sum\u00e9 ex\u00e9cutif', 'Executive Summary')}
                          </h4>
                          <p className="text-slate-300 text-sm whitespace-pre-wrap">
                            {deepResult.executiveSummary}
                          </p>
                        </div>
                      )}

                      {/* Deep Strengths */}
                      {deepResult.strengths && deepResult.strengths.length > 0 && (
                        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                          <h4 className="text-green-400 font-semibold mb-2">
                            {t('Forces (IA)', 'Strengths (AI)')}
                          </h4>
                          <div className="space-y-1">
                            {deepResult.strengths.map((s, i) => (
                              <div key={i} className="text-slate-300 text-sm">
                                {'\u2022'} {s.item || s}
                                {s.reference && (
                                  <span className="text-slate-500 text-xs ml-1">({s.reference})</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Deep Critical Gaps */}
                      {deepResult.criticalGaps && deepResult.criticalGaps.length > 0 && (
                        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                          <h4 className="text-red-400 font-semibold mb-2">
                            {t('Lacunes critiques (IA)', 'Critical Gaps (AI)')}
                          </h4>
                          <div className="space-y-2">
                            {deepResult.criticalGaps.map((g, i) => (
                              <div key={i} className="p-2 bg-slate-900/30 rounded-lg">
                                <p className="text-slate-300 text-sm">{g.gap || g}</p>
                                {g.recommendation && (
                                  <p className="text-cyan-400 text-xs mt-1">
                                    {"\uD83D\uDCA1"} {g.recommendation}
                                  </p>
                                )}
                                {g.reference && (
                                  <p className="text-slate-500 text-xs">{g.reference}</p>
                                )}
                                {g.moudarModule && (
                                  <p className="text-purple-400 text-xs">
                                    MOUDAR: {g.moudarModule}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Deep Recommendations */}
                      {deepResult.recommendations && deepResult.recommendations.length > 0 && (
                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <h4 className="text-blue-400 font-semibold mb-2">
                            {t('Recommandations (IA)', 'Recommendations (AI)')}
                          </h4>
                          <div className="space-y-2">
                            {deepResult.recommendations.map((r, i) => (
                              <div key={i} className="flex gap-3 items-start">
                                <span className="text-white bg-blue-600 px-2 py-0.5 rounded text-xs font-bold">
                                  #{r.priority || (i + 1)}
                                </span>
                                <div>
                                  <p className="text-slate-300 text-sm">{r.action || r}</p>
                                  {r.reference && (
                                    <p className="text-slate-500 text-xs">{r.reference}</p>
                                  )}
                                  {r.moudarModule && (
                                    <p className="text-purple-400 text-xs">
                                      MOUDAR: {r.moudarModule}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Raw text fallback if parse error */}
                  {deepResult && deepResult._parseError && (
                    <div className="p-4 bg-slate-900 rounded-lg">
                      <p className="text-amber-400 text-xs mb-2">
                        {t('R\u00e9ponse brute (erreur de parsing JSON)', 'Raw response (JSON parse error)')}
                      </p>
                      <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono">
                        {deepResult._rawText || deepResult.executiveSummary}
                      </pre>
                    </div>
                  )}

                  {/* Trigger Deep AI separately */}
                  {!deepLoading && !deepResult && !deepError && (
                    <button
                      onClick={handleDeepAnalyze}
                      disabled={!text.trim()}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-xl transition-all"
                    >
                      {"\uD83E\uDD16"} {t('Lancer l\u2019analyse Deep AI', 'Run Deep AI Analysis')}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MAIN TAB: Generate                                            */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {mainTab === 'generate' && (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-4">
              {"\u2728"} {t('G\u00e9n\u00e9rateur de sections StaRI', 'StaRI Section Generator')}
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              {t(
                'G\u00e9n\u00e9rez des sections de protocole conformes StaRI (Pinnock 2017) via l\u2019IA.',
                'Generate StaRI-compliant protocol sections (Pinnock 2017) via AI.'
              )}
            </p>

            {/* Section Type Selector */}
            <div className="mb-4">
              <label className="text-sm text-slate-400 mb-2 block">
                {t('Type de section', 'Section Type')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {sectionTypes.map(([key, section]) => (
                  <button
                    key={key}
                    onClick={() => setSectionType(key)}
                    className={
                      'p-3 rounded-lg text-left text-sm transition-all border ' +
                      (sectionType === key
                        ? 'bg-cyan-600/20 border-cyan-500 text-white'
                        : 'bg-slate-900/50 border-slate-600 text-slate-400 hover:border-slate-500')
                    }
                  >
                    <div className="font-medium">{section.label[lang]}</div>
                    <div className="text-xs text-slate-500 mt-1">StaRI: {section.stariRef}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Context textarea */}
            <div className="mb-4">
              <label className="text-sm text-slate-400 mb-2 block">
                {t('Contexte / R\u00e9sum\u00e9 de votre projet', 'Context / Project Summary')}
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t(
                  'D\u00e9crivez votre projet, contexte, population cible, intervention...',
                  'Describe your project, context, target population, intervention...'
                )}
                className="w-full h-36 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 resize-y text-sm"
              />
            </div>

            <button
              onClick={handleGenerateSection}
              disabled={generating}
              className={
                'w-full py-3 rounded-xl font-semibold transition-all ' +
                (generating
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white')
              }
            >
              {generating
                ? (t('\u23F3 G\u00e9n\u00e9ration en cours...', '\u23F3 Generating...'))
                : (t('\u2728 G\u00e9n\u00e9rer la section', '\u2728 Generate Section'))}
            </button>
          </div>

          {/* Generated Output */}
          {generatedSection && (
            <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">
                  {"\uD83D\uDCC4"} {t('Section g\u00e9n\u00e9r\u00e9e', 'Generated Section')}
                </h3>
                <span className="text-purple-400 text-xs">
                  {DeepAIAnalyzer.generableSections[sectionType]?.label[lang] || sectionType}
                  {' \u2022 '} StaRI: {DeepAIAnalyzer.generableSections[sectionType]?.stariRef || 'N/A'}
                </span>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                {generatedSection}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                {t(
                  'G\u00e9n\u00e9r\u00e9 par ' + DeepAIAnalyzer.MODEL + ' \u2014 V\u00e9rifiez et adaptez avant utilisation.',
                  'Generated by ' + DeepAIAnalyzer.MODEL + ' \u2014 Verify and adapt before use.'
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MAIN TAB: Compare                                             */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {mainTab === 'compare' && (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-4">
              {"\u2696\uFE0F"} {t('Comparateur de protocoles', 'Protocol Comparator')}
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              {t(
                'Comparez deux protocoles IS c\u00f4te \u00e0 c\u00f4te via l\u2019analyse IA.',
                'Compare two IS protocols side by side via AI analysis.'
              )}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Protocol 1 */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  {t('Protocole 1', 'Protocol 1')}
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t('Collez le premier protocole...', 'Paste the first protocol...')}
                  className="w-full h-48 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 resize-y text-sm"
                />
                <span className="text-slate-500 text-xs">
                  {text.split(/\s+/).filter(Boolean).length} {t('mots', 'words')}
                </span>
              </div>
              {/* Protocol 2 */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  {t('Protocole 2', 'Protocol 2')}
                </label>
                <textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  placeholder={t('Collez le deuxi\u00e8me protocole...', 'Paste the second protocol...')}
                  className="w-full h-48 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 resize-y text-sm"
                />
                <span className="text-slate-500 text-xs">
                  {text2.split(/\s+/).filter(Boolean).length} {t('mots', 'words')}
                </span>
              </div>
            </div>

            <button
              onClick={handleCompare}
              disabled={comparing || !text.trim() || !text2.trim()}
              className={
                'w-full py-3 rounded-xl font-semibold transition-all ' +
                (comparing || !text.trim() || !text2.trim()
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white')
              }
            >
              {comparing
                ? (t('\u23F3 Comparaison en cours...', '\u23F3 Comparing...'))
                : (t('\u2696\uFE0F Comparer les protocoles', '\u2696\uFE0F Compare Protocols'))}
            </button>
          </div>

          {/* Comparison Results */}
          {compareResult && !compareResult._parseError && (
            <div className="space-y-4">
              {/* Scores side by side */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className={'text-center p-6 rounded-xl border ' + scoreBg(compareResult.protocol1Score || 0)}>
                  <div className="text-slate-400 text-sm mb-2">{t('Protocole 1', 'Protocol 1')}</div>
                  <div className={'text-5xl font-bold ' + scoreColor(compareResult.protocol1Score || 0)}>
                    {compareResult.protocol1Score || 0}%
                  </div>
                </div>
                <div className={'text-center p-6 rounded-xl border ' + scoreBg(compareResult.protocol2Score || 0)}>
                  <div className="text-slate-400 text-sm mb-2">{t('Protocole 2', 'Protocol 2')}</div>
                  <div className={'text-5xl font-bold ' + scoreColor(compareResult.protocol2Score || 0)}>
                    {compareResult.protocol2Score || 0}%
                  </div>
                </div>
              </div>

              {/* Comparative Strengths */}
              {compareResult.comparativeStrengths && Object.keys(compareResult.comparativeStrengths).length > 0 && (
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                  <h3 className="text-green-400 font-semibold mb-3">
                    {t('Forces comparatives', 'Comparative Strengths')}
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(compareResult.comparativeStrengths).map(([key, val]) => (
                      <div key={key} className="text-slate-300 text-sm">
                        <span className="font-medium text-green-400">{key}:</span> {String(val)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comparative Weaknesses */}
              {compareResult.comparativeWeaknesses && Object.keys(compareResult.comparativeWeaknesses).length > 0 && (
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                  <h3 className="text-red-400 font-semibold mb-3">
                    {t('Faiblesses comparatives', 'Comparative Weaknesses')}
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(compareResult.comparativeWeaknesses).map(([key, val]) => (
                      <div key={key} className="text-slate-300 text-sm">
                        <span className="font-medium text-red-400">{key}:</span> {String(val)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Synthesis */}
              {compareResult.synthesis && (
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                  <h3 className="text-purple-400 font-semibold mb-2">
                    {t('Synth\u00e8se', 'Synthesis')}
                  </h3>
                  <p className="text-slate-300 text-sm whitespace-pre-wrap">{compareResult.synthesis}</p>
                </div>
              )}

              {/* Recommendation */}
              {compareResult.recommendation && (
                <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20">
                  <h3 className="text-cyan-400 font-semibold mb-2">
                    {"\uD83D\uDCA1"} {t('Recommandation', 'Recommendation')}
                  </h3>
                  <p className="text-slate-300 text-sm">{compareResult.recommendation}</p>
                </div>
              )}
            </div>
          )}

          {/* Raw text fallback if parse error */}
          {compareResult && compareResult._parseError && (
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <p className="text-amber-400 text-xs mb-2">
                {t('R\u00e9ponse brute (erreur de parsing)', 'Raw response (parse error)')}
              </p>
              <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono">
                {compareResult._rawText}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-slate-500">
        MOUDAR{'\u00AE'} Protocol Analyzer v{LLMProtocolAnalyzer.VERSION}
        {' \u2022 '}{LLMProtocolAnalyzer.citation}
        {' \u2022 '}{LLMProtocolAnalyzer.stariCitation}
      </div>
    </div>
  );
}
