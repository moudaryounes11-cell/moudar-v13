var SensitivityAnalyzer = function () {
  'use strict';

  // Poids d'impact de base pour chaque type de barrière
  var barrierImpactWeights = {
    "lack_training": {
      baseImpact: 0.18,
      variability: 0.08,
      category: "capacity"
    },
    "staff_resistance": {
      baseImpact: 0.22,
      variability: 0.10,
      category: "human"
    },
    "it_infrastructure": {
      baseImpact: 0.15,
      variability: 0.12,
      category: "technical"
    },
    "data_management": {
      baseImpact: 0.12,
      variability: 0.06,
      category: "technical"
    },
    "stigma": {
      baseImpact: 0.20,
      variability: 0.15,
      category: "cultural"
    },
    "funding": {
      baseImpact: 0.25,
      variability: 0.10,
      category: "resources"
    },
    "leadership_support": {
      baseImpact: 0.23,
      variability: 0.08,
      category: "governance"
    },
    "time_constraints": {
      baseImpact: 0.16,
      variability: 0.07,
      category: "operational"
    },
    "cultural_barriers": {
      baseImpact: 0.19,
      variability: 0.12,
      category: "cultural"
    },
    "complexity": {
      baseImpact: 0.17,
      variability: 0.09,
      category: "operational"
    },
    "communication": {
      baseImpact: 0.14,
      variability: 0.06,
      category: "operational"
    },
    "policy_alignment": {
      baseImpact: 0.21,
      variability: 0.11,
      category: "governance"
    },
    "patient_engagement": {
      baseImpact: 0.15,
      variability: 0.08,
      category: "human"
    },
    "staff_turnover": {
      baseImpact: 0.18,
      variability: 0.10,
      category: "human"
    },
    "evidence_gaps": {
      baseImpact: 0.13,
      variability: 0.07,
      category: "knowledge"
    }
  };

  // Labels traduits pour les barrières
  var barrierLabels = {
    "lack_training": {
      fr: "Manque de formation",
      en: "Lack of training"
    },
    "staff_resistance": {
      fr: "Résistance du personnel",
      en: "Staff resistance"
    },
    "it_infrastructure": {
      fr: "Infrastructure IT",
      en: "IT infrastructure"
    },
    "data_management": {
      fr: "Gestion des données",
      en: "Data management"
    },
    "stigma": {
      fr: "Stigmatisation",
      en: "Stigma"
    },
    "funding": {
      fr: "Financement insuffisant",
      en: "Insufficient funding"
    },
    "leadership_support": {
      fr: "Soutien leadership",
      en: "Leadership support"
    },
    "time_constraints": {
      fr: "Contraintes de temps",
      en: "Time constraints"
    },
    "cultural_barriers": {
      fr: "Barrières culturelles",
      en: "Cultural barriers"
    },
    "complexity": {
      fr: "Complexité intervention",
      en: "Intervention complexity"
    },
    "communication": {
      fr: "Communication",
      en: "Communication"
    },
    "policy_alignment": {
      fr: "Alignement politique",
      en: "Policy alignment"
    },
    "patient_engagement": {
      fr: "Engagement patients",
      en: "Patient engagement"
    },
    "staff_turnover": {
      fr: "Rotation personnel",
      en: "Staff turnover"
    },
    "evidence_gaps": {
      fr: "Lacunes preuves",
      en: "Evidence gaps"
    }
  };

  /**
   * Calcule le score de succès de base avec toutes les barrières
   */
  function calculateBaseSuccess(project) {
    var baseSuccess = 0.75; // Score de départ optimiste
    var barriers = project.barriers || [];
    var phase = project.phase || "implementation";
    var resourceLevel = project.resourceLevel || "R03";

    // Ajustement par phase EPIS
    var phaseMultipliers = {
      "exploration": 1.1,
      "preparation": 1.0,
      "implementation": 0.85,
      "sustainment": 0.9
    };
    baseSuccess *= phaseMultipliers[phase] || 1.0;

    // Ajustement par niveau de ressources
    var resourceMultipliers = {
      "R01": 1.15,
      "R02": 1.0,
      "R03": 0.85,
      "R04": 0.70
    };
    baseSuccess *= resourceMultipliers[resourceLevel] || 1.0;

    // Réduction par barrière active
    barriers.forEach(function (barrierId) {
      var weight = barrierImpactWeights[barrierId];
      if (weight) {
        var impact = weight.baseImpact * (0.8 + Math.random() * 0.4);
        baseSuccess *= 1 - impact;
      }
    });
    return Math.max(0.05, Math.min(0.95, baseSuccess));
  }

  /**
   * Analyse de sensibilité Tornado
   * Calcule l'impact de chaque barrière sur le succès global
   */
  function runTornadoAnalysis(project, lang) {
    lang = lang || 'fr';
    var barriers = project.barriers || [];
    var baseSuccess = calculateBaseSuccess(project);
    var impacts = [];
    barriers.forEach(function (barrierId) {
      // Simuler la suppression de cette barrière
      var improvedBarriers = barriers.filter(function (b) {
        return b !== barrierId;
      });
      var improvedProject = Object.assign({}, project, {
        barriers: improvedBarriers
      });
      var improvedSuccess = calculateBaseSuccess(improvedProject);

      // Impact = gain de probabilité si barrière résolue
      var impactGain = improvedSuccess - baseSuccess;
      var percentageGain = impactGain / baseSuccess * 100;
      var weight = barrierImpactWeights[barrierId] || {
        baseImpact: 0.15,
        category: "other"
      };
      var label = barrierLabels[barrierId] || {
        fr: barrierId,
        en: barrierId
      };
      impacts.push({
        barrierId: barrierId,
        barrierName: label[lang] || label.fr,
        category: weight.category,
        impactFactor: impactGain,
        percentageGain: percentageGain,
        baseSuccessWithout: improvedSuccess,
        priority: percentageGain > 15 ? "critical" : percentageGain > 8 ? "high" : percentageGain > 4 ? "medium" : "low",
        recommendation: getRecommendation(barrierId, percentageGain, lang)
      });
    });

    // Trier par impact décroissant
    impacts.sort(function (a, b) {
      return b.impactFactor - a.impactFactor;
    });
    return {
      baseSuccess: baseSuccess,
      baseSuccessPercent: Math.round(baseSuccess * 100),
      barriers: impacts,
      topBarrier: impacts[0] || null,
      criticalBarriers: impacts.filter(function (i) {
        return i.priority === "critical";
      }),
      totalPotentialGain: impacts.reduce(function (sum, i) {
        return sum + i.impactFactor;
      }, 0),
      analysisDate: new Date().toISOString()
    };
  }

  /**
   * Génère une recommandation contextuelle pour résoudre une barrière
   */
  function getRecommendation(barrierId, percentageGain, lang) {
    var recommendations = {
      "lack_training": {
        fr: "Investir dans un programme de formation structuré avec accompagnement sur site",
        en: "Invest in a structured training program with on-site coaching"
      },
      "staff_resistance": {
        fr: "Identifier des champions locaux et organiser des sessions de co-conception",
        en: "Identify local champions and organize co-design sessions"
      },
      "funding": {
        fr: "Développer un business case et explorer les sources de financement alternatives",
        en: "Develop a business case and explore alternative funding sources"
      },
      "leadership_support": {
        fr: "Engager la direction dans des réunions de pilotage régulières",
        en: "Engage leadership in regular steering meetings"
      },
      "stigma": {
        fr: "Lancer une campagne de sensibilisation communautaire",
        en: "Launch a community awareness campaign"
      },
      "cultural_barriers": {
        fr: "Adapter l'intervention au contexte culturel local avec des facilitateurs communautaires",
        en: "Adapt intervention to local cultural context with community facilitators"
      },
      "it_infrastructure": {
        fr: "Évaluer les besoins IT et planifier un upgrade progressif",
        en: "Assess IT needs and plan a progressive upgrade"
      },
      "time_constraints": {
        fr: "Réorganiser les flux de travail et dédier du temps protégé",
        en: "Reorganize workflows and dedicate protected time"
      },
      "policy_alignment": {
        fr: "Engager un dialogue politique et aligner sur les priorités nationales",
        en: "Engage in policy dialogue and align with national priorities"
      },
      "complexity": {
        fr: "Simplifier l'intervention ou la déployer par phases",
        en: "Simplify the intervention or deploy in phases"
      },
      "staff_turnover": {
        fr: "Créer un système de formation continue et de transfert de connaissances",
        en: "Create a continuous training and knowledge transfer system"
      }
    };
    var rec = recommendations[barrierId];
    if (!rec) {
      return lang === 'fr' ? "Analyser cette barrière plus en détail" : "Analyze this barrier in more detail";
    }
    var prefix = percentageGain > 15 ? lang === 'fr' ? "🔴 PRIORITÉ CRITIQUE: " : "🔴 CRITICAL PRIORITY: " : percentageGain > 8 ? lang === 'fr' ? "🟠 Priorité haute: " : "🟠 High priority: " : "";
    return prefix + (rec[lang] || rec.fr);
  }

  /**
   * Génère les données pour un graphique Tornado
   */
  function generateTornadoChartData(analysis, lang) {
    lang = lang || 'fr';
    var labels = [];
    var data = [];
    var colors = [];
    var borderColors = [];
    analysis.barriers.slice(0, 8).forEach(function (barrier) {
      labels.push(barrier.barrierName);
      data.push(Math.round(barrier.percentageGain * 10) / 10);
      var color = barrier.priority === "critical" ? "rgba(239, 68, 68, 0.8)" : barrier.priority === "high" ? "rgba(249, 115, 22, 0.8)" : barrier.priority === "medium" ? "rgba(234, 179, 8, 0.8)" : "rgba(34, 197, 94, 0.8)";
      colors.push(color);
      borderColors.push(color.replace("0.8", "1"));
    });
    return {
      labels: labels,
      datasets: [{
        label: lang === 'fr' ? "Gain potentiel (%)" : "Potential gain (%)",
        data: data,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 2
      }],
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: lang === 'fr' ? "Impact des barrières sur le succès (Analyse Tornado)" : "Barrier Impact on Success (Tornado Analysis)"
          }
        }
      }
    };
  }
  return {
    VERSION: '8.3.0',
    runTornadoAnalysis: runTornadoAnalysis,
    calculateBaseSuccess: calculateBaseSuccess,
    generateTornadoChartData: generateTornadoChartData,
    getBarrierLabels: function () {
      return barrierLabels;
    },
    getBarrierWeights: function () {
      return barrierImpactWeights;
    }
  };
}();

export default SensitivityAnalyzer;
