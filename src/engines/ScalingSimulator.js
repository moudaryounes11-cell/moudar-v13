var ScalingSimulator = function () {
  'use strict';

  // Facteurs de scaling par dimension
  var scalingFactors = {
    // Économies d'échelle (réduction des coûts unitaires)
    economiesOfScale: {
      training: {
        threshold: 100,
        reduction: 0.15
      },
      // -15% après 100 formés
      materials: {
        threshold: 1000,
        reduction: 0.25
      },
      // -25% après 1000 unités
      supervision: {
        threshold: 50,
        reduction: 0.10
      } // -10% après 50 sites
    },
    // Coûts additionnels du scaling
    scalingCosts: {
      coordination: 0.12,
      // +12% pour coordination inter-sites
      qualityAssurance: 0.08,
      // +8% pour assurance qualité
      monitoring: 0.10,
      // +10% pour système de suivi
      adaptation: 0.05 // +5% pour adaptation locale
    },
    // Risques de scaling
    scalingRisks: {
      fidelityDilution: {
        baseRisk: 0.15,
        perSiteFactor: 0.002
      },
      staffTurnover: {
        baseRisk: 0.20,
        perSiteFactor: 0.003
      },
      qualityVariance: {
        baseRisk: 0.18,
        perSiteFactor: 0.0025
      },
      coordinationBreakdown: {
        baseRisk: 0.12,
        perSiteFactor: 0.004
      },
      supplyChainIssues: {
        baseRisk: 0.10,
        perSiteFactor: 0.002
      }
    }
  };

  /**
   * Calcule le coût de mise à l'échelle
   */
  function calculateScalingCost(pilotData, targetScale) {
    var pilotCost = pilotData.totalCost || 100000;
    var pilotSites = pilotData.sites || 5;
    var pilotBeneficiaries = pilotData.beneficiaries || 500;
    var targetSites = targetScale.sites || 100;
    var targetBeneficiaries = targetScale.beneficiaries || 10000;

    // Coût unitaire pilote
    var costPerSite = pilotCost / pilotSites;
    var costPerBeneficiary = pilotCost / pilotBeneficiaries;

    // Appliquer les économies d'échelle
    var siteMultiplier = 1;
    var beneficiaryMultiplier = 1;
    if (targetSites > scalingFactors.economiesOfScale.supervision.threshold) {
      siteMultiplier = 1 - scalingFactors.economiesOfScale.supervision.reduction;
    }
    if (targetBeneficiaries > scalingFactors.economiesOfScale.training.threshold) {
      beneficiaryMultiplier = 1 - scalingFactors.economiesOfScale.training.reduction;
    }

    // Coût de base scalé
    var baseCost = costPerSite * siteMultiplier * targetSites + costPerBeneficiary * beneficiaryMultiplier * targetBeneficiaries * 0.3;

    // Ajouter les coûts additionnels de scaling
    var additionalCosts = {};
    var totalAdditional = 0;
    for (var costType in scalingFactors.scalingCosts) {
      var factor = scalingFactors.scalingCosts[costType];
      var amount = baseCost * factor;
      additionalCosts[costType] = amount;
      totalAdditional += amount;
    }
    var totalCost = baseCost + totalAdditional;
    return {
      baseCost: Math.round(baseCost),
      additionalCosts: additionalCosts,
      totalAdditional: Math.round(totalAdditional),
      totalCost: Math.round(totalCost),
      costPerSite: Math.round(totalCost / targetSites),
      costPerBeneficiary: Math.round(totalCost / targetBeneficiaries),
      scalingRatio: targetSites / pilotSites,
      economiesRealized: Math.round((1 - totalCost / (pilotCost * (targetSites / pilotSites))) * 100)
    };
  }

  /**
   * Évalue les risques de mise à l'échelle
   */
  function assessScalingRisks(pilotData, targetScale, lang) {
    lang = lang || 'fr';
    var targetSites = targetScale.sites || 100;
    var risks = [];
    for (var riskType in scalingFactors.scalingRisks) {
      var config = scalingFactors.scalingRisks[riskType];
      var riskLevel = Math.min(config.baseRisk + config.perSiteFactor * targetSites, 0.9);
      var riskLabels = {
        fidelityDilution: {
          fr: "Dilution de la fidélité",
          en: "Fidelity Dilution"
        },
        staffTurnover: {
          fr: "Rotation du personnel",
          en: "Staff Turnover"
        },
        qualityVariance: {
          fr: "Variance de qualité",
          en: "Quality Variance"
        },
        coordinationBreakdown: {
          fr: "Rupture de coordination",
          en: "Coordination Breakdown"
        },
        supplyChainIssues: {
          fr: "Problèmes logistiques",
          en: "Supply Chain Issues"
        }
      };
      var mitigations = {
        fidelityDilution: {
          fr: "Renforcer la supervision et les audits",
          en: "Strengthen supervision and audits"
        },
        staffTurnover: {
          fr: "Créer un système de formation continue",
          en: "Create continuous training system"
        },
        qualityVariance: {
          fr: "Standardiser les protocoles et outils",
          en: "Standardize protocols and tools"
        },
        coordinationBreakdown: {
          fr: "Établir une structure de gouvernance claire",
          en: "Establish clear governance structure"
        },
        supplyChainIssues: {
          fr: "Diversifier les fournisseurs et stocks tampons",
          en: "Diversify suppliers and buffer stocks"
        }
      };
      risks.push({
        id: riskType,
        label: riskLabels[riskType][lang],
        probability: riskLevel,
        probabilityPercent: Math.round(riskLevel * 100),
        severity: riskLevel > 0.5 ? 'high' : riskLevel > 0.3 ? 'medium' : 'low',
        mitigation: mitigations[riskType][lang]
      });
    }
    return risks.sort(function (a, b) {
      return b.probability - a.probability;
    });
  }

  /**
   * Calcule les besoins en ressources humaines
   */
  function calculateHRNeeds(pilotData, targetScale) {
    var pilotStaff = pilotData.staff || {
      trainers: 2,
      supervisors: 1,
      coordinators: 1
    };
    var scalingRatio = (targetScale.sites || 100) / (pilotData.sites || 5);

    // Ratios de scaling différents par type de personnel
    var hrNeeds = {
      trainers: Math.ceil(pilotStaff.trainers * scalingRatio * 0.6),
      // Économies d'échelle
      supervisors: Math.ceil(pilotStaff.supervisors * scalingRatio * 0.8),
      coordinators: Math.ceil(pilotStaff.coordinators * Math.sqrt(scalingRatio)),
      // Scaling sous-linéaire
      regionalManagers: Math.ceil(scalingRatio / 20),
      // 1 par 20 sites
      qualityOfficers: Math.ceil(scalingRatio / 25),
      // 1 par 25 sites
      dataManagers: Math.ceil(scalingRatio / 30) // 1 par 30 sites
    };
    hrNeeds.total = Object.values(hrNeeds).reduce(function (a, b) {
      return a + b;
    }, 0);
    return hrNeeds;
  }

  /**
   * Calcule le temps estimé pour le scaling
   */
  function estimateTimeline(pilotData, targetScale) {
    var pilotDuration = pilotData.durationMonths || 12;
    var scalingRatio = (targetScale.sites || 100) / (pilotData.sites || 5);

    // Le scaling n'est pas linéaire - formule logarithmique
    var baseScalingTime = pilotDuration * Math.log10(scalingRatio + 1) * 1.5;
    var phases = {
      preparation: Math.ceil(baseScalingTime * 0.2),
      training: Math.ceil(baseScalingTime * 0.3),
      rollout: Math.ceil(baseScalingTime * 0.35),
      stabilization: Math.ceil(baseScalingTime * 0.15)
    };
    phases.total = phases.preparation + phases.training + phases.rollout + phases.stabilization;
    return phases;
  }

  /**
   * Génère un rapport complet de scaling
   */
  function generateScalingReport(pilotData, targetScale, lang) {
    lang = lang || 'fr';
    var costs = calculateScalingCost(pilotData, targetScale);
    var risks = assessScalingRisks(pilotData, targetScale, lang);
    var hr = calculateHRNeeds(pilotData, targetScale);
    var timeline = estimateTimeline(pilotData, targetScale);

    // Score de faisabilité
    var avgRisk = risks.reduce(function (sum, r) {
      return sum + r.probability;
    }, 0) / risks.length;
    var feasibilityScore = Math.round((1 - avgRisk) * 100);
    return {
      generatedAt: new Date().toISOString(),
      pilot: pilotData,
      target: targetScale,
      scalingRatio: Math.round((targetScale.sites || 100) / (pilotData.sites || 5) * 10) / 10,
      costs: costs,
      risks: risks,
      humanResources: hr,
      timeline: timeline,
      feasibility: {
        score: feasibilityScore,
        level: feasibilityScore >= 70 ? 'high' : feasibilityScore >= 50 ? 'medium' : 'low',
        label: feasibilityScore >= 70 ? lang === 'fr' ? 'Bonne faisabilité' : 'Good feasibility' : feasibilityScore >= 50 ? lang === 'fr' ? 'Faisabilité modérée' : 'Moderate feasibility' : lang === 'fr' ? 'Faisabilité difficile' : 'Difficult feasibility'
      },
      recommendations: generateScalingRecommendations(costs, risks, lang)
    };
  }

  /**
   * Génère des recommandations pour le scaling
   */
  function generateScalingRecommendations(costs, risks, lang) {
    lang = lang || 'fr';
    var recommendations = [];

    // Recommandation sur les coûts
    if (costs.economiesRealized > 20) {
      recommendations.push({
        type: 'cost',
        priority: 'info',
        text: lang === 'fr' ? 'Économies d\'échelle significatives (' + costs.economiesRealized + '%) - bon potentiel de scaling' : 'Significant economies of scale (' + costs.economiesRealized + '%) - good scaling potential'
      });
    }

    // Recommandations sur les risques majeurs
    risks.filter(function (r) {
      return r.probability > 0.4;
    }).forEach(function (risk) {
      recommendations.push({
        type: 'risk',
        priority: 'high',
        text: lang === 'fr' ? 'Risque élevé: ' + risk.label + '. Mitigation: ' + risk.mitigation : 'High risk: ' + risk.label + '. Mitigation: ' + risk.mitigation
      });
    });
    return recommendations;
  }

  /**
   * Crée des données de démo
   */
  function createDemoPilot() {
    return {
      sites: 5,
      beneficiaries: 750,
      totalCost: 150000,
      durationMonths: 12,
      staff: {
        trainers: 3,
        supervisors: 2,
        coordinators: 1
      },
      adoptionRate: 78,
      fidelityScore: 82
    };
  }
  return {
    VERSION: '8.5.0',
    calculateScalingCost: calculateScalingCost,
    assessScalingRisks: assessScalingRisks,
    calculateHRNeeds: calculateHRNeeds,
    estimateTimeline: estimateTimeline,
    generateScalingReport: generateScalingReport,
    createDemoPilot: createDemoPilot,
    getScalingFactors: function () {
      return scalingFactors;
    }
  };
}();

export default ScalingSimulator;
