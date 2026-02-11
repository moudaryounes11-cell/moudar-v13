var VoiceAssistant = function () {
  'use strict';

  var recognition = null;
  var synthesis = null;
  var isListening = false;
  var offlineQueue = [];
  var callbacks = {
    onResult: null,
    onError: null,
    onStart: null,
    onEnd: null
  };

  // Commandes vocales reconnues
  var voiceCommands = {
    fr: {
      "nouvelle barrière": {
        action: "add_barrier"
      },
      "ajouter observation": {
        action: "add_observation"
      },
      "statut du projet": {
        action: "get_status"
      },
      "générer rapport": {
        action: "generate_report"
      },
      "aide": {
        action: "help"
      },
      "arrêter": {
        action: "stop"
      }
    },
    en: {
      "new barrier": {
        action: "add_barrier"
      },
      "add observation": {
        action: "add_observation"
      },
      "project status": {
        action: "get_status"
      },
      "generate report": {
        action: "generate_report"
      },
      "help": {
        action: "help"
      },
      "stop": {
        action: "stop"
      }
    }
  };

  /**
   * Initialise l'assistant vocal
   */
  function init(lang) {
    lang = lang || 'fr';

    // Vérifier le support
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return {
        success: false,
        error: 'Reconnaissance vocale non supportée',
        fallback: 'Utilisez la saisie texte'
      };
    }
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    recognition.onstart = function () {
      isListening = true;
      if (callbacks.onStart) callbacks.onStart();
    };
    recognition.onend = function () {
      isListening = false;
      if (callbacks.onEnd) callbacks.onEnd();
    };
    recognition.onresult = function (event) {
      var transcript = '';
      for (var i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (event.results[event.resultIndex].isFinal) {
        processVoiceInput(transcript.toLowerCase().trim(), lang);
      }
      if (callbacks.onResult) {
        callbacks.onResult({
          transcript: transcript,
          isFinal: event.results[event.resultIndex].isFinal,
          confidence: event.results[event.resultIndex][0].confidence
        });
      }
    };
    recognition.onerror = function (event) {
      if (callbacks.onError) callbacks.onError(event.error);
    };

    // Synthèse vocale
    synthesis = window.speechSynthesis;
    console.log('[VoiceAssistant] Initialisé en', lang);
    return {
      success: true,
      lang: lang
    };
  }

  /**
   * Démarre l'écoute
   */
  function startListening() {
    if (recognition && !isListening) {
      try {
        recognition.start();
        return {
          success: true
        };
      } catch (e) {
        return {
          success: false,
          error: e.message
        };
      }
    }
    return {
      success: false,
      error: 'Déjà en écoute ou non initialisé'
    };
  }

  /**
   * Arrête l'écoute
   */
  function stopListening() {
    if (recognition && isListening) {
      recognition.stop();
      return {
        success: true
      };
    }
    return {
      success: false
    };
  }

  /**
   * Traite l'entrée vocale
   */
  function processVoiceInput(text, lang) {
    lang = lang || 'fr';
    var commands = voiceCommands[lang] || voiceCommands.fr;

    // Chercher une commande correspondante
    for (var command in commands) {
      if (text.indexOf(command) !== -1) {
        executeCommand(commands[command].action, text, lang);
        return;
      }
    }

    // Si pas de commande, traiter comme observation libre
    var observation = {
      id: 'OBS_' + Date.now(),
      text: text,
      timestamp: new Date().toISOString(),
      source: 'voice',
      processed: false
    };

    // Ajouter à la file offline
    offlineQueue.push(observation);
    saveOfflineQueue();

    // Analyser avec SemanticNLP si disponible
    if (window.SemanticNLP) {
      var analysis = SemanticNLP.analyzeText(text, lang);
      observation.analysis = analysis;
      observation.processed = true;
    }
    return observation;
  }

  /**
   * Exécute une commande vocale
   */
  function executeCommand(action, originalText, lang) {
    var response = '';
    switch (action) {
      case 'add_barrier':
        response = lang === 'fr' ? 'Barrière enregistrée. Décrivez la barrière observée.' : 'Barrier recorded. Describe the observed barrier.';
        break;
      case 'add_observation':
        response = lang === 'fr' ? 'Prêt à enregistrer votre observation.' : 'Ready to record your observation.';
        break;
      case 'get_status':
        response = lang === 'fr' ? 'Consultation du statut du projet en cours.' : 'Checking project status.';
        break;
      case 'help':
        response = lang === 'fr' ? 'Commandes disponibles: nouvelle barrière, ajouter observation, statut du projet, générer rapport, arrêter.' : 'Available commands: new barrier, add observation, project status, generate report, stop.';
        break;
      case 'stop':
        stopListening();
        response = lang === 'fr' ? 'Écoute arrêtée.' : 'Listening stopped.';
        break;
    }
    speak(response, lang);
  }

  /**
   * Fait parler l'assistant
   */
  function speak(text, lang) {
    if (!synthesis) return;
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 1;
    synthesis.speak(utterance);
  }

  /**
   * Sauvegarde la file offline
   */
  function saveOfflineQueue() {
    try {
      localStorage.setItem('moudar_offline_queue', JSON.stringify(offlineQueue));
    } catch (e) {
      console.warn('[VoiceAssistant] Erreur sauvegarde offline:', e);
    }
  }

  /**
   * Charge la file offline
   */
  function loadOfflineQueue() {
    try {
      var saved = localStorage.getItem('moudar_offline_queue');
      if (saved) {
        offlineQueue = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('[VoiceAssistant] Erreur chargement offline:', e);
    }
    return offlineQueue;
  }

  /**
   * Synchronise les observations en attente
   */
  function syncOfflineData(onSync) {
    var queue = loadOfflineQueue();
    var synced = [];
    queue.forEach(function (obs) {
      if (!obs.synced) {
        if (onSync) onSync(obs);
        obs.synced = true;
        obs.syncedAt = new Date().toISOString();
        synced.push(obs);
      }
    });
    saveOfflineQueue();
    return {
      total: queue.length,
      synced: synced.length,
      pending: queue.filter(function (o) {
        return !o.synced;
      }).length
    };
  }

  /**
   * Définit les callbacks
   */
  function on(event, callback) {
    var eventName = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
    if (callbacks.hasOwnProperty(eventName)) {
      callbacks[eventName] = callback;
    }
  }

  /**
   * Vérifie si on est offline
   */
  function isOffline() {
    return !navigator.onLine;
  }

  /**
   * Retourne le statut
   */
  function getStatus() {
    return {
      isListening: isListening,
      isOffline: isOffline(),
      queueLength: offlineQueue.length,
      pendingSync: offlineQueue.filter(function (o) {
        return !o.synced;
      }).length,
      speechRecognitionSupported: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
      speechSynthesisSupported: !!window.speechSynthesis
    };
  }
  return {
    VERSION: '8.5.0',
    init: init,
    startListening: startListening,
    stopListening: stopListening,
    speak: speak,
    on: on,
    processVoiceInput: processVoiceInput,
    loadOfflineQueue: loadOfflineQueue,
    syncOfflineData: syncOfflineData,
    isOffline: isOffline,
    getStatus: getStatus,
    getVoiceCommands: function () {
      return voiceCommands;
    }
  };
}();

export default VoiceAssistant;
