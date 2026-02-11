# MOUDAR v13 — Guide de Migration

## Structure cible

```
moudar-v13/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html                    ← Point d'entree (50 lignes, pas 42 000)
│
├── config/
│   ├── cloudflare-llm-proxy.js   ← Proxy API Anthropic (deployer separement)
│   ├── jest.config.js
│   └── playwright.config.js
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── main.jsx                  ← ReactDOM.createRoot (5 lignes)
│   ├── App.jsx                   ← Router + lazy loading (80 lignes)
│   │
│   ├── engines/                  ← 22 moteurs IS (la valeur scientifique)
│   │   ├── index.js              ← Re-export central
│   │   ├── CFIR2Evaluator.js     ← Damschroder 2022, 39 construits
│   │   ├── CFIRUserGuide.js      ← Reardon 2025, 5 etapes/18 taches
│   │   ├── PRISMEvaluator.js     ← Feldstein 2008, 5 domaines
│   │   ├── IRLMGenerator.js      ← Smith 2020, chaine causale + Mermaid
│   │   ├── COMBDiagnostic.js     ← Michie 2011, 6 composantes + 14 TDF
│   │   ├── HybridDesignWizard.js ← Curran 2012, Type 1/2/3
│   │   ├── SustainabilityEngine.js ← Luke 2014, PSAT 8 domaines
│   │   ├── QualitativeAssistant.js ← Codage par mots-cles CFIR
│   │   ├── DeepAIAnalyzer.js     ← Wrapper API Claude (via proxy)
│   │   ├── SMARTDesigner.js      ← Almirall 2014, designs adaptatifs
│   │   ├── SuccessPrediction.js  ← Estimateur heuristique (renomme)
│   │   ├── MonteCarloSimulator.js ← Simulation heuristique
│   │   ├── GrantAIWriter.js      ← Generateur de propositions
│   │   ├── BenchmarkingEngine.js ← Intelligence collective
│   │   ├── DigitalTwinModule.js  ← Modelisation organisationnelle
│   │   ├── ConsensusEngine.js    ← Krippendorff alpha + .vote workflow
│   │   ├── AdaptiveEngine.js     ← Pilotage dynamique
│   │   ├── ISOntologyEngine.js   ← Ontologie IS
│   │   ├── EvidenceRepository.js ← Base de preuves
│   │   ├── ImplementationOutcomes.js ← 8 outcomes Proctor
│   │   └── LLMProtocolAnalyzer.js ← Analyse protocole via LLM
│   │
│   ├── views/                    ← 71 composants React
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── shared/
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── FeedbackToast.jsx
│   │   │   └── LanguageSwitcher.jsx
│   │   ├── HomeView.jsx
│   │   ├── MyProjectsView.jsx
│   │   ├── AnalyzerView.jsx
│   │   ├── CFIR2View.jsx
│   │   ├── REAIMView.jsx
│   │   ├── COMBView.jsx
│   │   ├── IRLMView.jsx
│   │   ├── ... (71 fichiers au total)
│   │   └── SecurityView.jsx
│   │
│   ├── hooks/                    ← Logique reutilisable
│   │   ├── useTranslation.js     ← t(fr, en) helper
│   │   ├── useProject.js         ← CRUD projet (Supabase/IndexedDB)
│   │   ├── useStorage.js         ← Abstraction stockage
│   │   └── useEngine.js          ← Hook generique pour appeler un moteur
│   │
│   ├── utils/                    ← Fonctions utilitaires
│   │   ├── crypto.js             ← Web Crypto API (E2E encryption)
│   │   ├── export.js             ← PDF/DOCX/CSV generation
│   │   ├── sanitize.js           ← DOMPurify wrapper
│   │   └── analytics.js          ← GA4 consent-based
│   │
│   ├── data/                     ← Donnees scientifiques (JSON, pas JS)
│   │   ├── cfir-constructs.json  ← 39 construits CFIR 2.0
│   │   ├── eric-strategies.json  ← 73 strategies Powell 2015
│   │   ├── proctor-outcomes.json ← 8 outcomes
│   │   ├── tdf-domains.json      ← 14 domaines TDF
│   │   ├── psat-domains.json     ← 8 domaines PSAT
│   │   ├── npt-components.json   ← 4 mecanismes NPT
│   │   ├── frame-dimensions.json ← 6 dimensions FRAME
│   │   ├── stari-items.json      ← 27 items StaRI
│   │   ├── countries.json        ← Donnees pays (indicateurs sante)
│   │   └── case-library.json     ← 8 cas reels
│   │
│   └── styles/
│       └── main.css              ← @tailwind imports (3 lignes)
│
└── tests/
    ├── unit/
    │   ├── CFIR2Evaluator.test.js
    │   ├── COMBDiagnostic.test.js
    │   ├── IRLMGenerator.test.js
    │   ├── SustainabilityEngine.test.js
    │   ├── ConsensusEngine.test.js
    │   ├── SuccessPrediction.test.js
    │   └── ... (1 fichier par moteur)
    └── e2e/
        ├── project-creation.spec.js
        ├── cfir-analysis.spec.js
        ├── irlm-generation.spec.js
        ├── consensus-vote.spec.js
        └── export-workflow.spec.js
```

