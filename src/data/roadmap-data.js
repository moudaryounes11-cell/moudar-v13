// ============================================
// ROADMAP DATA – Axes IA, pondération, risques
// ============================================
const ROADMAP_IMPROVEMENT_AXES = [{
  id: "predictive-modeling",
  axis: {
    fr: "Modélisation prédictive des résultats",
    en: "Predictive modelling of outcomes"
  },
  action: {
    fr: "Entraîner le moteur sur des jeux de données historiques de projets d'implémentation (succès / échec, durée, coût) pour prédire la probabilité de réussite d'une nouvelle initiative.",
    en: "Train the engine on historical implementation projects (success vs failure, duration, cost) to predict the probability of success for a new initiative."
  },
  objective: {
    fr: "Passer d'une logique descriptive (« voici ce que vous devriez faire ») à une logique probabiliste (« si vous faites ceci, la probabilité de réussite augmente de X % »).",
    en: "Move from a descriptive logic (\u201Chere is what you should do\u201D) to a probabilistic one (\u201Cif you do this, the probability of success increases by X%\u201D)."
  }
}, {
  id: "nlp-doc-analysis",
  axis: {
    fr: "NLP pour l'analyse de documents",
    en: "NLP for document analysis"
  },
  action: {
    fr: "Développer une fonctionnalité qui ingère des documents (rapports d'activité, politiques internes, guides cliniques) et utilise le graphe de connaissances pour mapper automatiquement les barrières et stratégies aux cadres de la science de la mise en œuvre.",
    en: "Develop a feature that ingests documents (activity reports, internal policies, clinical guidelines) and uses the knowledge graph to automatically map barriers and strategies to implementation science frameworks."
  },
  objective: {
    fr: "Automatiser le diagnostic initial et réduire au maximum la saisie manuelle d'information pour l'utilisateur.",
    en: "Automate the initial diagnostic and minimise manual data entry for the user."
  }
}, {
  id: "impact-simulation",
  axis: {
    fr: "Analyse d'impact par simulation",
    en: "Impact analysis via simulation"
  },
  action: {
    fr: "Permettre aux utilisateurs de créer des scénarios \u201CEt si ?\u201D interactifs (ajout d'un facilitateur, intensité de la formation, type de supervision, etc.).",
    en: "Allow users to create interactive \u201CWhat if?\u201D scenarios (adding a facilitator, changing training intensity, type of supervision, etc.)."
  },
  objective: {
    fr: "Aider à la décision budgétaire et stratégique en simulant l'impact potentiel des stratégies sur les indicateurs RE-AIM.",
    en: "Support budgetary and strategic decisions by simulating the potential impact of strategies on RE-AIM indicators."
  }
}, {
  id: "mobile-field-app",
  axis: {
    fr: "Application mobile pour le terrain",
    en: "Mobile app for field teams"
  },
  action: {
    fr: "Créer une application mobile dédiée et optimisée hors ligne pour la collecte de données terrain : entretiens CFIR, notation de la fidélité, photos, journaux de bord.",
    en: "Create a dedicated offline\u2011friendly mobile application for field data collection: CFIR interviews, fidelity scoring, photos, field logs."
  },
  objective: {
    fr: "Assurer la saisie en temps réel et simplifier la charge administrative des gestionnaires de projet et évaluateurs.",
    en: "Ensure real\u2011time data capture and simplify the administrative burden for project managers and evaluators."
  }
}, {
  id: "gamification-engagement",
  axis: {
    fr: "Gamification et suivi d'engagement",
    en: "Gamification and engagement tracking"
  },
  action: {
    fr: "Intégrer des tableaux de bord d'engagement et des systèmes de récompenses ou de progression pour soutenir la motivation des équipes sur la durée.",
    en: "Integrate engagement dashboards and reward / progress systems to sustain team motivation over time."
  },
  objective: {
    fr: "Réduire l'abandon (churn) et maintenir un haut niveau d'engagement avec la plateforme pendant des implémentations qui durent parfois plusieurs années.",
    en: "Reduce churn and maintain a high engagement level with the platform over implementation projects that may last several years."
  }
}, {
  id: "dataviz-storytelling",
  axis: {
    fr: "Visualisation de données et storytelling",
    en: "Data visualisation and storytelling"
  },
  action: {
    fr: "Transformer les données complexes (graphe de connaissances, scores, feedbacks) en visualisations simples et puissantes (infographies, cartes de chaleur, réseaux).",
    en: "Transform complex data (knowledge graph, scores, feedbacks) into simple, powerful visualisations (infographics, heatmaps, networks)."
  },
  objective: {
    fr: "Faciliter la communication avec des parties prenantes non expertes et aider les équipes à \u201Cvendre\u201D l'approche en interne.",
    en: "Facilitate communication with non\u2011expert stakeholders and help teams \u201Csell\u201D the approach internally."
  }
}, {
  id: "api-marketplace",
  axis: {
    fr: "Marketplace d'API et d'intégrations",
    en: "API and integration marketplace"
  },
  action: {
    fr: "Ouvrir l'API non seulement pour l'intégration de données, mais aussi pour permettre à des développeurs tiers de créer des micro\u2011outils connectés à Moudar.",
    en: "Open the API not only for data integration, but also to let third\u2011party developers create micro\u2011tools connected to Moudar."
  },
  objective: {
    fr: "Créer un écosystème dynamique et offrir une personnalisation avancée sans alourdir le développement de l'équipe centrale.",
    en: "Create a dynamic ecosystem and offer advanced customisation without overloading the core development team."
  }
}, {
  id: "community-case-library",
  axis: {
    fr: "Bibliothèque communautaire d'exemples",
    en: "Community case library"
  },
  action: {
    fr: "Développer la \u201Cbibliothèque de cas vivants\u201D en réseau social d'apprentissage où les utilisateurs partagent anonymement leurs cas (scores initiaux, stratégies, résultats).",
    en: "Develop the \u201Cliving case library\u201D into a learning\u2011oriented social network where users anonymously share cases (initial scores, strategies, results)."
  },
  objective: {
    fr: "Renforcer la crédibilité empirique du moteur IA et créer une communauté d'apprentissage par les pairs.",
    en: "Reinforce the empirical credibility of the AI engine and build a peer\u2011learning community."
  }
}, {
  id: "certification-partnerships",
  axis: {
    fr: "Partenariats de certification",
    en: "Certification partnerships"
  },
  action: {
    fr: "Collaborer avec des universités ou instituts de recherche en science de la mise en œuvre pour lancer un programme de \u201CProfessionnel certifié Moudar\u201D.",
    en: "Collaborate with universities or implementation science institutes to launch a \u201CCertified Moudar Professional\u201D programme."
  },
  objective: {
    fr: "Établir un standard de compétence, créer un canal de vente puissant et garantir une utilisation de qualité de l'outil.",
    en: "Establish a competence standard, create a strong sales channel and ensure high\u2011quality use of the tool."
  }
}, {
  id: "verticalisation",
  axis: {
    fr: "Verticalisation ciblée du produit",
    en: "Targeted product verticalisation"
  },
  action: {
    fr: "Créer des modèles de données et des packages de services spécifiques pour quelques marchés prioritaires (santé mentale en soins primaires, éducation nationale, etc.).",
    en: "Create data models and service packages specific to a few priority markets (mental health in primary care, national education, etc.)."
  },
  objective: {
    fr: "Vendre des solutions sur mesure à des institutions clés plutôt qu'un outil générique, en augmentant la valeur perçue.",
    en: "Sell tailored solutions to key institutions instead of a generic tool, increasing perceived value."
  }
}, {
  id: "poc-roi",
  axis: {
    fr: "Preuve de concept et ROI calculé",
    en: "Proof of concept and calculated ROI"
  },
  action: {
    fr: "Mettre l'accent sur le calculateur de retour sur investissement (ROI) pour démontrer l'impact économique positif des bonnes stratégies d'implémentation.",
    en: "Emphasise the ROI calculator to demonstrate the positive financial impact of sound implementation strategies."
  },
  objective: {
    fr: "Parler le langage des décideurs et bailleurs de fonds, qui recherchent un impact mesurable et non uniquement académique.",
    en: "Speak the language of decision\u2011makers and funders, who seek measurable impact rather than purely academic value."
  }
}, {
  id: "internationalisation",
  axis: {
    fr: "Internationalisation (langues et cadres)",
    en: "Internationalisation (languages and frameworks)"
  },
  action: {
    fr: "Au\u2011delà du français et de l'anglais, intégrer d'autres langues stratégiques (espagnol, arabe, portugais, etc.) et des cadres d'implémentation adaptés à différentes régions.",
    en: "Beyond French and English, integrate additional strategic languages (Spanish, Arabic, Portuguese, etc.) and implementation frameworks adapted to different regions."
  },
  objective: {
    fr: "Ouvrir de nouveaux marchés géographiques et accroître la présence globale de Moudar.",
    en: "Open new geographical markets and strengthen Moudar\u2019s global footprint."
  }
}];

