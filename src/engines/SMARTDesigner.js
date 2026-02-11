var SMARTDesigner = {
  VERSION: '11.0.0',
  citation: 'Almirall D et al. (2014). Drug & Alcohol Dependence, 138:36-46',
  // SMART design templates
  templates: {
    twoStage: {
      id: 'twoStage',
      label: {
        fr: 'SMART 2 étapes (classique)',
        en: '2-Stage SMART (classic)'
      },
      description: {
        fr: 'Randomisation initiale → évaluation → re-randomisation selon réponse',
        en: 'Initial randomization → assessment → re-randomization based on response'
      },
      stages: 2,
      icon: '🔀'
    },
    clustered: {
      id: 'clustered',
      label: {
        fr: 'Clustered SMART',
        en: 'Clustered SMART'
      },
      description: {
        fr: 'Randomisation au niveau du site — interventions organisationnelles',
        en: 'Site-level randomization — organizational interventions'
      },
      stages: 2,
      icon: '🏥'
    },
    sequential: {
      id: 'sequential',
      label: {
        fr: 'SMART séquentiel multi-étapes',
        en: 'Multi-stage sequential SMART'
      },
      description: {
        fr: '3+ étapes, points de décision multiples — implémentations complexes',
        en: '3+ stages, multiple decision points — complex implementations'
      },
      stages: 3,
      icon: '🔄'
    }
  },
  // Response classifiers
  responseClassifiers: {
    adoption: {
      id: 'adoption',
      label: {
        fr: 'Taux d\'adoption',
        en: 'Adoption rate'
      },
      responderThreshold: 60,
      unit: '%',
      timing: {
        fr: '3 mois',
        en: '3 months'
      },
      cfirLink: ['IN4', 'IS11']
    },
    fidelity: {
      id: 'fidelity',
      label: {
        fr: 'Score de fidélité',
        en: 'Fidelity score'
      },
      responderThreshold: 70,
      unit: '%',
      timing: {
        fr: '6 mois',
        en: '6 months'
      },
      cfirLink: ['PR4', 'IC4']
    },
    penetration: {
      id: 'penetration',
      label: {
        fr: 'Taux de pénétration',
        en: 'Penetration rate'
      },
      responderThreshold: 50,
      unit: '%',
      timing: {
        fr: '6 mois',
        en: '6 months'
      },
      cfirLink: ['IS1', 'OS4']
    },
    satisfaction: {
      id: 'satisfaction',
      label: {
        fr: 'Satisfaction (AIM)',
        en: 'Satisfaction (AIM)'
      },
      responderThreshold: 3.5,
      unit: '/5',
      timing: {
        fr: '3 mois',
        en: '3 months'
      },
      cfirLink: ['IC3', 'IS6']
    }
  },
  // Create SMART design
  createDesign: function (config) {
    var responder = this.responseClassifiers[config.responseMetric] || this.responseClassifiers.adoption;
    return {
      id: 'SMART_' + Date.now(),
      template: this.templates[config.template] || this.templates.twoStage,
      projectName: config.projectName || '',
      stage1: {
        label: {
          fr: 'Étape 1 — Stratégie initiale',
          en: 'Stage 1 — Initial strategy'
        },
        arms: config.stage1Arms || [{
          id: 'A',
          strategy: 'S01',
          label: {
            fr: 'Bras A: Formation standard',
            en: 'Arm A: Standard training'
          },
          intensity: 'standard'
        }, {
          id: 'B',
          strategy: 'S01+S04',
          label: {
            fr: 'Bras B: Formation + Champions',
            en: 'Arm B: Training + Champions'
          },
          intensity: 'enhanced'
        }],
        duration: config.stage1Duration || 12,
        durationUnit: 'weeks'
      },
      decisionPoint: {
        label: {
          fr: 'Point de décision',
          en: 'Decision Point'
        },
        timing: responder.timing,
        metric: responder,
        threshold: config.threshold || responder.responderThreshold,
        classification: {
          responder: {
            fr: 'Répondeur (≥ seuil)',
            en: 'Responder (≥ threshold)'
          },
          nonResponder: {
            fr: 'Non-répondeur (< seuil)',
            en: 'Non-responder (< threshold)'
          }
        }
      },
      stage2: {
        label: {
          fr: 'Étape 2 — Stratégie adaptée',
          en: 'Stage 2 — Tailored strategy'
        },
        responderPaths: [{
          id: 'R1',
          label: {
            fr: 'Maintenir',
            en: 'Maintain'
          },
          action: 'continue',
          intensity: 'maintenance'
        }, {
          id: 'R2',
          label: {
            fr: 'Alléger (step-down)',
            en: 'Step-down'
          },
          action: 'reduce',
          intensity: 'light'
        }],
        nonResponderPaths: [{
          id: 'NR1',
          label: {
            fr: 'Augmenter l\'intensité',
            en: 'Augment intensity'
          },
          action: 'augment',
          additionalStrategies: ['S10', 'S03'],
          intensity: 'intensive'
        }, {
          id: 'NR2',
          label: {
            fr: 'Changer de stratégie',
            en: 'Switch strategy'
          },
          action: 'switch',
          newStrategy: 'S04+S08',
          intensity: 'alternative'
        }],
        duration: config.stage2Duration || 12,
        durationUnit: 'weeks'
      },
      decisionRules: [],
      log: [],
      createdAt: new Date().toISOString(),
      status: 'design'
    };
  },
  // Generate formal decision rules
  generateDecisionRules: function (design) {
    var rules = [];
    var metric = design.decisionPoint.metric;
    var threshold = design.decisionPoint.threshold;
    design.stage1.arms.forEach(function (arm) {
      design.stage2.responderPaths.forEach(function (path) {
        rules.push({
          id: 'DR_' + arm.id + '_R_' + path.id,
          condition: {
            arm: arm.id,
            response: 'responder',
            operator: '>=',
            threshold: threshold,
            unit: metric.unit
          },
          action: path,
          label: 'IF ' + arm.id + ' AND ' + metric.id + '>=' + threshold + metric.unit + ' → ' + path.action
        });
      });
      design.stage2.nonResponderPaths.forEach(function (path) {
        rules.push({
          id: 'DR_' + arm.id + '_NR_' + path.id,
          condition: {
            arm: arm.id,
            response: 'non-responder',
            operator: '<',
            threshold: threshold,
            unit: metric.unit
          },
          action: path,
          label: 'IF ' + arm.id + ' AND ' + metric.id + '<' + threshold + metric.unit + ' → ' + path.action
        });
      });
    });
    return rules;
  },
  // Simulate SMART outcomes (Monte Carlo)
  simulateOutcomes: function (design, nSim) {
    nSim = nSim || 1000;
    var dtrs = [];
    design.stage1.arms.forEach(function (arm) {
      design.stage2.responderPaths.forEach(function (rPath) {
        design.stage2.nonResponderPaths.forEach(function (nrPath) {
          var baseRR = arm.intensity === 'enhanced' ? 0.55 : 0.40;
          var nrBoost = nrPath.action === 'augment' ? 0.30 : nrPath.action === 'switch' ? 0.25 : 0.10;
          var rMaintain = rPath.action === 'continue' ? 0.90 : 0.80;
          var outcomes = [];
          for (var i = 0; i < nSim; i++) {
            var isR = Math.random() < baseRR + (Math.random() - 0.5) * 0.15;
            var o = isR ? rMaintain + (Math.random() - 0.5) * 0.1 : nrBoost + (Math.random() - 0.5) * 0.15;
            outcomes.push(Math.max(0, Math.min(1, o)));
          }
          var mean = outcomes.reduce(function (a, b) {
            return a + b;
          }, 0) / nSim;
          var sorted = outcomes.slice().sort(function (a, b) {
            return a - b;
          });
          var variance = outcomes.reduce(function (a, b) {
            return a + Math.pow(b - mean, 2);
          }, 0) / nSim;
          dtrs.push({
            id: 'DTR_' + arm.id + '_' + rPath.id + '_' + nrPath.id,
            label: arm.label.en + ' → R:' + rPath.action + ' / NR:' + nrPath.action,
            labelFr: arm.label.fr + ' → R:' + rPath.action + ' / NR:' + nrPath.action,
            stage1: arm,
            responderPath: rPath,
            nonResponderPath: nrPath,
            mean: Math.round(mean * 100),
            median: Math.round(sorted[Math.floor(nSim * 0.5)] * 100),
            p25: Math.round(sorted[Math.floor(nSim * 0.25)] * 100),
            p75: Math.round(sorted[Math.floor(nSim * 0.75)] * 100),
            sd: Math.round(Math.sqrt(variance) * 100),
            responderRate: Math.round(baseRR * 100),
            costMultiplier: nrPath.intensity === 'intensive' ? 1.35 : nrPath.intensity === 'alternative' ? 1.25 : 1.10
          });
        });
      });
    });
    dtrs.sort(function (a, b) {
      return b.mean - a.mean;
    });
    return {
      embeddedDTRs: dtrs,
      bestDTR: dtrs[0],
      simulationCount: nSim,
      citation: this.citation,
      generatedAt: new Date().toISOString()
    };
  },
  // Sample size estimate
  estimateSampleSize: function (effectSize, responderRate, power) {
    effectSize = effectSize || 0.30;
    responderRate = responderRate || 0.50;
    power = power || 0.80;
    var zAlpha = 1.96;
    var zBeta = power >= 0.90 ? 1.28 : 0.84;
    var baseN = Math.ceil(2 * Math.pow((zAlpha + zBeta) / effectSize, 2));
    var adjustedN = Math.ceil(baseN / (1 - responderRate));
    return {
      totalN: adjustedN * 2,
      perArm: adjustedN,
      effectSize: effectSize,
      power: power,
      responderRate: responderRate,
      note: 'Almirall et al. (2014) simplified. Consult biostatistician.'
    };
  }
};
console.log('✅ MOUDAR v11.0: SMARTDesigner module loaded');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE: LLM PROTOCOL ANALYZER — AI Research Copilot (GAME-CHANGER)
// The feature that transforms MOUDAR from planning tool to research copilot
// Reference: Trinkley KE et al. (2024). Implementation Science, 19:21
// Reference: Pinnock H et al. (2017). BMJ, 356:i6795 (StaRI checklist)
// ═══════════════════════════════════════════════════════════════════════════

export default SMARTDesigner;
