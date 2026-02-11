// MOUDAR Globals Bridge
// Imports all engines, constants, and utilities and attaches them to window
// so that view components using "global" comments work correctly.
// This file must be imported BEFORE App renders (in main.jsx).

// ── External Libraries ──────────────────────────────────────
import DOMPurify from 'dompurify';
import * as docx from 'docx';
import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';
import mermaid from 'mermaid';

// ── MOUDAR Config ───────────────────────────────────────────
import MOUDAR from './utils/moudar-core-utils.js';

// ── Core Engine ─────────────────────────────────────────────
import MoudarEngine from './engines/MoudarEngine.js';

// ── Storage & Data ──────────────────────────────────────────
import StorageManager from './engines/StorageManager.js';
import InteractiveCharts from './engines/InteractiveCharts.js';
import MoudarDataManager from './engines/MoudarDataManager.js';

// ── IS Framework Engines ────────────────────────────────────
import CFIR2Evaluator from './engines/CFIR2Evaluator.js';
import CFIRUserGuide from './engines/CFIRUserGuide.js';
import COMBDiagnostic from './engines/COMBDiagnostic.js';
import NPTEvaluator from './engines/NPTEvaluator.js';
import FRAMETracker from './engines/FRAMETracker.js';
import ImplementationOutcomes from './engines/ImplementationOutcomes.js';
import PRISMEvaluator from './engines/PRISMEvaluator.js';
import IRLMGenerator from './engines/IRLMGenerator.js';
import SMARTDesigner from './engines/SMARTDesigner.js';
import SustainabilityEngine from './engines/SustainabilityEngine.js';
import HybridDesignWizard from './engines/HybridDesignWizard.js';

// ── AI & Analysis Engines ───────────────────────────────────
import DeepAIAnalyzer from './engines/DeepAIAnalyzer.js';
import LLMProtocolAnalyzer from './engines/LLMProtocolAnalyzer.js';
import QualitativeAnalysisEngine from './engines/QualitativeAnalysisEngine.js';
import QualitativeAssistant from './engines/QualitativeAssistant.js';
import SemanticNLP from './engines/SemanticNLP.js';
import MoudarValidator from './engines/MoudarValidator.js';
import SensitivityAnalyzer from './engines/SensitivityAnalyzer.js';

// ── Advanced Tools ──────────────────────────────────────────
import AdaptiveImplementationEngine from './engines/AdaptiveImplementationEngine.js';
import BenchmarkingEngine from './engines/BenchmarkingEngine.js';
import DigitalTwinModule from './engines/DigitalTwinModule.js';
import EvidenceRepository from './engines/EvidenceRepository.js';
import GrantAIWriter from './engines/GrantAIWriter.js';
import ISOntologyEngine from './engines/ISOntologyEngine.js';
import MoudarSDK from './engines/MoudarSDK.js';
import BudgetImpactAnalyzer from './engines/BudgetImpactAnalyzer.js';
import StakeholderMapper from './engines/StakeholderMapper.js';
import TheoryOfChangeEngine from './engines/TheoryOfChangeEngine.js';
import BibliographicAPI from './engines/BibliographicAPI.js';
import PortfolioManager from './engines/PortfolioManager.js';

// ── Collaboration & Integration ─────────────────────────────
import RealtimeCollaboration from './engines/RealtimeCollaboration.js';
import LocalLLMEngine from './engines/LocalLLMEngine.js';
import PowerPointExporter from './engines/PowerPointExporter.js';
import SocialNetworkAnalyzer from './engines/SocialNetworkAnalyzer.js';
import ImplementationMonitor from './engines/ImplementationMonitor.js';
import GeoMapEngine from './engines/GeoMapEngine.js';
import ScalingSimulator from './engines/ScalingSimulator.js';
import DHIS2Connector from './engines/DHIS2Connector.js';
import VoiceAssistant from './engines/VoiceAssistant.js';
import DemoGuide from './engines/DemoGuide.js';
import OnboardingWizard from './engines/OnboardingWizard.js';

// ── Specification Engines ───────────────────────────────────
import MoudarCFIRDomainWeightingModel from './engines/MoudarCFIRDomainWeightingModel.js';
import MoudarAPISpecification from './engines/MoudarAPISpecification.js';
import MoudarNLPPipeline from './engines/MoudarNLPPipeline.js';
import MoudarVerticalStrategy from './engines/MoudarVerticalStrategy.js';
import MoudarAnnotationSystem from './engines/MoudarAnnotationSystem.js';

// ── Constants ───────────────────────────────────────────────
import {
  EXAMPLE_PROJECTS,
  DEMO_PROJECT,
  DEMO_DIAGNOSTIC_ANSWERS,
  DOMAINS,
  SECTOR_EXAMPLES,
  SECTOR_TERMS,
  SECTOR_CATEGORIES,
  PHASES,
  DIAGNOSTIC_QUESTIONS,
  PRICING,
} from './data/constants.js';

import { USE_CASES } from './data/use-cases.js';

import {
  ROADMAP_IMPROVEMENT_AXES,
  ROADMAP_WEIGHTING_MODEL,
  ROADMAP_CRITICAL_RISKS,
} from './data/roadmap-data.js';

// ── Utilities ───────────────────────────────────────────────
import {
  tObj,
  getStatusBadge,
  generateIntelligentProtocol,
  getSectorTerms,
  loadExampleProjects,
  exportImplementationTableCSV,
} from './utils/helpers.js';

import {
  getSupabaseUser,
  moudarSyncProjectToSupabase,
  safeMoudarFetch,
} from './utils/supabase-utils.js';

