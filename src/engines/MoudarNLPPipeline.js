var MoudarNLPPipeline = {
  steps: [{
    "step": 1,
    "name": "Ingestion",
    "description": "L'utilisateur charge un fichier (PDF, DOCX, TXT) via l'interface ou envoie le texte via l'API.",
    "component": "API MOUDAR / Endpoint /v1/projects/{id}/nlp_ingest"
  }, {
    "step": 2,
    "name": "Pr\u00e9traitement",
    "description": "Nettoyage du texte (en-t\u00eates, pieds de page, mise en forme) et d\u00e9tection de la langue.",
    "component": "Service de preprocessing (Python/NLP)"
  }, {
    "step": 3,
    "name": "Mappage s\u00e9mantique",
    "description": "Le mod\u00e8le IA lit le texte et identifie les phrases reli\u00e9es aux 39 d\u00e9terminants CFIR.",
    "component": "Moteur NLP / AdaptiveKG"
  }, {
    "step": 4,
    "name": "Notation",
    "description": "Chaque facteur CFIR re\u00e7oit une note 1\u20135 en fonction de la tonalit\u00e9 et de l'intensit\u00e9 des expressions d\u00e9tect\u00e9es.",
    "component": "ScoringEngine"
  }, {
    "step": 5,
    "name": "R\u00e9sultat",
    "description": "Le diagnostic CFIR (scores, barri\u00e8res, extraits sources) est pr\u00e9sent\u00e9 \u00e0 l'utilisateur pour validation, et le RiskAnalysis est mis \u00e0 jour.",
    "component": "Interface utilisateur MOUDAR"
  }],
  cfirExamples: [{
    "factor": "3.1 Culture et climat",
    "example": "Personne ne veut changer ici, \u00e7a fait des ann\u00e9es qu'on travaille comme \u00e7a.",
    "polarity": "n\u00e9gatif",
    "suggestedScore": 1
  }, {
    "factor": "4.1.1 Engagement du leader",
    "example": "La direction n'a pas pu assister aux r\u00e9unions cruciales.",
    "polarity": "n\u00e9gatif",
    "suggestedScore": 2
  }, {
    "factor": "5.5 \u00c9valuation et feedback",
    "example": "On ne sait jamais si ce qu'on fait fonctionne ou non.",
    "polarity": "n\u00e9gatif",
    "suggestedScore": 1
  }],
  techniques: [{
    "id": "TRANSFORMERS",
    "technique": "Mod\u00e8les de transformation (BERT, RoBERTa, etc.)",
    "role": "Comprendre le contexte et les relations complexes (ex. relier \u00ab \u00e9quipe de gestion \u00bb au domaine leadership)."
  }, {
    "id": "SENTIMENT",
    "technique": "Analyse de tonalit\u00e9",
    "role": "Relier la valence \u00e9motionnelle des phrases aux scores (1 \u00e0 5) des facteurs CFIR."
  }, {
    "id": "ZERO_FEWSHOT",
    "technique": "Zero-shot / Few-shot learning",
    "role": "Utiliser les descriptions textuelles officielles des 39 d\u00e9terminants CFIR comme base pour classer des phrases avec peu d'exemples annot\u00e9s."
  }]
};

export default MoudarNLPPipeline;
