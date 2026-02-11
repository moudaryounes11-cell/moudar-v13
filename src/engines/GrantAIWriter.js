var GrantAIWriter = {
  VERSION: '9.0.0',
  funders: {
    GLOBAL_FUND: {
      id: 'GLOBAL_FUND',
      name: 'Global Fund',
      fullName: 'The Global Fund to Fight AIDS, Tuberculosis and Malaria',
      logo: '🌍',
      color: '#00A651',
      maxBudget: 50000000,
      minBudget: 500000,
      domains: ['health', 'mental_health', 'hiv_aids', 'tuberculosis', 'malaria'],
      sections: [{
        id: 'executive_summary',
        label: {
          fr: 'Résumé exécutif',
          en: 'Executive Summary'
        },
        maxWords: 500
      }, {
        id: 'context',
        label: {
          fr: 'Contexte et justification',
          en: 'Context and Rationale'
        },
        maxWords: 1500
      }, {
        id: 'objectives',
        label: {
          fr: 'Objectifs et résultats',
          en: 'Objectives and Results'
        },
        maxWords: 1000
      }, {
        id: 'implementation',
        label: {
          fr: 'Stratégie de mise en œuvre',
          en: 'Implementation Strategy'
        },
        maxWords: 2000
      }, {
        id: 'monitoring',
        label: {
          fr: 'Suivi et évaluation',
          en: 'Monitoring and Evaluation'
        },
        maxWords: 1000
      }, {
        id: 'sustainability',
        label: {
          fr: 'Durabilité',
          en: 'Sustainability'
        },
        maxWords: 800
      }, {
        id: 'budget',
        label: {
          fr: 'Budget',
          en: 'Budget'
        },
        maxWords: 500
      }, {
        id: 'risks',
        label: {
          fr: 'Risques et mitigation',
          en: 'Risks and Mitigation'
        },
        maxWords: 600
      }],
      evaluationCriteria: {
        technical: 25,
        feasibility: 20,
        cost_effectiveness: 15,
        sustainability: 15,
        innovation: 10,
        equity: 15
      }
    },
    USAID: {
      id: 'USAID',
      name: 'USAID',
      fullName: 'United States Agency for International Development',
      logo: '🇺🇸',
      color: '#002F6C',
      maxBudget: 25000000,
      minBudget: 100000,
      domains: ['health', 'education', 'governance', 'economic_growth', 'humanitarian'],
      sections: [{
        id: 'technical_approach',
        label: {
          fr: 'Approche technique',
          en: 'Technical Approach'
        },
        maxWords: 3000
      }, {
        id: 'management',
        label: {
          fr: 'Plan de gestion',
          en: 'Management Plan'
        },
        maxWords: 1500
      }, {
        id: 'staffing',
        label: {
          fr: 'Personnel clé',
          en: 'Key Personnel'
        },
        maxWords: 1000
      }, {
        id: 'past_performance',
        label: {
          fr: 'Performances passées',
          en: 'Past Performance'
        },
        maxWords: 1000
      }, {
        id: 'cost_proposal',
        label: {
          fr: 'Proposition financière',
          en: 'Cost Proposal'
        },
        maxWords: 500
      }],
      evaluationCriteria: {
        technical: 40,
        management: 25,
        past_performance: 20,
        cost: 15
      }
    },
    GATES: {
      id: 'GATES',
      name: 'Gates Foundation',
      fullName: 'Bill & Melinda Gates Foundation',
      logo: '🔬',
      color: '#1D70B8',
      maxBudget: 100000000,
      minBudget: 100000,
      domains: ['health', 'education', 'poverty', 'agriculture', 'financial_services'],
      sections: [{
        id: 'problem',
        label: {
          fr: 'Problème',
          en: 'Problem Statement'
        },
        maxWords: 800
      }, {
        id: 'solution',
        label: {
          fr: 'Solution proposée',
          en: 'Proposed Solution'
        },
        maxWords: 1500
      }, {
        id: 'innovation',
        label: {
          fr: 'Innovation',
          en: 'Innovation'
        },
        maxWords: 1000
      }, {
        id: 'evidence',
        label: {
          fr: 'Base de preuves',
          en: 'Evidence Base'
        },
        maxWords: 1000
      }, {
        id: 'scale',
        label: {
          fr: 'Potentiel de mise à l\'échelle',
          en: 'Scale Potential'
        },
        maxWords: 800
      }, {
        id: 'team',
        label: {
          fr: 'Équipe',
          en: 'Team'
        },
        maxWords: 500
      }],
      evaluationCriteria: {
        innovation: 30,
        scalability: 25,
        evidence: 20,
        team: 15,
        cost_effectiveness: 10
      }
    },
    NIH: {
      id: 'NIH',
      name: 'NIH',
      fullName: 'National Institutes of Health',
      logo: '🔬',
      color: '#20558A',
      maxBudget: 5000000,
      minBudget: 50000,
      domains: ['health', 'mental_health', 'research', 'biomedical'],
      sections: [{
        id: 'specific_aims',
        label: {
          fr: 'Objectifs spécifiques',
          en: 'Specific Aims'
        },
        maxWords: 500
      }, {
        id: 'significance',
        label: {
          fr: 'Importance',
          en: 'Significance'
        },
        maxWords: 1500
      }, {
        id: 'innovation',
        label: {
          fr: 'Innovation',
          en: 'Innovation'
        },
        maxWords: 1000
      }, {
        id: 'approach',
        label: {
          fr: 'Approche',
          en: 'Approach'
        },
        maxWords: 3000
      }, {
        id: 'environment',
        label: {
          fr: 'Environnement',
          en: 'Environment'
        },
        maxWords: 500
      }],
      evaluationCriteria: {
        significance: 25,
        innovation: 25,
        approach: 25,
        investigators: 15,
        environment: 10
      }
    },
    WHO: {
      id: 'WHO',
      name: 'WHO',
      fullName: 'World Health Organization',
      logo: '⚕️',
      color: '#009CDE',
      maxBudget: 10000000,
      minBudget: 50000,
      domains: ['health', 'mental_health', 'ncd', 'emergencies', 'health_systems'],
      sections: [{
        id: 'background',
        label: {
          fr: 'Contexte',
          en: 'Background'
        },
        maxWords: 1000
      }, {
        id: 'objectives',
        label: {
          fr: 'Objectifs',
          en: 'Objectives'
        },
        maxWords: 800
      }, {
        id: 'activities',
        label: {
          fr: 'Activités',
          en: 'Activities'
        },
        maxWords: 1500
      }, {
        id: 'workplan',
        label: {
          fr: 'Plan de travail',
          en: 'Workplan'
        },
        maxWords: 800
      }, {
        id: 'budget',
        label: {
          fr: 'Budget',
          en: 'Budget'
        },
        maxWords: 500
      }, {
        id: 'monitoring',
        label: {
          fr: 'Suivi',
          en: 'Monitoring'
        },
        maxWords: 600
      }],
      evaluationCriteria: {
        alignment_who_priorities: 30,
        technical_quality: 25,
        feasibility: 20,
        sustainability: 15,
        value_for_money: 10
      }
    }
  },
  calculateAlignment: function (project, funderId) {
    var funder = this.funders[funderId];
    if (!funder) return {
      score: 0,
      factors: [],
      recommendation: 'unknown'
    };
    var score = 0;
    var factors = [];

    // Domain match (30 points)
    var domainMatch = funder.domains.indexOf(project.domain) !== -1;
    if (domainMatch) {
      score += 30;
      factors.push({
        factor: 'domain',
        points: 30,
        status: 'match'
      });
    } else {
      factors.push({
        factor: 'domain',
        points: 0,
        status: 'mismatch'
      });
    }

    // Budget fit (25 points)
    var budget = project.budget || 500000;
    if (budget >= funder.minBudget && budget <= funder.maxBudget) {
      score += 25;
      factors.push({
        factor: 'budget',
        points: 25,
        status: 'fit'
      });
    } else if (budget < funder.minBudget) {
      score += 10;
      factors.push({
        factor: 'budget',
        points: 10,
        status: 'low'
      });
    } else {
      factors.push({
        factor: 'budget',
        points: 0,
        status: 'high'
      });
    }

    // Framework usage (20 points)
    var hasFramework = project.framework || project.cfirScores;
    if (hasFramework) {
      score += 20;
      factors.push({
        factor: 'framework',
        points: 20,
        status: 'present'
      });
    } else {
      score += 5;
      factors.push({
        factor: 'framework',
        points: 5,
        status: 'missing'
      });
    }

    // Evidence base (15 points)
    var hasEvidence = project.evidenceBase || project.references;
    if (hasEvidence) {
      score += 15;
      factors.push({
        factor: 'evidence',
        points: 15,
        status: 'strong'
      });
    } else {
      score += 5;
      factors.push({
        factor: 'evidence',
        points: 5,
        status: 'weak'
      });
    }

    // Bonus for implementation science approach (10 points)
    if (project.strategies && project.strategies.length > 0) {
      score += 10;
      factors.push({
        factor: 'implementation_science',
        points: 10,
        status: 'yes'
      });
    }
    var recommendation = 'not_recommended';
    if (score >= 80) recommendation = 'highly_recommended';else if (score >= 60) recommendation = 'recommended';else if (score >= 40) recommendation = 'possible';
    return {
      score: score,
      factors: factors,
      recommendation: recommendation,
      tips: this.generateTips(factors, funder)
    };
  },
  generateTips: function (factors, funder) {
    var tips = [];
    factors.forEach(function (f) {
      if (f.status === 'mismatch') {
        tips.push({
          fr: 'Domaine non prioritaire pour ' + funder.name + '. Considérez de souligner les liens avec: ' + funder.domains.join(', '),
          en: 'Domain not priority for ' + funder.name + '. Consider highlighting links to: ' + funder.domains.join(', ')
        });
      }
      if (f.status === 'low') {
        tips.push({
          fr: 'Budget inférieur au minimum. Envisagez des partenariats pour atteindre ' + funder.minBudget.toLocaleString() + ' USD',
          en: 'Budget below minimum. Consider partnerships to reach ' + funder.minBudget.toLocaleString() + ' USD'
        });
      }
      if (f.status === 'missing') {
        tips.push({
          fr: 'Ajoutez un cadre théorique (CFIR, RE-AIM) pour renforcer la proposition',
          en: 'Add a theoretical framework (CFIR, RE-AIM) to strengthen the proposal'
        });
      }
    });
    return tips;
  },
  generateProposal: function (project, funderId, lang) {
    var funder = this.funders[funderId];
    if (!funder) return null;
    lang = lang || 'fr';
    var sections = [];
    var self = this;
    funder.sections.forEach(function (section) {
      sections.push({
        id: section.id,
        label: section.label[lang],
        maxWords: section.maxWords,
        content: self.generateSectionContent(section.id, project, funder, lang)
      });
    });
    return {
      funderId: funderId,
      funderName: funder.name,
      projectTitle: project.title,
      sections: sections,
      alignment: this.calculateAlignment(project, funderId),
      generatedAt: new Date().toISOString()
    };
  },
  generateSectionContent: function (sectionId, project, funder, lang) {
    var templates = {
      executive_summary: {
        fr: 'Ce projet vise à ' + (project.objectives ? project.objectives.join(', ') : 'améliorer les résultats de santé') + ' dans le contexte de ' + (project.context || 'ressources limitées') + '. En utilisant une approche basée sur la Science de l\'Implémentation, nous proposons...',
        en: 'This project aims to ' + (project.objectives ? project.objectives.join(', ') : 'improve health outcomes') + ' in the context of ' + (project.context || 'limited resources') + '. Using an Implementation Science approach, we propose...'
      },
      context: {
        fr: 'Le contexte d\'implémentation présente les caractéristiques suivantes: ' + (project.context || '[À compléter]') + '. Les barrières identifiées incluent: ' + (project.barriers || '[À compléter]') + '.',
        en: 'The implementation context has the following characteristics: ' + (project.context || '[To complete]') + '. Identified barriers include: ' + (project.barriers || '[To complete]') + '.'
      },
      objectives: {
        fr: 'Objectif principal: Améliorer ' + (project.domain || 'la santé') + ' via une implémentation structurée.\n\nRésultats attendus:\n- Adoption: Taux cible de 70%+\n- Fidélité: Score de fidélité >80%\n- Durabilité: Maintien à 12 mois post-intervention',
        en: 'Main objective: Improve ' + (project.domain || 'health') + ' through structured implementation.\n\nExpected results:\n- Adoption: Target rate 70%+\n- Fidelity: Fidelity score >80%\n- Sustainability: Maintenance at 12 months post-intervention'
      },
      implementation: {
        fr: 'La stratégie d\'implémentation s\'appuie sur le cadre CFIR 2.0 et les stratégies ERIC validées. Les stratégies sélectionnées: ' + (project.strategies ? project.strategies.join(', ') : 'Formation, Champions, Facilitation') + '.',
        en: 'The implementation strategy builds on the CFIR 2.0 framework and validated ERIC strategies. Selected strategies: ' + (project.strategies ? project.strategies.join(', ') : 'Training, Champions, Facilitation') + '.'
      }
    };
    return templates[sectionId] ? templates[sectionId][lang] : '[Section à compléter / Section to complete]';
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// MODULE 3: QUALITATIVE ANALYSIS ENGINE (QAE) v9.0
// Extraction NLP des barrières depuis transcriptions d'entretiens
// ═══════════════════════════════════════════════════════════════════════════

export default GrantAIWriter;
