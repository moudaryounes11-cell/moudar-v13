var HybridDesignWizard = {
  VERSION: '11.0.0',
  citation: 'Curran GM et al. (2012). Medical Care, 50:217-226',
  // Three Hybrid Design Types
  types: {
    type1: {
      id: 'type1',
      label: {
        fr: 'Hybride Type 1',
        en: 'Hybrid Type 1'
      },
      focus: {
        fr: 'Focus primaire: Efficacité clinique | Secondaire: Implémentation',
        en: 'Primary focus: Clinical effectiveness | Secondary: Implementation'
      },
      description: {
        fr: 'Teste l\'intervention clinique tout en observant/recueillant des données sur l\'implémentation. Utilisé quand l\'intervention a des preuves préliminaires.',
        en: 'Tests clinical intervention while observing/gathering implementation data. Used when intervention has preliminary evidence.'
      },
      color: '#3b82f6',
      whenToUse: [{
        fr: 'L\'intervention a des preuves préliminaires mais pas de RCT large',
        en: 'Intervention has preliminary evidence but no large RCT'
      }, {
        fr: 'Le risque clinique de l\'intervention est faible',
        en: 'Clinical risk of intervention is low'
      }, {
        fr: 'Il y a un besoin urgent de données d\'efficacité',
        en: 'There is urgent need for effectiveness data'
      }],
      clinicalWeight: 0.7,
      implementationWeight: 0.3,
      typicalDesigns: ['RCT', 'Stepped-wedge', 'Pragmatic trial'],
      implementationMeasures: ['Feasibility', 'Acceptability', 'Adoption (descriptive)'],
      clinicalMeasures: ['Primary clinical outcomes', 'Secondary clinical outcomes', 'Safety']
    },
    type2: {
      id: 'type2',
      label: {
        fr: 'Hybride Type 2',
        en: 'Hybrid Type 2'
      },
      focus: {
        fr: 'Focus dual: Efficacité clinique = Implémentation',
        en: 'Dual focus: Clinical effectiveness = Implementation'
      },
      description: {
        fr: 'Teste simultanément l\'intervention clinique ET la stratégie d\'implémentation. Requiert un design factorial ou cluster.',
        en: 'Simultaneously tests clinical intervention AND implementation strategy. Requires factorial or cluster design.'
      },
      color: '#7c3aed',
      whenToUse: [{
        fr: 'L\'intervention a des preuves solides mais est peu adoptée',
        en: 'Intervention has strong evidence but low adoption'
      }, {
        fr: 'Les stratégies d\'implémentation ont aussi besoin de preuves',
        en: 'Implementation strategies also need evidence'
      }, {
        fr: 'Budget et ressources suffisants pour un design complexe',
        en: 'Sufficient budget and resources for complex design'
      }],
      clinicalWeight: 0.5,
      implementationWeight: 0.5,
      typicalDesigns: ['Factorial RCT', 'Cluster RCT', 'Stepped-wedge cluster', 'SMART'],
      implementationMeasures: ['Adoption', 'Fidelity', 'Penetration', 'Cost-effectiveness'],
      clinicalMeasures: ['Primary clinical outcomes', 'Patient-reported outcomes']
    },
    type3: {
      id: 'type3',
      label: {
        fr: 'Hybride Type 3',
        en: 'Hybrid Type 3'
      },
      focus: {
        fr: 'Focus primaire: Implémentation | Secondaire: Efficacité clinique',
        en: 'Primary focus: Implementation | Secondary: Clinical effectiveness'
      },
      description: {
        fr: 'Teste la stratégie d\'implémentation tout en surveillant les outcomes cliniques. Utilisé quand l\'intervention est déjà prouvée.',
        en: 'Tests implementation strategy while monitoring clinical outcomes. Used when intervention is already evidence-based.'
      },
      color: '#059669',
      whenToUse: [{
        fr: 'L\'intervention est déjà evidence-based (multiples RCTs)',
        en: 'Intervention is already evidence-based (multiple RCTs)'
      }, {
        fr: 'Le gap est dans l\'implémentation, pas dans l\'efficacité',
        en: 'Gap is in implementation, not in effectiveness'
      }, {
        fr: 'Il est éthiquement difficile de retenir l\'intervention',
        en: 'It is ethically difficult to withhold the intervention'
      }],
      clinicalWeight: 0.3,
      implementationWeight: 0.7,
      typicalDesigns: ['Cluster RCT (of strategy)', 'Stepped-wedge', 'SMART', 'Interrupted time series'],
      implementationMeasures: ['Adoption (primary)', 'Fidelity (primary)', 'Penetration', 'Sustainability', 'Cost'],
      clinicalMeasures: ['Clinical outcomes (monitoring)', 'Safety monitoring']
    }
  },
  // Decision algorithm to recommend Hybrid type
  recommend: function (answers, lang) {
    var t = function (fr, en) {
      return lang === 'fr' ? fr : en;
    };
    var score = {
      type1: 0,
      type2: 0,
      type3: 0
    };

    // Evidence level
    if (answers.evidenceLevel === 'preliminary') {
      score.type1 += 3;
      score.type2 += 1;
    } else if (answers.evidenceLevel === 'moderate') {
      score.type1 += 1;
      score.type2 += 3;
      score.type3 += 1;
    } else if (answers.evidenceLevel === 'strong') {
      score.type2 += 1;
      score.type3 += 3;
    }

    // Primary question
    if (answers.primaryQuestion === 'effectiveness') {
      score.type1 += 3;
      score.type2 += 1;
    } else if (answers.primaryQuestion === 'both') {
      score.type2 += 3;
    } else if (answers.primaryQuestion === 'implementation') {
      score.type2 += 1;
      score.type3 += 3;
    }

    // Adoption concern
    if (answers.adoptionConcern === 'high') {
      score.type2 += 2;
      score.type3 += 2;
    } else if (answers.adoptionConcern === 'low') {
      score.type1 += 2;
    }

    // Resources
    if (answers.resources === 'high') {
      score.type2 += 2;
    } else if (answers.resources === 'low') {
      score.type1 += 1;
      score.type3 += 1;
    }

    // Ethical concern
    if (answers.ethicalWithhold === 'yes') {
      score.type3 += 3;
    }
    var best = 'type1';
    if (score.type2 > score[best]) best = 'type2';
    if (score.type3 > score[best]) best = 'type3';
    var type = this.types[best];
    return {
      recommended: best,
      type: type,
      scores: score,
      confidence: score[best] > 8 ? 'high' : score[best] > 5 ? 'moderate' : 'low',
      rationale: t('Basé sur le niveau de preuve (' + answers.evidenceLevel + '), la question primaire (' + answers.primaryQuestion + '), et les ressources disponibles.', 'Based on evidence level (' + answers.evidenceLevel + '), primary question (' + answers.primaryQuestion + '), and available resources.'),
      citation: this.citation
    };
  }
};
console.log('✅ MOUDAR v11.0: HybridDesignWizard loaded — Types 1, 2, 3 (Curran 2012)');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE D6: SUSTAINABILITY ASSESSMENT ENGINE
// Luke DA et al. (2014) Implementation Science 9:130 (PSAT)
// Chambers DA et al. (2013) Implementation Science 8:117 (DSF)
// ═══════════════════════════════════════════════════════════════════════════

export default HybridDesignWizard;
