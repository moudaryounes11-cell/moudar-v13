var TheoryOfChangeEngine = function () {
  'use strict';

  // Structure du modèle logique
  var tocTemplate = {
    inputs: [],
    activities: [],
    outputs: [],
    outcomes: {
      shortTerm: [],
      mediumTerm: [],
      longTerm: []
    },
    assumptions: [],
    links: []
  };

  // Bibliothèque de composants pré-définis par domaine
  var componentLibrary = {
    "mentalHealth": {
      inputs: [{
        id: "I01",
        label: {
          fr: "Formation mhGAP",
          en: "mhGAP training"
        },
        icon: "📚"
      }, {
        id: "I02",
        label: {
          fr: "Champions locaux",
          en: "Local champions"
        },
        icon: "🌟"
      }, {
        id: "I03",
        label: {
          fr: "Budget alloué",
          en: "Allocated budget"
        },
        icon: "💰"
      }, {
        id: "I04",
        label: {
          fr: "Outils de dépistage",
          en: "Screening tools"
        },
        icon: "📋"
      }],
      activities: [{
        id: "A01",
        label: {
          fr: "Sessions de formation",
          en: "Training sessions"
        },
        icon: "🎓",
        linkedInputs: ["I01", "I02"]
      }, {
        id: "A02",
        label: {
          fr: "Supervision clinique",
          en: "Clinical supervision"
        },
        icon: "👁️",
        linkedInputs: ["I02"]
      }, {
        id: "A03",
        label: {
          fr: "Sensibilisation communautaire",
          en: "Community awareness"
        },
        icon: "📢",
        linkedInputs: ["I03"]
      }, {
        id: "A04",
        label: {
          fr: "Intégration protocoles",
          en: "Protocol integration"
        },
        icon: "📑",
        linkedInputs: ["I04"]
      }],
      outputs: [{
        id: "O01",
        label: {
          fr: "X professionnels formés",
          en: "X professionals trained"
        },
        icon: "✅",
        linkedActivities: ["A01"]
      }, {
        id: "O02",
        label: {
          fr: "Protocoles en place",
          en: "Protocols in place"
        },
        icon: "📄",
        linkedActivities: ["A04"]
      }, {
        id: "O03",
        label: {
          fr: "X patients dépistés",
          en: "X patients screened"
        },
        icon: "🔍",
        linkedActivities: ["A02", "A04"]
      }],
      shortTermOutcomes: [{
        id: "ST01",
        label: {
          fr: "↑ Connaissances personnel",
          en: "↑ Staff knowledge"
        },
        linkedOutputs: ["O01"]
      }, {
        id: "ST02",
        label: {
          fr: "↑ Confiance dépistage",
          en: "↑ Screening confidence"
        },
        linkedOutputs: ["O01", "O02"]
      }],
      mediumTermOutcomes: [{
        id: "MT01",
        label: {
          fr: "↑ Taux détection",
          en: "↑ Detection rate"
        },
        linkedShortTerm: ["ST01", "ST02"]
      }, {
        id: "MT02",
        label: {
          fr: "↓ Délai prise en charge",
          en: "↓ Time to treatment"
        },
        linkedShortTerm: ["ST02"]
      }],
      longTermOutcomes: [{
        id: "LT01",
        label: {
          fr: "↓ Charge morbidité",
          en: "↓ Morbidity burden"
        },
        linkedMediumTerm: ["MT01", "MT02"]
      }, {
        id: "LT02",
        label: {
          fr: "↓ Stigmatisation",
          en: "↓ Stigmatization"
        },
        linkedMediumTerm: ["MT01"]
      }]
    },
    "education": {
      inputs: [{
        id: "I01",
        label: {
          fr: "Curriculum révisé",
          en: "Revised curriculum"
        },
        icon: "📖"
      }, {
        id: "I02",
        label: {
          fr: "Formateurs certifiés",
          en: "Certified trainers"
        },
        icon: "🎓"
      }, {
        id: "I03",
        label: {
          fr: "Ressources pédagogiques",
          en: "Teaching resources"
        },
        icon: "📚"
      }],
      activities: [{
        id: "A01",
        label: {
          fr: "Formation des enseignants",
          en: "Teacher training"
        },
        icon: "👨‍🏫",
        linkedInputs: ["I01", "I02"]
      }, {
        id: "A02",
        label: {
          fr: "Déploiement curriculum",
          en: "Curriculum deployment"
        },
        icon: "🚀",
        linkedInputs: ["I01", "I03"]
      }],
      outputs: [{
        id: "O01",
        label: {
          fr: "X enseignants formés",
          en: "X teachers trained"
        },
        icon: "✅",
        linkedActivities: ["A01"]
      }, {
        id: "O02",
        label: {
          fr: "X écoles équipées",
          en: "X schools equipped"
        },
        icon: "🏫",
        linkedActivities: ["A02"]
      }],
      shortTermOutcomes: [{
        id: "ST01",
        label: {
          fr: "↑ Qualité enseignement",
          en: "↑ Teaching quality"
        },
        linkedOutputs: ["O01"]
      }],
      mediumTermOutcomes: [{
        id: "MT01",
        label: {
          fr: "↑ Résultats scolaires",
          en: "↑ Academic results"
        },
        linkedShortTerm: ["ST01"]
      }],
      longTermOutcomes: [{
        id: "LT01",
        label: {
          fr: "↑ Capital humain",
          en: "↑ Human capital"
        },
        linkedMediumTerm: ["MT01"]
      }]
    }
  };

  /**
   * Génère une Theory of Change complète pour un projet
   */
  function generateToC(project, lang) {
    lang = lang || 'fr';
    var domain = project.domain || "mentalHealth";
    var template = componentLibrary[domain] || componentLibrary["mentalHealth"];

    // Adapter les composants au projet
    var toc = {
      projectId: project.id,
      projectTitle: project.title,
      domain: domain,
      generatedAt: new Date().toISOString(),
      inputs: template.inputs.map(function (i) {
        return Object.assign({}, i, {
          label: i.label[lang] || i.label.fr,
          status: "planned",
          linked: true
        });
      }),
      activities: template.activities.map(function (a) {
        return Object.assign({}, a, {
          label: a.label[lang] || a.label.fr,
          status: "planned",
          linked: true
        });
      }),
      outputs: template.outputs.map(function (o) {
        return Object.assign({}, o, {
          label: o.label[lang] || o.label.fr,
          status: "pending",
          linked: true
        });
      }),
      outcomes: {
        shortTerm: (template.shortTermOutcomes || []).map(function (st) {
          return Object.assign({}, st, {
            label: st.label[lang] || st.label.fr,
            linked: true
          });
        }),
        mediumTerm: (template.mediumTermOutcomes || []).map(function (mt) {
          return Object.assign({}, mt, {
            label: mt.label[lang] || mt.label.fr,
            linked: true
          });
        }),
        longTerm: (template.longTermOutcomes || []).map(function (lt) {
          return Object.assign({}, lt, {
            label: lt.label[lang] || lt.label.fr,
            linked: true
          });
        })
      },
      assumptions: generateAssumptions(project, lang),
      risks: identifyRisks(project, lang)
    };

    // Générer les liens visuels
    toc.links = generateLinks(toc);
    return toc;
  }

  /**
   * Génère les hypothèses critiques
   */
  function generateAssumptions(project, lang) {
    var assumptions = [];
    var barriers = project.barriers || [];
    if (barriers.indexOf("staff_resistance") !== -1 || barriers.indexOf("staff_turnover") !== -1) {
      assumptions.push({
        id: "ASS01",
        text: lang === 'fr' ? "Le personnel reste motivé et stable" : "Staff remains motivated and stable",
        risk: "high"
      });
    }
    if (barriers.indexOf("funding") !== -1) {
      assumptions.push({
        id: "ASS02",
        text: lang === 'fr' ? "Le financement reste disponible" : "Funding remains available",
        risk: "high"
      });
    }
    if (barriers.indexOf("leadership_support") !== -1) {
      assumptions.push({
        id: "ASS03",
        text: lang === 'fr' ? "La direction continue à soutenir le projet" : "Leadership continues to support the project",
        risk: "medium"
      });
    }

    // Hypothèses par défaut
    assumptions.push({
      id: "ASS99",
      text: lang === 'fr' ? "Le contexte politique reste stable" : "Political context remains stable",
      risk: "low"
    });
    return assumptions;
  }

  /**
   * Identifie les risques majeurs
   */
  function identifyRisks(project, lang) {
    var risks = [];
    var analysis = SensitivityAnalyzer.runTornadoAnalysis(project, lang);
    if (analysis.criticalBarriers) {
      analysis.criticalBarriers.forEach(function (barrier) {
        risks.push({
          id: "RISK_" + barrier.barrierId,
          barrierSource: barrier.barrierId,
          description: barrier.barrierName,
          impact: barrier.percentageGain,
          mitigation: barrier.recommendation,
          level: barrier.priority
        });
      });
    }
    return risks;
  }

  /**
   * Génère les liens entre composants pour visualisation
   */
  function generateLinks(toc) {
    var links = [];

    // Inputs → Activities
    toc.activities.forEach(function (activity) {
      (activity.linkedInputs || []).forEach(function (inputId) {
        links.push({
          from: inputId,
          to: activity.id,
          type: "input-activity",
          status: activity.linked && toc.inputs.find(function (i) {
            return i.id === inputId && i.linked;
          }) ? "active" : "broken"
        });
      });
    });

    // Activities → Outputs
    toc.outputs.forEach(function (output) {
      (output.linkedActivities || []).forEach(function (activityId) {
        links.push({
          from: activityId,
          to: output.id,
          type: "activity-output",
          status: output.linked ? "active" : "broken"
        });
      });
    });
    return links;
  }

  /**
   * Simule le retrait d'un composant et montre les liens brisés
   */
  function simulateRemoval(toc, componentId) {
    var updatedToc = JSON.parse(JSON.stringify(toc));
    var brokenLinks = [];

    // Trouver et désactiver le composant
    ['inputs', 'activities', 'outputs'].forEach(function (section) {
      updatedToc[section].forEach(function (item) {
        if (item.id === componentId) {
          item.linked = false;
          item.status = "removed";
        }
      });
    });

    // Identifier les liens brisés
    updatedToc.links.forEach(function (link) {
      if (link.from === componentId || link.to === componentId) {
        link.status = "broken";
        brokenLinks.push(link);
      }
    });
    return {
      toc: updatedToc,
      brokenLinks: brokenLinks,
      impactedComponents: brokenLinks.map(function (l) {
        return l.to;
      })
    };
  }
  return {
    VERSION: '8.3.0',
    generateToC: generateToC,
    simulateRemoval: simulateRemoval,
    getComponentLibrary: function () {
      return componentLibrary;
    }
  };
}();

export default TheoryOfChangeEngine;
