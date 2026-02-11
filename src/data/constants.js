var EXAMPLE_PROJECTS = [
// ══════════════════════════════════════════════════════════════════
// SCENARIO PHARE : INNOV5-MH-MAROC (Projet reel de Younes MOUDAR)
// ══════════════════════════════════════════════════════════════════
{
  id: "DEMO_INNOV5_FULL",
  title: "INNOV5-MH-MAROC – 5 innovations OMS intégrées",
  organization: "CERSS Rabat + Ministère de la Santé Maroc",
  domain: "mentalHealth",
  phase: "preparation",
  resourceLevel: "LMIC",
  context: "Projet de recherche pilote (essai contrôlé randomisé en préparation) intégrant simultanément les 5 innovations OMS validées en santé mentale : (1) Soins collaboratifs, (2) Task-shifting mhGAP, (3) Interventions digitales, (4) Thérapie VR exposition, (5) Écoles promotrices de santé mentale. Étude sur 36 mois avec 146 participants répartis sur 6 sites au Maroc. Budget total : 6,46 millions DH.",
  population: "146 participants (adultes avec troubles anxio-dépressifs), 6 sites : Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir. Personnel : 45 médecins généralistes, 30 infirmiers, 12 psychologues.",
  barriers: "Coordination inter-sites complexe, formation simultanée aux 5 innovations, résistance culturelle à la santé mentale, infrastructure numérique variable selon les sites, rétention des participants sur 36 mois, harmonisation des protocoles OMS, collecte de données multi-sources.",
  objectives: ["equity", "sustainability", "cost_effectiveness", "evidence_based"],
  status: "active",
  createdAt: "2025-01-01T08:00:00Z",
  updatedAt: "2025-06-15T14:30:00Z",
  tags: ["INNOV5", "OMS", "RCT", "5 innovations", "Maroc", "CERSS", "Santé mentale"],
  isDemo: true,
  demoType: "flagship"
},
// ══════════════════════════════════════════════════════════════════
// SCENARIO DEMO : Campagne Vaccination Multi-acteurs
// ══════════════════════════════════════════════════════════════════
{
  id: "DEMO_VACCINATION",
  title: "Campagne Vaccination COVID-19 – Coordination Multi-acteurs",
  organization: "Ministère de la Santé + OMS + UNICEF + ONG locales",
  domain: "health",
  phase: "implementation",
  resourceLevel: "LMIC",
  context: "Déploiement d'une campagne de vaccination de masse impliquant 4 types d'acteurs : Ministère de la Santé (logistique nationale), OMS (protocoles et formation), UNICEF (communication communautaire), ONG locales (mobilisation terrain). Objectif : vacciner 5 millions de personnes en 6 mois dans les zones rurales et péri-urbaines.",
  population: "5 millions de personnes cibles, 200 centres de vaccination, 1500 vaccinateurs, 50 superviseurs régionaux, 100 relais communautaires.",
  barriers: "Chaîne du froid dans zones reculées, hésitation vaccinale, coordination inter-organisationnelle, turnover du personnel, rumeurs sur réseaux sociaux, accès aux populations nomades, reporting multi-sources, langues locales multiples.",
  objectives: ["speed", "equity", "cost_effectiveness"],
  status: "active",
  createdAt: "2025-02-01T09:00:00Z",
  updatedAt: "2025-06-01T16:00:00Z",
  tags: ["Vaccination", "COVID-19", "Multi-acteurs", "OMS", "UNICEF", "Coordination"],
  isDemo: true,
  demoType: "multiactor"
},
// ══════════════════════════════════════════════════════════════════
// SCENARIO DEMO : Recherche Multisite
// ══════════════════════════════════════════════════════════════════
{
  id: "DEMO_RESEARCH_MULTISITE",
  title: "Essai clinique multisite – Diabète type 2",
  organization: "CHU Ibn Sina + CHU Ibn Rochd + Hôpital Cheikh Khalifa",
  domain: "health",
  phase: "implementation",
  resourceLevel: "UMIC",
  context: "Essai contrôlé randomisé comparant 3 protocoles de prise en charge du diabète de type 2 : standard, intensif, et avec accompagnement numérique. 3 sites hospitaliers, 450 patients, suivi sur 24 mois. Coordination des données, harmonisation des pratiques, et monitoring centralisé.",
  population: "450 patients diabétiques type 2, 3 CHU, 15 endocrinologues, 30 infirmières spécialisées, 6 coordinateurs de recherche.",
  barriers: "Harmonisation des protocoles entre sites, rétention des patients sur 24 mois, qualité des données multi-sources, rotation des internes, différences de pratiques entre CHU, gestion des événements indésirables, respect du calendrier de visite.",
  objectives: ["evidence_based", "sustainability"],
  status: "active",
  createdAt: "2025-03-01T10:00:00Z",
  updatedAt: "2025-06-10T11:00:00Z",
  tags: ["Recherche", "Multisite", "RCT", "Diabète", "CHU"],
  isDemo: true,
  demoType: "research"
},
// ══════════════════════════════════════════════════════════════════
// TEMPLATES SECTORIELS PRE-REMPLIS
// ══════════════════════════════════════════════════════════════════
{
  id: "TEMPLATE_HEALTH_PUBLIC",
  title: "🏥 Template : Programme de santé publique",
  organization: "[Votre organisation]",
  domain: "health",
  phase: "exploration",
  resourceLevel: "LMIC",
  context: "Template pour programmes de santé publique : campagnes de prévention, dépistage de masse, promotion de la santé. Adapté aux contextes PRFI avec ressources limitées.",
  population: "À définir selon votre projet",
  barriers: "Accès aux populations vulnérables, financement pérenne, coordination intersectorielle, formation du personnel, suivi-évaluation.",
  objectives: ["equity", "sustainability"],
  status: "template",
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  tags: ["Template", "Santé publique", "Prévention"],
  isTemplate: true,
  templateSector: "health"
}, {
  id: "TEMPLATE_EDUCATION",
  title: "🎓 Template : Programme éducatif",
  organization: "[Votre établissement]",
  domain: "education",
  phase: "exploration",
  resourceLevel: "LMIC",
  context: "Template pour projets éducatifs : réforme pédagogique, formation des enseignants, introduction de nouvelles méthodes, programmes de soutien scolaire.",
  population: "À définir selon votre projet",
  barriers: "Résistance au changement, formation continue, ressources pédagogiques, évaluation des apprentissages, engagement des parents.",
  objectives: ["equity", "sustainability", "evidence_based"],
  status: "template",
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  tags: ["Template", "Éducation", "Pédagogie"],
  isTemplate: true,
  templateSector: "education"
}, {
  id: "TEMPLATE_SOCIAL",
  title: "🤝 Template : Programme social / humanitaire",
  organization: "[Votre ONG / Institution]",
  domain: "social",
  phase: "exploration",
  resourceLevel: "LMIC",
  context: "Template pour interventions sociales et humanitaires : aide aux réfugiés, protection de l'enfance, lutte contre la pauvreté, insertion professionnelle.",
  population: "À définir selon votre projet",
  barriers: "Accès aux bénéficiaires, financement projet, coordination ONG, sécurité terrain, mesure d'impact social.",
  objectives: ["equity", "sustainability"],
  status: "template",
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  tags: ["Template", "Social", "Humanitaire"],
  isTemplate: true,
  templateSector: "social"
}, {
  id: "TEMPLATE_INDUSTRY",
  title: "🏭 Template : Transformation organisationnelle",
  organization: "[Votre entreprise]",
  domain: "workplace",
  phase: "exploration",
  resourceLevel: "HIC",
  context: "Template pour projets de transformation en entreprise : conduite du changement, digitalisation, amélioration continue, culture d'innovation.",
  population: "À définir selon votre projet",
  barriers: "Résistance au changement, communication interne, formation, alignement managérial, mesure de performance.",
  objectives: ["speed", "cost_effectiveness", "sustainability"],
  status: "template",
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  tags: ["Template", "Industrie", "Transformation"],
  isTemplate: true,
  templateSector: "industry"
},
// ══════════════════════════════════════════════════════════════════
// EXEMPLES EXISTANTS (conserves)
// ══════════════════════════════════════════════════════════════════
{
  id: "EXAMPLE_001",
  title: "INNOV5-MH – Intégration mhGAP en soins primaires",
  organization: "Ministère de la Santé - Région Souss-Massa (Maroc)",
  domain: "mentalHealth",
  phase: "preparation",
  resourceLevel: "LMIC",
  context: "Le Maroc fait face à un déficit majeur en psychiatres (1 pour 100 000 habitants). Le projet vise à former les médecins généralistes et infirmiers des centres de santé primaires au guide mhGAP de l'OMS pour la détection et la prise en charge des troubles mentaux courants (dépression, anxiété, psychoses). Ce projet pilote cible 6 sites dans la région Souss-Massa.",
  population: "Personnel soignant de 45 centres de santé (environ 200 professionnels) et population cible de 500 000 habitants",
  barriers: "Résistance culturelle à parler de santé mentale, surcharge de travail des équipes, manque de formation initiale en psychiatrie, absence de système de données sur les consultations psy, stigmatisation des patients, turnover du personnel",
  objectives: ["equity", "sustainability", "cost_effectiveness"],
  status: "draft",
  createdAt: "2025-01-15T10:00:00Z",
  updatedAt: "2025-01-15T10:00:00Z",
  tags: ["INNOV5", "mhGAP", "OMS", "LMIC", "Maroc"]
}, {
  id: "EXAMPLE_002",
  title: "Chirurgie sécurisée – CHU Ibn Rochd",
  organization: "CHU Ibn Rochd - Casablanca",
  domain: "health",
  phase: "implementation",
  resourceLevel: "UMIC",
  context: "Implémentation du checklist chirurgical OMS et des protocoles de sécurité patient dans les 12 blocs opératoires du CHU. Le projet vise à réduire les événements indésirables graves et améliorer la communication inter-équipes. Formation de 150 chirurgiens, anesthésistes et infirmiers de bloc.",
  population: "150 professionnels de bloc opératoire, 8 000 interventions/an",
  barriers: "Résistance au changement des chirurgiens seniors, manque de temps en bloc, absence de champion médical identifié, culture hiérarchique limitant la prise de parole des infirmiers, turnover des internes",
  objectives: ["evidence_based", "speed"],
  status: "draft",
  createdAt: "2025-02-01T09:00:00Z",
  updatedAt: "2025-02-01T09:00:00Z",
  tags: ["Chirurgie", "Sécurité patient", "CHU", "Checklist OMS"]
}, {
  id: "EXAMPLE_003",
  title: "Santé mentale en milieu scolaire – Lycées Rabat",
  organization: "Académie Régionale Rabat-Salé-Kénitra + Fondation SHAM",
  domain: "prevention",
  phase: "exploration",
  resourceLevel: "LMIC",
  context: "Programme pilote de détection précoce et orientation des élèves présentant des signes de mal-être psychologique (anxiété, dépression, risque suicidaire). Formation des conseillers d'orientation et infirmiers scolaires. Partenariat avec les centres de santé mentale locaux pour les références.",
  population: "20 lycées, 15 000 élèves, 60 professionnels formés",
  barriers: "Stigmatisation de la santé mentale chez les adolescents, manque de ressources humaines spécialisées, absence de protocole de référence, réticence des familles, charge de travail des conseillers",
  objectives: ["equity", "sustainability"],
  status: "draft",
  createdAt: "2025-02-15T14:00:00Z",
  updatedAt: "2025-02-15T14:00:00Z",
  tags: ["Prévention", "Scolaire", "Adolescents", "Santé mentale"]
}, {
  id: "EXAMPLE_004",
  title: "Télémédecine dermatologie – Zones rurales",
  organization: "Direction Régionale Santé Béni Mellal-Khénifra",
  domain: "health",
  phase: "preparation",
  resourceLevel: "LMIC",
  context: "Déploiement d'une plateforme de télédermatologie pour les centres de santé ruraux sans dermatologue. Les médecins généralistes prennent des photos des lésions et reçoivent un avis spécialisé sous 48h. Objectif : réduire les déplacements inutiles et améliorer le diagnostic précoce des cancers cutanés.",
  population: "30 centres de santé ruraux, 200 000 habitants, 50 médecins généralistes",
  barriers: "Connectivité internet limitée, résistance technologique des médecins seniors, manque de smartphones adaptés, absence de formation à la photographie médicale, cadre réglementaire flou sur la télémédecine",
  objectives: ["cost_effectiveness", "equity"],
  status: "draft",
  createdAt: "2025-03-01T11:00:00Z",
  updatedAt: "2025-03-01T11:00:00Z",
  tags: ["Télémédecine", "Dermatologie", "Rural", "Digital Health"]
}];

