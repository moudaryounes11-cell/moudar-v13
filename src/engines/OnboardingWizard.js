var OnboardingWizard = {
  STORAGE_KEY: 'moudar_onboarding_completed',
  isCompleted: function () {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  },
  markCompleted: function () {
    localStorage.setItem(this.STORAGE_KEY, 'true');
  },
  reset: function () {
    localStorage.removeItem(this.STORAGE_KEY);
  },
  getSteps: function (lang) {
    var l = lang || 'fr';
    return [{
      id: 'welcome',
      icon: '\u{1F44B}',
      title: l === 'fr' ? 'Bienvenue sur MOUDAR' : 'Welcome to MOUDAR',
      subtitle: l === 'fr' ? 'Votre copilote IA pour la Science de l\'Impl\u00e9mentation' : 'Your AI copilot for Implementation Science',
      content: l === 'fr' ? 'MOUDAR vous aide \u00e0 concevoir des projets de changement efficaces en utilisant les meilleures pratiques scientifiques.' : 'MOUDAR helps you design effective change projects using scientific best practices.',
      showSkip: true
    }, {
      id: 'profile',
      type: 'choice',
      icon: '\u{1F464}',
      title: l === 'fr' ? 'Quel est votre profil ?' : 'What is your profile?',
      subtitle: l === 'fr' ? 'Cela nous permet d\'adapter l\'interface' : 'This helps us adapt the interface',
      choices: [{
        id: 'researcher',
        icon: '\u{1F52C}',
        label: l === 'fr' ? 'Chercheur' : 'Researcher',
        description: l === 'fr' ? 'Protocoles de recherche' : 'Research protocols'
      }, {
        id: 'manager',
        icon: '\u{1F454}',
        label: l === 'fr' ? 'Gestionnaire' : 'Manager',
        description: l === 'fr' ? 'Pilotage de projets' : 'Project management'
      }, {
        id: 'clinician',
        icon: '\u2695\uFE0F',
        label: l === 'fr' ? 'Professionnel terrain' : 'Field professional',
        description: l === 'fr' ? 'Pratiques cliniques' : 'Clinical practices'
      }, {
        id: 'decider',
        icon: '\u{1F3DB}\uFE0F',
        label: l === 'fr' ? 'D\u00e9cideur' : 'Decision maker',
        description: l === 'fr' ? 'Politiques et strat\u00e9gies' : 'Policies'
      }]
    }, {
      id: 'objective',
      type: 'choice',
      icon: '\u{1F3AF}',
      title: l === 'fr' ? 'Votre objectif principal ?' : 'Your main objective?',
      subtitle: l === 'fr' ? 'Nous activerons les modules pertinents' : 'We\'ll activate relevant modules',
      choices: [{
        id: 'design',
        icon: '\u{1F4DD}',
        label: l === 'fr' ? 'Concevoir un projet' : 'Design a project',
        description: l === 'fr' ? 'Partir de z\u00e9ro' : 'Start from scratch'
      }, {
        id: 'analyze',
        icon: '\u{1F50D}',
        label: l === 'fr' ? 'Analyser un protocole' : 'Analyze a protocol',
        description: l === 'fr' ? '\u00c9valuer un document' : 'Evaluate a document'
      }, {
        id: 'evaluate',
        icon: '\u{1F4CA}',
        label: l === 'fr' ? 'Diagnostiquer' : 'Diagnose',
        description: l === 'fr' ? '\u00c9valuer la maturit\u00e9' : 'Assess maturity'
      }, {
        id: 'explore',
        icon: '\u{1F9ED}',
        label: l === 'fr' ? 'Explorer l\'outil' : 'Explore the tool',
        description: l === 'fr' ? 'D\u00e9couvrir tout' : 'Discover all'
      }]
    }, {
      id: 'features',
      type: 'tour',
      icon: '\u26A1',
      title: l === 'fr' ? 'Les fonctionnalit\u00e9s cl\u00e9s' : 'Key features',
      features: [{
        icon: '\u{1F9D9}\u200D\u2642\uFE0F',
        title: l === 'fr' ? 'Assistant Projet' : 'Project Wizard',
        description: l === 'fr' ? '7 questions pour cr\u00e9er votre protocole' : '7 questions to create your protocol'
      }, {
        icon: '\u{1F3AF}',
        title: l === 'fr' ? 'Strat\u00e9gies ERIC' : 'ERIC Strategies',
        description: l === 'fr' ? '20 strat\u00e9gies \u00e9valu\u00e9es par l\'IA' : '20 AI-evaluated strategies'
      }, {
        icon: '\u{1F4CB}',
        title: l === 'fr' ? 'Cadres CFIR & RE-AIM' : 'CFIR & RE-AIM',
        description: l === 'fr' ? '39 crit\u00e8res d\'\u00e9valuation' : '39 evaluation criteria'
      }, {
        icon: '\u{1F3C6}',
        title: l === 'fr' ? 'Certification' : 'Certification',
        description: l === 'fr' ? 'Label Moudar Ready' : 'Moudar Ready label'
      }]
    }, {
      id: 'ready',
      icon: '\u{1F680}',
      title: l === 'fr' ? 'Vous \u00eates pr\u00eat !' : 'You\'re ready!',
      content: l === 'fr' ? 'Commencez par cr\u00e9er votre premier projet ou explorez les cas d\'\u00e9tude.' : 'Start by creating your first project or explore case studies.',
      actions: [{
        id: 'create',
        label: l === 'fr' ? 'Cr\u00e9er un projet' : 'Create a project',
        primary: true
      }, {
        id: 'cases',
        label: l === 'fr' ? 'Voir les cas d\'\u00e9tude' : 'View case studies',
        primary: false
      }]
    }];
  },
  savePreferences: function (preferences) {
    localStorage.setItem('moudar_user_profile', preferences.profile || 'researcher');
    localStorage.setItem('moudar_user_objective', preferences.objective || 'explore');
  },
  getPreferences: function () {
    return {
      profile: localStorage.getItem('moudar_user_profile') || null,
      objective: localStorage.getItem('moudar_user_objective') || null
    };
  }
};

export default OnboardingWizard;
