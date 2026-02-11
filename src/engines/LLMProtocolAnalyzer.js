var LLMProtocolAnalyzer = {
  VERSION: '11.0.0',
  citation: 'Trinkley KE et al. (2024). Implementation Science, 19:21',
  stariCitation: 'Pinnock H et al. (2017). BMJ, 356:i6795',
  // ---- ANALYSIS MODES ----
  modes: {
    protocol: {
      id: 'protocol',
      label: {
        fr: 'Analyse de Protocole',
        en: 'Protocol Analysis'
      },
      icon: '📋',
      description: {
        fr: 'Analysez un protocole de recherche et identifiez les éléments IS',
        en: 'Analyze a research protocol and identify IS elements'
      }
    },
    grantReview: {
      id: 'grantReview',
      label: {
        fr: 'Revue de Subvention',
        en: 'Grant Review'
      },
      icon: '💰',
      description: {
        fr: 'Évaluez une proposition de subvention contre RE-AIM/CFIR/StaRI',
        en: 'Evaluate a grant proposal against RE-AIM/CFIR/StaRI'
      }
    },
    manuscriptReview: {
      id: 'manuscriptReview',
      label: {
        fr: 'Revue de Manuscrit',
        en: 'Manuscript Review'
      },
      icon: '📄',
      description: {
        fr: 'Vérifiez la conformité StaRI et identifiez les sections manquantes',
        en: 'Check StaRI compliance and identify missing sections'
      }
    },
    barrierScan: {
      id: 'barrierScan',
      label: {
        fr: 'Scan de Barrières',
        en: 'Barrier Scan'
      },
      icon: '🔍',
      description: {
        fr: 'Identifiez les barrières et facilitateurs dans un texte',
        en: 'Identify barriers and facilitators in text'
      }
    }
  },
  // ---- StaRI CHECKLIST (Pinnock 2017) ----
  stariChecklist: {
    title: [{
      id: 'ST01',
      item: {
        fr: 'Identification comme étude d\'implémentation',
        en: 'Identification as implementation study'
      },
      section: 'Title',
      weight: 1.0
    }],
    abstract: [{
      id: 'ST02',
      item: {
        fr: 'Résumé structuré incluant stratégie d\'implémentation',
        en: 'Structured summary including implementation strategy'
      },
      section: 'Abstract',
      weight: 0.9
    }],
    introduction: [{
      id: 'ST03',
      item: {
        fr: 'Justification scientifique de l\'intervention',
        en: 'Scientific rationale for intervention'
      },
      section: 'Introduction',
      weight: 0.8
    }, {
      id: 'ST04',
      item: {
        fr: 'Identification des barrières et facilitateurs',
        en: 'Identification of barriers and facilitators'
      },
      section: 'Introduction',
      weight: 0.9
    }, {
      id: 'ST05',
      item: {
        fr: 'Objectifs d\'implémentation distincts des objectifs cliniques',
        en: 'Implementation objectives distinct from clinical objectives'
      },
      section: 'Introduction',
      weight: 1.0
    }],
    methods: [{
      id: 'ST06',
      item: {
        fr: 'Design de l\'étude d\'implémentation',
        en: 'Implementation study design'
      },
      section: 'Methods',
      weight: 1.0
    }, {
      id: 'ST07',
      item: {
        fr: 'Description du contexte',
        en: 'Description of context/setting'
      },
      section: 'Methods',
      weight: 0.95
    }, {
      id: 'ST08',
      item: {
        fr: 'Cadre théorique/conceptuel',
        en: 'Theoretical/conceptual framework'
      },
      section: 'Methods',
      weight: 1.0
    }, {
      id: 'ST09',
      item: {
        fr: 'Description de l\'intervention',
        en: 'Description of intervention'
      },
      section: 'Methods',
      weight: 0.95
    }, {
      id: 'ST10',
      item: {
        fr: 'Description de la stratégie d\'implémentation',
        en: 'Description of implementation strategy'
      },
      section: 'Methods',
      weight: 1.0
    }, {
      id: 'ST11',
      item: {
        fr: 'Outcomes d\'implémentation mesurés',
        en: 'Implementation outcomes measured'
      },
      section: 'Methods',
      weight: 1.0
    }, {
      id: 'ST12',
      item: {
        fr: 'Outcomes cliniques/de service',
        en: 'Clinical/service outcomes'
      },
      section: 'Methods',
      weight: 0.85
    }, {
      id: 'ST13',
      item: {
        fr: 'Taille d\'échantillon et justification',
        en: 'Sample size and justification'
      },
      section: 'Methods',
      weight: 0.8
    }, {
      id: 'ST14',
      item: {
        fr: 'Plan d\'analyse (implémentation)',
        en: 'Analysis plan (implementation)'
      },
      section: 'Methods',
      weight: 0.9
    }, {
      id: 'ST15',
      item: {
        fr: 'Considérations éthiques',
        en: 'Ethical considerations'
      },
      section: 'Methods',
      weight: 0.7
    }],
    results: [{
      id: 'ST16',
      item: {
        fr: 'Résultats d\'implémentation rapportés',
        en: 'Implementation outcomes reported'
      },
      section: 'Results',
      weight: 1.0
    }, {
      id: 'ST17',
      item: {
        fr: 'Fidélité/adaptations documentées',
        en: 'Fidelity/adaptations documented'
      },
      section: 'Results',
      weight: 0.9
    }, {
      id: 'ST18',
      item: {
        fr: 'Résultats cliniques rapportés',
        en: 'Clinical outcomes reported'
      },
      section: 'Results',
      weight: 0.85
    }],
    discussion: [{
      id: 'ST19',
      item: {
        fr: 'Interprétation des résultats d\'implémentation',
        en: 'Interpretation of implementation results'
      },
      section: 'Discussion',
      weight: 0.9
    }, {
      id: 'ST20',
      item: {
        fr: 'Limites liées à l\'implémentation',
        en: 'Implementation-related limitations'
      },
      section: 'Discussion',
      weight: 0.8
    }, {
      id: 'ST21',
      item: {
        fr: 'Généralisabilité/transférabilité',
        en: 'Generalizability/transferability'
      },
      section: 'Discussion',
      weight: 0.85
    }, {
      id: 'ST22',
      item: {
        fr: 'Implications pour la pratique/politique',
        en: 'Implications for practice/policy'
      },
      section: 'Discussion',
      weight: 0.9
    }, {
      id: 'ST23',
      item: {
        fr: 'Prochaines étapes / scale-up',
        en: 'Next steps / scale-up'
      },
      section: 'Discussion',
      weight: 0.75
    }]
  },
  // ---- DEEP NLP EXTRACTION PATTERNS ----
  extractionPatterns: {
    innovation: {
      patterns: [/(?:intervention|innovation|programme|program|traitement|treatment|approche|approach|modèle|model|protocole|protocol)\s*[:\-]?\s*([^\.]{10,120})/gi, /(?:we\s+(?:developed|designed|implemented|tested)|nous\s+avons\s+(?:développé|conçu|mis en|testé))\s+([^\.]{10,100})/gi, /(?:evidence[- ]based|fondé sur les preuves|données probantes)\s+([^\.]{5,80})/gi],
      label: {
        fr: 'Innovation / Intervention',
        en: 'Innovation / Intervention'
      }
    },
    context: {
      patterns: [/(?:setting|contexte|milieu|environnement|lieu)\s*[:\-]?\s*([^\.]{5,100})/gi, /(?:conducted|mené|réalisé|effectué)\s+(?:in|dans|au|aux|à)\s+([^\.]{5,80})/gi, /(?:hospital|hôpital|clinic|clinique|center|centre|community|communauté|district|province|region|urban|rural|primary care|soins primaires)[^\.]{0,60}/gi],
      label: {
        fr: 'Contexte',
        en: 'Context/Setting'
      }
    },
    population: {
      patterns: [/(?:participants?|patients?|bénéficiaires|beneficiaries|population|échantillon|sample)\s*[:\-]?\s*([^\.]{10,100})/gi, /(?:eligib|inclusion|exclusion)\s*(?:criteria|critères)\s*[:\-]?\s*([^\.]{10,120})/gi, /[Nn]\s*=\s*(\d+)/g, /(\d+)\s*(?:participants?|patients?|sites?|facilities|établissements)/gi],
      label: {
        fr: 'Population / Échantillon',
        en: 'Population / Sample'
      }
    },
    strategies: {
      patterns: [/(?:strateg|implementation\s+strateg|stratégie d'implémentation)[^\.]{0,150}/gi, /(?:training|formation|audit|feedback|facilitation|champion|supervision|coaching|mentoring|incentive|coalition|adaptation|task.?shift)/gi],
      label: {
        fr: 'Stratégies d\'implémentation',
        en: 'Implementation strategies'
      }
    },
    outcomes: {
      patterns: [/(?:primary\s+outcome|critère\s+principal|outcome\s+measure|mesure\s+de\s+résultat)\s*[:\-]?\s*([^\.]{10,100})/gi, /(?:secondary\s+outcome|critère\s+secondaire)\s*[:\-]?\s*([^\.]{10,100})/gi, /(?:implementation\s+outcome|outcome\s+d'implémentation|RE-AIM|acceptab|adopt|feasib|fidelit|penetrat|sustainab)/gi],
      label: {
        fr: 'Outcomes',
        en: 'Outcomes'
      }
    },
    framework: {
      patterns: [/(?:CFIR|Consolidated Framework|RE-AIM|EPIS|NPT|Normalization Process|COM-B|TDF|Theoretical Domains|Proctor|FRAME|Precede.?Proceed|Getting to Outcomes|Quality Implementation|Interactive Systems|PARIHS|i-PARIHS)/gi],
      label: {
        fr: 'Cadres théoriques',
        en: 'Theoretical frameworks'
      }
    },
    equity: {
      patterns: [/(?:equit|equity|inégalité|inequality|disparit|health disparit|social determinant|déterminant social|vulnerable|vulnérable|marginal|underserved|sous-desservi|gender|genre|ethnic|ethnique|racial|race|socioeconomic|socioéconomique|rural|disability|handicap|indigenous|autochtone|refugee|réfugié|migrant|low.?income|faible revenu)/gi],
      label: {
        fr: 'Équité en santé',
        en: 'Health Equity'
      }
    },
    sustainability: {
      patterns: [/(?:sustainab|pérennit|pérennisation|scale.?up|mise à l'échelle|institutionnal|routiniz|routinis|embed|ancrage|long.?term|long terme|maintenance|maintien|after\s+funding|après\s+financement|capacity\s+building|renforcement\s+des\s+capacités)/gi],
      label: {
        fr: 'Pérennité / Scaling',
        en: 'Sustainability / Scaling'
      }
    },
    design: {
      patterns: [/(?:randomized|randomisé|RCT|essai contrôlé|stepped.?wedge|hybrid|cluster|quasi.?experiment|pre.?post|mixed.?method|méthode mixte|qualitative|quantitative|SMART design|pragmatic trial|effectiveness.?implementation)/gi],
      label: {
        fr: 'Design de l\'étude',
        en: 'Study design'
      }
    }
  },
  // ---- CFIR 2.0 KEYWORD DETECTOR ----
  cfirDetectors: {
    IC2: ['evidence', 'preuves', 'données probantes', 'efficacy', 'efficacité', 'systematic review', 'revue systématique', 'meta-analysis', 'méta-analyse'],
    IC4: ['adaptab', 'adaptation', 'tailoring', 'cultural adaptation', 'adaptation culturelle', 'flexible', 'modifiable'],
    IC6: ['complex', 'difficul', 'barrier', 'barrière', 'obstacle', 'challenge', 'défi'],
    IC7: ['design', 'conception', 'packaging', 'bundl', 'user-friendly', 'interface'],
    OS3: ['local conditions', 'conditions locales', 'community needs', 'besoins communautaires', 'social determinant', 'déterminant social'],
    OS5: ['policy', 'politique', 'regulation', 'réglementation', 'guideline', 'recommandation', 'mandate', 'mandat'],
    IS4: ['culture', 'norms', 'normes', 'values', 'valeurs', 'beliefs', 'croyances'],
    IS6: ['compatibility', 'compatibilité', 'fit', 'alignment', 'alignement', 'workflow', 'flux de travail'],
    IS11: ['leadership', 'leader', 'manager', 'gestionnaire', 'director', 'directeur', 'champion', 'sponsor'],
    IS12: ['resource', 'ressource', 'funding', 'financement', 'budget', 'staff', 'personnel', 'time', 'temps'],
    IN2: ['capability', 'capacité', 'competence', 'compétence', 'skill', 'ability', 'training need', 'besoin de formation'],
    IN4: ['motivation', 'willingness', 'volonté', 'readiness', 'préparation', 'buy-in', 'adhésion'],
    PR2: ['planning', 'planification', 'action plan', 'plan d\'action', 'timeline', 'chronogramme', 'workplan'],
    PR3: ['engaging', 'engagement', 'stakeholder', 'partie prenante', 'involving', 'implication', 'participat'],
    PR5: ['evaluat', 'évaluat', 'monitor', 'suivi', 'feedback', 'retour', 'reflect', 'réflex', 'audit']
  },
  // ---- RE-AIM DETECTOR ----
  reaimDetectors: {
    reach: ['reach', 'portée', 'coverage', 'couverture', 'participation rate', 'taux de participation', 'who participates', 'qui participe', 'representativeness', 'représentativité', 'target population'],
    effectiveness: ['effectiveness', 'efficacité', 'clinical outcome', 'résultat clinique', 'quality of life', 'qualité de vie', 'patient outcome', 'health outcome', 'symptom', 'symptôme', 'mortality', 'mortalité'],
    adoption: ['adoption', 'uptake', 'implementation rate', 'taux d\'implémentation', 'provider', 'prestataire', 'setting', 'organization'],
    implementation: ['implementation', 'implémentation', 'mise en œuvre', 'fidelity', 'fidélité', 'cost', 'coût', 'protocol adherence', 'adherence', 'delivery'],
    maintenance: ['maintenance', 'maintien', 'sustainability', 'pérennité', 'sustained', 'long-term', 'institutionalization', 'institutionnalisation', 'after funding', 'après financement']
  },
  // ---- MAIN ANALYSIS FUNCTION ----
  analyze: function (text, mode, lang) {
    lang = lang || 'fr';
    mode = mode || 'protocol';
    var self = this;
    var textLower = text.toLowerCase();
    var result = {
      mode: mode,
      lang: lang,
      wordCount: text.split(/\s+/).length,
      extractedElements: {},
      cfirMapping: {},
      reaimMapping: {},
      stariCompliance: null,
      gaps: [],
      strengths: [],
      recommendations: [],
      scores: {},
      generatedAt: new Date().toISOString()
    };

    // 1. EXTRACT ELEMENTS
    Object.keys(self.extractionPatterns).forEach(function (category) {
      var config = self.extractionPatterns[category];
      var matches = [];
      config.patterns.forEach(function (pattern) {
        var re = new RegExp(pattern.source, pattern.flags);
        var m;
        while ((m = re.exec(text)) !== null) {
          var extracted = (m[1] || m[0]).trim();
          if (extracted.length > 3 && extracted.length < 200) {
            matches.push(extracted);
          }
        }
      });
      // Deduplicate
      var unique = [];
      matches.forEach(function (m) {
        var isDuplicate = unique.some(function (u) {
          return u.toLowerCase() === m.toLowerCase();
        });
        if (!isDuplicate) unique.push(m);
      });
      result.extractedElements[category] = {
        label: config.label[lang],
        count: unique.length,
        items: unique.slice(0, 10),
        detected: unique.length > 0
      };
    });

    // 2. MAP TO CFIR 2.0
    var cfirTotal = 0;
    var cfirDetected = 0;
    Object.keys(self.cfirDetectors).forEach(function (constructId) {
      var keywords = self.cfirDetectors[constructId];
      var found = keywords.filter(function (kw) {
        return textLower.includes(kw.toLowerCase());
      });
      cfirTotal++;
      var detected = found.length > 0;
      if (detected) cfirDetected++;
      result.cfirMapping[constructId] = {
        detected: detected,
        matches: found,
        strength: found.length >= 3 ? 'strong' : found.length >= 1 ? 'partial' : 'absent'
      };
    });
    result.scores.cfir = Math.round(cfirDetected / cfirTotal * 100);

    // 3. MAP TO RE-AIM
    var reaimTotal = 0;
    var reaimDetected = 0;
    Object.keys(self.reaimDetectors).forEach(function (dimId) {
      var keywords = self.reaimDetectors[dimId];
      var found = keywords.filter(function (kw) {
        return textLower.includes(kw.toLowerCase());
      });
      reaimTotal++;
      var detected = found.length > 0;
      if (detected) reaimDetected++;
      result.reaimMapping[dimId] = {
        detected: detected,
        matches: found,
        strength: found.length >= 3 ? 'strong' : found.length >= 1 ? 'partial' : 'absent'
      };
    });
    result.scores.reaim = Math.round(reaimDetected / reaimTotal * 100);

    // 4. StaRI COMPLIANCE CHECK
    if (mode === 'manuscriptReview' || mode === 'grantReview' || mode === 'protocol') {
      result.stariCompliance = self.checkStaRI(text, lang);
      result.scores.stari = result.stariCompliance.score;
    }

    // 5. GAP IDENTIFICATION
    result.gaps = self.identifyGaps(result, lang);

    // 6. STRENGTHS
    result.strengths = self.identifyStrengths(result, lang);

    // 7. RECOMMENDATIONS
    result.recommendations = self.generateRecommendations(result, lang);

    // 8. GLOBAL SCORE
    result.scores.global = Math.round(result.scores.cfir * 0.30 + result.scores.reaim * 0.25 + (result.scores.stari || 0) * 0.25 + (result.extractedElements.equity.detected ? 100 : 0) * 0.10 + (result.extractedElements.sustainability.detected ? 100 : 0) * 0.10);
    return result;
  },
  // ---- StaRI COMPLIANCE ----
  checkStaRI: function (text, lang) {
    var self = this;
    var textLower = text.toLowerCase();
    var items = [];
    var totalWeight = 0;
    var scoredWeight = 0;
    var stariKeywords = {
      ST01: ['implementation', 'implémentation', 'mise en œuvre', 'implementation study', 'étude d\'implémentation'],
      ST04: ['barrier', 'barrière', 'facilitator', 'facilitateur', 'determinant', 'déterminant'],
      ST05: ['implementation objective', 'objectif d\'implémentation', 'implementation outcome', 'outcome d\'implémentation'],
      ST07: ['setting', 'contexte', 'context', 'site', 'facility', 'établissement'],
      ST08: ['CFIR', 'RE-AIM', 'framework', 'cadre', 'theory', 'théorie', 'conceptual', 'conceptuel'],
      ST09: ['intervention', 'innovation', 'evidence-based', 'fondé sur les preuves'],
      ST10: ['implementation strategy', 'stratégie d\'implémentation', 'ERIC', 'strategy'],
      ST11: ['acceptability', 'acceptabilité', 'adoption', 'feasibility', 'faisabilité', 'fidelity', 'fidélité', 'penetration', 'sustainability', 'pérennité'],
      ST13: ['sample size', 'taille d\'échantillon', 'power', 'puissance', 'N =', 'n ='],
      ST17: ['fidelity', 'fidélité', 'adaptation', 'modification', 'FRAME'],
      ST21: ['generalizab', 'généralisab', 'transferab', 'transférab', 'external validity', 'validité externe'],
      ST22: ['implication', 'policy', 'politique', 'practice', 'pratique', 'recommendation']
    };
    Object.keys(self.stariChecklist).forEach(function (section) {
      self.stariChecklist[section].forEach(function (stariItem) {
        var keywords = stariKeywords[stariItem.id] || [];
        var found = keywords.filter(function (kw) {
          return textLower.includes(kw.toLowerCase());
        });
        var detected = found.length > 0;
        totalWeight += stariItem.weight;
        if (detected) scoredWeight += stariItem.weight;
        items.push({
          id: stariItem.id,
          item: stariItem.item[lang],
          section: stariItem.section,
          weight: stariItem.weight,
          detected: detected,
          matches: found.slice(0, 3),
          status: detected ? 'present' : 'missing'
        });
      });
    });
    return {
      score: totalWeight > 0 ? Math.round(scoredWeight / totalWeight * 100) : 0,
      items: items,
      totalItems: items.length,
      detectedItems: items.filter(function (i) {
        return i.detected;
      }).length,
      missingItems: items.filter(function (i) {
        return !i.detected;
      }),
      citation: self.stariCitation
    };
  },
  // ---- GAP IDENTIFICATION ----
  identifyGaps: function (result, lang) {
    var gaps = [];
    var t = function (fr, en) {
      return lang === 'fr' ? fr : en;
    };

    // Critical gaps
    if (!result.extractedElements.equity.detected) {
      gaps.push({
        severity: 'critical',
        category: 'equity',
        message: t('❌ Aucune analyse d\'équité détectée. Depuis 2022, c\'est une exigence pour toute publication IS.', '❌ No equity analysis detected. Since 2022, this is a requirement for any IS publication.'),
        reference: 'Woodward et al. (2019)',
        action: t('Ajouter un module Health Equity Implementation Framework', 'Add Health Equity Implementation Framework module')
      });
    }
    if (!result.extractedElements.sustainability.detected) {
      gaps.push({
        severity: 'critical',
        category: 'sustainability',
        message: t('❌ Pérennité non abordée. Les évaluateurs vérifieront ce point en premier.', '❌ Sustainability not addressed. Reviewers will check this first.'),
        reference: 'Scheirer & Dearing (2011)',
        action: t('Ajouter un plan de pérennité et utiliser le module Scheirer de MOUDAR', 'Add sustainability plan using MOUDAR\'s Scheirer module')
      });
    }
    if (!result.extractedElements.framework.detected) {
      gaps.push({
        severity: 'critical',
        category: 'framework',
        message: t('❌ Aucun cadre théorique/conceptuel détecté. C\'est la base de toute étude IS.', '❌ No theoretical/conceptual framework detected. This is the foundation of any IS study.'),
        reference: 'Nilsen (2015)',
        action: t('Sélectionner et appliquer un cadre (CFIR 2.0, RE-AIM, NPT, etc.)', 'Select and apply a framework (CFIR 2.0, RE-AIM, NPT, etc.)')
      });
    }

    // RE-AIM gaps
    Object.keys(result.reaimMapping).forEach(function (dim) {
      if (!result.reaimMapping[dim].detected) {
        gaps.push({
          severity: 'important',
          category: 'reaim',
          message: t('⚠️ Dimension RE-AIM "' + dim.charAt(0).toUpperCase() + dim.slice(1) + '" non détectée', '⚠️ RE-AIM dimension "' + dim.charAt(0).toUpperCase() + dim.slice(1) + '" not detected'),
          reference: 'Glasgow et al. (2019)',
          action: t('Ajouter des mesures pour la dimension ' + dim, 'Add measures for ' + dim + ' dimension')
        });
      }
    });

    // Proctor outcome gaps
    var proctorTerms = ['acceptability', 'adoption', 'appropriateness', 'feasibility', 'fidelity', 'implementation cost', 'penetration'];
    var textLower = (result.extractedElements.outcomes.items || []).join(' ').toLowerCase();
    var proctorDetected = proctorTerms.filter(function (term) {
      return textLower.includes(term) || (result.extractedElements.outcomes.items || []).some(function (i) {
        return i.toLowerCase().includes(term);
      });
    });
    if (proctorDetected.length < 3) {
      gaps.push({
        severity: 'important',
        category: 'outcomes',
        message: t('⚠️ Seulement ' + proctorDetected.length + '/8 outcomes d\'implémentation (Proctor) détectés', '⚠️ Only ' + proctorDetected.length + '/8 implementation outcomes (Proctor) detected'),
        reference: 'Proctor et al. (2011)',
        action: t('Utiliser le module Proctor Outcomes de MOUDAR pour compléter', 'Use MOUDAR\'s Proctor Outcomes module to complete')
      });
    }

    // Design gap
    if (!result.extractedElements.design.detected) {
      gaps.push({
        severity: 'important',
        category: 'design',
        message: t('⚠️ Design d\'étude non clairement identifié', '⚠️ Study design not clearly identified'),
        action: t('Spécifier le design (hybrid, stepped-wedge, etc.)', 'Specify the design (hybrid, stepped-wedge, etc.)')
      });
    }
    return gaps.sort(function (a, b) {
      return a.severity === 'critical' ? -1 : b.severity === 'critical' ? 1 : 0;
    });
  },
  // ---- STRENGTH IDENTIFICATION ----
  identifyStrengths: function (result, lang) {
    var strengths = [];
    var t = function (fr, en) {
      return lang === 'fr' ? fr : en;
    };
    if (result.extractedElements.framework.detected) strengths.push({
      message: t('✅ Cadre théorique identifié', '✅ Theoretical framework identified'),
      items: result.extractedElements.framework.items
    });
    if (result.extractedElements.equity.detected) strengths.push({
      message: t('✅ Analyse d\'équité présente', '✅ Equity analysis present'),
      items: result.extractedElements.equity.items
    });
    if (result.extractedElements.sustainability.detected) strengths.push({
      message: t('✅ Plan de pérennité abordé', '✅ Sustainability plan addressed'),
      items: result.extractedElements.sustainability.items
    });
    if (result.scores.cfir >= 60) strengths.push({
      message: t('✅ Bonne couverture CFIR (' + result.scores.cfir + '%)', '✅ Good CFIR coverage (' + result.scores.cfir + '%)')
    });
    if (result.scores.reaim >= 80) strengths.push({
      message: t('✅ Couverture RE-AIM complète', '✅ Complete RE-AIM coverage')
    });
    if (result.extractedElements.strategies.count >= 3) strengths.push({
      message: t('✅ Stratégies d\'implémentation multiples détectées', '✅ Multiple implementation strategies detected'),
      items: result.extractedElements.strategies.items
    });
    return strengths;
  },
  // ---- RECOMMENDATION GENERATOR ----
  generateRecommendations: function (result, lang) {
    var recs = [];
    var t = function (fr, en) {
      return lang === 'fr' ? fr : en;
    };
    if (result.scores.global < 40) {
      recs.push({
        priority: 'critical',
        icon: '🔴',
        message: t('Ce protocole nécessite une refonte majeure de sa composante IS. Utilisez l\'assistant MOUDAR pour reconstruire le design.', 'This protocol needs a major overhaul of its IS component. Use the MOUDAR wizard to rebuild the design.')
      });
    }
    if (!result.extractedElements.framework.detected) {
      recs.push({
        priority: 'critical',
        icon: '🔴',
        message: t('Adoptez CFIR 2.0 + RE-AIM comme cadres complémentaires. CFIR pour les déterminants, RE-AIM pour les outcomes. Utilisez l\'évaluateur CFIR 2.0 de MOUDAR.', 'Adopt CFIR 2.0 + RE-AIM as complementary frameworks. CFIR for determinants, RE-AIM for outcomes. Use MOUDAR\'s CFIR 2.0 evaluator.')
      });
    }

    // CFIR-specific recommendations
    var weakCFIR = Object.keys(result.cfirMapping).filter(function (c) {
      return !result.cfirMapping[c].detected;
    });
    if (weakCFIR.length > 5) {
      recs.push({
        priority: 'high',
        icon: '🟠',
        message: t(weakCFIR.length + ' construits CFIR non couverts: ' + weakCFIR.slice(0, 5).join(', ') + '... Utilisez le module CFIR-ERIC de MOUDAR pour identifier les stratégies recommandées.', weakCFIR.length + ' CFIR constructs not covered: ' + weakCFIR.slice(0, 5).join(', ') + '... Use MOUDAR\'s CFIR-ERIC module to identify recommended strategies.')
      });
    }

    // StaRI recommendations
    if (result.stariCompliance && result.stariCompliance.missingItems.length > 0) {
      var missing = result.stariCompliance.missingItems.slice(0, 3);
      recs.push({
        priority: 'high',
        icon: '🟠',
        message: t('Éléments StaRI manquants: ' + missing.map(function (m) {
          return m.item;
        }).join('; '), 'Missing StaRI items: ' + missing.map(function (m) {
          return m.item;
        }).join('; '))
      });
    }

    // Proctor outcomes
    if (!result.extractedElements.outcomes.detected || result.extractedElements.outcomes.count < 3) {
      recs.push({
        priority: 'high',
        icon: '🟠',
        message: t('Ajoutez des outcomes d\'implémentation explicites (Proctor 2011): acceptabilité, adoption, faisabilité, fidélité au minimum. Utilisez le module Outcomes de MOUDAR.', 'Add explicit implementation outcomes (Proctor 2011): acceptability, adoption, feasibility, fidelity at minimum. Use MOUDAR\'s Outcomes module.')
      });
    }

    // NPT recommendation
    recs.push({
      priority: 'medium',
      icon: '🟡',
      message: t('Considérez l\'ajout d\'une évaluation NPT (Normalisation Process Theory) pour anticiper l\'ancrage dans la routine. Utilisez le module NPT de MOUDAR.', 'Consider adding NPT (Normalization Process Theory) assessment to anticipate routine embedding. Use MOUDAR\'s NPT module.')
    });

    // FRAME recommendation
    if (result.extractedElements.innovation.detected) {
      recs.push({
        priority: 'medium',
        icon: '🟡',
        message: t('Planifiez la documentation des adaptations avec FRAME (Stirman 2019). Utilisez le FRAME Tracker de MOUDAR pour un suivi systématique.', 'Plan adaptation documentation with FRAME (Stirman 2019). Use MOUDAR\'s FRAME Tracker for systematic tracking.')
      });
    }

    // SMART recommendation
    if (result.extractedElements.design.detected) {
      recs.push({
        priority: 'medium',
        icon: '🟡',
        message: t('Pour un design adaptatif, considérez un SMART (Sequential Multiple Assignment Randomized Trial). Utilisez le SMART Designer de MOUDAR.', 'For adaptive design, consider a SMART (Sequential Multiple Assignment Randomized Trial). Use MOUDAR\'s SMART Designer.')
      });
    }
    return recs;
  }
};
console.log('✅ MOUDAR v11.0: LLMProtocolAnalyzer loaded — Research Copilot ready');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE: DEEP AI ANALYZER — LLM-Powered Protocol Analysis
// GAME-CHANGER: Real AI analysis via Anthropic API
// First-ever AI copilot purpose-built for Implementation Science
// ═══════════════════════════════════════════════════════════════════════════

export default LLMProtocolAnalyzer;
