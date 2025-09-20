/* Nautical theme variables */
:root[data-theme='light']{
  /* lowered luminance and shifted toward blue-teal for calmer look */
  --bg: #e8f2f5; /* pale blue-teal base, less bright than white */
  --fg: #073241; /* stronger deep navy for readability */
  --muted: rgba(7,50,65,0.56);
  --card: #e1f6f8;
  --surface: #eaf6f8; /* soft surface with blue tint */
  --accent: #1b7b83; /* muted teal */
  --accent-2: #2384a1; /* calmer ocean blue */
  --accent-3: #3b8fbe; /* softer blue highlight */
  /* ocean specifics */
  --ocean-deep: #0a3446; /* deep channel */
  --ocean-mid: #1f6a85;  /* midwater */
  --ocean-foam: #bfeaf0; /* sea foam */
  --sand: #f3efe2;       /* shoreline sand */
  --coral: #ff7a8a;      /* subtle coral accent */
  --danger: #e11d48;
  --chart-text: rgba(7,50,65,0.75);
}
:root[data-theme='dark']{
  --bg: #031926; /* deep ocean navy */
  --fg: #e6f7fb; /* pale aqua text */
  --muted: rgba(230,247,251,0.6);
  --card: rgba(255,255,255,0.03);
  --surface: #042a36; /* deep teal surface */
  --accent: #3dd9c0; /* minty-teal */
  --accent-2: #2b9dd3; /* ocean blue */
  --accent-3: #60a5fa; /* calmer highlight */
  /* ocean specifics */
  --ocean-deep: #02131b;
  --ocean-mid: #0e3a4a;
  --ocean-foam: #0a3a45;
  --sand: #2b2a26;
  --coral: #ff8fa1;
  --danger: #ff6b81;
  --chart-text: rgba(230,247,251,0.75);
}

