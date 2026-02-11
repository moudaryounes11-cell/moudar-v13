// ============================================
// CAS D'USAGE
// ============================================
const USE_CASES = [{
  id: 1,
  title: {
    fr: "Télépsychiatrie rurale",
    en: "Rural telepsychiatry"
  },
  country: "Canada 🇨🇦",
  domain: "mentalHealth",
  duration: "18 mois",
  budget: "450K CAD",
  context: {
    fr: "Délais d'accès psychiatrie : 18 mois. Population rurale isolée.",
    en: "18-month psychiatry access delays. Isolated rural population."
  },
  outcomes: {
    fr: "Adoption 78%, délais -60%",
    en: "78% adoption, -60% delays"
  },
  roi: {
    fr: "ROI 3.2x en 2 ans",
    en: "3.2x ROI in 2 years"
  }
}, {
  id: 2,
  title: {
    fr: "Lean Management Urgences",
    en: "ED Lean Management"
  },
  country: "Suisse 🇨🇭",
  domain: "management",
  duration: "24 mois",
  budget: "320K CHF",
  context: {
    fr: "45 000 passages/an, temps d'attente 4h30",
    en: "45,000 visits/year, 4h30 wait time"
  },
  outcomes: {
    fr: "Temps d'attente -35%, satisfaction +28pts",
    en: "-35% wait time, +28pts satisfaction"
  },
  roi: {
    fr: "180K CHF/an économisés",
    en: "180K CHF/year savings"
  }
}, {
  id: 3,
  title: {
    fr: "mHealth Diabète",
    en: "mHealth Diabetes"
  },
  country: "Kenya 🇰🇪",
  domain: "prfi",
  duration: "36 mois",
  budget: "280K USD",
  context: {
    fr: "Diabète 8%, 1 médecin / 50 000 habitants",
    en: "8% diabetes, 1 doctor / 50,000 population"
  },
  outcomes: {
    fr: "Adhérence +40%, HbA1c -1.2pts",
    en: "+40% adherence, -1.2 HbA1c"
  },
  roi: {
    fr: "12 USD/patient/an",
    en: "$12/patient/year"
  }
}, {
  id: 4,
  title: {
    fr: "Prévention suicide scolaire",
    en: "School suicide prevention"
  },
  country: "Maroc 🇲🇦",
  domain: "prevention",
  duration: "24 mois",
  budget: "$18K USD",
  context: {
    fr: "Tabou culturel fort, pas de psychologues scolaires",
    en: "Strong cultural taboo, no school psychologists"
  },
  outcomes: {
    fr: "Adoption 90%, détection x3",
    en: "90% adoption, 3x detection"
  },
  roi: {
    fr: "Impact : vies sauvées",
    en: "Impact: lives saved"
  }
}, {
  id: 5,
  title: {
    fr: "Innovation agricole",
    en: "Agricultural innovation"
  },
  country: "Sénégal 🇸🇳",
  domain: "agriculture",
  duration: "30 mois",
  budget: "$100K USD",
  context: {
    fr: "Changement climatique, rendements en baisse",
    en: "Climate change, declining yields"
  },
  outcomes: {
    fr: "Adoption 45%, rendements +25%",
    en: "45% adoption, +25% yields"
  },
  roi: {
    fr: "$200 investi → $360/an revenus",
    en: "$200 invested → $360/year income"
  }
}];

export default USE_CASES;
export { USE_CASES };
