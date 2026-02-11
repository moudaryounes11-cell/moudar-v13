const StakeholderMapper = {
    // Categories d'acteurs CFIR-alignees
    stakeholderCategories: {
        leadership: {
            label: { fr: 'Leadership & D\u00e9cideurs', en: 'Leadership & Decision Makers' },
            icon: '\ud83d\udc54',
            color: '#3b82f6',
            influenceWeight: 1.0
        },
        implementers: {
            label: { fr: '\u00c9quipe d\'impl\u00e9mentation', en: 'Implementation Team' },
            icon: '\u2699\ufe0f',
            color: '#10b981',
            influenceWeight: 0.9
        },
        clinicians: {
            label: { fr: 'Cliniciens / Praticiens', en: 'Clinicians / Practitioners' },
            icon: '\ud83e\ude7a',
            color: '#8b5cf6',
            influenceWeight: 0.85
        },
        patients: {
            label: { fr: 'Patients / B\u00e9n\u00e9ficiaires', en: 'Patients / Beneficiaries' },
            icon: '\ud83d\udc65',
            color: '#f59e0b',
            influenceWeight: 0.7
        },
        funders: {
            label: { fr: 'Bailleurs / Financeurs', en: 'Funders / Donors' },
            icon: '\ud83d\udcb0',
            color: '#ef4444',
            influenceWeight: 0.95
        },
        partners: {
            label: { fr: 'Partenaires externes', en: 'External Partners' },
            icon: '\ud83e\udd1d',
            color: '#06b6d4',
            influenceWeight: 0.75
        },
        community: {
            label: { fr: 'Communaut\u00e9 / Soci\u00e9t\u00e9 civile', en: 'Community / Civil Society' },
            icon: '\ud83c\udfe8\ufe0f',
            color: '#84cc16',
            influenceWeight: 0.6
        },
        regulators: {
            label: { fr: 'R\u00e9gulateurs / Minist\u00e8res', en: 'Regulators / Ministries' },
            icon: '\ud83c\udfdb\ufe0f',
            color: '#6366f1',
            influenceWeight: 0.9
        }
    },

    // Matrice de positions
    positionMatrix: {
        champion: { label: { fr: 'Champion', en: 'Champion' }, score: 2, color: '#10b981', icon: '\ud83c\udf1f' },
        supporter: { label: { fr: 'Soutien', en: 'Supporter' }, score: 1, color: '#84cc16', icon: '\ud83d\udc4d' },
        neutral: { label: { fr: 'Neutre', en: 'Neutral' }, score: 0, color: '#6b7280', icon: '\ud83d\ude10' },
        skeptic: { label: { fr: 'Sceptique', en: 'Skeptic' }, score: -1, color: '#f59e0b', icon: '\ud83e\udd14' },
        blocker: { label: { fr: 'Bloqueur', en: 'Blocker' }, score: -2, color: '#ef4444', icon: '\ud83d\udeab' }
    },

    // Strategies d'engagement recommandees
    engagementStrategies: {
        champion: ['S04', 'S07', 'S12'], // Utiliser comme ambassadeur
        supporter: ['S08', 'S03', 'S20'], // Renforcer l'engagement
        neutral: ['S01', 'S18', 'S11'], // Eduquer et informer
        skeptic: ['S02', 'S16', 'S15'], // Convaincre avec preuves
        blocker: ['S04', 'S10', 'S09'] // Negocier et faciliter
    },

    analyze: function(stakeholders, project, lang) {
        lang = lang || 'fr';
        const self = this;

        if (!stakeholders || stakeholders.length === 0) {
            stakeholders = this.generateDefaultStakeholders(project, lang);
        }

        // Calculer les scores et metriques
        const analyzed = stakeholders.map(function(s) {
            const category = self.stakeholderCategories[s.category] || self.stakeholderCategories.partners;
            const position = self.positionMatrix[s.position] || self.positionMatrix.neutral;

            const influence = (s.influence || 5) / 10;
            const interest = (s.interest || 5) / 10;
            const power = influence * category.influenceWeight;
            const engagement = (influence + interest) / 2;

            // Quadrant Power/Interest
            const quadrant = self.calculateQuadrant(power, interest);

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

        // Calculer les metriques globales
        const metrics = this.calculateGlobalMetrics(analyzed, lang);

        // Identifier champions et bloqueurs
        const champions = analyzed.filter(function(s) { return s.position === 'champion'; });
        const blockers = analyzed.filter(function(s) { return s.position === 'blocker'; });

        // Generer le reseau
        const network = this.generateNetwork(analyzed);

        // Recommandations
        const recommendations = this.generateRecommendations(analyzed, metrics, lang);

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
            { id: 'SH4', name: lang === 'fr' ? '\u00c9quipe terrain' : 'Field Team', category: 'implementers', position: 'supporter', influence: 6, interest: 8 },
            { id: 'SH5', name: lang === 'fr' ? 'M\u00e9decins seniors' : 'Senior Physicians', category: 'clinicians', position: 'neutral', influence: 8, interest: 5 },
            { id: 'SH6', name: lang === 'fr' ? 'Infirmiers' : 'Nurses', category: 'clinicians', position: 'supporter', influence: 6, interest: 7 },
            { id: 'SH7', name: lang === 'fr' ? 'Repr\u00e9sentants patients' : 'Patient Representatives', category: 'patients', position: 'supporter', influence: 4, interest: 9 },
            { id: 'SH8', name: lang === 'fr' ? 'Bailleur principal' : 'Main Funder', category: 'funders', position: 'neutral', influence: 10, interest: 6 },
            { id: 'SH9', name: lang === 'fr' ? 'Minist\u00e8re de la Sant\u00e9' : 'Ministry of Health', category: 'regulators', position: 'neutral', influence: 9, interest: 5 },
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
        let totalInfluence = 0;
        let totalEngagement = 0;
        let weightedPosition = 0;
        let totalWeight = 0;

        stakeholders.forEach(function(s) {
            totalInfluence += s.influence;
            totalEngagement += s.engagement;
            weightedPosition += s.positionScore * (s.influence / 100);
            totalWeight += s.influence / 100;
        });

        const n = stakeholders.length || 1;

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
        const nodes = stakeholders.map(function(s) {
            return {
                id: s.id,
                label: s.name,
                color: s.categoryColor,
                size: s.power / 10 + 5,
                group: s.category
            };
        });

        const edges = [];
        // Generer des connexions basees sur les categories
        stakeholders.forEach(function(s1, i) {
            stakeholders.forEach(function(s2, j) {
                if (i < j) {
                    let strength = 0;
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
        const quadrants = {
            manage_closely: { label: lang === 'fr' ? 'G\u00e9rer de pr\u00e8s' : 'Manage Closely', count: 0, color: '#ef4444' },
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
        const self = this;
        const distribution = {};

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
        let risk = 0;
        stakeholders.forEach(function(s) {
            if (s.position === 'blocker' && s.power >= 70) risk += 30;
            else if (s.position === 'blocker') risk += 15;
            else if (s.position === 'skeptic' && s.power >= 70) risk += 15;
            else if (s.position === 'skeptic') risk += 8;
        });
        return Math.min(100, risk);
    },

    calculateReadinessScore: function(stakeholders) {
        let readiness = 50;
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
        const recs = [];

        if (metrics.blockersCount > 0) {
            recs.push({
                priority: 'high',
                icon: '\u26a0\ufe0f',
                text: lang === 'fr'
                    ? metrics.blockersCount + ' bloqueur(s) identifi\u00e9(s) - Strat\u00e9gie de n\u00e9gociation urgente requise'
                    : metrics.blockersCount + ' blocker(s) identified - Urgent negotiation strategy required',
                strategies: ['S04', 'S10']
            });
        }

        if (metrics.championsCount < 2) {
            recs.push({
                priority: 'high',
                icon: '\ud83c\udf1f',
                text: lang === 'fr'
                    ? 'Identifier et recruter plus de champions (actuellement: ' + metrics.championsCount + ')'
                    : 'Identify and recruit more champions (currently: ' + metrics.championsCount + ')',
                strategies: ['S04', 'S07']
            });
        }

        if (metrics.netAlignment < 60) {
            recs.push({
                priority: 'medium',
                icon: '\ud83d\udcca',
                text: lang === 'fr'
                    ? 'Alignement global faible (' + metrics.netAlignment + '%) - Renforcer l\'engagement'
                    : 'Low overall alignment (' + metrics.netAlignment + '%) - Strengthen engagement',
                strategies: ['S08', 'S18']
            });
        }

        recs.push({
            priority: 'low',
            icon: '\ud83d\udcc5',
            text: lang === 'fr'
                ? 'Planifier des r\u00e9unions r\u00e9guli\u00e8res avec les acteurs du quadrant "G\u00e9rer de pr\u00e8s"'
                : 'Schedule regular meetings with stakeholders in "Manage Closely" quadrant',
            strategies: ['S03', 'S20']
        });

        return recs;
    }
};

export default StakeholderMapper;
