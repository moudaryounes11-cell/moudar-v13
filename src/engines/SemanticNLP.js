var SemanticNLP = function () {
  'use strict';

  // Embeddings sémantiques pré-calculés pour les concepts clés
  // Chaque concept a des synonymes et des expressions associées avec poids
  var semanticConcepts = {
    "burnout": {
      barrier: "staff_turnover",
      synonyms: ["épuisé", "épuisement", "burnout", "fatigué", "surmenage", "stress", "démotivé", "usure", "lassitude", "à bout"],
      expressions: ["personnel épuisé", "équipe fatiguée", "charge mentale", "ne peut plus", "trop de travail", "sous pression"],
      weight: 0.95
    },
    "resistance_change": {
      barrier: "staff_resistance",
      synonyms: ["résiste", "refuse", "bloque", "réticent", "opposé", "hostile", "méfiant", "sceptique"],
      expressions: ["ne veut pas", "pas convaincu", "contre le changement", "préfère l'ancien", "ça marchait avant", "pourquoi changer"],
      weight: 0.92
    },
    "financial_constraints": {
      barrier: "funding",
      synonyms: ["argent", "budget", "financement", "coût", "cher", "onéreux", "moyens", "ressources"],
      expressions: ["pas de budget", "trop cher", "manque d'argent", "restrictions budgétaires", "coupes", "pas les moyens"],
      weight: 0.90
    },
    "tech_problems": {
      barrier: "it_infrastructure",
      synonyms: ["ordinateur", "logiciel", "système", "application", "internet", "réseau", "plantage", "bug"],
      expressions: ["ça plante", "trop lent", "pas d'ordinateur", "système obsolète", "pas compatible", "problème technique"],
      weight: 0.88
    },
    "knowledge_gap": {
      barrier: "lack_training",
      synonyms: ["sait pas", "comprend pas", "formation", "compétence", "apprendre", "capacité", "savoir"],
      expressions: ["ne sait pas comment", "pas formé", "besoin d'apprendre", "manque de compétences", "pas les connaissances"],
      weight: 0.90
    },
    "stigma_mental": {
      barrier: "stigma",
      synonyms: ["honte", "tabou", "jugement", "préjugé", "discrimination", "fou", "psychiatrique", "mental"],
      expressions: ["mal vu", "on en parle pas", "c'est tabou", "les gens pensent que", "peur du regard"],
      weight: 0.93
    },
    "time_pressure": {
      barrier: "time_constraints",
      synonyms: ["temps", "urgent", "vite", "deadline", "délai", "priorité", "agenda", "surchargé"],
      expressions: ["pas le temps", "trop de travail", "journée trop courte", "toujours pressé", "autres priorités"],
      weight: 0.85
    },
    "leadership_absent": {
      barrier: "leadership_support",
      synonyms: ["direction", "chef", "manager", "responsable", "hiérarchie", "décideur", "pilotage"],
      expressions: ["direction absente", "pas de soutien", "chef pas impliqué", "personne ne décide", "manque de leadership"],
      weight: 0.91
    },
    "cultural_context": {
      barrier: "cultural_barriers",
      synonyms: ["culture", "tradition", "religion", "croyance", "coutume", "communauté", "local"],
      expressions: ["pas dans notre culture", "tradition différente", "croyances locales", "ça ne se fait pas ici", "contexte culturel"],
      weight: 0.89
    },
    "complexity_high": {
      barrier: "complexity",
      synonyms: ["compliqué", "complexe", "difficile", "lourd", "multiple", "fragmenté", "hétérogène"],
      expressions: ["trop compliqué", "usine à gaz", "difficile à mettre en place", "beaucoup de parties prenantes"],
      weight: 0.84
    }
  };

  /**
   * Analyse sémantique d'un texte pour détecter les barrières
   * Retourne un score de confiance pour chaque barrière détectée
   */
  function analyzeText(text, lang) {
    lang = lang || 'fr';
    if (!text || typeof text !== 'string') return {
      barriers: [],
      confidence: 0
    };
    var normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Enlever accents pour matching
    .replace(/['']/g, "'").replace(/[""]/g, '"');
    var detectedBarriers = {};
    var totalMatches = 0;

    // Analyser chaque concept sémantique
    for (var conceptId in semanticConcepts) {
      var concept = semanticConcepts[conceptId];
      var matchScore = 0;
      var matchCount = 0;

      // Vérifier les synonymes
      concept.synonyms.forEach(function (synonym) {
        var normalizedSynonym = synonym.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (normalizedText.indexOf(normalizedSynonym) !== -1) {
          matchScore += 0.3;
          matchCount++;
        }
      });

      // Vérifier les expressions (plus de poids)
      concept.expressions.forEach(function (expr) {
        var normalizedExpr = expr.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (normalizedText.indexOf(normalizedExpr) !== -1) {
          matchScore += 0.6;
          matchCount++;
        }
      });
      if (matchCount > 0) {
        var finalScore = Math.min(matchScore * concept.weight, 1.0);
        var barrierId = concept.barrier;
        if (!detectedBarriers[barrierId] || detectedBarriers[barrierId].score < finalScore) {
          detectedBarriers[barrierId] = {
            barrierId: barrierId,
            score: finalScore,
            matchCount: matchCount,
            sourceConceptId: conceptId,
            confidence: finalScore > 0.7 ? "high" : finalScore > 0.4 ? "medium" : "low"
          };
        }
        totalMatches += matchCount;
      }
    }

    // Convertir en tableau et trier
    var barriersList = Object.values(detectedBarriers);
    barriersList.sort(function (a, b) {
      return b.score - a.score;
    });
    return {
      barriers: barriersList,
      totalMatches: totalMatches,
      overallConfidence: barriersList.length > 0 ? barriersList.reduce(function (sum, b) {
        return sum + b.score;
      }, 0) / barriersList.length : 0,
      analyzedAt: new Date().toISOString()
    };
  }

  /**
   * Analyse sémantique pour identifier le domaine principal
   */
  function detectDomain(text) {
    if (!text) return null;
    var normalized = text.toLowerCase();
    var domainKeywords = {
      "mentalHealth": ["mental", "psychiatr", "dépression", "anxiété", "psycholog", "suicide", "mhgap", "santé mentale"],
      "primaryCare": ["soins primaires", "médecin généraliste", "centre de santé", "dispensaire", "consultation"],
      "digitalHealth": ["télé", "numérique", "digital", "application", "e-santé", "télémédecine", "télésanté"],
      "education": ["école", "formation", "étudiant", "enseignant", "pédagog", "éducation", "apprentissage"],
      "maternalChild": ["matern", "périnatal", "enfant", "pédiatr", "grossesse", "accouchement", "néonatal"]
    };
    var scores = {};
    for (var domain in domainKeywords) {
      scores[domain] = 0;
      domainKeywords[domain].forEach(function (kw) {
        if (normalized.indexOf(kw) !== -1) scores[domain]++;
      });
    }
    var maxDomain = null;
    var maxScore = 0;
    for (var d in scores) {
      if (scores[d] > maxScore) {
        maxScore = scores[d];
        maxDomain = d;
      }
    }
    return maxScore > 0 ? {
      domain: maxDomain,
      confidence: Math.min(maxScore / 3, 1)
    } : null;
  }

  /**
   * Suggère des barrières basées sur l'analyse sémantique complète
   */
  function suggestBarriers(projectData, lang) {
    lang = lang || 'fr';
    var fullText = [projectData.context || "", projectData.barriers || "", projectData.population || "", projectData.objectives || "", projectData.additionalInfo || ""].join(" ");
    var analysis = analyzeText(fullText, lang);
    return {
      suggested: analysis.barriers.filter(function (b) {
        return b.score > 0.3;
      }),
      highConfidence: analysis.barriers.filter(function (b) {
        return b.confidence === "high";
      }),
      overallConfidence: analysis.overallConfidence,
      detectedDomain: detectDomain(fullText)
    };
  }
  return {
    VERSION: '8.3.0',
    analyzeText: analyzeText,
    detectDomain: detectDomain,
    suggestBarriers: suggestBarriers,
    getSemanticConcepts: function () {
      return semanticConcepts;
    }
  };
}();

export default SemanticNLP;
