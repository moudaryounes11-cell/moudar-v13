var DigitalTwinModule = {
  VERSION: '9.0.0',
  constraintTypes: {
    MAX_TRAINEES_PER_MONTH: {
      id: 'maxTraineesPerMonth',
      label: {
        fr: 'Max formés/mois',
        en: 'Max trainees/month'
      },
      default: 20,
      unit: 'persons'
    },
    MAX_SIMULTANEOUS_SITES: {
      id: 'maxSimultaneousSites',
      label: {
        fr: 'Max sites simultanés',
        en: 'Max simultaneous sites'
      },
      default: 3,
      unit: 'sites'
    },
    LEADERSHIP_BANDWIDTH: {
      id: 'leadershipBandwidth',
      label: {
        fr: 'Disponibilité leadership',
        en: 'Leadership bandwidth'
      },
      default: 0.5,
      unit: 'ratio'
    },
    TECH_READINESS: {
      id: 'techReadiness',
      label: {
        fr: 'Maturité technologique',
        en: 'Tech readiness'
      },
      default: 0.6,
      unit: 'ratio'
    },
    BUDGET_FLEXIBILITY: {
      id: 'budgetFlexibility',
      label: {
        fr: 'Flexibilité budgétaire',
        en: 'Budget flexibility'
      },
      default: 0.3,
      unit: 'ratio'
    },
    STAFF_AVAILABILITY: {
      id: 'staffAvailability',
      label: {
        fr: 'Disponibilité du personnel',
        en: 'Staff availability'
      },
      default: 0.7,
      unit: 'ratio'
    },
    SUSTAINMENT_RISK: {
      id: 'sustainmentRisk',
      label: {
        fr: 'Risque de pérennité',
        en: 'Sustainment risk'
      },
      default: 0.4,
      unit: 'ratio'
    }
  },
  createDigitalTwin: function (orgData) {
    var twin = {
      id: 'DT_' + Date.now(),
      name: orgData.name || 'Organization',
      createdAt: new Date().toISOString(),
      structure: {
        totalStaff: orgData.totalStaff || 100,
        departments: orgData.departments || 5,
        sites: orgData.sites || 1,
        hierarchyLevels: orgData.hierarchyLevels || 4
      },
      resources: {
        annualBudget: orgData.annualBudget || 500000,
        implementationBudget: orgData.implementationBudget || 100000,
        dedicatedFTE: orgData.dedicatedFTE || 2
      },
      culture: {
        changeReadiness: orgData.changeReadiness || 0.5,
        innovationHistory: orgData.innovationHistory || 0.5,
        leadershipSupport: orgData.leadershipSupport || 0.6
      },
      constraints: {
        maxTraineesPerMonth: orgData.maxTraineesPerMonth || 20,
        maxSimultaneousSites: orgData.maxSimultaneousSites || 3,
        leadershipBandwidth: orgData.leadershipBandwidth || 0.5,
        techReadiness: orgData.techReadiness || 0.6,
        budgetFlexibility: orgData.budgetFlexibility || 0.3,
        staffAvailability: orgData.staffAvailability || 0.7,
        sustainmentRisk: orgData.sustainmentRisk || 0.4
      }
    };
    twin.maturityScore = this.calculateMaturityScore(twin);
    return twin;
  },
  calculateMaturityScore: function (twin) {
    var score = 0;

    // Structure score (25 points)
    if (twin.structure.totalStaff > 50) score += 10;
    if (twin.structure.departments >= 3) score += 8;
    if (twin.structure.sites >= 2) score += 7;

    // Resources score (25 points)
    if (twin.resources.implementationBudget > 50000) score += 10;
    if (twin.resources.dedicatedFTE >= 2) score += 8;
    if (twin.resources.annualBudget > 200000) score += 7;

    // Culture score (25 points)
    score += Math.round(twin.culture.changeReadiness * 10);
    score += Math.round(twin.culture.innovationHistory * 8);
    score += Math.round(twin.culture.leadershipSupport * 7);

    // Constraints score (25 points - inverse of risk)
    score += Math.round((1 - twin.constraints.sustainmentRisk) * 10);
    score += Math.round(twin.constraints.techReadiness * 8);
    score += Math.round(twin.constraints.staffAvailability * 7);
    return Math.min(100, Math.max(0, score));
  },
  runConstrainedMonteCarlo: function (project, strategies, digitalTwin, iterations) {
    iterations = iterations || 5000;
    var self = this;
    var results = [];
    var constraints = digitalTwin.constraints;
    for (var i = 0; i < iterations; i++) {
      // Base success probability from project
      var baseSuccess = project.predictedSuccess || 0.65;

      // Apply constraint adjustments
      if (constraints.budgetFlexibility < 0.2) {
        baseSuccess *= 0.85;
      }
      if (constraints.leadershipBandwidth < 0.3) {
        baseSuccess *= 0.8;
      }
      if (constraints.techReadiness < 0.5 && strategies.some(function (s) {
        return ['S13', 'S05'].indexOf(s) !== -1;
      })) {
        baseSuccess *= 0.75;
      }
      if (constraints.staffAvailability < 0.5) {
        baseSuccess *= 0.85;
      }
      if (constraints.sustainmentRisk > 0.7) {
        baseSuccess *= 0.80;
      }

      // Add culture bonus
      baseSuccess *= 0.9 + digitalTwin.culture.changeReadiness * 0.2;
      baseSuccess *= 0.95 + digitalTwin.culture.leadershipSupport * 0.1;

      // Add random variance
      var variance = (Math.random() - 0.5) * 0.2;
      var finalSuccess = Math.max(0, Math.min(1, baseSuccess + variance));

      // Calculate adoption rate with constraints
      var baseAdoption = 70;
      var traineeConstraint = constraints.maxTraineesPerMonth / 20;
      var siteConstraint = constraints.maxSimultaneousSites / 3;
      var adoptionRate = baseAdoption * traineeConstraint * siteConstraint * (0.9 + Math.random() * 0.2);
      results.push({
        success: finalSuccess > 0.5,
        successProbability: finalSuccess,
        adoptionRate: Math.round(adoptionRate)
      });
    }
    var successCount = results.filter(function (r) {
      return r.success;
    }).length;
    var adoptionRates = results.map(function (r) {
      return r.adoptionRate;
    }).sort(function (a, b) {
      return a - b;
    });
    var mean = adoptionRates.reduce(function (a, b) {
      return a + b;
    }, 0) / adoptionRates.length;
    var variance = adoptionRates.reduce(function (a, b) {
      return a + Math.pow(b - mean, 2);
    }, 0) / adoptionRates.length;
    var stdDev = Math.sqrt(variance);

    // Identify risk factors
    var riskFactors = [];
    if (constraints.budgetFlexibility < 0.2) {
      riskFactors.push({
        factor: 'budgetFlexibility',
        severity: 'high',
        message: {
          fr: 'Flexibilité budgétaire très faible',
          en: 'Very low budget flexibility'
        }
      });
    }
    if (constraints.leadershipBandwidth < 0.3) {
      riskFactors.push({
        factor: 'leadershipBandwidth',
        severity: 'high',
        message: {
          fr: 'Disponibilité leadership insuffisante',
          en: 'Insufficient leadership bandwidth'
        }
      });
    }
    if (constraints.sustainmentRisk > 0.6) {
      riskFactors.push({
        factor: 'sustainmentRisk',
        severity: 'medium',
        message: {
          fr: 'Risque de pérennité élevé',
          en: 'High sustainment risk'
        }
      });
    }
    if (constraints.techReadiness < 0.4) {
      riskFactors.push({
        factor: 'techReadiness',
        severity: 'medium',
        message: {
          fr: 'Maturité technologique faible',
          en: 'Low tech readiness'
        }
      });
    }
    return {
      iterations: iterations,
      successProbability: Math.round(successCount / iterations * 100),
      adoption: {
        mean: Math.round(mean),
        median: adoptionRates[Math.floor(adoptionRates.length / 2)],
        stdDev: Math.round(stdDev * 10) / 10,
        p10: adoptionRates[Math.floor(adoptionRates.length * 0.1)],
        p25: adoptionRates[Math.floor(adoptionRates.length * 0.25)],
        p75: adoptionRates[Math.floor(adoptionRates.length * 0.75)],
        p90: adoptionRates[Math.floor(adoptionRates.length * 0.9)]
      },
      riskFactors: riskFactors,
      maturityScore: digitalTwin.maturityScore,
      simulatedAt: new Date().toISOString()
    };
  }
};

// Configuration Supabase (auth + stockage cloud)
// Remplacez les valeurs ci-dessous par celles de votre projet Supabase
export default DigitalTwinModule;
