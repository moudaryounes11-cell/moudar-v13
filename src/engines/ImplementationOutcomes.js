const ImplementationOutcomes = {
    version: '1.0',
    citation: 'Proctor E et al. (2011). Admin & Policy in Mental Health, 38:65-76',

    outcomes: {
        acceptability: {
            id: 'acceptability',
            label: { fr: 'Acceptabilit\u00e9', en: 'Acceptability' },
            definition: { fr: 'Perception que l\'innovation est agr\u00e9able, satisfaisante', en: 'Perception that the innovation is agreeable, palatable, satisfactory' },
            instruments: ['Acceptability of Intervention Measure (AIM)', 'Treatment Acceptability Questionnaire'],
            cfirLink: ['IC3', 'IS6'],
            color: '#3b82f6'
        },
        adoption: {
            id: 'adoption',
            label: { fr: 'Adoption', en: 'Adoption' },
            definition: { fr: 'Intention, d\u00e9cision initiale, ou action d\'utiliser l\'innovation', en: 'Intention, initial decision, or action to try the innovation' },
            instruments: ['RE-AIM Adoption measure', 'Provider surveys'],
            cfirLink: ['IN4', 'IS11'],
            color: '#10b981'
        },
        appropriateness: {
            id: 'appropriateness',
            label: { fr: 'Pertinence', en: 'Appropriateness' },
            definition: { fr: 'Compatibilit\u00e9 per\u00e7ue de l\'innovation avec le contexte, le prestataire, le consommateur', en: 'Perceived fit, relevance, or compatibility of the innovation for the setting' },
            instruments: ['Intervention Appropriateness Measure (IAM)', 'Perceived Characteristics of Intervention'],
            cfirLink: ['IS6', 'IC3'],
            color: '#8b5cf6'
        },
        feasibility: {
            id: 'feasibility',
            label: { fr: 'Faisabilit\u00e9', en: 'Feasibility' },
            definition: { fr: 'Mesure dans laquelle l\'innovation peut \u00eatre utilis\u00e9e avec succ\u00e8s dans le cadre donn\u00e9', en: 'Extent to which the innovation can be successfully used within the setting' },
            instruments: ['Feasibility of Intervention Measure (FIM)', 'Organizational Readiness'],
            cfirLink: ['IS12', 'IC6'],
            color: '#f59e0b'
        },
        fidelity: {
            id: 'fidelity',
            label: { fr: 'Fid\u00e9lit\u00e9', en: 'Fidelity' },
            definition: { fr: 'Degr\u00e9 de conformit\u00e9 \u00e0 la mise en \u0153uvre pr\u00e9vue initialement', en: 'Degree to which the innovation was implemented as prescribed' },
            instruments: ['Fidelity checklists', 'FRAME (Stirman 2019)'],
            cfirLink: ['PR4', 'IC4'],
            color: '#ef4444'
        },
        cost: {
            id: 'cost',
            label: { fr: 'Co\u00fbt d\'impl\u00e9mentation', en: 'Implementation Cost' },
            definition: { fr: 'Co\u00fbt de la strat\u00e9gie d\'impl\u00e9mentation elle-m\u00eame', en: 'Cost impact of the implementation strategy itself' },
            instruments: ['Budget Impact Analysis', 'Cost-effectiveness analysis'],
            cfirLink: ['IC8', 'OS6'],
            color: '#14b8a6'
        },
        penetration: {
            id: 'penetration',
            label: { fr: 'P\u00e9n\u00e9tration', en: 'Penetration' },
            definition: { fr: 'Int\u00e9gration de l\'innovation dans le cadre et ses sous-syst\u00e8mes', en: 'Integration of the innovation within the setting and its subsystems' },
            instruments: ['RE-AIM Reach/Adoption', 'Service delivery data'],
            cfirLink: ['IS1', 'OS4'],
            color: '#a855f7'
        },
        sustainability: {
            id: 'sustainability',
            label: { fr: 'P\u00e9rennit\u00e9', en: 'Sustainability' },
            definition: { fr: 'Maintien de l\'innovation apr\u00e8s la fin du financement initial', en: 'Extent to which the innovation is maintained after initial funding ends' },
            instruments: ['PSAT', 'Scheirer Framework', 'RE-AIM Maintenance'],
            cfirLink: ['OS6', 'IS14'],
            color: '#f97316'
        }
    },

    evaluate: function(scores, lang) {
        lang = lang || 'fr';
        const self = this;
        const results = {};
        let totalScore = 0;
        let count = 0;

        Object.keys(this.outcomes).forEach(function(outcomeId) {
            const outcome = self.outcomes[outcomeId];
            const score = (scores && scores[outcomeId]) ? scores[outcomeId] : 0;

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

export default ImplementationOutcomes;
