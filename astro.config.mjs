// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://diashabiles.es',
  integrations: [
    sitemap({
      // Personalizar lastmod para cada página
      lastmod: new Date(),
      // Prioridades por tipo de página
      priority: 0.7,
      changefreq: 'weekly',
      // Filtrar páginas que no deben estar en el sitemap
      filter: (page) => {
        // Excluir páginas de error
        if (page.includes('/404')) return false;
        // Excluir páginas de API
        if (page.includes('/api/')) return false;
        return true;
      },
      // Personalizar prioridades por URL
      serialize: (item) => {
        // Homepage con mayor prioridad
        if (item.url === 'https://diashabiles.es/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Páginas de comunidades
        else if (item.url.includes('/comunidad/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        // Página de días hábiles
        else if (item.url.includes('/dias-habiles')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        return item;
      }
    })
  ]
});