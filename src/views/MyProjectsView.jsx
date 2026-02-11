import React, { useState } from 'react';
import StorageManager from '../engines/StorageManager';
/* global DOMAINS, PHASES, loadExampleProjects, getStatusBadge, tObj */

export default function MyProjectsView({ onNavigate, onOpenProject, onStartDiagnostic, lang, onShowImportExport }) {
  const [projects, setProjects] = useState(StorageManager.getProjects());

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const getMaturityColor = (score) => {
    if (score >= 70) return "text-green-600 bg-green-100";
    if (score >= 50) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="fade-in">
      {/* Workflow Steps */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 mb-6">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span>{lang === "fr" ? "Cr\u00E9ez un projet" : "Create a project"}</span>
          </div>
          <div className="text-white/50">{"\u2192"}</div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span>{lang === "fr" ? "G\u00E9n\u00E9rez le protocole" : "Generate protocol"}</span>
          </div>
          <div className="text-white/50">{"\u2192"}</div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span>{lang === "fr" ? "Lancez le diagnostic" : "Run diagnostic"}</span>
          </div>
          <div className="text-white/50">{"\u2192"}</div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <span>{lang === "fr" ? "Exportez en Word" : "Export to Word"}</span>
          </div>
        </div>
      </div>

      {/* Header + Actions */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-gray-800">
          {"\uD83D\uDCC2 "}{lang === "fr" ? "Mes Projets" : "My Projects"}
        </h2>
        <div className="flex gap-2">
          {onShowImportExport && (
            <button
              onClick={() => onShowImportExport(null)}
              className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition text-sm"
            >
              {"\uD83D\uDCE6 "}{lang === "fr" ? "Import/Export" : "Import/Export"}
            </button>
          )}
          <button
            onClick={() => {
              const result = loadExampleProjects();
              if (result.loaded) {
                setProjects(StorageManager.getProjects());
                alert(lang === "fr" ? "\u2713 " + result.count + " projets d'exemple charg\u00E9s !" : "\u2713 " + result.count + " example projects loaded!");
              } else {
                alert(lang === "fr" ? "Les projets d'exemple sont d\u00E9j\u00E0 charg\u00E9s." : "Example projects are already loaded.");
              }
            }}
            className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm"
          >
            {"\uD83D\uDCDA "}{lang === "fr" ? "Charger exemples" : "Load examples"}
          </button>
          <button
            onClick={() => onNavigate("wizard")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {"\u2728 "}{lang === "fr" ? "Nouveau projet" : "New project"}
          </button>
        </div>
      </div>

      {/* Stats */}
      {projects.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
            <div className="text-xs text-gray-500">{lang === "fr" ? "Projets" : "Projects"}</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {projects.filter((p) => p.protocol && p.protocol.frameworks).length}
            </div>
            <div className="text-xs text-gray-500">{lang === "fr" ? "Protocoles" : "Protocols"}</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {projects.filter((p) => p.diagnostic && p.diagnostic.global).length}
            </div>
            <div className="text-xs text-gray-500">{lang === "fr" ? "Diagnostics" : "Diagnostics"}</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {(() => {
                const withDiag = projects.filter((p) => p.diagnostic && p.diagnostic.global);
                if (withDiag.length === 0) return "\u2014";
                const avg = withDiag.reduce((sum, p) => sum + p.diagnostic.global, 0) / withDiag.length;
                return avg.toFixed(0) + "%";
              })()}
            </div>
            <div className="text-xs text-gray-500">{lang === "fr" ? "Maturit\u00E9 moy." : "Avg. maturity"}</div>
          </div>
        </div>
      )}

      {/* Empty State or Project List */}
      {projects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <div className="text-6xl mb-4">{"\uD83D\uDCED"}</div>
          <p className="text-gray-500 mb-6">
            {lang === "fr" ? "Aucun projet sauvegard\u00E9" : "No saved projects"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate("wizard")}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              {"\u2728 "}{lang === "fr" ? "Cr\u00E9er mon premier projet" : "Create my first project"}
            </button>
            <button
              onClick={() => {
                const result = loadExampleProjects();
                if (result.loaded) {
                  setProjects(StorageManager.getProjects());
                  alert(lang === "fr" ? "\u2713 " + result.count + " projets d'exemple charg\u00E9s !" : "\u2713 " + result.count + " example projects loaded!");
                }
              }}
              className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition"
            >
              {"\uD83D\uDCDA "}{lang === "fr" ? "Charger 4 exemples de projets" : "Load 4 example projects"}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            {lang === "fr"
              ? "Les exemples incluent : mhGAP, Chirurgie s\u00E9curis\u00E9e, Sant\u00E9 scolaire, T\u00E9l\u00E9m\u00E9decine"
              : "Examples include: mhGAP, Safe Surgery, School Health, Telemedicine"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((p) => {
              const domainInfo = DOMAINS[p.domain] || {};
              const phaseInfo = PHASES[p.phase] || {};
              const statusBadge = getStatusBadge(p.status || "draft", lang);
              const hasProtocol = p.protocol && p.protocol.frameworks;
              const hasDiagnostic = p.diagnostic && p.diagnostic.global;

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition border-l-4 border-purple-500 overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-lg text-gray-800">
                            {p.title || (lang === "fr" ? "Sans titre" : "Untitled")}
                          </h3>
                          <span className={"status-badge " + statusBadge.bg + " " + statusBadge.text}>
                            {statusBadge.icon} {statusBadge.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{p.organization}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {p.domain && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {domainInfo.icon} {tObj(domainInfo, lang)}
                            </span>
                          )}
                          {p.phase && (
                            <span className="px-2 py-1 bg-purple-100 text-blue-700 rounded text-xs">
                              {phaseInfo.icon} {tObj(phaseInfo, lang)}
                            </span>
                          )}
                        </div>
                        {hasProtocol && (
                          <p className="text-xs text-gray-400 mb-1">
                            {"\uD83D\uDD2C "}{lang === "fr" ? "Cadres" : "Frameworks"}: {p.protocol.frameworks.slice(0, 3).join(", ")}
                          </p>
                        )}
                      </div>
                      {hasDiagnostic && (
                        <div className={"ml-4 px-4 py-3 rounded-xl text-center " + getMaturityColor(p.diagnostic.global)}>
                          <div className="text-2xl font-bold">{p.diagnostic.global}%</div>
                          <div className="text-xs">{lang === "fr" ? "Maturit\u00E9" : "Maturity"}</div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => onOpenProject(p)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                      >
                        {hasProtocol
                          ? "\uD83D\uDCDD " + (lang === "fr" ? "Modifier protocole" : "Edit protocol")
                          : "\u2728 " + (lang === "fr" ? "G\u00E9n\u00E9rer protocole" : "Generate protocol")}
                      </button>
                      <button
                        onClick={() => onStartDiagnostic(p)}
                        className="px-3 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 transition"
                      >
                        {hasDiagnostic
                          ? "\uD83D\uDCCA " + (lang === "fr" ? "Nouveau diagnostic" : "New diagnostic")
                          : "\uD83D\uDCCA " + (lang === "fr" ? "Lancer diagnostic" : "Run diagnostic")}
                      </button>
                      <button
                        onClick={() => {
                          const dup = StorageManager.duplicateProject(p.id);
                          if (dup) {
                            setProjects(StorageManager.getProjects());
                            alert(lang === "fr" ? "\u2713 Projet dupliqu\u00E9" : "\u2713 Project duplicated");
                          }
                        }}
                        className="px-3 py-2 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition"
                        title={lang === "fr" ? "Cr\u00E9er une copie" : "Create a copy"}
                      >
                        {"\uD83D\uDCCB "}{lang === "fr" ? "Dupliquer" : "Duplicate"}
                      </button>
                      <button
                        onClick={() => {
                          const data = StorageManager.exportProject(p.id, 'json');
                          if (data) {
                            const blob = new Blob([data], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'moudar_projet_' + p.id + '.json';
                            a.click();
                            URL.revokeObjectURL(url);
                          }
                        }}
                        className="px-3 py-2 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition"
                        title={lang === "fr" ? "Exporter en JSON" : "Export as JSON"}
                      >
                        {"\uD83D\uDCE5 "}{lang === "fr" ? "Exporter" : "Export"}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(lang === "fr" ? "Supprimer ce projet ?" : "Delete this project?"))
                            setProjects(StorageManager.deleteProject(p.id));
                        }}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition"
                      >
                        {"\uD83D\uDDD1\uFE0F "}{lang === "fr" ? "Supprimer" : "Delete"}
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-2 flex justify-between text-xs text-gray-400">
                    <span>{lang === "fr" ? "Modifi\u00E9 le" : "Modified"}: {formatDate(p.updatedAt)}</span>
                    {hasDiagnostic && (
                      <span>{lang === "fr" ? "Diagnostic du" : "Diagnostic from"}: {formatDate(p.diagnostic.date)}</span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
