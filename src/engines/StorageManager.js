var StorageManager = {
  getProjects: function () {
    try {
      return JSON.parse(localStorage.getItem("moudar_projects") || "[]");
    } catch (e) {
      return [];
    }
  },
  saveProject: function (project) {
    var projects = this.getProjects();
    var idx = projects.findIndex(function (p) {
      return p.id === project.id;
    });
    var now = new Date().toISOString();
    var finalProject;
    if (idx >= 0) {
      finalProject = Object.assign({}, projects[idx], project, {
        updatedAt: now
      });
      projects[idx] = finalProject;
    } else {
      finalProject = Object.assign({}, project, {
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
        status: "draft"
      });
      projects.push(finalProject);
    }
    localStorage.setItem("moudar_projects", JSON.stringify(projects));
    try {
      if (window.moudarSyncProjectToSupabase) window.moudarSyncProjectToSupabase(finalProject);
    } catch (e) {
      console.warn("[MOUDAR] Sync Supabase échouée (non bloquant)", e);
    }
    return finalProject;
  },
  deleteProject: function (id) {
    var projects = this.getProjects().filter(function (p) {
      return p.id !== id;
    });
    localStorage.setItem("moudar_projects", JSON.stringify(projects));
    return projects;
  },
  updateProjectStatus: function (id, status) {
    var projects = this.getProjects();
    var idx = projects.findIndex(function (p) {
      return p.id === id;
    });
    if (idx >= 0) {
      projects[idx].status = status;
      projects[idx].updatedAt = new Date().toISOString();
      localStorage.setItem("moudar_projects", JSON.stringify(projects));
    }
    return projects;
  },
  attachDiagnostic: function (projectId, diagnosticResults) {
    var projects = this.getProjects();
    var idx = projects.findIndex(function (p) {
      return p.id === projectId;
    });
    if (idx >= 0) {
      projects[idx].diagnostic = {
        scores: diagnosticResults.scores,
        global: diagnosticResults.global,
        strengths: diagnosticResults.strengths,
        watchpoints: diagnosticResults.watchpoints,
        priorities: diagnosticResults.priorities,
        date: new Date().toISOString()
      };
      projects[idx].status = "diagnosed";
      projects[idx].updatedAt = new Date().toISOString();
      localStorage.setItem("moudar_projects", JSON.stringify(projects));
    }
    return projects;
  },
  getProject: function (id) {
    return this.getProjects().find(function (p) {
      return p.id === id;
    });
  },
  // Dupliquer un projet existant
  duplicateProject: function (id) {
    var original = this.getProject(id);
    if (!original) return null;
    var now = new Date().toISOString();
    var duplicate = Object.assign({}, JSON.parse(JSON.stringify(original)), {
      id: Date.now().toString(),
      title: original.title + " (copie)",
      createdAt: now,
      updatedAt: now,
      status: "draft",
      diagnostic: null,
      // Réinitialiser le diagnostic
      aiProtocol: null // Réinitialiser le protocole IA
    });
    var projects = this.getProjects();
    projects.push(duplicate);
    localStorage.setItem("moudar_projects", JSON.stringify(projects));
    return duplicate;
  },
  // Exporter un projet en JSON
  exportProject: function (id, format) {
    var project = this.getProject(id);
    if (!project) return null;
    var exportData = {
      exportedAt: new Date().toISOString(),
      exportFormat: format || 'json',
      moudarVersion: (window.MoudarEngine || {}).VERSION,
      project: project,
      metadata: {
        domain: project.domain,
        phase: project.phase,
        status: project.status,
        hasDiagnostic: !!project.diagnostic,
        hasAIProtocol: !!project.aiProtocol
      }
    };
    if (format === 'csv') {
      // Format CSV pour recherche
      var csvLines = ['field,value', 'id,' + project.id, 'title,"' + (project.title || '').replace(/"/g, '""') + '"', 'domain,' + (project.domain || ''), 'phase,' + (project.phase || ''), 'status,' + (project.status || ''), 'createdAt,' + (project.createdAt || ''), 'updatedAt,' + (project.updatedAt || '')];
      if (project.diagnostic) {
        csvLines.push('diagnostic_global,' + (project.diagnostic.global || ''));
        Object.keys(project.diagnostic.scores || {}).forEach(function (key) {
          csvLines.push('score_' + key + ',' + project.diagnostic.scores[key]);
        });
      }
      if (project.aiProtocol && project.aiProtocol.strategies) {
        project.aiProtocol.strategies.forEach(function (s, i) {
          csvLines.push('strategy_' + (i + 1) + ',"' + (s.name || s.id) + '"');
        });
      }
      return csvLines.join('\n');
    }
    return JSON.stringify(exportData, null, 2);
  },
  // Exporter tous les projets (pour backup ou recherche)
  exportAllProjects: function (format) {
    var projects = this.getProjects();
    var exportData = {
      exportedAt: new Date().toISOString(),
      moudarVersion: (window.MoudarEngine || {}).VERSION,
      totalProjects: projects.length,
      projects: projects
    };
    if (format === 'csv') {
      var headers = ['id', 'title', 'domain', 'phase', 'status', 'createdAt', 'hasDiagnostic', 'diagnosticScore'];
      var csvLines = [headers.join(',')];
      projects.forEach(function (p) {
        csvLines.push([p.id, '"' + (p.title || '').replace(/"/g, '""') + '"', p.domain || '', p.phase || '', p.status || '', p.createdAt || '', p.diagnostic ? 'true' : 'false', p.diagnostic ? p.diagnostic.global || '' : ''].join(','));
      });
      return csvLines.join('\n');
    }
    return JSON.stringify(exportData, null, 2);
  },
  // Statistiques des projets
  getProjectStats: function () {
    var projects = this.getProjects();
    var stats = {
      total: projects.length,
      byStatus: {
        draft: 0,
        protocol: 0,
        diagnosed: 0
      },
      byDomain: {},
      withDiagnostic: 0,
      withAIProtocol: 0,
      avgDiagnosticScore: 0,
      recentActivity: null
    };
    var diagScores = [];
    projects.forEach(function (p) {
      stats.byStatus[p.status] = (stats.byStatus[p.status] || 0) + 1;
      stats.byDomain[p.domain] = (stats.byDomain[p.domain] || 0) + 1;
      if (p.diagnostic) {
        stats.withDiagnostic++;
        if (p.diagnostic.global) diagScores.push(p.diagnostic.global);
      }
      if (p.aiProtocol) stats.withAIProtocol++;
    });
    if (diagScores.length > 0) {
      stats.avgDiagnosticScore = (diagScores.reduce(function (a, b) {
        return a + b;
      }, 0) / diagScores.length).toFixed(1);
    }
    if (projects.length > 0) {
      var sorted = projects.sort(function (a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      stats.recentActivity = sorted[0].updatedAt;
    }
    return stats;
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// MOUDAR v8.1 - NOUVEAUX MODULES D'AMÉLIORATION
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
// 1. MOUDAR DATA MANAGER - Export/Import robuste avec format .moudar
// ─────────────────────────────────────────────────────────────────────────
export default StorageManager;
