var DHIS2Connector = function () {
  'use strict';

  var config = {
    baseUrl: null,
    username: null,
    password: null,
    isConnected: false
  };

  // Indicateurs DHIS2 standards pour la santé mentale
  var standardIndicators = {
    "mental_health": [{
      id: "mh_consultations",
      name: "Consultations santé mentale",
      dhis2Id: "Uvn6LCg7dVU"
    }, {
      id: "mh_depression_cases",
      name: "Cas de dépression diagnostiqués",
      dhis2Id: "Y6f5c6T5J9W"
    }, {
      id: "mh_psychosis_cases",
      name: "Cas de psychose",
      dhis2Id: "Z8g7d8U6K0X"
    }, {
      id: "mh_trained_staff",
      name: "Personnel formé mhGAP",
      dhis2Id: "A9h8e9V7L1Y"
    }],
    "maternal_child": [{
      id: "anc_visits",
      name: "Visites prénatales",
      dhis2Id: "B0i9f0W8M2Z"
    }, {
      id: "deliveries",
      name: "Accouchements assistés",
      dhis2Id: "C1j0g1X9N3A"
    }, {
      id: "child_vaccinations",
      name: "Vaccinations enfants",
      dhis2Id: "D2k1h2Y0O4B"
    }],
    "general": [{
      id: "opd_visits",
      name: "Consultations externes",
      dhis2Id: "E3l2i3Z1P5C"
    }, {
      id: "bed_occupancy",
      name: "Taux d'occupation lits",
      dhis2Id: "F4m3j4A2Q6D"
    }]
  };

  /**
   * Configure la connexion DHIS2
   */
  function configure(options) {
    config.baseUrl = options.baseUrl;
    config.username = options.username;
    config.password = options.password;
    console.log('[DHIS2Connector] Configuration mise à jour');
    return {
      success: true
    };
  }

  /**
   * Teste la connexion DHIS2
   */
  async function testConnection() {
    if (!config.baseUrl) {
      return {
        success: false,
        error: 'URL non configurée'
      };
    }
    try {
      var response = await fetch(config.baseUrl + '/api/me', {
        headers: {
          'Authorization': 'Basic ' + btoa(config.username + ':' + config.password)
        }
      });
      if (response.ok) {
        var data = await response.json();
        config.isConnected = true;
        return {
          success: true,
          user: data.displayName,
          organization: data.organisationUnits ? data.organisationUnits[0]?.displayName : 'N/A'
        };
      } else {
        return {
          success: false,
          error: 'Authentification échouée'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Récupère les données d'un indicateur
   */
  async function fetchIndicatorData(indicatorId, options) {
    options = options || {};
    if (!config.isConnected) {
      // Mode démo si non connecté
      return generateDemoData(indicatorId, options);
    }
    try {
      var url = config.baseUrl + '/api/analytics.json?' + 'dimension=dx:' + indicatorId + '&dimension=pe:' + (options.periods || 'LAST_12_MONTHS') + '&dimension=ou:' + (options.orgUnit || 'USER_ORGUNIT');
      var response = await fetch(url, {
        headers: {
          'Authorization': 'Basic ' + btoa(config.username + ':' + config.password)
        }
      });
      if (response.ok) {
        var data = await response.json();
        return parseAnalyticsResponse(data);
      }
      return {
        success: false,
        error: 'Erreur récupération données'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Parse la réponse analytics DHIS2
   */
  function parseAnalyticsResponse(data) {
    if (!data.rows) return {
      success: false,
      error: 'Format invalide'
    };
    var results = data.rows.map(function (row) {
      return {
        period: row[1],
        value: parseFloat(row[2]) || 0,
        orgUnit: row[3] || 'N/A'
      };
    });
    return {
      success: true,
      data: results,
      metadata: {
        headers: data.headers,
        dimensions: data.metaData?.dimensions
      }
    };
  }

  /**
   * Génère des données de démo
   */
  function generateDemoData(indicatorId, options) {
    var months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    var baseValue = indicatorId.indexOf('mental') !== -1 ? 150 : 500;
    var data = months.map(function (month, i) {
      return {
        period: '2024' + String(i + 1).padStart(2, '0'),
        periodLabel: month + ' 2024',
        value: Math.round(baseValue * (0.8 + Math.random() * 0.4) + i * 5),
        orgUnit: 'Région démo'
      };
    });
    return {
      success: true,
      source: 'demo',
      data: data,
      metadata: {
        indicatorId: indicatorId
      }
    };
  }

  /**
   * Importe les données dans MOUDAR
   */
  async function importToMoudar(indicatorIds, options) {
    options = options || {};
    var results = {};
    for (var i = 0; i < indicatorIds.length; i++) {
      var id = indicatorIds[i];
      results[id] = await fetchIndicatorData(id, options);
    }
    return {
      success: true,
      importedAt: new Date().toISOString(),
      indicators: results,
      summary: {
        total: indicatorIds.length,
        successful: Object.values(results).filter(function (r) {
          return r.success;
        }).length
      }
    };
  }

  /**
   * Récupère les unités d'organisation (sites)
   */
  async function fetchOrganisationUnits(level) {
    level = level || 3;
    if (!config.isConnected) {
      return {
        success: true,
        source: 'demo',
        orgUnits: [{
          id: 'OU1',
          name: 'Région Casablanca-Settat',
          level: 2
        }, {
          id: 'OU2',
          name: 'Région Rabat-Salé-Kénitra',
          level: 2
        }, {
          id: 'OU3',
          name: 'CHU Ibn Sina',
          level: 3,
          parent: 'OU2'
        }, {
          id: 'OU4',
          name: 'Hôpital Moulay Youssef',
          level: 3,
          parent: 'OU1'
        }]
      };
    }
    try {
      var response = await fetch(config.baseUrl + '/api/organisationUnits?level=' + level + '&fields=id,name,level,parent', {
        headers: {
          'Authorization': 'Basic ' + btoa(config.username + ':' + config.password)
        }
      });
      if (response.ok) {
        var data = await response.json();
        return {
          success: true,
          orgUnits: data.organisationUnits
        };
      }
      return {
        success: false,
        error: 'Erreur récupération'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Convertit les données DHIS2 en format KPI pour ImplementationMonitor
   */
  function convertToKPIs(dhis2Data, mapping) {
    var kpis = {};
    for (var indicatorId in dhis2Data.indicators) {
      var indicatorData = dhis2Data.indicators[indicatorId];
      var kpiMapping = mapping[indicatorId];
      if (kpiMapping && indicatorData.success && indicatorData.data) {
        var latestValue = indicatorData.data[indicatorData.data.length - 1];
        kpis[kpiMapping.kpiId] = {
          value: latestValue.value,
          period: latestValue.period,
          source: 'dhis2',
          indicatorId: indicatorId
        };
      }
    }
    return kpis;
  }
  return {
    VERSION: '8.5.0',
    configure: configure,
    testConnection: testConnection,
    fetchIndicatorData: fetchIndicatorData,
    fetchOrganisationUnits: fetchOrganisationUnits,
    importToMoudar: importToMoudar,
    convertToKPIs: convertToKPIs,
    generateDemoData: generateDemoData,
    getStandardIndicators: function () {
      return standardIndicators;
    },
    isConnected: function () {
      return config.isConnected;
    }
  };
}();

export default DHIS2Connector;