// Projet demo par defaut (premier de la liste)
var DEMO_PROJECT = EXAMPLE_PROJECTS[0];

var DEMO_DIAGNOSTIC_ANSWERS = {
  L1: 4,
  L2: 3,
  L3: 4,
  L4: 3,
  C1: 3,
  C2: 2,
  C3: 3,
  C4: 2,
  R1: 2,
  R2: 3,
  R3: 2,
  R4: 2,
  D1: 2,
  D2: 2,
  D3: 3,
  D4: 2,
  A1: 2,
  A2: 3,
  A3: 3,
  A4: 2,
  P1: 4,
  P2: 3,
  P3: 4,
  P4: 3
};

// ============================================
// DOMAINES
// ============================================
var DOMAINS = {
  health: {
    fr: "Santé",
    en: "Health",
    icon: "🏥"
  },
  mentalHealth: {
    fr: "Santé mentale",
    en: "Mental Health",
    icon: "🧠"
  },
  education: {
    fr: "Éducation",
    en: "Education",
    icon: "🎓"
  },
  management: {
    fr: "Management",
    en: "Management",
    icon: "📊"
  },
  agriculture: {
    fr: "Agriculture",
    en: "Agriculture",
    icon: "🌾"
  },
  prfi: {
    fr: "PRFI / Global Health",
    en: "LMIC / Global Health",
    icon: "🌍"
  },
  prevention: {
    fr: "Prévention",
    en: "Prevention",
    icon: "🛡️"
  },
  // v8.0 - Nouveaux secteurs non-sante
  social: {
    fr: "Action sociale",
    en: "Social Services",
    icon: "🤝"
  },
  justice: {
    fr: "Justice / Réinsertion",
    en: "Justice / Reentry",
    icon: "⚖️"
  },
  workplace: {
    fr: "Transformation organisationnelle",
    en: "Organizational Change",
    icon: "🏢"
  },
  environment: {
    fr: "Environnement / Climat",
    en: "Environment / Climate",
    icon: "🌱"
  },
  humanitarian: {
    fr: "Humanitaire",
    en: "Humanitarian",
    icon: "🆘"
  },
  digital: {
    fr: "Transformation digitale",
    en: "Digital Transformation",
    icon: "💻"
  }
};

