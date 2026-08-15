# Redirecting the two legacy workers.dev URLs

Both of these serve content that is now duplicated on smartscalesystemsai.com.
Duplicate content across domains is an SEO problem and a risk during an AdSense
review, since a reviewer can land on the workers.dev copy instead of the real site.

**Redirect, do not delete.** The Kindle book prints the old prompts URL, so the
old address has to keep working — it just needs to send people to the new home.

| Legacy URL | Redirects to |
|---|---|
| `ai-for-managers.smart-scale-ai.workers.dev` | `https://smartscalesystemsai.com/free-prompts/` |
| `performance-review-demo.smart-scale-ai.workers.dev` | `https://smartscalesystemsai.com/performance-review/` |

## Why wrangler and not the dashboard

Both Workers show "Automatic deployment on upload" in the Cloudflare dashboard,
which means they were pushed with wrangler. Cloudflare disables the in-browser
code editor for those, so there is no "Edit code" button — they have to be
replaced the same way they were created.

## Deploy

Run each from Terminal. The first run will ask you to log in to Cloudflare in a
browser; that is expected.

```
cd ~/Documents/SmartScaleAI-Video/smartscalesystemsai-site/redirect-workers/ai-for-managers
npx wrangler deploy
```

```
cd ~/Documents/SmartScaleAI-Video/smartscalesystemsai-site/redirect-workers/performance-review-demo
npx wrangler deploy
```

The `name` in each `wrangler.jsonc` matches the existing Worker exactly, so this
**replaces** that Worker rather than creating a new one. That is the intent.

## If you need to undo it

The old version is not lost. In the dashboard, open the Worker → **Deployments**
tab → find the previous deployment → **Rollback**. Worth knowing before you run
this, not after.

## Verify

Open each old URL in a private window. You should land on the new page, with
smartscalesystemsai.com in the address bar.

## Why 301 and not 302

301 is permanent: it tells Google to transfer the old URL's ranking signals to the
new page and drop the old one from the index. A 302 (temporary) keeps the old URL
indexed, which leaves the duplicate-content problem in place.

## Note on paths

Both Workers preserve the query string, so tracked links keep their parameters.
Any path on the old host lands on the destination page rather than a 404.

## Not touched: manager-command-center

`manager-command-center.smart-scale-ai.workers.dev` is also live but is left
alone — it appears to be the full paid app that buyers access, and redirecting it
would break their access. Worth checking separately whether it duplicates
anything on the main site.
