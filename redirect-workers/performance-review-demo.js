// performance-review-demo.smart-scale-ai.workers.dev
// 301 -> https://smartscalesystemsai.com/performance-review/
//
// This worker serves a near-identical copy of the /performance-review/ page on
// the main site. Confirmed live and duplicating that content, which is why it
// needs to redirect rather than keep serving.

const DESTINATION = "https://smartscalesystemsai.com/performance-review/";

export default {
  fetch(request) {
    const incoming = new URL(request.url);
    const target = new URL(DESTINATION);

    // Preserve any query string so tracked links keep their parameters.
    target.search = incoming.search;

    return Response.redirect(target.toString(), 301);
  },
};
