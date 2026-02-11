var ISOntologyEngine = {
  VERSION: '11.0.0',
  // Registered frameworks with metadata
  frameworks: {
    CFIR: {
      id: 'CFIR',
      fullName: 'Consolidated Framework for Implementation Research',
      version: '2.0',
      year: 2022,
      authors: 'Damschroder LJ et al.',
      doi: '10.1186/s13012-022-01245-0',
      type: 'determinant',
      domains: 5,
      constructs: 39,
      scope: 'multilevel'
    },
    REAIM: {
      id: 'REAIM',
      fullName: 'RE-AIM Framework',
      version: '2.0',
      year: 2019,
      authors: 'Glasgow RE et al.',
      doi: '10.1146/annurev-publhealth-040218-043905',
      type: 'evaluation',
      domains: 5,
      constructs: 5,
      scope: 'outcomes'
    },
    ERIC: {
      id: 'ERIC',
      fullName: 'Expert Recommendations for Implementing Change',
      version: '1.0',
      year: 2015,
      authors: 'Powell BJ et al.',
      doi: '10.1186/s13012-015-0209-1',
      type: 'strategies',
      domains: 9,
      constructs: 73,
      scope: 'strategies'
    },
    COMB: {
      id: 'COMB',
      fullName: 'Capability-Opportunity-Motivation-Behaviour',
      version: '1.0',
      year: 2011,
      authors: 'Michie S et al.',
      doi: '10.1186/1748-5908-6-42',
      type: 'behavioral',
      domains: 3,
      constructs: 6,
      scope: 'individual'
    },
    NPT: {
      id: 'NPT',
      fullName: 'Normalization Process Theory',
      version: '1.0',
      year: 2009,
      authors: 'May C & Finch T',
      doi: '10.1186/1748-5908-4-29',
      type: 'process',
      domains: 4,
      constructs: 16,
      scope: 'normalization'
    },
    PROCTOR: {
      id: 'PROCTOR',
      fullName: 'Implementation Outcomes Taxonomy',
      version: '1.0',
      year: 2011,
      authors: 'Proctor E et al.',
      doi: '10.1007/s10488-010-0319-7',
      type: 'outcomes',
      domains: 1,
      constructs: 8,
      scope: 'outcomes'
    },
    FRAME: {
      id: 'FRAME',
      fullName: 'Framework for Reporting Adaptations and Modifications',
      version: '1.0',
      year: 2019,
      authors: 'Stirman SW et al.',
      doi: '10.1186/s13012-019-0898-y',
      type: 'adaptation',
      domains: 6,
      constructs: 6,
      scope: 'fidelity'
    },
    EPIS: {
      id: 'EPIS',
      fullName: 'Exploration-Preparation-Implementation-Sustainment',
      version: '1.0',
      year: 2011,
      authors: 'Aarons GA et al.',
      doi: '10.1007/s10488-011-0355-4',
      type: 'process',
      domains: 4,
      constructs: 4,
      scope: 'phases'
    },
    TDF: {
      id: 'TDF',
      fullName: 'Theoretical Domains Framework',
      version: '2.0',
      year: 2012,
      authors: 'Cane J et al.',
      doi: '10.1186/1748-5908-7-37',
      type: 'behavioral',
      domains: 14,
      constructs: 84,
      scope: 'individual'
    },
    STARI: {
      id: 'STARI',
      fullName: 'Standards for Reporting Implementation Studies',
      version: '1.0',
      year: 2017,
      authors: 'Pinnock H et al.',
      doi: '10.1136/bmj.i6795',
      type: 'reporting',
      domains: 5,
      constructs: 27,
      scope: 'reporting'
    }
  },
  // Cross-framework relationships (ontological links)
  relationships: [{
    from: 'CFIR.IC4',
    to: 'FRAME',
    type: 'monitored_by',
    label: 'Adaptability is tracked via FRAME'
  }, {
    from: 'CFIR.IN2',
    to: 'COMB.Capability',
    type: 'maps_to',
    label: 'CFIR Capability maps to COM-B Capability'
  }, {
    from: 'CFIR.IN3',
    to: 'COMB.Opportunity',
    type: 'maps_to',
    label: 'CFIR Opportunity maps to COM-B Opportunity'
  }, {
    from: 'CFIR.IN4',
    to: 'COMB.Motivation',
    type: 'maps_to',
    label: 'CFIR Motivation maps to COM-B Motivation'
  }, {
    from: 'CFIR.IS11',
    to: 'ERIC.S04',
    type: 'addressed_by',
    label: 'Leadership engagement addressed by champions strategy'
  }, {
    from: 'CFIR.IS12',
    to: 'ERIC.S13',
    type: 'addressed_by',
    label: 'Available resources addressed by resource optimization'
  }, {
    from: 'CFIR.PR1',
    to: 'NPT.Coherence',
    type: 'complements',
    label: 'Assessing context complements NPT sense-making'
  }, {
    from: 'CFIR.PR5',
    to: 'NPT.ReflexiveMonitoring',
    type: 'complements',
    label: 'Reflecting complements NPT reflexive monitoring'
  }, {
    from: 'PROCTOR.Adoption',
    to: 'REAIM.Adoption',
    type: 'measures',
    label: 'Proctor adoption measured by RE-AIM adoption'
  }, {
    from: 'PROCTOR.Sustainability',
    to: 'REAIM.Maintenance',
    type: 'measures',
    label: 'Proctor sustainability measured by RE-AIM maintenance'
  }, {
    from: 'PROCTOR.Fidelity',
    to: 'FRAME',
    type: 'tracked_by',
    label: 'Fidelity tracked by FRAME adaptation documentation'
  }, {
    from: 'ERIC',
    to: 'CFIR',
    type: 'targets',
    label: 'ERIC strategies target CFIR constructs (Waltz 2019)'
  }, {
    from: 'EPIS.Exploration',
    to: 'CFIR.PR1',
    type: 'phase_includes',
    label: 'Exploration phase includes context assessment'
  }, {
    from: 'EPIS.Implementation',
    to: 'CFIR.PR4',
    type: 'phase_includes',
    label: 'Implementation phase includes executing'
  }, {
    from: 'EPIS.Sustainment',
    to: 'PROCTOR.Sustainability',
    type: 'phase_targets',
    label: 'Sustainment targets sustainability outcome'
  }, {
    from: 'TDF',
    to: 'COMB',
    type: 'operationalizes',
    label: 'TDF 14 domains operationalize COM-B components'
  }, {
    from: 'STARI',
    to: 'PROCTOR',
    type: 'reports_on',
    label: 'StaRI requires reporting implementation outcomes'
  }, {
    from: 'STARI',
    to: 'CFIR',
    type: 'reports_on',
    label: 'StaRI requires reporting framework use'
  }],
  // Causal mechanisms: how strategies produce outcomes
  causalMechanisms: [{
    strategy: 'Training',
    ericCode: 'S01',
    mechanism: 'Knowledge & skill acquisition → behavioral capability → adoption',
    cfirTargets: ['IN2', 'IS13'],
    proctorOutcome: 'Adoption',
    evidenceLevel: 'strong'
  }, {
    strategy: 'Audit & Feedback',
    ericCode: 'S02',
    mechanism: 'Performance awareness → motivation → fidelity improvement',
    cfirTargets: ['PR5', 'IS8'],
    proctorOutcome: 'Fidelity',
    evidenceLevel: 'strong'
  }, {
    strategy: 'Facilitation',
    ericCode: 'S03',
    mechanism: 'Barrier resolution → process optimization → penetration',
    cfirTargets: ['PR3', 'IS3'],
    proctorOutcome: 'Penetration',
    evidenceLevel: 'moderate'
  }, {
    strategy: 'Champions',
    ericCode: 'S04',
    mechanism: 'Social influence → normative change → organizational adoption',
    cfirTargets: ['IS11', 'IN4'],
    proctorOutcome: 'Adoption',
    evidenceLevel: 'strong'
  }, {
    strategy: 'Supervision',
    ericCode: 'S10',
    mechanism: 'Competence maintenance → quality assurance → fidelity',
    cfirTargets: ['IN2', 'PR4'],
    proctorOutcome: 'Fidelity',
    evidenceLevel: 'moderate'
  }, {
    strategy: 'Incentives',
    ericCode: 'S06',
    mechanism: 'Extrinsic motivation → behavioral change → initial adoption',
    cfirTargets: ['IN4', 'IS8'],
    proctorOutcome: 'Adoption',
    evidenceLevel: 'weak'
  }, {
    strategy: 'Coalition Building',
    ericCode: 'S08',
    mechanism: 'Stakeholder alignment → resource pooling → sustainability',
    cfirTargets: ['OS4', 'PR3'],
    proctorOutcome: 'Sustainability',
    evidenceLevel: 'moderate'
  }, {
    strategy: 'Adaptation',
    ericCode: 'S05',
    mechanism: 'Contextual fit → acceptability → sustained adoption',
    cfirTargets: ['IC4', 'IC7'],
    proctorOutcome: 'Appropriateness',
    evidenceLevel: 'strong'
  }],
  // Query the ontology
  query: function (params) {
    var self = this;
    var results = {
      frameworks: [],
      relationships: [],
      mechanisms: [],
      timestamp: new Date().toISOString()
    };
    if (params.framework) {
      results.frameworks = Object.values(self.frameworks).filter(function (f) {
        return f.id === params.framework || f.type === params.framework;
      });
    }
    if (params.construct) {
      results.relationships = self.relationships.filter(function (r) {
        return r.from.indexOf(params.construct) !== -1 || r.to.indexOf(params.construct) !== -1 || r.to === params.construct;
      });
      results.mechanisms = self.causalMechanisms.filter(function (m) {
        return m.cfirTargets.indexOf(params.construct) !== -1;
      });
    }
    if (params.strategy) {
      results.mechanisms = self.causalMechanisms.filter(function (m) {
        return m.ericCode === params.strategy || m.strategy.toLowerCase().indexOf((params.strategy || '').toLowerCase()) !== -1;
      });
    }
    if (params.outcome) {
      results.mechanisms = self.causalMechanisms.filter(function (m) {
        return m.proctorOutcome.toLowerCase() === (params.outcome || '').toLowerCase();
      });
      results.relationships = self.relationships.filter(function (r) {
        return r.from.indexOf(params.outcome) !== -1 || r.to.indexOf(params.outcome) !== -1;
      });
    }
    if (params.type) {
      results.frameworks = Object.values(self.frameworks).filter(function (f) {
        return f.type === params.type;
      });
    }
    return results;
  },
  // Get framework compatibility matrix
  getCompatibilityMatrix: function () {
    var fwIds = Object.keys(this.frameworks);
    var matrix = {};
    var self = this;
    fwIds.forEach(function (f1) {
      matrix[f1] = {};
      fwIds.forEach(function (f2) {
        if (f1 === f2) {
          matrix[f1][f2] = {
            compatible: true,
            type: 'same'
          };
          return;
        }
        var links = self.relationships.filter(function (r) {
          return r.from.indexOf(f1) !== -1 && r.to.indexOf(f2) !== -1 || r.from.indexOf(f2) !== -1 && r.to.indexOf(f1) !== -1 || r.from === f2 || r.to === f1;
        });
        matrix[f1][f2] = {
          compatible: links.length > 0,
          links: links.length,
          type: links.length > 2 ? 'strong' : links.length > 0 ? 'complementary' : 'independent'
        };
      });
    });
    return matrix;
  },
  // Export ontology as JSON-LD
  exportJSONLD: function () {
    return {
      '@context': {
        'is': 'https://moudar.org/ontology/',
        'schema': 'https://schema.org/'
      },
      '@type': 'is:ImplementationScienceOntology',
      'is:version': this.VERSION,
      'is:frameworks': Object.values(this.frameworks),
      'is:relationships': this.relationships,
      'is:causalMechanisms': this.causalMechanisms,
      'schema:dateCreated': new Date().toISOString(),
      'schema:creator': 'MOUDAR® v11.0 — Younes MOUDAR'
    };
  },
  // Get all paths from construct to outcome
  tracePath: function (constructId, outcomeId) {
    var self = this;
    var paths = [];
    self.causalMechanisms.forEach(function (m) {
      if (m.cfirTargets.indexOf(constructId) !== -1 && m.proctorOutcome.toLowerCase() === (outcomeId || '').toLowerCase()) {
        paths.push({
          construct: constructId,
          strategy: m.strategy,
          ericCode: m.ericCode,
          mechanism: m.mechanism,
          outcome: m.proctorOutcome,
          evidence: m.evidenceLevel
        });
      }
    });
    return paths;
  }
};
console.log('✅ MOUDAR v11.0: ISOntologyEngine loaded — ' + Object.keys(ISOntologyEngine.frameworks).length + ' frameworks, ' + ISOntologyEngine.relationships.length + ' relationships, ' + ISOntologyEngine.causalMechanisms.length + ' causal mechanisms');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE C2: COLLABORATIVE EVIDENCE REPOSITORY
// Shared database of IS implementation cases with network effects
// More users → better recommendations
// ═══════════════════════════════════════════════════════════════════════════

export default ISOntologyEngine;
