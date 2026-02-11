import React, { useState, useEffect } from 'react';
/* global OnboardingWizard, StorageManager, DEMO_PROJECT, SECTOR_EXAMPLES, DOMAINS */

// ── View imports ────────────────────────────────────────────
import Header from './views/Header';
import HomeView from './views/HomeView';
import ProductView from './views/ProductView';
import AboutView from './views/AboutView';
import InvestorsView from './views/InvestorsView';
import PitchView from './views/PitchView';
import MyProjectsView from './views/MyProjectsView';
import SpaceView from './views/SpaceView';
import AnalyzerView from './views/AnalyzerView';
import WizardView from './views/WizardView';
import DiagnosticView from './views/DiagnosticView';
import UseCasesView from './views/UseCasesView';
import PricingView from './views/PricingView';
import RoadmapView from './views/RoadmapView';
import ImplementationTableView from './views/ImplementationTableView';
import ImplementationKanbanView from './views/ImplementationKanbanView';
import OnboardingWizardView from './views/OnboardingWizardView';
import ImportExportPanel from './views/ImportExportPanel';
import AIMetricsPanel from './views/AIMetricsPanel';
import AdaptiveCockpitView from './views/AdaptiveCockpitView';
import GrantsView from './views/GrantsView';
import BenchmarkView from './views/BenchmarkView';
import DigitalTwinView from './views/DigitalTwinView';
import BudgetImpactView from './views/BudgetImpactView';
import StakeholderMapView from './views/StakeholderMapView';
import ConsensusValidationView from './views/ConsensusValidationView';
import SecuritySettingsView from './views/SecuritySettingsView';
import NPTView from './views/NPTView';
import FRAMETrackerView from './views/FRAMETrackerView';
import ProctorOutcomesView from './views/ProctorOutcomesView';
import SMARTDesignView from './views/SMARTDesignView';
import ProtocolAnalyzerView from './views/ProtocolAnalyzerView';
import OntologyView from './views/OntologyView';
import EvidenceRepositoryView from './views/EvidenceRepositoryView';
import APISDKView from './views/APISDKView';
import CFIRUserGuideView from './views/CFIRUserGuideView';
import PRISMView from './views/PRISMView';
import IRLMView from './views/IRLMView';
import COMBView from './views/COMBView';
import HybridDesignView from './views/HybridDesignView';
import SustainabilityView from './views/SustainabilityView';
import QualitativeView from './views/QualitativeView';

