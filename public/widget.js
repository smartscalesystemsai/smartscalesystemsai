document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("ss-category-select");
    const resultsSection = document.getElementById("ss-results-section");

    // The Researched Data Model - Updated with High-Ticket Affiliates and Free Tool URLs
    const engineData = {
        faceless: {
            problem: "Video editing and sourcing assets take 20+ hours a week.",
            freeStack: [
                { name: "OmniFrame Quiz Studio", desc: "Our tool. Turn any topic into a faceless quiz video in your browser. Free, no signup.", url: "https://smartscalesystemsai.com/quiz/", own: true },
                { name: "YouTube Studio", desc: "Free music, auto-generated thumbnails, script inspiration.", url: "https://studio.youtube.com" },
                { name: "InVideo AI Free Tier", desc: "All-in-one text-to-video assembly for beginners.", url: "https://invideo.io" }
            ],
            paidStack: [
                { name: "ElevenLabs", desc: "Natural AI voiceover. The heart of any faceless channel.", link: "https://try.elevenlabs.io/ilclr9gz1m92" },
                { name: "Submagic", desc: "AI dynamic captions & B-roll for Shorts/Reels.", link: "https://submagic.co/?via=suma81" },
                { name: "vidIQ", desc: "YouTube SEO, keywords & trend discovery.", link: "https://vidiq.com/smartsclaesystem" },
                { name: "HeyGen", desc: "End-to-end Text-to-Video generation.", link: "https://heygen.com" }
            ],
            roi: {
                timeSaved: "Cuts editing from hours to minutes per video.",
                value: "Monetizable videos without ever showing your face."
            },
            tutorial: { type: "email", cta: "Send me the Step-by-Step PDF Blueprint" }
        },
        digital_products: {
            problem: "Designing and writing products takes months.",
            freeStack: [
                { name: "Google NotebookLM", desc: "Upload PDFs/audio to auto-structure books.", url: "https://notebooklm.google.com" },
                { name: "Claude Free Tier", desc: "Best natural writer.", url: "https://claude.ai" }
            ],
            paidStack: [
                { name: "Skool", desc: "Community & Course Hosting.", link: "https://www.skool.com/signup?ref=6573327a34f846fc9736c36a268d9aa2" },
                { name: "Writesonic", desc: "AI copywriting and e-book generation.", link: "https://writesonic.com" }
            ],
            roi: {
                timeSaved: "Ship a product in days, not months.",
                value: "Digital products cost nothing to reproduce, so every sale is profit."
            },
            tutorial: { type: "video", url: "#youtube-notebooklm", cta: "Watch my tutorial on this tool" }
        },
        onboarding: {
            problem: "Agencies lose leads because manual follow-ups are too slow.",
            freeStack: [
                { name: "HubSpot Free CRM", desc: "Pipeline tracking.", url: "https://hubspot.com" },
                { name: "Apollo.io Free", desc: "B2B database.", url: "https://apollo.io" }
            ],
            paidStack: [
                { name: "GoHighLevel", desc: "The ultimate agency CRM.", link: "https://www.gohighlevel.com/?fp_ref=suma58" },
                { name: "Pabbly Connect", desc: "Zero-touch workflow automation.", link: "https://pabbly.com/connect/" }
            ],
            roi: {
                timeSaved: "Automates the follow-up admin you do by hand today.",
                value: "Faster response times mean fewer leads slip away."
            },
            tutorial: { type: "email", cta: "Send me the Step-by-Step PDF Blueprint" }
        },
        repurposing: {
            problem: "Hiring a social media manager costs $3,000/month.",
            freeStack: [
                { name: "OmniFrame Quiz Studio", desc: "Our tool. Spin any topic or script into faceless quiz shorts, free in your browser.", url: "https://smartscalesystemsai.com/quiz/", own: true },
                { name: "YouTube Auto-captions", desc: "Free transcripts.", url: "https://studio.youtube.com" },
                { name: "ChatGPT Free", desc: "Manual rewriting.", url: "https://chatgpt.com" }
            ],
            paidStack: [
                { name: "vidIQ", desc: "YouTube SEO & trend discovery.", link: "https://vidiq.com/smartsclaesystem" },
                { name: "Submagic", desc: "AI captions & B-roll to repurpose clips fast.", link: "https://submagic.co/?via=suma81" },
                { name: "vidyo.ai", desc: "AI viral short extraction.", link: "https://vidyo.ai" },
                { name: "Scalenut", desc: "AI-driven blog ranking.", link: "https://scalenut.com" }
            ],
            roi: {
                timeSaved: "One idea becomes shorts, posts, and search content.",
                value: "Do in-house what agencies charge a monthly retainer for."
            },
            tutorial: { type: "video", url: "#youtube-chatgpt", cta: "Watch my tutorial on this tool" }
        }
    };

    function renderStackList(stack, isPaid) {
        let html = '<ul class="ss-tool-list">';
        stack.forEach(tool => {
            const linkHref = isPaid ? tool.link : tool.url;
            const linkClass = (isPaid ? "ss-aff-link" : "ss-free-link") + (tool.own ? " ss-own-tool" : "");
            const badge = tool.own ? ' <span class="ss-own-badge">★ Our Tool</span>' : '';
            html += `<li><strong><a href="${linkHref}" class="${linkClass}" target="_blank">${tool.name}</a></strong>${badge}: ${tool.desc}</li>`;
        });
        html += '</ul>';
        return html;
    }

    function blueprintMailto(categoryKey, data) {
        const categoryLabel = categorySelect.options[categorySelect.selectedIndex]?.text || categoryKey;
        const subject = `Step-by-step AI Blueprint request - ${categoryLabel}`;
        const body = [
            "Hi Smart Scale Systems,",
            "",
            `Please send me the step-by-step PDF blueprint for: ${categoryLabel}.`,
            "",
            `My bottleneck: ${data.problem}`,
            "",
            "Thanks,"
        ].join("\n");
        return `mailto:smartscalesystem@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    categorySelect.addEventListener("change", (e) => {
        const categoryKey = e.target.value;
        const data = engineData[categoryKey];

        if (!data) return;

        let tutorialHTML = '';
        if (data.tutorial.type === 'video') {
            tutorialHTML = `<a href="${data.tutorial.url}" target="_blank" class="ss-btn ss-btn-video">▶ ${data.tutorial.cta}</a>`;
        } else {
            tutorialHTML = `<a href="${blueprintMailto(categoryKey, data)}" class="ss-btn ss-btn-email">📄 ${data.tutorial.cta}</a>`;
        }

        resultsSection.innerHTML = `
            <div class="ss-problem-stmt">
                <span class="ss-label">The Problem:</span>
                <p>${data.problem}</p>
            </div>
            
            <div class="ss-stack-container">
                <div class="ss-stack-card ss-grind-stack">
                    <h3>The Grind Stack</h3>
                    <span class="ss-badge ss-badge-time">Costs You Time</span>
                    ${renderStackList(data.freeStack, false)}
                </div>
                
                <div class="ss-stack-card ss-scale-stack">
                    <h3>The Scale Stack</h3>
                    <span class="ss-badge ss-badge-money">Buys Back Time</span>
                    ${renderStackList(data.paidStack, true)}
                </div>
            </div>

            <p class="ss-disclosure" style="font-size:0.78rem;opacity:0.65;margin-top:10px;">Some links above are affiliate links. If you buy through them, we earn a small commission at no extra cost to you. We only list tools we'd use ourselves.</p>

            <div class="ss-roi-section">
                <h3>ROI Impact</h3>
                <div class="ss-roi-metrics">
                    <div class="ss-metric">
                        <span class="ss-metric-title">Time</span>
                        <span class="ss-metric-value">${data.roi.timeSaved}</span>
                    </div>
                    <div class="ss-metric">
                        <span class="ss-metric-title">Value</span>
                        <span class="ss-metric-value">${data.roi.value}</span>
                    </div>
                </div>
            </div>

            <div class="ss-cta-section">
                ${tutorialHTML}
            </div>
        `;
        resultsSection.classList.remove("ss-hidden");
        resultsSection.classList.add("ss-fade-in");
    });
});
