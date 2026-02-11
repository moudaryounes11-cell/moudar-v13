var MoudarDataManager = {
  VERSION: '1.0.0',
  FILE_EXTENSION: '.moudar',
  MAGIC_HEADER: 'MOUDAR_PROJECT_V1',
  generateChecksum: function (data) {
    var str = JSON.stringify(data);
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  },
  encodeData: function (data) {
    try {
      var jsonStr = JSON.stringify(data);
      return btoa(unescape(encodeURIComponent(jsonStr)));
    } catch (e) {
      return null;
    }
  },
  decodeData: function (encoded) {
    try {
      var jsonStr = decodeURIComponent(escape(atob(encoded)));
      return JSON.parse(jsonStr);
    } catch (e) {
      return null;
    }
  },
  exportProject: function (project, options) {
    options = options || {};
    var exportPackage = {
      header: this.MAGIC_HEADER,
      version: this.VERSION,
      exportedAt: new Date().toISOString(),
      moudarVersion: window.MoudarEngine.VERSION || '8.1',
      projectData: project,
      metadata: {
        title: project.title || 'Sans titre',
        domain: project.domain || null,
        phase: project.phase || null,
        status: project.status || 'draft',
        hasDiagnostic: !!project.diagnostic,
        hasProtocol: !!project.protocol || !!project.aiProtocol,
        strategiesCount: project.protocol && project.protocol.strategies ? project.protocol.strategies.length : 0
      }
    };
    exportPackage.checksum = this.generateChecksum(exportPackage.projectData);
    return {
      format: 'json',
      data: JSON.stringify(exportPackage, null, 2),
      filename: this.sanitizeFilename(project.title) + this.FILE_EXTENSION
    };
  },
  exportAllProjects: function (options) {
    options = options || {};
    var projects = window.StorageManager.getProjects();
    var exportPackage = {
      header: this.MAGIC_HEADER + '_BACKUP',
      version: this.VERSION,
      exportedAt: new Date().toISOString(),
      moudarVersion: window.MoudarEngine.VERSION || '8.1',
      totalProjects: projects.length,
      projects: projects,
      settings: {
        lang: localStorage.getItem('moudar_lang') || 'fr',
        theme: localStorage.getItem('moudar_theme') || 'light'
      },
      learningData: {
        feedback: JSON.parse(localStorage.getItem('moudar_feedback') || '[]'),
        learningState: JSON.parse(localStorage.getItem('moudar_learning_state') || 'null')
      }
    };
    exportPackage.checksum = this.generateChecksum(exportPackage.projects);
    return {
      format: 'json',
      data: JSON.stringify(exportPackage, null, 2),
      filename: 'MOUDAR_BACKUP_' + new Date().toISOString().split('T')[0] + this.FILE_EXTENSION
    };
  },
  importProject: function (fileContent, options) {
    options = options || {};
    var result = {
      success: false,
      project: null,
      error: null,
      warnings: []
    };
    try {
      var data;
      try {
        data = JSON.parse(fileContent);
      } catch (e) {
        data = this.decodeData(fileContent);
        if (!data) {
          result.error = 'Format de fichier invalide';
          return result;
        }
      }
      if (!data.header || !data.header.startsWith('MOUDAR_PROJECT')) {
        result.error = 'Ce fichier n\'est pas un projet MOUDAR valide';
        return result;
      }
      if (data.checksum) {
        var computedChecksum = this.generateChecksum(data.projectData || data.projects);
        if (computedChecksum !== data.checksum) {
          result.warnings.push('Le fichier semble avoir été modifié.');
        }
      }
      if (data.projectData) {
        var project = data.projectData;
        if (options.generateNewId || window.StorageManager.getProject(project.id)) {
          project.id = Date.now().toString();
          project.title = project.title + ' (importé)';
        }
        project.importedAt = new Date().toISOString();
        var saved = window.StorageManager.saveProject(project);
        result.success = true;
        result.project = saved;
        result.isBackup = false;
      } else if (data.projects && Array.isArray(data.projects)) {
        var importedCount = 0;
        data.projects.forEach(function (project) {
          if (options.skipExisting && window.StorageManager.getProject(project.id)) return;
          if (options.generateNewIds || window.StorageManager.getProject(project.id)) {
            project.id = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 5);
          }
          project.importedAt = new Date().toISOString();
          window.StorageManager.saveProject(project);
          importedCount++;
        });
        if (data.settings && options.restoreSettings) {
          if (data.settings.lang) localStorage.setItem('moudar_lang', data.settings.lang);
        }
        if (data.learningData && options.restoreLearning) {
          if (data.learningData.feedback) localStorage.setItem('moudar_feedback', JSON.stringify(data.learningData.feedback));
        }
        result.success = true;
        result.isBackup = true;
        result.importedCount = importedCount;
        result.totalInBackup = data.projects.length;
      }
    } catch (e) {
      result.error = 'Erreur lors de l\'import: ' + e.message;
    }
    return result;
  },
  sanitizeFilename: function (name) {
    if (!name) return 'projet_moudar';
    return name.toLowerCase().replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o').replace(/[ùúûü]/g, 'u').replace(/[ç]/g, 'c').replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').substring(0, 50);
  },
  downloadFile: function (content, filename, mimeType) {
    mimeType = mimeType || 'application/json';
    var blob = new Blob([content], {
      type: mimeType
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
  readFile: function (file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      callback(null, e.target.result);
    };
    reader.onerror = function (e) {
      callback(new Error('Erreur de lecture'), null);
    };
    reader.readAsText(file);
  }
};

// ─────────────────────────────────────────────────────────────────────────
// 2. ONBOARDING WIZARD - Assistant de démarrage interactif
// ─────────────────────────────────────────────────────────────────────────
export default MoudarDataManager;
