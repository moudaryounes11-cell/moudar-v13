var BenchmarkingEngine = {
  VERSION: '9.0.0',
  anonymousPool: [{
    id: 'P001',
    domain: 'mental_health',
    region: 'SSA',
    income: 'LMIC',
    outcome: 'success',
    adoptionRate: 72,
    fidelityScore: 81,
    strategies: ['S19', 'S08', 'S04'],
    duration: 24
  }, {
    id: 'P002',
    domain: 'mental_health',
    region: 'MENA',
    income: 'UMIC',
    outcome: 'success',
    adoptionRate: 68,
    fidelityScore: 78,
    strategies: ['S01', 'S04', 'S10'],
    duration: 18
  }, {
    id: 'P003',
    domain: 'health',
    region: 'SEA',
    income: 'LMIC',
    outcome: 'partial',
    adoptionRate: 55,
    fidelityScore: 65,
    strategies: ['S01', 'S02'],
    duration: 12
  }, {
    id: 'P004',
    domain: 'education',
    region: 'LAC',
    income: 'UMIC',
    outcome: 'success',
    adoptionRate: 78,
    fidelityScore: 85,
    strategies: ['S04', 'S08', 'S03'],
    duration: 30
  }, {
    id: 'P005',
    domain: 'health',
    region: 'SSA',
    income: 'LIC',
    outcome: 'partial',
    adoptionRate: 45,
    fidelityScore: 58,
    strategies: ['S19', 'S01'],
    duration: 18
  }, {
    id: 'P006',
    domain: 'mental_health',
    region: 'EUR',
    income: 'HIC',
    outcome: 'success',
    adoptionRate: 82,
    fidelityScore: 88,
    strategies: ['S01', 'S02', 'S04', 'S10'],
    duration: 24
  }, {
    id: 'P007',
    domain: 'governance',
    region: 'MENA',
    income: 'UMIC',
    outcome: 'failed',
    adoptionRate: 32,
    fidelityScore: 45,
    strategies: ['S01'],
    duration: 12
  }, {
    id: 'P008',
    domain: 'health',
    region: 'SEA',
    income: 'LMIC',
    outcome: 'success',
    adoptionRate: 65,
    fidelityScore: 72,
    strategies: ['S19', 'S04', 'S08'],
    duration: 24
  }, {
    id: 'P009',
    domain: 'education',
    region: 'SSA',
    income: 'LIC',
    outcome: 'partial',
    adoptionRate: 48,
    fidelityScore: 62,
    strategies: ['S01', 'S03'],
    duration: 18
  }, {
    id: 'P010',
    domain: 'mental_health',
    region: 'LAC',
    income: 'UMIC',
    outcome: 'success',
    adoptionRate: 71,
    fidelityScore: 79,
    strategies: ['S19', 'S04', 'S10', 'S08'],
    duration: 30
  }, {
    id: 'P011',
    domain: 'health',
    region: 'EUR',
    income: 'HIC',
    outcome: 'success',
    adoptionRate: 85,
    fidelityScore: 91,
    strategies: ['S01', 'S02', 'S04', 'S09'],
    duration: 18
  }, {
    id: 'P012',
    domain: 'governance',
    region: 'SEA',
    income: 'LMIC',
    outcome: 'partial',
    adoptionRate: 52,
    fidelityScore: 68,
    strategies: ['S04', 'S03'],
    duration: 24
  }],
  calculateBenchmarks: function (filters) {
    var pool = this.anonymousPool;
    if (filters) {
      if (filters.domain) {
        pool = pool.filter(function (p) {
          return p.domain === filters.domain;
        });
      }
      if (filters.region) {
        pool = pool.filter(function (p) {
          return p.region === filters.region;
        });
      }
      if (filters.income) {
        pool = pool.filter(function (p) {
          return p.income === filters.income;
        });
      }
    }
    if (pool.length < 3) {
      return {
        error: 'Insufficient data for benchmarking (minimum 3 projects required)'
      };
    }
    var adoptionRates = pool.map(function (p) {
      return p.adoptionRate;
    }).sort(function (a, b) {
      return a - b;
    });
    var fidelityScores = pool.map(function (p) {
      return p.fidelityScore;
    }).sort(function (a, b) {
      return a - b;
    });
    var successCount = pool.filter(function (p) {
      return p.outcome === 'success';
    }).length;
    var strategyCount = {};
    pool.forEach(function (p) {
      p.strategies.forEach(function (s) {
        strategyCount[s] = (strategyCount[s] || 0) + 1;
      });
    });
    var topStrategies = Object.keys(strategyCount).sort(function (a, b) {
      return strategyCount[b] - strategyCount[a];
    }).slice(0, 5).map(function (s) {
      return {
        strategy: s,
        count: strategyCount[s],
        percentage: Math.round(strategyCount[s] / pool.length * 100)
      };
    });
    return {
      poolSize: pool.length,
      successRate: Math.round(successCount / pool.length * 100),
      avgAdoptionRate: Math.round(adoptionRates.reduce(function (a, b) {
        return a + b;
      }, 0) / adoptionRates.length),
      avgFidelityScore: Math.round(fidelityScores.reduce(function (a, b) {
        return a + b;
      }, 0) / fidelityScores.length),
      topStrategies: topStrategies,
      percentiles: {
        adoption: {
          p25: adoptionRates[Math.floor(adoptionRates.length * 0.25)],
          p50: adoptionRates[Math.floor(adoptionRates.length * 0.50)],
          p75: adoptionRates[Math.floor(adoptionRates.length * 0.75)]
        },
        fidelity: {
          p25: fidelityScores[Math.floor(fidelityScores.length * 0.25)],
          p50: fidelityScores[Math.floor(fidelityScores.length * 0.50)],
          p75: fidelityScores[Math.floor(fidelityScores.length * 0.75)]
        }
      }
    };
  },
  compareToPool: function (project) {
    var benchmarks = this.calculateBenchmarks({
      domain: project.domain
    });
    if (benchmarks.error) {
      benchmarks = this.calculateBenchmarks(null);
    }
    var projectAdoption = project.adoptionRate || project.predictedAdoption || 60;
    var projectFidelity = project.fidelityScore || project.predictedFidelity || 70;
    var adoptionVsAvg = projectAdoption - benchmarks.avgAdoptionRate;
    var fidelityVsAvg = projectFidelity - benchmarks.avgFidelityScore;

    // Calculate percentile rank
    var pool = this.anonymousPool;
    var belowCount = pool.filter(function (p) {
      return p.adoptionRate < projectAdoption;
    }).length;
    var percentileRank = Math.round(belowCount / pool.length * 100);
    var category = 'Average';
    if (percentileRank >= 75) category = 'Excellence';else if (percentileRank >= 50) category = 'Above Average';else if (percentileRank >= 25) category = 'Below Average';else category = 'Needs Improvement';

    // Generate insights
    var insights = [];
    if (adoptionVsAvg < -10) {
      insights.push({
        type: 'performance_gap',
        priority: 'high',
        message: {
          fr: 'Taux d\'adoption inférieur de ' + Math.abs(adoptionVsAvg) + '% à la moyenne du pool',
          en: 'Adoption rate ' + Math.abs(adoptionVsAvg) + '% below pool average'
        }
      });
    }
    var projectStrategies = project.strategies || [];
    benchmarks.topStrategies.forEach(function (ts) {
      if (ts.percentage > 70 && projectStrategies.indexOf(ts.strategy) === -1) {
        insights.push({
          type: 'strategy_gap',
          priority: 'medium',
          message: {
            fr: 'Stratégie ' + ts.strategy + ' utilisée par ' + ts.percentage + '% des projets à succès mais absente de votre projet',
            en: 'Strategy ' + ts.strategy + ' used by ' + ts.percentage + '% of successful projects but missing from yours'
          }
        });
      }
    });
    return {
      vsAverage: {
        adoption: (adoptionVsAvg >= 0 ? '+' : '') + adoptionVsAvg + '%',
        fidelity: (fidelityVsAvg >= 0 ? '+' : '') + fidelityVsAvg + '%'
      },
      percentileRank: percentileRank,
      category: category,
      insights: insights,
      benchmarks: benchmarks
    };
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// MODULE 5: DIGITAL TWIN MODULE (DTM) v9.0
// Modélisation organisationnelle pour prédiction de précision chirurgicale
// ═══════════════════════════════════════════════════════════════════════════

export default BenchmarkingEngine;
