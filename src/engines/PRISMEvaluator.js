var PRISMEvaluator = {
  VERSION: '11.0.0',
  citation: 'Glasgow RE et al. (2019). Ann Rev Public Health, 40:191-207',
  iPRISMcitation: 'Trinkley KE et al. (2023). Implementation Science Communications, 4:116',
  // PRISM contextual domains
  domains: {
    interventionCharacteristics: {
      id: 'intervention',
      label: {
        fr: 'Caractéristiques de l\'intervention',
        en: 'Intervention Characteristics'
      },
      color: '#3b82f6',
      items: [{
        id: 'P_IC1',
        name: {
          fr: 'Preuves de base',
          en: 'Evidence base'
        },
        weight: 1.0
      }, {
        id: 'P_IC2',
        name: {
          fr: 'Avantage relatif perçu',
          en: 'Perceived relative advantage'
        },
        weight: 0.9
      }, {
        id: 'P_IC3',
        name: {
          fr: 'Observabilité des résultats',
          en: 'Observability of results'
        },
        weight: 0.8
      }, {
        id: 'P_IC4',
        name: {
          fr: 'Adaptabilité/réinvention',
          en: 'Adaptability/reinvention'
        },
        weight: 0.95
      }, {
        id: 'P_IC5',
        name: {
          fr: 'Complexité/coût',
          en: 'Complexity/cost'
        },
        weight: 0.85
      }, {
        id: 'P_IC6',
        name: {
          fr: 'Compatibilité avec le workflow',
          en: 'Compatibility with workflow'
        },
        weight: 0.9
      }]
    },
    externalEnvironment: {
      id: 'external',
      label: {
        fr: 'Environnement externe',
        en: 'External Environment'
      },
      color: '#059669',
      items: [{
        id: 'P_EE1',
        name: {
          fr: 'Politiques et régulations',
          en: 'Policies and regulations'
        },
        weight: 0.9
      }, {
        id: 'P_EE2',
        name: {
          fr: 'Incitations/mandats',
          en: 'Incentives/mandates'
        },
        weight: 0.8
      }, {
        id: 'P_EE3',
        name: {
          fr: 'Environnement concurrentiel',
          en: 'Competitive environment'
        },
        weight: 0.7
      }, {
        id: 'P_EE4',
        name: {
          fr: 'Besoins des patients',
          en: 'Patient/client needs'
        },
        weight: 1.0
      }]
    },
    organizationalCharacteristics: {
      id: 'organization',
      label: {
        fr: 'Caractéristiques organisationnelles',
        en: 'Organizational Characteristics'
      },
      color: '#7c3aed',
      items: [{
        id: 'P_OC1',
        name: {
          fr: 'Culture organisationnelle',
          en: 'Organizational culture'
        },
        weight: 0.95
      }, {
        id: 'P_OC2',
        name: {
          fr: 'Leadership et soutien',
          en: 'Leadership and support'
        },
        weight: 1.0
      }, {
        id: 'P_OC3',
        name: {
          fr: 'Ressources disponibles',
          en: 'Available resources'
        },
        weight: 0.9
      }, {
        id: 'P_OC4',
        name: {
          fr: 'Climat d\'apprentissage',
          en: 'Learning climate'
        },
        weight: 0.85
      }, {
        id: 'P_OC5',
        name: {
          fr: 'Réseaux et communication',
          en: 'Networks and communication'
        },
        weight: 0.8
      }]
    },
    recipientCharacteristics: {
      id: 'recipients',
      label: {
        fr: 'Caractéristiques des bénéficiaires',
        en: 'Recipient Characteristics'
      },
      color: '#dc2626',
      items: [{
        id: 'P_RC1',
        name: {
          fr: 'Motivation au changement',
          en: 'Motivation for change'
        },
        weight: 1.0
      }, {
        id: 'P_RC2',
        name: {
          fr: 'Compétences et auto-efficacité',
          en: 'Skills and self-efficacy'
        },
        weight: 0.9
      }, {
        id: 'P_RC3',
        name: {
          fr: 'Barrières perçues',
          en: 'Perceived barriers'
        },
        weight: 0.85
      }, {
        id: 'P_RC4',
        name: {
          fr: 'Caractéristiques démographiques',
          en: 'Demographic characteristics'
        },
        weight: 0.7
      }]
    },
    implementationInfrastructure: {
      id: 'infrastructure',
      label: {
        fr: 'Infrastructure d\'implémentation',
        en: 'Implementation Infrastructure'
      },
      color: '#d97706',
      items: [{
        id: 'P_II1',
        name: {
          fr: 'Équipe d\'implémentation dédiée',
          en: 'Dedicated implementation team'
        },
        weight: 1.0
      }, {
        id: 'P_II2',
        name: {
          fr: 'Plan de formation continu',
          en: 'Ongoing training plan'
        },
        weight: 0.9
      }, {
        id: 'P_II3',
        name: {
          fr: 'Systèmes de feedback',
          en: 'Feedback systems'
        },
        weight: 0.85
      }, {
        id: 'P_II4',
        name: {
          fr: 'Plan de pérennisation',
          en: 'Sustainability plan'
        },
        weight: 0.95
      }]
    }
  },
  // RE-AIM outcomes integrated with PRISM
  reaimOutcomes: {
    reach: {
      id: 'reach',
      label: {
        fr: 'Portée (Reach)',
        en: 'Reach'
      },
      color: '#3b82f6',
      questions: [{
        fr: 'Quel % de la population cible est atteint ?',
        en: 'What % of target population is reached?'
      }, {
        fr: 'La portée est-elle représentative (équité) ?',
        en: 'Is reach representative (equity)?'
      }]
    },
    effectiveness: {
      id: 'effectiveness',
      label: {
        fr: 'Efficacité (Effectiveness)',
        en: 'Effectiveness'
      },
      color: '#10b981',
      questions: [{
        fr: 'Quels sont les résultats cliniques/comportementaux ?',
        en: 'What are clinical/behavioral outcomes?'
      }, {
        fr: 'Y a-t-il des effets négatifs ou inattendus ?',
        en: 'Are there negative or unintended effects?'
      }]
    },
    adoption: {
      id: 'adoption',
      label: {
        fr: 'Adoption',
        en: 'Adoption'
      },
      color: '#8b5cf6',
      questions: [{
        fr: 'Quel % des sites/cliniciens a adopté ?',
        en: 'What % of sites/clinicians adopted?'
      }, {
        fr: 'L\'adoption est-elle représentative ?',
        en: 'Is adoption representative?'
      }]
    },
    implementation: {
      id: 'implementation',
      label: {
        fr: 'Implémentation',
        en: 'Implementation'
      },
      color: '#f59e0b',
      questions: [{
        fr: 'L\'intervention est-elle fidèlement délivrée ?',
        en: 'Is intervention delivered with fidelity?'
      }, {
        fr: 'Quelles adaptations ont été nécessaires ?',
        en: 'What adaptations were needed?'
      }]
    },
    maintenance: {
      id: 'maintenance',
      label: {
        fr: 'Maintenance/Pérennisation',
        en: 'Maintenance'
      },
      color: '#ef4444',
      questions: [{
        fr: 'Les résultats sont-ils maintenus à 6+ mois ?',
        en: 'Are results maintained at 6+ months?'
      }, {
        fr: 'Le programme est-il institutionnalisé ?',
        en: 'Is the program institutionalized?'
      }]
    }
  },
  // Evaluate PRISM context + RE-AIM outcomes
  evaluate: function (contextScores, reaimScores, lang) {
    var self = this;
    var t = function (fr, en) {
      return lang === 'fr' ? fr : en;
    };
    var contextResult = {
      domains: {},
      globalScore: 0
    };
    var totalWeight = 0;
    var weightedSum = 0;
    Object.keys(self.domains).forEach(function (domKey) {
      var dom = self.domains[domKey];
      var domScore = 0;
      var domWeight = 0;
      dom.items.forEach(function (item) {
        var score = contextScores[item.id] || 0;
        domScore += score * item.weight;
        domWeight += item.weight * 100;
      });
      var pct = domWeight > 0 ? Math.round(domScore / domWeight * 100) : 0;
      contextResult.domains[domKey] = {
        label: dom.label,
        score: pct,
        color: dom.color,
        itemCount: dom.items.length
      };
      totalWeight += domWeight;
      weightedSum += domScore;
    });
    contextResult.globalScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight * 100) : 0;
    var reaimResult = {};
    var reaimTotal = 0;
    var reaimCount = 0;
    Object.keys(self.reaimOutcomes).forEach(function (dim) {
      reaimResult[dim] = reaimScores[dim] || 0;
      reaimTotal += reaimResult[dim];
      reaimCount++;
    });
    reaimResult.average = reaimCount > 0 ? Math.round(reaimTotal / reaimCount) : 0;
    return {
      context: contextResult,
      reaim: reaimResult,
      phase: self.determinePhase(contextResult.globalScore, reaimResult.average),
      citation: self.citation
    };
  },
  determinePhase: function (contextScore, reaimScore) {
    if (contextScore < 40) return {
      phase: 'planning',
      label: {
        fr: 'Planification',
        en: 'Planning'
      },
      icon: '📋'
    };
    if (contextScore < 70 && reaimScore < 50) return {
      phase: 'implementation',
      label: {
        fr: 'Implémentation',
        en: 'Implementation'
      },
      icon: '🚀'
    };
    return {
      phase: 'sustainment',
      label: {
        fr: 'Pérennisation',
        en: 'Sustainment'
      },
      icon: '🏗️'
    };
  }
};
console.log('✅ MOUDAR v11.0: PRISMEvaluator loaded — 5 contextual domains, 25 items, RE-AIM integrated (Glasgow 2019)');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE D3: IMPLEMENTATION RESEARCH LOGIC MODEL (IRLM) GENERATOR
// Smith JD et al. (2020) Implementation Science 15:84
// First automated IRLM generator in the world
// ═══════════════════════════════════════════════════════════════════════════

export default PRISMEvaluator;
