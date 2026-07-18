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

    function getYouTubeUrl(inputData) {
        const match = inputData.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?[^ \n]+|youtu\.be\/[^ \n]+|youtube\.com\/shorts\/[^ \n]+)/i);
        return match ? match[0] : "";
    }

    async function fetchYouTubeMetadata(inputData) {
        const youtubeUrl = getYouTubeUrl(inputData);
        if (!youtubeUrl) return null;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(youtubeUrl)}`, {
                signal: controller.signal
            });
            if (!response.ok) return { url: youtubeUrl };

            const data = await response.json();
            return {
                url: youtubeUrl,
                title: data.title || "",
                channel: data.author_name || ""
            };
        } catch (error) {
            console.warn("Could not fetch YouTube metadata:", error);
            return { url: youtubeUrl };
        } finally {
            clearTimeout(timeout);
        }
    }

    function buildAIInput(inputData, metadata, platform) {
        if (!metadata) {
            return `User input:\n${inputData}\n\nTarget platform: ${platform}\nTask: Generate hooks specifically based on the user's topic or script. Avoid unrelated generic examples.`;
        }

        const lines = [
            "YouTube video hook request.",
            `Video URL: ${metadata.url}`,
            metadata.title ? `Video title: ${metadata.title}` : "",
            metadata.channel ? `Channel: ${metadata.channel}` : "",
            inputData.replace(metadata.url, "").trim() ? `Additional user notes: ${inputData.replace(metadata.url, "").trim()}` : "",
            `Target platform: ${platform}`,
            "Task: Generate hooks specifically based on this YouTube video's title, channel, and topic. Do not invent unrelated examples."
        ].filter(Boolean);

        return lines.join("\n");
    }

    function cleanVideoTitle(title) {
        return String(title || "")
            .replace(/\s*\([^)]*\)\s*/g, " ")
            .replace(/\s*\[[^\]]*\]\s*/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function makeYouTubeHooks(metadata) {
        const title = cleanVideoTitle(metadata?.title);
        if (!title) return null;

        const numberMatch = title.match(/\b(\d+)\b/);
        const numberText = numberMatch ? numberMatch[1] : "";
        const savedMatch = title.match(/saved?\s+(\$[\d,.]+(?:\/\w+)?)/i);
        const savedText = savedMatch ? savedMatch[1] : "";
        const topic = title
            .replace(/^\d+\s+/, "")
            .replace(/how i saved?\s+\$[\d,.]+(?:\/\w+)?/ig, "")
            .replace(/[:|-]\s*$/g, "")
            .trim() || title;
        const subject = topic.replace(/\s+tips$/i, "").trim() || topic;

        const hooks = [
            savedText
                ? `I saved ${savedText} with ${subject}. Here are the exact changes I made.`
                : `I tested ${subject}. Here are the changes that mattered most.`,
            numberText
                ? `Before you spend more on ${subject}, try these ${numberText} fixes first.`
                : `Before you spend more time on this, try these ${subject} fixes first.`,
            savedText
                ? `Your ${subject} setup may be costing more than it should. This saved me ${savedText}.`
                : `Your ${subject} setup may be slower than it needs to be. Here is what I changed.`,
            numberText
                ? `These ${numberText} ${subject} tips are the fastest way to stop wasting time and money.`
                : `These ${subject} tips are the fastest way to stop wasting time and money.`,
            `I wish I knew this before optimizing ${subject}.`
        ];

        return hooks.map(hook => hook.replace(/\s+/g, " ").trim()).slice(0, 5);
    }

    async function fetchHooksFromAI(inputData) {
        const workerUrl = "https://viral-hook-engine.smart-scale-ai.workers.dev";
        
        const response = await fetch(workerUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputData })
        });
        
        if (!response.ok) {
            throw new Error("Rate Limit Exceeded");
        }
        
        const data = await response.json();
        return data.hooks;
    }

    generateBtn.addEventListener("click", async () => {
        const urlInput = document.getElementById("ss-hw-input-data");
        const urlValue = urlInput.value.trim();
        
        if (!urlValue) {
            alert("Please enter a valid YouTube URL or topic.");
            return;
        }

        inputSection.classList.add("ss-hw-hidden");
        errorSection.classList.add("ss-hw-hidden");
        successSection.classList.add("ss-hw-hidden");
        loadingSection.classList.remove("ss-hw-hidden");

        setTimeout(() => {
            progressFill.style.width = "100%";
        }, 50);

        const text1 = setTimeout(() => { loadingText.innerText = "Identifying viral trends..."; }, 1000);
        const text2 = setTimeout(() => { loadingText.innerText = "Extracting proven hooks..."; }, 2200);

        const platform = platformSelect.value;
        let pName = "Submagic";
        let pLink = "https://submagic.co/?via=suma81";
        if (platform === "youtube") {
            pName = "vidIQ";
            pLink = "https://vidiq.com/smartsclaesystem";
        }

        try {
            const metadata = await fetchYouTubeMetadata(urlValue);
            const generatedHooks = metadata?.title
                ? makeYouTubeHooks(metadata)
                : await fetchHooksFromAI(buildAIInput(urlValue, metadata, platform));
            
            loadingSection.classList.add("ss-hw-hidden");
            
            hooksList.innerHTML = "";
            generatedHooks.forEach(hook => {
                const li = document.createElement("li");
                li.innerText = hook;
                hooksList.appendChild(li);
            });

            successPartnerName.innerText = pName;
            successAffiliateLink.href = pLink;

            successSection.classList.remove("ss-hw-hidden");
            
        } catch (error) {
            console.error("Frontend caught an error from the Worker:", error);
            
            loadingSection.classList.add("ss-hw-hidden");
            
            partnerName.innerText = pName;
            affiliateLink.href = pLink;

            errorSection.classList.remove("ss-hw-hidden");
        }
        
        clearTimeout(text1);
        clearTimeout(text2);

        setTimeout(() => {
            progressFill.style.transition = "none";
            progressFill.style.width = "0%";
            setTimeout(() => progressFill.style.transition = "width 3s cubic-bezier(0.1, 0.7, 0.1, 1)", 50);
            loadingText.innerText = "Analyzing transcript...";
        }, 500);
    });
});
