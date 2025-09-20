(function(){
  function show(){
    const el=document.getElementById('app-content'); if(!el) return;
    const QUOTES=[
      "Breathe. Notice. Be kind to yourself.",
      "Small steps matter — begin where you are.",
      "This moment is enough.",
      "Notice one thing, then another.",
      "You are learning how to return home to yourself."
    ];
    const today=(new Date()).toLocaleDateString(undefined,{ weekday:'long', month:'short', day:'numeric' });
    // read mood log (array migrate to {date, rating, emotion?})
    const LOG_KEY='home_mood_log';
    let moodLog=[]; try{ moodLog=JSON.parse(localStorage.getItem(LOG_KEY)||'[]'); }catch(e){ moodLog=[]; }
    // migration: if entries are {date,mood} map them to rating+emotion
    function mapMoodToRating(mood){ const m = (mood||'').toLowerCase(); if(['anxious','sad'].includes(m)) return 2; if(['okay'].includes(m)) return 3; if(['grateful','energized'].includes(m)) return 4; return 3; }
    let _migrated=false;
    if(Array.isArray(moodLog) && moodLog.length>0 && moodLog[0].mood){
      moodLog = moodLog.map(r=>({ date:r.date, rating: mapMoodToRating(r.mood), emotion: r.mood }));
      localStorage.setItem(LOG_KEY, JSON.stringify(moodLog)); _migrated=true;
    }
  const uniqueDays=new Set((moodLog||[]).map(r=>r.date)).size;

  const userName = localStorage.getItem('user_name') || '';
    const dailyQuote = QUOTES[Math.floor(Math.random()*QUOTES.length)];
    const timeGreeting = (function(){ const h = new Date().getHours(); if(h<12) return 'morning'; if(h<17) return 'afternoon'; return 'evening'; })();
    const focusKey = 'home_focus';
    const widgetsKey = 'home_widgets';
    const widgets = (()=>{ try{ return JSON.parse(localStorage.getItem(widgetsKey)||'{}'); }catch(e){return{}} })();
  const focus = localStorage.getItem(focusKey) || '';

    el.innerHTML=`
      <div class="px-4 py-6 space-y-4 w-full" style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0;">
        <section class="flex items-start justify-between">
          <div class="home-header-left">
            <div class="flex items-center gap-2">
              <div class="text-sm opacity-70">Good ${timeGreeting},</div>
              <div id="home-greeting" class="font-medium text-indigo-700">${window.sanitizeHTML(userName || 'there')}</div>
              <button id="home-set-name" class="text-xs opacity-70">${userName? 'Edit name':'Set name'}</button>
            </div>
            <div class="text-sm opacity-80 mt-1">${today} • <span id="home-days-logged">${uniqueDays}</span> days logged</div>
            <div class="mt-3 p-3 rounded-lg card home-rating-card">
              <div class="text-sm opacity-80 mb-1">How would you rate your wellbeing?</div>
              <div id="home-rating-row" class="home-rating" style="margin-bottom:6px;">
                <button data-rating="1" class="rating-btn">1</button>
                <button data-rating="2" class="rating-btn">2</button>
                <button data-rating="3" class="rating-btn">3</button>
                <button data-rating="4" class="rating-btn">4</button>
                <button data-rating="5" class="rating-btn">5</button>
              </div>
              <div style="display:flex;gap:8px;align-items:center;">
                <input id="home-emotion-search" autocomplete="off" inputmode="text" placeholder="Add an emotion (optional)" style="flex:1;min-width:160px" class="text-sm rounded-md px-2 py-1 border border-black/10" />
                <button id="home-emotion-apply" class="text-sm rounded px-2 py-1 button-muted">Add</button>
              </div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
            <div class="text-sm opacity-80 italic text-slate-600">${window.sanitizeHTML(dailyQuote)}</div>
            <button id="home-manage-widgets-global" class="text-xs opacity-70">Manage Widgets</button>
          </div>
        </section>

  <section class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="min-height:0;">
          <div id="home-focus-widget" class="widget p-3 rounded-lg card" data-widget-id="focus">
            <div class="widget-header">
              <div style="display:flex;align-items:center;gap:8px;"><span class="widget-handle" title="Drag to reorder">⋮</span><div class="font-medium">Today's Focus</div></div>
              <div style="display:flex;align-items:center;gap:8px;"><button class="widget-collapse-btn" data-target="focus">▾</button></div>
            </div>
            <div class="widget-body">
              <div class="mt-2">
                <textarea id="home-focus-input" rows="3" class="w-full rounded-md px-3 py-2 bg-transparent border border-black/10 dark:border-white/20 text-sm" placeholder="Write one small, kind intention for today...">${window.sanitizeHTML(focus)}</textarea>
                <div class="mt-2 flex items-center gap-2"><button id="home-focus-save" class="text-sm rounded px-3 py-1 bg-emerald-600 text-white">Save</button><button id="home-focus-clear" class="text-sm rounded px-3 py-1 button-muted">Clear</button></div>
              </div>
            </div>
            <div class="mt-3 text-xs opacity-60"><label><input type="checkbox" id="home-hide-focus"> Hide this widget</label></div>
          </div>

          <div id="home-snapshot-widget" class="widget p-3 rounded-lg card" data-widget-id="snapshot">
            <div class="widget-header">
              <div style="display:flex;align-items:center;gap:8px;"><span class="widget-handle" title="Drag to reorder">⋮</span><div class="font-medium">Quick Snapshot</div></div>
              <div style="display:flex;align-items:center;gap:8px;"><button class="widget-collapse-btn" data-target="snapshot">▾</button></div>
            </div>
            <div class="widget-body">
              <div class="mt-2 text-sm opacity-80">Mood logs this week: <span id="home-mood-week">0</span></div>
              <div class="text-sm opacity-80 mt-1">Journal entries this week: <span id="home-journal-week">0</span></div>
              <div class="text-sm opacity-80 mt-3">Recent moods:</div>
              <div id="home-recent-moods" class="flex gap-2 flex-wrap mt-2"></div>
              <div class="mt-3 text-xs opacity-60"><label><input type="checkbox" id="home-hide-snapshot"> Hide this widget</label></div>
              <div class="mt-2"><button id="home-clear-moods" class="text-xs opacity-70">Clear mood logs</button></div>
            </div>
          </div>
          <div id="home-mini-timer-widget" class="widget p-3 rounded-lg card" data-widget-id="mini">
            <div class="widget-header">
              <div style="display:flex;align-items:center;gap:8px;"><span class="widget-handle" title="Drag to reorder">⋮</span><div class="font-medium">Mini Timer</div></div>
              <div style="display:flex;align-items:center;gap:8px;"><button class="widget-collapse-btn" data-target="mini">▾</button></div>
            </div>
            <div class="widget-body">
              <div class="mt-2 text-sm opacity-80">Quick timers for 1 / 3 / 5 minutes.</div>
              <div id="mini-timer-inline-host" style="margin-top:10px;"></div>
              <div class="mt-3 text-xs opacity-60"><label><input type="checkbox" id="home-hide-mini"> Hide this widget</label></div>
            </div>
          </div>

          <div id="home-breathing-widget" class="widget p-3 rounded-lg card" data-widget-id="breathing">
            <div class="widget-header">
              <div style="display:flex;align-items:center;gap:8px;"><span class="widget-handle" title="Drag to reorder">⋮</span><div class="font-medium">Breathing</div></div>
              <div style="display:flex;align-items:center;gap:8px;"><button class="widget-collapse-btn" data-target="breathing">▾</button></div>
            </div>
            <div class="widget-body">
              <div class="mt-2 text-sm opacity-80">One-tap guided breathing sessions.</div>
              <div id="breathing-inline-host" style="margin-top:10px;"></div>
              <div class="mt-3 text-xs opacity-60"><label><input type="checkbox" id="home-hide-breathing"> Hide this widget</label></div>
            </div>
          </div>

          <div id="home-anchors-widget" class="widget p-3 rounded-lg card" data-widget-id="anchors">
            <div class="widget-header">
              <div style="display:flex;align-items:center;gap:8px;"><span class="widget-handle" title="Drag to reorder">⋮</span><div class="font-medium">Emotion Anchors</div></div>
              <div style="display:flex;align-items:center;gap:8px;"><button id="home-anchors-open" class="text-xs opacity-70">Open</button><button class="widget-collapse-btn" data-target="anchors">▾</button></div>
            </div>
            <div class="widget-body">
              <div class="text-sm opacity-80">Pin triggers (song, smell, gesture, quote) that help you shift state.</div>
              <div class="mt-2" style="display:flex;gap:6px;align-items:center;">
                <input id="home-anchor-title" class="text-sm rounded-md px-2 py-1 border border-black/10" placeholder="Add quick anchor (title)" style="flex:1;min-width:160px" />
                <button id="home-anchor-add" class="text-sm rounded px-2 py-1 button-muted">Add</button>
              </div>
              <div class="mt-3 text-sm opacity-80">Pinned:</div>
              <div id="home-anchors-pinned" class="mt-2 space-y-2"></div>
              <div class="mt-3 text-xs opacity-60"><label><input type="checkbox" id="home-hide-anchors"> Hide this widget</label></div>
            </div>
          </div>
        </section>
      </div>`;

  // (cleaned) old mood-btn styling and pinned count removed as unused
  const recentHost=document.getElementById('home-recent-moods');
  function humanLabel(key){ if(!key) return ''; return key.charAt(0).toUpperCase() + key.slice(1); }
  // niceTime now works from a date string (YYYY-MM-DD). If it's today, show 'today', else show short date.
  function niceTimeFromDate(dateStr){ if(!dateStr) return ''; try{ const d=new Date(); const today = d.toISOString().slice(0,10); if(dateStr===today) return 'today'; const dd=new Date(dateStr); return dd.toLocaleDateString(undefined,{ month:'short', day:'numeric' }); }catch(e){ return dateStr; } }

  function showMoodHistory(){
    const overlay = document.getElementById('message-modal-overlay');
    const modalMsg = document.getElementById('modal-message');
    if(!overlay || !modalMsg){
      // fallback: alert a simple history
      const recent = (moodLog||[]).slice(-8).reverse().map(r=>`${humanLabel(r.mood)} (${r.date})`).join('\n');
      return alert('Mood history:\n' + (recent || 'No moods yet'));
    }
  // build history list (show rating + optional emotion)
  const recent = (moodLog||[]).slice(-8).reverse();
    if(recent.length===0){ modalMsg.textContent = 'No mood history yet.'; } else {
      modalMsg.innerHTML = '<div style="display:flex;flex-direction:column;gap:8px;">' + recent.map(r=>{
        const ratingDot = `<div class="rating-indicator">${r.rating||'•'}</div>`;
        return `<div style="display:flex;align-items:center;gap:10px;"><div>${ratingDot}</div><div style="font-weight:600">${r.emotion? humanLabel(r.emotion) : 'Rating'}</div><div style="color:var(--muted);font-size:12px;margin-left:8px">${niceTimeFromDate(r.date)}</div></div>`;
      }).join('') + '</div>';
    }
    overlay.classList.remove('hidden');
  }

  function renderRecentMood(){ if(!recentHost) return; recentHost.innerHTML=''; const last=(moodLog||[]).slice(-1)[0]; if(!last) return; const pill=document.createElement('div'); pill.className='recent-pill flex items-center gap-2'; pill.style.cursor='pointer'; const ratingEl=document.createElement('div'); ratingEl.textContent = last.rating || '?'; ratingEl.className='rating-indicator'; const lbl=document.createElement('span'); lbl.className='label ml-0 text-sm font-medium'; lbl.textContent = last.emotion ? humanLabel(last.emotion) : (last.rating ? `Rating ${last.rating}` : 'No mood'); const ts=document.createElement('span'); ts.className='time text-xs opacity-60'; ts.textContent = niceTimeFromDate(last.date); pill.appendChild(ratingEl); pill.appendChild(lbl); pill.appendChild(ts); pill.addEventListener('click', showMoodHistory); recentHost.appendChild(pill); }
  
  // Emotion typeahead (mirror Journal behavior)
  function homeGetEmotionSource(){
    const fallback = ['Calm','Anxious','Sad','Angry','Tired','Grateful','Lonely','Happy','Stressed','Neutral'];
    const src = (window.COMPASS_EMOTIONS && Array.isArray(window.COMPASS_EMOTIONS)) ? window.COMPASS_EMOTIONS : fallback;
    return src || fallback;
  }
  function homeSetupEmotionTypeahead(inputEl){
    if(!inputEl) return;
    let composing=false; let lastKey='';
    inputEl.addEventListener('compositionstart',()=>{ composing=true; });
    inputEl.addEventListener('compositionend',()=>{ composing=false; });
    inputEl.addEventListener('keydown',(e)=>{
      lastKey = (e.ctrlKey||e.metaKey||e.altKey) ? '' : (e.key||'');
    });
    inputEl.addEventListener('input',(e)=>{
      if(composing) return;
      const inputType = e.inputType || '';
      if(inputType.startsWith('delete')) return;
      const selStart = inputEl.selectionStart ?? 0;
      const selEnd = inputEl.selectionEnd ?? 0;
      if(selStart !== selEnd) return;
      if(selStart !== (inputEl.value||'').length) return;
      const isInsert = inputType ? inputType.startsWith('insert') : (lastKey && lastKey.length===1);
      if(!isInsert) return;
      const raw = inputEl.value || '';
      const q = raw.trim();
      if(!q) return;
      const src = homeGetEmotionSource();
      const match = src.find(m => String(m).toLowerCase().startsWith(q.toLowerCase()));
      if(match && match !== raw){
        inputEl.value = match;
        try{ inputEl.setSelectionRange(q.length, match.length); }catch(_){ }
      }
    });
  }
  
  // rating button behavior
  // rating button behavior
  document.addEventListener('click', (e)=>{
    const b = e.target.closest && e.target.closest('.rating-btn'); if(!b) return; const rating = Number(b.dataset.rating); if(!rating) return; const date=(new Date()).toISOString().slice(0,10);
    moodLog.push({ date, rating }); localStorage.setItem(LOG_KEY, JSON.stringify(moodLog)); renderRecentMood(); document.getElementById('home-days-logged').textContent = new Set(moodLog.map(r=>r.date)).size;
    // visual active state
    document.querySelectorAll('#home-rating-row .rating-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); setTimeout(()=>{ b.classList.remove('active'); }, 900);
  // no immediate suggestion on rating — keep rating capture minimal
  });

  // emotion search/apply: patches the most recent entry
  const homeEmotionInput = document.getElementById('home-emotion-search'); if(homeEmotionInput){ homeEmotionInput.setAttribute('autocomplete','off'); homeEmotionInput.setAttribute('inputmode','text'); homeSetupEmotionTypeahead(homeEmotionInput); }
  document.getElementById('home-emotion-apply').addEventListener('click', ()=>{
    const v = document.getElementById('home-emotion-search').value.trim(); if(!v) return; const lastIdx = (moodLog||[]).length-1; if(lastIdx<0) return alert('No recent mood to attach emotion to');
    moodLog[lastIdx].emotion = v; moodLog[lastIdx].emotionLabel = v; localStorage.setItem(LOG_KEY, JSON.stringify(moodLog)); renderRecentMood(); document.getElementById('home-emotion-search').value='';
  });
  
  // clear mood logs
  document.getElementById('home-clear-moods').addEventListener('click', ()=>{
    if(!confirm('Clear all mood logs? This cannot be undone.')) return; moodLog = []; localStorage.removeItem(LOG_KEY); renderRecentMood(); document.getElementById('home-mood-week').textContent = 0; document.getElementById('home-days-logged').textContent = 0; alert('Mood logs cleared.');
  });
  // (removed) open buttons; widgets render inline and are self-contained
  renderRecentMood();

  // Render inline widget content for mini timer and breathing if the modules expose render(host)
  try{
    const miniHost = document.getElementById('mini-timer-inline-host'); if(miniHost && window.MiniTimerModule && typeof window.MiniTimerModule.render === 'function'){ window.MiniTimerModule.render(miniHost); }
    const breathHost = document.getElementById('breathing-inline-host'); if(breathHost && window.BreathingModule && typeof window.BreathingModule.render === 'function'){ window.BreathingModule.render(breathHost); }
  }catch(e){ console.error('Failed to init inline widgets', e); }

  // Emotion Anchors widget logic
  function renderPinnedAnchors(){
    const host = document.getElementById('home-anchors-pinned'); if(!host) return; host.innerHTML='';
    const items = (window.AnchorsModule && typeof window.AnchorsModule.getAll==='function') ? window.AnchorsModule.getAll() : [];
    const pinned = items.filter(a=>a.pinned);
    if(pinned.length===0){ host.innerHTML = '<div class="text-sm opacity-70">No pinned anchors yet.</div>'; return; }
    pinned.slice(0,6).forEach(a=>{
      const row=document.createElement('div'); row.className='p-2 rounded bg-black/5 dark:bg-white/10 flex items-center justify-between gap-2';
      const left=document.createElement('div'); left.className='flex items-center gap-2';
      const chip=document.createElement('span'); chip.className='px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-xs'; chip.textContent=a.type;
      const title=document.createElement('span'); title.className='text-sm'; title.textContent=a.title;
      const emo=a.emotion? document.createElement('span') : null; if(emo){ emo.className='px-2 py-0.5 rounded-full bg-indigo-600/80 text-white text-xs'; emo.textContent=a.emotion; }
      left.appendChild(chip); left.appendChild(title); if(emo) left.appendChild(emo);
      const actions=document.createElement('div'); actions.className='flex items-center gap-1';
      if(a.url){ const open=document.createElement('a'); open.href=a.url; open.target='_blank'; open.rel='noopener'; open.textContent='Open'; open.className='text-xs rounded px-2 py-1 button-muted'; actions.appendChild(open); }
      const unpin=document.createElement('button'); unpin.textContent='Unpin'; unpin.className='text-xs rounded px-2 py-1 button-muted'; unpin.addEventListener('click',()=>{ try{ window.AnchorsModule.togglePin(a.id); renderPinnedAnchors(); }catch(_){ } });
      actions.appendChild(unpin);
      row.appendChild(left); row.appendChild(actions); host.appendChild(row);
    });
  }
  renderPinnedAnchors();
  const addAnchorBtn = document.getElementById('home-anchor-add'); if(addAnchorBtn){ addAnchorBtn.addEventListener('click', ()=>{ const title=(document.getElementById('home-anchor-title').value||'').trim(); if(!title) return; try{ window.AnchorsModule.add({ title, pinned:true, type:'Idea/Object' }); document.getElementById('home-anchor-title').value=''; renderPinnedAnchors(); }catch(_){ } }); }
  const openAnchorsBtn = document.getElementById('home-anchors-open'); if(openAnchorsBtn){ openAnchorsBtn.addEventListener('click', ()=>{ try{ window.AnchorsModule.show(); }catch(_){ alert('Anchors module not available'); } }); }

    // compute journal entries this week and mood logs this week
    try{
      const journ = (window.safeReadJSON ? window.safeReadJSON('journalEntries',[]) : JSON.parse(localStorage.getItem('journalEntries')||'[]')) || [];
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate()-6);
      const weekStart = weekAgo.toISOString().slice(0,10);
      const recentJournal = (journ||[]).filter(e=> (e.createdAt||e.created||'').slice(0,10) >= weekStart).length;
      const moodsThisWeek = (moodLog||[]).filter(m=> m.date >= weekStart).length;
      document.getElementById('home-mood-week').textContent = moodsThisWeek;
      document.getElementById('home-journal-week').textContent = recentJournal;
    }catch(e){ document.getElementById('home-mood-week').textContent = 0; document.getElementById('home-journal-week').textContent = 0; }

    // Name set/edit
    document.getElementById('home-set-name').addEventListener('click', ()=>{
      const cur = localStorage.getItem('user_name')||'';
      const v = prompt('Your display name', cur);
      if(v!==null){ localStorage.setItem('user_name', v.trim()); document.getElementById('home-greeting').textContent = v.trim()||'there'; document.getElementById('home-set-name').textContent = v.trim() ? 'Edit name' : 'Set name'; }
    });

    // Focus save/clear
    document.getElementById('home-focus-save').addEventListener('click', ()=>{
      const val = document.getElementById('home-focus-input').value.trim(); localStorage.setItem(focusKey, val);
    });
    document.getElementById('home-focus-clear').addEventListener('click', ()=>{ document.getElementById('home-focus-input').value=''; localStorage.removeItem(focusKey); });

    // widget hide toggles
    const hideFocusCb = document.getElementById('home-hide-focus'); const hideSnapshotCb = document.getElementById('home-hide-snapshot');
    const hideMiniCb = document.getElementById('home-hide-mini'); const hideBreathingCb = document.getElementById('home-hide-breathing'); const hideAnchorsCb = document.getElementById('home-hide-anchors');
    if(widgets.hideFocus) hideFocusCb.checked=true; if(widgets.hideSnapshot) hideSnapshotCb.checked=true; if(widgets.hideMini) hideMiniCb.checked=true; if(widgets.hideBreathing) hideBreathingCb.checked=true; if(widgets.hideAnchors) hideAnchorsCb.checked=true;
  function applyWidgetVisibility(){ const fw=document.getElementById('home-focus-widget'); const sw=document.getElementById('home-snapshot-widget'); const mw=document.getElementById('home-mini-timer-widget'); const bw=document.getElementById('home-breathing-widget'); const aw=document.getElementById('home-anchors-widget'); if(fw) fw.style.display = hideFocusCb.checked ? 'none' : ''; if(sw) sw.style.display = hideSnapshotCb.checked ? 'none' : ''; if(mw) mw.style.display = hideMiniCb.checked ? 'none' : ''; if(bw) bw.style.display = hideBreathingCb.checked ? 'none' : ''; if(aw) aw.style.display = hideAnchorsCb.checked ? 'none' : ''; // merge hide flags into existing home_widgets state
    try{
      const cur = JSON.parse(localStorage.getItem(widgetsKey)||'{}') || {};
      cur.hideFocus = !!hideFocusCb.checked; cur.hideSnapshot = !!hideSnapshotCb.checked; cur.hideMini = !!hideMiniCb.checked; cur.hideBreathing = !!hideBreathingCb.checked; cur.hideAnchors = !!hideAnchorsCb.checked;
      // preserve order and collapsed if present
      localStorage.setItem(widgetsKey, JSON.stringify(cur));
    }catch(e){ localStorage.setItem(widgetsKey, JSON.stringify({ hideFocus: hideFocusCb.checked, hideSnapshot: hideSnapshotCb.checked, hideMini: hideMiniCb.checked, hideBreathing: hideBreathingCb.checked, hideAnchors: hideAnchorsCb.checked })); }
  }
    hideFocusCb.addEventListener('change', applyWidgetVisibility); hideSnapshotCb.addEventListener('change', applyWidgetVisibility); hideMiniCb.addEventListener('change', applyWidgetVisibility); hideBreathingCb.addEventListener('change', applyWidgetVisibility); hideAnchorsCb.addEventListener('change', applyWidgetVisibility); applyWidgetVisibility();

    // Ordering and collapse persistence
    const WIDGETS_CONTAINER = document.querySelector('section.grid');
    const STORAGE = widgetsKey;
    // ensure home_widgets has order and collapsed maps
    let homeWidgetsState = (()=>{ try{ return JSON.parse(localStorage.getItem(STORAGE)||'{}'); }catch(e){ return {}; } })();
  const DEFAULT_ORDER = ['focus','snapshot','mini','breathing','anchors'];
    if(!Array.isArray(homeWidgetsState.order)) homeWidgetsState.order = DEFAULT_ORDER.slice();
    if(typeof homeWidgetsState.collapsed !== 'object') homeWidgetsState.collapsed = {};

  function applyOrder(){ if(!WIDGETS_CONTAINER) return; const mapping = { focus: 'home-focus-widget', snapshot: 'home-snapshot-widget', mini: 'home-mini-timer-widget', breathing: 'home-breathing-widget', anchors: 'home-anchors-widget' };
      // remove and re-append in order
      homeWidgetsState.order.forEach(id=>{ const sel = document.getElementById(mapping[id]); if(sel && sel.parentNode) sel.parentNode.appendChild(sel); });
    }
  function applyCollapsed(){ const mapping = { focus:'home-focus-widget', snapshot:'home-snapshot-widget', mini:'home-mini-timer-widget', breathing:'home-breathing-widget', anchors:'home-anchors-widget' };
      Object.keys(mapping).forEach(id=>{ const el=document.getElementById(mapping[id]); if(!el) return; const collapsed = !!(homeWidgetsState.collapsed && homeWidgetsState.collapsed[id]); if(collapsed) el.classList.add('collapsed'); else el.classList.remove('collapsed'); const btn = el.querySelector('.widget-collapse-btn'); if(btn) btn.textContent = collapsed ? '▸' : '▾'; }); }
    applyOrder(); applyCollapsed();

    // collapse buttons - use event delegation for reliability
    const GRID_EL = document.querySelector('section.grid');
    if(GRID_EL){
      GRID_EL.addEventListener('click', (e)=>{
        const btn = e.target.closest && e.target.closest('.widget-collapse-btn'); if(!btn) return;
        const id = btn.getAttribute('data-target'); if(!id) return;
        homeWidgetsState.collapsed = homeWidgetsState.collapsed || {};
        homeWidgetsState.collapsed[id] = !homeWidgetsState.collapsed[id];
        try{ localStorage.setItem(STORAGE, JSON.stringify(homeWidgetsState)); }catch(_){ }
        applyCollapsed();
      });
    }

    // drag-and-drop reorder (simple HTML5 drag)
    let dragSrc = null;
    function handleDragStart(e){ const w = e.currentTarget.closest('.widget'); if(!w) return; dragSrc = w; w.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; try{ e.dataTransfer.setData('text/plain', w.dataset.widgetId||''); }catch(_){ }
    }
    function handleDragOver(e){ e.preventDefault(); e.dataTransfer.dropEffect = 'move'; const over = e.currentTarget.closest('.widget'); if(!over || over===dragSrc) return; return false; }
    function handleDragEnter(e){ const over = e.currentTarget.closest('.widget'); if(over && over!==dragSrc) over.classList.add('placeholder'); }
    function handleDragLeave(e){ const over = e.currentTarget.closest('.widget'); if(over) over.classList.remove('placeholder'); }
    function handleDrop(e){ e.stopPropagation(); const over = e.currentTarget.closest('.widget'); if(!dragSrc || !over || dragSrc===over) return; // reorder DOM
      const container = dragSrc.parentNode; container.insertBefore(dragSrc, over); // rebuild order
      const ids = Array.from(container.querySelectorAll('.widget')).map(n=>n.dataset.widgetId).filter(Boolean);
      homeWidgetsState.order = ids; localStorage.setItem(STORAGE, JSON.stringify(homeWidgetsState)); // cleanup
      container.querySelectorAll('.widget').forEach(n=>n.classList.remove('placeholder'));
      return false;
    }
    function handleDragEnd(e){ if(dragSrc) dragSrc.classList.remove('dragging'); dragSrc=null; document.querySelectorAll('.widget').forEach(n=>n.classList.remove('placeholder')); }

    // attach draggable attributes
    document.querySelectorAll('.widget .widget-handle').forEach(h=>{ const w = h.closest('.widget'); if(!w) return; w.setAttribute('draggable','true'); h.addEventListener('mousedown', ()=>{ h.style.cursor='grabbing'; }); h.addEventListener('mouseup', ()=>{ h.style.cursor='grab'; }); w.addEventListener('dragstart', handleDragStart); w.addEventListener('dragenter', handleDragEnter); w.addEventListener('dragover', handleDragOver); w.addEventListener('dragleave', handleDragLeave); w.addEventListener('drop', handleDrop); w.addEventListener('dragend', handleDragEnd); });

  // Widget manager - opens modal to let user re-show hidden widgets
  function showWidgetManager(){
    const overlay = document.getElementById('message-modal-overlay');
    const modalMsg = document.getElementById('modal-message');
    if(!overlay || !modalMsg){
      // fallback: prompt
      const w = JSON.parse(localStorage.getItem(widgetsKey)||'{}');
      const names = [];
      if(w.hideFocus) names.push('Today\'s Focus');
      if(w.hideSnapshot) names.push('Quick Snapshot');
      return alert(names.length? 'Hidden widgets: ' + names.join(', ') : 'No hidden widgets');
    }
  const w = JSON.parse(localStorage.getItem(widgetsKey)||'{}');
  modalMsg.innerHTML = '';
  const container = document.createElement('div');
  container.style.display='flex'; container.style.flexDirection='column'; container.style.gap='10px';
  // focus
  const row1 = document.createElement('label'); row1.style.display='flex'; row1.style.alignItems='center'; row1.style.gap='8px';
  const cb1 = document.createElement('input'); cb1.type='checkbox'; cb1.checked = !w.hideFocus; row1.appendChild(cb1); const t1 = document.createElement('span'); t1.textContent = "Today's Focus"; row1.appendChild(t1);
  // snapshot
  const row2 = document.createElement('label'); row2.style.display='flex'; row2.style.alignItems='center'; row2.style.gap='8px';
  const cb2 = document.createElement('input'); cb2.type='checkbox'; cb2.checked = !w.hideSnapshot; row2.appendChild(cb2); const t2 = document.createElement('span'); t2.textContent = 'Quick Snapshot'; row2.appendChild(t2);
  // mini timer
  const row3 = document.createElement('label'); row3.style.display='flex'; row3.style.alignItems='center'; row3.style.gap='8px';
  const cb3 = document.createElement('input'); cb3.type='checkbox'; cb3.checked = !w.hideMini; row3.appendChild(cb3); const t3 = document.createElement('span'); t3.textContent = 'Mini Timer'; row3.appendChild(t3);
  // breathing
  const row4 = document.createElement('label'); row4.style.display='flex'; row4.style.alignItems='center'; row4.style.gap='8px';
  const cb4 = document.createElement('input'); cb4.type='checkbox'; cb4.checked = !w.hideBreathing; row4.appendChild(cb4); const t4 = document.createElement('span'); t4.textContent = 'Breathing'; row4.appendChild(t4);
  // anchors
  const row5 = document.createElement('label'); row5.style.display='flex'; row5.style.alignItems='center'; row5.style.gap='8px';
  const cb5 = document.createElement('input'); cb5.type='checkbox'; cb5.checked = !w.hideAnchors; row5.appendChild(cb5); const t5 = document.createElement('span'); t5.textContent = 'Emotion Anchors'; row5.appendChild(t5);
  container.appendChild(row1); container.appendChild(row2); container.appendChild(row3); container.appendChild(row4); container.appendChild(row5);
    const actions = document.createElement('div'); actions.style.display='flex'; actions.style.gap='8px'; actions.style.marginTop='8px';
    const saveBtn = document.createElement('button'); saveBtn.textContent='Save'; saveBtn.className='px-3 py-1 rounded bg-emerald-600 text-white';
  const closeBtn = document.createElement('button'); closeBtn.textContent='Close'; closeBtn.className='px-3 py-1 rounded button-muted';
    actions.appendChild(saveBtn); actions.appendChild(closeBtn);
    container.appendChild(actions);
    modalMsg.appendChild(container);
    overlay.classList.remove('hidden');
    saveBtn.onclick = ()=>{
      try{
        const existing = JSON.parse(localStorage.getItem(widgetsKey)||'{}') || {};
        existing.hideFocus = !cb1.checked; existing.hideSnapshot = !cb2.checked; existing.hideMini = !cb3.checked; existing.hideBreathing = !cb4.checked; existing.hideAnchors = !cb5.checked;
        // preserve any order/collapsed already in existing
        localStorage.setItem(widgetsKey, JSON.stringify(existing));
        // reflect in-memory state used for ordering/collapse
        homeWidgetsState = homeWidgetsState || {};
        homeWidgetsState.order = existing.order || homeWidgetsState.order;
        homeWidgetsState.collapsed = existing.collapsed || homeWidgetsState.collapsed;
        // apply immediately
        hideFocusCb.checked = !!existing.hideFocus; hideSnapshotCb.checked = !!existing.hideSnapshot; hideMiniCb.checked = !!existing.hideMini; hideBreathingCb.checked = !!existing.hideBreathing; hideAnchorsCb.checked = !!existing.hideAnchors; applyWidgetVisibility(); applyOrder(); applyCollapsed();
      }catch(e){ console.error('Failed to save widget manager settings', e); }
      overlay.classList.add('hidden');
    };
    closeBtn.onclick = ()=> overlay.classList.add('hidden');
  }
    const mgrBtnGlobal = document.getElementById('home-manage-widgets-global'); if(mgrBtnGlobal) mgrBtnGlobal.addEventListener('click', showWidgetManager);

    // suggestion mapping and behavior
    const MOOD_MAP = {
      anxious: { text: "Here's a short breathing practice to help you find your centre.", target: 'somatic', cat:'breath' },
      sad: { text: "A quick gratitude prompt can help shift attention — try writing one thing you're grateful for.", target: 'journal' },
      okay: { text: "A gentle body scan might help you settle — try noticing 3 places of contact.", target: 'somatic', cat:'body-awareness' },
      grateful: { text: "Savour this feeling: take a moment to describe it in one sentence.", target: 'journal' },
      energized: { text: "Move gently to use that energy — a 1‑2 minute figure-8 movement can help.", target: 'somatic', cat:'movement' }
    };

    function pickSomaticForCategory(cat){ const ITEMS = window.SomaticModule && Array.isArray(window.SomaticModule.ITEMS) ? window.SomaticModule.ITEMS : null; if(!ITEMS) return null; const matches = ITEMS.map((it,idx)=>({it,idx})).filter(x=>x.it.cat===cat); if(matches.length===0) return null; return matches[Math.floor(Math.random()*matches.length)].idx; }

    
  }
  window.HomeModule={show, clearMoodLogs: ()=>{ if(confirm('Clear all mood logs?')){ localStorage.removeItem(LOG_KEY); moodLog=[]; renderRecentMood(); } }};
})();