// v8.0 - Exemples multi-secteurs pour demos
var SECTOR_EXAMPLES = {
  health: {
    title: {
      fr: "Intégration mhGAP en soins primaires",
      en: "mhGAP integration in primary care"
    },
    context: {
      fr: "Centres de santé ruraux au Maroc",
      en: "Rural health centers in Morocco"
    },
    challenge: {
      fr: "Former 500 infirmiers à la détection des troubles mentaux",
      en: "Train 500 nurses in mental health detection"
    }
  },
  education: {
    title: {
      fr: "Pédagogie par projets en lycée professionnel",
      en: "Project-based learning in vocational school"
    },
    context: {
      fr: "15 établissements techniques en région",
      en: "15 technical schools in the region"
    },
    challenge: {
      fr: "Changer les pratiques de 200 enseignants habitués au cours magistral",
      en: "Change practices of 200 teachers used to lectures"
    }
  },
  social: {
    title: {
      fr: "Programme Logement d'Abord",
      en: "Housing First Program"
    },
    context: {
      fr: "Métropole de 500,000 habitants",
      en: "Metropolitan area of 500,000"
    },
    challenge: {
      fr: "Coordonner 12 services différents pour un accompagnement global",
      en: "Coordinate 12 different services for comprehensive support"
    }
  },
  justice: {
    title: {
      fr: "Préparation à la sortie de prison",
      en: "Prison Reentry Preparation"
    },
    context: {
      fr: "3 établissements pénitentiaires",
      en: "3 correctional facilities"
    },
    challenge: {
      fr: "Réduire la récidive de 40% via un suivi intensif",
      en: "Reduce recidivism by 40% through intensive follow-up"
    }
  },
  workplace: {
    title: {
      fr: "Déploiement du télétravail hybride",
      en: "Hybrid Remote Work Deployment"
    },
    context: {
      fr: "Entreprise de 2,000 employés",
      en: "Company of 2,000 employees"
    },
    challenge: {
      fr: "Maintenir la culture d'entreprise et la productivité",
      en: "Maintain company culture and productivity"
    }
  },
  environment: {
    title: {
      fr: "Adoption de l'agroécologie",
      en: "Agroecology Adoption"
    },
    context: {
      fr: "Coopérative de 150 agriculteurs",
      en: "Cooperative of 150 farmers"
    },
    challenge: {
      fr: "Transition sans perte de revenus pendant 3 ans",
      en: "Transition without income loss for 3 years"
    }
  },
  digital: {
    title: {
      fr: "Dossier patient informatisé en EHPAD",
      en: "Electronic Health Records in Nursing Homes"
    },
    context: {
      fr: "25 établissements, personnel peu digitalisé",
      en: "25 facilities, low digital literacy staff"
    },
    challenge: {
      fr: "Former 800 soignants en 6 mois tout en maintenant les soins",
      en: "Train 800 caregivers in 6 months while maintaining care"
    }
  }
};

