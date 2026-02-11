var DemoGuide = function () {
  'use strict';

  var currentStep = 0;
  var isRunning = false;
  var callbacks = {
    onStep: null,
    onComplete: null
  };

  // Étapes de la démo guidée (3 minutes)
  var demoSteps = {
    fr: [{
      id: 'welcome',
      title: '🎯 Bienvenue dans MOUDAR v8.5',
      description: 'Plateforme de Science de l\'Implémentation pour gouvernements et ONG',
      action: 'overview',
      duration: 5000
    }, {
      id: 'load_project',
      title: '📋 Chargement du projet démo',
      description: 'INNOV5-MH-MAROC : 5 innovations OMS intégrées au Maroc',
      action: 'load_demo_project',
      duration: 4000
    }, {
      id: 'analysis',
      title: '🔬 Analyse IA des barrières',
      description: 'Détection automatique des barrières d\'implémentation via CFIR 2.0',
      action: 'show_analysis',
      duration: 6000
    }, {
      id: 'tornado',
      title: '🌪️ Analyse de sensibilité Tornado',
      description: 'Quelle barrière a le plus d\'impact sur le succès ?',
      action: 'show_tornado',
      duration: 6000
    }, {
      id: 'monitoring',
      title: '📈 Tableau de bord de suivi',
      description: 'Comparez les prédictions Monte Carlo avec les données réelles',
      action: 'show_monitoring',
      duration: 6000
    }, {
      id: 'adaptive',
      title: '🔄 Boucle adaptative',
      description: 'KPI dévie → Alerte → Recommandation → Action → KPI corrigé',
      action: 'show_adaptive_loop',
      duration: 7000
    }, {
      id: 'geomap',
      title: '🗺️ Cartographie des sites',
      description: 'Visualisez les performances par région et identifiez les disparités',
      action: 'show_geomap',
      duration: 5000
    }, {
      id: 'scaling',
      title: '📐 Simulation de mise à l\'échelle',
      description: 'Passez de 5 sites pilotes à 100 sites nationaux',
      action: 'show_scaling',
      duration: 6000
    }, {
      id: 'export',
      title: '📊 Export PowerPoint',
      description: 'Générez une présentation professionnelle en 1 clic',
      action: 'show_export',
      duration: 4000
    }, {
      id: 'complete',
      title: '✅ Démo terminée !',
      description: 'MOUDAR v8.5 : Du diagnostic au pilotage adaptatif',
      action: 'complete',
      duration: 3000
    }],
    en: [{
      id: 'welcome',
      title: '🎯 Welcome to MOUDAR v8.5',
      description: 'Implementation Science Platform for governments and NGOs',
      action: 'overview',
      duration: 5000
    }, {
      id: 'load_project',
      title: '📋 Loading demo project',
      description: 'INNOV5-MH-MOROCCO: 5 integrated WHO innovations in Morocco',
      action: 'load_demo_project',
      duration: 4000
    }, {
      id: 'analysis',
      title: '🔬 AI barrier analysis',
      description: 'Automatic detection of implementation barriers via CFIR 2.0',
      action: 'show_analysis',
      duration: 6000
    }, {
      id: 'tornado',
      title: '🌪️ Tornado sensitivity analysis',
      description: 'Which barrier has the most impact on success?',
      action: 'show_tornado',
      duration: 6000
    }, {
      id: 'monitoring',
      title: '📈 Monitoring dashboard',
      description: 'Compare Monte Carlo predictions with real data',
      action: 'show_monitoring',
      duration: 6000
    }, {
      id: 'adaptive',
      title: '🔄 Adaptive loop',
      description: 'KPI deviates → Alert → Recommendation → Action → KPI corrected',
      action: 'show_adaptive_loop',
      duration: 7000
    }, {
      id: 'geomap',
      title: '🗺️ Site mapping',
      description: 'Visualize performance by region and identify disparities',
      action: 'show_geomap',
      duration: 5000
    }, {
      id: 'scaling',
      title: '📐 Scaling simulation',
      description: 'Scale from 5 pilot sites to 100 national sites',
      action: 'show_scaling',
      duration: 6000
    }, {
      id: 'export',
      title: '📊 PowerPoint export',
      description: 'Generate a professional presentation in 1 click',
      action: 'show_export',
      duration: 4000
    }, {
      id: 'complete',
      title: '✅ Demo complete!',
      description: 'MOUDAR v8.5: From diagnosis to adaptive management',
      action: 'complete',
      duration: 3000
    }]
  };

  // Badges de simulation avec explications
  var simulationBadges = {
    kpi_data: {
      label: {
        fr: 'Données simulées',
        en: 'Simulated data'
      },
      tooltip: {
        fr: 'Ces KPIs sont générés pour la démo. En production, connectez DHIS2 ou saisissez vos données réelles.',
        en: 'These KPIs are generated for demo. In production, connect DHIS2 or enter your real data.'
      },
      color: 'amber'
    },
    network_analysis: {
      label: {
        fr: 'Heuristique rapide',
        en: 'Fast heuristic'
      },
      tooltip: {
        fr: 'La centralité betweenness est une approximation. Algorithme exact disponible avec plus de données.',
        en: 'Betweenness centrality is an approximation. Exact algorithm available with more data.'
      },
      color: 'blue'
    },
    scaling_model: {
      label: {
        fr: 'Modèle paramétrique',
        en: 'Parametric model'
      },
      tooltip: {
        fr: 'Simulation basée sur des facteurs standards. Calibration possible avec vos données historiques.',
        en: 'Simulation based on standard factors. Calibration possible with your historical data.'
      },
      color: 'purple'
    },
    monte_carlo: {
      label: {
        fr: 'Simulation Monte Carlo',
        en: 'Monte Carlo simulation'
      },
      tooltip: {
        fr: '1000 itérations pour estimer la probabilité de succès.',
        en: '1000 iterations to estimate success probability.'
      },
      color: 'green'
    },
    dhis2_demo: {
      label: {
        fr: 'Mode démo DHIS2',
        en: 'DHIS2 demo mode'
      },
      tooltip: {
        fr: 'Données simulées. La connexion réelle nécessite un proxy backend (CORS).',
        en: 'Simulated data. Real connection requires backend proxy (CORS).'
      },
      color: 'teal'
    }
  };

  /**
   * Démarre la démo guidée
   */
  function startDemo(lang, onStepCallback) {
    lang = lang || 'fr';
    currentStep = 0;
    isRunning = true;
    callbacks.onStep = onStepCallback;
    console.log('[DemoGuide] 🎬 Démarrage de la démo guidée');
    runStep(lang);
  }

  /**
   * Exécute une étape de la démo
   */
  function runStep(lang) {
    if (!isRunning) return;
    var steps = demoSteps[lang] || demoSteps.fr;
    if (currentStep >= steps.length) {
      isRunning = false;
      if (callbacks.onComplete) callbacks.onComplete();
      return;
    }
    var step = steps[currentStep];
    console.log('[DemoGuide] Étape ' + (currentStep + 1) + '/' + steps.length + ': ' + step.title);
    if (callbacks.onStep) {
      callbacks.onStep({
        step: currentStep,
        total: steps.length,
        data: step,
        progress: Math.round(currentStep / steps.length * 100)
      });
    }
    currentStep++;

    // Passer à l'étape suivante après la durée
    setTimeout(function () {
      runStep(lang);
    }, step.duration);
  }

  /**
   * Arrête la démo
   */
  function stopDemo() {
    isRunning = false;
    currentStep = 0;
    console.log('[DemoGuide] ⏹️ Démo arrêtée');
  }

  /**
   * Saute à une étape spécifique
   */
  function goToStep(stepIndex, lang) {
    lang = lang || 'fr';
    var steps = demoSteps[lang] || demoSteps.fr;
    if (stepIndex >= 0 && stepIndex < steps.length) {
      currentStep = stepIndex;
      if (callbacks.onStep) {
        callbacks.onStep({
          step: currentStep,
          total: steps.length,
          data: steps[currentStep],
          progress: Math.round(currentStep / steps.length * 100)
        });
      }
    }
  }

  /**
   * Génère le HTML d'un badge de simulation
   */
  function getBadgeHTML(badgeType, lang) {
    lang = lang || 'fr';
    var badge = simulationBadges[badgeType];
    if (!badge) return '';
    var colors = {
      amber: 'bg-amber-100 text-amber-700 border-amber-300',
      blue: 'bg-blue-100 text-blue-700 border-blue-300',
      purple: 'bg-purple-100 text-purple-700 border-purple-300',
      green: 'bg-green-100 text-green-700 border-green-300',
      teal: 'bg-teal-100 text-teal-700 border-teal-300'
    };
    return '<span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ' + colors[badge.color] + '" title="' + badge.tooltip[lang] + '">⚡ ' + badge.label[lang] + '</span>';
  }

  /**
   * Données pour le widget Closed-Loop Adaptatif
   */
  function getClosedLoopDemo(lang) {
    lang = lang || 'fr';
    return {
      title: lang === 'fr' ? 'Boucle de Pilotage Adaptatif' : 'Adaptive Management Loop',
      steps: [{
        icon: '📊',
        label: lang === 'fr' ? 'KPI dévie' : 'KPI deviates',
        detail: lang === 'fr' ? 'Adoption: 68% (prédit: 75%)' : 'Adoption: 68% (predicted: 75%)',
        status: 'alert'
      }, {
        icon: '🚨',
        label: lang === 'fr' ? 'Alerte générée' : 'Alert generated',
        detail: lang === 'fr' ? 'Écart -9.3% détecté' : '-9.3% gap detected',
        status: 'warning'
      }, {
        icon: '💡',
        label: lang === 'fr' ? 'Recommandation IA' : 'AI recommendation',
        detail: lang === 'fr' ? 'Intensifier formation champions locaux' : 'Intensify local champion training',
        status: 'action'
      }, {
        icon: '✅',
        label: lang === 'fr' ? 'Action implémentée' : 'Action implemented',
        detail: lang === 'fr' ? '3 sessions de coaching ajoutées' : '3 coaching sessions added',
        status: 'done'
      }, {
        icon: '📈',
        label: lang === 'fr' ? 'KPI corrigé' : 'KPI corrected',
        detail: lang === 'fr' ? 'Adoption: 76% (+8%)' : 'Adoption: 76% (+8%)',
        status: 'success'
      }]
    };
  }

  /**
   * Légende pour GeoMap
   */
  function getGeoMapLegend(lang) {
    lang = lang || 'fr';
    return [{
      color: '#22C55E',
      label: lang === 'fr' ? 'Succès (>80%)' : 'Success (>80%)',
      status: 'success'
    }, {
      color: '#3B82F6',
      label: lang === 'fr' ? 'En cours (60-80%)' : 'On track (60-80%)',
      status: 'on_track'
    }, {
      color: '#F59E0B',
      label: lang === 'fr' ? 'Vigilance (40-60%)' : 'Warning (40-60%)',
      status: 'warning'
    }, {
      color: '#EF4444',
      label: lang === 'fr' ? 'Critique (<40%)' : 'Critical (<40%)',
      status: 'critical'
    }];
  }

  /**
   * Filtres pour GeoMap
   */
  function getGeoMapFilters(lang) {
    lang = lang || 'fr';
    return [{
      id: 'all',
      label: lang === 'fr' ? 'Tous les sites' : 'All sites'
    }, {
      id: 'urban',
      label: lang === 'fr' ? '🏙️ Urbain' : '🏙️ Urban'
    }, {
      id: 'rural',
      label: lang === 'fr' ? '🌾 Rural' : '🌾 Rural'
    }, {
      id: 'critical',
      label: lang === 'fr' ? '🔴 Critiques seulement' : '🔴 Critical only'
    }];
  }

  /**
   * Retourne l'état de la démo
   */
  function getStatus() {
    return {
      isRunning: isRunning,
      currentStep: currentStep,
      totalSteps: demoSteps.fr.length
    };
  }
  return {
    VERSION: '8.5.0',
    startDemo: startDemo,
    stopDemo: stopDemo,
    goToStep: goToStep,
    getStatus: getStatus,
    getBadgeHTML: getBadgeHTML,
    getClosedLoopDemo: getClosedLoopDemo,
    getGeoMapLegend: getGeoMapLegend,
    getGeoMapFilters: getGeoMapFilters,
    getSimulationBadges: function () {
      return simulationBadges;
    },
    getDemoSteps: function (lang) {
      return demoSteps[lang] || demoSteps.fr;
    }
  };
}();

export default DemoGuide;
