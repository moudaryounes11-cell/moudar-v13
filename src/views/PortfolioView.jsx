import React, { useState, useEffect } from 'react';
/* global PortfolioManager */

export default function PortfolioView({ projects: projectsProp, lang, onClose, onSelectProject }) {
  const projects = projectsProp || [];
  const [portfolio, setPortfolio] = useState(null);
  const [viewMode, setViewMode] = useState('overview');

  useEffect(() => {
    if (projects.length > 0 && window.PortfolioManager) {
      const result = PortfolioManager.aggregatePortfolio(projects, { lang });
      setPortfolio(result);
    }
  }, [projects]);

  if (!portfolio) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 text-center">
          {projects.length === 0 ? (
            <div>
              <span className="text-6xl">{"\uD83D\uDCC2"}</span>
              <p className="mt-4 text-gray-600">{lang === 'fr' ? "Aucun projet \u00E0 analyser" : "No projects to analyze"}</p>
              <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded-lg">
                {lang === 'fr' ? "Fermer" : "Close"}
              </button>
            </div>
          ) : (
            <p>{lang === 'fr' ? "Chargement..." : "Loading..."}</p>
          )}
        </div>
      </div>
    );
  }

  const getHealthColor = (level) => {
    return level === 'healthy' ? 'text-green-600' : level === 'moderate' ? 'text-yellow-600' : level === 'at_risk' ? 'text-orange-600' : 'text-red-600';
  };

  const getRiskColor = (level) => {
    return level === 'critical' ? 'bg-red-100 text-red-700 border-red-200' : level === 'high' ? 'bg-orange-100 text-orange-700 border-orange-200' : level === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-green-100 text-green-700 border-green-200';
  };

  const tabLabels = {
    overview: { fr: "Vue d'ensemble", en: "Overview" },
    risks: { fr: "Carte des risques", en: "Risk Map" },
    barriers: { fr: "Barri\u00E8res syst\u00E9miques", en: "Systemic Barriers" }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white rounded-t-2xl sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {"\uD83D\uDCCA "}{lang === 'fr' ? "Tableau de Bord Portfolio" : "Portfolio Dashboard"}
              </h2>
              <p className="text-white/80 mt-1">
                {portfolio.totalProjects} {lang === 'fr' ? "projets analys\u00E9s" : "projects analyzed"}
              </p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white text-2xl">{"\u00D7"}</button>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            {['overview', 'risks', 'barriers'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={"px-4 py-2 rounded-lg text-sm transition " + (viewMode === mode ? "bg-white text-indigo-700 font-semibold" : "bg-white/20 hover:bg-white/30")}
              >
                {tabLabels[mode][lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {viewMode === 'overview' && (
          <div className="p-6">
            {/* KPIs */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{lang === 'fr' ? "Sant\u00E9 Portfolio" : "Portfolio Health"}</p>
                <p className={"text-3xl font-bold mt-1 " + getHealthColor(portfolio.healthScore.level)}>{portfolio.healthScore.score}/100</p>
                <p className={"text-sm " + getHealthColor(portfolio.healthScore.level)}>{portfolio.healthScore.label[lang]}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{lang === 'fr' ? "Succ\u00E8s moyen" : "Average Success"}</p>
                <p className="text-3xl font-bold mt-1 text-green-600">{portfolio.averageSuccessRate}%</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{lang === 'fr' ? "Projets critiques" : "Critical Projects"}</p>
                <p className="text-3xl font-bold mt-1 text-red-600">{portfolio.riskDistribution.critical}</p>
                <p className="text-sm text-red-500">/ {portfolio.totalProjects} {lang === 'fr' ? "total" : "total"}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{lang === 'fr' ? "Avec protocole" : "With Protocol"}</p>
                <p className="text-3xl font-bold mt-1 text-blue-600">{portfolio.projectsWithProtocol}</p>
                <p className="text-sm text-blue-500">{Math.round(portfolio.projectsWithProtocol / portfolio.totalProjects * 100)}%</p>
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="bg-white rounded-xl border p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">{lang === 'fr' ? "Distribution des risques" : "Risk Distribution"}</h3>
              <div className="flex gap-2 h-8">
                {portfolio.riskDistribution.critical > 0 && (
                  <div className="bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold" style={{ width: (portfolio.riskDistribution.critical / portfolio.totalProjects * 100) + "%" }}>
                    {portfolio.riskDistribution.critical}
                  </div>
                )}
                {portfolio.riskDistribution.high > 0 && (
                  <div className="bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold" style={{ width: (portfolio.riskDistribution.high / portfolio.totalProjects * 100) + "%" }}>
                    {portfolio.riskDistribution.high}
                  </div>
                )}
                {portfolio.riskDistribution.medium > 0 && (
                  <div className="bg-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold" style={{ width: (portfolio.riskDistribution.medium / portfolio.totalProjects * 100) + "%" }}>
                    {portfolio.riskDistribution.medium}
                  </div>
                )}
                {portfolio.riskDistribution.low > 0 && (
                  <div className="bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold" style={{ width: (portfolio.riskDistribution.low / portfolio.totalProjects * 100) + "%" }}>
                    {portfolio.riskDistribution.low}
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>{"\uD83D\uDD34 "}{lang === 'fr' ? "Critique" : "Critical"}</span>
                <span>{"\uD83D\uDFE0 "}{lang === 'fr' ? "\u00C9lev\u00E9" : "High"}</span>
                <span>{"\uD83D\uDFE1 "}{lang === 'fr' ? "Moyen" : "Medium"}</span>
                <span>{"\uD83D\uDFE2 "}{lang === 'fr' ? "Faible" : "Low"}</span>
              </div>
            </div>

            {/* Recommendations */}
            {portfolio.recommendations.length > 0 && (
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  {"\u26A1 "}{lang === 'fr' ? "Recommandations strat\u00E9giques" : "Strategic Recommendations"}
                </h3>
                <div className="space-y-2">
                  {portfolio.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-amber-100">
                      <p className="font-medium text-gray-800">{rec.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      <p className="text-xs text-amber-600 mt-2">{"\u2192 "}{rec.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Risks Tab */}
        {viewMode === 'risks' && (
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">{lang === 'fr' ? "Projets par niveau de risque" : "Projects by Risk Level"}</h3>
            <div className="space-y-3">
              {portfolio.projectRisks.map((proj, idx) => (
                <div
                  key={idx}
                  className={"p-4 rounded-xl border cursor-pointer hover:shadow-md transition " + getRiskColor(proj.riskLevel)}
                  onClick={() => { if (onSelectProject) onSelectProject(proj.projectId); }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{proj.projectTitle || "Projet " + (idx + 1)}</p>
                      <p className="text-sm opacity-75">
                        {(lang === 'fr' ? "Barri\u00E8re principale: " : "Top barrier: ") + (proj.topBarrier || "N/A")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{proj.successProbability}%</p>
                      <p className="text-xs uppercase">{proj.riskLevel}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Barriers Tab */}
        {viewMode === 'barriers' && (
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              {lang === 'fr' ? "Barri\u00E8res les plus fr\u00E9quentes dans le portfolio" : "Most Frequent Barriers in Portfolio"}
            </h3>
            <div className="space-y-3">
              {portfolio.topBarriers.map((barrier, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-48 text-sm text-gray-600">{barrier.barrierName}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full flex items-center justify-end pr-2"
                      style={{ width: barrier.percentage + "%" }}
                    >
                      <span className="text-white text-xs font-bold">{barrier.percentage}%</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 w-20">
                    {barrier.count} {lang === 'fr' ? "projets" : "projects"}
                  </span>
                </div>
              ))}
            </div>
            {portfolio.topBarriers.length > 0 && portfolio.topBarriers[0].percentage > 50 && (
              <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="font-semibold text-red-800">
                  {"\u26A0\uFE0F "}{lang === 'fr' ? "Barri\u00E8re syst\u00E9mique d\u00E9tect\u00E9e" : "Systemic barrier detected"}
                </p>
                <p className="text-sm text-red-700 mt-1">
                  {lang === 'fr'
                    ? "\"" + portfolio.topBarriers[0].barrierName + "\" affecte plus de 50% de vos projets. Une intervention au niveau organisationnel est recommand\u00E9e."
                    : "\"" + portfolio.topBarriers[0].barrierName + "\" affects over 50% of your projects. An organizational-level intervention is recommended."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t flex justify-between items-center bg-gray-50 rounded-b-2xl">
          <span className="text-xs text-gray-400">
            {lang === 'fr' ? "Analyse g\u00E9n\u00E9r\u00E9e le " : "Analysis generated on "}{new Date(portfolio.generatedAt).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const report = PortfolioManager.exportPortfolioReport(portfolio, 'json');
                const blob = new Blob([report], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'MOUDAR_Portfolio_Report_' + new Date().toISOString().split('T')[0] + '.json';
                a.click();
              }}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition text-sm"
            >
              {"\uD83D\uDCE5 "}{lang === 'fr' ? "Exporter" : "Export"}
            </button>
            <button onClick={onClose} className="px-6 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">
              {lang === 'fr' ? "Fermer" : "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
