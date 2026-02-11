import React, { useState, useRef } from 'react';

/* global MoudarDataManager */

export default function ImportExportPanel({ lang = 'fr', project, onClose, onImportComplete }) {
  const [activeTab, setActiveTab] = useState('export');
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleExportProject = () => {
    if (!project) return;
    const result = MoudarDataManager.exportProject(project);
    MoudarDataManager.downloadFile(result.data, result.filename);
  };

  const handleExportAll = () => {
    const result = MoudarDataManager.exportAllProjects();
    MoudarDataManager.downloadFile(result.data, result.filename);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    MoudarDataManager.readFile(file, (err, content) => {
      if (err) {
        setImportResult({ success: false, error: err.message });
        return;
      }
      const result = MoudarDataManager.importProject(content, {
        generateNewId: true,
        skipExisting: false
      });
      setImportResult(result);
      if (result.success && onImportComplete)
        setTimeout(() => { onImportComplete(result); }, 1500);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">
            {"\uD83D\uDCE6"} {lang === 'fr' ? 'Gestion des donn\u00e9es' : 'Data Management'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            {"\u2715"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => { setActiveTab('export'); }}
            className={
              "flex-1 py-3 text-center font-medium transition " +
              (activeTab === 'export'
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500")
            }
          >
            {"\uD83D\uDCE4"} {lang === 'fr' ? 'Exporter' : 'Export'}
          </button>
          <button
            onClick={() => { setActiveTab('import'); }}
            className={
              "flex-1 py-3 text-center font-medium transition " +
              (activeTab === 'import'
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500")
            }
          >
            {"\uD83D\uDCE5"} {lang === 'fr' ? 'Importer' : 'Import'}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Export tab */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              {project && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    {lang === 'fr' ? 'Projet actuel' : 'Current project'}
                  </h3>
                  <p className="text-sm text-blue-600 mb-3">
                    {project.title || 'Sans titre'}
                  </p>
                  <button
                    onClick={handleExportProject}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {"\uD83D\uDCE5"} {lang === 'fr' ? 'T\u00e9l\u00e9charger .moudar' : 'Download .moudar'}
                  </button>
                </div>
              )}

              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">
                  {lang === 'fr' ? 'Sauvegarde compl\u00e8te' : 'Full backup'}
                </h3>
                <p className="text-sm text-purple-600 mb-3">
                  {lang === 'fr'
                    ? 'Exporte tous vos projets + param\u00e8tres + donn\u00e9es IA'
                    : 'Exports all projects + settings + AI data'}
                </p>
                <button
                  onClick={handleExportAll}
                  className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  {"\uD83D\uDCBE"} {lang === 'fr' ? 'Cr\u00e9er une sauvegarde' : 'Create backup'}
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center">
                {lang === 'fr'
                  ? 'Les fichiers .moudar sont compatibles avec toutes les versions'
                  : '.moudar files are compatible with all versions'}
              </p>
            </div>
          )}

          {/* Import tab */}
          {activeTab === 'import' && (
            <div className="space-y-4">
              <div
                onClick={() => { fileInputRef.current && fileInputRef.current.click(); }}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition"
              >
                <div className="text-4xl mb-2">{"\uD83D\uDCC1"}</div>
                <p className="font-medium text-gray-700">
                  {lang === 'fr' ? 'Cliquez pour s\u00e9lectionner un fichier' : 'Click to select a file'}
                </p>
                <p className="text-sm text-gray-400">
                  {lang === 'fr' ? 'Fichiers .moudar ou .json accept\u00e9s' : '.moudar or .json files accepted'}
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".moudar,.json"
                onChange={handleFileSelect}
                className="hidden"
              />

              {importResult && (
                <div
                  className={
                    "p-4 rounded-xl " +
                    (importResult.success
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200")
                  }
                >
                  {importResult.success ? (
                    <div>
                      <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                        {"\u2705"} {lang === 'fr' ? 'Import r\u00e9ussi !' : 'Import successful!'}
                      </div>
                      {importResult.isBackup ? (
                        <p className="text-sm text-green-600">
                          {importResult.importedCount} {lang === 'fr' ? 'projets import\u00e9s' : 'projects imported'}
                        </p>
                      ) : (
                        <p className="text-sm text-green-600">
                          {lang === 'fr' ? 'Projet' : 'Project'}{": "}{importResult.project && importResult.project.title}
                        </p>
                      )}
                      {importResult.warnings && importResult.warnings.length > 0 && (
                        <div className="mt-2 text-xs text-amber-600">
                          {importResult.warnings.map((w, i) => (
                            <p key={i}>{"\u26A0\uFE0F"} {w}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-red-700">
                      <div className="font-semibold mb-1">
                        {"\u274C"} {lang === 'fr' ? 'Erreur' : 'Error'}
                      </div>
                      <p className="text-sm">{importResult.error}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
