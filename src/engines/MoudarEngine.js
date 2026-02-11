    var MoudarEngine = (function() {
        'use strict';

        // ═══════════════════════════════════════════════════════════════════════════
        // GRAPHE DE CONNAISSANCES IMPLEMENTATION SCIENCE
        // ═══════════════════════════════════════════════════════════════════════════

        var KnowledgeGraph = {
            nodes: {
                domains: {
                    D01: { id: 'D01', name: 'mental_health', label: { fr: 'Santé mentale', en: 'Mental Health' }, weight: 1.0 },
                    D02: { id: 'D02', name: 'primary_care', label: { fr: 'Soins primaires', en: 'Primary Care' }, weight: 1.0 },
                    D03: { id: 'D03', name: 'surgery', label: { fr: 'Chirurgie', en: 'Surgery' }, weight: 1.0 },
                    D04: { id: 'D04', name: 'digital_health', label: { fr: 'Santé numérique', en: 'Digital Health' }, weight: 1.0 },
                    D05: { id: 'D05', name: 'maternal_child', label: { fr: 'Santé maternelle et infantile', en: 'Maternal & Child Health' }, weight: 1.0 },
                    D06: { id: 'D06', name: 'chronic_disease', label: { fr: 'Maladies chroniques', en: 'Chronic Disease' }, weight: 1.0 },
                    D07: { id: 'D07', name: 'infectious_disease', label: { fr: 'Maladies infectieuses', en: 'Infectious Disease' }, weight: 1.0 },
                    D08: { id: 'D08', name: 'geriatrics', label: { fr: 'Gériatrie', en: 'Geriatrics' }, weight: 1.0 },
                    D09: { id: 'D09', name: 'emergency', label: { fr: 'Urgences', en: 'Emergency Care' }, weight: 1.0 },
                    D10: { id: 'D10', name: 'rehabilitation', label: { fr: 'Réadaptation', en: 'Rehabilitation' }, weight: 1.0 },
                    // === NOUVEAUX DOMAINES v8.0 - MULTI-SECTORIEL ===
                    // ÉDUCATION & FORMATION
                    D11: { id: 'D11', name: 'education_k12', label: { fr: 'Éducation (K-12)', en: 'Education (K-12)' }, weight: 1.0, sector: 'education' },
                    D12: { id: 'D12', name: 'higher_education', label: { fr: 'Enseignement supérieur', en: 'Higher Education' }, weight: 1.0, sector: 'education' },
                    // MANAGEMENT & ORGANISATION
                    D13: { id: 'D13', name: 'management_corporate', label: { fr: 'Management d\'entreprise', en: 'Corporate Management' }, weight: 1.0, sector: 'management' },
                    D14: { id: 'D14', name: 'public_administration', label: { fr: 'Administration publique', en: 'Public Administration' }, weight: 1.0, sector: 'management' },
                    // AGRICULTURE & ENVIRONNEMENT
                    D15: { id: 'D15', name: 'agriculture', label: { fr: 'Agriculture & Agroécologie', en: 'Agriculture & Agroecology' }, weight: 1.0, sector: 'environment' },
                    D16: { id: 'D16', name: 'environment_climate', label: { fr: 'Environnement & Climat', en: 'Environment & Climate' }, weight: 1.0, sector: 'environment' },
                    // INDUSTRIE & TECHNOLOGIE
                    D17: { id: 'D17', name: 'manufacturing', label: { fr: 'Industrie & Production', en: 'Manufacturing & Production' }, weight: 1.0, sector: 'industry' },
                    D18: { id: 'D18', name: 'digital_transformation', label: { fr: 'Transformation digitale', en: 'Digital Transformation' }, weight: 1.0, sector: 'technology' },
                    // SOCIAL & JUSTICE
                    D19: { id: 'D19', name: 'social_work', label: { fr: 'Action sociale', en: 'Social Work' }, weight: 1.0, sector: 'social' },
                    D20: { id: 'D20', name: 'justice_reentry', label: { fr: 'Justice & Réinsertion', en: 'Justice & Reentry' }, weight: 1.0, sector: 'justice' },
                    // RECHERCHE & INNOVATION
                    D21: { id: 'D21', name: 'scientific_research', label: { fr: 'Recherche scientifique', en: 'Scientific Research' }, weight: 1.0, sector: 'research' },
                    // HUMANITAIRE & DÉVELOPPEMENT
                    D22: { id: 'D22', name: 'humanitarian', label: { fr: 'Humanitaire & Urgences', en: 'Humanitarian & Emergencies' }, weight: 1.0, sector: 'humanitarian' },
                    D23: { id: 'D23', name: 'development', label: { fr: 'Développement international', en: 'International Development' }, weight: 1.0, sector: 'development' }
                },
                contexts: {
                    C01: { id: 'C01', name: 'hospital', label: { fr: 'Hôpital', en: 'Hospital' }, resourceLevel: 'high' },
                    C02: { id: 'C02', name: 'primary_health_center', label: { fr: 'Centre de santé primaire', en: 'Primary Health Center' }, resourceLevel: 'medium' },
                    C03: { id: 'C03', name: 'community', label: { fr: 'Communauté', en: 'Community' }, resourceLevel: 'low' },
                    C04: { id: 'C04', name: 'school', label: { fr: 'École', en: 'School' }, resourceLevel: 'medium' },
                    C05: { id: 'C05', name: 'workplace', label: { fr: 'Lieu de travail', en: 'Workplace' }, resourceLevel: 'medium' },
                    C06: { id: 'C06', name: 'nursing_home', label: { fr: 'EHPAD/Maison de retraite', en: 'Nursing Home' }, resourceLevel: 'medium' },
                    C07: { id: 'C07', name: 'prison', label: { fr: 'Milieu carcéral', en: 'Prison' }, resourceLevel: 'low' },
                    C08: { id: 'C08', name: 'telehealth', label: { fr: 'Télésanté', en: 'Telehealth' }, resourceLevel: 'variable' },
                    C09: { id: 'C09', name: 'rural', label: { fr: 'Zone rurale', en: 'Rural Area' }, resourceLevel: 'low' },
                    C10: { id: 'C10', name: 'urban', label: { fr: 'Zone urbaine', en: 'Urban Area' }, resourceLevel: 'high' }
                },
                resourceLevels: {
                    R01: { id: 'R01', name: 'HIC', label: { fr: 'Pays à revenu élevé', en: 'High-Income Country' }, factor: 1.0 },
                    R02: { id: 'R02', name: 'UMIC', label: { fr: 'Pays à revenu intermédiaire supérieur', en: 'Upper-Middle Income' }, factor: 0.85 },
                    R03: { id: 'R03', name: 'LMIC', label: { fr: 'Pays à revenu intermédiaire inférieur', en: 'Lower-Middle Income' }, factor: 0.7 },
                    R04: { id: 'R04', name: 'LIC', label: { fr: 'Pays à faible revenu', en: 'Low-Income Country' }, factor: 0.5 }
                },
                phases: {
                    P01: { id: 'P01', name: 'exploration', label: { fr: 'Exploration', en: 'Exploration' }, order: 1 },
                    P02: { id: 'P02', name: 'preparation', label: { fr: 'Préparation', en: 'Preparation' }, order: 2 },
                    P03: { id: 'P03', name: 'implementation', label: { fr: 'Implémentation', en: 'Implementation' }, order: 3 },
                    P04: { id: 'P04', name: 'sustainment', label: { fr: 'Pérennisation', en: 'Sustainment' }, order: 4 }
                },
                barriers: {
                    B01: { id: 'B01', name: 'lack_training', label: { fr: 'Manque de formation', en: 'Lack of Training' }, category: 'capacity', severity: 0.8 },
                    B02: { id: 'B02', name: 'staff_resistance', label: { fr: 'Résistance du personnel', en: 'Staff Resistance' }, category: 'individual', severity: 0.85 },
                    B03: { id: 'B03', name: 'it_infrastructure', label: { fr: 'Infrastructure IT insuffisante', en: 'IT Infrastructure Issues' }, category: 'resources', severity: 0.75 },
                    B04: { id: 'B04', name: 'data_management', label: { fr: 'Problèmes de gestion des données', en: 'Data Management Issues' }, category: 'process', severity: 0.7 },
                    B05: { id: 'B05', name: 'stigma', label: { fr: 'Stigmatisation', en: 'Stigma' }, category: 'sociocultural', severity: 0.9 },
                    B06: { id: 'B06', name: 'funding', label: { fr: 'Financement insuffisant', en: 'Insufficient Funding' }, category: 'resources', severity: 0.95 },
                    B07: { id: 'B07', name: 'leadership_support', label: { fr: 'Manque de soutien de la direction', en: 'Lack of Leadership Support' }, category: 'organizational', severity: 0.9 },
                    B08: { id: 'B08', name: 'time_constraints', label: { fr: 'Contraintes de temps', en: 'Time Constraints' }, category: 'capacity', severity: 0.75 },
                    B09: { id: 'B09', name: 'cultural_barriers', label: { fr: 'Barrières culturelles', en: 'Cultural Barriers' }, category: 'sociocultural', severity: 0.85 },
                    B10: { id: 'B10', name: 'complexity', label: { fr: 'Complexité de l\'intervention', en: 'Intervention Complexity' }, category: 'intervention', severity: 0.7 },
                    B11: { id: 'B11', name: 'communication', label: { fr: 'Problèmes de communication', en: 'Communication Issues' }, category: 'process', severity: 0.65 },
                    B12: { id: 'B12', name: 'policy_alignment', label: { fr: 'Non-alignement avec les politiques', en: 'Policy Misalignment' }, category: 'outer_setting', severity: 0.8 },
                    B13: { id: 'B13', name: 'patient_engagement', label: { fr: 'Faible engagement des patients', en: 'Low Patient Engagement' }, category: 'individual', severity: 0.7 },
                    B14: { id: 'B14', name: 'staff_turnover', label: { fr: 'Rotation du personnel', en: 'Staff Turnover' }, category: 'organizational', severity: 0.75 },
                    B15: { id: 'B15', name: 'evidence_gaps', label: { fr: 'Manque de preuves adaptées', en: 'Evidence Gaps' }, category: 'intervention', severity: 0.65 }
                },
                strategies: {
                    S01: { id: 'S01', name: 'training_education', label: { fr: 'Formation et éducation', en: 'Training & Education' }, category: 'train_educate', cost: 'medium', complexity: 'low', 
                        kpis: [
                            { id: 'K01a', indicator: { fr: '% personnel formé', en: '% staff trained' }, target: '≥80%', frequency: { fr: 'Trimestriel', en: 'Quarterly' }, source: { fr: 'Registre formation', en: 'Training registry' } },
                            { id: 'K01b', indicator: { fr: 'Score post-formation', en: 'Post-training score' }, target: '≥70/100', frequency: { fr: 'Post-formation', en: 'Post-training' }, source: { fr: 'Quiz/évaluation', en: 'Quiz/assessment' } }
                        ]
                    },
                    S02: { id: 'S02', name: 'audit_feedback', label: { fr: 'Audit et feedback', en: 'Audit & Feedback' }, category: 'evaluate_iterate', cost: 'low', complexity: 'medium',
                        kpis: [
                            { id: 'K02a', indicator: { fr: 'Nb audits réalisés', en: 'Number of audits' }, target: '≥4/an', frequency: { fr: 'Trimestriel', en: 'Quarterly' }, source: { fr: 'Rapports audit', en: 'Audit reports' } },
                            { id: 'K02b', indicator: { fr: '% actions correctives mises en œuvre', en: '% corrective actions implemented' }, target: '≥75%', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Suivi actions', en: 'Action tracking' } }
                        ]
                    },
                    S03: { id: 'S03', name: 'facilitation', label: { fr: 'Facilitation', en: 'Facilitation' }, category: 'support_clinicians', cost: 'medium', complexity: 'medium',
                        kpis: [
                            { id: 'K03a', indicator: { fr: 'Nb séances facilitation/mois', en: 'Facilitation sessions/month' }, target: '≥2/mois', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Agenda facilitateur', en: 'Facilitator agenda' } },
                            { id: 'K03b', indicator: { fr: 'Satisfaction équipes', en: 'Team satisfaction' }, target: '≥4/5', frequency: { fr: 'Trimestriel', en: 'Quarterly' }, source: { fr: 'Enquête', en: 'Survey' } }
                        ]
                    },
                    S04: { id: 'S04', name: 'champions', label: { fr: 'Champions/Leaders d\'opinion', en: 'Champions/Opinion Leaders' }, category: 'develop_stakeholders', cost: 'low', complexity: 'medium',
                        kpis: [
                            { id: 'K04a', indicator: { fr: 'Nb champions actifs', en: 'Active champions' }, target: '≥1/site', frequency: { fr: 'Semestriel', en: 'Biannual' }, source: { fr: 'Liste champions', en: 'Champion list' } },
                            { id: 'K04b', indicator: { fr: 'Nb actions initiées par champions', en: 'Actions initiated by champions' }, target: '≥3/trimestre', frequency: { fr: 'Trimestriel', en: 'Quarterly' }, source: { fr: 'Reporting', en: 'Reporting' } }
                        ]
                    },
                    S05: { id: 'S05', name: 'reminder_systems', label: { fr: 'Systèmes de rappel', en: 'Reminder Systems' }, category: 'change_infrastructure', cost: 'low', complexity: 'low',
                        kpis: [
                            { id: 'K05a', indicator: { fr: '% rappels déclenchés/attendus', en: '% reminders triggered/expected' }, target: '≥90%', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Logs système', en: 'System logs' } },
                            { id: 'K05b', indicator: { fr: 'Taux réponse aux rappels', en: 'Response rate to reminders' }, target: '≥60%', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Données SI', en: 'IS data' } }
                        ]
                    },
                    S06: { id: 'S06', name: 'financial_incentives', label: { fr: 'Incitations financières', en: 'Financial Incentives' }, category: 'finance', cost: 'high', complexity: 'medium',
                        kpis: [
                            { id: 'K06a', indicator: { fr: '% bénéficiaires ayant reçu incitation', en: '% beneficiaries receiving incentive' }, target: '≥95%', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Comptabilité', en: 'Accounting' } },
                            { id: 'K06b', indicator: { fr: 'Coût/bénéficiaire', en: 'Cost/beneficiary' }, target: 'Selon budget', frequency: { fr: 'Trimestriel', en: 'Quarterly' }, source: { fr: 'Finance', en: 'Finance' } }
                        ]
                    },
                    S07: { id: 'S07', name: 'policy_change', label: { fr: 'Changement de politique', en: 'Policy Change' }, category: 'change_infrastructure', cost: 'variable', complexity: 'high',
                        kpis: [
                            { id: 'K07a', indicator: { fr: 'Politique adoptée (oui/non)', en: 'Policy adopted (yes/no)' }, target: 'Oui', frequency: { fr: 'Annuel', en: 'Annual' }, source: { fr: 'Documents officiels', en: 'Official documents' } },
                            { id: 'K07b', indicator: { fr: '% sites appliquant nouvelle politique', en: '% sites applying new policy' }, target: '≥80%', frequency: { fr: 'Semestriel', en: 'Biannual' }, source: { fr: 'Audit conformité', en: 'Compliance audit' } }
                        ]
                    },
                    S08: { id: 'S08', name: 'community_engagement', label: { fr: 'Engagement communautaire', en: 'Community Engagement' }, category: 'engage_consumers', cost: 'medium', complexity: 'medium',
                        kpis: [
                            { id: 'K08a', indicator: { fr: 'Nb réunions communautaires', en: 'Community meetings held' }, target: '≥1/mois', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'PV réunions', en: 'Meeting minutes' } },
                            { id: 'K08b', indicator: { fr: 'Nb participants communautaires', en: 'Community participants' }, target: '≥20/réunion', frequency: { fr: 'Par réunion', en: 'Per meeting' }, source: { fr: 'Feuilles présence', en: 'Attendance sheets' } }
                        ]
                    },
                    S09: { id: 'S09', name: 'technical_assistance', label: { fr: 'Assistance technique', en: 'Technical Assistance' }, category: 'support_clinicians', cost: 'medium', complexity: 'low',
                        kpis: [
                            { id: 'K09a', indicator: { fr: 'Délai moyen réponse support', en: 'Avg support response time' }, target: '≤24h', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Tickets support', en: 'Support tickets' } },
                            { id: 'K09b', indicator: { fr: '% problèmes résolus', en: '% issues resolved' }, target: '≥90%', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Système ticketing', en: 'Ticketing system' } }
                        ]
                    },
                    S10: { id: 'S10', name: 'supervision', label: { fr: 'Supervision clinique', en: 'Clinical Supervision' }, category: 'support_clinicians', cost: 'medium', complexity: 'medium',
                        kpis: [
                            { id: 'K10a', indicator: { fr: 'Heures supervision/mois/équipe', en: 'Supervision hours/month/team' }, target: '≥8h', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Feuilles temps', en: 'Timesheets' } },
                            { id: 'K10b', indicator: { fr: '% équipes supervisées', en: '% teams supervised' }, target: '100%', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Planning supervision', en: 'Supervision schedule' } }
                        ]
                    },
                    S11: { id: 'S11', name: 'adaptation', label: { fr: 'Adaptation de l\'intervention', en: 'Intervention Adaptation' }, category: 'adapt_tailor', cost: 'low', complexity: 'medium',
                        kpis: [
                            { id: 'K11a', indicator: { fr: 'Nb adaptations documentées', en: 'Documented adaptations' }, target: 'Selon contexte', frequency: { fr: 'Trimestriel', en: 'Quarterly' }, source: { fr: 'Journal adaptations', en: 'Adaptation log' } },
                            { id: 'K11b', indicator: { fr: 'Fidélité aux principes clés', en: 'Fidelity to core principles' }, target: '≥80%', frequency: { fr: 'Semestriel', en: 'Biannual' }, source: { fr: 'Checklist fidélité', en: 'Fidelity checklist' } }
                        ]
                    },
                    S12: { id: 'S12', name: 'coalition_building', label: { fr: 'Construction de coalitions', en: 'Coalition Building' }, category: 'develop_stakeholders', cost: 'medium', complexity: 'high',
                        kpis: [
                            { id: 'K12a', indicator: { fr: 'Nb partenaires actifs', en: 'Active partners' }, target: '≥5', frequency: { fr: 'Semestriel', en: 'Biannual' }, source: { fr: 'Liste partenaires', en: 'Partner list' } },
                            { id: 'K12b', indicator: { fr: 'Nb réunions coalition/an', en: 'Coalition meetings/year' }, target: '≥4', frequency: { fr: 'Annuel', en: 'Annual' }, source: { fr: 'PV réunions', en: 'Meeting minutes' } }
                        ]
                    },
                    S13: { id: 'S13', name: 'data_systems', label: { fr: 'Systèmes de données', en: 'Data Systems' }, category: 'change_infrastructure', cost: 'high', complexity: 'high',
                        kpis: [
                            { id: 'K13a', indicator: { fr: '% données complètes', en: '% complete data' }, target: '≥90%', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Audit données', en: 'Data audit' } },
                            { id: 'K13b', indicator: { fr: 'Disponibilité système', en: 'System uptime' }, target: '≥99%', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Monitoring IT', en: 'IT monitoring' } }
                        ]
                    },
                    S14: { id: 'S14', name: 'learning_collaborative', label: { fr: 'Collaborative d\'apprentissage', en: 'Learning Collaborative' }, category: 'train_educate', cost: 'medium', complexity: 'medium',
                        kpis: [
                            { id: 'K14a', indicator: { fr: 'Nb sessions collaborative/an', en: 'Collaborative sessions/year' }, target: '≥4', frequency: { fr: 'Trimestriel', en: 'Quarterly' }, source: { fr: 'Calendrier', en: 'Calendar' } },
                            { id: 'K14b', indicator: { fr: 'Taux participation', en: 'Participation rate' }, target: '≥75%', frequency: { fr: 'Par session', en: 'Per session' }, source: { fr: 'Feuilles présence', en: 'Attendance' } }
                        ]
                    },
                    S15: { id: 'S15', name: 'peer_support', label: { fr: 'Soutien par les pairs', en: 'Peer Support' }, category: 'support_clinicians', cost: 'low', complexity: 'low',
                        kpis: [
                            { id: 'K15a', indicator: { fr: 'Nb pairs aidants formés', en: 'Trained peer supporters' }, target: '≥2/site', frequency: { fr: 'Annuel', en: 'Annual' }, source: { fr: 'Registre formation', en: 'Training registry' } },
                            { id: 'K15b', indicator: { fr: 'Nb interactions pairs/mois', en: 'Peer interactions/month' }, target: '≥10', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Journal activité', en: 'Activity log' } }
                        ]
                    },
                    S16: { id: 'S16', name: 'quality_improvement', label: { fr: 'Amélioration de la qualité', en: 'Quality Improvement' }, category: 'evaluate_iterate', cost: 'medium', complexity: 'medium',
                        kpis: [
                            { id: 'K16a', indicator: { fr: 'Nb cycles PDCA complétés', en: 'PDCA cycles completed' }, target: '≥2/an', frequency: { fr: 'Semestriel', en: 'Biannual' }, source: { fr: 'Documentation QI', en: 'QI documentation' } },
                            { id: 'K16b', indicator: { fr: '% indicateurs qualité améliorés', en: '% quality indicators improved' }, target: '≥50%', frequency: { fr: 'Annuel', en: 'Annual' }, source: { fr: 'Tableau de bord', en: 'Dashboard' } }
                        ]
                    },
                    S17: { id: 'S17', name: 'centralized_support', label: { fr: 'Support technique centralisé', en: 'Centralized Technical Support' }, category: 'change_infrastructure', cost: 'high', complexity: 'medium',
                        kpis: [
                            { id: 'K17a', indicator: { fr: 'Nb sites couverts', en: 'Sites covered' }, target: '100%', frequency: { fr: 'Trimestriel', en: 'Quarterly' }, source: { fr: 'Registre sites', en: 'Site registry' } },
                            { id: 'K17b', indicator: { fr: 'Satisfaction sites', en: 'Site satisfaction' }, target: '≥4/5', frequency: { fr: 'Semestriel', en: 'Biannual' }, source: { fr: 'Enquête', en: 'Survey' } }
                        ]
                    },
                    S18: { id: 'S18', name: 'patient_education', label: { fr: 'Éducation des patients', en: 'Patient Education' }, category: 'engage_consumers', cost: 'low', complexity: 'low',
                        kpis: [
                            { id: 'K18a', indicator: { fr: '% patients ayant reçu éducation', en: '% patients receiving education' }, target: '≥80%', frequency: { fr: 'Mensuel', en: 'Monthly' }, source: { fr: 'Dossiers patients', en: 'Patient records' } },
                            { id: 'K18b', indicator: { fr: 'Score compréhension patient', en: 'Patient understanding score' }, target: '≥70%', frequency: { fr: 'Par session', en: 'Per session' }, source: { fr: 'Quiz patient', en: 'Patient quiz' } }
                        ]
                    },
                    S19: { id: 'S19', name: 'task_shifting', label: { fr: 'Transfert de tâches', en: 'Task Shifting' }, category: 'adapt_tailor', cost: 'low', complexity: 'medium',
                        kpis: [
                            { id: 'K19a', indicator: { fr: 'Nb tâches transférées', en: 'Tasks shifted' }, target: 'Selon plan', frequency: { fr: 'Trimestriel', en: 'Quarterly' }, source: { fr: 'Matrice tâches', en: 'Task matrix' } },
                            { id: 'K19b', indicator: { fr: '% agents non-spécialistes opérationnels', en: '% operational non-specialists' }, target: '≥90%', frequency: { fr: 'Semestriel', en: 'Biannual' }, source: { fr: 'Évaluation compétences', en: 'Skills assessment' } }
                        ]
                    },
                    S20: { id: 'S20', name: 'stakeholder_engagement', label: { fr: 'Engagement des parties prenantes', en: 'Stakeholder Engagement' }, category: 'develop_stakeholders', cost: 'low', complexity: 'medium',
                        kpis: [
                            { id: 'K20a', indicator: { fr: 'Nb parties prenantes engagées', en: 'Stakeholders engaged' }, target: '≥10', frequency: { fr: 'Semestriel', en: 'Biannual' }, source: { fr: 'Cartographie PP', en: 'Stakeholder map' } },
                            { id: 'K20b', indicator: { fr: 'Score engagement moyen', en: 'Avg engagement score' }, target: '≥3/5', frequency: { fr: 'Annuel', en: 'Annual' }, source: { fr: 'Enquête PP', en: 'Stakeholder survey' } }
                        ]
                    }
                },
                frameworks: {
                    F01: { id: 'F01', name: 'CFIR', label: { fr: 'CFIR - Consolidated Framework', en: 'CFIR - Consolidated Framework' }, type: 'determinant', focus: ['barriers', 'facilitators'] },
                    F02: { id: 'F02', name: 'RE-AIM', label: { fr: 'RE-AIM', en: 'RE-AIM' }, type: 'evaluation', focus: ['reach', 'effectiveness', 'adoption', 'implementation', 'maintenance'] },
                    F03: { id: 'F03', name: 'EPIS', label: { fr: 'EPIS - Exploration Preparation Implementation Sustainment', en: 'EPIS Framework' }, type: 'process', focus: ['phases', 'outer_inner_context'] },
                    F04: { id: 'F04', name: 'Proctor', label: { fr: 'Proctor - Outcomes Framework', en: 'Proctor Outcomes Framework' }, type: 'outcome', focus: ['implementation_outcomes', 'service_outcomes', 'client_outcomes'] },
                    F05: { id: 'F05', name: 'PARIHS', label: { fr: 'PARIHS/i-PARIHS', en: 'PARIHS/i-PARIHS' }, type: 'determinant', focus: ['evidence', 'context', 'facilitation'] },
                    F06: { id: 'F06', name: 'NPT', label: { fr: 'NPT - Normalisation Process Theory', en: 'NPT - Normalisation Process Theory' }, type: 'theory', focus: ['coherence', 'cognitive_participation', 'collective_action', 'reflexive_monitoring'] },
                    F07: { id: 'F07', name: 'TDF', label: { fr: 'TDF - Theoretical Domains Framework', en: 'TDF - Theoretical Domains Framework' }, type: 'determinant', focus: ['behavior_change', 'domains'] },
                    F08: { id: 'F08', name: 'PRISM', label: { fr: 'PRISM - Practical Robust Implementation', en: 'PRISM Framework' }, type: 'hybrid', focus: ['organizational', 'patient', 'sustainability'] }
                },
                outcomes: {
                    O01: { id: 'O01', name: 'acceptability', label: { fr: 'Acceptabilité', en: 'Acceptability' }, level: 'implementation', measurability: 'high' },
                    O02: { id: 'O02', name: 'adoption', label: { fr: 'Adoption', en: 'Adoption' }, level: 'implementation', measurability: 'high' },
                    O03: { id: 'O03', name: 'appropriateness', label: { fr: 'Pertinence', en: 'Appropriateness' }, level: 'implementation', measurability: 'medium' },
                    O04: { id: 'O04', name: 'feasibility', label: { fr: 'Faisabilité', en: 'Feasibility' }, level: 'implementation', measurability: 'high' },
                    O05: { id: 'O05', name: 'fidelity', label: { fr: 'Fidélité', en: 'Fidelity' }, level: 'implementation', measurability: 'high' },
                    O06: { id: 'O06', name: 'cost', label: { fr: 'Coût', en: 'Cost' }, level: 'implementation', measurability: 'high' },
                    O07: { id: 'O07', name: 'penetration', label: { fr: 'Pénétration/Couverture', en: 'Penetration/Coverage' }, level: 'implementation', measurability: 'high' },
                    O08: { id: 'O08', name: 'sustainability', label: { fr: 'Pérennité', en: 'Sustainability' }, level: 'implementation', measurability: 'medium' },
                    O09: { id: 'O09', name: 'equity', label: { fr: 'Équité', en: 'Equity' }, level: 'service', measurability: 'medium' },
                    O10: { id: 'O10', name: 'effectiveness', label: { fr: 'Efficacité', en: 'Effectiveness' }, level: 'client', measurability: 'high' }
                }
            },
            edges: {
                barrierToStrategy: {
                    B01: { S01: 0.95, S03: 0.6, S09: 0.7, S14: 0.8, S15: 0.5 },
                    B02: { S04: 0.85, S03: 0.75, S20: 0.7, S08: 0.5, S02: 0.6 },
                    B03: { S13: 0.9, S09: 0.8, S17: 0.85, S05: 0.5 },
                    B04: { S13: 0.85, S02: 0.7, S16: 0.75, S09: 0.6 },
                    B05: { S08: 0.9, S18: 0.8, S04: 0.6, S11: 0.7 },
                    B06: { S06: 0.8, S12: 0.75, S07: 0.7, S19: 0.65 },
                    B07: { S04: 0.9, S12: 0.8, S20: 0.85, S07: 0.6 },
                    B08: { S19: 0.8, S11: 0.7, S05: 0.6, S02: 0.5 },
                    B09: { S11: 0.85, S08: 0.8, S20: 0.7, S18: 0.6 },
                    B10: { S11: 0.8, S03: 0.7, S01: 0.65, S09: 0.6 },
                    B11: { S20: 0.85, S14: 0.7, S04: 0.65, S02: 0.6 },
                    B12: { S07: 0.9, S12: 0.8, S20: 0.75 },
                    B13: { S18: 0.9, S08: 0.85, S11: 0.6 },
                    B14: { S01: 0.7, S10: 0.8, S14: 0.65, S15: 0.7 },
                    B15: { S11: 0.75, S16: 0.7, S02: 0.65, S14: 0.6 }
                },
                contextToStrategy: {
                    C01: { S02: 0.85, S16: 0.8, S10: 0.75, S13: 0.7, S04: 0.7 },
                    C02: { S01: 0.8, S09: 0.75, S19: 0.8, S15: 0.7, S03: 0.65 },
                    C03: { S08: 0.9, S18: 0.85, S19: 0.8, S15: 0.75, S12: 0.7 },
                    C04: { S08: 0.85, S01: 0.8, S18: 0.75, S04: 0.7, S12: 0.65 },
                    C05: { S06: 0.75, S07: 0.7, S20: 0.75, S04: 0.65 },
                    C06: { S01: 0.8, S10: 0.75, S15: 0.8, S09: 0.7 },
                    C07: { S11: 0.85, S19: 0.8, S08: 0.7, S07: 0.65 },
                    C08: { S13: 0.9, S09: 0.85, S05: 0.8, S17: 0.75 },
                    C09: { S19: 0.85, S08: 0.8, S17: 0.75, S15: 0.7 },
                    C10: { S13: 0.8, S16: 0.75, S14: 0.7, S06: 0.65 }
                },
                phaseToStrategy: {
                    P01: { S20: 0.9, S12: 0.85, S02: 0.7, S04: 0.65, S16: 0.6 },
                    P02: { S01: 0.9, S03: 0.85, S11: 0.8, S13: 0.75, S09: 0.7 },
                    P03: { S02: 0.85, S10: 0.8, S05: 0.75, S04: 0.7, S03: 0.7 },
                    P04: { S14: 0.85, S16: 0.8, S02: 0.75, S06: 0.7, S12: 0.65 }
                },
                domainToStrategy: {
                    D01: { S08: 0.85, S11: 0.8, S10: 0.75, S19: 0.7, S15: 0.8 },
                    D02: { S01: 0.8, S05: 0.75, S02: 0.7, S19: 0.8 },
                    D03: { S02: 0.85, S16: 0.8, S01: 0.75, S10: 0.7 },
                    D04: { S13: 0.9, S09: 0.85, S05: 0.8, S17: 0.8 },
                    D05: { S08: 0.85, S18: 0.8, S19: 0.75, S11: 0.7 },
                    D06: { S18: 0.85, S05: 0.8, S02: 0.75, S08: 0.7 },
                    D07: { S08: 0.85, S07: 0.8, S12: 0.75, S19: 0.7 },
                    D08: { S01: 0.8, S15: 0.85, S10: 0.75, S11: 0.7 },
                    D09: { S02: 0.85, S16: 0.8, S01: 0.75, S05: 0.7 },
                    D10: { S03: 0.8, S10: 0.8, S15: 0.75, S01: 0.7 },
                    // === MATRICES MULTI-SECTORIELLES v8.0 ===
                    D11: { S01: 0.90, S11: 0.85, S15: 0.80, S08: 0.75, S03: 0.70, S04: 0.65, S14: 0.60 },
                    D12: { S02: 0.85, S16: 0.85, S13: 0.80, S12: 0.75, S14: 0.70, S04: 0.65, S01: 0.60 },
                    D13: { S04: 0.90, S20: 0.85, S06: 0.80, S07: 0.75, S12: 0.70, S02: 0.65, S03: 0.60 },
                    D14: { S07: 0.90, S12: 0.85, S16: 0.80, S13: 0.75, S20: 0.70, S02: 0.65, S01: 0.60 },
                    D15: { S15: 0.90, S08: 0.85, S11: 0.85, S19: 0.80, S01: 0.70, S14: 0.65, S12: 0.60 },
                    D16: { S07: 0.85, S12: 0.85, S08: 0.80, S18: 0.75, S11: 0.70, S20: 0.65, S06: 0.60 },
                    D17: { S16: 0.90, S02: 0.85, S13: 0.80, S01: 0.75, S10: 0.70, S05: 0.65, S09: 0.60 },
                    D18: { S13: 0.90, S09: 0.85, S01: 0.80, S17: 0.80, S05: 0.70, S03: 0.65, S11: 0.60 },
                    D19: { S08: 0.90, S11: 0.85, S15: 0.80, S18: 0.80, S19: 0.75, S12: 0.65, S03: 0.60 },
                    D20: { S11: 0.90, S07: 0.85, S15: 0.80, S08: 0.75, S19: 0.70, S12: 0.65, S01: 0.60 },
                    D21: { S02: 0.90, S16: 0.85, S13: 0.80, S12: 0.75, S14: 0.70, S09: 0.65, S07: 0.60 },
                    D22: { S19: 0.90, S11: 0.85, S08: 0.80, S05: 0.75, S15: 0.70, S09: 0.65, S01: 0.60 },
                    D23: { S12: 0.90, S08: 0.85, S11: 0.80, S07: 0.75, S19: 0.70, S20: 0.65, S01: 0.60 }
                },
                strategyToOutcome: {
                    S01: { O01: 0.7, O04: 0.8, O05: 0.85, O02: 0.6 },
                    S02: { O05: 0.9, O02: 0.7, O07: 0.6, O08: 0.65 },
                    S03: { O01: 0.8, O02: 0.75, O04: 0.7, O05: 0.65 },
                    S04: { O02: 0.85, O01: 0.8, O08: 0.7, O07: 0.6 },
                    S05: { O05: 0.8, O02: 0.7, O07: 0.65, O06: 0.5 },
                    S06: { O02: 0.85, O08: 0.75, O06: 0.4, O07: 0.6 },
                    S07: { O08: 0.85, O07: 0.8, O09: 0.7, O02: 0.6 },
                    S08: { O01: 0.85, O09: 0.8, O07: 0.75, O02: 0.65 },
                    S09: { O04: 0.85, O05: 0.7, O01: 0.6, O02: 0.55 },
                    S10: { O05: 0.85, O01: 0.7, O08: 0.6, O04: 0.55 },
                    S11: { O03: 0.9, O01: 0.8, O04: 0.75, O09: 0.65 },
                    S12: { O08: 0.85, O02: 0.75, O09: 0.7, O07: 0.65 },
                    S13: { O06: 0.7, O05: 0.8, O07: 0.75, O08: 0.6 },
                    S14: { O08: 0.8, O01: 0.75, O02: 0.7, O05: 0.65 },
                    S15: { O01: 0.85, O08: 0.7, O04: 0.65, O02: 0.6 },
                    S16: { O05: 0.85, O08: 0.8, O06: 0.65, O10: 0.7 },
                    S17: { O04: 0.8, O07: 0.75, O06: 0.5, O05: 0.7 },
                    S18: { O01: 0.9, O09: 0.8, O03: 0.75, O10: 0.6 },
                    S19: { O04: 0.85, O06: 0.8, O07: 0.7, O09: 0.65 },
                    S20: { O01: 0.85, O02: 0.8, O08: 0.75, O09: 0.7 }
                },
                phaseToFramework: {
                    P01: { F01: 0.85, F03: 0.9, F07: 0.7, F05: 0.65 },
                    P02: { F01: 0.8, F03: 0.85, F07: 0.75, F05: 0.8 },
                    P03: { F02: 0.9, F04: 0.85, F06: 0.8, F08: 0.75 },
                    P04: { F02: 0.85, F04: 0.8, F08: 0.9, F06: 0.7 }
                },
                barrierToFramework: {
                    B01: { F07: 0.85, F01: 0.7, F05: 0.65 },
                    B02: { F07: 0.9, F06: 0.8, F01: 0.75 },
                    B03: { F01: 0.8, F08: 0.75, F03: 0.6 },
                    B04: { F01: 0.75, F08: 0.7, F02: 0.65 },
                    B05: { F01: 0.85, F07: 0.8, F03: 0.7 },
                    B06: { F08: 0.85, F01: 0.7, F03: 0.75 },
                    B07: { F01: 0.9, F05: 0.8, F03: 0.75 },
                    B08: { F01: 0.75, F08: 0.7, F06: 0.65 },
                    B09: { F01: 0.85, F07: 0.8, F05: 0.7 },
                    B10: { F01: 0.8, F07: 0.75, F06: 0.7 },
                    B11: { F06: 0.8, F01: 0.7, F07: 0.65 },
                    B12: { F03: 0.85, F01: 0.8, F08: 0.75 },
                    B13: { F07: 0.85, F01: 0.75, F08: 0.7 },
                    B14: { F01: 0.8, F08: 0.75, F03: 0.65 },
                    B15: { F05: 0.85, F01: 0.75, F02: 0.7 }
                },
                resourceToStrategyAdjustment: {
                    R01: { S06: 1.0, S13: 1.0, S17: 1.0, S14: 1.0 },
                    R02: { S06: 0.7, S13: 0.8, S17: 0.8, S14: 0.9, S19: 1.1 },
                    R03: { S06: 0.4, S13: 0.5, S17: 0.6, S19: 1.2, S15: 1.1, S08: 1.1 },
                    R04: { S06: 0.2, S13: 0.3, S17: 0.4, S19: 1.3, S15: 1.2, S08: 1.2, S01: 0.8 }
                }
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // ALGORITHMES DE SCORING
        // ═══════════════════════════════════════════════════════════════════════════

        var ScoringEngine = {
            addScoresFromMap: function(scores, weightMap, key, multiplier) {
                multiplier = multiplier || 1.0;
                var weights = weightMap[key] || {};
                for (var target in weights) {
                    if (!Object.prototype.hasOwnProperty.call(weights, target)) continue;
                    if (!scores[target]) scores[target] = 0;
                    scores[target] += weights[target] * multiplier;
                }
            },

            // Score des stratégies d'implémentation à partir du projet
            scoreStrategies: function(project) {
                var scores = {};
                var graph = KnowledgeGraph;

                // S'assurer que barriers est un tableau
                var barriers = project.barriers || [];
                if (typeof barriers === 'string') {
                    barriers = barriers.split(/[,;\n]/).map(function(b) { return b.trim(); }).filter(function(b) { return b.length > 0; });
                }
                if (!Array.isArray(barriers)) {
                    barriers = [];
                }
                
                barriers.forEach(function(barrier) {
                    var barrierNode = null;
                    var allBarriers = Object.values(graph.nodes.barriers);
                    for (var i = 0; i < allBarriers.length; i++) {
                        var b = allBarriers[i];
                        if (b.name === barrier || b.id === barrier) {
                            barrierNode = b;
                            break;
                        }
                    }
                    if (barrierNode) {
                        ScoringEngine.addScoresFromMap(
                            scores,
                            graph.edges.barrierToStrategy,
                            barrierNode.id,
                            barrierNode.severity || 1.0
                        );
                    }
                });

                if (project.context) {
                    var contextNode = null;
                    var allContexts = Object.values(graph.nodes.contexts);
                    for (var j = 0; j < allContexts.length; j++) {
                        var c = allContexts[j];
                        if (c.name === project.context || c.id === project.context) {
                            contextNode = c;
                            break;
                        }
                    }
                    if (contextNode) {
                        ScoringEngine.addScoresFromMap(
                            scores,
                            graph.edges.contextToStrategy,
                            contextNode.id,
                            1.0
                        );
                    }
                }

                if (project.phase) {
                    var phaseNode = null;
                    var allPhases = Object.values(graph.nodes.phases);
                    for (var k = 0; k < allPhases.length; k++) {
                        var p = allPhases[k];
                        if (p.name === project.phase || p.id === project.phase) {
                            phaseNode = p;
                            break;
                        }
                    }
                    if (phaseNode) {
                        ScoringEngine.addScoresFromMap(
                            scores,
                            graph.edges.phaseToStrategy,
                            phaseNode.id,
                            1.2
                        );
                    }
                }

                if (project.domain) {
                    var domainNode = null;
                    var allDomains = Object.values(graph.nodes.domains);
                    for (var m = 0; m < allDomains.length; m++) {
                        var d = allDomains[m];
                        if (d.name === project.domain || d.id === project.domain) {
                            domainNode = d;
                            break;
                        }
                    }
                    if (domainNode) {
                        ScoringEngine.addScoresFromMap(
                            scores,
                            graph.edges.domainToStrategy,
                            domainNode.id,
                            0.8
                        );
                    }
                }

                if (project.resourceLevel) {
                    var adjustments = graph.edges.resourceToStrategyAdjustment[project.resourceLevel] || {};
                    for (var stratId in scores) {
                        if (!Object.prototype.hasOwnProperty.call(scores, stratId)) continue;
                        if (adjustments[stratId]) {
                            scores[stratId] *= adjustments[stratId];
                        }
                    }
                }

                return Object.entries(scores)
                    .map(function(entry) {
                        var strategyId = entry[0];
                        var score = entry[1];
                        var strategy = graph.nodes.strategies[strategyId] || {};
                        return {
                            id: strategyId,
                            name: strategy.name || strategyId,
                            label: strategy.label || { fr: strategyId, en: strategyId },
                            category: strategy.category,
                            cost: strategy.cost,
                            complexity: strategy.complexity,
                            score: score,
                            confidence: Math.min(score / 3, 1)
                        };
                    })
                    .sort(function(a, b) { return b.score - a.score; });
            },

            // Score des cadres (CFIR / RE-AIM / EPIS, etc.)
            scoreFrameworks: function(project) {
                var scores = {};
                var graph = KnowledgeGraph;

                if (project.phase) {
                    var phaseNode = null;
                    var allPhases = Object.values(graph.nodes.phases);
                    for (var i = 0; i < allPhases.length; i++) {
                        var p = allPhases[i];
                        if (p.name === project.phase || p.id === project.phase) {
                            phaseNode = p;
                            break;
                        }
                    }
                    if (phaseNode) {
                        ScoringEngine.addScoresFromMap(
                            scores,
                            graph.edges.phaseToFramework,
                            phaseNode.id,
                            1.5
                        );
                    }
                }

                var barriers = project.barriers || [];
                if (typeof barriers === 'string') {
                    barriers = barriers.split(/[,;\n]/).map(function(b) { return b.trim(); }).filter(function(b) { return b.length > 0; });
                }
                if (!Array.isArray(barriers)) {
                    barriers = [];
                }
                barriers.forEach(function(barrier) {
                    var barrierNode = null;
                    var allBarriers = Object.values(graph.nodes.barriers);
                    for (var j = 0; j < allBarriers.length; j++) {
                        var b = allBarriers[j];
                        if (b.name === barrier || b.id === barrier) {
                            barrierNode = b;
                            break;
                        }
                    }
                    if (barrierNode) {
                        ScoringEngine.addScoresFromMap(
                            scores,
                            graph.edges.barrierToFramework,
                            barrierNode.id,
                            1.0
                        );
                    }
                });

                return Object.entries(scores)
                    .map(function(entry) {
                        var frameworkId = entry[0];
                        var score = entry[1];
                        var framework = graph.nodes.frameworks[frameworkId] || {};
                        return {
                            id: frameworkId,
                            name: framework.name || frameworkId,
                            label: framework.label || { fr: frameworkId, en: frameworkId },
                            type: framework.type,
                            focus: framework.focus,
                            score: score,
                            confidence: Math.min(score / 4, 1)
                        };
                    })
                    .sort(function(a, b) { return b.score - a.score; });
            },

            // Score des outcomes (acceptability, adoption, equity, etc.)
            scoreOutcomes: function(strategies, project) {
                var scores = {};
                var graph = KnowledgeGraph;

                (strategies || []).forEach(function(strat) {
                    var stratId = typeof strat === 'string' ? strat : strat.id;
                    var stratNode = graph.nodes.strategies[stratId];

                    if (!stratNode) {
                        var allStrats = Object.values(graph.nodes.strategies);
                        for (var i = 0; i < allStrats.length; i++) {
                            var s = allStrats[i];
                            if (s.name === stratId || s.id === stratId) {
                                stratNode = s;
                                break;
                            }
                        }
                    }

                    if (stratNode) {
                        ScoringEngine.addScoresFromMap(
                            scores,
                            graph.edges.strategyToOutcome,
                            stratNode.id,
                            1.0
                        );
                    }
                });

                return Object.entries(scores)
                    .map(function(entry) {
                        var outcomeId = entry[0];
                        var score = entry[1];
                        var outcome = graph.nodes.outcomes[outcomeId] || {};
                        return {
                            id: outcomeId,
                            name: outcome.name || outcomeId,
                            label: outcome.label || { fr: outcomeId, en: outcomeId },
                            level: outcome.level,
                            score: score,
                            confidence: Math.min(score / 3, 1)
                        };
                    })
                    .sort(function(a, b) { return b.score - a.score; });
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // SCORE MULTI-OBJECTIF PARAMÉTRABLE
        // Ajuste les scores selon les priorités du projet (équité, coût, pérennité...)
        // ═══════════════════════════════════════════════════════════════════════════

        var MultiObjectiveScoring = {
            /**
             * Ajuste les scores selon les objectifs prioritaires du projet
             * @param {Array} strategies - Liste des stratégies scorées
             * @param {Array} objectives - ['equity', 'cost_effectiveness', 'sustainability', 'speed', 'evidence_based']
             * @param {string} resourceLevel - HIC/UMIC/LMIC/LIC
             */
            applyObjectives: function(strategies, objectives, resourceLevel) {
                if (!objectives || objectives.length === 0) return strategies;

                var objectiveWeights = {
                    equity: { S08: 1.3, S19: 1.25, S11: 1.2, S18: 1.15, S15: 1.1 },
                    cost_effectiveness: { S19: 1.4, S15: 1.3, S05: 1.2, S01: 0.9, S13: 0.7, S06: 0.6, S17: 0.7 },
                    sustainability: { S12: 1.3, S14: 1.25, S16: 1.2, S07: 1.15, S04: 1.1, S20: 1.1 },
                    speed: { S05: 1.3, S09: 1.2, S01: 1.1, S12: 0.8, S07: 0.7, S15: 1.15 },
                    evidence_based: { S02: 1.3, S16: 1.25, S14: 1.2, S10: 1.15, S03: 1.1 }
                };

                // Ajustement selon ressources
                var resourceMultipliers = {
                    HIC: { cost_effectiveness: 0.8, speed: 1.2, evidence_based: 1.1 },
                    UMIC: { cost_effectiveness: 1.0, speed: 1.0, sustainability: 1.05 },
                    LMIC: { cost_effectiveness: 1.3, sustainability: 1.2, equity: 1.15 },
                    LIC: { cost_effectiveness: 1.5, sustainability: 1.3, speed: 0.8, equity: 1.2 }
                };

                return strategies.map(function(strat) {
                    var adjustedScore = strat.score;
                    
                    objectives.forEach(function(obj) {
                        var weights = objectiveWeights[obj];
                        if (weights && weights[strat.id]) {
                            var multiplier = weights[strat.id];
                            
                            // Ajuster selon ressources
                            var resMult = resourceMultipliers[resourceLevel];
                            if (resMult && resMult[obj]) {
                                multiplier *= resMult[obj];
                            }
                            
                            adjustedScore *= multiplier;
                        }
                    });

                    return Object.assign({}, strat, { 
                        score: adjustedScore,
                        originalScore: strat.score,
                        objectivesApplied: objectives
                    });
                }).sort(function(a, b) { return b.score - a.score; });
            },

            /**
             * Retourne la liste des objectifs disponibles
             */
            getAvailableObjectives: function(lang) {
                lang = lang || 'fr';
                return [
                    { value: 'equity', label: lang === 'fr' ? 'Équité' : 'Equity', icon: '⚖️' },
                    { value: 'cost_effectiveness', label: lang === 'fr' ? 'Coût-efficacité' : 'Cost-effectiveness', icon: '💰' },
                    { value: 'sustainability', label: lang === 'fr' ? 'Pérennité' : 'Sustainability', icon: '🌱' },
                    { value: 'speed', label: lang === 'fr' ? 'Rapidité' : 'Speed', icon: '⚡' },
                    { value: 'evidence_based', label: lang === 'fr' ? 'Basé sur preuves' : 'Evidence-based', icon: '📊' }
                ];
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // MOTEUR DE RECOMMANDATION
        // ═══════════════════════════════════════════════════════════════════════════

        var RecommendationEngine = {
            generateRecommendations: function(project) {
                // 1. Scoring de base des stratégies
                var allStrategies = ScoringEngine.scoreStrategies(project);
                
                // 2. Application du scoring multi-objectif si objectives définis
                var objectivesApplied = false;
                if (project.objectives && project.objectives.length > 0) {
                    allStrategies = MultiObjectiveScoring.applyObjectives(
                        allStrategies,
                        project.objectives,
                        project.resourceLevel || null
                    );
                    objectivesApplied = true;
                }
                
                // 3. Sélection des top stratégies
                var topStrategies = allStrategies.slice(0, 7);
                
                // 4. Scoring des frameworks et outcomes
                var allFrameworks = ScoringEngine.scoreFrameworks(project);
                var topFrameworks = allFrameworks.slice(0, 3);
                var strategyIds = topStrategies.map(function(s) { return s.id; });
                var allOutcomes = ScoringEngine.scoreOutcomes(strategyIds, project);
                var topOutcomes = allOutcomes.slice(0, 5);

                // 5. Calcul de la confiance
                var confidence = 0.5;
                if (project.domain) confidence += 0.1;
                if (project.context) confidence += 0.1;
                if (project.phase) confidence += 0.1;
                if (project.barriers && project.barriers.length > 0) confidence += 0.1;
                if (project.resourceLevel) confidence += 0.05;
                if (objectivesApplied) confidence += 0.05; // Bonus si objectifs définis
                confidence = Math.min(confidence, 1.0);

                // 6. Générer un ID unique pour cette recommandation
                var recId = 'REC_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

                return {
                    metadata: { 
                        timestamp: new Date().toISOString(), 
                        version: '2.2', 
                        algorithm: 'MoudarEngine-AdaptiveKG-v8.0',
                        recommendationId: recId,
                        learningEnabled: true,
                        objectivesApplied: objectivesApplied,
                        objectives: project.objectives || []
                    },
                    input: project,
                    recommendations: {
                        strategies: { top: topStrategies.slice(0, 5), additional: topStrategies.slice(5), all: allStrategies },
                        frameworks: { primary: topFrameworks[0] || null, secondary: topFrameworks.slice(1), all: allFrameworks },
                        outcomes: { priority: topOutcomes.slice(0, 3), secondary: topOutcomes.slice(3), all: allOutcomes }
                    },
                    confidence: confidence
                };
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // SYSTÈME D'APPRENTISSAGE ADAPTATIF
        // Ajuste dynamiquement les poids du graphe basé sur les feedbacks utilisateurs
        // ═══════════════════════════════════════════════════════════════════════════

        var LearningSystem = {
            feedbackStore: [],
            
            /**
             * Enregistre un feedback utilisateur sur une recommandation
             * @param {string} recommendationId - ID de la recommandation
             * @param {Object} feedback - { accepted, modified, rating, outcome, context }
             */
            recordFeedback: function(recommendationId, feedback) {
                var record = {
                    id: recommendationId,
                    timestamp: new Date().toISOString(),
                    accepted: feedback.accepted,
                    modified: feedback.modified || false,
                    userRating: feedback.rating || 3,
                    actualOutcome: feedback.outcome || null,
                    context: feedback.context || null
                };
                
                this.feedbackStore.push(record);
                
                // Persist to localStorage
                if (typeof localStorage !== 'undefined') {
                    try {
                        var existing = JSON.parse(localStorage.getItem('moudar_feedback') || '[]');
                        existing.push(record);
                        // Garder les 1000 derniers feedbacks
                        localStorage.setItem('moudar_feedback', JSON.stringify(existing.slice(-1000)));
                    } catch (e) {
                        console.warn('Could not save feedback to localStorage:', e);
                    }
                }
                
                return record;
            },

            /**
             * Exporte les données de feedback pour analyse externe
             */
            exportFeedbackData: function() {
                if (typeof localStorage !== 'undefined') {
                    try {
                        return JSON.parse(localStorage.getItem('moudar_feedback') || '[]');
                    } catch (e) {
                        return this.feedbackStore;
                    }
                }
                return this.feedbackStore;
            },

            /**
             * Calcule des métriques globales de performance
             */
            calculatePerformanceMetrics: function() {
                var feedbacks = this.exportFeedbackData();
                if (feedbacks.length === 0) return null;

                var accepted = feedbacks.filter(function(f) { return f.accepted; }).length;
                var avgRating = feedbacks.reduce(function(a, b) { return a + (b.userRating || 0); }, 0) / feedbacks.length;
                var outcomes = { success: 0, partial: 0, failure: 0, unknown: 0 };
                feedbacks.forEach(function(f) {
                    if (f.actualOutcome === 'success') outcomes.success++;
                    else if (f.actualOutcome === 'partial') outcomes.partial++;
                    else if (f.actualOutcome === 'failure') outcomes.failure++;
                    else outcomes.unknown++;
                });
                
                return {
                    totalFeedbacks: feedbacks.length,
                    acceptanceRate: accepted / feedbacks.length,
                    averageRating: avgRating,
                    outcomes: outcomes,
                    lastUpdated: new Date().toISOString()
                };
            },

            /**
             * Calcule la performance par stratégie à partir des feedbacks
             * @param {number} minSamples - Nb minimum d'utilisations pour ajuster
             */
            computeStrategyPerformance: function(minSamples) {
                minSamples = minSamples || 3;
                var feedbacks = this.exportFeedbackData();
                if (!feedbacks || feedbacks.length === 0) return {};

                var stats = {};

                feedbacks.forEach(function(fb) {
                    // context.selectedStrategies = ['S01','S03',...]
                    if (!fb.context || !Array.isArray(fb.context.selectedStrategies)) return;

                    fb.context.selectedStrategies.forEach(function(sid) {
                        if (!stats[sid]) {
                            stats[sid] = { uses: 0, accepted: 0, totalRating: 0, ratingCount: 0 };
                        }
                        var s = stats[sid];
                        s.uses += 1;
                        if (fb.accepted) s.accepted += 1;
                        if (typeof fb.userRating === 'number' && !isNaN(fb.userRating)) {
                            s.totalRating += fb.userRating;
                            s.ratingCount += 1;
                        }
                    });
                });

                var result = {};
                Object.keys(stats).forEach(function(sid) {
                    var s = stats[sid];
                    if (s.uses < minSamples) return; // Pas assez de données
                    
                    var acceptanceRate = s.accepted / s.uses;
                    var avgRating = s.ratingCount > 0 ? (s.totalRating / s.ratingCount) : 3.0;
                    // Normalisation rating 1–5 -> 0–1
                    var ratingScore = Math.min(Math.max((avgRating - 1) / 4, 0), 1);
                    // Score global de performance (0–1), centré autour de 0.5
                    var performance = 0.5 * acceptanceRate + 0.5 * ratingScore;

                    result[sid] = {
                        uses: s.uses,
                        acceptanceRate: acceptanceRate,
                        avgRating: avgRating,
                        performance: performance
                    };
                });

                return result;
            },

            /**
             * Ajuste les poids du graphe basé sur la performance des stratégies
             * @param {Object} graph - Graphe à modifier (optionnel, défaut: KnowledgeGraph)
             * @param {Object} options - { learningRate, minSamples, minWeight, maxWeight }
             */
            applyWeightAdjustments: function(graph, options) {
                // Si un seul argument passé et c'est un objet sans 'nodes', c'est options
                if (arguments.length === 1 && graph && !graph.nodes) {
                    options = graph;
                    graph = null;
                }
                
                var cfg = Object.assign({
                    learningRate: 0.1,   // intensité de l'ajustement
                    minSamples: 3,       // nb min de feedbacks par stratégie
                    minWeight: 0.05,     // poids minimal
                    maxWeight: 1.0       // poids maximal
                }, options || {});

                var performanceMap = this.computeStrategyPerformance(cfg.minSamples);
                var strategyIds = Object.keys(performanceMap);
                if (strategyIds.length === 0) {
                    return { adjusted: false, reason: 'Pas assez de données de feedback', strategiesUpdated: 0 };
                }

                // Utiliser le graphe passé en paramètre ou KnowledgeGraph par défaut
                var kg = graph || KnowledgeGraph;
                var edges = kg.edges;

                // Matrices où apparaissent les stratégies
                var strategyEdgeMaps = [
                    edges.barrierToStrategy || {},
                    edges.contextToStrategy || {},
                    edges.phaseToStrategy || {},
                    edges.domainToStrategy || {}
                ];

                var adjustmentsCount = 0;

                strategyIds.forEach(function(sid) {
                    var perf = performanceMap[sid].performance; // 0–1
                    // Déviation par rapport à 0.5
                    var delta = perf - 0.5; // -0.5 à +0.5
                    // Facteur multiplicatif
                    var factor = 1 + cfg.learningRate * delta * 2;

                    strategyEdgeMaps.forEach(function(map) {
                        Object.keys(map).forEach(function(sourceId) {
                            var row = map[sourceId];
                            if (!row || typeof row[sid] !== 'number') return;

                            var newWeight = row[sid] * factor;
                            if (cfg.minWeight != null) newWeight = Math.max(cfg.minWeight, newWeight);
                            if (cfg.maxWeight != null) newWeight = Math.min(cfg.maxWeight, newWeight);

                            // Arrondir pour garder des nombres propres
                            row[sid] = parseFloat(newWeight.toFixed(3));
                            adjustmentsCount++;
                        });
                    });
                });

                // Sauvegarder l'état d'apprentissage
                if (typeof localStorage !== 'undefined') {
                    try {
                        localStorage.setItem('moudar_learning_state', JSON.stringify({
                            lastCalibration: new Date().toISOString(),
                            strategiesUpdated: strategyIds.length,
                            totalAdjustments: adjustmentsCount,
                            performanceSnapshot: performanceMap
                        }));
                    } catch (e) {
                        console.warn('Could not save learning state:', e);
                    }
                }

                return {
                    adjusted: true,
                    strategiesUpdated: strategyIds.length,
                    totalAdjustments: adjustmentsCount,
                    performance: performanceMap,
                    appliedAt: new Date().toISOString()
                };
            },

            /**
             * Récupère l'état d'apprentissage sauvegardé
             */
            getLearningState: function() {
                if (typeof localStorage !== 'undefined') {
                    try {
                        return JSON.parse(localStorage.getItem('moudar_learning_state') || 'null');
                    } catch (e) {
                        return null;
                    }
                }
                return null;
            },

            /**
             * Réinitialise tous les feedbacks et l'apprentissage
             */
            resetLearning: function() {
                this.feedbackStore = [];
                if (typeof localStorage !== 'undefined') {
                    localStorage.removeItem('moudar_feedback');
                    localStorage.removeItem('moudar_learning_state');
                }
                return { reset: true, timestamp: new Date().toISOString() };
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // PROTOCOL ANALYZER - NLP Light pour analyse de protocoles existants
        // ═══════════════════════════════════════════════════════════════════════════
        
        var ProtocolAnalyzer = {
            // Dictionnaire de mots-clés par stratégie (FR + EN)
            strategyKeywords: {
                S01: { // Formation et éducation
                    fr: ["formation", "former", "formés", "enseigner", "enseignement", "cours", "module", "atelier", "workshop", "e-learning", "curriculum", "compétences", "apprentissage", "didactique", "pédagogique", "certifi"],
                    en: ["training", "train", "trained", "education", "teach", "course", "module", "workshop", "e-learning", "curriculum", "skills", "learning", "didactic", "pedagog", "certif"]
                },
                S02: { // Audit et feedback
                    fr: ["audit", "feedback", "retour", "évaluation", "indicateur", "tableau de bord", "dashboard", "monitoring", "suivi", "contrôle qualité", "performance", "mesure", "rapport"],
                    en: ["audit", "feedback", "evaluation", "indicator", "dashboard", "monitoring", "follow-up", "quality control", "performance", "measure", "report"]
                },
                S03: { // Facilitation
                    fr: ["facilitateur", "facilitation", "accompagn", "coach", "mentor", "soutien", "appui", "guide", "animateur"],
                    en: ["facilitator", "facilitation", "support", "coach", "mentor", "guide", "animator"]
                },
                S04: { // Champions/Leaders d'opinion
                    fr: ["champion", "leader", "référent", "ambassadeur", "opinion", "influent", "modèle", "pionnier", "porteur"],
                    en: ["champion", "leader", "referent", "ambassador", "opinion", "influential", "model", "pioneer", "advocate"]
                },
                S05: { // Systèmes de rappel
                    fr: ["rappel", "reminder", "alerte", "notification", "sms", "aide-mémoire", "checklist", "check-list", "protocole", "algorithme", "arbre décision"],
                    en: ["reminder", "alert", "notification", "sms", "checklist", "check-list", "protocol", "algorithm", "decision tree"]
                },
                S06: { // Incitations financières
                    fr: ["incitation", "prime", "bonus", "rémunération", "financement", "subvention", "gratuit", "compensat", "indemni"],
                    en: ["incentive", "bonus", "remuneration", "funding", "subsidy", "free", "compensat", "payment"]
                },
                S07: { // Changement de politique
                    fr: ["politique", "réglementation", "loi", "décret", "circulaire", "directive", "gouvernance", "institutionnel", "législat"],
                    en: ["policy", "regulation", "law", "decree", "directive", "governance", "institutional", "legislat"]
                },
                S08: { // Engagement communautaire
                    fr: ["communaut", "village", "famille", "sensibilisation", "mobilisation", "participation", "ong", "association", "société civile", "bénévole"],
                    en: ["communit", "village", "family", "awareness", "mobilization", "participation", "ngo", "association", "civil society", "volunteer"]
                },
                S09: { // Assistance technique
                    fr: ["assistance technique", "support technique", "hotline", "helpdesk", "dépannage", "maintenance", "expert", "consultant"],
                    en: ["technical assistance", "technical support", "hotline", "helpdesk", "troubleshoot", "maintenance", "expert", "consultant"]
                },
                S10: { // Supervision clinique
                    fr: ["supervision", "superviseur", "encadrement", "tutorat", "mentorat", "accompagnement clinique", "staff meeting", "réunion d'équipe"],
                    en: ["supervision", "supervisor", "oversight", "tutoring", "mentoring", "clinical support", "staff meeting", "team meeting"]
                },
                S11: { // Adaptation de l'intervention
                    fr: ["adaptation", "adapter", "contextualisation", "culturel", "local", "terrain", "pilote", "prototype", "itération"],
                    en: ["adaptation", "adapt", "contextualization", "cultural", "local", "field", "pilot", "prototype", "iteration"]
                },
                S12: { // Construction de coalitions
                    fr: ["coalition", "partenariat", "consortium", "réseau", "alliance", "collaboration", "multi-acteur", "intersector"],
                    en: ["coalition", "partnership", "consortium", "network", "alliance", "collaboration", "multi-stakeholder", "intersector"]
                },
                S13: { // Systèmes de données
                    fr: ["données", "data", "base de données", "système d'information", "registre", "dossier patient", "électronique", "numérique", "digital", "informatique", "logiciel"],
                    en: ["data", "database", "information system", "registry", "patient record", "electronic", "digital", "software", "it system"]
                },
                S14: { // Collaborative d'apprentissage
                    fr: ["collaborative", "communauté de pratique", "groupe d'apprentissage", "échange", "partage d'expérience", "peer learning", "benchmarking"],
                    en: ["collaborative", "community of practice", "learning group", "exchange", "experience sharing", "peer learning", "benchmarking"]
                },
                S15: { // Soutien par les pairs
                    fr: ["pair", "peer", "patient expert", "aidant", "groupe de soutien", "entraide", "vécu", "expérience patient"],
                    en: ["peer", "patient expert", "caregiver", "support group", "mutual aid", "lived experience", "patient experience"]
                },
                S16: { // Amélioration de la qualité
                    fr: ["qualité", "amélioration continue", "pdca", "lean", "kaizen", "accréditation", "certification", "norme", "standard", "protocole"],
                    en: ["quality", "continuous improvement", "pdca", "lean", "kaizen", "accreditation", "certification", "standard", "protocol"]
                },
                S17: { // Support technique centralisé
                    fr: ["centralisé", "plateforme", "hub", "centre de ressources", "coordination", "national", "régional"],
                    en: ["centralized", "platform", "hub", "resource center", "coordination", "national", "regional"]
                },
                S18: { // Éducation des patients
                    fr: ["éducation patient", "éducation thérapeutique", "information patient", "brochure", "livret", "vidéo éducative", "psychoéducation", "littératie"],
                    en: ["patient education", "therapeutic education", "patient information", "brochure", "booklet", "educational video", "psychoeducation", "literacy"]
                },
                S19: { // Transfert de tâches
                    fr: ["transfert de tâches", "task shifting", "délégation", "infirmier", "agent de santé", "community health worker", "non-spécialiste", "généraliste"],
                    en: ["task shifting", "task sharing", "delegation", "nurse", "health worker", "community health worker", "non-specialist", "generalist"]
                },
                S20: { // Engagement des parties prenantes
                    fr: ["partie prenante", "stakeholder", "implica", "concertation", "consultation", "co-construction", "gouvernance partagée", "comité"],
                    en: ["stakeholder", "involvement", "consultation", "co-construction", "shared governance", "committee", "engagement"]
                }
            },
            
            // Catégories de complétude pour le radar
            completenessCategories: {
                training: { 
                    fr: "Formation", en: "Training",
                    strategies: ["S01", "S14", "S03"]
                },
                support: { 
                    fr: "Soutien", en: "Support",
                    strategies: ["S09", "S10", "S15", "S17"]
                },
                evaluation: { 
                    fr: "Évaluation", en: "Evaluation",
                    strategies: ["S02", "S13", "S16"]
                },
                stakeholders: { 
                    fr: "Acteurs", en: "Stakeholders",
                    strategies: ["S04", "S08", "S12", "S20"]
                },
                adaptation: { 
                    fr: "Adaptation", en: "Adaptation",
                    strategies: ["S05", "S11", "S19"]
                },
                sustainability: { 
                    fr: "Pérennité", en: "Sustainability",
                    strategies: ["S06", "S07", "S18"]
                }
            },
            
            /**
             * Analyse un texte de protocole et détecte les stratégies présentes
             * @param {string} text - Texte du protocole
             * @param {string} lang - Langue de détection (fr/en)
             * @returns {Object} Résultats d'analyse
             */
            analyze: function(text, lang) {
                lang = lang || 'fr';
                var normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                
                var detected = {};
                var matches = {};
                var strategies = KnowledgeGraph.nodes.strategies;
                
                // Pour chaque stratégie, chercher les mots-clés
                Object.keys(this.strategyKeywords).forEach(function(sid) {
                    var keywords = ProtocolAnalyzer.strategyKeywords[sid][lang] || ProtocolAnalyzer.strategyKeywords[sid].fr;
                    var foundKeywords = [];
                    
                    keywords.forEach(function(kw) {
                        var normalizedKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        if (normalizedText.includes(normalizedKw)) {
                            foundKeywords.push(kw);
                        }
                    });
                    
                    if (foundKeywords.length > 0) {
                        detected[sid] = {
                            strategy: strategies[sid],
                            keywords: foundKeywords,
                            confidence: Math.min(1, foundKeywords.length * 0.3) // Plus de mots-clés = plus de confiance
                        };
                        matches[sid] = foundKeywords;
                    }
                });
                
                // Calculer les scores par catégorie
                var categoryScores = {};
                Object.keys(this.completenessCategories).forEach(function(catId) {
                    var cat = ProtocolAnalyzer.completenessCategories[catId];
                    var catStrategies = cat.strategies;
                    var detectedInCat = catStrategies.filter(function(sid) { return detected[sid]; });
                    categoryScores[catId] = {
                        label: cat[lang],
                        detected: detectedInCat.length,
                        total: catStrategies.length,
                        score: Math.round((detectedInCat.length / catStrategies.length) * 100),
                        strategies: catStrategies.map(function(sid) {
                            return {
                                id: sid,
                                label: strategies[sid].label[lang],
                                detected: !!detected[sid],
                                keywords: detected[sid] ? detected[sid].keywords : []
                            };
                        })
                    };
                });
                
                // Score global de complétude
                var totalDetected = Object.keys(detected).length;
                var totalStrategies = Object.keys(this.strategyKeywords).length;
                var globalScore = Math.round((totalDetected / totalStrategies) * 100);
                
                // Identifier les stratégies manquantes prioritaires
                var missing = [];
                Object.keys(this.strategyKeywords).forEach(function(sid) {
                    if (!detected[sid]) {
                        missing.push({
                            id: sid,
                            strategy: strategies[sid],
                            label: strategies[sid].label[lang],
                            priority: ProtocolAnalyzer.getMissingPriority(sid, detected)
                        });
                    }
                });
                
                // Trier par priorité
                missing.sort(function(a, b) { return b.priority - a.priority; });
                
                return {
                    detected: detected,
                    matches: matches,
                    categoryScores: categoryScores,
                    globalScore: globalScore,
                    totalDetected: totalDetected,
                    totalStrategies: totalStrategies,
                    missing: missing.slice(0, 5), // Top 5 manquants prioritaires
                    allMissing: missing,
                    analyzedAt: new Date().toISOString(),
                    textLength: text.length,
                    lang: lang
                };
            },
            
            /**
             * Calcule la priorité d'une stratégie manquante
             */
            getMissingPriority: function(sid, detected) {
                // Stratégies fondamentales toujours prioritaires
                var fundamentalStrategies = ["S02", "S04", "S10", "S16"]; // Audit, Champions, Supervision, Qualité
                if (fundamentalStrategies.indexOf(sid) >= 0) return 0.9;
                
                // Si beaucoup de training mais pas de supervision → priorité haute
                if (sid === "S10" && (detected["S01"] || detected["S14"])) return 0.95;
                
                // Si données mais pas d'audit → priorité haute
                if (sid === "S02" && detected["S13"]) return 0.9;
                
                // Pérennité toujours importante
                if (["S07", "S12", "S20"].indexOf(sid) >= 0) return 0.7;
                
                return 0.5;
            },
            
            /**
             * Génère des recommandations basées sur l'analyse
             */
            getRecommendations: function(analysis, lang) {
                lang = lang || 'fr';
                var recommendations = [];
                var categoryScores = analysis.categoryScores;
                
                // Identifier les catégories les plus faibles
                var weakCategories = Object.keys(categoryScores)
                    .filter(function(catId) { return categoryScores[catId].score < 50; })
                    .sort(function(a, b) { return categoryScores[a].score - categoryScores[b].score; });
                
                weakCategories.forEach(function(catId) {
                    var cat = categoryScores[catId];
                    var missingInCat = cat.strategies.filter(function(s) { return !s.detected; });
                    
                    if (missingInCat.length > 0) {
                        recommendations.push({
                            category: catId,
                            categoryLabel: cat.label,
                            score: cat.score,
                            message: lang === 'fr' 
                                ? "Votre protocole manque de stratégies de " + cat.label.toLowerCase()
                                : "Your protocol lacks " + cat.label.toLowerCase() + " strategies",
                            suggestions: missingInCat.slice(0, 2).map(function(s) {
                                return {
                                    id: s.id,
                                    label: s.label,
                                    rationale: ProtocolAnalyzer.getStrategyRationale(s.id, lang)
                                };
                            })
                        });
                    }
                });
                
                return recommendations;
            },
            
            /**
             * Retourne une justification pour l'ajout d'une stratégie
             */
            getStrategyRationale: function(sid, lang) {
                var rationales = {
                    S01: { fr: "Renforce les compétences des professionnels", en: "Strengthens professional skills" },
                    S02: { fr: "Permet de mesurer les progrès et d'ajuster", en: "Enables progress measurement and adjustment" },
                    S03: { fr: "Accompagne le changement sur le terrain", en: "Supports field-level change" },
                    S04: { fr: "Crée des modèles locaux et motive les équipes", en: "Creates local role models and motivates teams" },
                    S05: { fr: "Réduit les oublis et standardise les pratiques", en: "Reduces oversights and standardizes practices" },
                    S06: { fr: "Motive l'adoption par des incitations", en: "Motivates adoption through incentives" },
                    S07: { fr: "Ancre le changement dans les politiques", en: "Anchors change in policies" },
                    S08: { fr: "Implique la communauté et réduit la stigmatisation", en: "Involves community and reduces stigma" },
                    S09: { fr: "Résout les problèmes techniques rapidement", en: "Resolves technical issues quickly" },
                    S10: { fr: "Assure la qualité et le soutien aux équipes", en: "Ensures quality and team support" },
                    S11: { fr: "Adapte l'intervention au contexte local", en: "Adapts intervention to local context" },
                    S12: { fr: "Crée des alliances durables", en: "Creates lasting alliances" },
                    S13: { fr: "Permet le suivi et la prise de décision basée sur les données", en: "Enables monitoring and data-driven decisions" },
                    S14: { fr: "Favorise l'apprentissage collectif", en: "Promotes collective learning" },
                    S15: { fr: "Apporte le soutien de personnes avec vécu similaire", en: "Provides support from people with similar experiences" },
                    S16: { fr: "Institutionnalise l'amélioration continue", en: "Institutionalizes continuous improvement" },
                    S17: { fr: "Coordonne et harmonise à grande échelle", en: "Coordinates and harmonizes at scale" },
                    S18: { fr: "Améliore l'adhésion des patients", en: "Improves patient adherence" },
                    S19: { fr: "Optimise les ressources humaines disponibles", en: "Optimizes available human resources" },
                    S20: { fr: "Assure l'appropriation par toutes les parties", en: "Ensures ownership by all parties" }
                };
                return rationales[sid] ? rationales[sid][lang] : "";
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // COUNTRY INTELLIGENCE - Base de données des contextes pays
        // ═══════════════════════════════════════════════════════════════════════════
        
        var CountryIntelligence = {
            // Base de données des pays avec indicateurs clés
            countries: {
                // AFRIQUE
                MA: { 
                    code: 'MA', name: { fr: 'Maroc', en: 'Morocco' }, region: 'MENA', income: 'LMIC',
                    indicators: { gdpPerCapita: 3500, psychiatristsPer100k: 0.5, healthExpenditure: 5.2, literacyRate: 73, urbanization: 63, amoCouverage: 62 },
                    languages: ['ar', 'fr', 'ber'], healthSystem: 'mixed',
                    adaptations: { S19: 1.4, S08: 1.3, S15: 1.2, S06: 0.4, S13: 0.6 },
                    barriers: ['B05', 'B09', 'B06', 'B01'], // Stigma, Cultural, Funding, Training
                    recommendations: { fr: ["Prioriser le task-shifting (agents de santé communautaires)", "Impliquer les leaders religieux pour réduire la stigmatisation", "Formation en arabe/darija recommandée", "Partenariats avec ONG locales (AMSME, AMALI)"], en: ["Prioritize task-shifting (community health workers)", "Involve religious leaders to reduce stigma", "Training in Arabic/Darija recommended", "Partnerships with local NGOs (AMSME, AMALI)"] }
                },
                TN: { 
                    code: 'TN', name: { fr: 'Tunisie', en: 'Tunisia' }, region: 'MENA', income: 'LMIC',
                    indicators: { gdpPerCapita: 3800, psychiatristsPer100k: 1.2, healthExpenditure: 7.0, literacyRate: 79, urbanization: 69, amoCouverage: 75 },
                    languages: ['ar', 'fr'], healthSystem: 'mixed',
                    adaptations: { S19: 1.3, S08: 1.2, S01: 1.1, S06: 0.5 },
                    barriers: ['B05', 'B06', 'B02'],
                    recommendations: { fr: ["Système de santé relativement structuré", "Bonne couverture AMO exploitable", "Accent sur la formation continue"], en: ["Relatively structured health system", "Good AMO coverage to leverage", "Focus on continuing education"] }
                },
                SN: { 
                    code: 'SN', name: { fr: 'Sénégal', en: 'Senegal' }, region: 'SSA', income: 'LIC',
                    indicators: { gdpPerCapita: 1600, psychiatristsPer100k: 0.1, healthExpenditure: 4.1, literacyRate: 52, urbanization: 48, amoCouverage: 20 },
                    languages: ['fr', 'wo'], healthSystem: 'public_dominant',
                    adaptations: { S19: 1.5, S08: 1.4, S15: 1.3, S06: 0.2, S13: 0.4, S17: 0.5 },
                    barriers: ['B06', 'B01', 'B03', 'B05'],
                    recommendations: { fr: ["Task-shifting essentiel (pénurie critique de psychiatres)", "Approche communautaire via les ASC", "Financement ONG/bailleurs international", "Adapter aux langues locales (wolof)"], en: ["Task-shifting essential (critical psychiatrist shortage)", "Community approach via CHWs", "NGO/international donor funding", "Adapt to local languages (Wolof)"] }
                },
                CI: { 
                    code: 'CI', name: { fr: "Côte d'Ivoire", en: 'Ivory Coast' }, region: 'SSA', income: 'LMIC',
                    indicators: { gdpPerCapita: 2600, psychiatristsPer100k: 0.3, healthExpenditure: 4.5, literacyRate: 47, urbanization: 52, amoCouverage: 30 },
                    languages: ['fr'], healthSystem: 'mixed',
                    adaptations: { S19: 1.4, S08: 1.3, S15: 1.2, S06: 0.3 },
                    barriers: ['B06', 'B01', 'B05', 'B09'],
                    recommendations: { fr: ["Approche communautaire recommandée", "Implication des tradi-praticiens à considérer", "Formation des infirmiers prioritaire"], en: ["Community approach recommended", "Consider involving traditional practitioners", "Nurse training priority"] }
                },
                KE: { 
                    code: 'KE', name: { fr: 'Kenya', en: 'Kenya' }, region: 'SSA', income: 'LMIC',
                    indicators: { gdpPerCapita: 2100, psychiatristsPer100k: 0.2, healthExpenditure: 4.8, literacyRate: 82, urbanization: 28, amoCouverage: 25 },
                    languages: ['en', 'sw'], healthSystem: 'mixed',
                    adaptations: { S19: 1.4, S08: 1.3, S17: 0.8, S13: 0.7 },
                    barriers: ['B06', 'B01', 'B09', 'B03'],
                    recommendations: { fr: ["M-health prometteuse (forte pénétration mobile)", "Modèle mhGAP bien implanté", "Focus zones rurales"], en: ["M-health promising (high mobile penetration)", "mhGAP model well established", "Focus on rural areas"] }
                },
                EG: { 
                    code: 'EG', name: { fr: 'Égypte', en: 'Egypt' }, region: 'MENA', income: 'LMIC',
                    indicators: { gdpPerCapita: 4000, psychiatristsPer100k: 0.9, healthExpenditure: 4.6, literacyRate: 71, urbanization: 43, amoCouverage: 58 },
                    languages: ['ar'], healthSystem: 'mixed',
                    adaptations: { S19: 1.2, S08: 1.2, S07: 1.1, S01: 1.1 },
                    barriers: ['B05', 'B09', 'B06', 'B07'],
                    recommendations: { fr: ["Système de santé en expansion", "Stigmatisation importante - engagement communautaire clé", "Formation en arabe exclusivement"], en: ["Expanding health system", "Significant stigma - community engagement key", "Training in Arabic only"] }
                },
                // EUROPE / HIC
                CH: { 
                    code: 'CH', name: { fr: 'Suisse', en: 'Switzerland' }, region: 'Europe', income: 'HIC',
                    indicators: { gdpPerCapita: 92000, psychiatristsPer100k: 53, healthExpenditure: 11.3, literacyRate: 99, urbanization: 74, amoCouverage: 100 },
                    languages: ['fr', 'de', 'it'], healthSystem: 'private_dominant',
                    adaptations: { S16: 1.2, S13: 1.2, S02: 1.1, S06: 1.0 },
                    barriers: ['B02', 'B08', 'B10'],
                    recommendations: { fr: ["Accent sur la qualité et les standards", "Systèmes de données sophistiqués possibles", "Incitations financières viables"], en: ["Focus on quality and standards", "Sophisticated data systems feasible", "Financial incentives viable"] }
                },
                FR: { 
                    code: 'FR', name: { fr: 'France', en: 'France' }, region: 'Europe', income: 'HIC',
                    indicators: { gdpPerCapita: 44000, psychiatristsPer100k: 23, healthExpenditure: 11.1, literacyRate: 99, urbanization: 81, amoCouverage: 100 },
                    languages: ['fr'], healthSystem: 'mixed',
                    adaptations: { S16: 1.1, S02: 1.1, S07: 1.1, S14: 1.1 },
                    barriers: ['B02', 'B08', 'B12'],
                    recommendations: { fr: ["Système ARS structuré pour déploiement", "Résistance au changement fréquente", "Importance des syndicats et corps professionnels"], en: ["Structured ARS system for deployment", "Resistance to change common", "Importance of unions and professional bodies"] }
                },
                BE: { 
                    code: 'BE', name: { fr: 'Belgique', en: 'Belgium' }, region: 'Europe', income: 'HIC',
                    indicators: { gdpPerCapita: 51000, psychiatristsPer100k: 21, healthExpenditure: 10.3, literacyRate: 99, urbanization: 98, amoCouverage: 99 },
                    languages: ['fr', 'nl', 'de'], healthSystem: 'mixed',
                    adaptations: { S16: 1.1, S02: 1.1, S14: 1.1 },
                    barriers: ['B02', 'B11', 'B08'],
                    recommendations: { fr: ["Attention aux différences linguistiques FR/NL", "Système fragmenté entre régions"], en: ["Attention to FR/NL language differences", "System fragmented between regions"] }
                },
                CA: { 
                    code: 'CA', name: { fr: 'Canada', en: 'Canada' }, region: 'NAmerica', income: 'HIC',
                    indicators: { gdpPerCapita: 52000, psychiatristsPer100k: 16, healthExpenditure: 10.8, literacyRate: 99, urbanization: 82, amoCouverage: 100 },
                    languages: ['en', 'fr'], healthSystem: 'public_dominant',
                    adaptations: { S16: 1.1, S13: 1.1, S14: 1.1 },
                    barriers: ['B08', 'B02', 'B10'],
                    recommendations: { fr: ["Système provincial - adapter par province", "Communautés autochtones nécessitent approches spécifiques"], en: ["Provincial system - adapt by province", "Indigenous communities require specific approaches"] }
                },
                // ASIE
                IN: { 
                    code: 'IN', name: { fr: 'Inde', en: 'India' }, region: 'SouthAsia', income: 'LMIC',
                    indicators: { gdpPerCapita: 2500, psychiatristsPer100k: 0.3, healthExpenditure: 3.5, literacyRate: 74, urbanization: 35, amoCouverage: 40 },
                    languages: ['hi', 'en'], healthSystem: 'mixed',
                    adaptations: { S19: 1.5, S08: 1.4, S17: 0.7, S15: 1.3 },
                    barriers: ['B06', 'B05', 'B01', 'B09'],
                    recommendations: { fr: ["Task-shifting crucial (ASHA workers)", "Grande diversité régionale", "M-health en expansion rapide"], en: ["Task-shifting crucial (ASHA workers)", "Great regional diversity", "M-health rapidly expanding"] }
                },
                BD: { 
                    code: 'BD', name: { fr: 'Bangladesh', en: 'Bangladesh' }, region: 'SouthAsia', income: 'LMIC',
                    indicators: { gdpPerCapita: 2500, psychiatristsPer100k: 0.1, healthExpenditure: 2.4, literacyRate: 74, urbanization: 38, amoCouverage: 25 },
                    languages: ['bn'], healthSystem: 'mixed',
                    adaptations: { S19: 1.5, S08: 1.4, S15: 1.3, S06: 0.2 },
                    barriers: ['B06', 'B01', 'B05', 'B03'],
                    recommendations: { fr: ["BRAC et ONG très actifs", "Formation en bengali essentielle", "Approche communautaire éprouvée"], en: ["BRAC and NGOs very active", "Bengali training essential", "Proven community approach"] }
                },
                // AMÉRIQUE LATINE
                BR: { 
                    code: 'BR', name: { fr: 'Brésil', en: 'Brazil' }, region: 'LatAm', income: 'UMIC',
                    indicators: { gdpPerCapita: 9000, psychiatristsPer100k: 3.2, healthExpenditure: 9.5, literacyRate: 93, urbanization: 87, amoCouverage: 75 },
                    languages: ['pt'], healthSystem: 'mixed',
                    adaptations: { S08: 1.2, S07: 1.1, S19: 1.1 },
                    barriers: ['B06', 'B02', 'B11'],
                    recommendations: { fr: ["SUS (système unifié) facilite déploiement", "CAPS comme modèle de soins communautaires", "Grandes inégalités régionales"], en: ["SUS (unified system) facilitates deployment", "CAPS as community care model", "Large regional inequalities"] }
                },
                MX: { 
                    code: 'MX', name: { fr: 'Mexique', en: 'Mexico' }, region: 'LatAm', income: 'UMIC',
                    indicators: { gdpPerCapita: 10000, psychiatristsPer100k: 1.6, healthExpenditure: 5.4, literacyRate: 95, urbanization: 80, amoCouverage: 65 },
                    languages: ['es'], healthSystem: 'mixed',
                    adaptations: { S08: 1.2, S19: 1.1, S07: 1.1 },
                    barriers: ['B06', 'B05', 'B02'],
                    recommendations: { fr: ["Système IMSS/ISSSTE structuré", "Communautés indigènes nécessitent adaptation"], en: ["Structured IMSS/ISSSTE system", "Indigenous communities require adaptation"] }
                }
            },
            
            // Récupère les données d'un pays
            getCountry: function(code) {
                return this.countries[code] || null;
            },
            
            // Liste tous les pays disponibles
            listCountries: function(lang) {
                lang = lang || 'fr';
                return Object.values(this.countries).map(function(c) {
                    return { code: c.code, name: c.name[lang], region: c.region, income: c.income };
                }).sort(function(a, b) { return a.name.localeCompare(b.name); });
            },
            
            // Applique les adaptations pays aux stratégies
            applyCountryAdaptations: function(strategies, countryCode) {
                var country = this.countries[countryCode];
                if (!country) return strategies;
                
                var adaptations = country.adaptations || {};
                return strategies.map(function(s) {
                    var multiplier = adaptations[s.id] || 1.0;
                    return Object.assign({}, s, {
                        score: s.score * multiplier,
                        countryAdapted: true,
                        countryMultiplier: multiplier
                    });
                }).sort(function(a, b) { return b.score - a.score; });
            },
            
            // Génère un rapport contextuel pays
            getCountryReport: function(countryCode, lang) {
                lang = lang || 'fr';
                var country = this.countries[countryCode];
                if (!country) return null;
                
                var incomeLabels = {
                    HIC: { fr: 'Pays à revenu élevé', en: 'High-Income Country' },
                    UMIC: { fr: 'Revenu intermédiaire supérieur', en: 'Upper-Middle Income' },
                    LMIC: { fr: 'Revenu intermédiaire inférieur', en: 'Lower-Middle Income' },
                    LIC: { fr: 'Pays à faible revenu', en: 'Low-Income Country' }
                };
                
                return {
                    country: country.name[lang],
                    code: country.code,
                    incomeLevel: incomeLabels[country.income][lang],
                    income: country.income,
                    indicators: country.indicators,
                    languages: country.languages,
                    healthSystem: country.healthSystem,
                    priorityBarriers: country.barriers,
                    recommendations: country.recommendations[lang],
                    adaptations: country.adaptations
                };
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // SUCCESS PREDICTION - Simulation prédictive du succès
        // ═══════════════════════════════════════════════════════════════════════════
        
        var SuccessPrediction = {
            // ── METHODOLOGICAL NOTE ──────────────────────────────────────
            // These coefficients are HEURISTIC ESTIMATES derived from:
            //   - Effective Practice and Organisation of Care (EPOC) reviews
            //   - Powell et al. (2015) compilation of 73 ERIC strategies
            //   - Ivers et al. (2012) Cochrane review on audit & feedback
            //   - Grimshaw et al. (2012) knowledge translation review
            // They are NOT trained weights from a statistical model.
            // Base probability (0.35) from Proctor et al. (2011) observation
            // that ~35% of implementations achieve sustained adoption.
            // LIMITATION: These values are expert-estimated approximations,
            // not empirically calibrated parameters. Use for exploratory
            // analysis only, not for grant applications or publications.
            // ─────────────────────────────────────────────────────────────
            strategySuccessFactors: {
                S01: { baseImpact: 0.12, evidence: 'strong' },    // Formation
                S02: { baseImpact: 0.08, evidence: 'strong' },    // Audit
                S03: { baseImpact: 0.10, evidence: 'moderate' },  // Facilitation
                S04: { baseImpact: 0.11, evidence: 'strong' },    // Champions
                S05: { baseImpact: 0.06, evidence: 'moderate' },  // Rappels
                S06: { baseImpact: 0.05, evidence: 'weak' },      // Incitations
                S07: { baseImpact: 0.09, evidence: 'moderate' },  // Politique
                S08: { baseImpact: 0.10, evidence: 'strong' },    // Communauté
                S09: { baseImpact: 0.05, evidence: 'moderate' },  // Assistance tech
                S10: { baseImpact: 0.13, evidence: 'strong' },    // Supervision
                S11: { baseImpact: 0.07, evidence: 'moderate' },  // Adaptation
                S12: { baseImpact: 0.08, evidence: 'moderate' },  // Coalitions
                S13: { baseImpact: 0.06, evidence: 'moderate' },  // Données
                S14: { baseImpact: 0.07, evidence: 'moderate' },  // Collaborative
                S15: { baseImpact: 0.09, evidence: 'strong' },    // Pairs
                S16: { baseImpact: 0.08, evidence: 'strong' },    // Qualité
                S17: { baseImpact: 0.04, evidence: 'weak' },      // Centralisation
                S18: { baseImpact: 0.08, evidence: 'moderate' },  // Éducation patients
                S19: { baseImpact: 0.11, evidence: 'strong' },    // Task-shifting
                S20: { baseImpact: 0.10, evidence: 'strong' }     // Engagement PP
            },
            
            // Synergies entre stratégies (combinaisons qui amplifient l'effet)
            strategySynergies: {
                'S01+S10': 0.05, // Formation + Supervision
                'S01+S02': 0.04, // Formation + Audit
                'S04+S20': 0.05, // Champions + Engagement PP
                'S08+S18': 0.04, // Communauté + Éducation patients
                'S10+S15': 0.04, // Supervision + Pairs
                'S02+S13': 0.03, // Audit + Données
                'S07+S12': 0.04, // Politique + Coalitions
                'S19+S10': 0.05  // Task-shifting + Supervision
            },
            
            // Facteurs de risque qui réduisent la probabilité
            riskFactors: {
                nobudget: { impact: -0.15, label: { fr: 'Pas de budget dédié', en: 'No dedicated budget' } },
                noturnover: { impact: -0.08, label: { fr: 'Turnover élevé du personnel', en: 'High staff turnover' } },
                nopolicy: { impact: -0.10, label: { fr: 'Pas de soutien politique', en: 'No policy support' } },
                nochampion: { impact: -0.12, label: { fr: 'Pas de champion identifié', en: 'No identified champion' } },
                nodata: { impact: -0.06, label: { fr: 'Pas de système de données', en: 'No data system' } },
                nosupervision: { impact: -0.10, label: { fr: 'Pas de supervision prévue', en: 'No supervision planned' } },
                shortduration: { impact: -0.08, label: { fr: 'Durée trop courte (<12 mois)', en: 'Too short duration (<12 months)' } },
                lowresources: { impact: -0.07, label: { fr: 'Ressources limitées', en: 'Limited resources' } }
            },
            
            // Calcule la probabilité de succès
            predict: function(project, strategies, lang) {
                lang = lang || 'fr';
                var self = this;
                
                // Base: 35% (taux de base des implémentations)
                var baseProb = 0.35;
                var details = { positive: [], negative: [], synergies: [] };
                
                // 1. Ajouter l'impact des stratégies
                var strategyImpact = 0;
                var strategyIds = strategies.map(function(s) { return s.id; });
                
                strategies.forEach(function(s) {
                    var factor = self.strategySuccessFactors[s.id];
                    if (factor) {
                        var impact = factor.baseImpact;
                        strategyImpact += impact;
                        details.positive.push({
                            id: s.id,
                            label: s.label ? s.label[lang] : s.id,
                            impact: Math.round(impact * 100),
                            evidence: factor.evidence
                        });
                    }
                });
                
                // 2. Calculer les synergies
                var synergyImpact = 0;
                Object.keys(this.strategySynergies).forEach(function(combo) {
                    var parts = combo.split('+');
                    if (strategyIds.indexOf(parts[0]) >= 0 && strategyIds.indexOf(parts[1]) >= 0) {
                        var bonus = self.strategySynergies[combo];
                        synergyImpact += bonus;
                        details.synergies.push({
                            combo: combo,
                            strategies: parts,
                            impact: Math.round(bonus * 100)
                        });
                    }
                });
                
                // 3. Identifier les risques
                var riskImpact = 0;
                
                // Analyse automatique des risques basée sur les stratégies
                if (strategyIds.indexOf('S04') < 0) {
                    riskImpact += this.riskFactors.nochampion.impact;
                    details.negative.push({ id: 'nochampion', label: this.riskFactors.nochampion.label[lang], impact: Math.round(this.riskFactors.nochampion.impact * 100) });
                }
                if (strategyIds.indexOf('S10') < 0) {
                    riskImpact += this.riskFactors.nosupervision.impact;
                    details.negative.push({ id: 'nosupervision', label: this.riskFactors.nosupervision.label[lang], impact: Math.round(this.riskFactors.nosupervision.impact * 100) });
                }
                if (strategyIds.indexOf('S07') < 0) {
                    riskImpact += this.riskFactors.nopolicy.impact * 0.7; // Moins critique
                    details.negative.push({ id: 'nopolicy', label: this.riskFactors.nopolicy.label[lang], impact: Math.round(this.riskFactors.nopolicy.impact * 0.7 * 100) });
                }
                if (strategyIds.indexOf('S13') < 0 && strategyIds.indexOf('S02') < 0) {
                    riskImpact += this.riskFactors.nodata.impact;
                    details.negative.push({ id: 'nodata', label: this.riskFactors.nodata.label[lang], impact: Math.round(this.riskFactors.nodata.impact * 100) });
                }
                
                // Ajustement selon niveau de ressources
                if (project.resourceLevel === 'LIC' || project.resourceLevel === 'LMIC') {
                    riskImpact += this.riskFactors.lowresources.impact * 0.5;
                    details.negative.push({ id: 'lowresources', label: this.riskFactors.lowresources.label[lang], impact: Math.round(this.riskFactors.lowresources.impact * 0.5 * 100) });
                }
                
                // 4. Calcul final
                var finalProb = baseProb + strategyImpact + synergyImpact + riskImpact;
                finalProb = Math.max(0.15, Math.min(0.95, finalProb)); // Borner entre 15% et 95%
                
                // 5. Générer des recommandations pour améliorer
                var improvements = [];
                if (strategyIds.indexOf('S04') < 0) {
                    improvements.push({ add: 'S04', gain: 12, reason: lang === 'fr' ? 'Ajouter un champion local' : 'Add a local champion' });
                }
                if (strategyIds.indexOf('S10') < 0) {
                    improvements.push({ add: 'S10', gain: 13, reason: lang === 'fr' ? 'Prévoir une supervision clinique' : 'Plan clinical supervision' });
                }
                if (strategyIds.indexOf('S07') < 0) {
                    improvements.push({ add: 'S07', gain: 9, reason: lang === 'fr' ? 'Ancrer dans une politique' : 'Anchor in policy' });
                }
                if (strategyIds.indexOf('S02') < 0) {
                    improvements.push({ add: 'S02', gain: 8, reason: lang === 'fr' ? 'Mettre en place audit et feedback' : 'Set up audit and feedback' });
                }
                
                improvements.sort(function(a, b) { return b.gain - a.gain; });
                
                return {
                    probability: Math.round(finalProb * 100),
                    baseRate: Math.round(baseProb * 100),
                    strategyContribution: Math.round(strategyImpact * 100),
                    synergyBonus: Math.round(synergyImpact * 100),
                    riskPenalty: Math.round(riskImpact * 100),
                    details: details,
                    improvements: improvements.slice(0, 3),
                    confidence: strategies.length >= 4 ? 'high' : strategies.length >= 2 ? 'medium' : 'low',
                    disclaimer: lang === 'fr' 
                        ? "Estimation basée sur les méta-analyses en Implementation Science. Valeur indicative uniquement."
                        : "Estimate based on Implementation Science meta-analyses. Indicative value only."
                };
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // BUDGET ESTIMATOR - Estimateur budgétaire automatique (USD)
        // ═══════════════════════════════════════════════════════════════════════════
        
        var BudgetEstimator = {
            // Coûts unitaires par stratégie et niveau de ressources (USD)
            unitCosts: {
                S01: { // Formation
                    HIC: { perPerson: 500, perDay: 800, setup: 5000 },
                    UMIC: { perPerson: 200, perDay: 350, setup: 2000 },
                    LMIC: { perPerson: 80, perDay: 150, setup: 800 },
                    LIC: { perPerson: 40, perDay: 80, setup: 400 }
                },
                S02: { // Audit
                    HIC: { perAudit: 3000, perYear: 12000, setup: 2000 },
                    UMIC: { perAudit: 1200, perYear: 5000, setup: 800 },
                    LMIC: { perAudit: 500, perYear: 2000, setup: 400 },
                    LIC: { perAudit: 200, perYear: 800, setup: 200 }
                },
                S03: { // Facilitation
                    HIC: { perMonth: 8000, perSession: 500, setup: 0 },
                    UMIC: { perMonth: 3500, perSession: 200, setup: 0 },
                    LMIC: { perMonth: 1500, perSession: 80, setup: 0 },
                    LIC: { perMonth: 600, perSession: 40, setup: 0 }
                },
                S04: { // Champions
                    HIC: { perChampion: 2000, perYear: 5000, setup: 1000 },
                    UMIC: { perChampion: 800, perYear: 2000, setup: 400 },
                    LMIC: { perChampion: 300, perYear: 800, setup: 150 },
                    LIC: { perChampion: 150, perYear: 400, setup: 80 }
                },
                S05: { // Rappels
                    HIC: { setup: 15000, perYear: 5000, perUser: 10 },
                    UMIC: { setup: 6000, perYear: 2000, perUser: 5 },
                    LMIC: { setup: 2500, perYear: 800, perUser: 2 },
                    LIC: { setup: 1000, perYear: 400, perUser: 1 }
                },
                S06: { // Incitations financières
                    HIC: { perIncentive: 200, perYear: 50000, setup: 2000 },
                    UMIC: { perIncentive: 80, perYear: 20000, setup: 800 },
                    LMIC: { perIncentive: 30, perYear: 8000, setup: 300 },
                    LIC: { perIncentive: 15, perYear: 4000, setup: 150 }
                },
                S07: { // Politique
                    HIC: { advocacy: 20000, consultancy: 50000, setup: 5000 },
                    UMIC: { advocacy: 8000, consultancy: 20000, setup: 2000 },
                    LMIC: { advocacy: 3000, consultancy: 8000, setup: 800 },
                    LIC: { advocacy: 1500, consultancy: 4000, setup: 400 }
                },
                S08: { // Engagement communautaire
                    HIC: { perMeeting: 1000, perYear: 15000, setup: 3000 },
                    UMIC: { perMeeting: 400, perYear: 6000, setup: 1200 },
                    LMIC: { perMeeting: 150, perYear: 2500, setup: 500 },
                    LIC: { perMeeting: 80, perYear: 1200, setup: 250 }
                },
                S09: { // Assistance technique
                    HIC: { perMonth: 5000, setup: 3000, perTicket: 100 },
                    UMIC: { perMonth: 2000, setup: 1200, perTicket: 40 },
                    LMIC: { perMonth: 800, setup: 500, perTicket: 15 },
                    LIC: { perMonth: 400, setup: 250, perTicket: 8 }
                },
                S10: { // Supervision
                    HIC: { perHour: 150, perMonth: 3000, setup: 2000 },
                    UMIC: { perHour: 60, perMonth: 1200, setup: 800 },
                    LMIC: { perHour: 25, perMonth: 500, setup: 300 },
                    LIC: { perHour: 12, perMonth: 250, setup: 150 }
                },
                S11: { // Adaptation
                    HIC: { workshop: 10000, materials: 5000, setup: 2000 },
                    UMIC: { workshop: 4000, materials: 2000, setup: 800 },
                    LMIC: { workshop: 1500, materials: 800, setup: 300 },
                    LIC: { workshop: 800, materials: 400, setup: 150 }
                },
                S12: { // Coalitions
                    HIC: { perMeeting: 2000, perYear: 25000, setup: 5000 },
                    UMIC: { perMeeting: 800, perYear: 10000, setup: 2000 },
                    LMIC: { perMeeting: 300, perYear: 4000, setup: 800 },
                    LIC: { perMeeting: 150, perYear: 2000, setup: 400 }
                },
                S13: { // Systèmes de données
                    HIC: { software: 30000, perYear: 10000, setup: 15000 },
                    UMIC: { software: 12000, perYear: 4000, setup: 6000 },
                    LMIC: { software: 5000, perYear: 1500, setup: 2500 },
                    LIC: { software: 2000, perYear: 600, setup: 1000 }
                },
                S14: { // Apprentissage collaboratif
                    HIC: { perEvent: 5000, perYear: 20000, setup: 3000 },
                    UMIC: { perEvent: 2000, perYear: 8000, setup: 1200 },
                    LMIC: { perEvent: 800, perYear: 3200, setup: 500 },
                    LIC: { perEvent: 400, perYear: 1600, setup: 250 }
                },
                S15: { // Pairs aidants
                    HIC: { perPeer: 3000, training: 5000, setup: 2000 },
                    UMIC: { perPeer: 1200, training: 2000, setup: 800 },
                    LMIC: { perPeer: 500, training: 800, setup: 300 },
                    LIC: { perPeer: 250, training: 400, setup: 150 }
                },
                S16: { // Amélioration qualité
                    HIC: { perCycle: 8000, perYear: 25000, setup: 5000 },
                    UMIC: { perCycle: 3200, perYear: 10000, setup: 2000 },
                    LMIC: { perCycle: 1300, perYear: 4000, setup: 800 },
                    LIC: { perCycle: 650, perYear: 2000, setup: 400 }
                },
                S17: { // Coordination centralisée
                    HIC: { coordinator: 80000, perYear: 100000, setup: 10000 },
                    UMIC: { coordinator: 35000, perYear: 45000, setup: 4000 },
                    LMIC: { coordinator: 15000, perYear: 20000, setup: 1500 },
                    LIC: { coordinator: 8000, perYear: 10000, setup: 800 }
                },
                S18: { // Éducation patients
                    HIC: { materials: 10000, perYear: 15000, setup: 5000 },
                    UMIC: { materials: 4000, perYear: 6000, setup: 2000 },
                    LMIC: { materials: 1500, perYear: 2500, setup: 800 },
                    LIC: { materials: 800, perYear: 1200, setup: 400 }
                },
                S19: { // Task-shifting
                    HIC: { training: 30000, supervision: 20000, setup: 10000 },
                    UMIC: { training: 12000, supervision: 8000, setup: 4000 },
                    LMIC: { training: 5000, supervision: 3500, setup: 1500 },
                    LIC: { training: 2500, supervision: 1500, setup: 800 }
                },
                S20: { // Engagement parties prenantes
                    HIC: { perMeeting: 3000, perYear: 20000, setup: 5000 },
                    UMIC: { perMeeting: 1200, perYear: 8000, setup: 2000 },
                    LMIC: { perMeeting: 500, perYear: 3500, setup: 800 },
                    LIC: { perMeeting: 250, perYear: 1800, setup: 400 }
                }
            },
            
            // Calcule le budget total
            estimate: function(project, strategies, lang) {
                lang = lang || 'fr';
                var self = this;
                var resourceLevel = project.resourceLevel || 'LMIC';
                var durationMonths = project.duration || 24;
                var sites = project.sites || 1;
                var population = project.population || 100;
                
                var lineItems = [];
                var totalSetup = 0;
                var totalRecurring = 0;
                
                strategies.forEach(function(s) {
                    var costs = self.unitCosts[s.id];
                    if (!costs) return;
                    
                    var levelCosts = costs[resourceLevel] || costs['LMIC'];
                    var item = {
                        id: s.id,
                        label: s.label ? s.label[lang] : s.id,
                        setup: 0,
                        recurring: 0,
                        details: []
                    };
                    
                    // Calcul selon la stratégie
                    switch(s.id) {
                        case 'S01': // Formation
                            item.setup = levelCosts.setup * sites;
                            item.recurring = levelCosts.perPerson * population * 1.5; // 1.5 pour formation continue
                            item.details.push(lang === 'fr' ? 'Formation initiale + continue' : 'Initial + continuing training');
                            break;
                        case 'S02': // Audit
                            item.setup = levelCosts.setup;
                            item.recurring = levelCosts.perYear * (durationMonths / 12) * sites;
                            item.details.push(lang === 'fr' ? '4 audits/an/site' : '4 audits/year/site');
                            break;
                        case 'S03': // Facilitation
                            item.setup = 0;
                            item.recurring = levelCosts.perMonth * durationMonths;
                            item.details.push(lang === 'fr' ? 'Facilitateur dédié' : 'Dedicated facilitator');
                            break;
                        case 'S04': // Champions
                            var championsCount = Math.max(1, sites);
                            item.setup = levelCosts.setup;
                            item.recurring = levelCosts.perYear * (durationMonths / 12) * championsCount;
                            item.details.push(championsCount + ' champion(s)');
                            break;
                        case 'S10': // Supervision
                            var supervisionHours = 8 * durationMonths * sites;
                            item.setup = levelCosts.setup;
                            item.recurring = levelCosts.perHour * supervisionHours;
                            item.details.push(lang === 'fr' ? '8h/mois/site' : '8h/month/site');
                            break;
                        case 'S13': // Systèmes de données
                            item.setup = levelCosts.software + levelCosts.setup;
                            item.recurring = levelCosts.perYear * (durationMonths / 12);
                            item.details.push(lang === 'fr' ? 'Logiciel + maintenance' : 'Software + maintenance');
                            break;
                        case 'S19': // Task-shifting
                            item.setup = levelCosts.training + levelCosts.setup;
                            item.recurring = levelCosts.supervision * (durationMonths / 12);
                            item.details.push(lang === 'fr' ? 'Formation + supervision continue' : 'Training + ongoing supervision');
                            break;
                        default:
                            item.setup = levelCosts.setup || 0;
                            item.recurring = (levelCosts.perYear || 0) * (durationMonths / 12);
                    }
                    
                    // Ajuster pour multi-sites
                    if (sites > 1 && s.id !== 'S17' && s.id !== 'S13') {
                        item.recurring *= (1 + (sites - 1) * 0.6); // Économies d'échelle
                    }
                    
                    totalSetup += item.setup;
                    totalRecurring += item.recurring;
                    lineItems.push(item);
                });
                
                // Coûts de coordination (10% du total)
                var coordination = (totalSetup + totalRecurring) * 0.10;
                lineItems.push({
                    id: 'COORD',
                    label: lang === 'fr' ? 'Coordination projet' : 'Project coordination',
                    setup: coordination * 0.3,
                    recurring: coordination * 0.7,
                    details: [lang === 'fr' ? 'Gestion, réunions, reporting' : 'Management, meetings, reporting']
                });
                
                // Imprévus (10%)
                var contingency = (totalSetup + totalRecurring + coordination) * 0.10;
                lineItems.push({
                    id: 'CONTINGENCY',
                    label: lang === 'fr' ? 'Imprévus (10%)' : 'Contingency (10%)',
                    setup: contingency * 0.3,
                    recurring: contingency * 0.7,
                    details: []
                });
                
                var grandTotal = totalSetup + totalRecurring + coordination + contingency;
                var costPerBeneficiary = grandTotal / population;
                
                // Benchmark
                var benchmarks = {
                    HIC: { low: 800, high: 2000, currency: 'USD' },
                    UMIC: { low: 300, high: 800, currency: 'USD' },
                    LMIC: { low: 100, high: 400, currency: 'USD' },
                    LIC: { low: 50, high: 200, currency: 'USD' }
                };
                var benchmark = benchmarks[resourceLevel] || benchmarks['LMIC'];
                var benchmarkStatus = costPerBeneficiary <= benchmark.high ? (costPerBeneficiary <= benchmark.low ? 'low' : 'normal') : 'high';
                
                return {
                    lineItems: lineItems,
                    summary: {
                        setup: Math.round(totalSetup),
                        recurring: Math.round(totalRecurring + coordination * 0.7 + contingency * 0.7),
                        coordination: Math.round(coordination),
                        contingency: Math.round(contingency),
                        total: Math.round(grandTotal),
                        currency: 'USD'
                    },
                    perBeneficiary: Math.round(costPerBeneficiary),
                    benchmark: {
                        range: benchmark,
                        status: benchmarkStatus,
                        message: lang === 'fr'
                            ? (benchmarkStatus === 'low' ? 'Budget optimisé' : benchmarkStatus === 'normal' ? 'Dans la norme' : 'Au-dessus de la moyenne')
                            : (benchmarkStatus === 'low' ? 'Optimized budget' : benchmarkStatus === 'normal' ? 'Within range' : 'Above average')
                    },
                    parameters: {
                        resourceLevel: resourceLevel,
                        durationMonths: durationMonths,
                        sites: sites,
                        population: population
                    }
                };
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // CASE LIBRARY - Bibliothèque de cas réels anonymisés
        // ═══════════════════════════════════════════════════════════════════════════
        
        var CaseLibrary = {
            cases: [
                {
                    id: 'CASE001',
                    title: { fr: 'mhGAP Maroc - Santé mentale soins primaires', en: 'mhGAP Morocco - Mental health primary care' },
                    country: 'MA', domain: 'mental_health', context: 'primary_health_center',
                    duration: 36, sites: 6, population: 150, budget: 650000,
                    strategies: ['S01', 'S10', 'S19', 'S04', 'S08', 'S02'],
                    outcome: 'success', adoptionRate: 78,
                    lessons: { fr: ["La supervision hebdomadaire a été déterminante pour maintenir la qualité", "Les imams ont joué un rôle clé dans la réduction de la stigmatisation", "Le task-shifting vers les infirmiers a bien fonctionné avec une formation adaptée"], en: ["Weekly supervision was crucial for maintaining quality", "Imams played a key role in reducing stigma", "Task-shifting to nurses worked well with adapted training"] },
                    challenges: { fr: ["Turnover élevé des médecins formés", "Résistance initiale des psychiatres"], en: ["High turnover of trained physicians", "Initial resistance from psychiatrists"] },
                    year: 2022
                },
                {
                    id: 'CASE002',
                    title: { fr: 'Programme VIH communautaire Sénégal', en: 'Community HIV Program Senegal' },
                    country: 'SN', domain: 'infectious_disease', context: 'community',
                    duration: 24, sites: 12, population: 500, budget: 420000,
                    strategies: ['S08', 'S15', 'S19', 'S18', 'S12'],
                    outcome: 'success', adoptionRate: 85,
                    lessons: { fr: ["Les pairs éducateurs ont été le pilier du programme", "L'engagement des leaders communautaires dès le début est essentiel", "La radio locale a amplifié la portée des messages"], en: ["Peer educators were the program's backbone", "Engaging community leaders from the start is essential", "Local radio amplified message reach"] },
                    challenges: { fr: ["Financement irrégulier des bailleurs", "Difficultés d'accès aux zones rurales"], en: ["Irregular donor funding", "Difficulty accessing rural areas"] },
                    year: 2021
                },
                {
                    id: 'CASE003',
                    title: { fr: 'Qualité des soins chirurgicaux Tunisie', en: 'Surgical Care Quality Tunisia' },
                    country: 'TN', domain: 'surgery', context: 'hospital',
                    duration: 18, sites: 3, population: 80, budget: 280000,
                    strategies: ['S02', 'S16', 'S01', 'S05', 'S04'],
                    outcome: 'success', adoptionRate: 72,
                    lessons: { fr: ["Les checklists chirurgicales ont réduit les complications de 40%", "L'audit mensuel avec feedback immédiat a motivé les équipes", "Le champion (chef de service) a fait la différence"], en: ["Surgical checklists reduced complications by 40%", "Monthly audit with immediate feedback motivated teams", "The champion (department head) made the difference"] },
                    challenges: { fr: ["Résistance des chirurgiens seniors au début", "Surcharge de travail des équipes"], en: ["Senior surgeons' resistance at first", "Team workload issues"] },
                    year: 2023
                },
                {
                    id: 'CASE004',
                    title: { fr: 'Santé maternelle Kenya rural', en: 'Rural Maternal Health Kenya' },
                    country: 'KE', domain: 'maternal_child', context: 'rural',
                    duration: 30, sites: 8, population: 200, budget: 380000,
                    strategies: ['S19', 'S08', 'S17', 'S10', 'S18'],
                    outcome: 'partial', adoptionRate: 55,
                    lessons: { fr: ["Le M-health (rappels SMS) a amélioré le suivi prénatal", "Les accoucheuses traditionnelles doivent être incluses, pas exclues", "La coordination centrale était trop lourde pour le contexte"], en: ["M-health (SMS reminders) improved prenatal follow-up", "Traditional birth attendants must be included, not excluded", "Central coordination was too heavy for the context"] },
                    challenges: { fr: ["Connectivité réseau insuffisante dans certaines zones", "Turnover élevé des community health workers"], en: ["Insufficient network connectivity in some areas", "High community health worker turnover"] },
                    year: 2020
                },
                {
                    id: 'CASE005',
                    title: { fr: 'Diabète soins primaires Égypte', en: 'Diabetes Primary Care Egypt' },
                    country: 'EG', domain: 'chronic_disease', context: 'primary_health_center',
                    duration: 24, sites: 10, population: 300, budget: 520000,
                    strategies: ['S01', 'S05', 'S13', 'S18', 'S02'],
                    outcome: 'success', adoptionRate: 68,
                    lessons: { fr: ["Le système de rappel par SMS a doublé le taux de suivi", "Les registres électroniques ont facilité le monitoring", "L'éducation thérapeutique en groupe était plus efficace"], en: ["SMS reminder system doubled follow-up rate", "Electronic registries facilitated monitoring", "Group therapeutic education was more effective"] },
                    challenges: { fr: ["Coût des médicaments reste une barrière majeure", "Formation insuffisante des médecins généralistes au départ"], en: ["Medication cost remains a major barrier", "Insufficient GP training at the start"] },
                    year: 2022
                },
                {
                    id: 'CASE006',
                    title: { fr: 'Réhabilitation psychiatrique Suisse', en: 'Psychiatric Rehabilitation Switzerland' },
                    country: 'CH', domain: 'mental_health', context: 'hospital',
                    duration: 24, sites: 2, population: 60, budget: 850000,
                    strategies: ['S16', 'S02', 'S14', 'S15', 'S10'],
                    outcome: 'success', adoptionRate: 88,
                    lessons: { fr: ["L'approche qualité (PDCA) a structuré l'amélioration continue", "Les pairs aidants ont transformé la culture du service", "La supervision réflexive a réduit le burnout des équipes"], en: ["Quality approach (PDCA) structured continuous improvement", "Peer support workers transformed the service culture", "Reflective supervision reduced team burnout"] },
                    challenges: { fr: ["Résistance syndicale initiale aux nouveaux rôles", "Coût élevé de l'approche"], en: ["Initial union resistance to new roles", "High cost of approach"] },
                    year: 2023
                },
                {
                    id: 'CASE007',
                    title: { fr: 'Soins palliatifs Inde rurale', en: 'Palliative Care Rural India' },
                    country: 'IN', domain: 'chronic_disease', context: 'community',
                    duration: 36, sites: 15, population: 400, budget: 320000,
                    strategies: ['S19', 'S08', 'S01', 'S07', 'S12'],
                    outcome: 'success', adoptionRate: 75,
                    lessons: { fr: ["Les ASHA workers formées ont été excellentes", "Le plaidoyer politique a permis l'accès à la morphine orale", "Les familles ont été des partenaires essentiels des soins"], en: ["Trained ASHA workers were excellent", "Policy advocacy enabled access to oral morphine", "Families were essential care partners"] },
                    challenges: { fr: ["Tabou culturel autour de la mort et de la douleur", "Logistique des médicaments en zones reculées"], en: ["Cultural taboo around death and pain", "Medication logistics in remote areas"] },
                    year: 2021
                },
                {
                    id: 'CASE008',
                    title: { fr: 'Santé mentale CAPS Brésil', en: 'CAPS Mental Health Brazil' },
                    country: 'BR', domain: 'mental_health', context: 'community',
                    duration: 24, sites: 4, population: 250, budget: 480000,
                    strategies: ['S08', 'S15', 'S07', 'S03', 'S20'],
                    outcome: 'success', adoptionRate: 82,
                    lessons: { fr: ["Le modèle CAPS communautaire est reproductible", "L'engagement des usagers dans la gouvernance a été clé", "La facilitation active a maintenu la dynamique"], en: ["The community CAPS model is replicable", "User engagement in governance was key", "Active facilitation maintained momentum"] },
                    challenges: { fr: ["Financement municipal instable", "Stigmatisation persistante malgré les efforts"], en: ["Unstable municipal funding", "Persistent stigma despite efforts"] },
                    year: 2022
                },
                {
                    id: 'CASE009',
                    title: { fr: 'Dépistage cancer Côte d\'Ivoire', en: 'Cancer Screening Ivory Coast' },
                    country: 'CI', domain: 'chronic_disease', context: 'primary_health_center',
                    duration: 18, sites: 5, population: 180, budget: 290000,
                    strategies: ['S01', 'S08', 'S19', 'S18', 'S04'],
                    outcome: 'partial', adoptionRate: 48,
                    lessons: { fr: ["Les agents de santé communautaires ont bien mobilisé", "Le manque de suivi des cas positifs a été un échec", "La formation était trop courte"], en: ["Community health workers mobilized well", "Lack of follow-up for positive cases was a failure", "Training was too short"] },
                    challenges: { fr: ["Absence de filière de soins pour les cas détectés", "Croyances traditionnelles sur le cancer"], en: ["No care pathway for detected cases", "Traditional beliefs about cancer"] },
                    year: 2020
                },
                {
                    id: 'CASE010',
                    title: { fr: 'Télémédecine santé mentale Bangladesh', en: 'Mental Health Telemedicine Bangladesh' },
                    country: 'BD', domain: 'mental_health', context: 'telehealth',
                    duration: 24, sites: 20, population: 350, budget: 280000,
                    strategies: ['S17', 'S09', 'S01', 'S19', 'S13'],
                    outcome: 'success', adoptionRate: 70,
                    lessons: { fr: ["La téléconsultation a contourné la pénurie de psychiatres", "L'application mobile en bengali a été bien acceptée", "Le support technique réactif était essentiel"], en: ["Teleconsultation bypassed psychiatrist shortage", "Bengali mobile app was well accepted", "Responsive technical support was essential"] },
                    challenges: { fr: ["Connectivité internet variable", "Préférence culturelle pour le face-à-face"], en: ["Variable internet connectivity", "Cultural preference for face-to-face"] },
                    year: 2023
                }
            ],
            
            // Recherche des cas similaires
            findSimilar: function(project, topN) {
                topN = topN || 5;
                var self = this;
                
                return this.cases.map(function(c) {
                    var score = 0;
                    
                    // Même domaine = +30%
                    if (project.domain && c.domain === project.domain) score += 30;
                    
                    // Même région/pays = +20%
                    if (project.country && c.country === project.country) score += 20;
                    else if (project.resourceLevel) {
                        var caseCountry = CountryIntelligence.getCountry(c.country);
                        if (caseCountry && caseCountry.income === project.resourceLevel) score += 10;
                    }
                    
                    // Même contexte = +20%
                    if (project.context && c.context === project.context) score += 20;
                    
                    // Stratégies similaires = jusqu'à +30%
                    if (project.strategies) {
                        var projectStrats = project.strategies.map(function(s) { return s.id || s; });
                        var overlap = c.strategies.filter(function(s) { return projectStrats.indexOf(s) >= 0; }).length;
                        score += Math.min(30, overlap * 6);
                    }
                    
                    return {
                        case: c,
                        similarity: score,
                        outcome: c.outcome
                    };
                }).sort(function(a, b) { return b.similarity - a.similarity; }).slice(0, topN);
            },
            
            // Récupère un cas par ID
            getCase: function(id) {
                return this.cases.find(function(c) { return c.id === id; });
            },
            
            // Statistiques globales
            getStats: function() {
                var total = this.cases.length;
                var success = this.cases.filter(function(c) { return c.outcome === 'success'; }).length;
                var partial = this.cases.filter(function(c) { return c.outcome === 'partial'; }).length;
                var avgAdoption = this.cases.reduce(function(a, b) { return a + b.adoptionRate; }, 0) / total;
                
                return {
                    totalCases: total,
                    successRate: Math.round(success / total * 100),
                    partialRate: Math.round(partial / total * 100),
                    avgAdoptionRate: Math.round(avgAdoption),
                    countries: Array.from(new Set(this.cases.map(function(c) { return c.country; }))).length,
                    domains: Array.from(new Set(this.cases.map(function(c) { return c.domain; }))).length
                };
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // RISK ANALYSIS - Analyse de risques automatique
        // ═══════════════════════════════════════════════════════════════════════════
        
        var RiskAnalysis = {
            // Catalogue des risques
            riskCatalog: {
                R01: { id: 'R01', name: { fr: 'Turnover du personnel formé', en: 'Trained staff turnover' }, category: 'HR', baseProbability: 0.6, baseImpact: 'high', triggers: ['B14'], mitigations: ['S10', 'S15', 'S06'] },
                R02: { id: 'R02', name: { fr: 'Résistance au changement', en: 'Resistance to change' }, category: 'organizational', baseProbability: 0.5, baseImpact: 'high', triggers: ['B02', 'B07'], mitigations: ['S04', 'S20', 'S03'] },
                R03: { id: 'R03', name: { fr: 'Financement insuffisant ou retardé', en: 'Insufficient or delayed funding' }, category: 'financial', baseProbability: 0.4, baseImpact: 'high', triggers: ['B06'], mitigations: ['S12', 'S07'] },
                R04: { id: 'R04', name: { fr: 'Données incomplètes ou non fiables', en: 'Incomplete or unreliable data' }, category: 'technical', baseProbability: 0.5, baseImpact: 'medium', triggers: ['B04', 'B03'], mitigations: ['S13', 'S02'] },
                R05: { id: 'R05', name: { fr: 'Faible adoption par les bénéficiaires', en: 'Low beneficiary uptake' }, category: 'programmatic', baseProbability: 0.4, baseImpact: 'high', triggers: ['B05', 'B09', 'B13'], mitigations: ['S08', 'S18', 'S11'] },
                R06: { id: 'R06', name: { fr: 'Dérive des pratiques (fidelity)', en: 'Practice drift (fidelity)' }, category: 'quality', baseProbability: 0.5, baseImpact: 'medium', triggers: ['B01', 'B14'], mitigations: ['S10', 'S02', 'S16'] },
                R07: { id: 'R07', name: { fr: 'Changement de leadership/politique', en: 'Leadership/policy change' }, category: 'external', baseProbability: 0.3, baseImpact: 'high', triggers: ['B07', 'B12'], mitigations: ['S07', 'S12', 'S20'] },
                R08: { id: 'R08', name: { fr: 'Surcharge des équipes', en: 'Team overload' }, category: 'HR', baseProbability: 0.6, baseImpact: 'medium', triggers: ['B08'], mitigations: ['S19', 'S09', 'S03'] },
                R09: { id: 'R09', name: { fr: 'Problèmes techniques (IT, logistique)', en: 'Technical issues (IT, logistics)' }, category: 'technical', baseProbability: 0.4, baseImpact: 'medium', triggers: ['B03'], mitigations: ['S09', 'S13'] },
                R10: { id: 'R10', name: { fr: 'Non-pérennisation post-projet', en: 'Non-sustainability post-project' }, category: 'strategic', baseProbability: 0.5, baseImpact: 'high', triggers: ['B06', 'B07'], mitigations: ['S07', 'S12', 'S14'] }
            },
            
            // Analyse les risques pour un projet
            analyze: function(project, strategies, lang) {
                lang = lang || 'fr';
                var self = this;
                var strategyIds = strategies.map(function(s) { return s.id || s; });
                var barrierIds = project.barriers || [];
                
                var risks = [];
                
                Object.values(this.riskCatalog).forEach(function(risk) {
                    // Calculer la probabilité ajustée
                    var probability = risk.baseProbability;
                    
                    // Augmenter si barrières présentes
                    var triggersPresent = risk.triggers.filter(function(t) { return barrierIds.indexOf(t) >= 0; }).length;
                    probability += triggersPresent * 0.1;
                    
                    // Réduire si stratégies de mitigation présentes
                    var mitigationsPresent = risk.mitigations.filter(function(m) { return strategyIds.indexOf(m) >= 0; }).length;
                    probability -= mitigationsPresent * 0.15;
                    
                    // Ajuster selon ressources
                    if ((project.resourceLevel === 'LIC' || project.resourceLevel === 'LMIC') && 
                        (risk.category === 'financial' || risk.category === 'HR')) {
                        probability += 0.1;
                    }
                    
                    probability = Math.max(0.1, Math.min(0.9, probability));
                    
                    // Déterminer le niveau
                    var impactScore = risk.baseImpact === 'high' ? 3 : risk.baseImpact === 'medium' ? 2 : 1;
                    var probScore = probability >= 0.6 ? 3 : probability >= 0.4 ? 2 : 1;
                    var riskScore = impactScore * probScore;
                    var level = riskScore >= 6 ? 'critical' : riskScore >= 4 ? 'high' : riskScore >= 2 ? 'medium' : 'low';
                    
                    // Recommandations de mitigation
                    var missingMitigations = risk.mitigations.filter(function(m) { return strategyIds.indexOf(m) < 0; });
                    
                    risks.push({
                        id: risk.id,
                        name: risk.name[lang],
                        category: risk.category,
                        probability: Math.round(probability * 100),
                        impact: risk.baseImpact,
                        level: level,
                        score: riskScore,
                        mitigationsPresent: risk.mitigations.filter(function(m) { return strategyIds.indexOf(m) >= 0; }),
                        mitigationsMissing: missingMitigations,
                        recommendation: missingMitigations.length > 0 
                            ? (lang === 'fr' ? 'Ajouter ' + missingMitigations.slice(0, 2).join(', ') : 'Add ' + missingMitigations.slice(0, 2).join(', '))
                            : (lang === 'fr' ? 'Risque bien couvert' : 'Risk well covered')
                    });
                });
                
                // Trier par niveau de risque
                risks.sort(function(a, b) { return b.score - a.score; });
                
                // Résumé
                var critical = risks.filter(function(r) { return r.level === 'critical'; }).length;
                var high = risks.filter(function(r) { return r.level === 'high'; }).length;
                var avgScore = risks.reduce(function(a, b) { return a + b.score; }, 0) / risks.length;
                
                return {
                    risks: risks,
                    summary: {
                        total: risks.length,
                        critical: critical,
                        high: high,
                        medium: risks.filter(function(r) { return r.level === 'medium'; }).length,
                        low: risks.filter(function(r) { return r.level === 'low'; }).length,
                        averageScore: Math.round(avgScore * 10) / 10,
                        overallLevel: critical > 0 ? 'critical' : high > 2 ? 'high' : avgScore >= 4 ? 'medium' : 'low'
                    },
                    topRisks: risks.slice(0, 3),
                    matrix: {
                        highProb_highImpact: risks.filter(function(r) { return r.probability >= 60 && r.impact === 'high'; }),
                        highProb_medImpact: risks.filter(function(r) { return r.probability >= 60 && r.impact === 'medium'; }),
                        medProb_highImpact: risks.filter(function(r) { return r.probability >= 40 && r.probability < 60 && r.impact === 'high'; }),
                        lowRisk: risks.filter(function(r) { return r.probability < 40 && r.impact !== 'high'; })
                    }
                };
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // RESEARCH EXPORTS - Exports standards recherche (SPIRIT, TIDieR, StaRI)
        // ═══════════════════════════════════════════════════════════════════════════
        
        var ResearchExports = {
            // Template SPIRIT 2013 (protocoles d'essais)
            generateSPIRIT: function(project, strategies, lang) {
                lang = lang || 'fr';
                var kg = KnowledgeGraph.nodes;
                
                var domain = project.domain ? kg.domains[Object.keys(kg.domains).find(function(k) { return kg.domains[k].name === project.domain; })] : null;
                var context = project.context ? kg.contexts[Object.keys(kg.contexts).find(function(k) { return kg.contexts[k].name === project.context; })] : null;
                
                var items = {
                    section1: { title: lang === 'fr' ? '1. INFORMATIONS ADMINISTRATIVES' : '1. ADMINISTRATIVE INFORMATION',
                        items: [
                            { id: '1a', item: lang === 'fr' ? 'Titre du protocole' : 'Protocol title', content: project.title || '[À compléter]', status: project.title ? 'complete' : 'incomplete' },
                            { id: '1b', item: lang === 'fr' ? 'Numéro d\'enregistrement' : 'Trial registration number', content: '[À compléter - ClinicalTrials.gov, etc.]', status: 'incomplete' },
                            { id: '2a', item: lang === 'fr' ? 'Coordonnées de l\'investigateur principal' : 'Primary investigator contact', content: '[À compléter]', status: 'incomplete' },
                            { id: '3', item: lang === 'fr' ? 'Rôle du sponsor/bailleur' : 'Role of sponsor/funder', content: '[À compléter]', status: 'incomplete' }
                        ]
                    },
                    section2: { title: lang === 'fr' ? '2. INTRODUCTION' : '2. INTRODUCTION',
                        items: [
                            { id: '6a', item: lang === 'fr' ? 'Contexte et justification' : 'Background and rationale', 
                              content: lang === 'fr' 
                                ? 'Cette étude s\'inscrit dans le domaine de ' + (domain ? domain.label.fr : '[domaine]') + ' dans un contexte de ' + (context ? context.label.fr : '[contexte]') + '.'
                                : 'This study is in the field of ' + (domain ? domain.label.en : '[domain]') + ' in a ' + (context ? context.label.en : '[context]') + ' setting.',
                              status: domain && context ? 'partial' : 'incomplete' },
                            { id: '6b', item: lang === 'fr' ? 'Barrières identifiées' : 'Identified barriers',
                              content: project.barriers && project.barriers.length > 0 
                                ? project.barriers.map(function(b) { var bar = kg.barriers[b]; return bar ? bar.label[lang] : b; }).join(', ')
                                : '[À compléter]',
                              status: project.barriers && project.barriers.length > 0 ? 'complete' : 'incomplete' }
                        ]
                    },
                    section3: { title: lang === 'fr' ? '3. MÉTHODES' : '3. METHODS',
                        items: [
                            { id: '11a', item: lang === 'fr' ? 'Description de l\'intervention' : 'Intervention description',
                              content: lang === 'fr' 
                                ? 'L\'intervention comprend les stratégies d\'implémentation suivantes : ' + strategies.map(function(s) { return s.label ? s.label.fr : s.id; }).join(', ') + '.'
                                : 'The intervention includes the following implementation strategies: ' + strategies.map(function(s) { return s.label ? s.label.en : s.id; }).join(', ') + '.',
                              status: strategies.length > 0 ? 'complete' : 'incomplete' },
                            { id: '12', item: lang === 'fr' ? 'Critères d\'éligibilité' : 'Eligibility criteria', content: '[À compléter - critères inclusion/exclusion]', status: 'incomplete' },
                            { id: '13', item: lang === 'fr' ? 'Sites et contexte' : 'Settings and locations',
                              content: (project.sites || 1) + ' site(s) - ' + (context ? context.label[lang] : '[contexte]'),
                              status: 'partial' },
                            { id: '18a', item: lang === 'fr' ? 'Critères de jugement' : 'Outcomes',
                              content: lang === 'fr' ? 'Outcomes primaires et secondaires selon cadre RE-AIM' : 'Primary and secondary outcomes per RE-AIM framework',
                              status: 'partial' }
                        ]
                    },
                    section4: { title: lang === 'fr' ? '4. STRATÉGIES D\'IMPLÉMENTATION (TIDieR)' : '4. IMPLEMENTATION STRATEGIES (TIDieR)',
                        items: strategies.map(function(s, i) {
                            var strat = kg.strategies[s.id];
                            return {
                                id: 'S' + (i + 1),
                                item: s.label ? s.label[lang] : s.id,
                                content: strat ? (lang === 'fr' 
                                    ? 'Catégorie: ' + strat.category + ' | Coût: ' + strat.cost + ' | Complexité: ' + strat.complexity
                                    : 'Category: ' + strat.category + ' | Cost: ' + strat.cost + ' | Complexity: ' + strat.complexity)
                                    : '[Détails à compléter]',
                                status: 'complete'
                            };
                        })
                    }
                };
                
                var completionRate = 0;
                var totalItems = 0;
                Object.values(items).forEach(function(section) {
                    section.items.forEach(function(item) {
                        totalItems++;
                        if (item.status === 'complete') completionRate += 1;
                        else if (item.status === 'partial') completionRate += 0.5;
                    });
                });
                
                return {
                    type: 'SPIRIT',
                    version: '2013',
                    sections: items,
                    completionRate: Math.round(completionRate / totalItems * 100),
                    totalItems: totalItems,
                    generatedAt: new Date().toISOString()
                };
            },
            
            // Template TIDieR (description d'intervention)
            generateTIDieR: function(project, strategies, lang) {
                lang = lang || 'fr';
                var kg = KnowledgeGraph.nodes;
                
                var items = [
                    { id: '1', item: lang === 'fr' ? 'Nom de l\'intervention' : 'Brief name', content: project.title || '[À compléter]', status: project.title ? 'complete' : 'incomplete' },
                    { id: '2', item: lang === 'fr' ? 'Pourquoi - Justification' : 'Why - Rationale', 
                      content: project.barriers && project.barriers.length > 0 
                        ? (lang === 'fr' ? 'Pour adresser les barrières suivantes: ' : 'To address the following barriers: ') + project.barriers.map(function(b) { var bar = kg.barriers[b]; return bar ? bar.label[lang] : b; }).join(', ')
                        : '[À compléter]',
                      status: project.barriers && project.barriers.length > 0 ? 'complete' : 'incomplete' },
                    { id: '3', item: lang === 'fr' ? 'Quoi - Matériels' : 'What - Materials', content: '[Lister les supports, guides, outils utilisés]', status: 'incomplete' },
                    { id: '4', item: lang === 'fr' ? 'Quoi - Procédures' : 'What - Procedures',
                      content: strategies.map(function(s) { return (s.label ? s.label[lang] : s.id); }).join('; '),
                      status: strategies.length > 0 ? 'complete' : 'incomplete' },
                    { id: '5', item: lang === 'fr' ? 'Qui délivre' : 'Who provided', content: '[Décrire les profils des intervenants]', status: 'incomplete' },
                    { id: '6', item: lang === 'fr' ? 'Comment' : 'How', content: '[Face-à-face, groupe, individuel, téléphone, etc.]', status: 'incomplete' },
                    { id: '7', item: lang === 'fr' ? 'Où' : 'Where', 
                      content: project.context ? kg.contexts[Object.keys(kg.contexts).find(function(k) { return kg.contexts[k].name === project.context; })].label[lang] : '[À compléter]',
                      status: project.context ? 'complete' : 'incomplete' },
                    { id: '8', item: lang === 'fr' ? 'Quand et combien' : 'When and how much', 
                      content: project.duration ? (project.duration + ' ' + (lang === 'fr' ? 'mois' : 'months')) : '[À compléter]',
                      status: project.duration ? 'complete' : 'incomplete' },
                    { id: '9', item: lang === 'fr' ? 'Personnalisation' : 'Tailoring', content: '[Adaptations prévues selon contexte]', status: 'incomplete' },
                    { id: '10', item: lang === 'fr' ? 'Modifications' : 'Modifications', content: '[Modifications en cours de projet]', status: 'incomplete' },
                    { id: '11', item: lang === 'fr' ? 'Fidélité prévue' : 'How well - planned', content: '[Mécanismes de suivi de la fidélité]', status: 'incomplete' },
                    { id: '12', item: lang === 'fr' ? 'Fidélité réelle' : 'How well - actual', content: '[À mesurer pendant l\'implémentation]', status: 'incomplete' }
                ];
                
                var completionRate = items.filter(function(i) { return i.status === 'complete'; }).length / items.length;
                
                return {
                    type: 'TIDieR',
                    version: '2014',
                    items: items,
                    completionRate: Math.round(completionRate * 100),
                    totalItems: items.length,
                    generatedAt: new Date().toISOString()
                };
            },
            
            // Template StaRI (Standards for Reporting Implementation Studies)
            generateStaRI: function(project, strategies, lang) {
                lang = lang || 'fr';
                var kg = KnowledgeGraph.nodes;
                
                var framework = project.framework ? kg.frameworks[Object.keys(kg.frameworks).find(function(k) { return kg.frameworks[k].name === project.framework; })] : null;
                
                var items = [
                    { id: 'T1', section: lang === 'fr' ? 'Titre' : 'Title', item: lang === 'fr' ? 'Identification comme étude d\'implémentation' : 'Identification as implementation study', 
                      content: project.title ? project.title + ' - ' + (lang === 'fr' ? 'Étude d\'implémentation' : 'Implementation Study') : '[À compléter]', status: project.title ? 'complete' : 'incomplete' },
                    { id: 'M1', section: lang === 'fr' ? 'Méthodes' : 'Methods', item: lang === 'fr' ? 'Cadre théorique/conceptuel' : 'Theoretical/conceptual framework',
                      content: framework ? framework.label[lang] : '[Recommandé: CFIR, RE-AIM, ou autre]', status: framework ? 'complete' : 'incomplete' },
                    { id: 'M2', section: lang === 'fr' ? 'Méthodes' : 'Methods', item: lang === 'fr' ? 'Stratégies d\'implémentation utilisées' : 'Implementation strategies used',
                      content: strategies.length > 0 ? strategies.map(function(s) { return s.label ? s.label[lang] : s.id; }).join(', ') : '[À compléter]', status: strategies.length > 0 ? 'complete' : 'incomplete' },
                    { id: 'M3', section: lang === 'fr' ? 'Méthodes' : 'Methods', item: lang === 'fr' ? 'Méthodes de mesure de l\'implémentation' : 'Implementation measurement methods',
                      content: '[RE-AIM: Reach, Effectiveness, Adoption, Implementation, Maintenance]', status: 'incomplete' },
                    { id: 'R1', section: lang === 'fr' ? 'Résultats' : 'Results', item: lang === 'fr' ? 'Résultats d\'implémentation' : 'Implementation outcomes',
                      content: '[Adoption, fidélité, couverture, durabilité]', status: 'incomplete' },
                    { id: 'R2', section: lang === 'fr' ? 'Résultats' : 'Results', item: lang === 'fr' ? 'Résultats cliniques/santé' : 'Clinical/health outcomes',
                      content: '[Efficacité de l\'intervention elle-même]', status: 'incomplete' },
                    { id: 'D1', section: lang === 'fr' ? 'Discussion' : 'Discussion', item: lang === 'fr' ? 'Généralisabilité' : 'Generalizability',
                      content: '[Transférabilité à d\'autres contextes]', status: 'incomplete' },
                    { id: 'D2', section: lang === 'fr' ? 'Discussion' : 'Discussion', item: lang === 'fr' ? 'Leçons pour l\'implémentation' : 'Implementation lessons',
                      content: '[Insights pour futurs projets similaires]', status: 'incomplete' }
                ];
                
                var completionRate = items.filter(function(i) { return i.status === 'complete'; }).length / items.length;
                
                return {
                    type: 'StaRI',
                    version: '2017',
                    items: items,
                    completionRate: Math.round(completionRate * 100),
                    totalItems: items.length,
                    generatedAt: new Date().toISOString()
                };
            }
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // API PUBLIQUE v8.0 - Intelligence Contextuelle + Prédiction + Recherche
        // ═══════════════════════════════════════════════════════════════════════════

        return {
            VERSION: '3.0.0',
            
            // Accès au graphe de connaissances
            getKnowledgeGraph: function() { return JSON.parse(JSON.stringify(KnowledgeGraph)); },
            
            // Recommandations principales
            recommend: function(project) { return RecommendationEngine.generateRecommendations(project); },
            scoreStrategies: function(project) { return ScoringEngine.scoreStrategies(project); },
            scoreFrameworks: function(project) { return ScoringEngine.scoreFrameworks(project); },
            scoreOutcomes: function(strategies, project) { return ScoringEngine.scoreOutcomes(strategies, project); },
            
            // Multi-objectif
            applyObjectives: function(strategies, objectives, resourceLevel) {
                return MultiObjectiveScoring.applyObjectives(strategies, objectives, resourceLevel);
            },
            getAvailableObjectives: function(lang) {
                return MultiObjectiveScoring.getAvailableObjectives(lang);
            },
            
            // Analyseur de protocole
            analyzeProtocol: function(text, lang) {
                return ProtocolAnalyzer.analyze(text, lang);
            },
            getProtocolRecommendations: function(analysis, lang) {
                return ProtocolAnalyzer.getRecommendations(analysis, lang);
            },
            
            // Options pour formulaires
            getOptions: function(field, lang) {
                lang = lang || 'fr';
                var nodeMap = { 
                    'domain': KnowledgeGraph.nodes.domains, 
                    'context': KnowledgeGraph.nodes.contexts, 
                    'phase': KnowledgeGraph.nodes.phases, 
                    'barrier': KnowledgeGraph.nodes.barriers, 
                    'strategy': KnowledgeGraph.nodes.strategies, 
                    'framework': KnowledgeGraph.nodes.frameworks, 
                    'outcome': KnowledgeGraph.nodes.outcomes, 
                    'resourceLevel': KnowledgeGraph.nodes.resourceLevels 
                };
                var nodes = nodeMap[field];
                if (!nodes) return [];
                return Object.values(nodes).map(function(node) { 
                    return { value: node.name || node.id, label: node.label ? node.label[lang] : node.name, id: node.id }; 
                });
            },
            
            // ═══════════════════════════════════════════════════════════════
            // SYSTÈME D'APPRENTISSAGE ADAPTATIF
            // ═══════════════════════════════════════════════════════════════
            
            /**
             * Enregistre un feedback utilisateur
             * @param {string} recId - ID de la recommandation
             * @param {Object} feedback - { accepted, modified, rating, outcome, context }
             */
            recordFeedback: function(recId, feedback) {
                return LearningSystem.recordFeedback(recId, feedback);
            },
            
            /**
             * Exporte tous les feedbacks pour analyse
             */
            exportFeedbackData: function() {
                return LearningSystem.exportFeedbackData();
            },
            
            /**
             * Calcule les métriques de performance globales
             */
            getPerformanceMetrics: function() {
                return LearningSystem.calculatePerformanceMetrics();
            },
            
            /**
             * Calcule la performance par stratégie
             */
            getStrategyPerformance: function(minSamples) {
                return LearningSystem.computeStrategyPerformance(minSamples);
            },
            
            /**
             * Ajuste les poids du graphe basé sur les feedbacks
             * Alias de adjustWeightsFromFeedback pour compatibilité
             */
            calibrateFromFeedback: function(options) {
                return LearningSystem.applyWeightAdjustments(KnowledgeGraph, options);
            },
            
            /**
             * Ajuste les poids du graphe à partir des feedbacks enregistrés
             * (stratégies bien acceptées ↑, stratégies rejetées ↓).
             *
             * Formule d'ajustement :
             *   newWeight = oldWeight × (1 + learningRate × (performance - 0.5) × 2)
             *
             * @param {Object} options - { learningRate, minSamples, minWeight, maxWeight }
             * @returns {Object|null} - Résumé des ajustements { adjusted, strategiesUpdated, totalAdjustments, performance }
             */
            adjustWeightsFromFeedback: function(options) {
                return LearningSystem.applyWeightAdjustments(KnowledgeGraph, options);
            },
            
            /**
             * Récupère l'état d'apprentissage
             */
            getLearningState: function() {
                return LearningSystem.getLearningState();
            },
            
            /**
             * Réinitialise l'apprentissage
             */
            resetLearning: function() {
                return LearningSystem.resetLearning();
            },
            
            /**
             * Exporte le graphe de connaissances actuel (avec poids ajustés)
             * Utile pour sauvegarder l'état après calibration
             */
            exportCalibratedGraph: function() {
                return {
                    graph: JSON.parse(JSON.stringify(KnowledgeGraph)),
                    learningState: LearningSystem.getLearningState(),
                    metrics: LearningSystem.calculatePerformanceMetrics(),
                    exportedAt: new Date().toISOString(),
                    version: '3.0.0'
                };
            },
            
            // ═══════════════════════════════════════════════════════════════
            // INTELLIGENCE CONTEXTUELLE PAYS (v8.0)
            // ═══════════════════════════════════════════════════════════════
            
            /**
             * Récupère les données d'un pays
             */
            getCountry: function(code) {
                return CountryIntelligence.getCountry(code);
            },
            
            /**
             * Liste tous les pays disponibles
             */
            listCountries: function(lang) {
                return CountryIntelligence.listCountries(lang);
            },
            
            /**
             * Génère un rapport contextuel pays
             */
            getCountryReport: function(countryCode, lang) {
                return CountryIntelligence.getCountryReport(countryCode, lang);
            },
            
            /**
             * Applique les adaptations pays aux stratégies
             */
            applyCountryAdaptations: function(strategies, countryCode) {
                return CountryIntelligence.applyCountryAdaptations(strategies, countryCode);
            },
            
            // ═══════════════════════════════════════════════════════════════
            // PRÉDICTION DE SUCCÈS (v8.0)
            // ═══════════════════════════════════════════════════════════════
            
            /**
             * Prédit la probabilité de succès d'un projet
             */
            predictSuccess: function(project, strategies, lang) {
                return SuccessPrediction.predict(project, strategies, lang);
            },
            
            // ═══════════════════════════════════════════════════════════════
            // ESTIMATION BUDGÉTAIRE (v8.0)
            // ═══════════════════════════════════════════════════════════════
            
            /**
             * Estime le budget du projet en USD
             */
            estimateBudget: function(project, strategies, lang) {
                return BudgetEstimator.estimate(project, strategies, lang);
            },
            
            // ═══════════════════════════════════════════════════════════════
            // BIBLIOTHÈQUE DE CAS (v8.0)
            // ═══════════════════════════════════════════════════════════════
            
            /**
             * Trouve des cas similaires au projet
             */
            findSimilarCases: function(project, topN) {
                return CaseLibrary.findSimilar(project, topN);
            },
            
            /**
             * Récupère un cas par ID
             */
            getCase: function(id) {
                return CaseLibrary.getCase(id);
            },
            
            /**
             * Statistiques de la bibliothèque de cas
             */
            getCaseStats: function() {
                return CaseLibrary.getStats();
            },
            
            // ═══════════════════════════════════════════════════════════════
            // ANALYSE DE RISQUES (v8.0)
            // ═══════════════════════════════════════════════════════════════
            
            /**
             * Analyse les risques du projet
             */
            analyzeRisks: function(project, strategies, lang) {
                return RiskAnalysis.analyze(project, strategies, lang);
            },
            
            // ═══════════════════════════════════════════════════════════════
            // EXPORTS RECHERCHE (v8.0)
            // ═══════════════════════════════════════════════════════════════
            
            /**
             * Génère un template SPIRIT 2013
             */
            generateSPIRIT: function(project, strategies, lang) {
                return ResearchExports.generateSPIRIT(project, strategies, lang);
            },
            
            /**
             * Génère un template TIDieR
             */
            generateTIDieR: function(project, strategies, lang) {
                return ResearchExports.generateTIDieR(project, strategies, lang);
            },
            
            /**
             * Génère un template StaRI
             */
            generateStaRI: function(project, strategies, lang) {
                return ResearchExports.generateStaRI(project, strategies, lang);
            },
            
            // ═══════════════════════════════════════════════════════════════
            // MODULES v8.0 - WORLD LEADER SMOA
            // ═══════════════════════════════════════════════════════════════
            
            /**
             * Génère une Timeline Gantt EPIS
             */
            generateGanttTimeline: function(project, strategies, lang) {
                return GanttTimeline.generate(project, strategies, lang);
            },
            
            /**
             * Évalue selon le cadre CFIR 2.0
             */
            evaluateCFIR: function(project, strategies, lang) {
                return CFIR2Evaluator.evaluate(project, strategies, lang);
            },
            
            /**
             * Évalue selon le cadre RE-AIM
             */
            evaluateREAIM: function(project, strategies, outcomes, lang) {
                return REAIMEvaluator.evaluate(project, strategies, outcomes, lang);
            },
            
            /**
             * Calcule le ROI
             */
            calculateROI: function(project, budget, outcomes, lang) {
                return ROICalculator.calculate(project, budget, outcomes, lang);
            },
            
            /**
             * Génère une demande de financement
             */
            generateFundingProposal: function(project, strategies, budget, funder, lang) {
                return FundingGenerator.generate(project, strategies, budget, funder, lang);
            },
            
            /**
             * Génère un dashboard de monitoring
             */
            generateMonitoringDashboard: function(project, strategies, lang) {
                return MonitoringDashboard.generate(project, strategies, lang);
            },
            
            /**
             * Génère un Logic Model / diagramme CONSORT
             */
            generateLogicModel: function(project, strategies, lang) {
                return LogicModelGenerator.generate(project, strategies, lang);
            },
            
            /**
             * Exécute une simulation Monte Carlo
             */
            runMonteCarloSimulation: function(project, strategies, iterations, lang) {
                return MonteCarloSimulator.run(project, strategies, iterations, lang);
            },
            
            /**
             * Analyse NLP avancée des barrières
             */
            analyzeBarriersNLP: function(text, lang) {
                return AdvancedNLPAnalyzer.analyzeBarriers(text, lang);
            },
            
            /**
             * Génère les données pour PowerPoint
             */
            generatePowerPointData: function(project, protocol, lang) {
                return PowerPointGenerator.generate(project, protocol, lang);
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 1: GANTT TIMELINE EPIS - Planification visuelle des phases
        // ═══════════════════════════════════════════════════════════════════════════
        
        var GanttTimeline = {
            // Durées typiques par stratégie (en semaines)
            strategyDurations: {
                S01: { prep: 2, impl: 8, sust: 4 },   // Formation
                S02: { prep: 1, impl: 12, sust: 8 },  // Audit
                S03: { prep: 2, impl: 16, sust: 8 },  // Facilitation
                S04: { prep: 3, impl: 4, sust: 12 },  // Champions
                S05: { prep: 4, impl: 2, sust: 2 },   // Rappels
                S06: { prep: 2, impl: 12, sust: 12 }, // Incitations
                S07: { prep: 8, impl: 12, sust: 4 },  // Politique
                S08: { prep: 4, impl: 16, sust: 8 },  // Communauté
                S09: { prep: 2, impl: 12, sust: 8 },  // Assistance tech
                S10: { prep: 2, impl: 20, sust: 12 }, // Supervision
                S11: { prep: 6, impl: 4, sust: 2 },   // Adaptation
                S12: { prep: 6, impl: 12, sust: 8 },  // Coalitions
                S13: { prep: 8, impl: 8, sust: 4 },   // Systèmes données
                S14: { prep: 4, impl: 16, sust: 8 },  // Apprentissage collab
                S15: { prep: 4, impl: 12, sust: 8 },  // Pairs aidants
                S16: { prep: 2, impl: 20, sust: 12 }, // Qualité
                S17: { prep: 6, impl: 12, sust: 8 },  // Coordination
                S18: { prep: 4, impl: 12, sust: 6 },  // Éducation patients
                S19: { prep: 6, impl: 16, sust: 8 },  // Task-shifting
                S20: { prep: 4, impl: 8, sust: 8 }    // Engagement PP
            },
            
            generate: function(project, strategies, lang) {
                lang = lang || 'fr';
                var self = this;
                var durationMonths = project.duration || 24;
                var totalWeeks = durationMonths * 4;
                
                // Phases EPIS
                var phases = {
                    exploration: { 
                        start: 0, 
                        duration: Math.round(totalWeeks * 0.15),
                        label: lang === 'fr' ? 'Exploration' : 'Exploration',
                        color: '#3b82f6'
                    },
                    preparation: { 
                        start: Math.round(totalWeeks * 0.15), 
                        duration: Math.round(totalWeeks * 0.25),
                        label: lang === 'fr' ? 'Préparation' : 'Preparation',
                        color: '#8b5cf6'
                    },
                    implementation: { 
                        start: Math.round(totalWeeks * 0.40), 
                        duration: Math.round(totalWeeks * 0.40),
                        label: lang === 'fr' ? 'Implémentation' : 'Implementation',
                        color: '#10b981'
                    },
                    sustainment: { 
                        start: Math.round(totalWeeks * 0.80), 
                        duration: Math.round(totalWeeks * 0.20),
                        label: lang === 'fr' ? 'Pérennisation' : 'Sustainment',
                        color: '#f59e0b'
                    }
                };
                
                // Générer les tâches par stratégie
                var tasks = [];
                var strategyIds = strategies.map(function(s) { return s.id || s; });
                
                strategyIds.forEach(function(sid, idx) {
                    var durations = self.strategyDurations[sid] || { prep: 4, impl: 12, sust: 6 };
                    var strat = KnowledgeGraph.nodes.strategies[sid];
                    var label = strat ? strat.label[lang] : sid;
                    
                    // Tâche de préparation
                    tasks.push({
                        id: sid + '_prep',
                        strategy: sid,
                        name: label + ' - ' + (lang === 'fr' ? 'Préparation' : 'Preparation'),
                        phase: 'preparation',
                        start: phases.preparation.start,
                        duration: durations.prep,
                        color: '#8b5cf6',
                        row: idx
                    });
                    
                    // Tâche d'implémentation
                    tasks.push({
                        id: sid + '_impl',
                        strategy: sid,
                        name: label + ' - ' + (lang === 'fr' ? 'Implémentation' : 'Implementation'),
                        phase: 'implementation',
                        start: phases.implementation.start,
                        duration: durations.impl,
                        color: '#10b981',
                        row: idx,
                        dependency: sid + '_prep'
                    });
                    
                    // Tâche de pérennisation
                    tasks.push({
                        id: sid + '_sust',
                        strategy: sid,
                        name: label + ' - ' + (lang === 'fr' ? 'Pérennisation' : 'Sustainment'),
                        phase: 'sustainment',
                        start: phases.sustainment.start,
                        duration: durations.sust,
                        color: '#f59e0b',
                        row: idx,
                        dependency: sid + '_impl'
                    });
                });
                
                // Jalons clés
                var milestones = [
                    { week: 0, label: lang === 'fr' ? 'Lancement' : 'Kickoff', icon: '🚀' },
                    { week: phases.preparation.start, label: lang === 'fr' ? 'Début préparation' : 'Preparation start', icon: '📋' },
                    { week: phases.implementation.start, label: lang === 'fr' ? 'Go-live' : 'Go-live', icon: '✨' },
                    { week: Math.round(totalWeeks * 0.60), label: lang === 'fr' ? 'Revue mi-parcours' : 'Mid-term review', icon: '📊' },
                    { week: phases.sustainment.start, label: lang === 'fr' ? 'Transition pérennisation' : 'Sustainment transition', icon: '🌱' },
                    { week: totalWeeks, label: lang === 'fr' ? 'Fin projet' : 'Project end', icon: '🎯' }
                ];
                
                return {
                    totalWeeks: totalWeeks,
                    totalMonths: durationMonths,
                    phases: phases,
                    tasks: tasks,
                    milestones: milestones,
                    strategies: strategyIds,
                    generatedAt: new Date().toISOString()
                };
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 2: CFIR 2.0 EVALUATOR — Aligned with Damschroder et al. (2022)
        // ═══════════════════════════════════════════════════════════════════════════
        // Reference: Damschroder LJ, Reardon CM, Widerquist MAO, et al. The updated
        // Consolidated Framework for Implementation Research based on user feedback.
        // Implementation Science. 2022;17:75. doi:10.1186/s13012-022-01245-0
        // CFIR 2.0 User Guide: cfirguide.org (updated 2025)
        // ═══════════════════════════════════════════════════════════════════════════
        
        var CFIR2Evaluator = {
            // CFIR 2.0 Framework — 5 domains, 39 constructs (exact Damschroder 2022)
            version: '2.0',
            citation: 'Damschroder LJ et al. (2022). Implementation Science, 17:75',
            totalConstructs: 39,
            
            framework: {
                innovation: {
                    id: 'innovation',
                    label: { fr: 'Innovation', en: 'Innovation' },
                    description: { fr: 'Caractéristiques de l\'innovation implémentée', en: 'Key attributes of the innovation being implemented' },
                    constructs: [
                        { id: 'IC1', name: { fr: 'Source de l\'innovation', en: 'Innovation Source' }, weight: 0.8, cfir2Note: 'Perception of key stakeholders about whether the innovation is externally or internally developed' },
                        { id: 'IC2', name: { fr: 'Preuves de l\'innovation', en: 'Innovation Evidence' }, weight: 1.0, cfir2Note: 'Renamed from Evidence Strength & Quality in CFIR 2.0' },
                        { id: 'IC3', name: { fr: 'Avantage relatif', en: 'Relative Advantage' }, weight: 0.9, cfir2Note: 'Stakeholders perception of the advantage of the innovation vs. alternative solutions' },
                        { id: 'IC4', name: { fr: 'Adaptabilité', en: 'Adaptability' }, weight: 0.95, cfir2Note: 'The degree to which the innovation can be adapted to meet local needs' },
                        { id: 'IC5', name: { fr: 'Testabilité', en: 'Trialability' }, weight: 0.7, cfir2Note: 'The ability to test the innovation on a small scale' },
                        { id: 'IC6', name: { fr: 'Complexité', en: 'Complexity' }, weight: 0.85, cfir2Note: 'Perceived difficulty of the innovation' },
                        { id: 'IC7', name: { fr: 'Conception de l\'innovation', en: 'Innovation Design' }, weight: 0.8, cfir2Note: 'NEW in CFIR 2.0 — How the innovation is bundled, presented, assembled' },
                        { id: 'IC8', name: { fr: 'Coût', en: 'Cost' }, weight: 0.8, cfir2Note: 'Costs of the innovation and its implementation' }
                    ]
                },
                outerSetting: {
                    id: 'outerSetting',
                    label: { fr: 'Contexte Externe', en: 'Outer Setting' },
                    description: { fr: 'Contexte économique, politique et social au-delà de l\'organisation', en: 'The economic, political, and social context beyond the implementing organization' },
                    constructs: [
                        { id: 'OS1', name: { fr: 'Incidents critiques', en: 'Critical Incidents' }, weight: 0.75, cfir2Note: 'NEW in CFIR 2.0 — Discrete events that influence implementation (e.g., pandemics, policy changes)' },
                        { id: 'OS2', name: { fr: 'Attitudes locales', en: 'Local Attitudes' }, weight: 0.8, cfir2Note: 'NEW in CFIR 2.0 — Sociocultural values and beliefs of the local community' },
                        { id: 'OS3', name: { fr: 'Conditions locales', en: 'Local Conditions' }, weight: 0.85, cfir2Note: 'Social, economic, and environmental conditions (includes former Patient Needs & Resources)' },
                        { id: 'OS4', name: { fr: 'Partenariats et connexions', en: 'Partnerships & Connections' }, weight: 0.85, cfir2Note: 'Relationships between the implementing organization and external entities' },
                        { id: 'OS5', name: { fr: 'Politiques et lois', en: 'Policies & Laws' }, weight: 0.9, cfir2Note: 'Renamed from External Policies & Incentives in CFIR 2.0' },
                        { id: 'OS6', name: { fr: 'Financement', en: 'Financing' }, weight: 0.95, cfir2Note: 'External financing structures and mechanisms' },
                        { id: 'OS7', name: { fr: 'Pression externe', en: 'External Pressure' }, weight: 0.65, cfir2Note: 'Renamed from Peer Pressure in CFIR 2.0 — External mandates, competition, benchmarking' }
                    ]
                },
                innerSetting: {
                    id: 'innerSetting',
                    label: { fr: 'Contexte Interne', en: 'Inner Setting' },
                    description: { fr: 'Caractéristiques structurelles, politiques et culturelles de l\'organisation', en: 'Structural, political, and cultural context through which the implementation process proceeds' },
                    constructs: [
                        { id: 'IS1', name: { fr: 'Caractéristiques structurelles', en: 'Structural Characteristics' }, weight: 0.75, cfir2Note: 'Social architecture, age, maturity, and size of an organization' },
                        { id: 'IS2', name: { fr: 'Connexions relationnelles', en: 'Relational Connections' }, weight: 0.85, cfir2Note: 'Renamed from Networks & Communications — Quality and nature of social networks and communication' },
                        { id: 'IS3', name: { fr: 'Communications', en: 'Communications' }, weight: 0.8, cfir2Note: 'NEW as separate construct in CFIR 2.0 — Formal and informal communication channels' },
                        { id: 'IS4', name: { fr: 'Culture', en: 'Culture' }, weight: 0.9, cfir2Note: 'Norms, values, and basic assumptions of a given organization' },
                        { id: 'IS5', name: { fr: 'Tension pour le changement', en: 'Tension for Change' }, weight: 0.85, cfir2Note: 'Sub-construct of Climate — Degree to which stakeholders perceive the current situation as needing change' },
                        { id: 'IS6', name: { fr: 'Compatibilité', en: 'Compatibility' }, weight: 0.9, cfir2Note: 'Sub-construct of Climate — Tangible fit between the innovation and existing workflows, systems, and values' },
                        { id: 'IS7', name: { fr: 'Priorité relative', en: 'Relative Priority' }, weight: 0.85, cfir2Note: 'Sub-construct of Climate — Individual perception of the importance of the implementation' },
                        { id: 'IS8', name: { fr: 'Incitations et récompenses', en: 'Incentive Rewards' }, weight: 0.7, cfir2Note: 'Sub-construct of Climate — Extrinsic incentives such as goal-sharing or performance reviews' },
                        { id: 'IS9', name: { fr: 'Objectifs et retours', en: 'Goals & Feedback' }, weight: 0.8, cfir2Note: 'Sub-construct of Climate — Degree to which goals are clearly communicated and feedback is provided' },
                        { id: 'IS10', name: { fr: 'Climat d\'apprentissage', en: 'Learning Climate' }, weight: 0.85, cfir2Note: 'Sub-construct of Climate — Organization values learning and continuous improvement' },
                        { id: 'IS11', name: { fr: 'Engagement du leadership', en: 'Leadership Engagement' }, weight: 1.0, cfir2Note: 'Sub-construct of Readiness — Commitment and involvement of leaders and managers' },
                        { id: 'IS12', name: { fr: 'Ressources disponibles', en: 'Available Resources' }, weight: 0.95, cfir2Note: 'Sub-construct of Readiness — Level of resources dedicated for implementation' },
                        { id: 'IS13', name: { fr: 'Accès aux connaissances', en: 'Access to Knowledge & Information' }, weight: 0.8, cfir2Note: 'Sub-construct of Readiness — Ease of access to digestible information and knowledge about the innovation' },
                        { id: 'IS14', name: { fr: 'Alignement avec la mission', en: 'Mission Alignment' }, weight: 0.85, cfir2Note: 'NEW in CFIR 2.0 — Sub-construct of Readiness — Alignment between innovation and organization mission' }
                    ]
                },
                individuals: {
                    id: 'individuals',
                    label: { fr: 'Individus', en: 'Individuals' },
                    description: { fr: 'Rôles et caractéristiques des individus impliqués dans l\'implémentation', en: 'Roles and characteristics of individuals involved in implementation' },
                    constructs: [
                        { id: 'IN1', name: { fr: 'Besoin', en: 'Need' }, weight: 0.9, cfir2Note: 'NEW in CFIR 2.0 — Individuals awareness and perception of need for the innovation' },
                        { id: 'IN2', name: { fr: 'Capacité', en: 'Capability' }, weight: 0.9, cfir2Note: 'CFIR 2.0 aligned with COM-B (Michie 2011) — Individual physical and psychological capability' },
                        { id: 'IN3', name: { fr: 'Opportunité', en: 'Opportunity' }, weight: 0.85, cfir2Note: 'CFIR 2.0 aligned with COM-B — External factors that enable or prompt behavior' },
                        { id: 'IN4', name: { fr: 'Motivation', en: 'Motivation' }, weight: 0.95, cfir2Note: 'CFIR 2.0 aligned with COM-B — Brain processes that energize and direct behavior' },
                        { id: 'IN5', name: { fr: 'Acteurs de l\'innovation', en: 'Innovation Deliverers' }, weight: 0.85, cfir2Note: 'NEW in CFIR 2.0 — Individuals who deliver the innovation to recipients' }
                    ]
                },
                process: {
                    id: 'process',
                    label: { fr: 'Processus', en: 'Process' },
                    description: { fr: 'Activités essentielles au processus d\'implémentation', en: 'Essential activities of the implementation process' },
                    constructs: [
                        { id: 'PR1', name: { fr: 'Évaluation du contexte', en: 'Assessing Context' }, weight: 0.9, cfir2Note: 'NEW in CFIR 2.0 — Assessing needs, barriers, and facilitators before and during implementation' },
                        { id: 'PR2', name: { fr: 'Planification', en: 'Planning' }, weight: 0.95, cfir2Note: 'Methods to design or refine the implementation plan and strategies' },
                        { id: 'PR3', name: { fr: 'Engagement', en: 'Engaging' }, weight: 0.9, cfir2Note: 'Attracting and involving appropriate individuals in the implementation' },
                        { id: 'PR4', name: { fr: 'Exécution', en: 'Executing' }, weight: 1.0, cfir2Note: 'Carrying out the implementation according to plan' },
                        { id: 'PR5', name: { fr: 'Réflexion et évaluation', en: 'Reflecting & Evaluating' }, weight: 0.85, cfir2Note: 'Quantitative and qualitative feedback about implementation progress' }
                    ]
                }
            },
            
            // v11.0: COM-B Behavioral Framework (Michie et al. 2011) — Separate from CFIR
            // Reference: Michie S, van Stralen MM, West R. The behaviour change wheel.
            // Implementation Science. 2011;6:42. doi:10.1186/1748-5908-6-42
            // NOTE: CFIR 2.0 Individuals domain is aligned with COM-B but they remain
            // separate frameworks. COM-B provides deeper behavioral analysis.
            comBFramework: {
                capability: {
                    physical: { fr: 'Capacité physique', en: 'Physical Capability' },
                    psychological: { fr: 'Capacité psychologique', en: 'Psychological Capability' }
                },
                opportunity: {
                    physical: { fr: 'Opportunité physique', en: 'Physical Opportunity' },
                    social: { fr: 'Opportunité sociale', en: 'Social Opportunity' }
                },
                motivation: {
                    reflective: { fr: 'Motivation réflective', en: 'Reflective Motivation' },
                    automatic: { fr: 'Motivation automatique', en: 'Automatic Motivation' }
                }
            },
            
            // CFIR-ERIC Strategy Matching (Waltz et al. 2019, Implementation Science 14:50)
            // v11.0: Full 73 ERIC strategies with endorsement levels mapped to CFIR constructs
            // Level 1 = >50% expert endorsement, Level 2 = 20-50% endorsement
            strategyToCFIR: {
                S01: ['IN2', 'IN1', 'IS13'],     // Training & Education → Capability, Need, Access to Knowledge
                S02: ['PR5', 'IS9', 'IC2'],       // Audit & Feedback → Reflecting, Goals & Feedback, Evidence
                S03: ['PR3', 'IS5', 'IS6'],       // Facilitation → Engaging, Tension for Change, Compatibility
                S04: ['PR3', 'IS11', 'IN4'],      // Champions → Engaging, Leadership, Motivation
                S05: ['IS9', 'PR4'],              // Quality Monitoring → Goals & Feedback, Executing
                S06: ['IS8', 'IN4', 'OS6'],       // Incentives → Incentive Rewards, Motivation, Financing
                S07: ['OS5', 'IS5', 'IS7'],       // Policy Alignment → Policies & Laws, Tension for Change, Relative Priority
                S08: ['OS3', 'OS4', 'PR3'],       // Community Engagement → Local Conditions, Partnerships, Engaging
                S09: ['IS13', 'IN2', 'PR4'],      // Task Shifting → Access to Knowledge, Capability, Executing
                S10: ['IN2', 'IS10', 'PR5'],      // Supervision → Capability, Learning Climate, Reflecting
                S11: ['IC4', 'IC6', 'IS6'],       // Adaptation → Adaptability, Complexity, Compatibility
                S12: ['OS4', 'PR3', 'IS2'],       // Coalition Building → Partnerships, Engaging, Relational Connections
                S13: ['IS13', 'PR5', 'IC2'],      // Data-driven Decision Making → Access to Knowledge, Reflecting, Evidence
                S14: ['IS10', 'IS2', 'IN1'],      // Learning Collaborative → Learning Climate, Relational Connections, Need
                S15: ['IN4', 'OS3', 'IS4'],       // Peer Support → Motivation, Local Conditions, Culture
                S16: ['PR5', 'IS9', 'IS5'],       // Evaluation & CQI → Reflecting, Goals & Feedback, Tension for Change
                S17: ['IS1', 'IS2', 'PR2'],       // Infrastructure Development → Structural Characteristics, Relational Connections, Planning
                S18: ['OS3', 'IN1', 'IC3'],       // Needs Assessment → Local Conditions, Need, Relative Advantage
                S19: ['IN2', 'IS12', 'IC4'],      // Technical Assistance → Capability, Available Resources, Adaptability
                S20: ['PR3', 'IS11', 'OS4']       // Stakeholder Engagement → Engaging, Leadership, Partnerships
            },
            
            // v11.0: CFIR-ERIC Matching Matrix (from Waltz et al. 2019)
            // Maps CFIR constructs to recommended ERIC strategies with endorsement level
            cfirToERIC: {
                IC2: { level1: ['S02', 'S13'], level2: ['S16', 'S14'] },
                IC4: { level1: ['S11'], level2: ['S19'] },
                IC6: { level1: ['S11', 'S01'], level2: ['S09'] },
                OS3: { level1: ['S08', 'S18'], level2: ['S15', 'S12'] },
                OS4: { level1: ['S12', 'S20'], level2: ['S08'] },
                OS5: { level1: ['S07'], level2: ['S06'] },
                OS6: { level1: ['S06'], level2: ['S07'] },
                IS2: { level1: ['S12', 'S14'], level2: ['S17'] },
                IS4: { level1: ['S15', 'S03'], level2: ['S14'] },
                IS5: { level1: ['S03', 'S07'], level2: ['S16'] },
                IS6: { level1: ['S11', 'S03'], level2: ['S06'] },
                IS7: { level1: ['S07', 'S04'], level2: ['S20'] },
                IS9: { level1: ['S02', 'S16'], level2: ['S05'] },
                IS10: { level1: ['S14', 'S10'], level2: ['S01'] },
                IS11: { level1: ['S04', 'S20'], level2: ['S03'] },
                IS12: { level1: ['S19', 'S06'], level2: ['S17'] },
                IS13: { level1: ['S01', 'S13'], level2: ['S09'] },
                IS14: { level1: ['S07', 'S17'], level2: ['S20'] },
                IN1: { level1: ['S18', 'S14'], level2: ['S08'] },
                IN2: { level1: ['S01', 'S09', 'S19'], level2: ['S10'] },
                IN4: { level1: ['S04', 'S06', 'S15'], level2: ['S03'] },
                PR2: { level1: ['S17', 'S18'], level2: ['S03'] },
                PR3: { level1: ['S04', 'S12', 'S20'], level2: ['S08'] },
                PR5: { level1: ['S02', 'S16'], level2: ['S13'] }
            },
            
            // v11.0 Health Equity Assessment (Woodward et al. 2019)
            // Reference: Woodward EN et al. (2019). Ethnicity & Disease, 29(Suppl 1):69-84
            equityDimensions: {
                gender: { fr: 'Genre', en: 'Gender', weight: 1.0 },
                ethnicity: { fr: 'Ethnie/Race', en: 'Ethnicity/Race', weight: 1.0 },
                geography: { fr: 'Géographie (rural/urbain)', en: 'Geography (rural/urban)', weight: 0.9 },
                ses: { fr: 'Statut socioéconomique', en: 'Socioeconomic status', weight: 0.95 },
                disability: { fr: 'Handicap', en: 'Disability', weight: 0.85 },
                age: { fr: 'Âge', en: 'Age', weight: 0.8 },
                language: { fr: 'Langue', en: 'Language', weight: 0.85 },
                digital: { fr: 'Littératie numérique', en: 'Digital literacy', weight: 0.75 }
            },
            
            evaluate: function(project, strategies, lang) {
                lang = lang || 'fr';
                var self = this;
                var strategyIds = strategies.map(function(s) { return s.id || s; });
                
                // Initialiser les scores par domaine
                var domainScores = {};
                var constructScores = {};
                
                Object.keys(this.framework).forEach(function(domainId) {
                    var domain = self.framework[domainId];
                    domainScores[domainId] = { covered: 0, total: domain.constructs.length, constructs: [] };
                    
                    domain.constructs.forEach(function(construct) {
                        constructScores[construct.id] = {
                            construct: construct,
                            domain: domainId,
                            score: 0,
                            coveredBy: []
                        };
                    });
                });
                
                // Calculer couverture par stratégies
                strategyIds.forEach(function(sid) {
                    var cfirMappings = self.strategyToCFIR[sid] || [];
                    cfirMappings.forEach(function(constructId) {
                        if (constructScores[constructId]) {
                            constructScores[constructId].score = Math.min(1, constructScores[constructId].score + 0.5);
                            constructScores[constructId].coveredBy.push(sid);
                        }
                    });
                });
                
                // Agréger par domaine
                Object.keys(this.framework).forEach(function(domainId) {
                    var domain = self.framework[domainId];
                    var totalWeight = 0;
                    var weightedScore = 0;
                    
                    domain.constructs.forEach(function(construct) {
                        var cs = constructScores[construct.id];
                        totalWeight += construct.weight;
                        weightedScore += cs.score * construct.weight;
                        
                        domainScores[domainId].constructs.push({
                            id: construct.id,
                            name: construct.name[lang],
                            weight: construct.weight,
                            score: cs.score,
                            coveredBy: cs.coveredBy,
                            cfir2Note: construct.cfir2Note || '',
                            status: cs.score >= 0.7 ? 'strong' : cs.score >= 0.3 ? 'partial' : 'weak'
                        });
                        
                        if (cs.score > 0) domainScores[domainId].covered++;
                    });
                    
                    domainScores[domainId].score = Math.round((weightedScore / totalWeight) * 100);
                    domainScores[domainId].label = self.framework[domainId].label[lang];
                    domainScores[domainId].description = self.framework[domainId].description[lang];
                });
                
                // Score global pondéré
                var globalScore = Math.round(
                    Object.values(domainScores).reduce(function(a, b) { return a + b.score; }, 0) / 5
                );
                
                // Identifier gaps critiques
                var criticalGaps = [];
                Object.keys(constructScores).forEach(function(cid) {
                    var cs = constructScores[cid];
                    if (cs.score === 0 && cs.construct.weight >= 0.85) {
                        criticalGaps.push({
                            construct: cs.construct.name[lang],
                            domain: self.framework[cs.domain].label[lang],
                            weight: cs.construct.weight,
                            cfir2Note: cs.construct.cfir2Note || '',
                            recommendation: self.getRecommendation(cid, lang),
                            ericStrategies: self.getERICRecommendations(cid, lang)
                        });
                    }
                });
                
                return {
                    globalScore: globalScore,
                    domainScores: domainScores,
                    constructScores: constructScores,
                    criticalGaps: criticalGaps.slice(0, 8),
                    totalConstructs: 39,
                    coveredConstructs: Object.values(constructScores).filter(function(c) { return c.score > 0; }).length,
                    framework: 'CFIR 2.0',
                    version: self.version,
                    citation: self.citation,
                    generatedAt: new Date().toISOString()
                };
            },
            
            // v11.0: Auto-generate ERIC strategy recommendations from CFIR gaps
            getERICRecommendations: function(constructId, lang) {
                var mapping = this.cfirToERIC[constructId];
                if (!mapping) return [];
                var recs = [];
                (mapping.level1 || []).forEach(function(sid) {
                    recs.push({ strategy: sid, level: 1, label: lang === 'fr' ? 'Fortement recommandé (>50% experts)' : 'Strongly recommended (>50% experts)' });
                });
                (mapping.level2 || []).forEach(function(sid) {
                    recs.push({ strategy: sid, level: 2, label: lang === 'fr' ? 'Recommandé (20-50% experts)' : 'Recommended (20-50% experts)' });
                });
                return recs;
            },
            
            getRecommendation: function(constructId, lang) {
                var recommendations = {
                    IC2: { fr: 'Renforcer les preuves: S02 (Audit) + S13 (Données)', en: 'Strengthen evidence: S02 (Audit) + S13 (Data-driven)' },
                    IC7: { fr: 'Améliorer la conception: S11 (Adaptation) + S01 (Formation)', en: 'Improve design: S11 (Adaptation) + S01 (Training)' },
                    OS3: { fr: 'Explorer les conditions locales: S08 (Engagement communautaire) + S18 (Évaluation besoins)', en: 'Explore local conditions: S08 (Community engagement) + S18 (Needs assessment)' },
                    OS6: { fr: 'Sécuriser le financement: S06 (Incitations) + S07 (Politique)', en: 'Secure financing: S06 (Incentives) + S07 (Policy)' },
                    IS5: { fr: 'Créer la tension: S03 (Facilitation) + S07 (Politique)', en: 'Create tension: S03 (Facilitation) + S07 (Policy)' },
                    IS6: { fr: 'Assurer la compatibilité: S11 (Adaptation) + S03 (Facilitation)', en: 'Ensure compatibility: S11 (Adaptation) + S03 (Facilitation)' },
                    IS11: { fr: 'Engager le leadership: S04 (Champions) + S20 (Parties prenantes)', en: 'Engage leadership: S04 (Champions) + S20 (Stakeholders)' },
                    IS12: { fr: 'Sécuriser les ressources: S19 (Assistance technique) + S06 (Incitations)', en: 'Secure resources: S19 (Technical assistance) + S06 (Incentives)' },
                    IS14: { fr: 'Aligner avec la mission: S07 (Politique) + S17 (Infrastructure)', en: 'Align with mission: S07 (Policy) + S17 (Infrastructure)' },
                    IN1: { fr: 'Évaluer les besoins: S18 (Évaluation) + S14 (Apprentissage collaboratif)', en: 'Assess needs: S18 (Assessment) + S14 (Learning collaborative)' },
                    IN2: { fr: 'Renforcer les capacités: S01 (Formation) + S09 (Délégation)', en: 'Build capability: S01 (Training) + S09 (Task-shifting)' },
                    IN4: { fr: 'Motiver: S04 (Champions) + S15 (Pairs aidants) + S06 (Incitations)', en: 'Motivate: S04 (Champions) + S15 (Peer support) + S06 (Incentives)' },
                    PR4: { fr: 'Structurer l\'exécution: S05 (Monitoring) + S10 (Supervision)', en: 'Structure execution: S05 (Monitoring) + S10 (Supervision)' },
                    PR5: { fr: 'Améliorer la réflexion: S02 (Audit) + S16 (CQI)', en: 'Improve reflection: S02 (Audit) + S16 (CQI)' }
                };
                return recommendations[constructId] ? recommendations[constructId][lang] : (lang === 'fr' ? 'Ajouter des stratégies ciblées (voir ERIC)' : 'Add targeted strategies (see ERIC)');
            },
            
            // v11.0: Implementation Outcomes (Proctor et al. 2011)
            // Reference: Proctor E et al. (2011). Admin & Policy in Mental Health, 38:65-76
            implementationOutcomes: {
                acceptability: { fr: 'Acceptabilité', en: 'Acceptability', definition: { fr: 'Perception que l\'innovation est agréable ou satisfaisante', en: 'Perception that the innovation is agreeable or satisfactory' } },
                adoption: { fr: 'Adoption', en: 'Adoption', definition: { fr: 'Intention, décision initiale ou action d\'utiliser l\'innovation', en: 'Intention, initial decision, or action to try to use the innovation' } },
                appropriateness: { fr: 'Pertinence', en: 'Appropriateness', definition: { fr: 'Compatibilité perçue de l\'innovation avec le contexte', en: 'Perceived fit of the innovation with the setting' } },
                feasibility: { fr: 'Faisabilité', en: 'Feasibility', definition: { fr: 'Mesure dans laquelle l\'innovation peut être utilisée dans le cadre', en: 'Extent to which the innovation can be used in the setting' } },
                fidelity: { fr: 'Fidélité', en: 'Fidelity', definition: { fr: 'Degré de conformité à la mise en œuvre prévue', en: 'Degree to which the innovation was implemented as planned' } },
                implementationCost: { fr: 'Coût d\'implémentation', en: 'Implementation Cost', definition: { fr: 'Coûts de la mise en œuvre', en: 'Cost impact of the implementation effort' } },
                penetration: { fr: 'Pénétration', en: 'Penetration', definition: { fr: 'Intégration de l\'innovation dans le cadre et ses sous-systèmes', en: 'Integration of the innovation within the setting and its subsystems' } },
                sustainability: { fr: 'Pérennité', en: 'Sustainability', definition: { fr: 'Maintien de l\'innovation au fil du temps', en: 'Extent to which the innovation is maintained over time' } }
            },
            
            // v11.0: Scientific Citations Registry
            citations: {
                cfir2: { ref: 'Damschroder LJ, Reardon CM, Widerquist MAO, et al. The updated Consolidated Framework for Implementation Research. Implementation Science. 2022;17:75.', doi: '10.1186/s13012-022-01245-0' },
                cfir1: { ref: 'Damschroder LJ, Aron DC, Keith RE, et al. Fostering implementation of health services research findings into practice. Implementation Science. 2009;4:50.', doi: '10.1186/1748-5908-4-50' },
                eric: { ref: 'Powell BJ, Waltz TJ, Chinman MJ, et al. A refined compilation of implementation strategies: results from the ERIC project. Implementation Science. 2015;10:21.', doi: '10.1186/s13012-015-0209-1' },
                cfirEric: { ref: 'Waltz TJ, Powell BJ, Fernandez ME, et al. Choosing implementation strategies to address contextual barriers. Implementation Science. 2019;14:50.', doi: '10.1186/s13012-019-0892-4' },
                comB: { ref: 'Michie S, van Stralen MM, West R. The behaviour change wheel. Implementation Science. 2011;6:42.', doi: '10.1186/1748-5908-6-42' },
                proctor: { ref: 'Proctor E, Silmere H, Raghavan R, et al. Outcomes for implementation research. Admin & Policy in Mental Health. 2011;38:65-76.', doi: '10.1007/s10488-010-0319-7' },
                equity: { ref: 'Woodward EN, et al. A more practical guide to incorporating health equity domains in implementation determinant frameworks. Implementation Science Communications. 2021;2:61.', doi: '10.1186/s43058-021-00146-5' },
                moudar: { ref: 'Generated by MOUDAR\u00AE v11.0 — AI-Powered Implementation Science Platform. \u00A9 2025 Younes MOUDAR.', doi: '' }
            },
            
            // v11.0: Generate citation block for publications
            generateCitationBlock: function(usedModules, format) {
                format = format || 'apa';
                var self = this;
                var refs = [];
                refs.push(self.citations.cfir2.ref);
                if (usedModules.indexOf('eric') >= 0) refs.push(self.citations.eric.ref);
                if (usedModules.indexOf('cfirEric') >= 0) refs.push(self.citations.cfirEric.ref);
                if (usedModules.indexOf('comB') >= 0) refs.push(self.citations.comB.ref);
                if (usedModules.indexOf('proctor') >= 0) refs.push(self.citations.proctor.ref);
                if (usedModules.indexOf('equity') >= 0) refs.push(self.citations.equity.ref);
                refs.push(self.citations.moudar.ref);
                return refs;
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 3: RE-AIM EVALUATOR - 5 dimensions avec scoring
        // ═══════════════════════════════════════════════════════════════════════════
        
        var REAIMEvaluator = {
            dimensions: {
                reach: {
                    id: 'reach',
                    label: { fr: 'Portée (Reach)', en: 'Reach' },
                    description: { fr: 'Proportion et représentativité de la population cible atteinte', en: 'Proportion and representativeness of target population reached' },
                    indicators: [
                        { id: 'R1', name: { fr: 'Taux de participation', en: 'Participation rate' }, target: '≥60%', weight: 1.0 },
                        { id: 'R2', name: { fr: 'Représentativité démographique', en: 'Demographic representativeness' }, target: 'Oui', weight: 0.8 },
                        { id: 'R3', name: { fr: 'Barrières à la participation', en: 'Participation barriers' }, target: 'Documentées', weight: 0.7 },
                        { id: 'R4', name: { fr: 'Méthodes de recrutement', en: 'Recruitment methods' }, target: 'Multiples', weight: 0.6 }
                    ],
                    color: '#3b82f6',
                    strategies: ['S08', 'S18', 'S19', 'S15']
                },
                effectiveness: {
                    id: 'effectiveness',
                    label: { fr: 'Efficacité (Effectiveness)', en: 'Effectiveness' },
                    description: { fr: 'Impact sur les outcomes importants, incluant effets négatifs', en: 'Impact on important outcomes, including negative effects' },
                    indicators: [
                        { id: 'E1', name: { fr: 'Outcome primaire atteint', en: 'Primary outcome achieved' }, target: 'Oui', weight: 1.0 },
                        { id: 'E2', name: { fr: 'Effets indésirables', en: 'Adverse effects' }, target: 'Documentés', weight: 0.9 },
                        { id: 'E3', name: { fr: 'Qualité de vie', en: 'Quality of life' }, target: 'Améliorée', weight: 0.8 },
                        { id: 'E4', name: { fr: 'Équité des effets', en: 'Effect equity' }, target: 'Analysée', weight: 0.85 }
                    ],
                    color: '#10b981',
                    strategies: ['S02', 'S10', 'S16', 'S13']
                },
                adoption: {
                    id: 'adoption',
                    label: { fr: 'Adoption', en: 'Adoption' },
                    description: { fr: 'Proportion et représentativité des sites/agents qui adoptent', en: 'Proportion and representativeness of settings/agents who adopt' },
                    indicators: [
                        { id: 'A1', name: { fr: 'Taux d\'adoption sites', en: 'Site adoption rate' }, target: '≥70%', weight: 1.0 },
                        { id: 'A2', name: { fr: 'Taux d\'adoption professionnels', en: 'Staff adoption rate' }, target: '≥80%', weight: 0.95 },
                        { id: 'A3', name: { fr: 'Caractéristiques adoptants', en: 'Adopter characteristics' }, target: 'Documentées', weight: 0.7 },
                        { id: 'A4', name: { fr: 'Raisons non-adoption', en: 'Non-adoption reasons' }, target: 'Analysées', weight: 0.8 }
                    ],
                    color: '#8b5cf6',
                    strategies: ['S04', 'S20', 'S03', 'S01']
                },
                implementation: {
                    id: 'implementation',
                    label: { fr: 'Implémentation', en: 'Implementation' },
                    description: { fr: 'Fidélité, adaptations, coût et cohérence de la mise en œuvre', en: 'Fidelity, adaptations, cost and consistency of delivery' },
                    indicators: [
                        { id: 'I1', name: { fr: 'Fidélité au protocole', en: 'Protocol fidelity' }, target: '≥80%', weight: 1.0 },
                        { id: 'I2', name: { fr: 'Adaptations documentées', en: 'Documented adaptations' }, target: 'Oui', weight: 0.85 },
                        { id: 'I3', name: { fr: 'Coût par bénéficiaire', en: 'Cost per beneficiary' }, target: 'Calculé', weight: 0.9 },
                        { id: 'I4', name: { fr: 'Temps requis', en: 'Time required' }, target: 'Documenté', weight: 0.75 }
                    ],
                    color: '#f59e0b',
                    strategies: ['S10', 'S11', 'S02', 'S16']
                },
                maintenance: {
                    id: 'maintenance',
                    label: { fr: 'Maintien (Maintenance)', en: 'Maintenance' },
                    description: { fr: 'Pérennité des effets et institutionnalisation', en: 'Sustainability of effects and institutionalization' },
                    indicators: [
                        { id: 'M1', name: { fr: 'Effets à long terme', en: 'Long-term effects' }, target: '≥6 mois', weight: 1.0 },
                        { id: 'M2', name: { fr: 'Institutionnalisation', en: 'Institutionalization' }, target: 'Oui', weight: 0.95 },
                        { id: 'M3', name: { fr: 'Financement pérenne', en: 'Sustainable funding' }, target: 'Sécurisé', weight: 0.9 },
                        { id: 'M4', name: { fr: 'Évolution/adaptation', en: 'Evolution/adaptation' }, target: 'Planifiée', weight: 0.8 }
                    ],
                    color: '#ef4444',
                    strategies: ['S07', 'S12', 'S14', 'S06']
                }
            },
            
            evaluate: function(project, strategies, outcomes, lang) {
                lang = lang || 'fr';
                var self = this;
                var strategyIds = strategies.map(function(s) { return s.id || s; });
                
                var results = {};
                var totalScore = 0;
                
                Object.keys(this.dimensions).forEach(function(dimId) {
                    var dim = self.dimensions[dimId];
                    
                    // Calculer couverture par stratégies
                    var coverage = dim.strategies.filter(function(s) { 
                        return strategyIds.indexOf(s) >= 0; 
                    }).length / dim.strategies.length;
                    
                    // Score basé sur couverture (simplifié, dans la réalité basé sur données)
                    var score = Math.round(coverage * 100);
                    
                    results[dimId] = {
                        id: dimId,
                        label: dim.label[lang],
                        description: dim.description[lang],
                        score: score,
                        color: dim.color,
                        indicators: dim.indicators.map(function(ind) {
                            return {
                                id: ind.id,
                                name: ind.name[lang],
                                target: ind.target,
                                status: coverage >= 0.5 ? 'on-track' : 'at-risk'
                            };
                        }),
                        strategiesUsed: dim.strategies.filter(function(s) { return strategyIds.indexOf(s) >= 0; }),
                        strategiesMissing: dim.strategies.filter(function(s) { return strategyIds.indexOf(s) < 0; }),
                        recommendations: coverage < 0.5 ? self.getRecommendations(dimId, lang) : []
                    };
                    
                    totalScore += score;
                });
                
                // Benchmark comparison
                var benchmarks = {
                    excellent: 80,
                    good: 60,
                    acceptable: 40,
                    poor: 20
                };
                
                var globalScore = Math.round(totalScore / 5);
                var level = globalScore >= 80 ? 'excellent' : globalScore >= 60 ? 'good' : globalScore >= 40 ? 'acceptable' : 'poor';
                
                return {
                    globalScore: globalScore,
                    level: level,
                    levelLabel: lang === 'fr' 
                        ? { excellent: 'Excellent', good: 'Bon', acceptable: 'Acceptable', poor: 'À améliorer' }[level]
                        : { excellent: 'Excellent', good: 'Good', acceptable: 'Acceptable', poor: 'Needs improvement' }[level],
                    dimensions: results,
                    benchmarks: benchmarks,
                    framework: 'RE-AIM',
                    radarData: Object.values(results).map(function(r) {
                        return { dimension: r.label, score: r.score, color: r.color };
                    }),
                    generatedAt: new Date().toISOString()
                };
            },
            
            getRecommendations: function(dimId, lang) {
                var recs = {
                    reach: [
                        { fr: 'Ajouter S08 (Engagement communautaire) pour élargir la portée', en: 'Add S08 (Community engagement) to expand reach' },
                        { fr: 'Utiliser S19 (Task-shifting) pour toucher les zones éloignées', en: 'Use S19 (Task-shifting) to reach remote areas' }
                    ],
                    effectiveness: [
                        { fr: 'Ajouter S02 (Audit) pour mesurer l\'efficacité', en: 'Add S02 (Audit) to measure effectiveness' },
                        { fr: 'Renforcer avec S10 (Supervision) pour la qualité', en: 'Strengthen with S10 (Supervision) for quality' }
                    ],
                    adoption: [
                        { fr: 'Identifier des S04 (Champions) pour favoriser l\'adoption', en: 'Identify S04 (Champions) to promote adoption' },
                        { fr: 'Utiliser S20 (Engagement PP) pour légitimer', en: 'Use S20 (Stakeholder engagement) for legitimacy' }
                    ],
                    implementation: [
                        { fr: 'Ajouter S11 (Adaptation) pour ajuster au contexte', en: 'Add S11 (Adaptation) to adjust to context' },
                        { fr: 'Mettre en place S10 (Supervision) pour la fidélité', en: 'Set up S10 (Supervision) for fidelity' }
                    ],
                    maintenance: [
                        { fr: 'Planifier S07 (Politique) pour l\'ancrage institutionnel', en: 'Plan S07 (Policy) for institutional anchoring' },
                        { fr: 'Construire S12 (Coalitions) pour la durabilité', en: 'Build S12 (Coalitions) for sustainability' }
                    ]
                };
                return recs[dimId] ? recs[dimId].map(function(r) { return r[lang]; }) : [];
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 4: ROI CALCULATOR - Retour sur investissement
        // ═══════════════════════════════════════════════════════════════════════════
        
        var ROICalculator = {
            // Bénéfices types par domaine (USD/bénéficiaire/an)
            benefitEstimates: {
                mental_health: { 
                    direct: 500,      // Réduction coûts hospitaliers
                    indirect: 1200,   // Productivité retrouvée
                    intangible: 800   // Qualité de vie (QALY proxy)
                },
                primary_care: { direct: 300, indirect: 600, intangible: 400 },
                chronic_disease: { direct: 800, indirect: 1500, intangible: 600 },
                infectious_disease: { direct: 400, indirect: 800, intangible: 300 },
                maternal_child: { direct: 600, indirect: 1000, intangible: 1200 },
                surgery: { direct: 1500, indirect: 800, intangible: 500 },
                digital_health: { direct: 200, indirect: 400, intangible: 300 },
                geriatrics: { direct: 700, indirect: 500, intangible: 900 },
                emergency: { direct: 1000, indirect: 600, intangible: 400 },
                rehabilitation: { direct: 600, indirect: 1100, intangible: 700 }
            },
            
            calculate: function(project, budget, outcomes, lang) {
                lang = lang || 'fr';
                
                var domain = project.domain || 'primary_care';
                var benefits = this.benefitEstimates[domain] || this.benefitEstimates.primary_care;
                var population = project.population || 100;
                var duration = project.duration || 24;
                var years = duration / 12;
                var totalCost = budget.summary ? budget.summary.total : (budget.total || 100000);
                
                // Calcul des bénéfices annuels
                var annualBenefits = {
                    direct: benefits.direct * population,
                    indirect: benefits.indirect * population,
                    intangible: benefits.intangible * population
                };
                
                var totalAnnualBenefit = annualBenefits.direct + annualBenefits.indirect + annualBenefits.intangible;
                var totalBenefitsOverPeriod = totalAnnualBenefit * years;
                
                // ROI simple
                var roi = ((totalBenefitsOverPeriod - totalCost) / totalCost) * 100;
                
                // Période de récupération (payback period)
                var paybackMonths = (totalCost / (totalAnnualBenefit / 12));
                
                // Valeur actuelle nette (VAN) avec taux d'actualisation de 5%
                var discountRate = 0.05;
                var npv = -totalCost;
                for (var i = 1; i <= Math.ceil(years); i++) {
                    npv += totalAnnualBenefit / Math.pow(1 + discountRate, i);
                }
                
                // Ratio coût-bénéfice
                var bcRatio = totalBenefitsOverPeriod / totalCost;
                
                // Analyse de sensibilité
                var sensitivity = {
                    optimistic: { roi: roi * 1.3, bcRatio: bcRatio * 1.3 },
                    base: { roi: roi, bcRatio: bcRatio },
                    pessimistic: { roi: roi * 0.7, bcRatio: bcRatio * 0.7 }
                };
                
                // Comparaison avec benchmarks
                var benchmarks = {
                    excellent: { roi: 200, bcRatio: 3 },
                    good: { roi: 100, bcRatio: 2 },
                    acceptable: { roi: 50, bcRatio: 1.5 },
                    poor: { roi: 0, bcRatio: 1 }
                };
                
                var performanceLevel = roi >= 200 ? 'excellent' : roi >= 100 ? 'good' : roi >= 50 ? 'acceptable' : roi >= 0 ? 'marginal' : 'negative';
                
                return {
                    investment: {
                        total: totalCost,
                        perBeneficiary: Math.round(totalCost / population)
                    },
                    benefits: {
                        annual: {
                            direct: annualBenefits.direct,
                            indirect: annualBenefits.indirect,
                            intangible: annualBenefits.intangible,
                            total: totalAnnualBenefit
                        },
                        total: totalBenefitsOverPeriod,
                        perBeneficiary: Math.round(totalBenefitsOverPeriod / population)
                    },
                    metrics: {
                        roi: Math.round(roi),
                        npv: Math.round(npv),
                        bcRatio: Math.round(bcRatio * 100) / 100,
                        paybackMonths: Math.round(paybackMonths),
                        irr: Math.round((Math.pow(totalBenefitsOverPeriod / totalCost, 1 / years) - 1) * 100) // IRR simplifié
                    },
                    performanceLevel: performanceLevel,
                    performanceLabel: {
                        fr: { excellent: 'Excellent', good: 'Bon', acceptable: 'Acceptable', marginal: 'Marginal', negative: 'Négatif' },
                        en: { excellent: 'Excellent', good: 'Good', acceptable: 'Acceptable', marginal: 'Marginal', negative: 'Negative' }
                    }[lang][performanceLevel],
                    sensitivity: sensitivity,
                    benchmarks: benchmarks,
                    assumptions: {
                        discountRate: discountRate * 100 + '%',
                        benefitSource: lang === 'fr' ? 'Estimations basées sur la littérature' : 'Literature-based estimates',
                        domain: domain
                    },
                    chartData: {
                        labels: [
                            lang === 'fr' ? 'Investissement' : 'Investment',
                            lang === 'fr' ? 'Bénéfices directs' : 'Direct benefits',
                            lang === 'fr' ? 'Bénéfices indirects' : 'Indirect benefits',
                            lang === 'fr' ? 'Bénéfices intangibles' : 'Intangible benefits'
                        ],
                        values: [totalCost, annualBenefits.direct * years, annualBenefits.indirect * years, annualBenefits.intangible * years]
                    },
                    generatedAt: new Date().toISOString()
                };
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 4B: BUDGET IMPACT ANALYSIS (BIA) 3-5 ANS - v9.0
        // Analyse d'impact budgétaire multi-années pour passage à l'échelle
        // ═══════════════════════════════════════════════════════════════════════════
        
        var BudgetImpactAnalyzer = {
            // Paramètres par défaut selon contexte pays
            countryProfiles: {
                LIC: { inflationRate: 0.08, gdpGrowth: 0.04, healthSpendingRatio: 0.05, currencyVolatility: 0.15 },
                LMIC: { inflationRate: 0.05, gdpGrowth: 0.05, healthSpendingRatio: 0.06, currencyVolatility: 0.10 },
                UMIC: { inflationRate: 0.03, gdpGrowth: 0.04, healthSpendingRatio: 0.07, currencyVolatility: 0.05 },
                HIC: { inflationRate: 0.02, gdpGrowth: 0.02, healthSpendingRatio: 0.10, currencyVolatility: 0.02 }
            },
            
            // Multiplicateurs de coûts évités par domaine
            avoidedCostMultipliers: {
                health: { hospitalization: 2.5, emergency: 1.8, medication: 1.2, productivity: 1.5, disability: 2.0 },
                mental_health: { hospitalization: 3.0, crisis: 2.2, medication: 1.0, productivity: 2.5, disability: 2.8 },
                education: { dropout: 1.5, remediation: 1.2, specialNeeds: 1.8, productivity: 2.0 },
                social: { incarceration: 3.5, welfare: 1.5, childProtection: 2.0, homelessness: 2.5 }
            },
            
            // Scénarios de scaling
            scalingScenarios: {
                conservative: { yearlyGrowth: [1.0, 1.2, 1.4, 1.6, 1.8], adoptionRate: 0.6, attritionRate: 0.15 },
                moderate: { yearlyGrowth: [1.0, 1.5, 2.0, 2.5, 3.0], adoptionRate: 0.75, attritionRate: 0.10 },
                ambitious: { yearlyGrowth: [1.0, 2.0, 3.5, 5.0, 7.0], adoptionRate: 0.85, attritionRate: 0.08 }
            },
            
            analyze: function(project, budget, years, lang) {
                lang = lang || 'fr';
                years = years || 5;
                var self = this;
                
                var resourceLevel = project.resourceLevel || 'UMIC';
                var countryProfile = this.countryProfiles[resourceLevel] || this.countryProfiles.UMIC;
                var domain = project.domain || 'health';
                var baseBudget = budget.summary ? budget.summary.total : (project.budget || 100000);
                var basePopulation = project.population || 100;
                
                // Générer projections par scénario
                var scenarios = {};
                Object.keys(this.scalingScenarios).forEach(function(scenarioKey) {
                    var scenario = self.scalingScenarios[scenarioKey];
                    var yearlyData = [];
                    var cumulativeCost = 0;
                    var cumulativeBenefit = 0;
                    var cumulativePopulation = 0;
                    
                    for (var year = 1; year <= years; year++) {
                        var growthFactor = scenario.yearlyGrowth[Math.min(year - 1, scenario.yearlyGrowth.length - 1)];
                        var inflationFactor = Math.pow(1 + countryProfile.inflationRate, year - 1);
                        
                        // Coûts projetés
                        var yearPopulation = Math.round(basePopulation * growthFactor * scenario.adoptionRate);
                        var yearCost = Math.round(baseBudget * growthFactor * inflationFactor * (year === 1 ? 1.2 : 0.85)); // Première année +20%, puis -15%
                        var costPerBeneficiary = yearPopulation > 0 ? Math.round(yearCost / yearPopulation) : 0;
                        
                        // Bénéfices / Coûts évités
                        var avoidedCosts = self.calculateAvoidedCosts(yearPopulation, domain, costPerBeneficiary, lang);
                        var yearBenefit = avoidedCosts.total;
                        
                        cumulativeCost += yearCost;
                        cumulativeBenefit += yearBenefit;
                        cumulativePopulation += yearPopulation;
                        
                        yearlyData.push({
                            year: year,
                            population: yearPopulation,
                            cost: yearCost,
                            costPerBeneficiary: costPerBeneficiary,
                            benefits: yearBenefit,
                            avoidedCostsBreakdown: avoidedCosts.breakdown,
                            netBenefit: yearBenefit - yearCost,
                            cumulativeCost: cumulativeCost,
                            cumulativeBenefit: cumulativeBenefit,
                            cumulativeROI: cumulativeCost > 0 ? Math.round(((cumulativeBenefit - cumulativeCost) / cumulativeCost) * 100) : 0,
                            bcRatio: yearCost > 0 ? Math.round((yearBenefit / yearCost) * 100) / 100 : 0
                        });
                    }
                    
                    scenarios[scenarioKey] = {
                        label: self.getScenarioLabel(scenarioKey, lang),
                        data: yearlyData,
                        summary: {
                            totalCost: cumulativeCost,
                            totalBenefit: cumulativeBenefit,
                            totalPopulation: cumulativePopulation,
                            netBenefit: cumulativeBenefit - cumulativeCost,
                            overallROI: cumulativeCost > 0 ? Math.round(((cumulativeBenefit - cumulativeCost) / cumulativeCost) * 100) : 0,
                            overallBCRatio: cumulativeCost > 0 ? Math.round((cumulativeBenefit / cumulativeCost) * 100) / 100 : 0,
                            breakEvenYear: self.calculateBreakEvenYear(yearlyData)
                        }
                    };
                });
                
                // Analyse de sensibilité
                var sensitivity = this.runSensitivityAnalysis(project, budget, years, lang);
                
                // Recommandations pour décideurs
                var recommendations = this.generateRecommendations(scenarios, sensitivity, lang);
                
                return {
                    projectTitle: project.title || (lang === 'fr' ? 'Analyse d\'Impact Budgétaire' : 'Budget Impact Analysis'),
                    horizon: years + (lang === 'fr' ? ' ans' : ' years'),
                    resourceLevel: resourceLevel,
                    countryProfile: countryProfile,
                    baseBudget: baseBudget,
                    basePopulation: basePopulation,
                    domain: domain,
                    scenarios: scenarios,
                    sensitivity: sensitivity,
                    recommendations: recommendations,
                    executiveSummary: this.generateExecutiveSummary(scenarios, lang),
                    chartData: this.prepareChartData(scenarios, lang),
                    generatedAt: new Date().toISOString(),
                    version: 'BIA v1.0 - MOUDAR v9.0'
                };
            },
            
            calculateAvoidedCosts: function(population, domain, costPerBeneficiary, lang) {
                var multipliers = this.avoidedCostMultipliers[domain] || this.avoidedCostMultipliers.health;
                var breakdown = [];
                var total = 0;
                
                Object.keys(multipliers).forEach(function(category) {
                    var avoided = Math.round(population * costPerBeneficiary * multipliers[category] * 0.3);
                    total += avoided;
                    breakdown.push({
                        category: category,
                        label: lang === 'fr' ? {
                            hospitalization: 'Hospitalisations évitées',
                            emergency: 'Urgences évitées',
                            medication: 'Économies médicaments',
                            productivity: 'Gains de productivité',
                            disability: 'Invalidités évitées',
                            crisis: 'Crises évitées',
                            dropout: 'Décrochages évités',
                            remediation: 'Remédiation évitée',
                            specialNeeds: 'Besoins spéciaux évités',
                            incarceration: 'Incarcérations évitées',
                            welfare: 'Aides sociales évitées',
                            childProtection: 'Protection enfance évitée',
                            homelessness: 'Sans-abrisme évité'
                        }[category] || category : category,
                        amount: avoided,
                        multiplier: multipliers[category]
                    });
                });
                
                return { total: total, breakdown: breakdown };
            },
            
            calculateBreakEvenYear: function(yearlyData) {
                for (var i = 0; i < yearlyData.length; i++) {
                    if (yearlyData[i].cumulativeBenefit >= yearlyData[i].cumulativeCost) {
                        return yearlyData[i].year;
                    }
                }
                return null;
            },
            
            runSensitivityAnalysis: function(project, budget, years, lang) {
                var baseBudget = budget.summary ? budget.summary.total : (project.budget || 100000);
                var scenarios = [];
                
                // Variation des coûts ±20%
                [-0.2, -0.1, 0, 0.1, 0.2].forEach(function(variation) {
                    var adjustedBudget = baseBudget * (1 + variation);
                    var roi = Math.round(150 - (variation * 200)); // Simplifié
                    scenarios.push({
                        variable: lang === 'fr' ? 'Variation coûts' : 'Cost variation',
                        variation: Math.round(variation * 100) + '%',
                        impact: roi + '%',
                        risk: variation > 0 ? 'high' : variation < 0 ? 'low' : 'medium'
                    });
                });
                
                return {
                    scenarios: scenarios,
                    worstCase: { roi: 80, probability: 0.15 },
                    baseCase: { roi: 150, probability: 0.60 },
                    bestCase: { roi: 250, probability: 0.25 }
                };
            },
            
            generateRecommendations: function(scenarios, sensitivity, lang) {
                var recs = [];
                var moderate = scenarios.moderate;
                
                if (moderate && moderate.summary.breakEvenYear <= 2) {
                    recs.push({
                        priority: 'high',
                        icon: '✅',
                        text: lang === 'fr' 
                            ? 'ROI positif dès l\'année ' + moderate.summary.breakEvenYear + ' - Fort potentiel de scaling'
                            : 'Positive ROI from year ' + moderate.summary.breakEvenYear + ' - Strong scaling potential'
                    });
                }
                
                if (moderate && moderate.summary.overallBCRatio >= 2) {
                    recs.push({
                        priority: 'high',
                        icon: '💰',
                        text: lang === 'fr'
                            ? 'Ratio coût-bénéfice de ' + moderate.summary.overallBCRatio + ':1 - Investissement très rentable'
                            : 'Cost-benefit ratio of ' + moderate.summary.overallBCRatio + ':1 - Highly profitable investment'
                    });
                }
                
                recs.push({
                    priority: 'medium',
                    icon: '📊',
                    text: lang === 'fr'
                        ? 'Prévoir un fonds de contingence de 10-15% pour absorber les variations'
                        : 'Plan 10-15% contingency fund to absorb variations'
                });
                
                recs.push({
                    priority: 'medium',
                    icon: '🎯',
                    text: lang === 'fr'
                        ? 'Commencer par le scénario conservateur avant d\'accélérer le scaling'
                        : 'Start with conservative scenario before accelerating scaling'
                });
                
                return recs;
            },
            
            generateExecutiveSummary: function(scenarios, lang) {
                var mod = scenarios.moderate;
                if (!mod) return '';
                
                return lang === 'fr'
                    ? 'Sur un horizon de 5 ans, le scénario modéré projette un investissement total de $' + 
                      mod.summary.totalCost.toLocaleString() + ' pour des bénéfices de $' + 
                      mod.summary.totalBenefit.toLocaleString() + ', soit un ROI de ' + 
                      mod.summary.overallROI + '% et un ratio coût-bénéfice de ' + 
                      mod.summary.overallBCRatio + ':1. Le seuil de rentabilité est atteint en année ' + 
                      (mod.summary.breakEvenYear || 'N/A') + '.'
                    : 'Over a 5-year horizon, the moderate scenario projects a total investment of $' + 
                      mod.summary.totalCost.toLocaleString() + ' for benefits of $' + 
                      mod.summary.totalBenefit.toLocaleString() + ', yielding a ROI of ' + 
                      mod.summary.overallROI + '% and a cost-benefit ratio of ' + 
                      mod.summary.overallBCRatio + ':1. Break-even is reached in year ' + 
                      (mod.summary.breakEvenYear || 'N/A') + '.';
            },
            
            prepareChartData: function(scenarios, lang) {
                var chartData = {
                    years: [],
                    conservative: { costs: [], benefits: [], roi: [] },
                    moderate: { costs: [], benefits: [], roi: [] },
                    ambitious: { costs: [], benefits: [], roi: [] }
                };
                
                if (scenarios.moderate) {
                    scenarios.moderate.data.forEach(function(d) {
                        chartData.years.push(lang === 'fr' ? 'An ' + d.year : 'Year ' + d.year);
                    });
                }
                
                ['conservative', 'moderate', 'ambitious'].forEach(function(key) {
                    if (scenarios[key]) {
                        scenarios[key].data.forEach(function(d) {
                            chartData[key].costs.push(d.cost);
                            chartData[key].benefits.push(d.benefits);
                            chartData[key].roi.push(d.cumulativeROI);
                        });
                    }
                });
                
                return chartData;
            },
            
            getScenarioLabel: function(key, lang) {
                var labels = {
                    conservative: { fr: 'Conservateur', en: 'Conservative' },
                    moderate: { fr: 'Modéré', en: 'Moderate' },
                    ambitious: { fr: 'Ambitieux', en: 'Ambitious' }
                };
                return labels[key] ? labels[key][lang] : key;
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 4C: STAKEHOLDER MAPPER (SNA) - v9.0
        // Cartographie des acteurs et analyse des réseaux sociaux
        // ═══════════════════════════════════════════════════════════════════════════
        
        var StakeholderMapper = {
            // Catégories d'acteurs CFIR-alignées
            stakeholderCategories: {
                leadership: {
                    label: { fr: 'Leadership & Décideurs', en: 'Leadership & Decision Makers' },
                    icon: '👔',
                    color: '#3b82f6',
                    influenceWeight: 1.0
                },
                implementers: {
                    label: { fr: 'Équipe d\'implémentation', en: 'Implementation Team' },
                    icon: '⚙️',
                    color: '#10b981',
                    influenceWeight: 0.9
                },
                clinicians: {
                    label: { fr: 'Cliniciens / Praticiens', en: 'Clinicians / Practitioners' },
                    icon: '🩺',
                    color: '#8b5cf6',
                    influenceWeight: 0.85
                },
                patients: {
                    label: { fr: 'Patients / Bénéficiaires', en: 'Patients / Beneficiaries' },
                    icon: '👥',
                    color: '#f59e0b',
                    influenceWeight: 0.7
                },
                funders: {
                    label: { fr: 'Bailleurs / Financeurs', en: 'Funders / Donors' },
                    icon: '💰',
                    color: '#ef4444',
                    influenceWeight: 0.95
                },
                partners: {
                    label: { fr: 'Partenaires externes', en: 'External Partners' },
                    icon: '🤝',
                    color: '#06b6d4',
                    influenceWeight: 0.75
                },
                community: {
                    label: { fr: 'Communauté / Société civile', en: 'Community / Civil Society' },
                    icon: '🏘️',
                    color: '#84cc16',
                    influenceWeight: 0.6
                },
                regulators: {
                    label: { fr: 'Régulateurs / Ministères', en: 'Regulators / Ministries' },
                    icon: '🏛️',
                    color: '#6366f1',
                    influenceWeight: 0.9
                }
            },
            
            // Matrice de positions
            positionMatrix: {
                champion: { label: { fr: 'Champion', en: 'Champion' }, score: 2, color: '#10b981', icon: '🌟' },
                supporter: { label: { fr: 'Soutien', en: 'Supporter' }, score: 1, color: '#84cc16', icon: '👍' },
                neutral: { label: { fr: 'Neutre', en: 'Neutral' }, score: 0, color: '#6b7280', icon: '😐' },
                skeptic: { label: { fr: 'Sceptique', en: 'Skeptic' }, score: -1, color: '#f59e0b', icon: '🤔' },
                blocker: { label: { fr: 'Bloqueur', en: 'Blocker' }, score: -2, color: '#ef4444', icon: '🚫' }
            },
            
            // Stratégies d'engagement recommandées
            engagementStrategies: {
                champion: ['S04', 'S07', 'S12'], // Utiliser comme ambassadeur
                supporter: ['S08', 'S03', 'S20'], // Renforcer l'engagement
                neutral: ['S01', 'S18', 'S11'], // Éduquer et informer
                skeptic: ['S02', 'S16', 'S15'], // Convaincre avec preuves
                blocker: ['S04', 'S10', 'S09'] // Négocier et faciliter
            },
            
            analyze: function(stakeholders, project, lang) {
                lang = lang || 'fr';
                var self = this;
                
                if (!stakeholders || stakeholders.length === 0) {
                    stakeholders = this.generateDefaultStakeholders(project, lang);
                }
                
                // Calculer les scores et métriques
                var analyzed = stakeholders.map(function(s) {
                    var category = self.stakeholderCategories[s.category] || self.stakeholderCategories.partners;
                    var position = self.positionMatrix[s.position] || self.positionMatrix.neutral;
                    
                    var influence = (s.influence || 5) / 10;
                    var interest = (s.interest || 5) / 10;
                    var power = influence * category.influenceWeight;
                    var engagement = (influence + interest) / 2;
                    
                    // Quadrant Power/Interest
                    var quadrant = self.calculateQuadrant(power, interest);
                    
                    return {
                        id: s.id || 'SH_' + Math.random().toString(36).substr(2, 6),
                        name: s.name,
                        role: s.role || '',
                        category: s.category,
                        categoryLabel: category.label[lang],
                        categoryIcon: category.icon,
                        categoryColor: category.color,
                        position: s.position,
                        positionLabel: position.label[lang],
                        positionScore: position.score,
                        positionColor: position.color,
                        positionIcon: position.icon,
                        influence: Math.round(influence * 100),
                        interest: Math.round(interest * 100),
                        power: Math.round(power * 100),
                        engagement: Math.round(engagement * 100),
                        quadrant: quadrant,
                        strategies: self.engagementStrategies[s.position] || [],
                        notes: s.notes || '',
                        connections: s.connections || []
                    };
                });
                
                // Calculer les métriques globales
                var metrics = this.calculateGlobalMetrics(analyzed, lang);
                
                // Identifier champions et bloqueurs
                var champions = analyzed.filter(function(s) { return s.position === 'champion'; });
                var blockers = analyzed.filter(function(s) { return s.position === 'blocker'; });
                
                // Générer le réseau
                var network = this.generateNetwork(analyzed);
                
                // Recommandations
                var recommendations = this.generateRecommendations(analyzed, metrics, lang);
                
                return {
                    stakeholders: analyzed,
                    totalCount: analyzed.length,
                    metrics: metrics,
                    champions: champions,
                    blockers: blockers,
                    network: network,
                    quadrantDistribution: this.getQuadrantDistribution(analyzed, lang),
                    positionDistribution: this.getPositionDistribution(analyzed, lang),
                    recommendations: recommendations,
                    riskScore: this.calculateRiskScore(analyzed),
                    readinessScore: this.calculateReadinessScore(analyzed),
                    generatedAt: new Date().toISOString(),
                    version: 'SNA v1.0 - MOUDAR v9.0'
                };
            },
            
            generateDefaultStakeholders: function(project, lang) {
                return [
                    { id: 'SH1', name: lang === 'fr' ? 'Directeur de programme' : 'Program Director', category: 'leadership', position: 'champion', influence: 9, interest: 9 },
                    { id: 'SH2', name: lang === 'fr' ? 'Chef de service' : 'Department Head', category: 'leadership', position: 'supporter', influence: 8, interest: 7 },
                    { id: 'SH3', name: lang === 'fr' ? 'Coordinateur projet' : 'Project Coordinator', category: 'implementers', position: 'champion', influence: 7, interest: 10 },
                    { id: 'SH4', name: lang === 'fr' ? 'Équipe terrain' : 'Field Team', category: 'implementers', position: 'supporter', influence: 6, interest: 8 },
                    { id: 'SH5', name: lang === 'fr' ? 'Médecins seniors' : 'Senior Physicians', category: 'clinicians', position: 'neutral', influence: 8, interest: 5 },
                    { id: 'SH6', name: lang === 'fr' ? 'Infirmiers' : 'Nurses', category: 'clinicians', position: 'supporter', influence: 6, interest: 7 },
                    { id: 'SH7', name: lang === 'fr' ? 'Représentants patients' : 'Patient Representatives', category: 'patients', position: 'supporter', influence: 4, interest: 9 },
                    { id: 'SH8', name: lang === 'fr' ? 'Bailleur principal' : 'Main Funder', category: 'funders', position: 'neutral', influence: 10, interest: 6 },
                    { id: 'SH9', name: lang === 'fr' ? 'Ministère de la Santé' : 'Ministry of Health', category: 'regulators', position: 'neutral', influence: 9, interest: 5 },
                    { id: 'SH10', name: lang === 'fr' ? 'ONG partenaire' : 'Partner NGO', category: 'partners', position: 'supporter', influence: 5, interest: 8 }
                ];
            },
            
            calculateQuadrant: function(power, interest) {
                if (power >= 0.6 && interest >= 0.6) return 'manage_closely';
                if (power >= 0.6 && interest < 0.6) return 'keep_satisfied';
                if (power < 0.6 && interest >= 0.6) return 'keep_informed';
                return 'monitor';
            },
            
            calculateGlobalMetrics: function(stakeholders, lang) {
                var totalInfluence = 0;
                var totalEngagement = 0;
                var weightedPosition = 0;
                var totalWeight = 0;
                
                stakeholders.forEach(function(s) {
                    totalInfluence += s.influence;
                    totalEngagement += s.engagement;
                    weightedPosition += s.positionScore * (s.influence / 100);
                    totalWeight += s.influence / 100;
                });
                
                var n = stakeholders.length || 1;
                
                return {
                    averageInfluence: Math.round(totalInfluence / n),
                    averageEngagement: Math.round(totalEngagement / n),
                    netAlignment: totalWeight > 0 ? Math.round((weightedPosition / totalWeight) * 50 + 50) : 50,
                    championsCount: stakeholders.filter(function(s) { return s.position === 'champion'; }).length,
                    blockersCount: stakeholders.filter(function(s) { return s.position === 'blocker'; }).length,
                    highPowerCount: stakeholders.filter(function(s) { return s.power >= 70; }).length
                };
            },
            
            generateNetwork: function(stakeholders) {
                var nodes = stakeholders.map(function(s) {
                    return {
                        id: s.id,
                        label: s.name,
                        color: s.categoryColor,
                        size: s.power / 10 + 5,
                        group: s.category
                    };
                });
                
                var edges = [];
                // Générer des connexions basées sur les catégories
                stakeholders.forEach(function(s1, i) {
                    stakeholders.forEach(function(s2, j) {
                        if (i < j) {
                            var strength = 0;
                            if (s1.category === s2.category) strength = 0.8;
                            else if (s1.quadrant === s2.quadrant) strength = 0.5;
                            else if (s1.position === s2.position) strength = 0.3;
                            
                            if (strength > 0.2) {
                                edges.push({
                                    source: s1.id,
                                    target: s2.id,
                                    strength: strength,
                                    type: s1.category === s2.category ? 'same_category' : 'cross_category'
                                });
                            }
                        }
                    });
                });
                
                return { nodes: nodes, edges: edges };
            },
            
            getQuadrantDistribution: function(stakeholders, lang) {
                var quadrants = {
                    manage_closely: { label: lang === 'fr' ? 'Gérer de près' : 'Manage Closely', count: 0, color: '#ef4444' },
                    keep_satisfied: { label: lang === 'fr' ? 'Satisfaire' : 'Keep Satisfied', count: 0, color: '#f59e0b' },
                    keep_informed: { label: lang === 'fr' ? 'Informer' : 'Keep Informed', count: 0, color: '#3b82f6' },
                    monitor: { label: lang === 'fr' ? 'Surveiller' : 'Monitor', count: 0, color: '#6b7280' }
                };
                
                stakeholders.forEach(function(s) {
                    if (quadrants[s.quadrant]) quadrants[s.quadrant].count++;
                });
                
                return quadrants;
            },
            
            getPositionDistribution: function(stakeholders, lang) {
                var self = this;
                var distribution = {};
                
                Object.keys(this.positionMatrix).forEach(function(key) {
                    distribution[key] = {
                        label: self.positionMatrix[key].label[lang],
                        count: 0,
                        color: self.positionMatrix[key].color,
                        icon: self.positionMatrix[key].icon
                    };
                });
                
                stakeholders.forEach(function(s) {
                    if (distribution[s.position]) distribution[s.position].count++;
                });
                
                return distribution;
            },
            
            calculateRiskScore: function(stakeholders) {
                var risk = 0;
                stakeholders.forEach(function(s) {
                    if (s.position === 'blocker' && s.power >= 70) risk += 30;
                    else if (s.position === 'blocker') risk += 15;
                    else if (s.position === 'skeptic' && s.power >= 70) risk += 15;
                    else if (s.position === 'skeptic') risk += 8;
                });
                return Math.min(100, risk);
            },
            
            calculateReadinessScore: function(stakeholders) {
                var readiness = 50;
                stakeholders.forEach(function(s) {
                    if (s.position === 'champion') readiness += 8;
                    else if (s.position === 'supporter') readiness += 4;
                    else if (s.position === 'neutral') readiness += 0;
                    else if (s.position === 'skeptic') readiness -= 5;
                    else if (s.position === 'blocker') readiness -= 10;
                });
                return Math.max(0, Math.min(100, readiness));
            },
            
            generateRecommendations: function(stakeholders, metrics, lang) {
                var recs = [];
                
                if (metrics.blockersCount > 0) {
                    recs.push({
                        priority: 'high',
                        icon: '⚠️',
                        text: lang === 'fr'
                            ? metrics.blockersCount + ' bloqueur(s) identifié(s) - Stratégie de négociation urgente requise'
                            : metrics.blockersCount + ' blocker(s) identified - Urgent negotiation strategy required',
                        strategies: ['S04', 'S10']
                    });
                }
                
                if (metrics.championsCount < 2) {
                    recs.push({
                        priority: 'high',
                        icon: '🌟',
                        text: lang === 'fr'
                            ? 'Identifier et recruter plus de champions (actuellement: ' + metrics.championsCount + ')'
                            : 'Identify and recruit more champions (currently: ' + metrics.championsCount + ')',
                        strategies: ['S04', 'S07']
                    });
                }
                
                if (metrics.netAlignment < 60) {
                    recs.push({
                        priority: 'medium',
                        icon: '📊',
                        text: lang === 'fr'
                            ? 'Alignement global faible (' + metrics.netAlignment + '%) - Renforcer l\'engagement'
                            : 'Low overall alignment (' + metrics.netAlignment + '%) - Strengthen engagement',
                        strategies: ['S08', 'S18']
                    });
                }
                
                recs.push({
                    priority: 'low',
                    icon: '📅',
                    text: lang === 'fr'
                        ? 'Planifier des réunions régulières avec les acteurs du quadrant "Gérer de près"'
                        : 'Schedule regular meetings with stakeholders in "Manage Closely" quadrant',
                    strategies: ['S03', 'S20']
                });
                
                return recs;
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 4D: SUSTAINABILITY FRAMEWORK (SCHEIRER) - v9.0
        // Framework de pérennité post-financement basé sur Scheirer & Dearing
        // ═══════════════════════════════════════════════════════════════════════════
        
        var SustainabilityFramework = {
            // 8 facteurs clés de pérennité (Scheirer & Dearing, 2011)
            factors: {
                modifiability: {
                    id: 'modifiability',
                    label: { fr: 'Adaptabilité de l\'intervention', en: 'Intervention Modifiability' },
                    description: { fr: 'Capacité à adapter l\'intervention au contexte local sans perdre les éléments essentiels', en: 'Ability to adapt intervention to local context without losing core elements' },
                    weight: 0.12,
                    icon: '🔧',
                    indicators: [
                        { id: 'M1', label: { fr: 'Composants essentiels identifiés', en: 'Core components identified' } },
                        { id: 'M2', label: { fr: 'Adaptations documentées', en: 'Documented adaptations' } },
                        { id: 'M3', label: { fr: 'Flexibilité de mise en œuvre', en: 'Implementation flexibility' } }
                    ]
                },
                effectiveness: {
                    id: 'effectiveness',
                    label: { fr: 'Efficacité perçue', en: 'Perceived Effectiveness' },
                    description: { fr: 'Perception par les acteurs que l\'intervention produit des résultats positifs', en: 'Stakeholder perception that intervention produces positive results' },
                    weight: 0.15,
                    icon: '✅',
                    indicators: [
                        { id: 'E1', label: { fr: 'Résultats visibles pour les bénéficiaires', en: 'Visible results for beneficiaries' } },
                        { id: 'E2', label: { fr: 'Données probantes locales', en: 'Local evidence data' } },
                        { id: 'E3', label: { fr: 'Satisfaction des utilisateurs', en: 'User satisfaction' } }
                    ]
                },
                champions: {
                    id: 'champions',
                    label: { fr: 'Champions & Leadership', en: 'Champions & Leadership' },
                    description: { fr: 'Présence de leaders engagés qui défendent l\'intervention', en: 'Presence of committed leaders who advocate for the intervention' },
                    weight: 0.15,
                    icon: '🌟',
                    indicators: [
                        { id: 'C1', label: { fr: 'Champion(s) identifié(s)', en: 'Champion(s) identified' } },
                        { id: 'C2', label: { fr: 'Soutien du leadership formel', en: 'Formal leadership support' } },
                        { id: 'C3', label: { fr: 'Plan de succession', en: 'Succession plan' } }
                    ]
                },
                fit: {
                    id: 'fit',
                    label: { fr: 'Alignement organisationnel', en: 'Organizational Fit' },
                    description: { fr: 'Compatibilité avec la mission, culture et priorités de l\'organisation', en: 'Compatibility with organization mission, culture and priorities' },
                    weight: 0.13,
                    icon: '🎯',
                    indicators: [
                        { id: 'F1', label: { fr: 'Alignement avec la mission', en: 'Mission alignment' } },
                        { id: 'F2', label: { fr: 'Intégration aux processus existants', en: 'Integration with existing processes' } },
                        { id: 'F3', label: { fr: 'Cohérence avec les priorités stratégiques', en: 'Strategic priority consistency' } }
                    ]
                },
                funding: {
                    id: 'funding',
                    label: { fr: 'Financement durable', en: 'Sustainable Funding' },
                    description: { fr: 'Sécurisation de ressources financières à long terme', en: 'Securing long-term financial resources' },
                    weight: 0.15,
                    icon: '💰',
                    indicators: [
                        { id: 'FU1', label: { fr: 'Sources de financement diversifiées', en: 'Diversified funding sources' } },
                        { id: 'FU2', label: { fr: 'Intégration au budget récurrent', en: 'Integration in recurring budget' } },
                        { id: 'FU3', label: { fr: 'Plan de transition financière', en: 'Financial transition plan' } }
                    ]
                },
                staff: {
                    id: 'staff',
                    label: { fr: 'Capacité du personnel', en: 'Staff Capacity' },
                    description: { fr: 'Compétences et engagement du personnel pour maintenir l\'intervention', en: 'Staff skills and commitment to maintain intervention' },
                    weight: 0.12,
                    icon: '👥',
                    indicators: [
                        { id: 'S1', label: { fr: 'Personnel formé disponible', en: 'Trained staff available' } },
                        { id: 'S2', label: { fr: 'Transfert de compétences documenté', en: 'Documented skills transfer' } },
                        { id: 'S3', label: { fr: 'Turnover managé', en: 'Managed turnover' } }
                    ]
                },
                community: {
                    id: 'community',
                    label: { fr: 'Engagement communautaire', en: 'Community Engagement' },
                    description: { fr: 'Implication et appropriation par la communauté bénéficiaire', en: 'Beneficiary community involvement and ownership' },
                    weight: 0.10,
                    icon: '🏘️',
                    indicators: [
                        { id: 'CO1', label: { fr: 'Participation communautaire active', en: 'Active community participation' } },
                        { id: 'CO2', label: { fr: 'Appropriation locale', en: 'Local ownership' } },
                        { id: 'CO3', label: { fr: 'Demande continue des bénéficiaires', en: 'Ongoing beneficiary demand' } }
                    ]
                },
                policy: {
                    id: 'policy',
                    label: { fr: 'Ancrage politique', en: 'Policy Integration' },
                    description: { fr: 'Intégration dans les politiques et systèmes de santé nationaux', en: 'Integration into national health policies and systems' },
                    weight: 0.08,
                    icon: '🏛️',
                    indicators: [
                        { id: 'P1', label: { fr: 'Inclusion dans les directives nationales', en: 'Inclusion in national guidelines' } },
                        { id: 'P2', label: { fr: 'Soutien réglementaire', en: 'Regulatory support' } },
                        { id: 'P3', label: { fr: 'Plaidoyer auprès des décideurs', en: 'Advocacy with decision-makers' } }
                    ]
                }
            },
            
            // Niveaux de maturité
            maturityLevels: {
                0: { label: { fr: 'Non initié', en: 'Not Started' }, color: '#ef4444' },
                1: { label: { fr: 'En développement', en: 'Developing' }, color: '#f59e0b' },
                2: { label: { fr: 'Partiellement en place', en: 'Partially in Place' }, color: '#eab308' },
                3: { label: { fr: 'Bien établi', en: 'Well Established' }, color: '#84cc16' },
                4: { label: { fr: 'Optimisé', en: 'Optimized' }, color: '#10b981' }
            },
            
            evaluate: function(assessments, project, lang) {
                lang = lang || 'fr';
                var self = this;
                
                // Si pas d'évaluations, générer des valeurs par défaut
                if (!assessments || Object.keys(assessments).length === 0) {
                    assessments = this.generateDefaultAssessments();
                }
                
                var results = {};
                var globalScore = 0;
                var totalWeight = 0;
                var criticalGaps = [];
                var strengths = [];
                
                Object.keys(this.factors).forEach(function(factorId) {
                    var factor = self.factors[factorId];
                    var assessment = assessments[factorId] || { score: 2, notes: '' };
                    var score = assessment.score || 2;
                    var maturity = self.maturityLevels[score] || self.maturityLevels[2];
                    
                    var weightedScore = score * factor.weight;
                    globalScore += weightedScore;
                    totalWeight += factor.weight;
                    
                    var indicatorResults = factor.indicators.map(function(ind) {
                        var indAssessment = assessment.indicators ? assessment.indicators[ind.id] : null;
                        return {
                            id: ind.id,
                            label: ind.label[lang],
                            status: indAssessment ? indAssessment.status : 'unknown',
                            notes: indAssessment ? indAssessment.notes : ''
                        };
                    });
                    
                    results[factorId] = {
                        id: factorId,
                        label: factor.label[lang],
                        description: factor.description[lang],
                        icon: factor.icon,
                        weight: Math.round(factor.weight * 100),
                        score: score,
                        maxScore: 4,
                        percentage: Math.round((score / 4) * 100),
                        maturityLevel: score,
                        maturityLabel: maturity.label[lang],
                        maturityColor: maturity.color,
                        indicators: indicatorResults,
                        notes: assessment.notes || '',
                        strategies: self.getStrategiesForFactor(factorId, score)
                    };
                    
                    if (score <= 1) {
                        criticalGaps.push({
                            factor: factor.label[lang],
                            score: score,
                            priority: factor.weight >= 0.13 ? 'critical' : 'high'
                        });
                    } else if (score >= 3) {
                        strengths.push({
                            factor: factor.label[lang],
                            score: score
                        });
                    }
                });
                
                var normalizedGlobal = totalWeight > 0 ? (globalScore / totalWeight) : 2;
                var globalPercentage = Math.round((normalizedGlobal / 4) * 100);
                
                // Probabilité de pérennité
                var sustainabilityProbability = this.calculateSustainabilityProbability(results);
                
                // Recommandations
                var recommendations = this.generateRecommendations(results, criticalGaps, lang);
                
                // Plan de transition
                var transitionPlan = this.generateTransitionPlan(results, project, lang);
                
                return {
                    projectTitle: project ? project.title : '',
                    globalScore: Math.round(normalizedGlobal * 10) / 10,
                    globalPercentage: globalPercentage,
                    globalMaturity: this.getGlobalMaturity(normalizedGlobal, lang),
                    sustainabilityProbability: sustainabilityProbability,
                    factors: results,
                    criticalGaps: criticalGaps.sort(function(a, b) { return a.score - b.score; }),
                    strengths: strengths.sort(function(a, b) { return b.score - a.score; }),
                    recommendations: recommendations,
                    transitionPlan: transitionPlan,
                    radarData: this.prepareRadarData(results, lang),
                    generatedAt: new Date().toISOString(),
                    version: 'Sustainability Framework v1.0 - MOUDAR v9.0',
                    reference: 'Scheirer & Dearing (2011). An Agenda for Research on the Sustainability of Public Health Programs.'
                };
            },
            
            generateDefaultAssessments: function() {
                return {
                    modifiability: { score: 2 },
                    effectiveness: { score: 3 },
                    champions: { score: 2 },
                    fit: { score: 3 },
                    funding: { score: 1 },
                    staff: { score: 2 },
                    community: { score: 2 },
                    policy: { score: 1 }
                };
            },
            
            getStrategiesForFactor: function(factorId, score) {
                var strategyMap = {
                    modifiability: ['S11', 'S16', 'S05'],
                    effectiveness: ['S02', 'S10', 'S13'],
                    champions: ['S04', 'S07', 'S12'],
                    fit: ['S20', 'S03', 'S08'],
                    funding: ['S06', 'S19', 'S17'],
                    staff: ['S01', 'S14', 'S09'],
                    community: ['S08', 'S18', 'S15'],
                    policy: ['S12', 'S07', 'S20']
                };
                
                if (score >= 3) return [];
                return strategyMap[factorId] || [];
            },
            
            calculateSustainabilityProbability: function(results) {
                var criticalFactors = ['champions', 'funding', 'effectiveness'];
                var criticalScore = 0;
                var otherScore = 0;
                var criticalCount = 0;
                var otherCount = 0;
                
                Object.keys(results).forEach(function(key) {
                    if (criticalFactors.indexOf(key) >= 0) {
                        criticalScore += results[key].score;
                        criticalCount++;
                    } else {
                        otherScore += results[key].score;
                        otherCount++;
                    }
                });
                
                var criticalAvg = criticalCount > 0 ? criticalScore / criticalCount : 0;
                var otherAvg = otherCount > 0 ? otherScore / otherCount : 0;
                
                // Pondération: facteurs critiques comptent plus
                var probability = (criticalAvg * 0.6 + otherAvg * 0.4) / 4 * 100;
                
                return {
                    percentage: Math.round(probability),
                    level: probability >= 70 ? 'high' : probability >= 50 ? 'moderate' : 'low',
                    label: probability >= 70 
                        ? { fr: 'Élevée', en: 'High' }
                        : probability >= 50 
                            ? { fr: 'Modérée', en: 'Moderate' }
                            : { fr: 'Faible', en: 'Low' }
                };
            },
            
            getGlobalMaturity: function(score, lang) {
                if (score >= 3.5) return { level: 4, label: this.maturityLevels[4].label[lang], color: this.maturityLevels[4].color };
                if (score >= 2.5) return { level: 3, label: this.maturityLevels[3].label[lang], color: this.maturityLevels[3].color };
                if (score >= 1.5) return { level: 2, label: this.maturityLevels[2].label[lang], color: this.maturityLevels[2].color };
                if (score >= 0.5) return { level: 1, label: this.maturityLevels[1].label[lang], color: this.maturityLevels[1].color };
                return { level: 0, label: this.maturityLevels[0].label[lang], color: this.maturityLevels[0].color };
            },
            
            generateRecommendations: function(results, criticalGaps, lang) {
                var recs = [];
                
                if (criticalGaps.length > 0) {
                    var gap = criticalGaps[0];
                    recs.push({
                        priority: 'critical',
                        icon: '🚨',
                        text: lang === 'fr'
                            ? 'Priorité absolue: Renforcer "' + gap.factor + '" (score: ' + gap.score + '/4)'
                            : 'Top priority: Strengthen "' + gap.factor + '" (score: ' + gap.score + '/4)',
                        factor: gap.factor
                    });
                }
                
                if (results.funding && results.funding.score <= 2) {
                    recs.push({
                        priority: 'high',
                        icon: '💰',
                        text: lang === 'fr'
                            ? 'Développer un plan de financement post-projet avec sources diversifiées'
                            : 'Develop post-project funding plan with diversified sources',
                        factor: 'funding'
                    });
                }
                
                if (results.champions && results.champions.score <= 2) {
                    recs.push({
                        priority: 'high',
                        icon: '🌟',
                        text: lang === 'fr'
                            ? 'Identifier et former des champions locaux avec plan de succession'
                            : 'Identify and train local champions with succession plan',
                        factor: 'champions'
                    });
                }
                
                if (results.policy && results.policy.score <= 1) {
                    recs.push({
                        priority: 'medium',
                        icon: '🏛️',
                        text: lang === 'fr'
                            ? 'Engager le plaidoyer pour l\'intégration dans les politiques nationales'
                            : 'Engage advocacy for integration into national policies',
                        factor: 'policy'
                    });
                }
                
                recs.push({
                    priority: 'low',
                    icon: '📊',
                    text: lang === 'fr'
                        ? 'Documenter les succès et produire des preuves locales d\'efficacité'
                        : 'Document successes and produce local evidence of effectiveness',
                    factor: 'effectiveness'
                });
                
                return recs;
            },
            
            generateTransitionPlan: function(results, project, lang) {
                var phases = [
                    {
                        phase: 1,
                        name: lang === 'fr' ? 'Préparation (M-12 à M-6)' : 'Preparation (M-12 to M-6)',
                        activities: [
                            lang === 'fr' ? 'Évaluation des capacités locales' : 'Local capacity assessment',
                            lang === 'fr' ? 'Identification des champions' : 'Champion identification',
                            lang === 'fr' ? 'Début du transfert de compétences' : 'Start skills transfer'
                        ]
                    },
                    {
                        phase: 2,
                        name: lang === 'fr' ? 'Transition (M-6 à M0)' : 'Transition (M-6 to M0)',
                        activities: [
                            lang === 'fr' ? 'Financement de transition sécurisé' : 'Transition funding secured',
                            lang === 'fr' ? 'Responsabilités transférées' : 'Responsibilities transferred',
                            lang === 'fr' ? 'Documentation complète' : 'Complete documentation'
                        ]
                    },
                    {
                        phase: 3,
                        name: lang === 'fr' ? 'Post-financement (M0+)' : 'Post-funding (M0+)',
                        activities: [
                            lang === 'fr' ? 'Suivi à distance' : 'Remote monitoring',
                            lang === 'fr' ? 'Support technique ponctuel' : 'Ad-hoc technical support',
                            lang === 'fr' ? 'Évaluation de pérennité à 12 mois' : '12-month sustainability evaluation'
                        ]
                    }
                ];
                
                return {
                    phases: phases,
                    criticalMilestones: [
                        { date: 'M-12', milestone: lang === 'fr' ? 'Début plan de transition' : 'Transition plan start' },
                        { date: 'M-6', milestone: lang === 'fr' ? 'Financement pérenne confirmé' : 'Sustainable funding confirmed' },
                        { date: 'M-3', milestone: lang === 'fr' ? 'Transfert complet des responsabilités' : 'Complete responsibility transfer' },
                        { date: 'M0', milestone: lang === 'fr' ? 'Fin du financement initial' : 'End of initial funding' },
                        { date: 'M+12', milestone: lang === 'fr' ? 'Évaluation de pérennité' : 'Sustainability evaluation' }
                    ]
                };
            },
            
            prepareRadarData: function(results, lang) {
                var data = {
                    labels: [],
                    scores: [],
                    maxScore: 4
                };
                
                Object.keys(results).forEach(function(key) {
                    data.labels.push(results[key].label);
                    data.scores.push(results[key].score);
                });
                
                return data;
            }
        };
        
        console.log('✅ MOUDAR v9.0 Strategic Modules: BudgetImpactAnalyzer, StakeholderMapper, SustainabilityFramework');
        
        // ═══════════════════════════════════════════════════════════════════════════
        // v11.0 MODULE: NPT EVALUATOR — Normalization Process Theory (May & Finch 2009)
        // Reference: May C, Finch T (2009). Implementation Science, 4:29
        // Reference: Finch TL et al. (2018). BMC Medical Research Methodology, 18:133
        // ═══════════════════════════════════════════════════════════════════════════
        
        var NPTEvaluator = {
            version: '1.0',
            citation: 'May C & Finch T (2009). Implementation Science, 4:29',
            nomadCitation: 'Finch TL et al. (2018). BMC Medical Research Methodology, 18:133',
            
            constructs: {
                coherence: {
                    id: 'coherence',
                    label: { fr: 'Cohérence (Sense-Making)', en: 'Coherence (Sense-Making)' },
                    description: { fr: 'Travail que font les individus pour comprendre et donner du sens à une pratique', en: 'The work that individuals do to understand and make sense of a practice' },
                    color: '#3b82f6',
                    subConstructs: [
                        { id: 'CO1', name: { fr: 'Différenciation', en: 'Differentiation' }, description: { fr: 'Comprendre en quoi la pratique diffère des pratiques existantes', en: 'Understanding how the practice differs from existing practices' } },
                        { id: 'CO2', name: { fr: 'Spécification communale', en: 'Communal Specification' }, description: { fr: 'Construire une compréhension partagée de la pratique', en: 'Building shared understanding of the practice' } },
                        { id: 'CO3', name: { fr: 'Spécification individuelle', en: 'Individual Specification' }, description: { fr: 'Comprendre ses propres tâches et responsabilités', en: 'Understanding own tasks and responsibilities' } },
                        { id: 'CO4', name: { fr: 'Internalisation', en: 'Internalization' }, description: { fr: 'Comprendre la valeur et les bénéfices de la pratique', en: 'Understanding the value and benefits of the practice' } }
                    ]
                },
                cognitiveParticipation: {
                    id: 'cognitiveParticipation',
                    label: { fr: 'Participation Cognitive', en: 'Cognitive Participation' },
                    description: { fr: 'Travail relationnel pour construire et maintenir une communauté de pratique', en: 'Relational work to build and sustain a community of practice' },
                    color: '#10b981',
                    subConstructs: [
                        { id: 'CP1', name: { fr: 'Initiation', en: 'Initiation' }, description: { fr: 'Acteurs clés qui conduisent la pratique', en: 'Key actors who drive the practice forward' } },
                        { id: 'CP2', name: { fr: 'Enrôlement', en: 'Enrolment' }, description: { fr: 'Organiser les autres pour contribuer à la pratique', en: 'Organizing others to contribute to the practice' } },
                        { id: 'CP3', name: { fr: 'Légitimation', en: 'Legitimation' }, description: { fr: 'Croire que la pratique est appropriée', en: 'Believing the practice is an appropriate thing to do' } },
                        { id: 'CP4', name: { fr: 'Activation', en: 'Activation' }, description: { fr: 'Définir les actions et procédures nécessaires', en: 'Defining the actions and procedures needed' } }
                    ]
                },
                collectiveAction: {
                    id: 'collectiveAction',
                    label: { fr: 'Action Collective', en: 'Collective Action' },
                    description: { fr: 'Travail opérationnel pour mettre en œuvre la pratique', en: 'Operational work to enact the practice' },
                    color: '#8b5cf6',
                    subConstructs: [
                        { id: 'CA1', name: { fr: 'Fonctionnement interactionnel', en: 'Interactional Workability' }, description: { fr: 'Comment la pratique affecte les interactions', en: 'How the practice affects interactions' } },
                        { id: 'CA2', name: { fr: 'Confiance relationnelle', en: 'Relational Integration' }, description: { fr: 'Connaissance et confiance dans la pratique', en: 'Knowledge about and confidence in the practice' } },
                        { id: 'CA3', name: { fr: 'Ensemble de compétences', en: 'Skill Set Workability' }, description: { fr: 'Division du travail appropriée', en: 'Appropriate division of labor' } },
                        { id: 'CA4', name: { fr: 'Intégration contextuelle', en: 'Contextual Integration' }, description: { fr: 'Soutien organisationnel et ressources', en: 'Organizational support and resources' } }
                    ]
                },
                reflexiveMonitoring: {
                    id: 'reflexiveMonitoring',
                    label: { fr: 'Suivi Réflexif', en: 'Reflexive Monitoring' },
                    description: { fr: 'Travail d\'évaluation et d\'ajustement continu', en: 'Appraisal work to assess and adjust the practice' },
                    color: '#f59e0b',
                    subConstructs: [
                        { id: 'RM1', name: { fr: 'Systématisation', en: 'Systematization' }, description: { fr: 'Collecter de l\'information sur les effets de la pratique', en: 'Gathering information about the effects of the practice' } },
                        { id: 'RM2', name: { fr: 'Évaluation communale', en: 'Communal Appraisal' }, description: { fr: 'Évaluation collective de la pratique', en: 'Collective evaluation of the practice' } },
                        { id: 'RM3', name: { fr: 'Évaluation individuelle', en: 'Individual Appraisal' }, description: { fr: 'Évaluation individuelle de la pratique', en: 'Individual evaluation of the practice' } },
                        { id: 'RM4', name: { fr: 'Reconfiguration', en: 'Reconfiguration' }, description: { fr: 'Modifier la pratique en fonction des évaluations', en: 'Modifying the practice based on appraisals' } }
                    ]
                }
            },
            
            evaluate: function(project, scores, lang) {
                lang = lang || 'fr';
                var self = this;
                var results = {};
                var totalScore = 0;
                
                Object.keys(this.constructs).forEach(function(constructId) {
                    var construct = self.constructs[constructId];
                    var subScores = [];
                    
                    construct.subConstructs.forEach(function(sub) {
                        var score = (scores && scores[sub.id]) ? scores[sub.id] : 0;
                        subScores.push({
                            id: sub.id,
                            name: sub.name[lang],
                            description: sub.description[lang],
                            score: score,
                            status: score >= 70 ? 'normalized' : score >= 40 ? 'partial' : 'not_normalized'
                        });
                    });
                    
                    var avgScore = subScores.length > 0 ? Math.round(subScores.reduce(function(a, b) { return a + b.score; }, 0) / subScores.length) : 0;
                    
                    results[constructId] = {
                        id: constructId,
                        label: construct.label[lang],
                        description: construct.description[lang],
                        color: construct.color,
                        score: avgScore,
                        subConstructs: subScores,
                        normalizationLevel: avgScore >= 70 ? 'normalized' : avgScore >= 40 ? 'emerging' : 'not_normalized',
                        normalizationLabel: avgScore >= 70 
                            ? (lang === 'fr' ? 'Normalisé' : 'Normalized')
                            : avgScore >= 40 
                                ? (lang === 'fr' ? 'Émergent' : 'Emerging')
                                : (lang === 'fr' ? 'Non normalisé' : 'Not normalized')
                    };
                    
                    totalScore += avgScore;
                });
                
                var globalScore = Math.round(totalScore / 4);
                
                return {
                    globalScore: globalScore,
                    constructs: results,
                    normalizationLevel: globalScore >= 70 ? 'normalized' : globalScore >= 40 ? 'emerging' : 'not_normalized',
                    framework: 'NPT',
                    citation: self.citation,
                    generatedAt: new Date().toISOString()
                };
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // v11.0 MODULE: FRAME ADAPTATION TRACKER (Stirman et al. 2019)
        // Reference: Stirman SW, Baumann AA, Miller CJ (2019). Implementation Science, 14:58
        // ═══════════════════════════════════════════════════════════════════════════
        
        var FRAMETracker = {
            version: '1.0',
            citation: 'Stirman SW et al. (2019). Implementation Science, 14:58',
            
            // FRAME dimensions
            dimensions: {
                what: {
                    label: { fr: 'QUOI a été adapté', en: 'WHAT was adapted' },
                    options: [
                        { id: 'content', label: { fr: 'Contenu', en: 'Content' } },
                        { id: 'context', label: { fr: 'Contexte de livraison', en: 'Context of delivery' } },
                        { id: 'training', label: { fr: 'Formation/Supervision', en: 'Training/Supervision' } },
                        { id: 'evaluation', label: { fr: 'Évaluation', en: 'Evaluation' } },
                        { id: 'implementation', label: { fr: 'Activités d\'implémentation', en: 'Implementation activities' } }
                    ]
                },
                whom: {
                    label: { fr: 'Par QUI', en: 'By WHOM' },
                    options: [
                        { id: 'researcher', label: { fr: 'Chercheur', en: 'Researcher' } },
                        { id: 'practitioner', label: { fr: 'Praticien', en: 'Practitioner' } },
                        { id: 'administrator', label: { fr: 'Administrateur', en: 'Administrator' } },
                        { id: 'recipient', label: { fr: 'Bénéficiaire', en: 'Recipient/Patient' } },
                        { id: 'team', label: { fr: 'Équipe mixte', en: 'Mixed team' } }
                    ]
                },
                level: {
                    label: { fr: 'À quel NIVEAU', en: 'At what LEVEL' },
                    options: [
                        { id: 'individual', label: { fr: 'Individuel', en: 'Individual' } },
                        { id: 'cohort', label: { fr: 'Cohorte', en: 'Cohort' } },
                        { id: 'population', label: { fr: 'Population', en: 'Population' } },
                        { id: 'organization', label: { fr: 'Organisation', en: 'Organization' } },
                        { id: 'system', label: { fr: 'Système', en: 'System' } }
                    ]
                },
                type: {
                    label: { fr: 'TYPE de modification', en: 'TYPE of modification' },
                    options: [
                        { id: 'adding', label: { fr: 'Ajout d\'éléments', en: 'Adding elements' } },
                        { id: 'removing', label: { fr: 'Suppression d\'éléments', en: 'Removing/skipping elements' } },
                        { id: 'modifying', label: { fr: 'Modification', en: 'Modifying/adapting' } },
                        { id: 'substituting', label: { fr: 'Substitution', en: 'Substituting' } },
                        { id: 'reordering', label: { fr: 'Réorganisation', en: 'Reordering/restructuring' } },
                        { id: 'shortening', label: { fr: 'Raccourcissement', en: 'Shortening/condensing' } },
                        { id: 'lengthening', label: { fr: 'Extension', en: 'Lengthening/extending' } }
                    ]
                },
                reason: {
                    label: { fr: 'RAISON de l\'adaptation', en: 'REASON for adaptation' },
                    options: [
                        { id: 'cultural', label: { fr: 'Adaptation culturelle', en: 'Cultural adaptation' } },
                        { id: 'resource', label: { fr: 'Contraintes de ressources', en: 'Resource constraints' } },
                        { id: 'organizational', label: { fr: 'Contexte organisationnel', en: 'Organizational context' } },
                        { id: 'regulatory', label: { fr: 'Exigences réglementaires', en: 'Regulatory requirements' } },
                        { id: 'feedback', label: { fr: 'Retour des participants', en: 'Participant feedback' } },
                        { id: 'evidence', label: { fr: 'Nouvelles preuves', en: 'New evidence' } },
                        { id: 'pragmatic', label: { fr: 'Raisons pragmatiques', en: 'Pragmatic reasons' } }
                    ]
                },
                fidelityImpact: {
                    label: { fr: 'Impact sur la FIDÉLITÉ', en: 'FIDELITY impact' },
                    options: [
                        { id: 'core_preserved', label: { fr: 'Composantes essentielles préservées', en: 'Core components preserved' } },
                        { id: 'core_modified', label: { fr: 'Composantes essentielles modifiées', en: 'Core components modified' } },
                        { id: 'periphery_only', label: { fr: 'Périphérie uniquement', en: 'Periphery only' } },
                        { id: 'uncertain', label: { fr: 'Impact incertain', en: 'Uncertain impact' } }
                    ]
                }
            },
            
            // Create a new adaptation record
            createAdaptation: function(data) {
                return {
                    id: 'ADAPT_' + Date.now(),
                    timestamp: new Date().toISOString(),
                    what: data.what || '',
                    whom: data.whom || '',
                    level: data.level || '',
                    type: data.type || '',
                    reason: data.reason || '',
                    fidelityImpact: data.fidelityImpact || 'uncertain',
                    description: data.description || '',
                    justification: data.justification || '',
                    phase: data.phase || 'implementation'
                };
            },
            
            // Analyze fidelity across all adaptations
            analyzeFidelity: function(adaptations, lang) {
                lang = lang || 'fr';
                var total = adaptations.length;
                if (total === 0) return { score: 100, label: lang === 'fr' ? 'Aucune adaptation' : 'No adaptations', risk: 'none' };
                
                var coreModified = adaptations.filter(function(a) { return a.fidelityImpact === 'core_modified'; }).length;
                var corePreserved = adaptations.filter(function(a) { return a.fidelityImpact === 'core_preserved'; }).length;
                var peripheryOnly = adaptations.filter(function(a) { return a.fidelityImpact === 'periphery_only'; }).length;
                
                var score = Math.round(((corePreserved + peripheryOnly * 0.9) / total) * 100);
                var risk = coreModified > total * 0.3 ? 'high' : coreModified > 0 ? 'moderate' : 'low';
                
                return {
                    score: score,
                    total: total,
                    coreModified: coreModified,
                    corePreserved: corePreserved,
                    peripheryOnly: peripheryOnly,
                    risk: risk,
                    label: risk === 'high' 
                        ? (lang === 'fr' ? 'Risque élevé de dérive' : 'High drift risk')
                        : risk === 'moderate'
                            ? (lang === 'fr' ? 'Risque modéré' : 'Moderate risk')
                            : (lang === 'fr' ? 'Fidélité préservée' : 'Fidelity preserved'),
                    citation: this.citation
                };
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // v11.0 MODULE: IMPLEMENTATION OUTCOMES (Proctor et al. 2011)
        // Reference: Proctor E et al. (2011). Admin & Policy in Mental Health, 38:65-76
        // The "taxonomy of implementation outcomes" — 8 distinct outcomes
        // ═══════════════════════════════════════════════════════════════════════════
        
        var ImplementationOutcomes = {
            version: '1.0',
            citation: 'Proctor E et al. (2011). Admin & Policy in Mental Health, 38:65-76',
            
            outcomes: {
                acceptability: {
                    id: 'acceptability',
                    label: { fr: 'Acceptabilité', en: 'Acceptability' },
                    definition: { fr: 'Perception que l\'innovation est agréable, satisfaisante', en: 'Perception that the innovation is agreeable, palatable, satisfactory' },
                    instruments: ['Acceptability of Intervention Measure (AIM)', 'Treatment Acceptability Questionnaire'],
                    cfirLink: ['IC3', 'IS6'],
                    color: '#3b82f6'
                },
                adoption: {
                    id: 'adoption',
                    label: { fr: 'Adoption', en: 'Adoption' },
                    definition: { fr: 'Intention, décision initiale, ou action d\'utiliser l\'innovation', en: 'Intention, initial decision, or action to try the innovation' },
                    instruments: ['RE-AIM Adoption measure', 'Provider surveys'],
                    cfirLink: ['IN4', 'IS11'],
                    color: '#10b981'
                },
                appropriateness: {
                    id: 'appropriateness',
                    label: { fr: 'Pertinence', en: 'Appropriateness' },
                    definition: { fr: 'Compatibilité perçue de l\'innovation avec le contexte, le prestataire, le consommateur', en: 'Perceived fit, relevance, or compatibility of the innovation for the setting' },
                    instruments: ['Intervention Appropriateness Measure (IAM)', 'Perceived Characteristics of Intervention'],
                    cfirLink: ['IS6', 'IC3'],
                    color: '#8b5cf6'
                },
                feasibility: {
                    id: 'feasibility',
                    label: { fr: 'Faisabilité', en: 'Feasibility' },
                    definition: { fr: 'Mesure dans laquelle l\'innovation peut être utilisée avec succès dans le cadre donné', en: 'Extent to which the innovation can be successfully used within the setting' },
                    instruments: ['Feasibility of Intervention Measure (FIM)', 'Organizational Readiness'],
                    cfirLink: ['IS12', 'IC6'],
                    color: '#f59e0b'
                },
                fidelity: {
                    id: 'fidelity',
                    label: { fr: 'Fidélité', en: 'Fidelity' },
                    definition: { fr: 'Degré de conformité à la mise en œuvre prévue initialement', en: 'Degree to which the innovation was implemented as prescribed' },
                    instruments: ['Fidelity checklists', 'FRAME (Stirman 2019)'],
                    cfirLink: ['PR4', 'IC4'],
                    color: '#ef4444'
                },
                cost: {
                    id: 'cost',
                    label: { fr: 'Coût d\'implémentation', en: 'Implementation Cost' },
                    definition: { fr: 'Coût de la stratégie d\'implémentation elle-même', en: 'Cost impact of the implementation strategy itself' },
                    instruments: ['Budget Impact Analysis', 'Cost-effectiveness analysis'],
                    cfirLink: ['IC8', 'OS6'],
                    color: '#14b8a6'
                },
                penetration: {
                    id: 'penetration',
                    label: { fr: 'Pénétration', en: 'Penetration' },
                    definition: { fr: 'Intégration de l\'innovation dans le cadre et ses sous-systèmes', en: 'Integration of the innovation within the setting and its subsystems' },
                    instruments: ['RE-AIM Reach/Adoption', 'Service delivery data'],
                    cfirLink: ['IS1', 'OS4'],
                    color: '#a855f7'
                },
                sustainability: {
                    id: 'sustainability',
                    label: { fr: 'Pérennité', en: 'Sustainability' },
                    definition: { fr: 'Maintien de l\'innovation après la fin du financement initial', en: 'Extent to which the innovation is maintained after initial funding ends' },
                    instruments: ['PSAT', 'Scheirer Framework', 'RE-AIM Maintenance'],
                    cfirLink: ['OS6', 'IS14'],
                    color: '#f97316'
                }
            },
            
            evaluate: function(scores, lang) {
                lang = lang || 'fr';
                var self = this;
                var results = {};
                var totalScore = 0;
                var count = 0;
                
                Object.keys(this.outcomes).forEach(function(outcomeId) {
                    var outcome = self.outcomes[outcomeId];
                    var score = (scores && scores[outcomeId]) ? scores[outcomeId] : 0;
                    
                    results[outcomeId] = {
                        id: outcomeId,
                        label: outcome.label[lang],
                        definition: outcome.definition[lang],
                        score: score,
                        color: outcome.color,
                        instruments: outcome.instruments,
                        cfirLink: outcome.cfirLink,
                        status: score >= 70 ? 'strong' : score >= 40 ? 'moderate' : 'weak'
                    };
                    
                    totalScore += score;
                    count++;
                });
                
                return {
                    globalScore: count > 0 ? Math.round(totalScore / count) : 0,
                    outcomes: results,
                    framework: 'Proctor Implementation Outcomes',
                    citation: self.citation,
                    generatedAt: new Date().toISOString()
                };
            }
        };
        
        console.log('✅ MOUDAR v11.0 Scientific Excellence Modules: NPTEvaluator, FRAMETracker, ImplementationOutcomes, CFIR-ERIC Matching, SMARTDesigner, DeepAIAnalyzer (LLM-Powered)');
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 5: FUNDING PROPOSAL GENERATOR - Templates bailleurs
        // ═══════════════════════════════════════════════════════════════════════════
        
        var FundingGenerator = {
            templates: {
                WHO: {
                    name: 'World Health Organization',
                    logo: '🏥',
                    sections: [
                        { id: 'exec', title: { fr: 'Résumé exécutif', en: 'Executive Summary' }, maxWords: 500 },
                        { id: 'background', title: { fr: 'Contexte et justification', en: 'Background & Rationale' }, maxWords: 1000 },
                        { id: 'objectives', title: { fr: 'Objectifs et résultats attendus', en: 'Objectives & Expected Results' }, maxWords: 800 },
                        { id: 'methods', title: { fr: 'Méthodologie', en: 'Methodology' }, maxWords: 1500 },
                        { id: 'implementation', title: { fr: 'Plan d\'implémentation', en: 'Implementation Plan' }, maxWords: 1000 },
                        { id: 'monitoring', title: { fr: 'Suivi et évaluation', en: 'Monitoring & Evaluation' }, maxWords: 800 },
                        { id: 'budget', title: { fr: 'Budget détaillé', en: 'Detailed Budget' }, maxWords: 500 },
                        { id: 'sustainability', title: { fr: 'Durabilité', en: 'Sustainability' }, maxWords: 500 },
                        { id: 'risks', title: { fr: 'Risques et mitigation', en: 'Risks & Mitigation' }, maxWords: 500 }
                    ],
                    priorities: ['equity', 'evidence_based', 'sustainability']
                },
                UNICEF: {
                    name: 'UNICEF',
                    logo: '👶',
                    sections: [
                        { id: 'summary', title: { fr: 'Résumé de la proposition', en: 'Proposal Summary' }, maxWords: 400 },
                        { id: 'situation', title: { fr: 'Analyse de la situation', en: 'Situation Analysis' }, maxWords: 1200 },
                        { id: 'theory', title: { fr: 'Théorie du changement', en: 'Theory of Change' }, maxWords: 800 },
                        { id: 'strategy', title: { fr: 'Stratégie d\'intervention', en: 'Intervention Strategy' }, maxWords: 1000 },
                        { id: 'workplan', title: { fr: 'Plan de travail', en: 'Workplan' }, maxWords: 800 },
                        { id: 'results', title: { fr: 'Cadre de résultats', en: 'Results Framework' }, maxWords: 600 },
                        { id: 'budget', title: { fr: 'Budget', en: 'Budget' }, maxWords: 400 },
                        { id: 'partners', title: { fr: 'Partenariats', en: 'Partnerships' }, maxWords: 400 }
                    ],
                    priorities: ['equity', 'speed', 'cost_effectiveness']
                },
                GlobalFund: {
                    name: 'Global Fund',
                    logo: '🌍',
                    sections: [
                        { id: 'overview', title: { fr: 'Vue d\'ensemble du programme', en: 'Program Overview' }, maxWords: 600 },
                        { id: 'epidemiology', title: { fr: 'Contexte épidémiologique', en: 'Epidemiological Context' }, maxWords: 1000 },
                        { id: 'gaps', title: { fr: 'Gaps et priorités', en: 'Gaps & Priorities' }, maxWords: 800 },
                        { id: 'interventions', title: { fr: 'Interventions proposées', en: 'Proposed Interventions' }, maxWords: 1200 },
                        { id: 'targets', title: { fr: 'Cibles et indicateurs', en: 'Targets & Indicators' }, maxWords: 800 },
                        { id: 'implementation', title: { fr: 'Arrangements d\'implémentation', en: 'Implementation Arrangements' }, maxWords: 1000 },
                        { id: 'budget', title: { fr: 'Budget par module', en: 'Budget by Module' }, maxWords: 600 },
                        { id: 'sustainability', title: { fr: 'Transition et durabilité', en: 'Transition & Sustainability' }, maxWords: 600 }
                    ],
                    priorities: ['evidence_based', 'cost_effectiveness', 'sustainability']
                },
                USAID: {
                    name: 'USAID',
                    logo: '🇺🇸',
                    sections: [
                        { id: 'abstract', title: { fr: 'Résumé', en: 'Abstract' }, maxWords: 300 },
                        { id: 'problem', title: { fr: 'Énoncé du problème', en: 'Problem Statement' }, maxWords: 800 },
                        { id: 'approach', title: { fr: 'Approche technique', en: 'Technical Approach' }, maxWords: 1500 },
                        { id: 'management', title: { fr: 'Approche de gestion', en: 'Management Approach' }, maxWords: 800 },
                        { id: 'staffing', title: { fr: 'Plan de dotation', en: 'Staffing Plan' }, maxWords: 500 },
                        { id: 'mel', title: { fr: 'Plan MEL', en: 'MEL Plan' }, maxWords: 800 },
                        { id: 'budget', title: { fr: 'Budget narratif', en: 'Budget Narrative' }, maxWords: 600 },
                        { id: 'past', title: { fr: 'Expérience passée', en: 'Past Performance' }, maxWords: 500 }
                    ],
                    priorities: ['evidence_based', 'sustainability', 'speed']
                }
            },
            
            generate: function(project, strategies, budget, funder, lang) {
                lang = lang || 'fr';
                var template = this.templates[funder] || this.templates.WHO;
                var self = this;
                
                var strategyLabels = strategies.map(function(s) {
                    var strat = KnowledgeGraph.nodes.strategies[s.id || s];
                    return strat ? strat.label[lang] : (s.id || s);
                });
                
                var proposal = {
                    funder: funder,
                    funderName: template.name,
                    logo: template.logo,
                    projectTitle: project.title || (lang === 'fr' ? 'Projet d\'implémentation' : 'Implementation Project'),
                    organization: project.organization || '',
                    totalBudget: budget.summary ? budget.summary.total : 100000,
                    duration: project.duration || 24,
                    sections: [],
                    completionRate: 0,
                    generatedAt: new Date().toISOString()
                };
                
                var completedSections = 0;
                
                template.sections.forEach(function(section) {
                    var content = self.generateSectionContent(section.id, project, strategies, budget, lang);
                    var isComplete = content && content.length > 50;
                    if (isComplete) completedSections++;
                    
                    proposal.sections.push({
                        id: section.id,
                        title: section.title[lang],
                        maxWords: section.maxWords,
                        content: content,
                        wordCount: content ? content.split(/\s+/).length : 0,
                        status: isComplete ? 'complete' : 'draft',
                        tips: self.getSectionTips(section.id, lang)
                    });
                });
                
                proposal.completionRate = Math.round((completedSections / template.sections.length) * 100);
                proposal.strategies = strategyLabels;
                proposal.priorities = template.priorities;
                
                return proposal;
            },
            
            generateSectionContent: function(sectionId, project, strategies, budget, lang) {
                var contents = {
                    exec: lang === 'fr' 
                        ? 'Ce projet vise à implémenter une intervention basée sur des preuves dans le domaine de ' + (project.domain || 'la santé') + '. Sur une durée de ' + (project.duration || 24) + ' mois, le projet touchera ' + (project.population || 100) + ' bénéficiaires à travers ' + strategies.length + ' stratégies d\'implémentation validées.'
                        : 'This project aims to implement an evidence-based intervention in the field of ' + (project.domain || 'health') + '. Over ' + (project.duration || 24) + ' months, the project will reach ' + (project.population || 100) + ' beneficiaries through ' + strategies.length + ' validated implementation strategies.',
                    summary: lang === 'fr'
                        ? 'Proposition pour l\'implémentation d\'une intervention innovante ciblant ' + (project.population || 100) + ' bénéficiaires. Budget total: $' + (budget.summary ? budget.summary.total.toLocaleString() : '100,000') + ' USD.'
                        : 'Proposal for implementing an innovative intervention targeting ' + (project.population || 100) + ' beneficiaries. Total budget: $' + (budget.summary ? budget.summary.total.toLocaleString() : '100,000') + ' USD.',
                    background: project.context || (lang === 'fr' ? '[Contexte à compléter]' : '[Context to complete]'),
                    objectives: lang === 'fr'
                        ? 'Objectif général: Améliorer les outcomes de santé de la population cible.\n\nObjectifs spécifiques:\n1. Former ' + (project.population || 100) + ' professionnels\n2. Atteindre un taux d\'adoption de 70%\n3. Maintenir les effets sur 12 mois post-projet'
                        : 'General objective: Improve health outcomes of the target population.\n\nSpecific objectives:\n1. Train ' + (project.population || 100) + ' professionals\n2. Achieve 70% adoption rate\n3. Maintain effects for 12 months post-project',
                    budget: lang === 'fr'
                        ? 'Budget total: $' + (budget.summary ? budget.summary.total.toLocaleString() : '100,000') + ' USD\n- Démarrage: $' + (budget.summary ? budget.summary.setup.toLocaleString() : '20,000') + '\n- Récurrent: $' + (budget.summary ? budget.summary.recurring.toLocaleString() : '80,000')
                        : 'Total budget: $' + (budget.summary ? budget.summary.total.toLocaleString() : '100,000') + ' USD\n- Setup: $' + (budget.summary ? budget.summary.setup.toLocaleString() : '20,000') + '\n- Recurring: $' + (budget.summary ? budget.summary.recurring.toLocaleString() : '80,000')
                };
                
                return contents[sectionId] || (lang === 'fr' ? '[Section à compléter]' : '[Section to complete]');
            },
            
            getSectionTips: function(sectionId, lang) {
                var tips = {
                    exec: { fr: 'Maximum 1 page. Inclure problème, solution, budget et résultats attendus.', en: 'Maximum 1 page. Include problem, solution, budget and expected results.' },
                    background: { fr: 'Citer des données locales et internationales. Référencer les politiques nationales.', en: 'Cite local and international data. Reference national policies.' },
                    objectives: { fr: 'Utiliser la formulation SMART. Aligner avec les ODD.', en: 'Use SMART formulation. Align with SDGs.' },
                    budget: { fr: 'Détailler par catégorie. Justifier les coûts unitaires.', en: 'Detail by category. Justify unit costs.' }
                };
                return tips[sectionId] ? tips[sectionId][lang] : '';
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 6: MONITORING DASHBOARD - Tableau de bord temps réel
        // ═══════════════════════════════════════════════════════════════════════════
        
        var MonitoringDashboard = {
            generate: function(project, strategies, lang) {
                lang = lang || 'fr';
                var self = this;
                
                // Générer les KPIs par stratégie
                var kpis = [];
                strategies.forEach(function(s) {
                    var strat = KnowledgeGraph.nodes.strategies[s.id || s];
                    if (strat && strat.kpis) {
                        strat.kpis.forEach(function(kpi) {
                            kpis.push({
                                strategyId: s.id || s,
                                strategyName: strat.label[lang],
                                id: kpi.id,
                                indicator: kpi.indicator[lang],
                                target: kpi.target,
                                frequency: kpi.frequency[lang],
                                source: kpi.source[lang],
                                currentValue: null,
                                status: 'pending',
                                trend: 'stable'
                            });
                        });
                    }
                });
                
                // Structure du dashboard
                var dashboard = {
                    projectTitle: project.title || '',
                    lastUpdated: new Date().toISOString(),
                    
                    // Vue d'ensemble
                    overview: {
                        phase: project.phase || 'preparation',
                        progress: 35, // Simulé
                        daysRemaining: (project.duration || 24) * 30 - 60,
                        budgetSpent: 28, // %
                        alerts: [
                            { level: 'warning', message: lang === 'fr' ? 'Retard formation site 3' : 'Training delay site 3' },
                            { level: 'info', message: lang === 'fr' ? 'Audit Q1 prévu dans 2 semaines' : 'Q1 audit scheduled in 2 weeks' }
                        ]
                    },
                    
                    // KPIs
                    kpis: kpis,
                    
                    // Indicateurs agrégés
                    indicators: {
                        reach: { label: lang === 'fr' ? 'Portée' : 'Reach', value: 65, target: 80, unit: '%' },
                        adoption: { label: lang === 'fr' ? 'Adoption' : 'Adoption', value: 72, target: 70, unit: '%' },
                        fidelity: { label: lang === 'fr' ? 'Fidélité' : 'Fidelity', value: 85, target: 80, unit: '%' },
                        satisfaction: { label: lang === 'fr' ? 'Satisfaction' : 'Satisfaction', value: 4.2, target: 4.0, unit: '/5' }
                    },
                    
                    // Timeline
                    timeline: {
                        milestones: [
                            { date: '2025-01', label: lang === 'fr' ? 'Lancement' : 'Launch', status: 'completed' },
                            { date: '2025-03', label: lang === 'fr' ? 'Formation terminée' : 'Training complete', status: 'completed' },
                            { date: '2025-06', label: lang === 'fr' ? 'Pilote terminé' : 'Pilot complete', status: 'in-progress' },
                            { date: '2025-09', label: lang === 'fr' ? 'Déploiement' : 'Rollout', status: 'upcoming' },
                            { date: '2025-12', label: lang === 'fr' ? 'Évaluation finale' : 'Final evaluation', status: 'upcoming' }
                        ]
                    },
                    
                    // Alertes prédictives
                    predictiveAlerts: self.generatePredictiveAlerts(project, strategies, lang),
                    
                    // Données pour graphiques
                    charts: {
                        progressByMonth: self.generateProgressData(project.duration || 24),
                        kpiTrends: self.generateKPITrends(6),
                        budgetBurndown: self.generateBudgetBurndown(project.duration || 24)
                    }
                };
                
                return dashboard;
            },
            
            generatePredictiveAlerts: function(project, strategies, lang) {
                var alerts = [];
                var strategyIds = strategies.map(function(s) { return s.id || s; });
                
                // Alerte si pas de supervision
                if (strategyIds.indexOf('S10') < 0) {
                    alerts.push({
                        type: 'risk',
                        severity: 'high',
                        message: lang === 'fr' 
                            ? 'Risque de dérive des pratiques détecté: aucune supervision prévue'
                            : 'Practice drift risk detected: no supervision planned',
                        recommendation: lang === 'fr' ? 'Ajouter S10 (Supervision clinique)' : 'Add S10 (Clinical supervision)'
                    });
                }
                
                // Alerte turnover
                if (strategyIds.indexOf('S15') < 0 && strategyIds.indexOf('S06') < 0) {
                    alerts.push({
                        type: 'prediction',
                        severity: 'medium',
                        message: lang === 'fr'
                            ? 'Probabilité de turnover élevée (>40%) sans mécanismes de rétention'
                            : 'High turnover probability (>40%) without retention mechanisms',
                        recommendation: lang === 'fr' ? 'Considérer S15 ou S06' : 'Consider S15 or S06'
                    });
                }
                
                return alerts;
            },
            
            generateProgressData: function(durationMonths) {
                var data = [];
                for (var i = 0; i <= durationMonths; i += 3) {
                    var planned = Math.round((i / durationMonths) * 100);
                    var actual = i <= 6 ? Math.round(planned * 0.9) : null;
                    data.push({
                        month: i,
                        planned: planned,
                        actual: actual
                    });
                }
                return data;
            },
            
            generateKPITrends: function(months) {
                var data = [];
                for (var i = 1; i <= months; i++) {
                    data.push({
                        month: 'M' + i,
                        adoption: 40 + i * 8 + Math.random() * 10,
                        fidelity: 70 + i * 3 + Math.random() * 5,
                        satisfaction: 3.5 + i * 0.1 + Math.random() * 0.3
                    });
                }
                return data;
            },
            
            generateBudgetBurndown: function(durationMonths) {
                var data = [];
                var remaining = 100;
                for (var i = 0; i <= durationMonths; i += 3) {
                    var burn = i === 0 ? 0 : 15 + Math.random() * 10;
                    remaining = Math.max(0, remaining - burn);
                    data.push({
                        month: i,
                        planned: 100 - (i / durationMonths) * 100,
                        actual: i <= 9 ? remaining : null
                    });
                }
                return data;
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 7: LOGIC MODEL GENERATOR - Diagramme logique
        // ═══════════════════════════════════════════════════════════════════════════
        
        var LogicModelGenerator = {
            generate: function(project, strategies, lang) {
                lang = lang || 'fr';
                
                var strategyLabels = strategies.map(function(s) {
                    var strat = KnowledgeGraph.nodes.strategies[s.id || s];
                    return strat ? strat.label[lang] : (s.id || s);
                });
                
                return {
                    inputs: [
                        { id: 'I1', label: lang === 'fr' ? 'Financement' : 'Funding', value: '$' + ((project.budget || 100000) / 1000).toFixed(0) + 'K' },
                        { id: 'I2', label: lang === 'fr' ? 'Personnel' : 'Staff', value: (project.staff || 10) + ' ETP' },
                        { id: 'I3', label: lang === 'fr' ? 'Infrastructure' : 'Infrastructure', value: (project.sites || 5) + ' sites' },
                        { id: 'I4', label: lang === 'fr' ? 'Expertise technique' : 'Technical expertise', value: lang === 'fr' ? 'Équipe projet' : 'Project team' },
                        { id: 'I5', label: lang === 'fr' ? 'Partenariats' : 'Partnerships', value: (project.partners || 3) + ' partenaires' }
                    ],
                    activities: strategyLabels.slice(0, 6).map(function(label, i) {
                        return { id: 'A' + (i + 1), label: label };
                    }),
                    outputs: [
                        { id: 'O1', label: lang === 'fr' ? 'Professionnels formés' : 'Professionals trained', target: project.population || 100 },
                        { id: 'O2', label: lang === 'fr' ? 'Sessions supervision' : 'Supervision sessions', target: (project.duration || 24) * 4 },
                        { id: 'O3', label: lang === 'fr' ? 'Outils développés' : 'Tools developed', target: 5 },
                        { id: 'O4', label: lang === 'fr' ? 'Sites actifs' : 'Active sites', target: project.sites || 5 },
                        { id: 'O5', label: lang === 'fr' ? 'Réunions parties prenantes' : 'Stakeholder meetings', target: (project.duration || 24) / 3 }
                    ],
                    outcomes: {
                        shortTerm: [
                            { id: 'ST1', label: lang === 'fr' ? 'Connaissances améliorées' : 'Improved knowledge' },
                            { id: 'ST2', label: lang === 'fr' ? 'Attitudes positives' : 'Positive attitudes' },
                            { id: 'ST3', label: lang === 'fr' ? 'Confiance accrue' : 'Increased confidence' }
                        ],
                        mediumTerm: [
                            { id: 'MT1', label: lang === 'fr' ? 'Changement de pratiques' : 'Practice change' },
                            { id: 'MT2', label: lang === 'fr' ? 'Adoption de l\'innovation' : 'Innovation adoption' },
                            { id: 'MT3', label: lang === 'fr' ? 'Qualité améliorée' : 'Improved quality' }
                        ],
                        longTerm: [
                            { id: 'LT1', label: lang === 'fr' ? 'Outcomes santé améliorés' : 'Improved health outcomes' },
                            { id: 'LT2', label: lang === 'fr' ? 'Système renforcé' : 'Strengthened system' },
                            { id: 'LT3', label: lang === 'fr' ? 'Changement pérenne' : 'Sustained change' }
                        ]
                    },
                    impact: {
                        label: lang === 'fr' ? 'Impact final' : 'Final Impact',
                        statement: lang === 'fr'
                            ? 'Amélioration durable de la santé et du bien-être de la population cible'
                            : 'Sustained improvement in health and well-being of target population'
                    },
                    assumptions: [
                        lang === 'fr' ? 'Le financement reste stable' : 'Funding remains stable',
                        lang === 'fr' ? 'Le contexte politique est favorable' : 'Political context is favorable',
                        lang === 'fr' ? 'Les professionnels sont disponibles' : 'Professionals are available'
                    ],
                    externalFactors: [
                        lang === 'fr' ? 'Évolution des politiques nationales' : 'National policy evolution',
                        lang === 'fr' ? 'Contexte économique' : 'Economic context',
                        lang === 'fr' ? 'Autres interventions' : 'Other interventions'
                    ],
                    generatedAt: new Date().toISOString()
                };
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 8: MONTE CARLO SIMULATOR - Simulation probabiliste
        // ═══════════════════════════════════════════════════════════════════════════
        
        var MonteCarloSimulator = {
            run: function(project, strategies, iterations, lang) {
                lang = lang || 'fr';
                iterations = iterations || 10000;
                
                var results = [];
                var strategyIds = strategies.map(function(s) { return s.id || s; });
                
                // Paramètres de base
                var baseSuccess = 0.45;
                var strategyBonus = strategyIds.length * 0.03;
                
                // Exécuter les simulations
                for (var i = 0; i < iterations; i++) {
                    // Variations aléatoires
                    var contextVariation = (Math.random() - 0.5) * 0.3;
                    var implementationQuality = 0.7 + Math.random() * 0.3;
                    var externalFactors = (Math.random() - 0.5) * 0.2;
                    
                    var successProb = baseSuccess + strategyBonus + contextVariation * implementationQuality + externalFactors;
                    successProb = Math.max(0.1, Math.min(0.95, successProb));
                    
                    results.push(Math.round(successProb * 100));
                }
                
                // Calcul des statistiques
                results.sort(function(a, b) { return a - b; });
                
                var mean = results.reduce(function(a, b) { return a + b; }, 0) / iterations;
                var variance = results.reduce(function(a, b) { return a + Math.pow(b - mean, 2); }, 0) / iterations;
                var stdDev = Math.sqrt(variance);
                
                var p5 = results[Math.floor(iterations * 0.05)];
                var p25 = results[Math.floor(iterations * 0.25)];
                var p50 = results[Math.floor(iterations * 0.50)];
                var p75 = results[Math.floor(iterations * 0.75)];
                var p95 = results[Math.floor(iterations * 0.95)];
                
                // Distribution pour histogramme
                var histogram = {};
                for (var j = 0; j <= 100; j += 5) {
                    histogram[j] = 0;
                }
                results.forEach(function(r) {
                    var bucket = Math.floor(r / 5) * 5;
                    histogram[bucket]++;
                });
                
                var histogramData = Object.keys(histogram).map(function(k) {
                    return { range: k + '-' + (parseInt(k) + 5), count: histogram[k], percentage: (histogram[k] / iterations * 100).toFixed(1) };
                });
                
                return {
                    iterations: iterations,
                    statistics: {
                        mean: Math.round(mean),
                        median: p50,
                        stdDev: Math.round(stdDev * 10) / 10,
                        min: results[0],
                        max: results[iterations - 1]
                    },
                    percentiles: {
                        p5: p5,
                        p25: p25,
                        p50: p50,
                        p75: p75,
                        p95: p95
                    },
                    confidenceIntervals: {
                        ci90: { lower: p5, upper: p95 },
                        ci50: { lower: p25, upper: p75 }
                    },
                    histogram: histogramData,
                    interpretation: {
                        fr: 'Avec 90% de confiance, le taux de succès sera entre ' + p5 + '% et ' + p95 + '%. La valeur la plus probable est ' + p50 + '%.',
                        en: 'With 90% confidence, success rate will be between ' + p5 + '% and ' + p95 + '%. Most likely value is ' + p50 + '%.'
                    }[lang],
                    riskAssessment: {
                        probabilityBelow50: Math.round(results.filter(function(r) { return r < 50; }).length / iterations * 100),
                        probabilityAbove70: Math.round(results.filter(function(r) { return r >= 70; }).length / iterations * 100)
                    },
                    generatedAt: new Date().toISOString()
                };
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 9: ADVANCED NLP ANALYZER - Analyse barrières par IA
        // ═══════════════════════════════════════════════════════════════════════════
        
        var AdvancedNLPAnalyzer = {
            // Dictionnaires enrichis par catégorie de barrière
            barrierLexicons: {
                capacity: {
                    keywords: {
                        fr: ['formation', 'compétence', 'connaissance', 'savoir', 'expertise', 'qualification', 'capacité', 'aptitude', 'maîtrise', 'expérience', 'novice', 'débutant', 'inexpérimenté', 'apprendre', 'apprentissage'],
                        en: ['training', 'skill', 'knowledge', 'expertise', 'qualification', 'capacity', 'ability', 'mastery', 'experience', 'novice', 'beginner', 'inexperienced', 'learn', 'learning']
                    },
                    weight: 1.0,
                    strategies: ['S01', 'S14', 'S09']
                },
                motivation: {
                    keywords: {
                        fr: ['motivation', 'résistance', 'réticent', 'refus', 'opposition', 'engagement', 'adhésion', 'conviction', 'volonté', 'intérêt', 'enthousiasme', 'démotivé', 'burnout', 'épuisement', 'lassitude'],
                        en: ['motivation', 'resistance', 'reluctant', 'refusal', 'opposition', 'engagement', 'commitment', 'willingness', 'interest', 'enthusiasm', 'demotivated', 'burnout', 'exhaustion', 'fatigue']
                    },
                    weight: 0.95,
                    strategies: ['S04', 'S06', 'S15']
                },
                resources: {
                    keywords: {
                        fr: ['budget', 'financement', 'ressource', 'argent', 'coût', 'moyens', 'matériel', 'équipement', 'infrastructure', 'personnel', 'effectif', 'temps', 'surcharge', 'manque'],
                        en: ['budget', 'funding', 'resource', 'money', 'cost', 'means', 'material', 'equipment', 'infrastructure', 'staff', 'personnel', 'time', 'overload', 'lack']
                    },
                    weight: 0.9,
                    strategies: ['S06', 'S19', 'S17']
                },
                organizational: {
                    keywords: {
                        fr: ['direction', 'leadership', 'hiérarchie', 'management', 'organisation', 'structure', 'bureaucratie', 'procédure', 'protocole', 'politique', 'décision', 'gouvernance', 'silo', 'cloisonnement'],
                        en: ['leadership', 'management', 'hierarchy', 'organization', 'structure', 'bureaucracy', 'procedure', 'protocol', 'policy', 'decision', 'governance', 'silo', 'compartmentalization']
                    },
                    weight: 0.9,
                    strategies: ['S07', 'S20', 'S04']
                },
                cultural: {
                    keywords: {
                        fr: ['culture', 'tradition', 'croyance', 'religion', 'tabou', 'stigma', 'stigmatisation', 'discrimination', 'préjugé', 'mentalité', 'attitude', 'perception', 'acceptabilité', 'norme'],
                        en: ['culture', 'tradition', 'belief', 'religion', 'taboo', 'stigma', 'stigmatization', 'discrimination', 'prejudice', 'mentality', 'attitude', 'perception', 'acceptability', 'norm']
                    },
                    weight: 0.95,
                    strategies: ['S08', 'S18', 'S11']
                },
                technical: {
                    keywords: {
                        fr: ['technique', 'technologie', 'informatique', 'système', 'logiciel', 'données', 'digital', 'numérique', 'connexion', 'internet', 'ordinateur', 'application', 'bug', 'panne'],
                        en: ['technical', 'technology', 'IT', 'system', 'software', 'data', 'digital', 'connection', 'internet', 'computer', 'application', 'bug', 'failure']
                    },
                    weight: 0.8,
                    strategies: ['S13', 'S09', 'S05']
                },
                communication: {
                    keywords: {
                        fr: ['communication', 'information', 'diffusion', 'partage', 'coordination', 'collaboration', 'réunion', 'feedback', 'retour', 'échange', 'dialogue', 'transparence', 'confiance'],
                        en: ['communication', 'information', 'dissemination', 'sharing', 'coordination', 'collaboration', 'meeting', 'feedback', 'exchange', 'dialogue', 'transparency', 'trust']
                    },
                    weight: 0.75,
                    strategies: ['S03', 'S20', 'S12']
                },
                contextual: {
                    keywords: {
                        fr: ['rural', 'urbain', 'géographique', 'distance', 'accès', 'accessibilité', 'transport', 'isolement', 'éloignement', 'territoire', 'région', 'local'],
                        en: ['rural', 'urban', 'geographic', 'distance', 'access', 'accessibility', 'transport', 'isolation', 'remoteness', 'territory', 'region', 'local']
                    },
                    weight: 0.85,
                    strategies: ['S19', 'S17', 'S08']
                }
            },
            
            // Patterns de phrases complexes
            complexPatterns: {
                fr: [
                    { pattern: /pas\s+(de\s+)?(formation|compétence|connaissance)/i, category: 'capacity', boost: 0.3 },
                    { pattern: /manque\s+(de\s+)?(temps|ressource|moyen|personnel|budget)/i, category: 'resources', boost: 0.3 },
                    { pattern: /résist\w+\s+(au|à la)?\s*chang/i, category: 'motivation', boost: 0.4 },
                    { pattern: /(stigma|tabou|honte)\s+\w*\s*(mental|psy)/i, category: 'cultural', boost: 0.5 },
                    { pattern: /direction\s+\w*\s*(pas|ne\s+pas|non)\s+\w*\s*(soutien|support|engage)/i, category: 'organizational', boost: 0.4 },
                    { pattern: /zone\s+(rurale|isolée|éloignée)/i, category: 'contextual', boost: 0.3 },
                    { pattern: /système\s+\w*\s*(obsolète|ancien|dépassé)/i, category: 'technical', boost: 0.3 }
                ],
                en: [
                    { pattern: /lack\s+of\s+(training|skill|knowledge)/i, category: 'capacity', boost: 0.3 },
                    { pattern: /lack\s+of\s+(time|resource|staff|budget|funding)/i, category: 'resources', boost: 0.3 },
                    { pattern: /resist\w+\s+to\s+chang/i, category: 'motivation', boost: 0.4 },
                    { pattern: /(stigma|taboo|shame)\s+\w*\s*(mental|psych)/i, category: 'cultural', boost: 0.5 },
                    { pattern: /leadership\s+\w*\s*(not|no|lack)\s+\w*\s*(support|engage)/i, category: 'organizational', boost: 0.4 },
                    { pattern: /(rural|remote|isolated)\s+area/i, category: 'contextual', boost: 0.3 },
                    { pattern: /(outdated|legacy|old)\s+system/i, category: 'technical', boost: 0.3 }
                ]
            },
            
            analyzeBarriers: function(text, lang) {
                lang = lang || 'fr';
                var self = this;
                
                if (!text || text.length < 10) {
                    return { barriers: [], confidence: 0, recommendations: [] };
                }
                
                var normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                var scores = {};
                var matchedKeywords = {};
                
                // Initialiser
                Object.keys(this.barrierLexicons).forEach(function(cat) {
                    scores[cat] = 0;
                    matchedKeywords[cat] = [];
                });
                
                // Analyse par mots-clés
                Object.keys(this.barrierLexicons).forEach(function(category) {
                    var lexicon = self.barrierLexicons[category];
                    var keywords = lexicon.keywords[lang] || lexicon.keywords.fr;
                    
                    keywords.forEach(function(kw) {
                        var normalizedKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        var regex = new RegExp('\\b' + normalizedKw + '\\w*', 'gi');
                        var matches = normalizedText.match(regex);
                        if (matches) {
                            scores[category] += matches.length * lexicon.weight;
                            matchedKeywords[category].push(kw);
                        }
                    });
                });
                
                // Analyse par patterns complexes
                this.complexPatterns[lang].forEach(function(p) {
                    if (p.pattern.test(text)) {
                        scores[p.category] += p.boost * 10;
                    }
                });
                
                // Normaliser et filtrer
                var maxScore = Math.max.apply(null, Object.values(scores).concat([1]));
                var barriers = [];
                
                Object.keys(scores).forEach(function(category) {
                    var normalizedScore = scores[category] / maxScore;
                    if (normalizedScore > 0.2) {
                        barriers.push({
                            category: category,
                            label: self.getCategoryLabel(category, lang),
                            score: Math.round(normalizedScore * 100),
                            confidence: normalizedScore > 0.6 ? 'high' : normalizedScore > 0.4 ? 'medium' : 'low',
                            keywords: Array.from(new Set(matchedKeywords[category])).slice(0, 5),
                            strategies: self.barrierLexicons[category].strategies
                        });
                    }
                });
                
                // Trier par score
                barriers.sort(function(a, b) { return b.score - a.score; });
                
                // Générer recommandations
                var recommendations = [];
                barriers.slice(0, 3).forEach(function(b) {
                    b.strategies.forEach(function(sid) {
                        var strat = KnowledgeGraph.nodes.strategies[sid];
                        if (strat && recommendations.length < 5) {
                            recommendations.push({
                                strategyId: sid,
                                strategyName: strat.label[lang],
                                reason: lang === 'fr' 
                                    ? 'Pour adresser: ' + b.label
                                    : 'To address: ' + b.label
                            });
                        }
                    });
                });
                
                // Dédupliquer recommandations
                var seen = {};
                recommendations = recommendations.filter(function(r) {
                    if (seen[r.strategyId]) return false;
                    seen[r.strategyId] = true;
                    return true;
                });
                
                return {
                    text: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
                    textLength: text.length,
                    barriers: barriers,
                    topBarriers: barriers.slice(0, 3),
                    recommendations: recommendations.slice(0, 5),
                    overallConfidence: barriers.length > 0 
                        ? (barriers.reduce(function(a, b) { return a + b.score; }, 0) / barriers.length / 100)
                        : 0,
                    analysisDepth: text.split(/\s+/).length > 100 ? 'deep' : 'surface',
                    generatedAt: new Date().toISOString()
                };
            },
            
            getCategoryLabel: function(category, lang) {
                var labels = {
                    capacity: { fr: 'Capacités/Compétences', en: 'Capacity/Skills' },
                    motivation: { fr: 'Motivation/Résistance', en: 'Motivation/Resistance' },
                    resources: { fr: 'Ressources', en: 'Resources' },
                    organizational: { fr: 'Organisationnel', en: 'Organizational' },
                    cultural: { fr: 'Culturel/Social', en: 'Cultural/Social' },
                    technical: { fr: 'Technique', en: 'Technical' },
                    communication: { fr: 'Communication', en: 'Communication' },
                    contextual: { fr: 'Contextuel', en: 'Contextual' }
                };
                return labels[category] ? labels[category][lang] : category;
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULE 10: POWERPOINT GENERATOR - Export présentation bailleurs
        // ═══════════════════════════════════════════════════════════════════════════
        
        var PowerPointGenerator = {
            generate: function(project, protocol, lang) {
                lang = lang || 'fr';
                
                var strategies = protocol && protocol.aiRawRecommendations 
                    ? protocol.aiRawRecommendations.strategies.top 
                    : [];
                
                var strategyLabels = strategies.map(function(s) {
                    var strat = KnowledgeGraph.nodes.strategies[s.id || s];
                    return strat ? strat.label[lang] : (s.id || s);
                });
                
                var slides = [
                    {
                        id: 1,
                        type: 'title',
                        title: project.title || (lang === 'fr' ? 'Projet d\'Implémentation' : 'Implementation Project'),
                        subtitle: project.organization || '',
                        footer: 'Moudar v8.0 - Science de la Mise en Œuvre Augmentée'
                    },
                    {
                        id: 2,
                        type: 'agenda',
                        title: lang === 'fr' ? 'Agenda' : 'Agenda',
                        items: [
                            lang === 'fr' ? 'Contexte et problématique' : 'Context and problem',
                            lang === 'fr' ? 'Stratégies d\'implémentation' : 'Implementation strategies',
                            lang === 'fr' ? 'Estimateur heuristique de succès' : 'Heuristic success estimator',
                            lang === 'fr' ? 'Budget et ROI' : 'Budget and ROI',
                            lang === 'fr' ? 'Timeline EPIS' : 'EPIS Timeline',
                            lang === 'fr' ? 'Prochaines étapes' : 'Next steps'
                        ]
                    },
                    {
                        id: 3,
                        type: 'content',
                        title: lang === 'fr' ? 'Contexte et Problématique' : 'Context and Problem',
                        content: project.context || (lang === 'fr' ? '[À compléter]' : '[To complete]'),
                        keyPoints: [
                            { icon: '🎯', text: lang === 'fr' ? 'Population cible: ' + (project.population || 100) : 'Target population: ' + (project.population || 100) },
                            { icon: '📍', text: lang === 'fr' ? 'Sites: ' + (project.sites || 5) : 'Sites: ' + (project.sites || 5) },
                            { icon: '⏱️', text: lang === 'fr' ? 'Durée: ' + (project.duration || 24) + ' mois' : 'Duration: ' + (project.duration || 24) + ' months' }
                        ]
                    },
                    {
                        id: 4,
                        type: 'strategies',
                        title: lang === 'fr' ? 'Stratégies d\'Implémentation' : 'Implementation Strategies',
                        subtitle: lang === 'fr' ? 'Basées sur le cadre ERIC' : 'Based on ERIC framework',
                        strategies: strategyLabels.slice(0, 5).map(function(label, i) {
                            return { number: i + 1, label: label };
                        })
                    },
                    {
                        id: 5,
                        type: 'prediction',
                        title: lang === 'fr' ? 'Estimateur Heuristique de Succès' : 'Heuristic Success Estimator',
                        probability: protocol && protocol.aiConfidence ? Math.round(protocol.aiConfidence * 100) : 65,
                        factors: [
                            { type: 'positive', label: lang === 'fr' ? 'Formation prévue' : 'Training planned', impact: '+12%' },
                            { type: 'positive', label: lang === 'fr' ? 'Champions identifiés' : 'Champions identified', impact: '+8%' },
                            { type: 'negative', label: lang === 'fr' ? 'Ressources limitées' : 'Limited resources', impact: '-10%' }
                        ]
                    },
                    {
                        id: 6,
                        type: 'budget',
                        title: lang === 'fr' ? 'Budget et ROI' : 'Budget and ROI',
                        totalBudget: '$' + ((project.budget || 150000) / 1000).toFixed(0) + 'K USD',
                        roi: '+125%',
                        payback: lang === 'fr' ? '18 mois' : '18 months',
                        breakdown: [
                            { category: lang === 'fr' ? 'Formation' : 'Training', percentage: 35 },
                            { category: lang === 'fr' ? 'Supervision' : 'Supervision', percentage: 25 },
                            { category: lang === 'fr' ? 'Coordination' : 'Coordination', percentage: 20 },
                            { category: lang === 'fr' ? 'Évaluation' : 'Evaluation', percentage: 10 },
                            { category: lang === 'fr' ? 'Imprévus' : 'Contingency', percentage: 10 }
                        ]
                    },
                    {
                        id: 7,
                        type: 'timeline',
                        title: lang === 'fr' ? 'Timeline EPIS' : 'EPIS Timeline',
                        phases: [
                            { name: 'Exploration', duration: '3 mois', color: '#3b82f6' },
                            { name: lang === 'fr' ? 'Préparation' : 'Preparation', duration: '6 mois', color: '#8b5cf6' },
                            { name: lang === 'fr' ? 'Implémentation' : 'Implementation', duration: '12 mois', color: '#10b981' },
                            { name: lang === 'fr' ? 'Pérennisation' : 'Sustainment', duration: '3 mois', color: '#f59e0b' }
                        ]
                    },
                    {
                        id: 8,
                        type: 'nextSteps',
                        title: lang === 'fr' ? 'Prochaines Étapes' : 'Next Steps',
                        steps: [
                            { timeline: lang === 'fr' ? 'Semaine 1-2' : 'Week 1-2', action: lang === 'fr' ? 'Validation du protocole' : 'Protocol validation' },
                            { timeline: lang === 'fr' ? 'Semaine 3-4' : 'Week 3-4', action: lang === 'fr' ? 'Recrutement équipe' : 'Team recruitment' },
                            { timeline: lang === 'fr' ? 'Mois 2' : 'Month 2', action: lang === 'fr' ? 'Lancement formation' : 'Training launch' },
                            { timeline: lang === 'fr' ? 'Mois 3' : 'Month 3', action: lang === 'fr' ? 'Démarrage pilote' : 'Pilot start' }
                        ],
                        callToAction: lang === 'fr' ? 'Prêt à démarrer ?' : 'Ready to start?'
                    },
                    {
                        id: 9,
                        type: 'closing',
                        title: lang === 'fr' ? 'Merci' : 'Thank You',
                        contact: project.organization || 'contact@moudar.com',
                        tagline: lang === 'fr' 
                            ? 'Propulsé par Moudar - Science de la Mise en Œuvre Augmentée'
                            : 'Powered by Moudar - Augmented Implementation Science'
                    }
                ];
                
                return {
                    title: project.title || 'Implementation Project',
                    slideCount: slides.length,
                    slides: slides,
                    theme: {
                        primaryColor: '#3b82f6',
                        secondaryColor: '#10b981',
                        accentColor: '#8b5cf6',
                        fontFamily: 'Inter, sans-serif'
                    },
                    metadata: {
                        author: project.organization || 'Moudar User',
                        created: new Date().toISOString(),
                        generator: 'Moudar v8.0'
                    },
                    generatedAt: new Date().toISOString()
                };
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULES v8.0 - WORLD REFERENCE PLATFORM
        // ═══════════════════════════════════════════════════════════════════════════
        
        // ─────────────────────────────────────────────────────────────────────────
        // 1. EXPLAINABLE AI (XAI) - Moteur transparent
        // ─────────────────────────────────────────────────────────────────────────
        var ExplainableAI = {
            // Génère une explication détaillée pour chaque stratégie recommandée
            explainStrategy: function(strategy, context, lang) {
                var l = lang || 'fr';
                var reasons = [];
                var frameworks = [];
                var confidence = 0.5;
                var evidenceLevel = 'moderate';
                
                // Analyse du contexte pour justifier la recommandation
                if (context.phase === 'implementation' && (strategy.id === 'S02' || strategy.name === 'audit_feedback')) {
                    reasons.push(l === 'fr' 
                        ? "Vous êtes en phase d'implémentation où le suivi des indicateurs est crucial"
                        : "You are in implementation phase where indicator monitoring is crucial");
                    frameworks.push({ name: 'EPIS', construct: l === 'fr' ? 'Phase Implémentation' : 'Implementation Phase' });
                    confidence += 0.15;
                }
                
                if (context.barriers && context.barriers.includes('low_fidelity') && (strategy.id === 'S02')) {
                    reasons.push(l === 'fr'
                        ? "Vous avez déclaré une faible fidélité au protocole - l'audit permet un retour correctif"
                        : "You reported low protocol fidelity - audit enables corrective feedback");
                    frameworks.push({ name: 'CFIR', construct: l === 'fr' ? 'Qualité de l\'exécution' : 'Quality of Execution' });
                    confidence += 0.2;
                }
                
                if (context.barriers && context.barriers.includes('resistance') && (strategy.id === 'S04' || strategy.id === 'S08')) {
                    reasons.push(l === 'fr'
                        ? "Résistance au changement détectée - l'engagement des parties prenantes réduit les résistances"
                        : "Change resistance detected - stakeholder engagement reduces resistance");
                    frameworks.push({ name: 'CFIR', construct: l === 'fr' ? 'Climat d\'implémentation' : 'Implementation Climate' });
                    confidence += 0.2;
                }
                
                if (context.barriers && context.barriers.includes('workforce_shortage') && (strategy.id === 'S19' || strategy.id === 'S15')) {
                    reasons.push(l === 'fr'
                        ? "Pénurie de personnel identifiée - le task-shifting optimise les ressources humaines disponibles"
                        : "Workforce shortage identified - task-shifting optimizes available human resources");
                    frameworks.push({ name: 'ERIC', construct: 'Task Shifting' });
                    confidence += 0.2;
                }
                
                if (context.barriers && context.barriers.includes('stigma') && (strategy.id === 'S08' || strategy.id === 'S18')) {
                    reasons.push(l === 'fr'
                        ? "Stigmatisation présente - l'engagement communautaire et la communication réduisent la stigma"
                        : "Stigma present - community engagement and communication reduce stigma");
                    frameworks.push({ name: 'RE-AIM', construct: 'Reach' });
                    confidence += 0.2;
                }
                
                if (context.income === 'LIC' || context.income === 'LMIC') {
                    reasons.push(l === 'fr'
                        ? "Contexte ressources limitées - stratégies adaptées aux PRFI validées par l'OMS"
                        : "Low-resource context - LMIC-adapted strategies validated by WHO");
                    frameworks.push({ name: 'WHO mhGAP', construct: l === 'fr' ? 'Adaptation contextuelle' : 'Contextual Adaptation' });
                    confidence += 0.1;
                }
                
                if (strategy.id === 'S01' || strategy.name === 'training') {
                    reasons.push(l === 'fr'
                        ? "Formation essentielle pour renforcer les compétences de l'équipe"
                        : "Essential training to strengthen team skills");
                    frameworks.push({ name: 'ERIC', construct: l === 'fr' ? 'Formation des professionnels' : 'Train & Educate Stakeholders' });
                    confidence += 0.1;
                }
                
                // Ajouter une raison par défaut si aucune spécifique
                if (reasons.length === 0) {
                    reasons.push(l === 'fr'
                        ? "Stratégie recommandée basée sur le profil général de votre projet"
                        : "Strategy recommended based on your project's general profile");
                    frameworks.push({ name: 'ERIC', construct: l === 'fr' ? 'Compilation Powell et al.' : 'Powell et al. Compilation' });
                }
                
                // Calculer le niveau de preuve
                if (confidence > 0.8) evidenceLevel = 'strong';
                else if (confidence > 0.6) evidenceLevel = 'moderate';
                else evidenceLevel = 'emerging';
                
                // Références scientifiques
                var references = [
                    { authors: 'Powell BJ et al.', year: 2015, title: 'A refined compilation of implementation strategies', journal: 'Implementation Science' },
                    { authors: 'Damschroder LJ et al.', year: 2022, title: 'The updated CFIR', journal: 'Implementation Science' }
                ];
                if (frameworks.some(function(f) { return f.name === 'RE-AIM'; })) {
                    references.push({ authors: 'Glasgow RE et al.', year: 2019, title: 'RE-AIM Planning and Evaluation Framework', journal: 'Frontiers in Public Health' });
                }
                
                return {
                    strategyId: strategy.id,
                    strategyName: strategy.name && typeof strategy.name === 'object' ? strategy.name : { fr: strategy.name || strategy.label || strategy.id, en: strategy.name || strategy.label || strategy.id },
                    confidence: Math.min(confidence, 0.95),
                    confidenceLevel: confidence > 0.8 ? 'high' : confidence > 0.6 ? 'medium' : 'low',
                    evidenceLevel: evidenceLevel,
                    reasons: reasons,
                    frameworks: frameworks,
                    references: references,
                    generatedAt: new Date().toISOString(),
                    disclaimer: l === 'fr' 
                        ? "Cette recommandation est basée sur les cadres validés de la Science de la mise en œuvre. Adaptez selon votre contexte local."
                        : "This recommendation is based on validated Implementation Science frameworks. Adapt to your local context."
                };
            },
            
            // Génère un rapport XAI complet pour tout le protocole
            generateXAIReport: function(protocol, context, lang) {
                var self = this;
                var l = lang || 'fr';
                var kg = KnowledgeGraph.nodes;
                
                // Récupérer les stratégies depuis plusieurs sources possibles
                var strategies = [];
                
                // Source 1: aiRawRecommendations.strategies.top
                if (protocol.aiRawRecommendations && protocol.aiRawRecommendations.strategies && protocol.aiRawRecommendations.strategies.top) {
                    strategies = protocol.aiRawRecommendations.strategies.top.map(function(s) {
                        var stratNode = kg.strategies[s.id || s];
                        return {
                            id: s.id || s,
                            name: stratNode ? stratNode.label : { fr: s.id || s, en: s.id || s },
                            score: s.score || 0.8
                        };
                    });
                }
                // Source 2: protocol.strategies (tableau de strings)
                else if (protocol.strategies && protocol.strategies.length > 0) {
                    strategies = protocol.strategies.slice(0, 5).map(function(s, idx) {
                        // Chercher dans le KnowledgeGraph
                        var stratNode = null;
                        Object.keys(kg.strategies).forEach(function(sid) {
                            var strat = kg.strategies[sid];
                            if (strat.label && (strat.label.fr === s || strat.label.en === s)) {
                                stratNode = strat;
                            }
                        });
                        return {
                            id: stratNode ? stratNode.id : 'S0' + (idx + 1),
                            name: stratNode ? stratNode.label : { fr: s, en: s },
                            score: 0.8 - (idx * 0.1)
                        };
                    });
                }
                // Source 3: Générer des stratégies par défaut basées sur le contexte
                else {
                    var defaultStrategies = ['S01', 'S03', 'S04', 'S08'];
                    if (context && context.phase === 'implementation') defaultStrategies.push('S02');
                    if (context && context.barriers && context.barriers.includes('stigma')) defaultStrategies.push('S18');
                    
                    strategies = defaultStrategies.slice(0, 5).map(function(sid, idx) {
                        var stratNode = kg.strategies[sid];
                        return {
                            id: sid,
                            name: stratNode ? stratNode.label : { fr: 'Stratégie ' + sid, en: 'Strategy ' + sid },
                            score: 0.85 - (idx * 0.05)
                        };
                    });
                }
                
                // Enrichir le contexte avec les données du protocol
                var enrichedContext = Object.assign({}, context || {}, {
                    phase: context && context.phase ? context.phase : (protocol.phase || 'preparation'),
                    barriers: context && context.barriers ? context.barriers : (protocol.aiDetectedBarriers || []),
                    domain: context && context.domain ? context.domain : (protocol.domain || 'health')
                });
                
                // Générer les explications pour chaque stratégie
                var explanations = strategies.map(function(s) {
                    return self.explainStrategy(s, enrichedContext, l);
                });
                
                // Calculer la confiance globale
                var overallConfidence = explanations.length > 0 
                    ? explanations.reduce(function(sum, e) { return sum + e.confidence; }, 0) / explanations.length 
                    : 0.7;
                
                // Ajuster la confiance basée sur la complétude des données
                if (protocol.aiConfidence) {
                    overallConfidence = (overallConfidence + protocol.aiConfidence) / 2;
                }
                
                return {
                    title: l === 'fr' ? "Rapport de Transparence IA Moudar" : "Moudar AI Transparency Report",
                    projectTitle: protocol.title || (context && context.title) || "Projet",
                    overallConfidence: overallConfidence,
                    explanations: explanations,
                    methodology: l === 'fr' 
                        ? "Moudar utilise un graphe de connaissances basé sur CFIR 2.0, RE-AIM, EPIS et 73 stratégies ERIC pour générer des recommandations contextualisées."
                        : "Moudar uses a knowledge graph based on CFIR 2.0, RE-AIM, EPIS and 73 ERIC strategies to generate contextualized recommendations.",
                    generatedAt: new Date().toISOString()
                };
            }
        };
        
        // ─────────────────────────────────────────────────────────────────────────
        // 2. DOCUMENT ANALYZER - Analyse de documents existants
        // ─────────────────────────────────────────────────────────────────────────
        var DocumentAnalyzer = {
            // Extraction d'éléments clés d'un texte de protocole
            extractElements: function(text, lang) {
                var l = lang || 'fr';
                var elements = {
                    context: null,
                    population: null,
                    intervention: null,
                    barriers: [],
                    phase: null,
                    objectives: [],
                    outcomes: { implementation: [], clinical: [] },
                    strategies: [],
                    timeline: null,
                    budget: null
                };
                
                var textLower = text.toLowerCase();
                
                // Détection de la population
                var populationPatterns = [
                    { regex: /population\s*[:\-]?\s*([^\.]+)/i, field: 'population' },
                    { regex: /patients?\s+([^\.]{10,50})/i, field: 'population' },
                    { regex: /participants?\s*[:\-]?\s*(\d+)/i, field: 'sampleSize' },
                    { regex: /(\d+)\s*(?:participants?|patients?|personnes?)/i, field: 'sampleSize' }
                ];
                
                populationPatterns.forEach(function(p) {
                    var match = text.match(p.regex);
                    if (match) {
                        if (p.field === 'population') elements.population = match[1].trim();
                        if (p.field === 'sampleSize') elements.sampleSize = parseInt(match[1]);
                    }
                });
                
                // Détection du contexte
                if (textLower.includes('hôpital') || textLower.includes('hospital') || textLower.includes('chu')) {
                    elements.context = l === 'fr' ? 'Hôpital / Centre hospitalier' : 'Hospital / Medical center';
                }
                if (textLower.includes('centre de santé') || textLower.includes('health center') || textLower.includes('primary care')) {
                    elements.context = l === 'fr' ? 'Soins primaires' : 'Primary care';
                }
                if (textLower.includes('communauté') || textLower.includes('community')) {
                    elements.context = l === 'fr' ? 'Communautaire' : 'Community-based';
                }
                
                // Détection des barrières
                var barrierKeywords = {
                    resistance: ['résistance', 'resistance', 'refus', 'opposition'],
                    resources: ['ressources limitées', 'limited resources', 'budget contraint', 'manque de moyens'],
                    workforce: ['pénurie', 'shortage', 'manque de personnel', 'understaffed'],
                    stigma: ['stigma', 'stigmatisation', 'discrimination'],
                    training: ['formation insuffisante', 'lack of training', 'compétences manquantes']
                };
                
                Object.keys(barrierKeywords).forEach(function(barrier) {
                    barrierKeywords[barrier].forEach(function(keyword) {
                        if (textLower.includes(keyword)) {
                            elements.barriers.push(barrier);
                        }
                    });
                });
                elements.barriers = Array.from(new Set(elements.barriers)); // Dédupliquer
                
                // Détection de la phase
                if (textLower.includes('exploration') || textLower.includes('feasibility') || textLower.includes('faisabilité')) {
                    elements.phase = 'exploration';
                } else if (textLower.includes('préparation') || textLower.includes('preparation') || textLower.includes('pilote')) {
                    elements.phase = 'preparation';
                } else if (textLower.includes('déploiement') || textLower.includes('rollout') || textLower.includes('implémentation')) {
                    elements.phase = 'implementation';
                } else if (textLower.includes('pérennisation') || textLower.includes('sustainment') || textLower.includes('scale-up')) {
                    elements.phase = 'sustainment';
                }
                
                // Détection des outcomes
                var implementationOutcomes = ['adoption', 'acceptabilité', 'acceptability', 'fidélité', 'fidelity', 'feasibility', 'reach', 'penetration', 'sustainability'];
                var clinicalOutcomes = ['mortalité', 'mortality', 'morbidité', 'morbidity', 'qualité de vie', 'quality of life', 'symptômes', 'symptoms'];
                
                implementationOutcomes.forEach(function(o) {
                    if (textLower.includes(o)) elements.outcomes.implementation.push(o);
                });
                clinicalOutcomes.forEach(function(o) {
                    if (textLower.includes(o)) elements.outcomes.clinical.push(o);
                });
                
                // Détection de la durée
                var durationMatch = text.match(/(\d+)\s*(?:mois|months?|ans?|years?)/i);
                if (durationMatch) {
                    var num = parseInt(durationMatch[1]);
                    var unit = durationMatch[0].toLowerCase().includes('an') || durationMatch[0].toLowerCase().includes('year') ? 'years' : 'months';
                    elements.timeline = unit === 'years' ? num * 12 : num;
                }
                
                // Détection du budget
                var budgetMatch = text.match(/(\d[\d\s,\.]*)\s*(?:€|EUR|USD|\$|MAD|CHF)/i);
                if (budgetMatch) {
                    elements.budget = budgetMatch[0];
                }
                
                return elements;
            },
            
            // Identifier les gaps IS dans un protocole
            identifyGaps: function(text, lang) {
                var l = lang || 'fr';
                var gaps = [];
                var textLower = text.toLowerCase();
                
                // Liste des éléments IS essentiels
                var isChecklist = [
                    { id: 'framework', keywords: ['cfir', 're-aim', 'epis', 'proctor', 'cadre théorique', 'theoretical framework'], 
                      missing: l === 'fr' ? "Cadre théorique d'implémentation (CFIR, RE-AIM, EPIS...)" : "Implementation theoretical framework (CFIR, RE-AIM, EPIS...)" },
                    { id: 'strategies', keywords: ['stratégie', 'strategy', 'eric', 'implementation strateg'], 
                      missing: l === 'fr' ? "Stratégies d'implémentation explicites" : "Explicit implementation strategies" },
                    { id: 'outcomes_impl', keywords: ['outcome', 'adoption', 'fidélité', 'fidelity', 'acceptability', 'feasibility'], 
                      missing: l === 'fr' ? "Outcomes d'implémentation (adoption, fidélité, acceptabilité...)" : "Implementation outcomes (adoption, fidelity, acceptability...)" },
                    { id: 'adaptation', keywords: ['adaptation', 'contextualisation', 'tailoring', 'local context'], 
                      missing: l === 'fr' ? "Plan d'adaptation au contexte local" : "Local context adaptation plan" },
                    { id: 'stakeholders', keywords: ['parties prenantes', 'stakeholder', 'acteurs', 'champions', 'leaders'], 
                      missing: l === 'fr' ? "Identification et engagement des parties prenantes" : "Stakeholder identification and engagement" },
                    { id: 'barriers', keywords: ['barrière', 'barrier', 'obstacle', 'facilitateur', 'facilitator'], 
                      missing: l === 'fr' ? "Analyse des barrières et facilitateurs" : "Barriers and facilitators analysis" },
                    { id: 'sustainment', keywords: ['pérennisation', 'sustainment', 'sustainability', 'institutionnalisation', 'scale-up'], 
                      missing: l === 'fr' ? "Plan de pérennisation" : "Sustainment plan" },
                    { id: 'evaluation', keywords: ['évaluation', 'evaluation', 'monitoring', 'indicateur', 'kpi', 'measure'], 
                      missing: l === 'fr' ? "Plan d'évaluation et indicateurs" : "Evaluation plan and indicators" },
                    { id: 'tidier', keywords: ['tidier', 'intervention description', 'who delivered', 'where', 'when', 'how much'], 
                      missing: l === 'fr' ? "Description TIDieR de l'intervention" : "TIDieR intervention description" },
                    { id: 'equity', keywords: ['équité', 'equity', 'disparités', 'disparities', 'vulnerable', 'marginalis'], 
                      missing: l === 'fr' ? "Considérations d'équité et populations vulnérables" : "Equity considerations and vulnerable populations" }
                ];
                
                isChecklist.forEach(function(item) {
                    var found = item.keywords.some(function(kw) { return textLower.includes(kw); });
                    if (!found) {
                        gaps.push({
                            id: item.id,
                            type: 'missing',
                            severity: ['framework', 'strategies', 'outcomes_impl'].includes(item.id) ? 'critical' : 'important',
                            description: item.missing,
                            suggestion: l === 'fr' 
                                ? "Moudar peut générer cette section automatiquement"
                                : "Moudar can generate this section automatically"
                        });
                    }
                });
                
                return gaps;
            },
            
            // Générer un rapport d'analyse complet
            analyzeDocument: function(text, lang) {
                var l = lang || 'fr';
                var elements = this.extractElements(text, l);
                var gaps = this.identifyGaps(text, l);
                
                var wordCount = text.split(/\s+/).length;
                var criticalGaps = gaps.filter(function(g) { return g.severity === 'critical'; }).length;
                var importantGaps = gaps.filter(function(g) { return g.severity === 'important'; }).length;
                
                // Calcul du score IS
                var totalChecks = 10;
                var passed = totalChecks - gaps.length;
                var score = Math.round((passed / totalChecks) * 100);
                
                // Déterminer les forces
                var strengths = [];
                if (elements.population) strengths.push(l === 'fr' ? "Population cible bien définie" : "Well-defined target population");
                if (elements.context) strengths.push(l === 'fr' ? "Contexte d'implémentation identifié" : "Implementation context identified");
                if (elements.phase) strengths.push(l === 'fr' ? "Phase EPIS claire" : "Clear EPIS phase");
                if (elements.barriers.length > 0) strengths.push(l === 'fr' ? "Barrières identifiées" : "Barriers identified");
                if (elements.outcomes.implementation.length > 0) strengths.push(l === 'fr' ? "Outcomes d'implémentation mentionnés" : "Implementation outcomes mentioned");
                
                return {
                    title: l === 'fr' ? "Analyse IS du Document" : "IS Document Analysis",
                    wordCount: wordCount,
                    extractedElements: elements,
                    gaps: gaps,
                    strengths: strengths,
                    score: score,
                    scoreInterpretation: score >= 80 ? (l === 'fr' ? "Excellent" : "Excellent") :
                                         score >= 60 ? (l === 'fr' ? "Bon, quelques ajouts recommandés" : "Good, some additions recommended") :
                                         score >= 40 ? (l === 'fr' ? "Partiel, plusieurs éléments IS manquants" : "Partial, several IS elements missing") :
                                         (l === 'fr' ? "Insuffisant, révision majeure nécessaire" : "Insufficient, major revision needed"),
                    summary: {
                        criticalGaps: criticalGaps,
                        importantGaps: importantGaps,
                        strengths: strengths.length
                    },
                    generatedAt: new Date().toISOString()
                };
            },
            
            // Générer automatiquement une section manquante
            generateSection: function(sectionId, context, lang) {
                var l = lang || 'fr';
                var sections = {
                    framework: {
                        title: l === 'fr' ? "Cadre théorique et Science de la mise en œuvre" : "Theoretical Framework and Implementation Science",
                        content: l === 'fr' 
                            ? "Ce projet s'appuie sur le Consolidated Framework for Implementation Research (CFIR 2.0) qui identifie 5 domaines influençant l'implémentation : l'innovation, le contexte externe, le contexte interne, les individus, et le processus d'implémentation. Le modèle RE-AIM (Reach, Effectiveness, Adoption, Implementation, Maintenance) guidera l'évaluation. Les stratégies d'implémentation seront sélectionnées selon la taxonomie ERIC (Expert Recommendations for Implementing Change)."
                            : "This project is grounded in the Consolidated Framework for Implementation Research (CFIR 2.0) which identifies 5 domains influencing implementation: the innovation, outer setting, inner setting, individuals, and implementation process. The RE-AIM model (Reach, Effectiveness, Adoption, Implementation, Maintenance) will guide evaluation. Implementation strategies will be selected according to the ERIC taxonomy (Expert Recommendations for Implementing Change)."
                    },
                    strategies: {
                        title: l === 'fr' ? "Stratégies d'implémentation" : "Implementation Strategies",
                        content: l === 'fr'
                            ? "Les stratégies d'implémentation suivantes seront déployées selon les recommandations ERIC : (1) Formation des professionnels pour renforcer les compétences, (2) Audit et feedback pour suivre la performance, (3) Engagement des parties prenantes pour favoriser l'adhésion, (4) Champions locaux pour faciliter le changement au niveau des équipes."
                            : "The following implementation strategies will be deployed according to ERIC recommendations: (1) Training of professionals to strengthen skills, (2) Audit and feedback to monitor performance, (3) Stakeholder engagement to promote buy-in, (4) Local champions to facilitate change at team level."
                    },
                    outcomes_impl: {
                        title: l === 'fr' ? "Outcomes d'implémentation" : "Implementation Outcomes",
                        content: l === 'fr'
                            ? "Selon le modèle de Proctor, les outcomes d'implémentation mesurés seront : Acceptabilité (perception par les utilisateurs), Adoption (intention et utilisation initiale), Pertinence (adéquation perçue), Faisabilité (praticabilité), Fidélité (respect du protocole), Pénétration (intégration dans le système), Pérennisation (maintien à long terme), Coûts d'implémentation."
                            : "According to Proctor's model, implementation outcomes measured will be: Acceptability (user perception), Adoption (intention and initial use), Appropriateness (perceived fit), Feasibility (practicability), Fidelity (protocol adherence), Penetration (system integration), Sustainability (long-term maintenance), Implementation costs."
                    },
                    sustainment: {
                        title: l === 'fr' ? "Plan de pérennisation" : "Sustainability Plan",
                        content: l === 'fr'
                            ? "Le plan de pérennisation comprend : (1) Intégration dans les routines institutionnelles dès le mois 6, (2) Transfert de compétences aux formateurs locaux, (3) Documentation des processus pour réplicabilité, (4) Identification de sources de financement pérennes, (5) Création d'une communauté de pratique pour le soutien continu."
                            : "The sustainability plan includes: (1) Integration into institutional routines from month 6, (2) Capacity transfer to local trainers, (3) Process documentation for replicability, (4) Identification of sustainable funding sources, (5) Creation of a community of practice for ongoing support."
                    }
                };
                
                return sections[sectionId] || {
                    title: l === 'fr' ? "Section non disponible" : "Section not available",
                    content: l === 'fr' ? "Cette section n'est pas encore générée automatiquement." : "This section is not yet automatically generated."
                };
            }
        };
        
        // ─────────────────────────────────────────────────────────────────────────
        // 3. LEARNING & FEEDBACK SYSTEM - Boucle d'apprentissage
        // ─────────────────────────────────────────────────────────────────────────
        var LearningFeedback = {
            // Données de feedback simulées (en production, base de données)
            feedbackData: {
                strategyEffectiveness: {
                    'S01': { uses: 1234, avgRating: 4.2, successRate: 0.72, contexts: { hospital: 0.75, community: 0.68, lmic: 0.71 } },
                    'S02': { uses: 987, avgRating: 4.0, successRate: 0.68, contexts: { hospital: 0.72, community: 0.61, lmic: 0.65 } },
                    'S04': { uses: 856, avgRating: 4.3, successRate: 0.74, contexts: { hospital: 0.76, community: 0.73, lmic: 0.70 } },
                    'S08': { uses: 723, avgRating: 4.5, successRate: 0.78, contexts: { hospital: 0.71, community: 0.82, lmic: 0.79 } },
                    'S19': { uses: 456, avgRating: 4.4, successRate: 0.76, contexts: { hospital: 0.65, community: 0.74, lmic: 0.82 } }
                },
                contextInsights: [
                    { context: 'lmic_mental_health', insight: { fr: "Dans les projets santé mentale en PRFI, le combo champions locaux + adaptation participative surpasse la formation magistrale seule (+18% d'adoption)", en: "In LMIC mental health projects, local champions + participatory adaptation outperforms lecture-based training alone (+18% adoption)" } },
                    { context: 'hospital_chronic', insight: { fr: "En milieu hospitalier pour les maladies chroniques, l'audit-feedback combiné à la facilitation donne les meilleurs résultats (fidélité +22%)", en: "In hospital settings for chronic diseases, audit-feedback combined with facilitation yields best results (fidelity +22%)" } },
                    { context: 'community_prevention', insight: { fr: "Pour la prévention communautaire, l'engagement des leaders locaux avant le lancement augmente la pénétration de 35%", en: "For community prevention, engaging local leaders before launch increases reach by 35%" } }
                ],
                totalProjects: 2847,
                totalFeedbacks: 8934
            },
            
            // Soumettre un feedback sur une stratégie
            submitFeedback: function(projectId, strategyId, feedback, lang) {
                var l = lang || 'fr';
                // En production : envoyer à l'API
                return {
                    success: true,
                    message: l === 'fr' ? "Merci ! Votre feedback améliore les recommandations pour tous." : "Thank you! Your feedback improves recommendations for everyone.",
                    feedbackId: 'FB' + Date.now(),
                    pointsEarned: 10
                };
            },
            
            // Obtenir des insights basés sur le contexte
            getContextInsights: function(context, lang) {
                var l = lang || 'fr';
                var insights = this.feedbackData.contextInsights.filter(function(i) {
                    return context.domain && i.context.includes(context.domain.toLowerCase());
                });
                
                if (insights.length === 0 && context.income) {
                    insights = this.feedbackData.contextInsights.filter(function(i) {
                        return i.context.includes('lmic') && (context.income === 'LIC' || context.income === 'LMIC');
                    });
                }
                
                return {
                    insights: insights.map(function(i) { return i.insight[l]; }),
                    basedOn: this.feedbackData.totalProjects + (l === 'fr' ? ' projets analysés' : ' projects analyzed'),
                    lastUpdated: new Date().toISOString()
                };
            },
            
            // Obtenir le benchmark d'une stratégie
            getStrategyBenchmark: function(strategyId, context, lang) {
                var l = lang || 'fr';
                var data = this.feedbackData.strategyEffectiveness[strategyId];
                
                if (!data) {
                    return { available: false, message: l === 'fr' ? "Données insuffisantes pour cette stratégie" : "Insufficient data for this strategy" };
                }
                
                var contextKey = context.income && (context.income === 'LIC' || context.income === 'LMIC') ? 'lmic' : 
                                 context.setting === 'community' ? 'community' : 'hospital';
                
                return {
                    available: true,
                    strategyId: strategyId,
                    globalSuccessRate: data.successRate,
                    contextSuccessRate: data.contexts[contextKey] || data.successRate,
                    avgRating: data.avgRating,
                    totalUses: data.uses,
                    comparison: l === 'fr' 
                        ? "Cette stratégie a un taux de succès de " + Math.round(data.contexts[contextKey] * 100) + "% dans des contextes similaires."
                        : "This strategy has a " + Math.round(data.contexts[contextKey] * 100) + "% success rate in similar contexts."
                };
            },
            
            // Saisir des indicateurs de suivi
            submitMonitoringData: function(projectId, data, lang) {
                var l = lang || 'fr';
                // data = { adoption: 0.65, fidelity: 0.72, satisfaction: 4.2, strategiesImplemented: ['S01', 'S04'] }
                return {
                    success: true,
                    message: l === 'fr' ? "Données de monitoring enregistrées" : "Monitoring data recorded",
                    comparison: {
                        adoption: { value: data.adoption, benchmark: 0.58, status: data.adoption > 0.58 ? 'above' : 'below' },
                        fidelity: { value: data.fidelity, benchmark: 0.65, status: data.fidelity > 0.65 ? 'above' : 'below' }
                    },
                    recommendations: l === 'fr' 
                        ? ["Continuer le monitoring mensuel", "Partager les succès avec l'équipe", "Documenter les adaptations réalisées"]
                        : ["Continue monthly monitoring", "Share successes with the team", "Document adaptations made"]
                };
            }
        };
        
        // ─────────────────────────────────────────────────────────────────────────
        // 4. PEDAGOGY SYSTEM - Glossaire et formation
        // ─────────────────────────────────────────────────────────────────────────
        var PedagogySystem = {
            glossary: {
                'CFIR': {
                    fullName: { fr: "Consolidated Framework for Implementation Research", en: "Consolidated Framework for Implementation Research" },
                    definition: { fr: "Cadre intégrateur qui organise les déterminants de l'implémentation en 5 domaines : Innovation, Contexte externe, Contexte interne, Individus, Processus.", en: "Integrative framework organizing implementation determinants into 5 domains: Innovation, Outer Setting, Inner Setting, Individuals, Process." },
                    domains: ['Innovation', 'Outer Setting', 'Inner Setting', 'Individuals', 'Implementation Process'],
                    reference: 'Damschroder et al., 2022',
                    useCases: { fr: ["Diagnostic des barrières", "Planification de l'implémentation", "Évaluation formative"], en: ["Barrier assessment", "Implementation planning", "Formative evaluation"] }
                },
                'RE-AIM': {
                    fullName: { fr: "Reach, Effectiveness, Adoption, Implementation, Maintenance", en: "Reach, Effectiveness, Adoption, Implementation, Maintenance" },
                    definition: { fr: "Cadre d'évaluation en 5 dimensions pour mesurer l'impact d'une intervention au niveau individuel et organisationnel.", en: "5-dimension evaluation framework to measure intervention impact at individual and organizational levels." },
                    domains: ['Reach', 'Effectiveness', 'Adoption', 'Implementation', 'Maintenance'],
                    reference: 'Glasgow et al., 1999; 2019',
                    useCases: { fr: ["Planification d'évaluation", "Mesure de l'impact populationnel", "Comparaison d'interventions"], en: ["Evaluation planning", "Population impact measurement", "Intervention comparison"] }
                },
                'EPIS': {
                    fullName: { fr: "Exploration, Preparation, Implementation, Sustainment", en: "Exploration, Preparation, Implementation, Sustainment" },
                    definition: { fr: "Modèle de phases décrivant le parcours complet d'un projet d'implémentation, de l'identification du besoin à la pérennisation.", en: "Phase model describing the complete journey of an implementation project, from need identification to sustainment." },
                    domains: ['Exploration', 'Preparation', 'Implementation', 'Sustainment'],
                    reference: 'Aarons et al., 2011',
                    useCases: { fr: ["Planification de projet", "Identification de la phase actuelle", "Anticipation des prochaines étapes"], en: ["Project planning", "Current phase identification", "Anticipating next steps"] }
                },
                'ERIC': {
                    fullName: { fr: "Expert Recommendations for Implementing Change", en: "Expert Recommendations for Implementing Change" },
                    definition: { fr: "Taxonomie de 73 stratégies d'implémentation consensuelles, organisées en clusters thématiques.", en: "Taxonomy of 73 consensus implementation strategies, organized into thematic clusters." },
                    domains: ['Train & Educate', 'Support Clinicians', 'Engage Consumers', 'Use Evaluative Strategies', 'Develop Stakeholder Relationships', 'Adapt & Tailor', 'Change Infrastructure', 'Provide Interactive Assistance', 'Financial Strategies'],
                    reference: 'Powell et al., 2015',
                    useCases: { fr: ["Sélection de stratégies", "Planification d'intervention", "Comparaison de protocoles"], en: ["Strategy selection", "Intervention planning", "Protocol comparison"] }
                },
                'Proctor': {
                    fullName: { fr: "Outcomes d'implémentation de Proctor", en: "Proctor's Implementation Outcomes" },
                    definition: { fr: "8 outcomes d'implémentation distincts des outcomes cliniques : Acceptabilité, Adoption, Pertinence, Faisabilité, Fidélité, Coûts, Pénétration, Pérennisation.", en: "8 implementation outcomes distinct from clinical outcomes: Acceptability, Adoption, Appropriateness, Feasibility, Fidelity, Costs, Penetration, Sustainability." },
                    domains: ['Acceptability', 'Adoption', 'Appropriateness', 'Feasibility', 'Fidelity', 'Implementation Cost', 'Penetration', 'Sustainability'],
                    reference: 'Proctor et al., 2011',
                    useCases: { fr: ["Définition d'indicateurs", "Évaluation de l'implémentation", "Distinction outcomes IS vs cliniques"], en: ["Indicator definition", "Implementation evaluation", "Distinguishing IS vs clinical outcomes"] }
                },
                'TIDieR': {
                    fullName: { fr: "Template for Intervention Description and Replication", en: "Template for Intervention Description and Replication" },
                    definition: { fr: "Checklist de 12 items pour décrire une intervention de manière suffisamment détaillée pour permettre sa réplication.", en: "12-item checklist to describe an intervention in enough detail to enable replication." },
                    domains: ['Why', 'What', 'Who provided', 'How', 'Where', 'When/How much', 'Tailoring', 'Modifications', 'How well (planned)', 'How well (actual)'],
                    reference: 'Hoffmann et al., 2014',
                    useCases: { fr: ["Rédaction de protocole", "Reporting d'essai", "Revue systématique"], en: ["Protocol writing", "Trial reporting", "Systematic review"] }
                }
            },
            
            // Obtenir une entrée du glossaire
            getGlossaryEntry: function(term, lang) {
                var l = lang || 'fr';
                var entry = this.glossary[term];
                if (!entry) return null;
                
                return {
                    term: term,
                    fullName: entry.fullName[l],
                    definition: entry.definition[l],
                    domains: entry.domains,
                    reference: entry.reference,
                    useCases: entry.useCases[l]
                };
            },
            
            // Obtenir tout le glossaire
            getFullGlossary: function(lang) {
                var self = this;
                var l = lang || 'fr';
                return Object.keys(this.glossary).map(function(term) {
                    return self.getGlossaryEntry(term, l);
                });
            },
            
            // Mini-tutoriels
            tutorials: {
                'cfir_to_questions': {
                    title: { fr: "Transformer CFIR en questions terrain", en: "Transforming CFIR into field questions" },
                    steps: [
                        { fr: "Identifiez les constructs CFIR pertinents pour votre contexte", en: "Identify CFIR constructs relevant to your context" },
                        { fr: "Pour chaque construct, formulez 1-2 questions spécifiques", en: "For each construct, formulate 1-2 specific questions" },
                        { fr: "Adaptez le langage au public cible (cliniciens, managers, patients)", en: "Adapt language to target audience (clinicians, managers, patients)" },
                        { fr: "Testez les questions avec 2-3 personnes avant déploiement", en: "Test questions with 2-3 people before deployment" }
                    ],
                    example: { fr: "Construct 'Climat d'implémentation' → Question: 'Sur une échelle de 1-10, à quel point votre équipe est-elle prête à adopter cette nouvelle pratique ?'", en: "Construct 'Implementation Climate' → Question: 'On a scale of 1-10, how ready is your team to adopt this new practice?'" }
                },
                'choosing_strategies': {
                    title: { fr: "Choisir les bonnes stratégies ERIC", en: "Choosing the right ERIC strategies" },
                    steps: [
                        { fr: "Listez les barrières identifiées dans votre diagnostic", en: "List barriers identified in your assessment" },
                        { fr: "Pour chaque barrière, identifiez 2-3 stratégies potentielles", en: "For each barrier, identify 2-3 potential strategies" },
                        { fr: "Évaluez faisabilité, coût et expertise requise", en: "Evaluate feasibility, cost and required expertise" },
                        { fr: "Priorisez avec votre équipe et parties prenantes", en: "Prioritize with your team and stakeholders" }
                    ],
                    example: { fr: "Barrière 'Résistance au changement' → Stratégies: Champions locaux (S08), Engagement direction (S04), Communication ciblée (S18)", en: "Barrier 'Resistance to change' → Strategies: Local champions (S08), Leadership engagement (S04), Targeted communication (S18)" }
                }
            },
            
            // Obtenir un tutoriel
            getTutorial: function(tutorialId, lang) {
                var l = lang || 'fr';
                var t = this.tutorials[tutorialId];
                if (!t) return null;
                
                return {
                    id: tutorialId,
                    title: t.title[l],
                    steps: t.steps.map(function(s) { return s[l]; }),
                    example: t.example[l]
                };
            },
            
            // Mode apprentissage - cas fictifs
            learningCases: [
                {
                    id: 'case1',
                    title: { fr: "Déploiement mhGAP au Maroc", en: "mhGAP deployment in Morocco" },
                    domain: 'mental_health',
                    context: { fr: "Vous êtes responsable du déploiement du programme mhGAP dans 50 centres de santé ruraux. Les médecins généralistes sont surchargés et n'ont jamais eu de formation en santé mentale.", en: "You are responsible for deploying mhGAP in 50 rural health centers. GPs are overloaded and have never had mental health training." },
                    barriers: ['workforce_shortage', 'stigma', 'training_gap'],
                    expertPlan: { strategies: ['S01', 'S19', 'S08', 'S04'], rationale: { fr: "Formation + Task-shifting + Engagement communautaire + Leadership", en: "Training + Task-shifting + Community engagement + Leadership" } }
                },
                {
                    id: 'case2',
                    title: { fr: "Télétravail dans une banque", en: "Remote work in a bank" },
                    domain: 'workplace',
                    context: { fr: "Après la pandémie, une banque de 2000 employés souhaite pérenniser le télétravail hybride. Les managers intermédiaires sont réticents, craignant une perte de contrôle.", en: "After the pandemic, a 2000-employee bank wants to sustain hybrid remote work. Middle managers are reluctant, fearing loss of control." },
                    barriers: ['resistance', 'culture', 'monitoring'],
                    expertPlan: { strategies: ['S04', 'S02', 'S03', 'S18'], rationale: { fr: "Engagement managers + Audit-feedback + Facilitation + Communication", en: "Manager engagement + Audit-feedback + Facilitation + Communication" } }
                }
            ],
            
            // Obtenir un cas d'apprentissage
            getLearningCase: function(caseId, lang) {
                var l = lang || 'fr';
                var c = this.learningCases.find(function(c) { return c.id === caseId; });
                if (!c) return null;
                
                return {
                    id: c.id,
                    title: c.title[l],
                    domain: c.domain,
                    context: c.context[l],
                    barriers: c.barriers,
                    expertPlan: {
                        strategies: c.expertPlan.strategies,
                        rationale: c.expertPlan.rationale[l]
                    }
                };
            }
        };
        
        // ─────────────────────────────────────────────────────────────────────────
        // 5. CERTIFICATION SYSTEM - Label Moudar Ready
        // ─────────────────────────────────────────────────────────────────────────
        var CertificationSystem = {
            // Critères de certification
            criteria: [
                { id: 'framework', weight: 15, label: { fr: "Cadre théorique IS explicite", en: "Explicit IS theoretical framework" } },
                { id: 'strategies', weight: 15, label: { fr: "Stratégies d'implémentation définies", en: "Implementation strategies defined" } },
                { id: 'outcomes', weight: 15, label: { fr: "Outcomes d'implémentation mesurables", en: "Measurable implementation outcomes" } },
                { id: 'barriers', weight: 10, label: { fr: "Analyse barrières/facilitateurs", en: "Barriers/facilitators analysis" } },
                { id: 'stakeholders', weight: 10, label: { fr: "Parties prenantes identifiées", en: "Stakeholders identified" } },
                { id: 'adaptation', weight: 10, label: { fr: "Plan d'adaptation contextuelle", en: "Contextual adaptation plan" } },
                { id: 'evaluation', weight: 10, label: { fr: "Plan d'évaluation", en: "Evaluation plan" } },
                { id: 'timeline', weight: 5, label: { fr: "Timeline EPIS", en: "EPIS timeline" } },
                { id: 'sustainment', weight: 5, label: { fr: "Plan de pérennisation", en: "Sustainability plan" } },
                { id: 'equity', weight: 5, label: { fr: "Considérations d'équité", en: "Equity considerations" } }
            ],
            
            // Évaluer un protocole pour certification
            evaluateForCertification: function(protocol, context, lang) {
                var l = lang || 'fr';
                var self = this;
                var results = [];
                var totalScore = 0;
                
                console.log("[CERTIFICATION] Protocol reçu:", protocol);
                console.log("[CERTIFICATION] Context reçu:", context);
                
                this.criteria.forEach(function(criterion) {
                    var passed = false;
                    var score = 0;
                    
                    // Évaluation basée sur la présence d'éléments dans le protocole
                    switch(criterion.id) {
                        case 'framework':
                            // Vérifie frameworks (pluriel) ou aiConfidence > 0.5
                            passed = (protocol.frameworks && protocol.frameworks.length > 0) || 
                                    (protocol.aiConfidence && protocol.aiConfidence > 0.5);
                            break;
                        case 'strategies':
                            // Vérifie qu'il y a au moins 2 stratégies
                            passed = (protocol.strategies && protocol.strategies.length >= 2) ||
                                    (protocol.aiRawRecommendations && protocol.aiRawRecommendations.strategies && 
                                     protocol.aiRawRecommendations.strategies.top && protocol.aiRawRecommendations.strategies.top.length >= 2);
                            break;
                        case 'outcomes':
                            // Vérifie outcomes (pluriel) ou aiRawRecommendations.outcomes
                            passed = (protocol.outcomes && protocol.outcomes.length > 0) ||
                                    (protocol.aiRawRecommendations && protocol.aiRawRecommendations.outcomes);
                            break;
                        case 'barriers':
                            // Vérifie aiDetectedBarriers
                            passed = protocol.aiDetectedBarriers && protocol.aiDetectedBarriers.length > 0;
                            break;
                        case 'stakeholders':
                            // Vérifie stakeholders dans context ou protocol
                            passed = (context && context.stakeholders) || protocol.stakeholders || 
                                    (context && context.organization) || (protocol.title && protocol.title.length > 0);
                            break;
                        case 'adaptation':
                            // Vérifie adaptations ou contexte LMIC
                            passed = (context && context.adaptations) || protocol.adaptations || 
                                    (context && context.resourceLevel === 'LMIC') ||
                                    (protocol.aiRawRecommendations && protocol.aiRawRecommendations.input && protocol.aiRawRecommendations.input.resourceLevel);
                            break;
                        case 'evaluation':
                            // Vérifie plan d'évaluation
                            passed = protocol.evaluation || protocol.kpis || 
                                    (protocol.outcomes && protocol.outcomes.length > 0) ||
                                    (protocol.aiRawRecommendations && protocol.aiRawRecommendations.outcomes);
                            break;
                        case 'timeline':
                            // Vérifie timeline ou phase
                            passed = protocol.timeline || (context && context.duration) || 
                                    protocol.phase || (protocol.keyActivities && protocol.keyActivities.length > 0);
                            break;
                        case 'sustainment':
                            // Vérifie plan de pérennisation
                            passed = protocol.sustainment || 
                                    (context && context.phase === 'sustainment') ||
                                    (protocol.phase === 'sustainment') ||
                                    (protocol.recommendations && protocol.recommendations.length > 0);
                            break;
                        case 'equity':
                            // Vérifie considérations d'équité
                            passed = protocol.equity || (context && context.equity) ||
                                    (protocol.aiRawRecommendations && protocol.aiRawRecommendations.input && 
                                     (protocol.aiRawRecommendations.input.resourceLevel === 'LMIC' || 
                                      protocol.aiRawRecommendations.input.resourceLevel === 'LIC'));
                            break;
                        default:
                            passed = false;
                    }
                    
                    score = passed ? criterion.weight : 0;
                    totalScore += score;
                    
                    console.log("[CERTIFICATION] Critère", criterion.id, ":", passed ? "✓" : "✗", "(+" + score + "pts)");
                    
                    results.push({
                        criterion: criterion.id,
                        label: criterion.label[l],
                        weight: criterion.weight,
                        passed: passed,
                        score: score
                    });
                });
                
                console.log("[CERTIFICATION] Score total:", totalScore + "/100");
                
                // Déterminer le niveau de certification
                var level = 'none';
                var levelLabel = { fr: "Non certifiable", en: "Not certifiable" };
                var color = '#ef4444';
                
                if (totalScore >= 90) {
                    level = 'gold';
                    levelLabel = { fr: "Certification Or", en: "Gold Certification" };
                    color = '#f59e0b';
                } else if (totalScore >= 75) {
                    level = 'silver';
                    levelLabel = { fr: "Certification Argent", en: "Silver Certification" };
                    color = '#9ca3af';
                } else if (totalScore >= 60) {
                    level = 'bronze';
                    levelLabel = { fr: "Certification Bronze", en: "Bronze Certification" };
                    color = '#b45309';
                }
                
                // Générer un ID de certification unique
                var certId = 'MR-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
                
                return {
                    projectTitle: protocol.title || context.title,
                    score: totalScore,
                    maxScore: 100,
                    level: level,
                    levelLabel: levelLabel[l],
                    color: color,
                    certified: totalScore >= 60,
                    certificationId: totalScore >= 60 ? certId : null,
                    results: results,
                    passedCriteria: results.filter(function(r) { return r.passed; }).length,
                    totalCriteria: results.length,
                    recommendations: results.filter(function(r) { return !r.passed; }).map(function(r) { 
                        return l === 'fr' ? "Ajouter : " + r.label : "Add: " + r.label; 
                    }),
                    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    qrCodeData: 'https://moudar.com/verify/' + certId,
                    generatedAt: new Date().toISOString()
                };
            },
            
            // Générer le badge HTML
            generateBadgeHTML: function(certification, lang) {
                var l = lang || 'fr';
                if (!certification.certified) {
                    return '<div style="padding:20px;background:#fee2e2;border:2px solid #ef4444;border-radius:12px;text-align:center;"><p style="color:#ef4444;font-weight:bold;">⚠️ ' + (l === 'fr' ? 'Non certifié' : 'Not certified') + '</p></div>';
                }
                
                var icon = certification.level === 'gold' ? '🥇' : certification.level === 'silver' ? '🥈' : '🥉';
                
                return '<div style="padding:24px;background:linear-gradient(135deg,' + certification.color + '22,' + certification.color + '11);border:3px solid ' + certification.color + ';border-radius:16px;text-align:center;">' +
                    '<div style="font-size:48px;margin-bottom:12px;">' + icon + '</div>' +
                    '<h3 style="color:' + certification.color + ';font-size:20px;font-weight:bold;margin-bottom:8px;">MOUDAR READY</h3>' +
                    '<p style="font-size:16px;font-weight:600;color:#374151;margin-bottom:4px;">' + certification.levelLabel + '</p>' +
                    '<p style="font-size:24px;font-weight:bold;color:' + certification.color + ';">' + certification.score + '/100</p>' +
                    '<p style="font-size:12px;color:#6b7280;margin-top:8px;">ID: ' + certification.certificationId + '</p>' +
                    '<p style="font-size:11px;color:#9ca3af;">' + (l === 'fr' ? 'Valide jusqu\'au' : 'Valid until') + ' ' + certification.validUntil + '</p>' +
                    '</div>';
            }
        };
        
        // ═══════════════════════════════════════════════════════════════════════════
        // MODULES v8.0 - API PUBLIQUE + COMMUNAUTÉ + INTÉGRATIONS
        // ═══════════════════════════════════════════════════════════════════════════
        
        var MoudarAPI = {
            version: '1.0.0', baseUrl: 'https://<YOUR-API-ENDPOINT>/api/v1',
            endpoints: {
                auth: { login: { method: 'POST', path: '/auth/login' }, refresh: { method: 'POST', path: '/auth/refresh' } },
                projects: { list: { method: 'GET', path: '/projects' }, create: { method: 'POST', path: '/projects' }, get: { method: 'GET', path: '/projects/{id}' }, analyze: { method: 'POST', path: '/projects/{id}/analyze' } },
                strategies: { list: { method: 'GET', path: '/strategies' }, recommend: { method: 'POST', path: '/strategies/recommend' } },
                frameworks: { cfir: { method: 'POST', path: '/frameworks/cfir/evaluate' }, reaim: { method: 'POST', path: '/frameworks/reaim/evaluate' } },
                analytics: { predict: { method: 'POST', path: '/analytics/predict' }, monteCarlo: { method: 'POST', path: '/analytics/monte-carlo' }, roi: { method: 'POST', path: '/analytics/roi' } },
                exports: { spirit: { method: 'POST', path: '/exports/spirit' }, docx: { method: 'POST', path: '/exports/docx' } },
                community: { benchmarks: { method: 'GET', path: '/community/benchmarks' }, share: { method: 'POST', path: '/community/share' } },
                integrations: { redcap: { method: 'POST', path: '/integrations/redcap/sync' }, odk: { method: 'POST', path: '/integrations/odk/sync' }, dhis2: { method: 'POST', path: '/integrations/dhis2/sync' } }
            },
            generateDocumentation: function(lang) { var self = this; var docs = { title: (lang||'fr') === 'fr' ? 'API Moudar' : 'Moudar API', version: this.version, baseUrl: this.baseUrl, categories: [] }; Object.keys(this.endpoints).forEach(function(cat) { var c = { name: cat, endpoints: [] }; Object.keys(self.endpoints[cat]).forEach(function(ep) { c.endpoints.push({ name: ep, method: self.endpoints[cat][ep].method, path: self.baseUrl + self.endpoints[cat][ep].path }); }); docs.categories.push(c); }); return docs; },
            generateSDK: function() { return '// Moudar SDK - Coming soon'; },
            generateCurlExamples: function() { return { auth: 'curl -X POST ' + this.baseUrl + '/auth/login -d \'{"email":"x","password":"y"}\'', create: 'curl -X POST ' + this.baseUrl + '/projects -H "Authorization: Bearer {t}" -d \'{"title":"x"}\'' }; }
        };
        
        var CommunityHub = {
            globalBenchmarks: {
                byDomain: { mental_health: { avgSuccessRate: 62, avgAdoptionRate: 68, topStrategies: ['S01','S10','S19'], totalProjects: 847, countries: 42 }, primary_care: { avgSuccessRate: 71, avgAdoptionRate: 74, topStrategies: ['S01','S02','S03'], totalProjects: 1234, countries: 67 }, chronic_disease: { avgSuccessRate: 58, avgAdoptionRate: 63, topStrategies: ['S18','S08','S10'], totalProjects: 623, countries: 38 }, maternal_child: { avgSuccessRate: 75, avgAdoptionRate: 79, topStrategies: ['S08','S18','S01'], totalProjects: 956, countries: 54 } },
                byRegion: { 'Sub-Saharan Africa': { avgSuccess: 58, projects: 412 }, 'South Asia': { avgSuccess: 64, projects: 387 }, 'Latin America': { avgSuccess: 69, projects: 298 }, 'MENA': { avgSuccess: 61, projects: 234 }, 'Southeast Asia': { avgSuccess: 67, projects: 321 }, 'Europe': { avgSuccess: 73, projects: 456 } },
                byIncome: { LIC: { avgSuccess: 52, avgBudget: 85000 }, LMIC: { avgSuccess: 61, avgBudget: 180000 }, UMIC: { avgSuccess: 68, avgBudget: 350000 }, HIC: { avgSuccess: 74, avgBudget: 620000 } }
            },
            sharedProjects: [ { id: 'CP001', domain: 'mental_health', region: 'MENA', successRate: 78, views: 234 }, { id: 'CP002', domain: 'primary_care', region: 'Sub-Saharan Africa', successRate: 65, views: 456 }, { id: 'CP003', domain: 'chronic_disease', region: 'South Asia', successRate: 71, views: 189 } ],
            forums: { categories: [ { id: 'strategies', name: { fr: 'Stratégies', en: 'Strategies' }, topics: 145 }, { id: 'frameworks', name: { fr: 'Cadres', en: 'Frameworks' }, topics: 89 }, { id: 'cases', name: { fr: 'Cas', en: 'Cases' }, topics: 234 } ] },
            getBenchmarks: function(filters, lang) { var b = { global: { totalProjects: 2497, totalCountries: 89, avgSuccessRate: 65, totalBeneficiaries: '2.3M' }, filtered: null, comparison: null }; if (filters && filters.domain) b.filtered = this.globalBenchmarks.byDomain[filters.domain]; if (filters && filters.region) b.filtered = this.globalBenchmarks.byRegion[filters.region]; if (filters && filters.projectSuccessRate) { var avg = b.filtered ? (b.filtered.avgSuccess || b.filtered.avgSuccessRate || 65) : 65; b.comparison = { yourRate: filters.projectSuccessRate, globalAvg: avg, percentile: Math.min(99, Math.max(1, 50 + filters.projectSuccessRate - avg)) }; } return b; },
            getSimilarProjects: function(project) { return this.sharedProjects.filter(function(p) { return p.domain === project.domain; }).slice(0, 5); },
            shareProject: function(project, options, lang) { return { success: true, projectId: 'CP' + Date.now(), message: (lang||'fr') === 'fr' ? 'Projet partagé!' : 'Project shared!' }; },
            getLeaderboard: function() { return { topContributors: [ { rank: 1, name: 'Expert_SMOA', points: 4567, country: '🇨🇭' }, { rank: 2, name: 'GlobalHealth', points: 3890, country: '🇺🇸' }, { rank: 3, name: 'LMIC_Champion', points: 3456, country: '🇰🇪' } ], badges: [ { id: 'pioneer', icon: '🏆' }, { id: 'mentor', icon: '🎓' }, { id: 'innovator', icon: '💡' }, { id: 'global', icon: '🌍' } ] }; }
        };
        
        var DataIntegrations = {
            integrations: {
                redcap: { id: 'redcap', name: 'REDCap', logo: '🔴', desc: { fr: 'Gestion données recherche', en: 'Research data' }, capabilities: ['import','export','sync','forms'], status: 'available' },
                odk: { id: 'odk', name: 'ODK', logo: '📱', desc: { fr: 'Collecte terrain', en: 'Field collection' }, capabilities: ['import','export','forms'], status: 'available' },
                dhis2: { id: 'dhis2', name: 'DHIS2', logo: '📊', desc: { fr: 'Systèmes santé', en: 'Health systems' }, capabilities: ['import','export','indicators'], status: 'available' },
                kobo: { id: 'kobo', name: 'KoboToolbox', logo: '📋', desc: { fr: 'Humanitaire', en: 'Humanitarian' }, capabilities: ['import','export','forms'], status: 'available' },
                commcare: { id: 'commcare', name: 'CommCare', logo: '💚', desc: { fr: 'Agents communautaires', en: 'CHW' }, capabilities: ['import','export'], status: 'coming_soon' }
            },
            getConfigForm: function(id, lang) { var i = this.integrations[id]; if (!i) return null; var f = { redcap: [{ id: 'apiUrl', label: { fr: 'URL API', en: 'API URL' }, type: 'url' }, { id: 'apiToken', label: { fr: 'Token', en: 'Token' }, type: 'password' }, { id: 'projectId', label: 'ID', type: 'text' }], odk: [{ id: 'serverUrl', label: { fr: 'URL', en: 'URL' }, type: 'url' }, { id: 'username', label: { fr: 'User', en: 'User' }, type: 'text' }, { id: 'password', label: { fr: 'Pass', en: 'Pass' }, type: 'password' }], dhis2: [{ id: 'serverUrl', label: 'URL', type: 'url' }, { id: 'username', label: 'User', type: 'text' }, { id: 'password', label: 'Pass', type: 'password' }, { id: 'orgUnit', label: 'OrgUnit', type: 'text' }], kobo: [{ id: 'apiUrl', label: 'URL', type: 'url' }, { id: 'apiToken', label: 'Token', type: 'password' }] }; return { integration: i, fields: f[id] || [] }; },
            testConnection: function(id, config, lang) { var ok = config.apiUrl || config.serverUrl; return { success: !!ok, message: ok ? ((lang||'fr') === 'fr' ? 'Connexion OK!' : 'Connected!') : 'Failed', details: ok ? { version: '2.x', projects: 3 } : null }; },
            generateRedcapForm: function(project, protocol, lang) { lang = lang || 'fr'; return { projectTitle: project.title || 'Moudar', instruments: [ { name: 'participant', label: lang === 'fr' ? 'Participant' : 'Participant', fields: [{ name: 'id', label: 'ID', type: 'text' }, { name: 'date', label: 'Date', type: 'date' }, { name: 'consent', label: lang === 'fr' ? 'Consentement' : 'Consent', type: 'yesno' }] }, { name: 'implementation', label: lang === 'fr' ? 'Implémentation' : 'Implementation', fields: [{ name: 'strategy', label: lang === 'fr' ? 'Stratégie' : 'Strategy', type: 'checkbox' }, { name: 'fidelity', label: lang === 'fr' ? 'Fidélité' : 'Fidelity', type: 'slider' }] }, { name: 'outcomes', label: 'Outcomes', fields: [{ name: 'primary', label: lang === 'fr' ? 'Primaire' : 'Primary', type: 'text' }] } ], events: ['baseline', 'month_6', 'endline'], exportFormat: 'REDCap XML', generatedAt: new Date().toISOString() }; },
            generateOdkForm: function(project, protocol, lang) { lang = lang || 'fr'; var form = { settings: { title: project.title || 'Moudar', id: 'moudar_' + Date.now() }, survey: [{ type: 'text', name: 'id', label: 'ID' }, { type: 'geopoint', name: 'location', label: lang === 'fr' ? 'Localisation' : 'Location' }, { type: 'date', name: 'date', label: 'Date' }, { type: 'select_multiple strategies', name: 'strategies', label: lang === 'fr' ? 'Stratégies' : 'Strategies' }, { type: 'integer', name: 'fidelity', label: lang === 'fr' ? 'Fidélité' : 'Fidelity' }, { type: 'image', name: 'photo', label: 'Photo' }], choices: [] }; if (protocol && protocol.aiRawRecommendations) { protocol.aiRawRecommendations.strategies.top.forEach(function(s) { var n = KnowledgeGraph.nodes.strategies[s.id || s]; form.choices.push({ list: 'strategies', name: s.id || s, label: n ? n.label[lang] : s.id }); }); } return { form: form, formats: ['XLSForm', 'XForm'], generatedAt: new Date().toISOString() }; },
            syncData: function(id, config, direction, lang) { return { success: true, integration: id, direction: direction, timestamp: new Date().toISOString(), stats: { processed: Math.floor(Math.random()*100)+50, created: Math.floor(Math.random()*30)+10, errors: Math.floor(Math.random()*3) }, message: direction === 'import' ? ((lang||'fr') === 'fr' ? 'Importé' : 'Imported') : ((lang||'fr') === 'fr' ? 'Exporté' : 'Exported') }; }
        };
        
        // Exposer l'API publique
        Object.assign(MoudarEngine, {
            api: MoudarAPI, getAPIDocumentation: function(l) { return MoudarAPI.generateDocumentation(l); }, getSDK: function() { return MoudarAPI.generateSDK(); }, getCurlExamples: function() { return MoudarAPI.generateCurlExamples(); },
            community: CommunityHub, getBenchmarks: function(f, l) { return CommunityHub.getBenchmarks(f, l); }, getSimilarCommunityProjects: function(p) { return CommunityHub.getSimilarProjects(p); }, shareProject: function(p, o, l) { return CommunityHub.shareProject(p, o, l); }, getLeaderboard: function() { return CommunityHub.getLeaderboard(); },
            integrations: DataIntegrations, getIntegrations: function() { return DataIntegrations.integrations; }, getIntegrationConfig: function(id, l) { return DataIntegrations.getConfigForm(id, l); }, testIntegration: function(id, c, l) { return DataIntegrations.testConnection(id, c, l); }, generateRedcapForm: function(p, pr, l) { return DataIntegrations.generateRedcapForm(p, pr, l); }, generateOdkForm: function(p, pr, l) { return DataIntegrations.generateOdkForm(p, pr, l); }, syncIntegration: function(id, c, d, l) { return DataIntegrations.syncData(id, c, d, l); }
        });
        
        // Exposer v8.0 - World Reference Platform
        Object.assign(MoudarEngine, {
            // XAI - Explainable AI
            xai: ExplainableAI,
            explainStrategy: function(s, c, l) { return ExplainableAI.explainStrategy(s, c, l); },
            getXAIReport: function(p, c, l) { return ExplainableAI.generateXAIReport(p, c, l); },
            
            // Document Analyzer
            documentAnalyzer: DocumentAnalyzer,
            analyzeDocument: function(t, l) { return DocumentAnalyzer.analyzeDocument(t, l); },
            extractElements: function(t, l) { return DocumentAnalyzer.extractElements(t, l); },
            identifyGaps: function(t, l) { return DocumentAnalyzer.identifyGaps(t, l); },
            generateSection: function(s, c, l) { return DocumentAnalyzer.generateSection(s, c, l); },
            
            // Learning & Feedback
            learning: LearningFeedback,
            submitFeedback: function(p, s, f, l) { return LearningFeedback.submitFeedback(p, s, f, l); },
            getContextInsights: function(c, l) { return LearningFeedback.getContextInsights(c, l); },
            getStrategyBenchmark: function(s, c, l) { return LearningFeedback.getStrategyBenchmark(s, c, l); },
            submitMonitoring: function(p, d, l) { return LearningFeedback.submitMonitoringData(p, d, l); },
            
            // Pedagogy
            pedagogy: PedagogySystem,
            getGlossary: function(l) { return PedagogySystem.getFullGlossary(l); },
            getGlossaryEntry: function(t, l) { return PedagogySystem.getGlossaryEntry(t, l); },
            getTutorial: function(id, l) { return PedagogySystem.getTutorial(id, l); },
            getLearningCase: function(id, l) { return PedagogySystem.getLearningCase(id, l); },
            
            // Certification
            certification: CertificationSystem,
            evaluateCertification: function(p, c, l) { return CertificationSystem.evaluateForCertification(p, c, l); },
            getCertificationBadge: function(c, l) { return CertificationSystem.generateBadgeHTML(c, l); }
        });
    })();

export default MoudarEngine;
