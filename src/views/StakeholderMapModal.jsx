import React, { useState } from 'react';

export default function StakeholderMapModal({ project, protocol, lang, onClose, onSave }) {
  const [stakeholders, setStakeholders] = useState(project.stakeholders || []);
  const [newStakeholder, setNewStakeholder] = useState({
    name: "",
    role: "",
    influence: "medium",
    position: "neutral"
  });

  const addStakeholder = () => {
    if (!newStakeholder.name.trim()) return;
    const updated = [...stakeholders, { ...newStakeholder, id: Date.now() }];
    setStakeholders(updated);
    setNewStakeholder({ name: "", role: "", influence: "medium", position: "neutral" });
  };

  const removeStakeholder = (id) => {
    setStakeholders(stakeholders.filter((s) => s.id !== id));
  };

  const generateEngagementPlan = () => {
    const plan = [];
    const sorted = stakeholders.slice().sort((a, b) => {
      const scoreA = (a.influence === "high" ? 3 : a.influence === "medium" ? 2 : 1) * (a.position === "opposed" ? 3 : a.position === "neutral" ? 2 : 1);
      const scoreB = (b.influence === "high" ? 3 : b.influence === "medium" ? 2 : 1) * (b.position === "opposed" ? 3 : b.position === "neutral" ? 2 : 1);
      return scoreB - scoreA;
    });

    sorted.forEach((s) => {
      const action = { stakeholder: s.name, role: s.role };

      if (s.influence === "high" && s.position === "opposed") {
        action.priority = lang === "fr" ? "\uD83D\uDD34 Critique" : "\uD83D\uDD34 Critical";
        action.action = lang === "fr" ? "R\u00E9union bilat\u00E9rale urgente" : "Urgent bilateral meeting";
        action.strategy = "S20, S12";
        action.detail = lang === "fr" ? "Comprendre les r\u00E9sistances, n\u00E9gocier, chercher un terrain d'entente" : "Understand resistance, negotiate, find common ground";
      } else if (s.influence === "high" && s.position === "neutral") {
        action.priority = lang === "fr" ? "\uD83D\uDFE0 Haute" : "\uD83D\uDFE0 High";
        action.action = lang === "fr" ? "Pr\u00E9sentation du projet + invitation \u00E0 devenir champion" : "Project presentation + invitation to become champion";
        action.strategy = "S04, S20";
        action.detail = lang === "fr" ? "Transformer en alli\u00E9 actif, proposer un r\u00F4le visible" : "Transform into active ally, offer visible role";
      } else if (s.influence === "high" && s.position === "favorable") {
        action.priority = lang === "fr" ? "\uD83D\uDFE2 Maintien" : "\uD83D\uDFE2 Maintain";
        action.action = lang === "fr" ? "Formaliser comme champion, int\u00E9grer dans coalition" : "Formalize as champion, integrate into coalition";
        action.strategy = "S04, S12";
        action.detail = lang === "fr" ? "Capitaliser sur le soutien, donner de la visibilit\u00E9" : "Capitalize on support, provide visibility";
      } else if (s.influence === "medium" && s.position === "opposed") {
        action.priority = lang === "fr" ? "\uD83D\uDFE0 Haute" : "\uD83D\uDFE0 High";
        action.action = lang === "fr" ? "Communication cibl\u00E9e, \u00E9coute des pr\u00E9occupations" : "Targeted communication, listen to concerns";
        action.strategy = "S08, S18";
        action.detail = lang === "fr" ? "R\u00E9duire l'opposition par l'information et le dialogue" : "Reduce opposition through information and dialogue";
      } else if (s.influence === "medium") {
        action.priority = lang === "fr" ? "\uD83D\uDFE1 Moyenne" : "\uD83D\uDFE1 Medium";
        action.action = lang === "fr" ? "Information r\u00E9guli\u00E8re, invitation aux \u00E9v\u00E9nements" : "Regular information, event invitations";
        action.strategy = "S08, S14";
        action.detail = lang === "fr" ? "Maintenir inform\u00E9 et engag\u00E9" : "Keep informed and engaged";
      } else {
        action.priority = lang === "fr" ? "\u26AA Standard" : "\u26AA Standard";
        action.action = lang === "fr" ? "Communication de masse, newsletters" : "Mass communication, newsletters";
        action.strategy = "S18";
        action.detail = lang === "fr" ? "Informer sans surcharger" : "Inform without overloading";
      }
      plan.push(action);
    });
    return plan;
  };

  const engagementPlan = generateEngagementPlan();

  const getMatrixPosition = (s) => {
    const influenceMap = { high: 0, medium: 1, low: 2 };
    const positionMap = { opposed: 0, neutral: 1, favorable: 2 };
    return { row: influenceMap[s.influence], col: positionMap[s.position] };
  };

  const matrix = [
    [[], [], []], // high influence
    [[], [], []], // medium influence
    [[], [], []]  // low influence
  ];
  stakeholders.forEach((s) => {
    const pos = getMatrixPosition(s);
    matrix[pos.row][pos.col].push(s);
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {"\uD83D\uDC65 "}{lang === "fr" ? "Cartographie des Parties Prenantes" : "Stakeholder Mapping"}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === "fr" ? "Identifiez les acteurs cl\u00E9s et g\u00E9n\u00E9rez un plan d'engagement" : "Identify key actors and generate engagement plan"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Add Form */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-3">
              {lang === "fr" ? "\u2795 Ajouter une partie prenante" : "\u2795 Add stakeholder"}
            </h3>
            <div className="grid md:grid-cols-5 gap-3">
              <input
                type="text"
                placeholder={lang === "fr" ? "Nom / Groupe" : "Name / Group"}
                value={newStakeholder.name}
                onChange={(e) => setNewStakeholder({ ...newStakeholder, name: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder={lang === "fr" ? "R\u00F4le" : "Role"}
                value={newStakeholder.role}
                onChange={(e) => setNewStakeholder({ ...newStakeholder, role: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <select
                value={newStakeholder.influence}
                onChange={(e) => setNewStakeholder({ ...newStakeholder, influence: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="high">{lang === "fr" ? "\uD83D\uDD3A Influence forte" : "\uD83D\uDD3A High influence"}</option>
                <option value="medium">{lang === "fr" ? "\uD83D\uDD38 Influence moyenne" : "\uD83D\uDD38 Medium influence"}</option>
                <option value="low">{lang === "fr" ? "\uD83D\uDD3B Influence faible" : "\uD83D\uDD3B Low influence"}</option>
              </select>
              <select
                value={newStakeholder.position}
                onChange={(e) => setNewStakeholder({ ...newStakeholder, position: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="opposed">{lang === "fr" ? "\u274C Oppos\u00E9" : "\u274C Opposed"}</option>
                <option value="neutral">{lang === "fr" ? "\u2796 Neutre" : "\u2796 Neutral"}</option>
                <option value="favorable">{lang === "fr" ? "\u2705 Favorable" : "\u2705 Favorable"}</option>
              </select>
              <button
                onClick={addStakeholder}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {lang === "fr" ? "Ajouter" : "Add"}
              </button>
            </div>
          </div>

          {stakeholders.length > 0 && (
            <>
              {/* Matrix */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">
                  {"\uD83D\uDCCA "}{lang === "fr" ? "Matrice Influence \u00D7 Position" : "Influence \u00D7 Position Matrix"}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 border bg-gray-100" />
                        <th className="p-2 border bg-red-100 text-red-800">{"\u274C "}{lang === "fr" ? "Oppos\u00E9" : "Opposed"}</th>
                        <th className="p-2 border bg-yellow-100 text-yellow-800">{"\u2796 "}{lang === "fr" ? "Neutre" : "Neutral"}</th>
                        <th className="p-2 border bg-green-100 text-green-800">{"\u2705 "}{lang === "fr" ? "Favorable" : "Favorable"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border bg-gray-100 font-medium text-sm">{"\uD83D\uDD3A "}{lang === "fr" ? "Forte" : "High"}</td>
                        <td className="p-2 border bg-red-50 align-top min-w-32">
                          {matrix[0][0].map((s) => <span key={s.id} className="block text-xs bg-red-200 text-red-800 rounded px-2 py-1 mb-1">{s.name}</span>)}
                        </td>
                        <td className="p-2 border bg-orange-50 align-top min-w-32">
                          {matrix[0][1].map((s) => <span key={s.id} className="block text-xs bg-orange-200 text-orange-800 rounded px-2 py-1 mb-1">{s.name}</span>)}
                        </td>
                        <td className="p-2 border bg-green-50 align-top min-w-32">
                          {matrix[0][2].map((s) => <span key={s.id} className="block text-xs bg-green-200 text-green-800 rounded px-2 py-1 mb-1">{s.name}</span>)}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border bg-gray-100 font-medium text-sm">{"\uD83D\uDD38 "}{lang === "fr" ? "Moyenne" : "Medium"}</td>
                        <td className="p-2 border bg-red-50/50 align-top">
                          {matrix[1][0].map((s) => <span key={s.id} className="block text-xs bg-red-100 text-red-700 rounded px-2 py-1 mb-1">{s.name}</span>)}
                        </td>
                        <td className="p-2 border bg-yellow-50/50 align-top">
                          {matrix[1][1].map((s) => <span key={s.id} className="block text-xs bg-yellow-100 text-yellow-700 rounded px-2 py-1 mb-1">{s.name}</span>)}
                        </td>
                        <td className="p-2 border bg-green-50/50 align-top">
                          {matrix[1][2].map((s) => <span key={s.id} className="block text-xs bg-green-100 text-green-700 rounded px-2 py-1 mb-1">{s.name}</span>)}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border bg-gray-100 font-medium text-sm">{"\uD83D\uDD3B "}{lang === "fr" ? "Faible" : "Low"}</td>
                        <td className="p-2 border align-top">
                          {matrix[2][0].map((s) => <span key={s.id} className="block text-xs bg-gray-200 text-gray-700 rounded px-2 py-1 mb-1">{s.name}</span>)}
                        </td>
                        <td className="p-2 border align-top">
                          {matrix[2][1].map((s) => <span key={s.id} className="block text-xs bg-gray-200 text-gray-700 rounded px-2 py-1 mb-1">{s.name}</span>)}
                        </td>
                        <td className="p-2 border align-top">
                          {matrix[2][2].map((s) => <span key={s.id} className="block text-xs bg-gray-200 text-gray-700 rounded px-2 py-1 mb-1">{s.name}</span>)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Engagement Plan */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">
                  {"\uD83D\uDCCB "}{lang === "fr" ? "Plan d'Engagement Auto-g\u00E9n\u00E9r\u00E9" : "Auto-generated Engagement Plan"}
                </h3>
                <div className="space-y-3">
                  {engagementPlan.map((action, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-lg border shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-800">{action.stakeholder}</span>
                            <span className="text-xs text-gray-500">({action.role})</span>
                            <span className="text-xs font-medium">{action.priority}</span>
                          </div>
                          <p className="text-sm text-blue-700 font-medium mb-1">{"\u27A1\uFE0F "}{action.action}</p>
                          <p className="text-xs text-gray-600">{action.detail}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{action.strategy}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stakeholder List */}
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-3">
                  {lang === "fr" ? "\uD83D\uDCDD Liste des parties prenantes" : "\uD83D\uDCDD Stakeholder list"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stakeholders.map((s) => {
                    const bgColor = s.position === "opposed" ? "bg-red-100" : s.position === "favorable" ? "bg-green-100" : "bg-yellow-100";
                    return (
                      <span key={s.id} className={"px-3 py-1 rounded-full text-sm flex items-center gap-2 " + bgColor}>
                        {s.name}
                        <button onClick={() => removeStakeholder(s.id)} className="text-gray-500 hover:text-red-600">{"\u00D7"}</button>
                      </span>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {stakeholders.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-3">{"\uD83D\uDC65"}</div>
              <p>{lang === "fr" ? "Ajoutez des parties prenantes pour g\u00E9n\u00E9rer la matrice et le plan d'engagement" : "Add stakeholders to generate the matrix and engagement plan"}</p>
              <p className="text-sm mt-2">
                {lang === "fr" ? "Ex: Direction, M\u00E9decins, Infirmiers, Patients, ONG, \u00C9lus..." : "Ex: Management, Doctors, Nurses, Patients, NGOs, Officials..."}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between gap-3">
          <button
            onClick={() => {
              if (onSave) onSave(stakeholders);
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {"\uD83D\uDCBE "}{lang === "fr" ? "Sauvegarder" : "Save"}
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
