import React, { useState, useEffect } from 'react';

/* global supabaseClient, getSupabaseUser */

export default function SpaceView({ onNavigate, onOpenProject, onStartDiagnostic, lang = 'fr' }) {
  const [user, setUser] = useState(getSupabaseUser());
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const fetchProjectsForUser = (u) => {
    if (!supabaseClient || !u) {
      return;
    }
    setLoading(true);
    setLoadError(null);
    supabaseClient
      .from('projects')
      .select('*')
      .eq('user_id', u.id)
      .order('created_at', { ascending: false })
      .then((result) => {
        if (result.error) {
          console.error('[MOUDAR] Supabase load projects error', result.error);
          setLoadError(result.error.message || 'Error');
          setProjects([]);
        } else {
          setProjects(result.data || []);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!supabaseClient) {
      return;
    }
    const u = getSupabaseUser();
    if (u) {
      setUser(u);
      fetchProjectsForUser(u);
    }
  }, []);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError(null);
    if (!supabaseClient) {
      setAuthError(
        t(
          "Supabase n'est pas configur\u00e9. Merci de d\u00e9finir MOUDAR_SUPABASE.url et anonKey.",
          'Supabase is not configured. Please set MOUDAR_SUPABASE.url and anonKey.'
        )
      );
      return;
    }
    const credentials = { email: email, password: password };
    let promise;
    if (authMode === 'signup') {
      promise = supabaseClient.auth.signUp(credentials);
    } else {
      promise = supabaseClient.auth.signIn(credentials);
    }
    promise.then((result) => {
      if (result.error) {
        console.error('[MOUDAR] Auth error', result.error);
        setAuthError(result.error.message || 'Auth error');
        return;
      }
      const u = getSupabaseUser();
      setUser(u);
      setEmail('');
      setPassword('');
      if (u) {
        fetchProjectsForUser(u);
      }
    });
  };

  const handleSignOut = () => {
    if (!supabaseClient) return;
    supabaseClient.auth.signOut().then(() => {
      setUser(null);
      setProjects([]);
    });
  };

  const handleOpen = (p) => {
    if (!onOpenProject) return;
    const localProject = {
      id: p.id,
      title: p.title || '',
      description: p.description || '',
      domain: p.domain || 'health',
      context: p.context || '',
      phase: p.phase || 'preparation',
      resourceLevel: p.resource_level || 'UMIC',
      barriers: p.barriers || [],
      objectives: p.objectives || [],
    };
    onOpenProject(localProject);
    if (onNavigate) {
      onNavigate('wizard');
    }
  };

  const handleDelete = (p) => {
    if (!supabaseClient) return;
    const u = typeof user !== 'undefined' && user ? user : getSupabaseUser();
    if (!u) {
      alert(
        t(
          'Vous devez \u00eatre connect\u00e9 pour supprimer un projet.',
          'You must be signed in to delete a project.'
        )
      );
      return;
    }
    if (
      !window.confirm(
        t(
          'Supprimer d\u00e9finitivement ce projet cloud ?',
          'Permanently delete this cloud project?'
        )
      )
    ) {
      return;
    }
    supabaseClient
      .from('projects')
      .delete()
      .eq('id', p.id)
      .eq('user_id', u.id)
      .then((result) => {
        if (result.error) {
          console.error('[MOUDAR] Delete project error', result.error);
          alert(
            t(
              'Erreur lors de la suppression du projet.',
              'Error while deleting project.'
            )
          );
          return;
        }
        setProjects(projects.filter((pr) => pr.id !== p.id));
      });
  };

  // --- Early return: Supabase not configured ---
  if (!supabaseClient) {
    return (
      <section className="rounded-2xl bg-white border border-slate-200 p-6 max-w-xl mx-auto text-xs space-y-3">
        <h1 className="text-sm font-semibold text-slate-900 mb-1">
          {t('Mon espace MOUDAR (Cloud)', 'My MOUDAR space (Cloud)')}
        </h1>
        <p className="text-[11px] text-slate-600">
          {t(
            'Pour activer le stockage cloud s\u00e9curis\u00e9 des projets, configurez Supabase dans index_moudar_about.html (MOUDAR_SUPABASE.url et anonKey).',
            'To enable secure cloud project storage, configure Supabase in index_moudar_about.html (MOUDAR_SUPABASE.url and anonKey).'
          )}
        </p>
      </section>
    );
  }

  // --- Early return: not signed in ---
  if (!user) {
    return (
      <section className="rounded-2xl bg-white border border-slate-200 p-6 max-w-md mx-auto text-xs space-y-4">
        <h1 className="text-sm font-semibold text-slate-900 mb-2">
          {t('Mon espace MOUDAR (Cloud)', 'My MOUDAR space (Cloud)')}
        </h1>
        <div className="flex gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={
              'px-3 py-1.5 rounded-full border ' +
              (authMode === 'signin'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300')
            }
          >
            {t('Connexion', 'Sign in')}
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={
              'px-3 py-1.5 rounded-full border ' +
              (authMode === 'signup'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300')
            }
          >
            {t('Cr\u00e9er un compte', 'Sign up')}
          </button>
        </div>
        <form onSubmit={handleAuthSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t('Mot de passe', 'Password')}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs"
              placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
            />
          </div>
          {authError && (
            <p className="text-[11px] text-red-500">{authError}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-full bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600"
          >
            {authMode === 'signin'
              ? t('Se connecter', 'Sign in')
              : t('Cr\u00e9er mon compte', 'Create my account')}
          </button>
        </form>
      </section>
    );
  }

  // --- Main view: signed in ---
  return (
    <section className="space-y-4">
      <div className="rounded-2xl bg-white border border-slate-200 p-4 text-xs flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-slate-900">
            {t('Mon espace MOUDAR (Cloud)', 'My MOUDAR space (Cloud)')}
          </h1>
          <p className="text-[11px] text-slate-500 mt-1">
            {t('Connect\u00e9 en tant que', 'Signed in as')}{' '}
            <span className="font-medium">{user.email}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="px-3 py-1.5 rounded-full border border-slate-300 text-slate-600 text-[11px] hover:bg-slate-50"
        >
          {t('Se d\u00e9connecter', 'Sign out')}
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-4 text-xs">
        <h2 className="text-sm font-semibold text-slate-900 mb-3">
          {t('Mes projets en cloud', 'My cloud projects')}
        </h2>

        {loading && (
          <p className="text-[11px] text-slate-500">
            {t('Chargement des projets\u2026', 'Loading projects\u2026')}
          </p>
        )}

        {loadError && !loading && (
          <p className="text-[11px] text-red-500">
            {t(
              'Erreur lors du chargement des projets.',
              'Error while loading projects.'
            )}
          </p>
        )}

        {!loading && !loadError && projects.length === 0 && (
          <p className="text-[11px] text-slate-500">
            {t(
              'Aucun projet cloud pour l\u2019instant. Lance un diagnostic ou sauvegarde un projet pour l\u2019envoyer dans le cloud.',
              'No cloud project yet. Run a diagnostic or save a project to send it to the cloud.'
            )}
          </p>
        )}

        {!loading && !loadError && projects.length > 0 && (
          <ul className="space-y-2">
            {projects.map((p) => (
              <li
                key={p.id}
                className="border border-slate-200 rounded-xl px-3 py-2 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium text-slate-800">
                    {p.title || t('Projet sans titre', 'Untitled project')}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {t('Domaine', 'Domain')}: {p.domain || '\u2014'} {'\u00B7'}{' '}
                    {t('Contexte', 'Setting')}: {p.context || '\u2014'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpen(p)}
                    className="text-[11px] text-emerald-600 hover:underline"
                  >
                    {t('Ouvrir', 'Open')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p)}
                    className="text-[11px] text-red-500 hover:underline"
                  >
                    {t('Supprimer', 'Delete')}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
