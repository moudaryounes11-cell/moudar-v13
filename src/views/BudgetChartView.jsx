import React, { useState } from 'react';
/* global InteractiveCharts, DOMPurify */

export default function BudgetChartView({ budget, lang = 'fr' }) {
  if (!budget) return (
    <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-500">
      {lang === 'fr' ? 'Aucun budget disponible' : 'No budget available'}
    </div>
  );

  const pieData = InteractiveCharts.generateBudgetPieData(budget, lang);
  if (!pieData || !pieData.data.length) return (
    <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-500">
      {lang === 'fr' ? 'Données insuffisantes' : 'Insufficient data'}
    </div>
  );

  const [hovered, setHovered] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: pieData.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        {"\uD83D\uDCB0 "}{lang === 'fr' ? 'Répartition du budget' : 'Budget breakdown'}
      </h3>
      <div className="flex gap-6">
        <div className="relative">
          <div
            dangerouslySetInnerHTML={{
              __html: typeof DOMPurify !== 'undefined'
                ? DOMPurify.sanitize(InteractiveCharts.generateDonutSVG(pieData.data, { size: 180, strokeWidth: 35 }), { USE_PROFILES: { svg: true } })
                : InteractiveCharts.generateDonutSVG(pieData.data, { size: 180, strokeWidth: 35 })
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-xs text-gray-500">Total</div>
            <div className="text-lg font-bold text-gray-800">{formatCurrency(pieData.total)}</div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {pieData.data.map((item) => {
            const isHovered = hovered === item.category;
            return (
              <div
                key={item.category}
                onMouseEnter={() => setHovered(item.category)}
                onMouseLeave={() => setHovered(null)}
                className={"flex items-center gap-3 p-2 rounded-lg transition cursor-pointer " + (isHovered ? "bg-gray-100" : "hover:bg-gray-50")}
              >
                <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-500">{formatCurrency(item.value)}</div>
                </div>
                <div className="text-sm font-semibold" style={{ color: item.color }}>{item.percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
