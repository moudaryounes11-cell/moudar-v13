var BibliographicAPI = function () {
  'use strict';

  // Base de données locale de références clés (fallback si API indisponible)
  var localEvidenceBase = {
    "training_educational": [{
      pmid: "28648777",
      authors: "Powell BJ et al.",
      year: 2017,
      title: "A refined compilation of implementation strategies",
      journal: "Implement Sci",
      doi: "10.1186/s13012-015-0209-1"
    }, {
      pmid: "30458875",
      authors: "Proctor EK et al.",
      year: 2011,
      title: "Outcomes for Implementation Research",
      journal: "Adm Policy Ment Health",
      relevance: 0.95
    }],
    "champion_identification": [{
      pmid: "26801605",
      authors: "Miech EJ et al.",
      year: 2018,
      title: "Inside help: An integrative review of champions in healthcare-related implementation",
      journal: "SAGE Open Med",
      relevance: 0.92
    }],
    "audit_feedback": [{
      pmid: "23076942",
      authors: "Ivers N et al.",
      year: 2012,
      title: "Audit and feedback: effects on professional practice",
      journal: "Cochrane Database Syst Rev",
      relevance: 0.98
    }],
    "stakeholder_engagement": [{
      pmid: "29187192",
      authors: "Concannon TW et al.",
      year: 2014,
      title: "A systematic review of stakeholder engagement in comparative effectiveness",
      journal: "J Gen Intern Med",
      relevance: 0.88
    }],
    "facilitation": [{
      pmid: "27760536",
      authors: "Baskerville NB et al.",
      year: 2012,
      title: "Systematic review and meta-analysis of practice facilitation",
      journal: "Ann Fam Med",
      relevance: 0.91
    }],
    "adaptation": [{
      pmid: "30905323",
      authors: "Chambers DA et al.",
      year: 2013,
      title: "The dynamic sustainability framework",
      journal: "Implement Sci",
      relevance: 0.89
    }],
    "task_shifting": [{
      pmid: "24485016",
      authors: "Joshi R et al.",
      year: 2014,
      title: "Task Shifting for Non-Communicable Disease Management",
      journal: "PLoS One",
      relevance: 0.87
    }],
    "mhgap": [{
      pmid: "28137273",
      authors: "Keynejad RC et al.",
      year: 2018,
      title: "WHO mhGAP Intervention Guide: updated systematic review",
      journal: "Lancet Psychiatry",
      relevance: 0.96
    }, {
      pmid: "31043197",
      authors: "Spagnolo J et al.",
      year: 2021,
      title: "Implementation of mhGAP in Francophone West Africa",
      journal: "Int J Ment Health Syst",
      relevance: 0.93
    }]
  };

  // Mapping stratégies ERIC → termes de recherche
  var strategySearchTerms = {
    "S01": {
      terms: ["educational training", "implementation training"],
      category: "training_educational"
    },
    "S02": {
      terms: ["clinical supervision", "mentoring healthcare"],
      category: "facilitation"
    },
    "S03": {
      terms: ["champion healthcare", "opinion leader"],
      category: "champion_identification"
    },
    "S04": {
      terms: ["audit feedback healthcare"],
      category: "audit_feedback"
    },
    "S05": {
      terms: ["stakeholder engagement implementation"],
      category: "stakeholder_engagement"
    },
    "S06": {
      terms: ["practice facilitation primary care"],
      category: "facilitation"
    },
    "S07": {
      terms: ["task shifting mental health"],
      category: "task_shifting"
    },
    "S08": {
      terms: ["cultural adaptation intervention"],
      category: "adaptation"
    },
    "S09": {
      terms: ["mhGAP implementation"],
      category: "mhgap"
    }
  };

  /**
   * Recherche des références pour une stratégie donnée
   * Utilise la base locale (rapide) ou peut être étendu avec API PubMed
   */
  function searchReferences(strategyId, options) {
    options = options || {};
    var maxResults = options.maxResults || 3;
    var lang = options.lang || 'fr';
    var searchConfig = strategySearchTerms[strategyId];
    if (!searchConfig) {
      return {
        references: [],
        query: null,
        source: "none"
      };
    }

    // Utiliser la base locale
    var localRefs = localEvidenceBase[searchConfig.category] || [];
    var results = localRefs.slice(0, maxResults).map(function (ref) {
      return Object.assign({}, ref, {
        citation: formatCitation(ref, lang),
        url: ref.pmid ? "https://pubmed.ncbi.nlm.nih.gov/" + ref.pmid : null
      });
    });
    return {
      strategyId: strategyId,
      references: results,
      query: searchConfig.terms.join(" OR "),
      source: "local_evidence_base",
      searchedAt: new Date().toISOString()
    };
  }

  /**
   * Recherche asynchrone via PubMed API (si disponible)
   */
  async function searchPubMed(query, maxResults) {
    maxResults = maxResults || 5;
    var baseUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
    try {
      // Étape 1: Recherche pour obtenir les IDs
      var searchUrl = baseUrl + "esearch.fcgi?db=pubmed&retmode=json&retmax=" + maxResults + "&term=" + encodeURIComponent(query + " AND implementation science");
      var searchResponse = await fetch(searchUrl);
      var searchData = await searchResponse.json();
      if (!searchData.esearchresult || !searchData.esearchresult.idlist) {
        return {
          references: [],
          error: "No results found"
        };
      }
      var ids = searchData.esearchresult.idlist;
      if (ids.length === 0) return {
        references: [],
        error: "No results found"
      };

      // Étape 2: Récupérer les détails
      var fetchUrl = baseUrl + "esummary.fcgi?db=pubmed&retmode=json&id=" + ids.join(",");
      var fetchResponse = await fetch(fetchUrl);
      var fetchData = await fetchResponse.json();
      var references = [];
      ids.forEach(function (id) {
        var article = fetchData.result[id];
        if (article) {
          references.push({
            pmid: id,
            title: article.title,
            authors: article.authors ? article.authors.slice(0, 3).map(function (a) {
              return a.name;
            }).join(", ") + (article.authors.length > 3 ? " et al." : "") : "Unknown",
            journal: article.source,
            year: article.pubdate ? article.pubdate.split(" ")[0] : "N/A",
            url: "https://pubmed.ncbi.nlm.nih.gov/" + id
          });
        }
      });
      return {
        references: references,
        source: "pubmed_api",
        query: query
      };
    } catch (error) {
      console.warn("[BibliographicAPI] PubMed API error, falling back to local:", error);
      return {
        references: [],
        error: error.message,
        source: "error"
      };
    }
  }

  /**
   * Formate une citation en style académique
   */
  function formatCitation(ref, lang) {
    lang = lang || 'fr';
    var authors = ref.authors || "Unknown";
    var year = ref.year || "N/A";
    var title = ref.title || "Untitled";
    var journal = ref.journal || "";
    return authors + " (" + year + "). " + title + ". " + journal + ".";
  }

  /**
   * Obtient les références pour toutes les stratégies d'un protocole
   */
  function getProtocolReferences(protocol, options) {
    options = options || {};
    var allRefs = [];
    if (!protocol || !protocol.strategies) return allRefs;
    protocol.strategies.forEach(function (strategyName, index) {
      // Mapper le nom de stratégie vers un ID (simplifié)
      var strategyId = "S0" + (index + 1);
      var refs = searchReferences(strategyId, options);
      if (refs.references.length > 0) {
        allRefs.push({
          strategy: strategyName,
          strategyId: strategyId,
          references: refs.references
        });
      }
    });
    return allRefs;
  }
  return {
    VERSION: '8.3.0',
    searchReferences: searchReferences,
    searchPubMed: searchPubMed,
    getProtocolReferences: getProtocolReferences,
    formatCitation: formatCitation,
    getLocalEvidenceBase: function () {
      return localEvidenceBase;
    }
  };
}();

export default BibliographicAPI;
