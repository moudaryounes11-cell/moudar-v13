var MoudarVerticalStrategy = {
  verticals: [{
    "id": "MFH",
    "name": "MOUDAR for Health",
    "vertical": "Sant\u00e9 et sant\u00e9 mentale",
    "why": "Forte pression r\u00e9glementaire et des bailleurs sur les preuves et l'impact ; budgets orient\u00e9s vers l'impl\u00e9mentation.",
    "valueProposition": "Garantir la conformit\u00e9 aux protocoles et maximiser le RE-AIM (port\u00e9e, efficacit\u00e9, maintenance) dans les syst\u00e8mes de soins primaires."
  }, {
    "id": "MFP",
    "name": "MOUDAR for Policy",
    "vertical": "Administration publique / justice",
    "why": "Faible culture de l'impl\u00e9mentation ; de nombreuses politiques publiques \u00e9chouent \u00e0 cause d'une mauvaise ex\u00e9cution.",
    "valueProposition": "Traduire les lois et d\u00e9crets en strat\u00e9gies ERIC concr\u00e8tes, avec un RiskAnalysis ax\u00e9 sur la r\u00e9sistance au changement (CFIR 3.1 & 3.2)."
  }],
  adaptations: [{
    "component": "KnowledgeGraph",
    "exampleFor": "Sant\u00e9 mentale",
    "adaptation": "Augmenter le poids de CFIR 3.4 (ressources disponibles) et 4.2 (auto-efficacit\u00e9 du personnel) dans les scores de risque."
  }, {
    "component": "ERICStrategies",
    "exampleFor": "Sant\u00e9 mentale",
    "adaptation": "Mettre en avant la supervision clinique et la facilitation externe pour compenser le manque de comp\u00e9tences sp\u00e9cialis\u00e9es."
  }, {
    "component": "RiskModel",
    "exampleFor": "Sant\u00e9 mentale",
    "adaptation": "Si l'acceptabilit\u00e9 populationnelle (Proctor) ou le RE-AIM Reach sont trop bas, forcer le statut minimum JAUNE ou ROUGE."
  }, {
    "component": "Dashboards",
    "exampleFor": "Sant\u00e9 mentale",
    "adaptation": "Proposer des mod\u00e8les de tableaux de bord pr\u00e9-remplis (taux de r\u00e9tention, temps d'attente, adh\u00e9sion au traitement, etc.)."
  }],
  commercialActions: [{
    "id": "POC_ANTIECHEC",
    "action": "POC \"Anti-\u00e9chec\"",
    "objective": "Vendre un service court \u00ab Audit et Plan de mitigation du risque ROUGE MOUDAR \u00bb.",
    "clientAppeal": "D\u00e9montre en 48h la puissance du moteur IA sur les documents existants, sans engagement long."
  }, {
    "id": "ROI_SPECIFIQUE",
    "action": "Calculateur de ROI sp\u00e9cifique",
    "objective": "Adapter le ROICalculator \u00e0 chaque verticale (ex. jours de traitement \u00e9conomis\u00e9s, r\u00e9duction des r\u00e9hospitalisations).",
    "clientAppeal": "Parle le langage des financiers et non seulement des chercheurs."
  }, {
    "id": "PARTENARIAT_REFERENCE",
    "action": "Partenariat de r\u00e9f\u00e9rence",
    "objective": "Cibler un acteur leader (universit\u00e9, agence gouvernementale) pour un POC gratuit contre t\u00e9moignage et donn\u00e9es anonymis\u00e9es.",
    "clientAppeal": "Cr\u00e9e une preuve sociale forte et un avantage concurrentiel bas\u00e9 sur des donn\u00e9es r\u00e9elles."
  }],
  bootstrappingStrategies: [{
    "id": "BOOTSTRAP_INTERNE",
    "technicalAction": "R\u00e9utiliser les donn\u00e9es d\u00e9j\u00e0 saisies (commentaires qualitatifs CFIR) comme corpus de phrases labellis\u00e9es.",
    "justification": "Permet de d\u00e9marrer l'apprentissage sans attendre un gros volume de nouveaux projets."
  }, {
    "id": "CROWDSOURCING_UI",
    "technicalAction": "Int\u00e9grer une interface o\u00f9 les experts corrigent ou valident les pr\u00e9dictions NLP ; chaque correction alimente l'AdaptiveKG.",
    "justification": "Permet le co-entra\u00eenement humain + machine en continu."
  }]
};

export default MoudarVerticalStrategy;
