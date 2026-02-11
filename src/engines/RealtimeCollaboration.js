var RealtimeCollaboration = function () {
  'use strict';

  var supabaseClient = null;
  var currentChannel = null;
  var collaborators = {};
  var callbacks = {
    onUserJoin: null,
    onUserLeave: null,
    onProjectUpdate: null,
    onCursorMove: null,
    onCommentAdd: null
  };

  // Configuration Supabase (à remplir par l'utilisateur)
  var config = {
    supabaseUrl: null,
    supabaseKey: null,
    isConnected: false,
    currentUser: null,
    currentRoom: null
  };

  /**
   * Initialise la connexion Supabase
   */
  function init(supabaseUrl, supabaseKey, user) {
    if (!supabaseUrl || !supabaseKey) {
      console.warn('[RealtimeCollaboration] Configuration Supabase manquante');
      return {
        success: false,
        error: 'Configuration manquante'
      };
    }
    config.supabaseUrl = supabaseUrl;
    config.supabaseKey = supabaseKey;
    config.currentUser = user || {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: 'Anonyme',
      color: getRandomColor(),
      avatar: '👤'
    };

    // Charger le SDK Supabase dynamiquement si pas déjà chargé
    if (typeof window.supabase === 'undefined') {
      return loadSupabaseSDK().then(function () {
        return createClient();
      });
    }
    return createClient();
  }

  /**
   * Charge le SDK Supabase depuis CDN
   */
  function loadSupabaseSDK() {
    return new Promise(function (resolve, reject) {
      if (typeof window.supabase !== 'undefined') {
        resolve();
        return;
      }
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = resolve;
      script.onerror = function () {
        reject(new Error('Impossible de charger Supabase SDK'));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Crée le client Supabase
   */
  function createClient() {
    try {
      supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseKey);
      config.isConnected = true;
      console.log('[RealtimeCollaboration] ✅ Connecté à Supabase');
      return {
        success: true
      };
    } catch (e) {
      console.error('[RealtimeCollaboration] Erreur connexion:', e);
      return {
        success: false,
        error: e.message
      };
    }
  }

  /**
   * Rejoint une room de projet pour collaboration
   */
  function joinProjectRoom(projectId) {
    if (!supabaseClient) {
      console.warn('[RealtimeCollaboration] Client non initialisé');
      return null;
    }
    config.currentRoom = projectId;

    // Créer le canal de collaboration
    currentChannel = supabaseClient.channel('project:' + projectId, {
      config: {
        presence: {
          key: config.currentUser.id
        }
      }
    });

    // Écouter les événements de présence
    currentChannel.on('presence', {
      event: 'sync'
    }, function () {
      var state = currentChannel.presenceState();
      collaborators = {};
      for (var id in state) {
        if (state[id] && state[id][0]) {
          collaborators[id] = state[id][0];
        }
      }
      console.log('[RealtimeCollaboration] Collaborateurs:', Object.keys(collaborators).length);
    }).on('presence', {
      event: 'join'
    }, function (payload) {
      if (callbacks.onUserJoin) {
        callbacks.onUserJoin(payload.newPresences);
      }
    }).on('presence', {
      event: 'leave'
    }, function (payload) {
      if (callbacks.onUserLeave) {
        callbacks.onUserLeave(payload.leftPresences);
      }
    }).on('broadcast', {
      event: 'project_update'
    }, function (payload) {
      if (callbacks.onProjectUpdate && payload.payload.userId !== config.currentUser.id) {
        callbacks.onProjectUpdate(payload.payload);
      }
    }).on('broadcast', {
      event: 'cursor_move'
    }, function (payload) {
      if (callbacks.onCursorMove && payload.payload.userId !== config.currentUser.id) {
        callbacks.onCursorMove(payload.payload);
      }
    }).on('broadcast', {
      event: 'comment_add'
    }, function (payload) {
      if (callbacks.onCommentAdd) {
        callbacks.onCommentAdd(payload.payload);
      }
    }).subscribe(async function (status) {
      if (status === 'SUBSCRIBED') {
        await currentChannel.track(config.currentUser);
        console.log('[RealtimeCollaboration] ✅ Rejoint room:', projectId);
      }
    });
    return currentChannel;
  }

  /**
   * Quitte la room actuelle
   */
  function leaveRoom() {
    if (currentChannel) {
      currentChannel.unsubscribe();
      currentChannel = null;
      config.currentRoom = null;
      collaborators = {};
    }
  }

  /**
   * Envoie une mise à jour de projet aux collaborateurs
   */
  function broadcastProjectUpdate(field, value, metadata) {
    if (!currentChannel) return;
    currentChannel.send({
      type: 'broadcast',
      event: 'project_update',
      payload: {
        userId: config.currentUser.id,
        userName: config.currentUser.name,
        field: field,
        value: value,
        metadata: metadata || {},
        timestamp: new Date().toISOString()
      }
    });
  }

  /**
   * Envoie la position du curseur
   */
  function broadcastCursor(x, y, elementId) {
    if (!currentChannel) return;
    currentChannel.send({
      type: 'broadcast',
      event: 'cursor_move',
      payload: {
        userId: config.currentUser.id,
        userName: config.currentUser.name,
        userColor: config.currentUser.color,
        x: x,
        y: y,
        elementId: elementId
      }
    });
  }

  /**
   * Ajoute un commentaire
   */
  function addComment(elementId, text) {
    if (!currentChannel) return;
    var comment = {
      id: 'comment_' + Date.now(),
      userId: config.currentUser.id,
      userName: config.currentUser.name,
      userColor: config.currentUser.color,
      elementId: elementId,
      text: text,
      timestamp: new Date().toISOString(),
      resolved: false
    };
    currentChannel.send({
      type: 'broadcast',
      event: 'comment_add',
      payload: comment
    });
    return comment;
  }

  /**
   * Définit les callbacks d'événements
   */
  function on(event, callback) {
    if (callbacks.hasOwnProperty('on' + event.charAt(0).toUpperCase() + event.slice(1))) {
      callbacks['on' + event.charAt(0).toUpperCase() + event.slice(1)] = callback;
    }
  }

  /**
   * Génère une couleur aléatoire pour un utilisateur
   */
  function getRandomColor() {
    var colors = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Retourne la liste des collaborateurs actuels
   */
  function getCollaborators() {
    return Object.values(collaborators);
  }

  /**
   * Simule une collaboration (mode démo sans Supabase)
   */
  function simulateCollaboration(projectId) {
    config.currentRoom = projectId;
    config.currentUser = {
      id: 'demo_user_1',
      name: 'Vous (Démo)',
      color: '#3B82F6',
      avatar: '👤'
    };

    // Simuler des collaborateurs
    collaborators = {
      'demo_user_2': {
        id: 'demo_user_2',
        name: 'Dr. Sarah M.',
        color: '#22C55E',
        avatar: '👩‍⚕️'
      },
      'demo_user_3': {
        id: 'demo_user_3',
        name: 'Prof. Ahmed B.',
        color: '#F97316',
        avatar: '👨‍🏫'
      }
    };
    console.log('[RealtimeCollaboration] 🎭 Mode démo activé avec', Object.keys(collaborators).length, 'collaborateurs simulés');
    return {
      success: true,
      mode: 'demo',
      collaborators: getCollaborators()
    };
  }
  return {
    VERSION: '8.4.0',
    init: init,
    joinProjectRoom: joinProjectRoom,
    leaveRoom: leaveRoom,
    broadcastProjectUpdate: broadcastProjectUpdate,
    broadcastCursor: broadcastCursor,
    addComment: addComment,
    on: on,
    getCollaborators: getCollaborators,
    simulateCollaboration: simulateCollaboration,
    getConfig: function () {
      return config;
    },
    isConnected: function () {
      return config.isConnected;
    }
  };
}();

export default RealtimeCollaboration;
