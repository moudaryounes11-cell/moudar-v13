var MoudarAPISpecification = {
  endpoints: [{
    "path": "/v1/projects/{project_id}/diagnostic",
    "method": "GET",
    "role": "Lecture (diagnostic). Permet de r\u00e9cup\u00e9rer le score CFIR actuel, les barri\u00e8res identifi\u00e9es et le statut de risque (ROUGE/JAUNE/VERT)."
  }, {
    "path": "/v1/projects/{project_id}/strategy_plan",
    "method": "POST",
    "role": "\u00c9criture (plan de strat\u00e9gie). Re\u00e7oit les strat\u00e9gies ERIC s\u00e9lectionn\u00e9es et met \u00e0 jour le plan Kanban ainsi que les notifications."
  }, {
    "path": "/v1/projects/{project_id}/evaluation",
    "method": "POST",
    "role": "\u00c9criture (apprentissage/cl\u00f4ture). Re\u00e7oit les donn\u00e9es du bilan simplifi\u00e9 (Maintenance RE-AIM) \u00e0 T0+6 et T0+12."
  }],
  evaluationPayload: [{
    "field": "project_id",
    "type": "UUID",
    "source": "MOUDAR",
    "objective": "Cl\u00e9 de liaison entre les \u00e9valuations et le KnowledgeGraph."
  }, {
    "field": "evaluation_type",
    "type": "String",
    "source": "Syst\u00e8me / Formulaire",
    "objective": "Indique le type de point de mesure (ex. 6_month_maintenance, final_closure)."
  }, {
    "field": "effectiveness_score",
    "type": "Integer (1 \u00e0 5)",
    "source": "Formulaire (Q3)",
    "objective": "Entre dans la variable cible Succ\u00e8s (1) vs \u00c9chec (0) pour l'apprentissage."
  }, {
    "field": "is_maintained",
    "type": "Boolean",
    "source": "Formulaire (Q1)",
    "objective": "Mesure de la p\u00e9rennisation de l'innovation."
  }, {
    "field": "main_failure_reason",
    "type": "String",
    "source": "Formulaire (Q2)",
    "objective": "Permet d'ajuster les pond\u00e9rations CFIR si les ressources sont syst\u00e9matiquement cit\u00e9es comme cause principale."
  }, {
    "field": "strategy_recommended",
    "type": "Boolean",
    "source": "Formulaire (Q5)",
    "objective": "Confirme l'efficacit\u00e9 per\u00e7ue des strat\u00e9gies ERIC d\u00e9ploy\u00e9es."
  }],
  webhookTriggers: [{
    "id": "RISK_TO_RED",
    "event": "Passage en ROUGE",
    "condition": "Le score RiskAnalysis franchit le seuil ROUGE (hostilit\u00e9 interne, d\u00e9rive budget/temps, etc.)."
  }, {
    "id": "RED_TO_YELLOW_OR_GREEN",
    "event": "Passage de ROUGE \u00e0 JAUNE/VERT",
    "condition": "Le statut de risque s'am\u00e9liore apr\u00e8s mise en \u0153uvre de strat\u00e9gies correctrices."
  }, {
    "id": "PERSISTENT_RED",
    "event": "Stagnation en ROUGE",
    "condition": "Le statut reste ROUGE > 30 jours sans nouvelle strat\u00e9gie ERIC de haute intensit\u00e9 planifi\u00e9e ou appliqu\u00e9e."
  }],
  webhookPayload: [{
    "field": "event_id",
    "description": "Identifiant unique de l'\u00e9v\u00e9nement.",
    "example": "alert-43b567"
  }, {
    "field": "event_type",
    "description": "Type d'\u00e9v\u00e9nement.",
    "example": "RISK_STATUS_CHANGE"
  }, {
    "field": "timestamp",
    "description": "Date et heure de l'\u00e9v\u00e9nement (ISO 8601).",
    "example": "2025-12-10T16:30:00Z"
  }, {
    "field": "project_id",
    "description": "Identifiant du projet MOUDAR concern\u00e9.",
    "example": "PRJ-9921-SANTE"
  }, {
    "field": "new_status",
    "description": "Nouveau statut de risque.",
    "example": "ROUGE"
  }, {
    "field": "old_status",
    "description": "Ancien statut de risque.",
    "example": "JAUNE"
  }, {
    "field": "reason_code",
    "description": "Code synth\u00e9tique de la raison de l'alerte.",
    "example": "CFIR_INNER_SETTING_LOW"
  }, {
    "field": "critical_barriers",
    "description": "Top 3 barri\u00e8res CFIR les plus critiques.",
    "example": ["3.1 Culture r\u00e9fractaire", "3.3 Manque de ressources", "4.1 Leader non engag\u00e9"]
  }, {
    "field": "recommended_action",
    "description": "Suggestion imm\u00e9diate li\u00e9e aux strat\u00e9gies ERIC.",
    "example": "Activate_Facilitation_Team"
  }],
  webhookSecurity: [{
    "id": "SECURE_REGISTRATION",
    "measure": "Inscription s\u00e9curis\u00e9e",
    "technicalAction": "Interface d'inscription \u00e0 l'API o\u00f9 l'utilisateur fournit l'URL de son webhook et re\u00e7oit une cl\u00e9 secr\u00e8te.",
    "objective": "Limiter la diffusion d'alertes \u00e0 des syst\u00e8mes autoris\u00e9s."
  }, {
    "id": "REQUEST_SIGNATURE",
    "measure": "Signature des requ\u00eates",
    "technicalAction": "Chaque requ\u00eate Webhook est sign\u00e9e (ex. SHA-256 de la charge utile + secret). Le partenaire v\u00e9rifie la signature.",
    "objective": "Garantir l'int\u00e9grit\u00e9 et l'authenticit\u00e9 de l'alerte."
  }, {
    "id": "RETRY_LOGIC",
    "measure": "Gestion des erreurs",
    "technicalAction": "Mise en place d'une file d'attente et d'une logique de retry (3 \u00e0 5 tentatives) en cas d'erreur 5xx c\u00f4t\u00e9 partenaire.",
    "objective": "Assurer la fiabilit\u00e9 de la transmission des alertes critiques."
  }]
};

export default MoudarAPISpecification;
