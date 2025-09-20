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

/* Navigation */
.nav-btn { 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 0.875rem; 
  font-weight: 500; 
  color: var(--muted); 
  border-radius: 0.375rem; 
  transition: all 0.2s ease; 
  border: none; 
  background: transparent; 
  cursor: pointer; 
}
.nav-btn:hover { 
  color: var(--fg); 
  background: color-mix(in srgb, var(--surface) 88%, var(--accent-2) 6%, transparent 6%);
  box-shadow: 0 6px 14px rgba(35,132,161,0.06);
}
.nav-btn[aria-selected="true"] { 
  color: white; 
  background: linear-gradient(90deg, color-mix(in srgb, var(--accent-2) 65%, var(--ocean-mid) 35%), var(--accent));
  box-shadow: 0 8px 18px color-mix(in srgb, var(--accent-2) 20%, transparent 80%);
}
:root[data-theme='dark'] .nav-btn:hover { 
  background: color-mix(in srgb, var(--accent-3) 10%, transparent 90%);
}

/* Theme toggle switch (animated knob with icons) */
.theme-switch { padding: 4px; }
.theme-switch-track { display:inline-block; position:relative; width:72px; height:34px; border-radius:999px; background: linear-gradient(90deg, color-mix(in srgb,var(--surface) 88%, var(--accent) 12%), var(--surface)); padding:4px; box-sizing:border-box; }
.theme-switch .theme-icon { position:absolute; top:50%; transform:translateY(-50%); width:20px; height:20px; display:inline-flex; align-items:center; justify-content:center; font-size:16px; opacity:0.9; z-index:1; pointer-events:none; }
.theme-switch .theme-icon.sun{ left:8px; color: #f6c85f; }
.theme-switch .theme-icon.moon{ right:8px; color: #9ad1f0; }
.theme-switch-knob { position:absolute; top:4px; left:4px; width:26px; height:26px; border-radius:999px; background: white; box-shadow: 0 6px 16px rgba(2,6,23,0.12); transition: transform 220ms cubic-bezier(.2,.9,.2,1); z-index:2; }
/* Compute translateX so knob sits fully inside the track (track inner width minus knob width) */
.theme-switch[data-theme='dark'] .theme-switch-knob { transform: translateX(38px); }
.theme-switch[data-theme='dark'] .theme-icon.sun { opacity:0.35; }
.theme-switch[data-theme='dark'] .theme-icon.moon { opacity:1; }
.theme-switch[data-theme='light'] .theme-icon.sun { opacity:1; }
.theme-switch[data-theme='light'] .theme-icon.moon { opacity:0.35; }

/* Modal */
#message-modal-overlay{ position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 50; }
/* Modal surfaces use gentle gradients and subtle borders */
:root[data-theme='light'] #message-modal{ background: linear-gradient(180deg,var(--surface), color-mix(in srgb,var(--surface) 90%, #ffffff 10%)); border-radius: 12px; padding: 16px; min-width: 260px; box-shadow: 0 8px 20px rgba(2,6,23,0.045); border: 1px solid rgba(11,43,59,0.03); }
:root[data-theme='dark'] #message-modal{ background: linear-gradient(180deg,var(--surface), color-mix(in srgb,var(--surface) 92%, rgba(255,255,255,0.02) 8%)); border-radius: 12px; padding: 16px; min-width: 260px; box-shadow: 0 10px 30px rgba(2,6,23,0.35); border: 1px solid rgba(255,255,255,0.04); }

/* Utility */
.hidden{ display: none; }
/* Ensure overlay can be hidden despite ID selector setting display:flex */
#message-modal-overlay.hidden{ display: none; }

/* Layout: make main app area use available viewport height and allow panels to scroll */
html, body { height: 100%; }

/* Ensure the main app-content behaves as a flex column and doesn't force children to overflow the page */
#app-content { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; overflow: hidden; }

/* The module root (first child inserted into #app-content) should fill available space */
#app-content > div { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; overflow: auto; }

/* Make the three-column grid stretch vertically so its children can scroll internally */
.grid.lg\:grid-cols-3 { flex: 1 1 auto; min-height: 0; }

/* Left column (main list) should be a column and allow internal vertical scrolling */
.lg\:col-span-2 { display: flex; flex-direction: column; min-height: 0; }
#s-list { flex: 1 1 auto; overflow-y: auto; min-height: 0; }

/* Right column (aside) should allow its sticky box to scroll if tall */
aside.lg\:col-span-1 { display: flex; flex-direction: column; min-height: 0; }
aside.lg\:col-span-1 .p-4 { position: sticky; top: 4rem; max-height: calc(100vh - 6rem); overflow: auto; }

/* Details rows and item lists should allow their content to wrap and not expand the page */
.detail-row { word-break: break-word; }

/* Small tweak: ensure textareas and long lists don't force height */
textarea { max-width: 100%; }

/* Recent mood pill styling */
.recent-pill{ background: color-mix(in srgb, var(--surface) 84%, var(--accent) 8%); padding: 6px 10px; border-radius: 9999px; align-items:center; color: var(--fg); box-shadow: 0 4px 12px color-mix(in srgb,#001827 6%, transparent 94%); border: 1px solid color-mix(in srgb,var(--accent) 6%, transparent 94%); }
.recent-pill .emoji{ font-size: 1rem; }
.recent-pill .label{ margin-left: 0; }
.recent-pill .time{ margin-left: 6px; }

/* Check-In specific layout and controls */
.checkin-content { max-width: 820px; margin: 0 auto; }
.checkin-content { padding-left: 1rem; padding-right: 1rem; }
.checkin-content .pill { margin-top: 6px; }

/* Pill buttons used heavily in Check-In — give clearer boundaries and hover feedback */
.pill { display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius:999px; font-size:0.95rem; line-height:1; background: linear-gradient(90deg, color-mix(in srgb,var(--surface) 92%, #ffffff 8%), var(--surface)); color: var(--fg); border: 1px solid color-mix(in srgb,var(--accent) 18%, rgba(0,0,0,0.06)); box-shadow: 0 6px 18px color-mix(in srgb,#001827 6%, transparent 94%); cursor: pointer; transition: transform 140ms ease, box-shadow 140ms ease, background 120ms ease; }
.pill:hover { transform: translateY(-2px); box-shadow: 0 12px 32px color-mix(in srgb,#001827 10%, transparent 90%); border-color: color-mix(in srgb,var(--accent) 26%, rgba(0,0,0,0.08)); }
.pill:active { transform: translateY(0); box-shadow: 0 8px 20px color-mix(in srgb,#001827 8%, transparent 92%); }
.pill:focus-visible { outline: 2px solid color-mix(in srgb,var(--accent) 34%, transparent 66%); outline-offset: 2px; }

/* Dark theme pill adjustments */
:root[data-theme='dark'] .pill { background: linear-gradient(90deg, color-mix(in srgb,var(--surface) 92%, rgba(255,255,255,0.02) 8%), var(--surface)); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 6px 18px rgba(2,6,23,0.5); color: var(--fg); }

/* Divider under header for clearer separation */
.checkin-divider { display:block; height:1px; margin-top:8px; margin-bottom:12px; border: none; background: color-mix(in srgb,var(--accent) 6%, transparent 94%); opacity:0.6; }

/* Pill icon (circular) */
.pill-icon { display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; border-radius:50%; background: var(--accent); color: white; font-size:12px; line-height:1; margin-right:8px; flex:0 0 20px; }
:root[data-theme='dark'] .pill-icon { background: var(--accent-3); }
.pill-label{ display:inline-block; }


.rating-indicator{ width:26px; height:26px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-weight:700; background: linear-gradient(90deg,color-mix(in srgb,var(--accent-2) 60%, #ffffff 40%), var(--accent)); color: white; box-shadow: 0 3px 10px color-mix(in srgb,#001827 6%, transparent 94%); }

/* Compact Quick Snapshot widget */
#home-snapshot-widget{ padding: 10px; }
#home-snapshot-widget .text-sm{ font-size: 0.85rem; }
#home-snapshot-widget .recent-pill{ display:inline-flex; }

/* Right Now rating compact style */
.home-rating { display:flex; align-items:center; justify-content:flex-start; gap:8px; flex-wrap:wrap; }

/* Left header column to keep greeting/date aligned */
.home-header-left { display:flex; flex-direction:column; gap:6px; align-items:flex-start; }
.home-header-left .text-sm { margin-left: 0; padding-left: 0; }
/* Make direct children align flush with the left column */
.home-header-left > * { margin-left: 0; padding-left: 0; width: 100%; box-sizing: border-box; }
.home-header-left .home-rating { margin-left: 0; }
.home-rating .rating-btn { width:34px; height:34px; border-radius:8px; font-weight:600; font-size:0.95rem; padding:0; background: transparent; border:1px solid rgba(5,32,51,0.06); color:var(--fg); }
/* Hover colors mapped by rating value (1=red .. 5=green) */
.home-rating .rating-btn[data-rating="1"]:hover { background: linear-gradient(90deg,#fca5a5,#f87171); color: white; }
.home-rating .rating-btn[data-rating="2"]:hover { background: linear-gradient(90deg,#fbcfe8,#fb7185); color: white; }
.home-rating .rating-btn[data-rating="3"]:hover { background: linear-gradient(90deg,#fde68a,#f59e0b); color: white; }
.home-rating .rating-btn[data-rating="4"]:hover { background: linear-gradient(90deg,#bbf7d0,#34d399); color: white; }
.home-rating .rating-btn[data-rating="5"]:hover { background: linear-gradient(90deg,#bbf7d0,#10b981); color: white; }
.home-rating .rating-btn.active { background: linear-gradient(90deg,var(--accent-2),var(--accent)); color: white; }
.home-rating .rating-note { font-size:0.85rem; opacity:0.8; margin-top:6px; text-align:center; }

/* Move the rating card and content below the date lower on the page */
.home-rating-card { margin-top: 40px; }
/* configurable spacer for the home content to push lower on the page */
:root { --home-content-top-spacer: 24px; }
section.grid { padding-top: calc(var(--home-content-top-spacer) + 8px); }
@media (min-width: 640px) {
  section.grid { padding-top: calc(var(--home-content-top-spacer) + 20px); }
}

/* Widget drag handle and collapsed state */
.widget { position: relative; display:flex; flex-direction:column; overflow: visible; }
.widget .widget-body { display: block; overflow: visible; }
.widget .widget-header { display:flex; align-items:center; justify-content:space-between; gap:8px; }
.widget .widget-handle { cursor: grab; width:20px; height:20px; display:inline-flex; align-items:center; justify-content:center; opacity:0.6; }
/* Fallback: hide all children except the header when collapsed (no .widget-body present) */
.widget.collapsed > *:not(.widget-header) { display: none; }
  .widget.dragging { opacity:0.85; transform: scale(0.995); }
  .widget.collapsed .widget-body { display:block; }
  .widget.collapsed > *:not(.widget-header) { display: none; }
  .widget.collapsed { align-self: flex-start; }
.widget-collapse-btn { background: transparent; border: none; cursor: pointer; opacity:0.8; padding:4px; }
.widget-collapse-btn:focus { outline: 2px solid var(--accent); }

/* When dragging show a placeholder spacing to reduce layout shift */
.widget.placeholder { border: 2px dashed color-mix(in srgb, var(--accent) 16%, transparent 84%); background: color-mix(in srgb, var(--surface) 90%, transparent 10%); box-shadow: inset 0 1px 0 color-mix(in srgb,#ffffff 6%, transparent 94%); }

/* Utility card/button/input styles for consistent theme */
.card { background: linear-gradient(180deg, color-mix(in srgb,var(--surface) 96%, var(--bg) 4%), var(--surface)); border-radius: 12px; padding: 12px; box-shadow: 0 8px 20px color-mix(in srgb,var(--ocean-deep) 7%, transparent 93%); border: 1px solid color-mix(in srgb,var(--accent) 8%, transparent 92%); }
.button { padding: 8px 12px; border-radius: 10px; background: linear-gradient(90deg,color-mix(in srgb,var(--accent-2) 74%, #ffffff 26%), var(--accent)); color: white; border: none; cursor: pointer; box-shadow: 0 6px 14px color-mix(in srgb,var(--accent-3) 8%, transparent 92%); }
.button-muted { padding: 8px 12px; border-radius: 10px; background: linear-gradient(90deg,color-mix(in srgb,var(--surface) 92%, #ffffff 8%), color-mix(in srgb,var(--surface) 84%, var(--accent) 16%)); color: var(--fg); border: 1px solid color-mix(in srgb,var(--accent) 4%, transparent 96%); }
input, textarea, select { background: color-mix(in srgb,var(--surface) 96%, var(--bg) 4%); color: var(--fg); border: 1px solid color-mix(in srgb,var(--accent) 4%, transparent 96%); padding: 8px; border-radius: 8px; }
input:focus, textarea:focus, select:focus { outline: 2px solid color-mix(in srgb,var(--accent) 24%, transparent 76%); outline-offset: 2px; }
.toast { padding: 10px 14px; border-radius: 10px; background: linear-gradient(90deg,color-mix(in srgb,var(--accent) 10%, transparent 90%), color-mix(in srgb,var(--accent-2) 6%, transparent 94%)); color: white; box-shadow: 0 8px 24px color-mix(in srgb,var(--accent) 20%, transparent 80%); }

/* Compatibility: override Tailwind-style utility classes for dark theme so surfaces remain dark */
:root[data-theme='dark']{
  /* background utilities (white variants) */
  --u-white-0: rgba(255,255,255,0.00);
  --u-white-5: rgba(255,255,255,0.04);
  --u-white-10: rgba(255,255,255,0.06);
  --u-white-20: rgba(255,255,255,0.10);
  --u-white-30: rgba(255,255,255,0.14);
  --u-white-70: rgba(255,255,255,0.26);
  /* black variants (light-theme utilities) use subtle dark values in light theme already */
}

:root[data-theme='dark'] .bg-white\/0 { background: var(--u-white-0) !important; }
:root[data-theme='dark'] .bg-white\/5 { background: var(--u-white-5) !important; }
:root[data-theme='dark'] .bg-white\/10 { background: var(--u-white-10) !important; }
:root[data-theme='dark'] .bg-white\/20 { background: var(--u-white-20) !important; }
:root[data-theme='dark'] .bg-white\/30 { background: var(--u-white-30) !important; }
:root[data-theme='dark'] .bg-white\/70 { background: var(--u-white-70) !important; }

/* Border utilities that reference black in markup should be lighter in dark mode */
:root[data-theme='dark'] .border-black\/10 { border-color: rgba(255,255,255,0.06) !important; }
:root[data-theme='dark'] .border-black\/0 { border-color: rgba(255,255,255,0.02) !important; }

/* Hover utilities */
:root[data-theme='dark'] .hover\:bg-black\/5:hover { background: var(--u-white-5) !important; }

/* Map common bg-black/* utilities used in templates to dark-friendly surfaces */
:root[data-theme='dark']{
  --u-black-0: rgba(0,0,0,0.00);
  --u-black-5: rgba(0,0,0,0.06);
  --u-black-10: rgba(0,0,0,0.09);
  --u-black-20: rgba(0,0,0,0.14);
  --u-black-30: rgba(0,0,0,0.18);
}

:root[data-theme='dark'] .bg-black\/0 { background: var(--u-black-0) !important; }
:root[data-theme='dark'] .bg-black\/5 { background: var(--u-black-5) !important; }
:root[data-theme='dark'] .bg-black\/10 { background: var(--u-black-10) !important; }
:root[data-theme='dark'] .bg-black\/20 { background: var(--u-black-20) !important; }
:root[data-theme='dark'] .bg-black\/30 { background: var(--u-black-30) !important; }

/* Text and ring fallbacks for templates that use ring/indigo tokens */
:root[data-theme='dark'] .ring-indigo-500 { box-shadow: 0 0 0 3px rgba(59,130,246,0.12) !important; }
:root[data-theme='dark'] .text-white { color: var(--fg) !important; }

/* Journal font utilities */
.font-sans { font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif; }
.font-serif { font-family: ui-serif, Georgia, 'Times New Roman', Times, serif; }
.font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }

/* contentEditable placeholder styling for journal composer */
#j-text.placeholder:empty::before { content: attr(data-placeholder); opacity: 0.6; }
#j-text { min-height: 120px; }