// Vocabulaire contextuel par secteur (labels dynamiques)
var SECTOR_TERMS = {
  "default": {
    actor: {
      fr: "bénéficiaire",
      en: "beneficiary"
    },
    actors: {
      fr: "bénéficiaires",
      en: "beneficiaries"
    },
    service: {
      fr: "service / structure",
      en: "service / facility"
    },
    program: {
      fr: "programme / projet",
      en: "program / project"
    }
  },
  "health": {
    actor: {
      fr: "patient",
      en: "patient"
    },
    actors: {
      fr: "patients",
      en: "patients"
    },
    service: {
      fr: "service de santé / établissement",
      en: "health service / facility"
    },
    program: {
      fr: "programme / protocole",
      en: "program / protocol"
    }
  },
  "mentalHealth": {
    actor: {
      fr: "personne suivie en santé mentale",
      en: "service user in mental health"
    },
    actors: {
      fr: "personnes suivies en santé mentale",
      en: "service users in mental health"
    },
    service: {
      fr: "service de santé mentale",
      en: "mental health service"
    },
    program: {
      fr: "programme de santé mentale",
      en: "mental health program"
    }
  },
  "education": {
    actor: {
      fr: "élève / étudiant·e",
      en: "student"
    },
    actors: {
      fr: "élèves / étudiant·e·s",
      en: "students"
    },
    service: {
      fr: "établissement scolaire / université",
      en: "school / university"
    },
    program: {
      fr: "programme éducatif",
      en: "educational program"
    }
  },
  "social": {
    actor: {
      fr: "bénéficiaire / usager",
      en: "service user"
    },
    actors: {
      fr: "bénéficiaires / usagers",
      en: "service users"
    },
    service: {
      fr: "service social / association",
      en: "social service / NGO"
    },
    program: {
      fr: "programme social",
      en: "social program"
    }
  },
  "justice": {
    actor: {
      fr: "personne suivie",
      en: "participant"
    },
    actors: {
      fr: "personnes suivies",
      en: "participants"
    },
    service: {
      fr: "service pénitentiaire / de probation",
      en: "correctional / probation service"
    },
    program: {
      fr: "programme de réinsertion",
      en: "reentry program"
    }
  },
  "humanitarian": {
    actor: {
      fr: "bénéficiaire",
      en: "beneficiary"
    },
    actors: {
      fr: "bénéficiaires",
      en: "beneficiaries"
    },
    service: {
      fr: "ONG / agence humanitaire",
      en: "NGO / humanitarian agency"
    },
    program: {
      fr: "intervention humanitaire",
      en: "humanitarian intervention"
    }
  },
  "environment": {
    actor: {
      fr: "agriculteur / ménage",
      en: "farmer / household"
    },
    actors: {
      fr: "agriculteurs / ménages",
      en: "farmers / households"
    },
    service: {
      fr: "service agricole / environnemental",
      en: "agricultural / environment service"
    },
    program: {
      fr: "programme agro-environnemental",
      en: "agro-environmental program"
    }
  },
  "workplace": {
    actor: {
      fr: "employé·e / collaborateur·trice",
      en: "worker / employee"
    },
    actors: {
      fr: "employé·e·s / collaborateurs",
      en: "workers / employees"
    },
    service: {
      fr: "entreprise / organisation",
      en: "company / organization"
    },
    program: {
      fr: "programme en entreprise",
      en: "workplace program"
    }
  },
  "digital": {
    actor: {
      fr: "utilisateur / usager",
      en: "user"
    },
    actors: {
      fr: "utilisateurs / usagers",
      en: "users"
    },
    service: {
      fr: "service numérique / plateforme",
      en: "digital service / platform"
    },
    program: {
      fr: "programme de transformation digitale",
      en: "digital transformation program"
    }
  }
};

