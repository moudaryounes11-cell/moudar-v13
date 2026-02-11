import React from 'react';

/* global SMARTDesigner */

export default function SMARTDesignView({ lang = 'fr' }) {
  const t = (fr, en) => (lang === 'fr' ? fr : en);

  // State
  const [template, setTemplate] = React.useState('twoStage');
  const [metric, setMetric] = React.useState('adoption');
  const [threshold, setThreshold] = React.useState(60);
  const [arm1Label, setArm1Label] = React.useState(t('Formation standard', 'Standard training'));
  const [arm1Strat, setArm1Strat] = React.useState('S01');
  const [arm2Label, setArm2Label] = React.useState(t('Formation + Champions', 'Training + Champions'));
  const [arm2Strat, setArm2Strat] = React.useState('S01+S04');
  const [simResult, setSimResult] = React.useState(null);
  const [design, setDesign] = React.useState(null);
  const [sampleSize, setSampleSize] = React.useState(null);
  const [effectSize, setEffectSize] = React.useState(0.30);
  const [respRate, setRespRate] = React.useState(0.50);
  const [activeTab, setActiveTab] = React.useState('design');

  // Build and run design
  const handleBuildDesign = () => {
    const d = SMARTDesigner.createDesign({
      template: template,
      responseMetric: metric,
      threshold: parseInt(threshold),
      projectName: t('Mon projet SMART', 'My SMART project'),
      stage1Arms: [
        {
          id: 'A',
          strategy: arm1Strat,
          label: { fr: arm1Label, en: arm1Label },
          intensity: 'standard'
        },
        {
          id: 'B',
          strategy: arm2Strat,
          label: { fr: arm2Label, en: arm2Label },
          intensity: 'enhanced'
        }
      ]
    });
    d.decisionRules = SMARTDesigner.generateDecisionRules(d);
    setDesign(d);
    setSimResult(null);
    setSampleSize(null);
  };

  const handleSimulate = () => {
    if (!design) return;
    const res = SMARTDesigner.simulateOutcomes(design, 1000);
    setSimResult(res);
  };

  const handleSampleSize = () => {
    const ss = SMARTDesigner.estimateSampleSize(effectSize, respRate, 0.80);
    setSampleSize(ss);
  };

  const respClassifier =
    SMARTDesigner.responseClassifiers[metric] ||
    SMARTDesigner.responseClassifiers.adoption;

  const tabs = [
    { key: 'design', label: t('📐 Design', '📐 Design') },
    { key: 'flowchart', label: t('🔀 Flowchart', '🔀 Flowchart') },
    { key: 'rules', label: t('📋 Règles', '📋 Rules') },
    { key: 'simulate', label: t('🎲 Simulation', '🎲 Simulation') },
    { key: 'sample', label: t('📊 Taille échantillon', '📊 Sample Size') }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          🔀 {t('Design Adaptatif SMART', 'SMART Adaptive Design')}
          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
            v11.0
          </span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Almirall D et al. (2014) &bull; Kilbourne AM et al. (2018) &bull;{' '}
          {t(
            "Premier outil mondial de design SMART pour la Science de l'Implémentation",
            "World's first SMART design tool for Implementation Science"
          )}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={
              'px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ' +
              (activeTab === tab.key
                ? 'bg-white shadow text-purple-700'
                : 'text-gray-600 hover:bg-gray-200')
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ============ DESIGN TAB ============ */}
      {activeTab === 'design' && (
        <div className="space-y-6">
          {/* Info box */}
          <div className="p-5 bg-purple-50 rounded-xl border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-1">
              {t("Qu'est-ce qu'un SMART ?", 'What is a SMART design?')}
            </h3>
            <p className="text-sm text-gray-600">
              {t(
                "Un SMART (Sequential Multiple Assignment Randomized Trial) est un design expérimental qui permet d'identifier la meilleure séquence de stratégies d'implémentation en adaptant dynamiquement selon la réponse des participants. Il produit des DTR (Dynamic Treatment Regimens) — des « recettes » séquentielles optimales.",
                'A SMART (Sequential Multiple Assignment Randomized Trial) is an experimental design that identifies the best sequence of implementation strategies by dynamically adapting based on participant response. It produces DTRs (Dynamic Treatment Regimens) — optimal sequential "recipes".'
              )}
            </p>
          </div>

          {/* Template cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {Object.keys(SMARTDesigner.templates).map((tplId) => {
              const tpl = SMARTDesigner.templates[tplId];
              return (
                <div
                  key={tplId}
                  onClick={() => setTemplate(tplId)}
                  className={
                    'p-4 rounded-xl border-2 cursor-pointer transition-all ' +
                    (template === tplId
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300')
                  }
                >
                  <div className="text-2xl mb-2">{tpl.icon}</div>
                  <h4 className="font-bold text-gray-800">{tpl.label[lang]}</h4>
                  <p className="text-xs text-gray-500 mt-1">{tpl.description[lang]}</p>
                  <span className="text-xs text-purple-600 mt-2 inline-block">
                    {tpl.stages} {t('étapes', 'stages')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Arms configuration */}
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-4">
              🔬 {t('Configuration des bras', 'Arms configuration')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Arm A (Standard) - blue */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 text-sm mb-3">
                  {t('Bras A (Standard)', 'Arm A (Standard)')}
                </h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-600">
                      {t('Libellé', 'Label')}
                    </label>
                    <input
                      type="text"
                      value={arm1Label}
                      onChange={(e) => setArm1Label(e.target.value)}
                      className="w-full p-2 border rounded-lg text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">
                      {t('Stratégie(s)', 'Strategy(ies)')}
                    </label>
                    <input
                      type="text"
                      value={arm1Strat}
                      onChange={(e) => setArm1Strat(e.target.value)}
                      className="w-full p-2 border rounded-lg text-sm mt-1"
                      placeholder="S01"
                    />
                  </div>
                </div>
              </div>

              {/* Arm B (Enhanced) - green */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 text-sm mb-3">
                  {t('Bras B (Renforcé)', 'Arm B (Enhanced)')}
                </h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-600">
                      {t('Libellé', 'Label')}
                    </label>
                    <input
                      type="text"
                      value={arm2Label}
                      onChange={(e) => setArm2Label(e.target.value)}
                      className="w-full p-2 border rounded-lg text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">
                      {t('Stratégie(s)', 'Strategy(ies)')}
                    </label>
                    <input
                      type="text"
                      value={arm2Strat}
                      onChange={(e) => setArm2Strat(e.target.value)}
                      className="w-full p-2 border rounded-lg text-sm mt-1"
                      placeholder="S01+S04"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Decision point section */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-bold text-amber-800 text-sm mb-3">
                ⚖️ {t('Point de décision', 'Decision point')}
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-600">
                    {t('Métrique de réponse', 'Response metric')}
                  </label>
                  <select
                    value={metric}
                    onChange={(e) => {
                      setMetric(e.target.value);
                      setThreshold(
                        SMARTDesigner.responseClassifiers[e.target.value]
                          .responderThreshold
                      );
                    }}
                    className="w-full p-2 border rounded-lg text-sm mt-1"
                  >
                    {Object.keys(SMARTDesigner.responseClassifiers).map((rc) => {
                      const cl = SMARTDesigner.responseClassifiers[rc];
                      return (
                        <option key={rc} value={rc}>
                          {cl.label[lang]} ({cl.unit})
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600">
                    {t('Seuil de réponse', 'Responder threshold')}:{' '}
                    <strong>
                      {threshold}
                      {respClassifier.unit}
                    </strong>
                  </label>
                  <input
                    type="range"
                    min={metric === 'satisfaction' ? 1 : 20}
                    max={metric === 'satisfaction' ? 5 : 90}
                    step={metric === 'satisfaction' ? 0.5 : 5}
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>
                      {t('Évaluation:', 'Assessment:')}{' '}
                      {respClassifier.timing[lang]}
                    </span>
                    <span>CFIR: {respClassifier.cfirLink.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Build button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleBuildDesign}
              className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 shadow-lg transition-all hover:scale-105"
            >
              🔨 {t('Construire le design SMART', 'Build SMART design')}
            </button>
          </div>
        </div>
      )}

      {/* ============ FLOWCHART TAB ============ */}
      {activeTab === 'flowchart' && (
        <div className="space-y-6">
          {/* Empty state */}
          {!design && (
            <div className="text-center p-12 bg-white rounded-xl border">
              <div className="text-4xl mb-4">📐</div>
              <p className="text-gray-500">
                {t(
                  "Construisez d'abord le design dans l'onglet Design",
                  'Build the design first in the Design tab'
                )}
              </p>
            </div>
          )}

          {/* Full flowchart */}
          {design && (
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-6 text-center">
                {t('Diagramme SMART', 'SMART Flowchart')} &mdash;{' '}
                {design.template.label[lang]}
              </h3>
              <div className="relative">
                {/* Randomization box */}
                <div className="flex justify-center mb-4">
                  <div className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold text-center">
                    R {t('Randomisation', 'Randomization')}
                    <div className="text-xs font-normal mt-1">N = ?</div>
                  </div>
                </div>

                {/* Arrows */}
                <div className="flex justify-center gap-4 mb-4">
                  <div className="text-center text-gray-400 text-2xl">↙</div>
                  <div className="w-16" />
                  <div className="text-center text-gray-400 text-2xl">↘</div>
                </div>

                {/* Arm cards */}
                <div className="grid grid-cols-2 gap-8 mb-4">
                  {design.stage1.arms.map((arm) => {
                    const armColor = arm.id === 'A' ? 'blue' : 'green';
                    return (
                      <div
                        key={arm.id}
                        className={
                          'p-4 rounded-xl border-2 text-center border-' +
                          armColor +
                          '-300 bg-' +
                          armColor +
                          '-50'
                        }
                      >
                        <div className={'font-bold text-' + armColor + '-800 text-lg'}>
                          {t('Bras', 'Arm')} {arm.id}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {arm.label[lang]}
                        </div>
                        <div className={'text-xs mt-2 text-' + armColor + '-600'}>
                          📋 {arm.strategy} &bull; {design.stage1.duration}{' '}
                          {t('semaines', 'weeks')}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Decision point diamond */}
                <div className="flex justify-center my-6">
                  <div
                    className="px-8 py-4 bg-amber-100 border-2 border-amber-400 rounded-2xl text-center"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    <div className="font-bold text-amber-800">
                      ⚖️ {t('Point de décision', 'Decision Point')}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {design.decisionPoint.metric.label[lang]}{' '}
                      {design.decisionPoint.threshold}
                      {design.decisionPoint.metric.unit}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {t('Évaluation à', 'Assessment at')}{' '}
                      {design.decisionPoint.timing[lang]}
                    </div>
                  </div>
                </div>

                {/* Responder / Non-responder paths */}
                <div className="grid grid-cols-2 gap-8 mb-4">
                  {/* Responder */}
                  <div className="text-center">
                    <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-3">
                      ✅ {t('Répondeur', 'Responder')} (≥{threshold}
                      {respClassifier.unit})
                    </div>
                    <div className="grid gap-2">
                      {design.stage2.responderPaths.map((path) => (
                        <div
                          key={path.id}
                          className="p-3 bg-green-50 rounded-lg border border-green-200 text-sm"
                        >
                          <span className="font-medium text-green-700">
                            {path.id}: {path.label[lang]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Non-responder */}
                  <div className="text-center">
                    <div className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-bold mb-3">
                      ❌ {t('Non-répondeur', 'Non-responder')} (&lt;{threshold}
                      {respClassifier.unit})
                    </div>
                    <div className="grid gap-2">
                      {design.stage2.nonResponderPaths.map((path) => (
                        <div
                          key={path.id}
                          className="p-3 bg-red-50 rounded-lg border border-red-200 text-sm"
                        >
                          <span className="font-medium text-red-700">
                            {path.id}: {path.label[lang]}
                          </span>
                          {path.additionalStrategies && (
                            <div className="text-xs text-gray-500 mt-1">
                              + {path.additionalStrategies.join(', ')}
                            </div>
                          )}
                          {path.newStrategy && (
                            <div className="text-xs text-gray-500 mt-1">
                              → {path.newStrategy}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stage 2 info */}
                <div className="flex justify-center mt-4">
                  <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
                    {t('Étape 2:', 'Stage 2:')} {design.stage2.duration}{' '}
                    {t('semaines supplémentaires', 'additional weeks')} →{' '}
                    {t('Évaluation finale', 'Final assessment')}
                  </div>
                </div>

                {/* DTR count */}
                <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200 text-center">
                  <span className="text-3xl font-bold text-purple-700">
                    {design.stage1.arms.length *
                      design.stage2.responderPaths.length *
                      design.stage2.nonResponderPaths.length}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {t(
                      'DTR (Dynamic Treatment Regimens) intégrés dans ce design',
                      'embedded DTRs (Dynamic Treatment Regimens) in this design'
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============ RULES TAB ============ */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          {/* Empty state */}
          {!design && (
            <div className="text-center p-12 bg-white rounded-xl border">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-gray-500">
                {t("Construisez d'abord le design", 'Build the design first')}
              </p>
            </div>
          )}

          {/* Decision rule cards */}
          {design &&
            design.decisionRules.map((rule) => {
              const isResponder = rule.condition.response === 'responder';
              return (
                <div
                  key={rule.id}
                  className={
                    'p-4 rounded-xl border-l-4 bg-white shadow-sm ' +
                    (isResponder ? 'border-green-500' : 'border-red-500')
                  }
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-sm font-bold text-gray-800">
                        {rule.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-2 flex gap-3">
                        <span>
                          {t('Bras:', 'Arm:')}{' '}
                          <strong>{rule.condition.arm}</strong>
                        </span>
                        <span>
                          {t('Réponse:', 'Response:')}{' '}
                          <strong
                            className={
                              isResponder ? 'text-green-600' : 'text-red-600'
                            }
                          >
                            {rule.condition.response}
                          </strong>
                        </span>
                        <span>
                          {t('Action:', 'Action:')}{' '}
                          <strong className="text-purple-600">
                            {rule.action.action}
                          </strong>
                        </span>
                        <span>
                          {t('Intensité:', 'Intensity:')} {rule.action.intensity}
                        </span>
                      </div>
                    </div>
                    <span
                      className={
                        'px-2 py-1 rounded text-xs font-bold ' +
                        (isResponder
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700')
                      }
                    >
                      {rule.condition.operator}
                      {rule.condition.threshold}
                      {rule.condition.unit}
                    </span>
                  </div>
                </div>
              );
            })}

          {/* Protocol note */}
          {design && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-sm text-gray-600">
                💡{' '}
                {t(
                  "Ces règles de décision formalisées constituent le protocole adaptatif. Elles doivent être pré-enregistrées avant le début de l'essai (ex: clinicaltrials.gov) et respectées strictement pendant l'implémentation.",
                  'These formalized decision rules constitute the adaptive protocol. They must be pre-registered before the trial begins (e.g., clinicaltrials.gov) and strictly followed during implementation.'
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ============ SIMULATE TAB ============ */}
      {activeTab === 'simulate' && (
        <div className="space-y-6">
          {/* No design yet */}
          {!design && (
            <div className="text-center p-12 bg-white rounded-xl border">
              <div className="text-4xl mb-4">🎲</div>
              <p className="text-gray-500">
                {t("Construisez d'abord le design", 'Build the design first')}
              </p>
            </div>
          )}

          {/* Design built but no simulation yet */}
          {design && !simResult && (
            <div className="text-center p-8 bg-white rounded-xl border">
              <div className="text-4xl mb-4">🎲</div>
              <p className="text-gray-600 mb-4">
                {t(
                  'Simuler 1000 itérations Monte Carlo pour comparer les DTR',
                  'Run 1000 Monte Carlo iterations to compare DTRs'
                )}
              </p>
              <button
                onClick={handleSimulate}
                className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 shadow-lg transition-all hover:scale-105"
              >
                🎲 {t('Lancer la simulation', 'Run simulation')}
              </button>
            </div>
          )}

          {/* Simulation results */}
          {simResult && (
            <div>
              {/* Best DTR banner */}
              <div className="p-6 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl shadow-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider opacity-80 mb-1">
                      🏆 {t('Meilleur DTR identifié', 'Best DTR identified')}
                    </div>
                    <div className="text-xl font-bold">
                      {lang === 'fr'
                        ? simResult.bestDTR.labelFr
                        : simResult.bestDTR.label}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">
                      {simResult.bestDTR.mean}%
                    </div>
                    <div className="text-xs opacity-80">
                      {t('outcome moyen', 'mean outcome')} (n=
                      {simResult.simulationCount})
                    </div>
                  </div>
                </div>
              </div>

              {/* DTR comparison bars */}
              <div className="space-y-3">
                {simResult.embeddedDTRs.map((dtr, i) => {
                  const isFirst = i === 0;
                  return (
                    <div
                      key={dtr.id}
                      className={
                        'p-4 rounded-xl border shadow-sm ' +
                        (isFirst
                          ? 'bg-purple-50 border-purple-300'
                          : 'bg-white')
                      }
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {isFirst && <span className="text-lg">🏆</span>}
                          <span className="font-bold text-gray-800">
                            {lang === 'fr' ? dtr.labelFr : dtr.label}
                          </span>
                        </div>
                        <span
                          className={
                            'text-xl font-bold ' +
                            (isFirst ? 'text-purple-700' : 'text-gray-600')
                          }
                        >
                          {dtr.mean}%
                        </span>
                      </div>

                      {/* Bar visualization */}
                      <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden mb-2">
                        <div
                          className="absolute left-0 top-0 h-full rounded-lg opacity-20"
                          style={{
                            width: dtr.p75 + '%',
                            backgroundColor: isFirst ? '#7c3aed' : '#9ca3af'
                          }}
                        />
                        <div
                          className="absolute left-0 top-0 h-full rounded-lg opacity-40"
                          style={{
                            width: dtr.median + '%',
                            backgroundColor: isFirst ? '#7c3aed' : '#9ca3af'
                          }}
                        />
                        <div
                          className="absolute left-0 top-0 h-full rounded-lg"
                          style={{
                            width: dtr.mean + '%',
                            backgroundColor: isFirst ? '#7c3aed' : '#6b7280',
                            opacity: 0.6
                          }}
                        />
                        <div className="absolute top-1 right-2 text-xs text-gray-600">
                          P25={dtr.p25} | P50={dtr.median} | P75={dtr.p75} | SD=
                          {dtr.sd}
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>
                          {t('Taux répondeurs:', 'Responder rate:')}{' '}
                          {dtr.responderRate}%
                        </span>
                        <span>
                          {t('Coût x', 'Cost x')}
                          {dtr.costMultiplier}
                        </span>
                        <span>
                          {t('Efficience:', 'Efficiency:')}{' '}
                          {Math.round(dtr.mean / dtr.costMultiplier)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Re-run button */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleSimulate}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  🔄 {t('Relancer (nouvelles données aléatoires)', 'Re-run (new random data)')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============ SAMPLE SIZE TAB ============ */}
      {activeTab === 'sample' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">
              📊{' '}
              {t(
                "Estimation de la taille d'échantillon pour SMART",
                'SMART Sample Size Estimation'
              )}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {t(
                "Formule simplifiée d'Almirall et al. (2014) pour la comparaison de 2 DTR",
                'Simplified formula from Almirall et al. (2014) for comparing 2 DTRs'
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Effect size slider */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  {t(
                    "Taille d'effet attendue (d de Cohen)",
                    "Expected effect size (Cohen's d)"
                  )}
                </label>
                <input
                  type="range"
                  min="0.10"
                  max="0.80"
                  step="0.05"
                  value={effectSize}
                  onChange={(e) => setEffectSize(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-center font-bold text-purple-700 mt-1">
                  {effectSize.toFixed(2)}
                </div>
                <div className="text-xs text-gray-400 text-center">
                  {effectSize <= 0.2
                    ? t('Petit', 'Small')
                    : effectSize <= 0.5
                      ? t('Moyen', 'Medium')
                      : t('Grand', 'Large')}
                </div>
              </div>

              {/* Responder rate slider */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  {t('Taux de répondeurs attendu', 'Expected responder rate')}
                </label>
                <input
                  type="range"
                  min="0.20"
                  max="0.80"
                  step="0.05"
                  value={respRate}
                  onChange={(e) => setRespRate(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-center font-bold text-purple-700 mt-1">
                  {Math.round(respRate * 100)}%
                </div>
              </div>

              {/* Calculate button */}
              <div className="flex items-end">
                <button
                  onClick={handleSampleSize}
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700"
                >
                  📊 {t('Calculer', 'Calculate')}
                </button>
              </div>
            </div>

            {/* Sample size results */}
            {sampleSize && (
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white rounded-xl shadow">
                    <div className="text-4xl font-bold text-purple-700">
                      {sampleSize.totalN}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('Taille totale (N)', 'Total sample (N)')}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow">
                    <div className="text-4xl font-bold text-blue-700">
                      {sampleSize.perArm}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('Par bras', 'Per arm')}
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="p-2 bg-white rounded-lg">
                    <strong>α</strong> = 0.05
                  </div>
                  <div className="p-2 bg-white rounded-lg">
                    <strong>{t('Puissance', 'Power')}</strong> ={' '}
                    {Math.round(sampleSize.power * 100)}%
                  </div>
                  <div className="p-2 bg-white rounded-lg">
                    <strong>d</strong> = {sampleSize.effectSize}
                  </div>
                </div>
                <p className="text-xs text-amber-700 mt-4 p-2 bg-amber-50 rounded-lg">
                  ⚠️ {sampleSize.note}
                </p>
              </div>
            )}
          </div>

          {/* Citations footer */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs text-gray-500">
              📚 <strong>Citations:</strong> Almirall D et al. (2014).{' '}
              <em>Drug &amp; Alcohol Dependence</em>, 138:36-46 &bull; Kilbourne AM
              et al. (2018). <em>Implementation Science</em>, 13:31 &bull; Collins
              LM et al. (2014). <em>Health Psychology</em>, 33(5):465-474 &bull;
              Generated by MOUDAR&reg; v11.0
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
