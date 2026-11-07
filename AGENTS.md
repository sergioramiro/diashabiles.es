## Verificación obligatoria

Antes de dar una tarea por terminada, y siempre antes de un push:

```bash
npm run check
```

Ejecuta los tests (Vitest) y el build de Astro. El hook `.githooks/pre-push` y el CI usan ese mismo comando, así que si pasa en local pasa en los dos sitios. Nunca commitees con `--no-verify`.

Antes de tocar la calculadora, lee `ARCHITECTURE.md` y `DECISIONS.md`: los invariantes del cómputo (hábiles = laborables, festivo en sábado no resta día) están allí y tienen base legal.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Agent skills

### Issue tracker

GitHub Issues (via `gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout. See `docs/agents/domain.md`.
