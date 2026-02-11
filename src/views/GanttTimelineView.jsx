import React from 'react';
/* global MoudarEngine */

export default function GanttTimelineView({ project, strategies: strategiesProp, lang, onClose }) {
  const strategies = strategiesProp || [];
  const gantt = MoudarEngine.generateGanttTimeline(project, strategies, lang);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDCC5 "}{lang === "fr" ? "Timeline Gantt EPIS" : "EPIS Gantt Timeline"}
            </h2>
            <p className="text-sm text-gray-500">
              {gantt.totalMonths} {lang === "fr" ? "mois" : "months"} {"\u2022"} {gantt.strategies.length} {lang === "fr" ? "strat\u00E9gies" : "strategies"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Phases */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">{lang === "fr" ? "Phases du projet" : "Project phases"}</h3>
            <div className="flex gap-1 h-12 rounded-lg overflow-hidden">
              {Object.values(gantt.phases).map((phase) => {
                const width = phase.duration / gantt.totalWeeks * 100;
                return (
                  <div
                    key={phase.label}
                    className="flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: width + '%', backgroundColor: phase.color }}
                  >
                    {phase.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestones */}
          <div className="mb-6 flex flex-wrap gap-3">
            {gantt.milestones.map((m, i) => (
              <div key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                <span>{m.icon}</span>
                <span className="text-gray-600">{lang === "fr" ? "S" : "W"}{m.week}</span>
                <span className="font-medium">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Gantt Bars */}
          <div className="space-y-2">
            {gantt.strategies.map((sid) => {
              const stratTasks = gantt.tasks.filter((t) => t.strategy === sid);
              const strat = window.MoudarEngine.getKnowledgeGraph().nodes.strategies[sid];
              return (
                <div key={sid} className="flex items-center gap-2">
                  <div className="w-40 text-sm font-medium text-gray-700 truncate">
                    {strat ? strat.label[lang] : sid}
                  </div>
                  <div className="flex-1 h-8 bg-gray-100 rounded relative">
                    {stratTasks.map((task) => {
                      const left = task.start / gantt.totalWeeks * 100;
                      const width = task.duration / gantt.totalWeeks * 100;
                      return (
                        <div
                          key={task.id}
                          className="absolute h-6 top-1 rounded text-xs text-white flex items-center justify-center"
                          style={{ left: left + '%', width: width + '%', backgroundColor: task.color }}
                          title={task.name}
                        >
                          {width > 10 ? task.phase.substring(0, 4) : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8b5cf6' }} /> {lang === "fr" ? "Pr\u00E9paration" : "Preparation"}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }} /> {lang === "fr" ? "Impl\u00E9mentation" : "Implementation"}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }} /> {lang === "fr" ? "P\u00E9rennisation" : "Sustainment"}
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
