(function(){
  // Clean main bootstrap + routing
  function renderBrand(){ const host=document.getElementById('header-logo'); if(!host) return; host.innerHTML=window.brandLogoSVG(72)+ '<span class="font-semibold text-lg md:text-2xl ml-2">Searene</span>'; }
  function wireTheme(){ const btn=document.getElementById('theme-toggle-header'); if(!btn) return;
    const update=()=>{ const current = document.documentElement.getAttribute('data-theme')||'light'; btn.setAttribute('data-theme', current); btn.setAttribute('aria-pressed', current==='dark'? 'true':'false'); };
    btn.addEventListener('click',()=>{ window.Theme?.toggle(); update(); });
    window.addEventListener('themechange',update);
    update();
  }
  function setActive(id){ ['home-tab-btn','checkin-tab-btn','journal-tab-btn','patterns-tab-btn','compass-tab-btn','somatic-tab-btn'].forEach(tid=>{ const el=document.getElementById(tid); if(el) el.setAttribute('aria-selected', String(tid===id)); }); }
  function ensureModal(){ if(document.getElementById('message-modal-overlay')) return; const overlay=document.createElement('div'); overlay.id='message-modal-overlay'; overlay.className='hidden'; overlay.innerHTML='<div id="message-modal"><div id="modal-message" class="mb-3"></div><div class="text-right"><button id="modal-close-btn" class="px-3 py-1 rounded button">Close</button></div></div>'; document.body.appendChild(overlay); const btn=document.getElementById('modal-close-btn'); const hide=()=>overlay.classList.add('hidden'); if(btn) btn.onclick=hide; overlay.onclick=(e)=>{ if(e.target===overlay) hide(); }; }

  function route(tab){
    const idMap={home:'home-tab-btn',checkin:'checkin-tab-btn',journal:'journal-tab-btn',patterns:'patterns-tab-btn',compass:'compass-tab-btn',somatic:'somatic-tab-btn'};
    setActive(idMap[tab]);
    try{
      if(tab==='home') window.HomeModule?.show();
      else if(tab==='checkin') window.CheckInModule?.show();
      else if(tab==='journal') window.JournalModule?.show();
      else if(tab==='patterns') window.PatternsModule?.show();
      else if(tab==='compass') window.CompassModule?.show();
      else if(tab==='somatic') window.SomaticModule?.show();
    }catch(err){ console.error('Error routing to', tab, err); try{ window.showMessage && window.showMessage('Error opening '+tab); }catch(e){} }
    try{ window.CompassModule?.onVisibility?.(); }catch(e){}
  }

  function bindNav(){ const bind=(id,tab)=>{ const el=document.getElementById(id); if(el) el.addEventListener('click',()=>route(tab)); }; bind('home-tab-btn','home'); bind('checkin-tab-btn','checkin'); bind('journal-tab-btn','journal'); bind('patterns-tab-btn','patterns'); bind('compass-tab-btn','compass'); bind('somatic-tab-btn','somatic'); }

  function bindNavDelegated(){ const nav=document.querySelector('nav'); if(!nav) return; nav.addEventListener('click',(e)=>{ const btn=e.target.closest('button'); if(!btn) return; const id=btn.id; console.log('nav delegated click for', id); const mapInv={ 'home-tab-btn':'home','checkin-tab-btn':'checkin','journal-tab-btn':'journal','patterns-tab-btn':'patterns','compass-tab-btn':'compass','somatic-tab-btn':'somatic' }; if(mapInv[id]){ console.log('routing to', mapInv[id]); route(mapInv[id]); } }); }

  // instrumentation for direct binds
  const __orig_bindNav = bindNav; bindNav = function(){ __orig_bindNav(); ['home-tab-btn','checkin-tab-btn','journal-tab-btn','patterns-tab-btn','compass-tab-btn','somatic-tab-btn'].forEach(id=>{ const el=document.getElementById(id); if(el) console.log('nav bind attached for', id); }); }

  // (debug header buttons removed)

  function updateVh(){ const vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--app-vh', `${vh}px`); }
  window.addEventListener('resize', updateVh);

  function init(){ window.Theme?.init(); renderBrand(); wireTheme(); ensureModal(); bindNav(); route('home'); const overlay=document.getElementById('message-modal-overlay'); if(overlay) overlay.classList.add('hidden'); bindNavDelegated(); window.Theme?.mountHeaderToggle && window.Theme.mountHeaderToggle('#app-header-actions'); updateVh(); }

  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',init);} else { init(); }
})();
