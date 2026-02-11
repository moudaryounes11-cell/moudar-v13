function launchGoldDemo() {
    var modal = document.getElementById('goldDemoModal');
    var statusEl = document.getElementById('goldDemoStatus');
    var btn = document.getElementById('goldDemoBtn');

    // Afficher le modal de chargement
    modal.style.display = 'flex';
    btn.classList.add('loading');

    // Sc\u00e9nario Gold Standard : Sant\u00e9 Mentale au S\u00e9n\u00e9gal
    var goldProject = {
        id: 'GOLD_SENEGAL_' + Date.now(),
        title: "Programme National d'Int\u00e9gration de la Sant\u00e9 Mentale - S\u00e9n\u00e9gal",
        organization: "Minist\u00e8re de la Sant\u00e9 et de l'Action Sociale du S\u00e9n\u00e9gal",
        domain: "mentalHealth",
        phase: "preparation",
        country: "senegal",
        resourceLevel: "LMIC",
        settingType: "community",
        settingCount: 15,
        geographicScope: "national",
        populationSize: 1200000,
        teamSize: "20+",
        timeline: "36",
        budget: "1m_5m",
        experience: "moderate",

        context: "Le S\u00e9n\u00e9gal fait face \u00e0 un d\u00e9fi majeur en sant\u00e9 mentale avec seulement 0.1 psychiatre pour 100 000 habitants. Les r\u00e9gions rurales de Kolda, Matam et Tambacounda sont particuli\u00e8rement touch\u00e9es. Le Minist\u00e8re de la Sant\u00e9 a lanc\u00e9 un plan ambitieux 2024-2028 pour int\u00e9grer les soins de sant\u00e9 mentale dans les structures de soins primaires. Le programme mhGAP de l'OMS sera d\u00e9ploy\u00e9 avec une approche communautaire adapt\u00e9e au contexte culturel local, impliquant les tradipraticiens et les leaders religieux comme relais de sensibilisation.",

        population: "Population rurale des r\u00e9gions de Kolda, Matam et Tambacounda (environ 1.2 million d'habitants). Cible prioritaire : personnes souffrant de d\u00e9pression, \u00e9pilepsie, psychoses et troubles li\u00e9s \u00e0 l'usage de substances. Groupes vuln\u00e9rables : femmes en post-partum, jeunes d\u00e9scolaris\u00e9s, personnes \u00e2g\u00e9es isol\u00e9es.",

        barriers: "P\u00e9nurie critique de ressources humaines sp\u00e9cialis\u00e9es en psychiatrie. Forte stigmatisation culturelle des troubles mentaux associ\u00e9s \u00e0 des croyances traditionnelles. Surcharge de travail chronique des infirmiers chefs de poste. Financement d\u00e9pendant de l'aide internationale et donc instable. Infrastructure num\u00e9rique limit\u00e9e rendant la t\u00e9l\u00e9-supervision complexe. R\u00e9sistance de certains tradipraticiens face \u00e0 l'approche biom\u00e9dicale.",

        facilitators: "Engagement politique fort du Ministre de la Sant\u00e9. Partenariat \u00e9tabli avec l'OMS et le Fonds Mondial. Exp\u00e9rience pilote r\u00e9ussie \u00e0 Thi\u00e8s en 2022. R\u00e9seau de cases de sant\u00e9 communautaires existant. Implication des Bajenu Gox (marraines de quartier) dans la sensibilisation.",

        objectives: ["equity", "sustainability", "scale"],
        expectedOutcomes: ["adoption", "fidelity", "sustainability", "reach"],
        barrierCategories: ["knowledge", "resources", "culture", "leadership", "coordination"],

        additionalInfo: "Projet align\u00e9 sur les ODD 3.4 et 3.8. \u00c9valuation pr\u00e9vue selon le cadre RE-AIM. Partenaires techniques : OMS, USAID, Fonds Mondial. Budget estim\u00e9 : 2.5M USD sur 3 ans. Objectif : r\u00e9duire le treatment gap de 85% \u00e0 45% d'ici 2028.",

        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ["gold_standard", "senegal", "mental_health", "mhGAP", "scaling"]
    };

    // S\u00e9quence d'injection avec feedback visuel
    setTimeout(function() {
        statusEl.textContent = "Sauvegarde du projet...";

        // Sauvegarder dans localStorage
        try {
            var projects = JSON.parse(localStorage.getItem("moudar_projects") || "[]");
            projects = projects.filter(function(p) {
                return !p.tags || p.tags.indexOf('gold_standard') === -1;
            });
            projects.unshift(goldProject);
            localStorage.setItem("moudar_projects", JSON.stringify(projects));

            // Sauvegarder le projet complet pour le r\u00e9cup\u00e9rer apr\u00e8s reload
            sessionStorage.setItem('MOUDAR_GOLD_PROJECT', JSON.stringify(goldProject));

            console.log("[MOUDAR GOLD] Projet sauvegard\u00e9:", goldProject.id);
        } catch(e) {
            console.error("[MOUDAR GOLD] Erreur sauvegarde:", e);
            modal.style.display = 'none';
            btn.classList.remove('loading');
            alert("Erreur lors de la sauvegarde. Veuillez r\u00e9essayer.");
            return;
        }

        setTimeout(function() {
            statusEl.textContent = "Lancement de l'analyse IA...";

            setTimeout(function() {
                statusEl.textContent = "Redirection...";

                setTimeout(function() {
                    // Recharger la page - le projet sera charg\u00e9 automatiquement
                    location.reload();
                }, 500);
            }, 800);
        }, 600);
    }, 400);
}

export default launchGoldDemo;
