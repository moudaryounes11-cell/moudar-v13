import React from 'react';
/* global InteractiveCharts */

export default function ProjectProgressView({ project, lang = 'fr' }) {
  if (!project) return null;

  const progressData = InteractiveCharts.generateProgressData(project, lang);
  const progressColor = progressData.overall >= 80 ? '#10b981' : progressData.overall >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        {"\uD83D\uDCCA "}{lang === 'fr' ? 'Progression du projet' : 'Project progress'}
      </h3>
      <div className="text-center mb-6">
        <div className="text-5xl font-bold" style={{ color: progressColor }}>
          {progressData.overall}%
        </div>
        <div className="text-gray-500 text-sm">
          {lang === 'fr' ? 'Complétude globale' : 'Overall completion'}
        </div>
      </div>
      <div className="space-y-3">
        {progressData.sections.map((section) => {
          const barColor = section.progress >= 80 ? 'bg-green-500' : section.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500';
          return (
            <div key={section.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{section.label}</span>
                <span className="text-gray-500">{section.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={"h-full transition-all duration-500 " + barColor} style={{ width: section.progress + '%' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