// ============================================
// SECTOR CATEGORIES v8.0 - Categories multi-sectorielles
// ============================================
var SECTOR_CATEGORIES = {
  health: {
    label: {
      fr: '🏥 Santé',
      en: '🏥 Health'
    },
    domains: ['D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07', 'D08', 'D09', 'D10'],
    color: '#3B82F6'
  },
  education: {
    label: {
      fr: '🎓 Éducation',
      en: '🎓 Education'
    },
    domains: ['D11', 'D12'],
    color: '#8B5CF6'
  },
  management: {
    label: {
      fr: '🏢 Management',
      en: '🏢 Management'
    },
    domains: ['D13', 'D14'],
    color: '#F59E0B'
  },
  environment: {
    label: {
      fr: '🌍 Environnement',
      en: '🌍 Environment'
    },
    domains: ['D15', 'D16'],
    color: '#10B981'
  },
  industry: {
    label: {
      fr: '🏭 Industrie',
      en: '🏭 Industry'
    },
    domains: ['D17', 'D18'],
    color: '#6B7280'
  },
  social: {
    label: {
      fr: '🤝 Social',
      en: '🤝 Social'
    },
    domains: ['D19', 'D20'],
    color: '#EC4899'
  },
  research: {
    label: {
      fr: '🔬 Recherche',
      en: '🔬 Research'
    },
    domains: ['D21'],
    color: '#14B8A6'
  },
  humanitarian: {
    label: {
      fr: '🌐 Humanitaire',
      en: '🌐 Humanitarian'
    },
    domains: ['D22', 'D23'],
    color: '#EF4444'
  }
};

