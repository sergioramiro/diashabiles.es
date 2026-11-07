# Arquitectura — diashabiles.es

Sitio estático en Astro que calcula días laborables, hábiles y festivos en España.
Todo el cómputo ocurre en el navegador: no hay backend ni base de datos.

## Stack

- **Astro 7** con salida estática (`output: 'static'`).
- **Tailwind 3** + PostCSS; estilos globales en `src/styles/global.css`.
- **Sin framework de UI**: componentes `.astro` y JavaScript del propio navegador.
- **Vitest** para los tests de la lógica de cálculo.
- Despliegue en **Netlify** desde `main`.

## Mapa de directorios

```
src/
  pages/                     una ruta = un fichero .astro
    index.astro              home con la calculadora
    dias-habiles.astro       calculadora principal
    calendario-laboral-2027.astro
    calendario-laboral-2028.astro
    calendario-laboral-madrid-2027.astro
    dias-inhabiles-2027.astro
    festivos-perdidos-2027.astro
    festivos-perdidos-2028.astro
    puentes-diciembre-2026.astro
    permiso-hospitalizacion-familiar.astro
    30-dias-habiles-informar-trabajador.astro
    condiciones-laborales-transparentes.astro
    accesibilidad-cognitiva-empresa.astro
    404.astro
  lib/calculadora.ts         cómputo de días y lectura de festivos
  lib/calculadora.test.ts    tests de la calculadora
  data/festivos-*.json       fuente de verdad de los festivos
  layouts/Layout.astro       <head>, SEO, schema.org, navegación
  components/Header.astro    cabecera y menú
  styles/global.css          Tailwind + estilos base
public/                      estáticos servidos tal cual (robots, imágenes)
docs/                        notas de trabajo y documentación de agentes
```

## Flujo de datos

1. `src/data/festivos-*.json` define los festivos nacionales y por comunidad.
2. `src/lib/calculadora.ts` los carga, construye un `Map` por fecha y recorre el rango día a día.
3. Las páginas importan `calcularDias()` y pintan el resultado; el cálculo se repite en cliente para la calculadora interactiva.
4. El build de Astro genera HTML estático por página; no hay rutas dinámicas en servidor.

## Invariantes que no se rompen

- **Hábiles = laborables.** El art. 30.2 de la Ley 39/2015 excluye sábados, domingos y festivos, así que ambos contadores deben coincidir siempre.
- **Ambas fechas del rango cuentan**, salvo que sean fin de semana o festivo.
- **Un festivo en sábado o domingo** aparece en `festivosEnRango` pero no resta un día laborable.
- **Los festivos autonómicos sobreescriben a los nacionales** en la misma fecha (mismo `Map`).
- Ninguna fecha se cuenta dos veces: `laborables + finesDeSemana + festivos entre semana = días calendario`.

## Dónde tocar cada cosa

| Quiero… | Voy a… |
|---|---|
| Añadir o corregir un festivo | `src/data/festivos-<año>.json` + test si cambia un caso límite |
| Cambiar el cómputo | `src/lib/calculadora.ts` (y su test primero) |
| Añadir una página | `src/pages/<slug>.astro` + enlace desde el índice |
| Cambiar SEO o metadatos | `src/layouts/Layout.astro` |
| Cambiar el build o el dominio | `astro.config.mjs` |

## Verificación

```bash
npm run check   # vitest run && astro build
```

El mismo comando corre en CI (`.github/workflows/ci.yml`) y en el hook `pre-push`.
