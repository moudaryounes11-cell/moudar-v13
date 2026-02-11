/**
 * CFIR 2.0 Evaluator Engine
 * Damschroder LJ et al. (2022). Implementation Science, 17:75
 * DOI: 10.1186/s13012-022-01245-0
 *
 * Evaluates implementation projects against all 39 CFIR 2.0 constructs
 * across 5 domains: Innovation, Outer Setting, Inner Setting, Individuals, Process
 *
 * EXTRACTED FROM: index5.html lines ~1300-2200 (v12.0 monolith)
 * MIGRATION NOTE: This was previously a global `var CFIR2Evaluator = {...}`
 */

import CFIR_DATA from '@data/cfir2-constructs.json';

// Flatten nested domains into a flat array with domain key on each construct
const CFIR_CONSTRUCTS = Object.entries(CFIR_DATA.domains).flatMap(
  ([domainKey, domain]) => domain.constructs.map(c => ({ ...c, domain: domainKey }))
);

const CFIR2Evaluator = {
  VERSION: '12.0.0',
  citation: 'Damschroder LJ et al. (2022). Implementation Science, 17:75. doi:10.1186/s13012-022-01245-0',

  domains: {
    innovation: {
      id: 'innovation',
      label: { fr: 'Innovation', en: 'Innovation' },
      constructs: CFIR_CONSTRUCTS.filter(c => c.domain === 'innovation'),
    },
    outerSetting: {
      id: 'outerSetting',
      label: { fr: 'Contexte Externe', en: 'Outer Setting' },
      constructs: CFIR_CONSTRUCTS.filter(c => c.domain === 'outerSetting'),
    },
    innerSetting: {
      id: 'innerSetting',
      label: { fr: 'Contexte Interne', en: 'Inner Setting' },
      constructs: CFIR_CONSTRUCTS.filter(c => c.domain === 'innerSetting'),
    },
    individuals: {
      id: 'individuals',
      label: { fr: 'Individus', en: 'Individuals' },
      constructs: CFIR_CONSTRUCTS.filter(c => c.domain === 'individuals'),
    },
    process: {
      id: 'process',
      label: { fr: 'Processus', en: 'Process' },
      constructs: CFIR_CONSTRUCTS.filter(c => c.domain === 'process'),
    },
  },

  /**
   * Evaluate a project against CFIR 2.0
   * @param {Object} project - Project data with barriers and strategies
   * @param {string} lang - 'fr' or 'en'
   * @returns {Object} Evaluation result with scores per domain and construct
   */
  evaluate(project, lang = 'fr') {
    // ... (copy logic from monolith CFIR2Evaluator.evaluate)
    // The internal logic stays IDENTICAL — only the packaging changes
  },

  /**
   * Get all 39 constructs with their descriptions
   * @param {string} lang
   * @returns {Array}
   */
  getAllConstructs(lang = 'fr') {
    // ... (copy from monolith)
  },

  /**
   * Map barriers to CFIR constructs
   * @param {Array} barriers
   * @param {string} lang
   * @returns {Object} Mapping of barrier -> construct(s)
   */
  mapBarriers(barriers, lang = 'fr') {
    // ... (copy from monolith)
  },
};

export default CFIR2Evaluator;

// ── TESTABLE EXPORTS ──────────────────────────────────────────
// These individual functions can be unit-tested independently
export const { evaluate, getAllConstructs, mapBarriers } = CFIR2Evaluator;
