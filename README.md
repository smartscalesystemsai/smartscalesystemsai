# SmartScaleSystemsAI

Static Cloudflare deployment for OmniFrame Quiz Studio.

This repository is connected to Cloudflare and serves the public API/demo
version of Quiz Studio at `smartscalesystemsai.com`.

Current demo behavior:

- 3 free questions without a license key.
- Preview and export/download remain available for the demo output.
- Paid license activation unlocks the full bundled question set.

## Release workflow

The normal production release path is:

1. Make and test changes in this repository.
2. In GitHub Desktop, commit the intended files to `main` and click **Push origin**.
3. Cloudflare Workers Builds deploys that pushed commit automatically.

Do not deploy a copied repository from `/tmp`; it bypasses the GitHub history and
makes the production version difficult to reproduce.

For local deployment validation, run:

```sh
npm install
npm run deploy:dry-run
```

`npm run deploy` is the manual fallback only. The routine release path is the
GitHub Desktop push above.
