var IRLMGenerator = {
  VERSION: '11.0.0',
  citation: 'Smith JD, Li DH, Rafferty MR. (2020). Implementation Science, 15:84. doi:10.1186/s13012-020-01041-8',
  // IRLM components
  components: {
    determinants: {
      id: 'determinants',
      label: {
        fr: 'Déterminants',
        en: 'Determinants'
      },
      color: '#7c3aed',
      description: {
        fr: 'Facteurs contextuels qui influencent l\'implémentation (cadres: CFIR, TDF, COM-B)',
        en: 'Contextual factors influencing implementation (frameworks: CFIR, TDF, COM-B)'
      }
    },
    strategies: {
      id: 'strategies',
      label: {
        fr: 'Stratégies d\'implémentation',
        en: 'Implementation Strategies'
      },
      color: '#2563eb',
      description: {
        fr: 'Actions prises pour adopter/mettre en œuvre l\'intervention (ERIC)',
        en: 'Actions taken to adopt/deliver the intervention (ERIC)'
      }
    },
    mechanisms: {
      id: 'mechanisms',
      label: {
        fr: 'Mécanismes',
        en: 'Mechanisms'
      },
      color: '#059669',
      description: {
        fr: 'Processus causaux par lesquels les stratégies produisent des changements',
        en: 'Causal processes through which strategies produce change'
      }
    },
    implementationOutcomes: {
      id: 'implOutcomes',
      label: {
        fr: 'Outcomes d\'implémentation',
        en: 'Implementation Outcomes'
      },
      color: '#d97706',
      description: {
        fr: 'Proctor 2011: acceptabilité, adoption, faisabilité, fidélité, coût, pénétration, pérennisation',
        en: 'Proctor 2011: acceptability, adoption, feasibility, fidelity, cost, penetration, sustainability'
      }
    },
    clinicalOutcomes: {
      id: 'clinOutcomes',
      label: {
        fr: 'Outcomes cliniques/service',
        en: 'Clinical/Service Outcomes'
      },
      color: '#dc2626',
      description: {
        fr: 'Résultats pour les patients et le système de santé',
        en: 'Results for patients and health system'
      }
    }
  },
  // Generate IRLM from project data
  generate: function (projectData, lang) {
    var t = function (fr, en) {
      return lang === 'fr' ? fr : en;
    };
    var irlm = {
      title: projectData.title || t('Modèle Logique IS', 'IS Logic Model'),
      determinants: {
        barriers: (projectData.barriers || []).map(function (b) {
          return {
            text: b.text || b,
            cfirConstruct: b.cfirConstruct || '',
            severity: b.severity || 'medium'
          };
        }),
        facilitators: (projectData.facilitators || []).map(function (f) {
          return {
            text: f.text || f,
            cfirConstruct: f.cfirConstruct || ''
          };
        })
      },
      strategies: (projectData.strategies || []).map(function (s) {
        return {
          name: s.name || s,
          ericCode: s.ericCode || '',
          targetDeterminants: s.targets || [],
          justification: s.justification || ''
        };
      }),
      mechanisms: (projectData.strategies || []).map(function (s) {
        var mechs = ISOntologyEngine.causalMechanisms.filter(function (m) {
          return m.ericCode === s.ericCode;
        });
        return {
          strategy: s.name || s,
          mechanism: mechs.length > 0 ? mechs[0].mechanism : t('À définir', 'To be defined'),
          evidence: mechs.length > 0 ? mechs[0].evidenceLevel : 'unknown'
        };
      }),
      implementationOutcomes: (projectData.implOutcomes || ['Adoption', 'Fidelity', 'Acceptability', 'Feasibility']).map(function (o) {
        return {
          outcome: o,
          measure: '',
          timeline: ''
        };
      }),
      clinicalOutcomes: (projectData.clinOutcomes || []).map(function (o) {
        return {
          outcome: o,
          measure: '',
          timeline: ''
        };
      }),
      causalChain: t('Déterminants (CFIR) → Stratégies (ERIC) → Mécanismes → Outcomes implémentation (Proctor) → Outcomes cliniques', 'Determinants (CFIR) → Strategies (ERIC) → Mechanisms → Implementation Outcomes (Proctor) → Clinical Outcomes'),
      generatedAt: new Date().toISOString(),
      citation: this.citation
    };
    return irlm;
  },
  // Generate visual ASCII representation
  // Generate Mermaid.js diagram code for professional rendering
  generateMermaid: function (irlm, lang) {
    var t = function (fr, en) {
      return lang === 'fr' ? fr : en;
    };
    var safe = function (s) {
      return (s || '').replace(/"/g, "'").replace(/[[\]()]/g, '').substring(0, 45);
    };
    var lines = ['graph LR'];
    lines.push('  classDef det fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#5b21b6');
    lines.push('  classDef barr fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b');
    lines.push('  classDef fac fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534');
    lines.push('  classDef strat fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e40af');
    lines.push('  classDef mech fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#065f46');
    lines.push('  classDef impl fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#92400e');
    lines.push('  classDef clin fill:#ffe4e6,stroke:#e11d48,stroke-width:2px,color:#9f1239');
    // Subgraph: Determinants
    lines.push('  subgraph DET["' + t('DETERMINANTS CFIR', 'CFIR DETERMINANTS') + '"]');
    (irlm.determinants.barriers || []).forEach(function (b, i) {
      lines.push('    B' + i + '["' + safe(b.text || b) + '"]:::barr');
    });
    (irlm.determinants.facilitators || []).forEach(function (f, i) {
      lines.push('    F' + i + '["' + safe(f.text || f) + '"]:::fac');
    });
    lines.push('  end');
    // Subgraph: Strategies
    lines.push('  subgraph STR["' + t('STRATEGIES ERIC', 'ERIC STRATEGIES') + '"]');
    (irlm.strategies || []).forEach(function (s, i) {
      lines.push('    S' + i + '["' + safe(s.name || s) + '"]:::strat');
    });
    lines.push('  end');
    // Subgraph: Mechanisms
    lines.push('  subgraph MCH["' + t('MECANISMES', 'MECHANISMS') + '"]');
    (irlm.mechanisms || []).forEach(function (m, i) {
      lines.push('    M' + i + '["' + safe(m.mechanism || m.strategy || '') + '"]:::mech');
    });
    lines.push('  end');
    // Subgraph: Implementation Outcomes
    lines.push('  subgraph IMP["' + t('OUTCOMES Proctor', 'Proctor OUTCOMES') + '"]');
    (irlm.implementationOutcomes || []).forEach(function (o, i) {
      lines.push('    IO' + i + '["' + safe(o.outcome || o) + '"]:::impl');
    });
    lines.push('  end');
    // Subgraph: Clinical Outcomes
    lines.push('  subgraph CLN["' + t('OUTCOMES CLINIQUES', 'CLINICAL OUTCOMES') + '"]');
    (irlm.clinicalOutcomes || []).forEach(function (o, i) {
      lines.push('    CO' + i + '["' + safe(o.outcome || o) + '"]:::clin');
    });
    lines.push('  end');
    // Arrows
    var nB = (irlm.determinants.barriers || []).length;
    var nF = (irlm.determinants.facilitators || []).length;
    var nS = (irlm.strategies || []).length;
    var nM = (irlm.mechanisms || []).length;
    var nIO = (irlm.implementationOutcomes || []).length;
    var nCO = (irlm.clinicalOutcomes || []).length;
    for (var bi = 0; bi < nB; bi++) {
      for (var si = 0; si < Math.min(nS, 2); si++) {
        lines.push('  B' + bi + ' -->|' + t('cible', 'target') + '| S' + si);
      }
    }
    for (var fi = 0; fi < nF; fi++) {
      for (var sj = 0; sj < Math.min(nS, 2); sj++) {
        lines.push('  F' + fi + ' -->|' + t('facilite', 'enables') + '| S' + sj);
      }
    }
    for (var sk = 0; sk < nS; sk++) {
      var mk = sk < nM ? sk : nM - 1;
      if (mk >= 0) lines.push('  S' + sk + ' --> M' + mk);
    }
    for (var mi = 0; mi < nM; mi++) {
      for (var io = 0; io < Math.min(nIO, 3); io++) {
        lines.push('  M' + mi + ' --> IO' + io);
      }
    }
    for (var ii = 0; ii < nIO; ii++) {
      for (var ci = 0; ci < nCO; ci++) {
        lines.push('  IO' + ii + ' --> CO' + ci);
      }
    }
    return lines.join('\n');
  },
  generateVisual: function (irlm, lang) {
    return {
      mermaid: this.generateMermaid(irlm, lang),
      components: irlm
    };
  }
};
console.log('✅ MOUDAR v11.0: IRLMGenerator loaded — Automated Logic Model (Smith 2020) — WORLD FIRST');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE D4: COM-B / TDF BEHAVIORAL DIAGNOSIS
// Michie S et al. (2011) Implementation Science 6:42
// Cane J et al. (2012) Implementation Science 7:37
// Bridge between IS and Behaviour Change Science
// ═══════════════════════════════════════════════════════════════════════════

export default IRLMGenerator;
