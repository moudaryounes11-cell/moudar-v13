var DeepAIAnalyzer = {
  VERSION: '11.0.0',
  MODEL: 'claude-sonnet-4-20250514',
  MAX_TOKENS: 4096,
  systemPrompts: {
    protocol: {
      fr: 'Tu es un expert mondial en Science de l\'Implémentation. Tu connais CFIR 2.0 (Damschroder 2022, 39 construits), RE-AIM (Glasgow 2019), 73 stratégies ERIC (Powell 2015), 8 outcomes Proctor (2011), NPT (May 2009), FRAME (Stirman 2019), StaRI (Pinnock 2017), SMART (Almirall 2014). Identifie forces, faiblesses, gaps critiques avec références exactes.',
      en: 'You are a world-class Implementation Science expert. You know CFIR 2.0 (Damschroder 2022, 39 constructs), RE-AIM (Glasgow 2019), 73 ERIC strategies (Powell 2015), 8 Proctor outcomes (2011), NPT (May 2009), FRAME (Stirman 2019), StaRI (Pinnock 2017), SMART (Almirall 2014). Identify strengths, weaknesses, critical gaps with exact references.'
    },
    grantReview: {
      fr: 'Tu es évaluateur expert de subventions IS (NIH/Fonds Mondial/Wellcome Trust). Évalue cadre théorique, design, outcomes Proctor, équité, pérennité, budget. Donne un score de finançabilité.',
      en: 'You are an expert IS grant reviewer (NIH/Global Fund/Wellcome Trust). Evaluate framework, design, Proctor outcomes, equity, sustainability, budget. Provide fundability score.'
    },
    manuscriptReview: {
      fr: 'Tu es reviewer pour Implementation Science journal/BMJ. Évalue conformité StaRI (Pinnock 2017), rigueur méthodologique, transparence du reporting.',
      en: 'You are a reviewer for Implementation Science journal/BMJ. Assess StaRI compliance (Pinnock 2017), methodological rigor, reporting transparency.'
    },
    barrierScan: {
      fr: 'Tu es expert en analyse de barrières/facilitateurs IS. Mappe chaque barrière sur les 39 construits CFIR 2.0 et recommande des stratégies ERIC (Waltz 2019).',
      en: 'You are an expert in IS barrier/facilitator analysis. Map each barrier to 39 CFIR 2.0 constructs and recommend ERIC strategies (Waltz 2019).'
    },
    sectionGen: {
      fr: 'Tu es expert en rédaction scientifique IS. Génère des sections selon StaRI (Pinnock 2017) avec références exactes.',
      en: 'You are an expert IS scientific writer. Generate sections per StaRI (Pinnock 2017) with exact references.'
    }
  },
  generableSections: {
    theoreticalFramework: {
      label: {
        fr: 'Cadre théorique (CFIR 2.0 + RE-AIM)',
        en: 'Theoretical framework (CFIR 2.0 + RE-AIM)'
      },
      stariRef: 'ST08'
    },
    implementationStrategies: {
      label: {
        fr: 'Stratégies ERIC',
        en: 'ERIC Strategies'
      },
      stariRef: 'ST10'
    },
    implementationOutcomes: {
      label: {
        fr: 'Outcomes Proctor',
        en: 'Proctor Outcomes'
      },
      stariRef: 'ST11'
    },
    contextDescription: {
      label: {
        fr: 'Description du contexte',
        en: 'Context description'
      },
      stariRef: 'ST07'
    },
    equityPlan: {
      label: {
        fr: 'Plan d\'équité',
        en: 'Equity plan'
      },
      stariRef: 'N/A'
    },
    sustainabilityPlan: {
      label: {
        fr: 'Plan de pérennité',
        en: 'Sustainability plan'
      },
      stariRef: 'ST23'
    },
    adaptationMonitoring: {
      label: {
        fr: 'Suivi des adaptations (FRAME)',
        en: 'Adaptation monitoring (FRAME)'
      },
      stariRef: 'ST17'
    },
    analysisMethodology: {
      label: {
        fr: 'Méthodologie d\'analyse',
        en: 'Analysis methodology'
      },
      stariRef: 'ST14'
    }
  },
  callAPI: function (systemPrompt, userPrompt, onSuccess, onError) {
    // ── SECURITY: Never call LLM APIs directly from browser ──
    // In production, route through YOUR backend proxy:
    //   var PROXY_URL = 'https://your-domain.com/api/llm-proxy';
    // The proxy holds the API key server-side and forwards the request.
    // For local demo, we use the configured MOUDAR_API endpoint.
    var proxyUrl = (window.MOUDAR_LLM_PROXY || '').trim();
    if (!proxyUrl) {
      // Fallback: check if user configured a proxy
      proxyUrl = (localStorage.getItem('MOUDAR_LLM_PROXY') || '').trim();
    }
    if (!proxyUrl) {
      var msg = 'LLM Proxy non configuré. En production, configurez window.MOUDAR_LLM_PROXY = "https://votre-proxy.com/api/llm"';
      console.warn('[MOUDAR Security] ' + msg);
      if (onError) onError(new Error(msg));
      return;
    }
    fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.MODEL,
        max_tokens: this.MAX_TOKENS,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: userPrompt
        }]
      })
    }).then(function (r) {
      if (!r.ok) throw new Error('API Error: ' + r.status);
      return r.json();
    }).then(function (data) {
      var text = data.content.map(function (c) {
        return c.text || '';
      }).join('\n');
      onSuccess(text);
    }).catch(function (err) {
      console.error('[MOUDAR DeepAI]', err);
      if (onError) onError(err);
    });
  },
  analyzeDeep: function (text, mode, lang, onSuccess, onError) {
    var sys = this.systemPrompts[mode] ? this.systemPrompts[mode][lang] || this.systemPrompts[mode].en : this.systemPrompts.protocol[lang];
    var prompt = (lang === 'fr' ? 'Analyse ce protocole IS. Réponds en JSON: ' : 'Analyze this IS protocol. Respond in JSON: ') + '{"globalScore":(0-100),"publishabilityScore":(0-100),"fundabilityScore":(0-100),' + '"cfirCoverage":{"score":0,"coveredConstructs":[],"missingCritical":[],"analysis":""},' + '"reaimCoverage":{"score":0,"dimensions":{}},' + '"stariCompliance":{"score":0,"compliantItems":[],"missingItems":[]},' + '"equityAnalysis":{"present":false,"dimensions":[],"gaps":[]},' + '"designQuality":{"type":"","score":0,"strengths":[],"weaknesses":[]},' + '"outcomesAssessment":{"implementationOutcomes":[],"missingProctorOutcomes":[]},' + '"strategiesIdentified":[{"name":"","ericCode":"","cfirTargets":[]}],' + '"strengths":[{"item":"","reference":""}],' + '"criticalGaps":[{"gap":"","severity":"","recommendation":"","reference":"","moudarModule":""}],' + '"recommendations":[{"priority":1,"action":"","reference":"","moudarModule":""}],' + '"executiveSummary":""}\n\nTexte:\n' + text;
    this.callAPI(sys, prompt, function (raw) {
      try {
        var clean = raw.replace(/```json|```/g, '').trim();
        var parsed = JSON.parse(clean);
        parsed._source = 'deep_ai';
        parsed._model = 'claude-sonnet-4-20250514';
        parsed._timestamp = new Date().toISOString();
        onSuccess(parsed);
      } catch (e) {
        onSuccess({
          _source: 'deep_ai',
          _rawText: raw,
          _parseError: true,
          executiveSummary: raw.substring(0, 500),
          globalScore: 0,
          _timestamp: new Date().toISOString()
        });
      }
    }, onError);
  },
  generateSection: function (sectionType, context, lang, onSuccess, onError) {
    var sys = this.systemPrompts.sectionGen[lang] || this.systemPrompts.sectionGen.en;
    var prompt = (lang === 'fr' ? 'Génère la section "' : 'Generate the "') + sectionType + (lang === 'fr' ? '" selon StaRI. Contexte:\n' : '" per StaRI. Context:\n') + context;
    this.callAPI(sys, prompt, onSuccess, onError);
  },
  compareProtocols: function (text1, text2, lang, onSuccess, onError) {
    var sys = this.systemPrompts.protocol[lang] || this.systemPrompts.protocol.en;
    var prompt = (lang === 'fr' ? 'Compare ces 2 protocoles IS. JSON: {"protocol1Score":0,"protocol2Score":0,"comparativeStrengths":{},"comparativeWeaknesses":{},"recommendation":"","synthesis":""}\n\nPROTOCOLE 1:\n' : 'Compare these 2 IS protocols. JSON: {"protocol1Score":0,"protocol2Score":0,"comparativeStrengths":{},"comparativeWeaknesses":{},"recommendation":"","synthesis":""}\n\nPROTOCOL 1:\n') + text1 + '\n\nPROTOCOL 2:\n' + text2;
    this.callAPI(sys, prompt, function (raw) {
      try {
        var p = JSON.parse(raw.replace(/```json|```/g, '').trim());
        p._source = 'compare';
        onSuccess(p);
      } catch (e) {
        onSuccess({
          _rawText: raw,
          _parseError: true
        });
      }
    }, onError);
  }
};
console.log('✅ MOUDAR v11.0: DeepAIAnalyzer loaded — LLM-Powered Research Copilot (Anthropic API)');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE C1: IMPLEMENTATION SCIENCE ONTOLOGY ENGINE
// Formal knowledge graph connecting all IS frameworks, strategies & outcomes
// Creates an unreplicable structured knowledge base
// ═══════════════════════════════════════════════════════════════════════════

export default DeepAIAnalyzer;
