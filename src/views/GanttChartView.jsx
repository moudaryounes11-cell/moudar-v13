import React from 'react';
/* global InteractiveCharts, DOMPurify */

export default function GanttChartView({ timeline, lang = 'fr' }) {
  if (!timeline) return (
    <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-500">
      {lang === 'fr' ? 'Aucune timeline' : 'No timeline'}
    </div>
  );

  const ganttData = InteractiveCharts.generateGanttData(timeline, lang);
  if (!ganttData || !ganttData.phases.length) return (
    <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-500">
      {lang === 'fr' ? 'Données insuffisantes' : 'Insufficient data'}
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          {"\uD83D\uDCC5 "}{lang === 'fr' ? 'Timeline du projet' : 'Project timeline'}
        </h3>
        <div className="text-sm text-gray-500">
          {lang === 'fr' ? 'Durée totale: ' : 'Total duration: '}{ganttData.totalDuration} {ganttData.unit}
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: typeof DOMPurify !== 'undefined'
            ? DOMPurify.sanitize(InteractiveCharts.generateGanttHTML(ganttData, { barHeight: 40, monthWidth: 35 }))
            : InteractiveCharts.generateGanttHTML(ganttData, { barHeight: 40, monthWidth: 35 })
        }}
      />
      <div className="flex gap-4 mt-4 pt-4 border-t flex-wrap">
        {ganttData.phases.map((phase) => (
          <div key={phase.id} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: phase.color }} />
            <span className="text-xs text-gray-600">{phase.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