import launchGoldDemo from './utils/launchGoldDemo.js';

// ═══════════════════════════════════════════════════════════════
// Attach everything to window for /* global */ compatibility
// ═══════════════════════════════════════════════════════════════

// External libraries
window.DOMPurify = DOMPurify;
window.docx = docx;
window.saveAs = saveAs;
window.html2pdf = html2pdf;
window.mermaid = mermaid;

// MOUDAR Config
window.MOUDAR = MOUDAR;
window.MOUDAR_API_BASE = MOUDAR?.API?.base || '';
window.MOUDAR_API_KEY = MOUDAR?.API?.key || '';

// Core engine
window.MoudarEngine = MoudarEngine;

// Storage & data
window.StorageManager = StorageManager;
window.InteractiveCharts = InteractiveCharts;
window.MoudarDataManager = MoudarDataManager;

// IS Framework engines
window.CFIR2Evaluator = CFIR2Evaluator;
window.CFIRUserGuide = CFIRUserGuide;
window.COMBDiagnostic = COMBDiagnostic;
window.NPTEvaluator = NPTEvaluator;
window.FRAMETracker = FRAMETracker;
window.ImplementationOutcomes = ImplementationOutcomes;
window.PRISMEvaluator = PRISMEvaluator;
window.IRLMGenerator = IRLMGenerator;
window.SMARTDesigner = SMARTDesigner;
window.SustainabilityEngine = SustainabilityEngine;
window.HybridDesignWizard = HybridDesignWizard;

// AI & analysis engines
window.DeepAIAnalyzer = DeepAIAnalyzer;
window.LLMProtocolAnalyzer = LLMProtocolAnalyzer;
window.QualitativeAnalysisEngine = QualitativeAnalysisEngine;
window.QualitativeAssistant = QualitativeAssistant;
window.SemanticNLP = SemanticNLP;
window.MoudarValidator = MoudarValidator;
window.SensitivityAnalyzer = SensitivityAnalyzer;

// Advanced tools
window.AdaptiveImplementationEngine = AdaptiveImplementationEngine;
window.BenchmarkingEngine = BenchmarkingEngine;
window.DigitalTwinModule = DigitalTwinModule;
window.EvidenceRepository = EvidenceRepository;
window.GrantAIWriter = GrantAIWriter;
window.ISOntologyEngine = ISOntologyEngine;
window.MoudarSDK = MoudarSDK;
window.BudgetImpactAnalyzer = BudgetImpactAnalyzer;
window.StakeholderMapper = StakeholderMapper;
window.TheoryOfChangeEngine = TheoryOfChangeEngine;
window.BibliographicAPI = BibliographicAPI;
window.PortfolioManager = PortfolioManager;

// Collaboration & integration
window.RealtimeCollaboration = RealtimeCollaboration;
window.LocalLLMEngine = LocalLLMEngine;
window.PowerPointExporter = PowerPointExporter;
window.SocialNetworkAnalyzer = SocialNetworkAnalyzer;
window.ImplementationMonitor = ImplementationMonitor;
window.GeoMapEngine = GeoMapEngine;
window.ScalingSimulator = ScalingSimulator;
window.DHIS2Connector = DHIS2Connector;
window.VoiceAssistant = VoiceAssistant;
window.DemoGuide = DemoGuide;
window.OnboardingWizard = OnboardingWizard;

// Specification engines
window.MoudarCFIRDomainWeightingModel = MoudarCFIRDomainWeightingModel;
window.MoudarAPISpecification = MoudarAPISpecification;
window.MoudarNLPPipeline = MoudarNLPPipeline;
window.MoudarVerticalStrategy = MoudarVerticalStrategy;
window.MoudarAnnotationSystem = MoudarAnnotationSystem;

// Constants
window.EXAMPLE_PROJECTS = EXAMPLE_PROJECTS;
window.DEMO_PROJECT = DEMO_PROJECT;
window.DEMO_DIAGNOSTIC_ANSWERS = DEMO_DIAGNOSTIC_ANSWERS;
window.DOMAINS = DOMAINS;
window.SECTOR_EXAMPLES = SECTOR_EXAMPLES;
window.SECTOR_TERMS = SECTOR_TERMS;
window.SECTOR_CATEGORIES = SECTOR_CATEGORIES;
window.PHASES = PHASES;
window.DIAGNOSTIC_QUESTIONS = DIAGNOSTIC_QUESTIONS;
window.PRICING = PRICING;
window.USE_CASES = USE_CASES;
window.ROADMAP_IMPROVEMENT_AXES = ROADMAP_IMPROVEMENT_AXES;
window.ROADMAP_WEIGHTING_MODEL = ROADMAP_WEIGHTING_MODEL;
window.ROADMAP_CRITICAL_RISKS = ROADMAP_CRITICAL_RISKS;

// Utilities
window.tObj = tObj;
window.getStatusBadge = getStatusBadge;
window.generateIntelligentProtocol = generateIntelligentProtocol;
window.getSectorTerms = getSectorTerms;
window.loadExampleProjects = loadExampleProjects;
window.exportImplementationTableCSV = exportImplementationTableCSV;

// Supabase utilities
window.getSupabaseUser = getSupabaseUser;
window.moudarSyncProjectToSupabase = moudarSyncProjectToSupabase;
window.safeMoudarFetch = safeMoudarFetch;
window.supabaseClient = null; // Initialized lazily by supabase-utils

// Gold demo
window.launchGoldDemo = launchGoldDemo;
