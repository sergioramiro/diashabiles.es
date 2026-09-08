# Tarea: Rediseño completo de diashabiles.es

## Objetivo
Migrar el sitio actual de Astro a un nuevo diseño profesional basado en el HTML de referencia generado por Stitch. El resultado debe ser un sitio Astro funcional con el nuevo diseño visual, manteniendo toda la funcionalidad existente.

## Archivos de referencia
- **Diseño desktop:** `docs/stitch-design-reference.html` (98KB, HTML completo con Tailwind)
- **Diseño móvil:** `docs/stitch-design-mobile.html` (45KB)
- **Diseño extraído:** `docs/stitch-design-reference.html` es la fuente de verdad

## Estado actual del proyecto
- Framework: Astro 7.3 (estático)
- Hosting: Netlify
- Dominio: diashabiles.es
- Repo: https://github.com/sergioramiro/diashabiles.es

### Archivos actuales importantes
```
src/
├── pages/
│   ├── index.astro          # Página principal (calculadora + guía + FAQ)
│   ├── dias-habiles.astro   # Página explicativa
│   ├── 404.astro            # Página 404
│   └── comunidad/
│       └── [comunidad].astro # Ruta dinámica por CCAA
├── layouts/
│   └── Layout.astro         # Layout base con meta tags
├── components/
│   └── (componentes existentes)
└── lib/
    └── calculadora.ts       # Lógica de cálculo + festivos
src/data/
    └── festivos-2027.json   # Datos de festivos (10 nacionales + 18 comunidades/ciudades)
public/
    ├── robots.txt
    ├── favicon.ico
    ├── favicon.svg
    └── og-image.png
```

## Lo que hay que hacer

### 1. Instalar Tailwind CSS
El diseño de Stitch usa Tailwind. Instalarlo en el proyecto Astro:
```bash
npx astro add tailwind
```
O manualmente:
```bash
npm install -D tailwindcss @tailwindcss/vite
```

### 2. Extraer tokens del diseño
Del HTML de Stitch (`docs/stitch-design-reference.html`), extraer:
- **Colores:** todos los tokens CSS (primary, surface, text-primary, etc.)
- **Tipografía:** Plus Jakarta Sans (weights: 400, 600, 700, 800)
- **Espaciado:** los spacing tokens (space-xs, space-sm, space-md, etc.)
- **Border radius:** los valores (0.25rem, 0.5rem, 0.75rem, full)
- **Sombras:** shadow tokens usados

### 3. Crear Layout.astro actualizado
El layout debe incluir:
- Google Fonts (Plus Jakarta Sans)
- Material Symbols Outlined (iconos)
- Tailwind CSS importado
- Meta tags SEO existentes (title, description, og:image, twitter cards)
- JSON-LD existente (WebApplication, FAQPage, BreadcrumbList)
- Tracking Umami Analytics

### 4. Reconstruir index.astro con el nuevo diseño
El nuevo index.astro debe tener:

#### Header fijo
- Logo diashabiles.es (usar el SVG existente o el de Stitch)
- Navegación: Calculadora, Días Hábiles vs Laborables, Festivos 2027 por CCAA, Guía Legal & Plazos
- Badge "Calendario BOE 2027 Provisionales"
- Botón "Consultar BOE 2027"
- Icono de usuario (decorativo)

#### Hero section
- Alerta de datos provisionales BOE (con icono warning)
- Badge "Cómputo Certificado conforme a Ley 39/2015 LPACAP"
- Título grande: "Calculadora de días laborables y hábiles 2027"
- Subtítulo descriptivo

#### Calculadora
- Grid de 12 columnas (desktop)
- Fecha inicio con botones rápidos (Hoy, 15 mar, 30 abr)
- Fecha fin con botones rápidos (+30 días)
- Select de comunidad/ciudad autónoma
- Botón "Calcular días laborables"
- Cards de resultado: Días laborables, Días hábiles, Días calendario
- Lista de festivos en el rango

#### Sección "¿Qué es un día hábil vs laborable?"
- Cards comparativas
- Ejemplo concreto

#### Guía completa (~1000 palabras)
- Mantener TODO el contenido educativo existente
- Formatear con el nuevo estilo (cards, headers, etc.)
- Incluir los 3 ejemplos prácticos
- Referencias legales

#### Festivos por comunidad
- Grid de cards con enlaces a /comunidad/[id]

#### FAQ
- Acordeones con las 5 preguntas existentes
- Mantener schema FAQPage

#### Footer
- Links útiles
- Aviso legal
- Copyright

### 5. Actualizar [comunidad].astro
Aplicar el mismo diseño visual a las páginas de comunidad:
- Header con breadcrumb
- Título de la comunidad
- Alerta de datos provisionales
- Resumen (días laborables, hábiles, festivos)
- Lista de festivos
- CTA a la calculadora

### 6. Actualizar Layout.astro
- Mantener todos los meta tags SEO
- Mantener JSON-LD
- Mantener Umami tracking
- Actualizar estilos base

### 7. Preservar funcionalidad crítica
- La lógica de cálculo (`lib/calculadora.ts`) NO se modifica
- Los datos de festivos (`data/festivos-2027.json`) NO se modifican
- El cálculo JavaScript en el frontmatter de index.astro se mantiene
- Los paths de navegación (/comunidad/[id]) se mantienen

## Restricciones técnicas
- **NO** usar React, Vue, ni frameworks — solo Astro puro + vanilla JS
- **NO** romper el build de Astro
- **NO** eliminar contenido SEO existente
- **SÍ** usar Tailwind CSS para estilos
- **SÍ** mantener inline styles donde sea necesario para compatibilidad
- **SÍ** responsive design (mobile-first)

## Verificación
Al finalizar, ejecutar:
```bash
npm run build
```
El build debe completarse sin errores. Si hay errores, arreglarlos antes de terminar.

## Output esperado
- Todos los archivos `.astro` actualizados con el nuevo diseño
- `tailwind.config.mjs` o `tailwind.config.ts` con los tokens del diseño
- `src/styles/global.css` con estilos base y variables CSS
- Build exitoso (`npm run build`)
