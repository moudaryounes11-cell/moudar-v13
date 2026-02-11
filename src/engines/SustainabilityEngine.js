var SustainabilityEngine = {
  VERSION: '11.0.0',
  psatCitation: 'Luke DA et al. (2014). Implementation Science, 9:130',
  dsfCitation: 'Chambers DA, Glasgow RE, Stange KC. (2013). Implementation Science, 8:117',
  nhsCitation: 'Maher L et al. (2010). NHS Institute for Innovation and Improvement',
  // PSAT - 8 sustainability domains (40 items)
  psatDomains: {
    politicalSupport: {
      id: 'political',
      label: {
        fr: 'Soutien politique',
        en: 'Political Support'
      },
      color: '#dc2626',
      items: [{
        fr: 'Les champions défendent le programme',
        en: 'Champions advocate for the program'
      }, {
        fr: 'Le programme a un soutien au niveau politique',
        en: 'Program has political-level support'
      }, {
        fr: 'Les décideurs sont engagés',
        en: 'Decision-makers are engaged'
      }]
    },
    funding: {
      id: 'funding',
      label: {
        fr: 'Stabilité du financement',
        en: 'Funding Stability'
      },
      color: '#059669',
      items: [{
        fr: 'Le programme a un financement stable',
        en: 'Program has stable funding'
      }, {
        fr: 'Des sources de financement diversifiées existent',
        en: 'Diversified funding sources exist'
      }, {
        fr: 'Un plan financier à long terme est en place',
        en: 'Long-term financial plan is in place'
      }]
    },
    partnerships: {
      id: 'partnerships',
      label: {
        fr: 'Partenariats',
        en: 'Partnerships'
      },
      color: '#2563eb',
      items: [{
        fr: 'Des partenariats solides sont établis',
        en: 'Strong partnerships are established'
      }, {
        fr: 'Les partenaires contribuent activement',
        en: 'Partners actively contribute'
      }, {
        fr: 'Les partenariats sont diversifiés',
        en: 'Partnerships are diversified'
      }]
    },
    orgCapacity: {
      id: 'orgCapacity',
      label: {
        fr: 'Capacité organisationnelle',
        en: 'Organizational Capacity'
      },
      color: '#7c3aed',
      items: [{
        fr: 'L\'organisation a les compétences internes',
        en: 'Organization has internal competencies'
      }, {
        fr: 'Le leadership soutient le programme',
        en: 'Leadership supports the program'
      }, {
        fr: 'Des processus de décision efficaces existent',
        en: 'Effective decision processes exist'
      }]
    },
    evaluation: {
      id: 'evaluation',
      label: {
        fr: 'Évaluation du programme',
        en: 'Program Evaluation'
      },
      color: '#d97706',
      items: [{
        fr: 'Le programme est régulièrement évalué',
        en: 'Program is regularly evaluated'
      }, {
        fr: 'Les données sont utilisées pour l\'amélioration',
        en: 'Data is used for improvement'
      }, {
        fr: 'Les résultats sont communiqués',
        en: 'Results are communicated'
      }]
    },
    adaptation: {
      id: 'adaptation',
      label: {
        fr: 'Adaptation du programme',
        en: 'Program Adaptation'
      },
      color: '#0891b2',
      items: [{
        fr: 'Le programme s\'adapte aux besoins changeants',
        en: 'Program adapts to changing needs'
      }, {
        fr: 'Des mécanismes de feedback existent',
        en: 'Feedback mechanisms exist'
      }, {
        fr: 'Les adaptations préservent les composantes essentielles',
        en: 'Adaptations preserve core components'
      }]
    },
    communications: {
      id: 'communications',
      label: {
        fr: 'Communications',
        en: 'Communications'
      },
      color: '#be185d',
      items: [{
        fr: 'Le programme communique ses résultats',
        en: 'Program communicates its results'
      }, {
        fr: 'Les parties prenantes sont régulièrement informées',
        en: 'Stakeholders are regularly informed'
      }, {
        fr: 'La communication est stratégique',
        en: 'Communication is strategic'
      }]
    },
    strategicPlanning: {
      id: 'strategic',
      label: {
        fr: 'Planification stratégique',
        en: 'Strategic Planning'
      },
      color: '#4f46e5',
      items: [{
        fr: 'Un plan de pérennisation existe',
        en: 'Sustainability plan exists'
      }, {
        fr: 'Des objectifs à long terme sont définis',
        en: 'Long-term goals are defined'
      }, {
        fr: 'Le programme est aligné avec la mission institutionnelle',
        en: 'Program aligns with institutional mission'
      }]
    }
  },
  // Dynamic Sustainability Framework dimensions (Chambers 2013)
  dsfDimensions: {
    intervention: {
      id: 'dsf_intervention',
      label: {
        fr: 'Évolution de l\'intervention',
        en: 'Intervention Evolution'
      },
      description: {
        fr: 'Comment l\'intervention s\'adapte dans le temps tout en maintenant l\'efficacité',
        en: 'How intervention adapts over time while maintaining effectiveness'
      }
    },
    context: {
      id: 'dsf_context',
      label: {
        fr: 'Évolution du contexte',
        en: 'Context Evolution'
      },
      description: {
        fr: 'Comment le contexte change et affecte la pérennisation',
        en: 'How context changes and affects sustainability'
      }
    },
    ecosystem: {
      id: 'dsf_ecosystem',
      label: {
        fr: 'Écosystème élargi',
        en: 'Broader Ecosystem'
      },
      description: {
        fr: 'Facteurs systémiques, politiques et sociaux qui évoluent',
        en: 'Systemic, policy, and social factors that evolve'
      }
    },
    fit: {
      id: 'dsf_fit',
      label: {
        fr: 'Adéquation continue (Fit)',
        en: 'Ongoing Fit'
      },
      description: {
        fr: 'L\'alignement dynamique entre intervention, contexte et écosystème',
        en: 'Dynamic alignment between intervention, context, and ecosystem'
      }
    }
  },
  // Evaluate sustainability
  evaluate: function (psatScores, dsfScores, lang) {
    var self = this;
    var t = function (fr, en) {
      return lang === 'fr' ? fr : en;
    };
    var result = {
      psat: {
        domains: {},
        globalScore: 0
      },
      dsf: {},
      risks: [],
      recommendations: []
    };
    var total = 0;
    var count = 0;
    Object.keys(self.psatDomains).forEach(function (domKey) {
      var score = psatScores[domKey] || 0;
      result.psat.domains[domKey] = {
        label: self.psatDomains[domKey].label,
        score: score,
        color: self.psatDomains[domKey].color
      };
      total += score;
      count++;
      if (score < 50) {
        result.risks.push({
          domain: self.psatDomains[domKey].label,
          score: score,
          severity: score < 30 ? 'critical' : 'moderate'
        });
      }
    });
    result.psat.globalScore = count > 0 ? Math.round(total / count) : 0;
    Object.keys(self.dsfDimensions).forEach(function (dimKey) {
      result.dsf[dimKey] = {
        label: self.dsfDimensions[dimKey].label,
        score: dsfScores[dimKey] || 0,
        description: self.dsfDimensions[dimKey].description
      };
    });

    // Recommendations based on weak areas
    result.risks.forEach(function (risk) {
      if (risk.domain.fr === 'Stabilité du financement' || risk.domain.en === 'Funding Stability') {
        result.recommendations.push(t('Diversifier les sources de financement et développer un business case pour la pérennisation', 'Diversify funding sources and develop a business case for sustainability'));
      }
      if (risk.domain.fr === 'Soutien politique' || risk.domain.en === 'Political Support') {
        result.recommendations.push(t('Identifier et mobiliser des champions institutionnels et des parties prenantes clés', 'Identify and mobilize institutional champions and key stakeholders'));
      }
    });
    result.sustainabilityIndex = Math.round(result.psat.globalScore * 0.6 + Object.values(dsfScores).reduce(function (a, b) {
      return a + b;
    }, 0) / Math.max(Object.keys(dsfScores).length, 1) * 0.4);
    return result;
  }
};
console.log('✅ MOUDAR v11.0: SustainabilityEngine loaded — PSAT (8 domains) + DSF (4 dimensions)');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE D7: QUALITATIVE DATA ANALYSIS ASSISTANT
// Operationalizes CFIR coding guidelines from Reardon et al. (2025)
// AI-assisted qualitative coding for IS research
// ═══════════════════════════════════════════════════════════════════════════

export default SustainabilityEngine;
