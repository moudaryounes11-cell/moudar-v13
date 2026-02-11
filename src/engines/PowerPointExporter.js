var PowerPointExporter = function () {
  'use strict';

  var pptxgenjs = null;
  var isReady = false;

  // Thèmes de présentation
  var themes = {
    'professional': {
      name: 'Professionnel',
      colors: {
        primary: '1E3A5F',
        secondary: '2E7D32',
        accent: 'FF6B35',
        text: '333333',
        lightBg: 'F5F7FA',
        darkBg: '1E3A5F'
      },
      fonts: {
        title: 'Helvetica Neue',
        body: 'Helvetica Neue'
      }
    },
    'modern': {
      name: 'Moderne',
      colors: {
        primary: '6366F1',
        secondary: '10B981',
        accent: 'F59E0B',
        text: '1F2937',
        lightBg: 'F9FAFB',
        darkBg: '111827'
      },
      fonts: {
        title: 'Helvetica Neue',
        body: 'Helvetica Neue'
      }
    },
    'health': {
      name: 'Santé',
      colors: {
        primary: '0891B2',
        secondary: '059669',
        accent: 'DC2626',
        text: '1F2937',
        lightBg: 'ECFEFF',
        darkBg: '164E63'
      },
      fonts: {
        title: 'Helvetica Neue',
        body: 'Helvetica Neue'
      }
    },
    'anthropic': {
      name: 'Anthropic',
      colors: {
        primary: 'DA7756',
        secondary: '1A1A2E',
        accent: 'E8DCC4',
        text: '1A1A2E',
        lightBg: 'FDF8F4',
        darkBg: '1A1A2E'
      },
      fonts: {
        title: 'Helvetica Neue',
        body: 'Helvetica Neue'
      }
    }
  };

  /**
   * Charge la bibliothèque PptxGenJS
   */
  function loadPptxGenJS() {
    return new Promise(function (resolve, reject) {
      if (typeof window.PptxGenJS !== 'undefined') {
        pptxgenjs = window.PptxGenJS;
        isReady = true;
        resolve();
        return;
      }
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js';
      script.onload = function () {
        pptxgenjs = window.PptxGenJS;
        isReady = true;
        console.log('[PowerPointExporter] ✅ PptxGenJS chargé');
        resolve();
      };
      script.onerror = function () {
        reject(new Error('Impossible de charger PptxGenJS'));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Initialise l'exporteur
   */
  async function init() {
    try {
      await loadPptxGenJS();
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Crée une présentation complète à partir d'un protocole MOUDAR
   */
  async function createFromProtocol(project, protocol, options) {
    options = options || {};
    var lang = options.lang || 'fr';
    var themeName = options.theme || 'professional';
    var theme = themes[themeName] || themes.professional;
    if (!isReady) {
      await init();
    }
    var pptx = new pptxgenjs();

    // Métadonnées
    pptx.author = 'MOUDAR Platform v8.4';
    pptx.title = project.title || 'Protocole d\'implémentation';
    pptx.subject = 'Protocole généré par MOUDAR';
    pptx.company = project.organization || 'MOUDAR';

    // Layout
    pptx.defineLayout({
      name: 'MOUDAR',
      width: 13.33,
      height: 7.5
    });
    pptx.layout = 'MOUDAR';

    // ═══════════════════════════════════════
    // SLIDE 1: Page de titre
    // ═══════════════════════════════════════
    var slide1 = pptx.addSlide();
    slide1.background = {
      color: theme.colors.darkBg
    };

    // Logo MOUDAR
    slide1.addText('🔬 MOUDAR', {
      x: 0.5,
      y: 0.5,
      w: 3,
      h: 0.6,
      fontSize: 18,
      color: 'FFFFFF',
      fontFace: theme.fonts.title
    });

    // Titre principal
    slide1.addText(project.title || 'Protocole d\'implémentation', {
      x: 0.5,
      y: 2.5,
      w: 12.33,
      h: 1.2,
      fontSize: 36,
      color: 'FFFFFF',
      fontFace: theme.fonts.title,
      bold: true
    });

    // Sous-titre
    slide1.addText(project.organization || '', {
      x: 0.5,
      y: 3.8,
      w: 12.33,
      h: 0.6,
      fontSize: 20,
      color: theme.colors.accent,
      fontFace: theme.fonts.body
    });

    // Phase EPIS
    var phaseLabels = {
      exploration: 'Exploration',
      preparation: 'Préparation',
      implementation: 'Implémentation',
      sustainment: 'Pérennisation'
    };
    slide1.addText('Phase EPIS: ' + (phaseLabels[project.phase] || project.phase || 'Non définie'), {
      x: 0.5,
      y: 5,
      w: 5,
      h: 0.5,
      fontSize: 14,
      color: 'FFFFFF',
      fontFace: theme.fonts.body
    });

    // Date
    slide1.addText(new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }), {
      x: 0.5,
      y: 6.5,
      w: 5,
      h: 0.4,
      fontSize: 12,
      color: 'AAAAAA',
      fontFace: theme.fonts.body
    });

    // Généré par MOUDAR
    slide1.addText('Généré par MOUDAR v8.4 - Intelligence Prescriptive', {
      x: 7,
      y: 6.5,
      w: 5.83,
      h: 0.4,
      fontSize: 10,
      color: 'AAAAAA',
      fontFace: theme.fonts.body,
      align: 'right'
    });

    // ═══════════════════════════════════════
    // SLIDE 2: Contexte et Problématique
    // ═══════════════════════════════════════
    var slide2 = pptx.addSlide();
    addSlideHeader(slide2, lang === 'fr' ? 'Contexte et Problématique' : 'Context and Problem', theme, '1/8');
    slide2.addText(project.context || 'Non renseigné', {
      x: 0.5,
      y: 1.5,
      w: 12.33,
      h: 4,
      fontSize: 14,
      color: theme.colors.text,
      fontFace: theme.fonts.body,
      valign: 'top',
      breakLine: true
    });

    // Encadré population cible
    slide2.addShape(pptxgenjs.shapes.RECTANGLE, {
      x: 0.5,
      y: 5.8,
      w: 6,
      h: 1,
      fill: {
        color: theme.colors.lightBg
      },
      line: {
        color: theme.colors.primary,
        width: 1
      }
    });
    slide2.addText('👥 ' + (lang === 'fr' ? 'Population cible' : 'Target Population') + '\n' + (project.population || 'Non définie'), {
      x: 0.6,
      y: 5.9,
      w: 5.8,
      h: 0.8,
      fontSize: 11,
      color: theme.colors.text,
      fontFace: theme.fonts.body,
      valign: 'middle'
    });

    // ═══════════════════════════════════════
    // SLIDE 3: Barrières Identifiées
    // ═══════════════════════════════════════
    var slide3 = pptx.addSlide();
    addSlideHeader(slide3, lang === 'fr' ? 'Barrières Identifiées' : 'Identified Barriers', theme, '2/8');
    var barriers = project.barriers || project.barrierCategories || [];
    var barrierLabels = {
      "knowledge": "📚 Connaissances / Formation",
      "attitudes": "🧠 Attitudes / Résistance",
      "resources": "💵 Ressources",
      "infrastructure": "🏗️ Infrastructure",
      "leadership": "👔 Leadership",
      "culture": "🌍 Culture / Stigma",
      "policy": "📜 Politiques",
      "coordination": "🔗 Coordination",
      "turnover": "🔄 Turnover",
      "complexity": "🧩 Complexité"
    };
    if (typeof barriers === 'string') {
      slide3.addText(barriers, {
        x: 0.5,
        y: 1.5,
        w: 12.33,
        h: 5,
        fontSize: 14,
        color: theme.colors.text,
        fontFace: theme.fonts.body,
        valign: 'top'
      });
    } else if (Array.isArray(barriers) && barriers.length > 0) {
      var barrierText = barriers.map(function (b) {
        return barrierLabels[b] || b;
      }).join('\n');
      slide3.addText(barrierText, {
        x: 0.5,
        y: 1.5,
        w: 12.33,
        h: 5,
        fontSize: 16,
        color: theme.colors.text,
        fontFace: theme.fonts.body,
        valign: 'top',
        bullet: true
      });
    }

    // ═══════════════════════════════════════
    // SLIDE 4: Stratégies Recommandées
    // ═══════════════════════════════════════
    var slide4 = pptx.addSlide();
    addSlideHeader(slide4, lang === 'fr' ? 'Stratégies Recommandées' : 'Recommended Strategies', theme, '3/8');
    var strategies = protocol.strategies || [];
    if (strategies.length > 0) {
      var strategyText = strategies.slice(0, 8).map(function (s, i) {
        return i + 1 + '. ' + (typeof s === 'string' ? s : s.name || s.label || JSON.stringify(s));
      }).join('\n');
      slide4.addText(strategyText, {
        x: 0.5,
        y: 1.5,
        w: 12.33,
        h: 5,
        fontSize: 14,
        color: theme.colors.text,
        fontFace: theme.fonts.body,
        valign: 'top'
      });
    }

    // Badge confiance
    var confidence = protocol.confidence || protocol.aiConfidence || 0.75;
    slide4.addShape(pptxgenjs.shapes.OVAL, {
      x: 11,
      y: 6,
      w: 1.8,
      h: 0.8,
      fill: {
        color: confidence > 0.7 ? '22C55E' : confidence > 0.5 ? 'EAB308' : 'EF4444'
      }
    });
    slide4.addText(Math.round(confidence * 100) + '%', {
      x: 11,
      y: 6.15,
      w: 1.8,
      h: 0.5,
      fontSize: 14,
      color: 'FFFFFF',
      fontFace: theme.fonts.title,
      bold: true,
      align: 'center'
    });

    // ═══════════════════════════════════════
    // SLIDE 5: Frameworks & Outcomes
    // ═══════════════════════════════════════
    var slide5 = pptx.addSlide();
    addSlideHeader(slide5, 'Frameworks & Outcomes', theme, '4/8');

    // Colonne Frameworks
    slide5.addText('📐 Frameworks', {
      x: 0.5,
      y: 1.5,
      w: 6,
      h: 0.5,
      fontSize: 16,
      color: theme.colors.primary,
      fontFace: theme.fonts.title,
      bold: true
    });
    var frameworks = protocol.frameworks || ['CFIR 2.0', 'EPIS', 'RE-AIM', 'Proctor Outcomes'];
    slide5.addText(frameworks.join('\n'), {
      x: 0.5,
      y: 2.2,
      w: 6,
      h: 3,
      fontSize: 14,
      color: theme.colors.text,
      fontFace: theme.fonts.body,
      bullet: true
    });

    // Colonne Outcomes
    slide5.addText('🎯 Outcomes', {
      x: 6.83,
      y: 1.5,
      w: 6,
      h: 0.5,
      fontSize: 16,
      color: theme.colors.secondary,
      fontFace: theme.fonts.title,
      bold: true
    });
    var outcomes = protocol.outcomes || project.expectedOutcomes || ['Acceptabilité', 'Adoption', 'Fidélité', 'Pérennité'];
    var outcomeLabels = {
      acceptability: 'Acceptabilité',
      adoption: 'Adoption',
      fidelity: 'Fidélité',
      coverage: 'Couverture',
      sustainability: 'Pérennité',
      cost: 'Coût-efficacité'
    };
    var outcomesText = (Array.isArray(outcomes) ? outcomes : [outcomes]).map(function (o) {
      return outcomeLabels[o] || o;
    }).join('\n');
    slide5.addText(outcomesText, {
      x: 6.83,
      y: 2.2,
      w: 6,
      h: 3,
      fontSize: 14,
      color: theme.colors.text,
      fontFace: theme.fonts.body,
      bullet: true
    });

    // ═══════════════════════════════════════
    // SLIDE 6: Timeline EPIS
    // ═══════════════════════════════════════
    var slide6 = pptx.addSlide();
    addSlideHeader(slide6, 'Timeline EPIS', theme, '5/8');
    var phases = [{
      id: 'exploration',
      icon: '🔍',
      name: 'Exploration',
      color: '6366F1'
    }, {
      id: 'preparation',
      icon: '📋',
      name: 'Préparation',
      color: 'F59E0B'
    }, {
      id: 'implementation',
      icon: '⚙️',
      name: 'Implémentation',
      color: '22C55E'
    }, {
      id: 'sustainment',
      icon: '🔄',
      name: 'Pérennisation',
      color: '8B5CF6'
    }];
    var xPos = 0.5;
    phases.forEach(function (phase, idx) {
      var isActive = project.phase === phase.id;

      // Box de phase
      slide6.addShape(pptxgenjs.shapes.RECTANGLE, {
        x: xPos,
        y: 2.5,
        w: 3,
        h: 2,
        fill: {
          color: isActive ? phase.color : 'E5E7EB'
        },
        line: {
          color: phase.color,
          width: isActive ? 3 : 1
        }
      });
      slide6.addText(phase.icon + '\n' + phase.name, {
        x: xPos,
        y: 2.7,
        w: 3,
        h: 1.6,
        fontSize: isActive ? 16 : 14,
        color: isActive ? 'FFFFFF' : '6B7280',
        fontFace: theme.fonts.title,
        align: 'center',
        valign: 'middle',
        bold: isActive
      });

      // Flèche vers la suite
      if (idx < phases.length - 1) {
        slide6.addText('→', {
          x: xPos + 3,
          y: 3.2,
          w: 0.33,
          h: 0.5,
          fontSize: 24,
          color: '9CA3AF',
          align: 'center'
        });
      }
      xPos += 3.33;
    });

    // Durée estimée
    var timelineLabels = {
      '3': '3 mois',
      '6': '6 mois',
      '12': '12 mois',
      '18': '18 mois',
      '24': '24 mois',
      '36': '36 mois'
    };
    slide6.addText('⏱️ ' + (lang === 'fr' ? 'Durée estimée: ' : 'Estimated duration: ') + (timelineLabels[project.timeline] || project.timeline || 'Non définie'), {
      x: 0.5,
      y: 5.5,
      w: 12.33,
      h: 0.5,
      fontSize: 14,
      color: theme.colors.text,
      fontFace: theme.fonts.body
    });

    // ═══════════════════════════════════════
    // SLIDE 7: Analyse de Risque
    // ═══════════════════════════════════════
    var slide7 = pptx.addSlide();
    addSlideHeader(slide7, lang === 'fr' ? 'Analyse des Risques' : 'Risk Analysis', theme, '6/8');

    // Analyse Tornado si disponible
    if (window.SensitivityAnalyzer && project.barriers) {
      var analysis = SensitivityAnalyzer.runTornadoAnalysis(project, lang);
      slide7.addText('🌪️ ' + (lang === 'fr' ? 'Probabilité de succès: ' : 'Success probability: ') + analysis.baseSuccessPercent + '%', {
        x: 0.5,
        y: 1.5,
        w: 12.33,
        h: 0.6,
        fontSize: 18,
        color: analysis.baseSuccessPercent >= 60 ? '22C55E' : analysis.baseSuccessPercent >= 40 ? 'EAB308' : 'EF4444',
        fontFace: theme.fonts.title,
        bold: true
      });

      // Top 5 barrières par impact
      var yPos = 2.3;
      analysis.barriers.slice(0, 5).forEach(function (barrier) {
        var barWidth = Math.min(barrier.percentageGain * 0.4, 10);
        var barColor = barrier.priority === 'critical' ? 'EF4444' : barrier.priority === 'high' ? 'F97316' : barrier.priority === 'medium' ? 'EAB308' : '22C55E';
        slide7.addText(barrier.barrierName, {
          x: 0.5,
          y: yPos,
          w: 3.5,
          h: 0.5,
          fontSize: 11,
          color: theme.colors.text,
          fontFace: theme.fonts.body,
          align: 'right'
        });
        slide7.addShape(pptxgenjs.shapes.RECTANGLE, {
          x: 4.2,
          y: yPos + 0.1,
          w: barWidth,
          h: 0.35,
          fill: {
            color: barColor
          }
        });
        slide7.addText('+' + Math.round(barrier.percentageGain) + '%', {
          x: 4.3 + barWidth,
          y: yPos,
          w: 1,
          h: 0.5,
          fontSize: 10,
          color: barColor,
          fontFace: theme.fonts.body
        });
        yPos += 0.6;
      });
    }

    // ═══════════════════════════════════════
    // SLIDE 8: Prochaines Étapes
    // ═══════════════════════════════════════
    var slide8 = pptx.addSlide();
    addSlideHeader(slide8, lang === 'fr' ? 'Prochaines Étapes' : 'Next Steps', theme, '7/8');
    var nextSteps = [lang === 'fr' ? '1. Valider le protocole avec les parties prenantes clés' : '1. Validate protocol with key stakeholders', lang === 'fr' ? '2. Former l\'équipe projet aux stratégies sélectionnées' : '2. Train project team on selected strategies', lang === 'fr' ? '3. Mettre en place le système de monitoring' : '3. Set up monitoring system', lang === 'fr' ? '4. Lancer la phase pilote' : '4. Launch pilot phase', lang === 'fr' ? '5. Évaluer et ajuster selon les retours' : '5. Evaluate and adjust based on feedback'];
    slide8.addText(nextSteps.join('\n\n'), {
      x: 0.5,
      y: 1.5,
      w: 12.33,
      h: 5,
      fontSize: 16,
      color: theme.colors.text,
      fontFace: theme.fonts.body,
      valign: 'top'
    });

    // ═══════════════════════════════════════
    // SLIDE 9: Contact & Ressources
    // ═══════════════════════════════════════
    var slide9 = pptx.addSlide();
    slide9.background = {
      color: theme.colors.darkBg
    };
    slide9.addText(lang === 'fr' ? 'Merci !' : 'Thank You!', {
      x: 0.5,
      y: 2,
      w: 12.33,
      h: 1,
      fontSize: 44,
      color: 'FFFFFF',
      fontFace: theme.fonts.title,
      bold: true,
      align: 'center'
    });
    slide9.addText(project.organization || '', {
      x: 0.5,
      y: 3.5,
      w: 12.33,
      h: 0.6,
      fontSize: 18,
      color: theme.colors.accent,
      fontFace: theme.fonts.body,
      align: 'center'
    });
    slide9.addText('🔬 MOUDAR Platform v8.4\nIntelligence Prescriptive pour l\'Implémentation', {
      x: 0.5,
      y: 5.5,
      w: 12.33,
      h: 1,
      fontSize: 12,
      color: 'AAAAAA',
      fontFace: theme.fonts.body,
      align: 'center'
    });
    return pptx;
  }

  /**
   * Ajoute un en-tête standard à une slide
   */
  function addSlideHeader(slide, title, theme, pageNum) {
    // Bande de titre
    slide.addShape(pptxgenjs.shapes ? pptxgenjs.shapes.RECTANGLE : 'rect', {
      x: 0,
      y: 0,
      w: 13.33,
      h: 1.2,
      fill: {
        color: theme.colors.primary
      }
    });
    slide.addText(title, {
      x: 0.5,
      y: 0.35,
      w: 10,
      h: 0.5,
      fontSize: 24,
      color: 'FFFFFF',
      fontFace: theme.fonts.title,
      bold: true
    });

    // Numéro de page
    if (pageNum) {
      slide.addText(pageNum, {
        x: 12,
        y: 0.4,
        w: 1,
        h: 0.4,
        fontSize: 12,
        color: 'FFFFFF',
        fontFace: theme.fonts.body,
        align: 'right'
      });
    }

    // Logo MOUDAR petit
    slide.addText('🔬', {
      x: 12.5,
      y: 6.8,
      w: 0.5,
      h: 0.5,
      fontSize: 16
    });
  }

  /**
   * Exporte la présentation
   */
  async function exportPPTX(project, protocol, options) {
    options = options || {};
    try {
      var pptx = await createFromProtocol(project, protocol, options);
      var filename = options.filename || 'MOUDAR_Protocol_' + (project.title || 'Export').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30) + '.pptx';
      await pptx.writeFile({
        fileName: filename
      });
      console.log('[PowerPointExporter] ✅ Présentation exportée:', filename);
      return {
        success: true,
        filename: filename,
        slides: 9
      };
    } catch (error) {
      console.error('[PowerPointExporter] Erreur export:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Génère un aperçu de la présentation (HTML)
   */
  function generatePreview(project, protocol, options) {
    options = options || {};
    var lang = options.lang || 'fr';
    var themeName = options.theme || 'professional';
    var theme = themes[themeName] || themes.professional;
    var slides = [{
      title: project.title,
      type: 'title'
    }, {
      title: lang === 'fr' ? 'Contexte' : 'Context',
      content: (project.context || '').substring(0, 100) + '...'
    }, {
      title: lang === 'fr' ? 'Barrières' : 'Barriers',
      content: Array.isArray(project.barrierCategories) ? project.barrierCategories.length + ' identifiées' : 'Texte libre'
    }, {
      title: lang === 'fr' ? 'Stratégies' : 'Strategies',
      content: (protocol.strategies || []).length + ' recommandées'
    }, {
      title: 'Frameworks',
      content: (protocol.frameworks || []).join(', ')
    }, {
      title: 'Timeline EPIS',
      content: 'Phase: ' + (project.phase || 'N/A')
    }, {
      title: lang === 'fr' ? 'Risques' : 'Risks',
      content: 'Analyse Tornado'
    }, {
      title: lang === 'fr' ? 'Prochaines étapes' : 'Next steps',
      content: '5 actions'
    }, {
      title: lang === 'fr' ? 'Merci' : 'Thank You',
      type: 'end'
    }];
    return {
      slides: slides,
      theme: theme,
      totalSlides: slides.length
    };
  }
  return {
    VERSION: '8.4.0',
    init: init,
    createFromProtocol: createFromProtocol,
    exportPPTX: exportPPTX,
    generatePreview: generatePreview,
    getThemes: function () {
      return themes;
    },
    isReady: function () {
      return isReady;
    }
  };
}();

export default PowerPointExporter;
