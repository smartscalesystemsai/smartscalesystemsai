# Redirecting the two legacy workers.dev URLs

Both of these serve content that is now duplicated on smartscalesystemsai.com.
Duplicate content across domains is an SEO problem and a risk during an AdSense
review, since a reviewer can land on the workers.dev copy instead of the real site.

**Redirect, do not delete.** The Kindle book prints the old prompts URL, so the
old address has to keep working — it just needs to send people to the new home.

| Legacy URL | Should redirect to |
|---|---|
| `ai-for-managers.smart-scale-ai.workers.dev` | `https://smartscalesystemsai.com/free-prompts/` |
| `performance-review-demo.smart-scale-ai.workers.dev` | `https://smartscalesystemsai.com/performance-review/` |

## Steps (per worker)

1. Go to **dash.cloudflare.com** → **Workers & Pages**
2. Click the worker (`ai-for-managers`, then `performance-review-demo`)
3. Click **Edit code** (or **Quick edit**)
4. Delete everything in the editor and paste the matching file from this folder:
   - `ai-for-managers.js`
   - `performance-review-demo.js`
5. Click **Deploy**
6. Verify: open the old URL in a private window. It should land on the new page,
   and the address bar should show smartscalesystemsai.com.

## Why 301 and not 302

301 is permanent: it tells Google to transfer the old URL's ranking signals to the
new page and drop the old one from the index. A 302 (temporary) keeps the old URL
indexed, which leaves the duplicate-content problem in place.

## Note on paths

Both workers preserve the path and query string. Someone hitting
`ai-for-managers.smart-scale-ai.workers.dev/anything?x=1` lands on
`smartscalesystemsai.com/free-prompts/?x=1` rather than a 404. If you would rather
send every request to the bare destination regardless of path, delete the
`url.pathname` and `url.search` lines and hard-code the target.
