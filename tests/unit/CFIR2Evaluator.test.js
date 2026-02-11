/**
 * Unit Tests: CFIR2Evaluator
 *
 * PATTERN: Each engine gets a test file with:
 *   1. Smoke test (does it load?)
 *   2. Core function tests (correct output for known input)
 *   3. Edge cases (empty input, missing fields, wrong types)
 *   4. Scientific accuracy (known IS values)
 *
 * RUN: npm test -- --testPathPattern=CFIR2Evaluator
 */

// TODO: Uncomment when engine is extracted
// import CFIR2Evaluator, { evaluate, getAllConstructs, mapBarriers } from '@engines/CFIR2Evaluator';

// ── Temporary: inline the engine for testing before extraction ────
// Copy-paste the engine object here to test BEFORE modularizing
const CFIR2Evaluator = {
  VERSION: '12.0.0',
  // ... (paste from monolith for immediate testing)
};

describe('CFIR2Evaluator', () => {

  // ── 1. Smoke Tests ──────────────────────────────────────────
  test('should have correct version', () => {
    expect(CFIR2Evaluator.VERSION).toBe('12.0.0');
  });

  test('should have citation with DOI', () => {
    expect(CFIR2Evaluator.citation).toContain('Damschroder');
    expect(CFIR2Evaluator.citation).toContain('2022');
  });

  // ── 2. Scientific Accuracy ──────────────────────────────────
  test('should have exactly 5 domains', () => {
    const domains = Object.keys(CFIR2Evaluator.domains || {});
    expect(domains).toHaveLength(5);
    expect(domains).toContain('innovation');
    expect(domains).toContain('outerSetting');
    expect(domains).toContain('innerSetting');
    expect(domains).toContain('individuals');
    expect(domains).toContain('process');
  });

  test('should have 39 constructs total (CFIR 2.0 spec)', () => {
    // CFIR 2.0 has exactly 39 constructs across 5 domains
    // This is the most important scientific validation test
    let totalConstructs = 0;
    Object.values(CFIR2Evaluator.domains || {}).forEach(domain => {
      totalConstructs += (domain.constructs || []).length;
    });
    expect(totalConstructs).toBe(39);
  });

  // ── 3. Core Function Tests ──────────────────────────────────
  test('evaluate() should return scores for all domains', () => {
    const project = {
      title: 'Test Project',
      barriers: [{ text: 'Lack of training', constructId: 'C01' }],
      strategies: [{ id: 'S01', name: 'Training' }],
    };

    const result = CFIR2Evaluator.evaluate(project, 'en');

    expect(result).toBeDefined();
    expect(result).toHaveProperty('scores');
    expect(result).toHaveProperty('overallScore');
    expect(typeof result.overallScore).toBe('number');
    expect(result.overallScore).toBeGreaterThanOrEqual(0);
    expect(result.overallScore).toBeLessThanOrEqual(100);
  });

  // ── 4. Edge Cases ───────────────────────────────────────────
  test('evaluate() should handle empty project gracefully', () => {
    expect(() => {
      CFIR2Evaluator.evaluate({}, 'fr');
    }).not.toThrow();
  });

  test('evaluate() should handle missing barriers', () => {
    const result = CFIR2Evaluator.evaluate({ title: 'Empty' }, 'fr');
    expect(result).toBeDefined();
  });

  test('getAllConstructs() should return array for both languages', () => {
    const fr = CFIR2Evaluator.getAllConstructs('fr');
    const en = CFIR2Evaluator.getAllConstructs('en');
    expect(Array.isArray(fr)).toBe(true);
    expect(Array.isArray(en)).toBe(true);
    expect(fr.length).toBe(en.length);
  });

  // ── 5. Regression Guard ─────────────────────────────────────
  // Add specific tests here when bugs are found
  // test('should not crash on Unicode barrier text (bug #42)', () => { ... });
});


/**
 * ═══════════════════════════════════════════════════════════════
 * TEST TEMPLATE — Copy this for each engine:
 *
 * COMBDiagnostic.test.js     → 6 COM-B components, 14 TDF domains
 * IRLMGenerator.test.js      → Causal chain: 5 columns, mermaid output
 * SustainabilityEngine.test.js → 8 PSAT domains, sustainability score
 * HybridDesignWizard.test.js → Type 1/2/3 classification
 * PRISMEvaluator.test.js     → 5 PRISM domains
 * ConsensusEngine.test.js    → Krippendorff's alpha calculation
 * SuccessPrediction.test.js  → Heuristic bounds [0, 1]
 * MonteCarloSimulator.test.js → Distribution statistics
 * ═══════════════════════════════════════════════════════════════
 */
