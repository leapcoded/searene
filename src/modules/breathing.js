/* Breathing Quick Action */
(function(){
  let animInterval = null;
  function show(){
    const el = document.getElementById('app-content'); if(!el) return;
  el.innerHTML = `<div style="padding:16px;"><h3 class="text-lg font-medium">Breathing</h3><div style="margin-top:12px;display:flex;gap:8px;align-items:center;"><button id="breath-1" class="px-3 py-1 rounded button">1 min</button><button id="breath-2" class="px-3 py-1 rounded button">2 min</button></div><div id="breath-host" style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:240px;"></div></div>`;
    const host = document.getElementById('breath-host');
    document.getElementById('breath-1').addEventListener('click', ()=> startBreathing(60, host));
    document.getElementById('breath-2').addEventListener('click', ()=> startBreathing(120, host));
  }

  function startBreathing(seconds, host){ // Box breathing: 4s inhale, 4s hold, 4s exhale, 4s hold
  host.innerHTML='';
  // add extra right padding so the ring doesn't get clipped by widget edges
  try{ host.style.paddingRight = host.style.paddingRight || '24px'; host.style.overflow = 'visible'; }catch(e){}
    const container = document.createElement('div'); container.style.display='flex'; container.style.alignItems='center'; container.style.justifyContent='space-between'; container.style.gap='12px';
    // Left: textual instructions and cancel
  const left = document.createElement('div'); left.style.flex='0 1 auto'; left.style.display='flex'; left.style.flexDirection='column'; left.style.gap='8px';
    const info = document.createElement('div'); info.innerHTML = `<div style="font-weight:700">Box Breathing</div><div style="font-size:13px;color:var(--muted);">4s inhale · 4s hold · 4s exhale · 4s hold</div>`;
    const status = document.createElement('div'); status.style.fontSize='14px'; status.style.fontWeight='600'; status.style.marginTop='6px'; status.textContent = '';
  const cancelBtn = document.createElement('button'); cancelBtn.textContent='Cancel'; cancelBtn.className='px-2 py-1 rounded button-muted'; cancelBtn.style.whiteSpace='nowrap'; cancelBtn.style.fontSize='13px'; cancelBtn.style.alignSelf='flex-start'; cancelBtn.style.maxWidth='90px';
    left.appendChild(info); left.appendChild(status); left.appendChild(cancelBtn);

    // Right: circle + timer ring
  const right = document.createElement('div'); right.style.width='200px'; right.style.flex='0 0 200px'; right.style.display='flex'; right.style.alignItems='center'; right.style.justifyContent='center'; right.style.position='relative'; right.style.overflow='visible';
  // nudge the whole right column a bit left so the ring feels more balanced in the widget
  right.style.transform = 'translateX(-16px)';
    const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg'); svg.setAttribute('width','200'); svg.setAttribute('height','200'); svg.setAttribute('viewBox','0 0 200 200'); svg.style.position='absolute'; svg.style.left='50%'; svg.style.top='50%'; svg.style.transform='translate(-50%,-50%)'; svg.style.transformOrigin='50% 50%';
  // inner circle is ~96px diameter (48px radius); place the ring just outside it
  const radius = 52; const cx=100; const cy=100; const circ = 2*Math.PI*radius;
  const ringBg = document.createElementNS(svgNS, 'circle'); ringBg.setAttribute('cx',cx); ringBg.setAttribute('cy',cy); ringBg.setAttribute('r',radius); ringBg.setAttribute('stroke','rgba(0,0,0,0.06)'); ringBg.setAttribute('stroke-width','4'); ringBg.setAttribute('fill','none');
  const ring = document.createElementNS(svgNS, 'circle'); ring.setAttribute('cx',cx); ring.setAttribute('cy',cy); ring.setAttribute('r',radius); ring.setAttribute('stroke','var(--accent-3)'); ring.setAttribute('stroke-width','4'); ring.setAttribute('fill','none'); ring.setAttribute('stroke-linecap','round'); ring.setAttribute('transform',`rotate(-90 ${cx} ${cy})`);
    ring.style.strokeDasharray = String(circ);
    ring.style.strokeDashoffset = String(circ);
    ring.style.transition = 'stroke-dashoffset 0.25s linear';
    svg.appendChild(ringBg); svg.appendChild(ring);
    // inner circle
  const inner = document.createElement('div'); inner.style.width='96px'; inner.style.height='96px'; inner.style.borderRadius='999px'; inner.style.background='linear-gradient(90deg,var(--accent-2),var(--accent-3))'; inner.style.display='flex'; inner.style.alignItems='center'; inner.style.justifyContent='center'; inner.style.fontWeight='700'; inner.style.position='absolute'; inner.style.left='50%'; inner.style.top='50%'; inner.style.transform='translate(-50%,-50%)'; inner.style.transition='transform 0.25s ease'; inner.style.pointerEvents='none';
    inner.textContent = '';
    right.appendChild(svg); right.appendChild(inner);

    container.appendChild(left); container.appendChild(right); host.appendChild(container);

    let startTs = Date.now(); const endTs = startTs + seconds*1000; const phaseDuration = 4000; // 4s per phase
    const totalPhases = Math.floor(seconds / (phaseDuration*1)); // seconds / 4s
    // We'll step per 250ms
    function update(){ const now = Date.now(); if(now >= endTs){ stop(); return; } const elapsed = now - startTs; const remaining = Math.max(0, endTs - now);
      // determine where we are in the 16s box-breathing cycle
      const cyclePos = Math.floor((elapsed % (phaseDuration*4)) / phaseDuration); // 0: inhale,1:hold,2:exhale,3:hold
  // show countdown as 4,3,2,1 using ceil so users see full 4 seconds at phase start
  const phaseSec = Math.ceil(((phaseDuration - (elapsed % phaseDuration))/1000));
      const phaseNames = ['Inhale','Hold','Exhale','Hold']; status.textContent = `${phaseNames[cyclePos]} · ${phaseSec}s`;
      // scale inner circle based on phase (inhale: expand, hold: hold, exhale: contract, hold: hold)
      let scale = 1;
      if(cyclePos === 0){ // inhale 0->1 scale
        const t = (elapsed % phaseDuration)/phaseDuration; scale = 1 + t*0.6;
      }else if(cyclePos === 1){ scale = 1.6; }
      else if(cyclePos === 2){ const t = (elapsed % phaseDuration)/phaseDuration; scale = 1.6 - t*0.6; }
      else { scale = 1; }
  inner.style.transform = `translate(-50%,-50%) scale(${scale})`;
  // scale the SVG ring in sync with the inner circle so it always surrounds it
  svg.style.transform = `translate(-50%,-50%) scale(${scale})`;
      // progress ring: proportion of total time elapsed
  const prog = Math.min(1, elapsed / (seconds*1000)); const dash = circ * (1 - prog); ring.style.strokeDashoffset = String(dash);
    }

    animInterval = setInterval(update, 250);
    update();

    function stop(){ if(animInterval) clearInterval(animInterval); animInterval=null; host.innerHTML = '<div style="color:var(--muted)">Session finished.</div>'; }
    cancelBtn.addEventListener('click', stop);
  }

  // Render breathing controls into an inline host element inside the widget
  function render(host){ if(!host) return; host.innerHTML='';
    const wrapper = document.createElement('div'); wrapper.style.display='flex'; wrapper.style.flexDirection='column'; wrapper.style.gap='8px';
    const controls = document.createElement('div'); controls.style.display='flex'; controls.style.gap='8px';
  const b1 = document.createElement('button'); b1.textContent='1 min'; b1.className='px-3 py-1 rounded button'; b1.addEventListener('click', ()=> startBreathing(60, playHost));
  const b2 = document.createElement('button'); b2.textContent='2 min'; b2.className='px-3 py-1 rounded button'; b2.addEventListener('click', ()=> startBreathing(120, playHost));
    controls.appendChild(b1); controls.appendChild(b2);
    const playHost = document.createElement('div'); playHost.style.marginTop='8px'; playHost.style.minHeight='120px'; playHost.style.position='relative'; playHost.style.overflow='hidden';
    wrapper.appendChild(controls); wrapper.appendChild(playHost); host.appendChild(wrapper);
  }

  window.BreathingModule = { show, render };
})();
