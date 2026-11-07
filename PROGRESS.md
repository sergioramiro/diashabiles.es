# PROGRESS

**Última actualización:** 2026-11-07

Estado actual del sitio: en producción y con indexación en curso en Search Console.

## Hecho

- Calculadora de días hábiles con festivos nacionales y las 19 comunidades.
- Páginas de calendario laboral 2027 y 2028, festivos perdidos y puentes.
- Páginas de contenido laboral (permiso de hospitalización, plazo de 30 días, transparencia retributiva, accesibilidad cognitiva).
- Despliegue automático en Netlify desde `main`.
- Verificación automatizada: Vitest + build en CI y en hook `pre-push` (2026-11-07).

## En progreso

- Ampliar el catálogo de festivos a las comunidades pendientes (`COMUNIDADES_PENDIENTES` en `src/lib/calculadora.ts`).
- Revisión de contenido del calendario 2028 cuando se publiquen las resoluciones autonómicas.

## Bloqueado

- Nada abierto ahora mismo.

## Próximos pasos

1. Cobertura de tests para los cálculos que hoy solo viven en las páginas.
2. Enlazado interno entre calculadora y páginas de calendario.
3. Revisar datos de Search Console y priorizar las páginas con impresiones y cero clics.
