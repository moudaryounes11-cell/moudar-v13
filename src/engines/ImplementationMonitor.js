var ImplementationMonitor = function () {
  'use strict';

  // KPIs standards pour l'implémentation
  var standardKPIs = {
    // Proctor Outcomes
    "adoption_rate": {
      label: {
        fr: "Taux d'adoption",
        en: "Adoption Rate"
      },
      unit: "%",
      target: 80,
      warning: 60,
      critical: 40,
      category: "proctor",
      icon: "📈"
    },
    "fidelity_score": {
      label: {
        fr: "Score de fidélité",
        en: "Fidelity Score"
      },
      unit: "%",
      target: 85,
      warning: 70,
      critical: 50,
      category: "proctor",
      icon: "🎯"
    },
    "reach": {
      label: {
        fr: "Portée (bénéficiaires)",
        en: "Reach (beneficiaries)"
      },
      unit: "n",
      target: null,
      warning: null,
      critical: null,
      category: "reaim",
      icon: "👥"
    },
    "acceptability": {
      label: {
        fr: "Acceptabilité",
        en: "Acceptability"
      },
      unit: "%",
      target: 75,
      warning: 60,
      critical: 40,
      category: "proctor",
      icon: "👍"
    },
    // Ressources
    "budget_spent": {
      label: {
        fr: "Budget consommé",
        en: "Budget Spent"
      },
      unit: "%",
      target: null,
      warning: 90,
      critical: 100,
      category: "resources",
      icon: "💰"
    },
    "staff_trained": {
      label: {
        fr: "Personnel formé",
        en: "Staff Trained"
      },
      unit: "n",
      target: null,
      warning: null,
      critical: null,
      category: "capacity",
      icon: "🎓"
    },
    // Temps
    "timeline_progress": {
      label: {
        fr: "Avancement timeline",
        en: "Timeline Progress"
      },
      unit: "%",
      target: null,
      warning: null,
      critical: null,
      category: "time",
      icon: "📅"
    },
    "milestones_completed": {
      label: {
        fr: "Jalons complétés",
        en: "Milestones Completed"
      },
      unit: "n",
      target: null,
      warning: null,
      critical: null,
      category: "time",
      icon: "✅"
    }
  };

  /**
   * Crée un nouveau monitoring pour un projet
   */
  function createMonitoring(projectId, predictions) {
    return {
      projectId: projectId,
      predictions: predictions || {},
      dataPoints: [],
      alerts: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Enregistre une mesure pour un KPI
   */
  function recordDataPoint(monitoring, kpiId, value, metadata) {
    metadata = metadata || {};
    var dataPoint = {
      id: 'DP_' + Date.now(),
      kpiId: kpiId,
      value: value,
      timestamp: metadata.timestamp || new Date().toISOString(),
      source: metadata.source || 'manual',
      notes: metadata.notes || '',
      recordedBy: metadata.recordedBy || 'unknown'
    };
    monitoring.dataPoints.push(dataPoint);
    monitoring.updatedAt = new Date().toISOString();

    // Vérifier les alertes
    checkAlerts(monitoring, kpiId, value);
    return dataPoint;
  }

  /**
   * Vérifie si une valeur déclenche une alerte
   */
  function checkAlerts(monitoring, kpiId, value) {
    var kpiConfig = standardKPIs[kpiId];
    if (!kpiConfig) return;
    var alert = null;
    if (kpiConfig.critical !== null && value <= kpiConfig.critical) {
      alert = {
        id: 'ALERT_' + Date.now(),
        kpiId: kpiId,
        level: 'critical',
        value: value,
        threshold: kpiConfig.critical,
        timestamp: new Date().toISOString(),
        message: kpiConfig.label.fr + ' critique: ' + value + kpiConfig.unit
      };
    } else if (kpiConfig.warning !== null && value <= kpiConfig.warning) {
      alert = {
        id: 'ALERT_' + Date.now(),
        kpiId: kpiId,
        level: 'warning',
        value: value,
        threshold: kpiConfig.warning,
        timestamp: new Date().toISOString(),
        message: kpiConfig.label.fr + ' en vigilance: ' + value + kpiConfig.unit
      };
    }
    if (alert) {
      monitoring.alerts.push(alert);
    }
    return alert;
  }

  /**
   * Calcule l'écart entre prédictions et réalité
   */
  function calculateVariance(monitoring, kpiId) {
    var prediction = monitoring.predictions[kpiId];
    if (!prediction) return null;
    var latestData = getLatestValue(monitoring, kpiId);
    if (latestData === null) return null;
    var variance = latestData - prediction;
    var variancePercent = variance / prediction * 100;
    return {
      kpiId: kpiId,
      predicted: prediction,
      actual: latestData,
      variance: variance,
      variancePercent: variancePercent,
      status: variancePercent >= -10 ? 'on_track' : variancePercent >= -25 ? 'warning' : 'critical'
    };
  }

  /**
   * Récupère la dernière valeur d'un KPI
   */
  function getLatestValue(monitoring, kpiId) {
    var kpiData = monitoring.dataPoints.filter(function (dp) {
      return dp.kpiId === kpiId;
    }).sort(function (a, b) {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    return kpiData.length > 0 ? kpiData[0].value : null;
  }

  /**
   * Génère l'historique d'un KPI pour graphique
   */
  function getKPIHistory(monitoring, kpiId, limit) {
    limit = limit || 30;
    return monitoring.dataPoints.filter(function (dp) {
      return dp.kpiId === kpiId;
    }).sort(function (a, b) {
      return new Date(a.timestamp) - new Date(b.timestamp);
    }).slice(-limit).map(function (dp) {
      return {
        date: dp.timestamp.split('T')[0],
        value: dp.value
      };
    });
  }

  /**
   * Génère un tableau de bord complet
   */
  function generateDashboard(monitoring, lang) {
    lang = lang || 'fr';
    var dashboard = {
      projectId: monitoring.projectId,
      generatedAt: new Date().toISOString(),
      summary: {
        totalDataPoints: monitoring.dataPoints.length,
        activeAlerts: monitoring.alerts.filter(function (a) {
          return !a.resolved;
        }).length,
        kpisTracked: function () {
          var uniqueKpis = {};
          monitoring.dataPoints.forEach(function (dp) {
            uniqueKpis[dp.kpiId] = true;
          });
          return Object.keys(uniqueKpis).length;
        }()
      },
      kpis: [],
      alerts: monitoring.alerts.slice(-10),
      variances: []
    };

    // Calculer le statut de chaque KPI
    for (var kpiId in standardKPIs) {
      var kpiConfig = standardKPIs[kpiId];
      var latest = getLatestValue(monitoring, kpiId);
      var variance = calculateVariance(monitoring, kpiId);
      dashboard.kpis.push({
        id: kpiId,
        label: kpiConfig.label[lang] || kpiConfig.label.fr,
        icon: kpiConfig.icon,
        unit: kpiConfig.unit,
        target: kpiConfig.target,
        current: latest,
        status: latest === null ? 'no_data' : kpiConfig.target && latest >= kpiConfig.target ? 'achieved' : kpiConfig.warning && latest <= kpiConfig.warning ? 'warning' : kpiConfig.critical && latest <= kpiConfig.critical ? 'critical' : 'on_track',
        history: getKPIHistory(monitoring, kpiId, 10)
      });
      if (variance) {
        dashboard.variances.push(variance);
      }
    }

    // Score global d'implémentation
    var achievedKPIs = dashboard.kpis.filter(function (k) {
      return k.status === 'achieved' || k.status === 'on_track';
    }).length;
    var trackedKPIs = dashboard.kpis.filter(function (k) {
      return k.status !== 'no_data';
    }).length;
    dashboard.summary.implementationScore = trackedKPIs > 0 ? Math.round(achievedKPIs / trackedKPIs * 100) : 0;
    return dashboard;
  }

  /**
   * Génère des recommandations adaptatives basées sur les écarts
   */
  function generateAdaptiveRecommendations(monitoring, lang) {
    lang = lang || 'fr';
    var recommendations = [];
    for (var kpiId in standardKPIs) {
      var variance = calculateVariance(monitoring, kpiId);
      if (!variance || variance.status === 'on_track') continue;
      var kpiConfig = standardKPIs[kpiId];
      if (variance.status === 'critical') {
        recommendations.push({
          priority: 'critical',
          kpiId: kpiId,
          kpiLabel: kpiConfig.label[lang],
          title: lang === 'fr' ? '🔴 Écart critique sur ' + kpiConfig.label.fr : '🔴 Critical gap on ' + kpiConfig.label.en,
          description: lang === 'fr' ? 'Prédit: ' + variance.predicted + kpiConfig.unit + ' | Réel: ' + variance.actual + kpiConfig.unit + ' (' + Math.round(variance.variancePercent) + '%)' : 'Predicted: ' + variance.predicted + kpiConfig.unit + ' | Actual: ' + variance.actual + kpiConfig.unit + ' (' + Math.round(variance.variancePercent) + '%)',
          action: getAdaptiveAction(kpiId, variance, lang)
        });
      } else if (variance.status === 'warning') {
        recommendations.push({
          priority: 'warning',
          kpiId: kpiId,
          kpiLabel: kpiConfig.label[lang],
          title: lang === 'fr' ? '🟠 Vigilance sur ' + kpiConfig.label.fr : '🟠 Watch ' + kpiConfig.label.en,
          description: lang === 'fr' ? 'Écart de ' + Math.round(variance.variancePercent) + '% par rapport aux prévisions' : Math.round(variance.variancePercent) + '% gap from predictions',
          action: getAdaptiveAction(kpiId, variance, lang)
        });
      }
    }
    return recommendations.sort(function (a, b) {
      var priorityOrder = {
        critical: 0,
        warning: 1
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  /**
   * Génère une action adaptative pour un KPI spécifique
   */
  function getAdaptiveAction(kpiId, variance, lang) {
    var actions = {
      "adoption_rate": {
        fr: "Intensifier la formation et identifier de nouveaux champions locaux",
        en: "Intensify training and identify new local champions"
      },
      "fidelity_score": {
        fr: "Renforcer la supervision et simplifier les protocoles si nécessaire",
        en: "Strengthen supervision and simplify protocols if necessary"
      },
      "budget_spent": {
        fr: "Réviser le budget et identifier les sources de surcoût",
        en: "Review budget and identify cost overrun sources"
      },
      "acceptability": {
        fr: "Organiser des sessions d'écoute avec les utilisateurs",
        en: "Organize listening sessions with users"
      }
    };
    var action = actions[kpiId];
    return action ? action[lang] || action.fr : lang === 'fr' ? 'Analyser les causes et ajuster la stratégie' : 'Analyze causes and adjust strategy';
  }

  /**
   * Crée des données de démo pour illustration
   */
  function createDemoMonitoring(projectId, predictions) {
    var monitoring = createMonitoring(projectId, predictions || {
      adoption_rate: 75,
      fidelity_score: 80,
      reach: 500,
      acceptability: 70
    });

    // Simuler 6 mois de données
    var months = ['2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];
    var adoptionValues = [15, 35, 52, 61, 68, 72];
    var fidelityValues = [60, 72, 78, 75, 80, 82];
    var reachValues = [50, 120, 210, 320, 410, 485];
    months.forEach(function (month, i) {
      recordDataPoint(monitoring, 'adoption_rate', adoptionValues[i], {
        timestamp: month + '-15T10:00:00Z'
      });
      recordDataPoint(monitoring, 'fidelity_score', fidelityValues[i], {
        timestamp: month + '-15T10:00:00Z'
      });
      recordDataPoint(monitoring, 'reach', reachValues[i], {
        timestamp: month + '-15T10:00:00Z'
      });
    });
    return monitoring;
  }
  return {
    VERSION: '8.5.0',
    createMonitoring: createMonitoring,
    recordDataPoint: recordDataPoint,
    calculateVariance: calculateVariance,
    getLatestValue: getLatestValue,
    getKPIHistory: getKPIHistory,
    generateDashboard: generateDashboard,
    generateAdaptiveRecommendations: generateAdaptiveRecommendations,
    createDemoMonitoring: createDemoMonitoring,
    getStandardKPIs: function () {
      return standardKPIs;
    }
  };
}();

export default ImplementationMonitor;
