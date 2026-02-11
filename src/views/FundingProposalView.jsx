import React, { useState } from 'react';
/* global MoudarEngine */

export default function FundingProposalView({ project, strategies: strategiesProp, budget: budgetProp, lang, onClose }) {
  const strategies = strategiesProp || [];
  const budget = budgetProp || { summary: { total: 100000 } };
  const [funder, setFunder] = useState('WHO');
  const proposal = MoudarEngine.generateFundingProposal(project, strategies, budget, funder, lang);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDCDD "}{lang === "fr" ? "G\u00E9n\u00E9rateur Demande de Financement" : "Funding Proposal Generator"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr" ? "Templates OMS, UNICEF, Global Fund, USAID" : "WHO, UNICEF, Global Fund, USAID templates"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Funder Selector */}
          <div className="flex gap-3 mb-6">
            {['WHO', 'UNICEF', 'GlobalFund', 'USAID'].map((f) => {
              const templates = {
                WHO: '\uD83C\uDFE5 WHO',
                UNICEF: '\uD83D\uDC76 UNICEF',
                GlobalFund: '\uD83C\uDF0D Global Fund',
                USAID: '\uD83C\uDDFA\uD83C\uDDF8 USAID'
              };
              return (
                <button
                  key={f}
                  onClick={() => setFunder(f)}
                  className={"flex-1 p-3 rounded-xl border-2 transition " + (funder === f ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-400')}
                >
                  <div className="font-bold">{templates[f]}</div>
                </button>
              );
            })}
          </div>

          {/* Progress */}
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{lang === "fr" ? "Progression" : "Progress"}</span>
              <span className="font-bold text-indigo-600">{proposal.completionRate}%</span>
            </div>
            <div className="h-3 bg-white rounded-full">
              <div
                className="h-3 bg-indigo-500 rounded-full transition-all"
                style={{ width: proposal.completionRate + '%' }}
              />
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-3">
            {proposal.sections.map((section) => {
              const statusIcon = section.status === 'complete' ? '\u2705' : '\uD83D\uDCDD';
              return (
                <details key={section.id} className="border rounded-xl overflow-hidden">
                  <summary className="p-4 cursor-pointer flex justify-between items-center bg-gray-50 hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <span>{statusIcon}</span>
                      <span className="font-medium">{section.title}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {section.wordCount}/{section.maxWords} {lang === "fr" ? "mots" : "words"}
                    </span>
                  </summary>
                  <div className="p-4 bg-white">
                    <textarea
                      className="w-full p-3 border rounded-lg text-sm"
                      rows="6"
                      defaultValue={section.content}
                      placeholder={section.tips}
                    />
                    {section.tips && (
                      <p className="text-xs text-gray-500 mt-2">{"\uD83D\uDCA1 "}{section.tips}</p>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            {lang === "fr" ? "Exporter Word" : "Export Word"}
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
