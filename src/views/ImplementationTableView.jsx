import React from 'react';
/* global saveAs */

function exportImplementationTableCSV(rows, lang) {
  try {
    const headers = lang === "fr"
      ? ["Domaine", "Phase", "Barrières", "Stratégies", "Responsable", "Statut"]
      : ["Domain", "Phase", "Barriers", "Strategies", "Owner", "Status"];
    const csvRows = [];
    csvRows.push(headers.join(","));
    rows.forEach((r) => {
      csvRows.push([
        r.domain || "",
        r.phase || "",
        (r.barriers || "").replace(/\n/g, " "),
        (r.strategies || "").replace(/\n/g, " "),
        r.responsable || r.owner || "",
        r.status || ""
      ].join(","));
    });
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    if (typeof saveAs === "function") {
      saveAs(blob, "moudar_implementation_table.csv");
    }
  } catch (e) {
    console.error("CSV export failed", e);
    alert(lang === "fr" ? "Erreur lors de l'export CSV." : "Error while exporting CSV.");
  }
}

export default function ImplementationTableView({ lang }) {
  const rows = [
    {
      domain: lang === "fr" ? "Santé mentale" : "Mental health",
      phase: lang === "fr" ? "Préparation" : "Preparation",
      barriers: lang === "fr" ? "Manque de formation des soignants à l'usage des outils de dépistage (PHQ-9, GAD-7)." : "Lack of training of providers on screening tools (PHQ-9, GAD-7).",
      strategies: lang === "fr" ? "Formation participative, supervision clinique régulière, retours de performance simples." : "Participatory training, regular clinical supervision, simple performance feedback.",
      responsable: "Dr. Amine",
      status: lang === "fr" ? "En cours" : "In progress"
    },
    {
      domain: lang === "fr" ? "Soins primaires" : "Primary care",
      phase: lang === "fr" ? "Implémentation" : "Implementation",
      barriers: lang === "fr" ? "Manque de coordination entre les centres de santé et les structures spécialisées." : "Poor coordination between primary care centers and specialized services.",
      strategies: lang === "fr" ? "Comité de pilotage local, protocoles de référence/contre-référence, réunions mensuelles." : "Local steering committee, referral / counter-referral protocols, monthly meetings.",
      responsable: "Mme Nadia",
      status: lang === "fr" ? "Prévu" : "Planned"
    },
    {
      domain: lang === "fr" ? "Éducation" : "Education",
      phase: lang === "fr" ? "Consolidation" : "Sustainment",
      barriers: lang === "fr" ? "Turn-over élevé des équipes éducatives et absence de formalisation des routines." : "High staff turnover and lack of formalized routines.",
      strategies: lang === "fr" ? "Kits pédagogiques standardisés, binômes référents, intégration dans le règlement interne." : "Standardized pedagogical kits, reference pairs, integration into internal regulations.",
      responsable: "Coordination de projet",
      status: lang === "fr" ? "À consolider" : "To consolidate"
    }
  ];

  return (
    <div className="fade-in space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {lang === "fr" ? "Vue tableur – Science de la mise en œuvre" : "Table view – Implementation Science"}
        </h1>
        <p className="text-slate-600 mt-2 max-w-3xl">
          {lang === "fr"
            ? "Visualisez les principales barrières et stratégies d'implémentation sous forme de tableau, pour faciliter le pilotage et le partage avec vos équipes."
            : "View key implementation barriers and strategies in a tabular format, to support project steering and sharing with teams."}
        </p>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 text-slate-800 px-4 py-3 text-sm">
        <p className="font-semibold">{lang === "fr" ? "Ce que montre cette vue" : "What this view shows"}</p>
        <p className="mt-1">
          {lang === "fr"
            ? "Cette vue synthétise les barrières et stratégies d'implémentation par domaine et phase. Elle joue le rôle d'un Excel spécialisé Implementation Science : prête à être exportée, discutée en réunion et jointe à un protocole."
            : "This view summarizes implementation barriers and strategies by domain and phase. It acts as an Implementation Science–aware spreadsheet: ready to export, discuss in meetings and attach to a protocol."}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-700">
              <th className="border px-3 py-2 text-left">{lang === "fr" ? "Domaine" : "Domain"}</th>
              <th className="border px-3 py-2 text-left">{lang === "fr" ? "Phase" : "Phase"}</th>
              <th className="border px-3 py-2 text-left">{lang === "fr" ? "Barrières" : "Barriers"}</th>
              <th className="border px-3 py-2 text-left">{lang === "fr" ? "Stratégies" : "Strategies"}</th>
              <th className="border px-3 py-2 text-left">{lang === "fr" ? "Responsable" : "Owner"}</th>
              <th className="border px-3 py-2 text-left">{lang === "fr" ? "Statut" : "Status"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="border px-3 py-2 align-top">{row.domain}</td>
                <td className="border px-3 py-2 align-top">{row.phase}</td>
                <td className="border px-3 py-2 align-top whitespace-pre-line">{row.barriers}</td>
                <td className="border px-3 py-2 align-top whitespace-pre-line">{row.strategies}</td>
                <td className="border px-3 py-2 align-top">{row.responsable}</td>
                <td className="border px-3 py-2 align-top">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => exportImplementationTableCSV(rows, lang)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {"\uD83D\uDCE5 "}{lang === "fr" ? "Exporter le tableau (CSV)" : "Export table (CSV)"}
        </button>
      </div>
    </div>
  );
}
