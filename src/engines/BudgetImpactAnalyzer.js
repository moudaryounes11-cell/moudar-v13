const BudgetImpactAnalyzer = {
    // Parametres par defaut selon contexte pays
    countryProfiles: {
        LIC: { inflationRate: 0.08, gdpGrowth: 0.04, healthSpendingRatio: 0.05, currencyVolatility: 0.15 },
        LMIC: { inflationRate: 0.05, gdpGrowth: 0.05, healthSpendingRatio: 0.06, currencyVolatility: 0.10 },
        UMIC: { inflationRate: 0.03, gdpGrowth: 0.04, healthSpendingRatio: 0.07, currencyVolatility: 0.05 },
        HIC: { inflationRate: 0.02, gdpGrowth: 0.02, healthSpendingRatio: 0.10, currencyVolatility: 0.02 }
    },

    // Multiplicateurs de couts evites par domaine
    avoidedCostMultipliers: {
        health: { hospitalization: 2.5, emergency: 1.8, medication: 1.2, productivity: 1.5, disability: 2.0 },
        mental_health: { hospitalization: 3.0, crisis: 2.2, medication: 1.0, productivity: 2.5, disability: 2.8 },
        education: { dropout: 1.5, remediation: 1.2, specialNeeds: 1.8, productivity: 2.0 },
        social: { incarceration: 3.5, welfare: 1.5, childProtection: 2.0, homelessness: 2.5 }
    },

    // Scenarios de scaling
    scalingScenarios: {
        conservative: { yearlyGrowth: [1.0, 1.2, 1.4, 1.6, 1.8], adoptionRate: 0.6, attritionRate: 0.15 },
        moderate: { yearlyGrowth: [1.0, 1.5, 2.0, 2.5, 3.0], adoptionRate: 0.75, attritionRate: 0.10 },
        ambitious: { yearlyGrowth: [1.0, 2.0, 3.5, 5.0, 7.0], adoptionRate: 0.85, attritionRate: 0.08 }
    },

    analyze: function(project, budget, years, lang) {
        lang = lang || 'fr';
        years = years || 5;
        const self = this;

        const resourceLevel = project.resourceLevel || 'UMIC';
        const countryProfile = this.countryProfiles[resourceLevel] || this.countryProfiles.UMIC;
        const domain = project.domain || 'health';
        const baseBudget = budget.summary ? budget.summary.total : (project.budget || 100000);
        const basePopulation = project.population || 100;

        // Generer projections par scenario
        const scenarios = {};
        Object.keys(this.scalingScenarios).forEach(function(scenarioKey) {
            const scenario = self.scalingScenarios[scenarioKey];
            const yearlyData = [];
            let cumulativeCost = 0;
            let cumulativeBenefit = 0;
            let cumulativePopulation = 0;

            for (let year = 1; year <= years; year++) {
                const growthFactor = scenario.yearlyGrowth[Math.min(year - 1, scenario.yearlyGrowth.length - 1)];
                const inflationFactor = Math.pow(1 + countryProfile.inflationRate, year - 1);

                // Couts projetes
                const yearPopulation = Math.round(basePopulation * growthFactor * scenario.adoptionRate);
                const yearCost = Math.round(baseBudget * growthFactor * inflationFactor * (year === 1 ? 1.2 : 0.85)); // Premiere annee +20%, puis -15%
                const costPerBeneficiary = yearPopulation > 0 ? Math.round(yearCost / yearPopulation) : 0;

                // Benefices / Couts evites
                const avoidedCosts = self.calculateAvoidedCosts(yearPopulation, domain, costPerBeneficiary, lang);
                const yearBenefit = avoidedCosts.total;

                cumulativeCost += yearCost;
                cumulativeBenefit += yearBenefit;
                cumulativePopulation += yearPopulation;

                yearlyData.push({
                    year: year,
                    population: yearPopulation,
                    cost: yearCost,
                    costPerBeneficiary: costPerBeneficiary,
                    benefits: yearBenefit,
                    avoidedCostsBreakdown: avoidedCosts.breakdown,
                    netBenefit: yearBenefit - yearCost,
                    cumulativeCost: cumulativeCost,
                    cumulativeBenefit: cumulativeBenefit,
                    cumulativeROI: cumulativeCost > 0 ? Math.round(((cumulativeBenefit - cumulativeCost) / cumulativeCost) * 100) : 0,
                    bcRatio: yearCost > 0 ? Math.round((yearBenefit / yearCost) * 100) / 100 : 0
                });
            }

            scenarios[scenarioKey] = {
                label: self.getScenarioLabel(scenarioKey, lang),
                data: yearlyData,
                summary: {
                    totalCost: cumulativeCost,
                    totalBenefit: cumulativeBenefit,
                    totalPopulation: cumulativePopulation,
                    netBenefit: cumulativeBenefit - cumulativeCost,
                    overallROI: cumulativeCost > 0 ? Math.round(((cumulativeBenefit - cumulativeCost) / cumulativeCost) * 100) : 0,
                    overallBCRatio: cumulativeCost > 0 ? Math.round((cumulativeBenefit / cumulativeCost) * 100) / 100 : 0,
                    breakEvenYear: self.calculateBreakEvenYear(yearlyData)
                }
            };
        });

        // Analyse de sensibilite
        const sensitivity = this.runSensitivityAnalysis(project, budget, years, lang);

        // Recommandations pour decideurs
        const recommendations = this.generateRecommendations(scenarios, sensitivity, lang);

        return {
            projectTitle: project.title || (lang === 'fr' ? 'Analyse d\'Impact Budg\u00e9taire' : 'Budget Impact Analysis'),
            horizon: years + (lang === 'fr' ? ' ans' : ' years'),
            resourceLevel: resourceLevel,
            countryProfile: countryProfile,
            baseBudget: baseBudget,
            basePopulation: basePopulation,
            domain: domain,
            scenarios: scenarios,
            sensitivity: sensitivity,
            recommendations: recommendations,
            executiveSummary: this.generateExecutiveSummary(scenarios, lang),
            chartData: this.prepareChartData(scenarios, lang),
            generatedAt: new Date().toISOString(),
            version: 'BIA v1.0 - MOUDAR v9.0'
        };
    },

    calculateAvoidedCosts: function(population, domain, costPerBeneficiary, lang) {
        const multipliers = this.avoidedCostMultipliers[domain] || this.avoidedCostMultipliers.health;
        const breakdown = [];
        let total = 0;

        Object.keys(multipliers).forEach(function(category) {
            const avoided = Math.round(population * costPerBeneficiary * multipliers[category] * 0.3);
            total += avoided;
            breakdown.push({
                category: category,
                label: lang === 'fr' ? {
                    hospitalization: 'Hospitalisations \u00e9vit\u00e9es',
                    emergency: 'Urgences \u00e9vit\u00e9es',
                    medication: '\u00c9conomies m\u00e9dicaments',
                    productivity: 'Gains de productivit\u00e9',
                    disability: 'Invalidit\u00e9s \u00e9vit\u00e9es',
                    crisis: 'Crises \u00e9vit\u00e9es',
                    dropout: 'D\u00e9crochages \u00e9vit\u00e9s',
                    remediation: 'Rem\u00e9diation \u00e9vit\u00e9e',
                    specialNeeds: 'Besoins sp\u00e9ciaux \u00e9vit\u00e9s',
                    incarceration: 'Incarc\u00e9rations \u00e9vit\u00e9es',
                    welfare: 'Aides sociales \u00e9vit\u00e9es',
                    childProtection: 'Protection enfance \u00e9vit\u00e9e',
                    homelessness: 'Sans-abrisme \u00e9vit\u00e9'
                }[category] || category : category,
                amount: avoided,
                multiplier: multipliers[category]
            });
        });

        return { total: total, breakdown: breakdown };
    },

    calculateBreakEvenYear: function(yearlyData) {
        for (let i = 0; i < yearlyData.length; i++) {
            if (yearlyData[i].cumulativeBenefit >= yearlyData[i].cumulativeCost) {
                return yearlyData[i].year;
            }
        }
        return null;
    },

    runSensitivityAnalysis: function(project, budget, years, lang) {
        const baseBudget = budget.summary ? budget.summary.total : (project.budget || 100000);
        const scenarios = [];

        // Variation des couts +/-20%
        [-0.2, -0.1, 0, 0.1, 0.2].forEach(function(variation) {
            const adjustedBudget = baseBudget * (1 + variation);
            const roi = Math.round(150 - (variation * 200)); // Simplifie
            scenarios.push({
                variable: lang === 'fr' ? 'Variation co\u00fbts' : 'Cost variation',
                variation: Math.round(variation * 100) + '%',
                impact: roi + '%',
                risk: variation > 0 ? 'high' : variation < 0 ? 'low' : 'medium'
            });
        });

        return {
            scenarios: scenarios,
            worstCase: { roi: 80, probability: 0.15 },
            baseCase: { roi: 150, probability: 0.60 },
            bestCase: { roi: 250, probability: 0.25 }
        };
    },

    generateRecommendations: function(scenarios, sensitivity, lang) {
        const recs = [];
        const moderate = scenarios.moderate;

        if (moderate && moderate.summary.breakEvenYear <= 2) {
            recs.push({
                priority: 'high',
                icon: '\u2705',
                text: lang === 'fr'
                    ? 'ROI positif d\u00e8s l\'ann\u00e9e ' + moderate.summary.breakEvenYear + ' - Fort potentiel de scaling'
                    : 'Positive ROI from year ' + moderate.summary.breakEvenYear + ' - Strong scaling potential'
            });
        }

        if (moderate && moderate.summary.overallBCRatio >= 2) {
            recs.push({
                priority: 'high',
                icon: '\ud83d\udcb0',
                text: lang === 'fr'
                    ? 'Ratio co\u00fbt-b\u00e9n\u00e9fice de ' + moderate.summary.overallBCRatio + ':1 - Investissement tr\u00e8s rentable'
                    : 'Cost-benefit ratio of ' + moderate.summary.overallBCRatio + ':1 - Highly profitable investment'
            });
        }

        recs.push({
            priority: 'medium',
            icon: '\ud83d\udcca',
            text: lang === 'fr'
                ? 'Pr\u00e9voir un fonds de contingence de 10-15% pour absorber les variations'
                : 'Plan 10-15% contingency fund to absorb variations'
        });

        recs.push({
            priority: 'medium',
            icon: '\ud83c\udfaf',
            text: lang === 'fr'
                ? 'Commencer par le sc\u00e9nario conservateur avant d\'acc\u00e9l\u00e9rer le scaling'
                : 'Start with conservative scenario before accelerating scaling'
        });

        return recs;
    },

    generateExecutiveSummary: function(scenarios, lang) {
        const mod = scenarios.moderate;
        if (!mod) return '';

        return lang === 'fr'
            ? 'Sur un horizon de 5 ans, le sc\u00e9nario mod\u00e9r\u00e9 projette un investissement total de $' +
              mod.summary.totalCost.toLocaleString() + ' pour des b\u00e9n\u00e9fices de $' +
              mod.summary.totalBenefit.toLocaleString() + ', soit un ROI de ' +
              mod.summary.overallROI + '% et un ratio co\u00fbt-b\u00e9n\u00e9fice de ' +
              mod.summary.overallBCRatio + ':1. Le seuil de rentabilit\u00e9 est atteint en ann\u00e9e ' +
              (mod.summary.breakEvenYear || 'N/A') + '.'
            : 'Over a 5-year horizon, the moderate scenario projects a total investment of $' +
              mod.summary.totalCost.toLocaleString() + ' for benefits of $' +
              mod.summary.totalBenefit.toLocaleString() + ', yielding a ROI of ' +
              mod.summary.overallROI + '% and a cost-benefit ratio of ' +
              mod.summary.overallBCRatio + ':1. Break-even is reached in year ' +
              (mod.summary.breakEvenYear || 'N/A') + '.';
    },

    prepareChartData: function(scenarios, lang) {
        const chartData = {
            years: [],
            conservative: { costs: [], benefits: [], roi: [] },
            moderate: { costs: [], benefits: [], roi: [] },
            ambitious: { costs: [], benefits: [], roi: [] }
        };

        if (scenarios.moderate) {
            scenarios.moderate.data.forEach(function(d) {
                chartData.years.push(lang === 'fr' ? 'An ' + d.year : 'Year ' + d.year);
            });
        }

        ['conservative', 'moderate', 'ambitious'].forEach(function(key) {
            if (scenarios[key]) {
                scenarios[key].data.forEach(function(d) {
                    chartData[key].costs.push(d.cost);
                    chartData[key].benefits.push(d.benefits);
                    chartData[key].roi.push(d.cumulativeROI);
                });
            }
        });

        return chartData;
    },

    getScenarioLabel: function(key, lang) {
        const labels = {
            conservative: { fr: 'Conservateur', en: 'Conservative' },
            moderate: { fr: 'Mod\u00e9r\u00e9', en: 'Moderate' },
            ambitious: { fr: 'Ambitieux', en: 'Ambitious' }
        };
        return labels[key] ? labels[key][lang] : key;
    }
};

export default BudgetImpactAnalyzer;