// ============================================
// PHASES EPIS
// ============================================
var PHASES = {
  exploration: {
    fr: "Exploration",
    en: "Exploration",
    icon: "🔍",
    description: {
      fr: "Identifier le problème et les solutions potentielles",
      en: "Identify problem and potential solutions"
    },
    keyActivities: {
      fr: ["Analyse des besoins", "Revue de littérature", "Consultation parties prenantes"],
      en: ["Needs assessment", "Literature review", "Stakeholder consultation"]
    }
  },
  preparation: {
    fr: "Préparation",
    en: "Preparation",
    icon: "📋",
    description: {
      fr: "Planifier et adapter l'intervention",
      en: "Plan and adapt the intervention"
    },
    keyActivities: {
      fr: ["Adaptation contextuelle", "Formation équipes", "Pilote"],
      en: ["Contextual adaptation", "Team training", "Pilot testing"]
    }
  },
  implementation: {
    fr: "Implémentation",
    en: "Implementation",
    icon: "🚀",
    description: {
      fr: "Déployer et monitorer l'intervention",
      en: "Deploy and monitor the intervention"
    },
    keyActivities: {
      fr: ["Déploiement", "Suivi indicateurs", "Résolution problèmes"],
      en: ["Rollout", "Indicator monitoring", "Problem-solving"]
    }
  },
  sustainment: {
    fr: "Pérennisation",
    en: "Sustainment",
    icon: "🔄",
    description: {
      fr: "Maintenir et institutionnaliser",
      en: "Maintain and institutionalize"
    },
    keyActivities: {
      fr: ["Intégration routines", "Transfert compétences", "Financement pérenne"],
      en: ["Routine integration", "Capacity transfer", "Sustainable funding"]
    }
  }
};

