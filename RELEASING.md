# Releasing runtz.dev

Releases are driven by CI, deployed straight from this repo's checkout — this
chart is never published anywhere (nobody self-hosts the marketing site).
There's no version file or changelog ceremony; any tag works, it's purely a
deploy trigger.

## Prerequisites (one-time, on the runtz-dev org)

- Variable `DOCKER_LOGIN` and secret `DOCKER_PASS` (used only to pull the
  `runtzdev/deploy-k8s:v1` deploy image, not to push anywhere — this app's
  image never leaves the internal registry).
- Self-hosted runners labelled `runtz-runners`.

## Deploy

1. Push to `dev` → `.github/workflows/runtz-landing-pipeline-dev-k8s.yml`
   builds the image and deploys it to the dev namespace automatically.
2. Promote `dev → main` (PR + merge).
3. Publish a GitHub Release for any tag on `main` (mark it however you like —
   there's no semver contract to honor) →
   `.github/workflows/runtz-landing-pipeline-prod-k8s.yml` builds the image
   and deploys it to prod.

Both environments push the image to the in-cluster registry only
(`registry-docker-registry.registry.svc.cluster.local:5000/runtz-landing`) —
never Docker Hub, since this image has no external consumers.

## Verify

- Dev: `https://runtz-dev.runtz.dev/home`
- Prod: `https://runtz.dev/home` and `https://runtz.dev/install.sh` (CLI installer redirect)
