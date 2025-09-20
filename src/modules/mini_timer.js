/* Mini Timer widget */
(function(){
  const KEY = 'mini_timer_duration';
  const ALARM_KEY = 'mini_timer_alarm';
  let timer = null; let endTs = 0; let remaining = 0;
  let alarmInterval = null; let audioCtx = null;

  function playChimeOnce(){ try{
      if(localStorage.getItem(ALARM_KEY) === 'false') return;
      if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
      const ctx = audioCtx;
      const now = ctx.currentTime;
      const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination);
      o.type = 'sine'; o.frequency.value = 880; g.gain.value = 0.0001;
      o.start(now);
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      o.stop(now + 0.65);
    }catch(e){ console.log('playChimeOnce',e); }}

  function startAlarmSound(){ try{
      if(localStorage.getItem(ALARM_KEY) === 'false') return;
      playChimeOnce();
      if(alarmInterval) return;
      alarmInterval = setInterval(playChimeOnce, 3000);
    }catch(e){ console.log('startAlarmSound',e); }}

  function stopAlarmSound(){ try{ if(alarmInterval) clearInterval(alarmInterval); alarmInterval = null; if(audioCtx){ try{ audioCtx.close(); }catch(e){} audioCtx = null; } }catch(e){ console.log('stopAlarmSound',e); }}

  function notifyCompletion(text){ try{
      if(localStorage.getItem(ALARM_KEY) === 'false') return;
      if('Notification' in window && Notification.permission === 'granted'){
        new Notification('Mini Timer', { body: text });
      }
    }catch(e){ console.log('notify',e); }}

  function renderTimer(host, mins){ host.innerHTML = '';
    const box = document.createElement('div'); box.style.display='flex'; box.style.flexDirection='column'; box.style.gap='8px'; box.style.position='relative';
    const timeDisplay = document.createElement('div'); timeDisplay.style.fontSize='28px'; timeDisplay.style.fontWeight='700'; timeDisplay.textContent = `${mins}:00`;
    const controls = document.createElement('div'); controls.style.display='flex'; controls.style.gap='8px';
    // aria-live region (visually hidden) for screen readers
    const live = document.createElement('div'); live.setAttribute('aria-live','polite'); live.style.position='absolute'; live.style.width='1px'; live.style.height='1px'; live.style.overflow='hidden'; live.style.clip='rect(1px, 1px, 1px, 1px)'; live.style.whiteSpace='nowrap'; live.style.border='0'; live.style.padding='0';
  const start = document.createElement('button'); start.textContent='Start'; start.className='px-3 py-1 rounded bg-emerald-600 text-white';
  const cancel = document.createElement('button'); cancel.textContent='Cancel'; cancel.className='px-3 py-1 rounded button-muted';
  const stopAlarm = document.createElement('button'); stopAlarm.textContent='Stop Alarm'; stopAlarm.className='px-2 py-1 rounded bg-red-600 text-white'; stopAlarm.style.display='none';
  controls.appendChild(start); controls.appendChild(cancel);
  controls.appendChild(stopAlarm);
  box.appendChild(timeDisplay); box.appendChild(controls); box.appendChild(live); host.appendChild(box);

  function tick(){ const now = Date.now(); remaining = Math.max(0, Math.round((endTs - now)/1000)); const mm = Math.floor(remaining/60); const ss = String(remaining%60).padStart(2,'0'); timeDisplay.textContent = `${mm}:${ss}`; if(remaining<=0){ clearInterval(timer); timer=null; startAlarmSound(); notifyCompletion('Timer finished'); live.textContent = 'Timer finished.'; stopAlarm.style.display = 'inline-block'; }
  }

    start.addEventListener('click', ()=>{
      const secs = mins*60; localStorage.setItem(KEY, String(mins)); endTs = Date.now() + secs*1000; if(timer) clearInterval(timer); tick(); timer = setInterval(tick, 250); stopAlarmSound(); stopAlarm.style.display = 'none';
    });
    cancel.addEventListener('click', ()=>{ if(timer) clearInterval(timer); timer=null; timeDisplay.textContent = `${mins}:00`; stopAlarmSound(); stopAlarm.style.display = 'none'; });
    stopAlarm.addEventListener('click', ()=>{ stopAlarmSound(); stopAlarm.style.display = 'none'; live.textContent = 'Alarm stopped.'; });
  }

  // Render the widget UI into a provided host element (used by the inline widget)
  function render(host){ if(!host) return; host.innerHTML = '';
    const container = document.createElement('div'); container.style.display='flex'; container.style.flexDirection='column'; container.style.gap='8px';
    const btnRow = document.createElement('div'); btnRow.style.display='flex'; btnRow.style.gap='8px';
  [1,3,5].forEach(m=>{ const b = document.createElement('button'); b.textContent = `${m}m`; b.dataset.min = String(m); b.className='btn-min px-2 py-1 rounded button-muted'; b.addEventListener('click', ()=>{ renderTimer(innerHost, m); }); btnRow.appendChild(b); });
    const innerHost = document.createElement('div'); innerHost.style.marginTop='8px';
    // alarm toggle
    const alarmRow = document.createElement('div'); alarmRow.style.display='flex'; alarmRow.style.alignItems='center'; alarmRow.style.gap='8px';
    const alarmLabel = document.createElement('label'); alarmLabel.textContent = 'Alarm';
    const alarmToggle = document.createElement('input'); alarmToggle.type='checkbox'; alarmToggle.checked = (localStorage.getItem(ALARM_KEY) !== 'false');
    alarmToggle.addEventListener('change', ()=>{
      localStorage.setItem(ALARM_KEY, alarmToggle.checked ? 'true' : 'false');
      if(alarmToggle.checked && 'Notification' in window && Notification.permission === 'default'){
        Notification.requestPermission().then(()=>{}).catch(()=>{});
      }
    });
    alarmRow.appendChild(alarmLabel); alarmRow.appendChild(alarmToggle);
    container.appendChild(btnRow); container.appendChild(alarmRow); container.appendChild(innerHost); host.appendChild(container);
    const last = parseInt(localStorage.getItem(KEY)||'0',10) || 1; renderTimer(innerHost, last);
  }

  function show(){ const el = document.getElementById('app-content'); if(!el) return; const last = parseInt(localStorage.getItem(KEY)||'0',10) || 1;
    el.innerHTML = `<div style="padding:16px;"><h3 class="text-lg font-medium">Mini Timer</h3><div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><button data-min="1" class="btn-min">1m</button><button data-min="3" class="btn-min">3m</button><button data-min="5" class="btn-min">5m</button></div><div id="mini-timer-host" style="margin-top:12px;"></div></div>`;
    const host = document.getElementById('mini-timer-host');
    el.querySelectorAll('.btn-min').forEach(b=> b.addEventListener('click',(e)=>{ const m = Number(b.dataset.min || e.target.dataset.min); localStorage.setItem(KEY,String(m)); renderTimer(host,m); }));
    // add alarm toggle in full view
    const alarmRow = document.createElement('div'); alarmRow.style.display='flex'; alarmRow.style.alignItems='center'; alarmRow.style.gap='8px'; alarmRow.style.marginTop='8px';
    const alarmLabel = document.createElement('label'); alarmLabel.textContent = 'Alarm';
    const alarmToggle = document.createElement('input'); alarmToggle.type='checkbox'; alarmToggle.checked = (localStorage.getItem(ALARM_KEY) !== 'false');
    alarmToggle.addEventListener('change', ()=>{ localStorage.setItem(ALARM_KEY, alarmToggle.checked ? 'true' : 'false'); if(alarmToggle.checked && 'Notification' in window && Notification.permission === 'default'){ Notification.requestPermission().then(()=>{}).catch(()=>{}); } });
    alarmRow.appendChild(alarmLabel); alarmRow.appendChild(alarmToggle); host.parentNode.insertBefore(alarmRow, host);
    // pre-render last
    renderTimer(host, last);
  }
  window.MiniTimerModule = { show, render };
})();
