document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("ss-category-select");
    const resultsSection = document.getElementById("ss-results-section");

    // The Researched Data Model - Updated with High-Ticket Affiliates and Free Tool URLs
    const engineData = {
        faceless: {
            problem: "Video editing and sourcing assets take 20+ hours a week.",
            freeStack: [
                { name: "YouTube Studio", desc: "Free music, auto-generated thumbnails, script inspiration.", url: "https://studio.youtube.com" },
                { name: "InVideo AI Free Tier", desc: "All-in-one text-to-video assembly for beginners.", url: "https://invideo.io" }
            ],
            paidStack: [
                { name: "OmniFrame Quiz Studio", desc: "Our tool — faceless quiz videos in minutes. Voiceover, animated visuals, 1080p export. One-time payment, no subscription.", link: "https://smartscalesystemsai.com/quiz-studio/", own: true },
                { name: "HeyGen", desc: "End-to-end Text-to-Video generation.", link: "https://heygen.com" },
                { name: "ElevenLabs", desc: "Premium voice APIs.", link: "https://try.elevenlabs.io/ilclr9gz1m92" },
                { name: "Submagic", desc: "AI dynamic captions & B-roll for Shorts/Reels.", link: "https://submagic.co/?via=suma81" }
            ],
            roi: {
                timeSaved: "15+ hours/week",
                value: "Potential $1k-$3k/mo passive AdSense."
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
                timeSaved: "Reduces creation time from 4 weeks to 3 days.",
                value: "100% margin on digital sales."
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
                timeSaved: "Eliminates 10 hours/week of admin.",
                value: "Secures $5k-$10k contracts."
            },
            tutorial: { type: "email", cta: "Send me the Step-by-Step PDF Blueprint" }
        },
        repurposing: {
            problem: "Hiring a social media manager costs $3,000/month.",
            freeStack: [
                { name: "YouTube Auto-captions", desc: "Free transcripts.", url: "https://studio.youtube.com" },
                { name: "ChatGPT Free", desc: "Manual rewriting.", url: "https://chatgpt.com" }
            ],
            paidStack: [
                { name: "OmniFrame Quiz Studio", desc: "Our tool — spin any topic or script into faceless quiz shorts for every platform. 1080p export, one-time payment.", link: "https://smartscalesystemsai.com/quiz-studio/", own: true },
                { name: "vidyo.ai", desc: "AI viral short extraction.", link: "https://vidyo.ai" },
                { name: "vidIQ", desc: "YouTube SEO & trend discovery.", link: "https://vidiq.com/smartsclaesystem" },
                { name: "Scalenut", desc: "AI-driven blog ranking.", link: "https://scalenut.com" }
            ],
            roi: {
                timeSaved: "10x content output.",
                value: "Saves $36,000/year on agency fees."
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

    categorySelect.addEventListener("change", (e) => {
        const categoryKey = e.target.value;
        const data = engineData[categoryKey];

        if (!data) return;

        let tutorialHTML = '';
        if (data.tutorial.type === 'video') {
            tutorialHTML = `<a href="${data.tutorial.url}" target="_blank" class="ss-btn ss-btn-video">▶ ${data.tutorial.cta}</a>`;
        } else {
            tutorialHTML = `<button class="ss-btn ss-btn-email" onclick="alert('Email capture modal would open here!')">📄 ${data.tutorial.cta}</button>`;
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
