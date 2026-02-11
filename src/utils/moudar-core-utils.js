const MOUDAR = (function() {
    // ─────────────────────────────────────────────────────────────────────────
    // API Configuration (Cloud/AI backend - disabled by default)
    // SECURITY: API keys use sessionStorage (cleared on tab close), NOT localStorage
    // In production, use a backend proxy (window.MOUDAR_LLM_PROXY) instead
    // ─────────────────────────────────────────────────────────────────────────
    const API = {
        base: (sessionStorage.getItem('MOUDAR_API_BASE') || '').trim(),
        key: (sessionStorage.getItem('MOUDAR_API_KEY') || '').trim(),
        isConfigured: function() {
            return this.base.length > 0 && this.key.length > 0;
        },
        getHeaders: function() {
            return {
                'Content-Type': 'application/json',
                'Authorization': this.key ? 'Bearer ' + this.key : ''
            };
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Analytics Configuration (Privacy-first, consent-based)
    // ─────────────────────────────────────────────────────────────────────────
    const Analytics = {
        id: 'G-0TCZDG20L1',
        consent: localStorage.getItem('MOUDAR_ANALYTICS_CONSENT'),
        loaded: false,
        
        load: function() {
            if (!this.id || this.loaded) return;
            this.loaded = true;
            
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(this.id);
            document.head.appendChild(script);
            
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() { dataLayer.push(arguments); };
            window.gtag('js', new Date());
            window.gtag('config', this.id, { 
                'anonymize_ip': true, 
                'send_page_view': true 
            });
            
            console.log('[MOUDAR Analytics] Loaded with consent');
        },
        
        setConsent: function(granted) {
            const value = granted ? 'granted' : 'denied';
            localStorage.setItem('MOUDAR_ANALYTICS_CONSENT', value);
            this.consent = value;
            if (granted) this.load();
        },
        
        track: function(eventName, params) {
            if (this.loaded && window.gtag) {
                window.gtag('event', eventName, params || {});
            }
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Version & Metadata
    // ─────────────────────────────────────────────────────────────────────────
    const Meta = {
        version: '11.0',
        edition: 'Enterprise Security + Consensus',
        modules: ['AIE', 'GAW', 'QAE', 'BE', 'DTM', 'BIA', 'SNA', 'SF', 'E2EE', 'CVE'],
        author: 'Younes MOUDAR',
        copyright: '© 2025 Younes MOUDAR. All rights reserved.',
        website: 'https://moudar.com',
        features: {
            encryption: 'AES-256-GCM E2E',
            consensus: 'Multi-expert validation',
            security: 'Enterprise-grade'
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Accessibility Helpers
    // ─────────────────────────────────────────────────────────────────────────
    const A11y = {
        announce: function(message, priority) {
            const el = document.getElementById('moudar-aria-live');
            if (el) {
                el.setAttribute('aria-live', priority || 'polite');
                el.textContent = message;
                setTimeout(function() { el.textContent = ''; }, 3000);
            }
        },
        trapFocus: function(element) {
            const focusables = element.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            });
        },
        // WCAG 2.1 AA contrast ratio checker
        contrastRatio: function(hex1, hex2) {
            function hexToRgb(hex) {
                hex = hex.replace('#', '');
                return { r: parseInt(hex.substring(0, 2), 16), g: parseInt(hex.substring(2, 4), 16), b: parseInt(hex.substring(4, 6), 16) };
            }
            function luminance(rgb) {
                var a = [rgb.r, rgb.g, rgb.b].map(function(v) {
                    v = v / 255;
                    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
                });
                return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
            }
            var l1 = luminance(hexToRgb(hex1));
            var l2 = luminance(hexToRgb(hex2));
            var lighter = Math.max(l1, l2);
            var darker = Math.min(l1, l2);
            return (lighter + 0.05) / (darker + 0.05);
        },
        // Check if a color pair passes WCAG AA
        passesAA: function(textHex, bgHex, isLargeText) {
            var ratio = this.contrastRatio(textHex, bgHex);
            var threshold = isLargeText ? 3.0 : 4.5;
            return { passes: ratio >= threshold, ratio: Math.round(ratio * 100) / 100, threshold: threshold, level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA-large' : 'fail' };
        },
        // Audit visible elements for contrast (dev tool)
        auditContrast: function() {
            var issues = [];
            document.querySelectorAll('*').forEach(function(el) {
                var style = window.getComputedStyle(el);
                var color = style.color;
                var bg = style.backgroundColor;
                if (color && bg && bg !== 'rgba(0, 0, 0, 0)') {
                    // Simple extraction (works for rgb/rgba)
                    var match = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
                    var bgMatch = bg.match(/(\d+),\s*(\d+),\s*(\d+)/);
                    if (match && bgMatch) {
                        var cHex = '#' + [match[1], match[2], match[3]].map(function(n) { return parseInt(n).toString(16).padStart(2, '0'); }).join('');
                        var bHex = '#' + [bgMatch[1], bgMatch[2], bgMatch[3]].map(function(n) { return parseInt(n).toString(16).padStart(2, '0'); }).join('');
                        var result = A11y.passesAA(cHex, bHex, parseFloat(style.fontSize) >= 18);
                        if (!result.passes) {
                            issues.push({ element: el.tagName + '.' + el.className.split(' ')[0], ratio: result.ratio, text: el.textContent.substring(0, 30) });
                        }
                    }
                }
            });
            if (issues.length > 0) console.warn('[MOUDAR A11y] ' + issues.length + ' contrast issues found:', issues.slice(0, 10));
            else console.log('[MOUDAR A11y] ✅ All visible elements pass WCAG AA');
            return issues;
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // User Feedback System
    // ─────────────────────────────────────────────────────────────────────────
    const Feedback = {
        show: function(message, type, duration) {
            type = type || 'info';
            duration = duration || 3000;
            
            const colors = {
                success: 'bg-green-500',
                error: 'bg-red-500',
                warning: 'bg-yellow-500',
                info: 'bg-blue-500'
            };
            
            const icons = {
                success: '✓',
                error: '✕',
                warning: '⚠',
                info: 'ℹ'
            };
            
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-4 right-4 z-[9999] px-4 py-3 rounded-lg text-white shadow-xl flex items-center gap-2 animate-fade-in ' + colors[type];
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
            toast.innerHTML = DOMPurify.sanitize('<span class="text-lg">' + icons[type] + '</span><span>' + message + '</span>');
            
            document.body.appendChild(toast);
            
            setTimeout(function() {
                toast.classList.add('opacity-0', 'transition-opacity');
                setTimeout(function() { toast.remove(); }, 300);
            }, duration);
            
            // Also announce for screen readers
            A11y.announce(message, type === 'error' ? 'assertive' : 'polite');
        },
        
        success: function(msg) { this.show(msg, 'success'); },
        error: function(msg) { this.show(msg, 'error', 5000); },
        warning: function(msg) { this.show(msg, 'warning'); },
        info: function(msg) { this.show(msg, 'info'); }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Initialize
    // ─────────────────────────────────────────────────────────────────────────
    if (Analytics.consent === 'granted') {
        Analytics.load();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // v10.0 - END-TO-END ENCRYPTION MODULE (E2EE)
    // Uses Web Crypto API for AES-256-GCM encryption
    // Critical for ministerial and international organization data
    // ─────────────────────────────────────────────────────────────────────────
    const Crypto = {
        algorithm: 'AES-GCM',
        keyLength: 256,
        ivLength: 12,
        saltLength: 16,
        iterations: 100000,
        
        // Check if Web Crypto API is available
        isSupported: function() {
            return window.crypto && window.crypto.subtle;
        },
        
        // Generate a random encryption key
        generateKey: async function() {
            if (!this.isSupported()) throw new Error('Web Crypto API not supported');
            
            const key = await crypto.subtle.generateKey(
                { name: this.algorithm, length: this.keyLength },
                true,
                ['encrypt', 'decrypt']
            );
            return key;
        },
        
        // Derive key from password using PBKDF2
        deriveKeyFromPassword: async function(password, salt) {
            if (!this.isSupported()) throw new Error('Web Crypto API not supported');
            
            const encoder = new TextEncoder();
            const passwordBuffer = encoder.encode(password);
            
            // Import password as key material
            const keyMaterial = await crypto.subtle.importKey(
                'raw',
                passwordBuffer,
                'PBKDF2',
                false,
                ['deriveKey']
            );
            
            // Derive AES key from password
            const derivedKey = await crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt: salt,
                    iterations: this.iterations,
                    hash: 'SHA-256'
                },
                keyMaterial,
                { name: this.algorithm, length: this.keyLength },
                false,
                ['encrypt', 'decrypt']
            );
            
            return derivedKey;
        },
        
        // Encrypt data with AES-256-GCM
        encrypt: async function(data, password) {
            if (!this.isSupported()) throw new Error('Web Crypto API not supported');
            
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(JSON.stringify(data));
            
            // Generate random salt and IV
            const salt = crypto.getRandomValues(new Uint8Array(this.saltLength));
            const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
            
            // Derive key from password
            const key = await this.deriveKeyFromPassword(password, salt);
            
            // Encrypt
            const encrypted = await crypto.subtle.encrypt(
                { name: this.algorithm, iv: iv },
                key,
                dataBuffer
            );
            
            // Combine salt + iv + ciphertext
            const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
            combined.set(salt, 0);
            combined.set(iv, salt.length);
            combined.set(new Uint8Array(encrypted), salt.length + iv.length);
            
            // Return as base64
            return btoa(String.fromCharCode.apply(null, combined));
        },
        
        // Decrypt data
        decrypt: async function(encryptedBase64, password) {
            if (!this.isSupported()) throw new Error('Web Crypto API not supported');
            
            // Decode base64
            const combined = new Uint8Array(
                atob(encryptedBase64).split('').map(function(c) { return c.charCodeAt(0); })
            );
            
            // Extract salt, iv, and ciphertext
            const salt = combined.slice(0, this.saltLength);
            const iv = combined.slice(this.saltLength, this.saltLength + this.ivLength);
            const ciphertext = combined.slice(this.saltLength + this.ivLength);
            
            // Derive key from password
            const key = await this.deriveKeyFromPassword(password, salt);
            
            // Decrypt
            const decrypted = await crypto.subtle.decrypt(
                { name: this.algorithm, iv: iv },
                key,
                ciphertext
            );
            
            // Decode and parse
            const decoder = new TextDecoder();
            return JSON.parse(decoder.decode(decrypted));
        },
        
        // Hash data (for integrity checks)
        hash: async function(data) {
            if (!this.isSupported()) throw new Error('Web Crypto API not supported');
            
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(JSON.stringify(data));
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
        },
        
        // Generate secure random ID
        generateSecureId: function(length) {
            length = length || 32;
            const array = new Uint8Array(length);
            crypto.getRandomValues(array);
            return Array.from(array).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('').slice(0, length);
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // v10.0 - CONSENSUS VALIDATION MODULE
    // Multi-expert collaborative assessment with divergence detection
    // For institutional validation workflows (10+ accounts)
    // ─────────────────────────────────────────────────────────────────────────
    const Consensus = {
        // Voting weights by role
        roleWeights: {
            lead_expert: 1.5,
            senior_expert: 1.2,
            expert: 1.0,
            reviewer: 0.8,
            observer: 0.5
        },
        
        // Divergence thresholds
        thresholds: {
            low: 0.15,      // <15% variance = consensus
            moderate: 0.30,  // 15-30% = moderate divergence
            high: 0.50       // >30% = high divergence, needs discussion
        },
        
        // Create a new validation session
        createSession: function(projectId, dimensions, experts) {
            return {
                id: 'VS_' + Date.now() + '_' + Crypto.generateSecureId(8),
                projectId: projectId,
                dimensions: dimensions || ['feasibility', 'impact', 'sustainability', 'scalability', 'equity'],
                experts: experts || [],
                votes: [],
                status: 'open',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                consensus: null,
                divergences: []
            };
        },
        
        // Add an expert vote
        addVote: function(session, expertId, role, scores, comments) {
            const weight = this.roleWeights[role] || 1.0;
            
            const vote = {
                id: 'VOTE_' + Date.now(),
                expertId: expertId,
                role: role,
                weight: weight,
                scores: scores, // { dimension: score (0-100) }
                comments: comments || {},
                timestamp: new Date().toISOString()
            };
            
            // Remove previous vote from same expert
            session.votes = session.votes.filter(function(v) { return v.expertId !== expertId; });
            session.votes.push(vote);
            session.updatedAt = new Date().toISOString();
            
            return vote;
        },
        
        // Calculate weighted consensus scores
        calculateConsensus: function(session) {
            if (session.votes.length === 0) return null;
            
            const dimensions = session.dimensions;
            const votes = session.votes;
            const self = this;
            
            const consensus = {
                scores: {},
                variance: {},
                divergenceLevel: {},
                overallScore: 0,
                overallVariance: 0,
                participationRate: votes.length / Math.max(session.experts.length, 1),
                totalExperts: session.experts.length,
                votesReceived: votes.length
            };
            
            // Calculate weighted average and variance for each dimension
            dimensions.forEach(function(dim) {
                let totalWeight = 0;
                let weightedSum = 0;
                const allScores = [];
                
                votes.forEach(function(vote) {
                    if (vote.scores && typeof vote.scores[dim] === 'number') {
                        const score = vote.scores[dim];
                        const weight = vote.weight;
                        weightedSum += score * weight;
                        totalWeight += weight;
                        allScores.push(score);
                    }
                });
                
                if (totalWeight > 0) {
                    const mean = weightedSum / totalWeight;
                    consensus.scores[dim] = Math.round(mean * 10) / 10;
                    
                    // Calculate variance
                    let varianceSum = 0;
                    allScores.forEach(function(score) {
                        varianceSum += Math.pow(score - mean, 2);
                    });
                    const variance = allScores.length > 1 ? varianceSum / allScores.length : 0;
                    const stdDev = Math.sqrt(variance);
                    const coefficientOfVariation = mean > 0 ? stdDev / mean : 0;
                    
                    consensus.variance[dim] = Math.round(coefficientOfVariation * 100) / 100;
                    
                    // Determine divergence level
                    if (coefficientOfVariation < self.thresholds.low) {
                        consensus.divergenceLevel[dim] = 'consensus';
                    } else if (coefficientOfVariation < self.thresholds.moderate) {
                        consensus.divergenceLevel[dim] = 'moderate';
                    } else {
                        consensus.divergenceLevel[dim] = 'high';
                    }
                }
            });
            
            // Calculate overall scores
            const dimScores = Object.values(consensus.scores);
            const dimVariances = Object.values(consensus.variance);
            
            if (dimScores.length > 0) {
                consensus.overallScore = Math.round(
                    dimScores.reduce(function(a, b) { return a + b; }, 0) / dimScores.length * 10
                ) / 10;
                consensus.overallVariance = Math.round(
                    dimVariances.reduce(function(a, b) { return a + b; }, 0) / dimVariances.length * 100
                ) / 100;
            }
            
            session.consensus = consensus;
            return consensus;
        },
        
        // Identify divergent opinions
        identifyDivergences: function(session) {
            const self = this;
            const divergences = [];
            const consensus = session.consensus;
            
            if (!consensus) return divergences;
            
            session.dimensions.forEach(function(dim) {
                const meanScore = consensus.scores[dim];
                if (typeof meanScore !== 'number') return;
                
                session.votes.forEach(function(vote) {
                    const score = vote.scores[dim];
                    if (typeof score !== 'number') return;
                    
                    const deviation = Math.abs(score - meanScore);
                    const relativeDeviation = meanScore > 0 ? deviation / meanScore : 0;
                    
                    if (relativeDeviation > self.thresholds.moderate) {
                        divergences.push({
                            dimension: dim,
                            expertId: vote.expertId,
                            role: vote.role,
                            score: score,
                            consensusScore: meanScore,
                            deviation: Math.round(deviation * 10) / 10,
                            deviationPercent: Math.round(relativeDeviation * 100),
                            comment: vote.comments[dim] || null,
                            severity: relativeDeviation > self.thresholds.high ? 'high' : 'moderate'
                        });
                    }
                });
            });
            
            // Sort by severity and deviation
            divergences.sort(function(a, b) {
                if (a.severity !== b.severity) return a.severity === 'high' ? -1 : 1;
                return b.deviationPercent - a.deviationPercent;
            });
            
            session.divergences = divergences;
            return divergences;
        },
        
        // Generate discussion points from divergences
        generateDiscussionPoints: function(session, lang) {
            lang = lang || 'fr';
            const divergences = session.divergences || [];
            const points = [];
            
            // Group by dimension
            const byDimension = {};
            divergences.forEach(function(d) {
                if (!byDimension[d.dimension]) byDimension[d.dimension] = [];
                byDimension[d.dimension].push(d);
            });
            
            Object.keys(byDimension).forEach(function(dim) {
                const items = byDimension[dim];
                const highSeverity = items.filter(function(i) { return i.severity === 'high'; });
                
                if (highSeverity.length > 0) {
                    points.push({
                        priority: 'high',
                        dimension: dim,
                        icon: '🔴',
                        title: lang === 'fr'
                            ? 'Divergence majeure sur "' + dim + '"'
                            : 'Major divergence on "' + dim + '"',
                        description: lang === 'fr'
                            ? highSeverity.length + ' expert(s) avec écart >30% vs consensus'
                            : highSeverity.length + ' expert(s) with >30% deviation from consensus',
                        experts: highSeverity.map(function(h) { return h.expertId; }),
                        action: lang === 'fr'
                            ? 'Discussion approfondie requise avant décision'
                            : 'In-depth discussion required before decision'
                    });
                } else if (items.length > 0) {
                    points.push({
                        priority: 'moderate',
                        dimension: dim,
                        icon: '🟡',
                        title: lang === 'fr'
                            ? 'Divergence modérée sur "' + dim + '"'
                            : 'Moderate divergence on "' + dim + '"',
                        description: lang === 'fr'
                            ? items.length + ' expert(s) avec écart notable'
                            : items.length + ' expert(s) with notable deviation',
                        experts: items.map(function(i) { return i.expertId; }),
                        action: lang === 'fr'
                            ? 'Clarification recommandée'
                            : 'Clarification recommended'
                    });
                }
            });
            
            // Add consensus points
            session.dimensions.forEach(function(dim) {
                if (!byDimension[dim] || byDimension[dim].length === 0) {
                    if (session.consensus && session.consensus.scores[dim]) {
                        points.push({
                            priority: 'consensus',
                            dimension: dim,
                            icon: '✅',
                            title: lang === 'fr'
                                ? 'Consensus atteint sur "' + dim + '"'
                                : 'Consensus reached on "' + dim + '"',
                            description: lang === 'fr'
                                ? 'Score: ' + session.consensus.scores[dim] + '/100 (variance: ' + (session.consensus.variance[dim] * 100).toFixed(1) + '%)'
                                : 'Score: ' + session.consensus.scores[dim] + '/100 (variance: ' + (session.consensus.variance[dim] * 100).toFixed(1) + '%)',
                            experts: [],
                            action: lang === 'fr' ? 'Aucune action requise' : 'No action required'
                        });
                    }
                }
            });
            
            return points.sort(function(a, b) {
                const order = { high: 0, moderate: 1, consensus: 2 };
                return order[a.priority] - order[b.priority];
            });
        },
        
        // Generate final validation report
        generateReport: function(session, lang) {
            lang = lang || 'fr';
            const consensus = session.consensus;
            const divergences = session.divergences || [];
            
            if (!consensus) {
                this.calculateConsensus(session);
                this.identifyDivergences(session);
            }
            
            const highDivergences = divergences.filter(function(d) { return d.severity === 'high'; });
            
            const report = {
                sessionId: session.id,
                projectId: session.projectId,
                generatedAt: new Date().toISOString(),
                summary: {
                    totalExperts: session.experts.length,
                    votesReceived: session.votes.length,
                    participationRate: Math.round(session.consensus.participationRate * 100) + '%',
                    overallScore: session.consensus.overallScore,
                    overallVariance: session.consensus.overallVariance,
                    consensusStatus: highDivergences.length === 0 
                        ? (lang === 'fr' ? 'Consensus atteint' : 'Consensus reached')
                        : (lang === 'fr' ? 'Divergences à résoudre' : 'Divergences to resolve'),
                    readyForDecision: highDivergences.length === 0
                },
                dimensionScores: session.consensus.scores,
                divergenceCount: {
                    high: highDivergences.length,
                    moderate: divergences.length - highDivergences.length,
                    total: divergences.length
                },
                discussionPoints: this.generateDiscussionPoints(session, lang),
                recommendations: this.generateRecommendations(session, lang)
            };
            
            return report;
        },
        
        // Generate recommendations based on consensus analysis
        generateRecommendations: function(session, lang) {
            lang = lang || 'fr';
            const recs = [];
            const consensus = session.consensus;
            const divergences = session.divergences || [];
            
            // Participation recommendation
            if (consensus.participationRate < 0.8) {
                recs.push({
                    priority: 'high',
                    icon: '👥',
                    text: lang === 'fr'
                        ? 'Taux de participation insuffisant (' + Math.round(consensus.participationRate * 100) + '%). Relancer les experts non-répondants.'
                        : 'Insufficient participation rate (' + Math.round(consensus.participationRate * 100) + '%). Follow up with non-responding experts.'
                });
            }
            
            // Divergence recommendations
            const highDivergences = divergences.filter(function(d) { return d.severity === 'high'; });
            if (highDivergences.length > 0) {
                const dims = [...new Set(highDivergences.map(function(d) { return d.dimension; }))];
                recs.push({
                    priority: 'high',
                    icon: '🔴',
                    text: lang === 'fr'
                        ? 'Organiser une session de consensus sur: ' + dims.join(', ')
                        : 'Organize consensus session on: ' + dims.join(', ')
                });
            }
            
            // Low score recommendations
            Object.keys(consensus.scores || {}).forEach(function(dim) {
                if (consensus.scores[dim] < 50) {
                    recs.push({
                        priority: 'medium',
                        icon: '⚠️',
                        text: lang === 'fr'
                            ? 'Score faible sur "' + dim + '" (' + consensus.scores[dim] + '/100). Renforcer ce volet du projet.'
                            : 'Low score on "' + dim + '" (' + consensus.scores[dim] + '/100). Strengthen this aspect.'
                    });
                }
            });
            
            // Approval recommendation
            if (highDivergences.length === 0 && consensus.overallScore >= 70) {
                recs.push({
                    priority: 'success',
                    icon: '✅',
                    text: lang === 'fr'
                        ? 'Projet validé par consensus avec score global de ' + consensus.overallScore + '/100'
                        : 'Project validated by consensus with overall score of ' + consensus.overallScore + '/100'
                });
            }
            
            return recs;
        },
        
        // ── .vote FILE WORKFLOW ──────────────────────────────────────────
        // Enables distributed async voting: each expert votes offline
        // .moudar = session config, .vote = individual ballot, .consensus = merged result
        
        // Export session config as .moudar file (sent by project lead to experts)
        exportSessionFile: function(session) {
            var payload = {
                format: 'moudar-consensus-session',
                version: '2.0',
                sessionId: session.id,
                projectId: session.projectId,
                dimensions: session.dimensions,
                experts: session.experts,
                createdAt: session.createdAt,
                exportedAt: new Date().toISOString()
            };
            var json = JSON.stringify(payload, null, 2);
            var blob = new Blob([json], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'session_' + session.id.substring(0, 12) + '.moudar';
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return payload;
        },
        
        // Export individual vote as .vote file (each expert exports their ballot)
        exportVoteFile: function(session, expertId, scores, comments) {
            var expert = (session.experts || []).find(function(e) { return e.id === expertId; }) || {};
            var payload = {
                format: 'moudar-consensus-vote',
                version: '2.0',
                sessionId: session.id,
                expertId: expertId,
                expertName: expert.name || expertId,
                role: expert.role || 'expert',
                dimensions: session.dimensions,
                scores: scores,
                comments: comments || {},
                votedAt: new Date().toISOString(),
                // Integrity hash (SHA-256 of scores for tamper detection)
                integrity: btoa(JSON.stringify(scores)).substring(0, 32)
            };
            var json = JSON.stringify(payload, null, 2);
            var blob = new Blob([json], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = expert.name ? (expert.name.replace(/\s+/g, '_') + '.vote') : ('expert_' + expertId + '.vote');
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return payload;
        },
        
        // Import .vote files and merge into session
        importVoteFiles: function(session, votePayloads) {
            var self = this;
            var imported = 0;
            var errors = [];
            votePayloads.forEach(function(payload) {
                if (payload.format !== 'moudar-consensus-vote') {
                    errors.push('Invalid format: ' + (payload.expertName || 'unknown'));
                    return;
                }
                if (payload.sessionId !== session.id) {
                    errors.push('Session mismatch for ' + (payload.expertName || 'unknown'));
                    return;
                }
                // Verify integrity
                var expectedHash = btoa(JSON.stringify(payload.scores)).substring(0, 32);
                if (payload.integrity && payload.integrity !== expectedHash) {
                    errors.push('Integrity check failed for ' + (payload.expertName || 'unknown'));
                    return;
                }
                self.addVote(session, payload.expertId, payload.role, payload.scores, payload.comments);
                imported++;
            });
            return { imported: imported, errors: errors, total: votePayloads.length };
        },
        
        // Compute Krippendorff's Alpha (inter-rater reliability)
        computeKrippendorffsAlpha: function(session) {
            if (!session.votes || session.votes.length < 2) return { alpha: null, interpretation: 'insufficient_data' };
            var dims = session.dimensions;
            var votes = session.votes;
            var n = votes.length; // number of raters
            var N = dims.length;  // number of units
            
            // Build reliability data matrix: units × observers
            var data = [];
            dims.forEach(function(dim) {
                var row = [];
                votes.forEach(function(vote) {
                    row.push(typeof vote.scores[dim] === 'number' ? vote.scores[dim] : null);
                });
                data.push(row);
            });
            
            // Compute observed disagreement (Do)
            var Do = 0;
            var totalPairs = 0;
            data.forEach(function(row) {
                var values = row.filter(function(v) { return v !== null; });
                var m = values.length;
                if (m < 2) return;
                for (var i = 0; i < m; i++) {
                    for (var j = i + 1; j < m; j++) {
                        Do += Math.pow(values[i] - values[j], 2);
                        totalPairs++;
                    }
                }
            });
            if (totalPairs > 0) Do = Do / totalPairs;
            
            // Compute expected disagreement (De) using all values
            var allValues = [];
            data.forEach(function(row) {
                row.forEach(function(v) { if (v !== null) allValues.push(v); });
            });
            var De = 0;
            var totalGlobalPairs = 0;
            for (var i = 0; i < allValues.length; i++) {
                for (var j = i + 1; j < allValues.length; j++) {
                    De += Math.pow(allValues[i] - allValues[j], 2);
                    totalGlobalPairs++;
                }
            }
            if (totalGlobalPairs > 0) De = De / totalGlobalPairs;
            
            var alpha = De > 0 ? 1 - (Do / De) : 1;
            alpha = Math.round(alpha * 1000) / 1000;
            
            var interpretation;
            if (alpha >= 0.80) interpretation = 'excellent';
            else if (alpha >= 0.667) interpretation = 'acceptable';
            else if (alpha >= 0.40) interpretation = 'moderate';
            else interpretation = 'poor';
            
            return { alpha: alpha, Do: Math.round(Do * 100) / 100, De: Math.round(De * 100) / 100, n: n, N: N, interpretation: interpretation };
        },
        
        // Export full consensus results
        exportConsensusReport: function(session, lang) {
            var report = this.generateReport(session, lang);
            var alpha = this.computeKrippendorffsAlpha(session);
            var payload = {
                format: 'moudar-consensus-result',
                version: '2.0',
                session: { id: session.id, projectId: session.projectId, dimensions: session.dimensions },
                consensus: session.consensus,
                divergences: session.divergences,
                krippendorffAlpha: alpha,
                report: report,
                exportedAt: new Date().toISOString()
            };
            var json = JSON.stringify(payload, null, 2);
            var blob = new Blob([json], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'consensus_' + session.id.substring(0, 12) + '.consensus';
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return payload;
        }
    };
    
    // Expose to window for backward compatibility
    // SECURITY: API credentials are NOT exposed on window object
    // Use MOUDAR.API.isConfigured() and MOUDAR.API.getHeaders() instead
    window.MOUDAR_loadAnalytics = function() { Analytics.load(); };

    console.log('[MOUDAR] v' + Meta.version + ' ' + Meta.edition + ' initialized');
    console.log('[MOUDAR] Modules:', Meta.modules.join(', '));
    console.log('[MOUDAR] v11.0 Scientific Excellence: E2E Encryption ' + (Crypto.isSupported() ? '✓' : '✗'));
    console.log('[MOUDAR] v12.0 Production: Babel removed (10x startup), Mermaid.js IRLM, .vote workflow, WCAG AA');

    // ─────────────────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────────────────
    return Object.freeze({
        API: API,
        Analytics: Analytics,
        Meta: Meta,
        A11y: A11y,
        Feedback: Feedback,
        Crypto: Crypto,
        Consensus: Consensus
    });
})();

export default MOUDAR;
