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
