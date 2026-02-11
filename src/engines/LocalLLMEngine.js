var LocalLLMEngine = function () {
  'use strict';

  var engine = null;
  var isLoading = false;
  var isReady = false;
  var currentModel = null;
  var loadProgress = 0;

  // Modèles supportés (du plus léger au plus lourd)
  var supportedModels = {
    'TinyLlama-1.1B': {
      id: 'TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC',
      name: 'TinyLlama 1.1B',
      size: '600 MB',
      description: 'Modèle léger, rapide, idéal pour l\'analyse de barrières',
      recommended: true
    },
    'Phi-2': {
      id: 'Phi-2-q4f16_1-MLC',
      name: 'Microsoft Phi-2',
      size: '1.5 GB',
      description: 'Excellent rapport qualité/taille'
    },
    'Llama-3-8B': {
      id: 'Llama-3-8B-Instruct-q4f16_1-MLC',
      name: 'Llama 3 8B',
      size: '4 GB',
      description: 'Meilleure qualité, nécessite GPU puissant'
    },
    'Gemma-2B': {
      id: 'Gemma-2-2b-it-q4f16_1-MLC',
      name: 'Google Gemma 2B',
      size: '1.2 GB',
      description: 'Bon équilibre performance/taille'
    }
  };

  // Prompts spécialisés pour l'implémentation science
  var specializedPrompts = {
    barrierAnalysis: {
      system: "Tu es un expert en science de l'implémentation. Analyse le texte suivant pour identifier les barrières à l'implémentation selon le framework CFIR (Consolidated Framework for Implementation Research). Catégorise chaque barrière identifiée.",
      template: "Texte à analyser:\n\n{text}\n\nIdentifie les barrières d'implémentation et classe-les par catégorie (Inner Setting, Outer Setting, Individual, Intervention, Process):"
    },
    strategyRecommendation: {
      system: "Tu es un consultant expert en stratégies d'implémentation ERIC (Expert Recommendations for Implementing Change). Recommande les stratégies les plus adaptées.",
      template: "Contexte du projet:\n{context}\n\nBarrières identifiées:\n{barriers}\n\nRecommande 5 stratégies ERIC prioritaires avec justification:"
    },
    textImprovement: {
      system: "Tu es un rédacteur scientifique spécialisé en santé publique. Améliore le texte suivant pour le rendre plus précis et professionnel.",
      template: "Texte original:\n\n{text}\n\nVersion améliorée:"
    },
    summaryGeneration: {
      system: "Tu es un expert en résumés exécutifs pour décideurs en santé. Génère un résumé concis et impactant.",
      template: "Document à résumer:\n\n{text}\n\nRésumé exécutif (max 200 mots):"
    }
  };

  /**
   * Vérifie si WebGPU est supporté
   */
  function checkWebGPUSupport() {
    if (typeof navigator === 'undefined') return {
      supported: false,
      reason: 'Not in browser'
    };
    if (!navigator.gpu) return {
      supported: false,
      reason: 'WebGPU not available'
    };
    return {
      supported: true
    };
  }

  /**
   * Charge le SDK WebLLM
   */
  function loadWebLLMSDK() {
    return new Promise(function (resolve, reject) {
      if (typeof window.webllm !== 'undefined') {
        resolve();
        return;
      }
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.46/lib/index.min.js';
      script.onload = function () {
        console.log('[LocalLLMEngine] WebLLM SDK chargé');
        resolve();
      };
      script.onerror = function () {
        reject(new Error('Impossible de charger WebLLM SDK'));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Initialise le moteur LLM avec un modèle
   */
  async function init(modelKey, onProgress) {
    var webgpuCheck = checkWebGPUSupport();
    if (!webgpuCheck.supported) {
      return {
        success: false,
        error: 'WebGPU non supporté: ' + webgpuCheck.reason,
        fallback: 'Utilisez l\'analyse sémantique (SemanticNLP) comme alternative'
      };
    }
    modelKey = modelKey || 'TinyLlama-1.1B';
    var modelConfig = supportedModels[modelKey];
    if (!modelConfig) {
      return {
        success: false,
        error: 'Modèle non supporté: ' + modelKey
      };
    }
    isLoading = true;
    loadProgress = 0;
    try {
      await loadWebLLMSDK();

      // Créer le moteur WebLLM
      engine = new window.webllm.MLCEngine();

      // Callback de progression
      engine.setInitProgressCallback(function (report) {
        loadProgress = report.progress * 100;
        if (onProgress) {
          onProgress({
            progress: loadProgress,
            text: report.text,
            timeElapsed: report.timeElapsed
          });
        }
      });

      // Charger le modèle
      await engine.reload(modelConfig.id);
      currentModel = modelKey;
      isReady = true;
      isLoading = false;
      console.log('[LocalLLMEngine] ✅ Modèle', modelConfig.name, 'prêt');
      return {
        success: true,
        model: modelConfig.name,
        size: modelConfig.size
      };
    } catch (error) {
      isLoading = false;
      console.error('[LocalLLMEngine] Erreur:', error);
      return {
        success: false,
        error: error.message,
        fallback: 'Utilisez SemanticNLP comme alternative'
      };
    }
  }

  /**
   * Génère une réponse avec le LLM
   */
  async function generate(prompt, options) {
    options = options || {};
    if (!isReady || !engine) {
      return {
        success: false,
        error: 'Moteur non initialisé. Appelez init() d\'abord.',
        fallback: analyzeWithFallback(prompt)
      };
    }
    try {
      var messages = [{
        role: 'system',
        content: options.systemPrompt || 'Tu es un assistant expert en implémentation de programmes de santé.'
      }, {
        role: 'user',
        content: prompt
      }];
      var reply = await engine.chat.completions.create({
        messages: messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 500,
        stream: false
      });
      return {
        success: true,
        response: reply.choices[0].message.content,
        usage: reply.usage,
        model: currentModel
      };
    } catch (error) {
      console.error('[LocalLLMEngine] Erreur génération:', error);
      return {
        success: false,
        error: error.message,
        fallback: analyzeWithFallback(prompt)
      };
    }
  }

  /**
   * Analyse les barrières avec le LLM
   */
  async function analyzeBarriers(text, lang) {
    lang = lang || 'fr';
    if (!isReady) {
      return analyzeWithFallback(text, 'barriers', lang);
    }
    var prompt = specializedPrompts.barrierAnalysis.template.replace('{text}', text);
    return generate(prompt, {
      systemPrompt: specializedPrompts.barrierAnalysis.system,
      temperature: 0.3,
      maxTokens: 800
    });
  }

  /**
   * Recommande des stratégies avec le LLM
   */
  async function recommendStrategies(context, barriers, lang) {
    lang = lang || 'fr';
    if (!isReady) {
      return {
        success: false,
        fallback: 'Utilisez MoudarEngine.recommend()'
      };
    }
    var prompt = specializedPrompts.strategyRecommendation.template.replace('{context}', context).replace('{barriers}', Array.isArray(barriers) ? barriers.join('\n- ') : barriers);
    return generate(prompt, {
      systemPrompt: specializedPrompts.strategyRecommendation.system,
      temperature: 0.5,
      maxTokens: 1000
    });
  }

  /**
   * Améliore un texte avec le LLM
   */
  async function improveText(text, lang) {
    if (!isReady) {
      return {
        success: false,
        error: 'LLM non initialisé',
        original: text
      };
    }
    var prompt = specializedPrompts.textImprovement.template.replace('{text}', text);
    return generate(prompt, {
      systemPrompt: specializedPrompts.textImprovement.system,
      temperature: 0.6,
      maxTokens: text.length * 2
    });
  }

  /**
   * Génère un résumé exécutif
   */
  async function generateSummary(text, lang) {
    if (!isReady) {
      return {
        success: false,
        error: 'LLM non initialisé'
      };
    }
    var prompt = specializedPrompts.summaryGeneration.template.replace('{text}', text);
    return generate(prompt, {
      systemPrompt: specializedPrompts.summaryGeneration.system,
      temperature: 0.4,
      maxTokens: 400
    });
  }

  /**
   * Fallback avec SemanticNLP si LLM non disponible
   */
  function analyzeWithFallback(text, type, lang) {
    console.log('[LocalLLMEngine] Utilisation du fallback SemanticNLP');
    if (window.SemanticNLP) {
      var result = SemanticNLP.analyzeText(text, lang || 'fr');
      return {
        success: true,
        source: 'fallback_semantic_nlp',
        barriers: result.barriers,
        confidence: result.overallConfidence,
        message: 'Analyse effectuée avec SemanticNLP (LLM non disponible)'
      };
    }
    return {
      success: false,
      error: 'Ni LLM ni SemanticNLP disponible'
    };
  }

  /**
   * Décharge le modèle de la mémoire
   */
  async function unload() {
    if (engine) {
      await engine.unload();
      engine = null;
      isReady = false;
      currentModel = null;
      console.log('[LocalLLMEngine] Modèle déchargé');
    }
  }

  /**
   * Retourne l'état du moteur
   */
  function getStatus() {
    return {
      isReady: isReady,
      isLoading: isLoading,
      currentModel: currentModel,
      loadProgress: loadProgress,
      webgpuSupported: checkWebGPUSupport().supported
    };
  }
  return {
    VERSION: '8.4.0',
    init: init,
    generate: generate,
    analyzeBarriers: analyzeBarriers,
    recommendStrategies: recommendStrategies,
    improveText: improveText,
    generateSummary: generateSummary,
    unload: unload,
    getStatus: getStatus,
    getSupportedModels: function () {
      return supportedModels;
    },
    checkWebGPUSupport: checkWebGPUSupport
  };
}();

export default LocalLLMEngine;
