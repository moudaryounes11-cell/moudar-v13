import { PHASES, SECTOR_TERMS, EXAMPLE_PROJECTS } from '../data/constants.js';

function tObj(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.fr || obj.en || "";
}

function getStatusBadge(status, lang) {
  var configs = {
    draft: {
      label: {
        fr: "Brouillon",
        en: "Draft"
      },
      bg: "bg-gray-100",
      text: "text-gray-600",
      icon: "📝"
    },
    protocol: {
      label: {
        fr: "Protocole généré",
        en: "Protocol generated"
      },
      bg: "bg-blue-100",
      text: "text-blue-700",
      icon: "✨"
    },
    diagnosed: {
      label: {
        fr: "Diagnostiqué",
        en: "Diagnosed"
      },
      bg: "bg-green-100",
      text: "text-green-700",
      icon: "📊"
    },
    active: {
      label: {
        fr: "En cours",
        en: "Active"
      },
      bg: "bg-purple-100",
      text: "text-blue-700",
      icon: "🚀"
    }
  };
  var config = configs[status] || configs.draft;
  return {
    label: tObj(config.label, lang),
    bg: config.bg,
    text: config.text,
    icon: config.icon
  };
}

function generateIntelligentProtocol(answers, lang) {
  var phase = answers.phase || "preparation";
  var phaseConfig = PHASES[phase] || PHASES.preparation;

  // ═══════════════════════════════════════════════════════════════
  // v8.1 FIX - MAPPING COMPLET DES DOMAINES WIZARD -> ENGINE
  // ═══════════════════════════════════════════════════════════════

  // Mapping domaine wizard -> domaine KnowledgeGraph (COMPLET)
  var domainMapping = {
    // Domaines sante classiques
    "health": "primary_care",
    "mentalHealth": "mental_health",
    "primaryCare": "primary_care",
    "surgery": "surgery",
    "digitalHealth": "digital_health",
    "maternalChild": "maternal_child",
    "chronicDisease": "chronic_disease",
    "infectiousDisease": "infectious_disease",
    "geriatrics": "geriatrics",
    "emergency": "emergency",
    "rehabilitation": "rehabilitation",
    "prevention": "chronic_disease",
    "prfi": "humanitarian",
    // v8.0+ Domaines multi-sectoriels
    "education": "education_k12",
    "management": "management_corporate",
    "agriculture": "agriculture",
    "social": "social_work",
    "justice": "justice_reentry",
    "workplace": "manufacturing",
    "environment": "environment_climate",
    "humanitarian": "humanitarian",
    "digital": "digital_transformation",
    // Aliases additionnels pour robustesse
    "education_k12": "education_k12",
    "higher_education": "higher_education",
    "public_administration": "public_administration",
    "social_work": "social_work",
    "justice_reentry": "justice_reentry",
    "scientific_research": "scientific_research",
    "development": "development"
  };

  // Mapping contexte wizard -> contexte engine (ETENDU)
  var contextMapping = {
    "hospital": "hospital",
    "clinic": "primary_health_center",
    "community": "community",
    "school": "school",
    "workplace": "workplace",
    "nursingHome": "nursing_home",
    "prison": "prison",
    "telehealth": "telehealth",
    "rural": "rural",
    "urban": "urban",
    // Aliases
    "primary_health_center": "primary_health_center",
    "nursing_home": "nursing_home"
  };

  // Log pour debug
  console.log("[MOUDAR v8.1] Domain input:", answers.domain, "-> mapped to:", domainMapping[answers.domain] || "primary_care (default)");

  // ═══════════════════════════════════════════════════════════════
  // v8.2 - UTILISATION DES NOUVELLES DONNEES DU WIZARD ETENDU
  // ═══════════════════════════════════════════════════════════════

  // Mapping des categories de barrieres selectionnees -> barrieres engine
  var barrierCategoryToEngine = {
    "knowledge": "lack_training",
    "attitudes": "staff_resistance",
    "resources": "funding",
    "infrastructure": "it_infrastructure",
    "leadership": "leadership_support",
    "culture": "cultural_barriers",
    "policy": "policy_alignment",
    "coordination": "communication",
    "turnover": "staff_turnover",
    "complexity": "complexity"
  };

  // Mapping du pays vers le niveau de ressources
  var countryToResourceLevel = {
    "morocco": "LMIC",
    "tunisia": "LMIC",
    "algeria": "UMIC",
    "senegal": "LIC",
    "mali": "LIC",
    "cotedivoire": "LMIC",
    "france": "HIC",
    "switzerland": "HIC",
    "belgium": "HIC",
    "canada": "HIC",
    "usa": "HIC",
    "uk": "HIC",
    "other_hic": "HIC",
    "other_umic": "UMIC",
    "other_lmic": "LMIC",
    "other_lic": "LIC"
  };

  // Mapping du type de setting
  var settingToContext = {
    "hospital": "hospital",
    "clinic": "primary_health_center",
    "community": "community",
    "school": "school",
    "workplace": "workplace",
    "nursingHome": "nursing_home",
    "prison": "prison",
    "telehealth": "telehealth",
    "rural": "rural",
    "urban": "urban",
    "mixed": "primary_health_center"
  };

  // ═══════════════════════════════════════════════════════════════
  // v8.2 - DETECTION AMELIOREE DES BARRIERES
  // Combine: texte libre + categories selectionnees + domaine
  // ═══════════════════════════════════════════════════════════════
  // v9.0 FIX: Gerer les champs qui peuvent etre des tableaux ou des chaines
  var barriersText = Array.isArray(answers.barriers) ? answers.barriers.join(" ").toLowerCase() : (answers.barriers || "").toLowerCase();
  var contextText = (answers.context || "").toLowerCase();
  var populationText = (answers.population || "").toLowerCase();
  var objectivesText = Array.isArray(answers.objectives) ? answers.objectives.join(" ").toLowerCase() : (answers.objectives || "").toLowerCase();
  var facilitatorsText = Array.isArray(answers.facilitators) ? answers.facilitators.join(" ").toLowerCase() : (answers.facilitators || "").toLowerCase();
  var additionalText = (answers.additionalInfo || "").toLowerCase();
  var fullText = barriersText + " " + contextText + " " + populationText + " " + objectivesText + " " + facilitatorsText + " " + additionalText;
  var detectedBarriers = [];

  // 1. D'abord, ajouter les barrieres des categories selectionnees par l'utilisateur
  if (answers.barrierCategories && Array.isArray(answers.barrierCategories)) {
    answers.barrierCategories.forEach(function (cat) {
      var engineBarrier = barrierCategoryToEngine[cat];
      if (engineBarrier && detectedBarriers.indexOf(engineBarrier) === -1) {
        detectedBarriers.push(engineBarrier);
      }
    });
    console.log("[MOUDAR v8.2] Barrieres des categories selectionnees:", detectedBarriers);
  }

  // Detection intelligente avec synonymes etendus
  var barrierKeywords = {
    "lack_training": ["formation", "training", "compétence", "skill", "knowledge", "connaissance", "savoir", "expertise", "qualification", "apprentissage", "capacité", "ability", "apprendre", "former", "enseigner"],
    "staff_resistance": ["résistance", "resistance", "réticence", "reluctance", "peur", "fear", "refus", "opposition", "blocage", "rejet", "méfiance", "hostil", "réfractaire", "contre", "hostile"],
    "it_infrastructure": ["informatique", "it", "système", "system", "logiciel", "software", "technologie", "numérique", "digital", "ordinateur", "computer", "réseau", "network", "internet", "serveur", "application", "app"],
    "data_management": ["donnée", "data", "indicateur", "indicator", "mesure", "measurement", "monitoring", "suivi", "collecte", "reporting", "statistique", "base de données", "database", "tableau de bord", "dashboard"],
    "stigma": ["stigma", "stigmatisation", "discrimination", "préjugé", "honte", "tabou", "jugement", "exclusion", "marginalisation", "rejet social", "étiquette", "mental", "psychiatr"],
    "funding": ["financement", "funding", "budget", "argent", "money", "ressource", "coût", "cost", "investissement", "subvention", "fonds", "économique", "financier", "dépense", "moyens"],
    "leadership_support": ["direction", "leadership", "management", "soutien", "support", "décision", "hiérarchie", "responsable", "chef", "directeur", "engagement institutionnel", "sponsor", "pilotage", "gouvernance"],
    "time_constraints": ["temps", "time", "charge", "workload", "surcharge", "overload", "délai", "deadline", "urgent", "priorité", "disponibilité", "agenda", "planning", "calendrier", "durée"],
    "cultural_barriers": ["culture", "cultural", "tradition", "religion", "croyance", "belief", "coutume", "valeur", "norme", "sociale", "communauté", "ethnique", "langue", "language", "local"],
    "complexity": ["complexe", "complex", "compliqué", "difficult", "difficile", "multiple", "coordination", "multi-site", "hétérogène", "diversité", "variabilité", "fragmentation"],
    "communication": ["communication", "information", "sensibilisation", "awareness", "message", "diffusion", "partage", "échange", "réunion", "meeting", "coordination", "collaboration"],
    "policy_alignment": ["politique", "policy", "réglementation", "regulation", "loi", "law", "norme", "standard", "procédure", "protocole", "directive", "cadre légal", "conformité", "compliance"],
    "patient_engagement": ["patient", "usager", "client", "adhésion", "engagement", "participation", "motivation", "compliance", "observance", "bénéficiaire", "population cible", "acceptation"],
    "staff_turnover": ["turnover", "rotation", "départ", "attrition", "remplacement", "recrutement", "fidélisation", "rétention", "mobilité", "instabilité", "changement de personnel"],
    "evidence_gaps": ["preuve", "evidence", "recherche", "research", "étude", "study", "donnée probante", "littérature", "scientifique", "validation", "efficacité", "effectiveness"]
  };

  // Detection avec ponderation
  var barrierScores = {};
  for (var barrierName in barrierKeywords) {
    barrierScores[barrierName] = 0;
    var keywords = barrierKeywords[barrierName];
    for (var k = 0; k < keywords.length; k++) {
      if (fullText.indexOf(keywords[k]) !== -1) {
        barrierScores[barrierName] += 1;
      }
    }
  }

  // Selectionner les barrieres avec score > 0
  for (var bn in barrierScores) {
    if (barrierScores[bn] > 0) {
      detectedBarriers.push(bn);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // v8.1 FIX - BARRIERES PAR DEFAUT CONTEXTUELLES ET DIVERSIFIEES
  // ═══════════════════════════════════════════════════════════════
  if (detectedBarriers.length < 2) {
    // Barrieres specifiques par DOMAINE
    var domainBarriers = {
      "mentalHealth": ["stigma", "staff_resistance", "cultural_barriers", "patient_engagement"],
      "prfi": ["stigma", "cultural_barriers", "funding", "evidence_gaps"],
      "primaryCare": ["time_constraints", "staff_turnover", "it_infrastructure", "communication"],
      "surgery": ["complexity", "lack_training", "it_infrastructure", "policy_alignment"],
      "digitalHealth": ["it_infrastructure", "data_management", "staff_resistance", "lack_training"],
      "maternalChild": ["cultural_barriers", "patient_engagement", "funding", "communication"],
      "chronicDisease": ["patient_engagement", "time_constraints", "communication", "staff_turnover"],
      "infectiousDisease": ["funding", "complexity", "cultural_barriers", "policy_alignment"],
      "geriatrics": ["staff_turnover", "time_constraints", "cultural_barriers", "patient_engagement"],
      "emergency": ["time_constraints", "complexity", "staff_turnover", "communication"],
      "rehabilitation": ["patient_engagement", "time_constraints", "funding", "evidence_gaps"],
      "education": ["lack_training", "staff_resistance", "funding", "policy_alignment"],
      "workplace": ["staff_resistance", "leadership_support", "time_constraints", "communication"],
      "agriculture": ["cultural_barriers", "funding", "evidence_gaps", "communication"],
      "environment": ["policy_alignment", "funding", "complexity", "communication"],
      "social": ["funding", "cultural_barriers", "stigma", "staff_turnover"],
      "justice": ["stigma", "policy_alignment", "staff_resistance", "cultural_barriers"],
      "humanitarian": ["funding", "complexity", "cultural_barriers", "time_constraints"],
      "research": ["funding", "evidence_gaps", "complexity", "data_management"]
    };

    // Barrieres specifiques par CONTEXTE
    var contextBarriers = {
      "hospital": ["complexity", "staff_turnover", "it_infrastructure"],
      "clinic": ["time_constraints", "funding", "staff_turnover"],
      "community": ["cultural_barriers", "patient_engagement", "funding"],
      "school": ["policy_alignment", "lack_training", "funding"],
      "workplace": ["staff_resistance", "leadership_support", "time_constraints"],
      "nursingHome": ["staff_turnover", "time_constraints", "funding"],
      "prison": ["policy_alignment", "stigma", "staff_resistance"],
      "telehealth": ["it_infrastructure", "data_management", "patient_engagement"],
      "rural": ["funding", "staff_turnover", "it_infrastructure"],
      "urban": ["complexity", "time_constraints", "communication"]
    };

    // Recuperer les barrieres du domaine
    var domain = answers.domain || "health";
    var domainKey = domain;
    // Normaliser certains domaines
    if (domain === "health") domainKey = "primaryCare";
    if (domain === "education_k12" || domain === "higher_education") domainKey = "education";
    if (domain === "social_work") domainKey = "social";
    if (domain === "justice_reentry") domainKey = "justice";
    if (domain === "agriculture" || domain === "environment_climate") domainKey = "agriculture";
    var domainDefaults = domainBarriers[domainKey] || domainBarriers["primaryCare"];
    var contextDefaults = contextBarriers[answers.context] || [];

    // Combiner et dedupliquer
    var allDefaults = domainDefaults.concat(contextDefaults);
    var uniqueDefaults = [];
    for (var i = 0; i < allDefaults.length; i++) {
      if (uniqueDefaults.indexOf(allDefaults[i]) === -1 && detectedBarriers.indexOf(allDefaults[i]) === -1) {
        uniqueDefaults.push(allDefaults[i]);
      }
    }

    // Ajouter de la variation en melangeant l'ordre
    var timestamp = Date.now();
    var seed = timestamp % uniqueDefaults.length;
    var shuffled = uniqueDefaults.slice(seed).concat(uniqueDefaults.slice(0, seed));

    // Prendre 2-3 barrieres supplementaires
    var toAdd = Math.min(3 - detectedBarriers.length, shuffled.length);
    for (var j = 0; j < toAdd; j++) {
      detectedBarriers.push(shuffled[j]);
    }
  }

  // Limiter a 5 barrieres max
  detectedBarriers = detectedBarriers.slice(0, 5);
  console.log("[MOUDAR v8.1] Barrieres detectees:", detectedBarriers, "pour domaine:", answers.domain, "contexte:", answers.context);

  // Determiner le niveau de ressources (v8.2 - depuis le pays selectionne)
  var resourceLevel = "LMIC"; // defaut
  if (answers.country) {
    resourceLevel = countryToResourceLevel[answers.country] || "LMIC";
  } else if (answers.resourceLevel) {
    resourceLevel = answers.resourceLevel;
  }
  // Fallback sur le texte si pas de pays selectionne
  if (!answers.country) {
    var countryText = (answers.context || "").toLowerCase();
    if (countryText.indexOf("maroc") !== -1 || countryText.indexOf("morocco") !== -1) {
      resourceLevel = "LMIC";
    } else if (countryText.indexOf("suisse") !== -1 || countryText.indexOf("switzerland") !== -1 || countryText.indexOf("france") !== -1 || countryText.indexOf("allemagne") !== -1 || countryText.indexOf("usa") !== -1 || countryText.indexOf("canada") !== -1) {
      resourceLevel = "HIC";
    }
  }

  // Mapping resourceLevel nom -> ID pour le moteur
  var resourceLevelMapping = {
    "HIC": "R01",
    "UMIC": "R02",
    "LMIC": "R03",
    "LIC": "R04",
    "R01": "R01",
    "R02": "R02",
    "R03": "R03",
    "R04": "R04"
  };
  var mappedResourceLevel = resourceLevelMapping[resourceLevel] || "R03";

  // Determiner le contexte (v8.2 - depuis settingType)
  var contextValue = "primary_health_center";
  if (answers.settingType) {
    contextValue = settingToContext[answers.settingType] || contextMapping[answers.settingType] || "primary_health_center";
  } else if (answers.context && contextMapping[answers.context]) {
    contextValue = contextMapping[answers.context];
  }

  // ═══════════════════════════════════════════════════════════════
  // APPEL AU MOTEUR MOUDAR ENGINE (v8.2 - donnees enrichies)
  // ═══════════════════════════════════════════════════════════════
  var engineProject = {
    domain: domainMapping[answers.domain] || "primary_care",
    context: contextValue,
    phase: phase,
    resourceLevel: mappedResourceLevel,
    barriers: detectedBarriers,
    // v8.2 - Donnees enrichies
    objectives: answers.objectives || "",
    expectedOutcomes: answers.expectedOutcomes || [],
    country: answers.country || "",
    settingCount: answers.settingCount || 1,
    geographicScope: answers.geographicScope || "local",
    populationSize: answers.populationSize || 0,
    teamSize: answers.teamSize || "3-5",
    timeline: answers.timeline || "12",
    budget: answers.budget || "unknown",
    experience: answers.experience || "none"
  };
  console.log("[MOUDAR v8.2] Projet envoye au moteur:", JSON.stringify(engineProject));
  var aiRecommendations = null;
  try {
    aiRecommendations = window.MoudarEngine.recommend(engineProject);
  } catch (e) {
    console.error("MoudarEngine error:", e);
  }

  // ═══════════════════════════════════════════════════════════════
  // TRANSFORMATION DES RESULTATS POUR L'AFFICHAGE
  // ═══════════════════════════════════════════════════════════════
  var frameworks = [];
  var strategies = [];
  var outcomes = [];
  var recommendations = [];
  var aiConfidence = 0.5;
  if (aiRecommendations) {
    aiConfidence = aiRecommendations.confidence || 0.5;

    // Frameworks depuis le moteur IA
    if (aiRecommendations.recommendations.frameworks.primary) {
      frameworks.push(aiRecommendations.recommendations.frameworks.primary.name);
    }
    (aiRecommendations.recommendations.frameworks.secondary || []).forEach(function (fw) {
      frameworks.push(fw.name);
    });
    // Ajouter frameworks standards
    if (frameworks.indexOf("EPIS") === -1) frameworks.push("EPIS");
    if (frameworks.indexOf("Proctor") === -1) frameworks.push("Proctor Outcomes");
    frameworks = frameworks.slice(0, 4);

    // Strategies depuis le moteur IA (top 5 avec labels traduits)
    (aiRecommendations.recommendations.strategies.top || []).forEach(function (strat) {
      var label = strat.label ? strat.label[lang] || strat.label.fr || strat.name : strat.name;
      strategies.push(label);
    });
    // Ajouter strategies additionnelles
    (aiRecommendations.recommendations.strategies.additional || []).slice(0, 3).forEach(function (strat) {
      var label = strat.label ? strat.label[lang] || strat.label.fr || strat.name : strat.name;
      strategies.push(label);
    });
    strategies = strategies.slice(0, 8);

    // Outcomes depuis le moteur IA (prioritaires)
    (aiRecommendations.recommendations.outcomes.priority || []).forEach(function (out) {
      var label = out.label ? out.label[lang] || out.label.fr || out.name : out.name;
      outcomes.push(label);
    });
    (aiRecommendations.recommendations.outcomes.secondary || []).slice(0, 3).forEach(function (out) {
      var label = out.label ? out.label[lang] || out.label.fr || out.name : out.name;
      outcomes.push(label);
    });
    outcomes = outcomes.slice(0, 6);

    // Generer des recommandations contextuelles basees sur l'analyse IA
    var topStrategy = aiRecommendations.recommendations.strategies.top[0];
    if (topStrategy) {
      var stratLabel = topStrategy.label ? topStrategy.label[lang] || topStrategy.label.fr : topStrategy.name;
      recommendations.push(lang === "fr" ? "Prioriser la stratégie \"" + stratLabel + "\" (score IA: " + (topStrategy.confidence * 100).toFixed(0) + "%)" : "Prioritize \"" + stratLabel + "\" strategy (AI score: " + (topStrategy.confidence * 100).toFixed(0) + "%)");
    }

    // Recommandations basees sur les barrieres detectees
    if (detectedBarriers.indexOf("stigma") !== -1) {
      recommendations.push(lang === "fr" ? "Prévoir une campagne de déstigmatisation avant le déploiement" : "Plan destigmatization campaign before rollout");
    }
    if (detectedBarriers.indexOf("lack_training") !== -1) {
      recommendations.push(lang === "fr" ? "Développer un programme de formation adapté au contexte local" : "Develop training program adapted to local context");
    }
    if (resourceLevel === "LMIC" || resourceLevel === "LIC") {
      recommendations.push(lang === "fr" ? "Adapter les stratégies aux ressources limitées (task-shifting recommandé)" : "Adapt strategies to limited resources (task-shifting recommended)");
    }
  } else {
    // Fallback si le moteur IA echoue
    frameworks = ["CFIR 2.0", "EPIS", "RE-AIM", "Proctor Outcomes"];
    strategies = [lang === "fr" ? "Champions locaux" : "Local champions", lang === "fr" ? "Formation / coaching" : "Training / coaching", lang === "fr" ? "Audit et feedback" : "Audit and feedback"];
    outcomes = [lang === "fr" ? "Acceptabilité" : "Acceptability", lang === "fr" ? "Faisabilité" : "Feasibility", lang === "fr" ? "Adoption" : "Adoption"];
    recommendations.push(lang === "fr" ? "Consulter un expert en implementation science" : "Consult an implementation science expert");
  }

  // Recommandations par phase (toujours pertinentes)
  if (phase === "exploration") {
    recommendations.push(lang === "fr" ? "Conduire une analyse des parties prenantes" : "Conduct stakeholder analysis");
  } else if (phase === "preparation") {
    recommendations.push(lang === "fr" ? "Prévoir un pilote avant déploiement" : "Plan pilot before rollout");
  } else if (phase === "implementation") {
    recommendations.push(lang === "fr" ? "Suivi rapproché les 3 premiers mois" : "Close monitoring first 3 months");
  } else if (phase === "sustainment") {
    recommendations.push(lang === "fr" ? "Planifier l'ancrage institutionnel" : "Plan institutional anchoring");
  }
  var keyActivities = tObj(phaseConfig.keyActivities, lang) || [];
  return {
    frameworks: frameworks,
    strategies: strategies,
    outcomes: outcomes,
    keyActivities: keyActivities,
    recommendations: recommendations,
    phaseDescription: tObj(phaseConfig.description, lang),
    // Nouvelles donnees IA
    aiConfidence: aiConfidence,
    aiDetectedBarriers: detectedBarriers,
    aiEngineVersion: window.MoudarEngine ? window.MoudarEngine.VERSION : "N/A",
    aiRawRecommendations: aiRecommendations ? {
      metadata: aiRecommendations.metadata,
      input: aiRecommendations.input,
      strategies: aiRecommendations.recommendations.strategies,
      frameworks: aiRecommendations.recommendations.frameworks,
      outcomes: aiRecommendations.recommendations.outcomes,
      recommendations: aiRecommendations.recommendations
    } : null
  };
}

// Helper pour recuperer les bons termes selon le domaine/secteur
function getSectorTerms(domainMeta, lang) {
  var sectorKey = domainMeta && domainMeta.key ? domainMeta.key : domainMeta && domainMeta.sector ? domainMeta.sector : "default";
  if (!SECTOR_TERMS[sectorKey]) {
    // Fallback: essayer quelques mappings simples
    if (sectorKey === "agriculture" || sectorKey === "environment") {
      sectorKey = "environment";
    } else if (sectorKey === "management" || sectorKey === "workplace") {
      sectorKey = "workplace";
    } else if (sectorKey === "prfi" || sectorKey === "prevention" || sectorKey === "health") {
      sectorKey = "health";
    } else {
      sectorKey = "default";
    }
  }
  var pack = SECTOR_TERMS[sectorKey] || SECTOR_TERMS["default"];
  var lg = lang === "en" ? "en" : "fr";
  return {
    actor: pack.actor[lg],
    actors: pack.actors[lg],
    service: pack.service[lg],
    program: pack.program[lg]
  };
}

// Fonction pour charger tous les projets d'exemple
function loadExampleProjects() {
  var existing = window.StorageManager.getProjects();
  var exampleIds = EXAMPLE_PROJECTS.map(function (p) {
    return p.id;
  });

  // Ne pas recharger si deja presents
  var alreadyLoaded = existing.some(function (p) {
    return exampleIds.indexOf(p.id) >= 0;
  });
  if (alreadyLoaded) return {
    loaded: false,
    reason: "Examples already loaded"
  };
  var now = new Date().toISOString();
  EXAMPLE_PROJECTS.forEach(function (example) {
    var project = Object.assign({}, example, {
      createdAt: now,
      updatedAt: now
    });
    existing.push(project);
  });
  localStorage.setItem("moudar_projects", JSON.stringify(existing));
  return {
    loaded: true,
    count: EXAMPLE_PROJECTS.length
  };
}

function exportImplementationTableCSV(rows, lang) {
  try {
    var headers = lang === "fr" ? ["Domaine", "Phase", "Barrières", "Stratégies", "Responsable", "Statut"] : ["Domain", "Phase", "Barriers", "Strategies", "Owner", "Status"];
    var csvRows = [];
    csvRows.push(headers.join(","));
    rows.forEach(function (r) {
      csvRows.push([r.domain || "", r.phase || "", (r.barriers || "").replace(/\n/g, " "), (r.strategies || "").replace(/\n/g, " "), r.responsable || r.owner || "", r.status || ""].join(","));
    });
    var blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;"
    });
    if (typeof saveAs === "function") {
      saveAs(blob, "moudar_implementation_table.csv");
    }
  } catch (e) {
    console.error("CSV export failed", e);
    alert(lang === "fr" ? "Erreur lors de l'export CSV." : "Error while exporting CSV.");
  }
}

export {
  tObj,
  getStatusBadge,
  generateIntelligentProtocol,
  getSectorTerms,
  loadExampleProjects,
  exportImplementationTableCSV
};
