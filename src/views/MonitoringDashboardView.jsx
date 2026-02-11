import React from 'react';
/* global MoudarEngine */

export default function MonitoringDashboardView({ project, strategies: strategiesProp, lang, onClose }) {
  const strategies = strategiesProp || [];
  const dashboard = MoudarEngine.generateMonitoringDashboard(project, strategies, lang);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {"\uD83D\uDCCA "}{lang === "fr" ? "Dashboard Monitoring" : "Monitoring Dashboard"}
            </h2>
            <p className="text-sm text-slate-300">
              {lang === "fr" ? "Derni\u00E8re MAJ:" : "Last update:"} {new Date(dashboard.lastUpdated).toLocaleDateString()}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6 bg-slate-100">
          {/* Overview KPIs */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <div className="text-sm text-gray-500 mb-1">{lang === "fr" ? "Progression" : "Progress"}</div>
              <div className="text-3xl font-bold text-blue-600">{dashboard.overview.progress}%</div>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: dashboard.overview.progress + '%' }} />
              </div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <div className="text-sm text-gray-500 mb-1">{lang === "fr" ? "Budget consomm\u00E9" : "Budget spent"}</div>
              <div className="text-3xl font-bold text-amber-600">{dashboard.overview.budgetSpent}%</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <div className="text-sm text-gray-500 mb-1">{lang === "fr" ? "Jours restants" : "Days remaining"}</div>
              <div className="text-3xl font-bold text-purple-600">{dashboard.overview.daysRemaining}</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <div className="text-sm text-gray-500 mb-1">{lang === "fr" ? "Phase" : "Phase"}</div>
              <div className="text-xl font-bold text-green-600 capitalize">{dashboard.overview.phase}</div>
            </div>
          </div>

          {/* Indicators */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {Object.values(dashboard.indicators).map((ind) => {
              const isOnTrack = ind.value >= ind.target;
              return (
                <div key={ind.label} className={"p-4 rounded-xl border-2 " + (isOnTrack ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200')}>
                  <div className="text-sm text-gray-600">{ind.label}</div>
                  <div className="flex items-end gap-1">
                    <span className={"text-2xl font-bold " + (isOnTrack ? 'text-green-600' : 'text-amber-600')}>{ind.value}</span>
                    <span className="text-gray-500">{ind.unit}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {lang === "fr" ? "Cible:" : "Target:"} {ind.target}{ind.unit}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Predictive Alerts */}
          {dashboard.predictiveAlerts.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
              <h3 className="font-bold text-red-800 mb-3">
                {"\uD83D\uDD2E "}{lang === "fr" ? "Alertes pr\u00E9dictives" : "Predictive alerts"}
              </h3>
              <div className="space-y-2">
                {dashboard.predictiveAlerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className={"px-2 py-0.5 rounded text-xs font-medium " + (alert.severity === 'high' ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-800')}>
                      {alert.severity}
                    </span>
                    <div>
                      <p className="text-gray-700">{alert.message}</p>
                      <p className="text-blue-600 text-xs">{"\uD83D\uDCA1 "}{alert.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Milestones */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3">{lang === "fr" ? "Jalons" : "Milestones"}</h3>
            <div className="flex gap-2">
              {dashboard.timeline.milestones.map((m, i) => {
                const statusColor = m.status === 'completed' ? 'bg-green-500' : m.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300';
                return (
                  <div key={i} className="flex-1 text-center">
                    <div className={"w-4 h-4 rounded-full mx-auto mb-1 " + statusColor} />
                    <div className="text-xs text-gray-500">{m.date}</div>
                    <div className="text-xs font-medium">{m.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
