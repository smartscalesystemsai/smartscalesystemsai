// ai-for-managers.smart-scale-ai.workers.dev
// 301 -> https://smartscalesystemsai.com/free-prompts/
//
// This worker used to serve a copy of the free-prompts page. That content now
// lives on the main site, so this address exists only to keep old links alive
// (the Kindle book prints it). Everything is redirected permanently.

const DESTINATION = "https://smartscalesystemsai.com/free-prompts/";

export default {
  fetch(request) {
    const incoming = new URL(request.url);
    const target = new URL(DESTINATION);

    // Preserve any query string so tracked links keep their parameters.
    target.search = incoming.search;

    return Response.redirect(target.toString(), 301);
  },
};
