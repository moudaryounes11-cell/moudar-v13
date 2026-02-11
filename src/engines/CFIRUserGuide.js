var CFIRUserGuide = {
  VERSION: '11.0.0',
  citation: 'Reardon CM et al. (2025). Implementation Science, 20:39. doi:10.1186/s13012-025-01450-7',
  // The 5 official steps from the User Guide
  steps: {
    step1: {
      id: 'studyDesign',
      number: 1,
      label: {
        fr: 'Conception de l\'étude',
        en: 'Study Design'
      },
      description: {
        fr: 'Sélectionner les construits CFIR pertinents, définir le périmètre de l\'étude, choisir méthodes',
        en: 'Select relevant CFIR constructs, define study scope, choose methods'
      },
      tasks: [{
        id: 'T1.1',
        task: {
          fr: 'Identifier la question de recherche IS',
          en: 'Identify the IS research question'
        },
        guidance: {
          fr: 'La question doit spécifier quels déterminants (CFIR) influencent quels outcomes',
          en: 'Question should specify which determinants (CFIR) influence which outcomes'
        }
      }, {
        id: 'T1.2',
        task: {
          fr: 'Sélectionner les construits CFIR pertinents',
          en: 'Select relevant CFIR constructs'
        },
        guidance: {
          fr: 'NE PAS utiliser les 39 construits — sélectionner ceux pertinents au contexte. Justifier les exclusions.',
          en: 'Do NOT use all 39 constructs — select those relevant to context. Justify exclusions.'
        }
      }, {
        id: 'T1.3',
        task: {
          fr: 'Définir l\'Inner Setting (unité d\'analyse)',
          en: 'Define the Inner Setting (unit of analysis)'
        },
        guidance: {
          fr: 'L\'Inner Setting peut être un service, un hôpital, une clinique, un programme',
          en: 'Inner Setting can be a department, hospital, clinic, program'
        }
      }, {
        id: 'T1.4',
        task: {
          fr: 'Choisir le design et les méthodes',
          en: 'Choose design and methods'
        },
        guidance: {
          fr: 'Qualitatif, quantitatif ou mixte — la plupart des études CFIR sont qualitatives',
          en: 'Qualitative, quantitative, or mixed — most CFIR studies are qualitative'
        }
      }, {
        id: 'T1.5',
        task: {
          fr: 'Intégrer le CFIR Outcomes Addendum',
          en: 'Integrate the CFIR Outcomes Addendum'
        },
        guidance: {
          fr: 'Distinguer outcomes d\'implémentation vs outcomes d\'innovation (Proctor 2011)',
          en: 'Distinguish implementation outcomes vs innovation outcomes (Proctor 2011)'
        }
      }]
    },
    step2: {
      id: 'dataCollection',
      number: 2,
      label: {
        fr: 'Collecte de données',
        en: 'Data Collection'
      },
      description: {
        fr: 'Développer instruments, guides d\'entretien, questionnaires basés sur les construits sélectionnés',
        en: 'Develop instruments, interview guides, questionnaires based on selected constructs'
      },
      tasks: [{
        id: 'T2.1',
        task: {
          fr: 'Créer le guide d\'entretien CFIR',
          en: 'Create CFIR interview guide'
        },
        guidance: {
          fr: 'Utiliser les questions exemples du User Guide (Additional File 1) comme point de départ',
          en: 'Use example questions from User Guide (Additional File 1) as starting point'
        }
      }, {
        id: 'T2.2',
        task: {
          fr: 'Adapter les questions au contexte',
          en: 'Adapt questions to context'
        },
        guidance: {
          fr: 'Les questions DOIVENT être contextualisées — ne jamais utiliser les questions génériques telles quelles',
          en: 'Questions MUST be contextualized — never use generic questions as-is'
        }
      }, {
        id: 'T2.3',
        task: {
          fr: 'Identifier les répondants par construit',
          en: 'Identify respondents per construct'
        },
        guidance: {
          fr: 'Certains construits nécessitent des informants spécifiques (ex: Leadership → dirigeants)',
          en: 'Some constructs require specific informants (e.g., Leadership → directors)'
        }
      }]
    },
    step3: {
      id: 'dataAnalysis',
      number: 3,
      label: {
        fr: 'Analyse des données',
        en: 'Data Analysis'
      },
      description: {
        fr: 'Coder les données selon les construits CFIR, utiliser les coding guidelines',
        en: 'Code data according to CFIR constructs, use coding guidelines'
      },
      tasks: [{
        id: 'T3.1',
        task: {
          fr: 'Appliquer les Coding Guidelines CFIR',
          en: 'Apply CFIR Coding Guidelines'
        },
        guidance: {
          fr: 'Utiliser Additional File 2 du User Guide — définitions opérationnelles par construit',
          en: 'Use Additional File 2 from User Guide — operational definitions per construct'
        }
      }, {
        id: 'T3.2',
        task: {
          fr: 'Coder de manière déductive ET inductive',
          en: 'Code deductively AND inductively'
        },
        guidance: {
          fr: 'Commencer par les codes CFIR (déductif), puis ajouter des codes émergents (inductif)',
          en: 'Start with CFIR codes (deductive), then add emergent codes (inductive)'
        }
      }, {
        id: 'T3.3',
        task: {
          fr: 'Compléter le Inner Setting Memo Template',
          en: 'Complete Inner Setting Memo Template'
        },
        guidance: {
          fr: 'Résumer les données par Inner Setting (Additional File 3)',
          en: 'Summarize data per Inner Setting (Additional File 3)'
        }
      }, {
        id: 'T3.4',
        task: {
          fr: 'Assigner les ratings par construit',
          en: 'Assign ratings per construct'
        },
        guidance: {
          fr: 'Utiliser les Rating Guidelines (Additional File 4) : -2 à +2 ou 1-5',
          en: 'Use Rating Guidelines (Additional File 4): -2 to +2 or 1-5'
        }
      }]
    },
    step4: {
      id: 'dataInterpretation',
      number: 4,
      label: {
        fr: 'Interprétation des données',
        en: 'Data Interpretation'
      },
      description: {
        fr: 'Construire la matrice Construit × Inner Setting, identifier patterns',
        en: 'Build Construct × Inner Setting matrix, identify patterns'
      },
      tasks: [{
        id: 'T4.1',
        task: {
          fr: 'Construire la matrice CFIR',
          en: 'Build the CFIR matrix'
        },
        guidance: {
          fr: 'Matrice Construct × Inner Setting (Additional File 5) — ratings + résumés par cellule',
          en: 'Construct × Inner Setting matrix (Additional File 5) — ratings + summaries per cell'
        }
      }, {
        id: 'T4.2',
        task: {
          fr: 'Analyser les patterns cross-case',
          en: 'Analyze cross-case patterns'
        },
        guidance: {
          fr: 'Comparer les ratings entre Inner Settings pour identifier barrières/facilitateurs systémiques',
          en: 'Compare ratings across Inner Settings to identify systemic barriers/facilitators'
        }
      }, {
        id: 'T4.3',
        task: {
          fr: 'Distinguer construits faiblement vs fortement distinguants',
          en: 'Distinguish weakly vs strongly distinguishing constructs'
        },
        guidance: {
          fr: 'Les construits qui varient le plus entre sites performants et non-performants sont les plus informatifs',
          en: 'Constructs that vary most between high and low performing sites are most informative'
        }
      }]
    },
    step5: {
      id: 'knowledgeDissemination',
      number: 5,
      label: {
        fr: 'Dissémination des connaissances',
        en: 'Knowledge Dissemination'
      },
      description: {
        fr: 'Rapporter les résultats CFIR de manière transparente et reproductible',
        en: 'Report CFIR findings transparently and reproducibly'
      },
      tasks: [{
        id: 'T5.1',
        task: {
          fr: 'Utiliser le CFIR Implementation Research Worksheet',
          en: 'Use CFIR Implementation Research Worksheet'
        },
        guidance: {
          fr: 'Additional File 6 — checklist de reporting transparent',
          en: 'Additional File 6 — transparent reporting checklist'
        }
      }, {
        id: 'T5.2',
        task: {
          fr: 'Rapporter conformément à StaRI',
          en: 'Report in accordance with StaRI'
        },
        guidance: {
          fr: 'Pinnock et al. (2017) — 27 items de reporting',
          en: 'Pinnock et al. (2017) — 27 reporting items'
        }
      }, {
        id: 'T5.3',
        task: {
          fr: 'Publier les outils et données de codage',
          en: 'Publish coding tools and data'
        },
        guidance: {
          fr: 'Rendre les codebooks et matrices disponibles en matériel supplémentaire',
          en: 'Make codebooks and matrices available as supplementary material'
        }
      }]
    }
  },
  // 6 official templates from User Guide
  templates: {
    AF1: {
      id: 'AF1',
      label: {
        fr: 'Questions exemples par construit CFIR',
        en: 'CFIR Construct Example Questions'
      },
      type: 'interview',
      stariRef: 'ST07'
    },
    AF2: {
      id: 'AF2',
      label: {
        fr: 'Directives de codage CFIR',
        en: 'CFIR Construct Coding Guidelines'
      },
      type: 'analysis',
      stariRef: 'ST14'
    },
    AF3: {
      id: 'AF3',
      label: {
        fr: 'Template Memo Inner Setting',
        en: 'Inner Setting Memo Template'
      },
      type: 'analysis',
      stariRef: 'ST14'
    },
    AF4: {
      id: 'AF4',
      label: {
        fr: 'Directives de notation CFIR',
        en: 'CFIR Construct Rating Guidelines'
      },
      type: 'analysis',
      stariRef: 'ST14'
    },
    AF5: {
      id: 'AF5',
      label: {
        fr: 'Matrice Construit × Inner Setting',
        en: 'CFIR Construct × Inner Setting Matrix'
      },
      type: 'interpretation',
      stariRef: 'ST15'
    },
    AF6: {
      id: 'AF6',
      label: {
        fr: 'Worksheet de recherche CFIR',
        en: 'CFIR Implementation Research Worksheet'
      },
      type: 'reporting',
      stariRef: 'ST23'
    }
  },
  // CFIR Outcomes Addendum (Damschroder 2022)
  outcomesAddendum: {
    implementationOutcomes: ['Acceptability', 'Adoption', 'Appropriateness', 'Feasibility', 'Fidelity', 'Cost', 'Penetration', 'Sustainability'],
    innovationOutcomes: ['Reach', 'Effectiveness', 'Safety'],
    distinction: {
      fr: 'Les outcomes d\'implémentation (Proctor) ≠ outcomes d\'innovation (cliniques). Le CFIR évalue les déterminants qui influencent les outcomes d\'implémentation.',
      en: 'Implementation outcomes (Proctor) ≠ innovation outcomes (clinical). CFIR evaluates determinants that influence implementation outcomes.'
    }
  },
  // FAQ from User Guide
  faqs: [{
    q: {
      fr: 'Dois-je utiliser les 39 construits ?',
      en: 'Do I need to use all 39 constructs?'
    },
    a: {
      fr: 'NON. Sélectionnez uniquement les construits pertinents à votre contexte. Justifiez les exclusions.',
      en: 'NO. Select only constructs relevant to your context. Justify exclusions.'
    }
  }, {
    q: {
      fr: 'Le CFIR est-il une théorie ?',
      en: 'Is CFIR a theory?'
    },
    a: {
      fr: 'Non. Le CFIR est un cadre de déterminants (determinant framework), pas une théorie. Il identifie des facteurs mais ne spécifie pas les mécanismes causaux.',
      en: 'No. CFIR is a determinant framework, not a theory. It identifies factors but does not specify causal mechanisms.'
    }
  }, {
    q: {
      fr: 'Puis-je combiner CFIR avec d\'autres cadres ?',
      en: 'Can I combine CFIR with other frameworks?'
    },
    a: {
      fr: 'OUI, c\'est recommandé. CFIR pour les déterminants + ERIC pour les stratégies + Proctor pour les outcomes + RE-AIM pour l\'évaluation.',
      en: 'YES, it is recommended. CFIR for determinants + ERIC for strategies + Proctor for outcomes + RE-AIM for evaluation.'
    }
  }, {
    q: {
      fr: 'Comment citer le CFIR ?',
      en: 'How to cite CFIR?'
    },
    a: {
      fr: 'Citer Damschroder 2009 (original) ET Damschroder 2022 (mise à jour) ET Reardon 2025 (User Guide)',
      en: 'Cite Damschroder 2009 (original) AND Damschroder 2022 (update) AND Reardon 2025 (User Guide)'
    }
  }],
  // Assess study progress through 5 steps
  assessProgress: function (projectData) {
    var self = this;
    var progress = {};
    Object.keys(self.steps).forEach(function (stepKey) {
      var step = self.steps[stepKey];
      var completed = 0;
      step.tasks.forEach(function (task) {
        if (projectData[task.id]) completed++;
      });
      progress[stepKey] = {
        total: step.tasks.length,
        completed: completed,
        percent: Math.round(completed / step.tasks.length * 100)
      };
    });
    var totalTasks = 0;
    var totalCompleted = 0;
    Object.values(progress).forEach(function (p) {
      totalTasks += p.total;
      totalCompleted += p.completed;
    });
    progress.overall = {
      total: totalTasks,
      completed: totalCompleted,
      percent: Math.round(totalCompleted / totalTasks * 100)
    };
    return progress;
  }
};
console.log('✅ MOUDAR v11.0: CFIRUserGuide loaded — 5 steps, 18 tasks, 6 templates (Reardon 2025)');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE D2: PRISM-RE-AIM EVALUATOR
// Practical, Robust Implementation and Sustainability Model
// Glasgow RE et al. (2019) + Trinkley KE et al. (2023) iPRISM
// ═══════════════════════════════════════════════════════════════════════════

export default CFIRUserGuide;
