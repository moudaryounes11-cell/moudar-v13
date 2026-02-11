var SocialNetworkAnalyzer = function () {
  'use strict';

  // Types de parties prenantes
  var stakeholderTypes = {
    "champion": {
      icon: "⭐",
      label: {
        fr: "Champion",
        en: "Champion"
      },
      influence: 0.9,
      color: "#22C55E"
    },
    "decision_maker": {
      icon: "👔",
      label: {
        fr: "Décideur",
        en: "Decision Maker"
      },
      influence: 0.95,
      color: "#3B82F6"
    },
    "implementer": {
      icon: "⚙️",
      label: {
        fr: "Implémenteur",
        en: "Implementer"
      },
      influence: 0.7,
      color: "#8B5CF6"
    },
    "beneficiary": {
      icon: "👥",
      label: {
        fr: "Bénéficiaire",
        en: "Beneficiary"
      },
      influence: 0.4,
      color: "#06B6D4"
    },
    "opponent": {
      icon: "🚫",
      label: {
        fr: "Opposant",
        en: "Opponent"
      },
      influence: 0.8,
      color: "#EF4444"
    },
    "neutral": {
      icon: "⚪",
      label: {
        fr: "Neutre",
        en: "Neutral"
      },
      influence: 0.3,
      color: "#9CA3AF"
    },
    "funder": {
      icon: "💰",
      label: {
        fr: "Bailleur",
        en: "Funder"
      },
      influence: 0.85,
      color: "#F59E0B"
    },
    "technical_expert": {
      icon: "🔬",
      label: {
        fr: "Expert technique",
        en: "Technical Expert"
      },
      influence: 0.75,
      color: "#EC4899"
    }
  };

  // Types de relations
  var relationTypes = {
    "hierarchical": {
      label: {
        fr: "Hiérarchique",
        en: "Hierarchical"
      },
      strength: 0.9,
      style: "solid"
    },
    "collaborative": {
      label: {
        fr: "Collaborative",
        en: "Collaborative"
      },
      strength: 0.7,
      style: "solid"
    },
    "advisory": {
      label: {
        fr: "Conseil",
        en: "Advisory"
      },
      strength: 0.5,
      style: "dashed"
    },
    "funding": {
      label: {
        fr: "Financement",
        en: "Funding"
      },
      strength: 0.85,
      style: "solid"
    },
    "opposition": {
      label: {
        fr: "Opposition",
        en: "Opposition"
      },
      strength: -0.6,
      style: "dotted"
    },
    "influence": {
      label: {
        fr: "Influence",
        en: "Influence"
      },
      strength: 0.6,
      style: "dashed"
    }
  };

  /**
   * Crée un nouveau réseau de parties prenantes
   */
  function createNetwork(projectId) {
    return {
      projectId: projectId,
      nodes: [],
      edges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Ajoute une partie prenante au réseau
   */
  function addStakeholder(network, stakeholder) {
    var node = {
      id: stakeholder.id || 'SH_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      name: stakeholder.name,
      type: stakeholder.type || 'neutral',
      organization: stakeholder.organization || '',
      role: stakeholder.role || '',
      influence: stakeholder.influence || stakeholderTypes[stakeholder.type]?.influence || 0.5,
      support: stakeholder.support || 0,
      // -1 (opposant) à +1 (champion)
      reach: stakeholder.reach || 1,
      // Nombre de personnes influencées
      notes: stakeholder.notes || '',
      x: stakeholder.x || Math.random() * 800,
      y: stakeholder.y || Math.random() * 600
    };
    network.nodes.push(node);
    network.updatedAt = new Date().toISOString();
    return node;
  }

  /**
   * Ajoute une relation entre deux parties prenantes
   */
  function addRelation(network, sourceId, targetId, relationType, metadata) {
    metadata = metadata || {};
    var edge = {
      id: 'REL_' + Date.now(),
      source: sourceId,
      target: targetId,
      type: relationType || 'collaborative',
      strength: metadata.strength || relationTypes[relationType]?.strength || 0.5,
      bidirectional: metadata.bidirectional !== false,
      label: metadata.label || '',
      notes: metadata.notes || ''
    };
    network.edges.push(edge);
    network.updatedAt = new Date().toISOString();
    return edge;
  }

  /**
   * Calcule les métriques de centralité pour chaque nœud
   */
  function calculateCentrality(network) {
    var nodes = network.nodes;
    var edges = network.edges;

    // Degree Centrality (nombre de connexions)
    nodes.forEach(function (node) {
      var connections = edges.filter(function (e) {
        return e.source === node.id || e.target === node.id;
      });
      node.degreeCentrality = connections.length / Math.max(nodes.length - 1, 1);
    });

    // Betweenness Centrality (approximation simplifiée)
    nodes.forEach(function (node) {
      var pathsThrough = 0;
      var totalPaths = 0;
      nodes.forEach(function (source) {
        if (source.id === node.id) return;
        nodes.forEach(function (target) {
          if (target.id === node.id || target.id === source.id) return;
          totalPaths++;

          // Vérifier si le chemin passe par ce nœud
          var sourceToNode = edges.some(function (e) {
            return e.source === source.id && e.target === node.id || e.target === source.id && e.source === node.id;
          });
          var nodeToTarget = edges.some(function (e) {
            return e.source === node.id && e.target === target.id || e.target === node.id && e.source === target.id;
          });
          if (sourceToNode && nodeToTarget) pathsThrough++;
        });
      });
      node.betweennessCentrality = totalPaths > 0 ? pathsThrough / totalPaths : 0;
    });

    // Influence Score combiné
    nodes.forEach(function (node) {
      node.influenceScore = node.influence * 0.4 + node.degreeCentrality * 0.3 + node.betweennessCentrality * 0.2 + Math.abs(node.support) * 0.1;
    });
    return nodes;
  }

  /**
   * Identifie les champions clés (plus haut score d'influence positif)
   */
  function identifyChampions(network, limit) {
    limit = limit || 5;
    calculateCentrality(network);
    return network.nodes.filter(function (n) {
      return n.support > 0;
    }).sort(function (a, b) {
      return b.influenceScore - a.influenceScore;
    }).slice(0, limit);
  }

  /**
   * Identifie les opposants à surveiller
   */
  function identifyOpponents(network, limit) {
    limit = limit || 5;
    calculateCentrality(network);
    return network.nodes.filter(function (n) {
      return n.support < 0;
    }).sort(function (a, b) {
      return b.influenceScore - a.influenceScore;
    }).slice(0, limit);
  }

  /**
   * Identifie les "ponts" (personnes connectant différents groupes)
   */
  function identifyBridges(network) {
    calculateCentrality(network);
    return network.nodes.filter(function (n) {
      return n.betweennessCentrality > 0.3;
    }).sort(function (a, b) {
      return b.betweennessCentrality - a.betweennessCentrality;
    });
  }

  /**
   * Génère des recommandations de stratégie basées sur le réseau
   */
  function generateNetworkRecommendations(network, lang) {
    lang = lang || 'fr';
    var recommendations = [];
    var champions = identifyChampions(network, 3);
    var opponents = identifyOpponents(network, 3);
    var bridges = identifyBridges(network);

    // Recommandations basées sur les champions
    if (champions.length > 0) {
      recommendations.push({
        type: 'champion_engagement',
        priority: 'high',
        title: lang === 'fr' ? 'Mobiliser les champions clés' : 'Engage key champions',
        description: lang === 'fr' ? 'Impliquez activement ' + champions[0].name + ' (score: ' + Math.round(champions[0].influenceScore * 100) + '%) comme ambassadeur principal.' : 'Actively involve ' + champions[0].name + ' (score: ' + Math.round(champions[0].influenceScore * 100) + '%) as primary ambassador.',
        stakeholders: champions.map(function (c) {
          return c.name;
        })
      });
    }

    // Recommandations basées sur les opposants
    if (opponents.length > 0) {
      recommendations.push({
        type: 'opposition_management',
        priority: 'high',
        title: lang === 'fr' ? 'Gérer l\'opposition' : 'Manage opposition',
        description: lang === 'fr' ? 'Attention à ' + opponents[0].name + ' - influence élevée avec position négative. Stratégie de dialogue recommandée.' : 'Watch ' + opponents[0].name + ' - high influence with negative position. Dialogue strategy recommended.',
        stakeholders: opponents.map(function (o) {
          return o.name;
        })
      });
    }

    // Recommandations basées sur les ponts
    if (bridges.length > 0) {
      recommendations.push({
        type: 'bridge_leverage',
        priority: 'medium',
        title: lang === 'fr' ? 'Exploiter les connecteurs' : 'Leverage connectors',
        description: lang === 'fr' ? bridges[0].name + ' connecte différents groupes. Utilisez cette personne pour diffuser l\'information.' : bridges[0].name + ' connects different groups. Use this person to spread information.',
        stakeholders: bridges.map(function (b) {
          return b.name;
        })
      });
    }
    return recommendations;
  }

  /**
   * Génère les données pour visualisation D3/vis.js
   */
  function getVisualizationData(network) {
    calculateCentrality(network);
    return {
      nodes: network.nodes.map(function (n) {
        var typeInfo = stakeholderTypes[n.type] || stakeholderTypes.neutral;
        return {
          id: n.id,
          label: n.name,
          title: n.organization + ' - ' + n.role,
          value: n.influenceScore * 50,
          color: typeInfo.color,
          icon: typeInfo.icon,
          shape: 'dot',
          font: {
            size: 12
          }
        };
      }),
      edges: network.edges.map(function (e) {
        var typeInfo = relationTypes[e.type] || relationTypes.collaborative;
        return {
          from: e.source,
          to: e.target,
          arrows: e.bidirectional ? undefined : 'to',
          dashes: typeInfo.style === 'dashed',
          color: e.strength < 0 ? '#EF4444' : '#6B7280',
          width: Math.abs(e.strength) * 3
        };
      })
    };
  }

  /**
   * Crée un réseau d'exemple pour démonstration
   */
  function createDemoNetwork(projectTitle, lang) {
    lang = lang || 'fr';
    var network = createNetwork('demo');

    // Ajouter des parties prenantes typiques
    var stakeholders = [{
      id: 'SH1',
      name: lang === 'fr' ? 'Dr. Fatima B.' : 'Dr. Fatima B.',
      type: 'champion',
      organization: lang === 'fr' ? 'Hôpital Central' : 'Central Hospital',
      role: lang === 'fr' ? 'Chef de service' : 'Department Head',
      support: 0.9
    }, {
      id: 'SH2',
      name: lang === 'fr' ? 'M. Ahmed K.' : 'Mr. Ahmed K.',
      type: 'decision_maker',
      organization: lang === 'fr' ? 'Ministère Santé' : 'Ministry of Health',
      role: lang === 'fr' ? 'Directeur régional' : 'Regional Director',
      support: 0.6
    }, {
      id: 'SH3',
      name: lang === 'fr' ? 'Mme. Sarah L.' : 'Ms. Sarah L.',
      type: 'funder',
      organization: 'OMS',
      role: lang === 'fr' ? 'Coordinatrice' : 'Coordinator',
      support: 0.8
    }, {
      id: 'SH4',
      name: lang === 'fr' ? 'Dr. Mohammed R.' : 'Dr. Mohammed R.',
      type: 'opponent',
      organization: lang === 'fr' ? 'Hôpital Central' : 'Central Hospital',
      role: lang === 'fr' ? 'Médecin senior' : 'Senior Physician',
      support: -0.7
    }, {
      id: 'SH5',
      name: lang === 'fr' ? 'Équipe infirmière' : 'Nursing Team',
      type: 'implementer',
      organization: lang === 'fr' ? 'Centre de santé' : 'Health Center',
      role: lang === 'fr' ? 'Personnel soignant' : 'Care Staff',
      support: 0.3
    }, {
      id: 'SH6',
      name: lang === 'fr' ? 'Association patients' : 'Patient Association',
      type: 'beneficiary',
      organization: lang === 'fr' ? 'Société civile' : 'Civil Society',
      role: lang === 'fr' ? 'Représentants' : 'Representatives',
      support: 0.7
    }, {
      id: 'SH7',
      name: lang === 'fr' ? 'Prof. Youssef M.' : 'Prof. Youssef M.',
      type: 'technical_expert',
      organization: lang === 'fr' ? 'Université' : 'University',
      role: lang === 'fr' ? 'Chercheur' : 'Researcher',
      support: 0.5
    }];
    stakeholders.forEach(function (s) {
      addStakeholder(network, s);
    });

    // Ajouter des relations
    addRelation(network, 'SH1', 'SH2', 'hierarchical', {
      label: lang === 'fr' ? 'Rapport à' : 'Reports to'
    });
    addRelation(network, 'SH1', 'SH5', 'hierarchical', {
      label: lang === 'fr' ? 'Supervise' : 'Supervises'
    });
    addRelation(network, 'SH3', 'SH2', 'funding', {
      label: lang === 'fr' ? 'Finance' : 'Funds'
    });
    addRelation(network, 'SH1', 'SH4', 'opposition', {
      label: lang === 'fr' ? 'Conflit' : 'Conflict'
    });
    addRelation(network, 'SH7', 'SH1', 'advisory', {
      label: lang === 'fr' ? 'Conseille' : 'Advises'
    });
    addRelation(network, 'SH6', 'SH1', 'collaborative', {
      label: lang === 'fr' ? 'Partenariat' : 'Partnership'
    });
    addRelation(network, 'SH5', 'SH6', 'collaborative', {
      label: lang === 'fr' ? 'Soigne' : 'Cares for'
    });
    return network;
  }
  return {
    VERSION: '8.5.0',
    createNetwork: createNetwork,
    addStakeholder: addStakeholder,
    addRelation: addRelation,
    calculateCentrality: calculateCentrality,
    identifyChampions: identifyChampions,
    identifyOpponents: identifyOpponents,
    identifyBridges: identifyBridges,
    generateNetworkRecommendations: generateNetworkRecommendations,
    getVisualizationData: getVisualizationData,
    createDemoNetwork: createDemoNetwork,
    getStakeholderTypes: function () {
      return stakeholderTypes;
    },
    getRelationTypes: function () {
      return relationTypes;
    }
  };
}();

export default SocialNetworkAnalyzer;
