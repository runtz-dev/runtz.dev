# Releasing runtz.dev

Deploys are driven by CI, straight from a push — this is a marketing/docs
site, not a versioned product, so there's no release, no version file and no
changelog ceremony. Every push to `main` deploys prod.

## Prerequisites (one-time, on the runtz-dev org)

- Variable `DOCKER_LOGIN` and secret `DOCKER_PASS` (used only to pull the
  `runtzdev/deploy-k8s:v1` deploy image, not to push anywhere — this app's
  image never leaves the internal registry).
- Self-hosted runners labelled `runtz-runners`.

## Deploy

1. Push to `dev` → `.github/workflows/runtz-landing-pipeline-dev-k8s.yml`
   builds the image and deploys it to the dev namespace automatically.
2. Promote `dev → main` (PR + merge) →
   `.github/workflows/runtz-landing-pipeline-prod-k8s.yml` builds the image
   and deploys it to prod automatically, as soon as the merge lands. There is
   no separate release/tag step — merging **is** the prod deploy trigger, so
   only merge into `main` when you actually want prod to change right then.

Both environments push the image to the in-cluster registry only
(`registry-docker-registry.registry.svc.cluster.local:5000/runtz-landing`) —
never Docker Hub, since this image has no external consumers.

## Verify

- Dev: `https://runtz-dev.runtz.dev`
- Prod: `https://runtz.dev`, `https://runtz.dev/install.sh` and `https://runtz.dev/install.ps1` (CLI installer redirects)
