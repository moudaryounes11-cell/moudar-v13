import React from 'react';
/* global MoudarEngine */

export default function ROICalculatorView({ project, budget: budgetProp, lang, onClose }) {
  const budget = budgetProp || { summary: { total: 100000, setup: 20000, recurring: 80000 } };
  const roi = MoudarEngine.calculateROI(project, budget, [], lang);
  const perfColor = roi.performanceLevel === 'excellent' ? 'text-green-600' : roi.performanceLevel === 'good' ? 'text-blue-600' : roi.performanceLevel === 'acceptable' ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDCC8 "}{lang === "fr" ? "Calculateur ROI" : "ROI Calculator"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr" ? "Retour sur investissement" : "Return on Investment"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 text-center">
              <div className={"text-3xl font-bold " + perfColor}>{roi.metrics.roi}%</div>
              <div className="text-sm text-gray-600">ROI</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 text-center">
              <div className="text-3xl font-bold text-blue-600">{roi.metrics.bcRatio}x</div>
              <div className="text-sm text-gray-600">{lang === "fr" ? "Ratio B/C" : "B/C Ratio"}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200 text-center">
              <div className="text-3xl font-bold text-purple-600">{roi.metrics.paybackMonths}</div>
              <div className="text-sm text-gray-600">{lang === "fr" ? "Mois r\u00E9cup\u00E9ration" : "Payback months"}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 text-center">
              <div className="text-3xl font-bold text-amber-600">${Math.round(roi.metrics.npv / 1000)}K</div>
              <div className="text-sm text-gray-600">VAN/NPV</div>
            </div>
          </div>

          {/* Investment vs Benefits */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <h3 className="font-bold text-red-800 mb-3">
                {"\uD83D\uDCB8 "}{lang === "fr" ? "Investissement" : "Investment"}
              </h3>
              <div className="text-3xl font-bold text-red-600">${roi.investment.total.toLocaleString()}</div>
              <p className="text-sm text-gray-600">
                ${roi.investment.perBeneficiary} / {lang === "fr" ? "b\u00E9n\u00E9ficiaire" : "beneficiary"}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <h3 className="font-bold text-green-800 mb-3">
                {"\uD83D\uDCB0 "}{lang === "fr" ? "B\u00E9n\u00E9fices totaux" : "Total Benefits"}
              </h3>
              <div className="text-3xl font-bold text-green-600">${roi.benefits.total.toLocaleString()}</div>
              <p className="text-sm text-gray-600">
                ${roi.benefits.perBeneficiary} / {lang === "fr" ? "b\u00E9n\u00E9ficiaire" : "beneficiary"}
              </p>
            </div>
          </div>

          {/* Annual Benefits Breakdown */}
          <div className="p-4 bg-gray-50 rounded-xl mb-6">
            <h3 className="font-bold text-gray-800 mb-3">
              {lang === "fr" ? "D\u00E9composition des b\u00E9n\u00E9fices annuels" : "Annual benefits breakdown"}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>{lang === "fr" ? "B\u00E9n\u00E9fices directs" : "Direct benefits"}</span>
                <span className="font-medium">${roi.benefits.annual.direct.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{lang === "fr" ? "B\u00E9n\u00E9fices indirects" : "Indirect benefits"}</span>
                <span className="font-medium">${roi.benefits.annual.indirect.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{lang === "fr" ? "B\u00E9n\u00E9fices intangibles" : "Intangible benefits"}</span>
                <span className="font-medium">${roi.benefits.annual.intangible.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center font-bold">
                <span>Total</span>
                <span>${roi.benefits.annual.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sensitivity Analysis */}
          <div className="p-4 border rounded-xl">
            <h3 className="font-bold text-gray-800 mb-3">
              {lang === "fr" ? "Analyse de sensibilit\u00E9" : "Sensitivity analysis"}
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="font-bold text-red-600">{Math.round(roi.sensitivity.pessimistic.roi)}%</div>
                <div className="text-gray-500">{lang === "fr" ? "Pessimiste" : "Pessimistic"}</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-bold text-blue-600">{Math.round(roi.sensitivity.base.roi)}%</div>
                <div className="text-gray-500">{lang === "fr" ? "Base" : "Base"}</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-bold text-green-600">{Math.round(roi.sensitivity.optimistic.roi)}%</div>
                <div className="text-gray-500">{lang === "fr" ? "Optimiste" : "Optimistic"}</div>
              </div>
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
