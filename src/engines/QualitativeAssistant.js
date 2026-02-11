var QualitativeAssistant = {
  VERSION: '11.0.0',
  citation: 'Reardon CM et al. (2025). CFIR Coding Guidelines. Implementation Science, 20:39',
  hamiltonCitation: 'Hamilton AB. (2013). Qualitative Methods in Rapid Turn-Around Health Services Research. VA HSR&D.',
  // CFIR coding scheme (deductive codes)
  codingScheme: {
    innovation: {
      domain: {
        fr: 'Innovation',
        en: 'Innovation'
      },
      color: '#3b82f6',
      codes: ['IC1', 'IC2', 'IC3', 'IC4', 'IC5', 'IC6', 'IC7', 'IC8']
    },
    outerSetting: {
      domain: {
        fr: 'Cadre externe',
        en: 'Outer Setting'
      },
      color: '#059669',
      codes: ['OS1', 'OS2', 'OS3', 'OS4', 'OS5', 'OS6']
    },
    innerSetting: {
      domain: {
        fr: 'Cadre interne',
        en: 'Inner Setting'
      },
      color: '#7c3aed',
      codes: ['IS1', 'IS2', 'IS3', 'IS4', 'IS5', 'IS6', 'IS7', 'IS8', 'IS9', 'IS10', 'IS11', 'IS12', 'IS13', 'IS14']
    },
    individuals: {
      domain: {
        fr: 'Individus',
        en: 'Individuals'
      },
      color: '#d97706',
      codes: ['IN1', 'IN2', 'IN3', 'IN4', 'IN5']
    },
    process: {
      domain: {
        fr: 'Processus',
        en: 'Process'
      },
      color: '#dc2626',
      codes: ['PR1', 'PR2', 'PR3', 'PR4', 'PR5', 'PR6']
    }
  },
  // Rating scale from CFIR User Guide
  ratingScale: {
    '+2': {
      label: {
        fr: 'Facilite fortement',
        en: 'Strongly facilitates'
      },
      color: '#059669'
    },
    '+1': {
      label: {
        fr: 'Facilite faiblement',
        en: 'Weakly facilitates'
      },
      color: '#34d399'
    },
    '0': {
      label: {
        fr: 'Neutre/Mixte',
        en: 'Neutral/Mixed'
      },
      color: '#9ca3af'
    },
    '-1': {
      label: {
        fr: 'Barrière faible',
        en: 'Weak barrier'
      },
      color: '#fb923c'
    },
    '-2': {
      label: {
        fr: 'Barrière forte',
        en: 'Strong barrier'
      },
      color: '#dc2626'
    },
    'X': {
      label: {
        fr: 'Non applicable/Données insuffisantes',
        en: 'Not applicable/Insufficient data'
      },
      color: '#6b7280'
    }
  },
  // Keyword patterns for auto-coding (keyword matching, not NLP/ML)
  patterns: {
    IC1: {
      keywords: ['developed', 'created', 'origin', 'source', 'external', 'internal', 'développé', 'créé', 'origine', 'source']
    },
    IC2: {
      keywords: ['evidence', 'proof', 'study', 'research', 'data', 'preuve', 'étude', 'recherche', 'données']
    },
    IC3: {
      keywords: ['advantage', 'better', 'superior', 'compared to', 'avantage', 'meilleur', 'supérieur', 'comparé']
    },
    IC4: {
      keywords: ['adapt', 'modify', 'tailor', 'flexible', 'customize', 'adapter', 'modifier', 'personnaliser', 'flexible']
    },
    IC6: {
      keywords: ['complex', 'difficult', 'complicated', 'hard', 'challenging', 'complexe', 'difficile', 'compliqué']
    },
    IS4: {
      keywords: ['culture', 'values', 'norms', 'tradition', 'custom', 'culture', 'valeurs', 'normes', 'tradition']
    },
    IS6: {
      keywords: ['compatible', 'fit', 'align', 'match', 'workflow', 'compatible', 'adéquation', 'aligner']
    },
    IS11: {
      keywords: ['leader', 'champion', 'support', 'director', 'manager', 'leader', 'champion', 'soutien', 'directeur']
    },
    IS12: {
      keywords: ['resource', 'budget', 'staff', 'time', 'money', 'equipment', 'ressource', 'budget', 'personnel', 'temps']
    },
    IN2: {
      keywords: ['knowledge', 'skill', 'competence', 'training', 'education', 'connaissance', 'compétence', 'formation']
    },
    IN4: {
      keywords: ['motivation', 'willing', 'resist', 'attitude', 'belief', 'motivation', 'volonté', 'résistance', 'attitude']
    },
    PR3: {
      keywords: ['engage', 'involve', 'participate', 'stakeholder', 'champion', 'engager', 'impliquer', 'participer']
    },
    PR5: {
      keywords: ['monitor', 'evaluate', 'feedback', 'assess', 'reflect', 'surveiller', 'évaluer', 'feedback', 'réfléchir']
    }
  },
  // Auto-code a text segment
  autoCode: function (text) {
    var self = this;
    var codes = [];
    var lowerText = text.toLowerCase();
    Object.keys(self.patterns).forEach(function (codeId) {
      var pattern = self.patterns[codeId];
      var matchCount = 0;
      pattern.keywords.forEach(function (kw) {
        if (lowerText.indexOf(kw.toLowerCase()) >= 0) matchCount++;
      });
      if (matchCount >= 2) {
        codes.push({
          code: codeId,
          confidence: matchCount >= 4 ? 'high' : matchCount >= 2 ? 'moderate' : 'low',
          matchCount: matchCount
        });
      }
    });
    codes.sort(function (a, b) {
      return b.matchCount - a.matchCount;
    });
    return codes;
  },
  // Generate Inner Setting Memo from coded data
  generateMemo: function (innerSettingId, codedData, lang) {
    var t = function (fr, en) {
      return lang === 'fr' ? fr : en;
    };
    var memo = {
      innerSetting: innerSettingId,
      date: new Date().toISOString(),
      constructSummaries: {},
      overallAssessment: '',
      template: 'AF3'
    };
    Object.keys(codedData).forEach(function (code) {
      memo.constructSummaries[code] = {
        rating: codedData[code].rating || 0,
        summary: codedData[code].summary || '',
        quotes: codedData[code].quotes || [],
        sources: codedData[code].sources || []
      };
    });
    return memo;
  },
  // Generate Construct x Inner Setting Matrix
  generateMatrix: function (innerSettings, codedByIS, constructs) {
    var matrix = {
      constructs: constructs,
      innerSettings: innerSettings,
      cells: {}
    };
    innerSettings.forEach(function (is) {
      matrix.cells[is] = {};
      constructs.forEach(function (c) {
        matrix.cells[is][c] = codedByIS[is] && codedByIS[is][c] ? codedByIS[is][c] : {
          rating: 'X',
          summary: ''
        };
      });
    });

    // Identify distinguishing constructs
    matrix.distinguishing = constructs.filter(function (c) {
      var ratings = innerSettings.map(function (is) {
        return matrix.cells[is][c].rating;
      }).filter(function (r) {
        return r !== 'X';
      });
      if (ratings.length < 2) return false;
      var max = Math.max.apply(null, ratings);
      var min = Math.min.apply(null, ratings);
      return max - min >= 2;
    });
    return matrix;
  }
};
console.log('✅ MOUDAR v11.0: QualitativeAssistant loaded — CFIR coding, rating -2/+2, auto-coding par mots-cles, matrix generator');

// ═══════════════════════════════════════════════════════════════════════════
// MODULE 2: GRANT AI WRITER (GAW) v9.0
// Génération de propositions adaptées par bailleur
// ═══════════════════════════════════════════════════════════════════════════

export default QualitativeAssistant;
