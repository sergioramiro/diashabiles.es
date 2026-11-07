# Política de seguridad

Sitio estático (Astro → Netlify) sin backend ni base de datos. El riesgo real está en
dependencias, en el contenido inyectado y en la cadena de despliegue, no en un servidor
propio.

## Cómo reportar

Usa el **aviso privado de vulnerabilidades de GitHub** en este repositorio
(pestaña *Security* → *Report a vulnerability*). No abras un issue público con el detalle.

## Qué entra

- Dependencias con vulnerabilidades conocidas que afecten al build o al sitio publicado.
- XSS o inyección en contenido dinámico o en parámetros de URL.
- Exposición de secretos en el repositorio o en el historial de git.

## Qué no entra

- Falta de cabeceras de seguridad en Netlify: se gestionan en el panel, no en este repo.
- Ataques de denegación de servicio: los absorbe el CDN.
- Contenido editorial incorrecto o desactualizado: eso va por issue normal.

## Compromiso

Al ser un proyecto personal, no hay SLA. Se revisa y se responde lo antes posible, con
prioridad a cualquier cosa que exponga datos de usuarios.
