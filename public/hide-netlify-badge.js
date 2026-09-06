// Oculta el badge "Powered by Netlify" inyectado por el tier gratuito
(function() {
  var observer = new MutationObserver(function() {
    // Buscar y eliminar el script de Netlify HUD
    var scripts = document.querySelectorAll('script[src*="netlify/scripts/hud"]');
    scripts.forEach(function(s) { s.remove(); });
    // Buscar y eliminar el badge/iframe/link del HUD
    var hud = document.querySelector('[data-netlify-site-id]');
    if (hud) hud.remove();
    // Buscar iframes de Netlify
    var iframes = document.querySelectorAll('iframe[src*="netlify"]');
    iframes.forEach(function(f) { f.remove(); });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  // También ejecutar al final
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('[data-netlify-site-id], [data-nf-variant]').forEach(function(e) { e.remove(); });
    });
  }
})();
