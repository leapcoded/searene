(function(){
  function parseMoodLog(){
    try{ return JSON.parse(localStorage.getItem('home_mood_log')||'[]') || []; }catch(e){ return []; }
  }
  function parseJournals(){ try{ return JSON.parse(localStorage.getItem('journalEntries')||'[]') || []; }catch(e){ return []; } }

  // utility: group ratings by date (YYYY-MM-DD) and return sorted dates array
  function dailySeries(log){
    const map = {};
    log.forEach(r=>{ try{ const d = (r.date || '').slice(0,10); if(!d) return; map[d] = map[d] || []; map[d].push(Number(r.rating)||0); }catch(e){} });
    const dates = Object.keys(map).sort();
    return dates.map(d=>({ date:d, value: Math.round((map[d].reduce((a,b)=>a+b,0)/map[d].length)*10)/10 }));
  }

  function movingAverage(series, windowSize){ if(windowSize<=1) return series.map(s=>s.value); const vals = series.map(s=>s.value); const out=[]; for(let i=0;i<vals.length;i++){ const start=Math.max(0,i-windowSize+1); const slice=vals.slice(start,i+1); const avg = slice.reduce((a,b)=>a+b,0)/slice.length; out.push(Math.round(avg*10)/10); } return out; }

  function renderSVGLine(host, series, opts={width:700,height:160,stroke:'var(--accent)',fill:false}){
    host.innerHTML=''; if(!series||series.length===0){ host.innerHTML='<div class="text-sm opacity-70">No mood data yet</div>'; return; }
    const w = opts.width, h = opts.height, pad=28;
    const minV = 1; const maxV = 5; // rating range
    const xStep = (w-2*pad)/(series.length-1||1);
    const points = series.map((v,i)=>{ const x = pad + i*xStep; const y = pad + ( (maxV - v) / (maxV-minV) )*(h-2*pad); return {x,y}; });
    const svgNS='http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS,'svg'); svg.setAttribute('viewBox',`0 0 ${w} ${h}`); svg.setAttribute('width','100%'); svg.setAttribute('height',h);
    // grid lines
    for(let g=0;g<5;g++){ const yy = pad + g*((h-2*pad)/4); const ln = document.createElementNS(svgNS,'line'); ln.setAttribute('x1',pad); ln.setAttribute('x2',w-pad); ln.setAttribute('y1',yy); ln.setAttribute('y2',yy); ln.setAttribute('stroke','rgba(0,0,0,0.05)'); ln.setAttribute('stroke-width','1'); svg.appendChild(ln); }
    // path
    const path = document.createElementNS(svgNS,'path'); const d = points.map((p,i)=> (i===0? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
    path.setAttribute('d', d); path.setAttribute('fill','none'); path.setAttribute('stroke', opts.stroke || 'var(--accent)'); path.setAttribute('stroke-width','3'); path.setAttribute('stroke-linecap','round'); path.setAttribute('stroke-linejoin','round'); svg.appendChild(path);
    // points
    points.forEach(p=>{ const c = document.createElementNS(svgNS,'circle'); c.setAttribute('cx',p.x); c.setAttribute('cy',p.y); c.setAttribute('r',3.5); c.setAttribute('fill','white'); c.setAttribute('stroke','var(--accent)'); c.setAttribute('stroke-width',2); svg.appendChild(c); });
    // x labels (sparse)
    const labelEvery = Math.max(1, Math.ceil(series.length/6));
    series.forEach((s,i)=>{ if(i%labelEvery!==0) return; const text = document.createElementNS(svgNS,'text'); text.setAttribute('x', points[i].x); text.setAttribute('y', h-6); text.setAttribute('font-size','10'); text.setAttribute('text-anchor','middle'); text.setAttribute('fill','var(--muted)'); text.textContent = s.date.slice(5); svg.appendChild(text); });
    host.appendChild(svg);
  }

  function show(){
    const el=document.getElementById('app-content'); if(!el) return;
    const moodLog = parseMoodLog(); const journals = parseJournals();
    const daily = dailySeries(moodLog);

    el.innerHTML = `
      <div class="px-4 py-6 w-full" style="display:flex;flex-direction:column;gap:16px;">
        <h2 class="text-xl font-semibold">Patterns & Trends</h2>
        <div class="p-3 rounded-lg card">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div class="font-medium">Mood Over Time</div>
            <div style="display:flex;gap:8px;">
              <button id="patterns-view-daily" class="text-sm rounded px-2 py-1 button-muted">Daily</button>
              <button id="patterns-view-monthly" class="text-sm rounded px-2 py-1 button-muted">Monthly</button>
              <button id="patterns-view-roll7" class="text-sm rounded px-2 py-1 button-muted">7-day roll</button>
            </div>
          </div>
          <div id="patterns-chart-host" style="margin-top:12px;"></div>
        </div>

        <div class="p-3 rounded-lg card" id="patterns-summary">
          <div class="font-medium mb-2">Summary</div>
          <div class="text-sm opacity-80">Total mood ratings: ${moodLog.length}</div>
          <div class="text-sm opacity-80">Total journal entries: ${journals.length}</div>
        </div>

        <div class="p-3 rounded-lg card">
          <div class="font-medium mb-2">Top Emotions</div>
          <div id="patterns-top-emotions" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
        </div>
      </div>
    `;

    const chartHost = document.getElementById('patterns-chart-host');
    function renderDaily(){ const series = daily.map(d=>d.value); renderSVGLine(chartHost, daily, { width:700, height:160 }); }
    function renderMonthly(){ // aggregate by month YYYY-MM
      const byMonth = {};
      daily.forEach(d=>{ const m = d.date.slice(0,7); byMonth[m] = byMonth[m] || []; byMonth[m].push(d.value); });
      const months = Object.keys(byMonth).sort().map(m=>({ date:m, value: Math.round((byMonth[m].reduce((a,b)=>a+b,0)/byMonth[m].length)*10)/10 }));
      renderSVGLine(chartHost, months, { width:700, height:160 });
    }
    function renderRoll7(){ const vals = movingAverage(daily,7).map((v,i)=>({ date: daily[i].date, value: v })); renderSVGLine(chartHost, vals, { width:700, height:160, stroke:'var(--accent-2)' }); }

    document.getElementById('patterns-view-daily').addEventListener('click', renderDaily);
    document.getElementById('patterns-view-monthly').addEventListener('click', renderMonthly);
    document.getElementById('patterns-view-roll7').addEventListener('click', renderRoll7);

    // initial render
    if(daily.length>0) renderDaily(); else chartHost.innerHTML='<div class="text-sm opacity-70">No mood data yet</div>';

    // populate top emotions
    const emotionCounts = {}; moodLog.forEach(r=>{ if(r.emotion){ const k=r.emotion.toLowerCase(); emotionCounts[k]=(emotionCounts[k]||0)+1; } });
    const top = Object.entries(emotionCounts).sort((a,b)=>b[1]-a[1]).slice(0,8);
    const emoHost = document.getElementById('patterns-top-emotions'); emoHost.innerHTML = top.length? top.map(e=>`<div class="tag-chip">${e[0]} (${e[1]})</div>`).join('') : '<div class="text-sm opacity-70">No emotion tags yet</div>';
  }

  window.PatternsModule = { show };
})();