const ROADMAP_WEIGHTING_MODEL = [{
  id: "domain-inner-setting",
  label: {
    fr: "Domaine (CFIR)",
    en: "Domain (CFIR)"
  },
  description: {
    fr: "Le domaine \u00AB Inner Setting \u00BB (milieu interne : leadership, culture, climat organisationnel) est souvent plus prédictif de l'échec que les caractéristiques de l'intervention elle\u2011même. Il peut représenter jusqu'à ~40 % du score global de risque.",
    en: "The \u201CInner Setting\u201D domain (internal environment: leadership, culture, organisational climate) is often more predictive of failure than the intervention\u2019s characteristics themselves and may account for up to ~40% of the global risk score."
  }
}, {
  id: "critical-factor",
  label: {
    fr: "Facteur critique",
    en: "Critical factor"
  },
  description: {
    fr: "Au sein de l'Inner Setting, des facteurs comme le leadership des agents d'implantation et la compétence des équipes doivent peser davantage que, par exemple, un climat d'implémentation simplement \u00AB favorable \u00BB. Moudar doit refléter ces coefficients multiplicateurs.",
    en: "Within the Inner Setting, factors such as implementation leadership and staff competence should weigh more than, for instance, a broadly \u201Cfavourable\u201D implementation climate. Moudar should reflect these multiplier effects."
  }
}, {
  id: "sector-context",
  label: {
    fr: "Contexte sectoriel",
    en: "Sector context"
  },
  description: {
    fr: "En santé publique, le poids de la rétroaction, du réseau et de l'intégration des données est plus élevé. En éducation, la clarté de l'innovation et l'accès aux connaissances sont déterminants. Le graphe de connaissances de Moudar est conçu pour porter cette différenciation.",
    en: "In public health, feedback loops, networks and data integration tend to weigh more. In education, innovation clarity and access to knowledge are critical. Moudar\u2019s knowledge graph is designed to encode this differentiation."
  }
}];