html, body { height: 100%; }
/* soften light theme to avoid stark white */
:root[data-theme='light'] body { background: linear-gradient(180deg, color-mix(in srgb, #dff0f4 80%, var(--bg) 20%), var(--bg)); color: var(--fg); }

:root[data-theme='light'] header.app-header { position: sticky; overflow: visible; backdrop-filter: saturate(110%) blur(6px); background: linear-gradient(180deg, color-mix(in srgb, var(--ocean-foam) 85%, #fff 15%), color-mix(in srgb, var(--surface) 90%, #fff 10%)); border-bottom: 1px solid rgba(7,50,65,0.04); color: var(--fg); }
:root[data-theme='dark'] header.app-header { position: sticky; overflow: visible; background: linear-gradient(180deg, color-mix(in srgb, var(--ocean-deep) 94%, #000 6%), color-mix(in srgb, var(--surface) 90%, #000 10%)); border-bottom: 1px solid rgba(255,255,255,0.04); color: var(--fg); }

/* Gentle wave edge under header */
header.app-header::after{ content:""; position:absolute; left:0; right:0; bottom:-1px; height:14px; pointer-events:none; }
:root[data-theme='light'] header.app-header::after{ background: var(--bg); -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 14" preserveAspectRatio="none"><path d="M0 7 Q 10 0 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 V14 H0z" fill="black"/></svg>'); mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 14" preserveAspectRatio="none"><path d="M0 7 Q 10 0 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 V14 H0z" fill="black"/></svg>'); -webkit-mask-size: 120px 14px; mask-size: 120px 14px; -webkit-mask-repeat: repeat; mask-repeat: repeat; opacity:0.85; }
:root[data-theme='dark'] header.app-header::after{ background: var(--bg); -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 14" preserveAspectRatio="none"><path d="M0 7 Q 10 0 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 V14 H0z" fill="black"/></svg>'); mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 14" preserveAspectRatio="none"><path d="M0 7 Q 10 0 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 V14 H0z" fill="black"/></svg>'); -webkit-mask-size: 120px 14px; mask-size: 120px 14px; -webkit-mask-repeat: repeat; mask-repeat: repeat; opacity:0.65; }

/* Dark theme body/background — ensure dark surfaces use the dark variables */
:root[data-theme='dark'] body { background: linear-gradient(180deg, color-mix(in srgb, var(--bg) 96%, #000 4%), var(--bg)); color: var(--fg); }

/* Wave edge above bottom nav */
nav.bottom-nav{ position: sticky; overflow: visible; }
nav.bottom-nav::before{ content:""; position:absolute; left:0; right:0; top:-14px; height:14px; pointer-events:none; transform: scaleY(-1); }
:root[data-theme='light'] nav.bottom-nav::before{ background: var(--bg); -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 14" preserveAspectRatio="none"><path d="M0 7 Q 10 0 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 V14 H0z" fill="black"/></svg>'); mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 14" preserveAspectRatio="none"><path d="M0 7 Q 10 0 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 V14 H0z" fill="black"/></svg>'); -webkit-mask-size: 120px 14px; mask-size: 120px 14px; -webkit-mask-repeat: repeat; mask-repeat: repeat; opacity:0.85; }
:root[data-theme='dark'] nav.bottom-nav::before{ background: var(--bg); -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 14" preserveAspectRatio="none"><path d="M0 7 Q 10 0 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 V14 H0z" fill="black"/></svg>'); mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 14" preserveAspectRatio="none"><path d="M0 7 Q 10 0 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 V14 H0z" fill="black"/></svg>'); -webkit-mask-size: 120px 14px; mask-size: 120px 14px; -webkit-mask-repeat: repeat; mask-repeat: repeat; opacity:0.65; }

/* Improve navigation readability in dark theme */
:root[data-theme='dark'] .nav-btn { color: rgba(230,247,251,0.9); }
:root[data-theme='dark'] .nav-btn:hover { background: color-mix(in srgb, var(--accent-3) 10%, transparent 90%); color: var(--fg); }

button.pill { padding: 8px 12px; border-radius: 9999px; background: linear-gradient(90deg,var(--surface),var(--card)); color: var(--fg); border: 1px solid rgba(0,0,0,0.04); }
button.pill:hover{ background: linear-gradient(90deg,var(--surface),color-mix(in srgb, var(--surface) 80%, var(--accent) 20%)); }

button:focus-visible{ outline: 2px solid var(--accent); outline-offset: 2px; }

/* Theme controller for Searene — handles light/dark mode and persistence. */
(function(){
  const STORAGE_KEY = 'searene:theme';
  const root = document.documentElement;

  function readStored(){ try{ const v=localStorage.getItem(STORAGE_KEY); return (v==='dark'||v==='light')?v:null;}catch(e){return null;} }
  function readPrefers(){ try{ return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }catch(e){ return 'light'; } }

  function apply(theme, persist=true){
    if(theme!=='dark' && theme!=='light') theme='light';
    root.setAttribute('data-theme', theme);
    if(persist){ try{ localStorage.setItem(STORAGE_KEY, theme); }catch(e){} }
    window.dispatchEvent(new CustomEvent('themechange',{ detail:{ theme } }));
    document.querySelectorAll('.theme-switch').forEach(el=>{
      el.setAttribute('data-theme', theme);
      el.setAttribute('aria-pressed', theme==='dark' ? 'true' : 'false');
    });
  }

  function toggle(){ apply(root.getAttribute('data-theme')==='dark' ? 'light' : 'dark', true); }

  function init(){
    const stored = readStored();
    const initial = stored || readPrefers() || (root.getAttribute('data-theme')||'light');
    apply(initial, !!stored);
  }

  function mountHeaderToggle(selector){
    const el = document.querySelector(selector);
    if(!el) return;
    el.addEventListener('click', (e)=>{
      const btn = e.target.closest('.theme-switch');
      if(btn) toggle();
    });
  }

  window.Theme = { init, toggle, set: apply, current: ()=>root.getAttribute('data-theme')||'light', mountHeaderToggle };
})();
.theme-switch[data-theme='light'] .theme-icon.sun { opacity:1; }

