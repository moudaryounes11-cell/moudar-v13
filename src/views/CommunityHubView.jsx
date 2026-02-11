import React, { useState } from 'react';
/* global MoudarEngine */

export default function CommunityHubView({ project, lang, onClose }) {
  const [tab, setTab] = useState('benchmarks');
  const [filter, setFilter] = useState({ domain: project.domain || null });
  const benchmarks = MoudarEngine.getBenchmarks(filter, lang);
  const leaderboard = MoudarEngine.getLeaderboard(lang);
  const similarProjects = MoudarEngine.getSimilarCommunityProjects(project);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {"\uD83C\uDF0D "}{lang === "fr" ? "Communaut\u00E9 Mondiale SMOA" : "Global SMOA Community"}
            </h2>
            <p className="text-sm text-purple-200">
              {benchmarks.global.totalProjects.toLocaleString()} {lang === "fr" ? "projets dans" : "projects in"} {benchmarks.global.totalCountries} {lang === "fr" ? "pays" : "countries"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-purple-500 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            {['benchmarks', 'projects', 'leaderboard'].map((t) => {
              const labels = {
                benchmarks: '\uD83D\uDCCA Benchmarks',
                projects: '\uD83D\uDCC2 ' + (lang === 'fr' ? 'Projets' : 'Projects'),
                leaderboard: '\uD83C\uDFC6 Leaderboard'
              };
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={"px-4 py-2 font-medium " + (tab === t ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-500')}
                >
                  {labels[t]}
                </button>
              );
            })}
          </div>

          {/* Benchmarks Tab */}
          {tab === 'benchmarks' && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600">{benchmarks.global.avgSuccessRate}%</div>
                  <div className="text-sm text-gray-600">{lang === "fr" ? "Taux succ\u00E8s moyen" : "Avg success rate"}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-600">{benchmarks.global.avgAdoptionRate}%</div>
                  <div className="text-sm text-gray-600">{lang === "fr" ? "Taux adoption moyen" : "Avg adoption rate"}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl text-center">
                  <div className="text-3xl font-bold text-purple-600">{benchmarks.global.totalProjects.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{lang === "fr" ? "Projets" : "Projects"}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl text-center">
                  <div className="text-3xl font-bold text-amber-600">{benchmarks.global.totalBeneficiaries}</div>
                  <div className="text-sm text-gray-600">{lang === "fr" ? "B\u00E9n\u00E9ficiaires" : "Beneficiaries"}</div>
                </div>
              </div>

              {/* Domain Filter */}
              <div className="flex gap-3">
                <select
                  onChange={(e) => setFilter({ domain: e.target.value || null })}
                  className="p-2 border rounded-lg"
                >
                  <option value="">{lang === "fr" ? "Tous domaines" : "All domains"}</option>
                  <option value="mental_health">{lang === "fr" ? "Sant\u00E9 mentale" : "Mental health"}</option>
                  <option value="primary_care">{lang === "fr" ? "Soins primaires" : "Primary care"}</option>
                  <option value="chronic_disease">{lang === "fr" ? "Maladies chroniques" : "Chronic diseases"}</option>
                  <option value="maternal_child">{lang === "fr" ? "Sant\u00E9 maternelle" : "Maternal health"}</option>
                </select>
              </div>

              {/* Filtered Benchmarks */}
              {benchmarks.filtered && (
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <h3 className="font-bold text-indigo-800 mb-3">{lang === "fr" ? "Benchmarks filtr\u00E9s" : "Filtered benchmarks"}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">{benchmarks.filtered.avgSuccessRate || benchmarks.filtered.avgSuccess}%</div>
                      <div className="text-sm text-gray-600">{lang === "fr" ? "Succ\u00E8s moyen" : "Avg success"}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">{benchmarks.filtered.totalProjects || benchmarks.filtered.projects}</div>
                      <div className="text-sm text-gray-600">{lang === "fr" ? "Projets" : "Projects"}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">{benchmarks.filtered.countries || '-'}</div>
                      <div className="text-sm text-gray-600">{lang === "fr" ? "Pays" : "Countries"}</div>
                    </div>
                  </div>
                  {benchmarks.filtered.topStrategies && (
                    <div className="mt-3">
                      <span className="text-sm text-gray-600">{lang === "fr" ? "Top strat\u00E9gies:" : "Top strategies:"}</span>
                      <div className="flex gap-2 mt-1">
                        {benchmarks.filtered.topStrategies.map((s) => (
                          <span key={s} className="px-2 py-1 bg-white rounded text-sm font-mono">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Projects Tab */}
          {tab === 'projects' && (
            <div className="space-y-4">
              <p className="text-gray-600">{lang === "fr" ? "Projets similaires partag\u00E9s par la communaut\u00E9:" : "Similar projects shared by the community:"}</p>
              {similarProjects.map((p) => (
                <div key={p.id} className="p-4 border rounded-xl hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">{p.domain}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs ml-2">{p.region}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{p.successRate}%</div>
                      <div className="text-xs text-gray-500">{p.views} views</div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full p-3 border-2 border-dashed border-purple-300 rounded-xl text-purple-600 hover:bg-purple-50 transition">
                {"\u2795 "}{lang === "fr" ? "Partager votre projet" : "Share your project"}
              </button>
            </div>
          )}

          {/* Leaderboard Tab */}
          {tab === 'leaderboard' && (
            <div className="space-y-6">
              <div className="space-y-2">
                {leaderboard.topContributors.map((c) => (
                  <div
                    key={c.rank}
                    className={"p-4 rounded-xl flex items-center gap-4 " + (c.rank === 1 ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-300' : 'bg-gray-50')}
                  >
                    <div className="text-2xl font-bold text-gray-400">#{c.rank}</div>
                    <div className="text-2xl">{c.country}</div>
                    <div className="flex-1">
                      <div className="font-bold">{c.name}</div>
                      <div className="text-sm text-gray-500">{c.projects} {lang === "fr" ? "projets" : "projects"}</div>
                    </div>
                    <div className="text-xl font-bold text-purple-600">{c.points.toLocaleString()} pts</div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-bold mb-3">{"\uD83C\uDFC5"} Badges</h3>
                <div className="flex gap-3">
                  {leaderboard.badges.map((b) => (
                    <div key={b.id} className="p-3 bg-gray-100 rounded-xl text-center">
                      <div className="text-2xl">{b.icon}</div>
                      <div className="text-xs font-medium">{b.name ? b.name[lang] : b.id}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
