var QualitativeAnalysisEngine = {
  VERSION: '9.0.0',
  supportedLanguages: ['fr', 'en', 'ar', 'es'],
  barrierLexicon: {
    fr: {
      B01: {
        id: 'B01',
        label: 'Manque de formation',
        keywords: ['formation', 'compétence', 'savoir', 'connaissance', 'apprentissage', 'capacité'],
        phrases: ['pas formé', 'manque de formation', 'besoin de formation', 'ne sait pas', 'n\'a pas appris'],
        sentiments: ['difficile', 'incapable', 'confus', 'perdu']
      },
      B02: {
        id: 'B02',
        label: 'Ressources insuffisantes',
        keywords: ['ressource', 'budget', 'argent', 'financement', 'moyens', 'équipement', 'matériel'],
        phrases: ['pas de budget', 'manque de moyens', 'pas assez', 'insuffisant'],
        sentiments: ['limité', 'contraint', 'restreint']
      },
      B05: {
        id: 'B05',
        label: 'Résistance au changement',
        keywords: ['résistance', 'refus', 'opposition', 'réticence', 'habitude', 'tradition'],
        phrases: ['ne veut pas', 'refuse de', 'toujours fait comme ça', 'pas envie de changer'],
        sentiments: ['hostile', 'méfiant', 'sceptique']
      },
      B06: {
        id: 'B06',
        label: 'Problèmes de leadership',
        keywords: ['leadership', 'direction', 'management', 'chef', 'responsable', 'hiérarchie'],
        phrases: ['pas de soutien', 'direction absente', 'pas de vision'],
        sentiments: ['abandonné', 'seul', 'sans guidance']
      },
      B07: {
        id: 'B07',
        label: 'Charge de travail excessive',
        keywords: ['charge', 'travail', 'surcharge', 'temps', 'disponibilité', 'occupation'],
        phrases: ['trop de travail', 'pas le temps', 'surchargé', 'débordé'],
        sentiments: ['épuisé', 'fatigué', 'stressé']
      },
      B09: {
        id: 'B09',
        label: 'Manque de communication',
        keywords: ['communication', 'information', 'message', 'coordination', 'échange'],
        phrases: ['pas informé', 'ne sait pas', 'personne ne dit', 'pas au courant'],
        sentiments: ['isolé', 'dans le noir', 'déconnecté']
      }
    },
    en: {
      B01: {
        id: 'B01',
        label: 'Lack of training',
        keywords: ['training', 'skill', 'knowledge', 'competence', 'learning', 'capacity'],
        phrases: ['not trained', 'lack of training', 'need training', 'don\'t know how'],
        sentiments: ['difficult', 'unable', 'confused', 'lost']
      },
      B02: {
        id: 'B02',
        label: 'Insufficient resources',
        keywords: ['resource', 'budget', 'money', 'funding', 'equipment', 'material'],
        phrases: ['no budget', 'lack of resources', 'not enough', 'insufficient'],
        sentiments: ['limited', 'constrained', 'restricted']
      },
      B05: {
        id: 'B05',
        label: 'Resistance to change',
        keywords: ['resistance', 'refuse', 'opposition', 'reluctance', 'habit', 'tradition'],
        phrases: ['don\'t want to', 'refuse to', 'always done it this way', 'no desire to change'],
        sentiments: ['hostile', 'suspicious', 'skeptical']
      },
      B06: {
        id: 'B06',
        label: 'Leadership issues',
        keywords: ['leadership', 'management', 'supervisor', 'boss', 'hierarchy'],
        phrases: ['no support', 'absent leadership', 'no vision'],
        sentiments: ['abandoned', 'alone', 'without guidance']
      },
      B07: {
        id: 'B07',
        label: 'Excessive workload',
        keywords: ['workload', 'overload', 'time', 'availability', 'busy'],
        phrases: ['too much work', 'no time', 'overloaded', 'overwhelmed'],
        sentiments: ['exhausted', 'tired', 'stressed']
      },
      B09: {
        id: 'B09',
        label: 'Lack of communication',
        keywords: ['communication', 'information', 'message', 'coordination'],
        phrases: ['not informed', 'don\'t know', 'nobody tells', 'not aware'],
        sentiments: ['isolated', 'in the dark', 'disconnected']
      }
    }
  },
  sentimentLexicon: {
    fr: {
      positive: ['bien', 'bon', 'excellent', 'satisfait', 'content', 'heureux', 'positif', 'réussi', 'efficace', 'utile'],
      negative: ['mal', 'mauvais', 'difficile', 'problème', 'échec', 'frustré', 'négatif', 'impossible', 'inutile', 'pire'],
      neutral: ['normal', 'habituel', 'standard', 'moyen', 'ordinaire']
    },
    en: {
      positive: ['good', 'great', 'excellent', 'satisfied', 'happy', 'positive', 'successful', 'effective', 'useful'],
      negative: ['bad', 'poor', 'difficult', 'problem', 'failure', 'frustrated', 'negative', 'impossible', 'useless', 'worse'],
      neutral: ['normal', 'usual', 'standard', 'average', 'ordinary']
    }
  },
  analyzeText: function (text, lang) {
    lang = lang || 'fr';
    var lexicon = this.barrierLexicon[lang] || this.barrierLexicon.fr;
    var sentiments = this.sentimentLexicon[lang] || this.sentimentLexicon.fr;
    var textLower = text.toLowerCase();
    var words = textLower.split(/\s+/);
    var barriers = [];
    var themes = {};
    var sentiment = {
      positive: 0,
      negative: 0,
      neutral: 0
    };
    var keyQuotes = [];

    // Analyze barriers
    var self = this;
    Object.keys(lexicon).forEach(function (barrierId) {
      var barrier = lexicon[barrierId];
      var score = 0;
      var mentions = [];

      // Check keywords
      barrier.keywords.forEach(function (keyword) {
        var regex = new RegExp('\\b' + keyword + '\\b', 'gi');
        var matches = textLower.match(regex);
        if (matches) {
          score += matches.length;
          mentions.push({
            type: 'keyword',
            term: keyword,
            count: matches.length
          });
        }
      });

      // Check phrases (higher weight)
      barrier.phrases.forEach(function (phrase) {
        if (textLower.indexOf(phrase) !== -1) {
          score += 3;
          mentions.push({
            type: 'phrase',
            term: phrase,
            count: 1
          });
        }
      });

      // Check sentiments
      barrier.sentiments.forEach(function (sent) {
        if (textLower.indexOf(sent) !== -1) {
          score += 0.5;
        }
      });
      if (score > 0) {
        var confidence = Math.min(score / 10, 1);
        barriers.push({
          id: barrier.id,
          label: barrier.label,
          confidence: Math.round(confidence * 100),
          severity: confidence > 0.7 ? 'high' : confidence > 0.4 ? 'medium' : 'low',
          mentions: mentions
        });
      }
    });

    // Sentiment analysis
    words.forEach(function (word) {
      if (sentiments.positive.indexOf(word) !== -1) sentiment.positive++;else if (sentiments.negative.indexOf(word) !== -1) sentiment.negative++;else if (sentiments.neutral.indexOf(word) !== -1) sentiment.neutral++;
    });
    var totalSentiment = sentiment.positive + sentiment.negative + sentiment.neutral;
    if (totalSentiment === 0) totalSentiment = 1;

    // Extract key quotes (sentences with high barrier content)
    var sentences = text.split(/[.!?]+/);
    sentences.forEach(function (sentence) {
      if (sentence.length > 20 && sentence.length < 200) {
        var sentLower = sentence.toLowerCase();
        var hasBarrier = barriers.some(function (b) {
          return b.mentions.some(function (m) {
            return sentLower.indexOf(m.term) !== -1;
          });
        });
        if (hasBarrier && keyQuotes.length < 5) {
          keyQuotes.push(sentence.trim());
        }
      }
    });
    return {
      barriers: barriers.sort(function (a, b) {
        return b.confidence - a.confidence;
      }),
      themes: Object.keys(themes).map(function (t) {
        return {
          name: t,
          count: themes[t]
        };
      }),
      sentiment: {
        positive: Math.round(sentiment.positive / totalSentiment * 100),
        negative: Math.round(sentiment.negative / totalSentiment * 100),
        neutral: Math.round(sentiment.neutral / totalSentiment * 100),
        overall: sentiment.positive > sentiment.negative ? 'positive' : sentiment.negative > sentiment.positive ? 'negative' : 'neutral'
      },
      keyQuotes: keyQuotes,
      wordCount: words.length,
      analyzedAt: new Date().toISOString()
    };
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// MODULE 4: BENCHMARKING ENGINE (BE) v9.0
// Comparaison anonymisée avec pool global de projets
// ═══════════════════════════════════════════════════════════════════════════

export default QualitativeAnalysisEngine;
