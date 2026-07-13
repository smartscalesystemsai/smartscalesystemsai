document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("ss-hw-generate-btn");
    const platformSelect = document.getElementById("ss-hw-platform");
    
    const inputSection = document.getElementById("ss-hw-step-1");
    const loadingSection = document.getElementById("ss-hw-loading-section");
    const errorSection = document.getElementById("ss-hw-error-section");
    
    const loadingText = document.getElementById("ss-hw-loading-text");
    const progressFill = document.getElementById("ss-hw-progress-fill");
    
    const affiliateLink = document.getElementById("ss-hw-affiliate-link");
    const partnerName = document.getElementById("ss-hw-partner-name");

    const successSection = document.getElementById("ss-hw-success-section");
    const hooksList = document.getElementById("ss-hw-hooks-list");
    const successAffiliateLink = document.getElementById("ss-hw-success-affiliate");
    const successPartnerName = document.getElementById("ss-hw-success-partner");
    const resetBtn = document.getElementById("ss-hw-reset-btn");

    if (resetBtn) {
        resetBtn.addEventListener("click", (e) => {
            e.preventDefault();
            successSection.classList.add("ss-hw-hidden");
            errorSection.classList.add("ss-hw-hidden");
            inputSection.classList.remove("ss-hw-hidden");
            document.getElementById("ss-hw-input-data").value = "";
        });
    }

    // REAL API: Calls your Cloudflare Worker
    async function fetchHooksFromAI(inputData) {
        // Pointing to the live production Cloudflare Worker URL
        const workerUrl = "https://viral-hook-engine.smart-scale-ai.workers.dev";
        
        const response = await fetch(workerUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputData })
        });
        
        if (!response.ok) {
            throw new Error("Rate Limit Exceeded"); // Triggers the scarcity trap
        }
        
        const data = await response.json();
        return data.hooks;
    }

    generateBtn.addEventListener("click", async () => {
        const urlInput = document.getElementById("ss-hw-input-data");
        const urlValue = urlInput.value.trim();
        
        // Basic validation so it feels like a real tool
        if (!urlValue) {
            alert("Please enter a valid YouTube URL or topic.");
            return;
        }

        // Hide input, show loading
        inputSection.classList.add("ss-hw-hidden");
        errorSection.classList.add("ss-hw-hidden");
        successSection.classList.add("ss-hw-hidden");
        loadingSection.classList.remove("ss-hw-hidden");

        // Force a small reflow before applying the width transition
        setTimeout(() => {
            progressFill.style.width = "100%";
        }, 50);

        // Update loading text to build anticipation
        const text1 = setTimeout(() => { loadingText.innerText = "Identifying viral trends..."; }, 1000);
        const text2 = setTimeout(() => { loadingText.innerText = "Extracting proven hooks..."; }, 2200);

        // Setup the correct affiliate partner based on selection
        const platform = platformSelect.value;
        let pName = "Submagic";
        let pLink = "https://submagic.co/?via=suma81";
        if (platform === "youtube") {
            pName = "vidIQ";
            pLink = "https://vidiq.com/smartsclaesystem";
        }

        try {
            const generatedHooks = await fetchHooksFromAI(urlValue);
            
            // Success State
            loadingSection.classList.add("ss-hw-hidden");
            
            // Populate hooks
            hooksList.innerHTML = "";
            generatedHooks.forEach(hook => {
                const li = document.createElement("li");
                li.innerText = hook;
                hooksList.appendChild(li);
            });

            // Set up soft-affiliate CTA
            successPartnerName.innerText = pName;
            successAffiliateLink.href = pLink;

            successSection.classList.remove("ss-hw-hidden");
            
        } catch (error) {
            console.error("Frontend caught an error from the Worker:", error);
            
            // Overflow / Rate Limit State (The Trap)
            loadingSection.classList.add("ss-hw-hidden");
            
            partnerName.innerText = pName;
            affiliateLink.href = pLink;

            errorSection.classList.remove("ss-hw-hidden");
        }
        
        // Reset progress bar secretly for next run
        setTimeout(() => {
            progressFill.style.transition = "none";
            progressFill.style.width = "0%";
            setTimeout(() => progressFill.style.transition = "width 3s cubic-bezier(0.1, 0.7, 0.1, 1)", 50);
            loadingText.innerText = "Analyzing transcript...";
        }, 500);
    });
});
