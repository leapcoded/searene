(function(){
  const STATE_KEY='checkin_state';
  const ANSWERS_KEY='checkin_answers';

  // Scripted flow: Questions with suggestion screens, minimal choices
  const NODES={
    intro: { title: 'Welcome — a quick check‑in', text: "This short check‑in helps you notice what you need right now. There are no wrong answers — take your time and answer honestly. You can pause at any point and return later.", options:[{id:'next', label:'Start check‑in', next:'q1'}]},
    // Part 1: Physical Needs
    q1:{ title:'Body care • Q1', text:'Have you had something to eat in the last 4 hours?', options:[
      {id:'q1_yes', label:"Yep, I'm fed — next", next:'q1_yes_sugg'},
      {id:'q1_snack', label:'I could use a little snack', next:'q1_snack_sugg'},
      {id:'q1_meal', label:'Not yet — I need a meal', next:'q1_meal_sugg'}
    ]},
    q1_yes_sugg:{ title:'Nice job', text:"Lovely — your body has some fuel to work with.", options:[{id:'next', label:'Next', next:'q2'}]},
  q1_snack_sugg:{ title:'Snack time', text:"Starting small is perfect. Try something easy with a little carb + protein (toast with peanut butter, yoghurt, nuts, cheese + crackers). A little goes a long way.", options:[{id:'next', label:'Next', next:'q2'}]},
  q1_meal_sugg:{ title:'A real meal', text:"Let’s get you something real to eat. Simple is great — sandwich, eggs on toast, soup, or a ready meal. Aim for some carb + protein; any food counts.", options:[{id:'next', label:'Next', next:'q2'}]},

  q2:{ title:'Body care • Q2', text:'Have you taken any medicines you need today?', options:[
      {id:'q2_yes', label:"Yes — I'm all set", next:'q2_yes_sugg'},
  {id:'q2_none', label:"I don't take any medicines", next:'q2_none_sugg'},
      {id:'q2_need', label:'Not yet — I need to take them', next:'q2_need_sugg'}
    ]},
    q2_yes_sugg:{ title:'Well done', text:"That’s great. Keeping up with your routine is a quiet kind of bravery.", options:[{id:'next', label:'Next', next:'q3'}]},
    q2_none_sugg:{ title:'Got it', text:'Thanks for sharing — noted.', options:[{id:'next', label:'Next', next:'q3'}]},
  q2_need_sugg:{ title:'A quick pause', text:"Totally understandable. Take them now as prescribed, with a sip of water. A simple phone reminder for tomorrow can help. If you’re unsure, check the label or speak to your pharmacist/GP.", options:[{id:'next', label:'Next', next:'q3'}]},

    q3:{ title:'Body care • Q3', text:"How’s your sleep in the last 24 hours?", options:[
      {id:'q3_rest', label:"I'm rested — next", next:'q3_rest_sugg'},
      {id:'q3_nap', label:'I could use a nap', next:'q3_nap_sugg'}
    ]},
    q3_rest_sugg:{ title:'Good rest', text:"So glad to hear it. Rest makes everything a little easier.", options:[{id:'next', label:'Next', next:'q4'}]},
  q3_nap_sugg:{ title:'A gentle nap', text:"Your body’s asking for a pause — let’s listen. Try 20–45 minutes, phone on Do Not Disturb, dim lights. Even resting your eyes helps.", options:[{id:'next', label:'Next', next:'q4'}]},

    q4:{ title:'Body care • Q4', text:'Are you in any pain right now?', options:[
      {id:'q4_no', label:'No — my body feels okay', next:'q4_no_sugg'},
      {id:'q4_yes', label:'Yes — something hurts', next:'q4_yes_sugg'}
    ]},
    q4_no_sugg:{ title:'Glad to hear', text:"I’m glad your body feels okay.", options:[{id:'next', label:'Next', next:'q5'}]},
  q4_yes_sugg:{ title:'Be gentle', text:"Let’s be kind to your body. Try heat/ice, light stretching, hydration, or over‑the‑counter pain relief as labeled. If pain is severe or new, consider medical advice.", options:[{id:'next', label:'Next', next:'q5'}]},

    q5:{ title:'Body care • Q5', text:'Is anything about your space uncomfortable or stressful?', options:[
      {id:'q5_yes', label:'Yes — my space could feel better', next:'q5_yes_sugg'},
      {id:'q5_no', label:'No — it feels okay here', next:'q5_no_sugg'}
    ]},
  q5_yes_sugg:{ title:'One tiny tweak', text:"Pick one tiny thing: open a window, lower noise, soften lights, or clear one square foot. Little sensory tweaks help a lot.", options:[{id:'next', label:'Next', next:'q6'}]},
    q5_no_sugg:{ title:'Great', text:'Lovely — sounds like your space is supportive enough right now.', options:[{id:'next', label:'Next', next:'q6'}]},

    q6:{ title:'Body care • Q6', text:'Do you have any pets around?', options:[
      {id:'q6_yes', label:'Yes — I have pets', next:'q6_yes_sugg'},
      {id:'q6_no', label:'No pets here', next:'q6_no_sugg'}
    ]},
  q6_yes_sugg:{ title:'Time with pets', text:'Spend a few minutes with them — stroking and cuddles can be so grounding.', options:[{id:'next', label:'Next', next:'hydrate'}]},
  q6_no_sugg:{ title:'No pets', text:"All good! A quick cute animal video can lift the mood too.", options:[{id:'next', label:'Next', next:'hydrate'}]},

  hydrate:{ title:'Hydration', text:"Have a few sips (about half a cup) of something you like — water, tea, juice, fizzy drink. Hydration gently supports mood and focus.", options:[{id:'next', label:'Continue', next:'emotional_preface'}]},

    // Part 2: Emotional Needs
  emotional_preface:{ title:'Emotional care', text:"This is a gentle guide — not a diagnosis. We’ll try small, evidence‑informed steps together. Take what fits and leave the rest.", options:[{id:'next', label:'Continue', next:'q7'}]},

    q7:{ title:'Emotional care • Q7', text:"Do you know why you’re feeling off right now? Any answer is okay.", options:[
      {id:'q7_yes', label:"Yes — I know what's up", next:'q7_yes_sugg'},
      {id:'q7_no', label:"No — not sure why", next:'q7_no_sugg'}
    ]},
  q7_yes_sugg:{ title:'A tiny try', text:"Sounds heavy. Let’s try 15 minutes toward the next tiniest step. If it can’t be fixed now, send a quick message to someone you trust for perspective.", options:[{id:'next', label:'Next', next:'q8'}]},
    q7_no_sugg:{ title:'That’s okay', text:"Not knowing is totally okay — you’re not alone. We’ll try a few gentle ideas and see if anything helps.", options:[{id:'next', label:'Next', next:'q8'}]},

    q8:{ title:'Emotional care • Q8', text:'Are you feeling anxious, on edge, or a bit scared?', options:[
      {id:'q8_yes_specific', label:'Yes — about something specific', next:'q8_yes_specific_sugg'},
      {id:'q8_yes_unknown', label:"Yes — not sure why", next:'q8_yes_unknown_sugg'},
      {id:'q8_no', label:"No — not very anxious", next:'q8_no_sugg'},
      {id:'q8_resolved', label:"I was anxious, but I’m okay now", next:'q8_resolved_sugg'}
    ]},
    q8_yes_specific_sugg:{ title:'Breathe', text:'Paced breathing helps: inhale 4s, exhale 6s, repeat gently. If the feeling remains, take one tiny step toward the concern — you don’t have to solve it all.', options:[{id:'breath', label:'60s breathing', action:'breath', payload:60}, {id:'next', label:'Next', next:'q9'}]},
  q8_yes_unknown_sugg:{ title:'Grounding', text:'Try 5‑4‑3‑2‑1 grounding: 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste. Press your feet into the floor as you name them.', options:[{id:'next', label:'Next', next:'q9'}]},
    q8_no_sugg:{ title:'Good sign', text:"That’s a good sign. Being here with yourself is a gift.", options:[{id:'next', label:'Next', next:'q9'}]},
    q8_resolved_sugg:{ title:'Proud of you', text:'Beautiful work taking care of yourself.', options:[{id:'next', label:'Next', next:'q9'}]},

    q9:{ title:'Emotional care • Q9', text:'Do you feel triggered, or have flashbacks/traumatic memories today?', options:[
      {id:'q9_yes', label:'Yes — I feel triggered', next:'q9_yes_sugg'},
      {id:'q9_no', label:"No — not feeling triggered", next:'q9_no_sugg'},
      {id:'q9_resolved', label:"I was triggered, but I’m okay now", next:'q9_resolved_sugg'}
    ]},
  q9_yes_sugg:{ title:'Back to the present', text:"Try a TIPP skill: hold ice or splash cool water; look around and name 3 things you can see; remind yourself, ‘I’m safe right now.’", options:[{id:'next', label:'Next', next:'q10'}]},
    q9_no_sugg:{ title:'Okay', text:"Got it — let’s keep going.", options:[{id:'next', label:'Next', next:'q10'}]},
    q9_resolved_sugg:{ title:'Brave', text:"That was brave. You showed up for yourself — that counts.", options:[{id:'next', label:'Next', next:'q10'}]},

    q10:{ title:'Emotional care • Q10', text:'Are you feeling dissociated, depersonalized, or derealized?', options:[
      {id:'q10_yes', label:'Yes — I feel dissociated', next:'q10_yes_sugg'},
      {id:'q10_no', label:"No — I feel present", next:'q10_no_sugg'},
      {id:'q10_resolved', label:"I felt it, but I’m back", next:'q10_resolved_sugg'}
    ]},
  q10_yes_sugg:{ title:'Strong sensations', text:"Orient gently: say your name and today’s date, press your feet into the floor. Strong sensations help — a heavy blanket, a cold drink, or a sour sweet.", options:[{id:'next', label:'Next', next:'q11'}]},
    q10_no_sugg:{ title:'Connected', text:"Glad you’re feeling present.", options:[{id:'next', label:'Next', next:'q11'}]},
    q10_resolved_sugg:{ title:'Nice work', text:'You came back to yourself — that matters.', options:[{id:'next', label:'Next', next:'q11'}]},

    q11:{ title:'Emotional care • Q11', text:'Are you feeling low, heavy, or sad?', options:[
      {id:'q11_yes', label:'Yes — I feel low', next:'q11_yes_sugg'},
      {id:'q11_no', label:"No — not really", next:'q11_no_sugg'}
    ]},
  q11_yes_sugg:{ title:'One song', text:"When you’re feeling low, tiny things help. Try one favourite song, open the curtains or blinds, and sip water — a small lift is enough.", options:[{id:'next', label:'Next', next:'q12'}]},
    q11_no_sugg:{ title:'Glad to hear', text:"I’m glad to hear that.", options:[{id:'next', label:'Next', next:'q12'}]},

    q12:{ title:'Emotional care • Q12', text:'Are you feeling lonely or wanting attention?', options:[
      {id:'q12_yes', label:'Yes — feeling lonely', next:'q12_yes_sugg'},
      {id:'q12_no', label:"No — I’m okay", next:'q12_no_sugg'}
    ]},
  q12_yes_sugg:{ title:'Reach out', text:"Feeling lonely is human. Try a tiny reach‑out. Example: ‘Hey, could use a quick hello. No rush.’", options:[{id:'next', label:'Next', next:'q13'}]},
    q12_no_sugg:{ title:'Okay', text:'Okay — let’s keep going.', options:[{id:'next', label:'Next', next:'q13'}]},

    q13:{ title:'Emotional care • Q13', text:'If you’re feeling foggy, a little movement can help. Do you have the energy for a short walk or ride?', options:[
      {id:'q13_yes', label:'Yes — a short walk/ride sounds good', next:'q13_yes_sugg'},
      {id:'q13_no', label:'No — that’s too much right now', next:'q13_no_sugg'}
    ]},
    q13_yes_sugg:{ title:'A pleasant jaunt', text:"Movement can be kind. No goals — just a gentle wander and some fresh air.", options:[{id:'next', label:'Continue', next:'fun_time'}]},
  q13_no_sugg:{ title:'Gentle alternatives', text:"If a walk is too much, that’s okay. Try 2–5 minutes of gentle movement, or sit by a window for fresh air.", options:[{id:'next', label:'Continue', next:'fun_time'}]},

  fun_time:{ title:'A little joy', text:'Give yourself ~30 minutes for something that brings you joy — crafts, TV, a game — and let it be just for you. You deserve this.', options:[{id:'next', label:'Finish', next:'conclusion'}]},

    conclusion:{ title:'All done for now', text:"Take a breath. If you feel even a little lighter, that’s lovely. If not, that’s okay — you still showed up for yourself, and that matters. You deserve care.", options:[
      {id:'restart', label:'Restart check‑in', next:'q1'},
      {id:'go_home', label:'Go to Home', action:'goto', payload:'home'},
      {id:'go_journal', label:'Go to Journal', action:'goto', payload:'journal'}
    ]}
  };

  function readState(){
    const s=window.safeReadJSON(STATE_KEY,{ node:'intro', history:[], startedAt:Date.now() });
    // If the user hasn't seen the intro yet and has any saved state, surface the intro once
    const seen = localStorage.getItem('checkin_intro_seen');
    if(!seen){
      if(s.node && s.node !== 'intro'){
        // mark intro as shown so we don't repeat later
        localStorage.setItem('checkin_intro_seen','true');
        // preserve the existing node in history so resume continues after intro
        s.history = s.history || [];
        s.history.push(s.node);
        s.node = 'intro';
        return s;
      }
    }
    if(!NODES[s.node]){ s.node='q1'; s.history=[]; }
    return s;
  }
  function writeState(s){ localStorage.setItem(STATE_KEY, JSON.stringify(s)); }
  function readAnswers(){ return window.safeReadJSON(ANSWERS_KEY, {}); }
  function writeAnswers(a){ localStorage.setItem(ANSWERS_KEY, JSON.stringify(a)); }

  function goTo(next){ const s=readState(); s.history=[...(s.history||[]), s.node]; s.node=next; writeState(s); render(); }
  function goBack(){ const s=readState(); if(!s.history||s.history.length===0){ s.node='q1'; } else { s.node=s.history[s.history.length-1]; s.history=s.history.slice(0,-1); } writeState(s); render(); }

  function handleOption(optId){
    const s=readState(); const node=NODES[s.node]||NODES.q1; const opt=(node.options||[]).find(o=>o.id===optId); if(!opt) return;
    const answers=readAnswers(); answers[s.node]=optId; writeAnswers(answers);
    if(opt.next) return goTo(opt.next);
    if(opt.action) return performAction(opt);
  }

  function performAction(opt){
    switch(opt.action){
      case 'breath': return startBreath(Number(opt.payload)||60);
      case 'goto': return gotoTab(String(opt.payload||''));
      case 'back': return goBack();
    }
  }

  function gotoTab(tab){
    const idMap={home:'home-tab-btn',checkin:'checkin-tab-btn',journal:'journal-tab-btn',patterns:'patterns-tab-btn',compass:'compass-tab-btn',somatic:'somatic-tab-btn'};
    const id=idMap[tab]; if(!id) return; const btn=document.getElementById(id); if(btn) btn.click();
  }


  // Breathing animation with configurable duration
  function startBreath(duration=60){
    const host=document.getElementById('breath-area'); if(!host) return;
    let secs=Math.max(1, Math.floor(duration));
    const btn=window.__ci_lastBtnEl; const original=btn?.textContent;
    if(btn){ btn.disabled=true; btn.classList.add('opacity-60','pointer-events-none'); btn.textContent=`Breathing… ${secs}s`; }
    host.innerHTML=`<div class="p-4 card"><p class="opacity-80">Follow the circle • <span id="breath-count">${secs}</span>s</p><div class="mt-4"><canvas id="breath-canvas" width="220" height="220"></canvas></div><div class="mt-3 text-right"><button id="breath-stop" class="px-3 py-1 rounded button-muted">Stop</button></div></div>`;
    const span=document.getElementById('breath-count');
    const stopBtn=document.getElementById('breath-stop');
    const ctx=document.getElementById('breath-canvas').getContext('2d');
    const center=110, radius=80; let t=0, running=true; const loop=()=>{
      ctx.clearRect(0,0,220,220);
      ctx.beginPath(); ctx.arc(center,center,radius,0,Math.PI*2); ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=8; ctx.stroke();
      const phase=(Math.sin(t)+1)/2; const r=40+phase*40; ctx.beginPath(); ctx.arc(center,center,r,0,Math.PI*2); ctx.fillStyle='rgba(99,102,241,0.8)'; ctx.fill();
      t+=0.05; };
    const iv=setInterval(()=>{ if(!running) return; secs--; if(span){ span.textContent=String(secs); } if(btn){ btn.textContent=`Breathing… ${secs}s`; } if(secs<=0){ clearInterval(iv); running=false; } },1000);
    (function raf(){ loop(); if(running) requestAnimationFrame(raf); })();
    const finish=()=>{ if(btn){ btn.disabled=false; btn.classList.remove('opacity-60','pointer-events-none'); btn.textContent=original||'Start'; } };
    stopBtn?.addEventListener('click',()=>{ running=false; clearInterval(iv); finish(); });
    const endObs=setInterval(()=>{ if(!running){ clearInterval(endObs); finish(); } },250);
  }

  // mini timer removed — timers intentionally disabled in Check-In per UX request

  function render(){
    const el=document.getElementById('app-content'); if(!el) return;
    const state=readState(); const node=NODES[state.node]||NODES.q1;
    el.innerHTML=`
      <div class="checkin-content px-4 py-8 space-y-6 w-full">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">${window.sanitizeHTML(node.title||'Check-In')}</h2>
          <div class="flex items-center gap-2">
              <button id="ci-show-intro" class="px-2 py-1 rounded button-muted text-sm">Show intro</button>
              <button id="ci-back" class="px-2 py-1 rounded button-muted text-sm">Back</button>
              <button id="ci-reset" class="px-3 py-1 rounded button-muted text-sm">Start over</button>
            </div>
  </div>
  <hr class="checkin-divider" />
        <p class="opacity-85 leading-relaxed">${window.sanitizeHTML(node.text||'')}</p>
  <div id="ci-options" class="flex flex-col gap-3"></div>
        <div id="breath-area" class="mt-4"></div>
        <div id="mini-timer-area" class="mt-4"></div>
        <div class="text-xs opacity-60 mt-2">If you might be in danger or thinking about harming yourself, contact local emergency services or a crisis line. UK: call 999, Samaritans 116 123, or text SHOUT to 85258. Outside the UK, use your local equivalent. This app isn’t a medical service.</div>
      </div>`;

  // render option buttons as DOM nodes to allow pill icons and safer labels
  const optsHost = el.querySelector('#ci-options');
  if(optsHost){ optsHost.innerHTML=''; (node.options||[]).forEach(o=>{
    const btn=document.createElement('button');
    btn.className='pill w-full flex items-center gap-3';
    btn.type='button'; btn.dataset.opt=o.id;
    // try to extract a leading emoji/symbol from label (only accept emoji/symbol ranges)
    const label = String(o.label||'');
    const emojiMatch = label.match(/^\s*([\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])\s*(.*)$/u);
    if(emojiMatch){
      const ic=document.createElement('span'); ic.className='pill-icon'; ic.textContent=emojiMatch[1];
      ic.style.flex = '0 0 auto'; ic.style.lineHeight = '1'; ic.style.marginRight = '0.5rem';
      btn.appendChild(ic);
      const span=document.createElement('span'); span.className='pill-label'; span.textContent=emojiMatch[2]||'';
      span.style.flex = '1'; span.style.whiteSpace = 'normal'; span.style.display = 'block';
      btn.appendChild(span);
    } else {
      const span=document.createElement('span'); span.className='pill-label'; span.textContent=label;
      span.style.flex = '1'; span.style.whiteSpace = 'normal'; span.style.display = 'block';
      btn.appendChild(span);
    }
    // ensure the button itself lays out left-aligned and expands full width
    btn.style.textAlign = 'left'; btn.style.alignItems = 'center';
    btn.addEventListener('click',()=>{ window.__ci_lastBtnEl=btn; window.__ci_lastBtnOptId=btn.dataset.opt; handleOption(btn.dataset.opt); });
    optsHost.appendChild(btn);
  }); }
    el.querySelector('#ci-show-intro')?.addEventListener('click',()=>{ localStorage.removeItem('checkin_intro_seen'); goTo('intro'); });
    el.querySelector('#ci-back')?.addEventListener('click',goBack);
    el.querySelector('#ci-reset')?.addEventListener('click',reset);
  }

  function show(){ window.restoreDefaultLayout(); render(); }
  function reset(){ localStorage.removeItem(STATE_KEY); localStorage.removeItem(ANSWERS_KEY); writeState({ node:'q1', history:[], startedAt:Date.now() }); render(); }

  // Keep API minimal
  window.CheckInModule={ show, handleOption, reset };
})();
