var COMBDiagnostic = {
  VERSION: '11.0.0',
  citation: 'Michie S, van Stralen MM, West R. (2011). Implementation Science, 6:42',
  tdfCitation: 'Cane J, O\'Connor D, Michie S. (2012). Implementation Science, 7:37',
  // COM-B model
  comB: {
    capability: {
      id: 'capability',
      label: {
        fr: 'Capacité',
        en: 'Capability'
      },
      color: '#3b82f6',
      subComponents: {
        physical: {
          id: 'cap_physical',
          label: {
            fr: 'Physique',
            en: 'Physical'
          },
          description: {
            fr: 'Compétences, force, endurance nécessaires',
            en: 'Skills, strength, stamina needed'
          }
        },
        psychological: {
          id: 'cap_psychological',
          label: {
            fr: 'Psychologique',
            en: 'Psychological'
          },
          description: {
            fr: 'Connaissances, mémoire, processus décisionnels',
            en: 'Knowledge, memory, decision processes'
          }
        }
      }
    },
    opportunity: {
      id: 'opportunity',
      label: {
        fr: 'Opportunité',
        en: 'Opportunity'
      },
      color: '#059669',
      subComponents: {
        physical: {
          id: 'opp_physical',
          label: {
            fr: 'Physique',
            en: 'Physical'
          },
          description: {
            fr: 'Temps, ressources, accès, environnement',
            en: 'Time, resources, access, environment'
          }
        },
        social: {
          id: 'opp_social',
          label: {
            fr: 'Sociale',
            en: 'Social'
          },
          description: {
            fr: 'Normes sociales, influences interpersonnelles',
            en: 'Social norms, interpersonal influences'
          }
        }
      }
    },
    motivation: {
      id: 'motivation',
      label: {
        fr: 'Motivation',
        en: 'Motivation'
      },
      color: '#d97706',
      subComponents: {
        reflective: {
          id: 'mot_reflective',
          label: {
            fr: 'Réflective',
            en: 'Reflective'
          },
          description: {
            fr: 'Plans, évaluations, intentions conscientes',
            en: 'Plans, evaluations, conscious intentions'
          }
        },
        automatic: {
          id: 'mot_automatic',
          label: {
            fr: 'Automatique',
            en: 'Automatic'
          },
          description: {
            fr: 'Émotions, habitudes, désirs, pulsions',
            en: 'Emotions, habits, desires, impulses'
          }
        }
      }
    }
  },
  // TDF 14 domains mapped to COM-B
  tdfDomains: [{
    id: 'TDF01',
    name: {
      fr: 'Connaissances',
      en: 'Knowledge'
    },
    comB: 'cap_psychological',
    description: {
      fr: 'Conscience de l\'existence de quelque chose',
      en: 'Awareness of the existence of something'
    }
  }, {
    id: 'TDF02',
    name: {
      fr: 'Compétences',
      en: 'Skills'
    },
    comB: 'cap_physical',
    description: {
      fr: 'Capacité ou maîtrise acquise par la pratique',
      en: 'Ability or proficiency acquired through practice'
    }
  }, {
    id: 'TDF03',
    name: {
      fr: 'Rôle social/professionnel et identité',
      en: 'Social/Professional Role and Identity'
    },
    comB: 'mot_reflective',
    description: {
      fr: 'Ensemble de comportements attendus d\'un individu dans sa position',
      en: 'Set of behaviors expected of an individual in their position'
    }
  }, {
    id: 'TDF04',
    name: {
      fr: 'Croyances sur les capacités',
      en: 'Beliefs about Capabilities'
    },
    comB: 'mot_reflective',
    description: {
      fr: 'Acceptation de la vérité/réalité de sa capacité/talent',
      en: 'Acceptance of truth/reality about ability/talent'
    }
  }, {
    id: 'TDF05',
    name: {
      fr: 'Optimisme',
      en: 'Optimism'
    },
    comB: 'mot_reflective',
    description: {
      fr: 'Confiance que les choses iront bien',
      en: 'Confidence that things will happen for the best'
    }
  }, {
    id: 'TDF06',
    name: {
      fr: 'Croyances sur les conséquences',
      en: 'Beliefs about Consequences'
    },
    comB: 'mot_reflective',
    description: {
      fr: 'Acceptation de la vérité/réalité des résultats d\'un comportement',
      en: 'Acceptance of truth/reality about outcomes of behavior'
    }
  }, {
    id: 'TDF07',
    name: {
      fr: 'Renforcement',
      en: 'Reinforcement'
    },
    comB: 'mot_automatic',
    description: {
      fr: 'Augmenter la probabilité d\'une réponse par un stimulus',
      en: 'Increasing probability of a response through a stimulus'
    }
  }, {
    id: 'TDF08',
    name: {
      fr: 'Intentions',
      en: 'Intentions'
    },
    comB: 'mot_reflective',
    description: {
      fr: 'Décision consciente d\'adopter un comportement',
      en: 'Conscious decision to adopt a behavior'
    }
  }, {
    id: 'TDF09',
    name: {
      fr: 'Objectifs',
      en: 'Goals'
    },
    comB: 'mot_reflective',
    description: {
      fr: 'Représentation mentale de résultats ou fins visés',
      en: 'Mental representation of outcomes or end states to aim for'
    }
  }, {
    id: 'TDF10',
    name: {
      fr: 'Mémoire, attention et processus décisionnels',
      en: 'Memory, Attention and Decision Processes'
    },
    comB: 'cap_psychological',
    description: {
      fr: 'Capacité à retenir, se concentrer et choisir entre alternatives',
      en: 'Ability to retain, focus, and choose between alternatives'
    }
  }, {
    id: 'TDF11',
    name: {
      fr: 'Contexte environnemental et ressources',
      en: 'Environmental Context and Resources'
    },
    comB: 'opp_physical',
    description: {
      fr: 'Circonstances de la situation ou de l\'environnement',
      en: 'Circumstances of situation or environment'
    }
  }, {
    id: 'TDF12',
    name: {
      fr: 'Influences sociales',
      en: 'Social Influences'
    },
    comB: 'opp_social',
    description: {
      fr: 'Processus interpersonnels qui modifient les pensées, sentiments ou comportements',
      en: 'Interpersonal processes that alter thoughts, feelings, or behaviors'
    }
  }, {
    id: 'TDF13',
    name: {
      fr: 'Émotion',
      en: 'Emotion'
    },
    comB: 'mot_automatic',
    description: {
      fr: 'Patron complexe de réaction incluant sentiments et réponses physiologiques',
      en: 'Complex pattern of reaction including feelings and physiological responses'
    }
  }, {
    id: 'TDF14',
    name: {
      fr: 'Régulation comportementale',
      en: 'Behavioural Regulation'
    },
    comB: 'cap_psychological',
    description: {
      fr: 'Tout ce qui vise à gérer ou modifier les actions',
      en: 'Anything aimed at managing or changing actions'
    }
  }],
  // BCW Intervention Functions mapped to COM-B
  interventionFunctions: {
    education: {
      comB: ['cap_psychological'],
      label: {
        fr: 'Éducation',
        en: 'Education'
      },
      description: {
        fr: 'Augmenter connaissances/compréhension',
        en: 'Increase knowledge/understanding'
      }
    },
    persuasion: {
      comB: ['mot_reflective', 'mot_automatic'],
      label: {
        fr: 'Persuasion',
        en: 'Persuasion'
      },
      description: {
        fr: 'Utiliser la communication pour susciter des sentiments positifs',
        en: 'Use communication to induce positive feelings'
      }
    },
    incentivisation: {
      comB: ['mot_reflective', 'mot_automatic'],
      label: {
        fr: 'Incitation',
        en: 'Incentivisation'
      },
      description: {
        fr: 'Créer une attente de récompense',
        en: 'Create expectation of reward'
      }
    },
    coercion: {
      comB: ['mot_reflective', 'mot_automatic'],
      label: {
        fr: 'Coercition',
        en: 'Coercion'
      },
      description: {
        fr: 'Créer une attente de punition',
        en: 'Create expectation of punishment'
      }
    },
    training: {
      comB: ['cap_physical', 'cap_psychological'],
      label: {
        fr: 'Formation',
        en: 'Training'
      },
      description: {
        fr: 'Transmettre des compétences',
        en: 'Impart skills'
      }
    },
    restriction: {
      comB: ['opp_physical', 'opp_social'],
      label: {
        fr: 'Restriction',
        en: 'Restriction'
      },
      description: {
        fr: 'Utiliser des règles pour réduire l\'opportunité',
        en: 'Use rules to reduce opportunity'
      }
    },
    environmentalRestructuring: {
      comB: ['opp_physical', 'opp_social'],
      label: {
        fr: 'Restructuration environnementale',
        en: 'Environmental Restructuring'
      },
      description: {
        fr: 'Modifier l\'environnement physique ou social',
        en: 'Change physical or social environment'
      }
    },
    modelling: {
      comB: ['mot_reflective', 'cap_psychological'],
      label: {
        fr: 'Modélisation',
        en: 'Modelling'
      },
      description: {
        fr: 'Fournir un exemple à imiter',
        en: 'Provide example to aspire to or imitate'
      }
    },
    enablement: {
      comB: ['cap_physical', 'cap_psychological', 'opp_physical'],
      label: {
        fr: 'Facilitation',
        en: 'Enablement'
      },
      description: {
        fr: 'Augmenter les moyens/réduire les barrières',
        en: 'Increase means/reduce barriers'
      }
    }
  },
  // Diagnose behavior using COM-B
  diagnose: function (scores, lang) {
    var self = this;
    var t = function (fr, en) {
      return lang === 'fr' ? fr : en;
    };
    var result = {
      components: {},
      tdfAnalysis: [],
      recommendations: [],
      globalScore: 0
    };
    var totalScore = 0;
    var count = 0;
    Object.keys(self.comB).forEach(function (compKey) {
      var comp = self.comB[compKey];
      var subScores = {};
      Object.keys(comp.subComponents).forEach(function (subKey) {
        var sub = comp.subComponents[subKey];
        subScores[subKey] = scores[sub.id] || 0;
      });
      var avg = 0;
      var n = 0;
      Object.values(subScores).forEach(function (s) {
        avg += s;
        n++;
      });
      avg = n > 0 ? Math.round(avg / n) : 0;
      result.components[compKey] = {
        label: comp.label,
        color: comp.color,
        score: avg,
        subScores: subScores
      };
      totalScore += avg;
      count++;
    });
    result.globalScore = count > 0 ? Math.round(totalScore / count) : 0;

    // Map low COM-B to TDF domains
    Object.keys(result.components).forEach(function (compKey) {
      if (result.components[compKey].score < 60) {
        Object.keys(result.components[compKey].subScores).forEach(function (subKey) {
          if (result.components[compKey].subScores[subKey] < 60) {
            self.tdfDomains.forEach(function (tdf) {
              if (tdf.comB === subKey) {
                result.tdfAnalysis.push({
                  domain: tdf.name,
                  comB: compKey,
                  score: result.components[compKey].subScores[subKey]
                });
              }
            });
          }
        });
      }
    });

    // Recommend intervention functions
    Object.keys(result.components).forEach(function (compKey) {
      if (result.components[compKey].score < 60) {
        Object.keys(self.interventionFunctions).forEach(function (funcKey) {
          var func = self.interventionFunctions[funcKey];
          var subs = Object.keys(self.comB[compKey].subComponents);
          subs.forEach(function (sub) {
            if (func.comB.indexOf(sub) >= 0) {
              result.recommendations.push({
                function: func.label,
                target: self.comB[compKey].label,
                rationale: func.description
              });
            }
          });
        });
      }
    });
    return result;
  }
};
console.log('✅ MOUDAR v11.0: COMBDiagnostic loaded — COM-B (3+6), TDF (14 domains), BCW (9 functions)');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE D5: HYBRID EFFECTIVENESS-IMPLEMENTATION DESIGN WIZARD
// Curran GM et al. (2012) Medical Care 50:217-226
// First automated Hybrid Design Wizard in the world
// ═══════════════════════════════════════════════════════════════════════════

export default COMBDiagnostic;
