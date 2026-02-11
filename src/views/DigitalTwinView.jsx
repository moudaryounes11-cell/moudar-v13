import React, { useState } from 'react';
/* global DigitalTwinModule */

export default function DigitalTwinView({ lang = 'fr' }) {
  const [orgData, setOrgData] = useState({
    name: 'Demo Organization',
    totalStaff: 150,
    departments: 5,
    sites: 3,
    hierarchyLevels: 4,
    annualBudget: 2000000,
    implementationBudget: 200000,
    dedicatedFTE: 3,
    changeReadiness: 0.6,
    innovationHistory: 0.5,
    leadershipSupport: 0.7,
    maxTraineesPerMonth: 25,
    maxSimultaneousSites: 2,
    leadershipBandwidth: 0.4,
    techReadiness: 0.55,
    budgetFlexibility: 0.25,
    staffAvailability: 0.65,
    sustainmentRisk: 0.45
  });

  const [twin, setTwin] = useState(null);
  const [simulation, setSimulation] = useState(null);

  const createTwin = () => {
    const newTwin = DigitalTwinModule.createDigitalTwin(orgData);
    setTwin(newTwin);
    setSimulation(null);
  };

  const runSimulation = () => {
    if (!twin) return;
    const result = DigitalTwinModule.runConstrainedMonteCarlo(
      { predictedSuccess: 0.65 },
      ['S19', 'S04', 'S10'],
      twin,
      5000
    );
    setSimulation(result);
  };

  const updateOrgData = (key, value) => {
    const newData = Object.assign({}, orgData);
    newData[key] = value;
    setOrgData(newData);
  };

  return (
    <div className="fade-in">
      <div className="mb-6 p-4 bg-gradient-to-r from-pink-900/50 to-pink-700/30 rounded-xl border border-pink-500/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{"\uD83C\uDFD7\uFE0F"}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">Digital Twin v9.0</h1>
            <p className="text-pink-300 text-sm">
              {lang === 'fr'
                ? 'Mod\u00e9lisation organisationnelle pour pr\u00e9diction chirurgicale'
                : 'Organizational modeling for surgical prediction'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Organization configuration panel */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">
            {"\u2699\uFE0F"} {lang === 'fr' ? "Configuration de l'organisation" : 'Organization configuration'}
          </h3>

          <div className="space-y-4">
            {/* Total staff */}
            <div>
              <label className="text-sm text-slate-400">
                {lang === 'fr' ? 'Personnel total' : 'Total staff'}
              </label>
              <input
                type="number"
                value={orgData.totalStaff}
                onChange={(e) => {
                  updateOrgData('totalStaff', parseInt(e.target.value) || 0);
                }}
                className="w-full mt-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white"
              />
            </div>

            {/* Sites and Departments */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-400">
                  {lang === 'fr' ? 'Sites' : 'Sites'}
                </label>
                <input
                  type="number"
                  value={orgData.sites}
                  onChange={(e) => {
                    updateOrgData('sites', parseInt(e.target.value) || 0);
                  }}
                  className="w-full mt-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">
                  {lang === 'fr' ? 'D\u00e9partements' : 'Departments'}
                </label>
                <input
                  type="number"
                  value={orgData.departments}
                  onChange={(e) => {
                    updateOrgData('departments', parseInt(e.target.value) || 0);
                  }}
                  className="w-full mt-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            {/* Leadership bandwidth slider */}
            <div>
              <label className="text-sm text-slate-400">
                {lang === 'fr' ? 'Disponibilit\u00e9 leadership' : 'Leadership bandwidth'}
                {': '}
                {Math.round(orgData.leadershipBandwidth * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={orgData.leadershipBandwidth}
                onChange={(e) => {
                  updateOrgData('leadershipBandwidth', parseFloat(e.target.value));
                }}
                className="w-full mt-1"
              />
            </div>

            {/* Tech readiness slider */}
            <div>
              <label className="text-sm text-slate-400">
                {lang === 'fr' ? 'Maturit\u00e9 technologique' : 'Tech readiness'}
                {': '}
                {Math.round(orgData.techReadiness * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={orgData.techReadiness}
                onChange={(e) => {
                  updateOrgData('techReadiness', parseFloat(e.target.value));
                }}
                className="w-full mt-1"
              />
            </div>

            {/* Sustainment risk slider */}
            <div>
              <label className="text-sm text-slate-400">
                {lang === 'fr' ? 'Risque de p\u00e9rennit\u00e9' : 'Sustainment risk'}
                {': '}
                {Math.round(orgData.sustainmentRisk * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={orgData.sustainmentRisk}
                onChange={(e) => {
                  updateOrgData('sustainmentRisk', parseFloat(e.target.value));
                }}
                className="w-full mt-1"
              />
            </div>
          </div>

          <button
            onClick={createTwin}
            className="w-full mt-4 py-3 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white font-semibold rounded-xl transition-all"
          >
            {"\uD83C\uDFD7\uFE0F"} {lang === 'fr' ? 'Cr\u00e9er le Digital Twin' : 'Create Digital Twin'}
          </button>
        </div>

        {/* Results panel */}
        <div className="space-y-4">
          {twin && (
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">
                  {"\uD83C\uDFAF"} {lang === 'fr' ? 'Score de maturit\u00e9' : 'Maturity score'}
                </h3>
                <div
                  className={
                    "text-3xl font-bold " +
                    (twin.maturityScore >= 70
                      ? "text-green-400"
                      : twin.maturityScore >= 50
                        ? "text-yellow-400"
                        : "text-red-400")
                  }
                >
                  {twin.maturityScore}/100
                </div>
              </div>

              <button
                onClick={runSimulation}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-xl transition-all"
              >
                {"\uD83C\uDFB2"} {lang === 'fr' ? 'Lancer Monte Carlo (5000 it\u00e9rations)' : 'Run Monte Carlo (5000 iterations)'}
              </button>
            </div>
          )}

          {simulation && (
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">
                {"\uD83D\uDCCA"} {lang === 'fr' ? 'R\u00e9sultats de simulation' : 'Simulation results'}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-slate-400 text-sm">
                    {lang === 'fr' ? 'Probabilit\u00e9 de succ\u00e8s' : 'Success probability'}
                  </div>
                  <div
                    className={
                      "text-3xl font-bold " +
                      (simulation.successProbability >= 70
                        ? "text-green-400"
                        : simulation.successProbability >= 50
                          ? "text-yellow-400"
                          : "text-red-400")
                    }
                  >
                    {simulation.successProbability}%
                  </div>
                </div>
                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-slate-400 text-sm">
                    {lang === 'fr' ? 'Adoption moyenne' : 'Mean adoption'}
                  </div>
                  <div className="text-3xl font-bold text-pink-400">
                    {simulation.adoption.mean}%
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-900/50 rounded-lg mb-4">
                <div className="text-sm text-slate-400 mb-2">
                  {lang === 'fr' ? 'Distribution (percentiles)' : 'Distribution (percentiles)'}
                </div>
                <div className="flex justify-between text-xs">
                  <span>P10: {simulation.adoption.p10}%</span>
                  <span>P25: {simulation.adoption.p25}%</span>
                  <span className="font-bold text-white">P50: {simulation.adoption.median}%</span>
                  <span>P75: {simulation.adoption.p75}%</span>
                  <span>P90: {simulation.adoption.p90}%</span>
                </div>
              </div>

              {simulation.riskFactors.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-slate-300 mb-2">
                    {"\u26A0\uFE0F"} {lang === 'fr' ? 'Facteurs de risque' : 'Risk factors'}
                  </div>
                  {simulation.riskFactors.map((risk, i) => (
                    <div
                      key={i}
                      className={
                        "p-2 rounded mb-1 text-sm " +
                        (risk.severity === 'high'
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400")
                      }
                    >
                      {risk.message[lang]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
