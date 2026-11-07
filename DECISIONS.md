# DECISIONS

**Última actualización:** 2026-11-07

Solo decisiones que un agente necesita entender al entrar hoy. Lo demás está en `git log`.

## 2026-11-07 — Verificación obligatoria en un solo comando

**Decisión:** `npm run check` ejecuta `vitest run && astro build` y se convierte en el único comando de verificación. CI y `pre-push` llaman a ese mismo comando.

**Por qué:** sin un punto de entrada único, cada herramienta (y cada agente) inventa su forma de comprobar. Un solo comando hace que "está verificado" signifique exactamente lo mismo en local, en CI y en el hook.

## 2026-11-07 — El cómputo se prueba con fechas reales del calendario 2027

**Decisión:** los tests usan fechas concretas (Lunes de Pascua en Cataluña, Constitución en lunes, Fiesta del Trabajo en sábado) en lugar de mocks de los datos.

**Por qué:** el riesgo real del sitio no está en la aritmética de fechas, está en los datos de festivos y en los casos límite de comunidad. Probar con el JSON real detecta un festivo mal puesto, que es el fallo que llega a producción.

## 2026-11-07 — Hábiles = laborables, por ley

**Decisión:** se mantienen dos contadores con el mismo valor y se documenta el motivo.

**Por qué:** el art. 30.2 de la Ley 39/2015 excluye sábados, domingos y festivos. Si algún día se quiere distinguir (por ejemplo, sábados hábiles en el sector público), la decisión y su base legal tienen que estar escritas antes de separar los campos.
