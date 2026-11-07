# Contribuir

Repositorio personal de un solo mantenedor, pero con reglas fijas para que un agente
(o una persona) pueda trabajar sin preguntar.

## Antes de tocar nada

```bash
npm ci          # dependencias exactas del lockfile
npm run check   # tests + build
```

## Flujo

1. Rama desde `master`, nunca commit directo.
2. Un cambio por rama, con mensaje en castellano y prefijo (`feat:`, `fix:`, `chore:`, `content:`).
3. `npm run check` en verde antes de commitear. El hook `pre-push` lo vuelve a ejecutar y bloquea si falla.
4. Pull request con la plantilla: qué cambia, por qué y la salida real de la verificación.

## Reglas de contenido

- Castellano natural de España. Sin anglicismos evitables.
- Un dato legal lleva su norma y su año. Si no, no se publica.
- Las cifras de festivos viven en `src/data/`, nunca escritas a mano dentro de una página.

## Qué no se toca sin hablar antes

- `astro.config.mjs` y el dominio.
- La estructura de URLs publicadas: rompe el SEO y los enlaces entrantes.