export default function App() {
  const [view, setView] = useState('home');
  const [lang, setLang] = useState('fr');
  const [currentProject, setCurrentProject] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [diagnosticProject, setDiagnosticProject] = useState(null);

  // v8.1 states
  const [showOnboarding, setShowOnboarding] = useState(!OnboardingWizard.isCompleted());
  const [showImportExport, setShowImportExport] = useState(false);
  const [importExportProject, setImportExportProject] = useState(null);

  // Demo warning banner
  const [showDemoBanner, setShowDemoBanner] = useState(() => {
    try { return localStorage.getItem('MOUDAR_BANNER_DISMISSED') !== '1'; } catch { return true; }
  });
  // Cookie analytics consent banner
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    try {
      const consent = localStorage.getItem('MOUDAR_ANALYTICS_CONSENT');
      return consent !== 'granted' && consent !== 'denied';
    } catch { return false; }
  });

  // v9.0 - Auto-load Gold Demo project
  useEffect(() => {
    const goldProjectStr = sessionStorage.getItem('MOUDAR_GOLD_PROJECT');
    if (goldProjectStr) {
      sessionStorage.removeItem('MOUDAR_GOLD_PROJECT');
      try {
        const goldProject = JSON.parse(goldProjectStr);
        console.log('[MOUDAR GOLD] Chargement du projet Gold:', goldProject.id);
        setShowOnboarding(false);
        setCurrentProject(goldProject);
        setView('wizard');
        console.log('[MOUDAR GOLD] \u2705 Projet Gold charg\u00e9 dans le wizard');
      } catch (e) {
        console.error('[MOUDAR GOLD] Erreur parsing projet:', e);
      }
    }

    const handleGoldProject = (event) => {
      const projectId = event.detail && event.detail.projectId;
      if (projectId) {
        console.log('[MOUDAR GOLD] Ouverture du projet via \u00e9v\u00e9nement:', projectId);
        const projects = StorageManager.getProjects();
        const goldProject = projects.find((p) => p.id === projectId);
        if (goldProject) {
          setShowOnboarding(false);
          setCurrentProject(goldProject);
          setView('wizard');
        }
      }
    };
    window.addEventListener('MoudarOpenGoldProject', handleGoldProject);
    return () => {
      window.removeEventListener('MoudarOpenGoldProject', handleGoldProject);
    };
  }, []);

  const handleOpenProject = (p) => {
    setCurrentProject(p);
    setView('wizard');
  };

  const handleStartDiagnostic = (p) => {
    setDiagnosticProject(p);
    setDemoMode(false);
    setView('diagnostic');
  };

  const handleNavigate = (newView) => {
    if (newView !== 'wizard') {
      setCurrentProject(null);
    }
    if (newView !== 'diagnostic') {
      setDemoMode(false);
      setDiagnosticProject(null);
    }
    setView(newView);
  };

  const handleLoadDemo = () => {
    setCurrentProject(DEMO_PROJECT);
    setView('wizard');
  };

  const handleStartSectorExample = (sectorKey) => {
    try {
      const meta = SECTOR_EXAMPLES && SECTOR_EXAMPLES[sectorKey];
      if (!meta) {
        setCurrentProject(DEMO_PROJECT);
        setView('wizard');
        return;
      }
      const now = new Date().toISOString();
      let defaultDomain = sectorKey;
      if (!DOMAINS[defaultDomain]) {
        if (sectorKey === 'industry') defaultDomain = 'workplace';
        else if (sectorKey === 'research') defaultDomain = 'prfi';
      }
      if (!DOMAINS[defaultDomain]) {
        defaultDomain = 'health';
      }
      const project = {
        id: 'SECTOR_' + sectorKey + '_' + now,
        title: meta.title[lang] || meta.title.fr || meta.title.en,
        organization: '',
        domain: defaultDomain,
        phase: 'preparation',
        resourceLevel: 'UMIC',
        context: meta.context[lang] || meta.context.fr || meta.context.en,
        population: '',
        barriers: meta.challenge[lang] || meta.challenge.fr || meta.challenge.en,
        objectives: ['equity', 'sustainability'],
        status: 'draft',
        createdAt: now,
        updatedAt: now,
        tags: ['sector_example', sectorKey]
      };
      setCurrentProject(project);
      setDemoMode(false);
      setView('wizard');
    } catch (e) {
      console.error('handleStartSectorExample error', e);
      setCurrentProject(DEMO_PROJECT);
      setView('wizard');
    }
  };

  const handleLoadDemoDiagnostic = () => {
    setDemoMode(true);
    setDiagnosticProject(null);
    setView('diagnostic');
  };

  const handleShowImportExport = (p) => {
    setImportExportProject(p);
    setShowImportExport(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Demo Warning Banner */}
      {showDemoBanner && (
        <div style={{ position: 'sticky', top: 0, zIndex: 9999, background: '#0f172a', color: '#e2e8f0', borderBottom: '1px solid rgba(148,163,184,.35)', padding: '10px 14px', fontFamily: 'system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif', fontSize: '13px', lineHeight: '1.35' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ display: 'inline-block', marginRight: '8px' }}>
                {lang === 'fr' ? 'Mode d\u00e9monstration' : 'Demo mode'}
              </strong>
              <span>
                {lang === 'fr'
                  ? '\u00c9vitez de saisir des donn\u00e9es personnelles/patients. Les fonctions Cloud/IA et les analytics ne s\u2019activent qu\u2019avec consentement explicite. Certains indicateurs (benchmarks/leaderboard) peuvent \u00eatre simul\u00e9s en d\u00e9mo.'
                  : 'Do not enter personal/patient data. Cloud/AI features and analytics only activate with explicit consent. Some indicators (benchmarks/leaderboard) may be simulated in demo.'}
              </span>
            </div>
            <button
              onClick={() => {
                try { localStorage.setItem('MOUDAR_BANNER_DISMISSED', '1'); } catch {}
                setShowDemoBanner(false);
              }}
              style={{ background: 'rgba(226,232,240,.12)', border: '1px solid rgba(226,232,240,.25)', color: '#e2e8f0', borderRadius: '10px', padding: '6px 10px', cursor: 'pointer', flexShrink: 0 }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Cookie Analytics Consent Banner */}
      {showCookieBanner && (
        <div style={{ position: 'fixed', left: '16px', right: '16px', bottom: '16px', zIndex: 9999, background: '#ffffff', border: '1px solid rgba(15,23,42,.15)', borderRadius: '14px', padding: '12px 14px', boxShadow: '0 10px 30px rgba(2,6,23,.12)', fontFamily: 'system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '260px', flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                {lang === 'fr' ? 'Cookies analytics' : 'Analytics cookies'}
              </div>
              <div style={{ fontSize: '13px', lineHeight: '1.35', color: '#334155' }}>
                {lang === 'fr'
                  ? 'Nous utilisons des cookies analytics (Google Analytics) uniquement pour mesurer l\u2019usage de la d\u00e9mo. Vous pouvez accepter ou refuser. Le refus n\u2019impacte pas les fonctionnalit\u00e9s.'
                  : 'We use analytics cookies (Google Analytics) only to measure demo usage. You can accept or decline. Declining does not affect functionality.'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => {
                  try { localStorage.setItem('MOUDAR_ANALYTICS_CONSENT', 'denied'); } catch {}
                  setShowCookieBanner(false);
                }}
                style={{ background: '#f1f5f9', border: '1px solid rgba(15,23,42,.15)', color: '#0f172a', borderRadius: '10px', padding: '8px 10px', cursor: 'pointer' }}
              >
                {lang === 'fr' ? 'Refuser' : 'Decline'}
              </button>
              <button
                onClick={() => {
                  try { localStorage.setItem('MOUDAR_ANALYTICS_CONSENT', 'granted'); } catch {}
                  setShowCookieBanner(false);
                  if (window.MOUDAR_loadAnalytics) window.MOUDAR_loadAnalytics();
                }}
                style={{ background: '#0f172a', border: '1px solid #0f172a', color: '#ffffff', borderRadius: '10px', padding: '8px 10px', cursor: 'pointer' }}
              >
                {lang === 'fr' ? 'Accepter' : 'Accept'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding overlay */}
      {showOnboarding && (
        <OnboardingWizardView
          lang={lang}
          onComplete={(prefs, action) => {
            setShowOnboarding(false);
          }}
          onNavigate={(newView) => {
            setShowOnboarding(false);
            handleNavigate(newView);
          }}
        />
      )}

      {/* Import/Export overlay */}
      {showImportExport && (
        <ImportExportPanel
          lang={lang}
          project={importExportProject}
          onClose={() => {
            setShowImportExport(false);
            setImportExportProject(null);
          }}
          onImportComplete={(result) => {
            setShowImportExport(false);
            setImportExportProject(null);
            if (result.success) {
              handleNavigate('space');
            }
          }}
        />
      )}

      {/* Header */}
      <Header
        currentView={view}
        onNavigate={handleNavigate}
        lang={lang}
        setLang={setLang}
      />

      {/* Main content */}
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 py-6"
        role="main"
        aria-label="Contenu principal"
      >
        {view === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onLoadDemo={handleLoadDemo}
            onStartSectorExample={handleStartSectorExample}
            lang={lang}
          />
        )}
        {view === 'product' && <ProductView onNavigate={handleNavigate} lang={lang} />}
        {view === 'about' && <AboutView lang={lang} />}
        {view === 'investors' && <InvestorsView lang={lang} />}
        {view === 'pitch' && <PitchView onNavigate={handleNavigate} lang={lang} />}
        {view === 'myProjects' && (
          <MyProjectsView
            onNavigate={handleNavigate}
            onOpenProject={handleOpenProject}
            onStartDiagnostic={handleStartDiagnostic}
            lang={lang}
            onShowImportExport={handleShowImportExport}
          />
        )}
        {view === 'space' && (
          <SpaceView
            onNavigate={handleNavigate}
            onOpenProject={handleOpenProject}
            onStartDiagnostic={handleStartDiagnostic}
            lang={lang}
            onShowImportExport={handleShowImportExport}
          />
        )}
        {view === 'analyzer' && <AnalyzerView onNavigate={handleNavigate} lang={lang} />}
        {view === 'wizard' && <WizardView existingProject={currentProject} lang={lang} />}
        {view === 'diagnostic' && (
          <DiagnosticView lang={lang} demoMode={demoMode} linkedProject={diagnosticProject} />
        )}
        {view === 'cases' && <UseCasesView lang={lang} />}
        {view === 'table' && <ImplementationTableView lang={lang} />}
        {view === 'kanban' && <ImplementationKanbanView lang={lang} />}
        {view === 'pricing' && <PricingView lang={lang} />}
        {view === 'roadmap' && <RoadmapView lang={lang} />}
        {view === 'adaptive' && <AdaptiveCockpitView lang={lang} />}
        {view === 'grants' && <GrantsView lang={lang} />}
        {view === 'benchmark' && <BenchmarkView lang={lang} />}
        {view === 'digitaltwin' && <DigitalTwinView lang={lang} />}
        {view === 'budgetimpact' && <BudgetImpactView lang={lang} />}
        {view === 'stakeholders' && <StakeholderMapView lang={lang} />}
        {view === 'consensus' && <ConsensusValidationView lang={lang} />}
        {view === 'security' && <SecuritySettingsView lang={lang} />}
        {view === 'npt' && <NPTView lang={lang} project={currentProject} />}
        {view === 'frameTracker' && <FRAMETrackerView lang={lang} project={currentProject} />}
        {view === 'proctorOutcomes' && <ProctorOutcomesView lang={lang} project={currentProject} />}
        {view === 'smartDesign' && <SMARTDesignView lang={lang} project={currentProject} />}
        {view === 'protocolAnalyzer' && <ProtocolAnalyzerView lang={lang} project={currentProject} />}
        {view === 'ontology' && <OntologyView lang={lang} project={currentProject} />}
        {view === 'evidenceRepo' && <EvidenceRepositoryView lang={lang} project={currentProject} />}
        {view === 'apiSdk' && <APISDKView lang={lang} project={currentProject} />}
        {view === 'cfirGuide' && <CFIRUserGuideView lang={lang} project={currentProject} />}
        {view === 'prism' && <PRISMView lang={lang} project={currentProject} />}
        {view === 'irlm' && <IRLMView lang={lang} project={currentProject} />}
        {view === 'comB' && <COMBView lang={lang} project={currentProject} />}
        {view === 'hybridDesign' && <HybridDesignView lang={lang} project={currentProject} />}
        {view === 'sustainability' && <SustainabilityView lang={lang} project={currentProject} />}
        {view === 'qualitative' && <QualitativeView lang={lang} project={currentProject} />}
      </main>

      {/* Footer */}
      <footer
        className="bg-slate-900 text-slate-400 py-8 px-4 mt-12"
        role="contentinfo"
        aria-label="Pied de page MOUDAR"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="url(#footerGrad)" stroke="#64748b" strokeWidth="1" />
              <path d="M12 28V14L20 22L28 14V28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="12" r="2.5" fill="#34d399" />
              <defs>
                <linearGradient id="footerGrad" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="text-slate-300 mb-2 font-medium">
            Moudar {'\u2014'} {lang === 'fr' ? 'Co-pilote Science de la mise en \u0153uvre' : 'Implementation Science Co-pilot'}
          </p>
          <p className="text-xs mb-3">
            D{'\u00e9'}velopp{'\u00e9'} par Younes MOUDAR
          </p>
          <AIMetricsPanel lang={lang} />
          <p className="text-xs text-slate-600 mb-4">
            {'\u26a0\ufe0f'} {lang === 'fr'
              ? 'Version d\u00e9mo \u2014 Donn\u00e9es stock\u00e9es localement \u2014 Ne pas saisir de donn\u00e9es patients'
              : 'Demo version \u2014 Data stored locally \u2014 Do not enter patient data'}
          </p>
          <div className="flex justify-center gap-6 mb-4">
            <a href="https://moudar.com" className="text-blue-400 hover:text-blue-300 text-sm">
              {'\uD83C\uDF10'} moudar.com
            </a>
            <a href="mailto:contact@moudar.com" className="text-teal-400 hover:text-teal-300 text-sm">
              {'\uD83D\uDCE9'} {lang === 'fr' ? 'Demander une d\u00e9mo' : 'Request a demo'}
            </a>
          </div>
          <div className="flex justify-center gap-4 text-xs text-slate-600 mb-4">
            <a href="CGU_moudar.html" target="_blank" className="hover:text-slate-300 transition">
              {lang === 'fr' ? 'CGU' : 'Terms'}
            </a>
            <span>{'\u2022'}</span>
            <a href="mentions_legales_moudar.html" target="_blank" className="hover:text-slate-300 transition">
              {lang === 'fr' ? 'Mentions l\u00e9gales' : 'Legal'}
            </a>
            <span>{'\u2022'}</span>
            <a href="politique_confidentialite_moudar.html" target="_blank" className="hover:text-slate-300 transition">
              {lang === 'fr' ? 'Confidentialit\u00e9' : 'Privacy'}
            </a>
          </div>
          <div className="border-t border-slate-700 pt-4 mt-2">
            <p className="text-xs text-slate-600 mb-1">
              {'\u00a9'} 2025 <strong className="text-slate-100">Younes MOUDAR</strong> {'\u2013'} <strong className="text-blue-400">MOUDAR</strong>{'\u00ae'}
            </p>
            <p className="text-xs text-slate-600">
              {lang === 'fr'
                ? 'Tous droits r\u00e9serv\u00e9s \u2022 Version 11.0 Scientific Excellence (CFIR 2.0 Exact, ERIC, Equity, NPT, Proctor, FRAME, E2EE, Consensus)'
                : 'All rights reserved \u2022 Version 11.0 Scientific Excellence (CFIR 2.0 Exact, ERIC, Equity, NPT, Proctor, FRAME, E2EE, Consensus)'}
            </p>
            <p className="text-xs text-slate-700 mt-1 italic">
              {lang === 'fr'
                ? 'Algorithme propri\u00e9taire prot\u00e9g\u00e9 \u2014 MOUDAR Younes'
                : 'Proprietary algorithm protected \u2014 Younes MOUDAR'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
