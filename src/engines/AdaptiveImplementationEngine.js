var AdaptiveImplementationEngine = {
  VERSION: '9.0.0',
  thresholds: {
    minor: 0.10,
    moderate: 0.20,
    critical: 0.30
  },
  driftTypes: {
    ADOPTION_DROP: {
      indicator: 'adoption_rate',
      label: {
        fr: 'Baisse du taux d\'adoption',
        en: 'Adoption rate drop'
      },
      icon: '📉'
    },
    FIDELITY_DRIFT: {
      indicator: 'fidelity_score',
      label: {
        fr: 'Écart de fidélité',
        en: 'Fidelity drift'
      },
      icon: '🎯'
    },
    TIMELINE_DELAY: {
      indicator: 'milestone_completion',
      label: {
        fr: 'Retard sur le chronogramme',
        en: 'Timeline delay'
      },
      icon: '⏰'
    },
    BUDGET_OVERRUN: {
      indicator: 'budget_variance',
      label: {
        fr: 'Dépassement budgétaire',
        en: 'Budget overrun'
      },
      icon: '💰'
    },
    ENGAGEMENT_DECLINE: {
      indicator: 'stakeholder_engagement',
      label: {
        fr: 'Déclin de l\'engagement',
        en: 'Engagement decline'
      },
      icon: '👥'
    }
  },
  planBMatrix: {
    S01: {
      ADOPTION_DROP: {
        supportStrategies: ['S04', 'S03', 'S10'],
        actions: {
          fr: ['Identifier des champions parmi les formés', 'Sessions de rappel ciblées', 'Coaching individuel'],
          en: ['Identify champions among trainees', 'Targeted refresher sessions', 'Individual coaching']
        },
        budgetFactor: 1.15,
        timeWeeks: 4
      },
      FIDELITY_DRIFT: {
        supportStrategies: ['S02', 'S09', 'S05'],
        actions: {
          fr: ['Audit des pratiques', 'Aide-mémoires sur site', 'Rappels automatiques'],
          en: ['Practice audit', 'On-site job aids', 'Automated reminders']
        },
        budgetFactor: 1.10,
        timeWeeks: 2
      }
    },
    S04: {
      ADOPTION_DROP: {
        supportStrategies: ['S03', 'S06', 'S08'],
        actions: {
          fr: ['Renforcer le soutien aux champions', 'Incitations supplémentaires', 'Engagement communautaire'],
          en: ['Strengthen champion support', 'Additional incentives', 'Community engagement']
        },
        budgetFactor: 1.20,
        timeWeeks: 3
      }
    },
    S19: {
      ADOPTION_DROP: {
        supportStrategies: ['S04', 'S10', 'S03'],
        actions: {
          fr: ['Activer des champions locaux', 'Renforcer la supervision', 'Facilitation d\'urgence'],
          en: ['Activate local champions', 'Strengthen supervision', 'Emergency facilitation']
        },
        budgetFactor: 1.25,
        timeWeeks: 6
      },
      FIDELITY_DRIFT: {
        supportStrategies: ['S01', 'S02', 'S09'],
        actions: {
          fr: ['Formation de rappel', 'Audit avec feedback immédiat', 'Job aids visuels'],
          en: ['Refresher training', 'Audit with immediate feedback', 'Visual job aids']
        },
        budgetFactor: 1.15,
        timeWeeks: 4
      }
    },
    DEFAULT: {
      ADOPTION_DROP: {
        supportStrategies: ['S04', 'S03', 'S08'],
        actions: {
          fr: ['Mobiliser des champions', 'Facilitation intensive', 'Engagement communautaire'],
          en: ['Mobilize champions', 'Intensive facilitation', 'Community engagement']
        },
        budgetFactor: 1.20,
        timeWeeks: 4
      },
      FIDELITY_DRIFT: {
        supportStrategies: ['S02', 'S01', 'S09'],
        actions: {
          fr: ['Audit qualité', 'Formation de rappel', 'Outils aide-mémoire'],
          en: ['Quality audit', 'Refresher training', 'Job aid tools']
        },
        budgetFactor: 1.15,
        timeWeeks: 3
      },
      TIMELINE_DELAY: {
        supportStrategies: ['S03', 'S10', 'S06'],
        actions: {
          fr: ['Accélérer la facilitation', 'Supervision renforcée', 'Ressources additionnelles'],
          en: ['Accelerate facilitation', 'Enhanced supervision', 'Additional resources']
        },
        budgetFactor: 1.30,
        timeWeeks: 2
      },
      BUDGET_OVERRUN: {
        supportStrategies: ['S13', 'S06'],
        actions: {
          fr: ['Optimiser les processus', 'Réallouer les ressources'],
          en: ['Optimize processes', 'Reallocate resources']
        },
        budgetFactor: 1.0,
        timeWeeks: 2
      },
      ENGAGEMENT_DECLINE: {
        supportStrategies: ['S08', 'S04', 'S03'],
        actions: {
          fr: ['Campagne de communication', 'Activer les champions', 'Sessions de re-engagement'],
          en: ['Communication campaign', 'Activate champions', 'Re-engagement sessions']
        },
        budgetFactor: 1.15,
        timeWeeks: 4
      }
    }
  },
  analyzeRealTime: function (project, currentKPIs) {
    var self = this;
    var drifts = [];
    var baselineKPIs = project.baselineKPIs || {};
    Object.keys(currentKPIs).forEach(function (kpiId) {
      var current = currentKPIs[kpiId].value;
      var target = currentKPIs[kpiId].target;
      var baseline = baselineKPIs[kpiId] || target;
      if (target === 0) return;
      var variance = (target - current) / target;
      var trend = self.calculateTrend(project.kpiHistory, kpiId);
      if (Math.abs(variance) >= self.thresholds.minor) {
        drifts.push({
          kpiId: kpiId,
          type: self.identifyDriftType(kpiId),
          current: current,
          target: target,
          variance: (variance * 100).toFixed(1),
          severity: self.classifySeverity(Math.abs(variance)),
          trend: trend,
          timestamp: new Date().toISOString()
        });
      }
    });
    return drifts.sort(function (a, b) {
      return Math.abs(b.variance) - Math.abs(a.variance);
    });
  },
  classifySeverity: function (variance) {
    if (variance >= this.thresholds.critical) return 'critical';
    if (variance >= this.thresholds.moderate) return 'moderate';
    return 'minor';
  },
  identifyDriftType: function (kpiId) {
    var mapping = {
      'adoption_rate': 'ADOPTION_DROP',
      'fidelity_score': 'FIDELITY_DRIFT',
      'milestone_completion': 'TIMELINE_DELAY',
      'budget_variance': 'BUDGET_OVERRUN',
      'stakeholder_engagement': 'ENGAGEMENT_DECLINE'
    };
    return mapping[kpiId] || 'ADOPTION_DROP';
  },
  calculateTrend: function (history, kpiId) {
    if (!history || !history[kpiId] || history[kpiId].length < 2) return 'stable';
    var values = history[kpiId].slice(-5);
    var first = values[0];
    var last = values[values.length - 1];
    var change = (last - first) / first;
    if (change > 0.05) return 'improving';
    if (change < -0.05) return 'declining';
    return 'stable';
  },
  generatePlanB: function (drift, project, currentStrategies) {
    var self = this;
    var primaryStrategy = currentStrategies[0] || 'DEFAULT';
    var matrix = this.planBMatrix[primaryStrategy] || this.planBMatrix.DEFAULT;
    var planB = matrix[drift.type] || matrix.ADOPTION_DROP;
    var alreadyUsed = currentStrategies || [];
    var supportStrategies = planB.supportStrategies.filter(function (s) {
      return alreadyUsed.indexOf(s) === -1;
    });
    var baseBudget = project.budget || 100000;
    var additionalCost = baseBudget * (planB.budgetFactor - 1);
    var baseSuccess = 0.65;
    if (drift.severity === 'minor') baseSuccess = 0.85;else if (drift.severity === 'moderate') baseSuccess = 0.75;
    return {
      driftId: drift.kpiId,
      driftType: drift.type,
      severity: drift.severity,
      supportStrategies: supportStrategies,
      actions: planB.actions,
      estimatedCost: Math.round(additionalCost),
      timeline: planB.timeWeeks + ' semaines',
      successProbability: Math.round(baseSuccess * 100),
      generatedAt: new Date().toISOString()
    };
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE: SMART ADAPTIVE DESIGN ENGINE
// Sequential Multiple Assignment Randomized Trial (SMART) for IS
// Reference: Almirall D et al. (2014). Drug & Alcohol Dependence, 138:36-46
// Reference: Kilbourne AM et al. (2018). Implementation Science, 13:31
// ═══════════════════════════════════════════════════════════════════════════

// @extracted from moudar.html lines 7922-8157
export default AdaptiveImplementationEngine;
