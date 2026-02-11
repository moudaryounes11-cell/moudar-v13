var MoudarCFIRDomainWeightingModel = {
  "domains": [{
    "id": "I",
    "code": "INTERVENTION",
    "label": "Caract\u00e9ristiques de l'intervention",
    "factorsCount": 8,
    "keyExamples": ["Preuves", "Complexit\u00e9", "Conception"],
    "weight": 0.1,
    "weightPercent": 10,
    "justification": "L'innovation elle-m\u00eame est g\u00e9n\u00e9ralement fix\u00e9e."
  }, {
    "id": "II",
    "code": "OUTER_SETTING",
    "label": "Milieu externe",
    "factorsCount": 4,
    "keyExamples": ["Pression", "Politiques", "Liens inter-organisations"],
    "weight": 0.15,
    "weightPercent": 15,
    "justification": "Importance croissante des r\u00e9seaux et du financement."
  }, {
    "id": "III",
    "code": "INNER_SETTING",
    "label": "Milieu interne",
    "factorsCount": 16,
    "keyExamples": ["Leadership", "Climat/Culture", "Ressources", "Structure"],
    "weight": 0.45,
    "weightPercent": 45,
    "justification": "C'est le domaine le plus critique. Si l'organisation n'est pas pr\u00eate, rien ne fonctionne."
  }, {
    "id": "IV",
    "code": "INDIVIDUAL_CHARACTERISTICS",
    "label": "Caract\u00e9ristiques de l'individu",
    "factorsCount": 5,
    "keyExamples": ["Connaissances", "Auto-efficacit\u00e9", "Motivation"],
    "weight": 0.15,
    "weightPercent": 15,
    "justification": "Important, mais un leadership fort peut compenser en partie."
  }, {
    "id": "V",
    "code": "PROCESS",
    "label": "Processus d'impl\u00e9mentation",
    "factorsCount": 6,
    "keyExamples": ["Planification", "\u00c9valuation", "R\u00e9flexion"],
    "weight": 0.15,
    "weightPercent": 15,
    "justification": "Refl\u00e8te la qualit\u00e9 globale de la gestion de projet."
  }],
  "totalWeight": 1.0
};

export default MoudarCFIRDomainWeightingModel;
