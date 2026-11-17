document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       1. LIGHTBOX : ZOOM PLEIN ÉCRAN SUR LES CAPTURES TECHNIQUES
       ========================================================= */
    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.getElementById("lightbox-img");
    const modalCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("lightbox-close");

    document.querySelectorAll(".card-media img").forEach((img) => {
        img.title = "Cliquer pour agrandir";
        img.addEventListener("click", () => {
            if (!modal) return;
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalCaption.textContent = img.alt || "";
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
        });
    });

    function closeLightbox() {
        if (!modal) return;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeLightbox();
        });
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("active")) {
            closeLightbox();
        }
    });

    /* =========================================================
       2. TRADUCTION COMPLÈTE FR <-> EN (TEXTES + PARAGRAPHES HTML)
       ========================================================= */
    const toggleBtn = document.getElementById("lang-toggle");
    if (!toggleBtn) return;

    let currentLang = "fr";

    // Dictionnaire exact (balises simples & textes courts)
    const textDictionary = new Map([
        // Navigation
        ["Compétences", "Skills"],
        ["Expériences", "Experience"],
        ["Projets", "Projects"],
        ["Certificats", "Certificates"],
        ["Formation", "Education"],
        ["Contact", "Contact"],

        // Hero & Boutons
        ["Disponible pour un Stage PFE • Maintenance, Production & Qualité", "Available for Final-Year Internship (PFE) • Maintenance, Production & Quality"],
        ["Disponible pour un Stage PFE Maintenance, Production & Qualité", "Available for Final-Year Internship (PFE) • Maintenance, Production & Quality"],
        ["Élève Ingénieur en Mécatronique (ENSA Tétouan) • Maintenance 4.0, Production & Qualité Industrielle", "Mechatronics Engineering Student (ENSA Tétouan) • Maintenance 4.0, Production & Industrial Quality"],
        ["Élève Ingénieur en Mécatronique (ENSA Tétouan) Maintenance 4.0, Production & Qualité Industrielle", "Mechatronics Engineering Student (ENSA Tétouan) • Maintenance 4.0, Production & Industrial Quality"],
        ["Télécharger mon CV", "Download Resume (CV)"],

        // Bandeau Chiffres Clés (KPI)
        ["3 Piliers", "3 Pillars"],
        ["Maintenance 4.0 • Production • Qualité", "Maintenance 4.0 • Production • Quality"],
        ["5+ Projets", "5+ Projects"],
        ["Simulink, Vision IA & Supervision IoT", "Simulink, AI Vision & IoT Supervision"],
        ["4 Certificats", "4 Certificates"],
        ["Techniques, Gestion & Leadership", "Technical, Management & Leadership"],
        ["Stage PFE", "Final-Year Internship"],
        ["Disponibilité immédiate (4 à 6 mois)", "Immediate availability (4–6 months)"],

        // Section 1 : Compétences
        ["Savoir-Faire & Savoir-Être", "Hard & Soft Skills"],
        ["Domaines d'Expertise", "Areas of Expertise"],
        ["Maintenance 4.0 & Diagnostic", "Maintenance 4.0 & Diagnostics"],
        ["Maintenance préventive et prédictive, analyse vibratoire et thermique, modélisation Bond Graph pour la détection de défauts, gestion de la maintenance (GMAO).", "Preventive and predictive maintenance, vibration and thermal analysis, Bond Graph modeling for fault detection, and computerized maintenance management (CMMS)."],
        ["AMDEC", "FMEA"],
        ["Diagnostic", "Diagnostics"],
        ["Fiabilité", "Reliability"],
        ["Production & Automatisation", "Production & Automation"],
        ["Conception et pilotage de systèmes automatisés, programmation d'automates (API), supervision IoT en temps réel et optimisation des temps de cycle.", "Design and control of automated systems, PLC programming, real-time IoT supervision, and cycle-time optimization."],
        ["API / Siemens", "PLC / Siemens"],
        ["IoT & Capteurs", "IoT & Sensors"],
        ["Qualité & Amélioration Continue", "Quality & Continuous Improvement"],
        ["Contrôle qualité par vision artificielle, réduction des non-conformités, rédaction de procédures techniques standards et résolution méthodique de problèmes.", "Computer-vision quality control, non-conformity reduction, standard operating procedure (SOP) drafting, and methodical problem solving."],
        ["Vision / OpenCV", "Machine Vision / OpenCV"],
        ["Traçabilité", "Traceability"],
        ["Communication & Leadership", "Communication & Leadership"],
        ["Vulgarisation technique et formation d'équipes, gestion du stress en environnement exigeant, coordination associative et gestion rigoureuse des priorités.", "Technical knowledge transfer and team training, stress management in demanding environments, association leadership, and rigorous priority management."],
        ["Pédagogie", "Training & Pedagogy"],
        ["Relation Client", "Customer Relations"],
        ["Travail d'équipe", "Teamwork"],
        ["Agilité", "Agility"],

        // Section 2 : Expériences
        ["Parcours Terrain & R&D", "Field & R&D Experience"],
        ["Expériences Professionnelles", "Professional Experience"],
        ["Smart Automation Technologies (Tanger) • Juil. - Août 2026", "Smart Automation Technologies (Tangier) • Jul – Aug 2026"],
        ["Smart Automation Technologies (Tanger) Juil. Août 2026", "Smart Automation Technologies (Tangier) • Jul – Aug 2026"],
        ["Stage PFA — Modélisation & Diagnostic des Systèmes Électromécaniques", "Engineering Internship — Modeling & Diagnostics of Electromechanical Systems"],
        ["Stage PFA Modélisation & Diagnostic des Systèmes Électromécaniques", "Engineering Internship — Modeling & Diagnostics of Electromechanical Systems"],
        ["Maintenance Prédictive", "Predictive Maintenance"],
        ["Modélisation Multi-Physique", "Multi-Physics Modeling"],
        ["Automatisation", "Automation"],
        ["Voir l'attestation", "View Certificate"],
        ["Salle Mécatronique ENSA Tétouan • Encadrant : Pr. OULAD BEN ZAROUALA Rachad", "Mechatronics Lab ENSA Tétouan • Supervisor: Prof. OULAD BEN ZAROUALA Rachad"],
        ["Salle Mécatronique ENSA Tétouan Encadrant: Pr. OULAD BEN ZAROUALA Rachad", "Mechatronics Lab ENSA Tétouan • Supervisor: Prof. OULAD BEN ZAROUALA Rachad"],
        ["Système Intelligent de Détection de Fatigue & Somnolence", "Intelligent Driver & Operator Fatigue Detection System"],
        ["Vision par Ordinateur", "Computer Vision"],
        ["Systèmes Embarqués", "Embedded Systems"],
        ["Sécurité & Qualité", "Safety & Quality"],
        ["Expériences Complémentaires & Relationnelles", "Additional & Interpersonal Experience"],
        ["Téléconseiller Relation Client", "Customer Relations Advisor"],
        ["Gestion d'appels entrants/sortants, écoute active, résolution rapide de problématiques sous pression et communication professionnelle.", "Handling inbound/outbound calls, active listening, rapid problem-solving under pressure, and clear professional communication."],
        ["Enseignant en Cours Particuliers (Primaire - Collège)", "Private Academic Tutor (Primary & Middle School)"],
        ["Enseignant en Cours Particuliers (Primaire Collège)", "Private Academic Tutor (Primary & Middle School)"],
        ["Accompagnement scolaire en mathématiques et sciences : pédagogie, vulgarisation de notions techniques, patience et suivi personnalisé.", "Academic tutoring in mathematics and science: pedagogical clarity, simplifying technical concepts, patience, and personalized follow-up."],
        ["Accompagnement scolaire en mathématiques et sciences: pédagogie, vulgarisation de notions techniques, patience et suivi personnalisé.", "Academic tutoring in mathematics and science: pedagogical clarity, simplifying technical concepts, patience, and personalized follow-up."],

        // Section 3 : Projets
        ["Réalisations Techniques", "Technical Achievements"],
        ["Projets Académique", "Academic Projects"],
        ["Projets Académiques", "Academic Projects"],
        ["Production, Automatisation & Maintenance", "Production, Automation & Maintenance"],
        ["Modélisation Multi-Physique et Commande d'un Axe CNC sous Simulink", "Multi-Physics Modeling and Control of a CNC Axis in Simulink"],
        ["Asservissement PID", "PID Control"],
        ["Cinématique CNC", "CNC Kinematics"],
        ["Vision Artificielle & Contrôle Qualité", "Computer Vision & Quality Control"],
        ["Système d'Aide au Maintien de Voie (LKA - ADAS)", "Lane Keeping Assist System (LKA - ADAS)"],
        ["Système d'Aide au Maintien de Voie (LKA ADAS)", "Lane Keeping Assist System (LKA - ADAS)"],
        ["Traitement d'Image", "Image Processing"],
        ["Temps Réel", "Real-Time"],
        ["Industrie 4.0 • Supervision & Analyse de Données", "Industry 4.0 • Supervision & Data Analytics"],
        ["Industrie 4.0 Supervision & Analyse de Données", "Industry 4.0 • Supervision & Data Analytics"],
        ["Dashboard Interactif de Supervision Industrielle & Suivi des KPI", "Interactive Industrial Supervision & KPI Monitoring Dashboard"],
        ["Tableau de Bord", "Dashboard"],
        ["Monitoring Temps Réel", "Real-Time Monitoring"],
        ["KPI Production / Qualité", "Production / Quality KPIs"],
        ["Aide à la Décision", "Decision Support"],

        // Section 4 : Certificats
        ["Accréditations Vérifiables", "Verified Credentials"],
        ["Certificats & Attestations", "Certificates & Accreditations"],
        ["Attestation de Stage PFA — Modélisation & Diagnostic", "Engineering Internship Certificate — Modeling & Diagnostics"],
        ["Attestation de Stage PFA Modélisation & Diagnostic", "Engineering Internship Certificate — Modeling & Diagnostics"],
        ["Voir l'attestation →", "View Certificate →"],
        ["Formation Pratique sur l'Arduino (8h)", "Hands-On Arduino Training (8h)"],
        ["Club Mécatronique ENSA Tétouan", "Mechatronics Club ENSA Tétouan"],
        ["Voir le certificat →", "View Certificate →"],
        ["Gestion du Temps et des Priorités", "Time & Priority Management"],
        ["African Union Students' Council (AUSC) • 2019", "African Union Students' Council (AUSC) • 2019"],
        ["African Union Students' Council (AUSC) 2019", "African Union Students' Council (AUSC) • 2019"],
        ["Attestation de Reconnaissance — Chargé à la Communication", "Certificate of Recognition — Communications Officer"],
        ["Attestation de Reconnaissance Chargé à la Communication", "Certificate of Recognition — Communications Officer"],
        ["ANEM Section Tétouan • 2023-2024", "ANEM Tétouan Chapter • 2023–2024"],
        ["ANEM Section Tétouan 2023-2024", "ANEM Tétouan Chapter • 2023–2024"],

        // Section 5 : Formation
        ["Cursus Ingénieur", "Engineering Track"],
        ["Formation Académique", "Academic Education"],
        ["2024 - 2027 (En cours)", "2024 – 2027 (In Progress)"],
        ["2024 2027 (En cours)", "2024 – 2027 (In Progress)"],
        ["Cycle d'Ingénieur d'État — Filière Génie Mécatronique", "State Engineering Degree — Mechatronics Engineering"],
        ["Cycle d'Ingénieur d'État Filière Génie Mécatronique", "State Engineering Degree — Mechatronics Engineering"],
        ["École Nationale des Sciences Appliquées (ENSA) — Tétouan", "National School of Applied Sciences (ENSA) — Tétouan"],
        ["École Nationale des Sciences Appliquées (ENSA) Tétouan", "National School of Applied Sciences (ENSA) — Tétouan"],

        // Section Langues
        ["Communication Internationale & Terrain", "International & Shop-Floor Communication"],
        ["Langues", "Languages"],
        ["Français", "French"],
        ["Courant", "Fluent"],
        ["Anglais", "English"],
        ["En progression (Technique)", "Working Proficiency (Technical)"],
        ["Darija (Arabe marocain)", "Darija (Moroccan Arabic)"],
        ["Basique (Terrain)", "Basic (Shop-floor)"],

        // Section 6 : Contact
        ["Disponibilité Stage PFE", "Final-Year Internship Availability"],
        ["Me Contacter", "Contact Me"],
        ["Adresse E-mail", "Email Address"],
        ["Envoyer un message →", "Send a message →"],
        ["WhatsApp & Téléphone", "WhatsApp & Phone"],
        ["Discuter sur WhatsApp →", "Chat on WhatsApp →"]
    ]);

    // Paragraphes contenant du HTML interne (<strong>...</strong>)
    const htmlTranslations = [
        {
            selector: ".bio",
            en: `Versatile mechatronics engineer focused on industrial performance. I specialize in <strong>predictive maintenance and diagnostics</strong> of electromechanical systems, <strong>production flow optimization</strong> (automation, IoT supervision), and <strong>continuous quality improvement</strong> to maximize equipment reliability and availability.`
        },
        {
            selector: "#formation .timeline-content p",
            en: `Multidisciplinary specialization: <strong>Industrial Maintenance 4.0</strong> and fault diagnostics, <strong>production system control and automation</strong>, <strong>industrial quality management</strong>, Bond Graph modeling, and embedded systems.`
        }
    ];

    // Traduction des paragraphes <p> des cartes Stages & Projets
    const cardParagraphsEn = new Map([
        ["Contexte : Fiabilisation des équipements industriels automatisés et anticipation des défaillances critiques.", "<strong>Context:</strong> Enhancing the reliability of automated industrial equipment and anticipating critical failures."],
        ["Contribution : Modélisation énergétique des chaînes électromécaniques, analyse des modes de défaillance et proposition d'indicateurs de suivi.", "<strong>Contribution:</strong> Energy-based modeling of electromechanical drive trains, failure mode analysis, and design of monitoring KPIs."],
        ["Résultat : Détection précoce des anomalies de fonctionnement et amélioration de la disponibilité machine.", "<strong>Result:</strong> Early detection of operational anomalies and improved machine availability."],

        ["Contexte : Travaux pratiques de R&D appliqués à la prévention des risques opérateurs et conducteurs.", "<strong>Context:</strong> Applied R&D project focused on operator and driver safety risk prevention."],
        ["Contribution : Conception et implémentation d'un algorithme embarqué d'analyse faciale en temps réel (suivi oculaire et clignements).", "<strong>Contribution:</strong> Design and implementation of an embedded real-time facial analysis algorithm (eye tracking and blink detection)."],
        ["Résultat : Déclenchement instantané d'alertes sonores et visuelles dès les premiers signes de baisse de vigilance.", "<strong>Result:</strong> Instant triggering of audio and visual alerts at the earliest signs of drowsiness."],

        ["Objectif : Modéliser la chaîne cinématique d'un axe de machine-outil à commande numérique (CNC) et optimiser sa précision de positionnement.", "<strong>Objective:</strong> Model the kinematic chain of a Computer Numerical Control (CNC) machine-tool axis and optimize positioning accuracy."],
        ["Apport : Synthèse d'un correcteur robuste réduisant l'erreur de traînage, limitant l'usure mécanique et garantissant la qualité dimensionnelle d'usinage.", "<strong>Impact:</strong> Synthesized a robust controller reducing tracking error, limiting mechanical wear, and ensuring dimensional machining quality."],

        ["Objectif : Développer un algorithme de vision par ordinateur capable de détecter les marquages au sol et de calculer l'écart de trajectoire en temps réel.", "<strong>Objective:</strong> Develop a computer-vision algorithm capable of detecting lane markings and computing lateral trajectory offset in real time."],
        ["Apport : Extraction robuste des lignes de voie par filtrage et transformée de Hough, transposable au contrôle qualité visuel sur ligne automatisée.", "<strong>Impact:</strong> Robust lane extraction using image filtering and Hough Transform, directly transferable to automated visual quality inspection."],

        ["Objectif : Centraliser et visualiser en temps réel les paramètres critiques d'un système industriel (disponibilité machine, cadence, alertes et taux de conformité).", "<strong>Objective:</strong> Centralize and visualize real-time critical parameters of an industrial system (machine availability, throughput, alerts, and quality yield)."],
        ["Apport : Facilite le diagnostic rapide des dérives en maintenance, optimise le pilotage de la production et améliore la traçabilité qualité.", "<strong>Impact:</strong> Accelerates maintenance root-cause diagnostics, optimizes production control, and strengthens quality traceability."]
    ]);

    const originalTexts = new WeakMap();
    const originalHtml = new WeakMap();

    function normalizeSpace(str) {
        return str.replace(/\s+/g, " ").trim();
    }

    function translatePage(toEnglish) {
        // 1. Paragraphes HTML spéciaux (.bio, formation)
        htmlTranslations.forEach((item) => {
            const el = document.querySelector(item.selector);
            if (!el) return;
            if (toEnglish) {
                if (!originalHtml.has(el)) originalHtml.set(el, el.innerHTML);
                el.innerHTML = item.en;
            } else if (originalHtml.has(el)) {
                el.innerHTML = originalHtml.get(el);
            }
        });

        // 2. Paragraphes des cartes Stages & Projets
        document.querySelectorAll(".card-body p").forEach((p) => {
            const key = normalizeSpace(p.textContent);
            if (toEnglish) {
                if (!originalHtml.has(p)) originalHtml.set(p, p.innerHTML);
                if (cardParagraphsEn.has(key)) {
                    p.innerHTML = cardParagraphsEn.get(key);
                }
            } else if (originalHtml.has(p)) {
                p.innerHTML = originalHtml.get(p);
            }
        });

        // 3. Tous les autres titres, badges, tags, liens et boutons
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while ((node = walker.nextNode())) {
            const rawText = node.nodeValue;
            const normalized = normalizeSpace(rawText);
            if (!normalized) continue;

            if (toEnglish) {
                if (!originalTexts.has(node)) originalTexts.set(node, rawText);
                if (textDictionary.has(normalized)) {
                    node.nodeValue = textDictionary.get(normalized);
                }
            } else if (originalTexts.has(node)) {
                node.nodeValue = originalTexts.get(node);
            }
        }
    }

    toggleBtn.addEventListener("click", () => {
        currentLang = currentLang === "fr" ? "en" : "fr";
        document.documentElement.lang = currentLang;
        toggleBtn.textContent = currentLang === "fr" ? "EN" : "FR";
        translatePage(currentLang === "en");
    });
});