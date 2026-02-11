/* global MOUDAR */
import React, { useState } from 'react';

export default function ConsensusValidationView({ lang = 'fr' }) {
  const t = (fr, en) => (lang === 'fr' ? fr : en);

  // States
  const [session, setSession] = useState(null);
  const [experts, setExperts] = useState([
    { id: 'EXP1', name: t('Dr. Expert 1', 'Dr. Expert 1'), role: 'lead_expert' },
    { id: 'EXP2', name: t('Dr. Expert 2', 'Dr. Expert 2'), role: 'senior_expert' },
    { id: 'EXP3', name: t('Expert 3', 'Expert 3'), role: 'expert' },
    { id: 'EXP4', name: t('Reviewer 1', 'Reviewer 1'), role: 'reviewer' },
  ]);
  const [currentExpert, setCurrentExpert] = useState(null);
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});
  const [report, setReport] = useState(null);

  const dimensions = [
    { id: 'feasibility', label: t('Faisabilité', 'Feasibility'), icon: '⚙️' },
    { id: 'impact', label: t('Impact', 'Impact'), icon: '📈' },
    { id: 'sustainability', label: t('Pérennité', 'Sustainability'), icon: '🌱' },
    { id: 'scalability', label: t('Scalabilité', 'Scalability'), icon: '📊' },
    { id: 'equity', label: t('Équité', 'Equity'), icon: '⚖️' },
  ];

  const roleLabels = {
    lead_expert: {
      label: t('Expert principal', 'Lead Expert'),
      weight: 1.5,
      color: 'bg-purple-100 text-purple-800',
    },
    senior_expert: {
      label: t('Expert senior', 'Senior Expert'),
      weight: 1.2,
      color: 'bg-blue-100 text-blue-800',
    },
    expert: {
      label: t('Expert', 'Expert'),
      weight: 1.0,
      color: 'bg-green-100 text-green-800',
    },
    reviewer: {
      label: t('Reviewer', 'Reviewer'),
      weight: 0.8,
      color: 'bg-yellow-100 text-yellow-800',
    },
    observer: {
      label: t('Observateur', 'Observer'),
      weight: 0.5,
      color: 'bg-gray-100 text-gray-800',
    },
  };

  // Create a new session
  const createSession = () => {
    const newSession = MOUDAR.Consensus.createSession(
      'PROJ_' + Date.now(),
      dimensions.map((d) => d.id),
      experts
    );
    setSession(newSession);
    setReport(null);
    MOUDAR.Feedback.success(t('Session de validation créée', 'Validation session created'));
  };

  // Submit a vote
  const submitVote = () => {
    if (!session || !currentExpert) return;
    const expert = experts.find((e) => e.id === currentExpert);
    if (!expert) return;
    MOUDAR.Consensus.addVote(session, expert.id, expert.role, scores, comments);
    setSession({ ...session });
    setScores({});
    setComments({});
    setCurrentExpert(null);
    MOUDAR.Feedback.success(
      t('Vote enregistré pour ' + expert.name, 'Vote recorded for ' + expert.name)
    );
  };

  // Calculate consensus
  const calculateConsensus = () => {
    if (!session) return;
    MOUDAR.Consensus.calculateConsensus(session);
    MOUDAR.Consensus.identifyDivergences(session);
    const newReport = MOUDAR.Consensus.generateReport(session, lang);
    setReport(newReport);
    setSession({ ...session });
    MOUDAR.Feedback.info(t('Consensus calculé', 'Consensus calculated'));
  };

  // Update a score
  const updateScore = (dimId, value) => {
    const newScores = { ...scores };
    newScores[dimId] = parseInt(value);
    setScores(newScores);
  };

  // Add an expert
  const addExpert = (name, role) => {
    if (!name.trim()) return;
    const newExpert = {
      id: 'EXP_' + Date.now(),
      name: name,
      role: role || 'expert',
    };
    setExperts([...experts, newExpert]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🤝</span>
          <div>
            <h1 className="text-2xl font-bold">
              {t('Validation par Consensus', 'Consensus Validation')}
            </h1>
            <p className="text-indigo-100">
              {t(
                'Évaluation multi-experts avec détection des divergences',
                'Multi-expert assessment with divergence detection'
              )}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">🔒 v11.0</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            👥 {experts.length} {t('experts', 'experts')}
          </span>
          {session && (
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              📊 {session.votes.length} {t('votes', 'votes')}
            </span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={createSession}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          ➕ {t('Nouvelle session', 'New Session')}
        </button>

        {session && session.votes.length >= 2 && (
          <button
            onClick={calculateConsensus}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
          >
            📊 {t('Calculer le consensus', 'Calculate Consensus')}
          </button>
        )}

        {session && (
          <button
            onClick={() => {
              MOUDAR.Consensus.exportSessionFile(session);
              MOUDAR.Feedback.success(
                t(
                  'Fichier .moudar exporté — envoyez-le aux experts par email',
                  '.moudar file exported — send to experts by email'
                )
              );
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            📤 {t('Exporter .moudar', 'Export .moudar')}
          </button>
        )}

        {session && currentExpert && (
          <button
            onClick={() => {
              MOUDAR.Consensus.exportVoteFile(session, currentExpert, scores, comments);
              MOUDAR.Feedback.success(t('Fichier .vote exporté', '.vote file exported'));
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            🗳️ {t('Exporter mon .vote', 'Export my .vote')}
          </button>
        )}

        {session && (
          <label className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center gap-2 cursor-pointer">
            📥 {t('Importer .vote', 'Import .vote')}
            <input
              type="file"
              accept=".vote"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length === 0) return;
                const promises = files.map(
                  (f) =>
                    new Promise((resolve) => {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        try {
                          resolve(JSON.parse(ev.target.result));
                        } catch (err) {
                          resolve(null);
                        }
                      };
                      reader.readAsText(f);
                    })
                );
                Promise.all(promises).then((payloads) => {
                  const valid = payloads.filter((p) => p !== null);
                  const result = MOUDAR.Consensus.importVoteFiles(session, valid);
                  setSession({ ...session });
                  MOUDAR.Feedback.success(
                    t(
                      result.imported + ' votes importés sur ' + result.total,
                      result.imported + ' votes imported of ' + result.total
                    )
                  );
                  if (result.errors.length > 0) {
                    MOUDAR.Feedback.error(result.errors.join(', '));
                  }
                });
                e.target.value = '';
              }}
            />
          </label>
        )}

        {session && session.consensus && (
          <button
            onClick={() => {
              const alpha = MOUDAR.Consensus.computeKrippendorffsAlpha(session);
              const msg =
                "Krippendorff's Alpha: " +
                (alpha.alpha !== null ? alpha.alpha : 'N/A') +
                ' (' +
                alpha.interpretation +
                ')';
              MOUDAR.Feedback.info(msg);
              MOUDAR.Consensus.exportConsensusReport(session, lang);
            }}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition flex items-center gap-2"
          >
            📋 {t('Rapport + Alpha K', 'Report + Alpha K')}
          </button>
        )}
      </div>

      {/* Expert Panel */}
      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          👥 {t("Panel d'experts", 'Expert Panel')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {experts.map((expert) => {
            const roleInfo = roleLabels[expert.role] || roleLabels.expert;
            const hasVoted =
              session && session.votes.some((v) => v.expertId === expert.id);
            return (
              <div
                key={expert.id}
                className={
                  'p-4 rounded-lg border-2 transition cursor-pointer ' +
                  (hasVoted
                    ? 'border-green-500 bg-green-50'
                    : currentExpert === expert.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-400')
                }
                onClick={() => {
                  if (!hasVoted && session) setCurrentExpert(expert.id);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{expert.name}</span>
                  {hasVoted && <span className="text-green-600">✓</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={'text-xs px-2 py-1 rounded-full ' + roleInfo.color}>
                    {roleInfo.label}
                  </span>
                  <span className="text-xs text-gray-500">×{roleInfo.weight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vote form */}
      {session && currentExpert && (
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            📝 {t('Vote de', 'Vote by')}{' '}
            {experts.find((e) => e.id === currentExpert).name}
          </h2>
          <div className="space-y-4">
            {dimensions.map((dim) => (
              <div key={dim.id} className="p-4 rounded-lg bg-gray-50 border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{dim.icon}</span>
                    <span className="font-medium text-gray-800">{dim.label}</span>
                  </div>
                  <span className="text-2xl font-bold text-indigo-600">
                    {scores[dim.id] || 0}/100
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scores[dim.id] || 50}
                  onChange={(e) => updateScore(dim.id, e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <textarea
                  placeholder={t('Commentaire optionnel...', 'Optional comment...')}
                  value={comments[dim.id] || ''}
                  onChange={(e) => {
                    const newComments = { ...comments };
                    newComments[dim.id] = e.target.value;
                    setComments(newComments);
                  }}
                  className="w-full mt-2 p-2 border rounded-lg text-sm"
                  rows="2"
                />
              </div>
            ))}
          </div>
          <button
            onClick={submitVote}
            disabled={Object.keys(scores).length < dimensions.length}
            className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50"
          >
            ✓ {t('Soumettre le vote', 'Submit Vote')}
          </button>
        </div>
      )}

      {/* Report */}
      {report && (
        <div className="space-y-6">
          {/* Consensus status banner */}
          <div
            className={
              'rounded-xl p-6 ' +
              (report.summary.readyForDecision
                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                : 'bg-gradient-to-r from-amber-500 to-orange-500') +
              ' text-white'
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">
                  {report.summary.consensusStatus}
                </h3>
                <p className="opacity-90">
                  {t('Participation', 'Participation')}: {report.summary.participationRate}{' '}
                  ({report.summary.votesReceived}/{report.summary.totalExperts})
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{report.summary.overallScore}</div>
                <div className="text-sm opacity-90">/100</div>
              </div>
            </div>
          </div>

          {/* Dimension scores grid */}
          <div className="bg-white rounded-xl p-6 shadow-lg border">
            <h3 className="font-bold text-gray-800 mb-4">
              {t('Scores par dimension', 'Scores by Dimension')}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {dimensions.map((dim) => {
                const score = report.dimensionScores[dim.id] || 0;
                const level = session.consensus.divergenceLevel[dim.id];
                const levelColor =
                  level === 'consensus'
                    ? 'bg-green-100 text-green-800'
                    : level === 'moderate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800';
                return (
                  <div key={dim.id} className="p-4 rounded-lg border text-center">
                    <span className="text-2xl">{dim.icon}</span>
                    <div className="font-medium text-gray-800 mt-1">{dim.label}</div>
                    <div className="text-2xl font-bold text-indigo-600 mt-2">{score}</div>
                    <span className={'text-xs px-2 py-1 rounded-full ' + levelColor}>
                      {level === 'consensus' ? '✓' : level === 'moderate' ? '~' : '!'}{' '}
                      {level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Discussion points */}
          <div className="bg-white rounded-xl p-6 shadow-lg border">
            <h3 className="font-bold text-gray-800 mb-4">
              {t('Points de discussion', 'Discussion Points')}
            </h3>
            <div className="space-y-3">
              {report.discussionPoints.map((point, i) => {
                const bgColor =
                  point.priority === 'high'
                    ? 'bg-red-50 border-red-300'
                    : point.priority === 'moderate'
                      ? 'bg-yellow-50 border-yellow-300'
                      : 'bg-green-50 border-green-300';
                return (
                  <div key={i} className={'p-4 rounded-lg border ' + bgColor}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{point.icon}</span>
                      <span className="font-medium text-gray-800">{point.title}</span>
                    </div>
                    <p className="text-sm text-gray-600">{point.description}</p>
                    <p className="text-xs text-gray-500 mt-1">➡️ {point.action}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-6 shadow-lg border">
            <h3 className="font-bold text-gray-800 mb-4">
              {t('Recommandations', 'Recommendations')}
            </h3>
            <div className="space-y-3">
              {report.recommendations.map((rec, i) => {
                const bgColor =
                  rec.priority === 'high'
                    ? 'bg-red-50'
                    : rec.priority === 'success'
                      ? 'bg-green-50'
                      : 'bg-gray-50';
                return (
                  <div key={i} className={'p-4 rounded-lg ' + bgColor}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{rec.icon}</span>
                      <span className="text-gray-800">{rec.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!session && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">🤝</div>
          <p className="text-lg">
            {t(
              'Créez une session pour démarrer la validation par consensus',
              'Create a session to start consensus validation'
            )}
          </p>
          <p className="text-sm mt-2">
            {t(
              'Les experts noteront indépendamment le projet sur 5 dimensions',
              'Experts will independently rate the project on 5 dimensions'
            )}
          </p>
        </div>
      )}
    </div>
  );
}
