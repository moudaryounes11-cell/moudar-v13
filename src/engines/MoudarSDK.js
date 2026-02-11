var MoudarSDK = {
  VERSION: '11.0.0',
  API_VERSION: 'v1',
  BASE_URL: 'https://api.moudar.org/v1',
  // API endpoint documentation
  endpoints: {
    // CFIR 2.0
    'POST /cfir/evaluate': {
      description: 'Evaluate a project against CFIR 2.0 (39 constructs)',
      params: ['project_data (JSON)', 'version: 1.0|2.0'],
      returns: 'CFIR evaluation with scores, gaps, ERIC recommendations',
      auth: 'API key'
    },
    'GET /cfir/constructs': {
      description: 'List all 39 CFIR 2.0 constructs with metadata',
      params: ['domain (optional)', 'lang: fr|en'],
      returns: 'Array of constructs',
      auth: 'none'
    },
    'GET /cfir/construct/{id}': {
      description: 'Get single construct details + ERIC mapping',
      params: ['id: IC1-PR5'],
      returns: 'Construct with ERIC recommendations (Waltz 2019)',
      auth: 'none'
    },
    // RE-AIM
    'POST /reaim/evaluate': {
      description: 'Evaluate against RE-AIM framework',
      params: ['project_data (JSON)'],
      returns: 'RE-AIM scores per dimension',
      auth: 'API key'
    },
    // Proctor Outcomes
    'POST /proctor/evaluate': {
      description: 'Evaluate 8 implementation outcomes (Proctor 2011)',
      params: ['outcome_scores (JSON)'],
      returns: 'Outcomes evaluation + instrument recommendations',
      auth: 'API key'
    },
    // NPT
    'POST /npt/evaluate': {
      description: 'Evaluate NPT normalization (May & Finch 2009)',
      params: ['npt_scores (JSON)'],
      returns: 'Normalization assessment (16 dimensions)',
      auth: 'API key'
    },
    // FRAME
    'POST /frame/adaptation': {
      description: 'Document an adaptation (Stirman 2019)',
      params: ['adaptation_data (JSON)'],
      returns: 'FRAME record + fidelity impact',
      auth: 'API key'
    },
    'GET /frame/adaptations/{project_id}': {
      description: 'List all adaptations for a project',
      params: [],
      returns: 'Timeline + fidelity score',
      auth: 'API key'
    },
    // SMART Design
    'POST /smart/design': {
      description: 'Create SMART adaptive design',
      params: ['config (JSON)'],
      returns: 'Design + decision rules + DTRs',
      auth: 'API key'
    },
    'POST /smart/simulate': {
      description: 'Monte Carlo simulation of SMART outcomes',
      params: ['design_id', 'n_simulations'],
      returns: 'DTR rankings + statistics',
      auth: 'API key'
    },
    // Protocol Analyzer
    'POST /analyze/protocol': {
      description: 'NLP + AI analysis of IS protocol',
      params: ['text (string)', 'mode: protocol|grant|manuscript|barriers', 'engine: nlp|deep|both'],
      returns: 'Multi-framework analysis + gaps + recommendations',
      auth: 'API key'
    },
    'POST /analyze/compare': {
      description: 'Compare two protocols',
      params: ['text1', 'text2'],
      returns: 'Comparative analysis',
      auth: 'API key'
    },
    'POST /generate/section': {
      description: 'Generate protocol section via AI',
      params: ['section_type', 'context'],
      returns: 'StaRI-compliant section text',
      auth: 'API key'
    },
    // Ontology
    'GET /ontology/frameworks': {
      description: 'List all registered IS frameworks',
      params: ['type (optional)'],
      returns: 'Framework metadata + DOIs',
      auth: 'none'
    },
    'GET /ontology/query': {
      description: 'Query the IS ontology',
      params: ['construct', 'strategy', 'outcome'],
      returns: 'Relationships + causal mechanisms',
      auth: 'none'
    },
    'GET /ontology/export': {
      description: 'Export ontology as JSON-LD',
      params: [],
      returns: 'JSON-LD formatted ontology',
      auth: 'none'
    },
    // Evidence Repository
    'GET /evidence/search': {
      description: 'Search implementation cases',
      params: ['country', 'setting', 'framework', 'strategy', 'tag'],
      returns: 'Matching cases',
      auth: 'API key'
    },
    'POST /evidence/case': {
      description: 'Contribute a new case',
      params: ['case_data (JSON)'],
      returns: 'Created case (anonymized)',
      auth: 'API key'
    },
    'GET /evidence/recommendations': {
      description: 'Get pattern-based recommendations',
      params: ['context (JSON)'],
      returns: 'Similar cases + recommended strategies',
      auth: 'API key'
    },
    'GET /evidence/stats': {
      description: 'Repository statistics',
      params: [],
      returns: 'Case counts, countries, framework usage',
      auth: 'none'
    },
    // Export
    'GET /export/r': {
      description: 'Export project data for R analysis',
      params: ['project_id', 'format: csv|rds'],
      returns: 'R-compatible data file',
      auth: 'API key'
    },
    'GET /export/python': {
      description: 'Export for Python/Jupyter',
      params: ['project_id', 'format: csv|json|parquet'],
      returns: 'Python-compatible data',
      auth: 'API key'
    },
    'GET /export/stata': {
      description: 'Export for Stata',
      params: ['project_id'],
      returns: '.dta file',
      auth: 'API key'
    },
    'GET /export/redcap': {
      description: 'Export REDCap data dictionary',
      params: ['project_id'],
      returns: 'REDCap-compatible CSV',
      auth: 'API key'
    },
    'GET /export/dhis2': {
      description: 'Export DHIS2 metadata package',
      params: ['project_id'],
      returns: 'DHIS2 JSON package',
      auth: 'API key'
    }
  },
  // SDK code samples for each language
  codeSamples: {
    r: {
      install: '# install.packages("moudar")\nlibrary(moudar)\nmoudar_auth("YOUR_API_KEY")',
      evaluate: '# Evaluate CFIR 2.0\nresult <- moudar_cfir_evaluate(project_data)\nprint(result$global_score)\nplot(result$domain_scores)',
      export: '# Export for analysis\ndf <- moudar_export(project_id, format = "rds")\nlibrary(ggplot2)\nggplot(df, aes(x = construct, y = score)) + geom_col()',
      evidence: '# Search evidence repository\ncases <- moudar_evidence_search(country = "Morocco", framework = "CFIR")\nrecs <- moudar_recommendations(my_context)'
    },
    python: {
      install: '# pip install moudar\nimport moudar\nclient = moudar.Client(api_key="YOUR_API_KEY")',
      evaluate: '# Evaluate CFIR 2.0\nresult = client.cfir.evaluate(project_data)\nprint(f"Global score: {result.global_score}%")\nresult.plot_domains()',
      export: '# Export for Jupyter\nimport pandas as pd\ndf = client.export(project_id, format="parquet")\ndf.describe()',
      evidence: '# Pattern-based recommendations\ncases = client.evidence.search(country="Morocco")\nrecs = client.evidence.recommendations(my_context)\nprint(recs.recommended_strategies)'
    },
    stata: {
      install: '* net install moudar, from("https://moudar.org/stata")',
      evaluate: '* Evaluate CFIR 2.0\nmoudar_cfir project_data.dta\nlist cfir_score domain_score',
      export: '* Export from MOUDAR\nmoudar_export project_id, format(dta)\ndescribe'
    },
    redcap: {
      description: 'REDCap Integration: MOUDAR generates REDCap-compatible data dictionaries for implementation outcome data collection. Fields map directly to Proctor outcomes (2011) and CFIR 2.0 constructs.',
      fields: ['record_id', 'cfir_ic1_score', 'cfir_ic2_score', '... (39 CFIR fields)', 'proctor_acceptability', 'proctor_adoption', '... (8 Proctor fields)', 'reaim_reach', '... (5 RE-AIM fields)']
    },
    dhis2: {
      description: 'DHIS2 Integration: Export MOUDAR implementation indicators as DHIS2 metadata packages for national health information systems. Compatible with WHO Digital Health Atlas.',
      dataElements: ['IS_adoption_rate', 'IS_fidelity_score', 'IS_penetration_rate', 'IS_sustainability_index']
    }
  },
  // Generate API documentation
  generateDocs: function (lang) {
    var t = function (fr, en) {
      return lang === 'fr' ? fr : en;
    };
    var docs = {
      title: 'MOUDAR® API & SDK v' + this.API_VERSION,
      baseUrl: this.BASE_URL,
      authentication: t('Clé API dans le header: Authorization: Bearer YOUR_API_KEY', 'API key in header: Authorization: Bearer YOUR_API_KEY'),
      rateLimit: '1000 requests/hour',
      endpoints: this.endpoints,
      sdkLanguages: Object.keys(this.codeSamples),
      totalEndpoints: Object.keys(this.endpoints).length,
      citation: 'MOUDAR® v' + this.VERSION + ' — Younes MOUDAR (2025)'
    };
    return docs;
  },
  // Simulate API call (for demo)
  mockCall: function (endpoint, params) {
    var ep = this.endpoints[endpoint];
    if (!ep) return {
      error: 'Endpoint not found',
      available: Object.keys(this.endpoints)
    };
    return {
      endpoint: endpoint,
      description: ep.description,
      params: params || {},
      status: 200,
      mock: true,
      note: 'This is a simulated response. Deploy MOUDAR API server for production use.',
      timestamp: new Date().toISOString()
    };
  }
};
console.log('✅ MOUDAR v11.0: MoudarSDK loaded — ' + Object.keys(MoudarSDK.endpoints).length + ' API endpoints, ' + Object.keys(MoudarSDK.codeSamples).length + ' SDK languages');

// ═══════════════════════════════════════════════════════════════════════════
// v11.0 MODULE D1: CFIR 2.0 USER GUIDE ENGINE
// Operationalizes Reardon et al. (2025) Implementation Science 20:39
// First tool in the world to digitalize the official CFIR User Guide
// ═══════════════════════════════════════════════════════════════════════════

export default MoudarSDK;
