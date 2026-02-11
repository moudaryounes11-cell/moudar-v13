var MoudarValidator = function () {
  'use strict';

  // Détection de texte absurde / spam
  function isGibberish(text) {
    if (!text || typeof text !== 'string') return true;
    var cleaned = text.trim().toLowerCase();
    if (cleaned.length < 3) return true;

    // Même caractère répété (kkkkk, aaaaa)
    if (/^(.)\1{3,}$/.test(cleaned.replace(/\s/g, ''))) return true;

    // Alternance de 2 caractères (ababab)
    if (/^(.)(.)(\1\2){2,}$/.test(cleaned.replace(/\s/g, ''))) return true;

    // Séquences clavier
    var keyboards = ['qwerty', 'azerty', 'asdfgh', 'zxcvbn', '123456'];
    for (var i = 0; i < keyboards.length; i++) {
      if (cleaned.indexOf(keyboards[i]) !== -1) return true;
    }

    // Trop peu de voyelles
    var vowels = cleaned.match(/[aeiouyàâäéèêëïîôùûü]/gi) || [];
    var consonants = cleaned.match(/[bcdfghjklmnpqrstvwxz]/gi) || [];
    if (consonants.length > 0 && vowels.length / consonants.length < 0.15) return true;

    // Trop de majuscules consécutives
    if (/[A-Z]{10,}/.test(text)) return true;
    return false;
  }

  // Vérifie si contient de vrais mots
  function hasRealWords(text, minWords) {
    minWords = minWords || 2;
    if (!text) return false;
    var commonWords = ['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'mais', 'pour', 'avec', 'dans', 'sur', 'par', 'ce', 'cette', 'mon', 'ma', 'projet', 'santé', 'formation', 'équipe', 'personnel', 'patient', 'centre', 'hôpital', 'clinique', 'service', 'programme', 'intervention', 'objectif', 'the', 'a', 'an', 'and', 'or', 'for', 'with', 'in', 'on', 'to', 'project', 'health', 'training', 'team', 'staff', 'patient', 'center'];
    var words = text.toLowerCase().split(/\s+/);
    var realWordCount = 0;
    for (var i = 0; i < words.length; i++) {
      var word = words[i].replace(/[^a-zàâäéèêëïîôùûüç]/gi, '');
      if (word.length >= 2) {
        if (commonWords.indexOf(word) !== -1) {
          realWordCount++;
        } else if (word.length >= 4 && /[aeiouyàâäéèêëïîôùûü]/i.test(word)) {
          realWordCount++;
        }
      }
    }
    return realWordCount >= minWords;
  }

  // Règles de validation - v9.0 ASSOUPLIES pour démo
  var rules = {
    title: {
      required: true,
      minLength: 5,
      minWords: 1
    },
    organization: {
      required: false,
      minLength: 2
    },
    context: {
      required: true,
      minLength: 20,
      minWords: 3
    },
    population: {
      required: true,
      minLength: 5,
      minWords: 1
    },
    barriers: {
      required: false,
      minLength: 10,
      minWords: 2
    },
    objectives: {
      required: false,
      minLength: 10,
      minWords: 1
    },
    // v8.2 - Champs simplifiés pour démo
    country: {
      required: false
    },
    domain: {
      required: true
    },
    phase: {
      required: false
    },
    settingType: {
      required: false
    },
    settingCount: {
      required: false
    },
    geographicScope: {
      required: false
    },
    populationSize: {
      required: false
    },
    teamSize: {
      required: false
    },
    expectedOutcomes: {
      required: false,
      minSelect: 1
    },
    barrierCategories: {
      required: false,
      minSelect: 0
    },
    timeline: {
      required: false
    },
    // Optionnels
    beneficiaries: {
      required: false
    },
    facilitators: {
      required: false
    },
    budget: {
      required: false
    },
    experience: {
      required: false
    },
    additionalInfo: {
      required: false
    }
  };

  // Messages d'erreur
  var messages = {
    fr: {
      title: {
        required: "Le titre est obligatoire",
        minLength: "Le titre doit contenir au moins 10 caractères",
        minWords: "Le titre doit contenir au moins 3 mots significatifs",
        gibberish: "Le titre ne semble pas valide. Entrez un vrai titre de projet."
      },
      context: {
        required: "Le contexte est obligatoire",
        minLength: "Le contexte doit contenir au moins 100 caractères (actuellement: {length}). Décrivez votre situation plus en détail.",
        minWords: "Le contexte doit contenir au moins 20 mots significatifs pour générer des recommandations pertinentes.",
        gibberish: "Le contexte ne contient pas de texte valide."
      },
      population: {
        required: "La population cible est obligatoire",
        minLength: "Précisez la population cible (au moins 15 caractères)",
        gibberish: "La description de la population ne semble pas valide"
      },
      barriers: {
        required: "Les barrières anticipées sont obligatoires",
        minLength: "Décrivez les barrières en au moins 50 caractères",
        minWords: "Décrivez les barrières avec au moins 10 mots pour une analyse pertinente",
        gibberish: "La description des barrières ne semble pas valide"
      },
      organization: {
        required: "L'organisation est obligatoire",
        minLength: "Le nom de l'organisation doit contenir au moins 5 caractères",
        gibberish: "Le nom de l'organisation ne semble pas valide"
      },
      generic: {
        required: "Ce champ est obligatoire",
        gibberish: "Le texte entré ne semble pas valide"
      }
    },
    en: {
      title: {
        required: "Title is required",
        minLength: "Title must be at least 10 characters",
        minWords: "Title must contain at least 3 meaningful words",
        gibberish: "Title doesn't appear valid. Enter a real project title."
      },
      context: {
        required: "Context is required",
        minLength: "Context must be at least 100 characters (currently: {length}). Describe your situation in more detail.",
        minWords: "Context must contain at least 20 meaningful words to generate relevant recommendations.",
        gibberish: "Context doesn't contain valid text."
      },
      population: {
        required: "Target population is required",
        minLength: "Specify target population (at least 15 characters)",
        gibberish: "Population description doesn't appear valid"
      },
      barriers: {
        required: "Anticipated barriers are required",
        minLength: "Describe barriers with at least 50 characters",
        minWords: "Describe barriers with at least 10 words for relevant analysis",
        gibberish: "Barriers description doesn't appear valid"
      },
      organization: {
        required: "Organization is required",
        minLength: "Organization name must be at least 5 characters",
        gibberish: "Organization name doesn't appear valid"
      },
      generic: {
        required: "This field is required",
        gibberish: "The entered text doesn't appear valid"
      }
    }
  };
  function validateField(fieldId, value, lang) {
    lang = lang || 'fr';
    var rule = rules[fieldId];
    if (!rule) return {
      valid: true,
      errors: [],
      warnings: []
    };
    var errors = [];
    var fieldMsgs = messages[lang][fieldId] || messages[lang].generic;

    // v8.2 - Gestion des tableaux (multiselect)
    if (Array.isArray(value)) {
      if (rule.required && value.length === 0) {
        errors.push(fieldMsgs.required || messages[lang].generic.required);
        return {
          valid: false,
          errors: errors,
          warnings: []
        };
      }
      if (rule.minSelect && value.length < rule.minSelect) {
        errors.push((lang === 'fr' ? 'Sélectionnez au moins ' : 'Select at least ') + rule.minSelect + (lang === 'fr' ? ' option(s)' : ' option(s)'));
        return {
          valid: false,
          errors: errors,
          warnings: []
        };
      }
      return {
        valid: true,
        errors: [],
        warnings: []
      };
    }

    // v8.2 - Gestion des nombres
    if (typeof value === 'number') {
      if (rule.required && (value === 0 || isNaN(value))) {
        errors.push(fieldMsgs.required || messages[lang].generic.required);
        return {
          valid: false,
          errors: errors,
          warnings: []
        };
      }
      return {
        valid: true,
        errors: [],
        warnings: []
      };
    }
    var cleanValue = (value || '').toString().trim();

    // Vérification obligatoire
    if (rule.required && !cleanValue) {
      errors.push(fieldMsgs.required || messages[lang].generic.required);
      return {
        valid: false,
        errors: errors,
        warnings: []
      };
    }
    if (!cleanValue) return {
      valid: true,
      errors: [],
      warnings: []
    };

    // Détection charabia (sauf pour les selects)
    if (rule.minLength && isGibberish(cleanValue)) {
      errors.push(fieldMsgs.gibberish || messages[lang].generic.gibberish);
      return {
        valid: false,
        errors: errors,
        warnings: []
      };
    }

    // Longueur minimale
    if (rule.minLength && cleanValue.length < rule.minLength) {
      var msg = (fieldMsgs.minLength || 'Minimum ' + rule.minLength + ' caractères').replace('{length}', cleanValue.length);
      errors.push(msg);
    }

    // Nombre de mots minimum
    if (rule.minWords && !hasRealWords(cleanValue, rule.minWords)) {
      errors.push(fieldMsgs.minWords || 'Minimum ' + rule.minWords + ' mots requis');
    }
    return {
      valid: errors.length === 0,
      errors: errors,
      warnings: []
    };
  }
  function validateProject(project, lang) {
    lang = lang || 'fr';
    var results = {};
    var allValid = true;
    var totalErrors = [];

    // v8.2 - Liste étendue des champs obligatoires
    var fields = ['title', 'organization', 'country', 'domain',
    // Phase 1
    'context', 'settingType', 'settingCount', 'geographicScope',
    // Phase 2
    'population', 'populationSize', 'teamSize',
    // Phase 3
    'objectives', 'expectedOutcomes', 'phase',
    // Phase 4
    'barriers', 'barrierCategories',
    // Phase 5
    'timeline' // Phase 6
    ];
    for (var i = 0; i < fields.length; i++) {
      var fieldId = fields[i];
      var result = validateField(fieldId, project[fieldId], lang);
      results[fieldId] = result;
      if (!result.valid) {
        allValid = false;
        for (var j = 0; j < result.errors.length; j++) {
          totalErrors.push({
            field: fieldId,
            message: result.errors[j]
          });
        }
      }
    }
    return {
      valid: allValid,
      fieldResults: results,
      errors: totalErrors,
      qualityScore: calculateQualityScore(project, results)
    };
  }
  function calculateQualityScore(project, validationResults) {
    var score = 0;
    // v8.2 - Poids mis à jour pour les nouveaux champs
    var weights = {
      title: 5,
      organization: 3,
      country: 5,
      domain: 5,
      context: 15,
      settingType: 3,
      settingCount: 2,
      geographicScope: 2,
      population: 8,
      populationSize: 2,
      teamSize: 2,
      beneficiaries: 2,
      objectives: 10,
      expectedOutcomes: 5,
      phase: 3,
      barriers: 12,
      barrierCategories: 5,
      facilitators: 3,
      timeline: 3,
      budget: 2,
      experience: 2,
      additionalInfo: 1
    };
    for (var field in weights) {
      var value = project[field];
      var validation = validationResults && validationResults[field];
      if (value && (!validation || validation.valid)) {
        var fieldScore = weights[field];
        if (typeof value === 'string') {
          var length = value.trim().length;
          if (field === 'context' && length > 300) fieldScore *= 1.2;
          if (field === 'barriers' && length > 150) fieldScore *= 1.2;
        }
        score += Math.min(fieldScore, weights[field] * 1.3);
      }
    }
    score = Math.round(Math.min(score, 100));
    return {
      score: score,
      level: score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'fair' : 'poor',
      label: {
        fr: score >= 80 ? 'Excellent' : score >= 60 ? 'Bon' : score >= 40 ? 'Passable' : 'Insuffisant',
        en: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor'
      },
      color: score >= 80 ? 'green' : score >= 60 ? 'blue' : score >= 40 ? 'yellow' : 'red'
    };
  }
  return {
    VERSION: '8.2.0',
    validateField: validateField,
    validateProject: validateProject,
    isGibberish: isGibberish,
    hasRealWords: hasRealWords,
    calculateQualityScore: calculateQualityScore
  };
}();

export default MoudarValidator;