// ============================================
// DIAGNOSTIC QUESTIONS
// ============================================
var DIAGNOSTIC_QUESTIONS = {
  leadership: {
    label: {
      fr: "Leadership",
      en: "Leadership"
    },
    questions: [{
      id: "L1",
      text: {
        fr: "Les dirigeants communiquent clairement la vision du changement",
        en: "Leaders clearly communicate the vision for change"
      }
    }, {
      id: "L2",
      text: {
        fr: "Des ressources sont allouées au projet",
        en: "Resources are allocated to the project"
      }
    }, {
      id: "L3",
      text: {
        fr: "Un sponsor exécutif est identifié et actif",
        en: "An executive sponsor is identified and active"
      }
    }, {
      id: "L4",
      text: {
        fr: "Les managers de proximité soutiennent le changement",
        en: "Middle managers support the change"
      }
    }]
  },
  culture: {
    label: {
      fr: "Culture organisationnelle",
      en: "Organizational Culture"
    },
    questions: [{
      id: "C1",
      text: {
        fr: "L'amélioration continue est valorisée",
        en: "Continuous improvement is valued"
      }
    }, {
      id: "C2",
      text: {
        fr: "Les erreurs sont vues comme des opportunités d'apprentissage",
        en: "Mistakes are seen as learning opportunities"
      }
    }, {
      id: "C3",
      text: {
        fr: "L'organisation est ouverte aux nouvelles pratiques",
        en: "Organization is open to new practices"
      }
    }, {
      id: "C4",
      text: {
        fr: "La collaboration inter-services est effective",
        en: "Cross-department collaboration is effective"
      }
    }]
  },
  resources: {
    label: {
      fr: "Ressources",
      en: "Resources"
    },
    questions: [{
      id: "R1",
      text: {
        fr: "Du temps est dégagé pour la formation",
        en: "Time is allocated for training"
      }
    }, {
      id: "R2",
      text: {
        fr: "Les équipements nécessaires sont disponibles",
        en: "Necessary equipment is available"
      }
    }, {
      id: "R3",
      text: {
        fr: "Le budget est suffisant pour le projet",
        en: "Budget is sufficient for the project"
      }
    }, {
      id: "R4",
      text: {
        fr: "Le personnel est en nombre suffisant",
        en: "Staffing levels are adequate"
      }
    }]
  },
  data: {
    label: {
      fr: "Données et évaluation",
      en: "Data and Evaluation"
    },
    questions: [{
      id: "D1",
      text: {
        fr: "Des données de performance sont collectées régulièrement",
        en: "Performance data is collected regularly"
      }
    }, {
      id: "D2",
      text: {
        fr: "Les données sont utilisées pour prendre des décisions",
        en: "Data is used for decision-making"
      }
    }, {
      id: "D3",
      text: {
        fr: "Des indicateurs clairs sont définis pour le projet",
        en: "Clear indicators are defined for the project"
      }
    }, {
      id: "D4",
      text: {
        fr: "Le feedback est partagé régulièrement avec les équipes",
        en: "Feedback is shared regularly with teams"
      }
    }]
  },
  capacity: {
    label: {
      fr: "Capacités",
      en: "Capacity"
    },
    questions: [{
      id: "A1",
      text: {
        fr: "Le personnel possède les compétences techniques requises",
        en: "Staff has required technical skills"
      }
    }, {
      id: "A2",
      text: {
        fr: "Des formations sont accessibles et de qualité",
        en: "Quality training is accessible"
      }
    }, {
      id: "A3",
      text: {
        fr: "Des champions internes sont identifiés",
        en: "Internal champions are identified"
      }
    }, {
      id: "A4",
      text: {
        fr: "L'équipe a de l'expérience en gestion du changement",
        en: "Team has change management experience"
      }
    }]
  },
  partnerships: {
    label: {
      fr: "Partenariats",
      en: "Partnerships"
    },
    questions: [{
      id: "P1",
      text: {
        fr: "Des partenariats externes pertinents existent",
        en: "Relevant external partnerships exist"
      }
    }, {
      id: "P2",
      text: {
        fr: "Les bénéficiaires sont impliqués dans la conception",
        en: "Beneficiaries are involved in design"
      }
    }, {
      id: "P3",
      text: {
        fr: "Des liens avec la recherche/expertise existent",
        en: "Links with research/expertise exist"
      }
    }, {
      id: "P4",
      text: {
        fr: "Le réseau de parties prenantes est actif",
        en: "Stakeholder network is active"
      }
    }]
  }
};

