var PortfolioManager = function () {
  'use strict';

  /**
   * Agrège les données de tous les projets d'une organisation
   */
  function aggregatePortfolio(projects, options) {
    options = options || {};
    var lang = options.lang || 'fr';
    if (!projects || projects.length === 0) {
      return {
        totalProjects: 0,
        summary: null,
        riskMap: [],
        recommendations: []
      };
    }

    // Calculs agrégés
    var totalProjects = projects.length;
    var projectsWithProtocol = projects.filter(function (p) {
      return p.protocol;
    }).length;

    // Analyse de risque par projet
    var riskAnalyses = [];
    var allBarriers = {};
    var domainCounts = {};
    var phaseCounts = {};
    projects.forEach(function (project) {
      // Analyse de sensibilité
      var sensitivity = SensitivityAnalyzer.runTornadoAnalysis(project, lang);
      riskAnalyses.push({
        projectId: project.id,
        projectTitle: project.title,
        domain: project.domain,
        phase: project.phase,
        successProbability: sensitivity.baseSuccessPercent,
        riskLevel: sensitivity.baseSuccessPercent < 40 ? "critical" : sensitivity.baseSuccessPercent < 60 ? "high" : sensitivity.baseSuccessPercent < 75 ? "medium" : "low",
        topBarrier: sensitivity.topBarrier ? sensitivity.topBarrier.barrierName : null,
        criticalBarriersCount: sensitivity.criticalBarriers.length
      });

      // Comptage des barrières
      (project.barriers || []).forEach(function (barrier) {
        allBarriers[barrier] = (allBarriers[barrier] || 0) + 1;
      });

      // Comptage par domaine
      domainCounts[project.domain] = (domainCounts[project.domain] || 0) + 1;

      // Comptage par phase
      phaseCounts[project.phase] = (phaseCounts[project.phase] || 0) + 1;
    });

    // Trier les projets par risque
    riskAnalyses.sort(function (a, b) {
      return a.successProbability - b.successProbability;
    });

    // Identifier les barrières les plus fréquentes
    var topBarriers = Object.entries(allBarriers).sort(function (a, b) {
      return b[1] - a[1];
    }).slice(0, 5).map(function (entry) {
      var labels = SensitivityAnalyzer.getBarrierLabels()[entry[0]] || {
        fr: entry[0],
        en: entry[0]
      };
      return {
        barrierId: entry[0],
        barrierName: labels[lang] || labels.fr,
        count: entry[1],
        percentage: Math.round(entry[1] / totalProjects * 100)
      };
    });

    // Recommandations portfolio
    var recommendations = generatePortfolioRecommendations(riskAnalyses, topBarriers, lang);

    // Score global du portfolio
    var avgSuccess = riskAnalyses.reduce(function (sum, r) {
      return sum + r.successProbability;
    }, 0) / totalProjects;
    var criticalCount = riskAnalyses.filter(function (r) {
      return r.riskLevel === "critical";
    }).length;
    return {
      totalProjects: totalProjects,
      projectsWithProtocol: projectsWithProtocol,
      averageSuccessRate: Math.round(avgSuccess),
      riskDistribution: {
        critical: riskAnalyses.filter(function (r) {
          return r.riskLevel === "critical";
        }).length,
        high: riskAnalyses.filter(function (r) {
          return r.riskLevel === "high";
        }).length,
        medium: riskAnalyses.filter(function (r) {
          return r.riskLevel === "medium";
        }).length,
        low: riskAnalyses.filter(function (r) {
          return r.riskLevel === "low";
        }).length
      },
      projectRisks: riskAnalyses,
      topBarriers: topBarriers,
      domainDistribution: domainCounts,
      phaseDistribution: phaseCounts,
      recommendations: recommendations,
      healthScore: calculatePortfolioHealth(avgSuccess, criticalCount, totalProjects),
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Génère des recommandations au niveau portfolio
   */
  function generatePortfolioRecommendations(riskAnalyses, topBarriers, lang) {
    var recommendations = [];

    // Recommandation si beaucoup de projets critiques
    var criticalCount = riskAnalyses.filter(function (r) {
      return r.riskLevel === "critical";
    }).length;
    if (criticalCount > 0) {
      recommendations.push({
        priority: "critical",
        type: "risk_mitigation",
        title: lang === 'fr' ? "Projets à risque critique" : "Critical risk projects",
        description: lang === 'fr' ? criticalCount + " projet(s) ont une probabilité de succès < 40%. Action immédiate requise." : criticalCount + " project(s) have success probability < 40%. Immediate action required.",
        action: lang === 'fr' ? "Revoir les ressources allouées et les stratégies de ces projets" : "Review allocated resources and strategies for these projects"
      });
    }

    // Recommandation basée sur les barrières fréquentes
    if (topBarriers.length > 0 && topBarriers[0].percentage > 50) {
      recommendations.push({
        priority: "high",
        type: "systemic_barrier",
        title: lang === 'fr' ? "Barrière systémique identifiée" : "Systemic barrier identified",
        description: lang === 'fr' ? "\"" + topBarriers[0].barrierName + "\" affecte " + topBarriers[0].percentage + "% des projets." : "\"" + topBarriers[0].barrierName + "\" affects " + topBarriers[0].percentage + "% of projects.",
        action: lang === 'fr' ? "Considérer une intervention au niveau organisationnel" : "Consider an organizational-level intervention"
      });
    }

    // Recommandation d'équilibrage des phases
    var implementationCount = riskAnalyses.filter(function (r) {
      return r.phase === "implementation";
    }).length;
    if (implementationCount > riskAnalyses.length * 0.6) {
      recommendations.push({
        priority: "medium",
        type: "phase_balance",
        title: lang === 'fr' ? "Déséquilibre des phases" : "Phase imbalance",
        description: lang === 'fr' ? "Trop de projets en phase d'implémentation simultanément." : "Too many projects in implementation phase simultaneously.",
        action: lang === 'fr' ? "Échelonner les lancements pour mieux répartir les ressources" : "Stagger launches to better distribute resources"
      });
    }
    return recommendations;
  }

  /**
   * Calcule un score de santé global du portfolio
   */
  function calculatePortfolioHealth(avgSuccess, criticalCount, totalProjects) {
    var score = avgSuccess;

    // Pénalité pour projets critiques
    score -= criticalCount / totalProjects * 20;

    // Normaliser entre 0 et 100
    score = Math.max(0, Math.min(100, score));
    return {
      score: Math.round(score),
      level: score >= 70 ? "healthy" : score >= 50 ? "moderate" : score >= 30 ? "at_risk" : "critical",
      label: {
        fr: score >= 70 ? "Sain" : score >= 50 ? "Modéré" : score >= 30 ? "À risque" : "Critique",
        en: score >= 70 ? "Healthy" : score >= 50 ? "Moderate" : score >= 30 ? "At risk" : "Critical"
      },
      color: score >= 70 ? "green" : score >= 50 ? "yellow" : score >= 30 ? "orange" : "red"
    };
  }

  /**
   * Génère les données pour une carte de risque géographique
   */
  function generateRiskMap(projects, regions) {
    var regionRisks = {};
    projects.forEach(function (project) {
      var region = project.region || project.geographicScope || "unknown";
      if (!regionRisks[region]) {
        regionRisks[region] = {
          projects: [],
          totalRisk: 0
        };
      }
      var sensitivity = SensitivityAnalyzer.runTornadoAnalysis(project, 'fr');
      regionRisks[region].projects.push({
        id: project.id,
        title: project.title,
        success: sensitivity.baseSuccessPercent
      });
      regionRisks[region].totalRisk += 100 - sensitivity.baseSuccessPercent;
    });

    // Calculer le risque moyen par région
    for (var region in regionRisks) {
      var data = regionRisks[region];
      data.averageRisk = Math.round(data.totalRisk / data.projects.length);
      data.riskLevel = data.averageRisk > 60 ? "critical" : data.averageRisk > 40 ? "high" : data.averageRisk > 20 ? "medium" : "low";
    }
    return regionRisks;
  }

  /**
   * Exporte le rapport portfolio en format structuré
   */
  function exportPortfolioReport(portfolio, format) {
    format = format || 'json';
    var report = {
      title: "MOUDAR Portfolio Analysis Report",
      generatedAt: new Date().toISOString(),
      summary: {
        totalProjects: portfolio.totalProjects,
        averageSuccess: portfolio.averageSuccessRate + "%",
        healthScore: portfolio.healthScore.score + "/100 (" + portfolio.healthScore.label.en + ")"
      },
      riskDistribution: portfolio.riskDistribution,
      topBarriers: portfolio.topBarriers,
      recommendations: portfolio.recommendations,
      projectDetails: portfolio.projectRisks
    };
    if (format === 'json') {
      return JSON.stringify(report, null, 2);
    }
    return report;
  }
  return {
    VERSION: '8.3.0',
    aggregatePortfolio: aggregatePortfolio,
    generateRiskMap: generateRiskMap,
    exportPortfolioReport: exportPortfolioReport,
    calculatePortfolioHealth: calculatePortfolioHealth
  };
}();

export default PortfolioManager;
