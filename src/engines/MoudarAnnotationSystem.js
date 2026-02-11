var MoudarAnnotationSystem = {
  ui: {
    "panels": [{
      "id": "LEFT",
      "name": "Panneau contexte",
      "content": "Affichage du document source complet (compte rendu, transcription).",
      "role": "Permettre \u00e0 l'expert de lire la phrase dans son contexte avant annotation."
    }, {
      "id": "RIGHT",
      "name": "Panneau annotation",
      "content": "Snippet de texte s\u00e9lectionn\u00e9, menu de choix CFIR, curseur de tonalit\u00e9.",
      "role": "Zone d'action o\u00f9 l'expert attribue le label CFIR et le score."
    }]
  },
  qualityControls: [{
    "id": "IRR_WEIGHTING",
    "measure": "Pond\u00e9ration des experts",
    "technicalAction": "Calculer r\u00e9guli\u00e8rement la fiabilit\u00e9 inter-juges (IRR) en envoyant 10 % des extraits \u00e0 plusieurs experts.",
    "objective": "Mesurer la coh\u00e9rence des annotations et filtrer les experts peu align\u00e9s."
  }, {
    "id": "GOLD_SET",
    "measure": "Jeu de r\u00e9f\u00e9rence (Gold Set)",
    "technicalAction": "Constituer ~200 phrases annot\u00e9es par consensus ; exiger un test de calibration sur ce jeu avant annotation r\u00e9elle.",
    "objective": "Garantir un socle commun et certifier les annotateurs."
  }, {
    "id": "EXPERT_FEEDBACK",
    "measure": "R\u00e9troaction personnalis\u00e9e",
    "technicalAction": "Signaler aux experts quand leurs annotations s'\u00e9cartent statistiquement de la majorit\u00e9, avec lien vers la d\u00e9finition CFIR officielle.",
    "objective": "Limiter la d\u00e9rive d'annotation et am\u00e9liorer la formation continue."
  }],
  fairnessControls: [{
    "id": "DEMOGRAPHIC_DISAGGREGATION",
    "measure": "D\u00e9sagr\u00e9gation par facteurs contextuels",
    "technicalAction": "Auditer les taux de succ\u00e8s/\u00e9chec en les ventilant par taille d'organisation, secteur, rural/urbain, etc.",
    "objective": "Identifier les biais contextuels (ex. une strat\u00e9gie ne fonctionne qu'en grands \u00e9tablissements tr\u00e8s dot\u00e9s)."
  }, {
    "id": "COUNTERFACTUAL_TEST",
    "measure": "Test contrefactuel",
    "technicalAction": "Simuler des changements de variables contextuelles (ex. petite \u2192 grande organisation) et observer l'impact sur le statut de risque.",
    "objective": "D\u00e9tecter les variables non d\u00e9sir\u00e9es qui influencent trop le mod\u00e8le et ajuster les pond\u00e9rations."
  }, {
    "id": "EXPLAINABLE_RECOMMENDATIONS",
    "measure": "Tra\u00e7abilit\u00e9 de la recommandation",
    "technicalAction": "Pour chaque recommandation ERIC critique, fournir une justification chiffr\u00e9e (taux de succ\u00e8s, nombre de cas, IRR).",
    "objective": "Renforcer la transparence, permettre le contr\u00f4le humain et limiter les biais historiques."
  }]
};

export default MoudarAnnotationSystem;
