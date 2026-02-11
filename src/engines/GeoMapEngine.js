var GeoMapEngine = function () {
  'use strict';

  var leafletLoaded = false;
  var mapInstance = null;

  // Coordonnées des pays par défaut
  var countryCoordinates = {
    "morocco": {
      lat: 31.7917,
      lng: -7.0926,
      zoom: 6
    },
    "tunisia": {
      lat: 33.8869,
      lng: 9.5375,
      zoom: 7
    },
    "senegal": {
      lat: 14.4974,
      lng: -14.4524,
      zoom: 7
    },
    "algeria": {
      lat: 28.0339,
      lng: 1.6596,
      zoom: 5
    },
    "france": {
      lat: 46.2276,
      lng: 2.2137,
      zoom: 6
    },
    "switzerland": {
      lat: 46.8182,
      lng: 8.2275,
      zoom: 8
    },
    "mali": {
      lat: 17.5707,
      lng: -3.9962,
      zoom: 5
    },
    "cameroon": {
      lat: 7.3697,
      lng: 12.3547,
      zoom: 6
    },
    "cote_ivoire": {
      lat: 7.5400,
      lng: -5.5471,
      zoom: 7
    },
    "burkina_faso": {
      lat: 12.2383,
      lng: -1.5616,
      zoom: 7
    }
  };

  // Régions du Maroc avec coordonnées
  var moroccoRegions = {
    "casablanca_settat": {
      lat: 33.5731,
      lng: -7.5898,
      name: "Casablanca-Settat"
    },
    "rabat_sale_kenitra": {
      lat: 34.0209,
      lng: -6.8416,
      name: "Rabat-Salé-Kénitra"
    },
    "marrakech_safi": {
      lat: 31.6295,
      lng: -7.9811,
      name: "Marrakech-Safi"
    },
    "fes_meknes": {
      lat: 34.0181,
      lng: -5.0078,
      name: "Fès-Meknès"
    },
    "tanger_tetouan": {
      lat: 35.7595,
      lng: -5.8340,
      name: "Tanger-Tétouan-Al Hoceïma"
    },
    "oriental": {
      lat: 34.6867,
      lng: -1.9114,
      name: "Oriental"
    },
    "beni_mellal": {
      lat: 32.3373,
      lng: -6.3498,
      name: "Béni Mellal-Khénifra"
    },
    "draa_tafilalet": {
      lat: 31.9314,
      lng: -4.4288,
      name: "Drâa-Tafilalet"
    },
    "souss_massa": {
      lat: 30.4278,
      lng: -9.5981,
      name: "Souss-Massa"
    },
    "guelmim_oued_noun": {
      lat: 28.9870,
      lng: -10.0574,
      name: "Guelmim-Oued Noun"
    },
    "laayoune_sakia": {
      lat: 27.1536,
      lng: -13.1990,
      name: "Laâyoune-Sakia El Hamra"
    },
    "dakhla_oued": {
      lat: 23.6847,
      lng: -15.9580,
      name: "Dakhla-Oued Ed-Dahab"
    }
  };

  /**
   * Charge Leaflet depuis CDN
   */
  function loadLeaflet() {
    return new Promise(function (resolve, reject) {
      if (leafletLoaded && window.L) {
        resolve();
        return;
      }

      // Charger le CSS
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(css);

      // Charger le JS
      var script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = function () {
        leafletLoaded = true;
        console.log('[GeoMapEngine] Leaflet chargé');
        resolve();
      };
      script.onerror = function () {
        reject(new Error('Impossible de charger Leaflet'));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Initialise une carte dans un conteneur
   */
  async function initMap(containerId, options) {
    options = options || {};
    await loadLeaflet();
    var country = options.country || 'morocco';
    var coords = countryCoordinates[country] || countryCoordinates.morocco;
    mapInstance = L.map(containerId).setView([coords.lat, coords.lng], options.zoom || coords.zoom);

    // Ajouter la couche de tuiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);
    return mapInstance;
  }

  /**
   * Ajoute un site d'implémentation sur la carte
   */
  function addSite(site, options) {
    options = options || {};
    if (!mapInstance || !window.L) return null;
    var color = options.color || getStatusColor(site.status);
    var icon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color: ' + color + '; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">' + (site.icon || '📍') + '</div>',
      iconSize: [24, 24]
    });
    var marker = L.marker([site.lat, site.lng], {
      icon: icon
    }).addTo(mapInstance);

    // Popup avec informations
    var popupContent = '<div style="min-width: 200px;">' + '<h4 style="margin: 0 0 8px 0; font-weight: bold;">' + site.name + '</h4>' + '<p style="margin: 4px 0; font-size: 12px; color: #666;">' + (site.type || '') + '</p>' + (site.stats ? '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">' + '<p style="margin: 2px 0; font-size: 11px;">👥 ' + (site.stats.beneficiaries || 0) + ' bénéficiaires</p>' + '<p style="margin: 2px 0; font-size: 11px;">📈 ' + (site.stats.adoptionRate || 0) + '% adoption</p>' + '</div>' : '') + '</div>';
    marker.bindPopup(popupContent);
    return marker;
  }

  /**
   * Retourne la couleur selon le statut
   */
  function getStatusColor(status) {
    var colors = {
      'success': '#22C55E',
      'on_track': '#3B82F6',
      'warning': '#F59E0B',
      'critical': '#EF4444',
      'not_started': '#9CA3AF'
    };
    return colors[status] || colors.on_track;
  }

  /**
   * Ajoute plusieurs sites en une fois
   */
  function addSites(sites) {
    var markers = [];
    sites.forEach(function (site) {
      var marker = addSite(site);
      if (marker) markers.push(marker);
    });
    return markers;
  }

  /**
   * Ajoute une zone (cercle) de couverture
   */
  function addCoverageZone(center, radiusKm, options) {
    options = options || {};
    if (!mapInstance || !window.L) return null;
    var circle = L.circle([center.lat, center.lng], {
      radius: radiusKm * 1000,
      color: options.color || '#3B82F6',
      fillColor: options.fillColor || '#3B82F6',
      fillOpacity: options.opacity || 0.2,
      weight: 2
    }).addTo(mapInstance);
    return circle;
  }

  /**
   * Ajoute une heatmap des performances
   */
  function addHeatmapLayer(sites) {
    // Nécessite leaflet.heat plugin - version simplifiée avec cercles
    if (!mapInstance || !window.L) return;
    sites.forEach(function (site) {
      if (!site.intensity) return;
      var color = site.intensity > 0.7 ? '#22C55E' : site.intensity > 0.4 ? '#F59E0B' : '#EF4444';
      L.circle([site.lat, site.lng], {
        radius: site.intensity * 50000,
        color: 'transparent',
        fillColor: color,
        fillOpacity: 0.3
      }).addTo(mapInstance);
    });
  }

  /**
   * Génère des sites de démo pour le Maroc
   */
  function generateDemoSites(country) {
    country = country || 'morocco';
    var sites = [];
    if (country === 'morocco') {
      sites = [{
        id: 'S1',
        name: 'CHU Ibn Sina',
        lat: 34.0209,
        lng: -6.8416,
        type: 'Hôpital universitaire',
        status: 'success',
        stats: {
          beneficiaries: 12500,
          adoptionRate: 85
        }
      }, {
        id: 'S2',
        name: 'Centre de santé Hay Mohammadi',
        lat: 33.5731,
        lng: -7.5898,
        type: 'Centre de santé',
        status: 'on_track',
        stats: {
          beneficiaries: 3200,
          adoptionRate: 72
        }
      }, {
        id: 'S3',
        name: 'Hôpital régional Marrakech',
        lat: 31.6295,
        lng: -7.9811,
        type: 'Hôpital régional',
        status: 'warning',
        stats: {
          beneficiaries: 5800,
          adoptionRate: 58
        }
      }, {
        id: 'S4',
        name: 'Centre rural Ouarzazate',
        lat: 30.9189,
        lng: -6.8936,
        type: 'Centre rural',
        status: 'critical',
        stats: {
          beneficiaries: 890,
          adoptionRate: 35
        }
      }, {
        id: 'S5',
        name: 'CHU Fès',
        lat: 34.0181,
        lng: -5.0078,
        type: 'Hôpital universitaire',
        status: 'success',
        stats: {
          beneficiaries: 9400,
          adoptionRate: 81
        }
      }, {
        id: 'S6',
        name: 'Centre Tanger',
        lat: 35.7595,
        lng: -5.8340,
        type: 'Centre de santé',
        status: 'on_track',
        stats: {
          beneficiaries: 4100,
          adoptionRate: 68
        }
      }, {
        id: 'S7',
        name: 'Dispensaire Errachidia',
        lat: 31.9314,
        lng: -4.4288,
        type: 'Dispensaire rural',
        status: 'warning',
        stats: {
          beneficiaries: 620,
          adoptionRate: 45
        }
      }];
    }
    return sites;
  }

  /**
   * Calcule les statistiques géographiques
   */
  function calculateGeoStats(sites) {
    var stats = {
      totalSites: sites.length,
      totalBeneficiaries: 0,
      avgAdoptionRate: 0,
      byStatus: {
        success: 0,
        on_track: 0,
        warning: 0,
        critical: 0
      },
      urbanVsRural: {
        urban: 0,
        rural: 0
      }
    };
    var adoptionSum = 0;
    sites.forEach(function (site) {
      if (site.stats) {
        stats.totalBeneficiaries += site.stats.beneficiaries || 0;
        adoptionSum += site.stats.adoptionRate || 0;
      }
      stats.byStatus[site.status] = (stats.byStatus[site.status] || 0) + 1;
      var isRural = site.type && (site.type.toLowerCase().indexOf('rural') !== -1 || site.type.toLowerCase().indexOf('dispensaire') !== -1);
      if (isRural) stats.urbanVsRural.rural++;else stats.urbanVsRural.urban++;
    });
    stats.avgAdoptionRate = sites.length > 0 ? Math.round(adoptionSum / sites.length) : 0;
    return stats;
  }

  /**
   * Centre la carte sur un pays
   */
  function centerOnCountry(country) {
    if (!mapInstance) return;
    var coords = countryCoordinates[country];
    if (coords) {
      mapInstance.setView([coords.lat, coords.lng], coords.zoom);
    }
  }

  /**
   * Nettoie la carte
   */
  function clearMap() {
    if (mapInstance) {
      mapInstance.eachLayer(function (layer) {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
          mapInstance.removeLayer(layer);
        }
      });
    }
  }
  return {
    VERSION: '8.5.0',
    loadLeaflet: loadLeaflet,
    initMap: initMap,
    addSite: addSite,
    addSites: addSites,
    addCoverageZone: addCoverageZone,
    addHeatmapLayer: addHeatmapLayer,
    generateDemoSites: generateDemoSites,
    calculateGeoStats: calculateGeoStats,
    centerOnCountry: centerOnCountry,
    clearMap: clearMap,
    getCountryCoordinates: function () {
      return countryCoordinates;
    },
    getMoroccoRegions: function () {
      return moroccoRegions;
    }
  };
}();

export default GeoMapEngine;
