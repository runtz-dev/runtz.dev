See [AGENTS.md](AGENTS.md) for the dev→main branch flow, the checks to run
before a pull request, and — most importantly — the hard rule that this app's
Helm chart must never own an ingress for runtz.dev / runtz-dev.runtz.dev (that
is a single hand-applied Ingress per environment, in the private secrets-helm
folder — no repository owns it).
