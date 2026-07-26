See [AGENTS.md](AGENTS.md) for the dev→main branch flow, the checks to run
before a pull request, and — most importantly — the hard rule that this app's
Helm chart must never own an ingress for runtz.dev / runtz-dev.runtz.dev (that
belongs to the platform chart in the `runtz` repo).