// ============================================
// PRICING
// ============================================
var PRICING = {
  plans: [{
    id: "discovery",
    name: {
      fr: "Découverte",
      en: "Starter"
    },
    price: {
      fr: "Gratuit",
      en: "Free"
    },
    period: "",
    description: {
      fr: "Pour explorer Moudar",
      en: "To explore Moudar"
    },
    features: [{
      fr: "1 projet actif",
      en: "1 active project"
    }, {
      fr: "3 diagnostics/mois",
      en: "3 diagnostics/month"
    }, {
      fr: "Export PDF",
      en: "PDF export"
    }, {
      fr: "Stockage local navigateur",
      en: "Local browser storage"
    }],
    cta: {
      fr: "Commencer gratuitement",
      en: "Start free"
    },
    popular: false
  }, {
    id: "professional",
    name: {
      fr: "Professionnel",
      en: "Professional"
    },
    price: {
      fr: "$95",
      en: "$95"
    },
    period: {
      fr: "/mois",
      en: "/month"
    },
    description: {
      fr: "Pour consultants et chercheurs",
      en: "For consultants and researchers"
    },
    features: [{
      fr: "10 projets actifs",
      en: "10 active projects"
    }, {
      fr: "Diagnostics illimités",
      en: "Unlimited diagnostics"
    }, {
      fr: "Export PDF + Word",
      en: "PDF + Word export"
    }, {
      fr: "Assistant IA avancé",
      en: "Advanced AI assistant"
    }, {
      fr: "Templates TIDieR / SPIRIT",
      en: "TIDieR / SPIRIT templates"
    }, {
      fr: "Stockage cloud sécurisé",
      en: "Secure cloud storage"
    }],
    cta: {
      fr: "Essai gratuit 14 jours",
      en: "14-day free trial"
    },
    popular: true
  }, {
    id: "institution",
    name: {
      fr: "Institution",
      en: "Institution"
    },
    price: {
      fr: "À partir de $520",
      en: "From $520"
    },
    period: {
      fr: "/mois",
      en: "/month"
    },
    description: {
      fr: "Pour CHU, ministères, ONG",
      en: "For hospitals, ministries, NGOs"
    },
    features: [{
      fr: "Projets illimités",
      en: "Unlimited projects"
    }, {
      fr: "10 comptes utilisateurs",
      en: "10 user accounts"
    }, {
      fr: "Collaboration temps réel",
      en: "Real-time collaboration"
    }, {
      fr: "Templates bailleurs (OMS, UNICEF)",
      en: "Funder templates (WHO, UNICEF)"
    }, {
      fr: "Formation incluse (1 jour)",
      en: "Training included (1 day)"
    }, {
      fr: "Support dédié + conformité RGPD",
      en: "Dedicated support + GDPR compliance"
    }],
    cta: {
      fr: "Demander un devis",
      en: "Request quote"
    },
    popular: false
  }],
  addons: [{
    name: {
      fr: "Formation sur site",
      en: "On-site training"
    },
    price: "$1,600/day",
    desc: {
      fr: "Formation équipe complète",
      en: "Full team training"
    }
  }, {
    name: {
      fr: "Diagnostic accompagné",
      en: "Guided diagnostic"
    },
    price: "$2,700",
    desc: {
      fr: "Avec consultant expert",
      en: "With expert consultant"
    }
  }, {
    name: {
      fr: "Comptes supplémentaires",
      en: "Additional accounts"
    },
    price: "$31/month",
    desc: {
      fr: "Par utilisateur",
      en: "Per user"
    }
  }, {
    name: {
      fr: "Hébergement privé",
      en: "Private hosting"
    },
    price: {
      fr: "Sur devis",
      en: "Custom quote"
    },
    desc: {
      fr: "Serveur dédié",
      en: "Dedicated server"
    }
  }]
};

export {
  EXAMPLE_PROJECTS,
  DEMO_PROJECT,
  DEMO_DIAGNOSTIC_ANSWERS,
  DOMAINS,
  SECTOR_EXAMPLES,
  SECTOR_TERMS,
  SECTOR_CATEGORIES,
  PHASES,
  DIAGNOSTIC_QUESTIONS,
  PRICING
};
