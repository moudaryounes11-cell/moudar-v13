import React, { useState } from 'react';
/* global GrantAIWriter */

export default function GrantsView({ lang = 'fr' }) {
  const [selectedFunder, setSelectedFunder] = useState(null);
  const [proposal, setProposal] = useState(null);

  const demoProject = {
    title: lang === 'fr' ? 'Int\u00E9gration sant\u00E9 mentale en soins primaires' : 'Mental health integration in primary care',
    domain: 'mental_health',
    budget: 2500000,
    context: lang === 'fr' ? 'Pays \u00E0 revenu interm\u00E9diaire, syst\u00E8me de sant\u00E9 en d\u00E9veloppement' : 'Middle-income country, developing health system',
    objectives: ['equity', 'sustainability', 'scale'],
    strategies: ['S19', 'S04', 'S08', 'S10'],
    framework: 'CFIR',
    cfirScores: {
      innovation: 3.5,
      outerSetting: 3.2
    }
  };

  const funders = Object.values(GrantAIWriter.funders);

  const selectFunder = (funderId) => {
    setSelectedFunder(funderId);
    const prop = GrantAIWriter.generateProposal(demoProject, funderId, lang);
    setProposal(prop);
  };

  return (
    <div className="fade-in">
      <div className="mb-6 p-4 bg-gradient-to-r from-emerald-900/50 to-emerald-700/30 rounded-xl border border-emerald-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\uD83D\uDCB0"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">Grant AI Writer v9.0</h1>
            <p className="text-emerald-300 text-sm">
              {lang === 'fr' ? 'Propositions adapt\u00E9es aux crit\u00E8res de chaque bailleur' : "Proposals adapted to each funder's criteria"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-3 mb-6">
        {funders.map((funder) => {
          const alignment = GrantAIWriter.calculateAlignment(demoProject, funder.id);
          const isSelected = selectedFunder === funder.id;
          return (
            <div
              key={funder.id}
              onClick={() => selectFunder(funder.id)}
              className={
                "cursor-pointer rounded-xl p-4 border transition-all " +
                (isSelected
                  ? "bg-emerald-900/50 border-emerald-500"
                  : "bg-slate-800 border-slate-700 hover:border-emerald-500/50")
              }
            >
              <div className="text-center">
                <span className="text-3xl">{funder.logo}</span>
                <div className="font-semibold text-white mt-2">{funder.name}</div>
                <div className="text-xs text-slate-400 mt-1">
                  {lang === 'fr' ? 'Max' : 'Max'}: ${(funder.maxBudget / 1000000).toFixed(0)}M
                </div>
                <div
                  className={
                    "mt-2 text-sm font-bold " +
                    (alignment.score >= 70
                      ? "text-green-400"
                      : alignment.score >= 50
                        ? "text-yellow-400"
                        : "text-red-400")
                  }
                >
                  {alignment.score}/100
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {proposal && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">
                {lang === 'fr' ? 'Proposition pour' : 'Proposal for'} {proposal.funderName}
              </h2>
              <p className="text-slate-400 text-sm">{proposal.projectTitle}</p>
            </div>
            <div
              className={
                "px-4 py-2 rounded-lg text-lg font-bold " +
                (proposal.alignment.score >= 70
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400")
              }
            >
              {lang === 'fr' ? 'Score' : 'Score'}: {proposal.alignment.score}/100
            </div>
          </div>

          <div className="mb-4 p-3 bg-slate-900/50 rounded-lg">
            <div className="text-sm font-medium text-slate-300 mb-2">
              {lang === 'fr' ? "Facteurs d'alignement" : 'Alignment factors'}
            </div>
            <div className="flex flex-wrap gap-2">
              {proposal.alignment.factors.map((f, i) => (
                <span
                  key={i}
                  className={
                    "px-2 py-1 rounded text-xs " +
                    (f.points > 15
                      ? "bg-green-500/20 text-green-400"
                      : f.points > 5
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400")
                  }
                >
                  {f.factor}: +{f.points}pts
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium text-slate-300">
              {lang === 'fr' ? 'Sections de la proposition' : 'Proposal sections'}
            </div>
            {proposal.sections.slice(0, 4).map((section) => (
              <div key={section.id} className="p-3 bg-slate-900/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">{section.label}</span>
                  <span className="text-xs text-slate-500">
                    {section.maxWords} {lang === 'fr' ? 'mots max' : 'words max'}
                  </span>
                </div>
                <p className="text-sm text-slate-400 line-clamp-2">{section.content}</p>
              </div>
            ))}
          </div>

          {proposal.alignment.tips && proposal.alignment.tips.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="text-sm font-medium text-yellow-400 mb-2">
                {"\uD83D\uDCA1"} {lang === 'fr' ? 'Conseils pour am\u00E9liorer' : 'Tips to improve'}
              </div>
              {proposal.alignment.tips.map((tip, i) => (
                <p key={i} className="text-sm text-yellow-700">
                  {tip[lang]}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