## Procedure de migration (pas a pas)

### Etape 1 : Initialiser le projet (30 min)

```bash
npm create vite@latest moudar-v13 -- --template react
cd moudar-v13
npm install react-router-dom mermaid dompurify file-saver html2pdf.js docx
npm install -D tailwindcss postcss autoprefixer jest @testing-library/react
npx tailwindcss init -p
```

### Etape 2 : Extraire les donnees scientifiques (2h)

Ouvrir `moudar.html` et chercher chaque bloc de donnees statiques.
Les copier dans `src/data/*.json`.

Exemple pour CFIR :
1. Chercher `constructs:` dans le CFIR2Evaluator
2. Copier le tableau dans `src/data/cfir-constructs.json`
3. Valider le JSON : `cat cfir-constructs.json | python -m json.tool`

### Etape 3 : Extraire les moteurs (1 jour)

Pour chaque moteur (16 fichiers) :
1. Chercher `var XxxEngine = {` dans moudar.html
2. Copier jusqu'au `};` fermant
3. Creer `src/engines/XxxEngine.js`
4. Ajouter `export default XxxEngine;`
5. Remplacer les donnees hardcodees par `import ... from '@data/...'`
6. Ecrire le test unitaire

Ordre recommande (par importance) :
1. CFIR2Evaluator (le plus utilise)
2. IRLMGenerator (le plus innovant)
3. COMBDiagnostic (le plus complexe)
4. ConsensusEngine + Crypto (le plus sensible)
5. Les 12 autres

### Etape 4 : Extraire les vues (2-3 jours)

Pour chaque `function XxxView(props)` :
1. Copier la fonction
2. Creer `src/views/XxxView.jsx`
3. Convertir `React.createElement(...)` → JSX
4. Ajouter `import { useEngine } from '@hooks/useEngine'`
5. Remplacer les refs globales par des imports

NOTE : Claude Code (terminal) peut automatiser la conversion
React.createElement → JSX avec `@babel/plugin-transform-react-jsx`.

### Etape 5 : Deployer le proxy LLM (1h)

```bash
npm create cloudflare@latest moudar-proxy
# Copier config/cloudflare-llm-proxy.js → src/index.js
wrangler secret put ANTHROPIC_API_KEY
wrangler deploy
```

Configurer dans le frontend :
```js
window.MOUDAR_LLM_PROXY = 'https://moudar-proxy.your-account.workers.dev';
```

### Etape 6 : Tests et CI (1 jour)

```bash
npm test                    # Tous les tests unitaires
npm run test:e2e            # Tests end-to-end
npm run build               # Build production
npx serve dist              # Verifier le build
```

## Gains attendus

| Metrique          | v12 (monolithe)    | v13 (modulaire)     |
|-------------------|--------------------|---------------------|
| Fichiers          | 1                  | ~120                |
| Taille initiale   | 2.0 MB + 2.3 MB CDN | ~200 KB (lazy load) |
| Temps de demarrage | 8-12s (Babel + parse) | <2s               |
| Tests             | 0                  | ~100+               |
| Collaboration     | Impossible (1 fichier) | Git branch/merge  |
| API key exposee   | Oui (localStorage) | Non (proxy server)  |
| Mise a jour IS    | Modifier le code   | Editer un JSON      |
