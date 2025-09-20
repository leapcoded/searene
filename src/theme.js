/* JS Theme controller for Searene — handles light/dark mode and persistence. */
(function(){
  'use strict';
  const STORAGE_KEY = 'searene:theme';
  const root = document.documentElement;

  function readStored(){
    try{ const v = localStorage.getItem(STORAGE_KEY); return (v==='dark' || v==='light') ? v : null; }catch(e){ return null; }
  }

  function readPrefers(){
    try{ return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }catch(e){ return 'light'; }
  }

  function apply(theme, persist = true){
    if(theme !== 'dark' && theme !== 'light') theme = 'light';
    root.setAttribute('data-theme', theme);
    if(persist){ try{ localStorage.setItem(STORAGE_KEY, theme); }catch(e){} }
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    document.querySelectorAll('.theme-switch').forEach(el => {
      try{ el.setAttribute('data-theme', theme); el.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false'); }catch(e){}
    });
  }

  function toggle(){ apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true); }

  function init(){
    const stored = readStored();
    const initial = stored || readPrefers() || (root.getAttribute('data-theme') || 'light');
    apply(initial, !!stored);
  }

  function mountHeaderToggle(selector){
    const host = document.querySelector(selector);
    if(!host) return;
    host.addEventListener('click', (e) => { const btn = e.target.closest('.theme-switch'); if(btn) toggle(); });
  }

  window.Theme = { init, toggle, set: apply, current: () => root.getAttribute('data-theme') || 'light', mountHeaderToggle };
})();