const ROADMAP_CRITICAL_RISKS = [{
  id: "leadership-inertia",
  label: {
    fr: "Inertie du leadership",
    en: "Leadership inertia"
  },
  factors: {
    fr: "CFIR : 3.1 Climat et culture, 3.2 Structure, 4.1 Engagement des agents d'implantation.",
    en: "CFIR: 3.1 Climate and culture, 3.2 Structure, 4.1 Implementation leaders' engagement."
  },
  justification: {
    fr: "Un leadership faible, instable ou changeant est l'une des premières causes d'abandon d'une innovation. Moudar doit suivre la stabilité de cet engagement dans la durée.",
    en: "Weak, unstable or shifting leadership is one of the main causes of innovation abandonment. Moudar must track how stable this engagement remains over time."
  }
}, {
  id: "fidelity-gap",
  label: {
    fr: "\u00C9cart de fidélité (Fidelity Gap)",
    en: "Fidelity gap"
  },
  factors: {
    fr: "RE-AIM : Fidélité ; Proctor : Acceptabilité, Adéquation.",
    en: "RE-AIM: Fidelity; Proctor: Acceptability, Appropriateness."
  },
  justification: {
    fr: "Une innovation trop adaptée ou déformée peut perdre son efficacité. Moudar doit comparer la mise en \u0153uvre réelle au protocole de base pour détecter ces écarts.",
    en: "An innovation that is over\u2011adapted or distorted may lose effectiveness. Moudar should compare real\u2011world implementation to the reference protocol to detect such gaps."
  }
}, {
  id: "resource-scarcity",
  label: {
    fr: "Pénurie de ressources",
    en: "Resource scarcity"
  },
  factors: {
    fr: "CFIR : 3.3 Ressources disponibles (temps, personnel, budget).",
    en: "CFIR: 3.3 Available resources (time, staff, budget)."
  },
  justification: {
    fr: "C'est souvent le risque de panne le plus fondamental. Les sorties de Moudar doivent être reliées explicitement aux résultats du BudgetEstimator et du ROICalculator.",
    en: "This is often the most fundamental failure risk. Moudar\u2019s outputs should be explicitly linked to the BudgetEstimator and ROICalculator results."
  }
}, {
  id: "team-burnout",
  label: {
    fr: "\u00C9puisement de l'\u00E9quipe (Burnout Potential)",
    en: "Team burnout potential"
  },
  factors: {
    fr: "CFIR : 4.2 Tensions interpersonnelles, 4.4 Niveau de stress / motivation.",
    en: "CFIR: 4.2 Interpersonal tension, 4.4 Stress / motivation level."
  },
  justification: {
    fr: "Une implémentation peut échouer si la charge de travail est intenable ou si la motivation s'effondre. Ce risque est directement lié à la dimension \u00AB maintenance \u00BB de RE-AIM.",
    en: "Implementation may fail if workload is unsustainable or motivation collapses. This risk is directly tied to the RE-AIM \u201Cmaintenance\u201D dimension."
  }
}, {
  id: "data-non-reactivity",
  label: {
    fr: "Non\u2011réactivité aux données",
    en: "Non\u2011reactivity to data"
  },
  factors: {
    fr: "CFIR : 5.4 Mise à l'essai, 5.5 \u00C9valuation et rétroaction.",
    en: "CFIR: 5.4 Trialability, 5.5 Evaluation and feedback."
  },
  justification: {
    fr: "Le risque de persister dans une mauvaise voie malgré des signaux précoces d'échec. Moudar doit suivre la fréquence et l'utilisation réelle des tableaux de bord et feedbacks.",
    en: "The risk of persisting on the wrong path despite early failure signals. Moudar should track the frequency and effective use of dashboards and feedback loops."
  }
}];

export { ROADMAP_IMPROVEMENT_AXES, ROADMAP_WEIGHTING_MODEL, ROADMAP_CRITICAL_RISKS };
