import React, { useState, useRef } from 'react';
/* global DIAGNOSTIC_QUESTIONS, DEMO_DIAGNOSTIC_ANSWERS, StorageManager, tObj, docx, saveAs, html2pdf */

export default function DiagnosticView({ lang, demoMode, linkedProject }) {
  const [started, setStarted] = useState(demoMode ? true : false);
  const [answers, setAnswers] = useState(demoMode ? DEMO_DIAGNOSTIC_ANSWERS : {});
  const [results, setResults] = useState(null);
  const [orgName, setOrgName] = useState(demoMode ? "Ministère de la Santé - Région Souss-Massa" : linkedProject ? linkedProject.organization : "");
  const reportRef = useRef(null);
  const [saved, setSaved] = useState(false);

  const allQuestions = [];
  Object.keys(DIAGNOSTIC_QUESTIONS).forEach((cat) => {
    DIAGNOSTIC_QUESTIONS[cat].questions.forEach((q) => {
      allQuestions.push({ ...q, category: cat });
    });
  });

  const calculateResults = () => {
    const scores = {};
    let total = 0;
    let count = 0;
    Object.keys(DIAGNOSTIC_QUESTIONS).forEach((cat) => {
      const qs = DIAGNOSTIC_QUESTIONS[cat].questions;
      let catScore = 0;
      qs.forEach((q) => {
        const val = answers[q.id] || 0;
        catScore += val;
        total += val;
        count++;
      });
      scores[cat] = Math.round((catScore / (qs.length * 5)) * 100);
    });
    const globalScore = Math.round((total / (count * 5)) * 100);
    const strengths = [];
    const concerns = [];
    const priorities = [];
    Object.keys(scores).forEach((cat) => {
      const score = scores[cat];
      const label = tObj(DIAGNOSTIC_QUESTIONS[cat].label, lang);
      if (score >= 70) {
        strengths.push({ cat, label, score });
      } else if (score >= 50) {
        concerns.push({ cat, label, score });
      } else {
        priorities.push({ cat, label, score });
      }
    });
    let maturityLevel, interpretation;
    if (globalScore >= 80) {
      maturityLevel = lang === "fr" ? "Élevée" : "High";
      interpretation = lang === "fr"
        ? "Votre organisation dispose de solides fondations pour l'implémentation. Concentrez-vous sur l'optimisation et le partage des bonnes pratiques."
        : "Your organization has solid implementation foundations. Focus on optimization and sharing best practices.";
    } else if (globalScore >= 60) {
      maturityLevel = lang === "fr" ? "Intermédiaire" : "Intermediate";
      interpretation = lang === "fr"
        ? "Votre organisation a des atouts mais aussi des axes d'amélioration identifiés. Un travail ciblé sur les priorités accélérera votre capacité de changement."
        : "Your organization has strengths but also identified areas for improvement. Targeted work on priorities will accelerate your change capacity.";
    } else {
      maturityLevel = lang === "fr" ? "À développer" : "To develop";
      interpretation = lang === "fr"
        ? "Votre organisation nécessite un renforcement significatif avant d'entreprendre des changements majeurs. Commencez par les fondamentaux : leadership et ressources."
        : "Your organization requires significant strengthening before major changes. Start with fundamentals: leadership and resources.";
    }
    const resultData = {
      scores,
      global: globalScore,
      globalScore,
      maturityLevel,
      interpretation,
      strengths,
      concerns,
      watchpoints: concerns,
      priorities
    };
    setResults(resultData);
    if (linkedProject && linkedProject.id) {
      StorageManager.attachDiagnostic(linkedProject.id, resultData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const interpretCategory = (category, score) => {
    if (lang === "fr") {
      if (category === "leadership") {
        if (score >= 70) return "Leadership visiblement engagé dans la transformation.";
        if (score >= 50) return "Leadership présent mais à structurer davantage.";
        return "Besoin d'un sponsoring et d'un alignement plus clair du leadership.";
      }
      if (category === "culture") {
        if (score >= 70) return "Culture favorable à l'innovation et au changement.";
        if (score >= 50) return "Ouverture au changement variable selon les équipes.";
        return "Résistance au changement significative, travail de fond nécessaire.";
      }
      if (category === "resources") {
        if (score >= 70) return "Ressources adéquates pour soutenir l'implémentation.";
        if (score >= 50) return "Ressources partiellement disponibles, arbitrages nécessaires.";
        return "Déficit de ressources critique, priorisation indispensable.";
      }
      if (category === "data") {
        if (score >= 70) return "Système d'information et de suivi performant.";
        if (score >= 50) return "Données disponibles mais sous-exploitées.";
        return "Absence de données fiables pour piloter le changement.";
      }
      if (category === "capacity") {
        if (score >= 70) return "Compétences techniques et de gestion du changement présentes.";
        if (score >= 50) return "Compétences inégales, renforcement ciblé recommandé.";
        return "Besoin urgent de formation et d'accompagnement.";
      }
      if (category === "partnerships") {
        if (score >= 70) return "Réseau de partenaires actif et mobilisé.";
        if (score >= 50) return "Partenariats existants mais à dynamiser.";
        return "Isolement relatif, besoin de construire des alliances.";
      }
    } else {
      if (category === "leadership") {
        if (score >= 70) return "Leadership visibly engaged in transformation.";
        if (score >= 50) return "Leadership present but needs more structure.";
        return "Need for clearer sponsorship and leadership alignment.";
      }
      if (category === "culture") {
        if (score >= 70) return "Culture favorable to innovation and change.";
        if (score >= 50) return "Openness to change varies across teams.";
        return "Significant resistance to change, foundational work needed.";
      }
      if (category === "resources") {
        if (score >= 70) return "Adequate resources to support implementation.";
        if (score >= 50) return "Resources partially available, trade-offs needed.";
        return "Critical resource deficit, prioritization essential.";
      }
      if (category === "data") {
        if (score >= 70) return "Performant information and monitoring system.";
        if (score >= 50) return "Data available but underutilized.";
        return "Lack of reliable data to steer change.";
      }
      if (category === "capacity") {
        if (score >= 70) return "Technical and change management skills present.";
        if (score >= 50) return "Uneven skills, targeted reinforcement recommended.";
        return "Urgent need for training and support.";
      }
      if (category === "partnerships") {
        if (score >= 70) return "Active and mobilized partner network.";
        if (score >= 50) return "Existing partnerships but need revitalization.";
        return "Relative isolation, need to build alliances.";
      }
    }
    return "";
  };

  const exportReportWord = () => {
    if (!results) return;
    const scores = results.scores || {};
    const global = results.globalScore || 0;
    const strengths = [];
    const watchpoints = [];
    const priorities = [];

    Object.keys(scores).forEach((cat) => {
      const s = scores[cat] || 0;
      if (s >= 70) strengths.push({ cat, score: s });
      else if (s >= 50) watchpoints.push({ cat, score: s });
      else priorities.push({ cat, score: s });
    });

    const listCategories = (arr) => {
      if (!arr || arr.length === 0) {
        return lang === "fr" ? "aucune dimension specifique" : "no specific dimension";
      }
      const labels = arr.map((item) => tObj(DIAGNOSTIC_QUESTIONS[item.cat].label, lang));
      if (labels.length === 1) return labels[0];
      if (labels.length === 2) return labels[0] + (lang === "fr" ? " et " : " and ") + labels[1];
      const lastSep = lang === "fr" ? " et " : " and ";
      return labels.slice(0, -1).join(", ") + lastSep + labels[labels.length - 1];
    };

    let maturityLabel;
    if (global >= 80) maturityLabel = lang === "fr" ? "maturite elevee" : "high maturity";
    else if (global >= 60) maturityLabel = lang === "fr" ? "maturite intermediaire" : "intermediate maturity";
    else maturityLabel = lang === "fr" ? "maturite fragile" : "fragile maturity";

    let resumeText;
    if (lang === "fr") {
      resumeText = "Le niveau global de maturite d'implementation est de " + global + "%, ce qui correspond a une " + maturityLabel + ". ";
      if (strengths.length) resumeText += "Les forces principales se situent au niveau de : " + listCategories(strengths) + ". ";
      if (priorities.length) resumeText += "Les principaux axes a renforcer concernent : " + listCategories(priorities) + ".";
    } else {
      resumeText = "The overall implementation maturity level is " + global + "%, which corresponds to " + maturityLabel + ". ";
      if (strengths.length) resumeText += "Key strengths are in: " + listCategories(strengths) + ". ";
      if (priorities.length) resumeText += "Main areas for improvement are: " + listCategories(priorities) + ".";
    }

    const interpretCat = (cat, score) => {
      if (lang === "fr") {
        if (cat === "leadership") {
          if (score >= 70) return "Leadership visiblement engage dans la transformation.";
          if (score >= 50) return "Leadership present mais a structurer davantage.";
          return "Besoin d'un sponsoring plus clair du leadership.";
        }
        if (cat === "culture") {
          if (score >= 70) return "Culture favorable a l'amelioration continue.";
          if (score >= 50) return "Culture en transition vers l'amelioration.";
          return "Culture peu favorable au changement, a travailler.";
        }
        if (cat === "resources") {
          if (score >= 70) return "Ressources globalement adequates pour le projet.";
          if (score >= 50) return "Ressources limitees, mais mobilisables.";
          return "Ressources jugees insuffisantes pour une implementation sereine.";
        }
        if (cat === "data") {
          if (score >= 70) return "Donnees bien utilisees pour piloter l'implementation.";
          if (score >= 50) return "Donnees disponibles mais encore peu exploitees.";
          return "Systeme d'information fragile pour suivre l'implementation.";
        }
        if (cat === "capacity") {
          if (score >= 70) return "Bon niveau de competences et de capacite de changement.";
          if (score >= 50) return "Capacites presentes mais a renforcer.";
          return "Capacites techniques / changement a consolider avant d'aller plus loin.";
        }
        if (cat === "partnerships") {
          if (score >= 70) return "Reseau de partenaires solide et actif.";
          if (score >= 50) return "Partenariats presents mais sous-exploites.";
          return "Partenariats a structurer pour soutenir l'implementation.";
        }
      } else {
        if (cat === "leadership") {
          if (score >= 70) return "Leadership clearly engaged in the transformation.";
          if (score >= 50) return "Leadership present but needs clearer structure.";
          return "Need for clearer executive sponsorship.";
        }
        if (cat === "culture") {
          if (score >= 70) return "Culture supportive of continuous improvement.";
          if (score >= 50) return "Culture in transition towards improvement.";
          return "Culture is not yet supportive of change.";
        }
        if (cat === "resources") {
          if (score >= 70) return "Resources broadly adequate for the project.";
          if (score >= 50) return "Resources limited but mobilizable.";
          return "Resources perceived as insufficient for safe implementation.";
        }
        if (cat === "data") {
          if (score >= 70) return "Data are well used to steer implementation.";
          if (score >= 50) return "Data are available but underused.";
          return "Information system fragile to monitor implementation.";
        }
        if (cat === "capacity") {
          if (score >= 70) return "Good level of skills and change capacity.";
          if (score >= 50) return "Capacity present but needs reinforcement.";
          return "Technical / change capacity needs strengthening.";
        }
        if (cat === "partnerships") {
          if (score >= 70) return "Strong and active partnership network.";
          if (score >= 50) return "Partnerships exist but are underused.";
          return "Partnerships need to be developed to support implementation.";
        }
      }
      return "";
    };

    const children = [];

    children.push(new docx.Paragraph({
      text: lang === "fr" ? "RAPPORT DE DIAGNOSTIC D'IMPLEMENTATION" : "IMPLEMENTATION DIAGNOSTIC REPORT",
      heading: docx.HeadingLevel.TITLE,
      alignment: docx.AlignmentType.CENTER
    }));
    children.push(new docx.Paragraph({ text: orgName || (lang === "fr" ? "Organisation" : "Organization"), alignment: docx.AlignmentType.CENTER }));
    children.push(new docx.Paragraph({ text: new Date().toLocaleDateString(), alignment: docx.AlignmentType.CENTER }));
    children.push(new docx.Paragraph({ text: "" }));

    children.push(new docx.Paragraph({ text: lang === "fr" ? "Resume executif" : "Executive summary", heading: docx.HeadingLevel.HEADING_1 }));
    children.push(new docx.Paragraph({ text: resumeText }));
    children.push(new docx.Paragraph({ text: "" }));

    children.push(new docx.Paragraph({
      text: (lang === "fr" ? "Score global : " : "Global score: ") + global + "% - " + maturityLabel.toUpperCase(),
      heading: docx.HeadingLevel.HEADING_2
    }));
    children.push(new docx.Paragraph({ text: "" }));

    children.push(new docx.Paragraph({ text: lang === "fr" ? "Scores par dimension" : "Scores by dimension", heading: docx.HeadingLevel.HEADING_1 }));
    Object.keys(scores).forEach((cat) => {
      const label = tObj(DIAGNOSTIC_QUESTIONS[cat].label, lang);
      const score = scores[cat];
      const indicator = score >= 70 ? "[+]" : score >= 50 ? "[~]" : "[-]";
      children.push(new docx.Paragraph({ text: indicator + " " + label + " : " + score + "%" }));
    });
    children.push(new docx.Paragraph({ text: "" }));

    if (strengths.length) {
      children.push(new docx.Paragraph({ text: lang === "fr" ? "Forces (>= 70%)" : "Strengths (>= 70%)", heading: docx.HeadingLevel.HEADING_1 }));
      strengths.forEach((item) => {
        const label = tObj(DIAGNOSTIC_QUESTIONS[item.cat].label, lang);
        const interp = interpretCat(item.cat, item.score);
        children.push(new docx.Paragraph({ text: "* " + label + " (" + item.score + "%) - " + interp }));
      });
      children.push(new docx.Paragraph({ text: "" }));
    }

    if (watchpoints.length) {
      children.push(new docx.Paragraph({ text: lang === "fr" ? "Points de vigilance (50-69%)" : "Watchpoints (50-69%)", heading: docx.HeadingLevel.HEADING_1 }));
      watchpoints.forEach((item) => {
        const label = tObj(DIAGNOSTIC_QUESTIONS[item.cat].label, lang);
        const interp = interpretCat(item.cat, item.score);
        children.push(new docx.Paragraph({ text: "* " + label + " (" + item.score + "%) - " + interp }));
      });
      children.push(new docx.Paragraph({ text: "" }));
    }

    if (priorities.length) {
      children.push(new docx.Paragraph({ text: lang === "fr" ? "Priorites d'action (< 50%)" : "Priority actions (< 50%)", heading: docx.HeadingLevel.HEADING_1 }));
      priorities.forEach((item) => {
        const label = tObj(DIAGNOSTIC_QUESTIONS[item.cat].label, lang);
        const interp = interpretCat(item.cat, item.score);
        children.push(new docx.Paragraph({ text: "* " + label + " (" + item.score + "%) - " + interp }));
      });
      children.push(new docx.Paragraph({ text: "" }));
    }

    children.push(new docx.Paragraph({ text: lang === "fr" ? "Plan d'action (a completer)" : "Action plan (to be completed)", heading: docx.HeadingLevel.HEADING_1 }));
    children.push(new docx.Paragraph({
      text: lang === "fr"
        ? "Proposez 3 a 5 actions concretes, avec un responsable, une echeance et 1-2 indicateurs de suivi."
        : "Define 3-5 concrete actions, with a responsible person, deadline and 1-2 follow-up indicators."
    }));
    children.push(new docx.Paragraph({ text: "" }));

    const tableRows = [
      new docx.TableRow({
        children: [
          new docx.TableCell({ children: [new docx.Paragraph({ text: "Action" })] }),
          new docx.TableCell({ children: [new docx.Paragraph({ text: lang === "fr" ? "Responsable" : "Owner" })] }),
          new docx.TableCell({ children: [new docx.Paragraph({ text: lang === "fr" ? "Echeance" : "Deadline" })] }),
          new docx.TableCell({ children: [new docx.Paragraph({ text: lang === "fr" ? "Indicateur" : "Indicator" })] })
        ]
      })
    ];
    for (let i = 0; i < 5; i++) {
      tableRows.push(new docx.TableRow({
        children: [
          new docx.TableCell({ children: [new docx.Paragraph({ text: "" })] }),
          new docx.TableCell({ children: [new docx.Paragraph({ text: "" })] }),
          new docx.TableCell({ children: [new docx.Paragraph({ text: "" })] }),
          new docx.TableCell({ children: [new docx.Paragraph({ text: "" })] })
        ]
      }));
    }
    children.push(new docx.Table({ rows: tableRows }));
    children.push(new docx.Paragraph({ text: "" }));

    children.push(new docx.Paragraph({ text: lang === "fr" ? "Methodologie" : "Methodology", heading: docx.HeadingLevel.HEADING_1 }));
    children.push(new docx.Paragraph({
      text: lang === "fr"
        ? "Ce diagnostic a ete realise avec Moudar sur la base de 24 items repartis en 6 dimensions (leadership, culture, ressources, donnees, capacites, partenariats). Les scores refletent une auto-evaluation de l'equipe, a discuter et completer en atelier."
        : "This diagnostic was conducted using Moudar based on 24 items across 6 dimensions (leadership, culture, resources, data, capacity, partnerships). Scores reflect a team self-assessment to be discussed and refined in a workshop."
    }));
    children.push(new docx.Paragraph({ text: "" }));

    children.push(new docx.Paragraph({ text: "---" }));
    children.push(new docx.Paragraph({ text: "Moudar v8.0 - Younes MOUDAR - contact@moudar.com", alignment: docx.AlignmentType.CENTER }));

    const doc = new docx.Document({ sections: [{ children }] });
    docx.Packer.toBlob(doc).then((blob) => {
      const dateStr = new Date().toISOString().split("T")[0];
      saveAs(blob, "Diagnostic_" + (orgName || "Moudar").replace(/\s+/g, "_") + "_" + dateStr + ".docx");
    });
  };

  // Results view
  if (results) {
    const scoreColor = results.globalScore >= 70 ? "text-green-600" : results.globalScore >= 50 ? "text-yellow-600" : "text-red-600";
    const scoreBg = results.globalScore >= 70 ? "bg-green-50 border-green-200" : results.globalScore >= 50 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200";

    return (
      <div className="max-w-4xl mx-auto fade-in">
        {saved && linkedProject && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 text-center">
            <p className="text-green-700">
              {"\u2705 "}{lang === "fr" ? "Diagnostic sauvegardé dans le projet" : "Diagnostic saved to project"}{" "}
              <strong>{linkedProject.title}</strong>
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => { setResults(null); setStarted(false); setAnswers({}); }}
            className="text-blue-600 hover:text-blue-800"
          >
            {"\u2190 "}{lang === "fr" ? "Nouveau diagnostic" : "New diagnostic"}
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => {
                html2pdf().set({ margin: 10, filename: "Diagnostic_" + (orgName || "Moudar") + ".pdf" }).from(reportRef.current).save();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
            >
              {"\uD83D\uDCC4"} PDF
            </button>
            <button
              onClick={exportReportWord}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
            >
              {"\uD83D\uDCDD"} Word
            </button>
          </div>
        </div>

        <div ref={reportRef} className="bg-white rounded-xl shadow-xl p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {lang === "fr" ? "RAPPORT DE DIAGNOSTIC" : "DIAGNOSTIC REPORT"}
            </h2>
            <p className="text-gray-500">{orgName}</p>
            {linkedProject && (
              <p className="text-purple-600 text-sm mt-1">{"\uD83D\uDCC2 "}{linkedProject.title}</p>
            )}
          </div>

          <div className={"text-center p-6 rounded-xl border mb-6 " + scoreBg}>
            <div className={"text-5xl font-bold " + scoreColor}>{results.globalScore}%</div>
            <p className="text-lg font-medium mt-2">
              {lang === "fr" ? "Maturité" : "Maturity"}: {results.maturityLevel}
            </p>
            <p className="text-gray-600 text-sm mt-3 max-w-xl mx-auto">{results.interpretation}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {Object.keys(results.scores).map((cat) => {
              const score = results.scores[cat];
              const barColor = score >= 70 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";
              const textColor = score >= 70 ? "text-green-600" : score >= 50 ? "text-yellow-600" : "text-red-600";
              return (
                <div key={cat} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-sm text-gray-700">{tObj(DIAGNOSTIC_QUESTIONS[cat].label, lang)}</span>
                    <span className={"font-bold " + textColor}>{score}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className={"h-2 rounded-full transition-all " + barColor} style={{ width: score + "%" }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{interpretCategory(cat, score)}</p>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {results.strengths.length > 0 && (
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">{"\uD83D\uDCAA "}{lang === "fr" ? "Forces" : "Strengths"}</h4>
                <ul className="space-y-1">
                  {results.strengths.map((s) => (
                    <li key={s.cat} className="text-green-700 text-sm">{"\u2713 "}{s.label}</li>
                  ))}
                </ul>
              </div>
            )}
            {results.concerns.length > 0 && (
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-2">{"\u26A0\uFE0F "}{lang === "fr" ? "Vigilances" : "Concerns"}</h4>
                <ul className="space-y-1">
                  {results.concerns.map((c) => (
                    <li key={c.cat} className="text-yellow-700 text-sm">{"\u2022 "}{c.label}</li>
                  ))}
                </ul>
              </div>
            )}
            {results.priorities.length > 0 && (
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <h4 className="font-bold text-red-800 mb-2">{"\u26A1 "}{lang === "fr" ? "Priorités" : "Priorities"}</h4>
                <ul className="space-y-1">
                  {results.priorities.map((p) => (
                    <li key={p.cat} className="text-red-700 text-sm">{"\u2022 "}{p.label}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Questions form view
  if (started) {
    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / allQuestions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto fade-in">
        <div className="h-2 bg-gray-200 rounded-full mb-4">
          <div className="h-2 bg-orange-500 rounded-full transition-all" style={{ width: progress + "%" }} />
        </div>
        <p className="text-center text-sm text-gray-500 mb-4">
          {answeredCount}/{allQuestions.length} questions
        </p>
        {Object.keys(DIAGNOSTIC_QUESTIONS).map((cat) => {
          const data = DIAGNOSTIC_QUESTIONS[cat];
          return (
            <div key={cat} className="bg-white rounded-xl shadow-md p-5 mb-4">
              <h3 className="font-bold text-gray-800 mb-4">{tObj(data.label, lang)}</h3>
              {data.questions.map((q) => (
                <div key={q.id} className="mb-4">
                  <p className="text-sm text-gray-700 mb-2">{tObj(q.text, lang)}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        onClick={() => { setAnswers({ ...answers, [q.id]: v }); }}
                        className={"flex-1 py-2 rounded text-sm font-medium transition " + (answers[q.id] === v ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200")}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{lang === "fr" ? "Pas du tout" : "Not at all"}</span>
                    <span>{lang === "fr" ? "Tout à fait" : "Completely"}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
        <button
          onClick={calculateResults}
          disabled={answeredCount < allQuestions.length}
          className="w-full py-3 bg-orange-600 text-white rounded-xl disabled:opacity-50 font-medium hover:bg-orange-700 transition"
        >
          {"\uD83D\uDCCA "}{lang === "fr" ? "Voir les résultats" : "View results"}
        </button>
      </div>
    );
  }

  // Start screen
  return (
    <div className="max-w-md mx-auto fade-in text-center">
      <div className="text-6xl mb-4">{"\uD83D\uDCCA"}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {lang === "fr" ? "Diagnostic de maturité" : "Maturity Diagnostic"}
      </h2>
      <p className="text-gray-500 mb-2">{"24 questions \u2022 6 dimensions \u2022 30 min"}</p>
      <p className="text-gray-600 mb-6 text-sm">
        {lang === "fr"
          ? "En 30 minutes, obtenez un rapport structuré avec forces, vigilances et plan d'action"
          : "In 30 minutes, get a structured report with strengths, concerns and action plan"}
      </p>
      {linkedProject && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
          <p className="text-blue-700 text-sm">
            <strong>{"\uD83D\uDCC2 "}{lang === "fr" ? "Projet lié" : "Linked project"}:</strong> {linkedProject.title}
          </p>
          <p className="text-purple-600 text-xs mt-1">
            {lang === "fr" ? "Le diagnostic sera automatiquement attaché à ce projet" : "Diagnostic will be automatically attached to this project"}
          </p>
        </div>
      )}
      <div className="bg-white rounded-xl p-5 shadow-md mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lang === "fr" ? "Nom de l'organisation" : "Organization name"}
        </label>
        <input
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder={lang === "fr" ? "Ex: CHU Mohammed VI" : "Ex: Regional Hospital"}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
        />
      </div>
      <button
        onClick={() => setStarted(true)}
        className="px-8 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition"
      >
        {lang === "fr" ? "Commencer le diagnostic" : "Start diagnostic"}
      </button>
    </div>
  );
}
