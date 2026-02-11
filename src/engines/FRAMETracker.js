const FRAMETracker = {
    version: '1.0',
    citation: 'Stirman SW et al. (2019). Implementation Science, 14:58',

    // FRAME dimensions
    dimensions: {
        what: {
            label: { fr: 'QUOI a \u00e9t\u00e9 adapt\u00e9', en: 'WHAT was adapted' },
            options: [
                { id: 'content', label: { fr: 'Contenu', en: 'Content' } },
                { id: 'context', label: { fr: 'Contexte de livraison', en: 'Context of delivery' } },
                { id: 'training', label: { fr: 'Formation/Supervision', en: 'Training/Supervision' } },
                { id: 'evaluation', label: { fr: '\u00c9valuation', en: 'Evaluation' } },
                { id: 'implementation', label: { fr: 'Activit\u00e9s d\'impl\u00e9mentation', en: 'Implementation activities' } }
            ]
        },
        whom: {
            label: { fr: 'Par QUI', en: 'By WHOM' },
            options: [
                { id: 'researcher', label: { fr: 'Chercheur', en: 'Researcher' } },
                { id: 'practitioner', label: { fr: 'Praticien', en: 'Practitioner' } },
                { id: 'administrator', label: { fr: 'Administrateur', en: 'Administrator' } },
                { id: 'recipient', label: { fr: 'B\u00e9n\u00e9ficiaire', en: 'Recipient/Patient' } },
                { id: 'team', label: { fr: '\u00c9quipe mixte', en: 'Mixed team' } }
            ]
        },
        level: {
            label: { fr: '\u00c0 quel NIVEAU', en: 'At what LEVEL' },
            options: [
                { id: 'individual', label: { fr: 'Individuel', en: 'Individual' } },
                { id: 'cohort', label: { fr: 'Cohorte', en: 'Cohort' } },
                { id: 'population', label: { fr: 'Population', en: 'Population' } },
                { id: 'organization', label: { fr: 'Organisation', en: 'Organization' } },
                { id: 'system', label: { fr: 'Syst\u00e8me', en: 'System' } }
            ]
        },
        type: {
            label: { fr: 'TYPE de modification', en: 'TYPE of modification' },
            options: [
                { id: 'adding', label: { fr: 'Ajout d\'\u00e9l\u00e9ments', en: 'Adding elements' } },
                { id: 'removing', label: { fr: 'Suppression d\'\u00e9l\u00e9ments', en: 'Removing/skipping elements' } },
                { id: 'modifying', label: { fr: 'Modification', en: 'Modifying/adapting' } },
                { id: 'substituting', label: { fr: 'Substitution', en: 'Substituting' } },
                { id: 'reordering', label: { fr: 'R\u00e9organisation', en: 'Reordering/restructuring' } },
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
                { id: 'regulatory', label: { fr: 'Exigences r\u00e9glementaires', en: 'Regulatory requirements' } },
                { id: 'feedback', label: { fr: 'Retour des participants', en: 'Participant feedback' } },
                { id: 'evidence', label: { fr: 'Nouvelles preuves', en: 'New evidence' } },
                { id: 'pragmatic', label: { fr: 'Raisons pragmatiques', en: 'Pragmatic reasons' } }
            ]
        },
        fidelityImpact: {
            label: { fr: 'Impact sur la FID\u00c9LIT\u00c9', en: 'FIDELITY impact' },
            options: [
                { id: 'core_preserved', label: { fr: 'Composantes essentielles pr\u00e9serv\u00e9es', en: 'Core components preserved' } },
                { id: 'core_modified', label: { fr: 'Composantes essentielles modifi\u00e9es', en: 'Core components modified' } },
                { id: 'periphery_only', label: { fr: 'P\u00e9riph\u00e9rie uniquement', en: 'Periphery only' } },
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
        const total = adaptations.length;
        if (total === 0) return { score: 100, label: lang === 'fr' ? 'Aucune adaptation' : 'No adaptations', risk: 'none' };

        const coreModified = adaptations.filter(function(a) { return a.fidelityImpact === 'core_modified'; }).length;
        const corePreserved = adaptations.filter(function(a) { return a.fidelityImpact === 'core_preserved'; }).length;
        const peripheryOnly = adaptations.filter(function(a) { return a.fidelityImpact === 'periphery_only'; }).length;

        const score = Math.round(((corePreserved + peripheryOnly * 0.9) / total) * 100);
        const risk = coreModified > total * 0.3 ? 'high' : coreModified > 0 ? 'moderate' : 'low';

        return {
            score: score,
            total: total,
            coreModified: coreModified,
            corePreserved: corePreserved,
            peripheryOnly: peripheryOnly,
            risk: risk,
            label: risk === 'high'
                ? (lang === 'fr' ? 'Risque \u00e9lev\u00e9 de d\u00e9rive' : 'High drift risk')
                : risk === 'moderate'
                    ? (lang === 'fr' ? 'Risque mod\u00e9r\u00e9' : 'Moderate risk')
                    : (lang === 'fr' ? 'Fid\u00e9lit\u00e9 pr\u00e9serv\u00e9e' : 'Fidelity preserved'),
            citation: this.citation
        };
    }
};

export default FRAMETracker;
