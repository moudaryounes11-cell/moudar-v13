var EvidenceRepository = {
  VERSION: '11.0.0',
  // Case template
  caseTemplate: {
    id: '',
    title: '',
    country: '',
    region: '',
    setting: '',
    population: '',
    innovation: '',
    frameworks: [],
    strategies: [],
    cfirScores: {},
    reaimScores: {},
    proctorOutcomes: {},
    equityDimensions: [],
    barriersSummary: '',
    facilitatorsSummary: '',
    adaptations: [],
    nptScore: 0,
    designType: '',
    sampleSize: 0,
    duration: '',
    keyFindings: '',
    lessonsLearned: '',
    publicationDOI: '',
    status: 'draft',
    contributedBy: '',
    anonymized: true,
    createdAt: '',
    tags: []
  },
  // In-memory repository (in production: persistent storage API)
  cases: [],
  // Demo cases seeded from literature
  seedCases: [{
    id: 'CASE_001',
    title: 'mhGAP Integration in Morocco Primary Care',
    country: 'Morocco',
    region: 'Rabat-Salé-Kénitra',
    setting: 'Primary care centers',
    population: 'Healthcare workers (N=120), Patients (N=2400)',
    innovation: 'WHO mhGAP-IG v2.0 mental health integration',
    frameworks: ['CFIR', 'REAIM', 'PROCTOR'],
    strategies: ['S01', 'S04', 'S10', 'S03', 'S08'],
    cfirScores: {
      innovation: 78,
      outerSetting: 65,
      innerSetting: 72,
      individuals: 68,
      process: 74
    },
    reaimScores: {
      reach: 72,
      effectiveness: 68,
      adoption: 65,
      implementation: 70,
      maintenance: 55
    },
    proctorOutcomes: {
      acceptability: 78,
      adoption: 65,
      appropriateness: 72,
      feasibility: 68,
      fidelity: 70,
      cost: 60,
      penetration: 55,
      sustainability: 50
    },
    designType: 'Hybrid Type 2 stepped-wedge',
    sampleSize: 2520,
    duration: '24 months',
    keyFindings: 'Training + champions strategy achieved 65% adoption at 12 months',
    lessonsLearned: 'Sustainability requires institutional anchoring and ongoing supervision',
    tags: ['mental-health', 'primary-care', 'LMIC', 'mhGAP', 'task-shifting'],
    status: 'published',
    createdAt: '2025-01-15'
  }, {
    id: 'CASE_002',
    title: 'Evidence-Based Practice in Swiss Emergency Departments',
    country: 'Switzerland',
    region: 'Geneva',
    setting: 'Emergency departments',
    population: 'Emergency nurses and physicians (N=85)',
    innovation: 'Standardized triage protocol with decision support',
    frameworks: ['CFIR', 'NPT', 'PROCTOR'],
    strategies: ['S01', 'S02', 'S09', 'S10'],
    cfirScores: {
      innovation: 82,
      outerSetting: 75,
      innerSetting: 80,
      individuals: 77,
      process: 85
    },
    reaimScores: {
      reach: 90,
      effectiveness: 82,
      adoption: 78,
      implementation: 85,
      maintenance: 72
    },
    proctorOutcomes: {
      acceptability: 82,
      adoption: 78,
      appropriateness: 85,
      feasibility: 80,
      fidelity: 88,
      cost: 70,
      penetration: 75,
      sustainability: 68
    },
    designType: 'Pre-post with concurrent control',
    sampleSize: 85,
    duration: '18 months',
    keyFindings: 'Audit & feedback cycle improved fidelity from 45% to 88%',
    lessonsLearned: 'NPT coherence was the strongest predictor of sustained adoption',
    tags: ['emergency', 'triage', 'high-income', 'audit-feedback', 'decision-support'],
    status: 'published',
    createdAt: '2024-11-20'
  }, {
    id: 'CASE_003',
    title: 'Community Health Worker Digital Health in Rwanda',
    country: 'Rwanda',
    region: 'Eastern Province',
    setting: 'Community health posts',
    population: 'CHWs (N=340), Households (N=15000)',
    innovation: 'mHealth app for integrated community case management',
    frameworks: ['CFIR', 'REAIM', 'FRAME'],
    strategies: ['S01', 'S05', 'S04', 'S06', 'S08'],
    cfirScores: {
      innovation: 70,
      outerSetting: 68,
      innerSetting: 60,
      individuals: 72,
      process: 65
    },
    reaimScores: {
      reach: 85,
      effectiveness: 62,
      adoption: 70,
      implementation: 65,
      maintenance: 48
    },
    proctorOutcomes: {
      acceptability: 75,
      adoption: 70,
      appropriateness: 68,
      feasibility: 62,
      fidelity: 58,
      cost: 55,
      penetration: 80,
      sustainability: 45
    },
    designType: 'Cluster RCT',
    sampleSize: 15340,
    duration: '30 months',
    keyFindings: 'High reach but fidelity challenges due to network connectivity',
    lessonsLearned: 'FRAME tracking revealed 12 adaptations, 8 preserving core components',
    tags: ['digital-health', 'CHW', 'LMIC', 'mHealth', 'Africa', 'community'],
    status: 'published',
    createdAt: '2024-09-10'
  }, {
    id: 'CASE_004',
    title: 'Palliative Care Integration in Moroccan Oncology',
    country: 'Morocco',
    region: 'Casablanca-Settat',
    setting: 'Oncology departments',
    population: 'Oncologists, nurses, social workers (N=65)',
    innovation: 'Integrated palliative care pathway based on WHO guidelines',
    frameworks: ['CFIR', 'REAIM', 'NPT'],
    strategies: ['S01', 'S03', 'S04', 'S10', 'S13'],
    cfirScores: {
      innovation: 75,
      outerSetting: 58,
      innerSetting: 65,
      individuals: 70,
      process: 68
    },
    reaimScores: {
      reach: 55,
      effectiveness: 70,
      adoption: 50,
      implementation: 62,
      maintenance: 40
    },
    proctorOutcomes: {
      acceptability: 72,
      adoption: 50,
      appropriateness: 78,
      feasibility: 55,
      fidelity: 65,
      cost: 48,
      penetration: 42,
      sustainability: 38
    },
    designType: 'Mixed methods (quant + qual)',
    sampleSize: 65,
    duration: '12 months',
    keyFindings: 'Cultural barriers to palliative care discussions significantly impacted adoption',
    lessonsLearned: 'NPT Cognitive Participation was the main bottleneck — need early clinician buy-in',
    tags: ['palliative-care', 'oncology', 'LMIC', 'cultural-barriers', 'Morocco'],
    status: 'published',
    createdAt: '2025-02-01'
  }],
  // Initialize with seed cases
  init: function () {
    this.cases = this.seedCases.slice();
    return this;
  },
  // Add a new case
  addCase: function (caseData) {
    var newCase = Object.assign({}, this.caseTemplate, caseData, {
      id: 'CASE_' + Date.now(),
      createdAt: new Date().toISOString(),
      anonymized: true
    });
    this.cases.push(newCase);
    return newCase;
  },
  // Search cases by criteria
  search: function (criteria) {
    var results = this.cases.slice();
    if (criteria.country) results = results.filter(function (c) {
      return c.country.toLowerCase().indexOf(criteria.country.toLowerCase()) !== -1;
    });
    if (criteria.setting) results = results.filter(function (c) {
      return c.setting.toLowerCase().indexOf(criteria.setting.toLowerCase()) !== -1;
    });
    if (criteria.framework) results = results.filter(function (c) {
      return c.frameworks.indexOf(criteria.framework) !== -1;
    });
    if (criteria.strategy) results = results.filter(function (c) {
      return c.strategies.indexOf(criteria.strategy) !== -1;
    });
    if (criteria.tag) results = results.filter(function (c) {
      return c.tags.some(function (t) {
        return t.indexOf(criteria.tag) !== -1;
      });
    });
    if (criteria.designType) results = results.filter(function (c) {
      return c.designType.toLowerCase().indexOf(criteria.designType.toLowerCase()) !== -1;
    });
    return results;
  },
  // Get pattern-based recommendations (ML-lite)
  getRecommendations: function (userContext) {
    var self = this;
    var similar = this.cases.filter(function (c) {
      var score = 0;
      if (userContext.country && c.country.toLowerCase() === userContext.country.toLowerCase()) score += 3;
      if (userContext.setting && c.setting.toLowerCase().indexOf(userContext.setting.toLowerCase()) !== -1) score += 2;
      if (userContext.frameworks) {
        userContext.frameworks.forEach(function (f) {
          if (c.frameworks.indexOf(f) !== -1) score += 1;
        });
      }
      if (userContext.tags) {
        userContext.tags.forEach(function (t) {
          if (c.tags.indexOf(t) !== -1) score += 1;
        });
      }
      c._similarityScore = score;
      return score >= 2;
    });
    similar.sort(function (a, b) {
      return b._similarityScore - a._similarityScore;
    });

    // Extract patterns from similar cases
    var strategyFreq = {};
    var avgOutcomes = {
      acceptability: 0,
      adoption: 0,
      fidelity: 0,
      sustainability: 0
    };
    var count = similar.length || 1;
    similar.forEach(function (c) {
      c.strategies.forEach(function (s) {
        strategyFreq[s] = (strategyFreq[s] || 0) + 1;
      });
      Object.keys(avgOutcomes).forEach(function (o) {
        if (c.proctorOutcomes[o]) avgOutcomes[o] += c.proctorOutcomes[o] / count;
      });
    });
    var topStrategies = Object.keys(strategyFreq).sort(function (a, b) {
      return strategyFreq[b] - strategyFreq[a];
    }).slice(0, 5);
    return {
      similarCases: similar.slice(0, 5),
      recommendedStrategies: topStrategies,
      strategyFrequency: strategyFreq,
      averageOutcomes: avgOutcomes,
      confidence: similar.length >= 3 ? 'high' : similar.length >= 1 ? 'moderate' : 'low',
      basedOn: similar.length + ' similar cases',
      note: 'Recommendations improve as more cases are contributed to the repository'
    };
  },
  // Get repository stats
  getStats: function () {
    var countries = {};
    var frameworks = {};
    var strategies = {};
    this.cases.forEach(function (c) {
      countries[c.country] = (countries[c.country] || 0) + 1;
      c.frameworks.forEach(function (f) {
        frameworks[f] = (frameworks[f] || 0) + 1;
      });
      c.strategies.forEach(function (s) {
        strategies[s] = (strategies[s] || 0) + 1;
      });
    });
    return {
      totalCases: this.cases.length,
      countries: countries,
      countryCount: Object.keys(countries).length,
      frameworkUsage: frameworks,
      strategyUsage: strategies
    };
  }
};
EvidenceRepository.init();
console.log('✅ MOUDAR v11.0: EvidenceRepository loaded — ' + EvidenceRepository.cases.length + ' seed cases from ' + EvidenceRepository.getStats().countryCount + ' countries');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE C3: API & SDK FOR ACADEMIC ECOSYSTEM
// REST API specification + R/Python/Stata package documentation
// Technical lock-in through workflow integration
// ═══════════════════════════════════════════════════════════════════════════

export default EvidenceRepository;
