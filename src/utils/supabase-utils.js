function getSupabaseClient() {
  return window.supabaseClient || null;
}

function getSupabaseUser() {
  const client = getSupabaseClient();
  if (!client || !client.auth) return null;
  try {
    return client.auth.user();
  } catch (e) {
    return null;
  }
}

function moudarSyncProjectToSupabase(project) {
  const client = getSupabaseClient();
  if (!client || !project) return;
  const user = getSupabaseUser();
  if (!user) return;
  const payload = {
    id: project.id,
    user_id: user.id,
    title: project.title || "",
    description: project.description || project.shortDescription || "",
    domain: project.domain || null,
    context: project.context || "",
    phase: project.phase || null,
    resource_level: project.resourceLevel || project.resource_level || null,
    barriers: project.barriers || [],
    objectives: project.objectives || [],
    status: project.status || null,
    engine_version: "8.5.0"
  };
  client.from("projects").upsert(payload).then((result) => {
    if (result.error) {
      console.error("[MOUDAR] Supabase sync error", result.error);
    }
  });
}

// Configuration API backend Moudar (IA)
// Cloud API configuration (reads from MOUDAR.API, not window globals)
var MOUDAR_API_BASE = (typeof MOUDAR !== 'undefined' && MOUDAR.API ? MOUDAR.API.base : "").trim();
var MOUDAR_API_KEY = (typeof MOUDAR !== 'undefined' && MOUDAR.API ? MOUDAR.API.key : "").trim();

// Cloud/IA calls are opt-in: prompt for configuration if not set.
function ensureCloudAIConfig() {
  try {
    // Refresh from localStorage (in case user configured after page load)
    if (!MOUDAR_API_BASE) {
      var storedBase = (sessionStorage.getItem('MOUDAR_API_BASE') || '').trim();
      if (storedBase) MOUDAR_API_BASE = storedBase;
    }
    if (!MOUDAR_API_KEY) {
      var storedKey = (sessionStorage.getItem('MOUDAR_API_KEY') || '').trim();
      if (storedKey) MOUDAR_API_KEY = storedKey;
    }
    if (!MOUDAR_API_BASE) {
      var ok = window.confirm("Les fonctions Cloud/IA ne sont pas configur\u00e9es. Voulez-vous les activer maintenant ?\n\nAucune donn\u00e9e n'est envoy\u00e9e tant que vous n'activez pas explicitement ces fonctions.");
      if (!ok) return null;
      var base = window.prompt("URL de l'API MOUDAR (ex: https://\u2026/api/v1) :", "");
      if (!base) return null;
      base = String(base).trim().replace(/\/+$/, "");
      var key = window.prompt("Cl\u00e9 API (optionnelle) :", "") || "";
      key = String(key).trim();
      sessionStorage.setItem('MOUDAR_API_BASE', base);
      sessionStorage.setItem('MOUDAR_API_KEY', key);
      MOUDAR_API_BASE = base;
      MOUDAR_API_KEY = key;
    }
    return {
      base: MOUDAR_API_BASE,
      key: MOUDAR_API_KEY
    };
  } catch (e) {
    return null;
  }
}

function safeMoudarFetch(path, options) {
  var cfg = ensureCloudAIConfig();
  if (!cfg) {
    return Promise.reject(new Error("Cloud/IA d\u00e9sactiv\u00e9e"));
  }
  var url = cfg.base.replace(/\/+$/, "") + path;
  var opts = options || {};
  opts.headers = opts.headers || {};
  if (cfg.key && !opts.headers["Authorization"]) {
    opts.headers["Authorization"] = "Bearer " + cfg.key;
  }
  return fetch(url, opts);
}

export {
  getSupabaseUser,
  moudarSyncProjectToSupabase,
  ensureCloudAIConfig,
  safeMoudarFetch
};
