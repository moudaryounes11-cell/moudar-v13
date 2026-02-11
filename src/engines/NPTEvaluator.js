const NPTEvaluator = {
    version: '1.0',
    citation: 'May C & Finch T (2009). Implementation Science, 4:29',
    nomadCitation: 'Finch TL et al. (2018). BMC Medical Research Methodology, 18:133',

    constructs: {
        coherence: {
            id: 'coherence',
            label: { fr: 'Coh\u00e9rence (Sense-Making)', en: 'Coherence (Sense-Making)' },
            description: { fr: 'Travail que font les individus pour comprendre et donner du sens \u00e0 une pratique', en: 'The work that individuals do to understand and make sense of a practice' },
            color: '#3b82f6',
            subConstructs: [
                { id: 'CO1', name: { fr: 'Diff\u00e9renciation', en: 'Differentiation' }, description: { fr: 'Comprendre en quoi la pratique diff\u00e8re des pratiques existantes', en: 'Understanding how the practice differs from existing practices' } },
                { id: 'CO2', name: { fr: 'Sp\u00e9cification communale', en: 'Communal Specification' }, description: { fr: 'Construire une compr\u00e9hension partag\u00e9e de la pratique', en: 'Building shared understanding of the practice' } },
                { id: 'CO3', name: { fr: 'Sp\u00e9cification individuelle', en: 'Individual Specification' }, description: { fr: 'Comprendre ses propres t\u00e2ches et responsabilit\u00e9s', en: 'Understanding own tasks and responsibilities' } },
                { id: 'CO4', name: { fr: 'Internalisation', en: 'Internalization' }, description: { fr: 'Comprendre la valeur et les b\u00e9n\u00e9fices de la pratique', en: 'Understanding the value and benefits of the practice' } }
            ]
        },
        cognitiveParticipation: {
            id: 'cognitiveParticipation',
            label: { fr: 'Participation Cognitive', en: 'Cognitive Participation' },
            description: { fr: 'Travail relationnel pour construire et maintenir une communaut\u00e9 de pratique', en: 'Relational work to build and sustain a community of practice' },
            color: '#10b981',
            subConstructs: [
                { id: 'CP1', name: { fr: 'Initiation', en: 'Initiation' }, description: { fr: 'Acteurs cl\u00e9s qui conduisent la pratique', en: 'Key actors who drive the practice forward' } },
                { id: 'CP2', name: { fr: 'Enr\u00f4lement', en: 'Enrolment' }, description: { fr: 'Organiser les autres pour contribuer \u00e0 la pratique', en: 'Organizing others to contribute to the practice' } },
                { id: 'CP3', name: { fr: 'L\u00e9gitimation', en: 'Legitimation' }, description: { fr: 'Croire que la pratique est appropri\u00e9e', en: 'Believing the practice is an appropriate thing to do' } },
                { id: 'CP4', name: { fr: 'Activation', en: 'Activation' }, description: { fr: 'D\u00e9finir les actions et proc\u00e9dures n\u00e9cessaires', en: 'Defining the actions and procedures needed' } }
            ]
        },
        collectiveAction: {
            id: 'collectiveAction',
            label: { fr: 'Action Collective', en: 'Collective Action' },
            description: { fr: 'Travail op\u00e9rationnel pour mettre en \u0153uvre la pratique', en: 'Operational work to enact the practice' },
            color: '#8b5cf6',
            subConstructs: [
                { id: 'CA1', name: { fr: 'Fonctionnement interactionnel', en: 'Interactional Workability' }, description: { fr: 'Comment la pratique affecte les interactions', en: 'How the practice affects interactions' } },
                { id: 'CA2', name: { fr: 'Confiance relationnelle', en: 'Relational Integration' }, description: { fr: 'Connaissance et confiance dans la pratique', en: 'Knowledge about and confidence in the practice' } },
                { id: 'CA3', name: { fr: 'Ensemble de comp\u00e9tences', en: 'Skill Set Workability' }, description: { fr: 'Division du travail appropri\u00e9e', en: 'Appropriate division of labor' } },
                { id: 'CA4', name: { fr: 'Int\u00e9gration contextuelle', en: 'Contextual Integration' }, description: { fr: 'Soutien organisationnel et ressources', en: 'Organizational support and resources' } }
            ]
        },
        reflexiveMonitoring: {
            id: 'reflexiveMonitoring',
            label: { fr: 'Suivi R\u00e9flexif', en: 'Reflexive Monitoring' },
            description: { fr: 'Travail d\'\u00e9valuation et d\'ajustement continu', en: 'Appraisal work to assess and adjust the practice' },
            color: '#f59e0b',
            subConstructs: [
                { id: 'RM1', name: { fr: 'Syst\u00e9matisation', en: 'Systematization' }, description: { fr: 'Collecter de l\'information sur les effets de la pratique', en: 'Gathering information about the effects of the practice' } },
                { id: 'RM2', name: { fr: '\u00c9valuation communale', en: 'Communal Appraisal' }, description: { fr: '\u00c9valuation collective de la pratique', en: 'Collective evaluation of the practice' } },
                { id: 'RM3', name: { fr: '\u00c9valuation individuelle', en: 'Individual Appraisal' }, description: { fr: '\u00c9valuation individuelle de la pratique', en: 'Individual evaluation of the practice' } },
                { id: 'RM4', name: { fr: 'Reconfiguration', en: 'Reconfiguration' }, description: { fr: 'Modifier la pratique en fonction des \u00e9valuations', en: 'Modifying the practice based on appraisals' } }
            ]
        }
    },

    evaluate: function(project, scores, lang) {
        lang = lang || 'fr';
        const self = this;
        const results = {};
        let totalScore = 0;

        Object.keys(this.constructs).forEach(function(constructId) {
            const construct = self.constructs[constructId];
            const subScores = [];

            construct.subConstructs.forEach(function(sub) {
                const score = (scores && scores[sub.id]) ? scores[sub.id] : 0;
                subScores.push({
                    id: sub.id,
                    name: sub.name[lang],
                    description: sub.description[lang],
                    score: score,
                    status: score >= 70 ? 'normalized' : score >= 40 ? 'partial' : 'not_normalized'
                });
            });

            const avgScore = subScores.length > 0 ? Math.round(subScores.reduce(function(a, b) { return a + b.score; }, 0) / subScores.length) : 0;

            results[constructId] = {
                id: constructId,
                label: construct.label[lang],
                description: construct.description[lang],
                color: construct.color,
                score: avgScore,
                subConstructs: subScores,
                normalizationLevel: avgScore >= 70 ? 'normalized' : avgScore >= 40 ? 'emerging' : 'not_normalized',
                normalizationLabel: avgScore >= 70
                    ? (lang === 'fr' ? 'Normalis\u00e9' : 'Normalized')
                    : avgScore >= 40
                        ? (lang === 'fr' ? '\u00c9mergent' : 'Emerging')
                        : (lang === 'fr' ? 'Non normalis\u00e9' : 'Not normalized')
            };

            totalScore += avgScore;
        });

        const globalScore = Math.round(totalScore / 4);

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

export default NPTEvaluator;
