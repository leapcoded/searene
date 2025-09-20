(function(){
  const KEY_PINS='compass_pins';
  const BASES=[
  { id:'peaceful', label:'Peaceful', color:'#16a085', secondary:[
      { id:'content', label:'Content', tertiary:['calm','relaxed','at ease'] },
      { id:'grateful', label:'Grateful', tertiary:['thankful','appreciative','moved'] },
      { id:'trusting', label:'Trusting', tertiary:['open','safe','accepted'] }
    ]},
  { id:'joyful', label:'Joyful', color:'#2fa46a', secondary:[
      { id:'excited', label:'Excited', tertiary:['energised','alive','playful'] },
      { id:'optimistic', label:'Optimistic', tertiary:['hopeful','bright','encouraged'] },
      { id:'proud', label:'Proud', tertiary:['confident','capable','worthy'] }
    ]},
  { id:'powerful', label:'Powerful', color:'#4b86d6', secondary:[
      { id:'motivated', label:'Motivated', tertiary:['driven','focused','purposeful'] },
      { id:'resilient', label:'Resilient', tertiary:['steady','grounded','coping'] },
      { id:'assertive', label:'Assertive', tertiary:['clear','boundaried','firm'] }
    ]},
  { id:'scared', label:'Scared', color:'#d79b4a', secondary:[
      { id:'anxious', label:'Anxious', tertiary:['nervy','on edge','uneasy'] },
      { id:'insecure', label:'Insecure', tertiary:['uncertain','exposed','small'] },
      { id:'helpless', label:'Helpless', tertiary:['trapped','overwhelmed','stuck'] }
    ]},
  { id:'mad', label:'Mad', color:'#d05a55', secondary:[
      { id:'frustrated', label:'Frustrated', tertiary:['impatient','agitated','fed up'] },
      { id:'resentful', label:'Resentful', tertiary:['bitter','sour','put out'] },
      { id:'irritated', label:'Irritated', tertiary:['snappy','touchy','prickly'] }
    ]},
  { id:'sad', label:'Sad', color:'#6b73d9', secondary:[
      { id:'disappointed', label:'Disappointed', tertiary:['let down','flat','dismayed'] },
      { id:'lonely', label:'Lonely', tertiary:['isolated','unseen','disconnected'] },
      { id:'down', label:'Down', tertiary:['blue','tearful','heavy'] }
    ]}
  ];

  const EMOTION_INFO={
    peaceful:{
      summary:'A sense of ease and safety; your system can idle without effort.',
      signals:['Slower, deeper breaths','Looser muscles; heaviness or softness','Broader attention, easy curiosity'],
      needs:['You’re safe enough to rest and consolidate','Resources feel adequate for now','It may be a good time to restore or savour']
    },
     content:{
       summary:'A quiet satisfaction with how things are right now.',
       signals:['Gentle calm, small smiles','Lack of restlessness','Comfortable pacing'],
       needs:['Hold and enjoy the moment','Low‑demand connection or solitary time','Protect this ease from unnecessary demands']
     },
     grateful:{
       summary:'Recognition of support or kindness; warmth toward someone or something.',
       signals:['Softening chest, small smile','Thoughts of others or context that helped','Impulse to acknowledge or thank'],
       needs:['Notice and name what helped','Possibly share the appreciation','Savour the detail that felt meaningful']
     },
     trusting:{
       summary:'A sense that people or circumstances are reliable and open.',
       signals:['Relaxed posture in others’ presence','Confidence in sharing small things','Lower vigilance'],
       needs:['Gentle reciprocity and consistent cues','Small risks to build deeper safety','Space to be candid without performance']
     },
    joyful:{
      summary:'Light, energised uplift; things feel playful or bright.',
      signals:['Liveliness; urge to share','Smiles, laughter, brighter tone','Ideas and movement come easily'],
      needs:['Something aligns with what you value','There’s energy available to engage','Connection or novelty is resonating']
    },
     excited:{
       summary:'High positive activation; anticipation or eagerness.',
       signals:['Quickened pulse, bright eyes','Racing ideas and wanting to move','Smiles or laughter that come easily'],
       needs:['A clear next step or container for energy','A way to capture ideas so focus can return','Space to celebrate or explore safely']
     },
     optimistic:{
       summary:'Expectations tilt toward favourable outcomes.',
       signals:['Forward‑looking thoughts','Willingness to plan or try','Reduced focus on obstacles'],
       needs:['Gentle testing of possibilities','Small commitments to see what unfolds','Checks that balance hope with reality']
     },
     proud:{
       summary:'Recognition of a personal achievement or effort.',
       signals:['Upright posture; steady breath','Desire to tell someone or mark the moment'],
       needs:['Acknowledge the work that led here','Integrate learning; rest into the win','Share with someone who values the effort']
     },
    powerful:{
      summary:'A felt sense of agency and capacity to influence.',
      signals:['Upright posture, clear tone','Steady energy without strain','Focused intention'],
      needs:['You’re resourced to take a step','Boundaries and direction feel clear','Conditions are favourable for action']
    },
     motivated:{
       summary:'Energy aligned with a goal; readiness to begin.',
       signals:['Focused attention; clear next moves','Sustained effort without draining worry'],
       needs:['Clear definition of a next micro‑step','Tools or time to act','A manageable plan to maintain momentum']
     },
     resilient:{
       summary:'Capacity to recover and adapt through strain.',
       signals:['Calmer breathing despite demands','Flexible problem‑solving stance','Confidence in bouncing back'],
       needs:['Rest and recovery to sustain strength','Acknowledgement of the coping effort','Practical supports to reduce load']
     },
     assertive:{
       summary:'Clear and direct intention to state needs or boundaries.',
       signals:['Firm tone; steady breath','Clear eye contact or posture','Precise language emerging'],
       needs:['Opportunity to state limits or requests','Safety to be honest without escalation','A follow‑up plan for boundary maintenance']
     },
      scared:{
      summary:'Uncertainty or threat is salient; protection systems are online.',
      signals:['Tight chest or stomach','Scanning, “what‑if” thinking','Narrowed focus'],
      needs:['You may need information or reassurance','Breaking things down could reduce load','Safety cues would help you orient']
    },
     anxious:{
       summary:'Worry and future‑oriented scanning; the body prepares for possible threats.',
       signals:['Rapid thoughts, stomach tightness','Difficulty concentrating on the present','Need to check or double‑check things'],
       needs:['Accurate information to reduce uncertainty','Small grounding steps to return to the here and now','A manageable first action to reduce overwhelm']
     },
     insecure:{
       summary:'Doubt about acceptance, competence, or belonging.',
       signals:['Self‑critical thoughts','Comparisons with others','Avoiding showing vulnerability'],
       needs:['Reassurance or corrective feedback','Experiences that confirm capability','Gentle self‑compassion while testing small risks']
     },
     helpless:{
       summary:'A sense of being stuck or without options.',
       signals:['Collapsed posture; slowed movements','Words like “can’t” or “nothing helps”','Overwhelm and resignation'],
       needs:['Break tasks into tiny, manageable steps','External support or problem framing','Small wins to rebuild efficacy']
     },
    mad:{
      summary:'A boundary or value feels crossed; protective energy is up.',
      signals:['Heat, jaw clench, urge to act','Forward, tight energy','“Not fair/shouldn’t” thoughts'],
      needs:['Something important feels threatened or dismissed','A repair, boundary or acknowledgement may be needed','Energy wants a safe, constructive outlet']
    },
     frustrated:{
       summary:'Irritation from a blocked goal; energy pushing against an obstacle.',
       signals:['Tight jaw; impatience','Repetitive attempts without progress','Short temper with delays'],
       needs:['A change in approach or tempo','A brief pause to relieve pressure','Alternate paths or help to unblock']
     },
     resentful:{
       summary:'Ongoing sense of being wronged or taken for granted.',
       signals:['Brooding on past slights','Cold distancing, simmering anger','Counting grievances'],
       needs:['Acknowledgement of hurt','Clear conversation or boundary to address ongoing patterns','Repair or reallocation of responsibilities']
     },
     irritated:{
       summary:'Low‑level annoyance from friction or overload.',
       signals:['Snappy comments; short fuse','Heightened sensitivity to small inputs','Tension in face or neck'],
       needs:['Reduce sensory or task load','Micro‑breaks to reset','Address small frictions before they grow']
     },
    sad:{
      summary:'A response to loss, change, or unmet hopes; energy dips.',
      signals:['Heaviness, tearfulness','Quieter inward focus','Low motivation'],
      needs:['Comfort and witness may help','Time to integrate what changed','Gentle pacing rather than pushing']
    },
     disappointed:{
       summary:'Disappointment from unmet expectations or outcomes.',
       signals:['Sighing; lowered energy','Replaying what could have been different','Loss of enthusiasm for the task'],
       needs:['Acknowledge the gap between hope and outcome','Reassess goals or next steps','Permission to rest or recalibrate']
     },
     lonely:{
       summary:'A sense of isolation or lack of meaningful connection.',
       signals:['Ache in the chest; wanting to reach out','Scrolling for contact; feeling unseen'],
       needs:['Warm, low‑stakes contact','Shared attention or presence','A sense that someone notices you']
     },
     down:{
       summary:'Low mood and energy that colours activity and interest.',
       signals:['Slower movement; less speech','Reduced pleasure in usual activities','Tearfulness or withdrawal'],
       needs:['Gentle care and lowered expectations','Small achievable tasks to re‑engage','Compassionate presence if possible']
     }
    ,calm:{
      summary:'A settled, quiet clarity in body and mind.',
      signals:['Even breathing','Soft facial muscles','Calm attention'],
      needs:['Hold the ease; allow rest','Low‑demand noticing to consolidate']
    },
    relaxed:{
      summary:'Muscular and mental ease without effort.',
      signals:['Looser posture','Slower movements','Comfort with stillness'],
      needs:['Protect this downtime','Small pleasures or gentle activity']
    },
    'at ease':{
      summary:'Comfortable and unpressured; things feel acceptable.',
      signals:['Natural breathing','Open shoulders','No hurry to act'],
      needs:['Savour the moment','Avoid introducing needless tasks']
    },
    thankful:{
      summary:'Notice of help or benefit received from others or circumstances.',
      signals:['Warm chest; soft smile','Thoughts of a giver or source'],
      needs:['Name the gratitude','Consider a small acknowledgement']
    },
    appreciative:{
      summary:'Acknowledgement of value or effort you’ve noticed.',
      signals:['Inclination to express thanks','Lingering positive memory of detail'],
      needs:['Record or share what felt meaningful','Savour specifics rather than generalising']
    },
    moved:{
      summary:'Touched emotionally; a gentle swell of feeling.',
      signals:['Wet eyes or lump in throat','Warmth or quiet awe'],
      needs:['Notice the connection','Gentle presence to let it settle']
    },
    open:{
      summary:'Willingness to be seen or to receive from others.',
      signals:['Soft voice; relaxed face','Curiosity about others'],
      needs:['Reciprocal cues to deepen safety','Small risks that invite sharing']
    },
    safe:{
      summary:'A felt sense that you can lower guard or relax vigilance.',
      signals:['Slower breathing','Looser hands or jaw'],
      needs:['Maintain consistent, trustworthy contact','Use the safety to restore']
    },
    accepted:{
      summary:'Feeling that who you are is seen without rejection.',
      signals:['Relief in posture','Reduced self‑monitoring'],
      needs:['Hold the acceptance; return it if possible','Trust cues that keep this open']
    },
    energised:{
      summary:'A burst of physical activation and mental clarity.',
      signals:['Increased heart rate','Quick, bright thoughts','Desire to move'],
      needs:['A clear outlet for energy','A focused next step to channel it']
    },
    alive:{
      summary:'A vivid sense of presence and aliveness.',
      signals:['Heightened senses','Pleasurable body activation'],
      needs:['Engage with something meaningful or sensory','Capture the feeling in a small action']
    },
    playful:{
      summary:'Lighthearted curiosity and a readiness to experiment.',
      signals:['Spontaneous humour','Loose movements','Novel ideas'],
      needs:['Safe space to try things without judgement','Small creative outlets']
    },
    hopeful:{
      summary:'Expectation that things can improve or work out.',
      signals:['Imagining positive futures','Planful, forward thoughts'],
      needs:['Test small possibilities','Make a tiny commitment to see what happens']
    },
    bright:{
      summary:'A lightness of mood and outlook; things feel possible.',
      signals:['Easier smiling','Open attention to options'],
      needs:['Use momentum for small gains','Share the good to reinforce it']
    },
    encouraged:{
      summary:'Feeling supported to try or persist.',
      signals:['Less fear of failure','Willingness to take another step'],
      needs:['Name the support that helped','Take a next micro‑step while energy is up']
    },
    confident:{
      summary:'Belief in your competence or suitability for a task.',
      signals:['Steady voice','Decisive actions'],
      needs:['Tackle a meaningful next step','Record what worked for future reference']
    },
    capable:{
      summary:'Trust in your skills and resources to handle a challenge.',
      signals:['Calm planning; methodical moves','Reduced second‑guessing'],
      needs:['Take on a task that matches strength','Delegate what drains you']
    },
    worthy:{
      summary:'A sense of deserving care, respect, or recognition.',
      signals:['Comfort in receiving praise','Less self‑criticism'],
      needs:['Accept a compliment or small kindness','Protect boundaries that affirm worth']
    },
    driven:{
      summary:'High, goal‑directed energy pushing you forward.',
      signals:['Single‑minded focus','Longer hours or intensity'],
      needs:['A clear plan and realistic limits','Micro‑breaks to prevent burnout']
    },
    focused:{
      summary:'Concentrated attention on a specific task or target.',
      signals:['Narrowed attention; less distractibility','Steady effort'],
      needs:['Minimise interruptions','Define a precise next action']
    },
    purposeful:{
      summary:'Action guided by meaning or long‑term goals.',
      signals:['Aligned choices; persistent effort','Sense of direction'],
      needs:['Connect small tasks to the larger aim','Celebrate progress landmarks']
    },
    steady:{
      summary:'Consistent, reliable emotional balance under pressure.',
      signals:['Even response to stress','Methodical approach'],
      needs:['Scheduled recovery time','Acknowledge the effort of coping']
    },
    grounded:{
      summary:'Rooted, present, with a stable sense of self.',
      signals:['Rooted posture; clear breath','Practical problem‑solving'],
      needs:['Use routines that sustain stability','Small physical practices to maintain grounding']
    },
    coping:{
      summary:'Managing demands reasonably despite difficulty.',
      signals:['Getting things done despite strain','Flexible problem adjustments'],
      needs:['External support to reduce load','Time to recover after effort']
    },
    clear:{
      summary:'Mental clarity and straightforward intentions.',
      signals:['Concise words; decisive tone','Calm planning'],
      needs:['Act on a clear priority','Avoid overcomplicating simple choices']
    },
    boundaried:{
      summary:'A firm sense of personal limits and protections.',
      signals:['Direct language; reduced people‑pleasing','Comfort saying no'],
      needs:['Reinforce limits with small steps','Ensure follow‑through on boundaries']
    },
    firm:{
      summary:'Resolute stance and steady enforcement of limits.',
      signals:['Steady tone; calm posture','Consistent behaviour'],
      needs:['Clear communication of expectations','Support if pushback follows']
    },
    nervy:{
      summary:'Low‑grade jitteriness and heightened sensitivity.',
      signals:['Fidgeting; shallow breathing','Startled reactions'],
      needs:['Brief grounding to steady the nervous system','Reduce stimulants or noise']
    },
    'on edge':{
      summary:'Tension that something might go wrong at any moment.',
      signals:['Tight jaw; scanning','Irritable responses to small things'],
      needs:['Clear safety checks or information','Short grounding pauses to interrupt escalation']
    },
    uneasy:{
      summary:'A general sense that things are not right.',
      signals:['Restlessness; knot in the stomach','Distrust of current cues'],
      needs:['Clarify what’s uncertain','Small steps to test assumptions']
    },
    uncertain:{
      summary:'Lack of clarity about outcomes or choices.',
      signals:['Hesitation; flip‑flopping decisions','Difficulty committing'],
      needs:['Gather key information','Make a small test decision to reduce ambiguity']
    },
    exposed:{
      summary:'Feeling vulnerable to judgement or consequences.',
      signals:['Heat in the face; self‑consciousness','Wanting to hide or withdraw'],
      needs:['Reassurance or protective distance','Share only small disclosures until safe']
    },
    small:{
      summary:'A shrinking sense of power or significance.',
      signals:['Minimised voice; constricted posture','Self‑diminishing thoughts'],
      needs:['Gentle validation','Small actions that rebuild agency']
    },
    trapped:{
      summary:'A perception of no viable options or escape.',
      signals:['Panic or freeze responses','Repetitive rumination on limits'],
      needs:['External problem‑solving help','Reframe or open a new small option']
    },
    overwhelmed:{
      summary:'Too many demands for available resources right now.',
      signals:['Foggy thinking; tears','Inability to start tasks'],
      needs:['Immediate load‑shedding; delegate or defer','Short rest to recover perspective']
    },
    stuck:{
      summary:'Inability to move forward despite wanting to.',
      signals:['Repeating the same patterns','Ruminating without action'],
      needs:['Break tasks into micro‑steps','External input to change the frame']
    },
    impatient:{
      summary:'Frustration driven by delay or slow pace.',
      signals:['Tapping, sighing','Irritable comments'],
      needs:['Reset expectations or timebox activity','Short break to reduce pressure']
    },
    agitated:{
      summary:'High restlessness and mental churn.',
      signals:['Rapid speech; fidgeting','Shallow breath'],
      needs:['Movement or discharge','Short focused tasks to settle attention']
    },
    'fed up':{
      summary:'Exhausted tolerance; low patience for the situation.',
      signals:['Flat anger; resignation','Mistreatment thoughts surface'],
      needs:['Clear boundary or step away','Reallocate responsibilities if possible']
    },
    bitter:{
      summary:'Lingering sourness toward people or outcomes.',
      signals:['Cold distancing; cynical thoughts','Replaying grievances'],
      needs:['Acknowledge the hurt','Consider repair or acceptance work']
    },
    sour:{
      summary:'A muted displeasure that leaves you unsettled.',
      signals:['Quiet cynicism; reduced warmth','Avoidant behaviours'],
      needs:['Name the specific grievance','Decide whether to address or release it']
    },
    'put out':{
      summary:'Annoyance at an imposition or inconvenience.',
      signals:['Short replies; tensed face','Desire to be left alone'],
      needs:['Small boundary or clarification','Create a short buffer to decompress']
    },
    snappy:{
      summary:'Quick, sharp reactions to small triggers.',
      signals:['Abrupt words; quick exhalation','Later regret or surprise'],
      needs:['Pause before replying','Notice triggers and add a tiny delay']
    },
    touchy:{
      summary:'Heightened sensitivity to perceived slights.',
      signals:['Easily offended; quiet withdrawal','Over‑reading neutral comments'],
      needs:['Gentle curiosity about the trigger','Protect yourself from further small hurts']
    },
    prickly:{
      summary:'A guarded, defensive stance to minor stresses.',
      signals:['Short answers; closed posture','Irritability at close contact'],
      needs:['Space to soften','Avoid high‑demand interactions briefly']
    },
    'let down':{
      summary:'Hurt when expectations of others are unmet.',
      signals:['Cold disappointment; shrinking trust','Sighs or withdrawal'],
      needs:['A conversation to repair or clarify expectations','Self‑care and boundary setting']
    },
    flat:{
      summary:'Numbness or reduced emotional range.',
      signals:['Monotone voice; low reactivity','Lack of enthusiasm'],
      needs:['Small sensory re‑engagement','Gentle scheduling of minor pleasures']
    },
    dismayed:{
      summary:'Surprised sadness at an outcome that feels wrong.',
      signals:['Speechless pause; watery eyes','Low energy and disbelief'],
      needs:['Acknowledgement of the loss','Time and company to process it']
    },
    isolated:{
      summary:'A sense of being cut off from others.',
      signals:['Quiet withdrawal; sadness','Reduced contact attempts'],
      needs:['Reach‑out opportunities','Shared spaces or small contact to begin reconnecting']
    },
    unseen:{
      summary:'Feeling ignored or invisible to people who matter.',
      signals:['Hurt silence; checking for reactions','Self‑diminishing thoughts'],
      needs:['Name the feeling to someone safe','Seek one small reliable witness']
    },
    disconnected:{
      summary:'A gap between your inner state and social context.',
      signals:['Lack of belonging; awkwardness','Difficulty engaging in conversation'],
      needs:['Low‑stakes presence with others','Activities that rebuild shared focus']
    },
    blue:{
      summary:'A gentle sadness that colours mood and energy.',
      signals:['Quietness; slow pace','Mild teariness or listlessness'],
      needs:['Gentle activities that feel doable','A small connection or comfort']
    },
    tearful:{
      summary:'Eyes welling or crying in response to loss or overwhelm.',
      signals:['Warm eyes; throat tightness','Need to slow down and breathe'],
      needs:['Safe space to release','Soothing touch or words if wanted']
    },
    heavy:{
      summary:'A weighted feeling that pulls posture and energy down.',
      signals:['Slower movements; difficulty starting tasks','Chest or limb heaviness'],
      needs:['Lower expectations for the moment','Small physical comforts and rest']
    }
    
  };

  // expose a canonical list of emotion keys for other modules (autocomplete source)
  try{
    window.COMPASS_EMOTIONS = Object.keys(EMOTION_INFO).map(k=>String(k));
  }catch(e){ window.COMPASS_EMOTIONS = [] }
  // notify other modules that the canonical emotion list is available
  try{ document.dispatchEvent(new CustomEvent('compass:ready')); }catch(e){}

  let selectedPath=[]; let expandedBase=null; let expandedSecondary=null; let pinOpen={};
  let pendingHighlight=null;
  let rafId=null; let scene=null;

  function readPins(){ return window.safeReadJSON(KEY_PINS,[]); }
  function writePins(v){ localStorage.setItem(KEY_PINS, JSON.stringify(v)); }
  function isPinned(id){ return readPins().includes(id); }
  function togglePin(id){ const pins=readPins(); const i=pins.indexOf(id); if(i>=0) pins.splice(i,1); else pins.push(id); writePins(pins); renderPins(); }

  function findBase(id){ return BASES.find(b=>b.id===id||b.label.toLowerCase()===String(id).toLowerCase()); }
  function findSecondary(base, id){ return (base?.secondary||[]).find(s=>s.id===id||s.label.toLowerCase()===String(id).toLowerCase()); }

  function ensureStyles(){
    if(document.getElementById('compass-styles')) return;
  const css=`
    .bubble { position:absolute; border-radius:9999px; display:flex; align-items:center; justify-content:center; padding:10px 14px; color:#fff; font-size:14px; line-height:1; cursor:grab; user-select:none; touch-action:none; box-shadow:0 6px 18px rgba(0,0,0,0.15); will-change: transform; white-space:nowrap; }
  .bubble.dragging{ cursor:grabbing; }
    .bubble.small{ font-size:12px; padding:8px 12px; }
    .bubble.medium{ font-size:13px; padding:10px 14px; }
    .bubble.large{ font-size:16px; padding:12px 16px; }
  .bubble.dim{ filter:grayscale(0.55) brightness(0.75); opacity:0.35; }
    .bubble{ text-shadow: 0 1px 0 rgba(0,0,0,0.15); }
    .bubble.highlight{ animation: highlight-pulse 900ms ease both; box-shadow:0 14px 36px rgba(0,0,0,0.28); }
    @keyframes highlight-pulse{ 0%{ transform:scale(1); } 50%{ transform:scale(1.06); } 100%{ transform:scale(1); } }
    .link-line{ stroke: rgba(0,0,0,0.15); }
    html[data-theme='dark'] .link-line{ stroke: rgba(255,255,255,0.15); }
    `;
    const style=document.createElement('style'); style.id='compass-styles'; style.textContent=css; document.head.appendChild(style);
  }

  function polar(cx,cy,r,angleRad){ return { x: cx + Math.cos(angleRad)*r, y: cy + Math.sin(angleRad)*r }; }
  function randFloat(min,max){ return Math.random()*(max-min)+min; }

  function renderGraph(){
    const host=document.getElementById('compass-graph'); if(!host) return; host.innerHTML='';
    const svgNS='http://www.w3.org/2000/svg';
  const rect=host.getBoundingClientRect();
  const W=Math.max(320, host.clientWidth || rect.width || 800);
  const H=host.clientHeight || Math.max(260, Math.floor(W*0.6));
    const svg=document.createElementNS(svgNS,'svg'); svg.setAttribute('width',String(W)); svg.setAttribute('height',String(H)); svg.classList.add('absolute','inset-0'); host.appendChild(svg);
    const layer=document.createElement('div'); layer.className='absolute inset-0'; layer.style.position='absolute'; layer.style.inset='0'; host.appendChild(layer);
    host.style.overflow='hidden';

    // reset previous animation
    if(rafId){ cancelAnimationFrame(rafId); rafId=null; }
  scene={ nodes:[], links:[], W, H, pad:16, host };

    const cx=W*0.5, cy=H*0.5; const baseR=Math.min(W,H)*0.28; const secR=Math.min(W,H)*0.20; const terR=80;

    const bases=BASES;
    const baseCount=bases.length; const basePositions={};
    bases.forEach((b,i)=>{
      const ang=i/baseCount * Math.PI*2 - Math.PI/2; const r=baseR*0.65; const {x,y}=polar(cx,cy,r,ang);
      basePositions[b.id]={x,y};
    });

    const drawLink=(aNode,bNode)=>{
      const ln=document.createElementNS(svgNS,'line'); ln.setAttribute('x1',String(aNode.x)); ln.setAttribute('y1',String(aNode.y)); ln.setAttribute('x2',String(bNode.x)); ln.setAttribute('y2',String(bNode.y)); ln.setAttribute('class','link-line'); ln.setAttribute('stroke-width','2'); svg.appendChild(ln); scene.links.push({ ln, a:aNode, b:bNode });
    };

    const addBubble=(x,y,size,color,label,onClick,dim=false,type='base',id=null,parentId=null,baseId=null)=>{
      const d=document.createElement('div'); d.className=`bubble ${size} ${dim?'dim':''}`; d.textContent=label; layer.appendChild(d);
      // apply a gentle linear gradient based on the base color
      try{
        const isGradient = String(color).toLowerCase().includes('gradient');
        const lighter = lighten(color, 0.32);
        const darker = darken(color, 0.12);
        if(isGradient){
          d.style.background = color;
        } else {
          d.style.backgroundImage = `linear-gradient(135deg, ${darker} 0%, ${lighter} 100%)`;
          d.style.backgroundColor = darker;
        }
        d.style.backgroundSize = 'cover';
        d.style.backgroundRepeat = 'no-repeat';
        d.style.backgroundPosition = 'center';
      }catch(e){ d.style.background = color; }
      const node={ id: id||label.toLowerCase(), type, parentId, baseId: baseId || (type==='base'? id||label.toLowerCase(): null), el:d, x, y, vx: randFloat(-0.08,0.08), vy: randFloat(-0.08,0.08), color, size, w:0, h:0, dragging:false, dragMoved:false, _suppressClickOnce:false, lastMoveDX:0, lastMoveDY:0 };
      // click wrapper with drag suppression
      d.addEventListener('click',(ev)=>{ if(node._suppressClickOnce){ node._suppressClickOnce=false; ev.preventDefault(); ev.stopPropagation(); return; } onClick(ev); });
      // pointer drag handling
      d.addEventListener('pointerdown',(e)=>{
        e.preventDefault(); try{ d.setPointerCapture(e.pointerId); }catch{}
        node.dragging=true; node.dragMoved=false; d.classList.add('dragging');
        const r=scene.host.getBoundingClientRect(); node.dragOffsetX=(e.clientX - r.left) - node.x; node.dragOffsetY=(e.clientY - r.top) - node.y;
      });
      d.addEventListener('pointermove',(e)=>{
        if(!node.dragging) return; const r=scene.host.getBoundingClientRect(); let nx=(e.clientX - r.left) - node.dragOffsetX; let ny=(e.clientY - r.top) - node.dragOffsetY;
        const PAD=scene.pad; const halfW=node.w/2, halfH=node.h/2; const minX=PAD+halfW, maxX=scene.W-PAD-halfW; const minY=PAD+halfH, maxY=scene.H-PAD-halfH;
        nx=Math.max(minX, Math.min(maxX, nx)); ny=Math.max(minY, Math.min(maxY, ny));
        const dx = nx - node.x, dy = ny - node.y; if(Math.abs(dx)>0.5 || Math.abs(dy)>0.5) node.dragMoved=true; node.lastMoveDX=dx; node.lastMoveDY=dy;
        node.vx=0; node.vy=0; node.x=nx; node.y=ny; d.style.left=(nx-halfW)+'px'; d.style.top=(ny-halfH)+'px';
      });
      d.addEventListener('pointerup',(e)=>{
        if(node.dragging){ try{ d.releasePointerCapture(e.pointerId); }catch{} }
        node.dragging=false; d.classList.remove('dragging'); if(node.dragMoved){ node._suppressClickOnce=true; node.dragMoved=false; }
        // restore gentle drift based on last drag delta or random
        const speedScale=0.05; const maxSpd=0.12; let vx=node.lastMoveDX*speedScale, vy=node.lastMoveDY*speedScale;
        if(Math.abs(vx)+Math.abs(vy) < 0.01){ vx=randFloat(-0.06,0.06); vy=randFloat(-0.06,0.06); }
        node.vx=Math.max(-maxSpd, Math.min(maxSpd, vx)); node.vy=Math.max(-maxSpd, Math.min(maxSpd, vy)); node.lastMoveDX=0; node.lastMoveDY=0;
      });
  // after mounted, measure and clamp into bounds
      const rect = d.getBoundingClientRect(); node.w = rect.width; node.h = rect.height;
      const halfW=node.w/2, halfH=node.h/2;
      let nx = Math.max(halfW, Math.min(scene.W - halfW, x));
      let ny = Math.max(halfH, Math.min(scene.H - halfH, y));
      node.x = nx; node.y = ny;
      d.style.left=(nx - halfW)+'px'; d.style.top=(ny - halfH)+'px';
      scene.nodes.push(node);
      // if this node matches a pending highlight id, trigger highlight
      if(pendingHighlight){
        const pid = String(pendingHighlight);
        if(node.id === pid || node.id === pid.replace(':','\:')){
          // add highlight class and remove it after the animation
          node.el.classList.add('highlight');
          setTimeout(()=>{ try{ node.el.classList.remove('highlight'); }catch{}; pendingHighlight=null; }, 1000);
        }
      }
      return node;
    };

    const baseNodes={};
    bases.forEach((b)=>{
      const pos=basePositions[b.id]; const isActive=expandedBase===b.id;
      const n=addBubble(pos.x,pos.y,'large',b.color,b.label,()=>{ expandedBase = isActive? null : b.id; expandedSecondary=null; selectedPath=[b.id]; renderGraph(); renderDetails(); }, !isActive && expandedBase && expandedBase!==b.id,'base',b.id,null,b.id);
      baseNodes[b.id]=n;
    });

    if(expandedBase){
      const base=findBase(expandedBase); const center=basePositions[base.id]; const secs=base.secondary||[]; const n=secs.length;
      secs.forEach((s,idx)=>{
        const ang=idx/n * Math.PI*2; const baseNode=baseNodes[base.id]; const {x,y}=polar(baseNode.x,baseNode.y,secR,ang);
        const secColor=base.color;
        const secNode=addBubble(x,y,'medium',secColor,capitalise(s.label),()=>{ expandedSecondary = (expandedSecondary===s.id)? null : s.id; selectedPath=[base.id,s.id]; renderGraph(); renderDetails(); }, false,'secondary',s.id,base.id,base.id);
        drawLink(baseNode, secNode);
        if(expandedSecondary===s.id){
          const ter=(s.tertiary||[]); const m=ter.length; ter.forEach((t,j)=>{
            const a=j/m*Math.PI*2; const p=polar(secNode.x,secNode.y,terR,a);
            const terNode=addBubble(p.x,p.y,'small',lighten(base.color,0.15),capitalise(t),()=>{ selectedPath=[base.id,s.id,t]; renderDetails(); }, false,'tertiary',`${s.id}:${t}`,s.id,base.id);
            drawLink(secNode, terNode);
          });
        }
      });
    }

    // apply dimming based on selected family
    const updateDimming=()=>{
      const activeBase=expandedBase; const any=!!activeBase;
      scene.nodes.forEach(n=>{
        const inFam = any ? (n.baseId===activeBase || n.id===activeBase) : true;
        if(any && !inFam) n.el.classList.add('dim'); else n.el.classList.remove('dim');
      });
    };
    updateDimming();

    // start floating animation
    let frame=0;
    const tick=(ts)=>{
      const nodes=scene.nodes; const links=scene.links; const W=scene.W, H=scene.H, PAD=scene.pad;
      frame++;
      // separation for current family
      if(expandedBase){
        const fam = nodes.filter(n=> n.baseId===expandedBase || n.id===expandedBase);
        for(let i=0;i<fam.length;i++){
          for(let j=i+1;j<fam.length;j++){
            const a=fam[i], b=fam[j];
            let dx=b.x-a.x, dy=b.y-a.y; let dist=Math.sqrt(dx*dx+dy*dy)||0.0001;
            const ra=Math.max(a.w,a.h)/2, rb=Math.max(b.w,b.h)/2; const minDist=ra+rb+12;
            if(dist < minDist){
              const overlap=minDist - dist; const nx=dx/dist, ny=dy/dist;
              const pushA = b.dragging? 1 : (a.dragging? 0 : 0.5);
              const pushB = a.dragging? 1 : (b.dragging? 0 : 0.5);
              a.x -= nx * overlap * pushA; a.y -= ny * overlap * pushA;
              b.x += nx * overlap * pushB; b.y += ny * overlap * pushB;
            }
          }
        }
      }
      // light global separation for base nodes
      const baseNodesOnly = nodes.filter(n=> n.type==='base');
      for(let i=0;i<baseNodesOnly.length;i++){
        for(let j=i+1;j<baseNodesOnly.length;j++){
          const a=baseNodesOnly[i], b=baseNodesOnly[j];
          let dx=b.x-a.x, dy=b.y-a.y; let dist=Math.sqrt(dx*dx+dy*dy)||0.0001;
          const ra=Math.max(a.w,a.h)/2, rb=Math.max(b.w,b.h)/2; const minDist=ra+rb+16;
          if(dist < minDist){
            const overlap=minDist - dist; const nx=dx/dist, ny=dy/dist; const share=0.5;
            a.x -= nx * overlap * share; a.y -= ny * overlap * share;
            b.x += nx * overlap * share; b.y += ny * overlap * share;
          }
        }
      }
      for(const n of nodes){
        if(frame % 20 === 0){ const ow=n.el.offsetWidth, oh=n.el.offsetHeight; if(ow && oh){ n.w=ow; n.h=oh; } }
        const halfW=n.w/2, halfH=n.h/2; if(!n.dragging){ n.x += n.vx; n.y += n.vy; }
        const minX = PAD + halfW, maxX = W - PAD - halfW; const minY = PAD + halfH, maxY = H - PAD - halfH;
        if(n.x < minX){ n.x = minX; n.vx *= -1; }
        if(n.x > maxX){ n.x = maxX; n.vx *= -1; }
        if(n.y < minY){ n.y = minY; n.vy *= -1; }
        if(n.y > maxY){ n.y = maxY; n.vy *= -1; }
        n.el.style.left = (n.x - halfW)+'px'; n.el.style.top = (n.y - halfH)+'px';
      }
      for(const lk of links){ lk.ln.setAttribute('x1', String(lk.a.x)); lk.ln.setAttribute('y1', String(lk.a.y)); lk.ln.setAttribute('x2', String(lk.b.x)); lk.ln.setAttribute('y2', String(lk.b.y)); }
      rafId=requestAnimationFrame(tick);
    };
    rafId=requestAnimationFrame(tick);
  }

  function capitalise(s){ s=String(s||''); return s.charAt(0).toUpperCase()+s.slice(1); }

  function lighten(hex, amount){
    const c=hex.replace('#',''); const num=parseInt(c,16); let r=(num>>16)&255,g=(num>>8)&255,b=num&255; r=Math.min(255, Math.floor(r + (255-r)*amount)); g=Math.min(255, Math.floor(g + (255-g)*amount)); b=Math.min(255, Math.floor(b + (255-b)*amount)); const toHex=v=>v.toString(16).padStart(2,'0'); return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function darken(hex, amount){
    const c=hex.replace('#',''); const num=parseInt(c,16); let r=(num>>16)&255,g=(num>>8)&255,b=num&255; r=Math.max(0, Math.floor(r * (1 - amount))); g=Math.max(0, Math.floor(g * (1 - amount))); b=Math.max(0, Math.floor(b * (1 - amount))); const toHex=v=>v.toString(16).padStart(2,'0'); return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function getInfoForPath(){
    if(!selectedPath.length) return null;
    const ids=selectedPath.map(x=>String(x).toLowerCase());
    for(const key of ids.slice().reverse()){ if(EMOTION_INFO[key]) return EMOTION_INFO[key]; }
    return EMOTION_INFO[ids[0]]||null;
  }
  function describePath(){
    if(!selectedPath.length) return { title:'', body:'', info:null };
    const ids=selectedPath; const base=findBase(ids[0]); let title='';
    if(ids.length===1){ title=base.label; }
    else if(ids.length===2){ const s=findSecondary(base,ids[1]); title=`${base.label} › ${capitalise(s.label)}`; }
    else { const s=findSecondary(base,ids[1]); const t=String(ids[2]); title=`${base.label} › ${capitalise(s.label)} › ${capitalise(t)}`; }
    const info=getInfoForPath(); const body=info?.summary || '';
    return { title, body, info };
  }

  function renderDetails(){
    const box=document.getElementById('compass-details'); if(!box) return; const {title, body, info}=describePath(); const id=selectedPath[selectedPath.length-1]||''; const canPin=Boolean(title);
    const list = (arr)=> Array.isArray(arr) && arr.length
      ? `<ul class="list-disc pl-5 space-y-1">${arr.map(x=>`<li>${window.sanitizeHTML(x)}</li>`).join('')}</ul>`
      : '';
    box.innerHTML=`
      <div class="p-4 rounded-lg bg-black/5 dark:bg-white/10 space-y-4">
        <div class="flex items-center justify-between gap-2">
          <div class="font-semibold">${window.sanitizeHTML(title||'Pick an emotion')}</div>
          ${canPin?`<button id="pin-toggle" class="px-3 py-1 rounded ${isPinned(id)?'bg-amber-600 text-white':'bg-black/10 dark:bg-white/10'} text-sm">${isPinned(id)?'Unpin':'Pin'}</button>`:''}
        </div>
        <div class="text-sm opacity-80 whitespace-pre-wrap">${window.sanitizeHTML(body||'Click a base emotion to explore connected feelings.')}</div>
        ${info?.signals?`<div><div class="font-medium mb-1">What it feels like</div>${list(info.signals)}</div>`:''}
  ${info?.needs?`<div><div class="font-medium mb-1">What it might be telling you</div>${list(info.needs)}</div>`:''}
      </div>
      <div class="p-4 rounded-lg bg-black/5 dark:bg-white/10 mt-4">
        <div class="font-medium mb-2">Pinned</div>
        <div id="compass-pins" class="flex flex-wrap gap-2"></div>
      </div>`;
    const btn=box.querySelector('#pin-toggle'); if(btn) btn.addEventListener('click',()=>{ togglePin(id); renderDetails(); });
    renderPins();
  }

  function renderPins(){
    const host=document.getElementById('compass-pins'); if(!host) return; host.innerHTML='';
    const pins=readPins(); if(!pins.length){ host.innerHTML='<div class="text-xs opacity-60">No pins yet.</div>'; return; }
    pins.forEach(pid=>{
      const info=getInfoForId(pid); const title=titleForId(pid); const open=!!pinOpen[pid];
      const card=document.createElement('div'); card.className='rounded-lg bg-black/5 dark:bg-white/10 text-sm w-full';
  const list=(arr)=> Array.isArray(arr)&&arr.length?`<ul class="list-disc pl-5 space-y-1">${arr.map(x=>`<li>${window.sanitizeHTML(x)}</li>`).join('')}</ul>`:'';
      card.innerHTML=`
        <div class="flex items-center justify-between gap-2 px-3 py-2 border-b border-black/10 dark:border-white/10">
          <div class="font-medium truncate">${window.sanitizeHTML(title)}</div>
          <div class="flex items-center gap-1">
            <button class="pin-toggle-detail px-2 py-1 rounded bg-black/10 dark:bg-white/10">${open?'Hide':'Show'}</button>
            <button class="pin-remove px-2 py-1 rounded bg-red-600 text-white">×</button>
          </div>
        </div>
        <div class="pin-detail ${open?'':'hidden'} px-3 py-3 space-y-3">
          ${info?.summary?`<div class="opacity-80">${window.sanitizeHTML(info.summary)}</div>`:''}
          ${info?.signals?`<div><div class="font-medium mb-1">What it feels like</div>${list(info.signals)}</div>`:''}
          ${info?.needs?`<div><div class="font-medium mb-1">What it might be telling you</div>${list(info.needs)}</div>`:''}
        </div>`;
      card.querySelector('.pin-toggle-detail')?.addEventListener('click',()=>{ 
        // If the card is currently open, collapse it. If it's closed, show the pin
        // in the details panel without expanding the pinned card in the pins list.
        if(pinOpen[pid]){
          pinOpen[pid]=false; renderPins();
        } else {
          const path = parsePinToPath(pid);
          // set selection and expand families so details show the pinned emotion
          selectedPath = path;
          expandedBase = path[0];
          expandedSecondary = path.length>=2 ? path[1] : null;
          // request a mild highlight for the target bubble (use the stored pin id)
          pendingHighlight = pid;
          renderGraph(); renderDetails();
          // keep the pinned card collapsed (do NOT set pinOpen[pid]=true)
        }
      });
      card.querySelector('.pin-remove')?.addEventListener('click',()=>{ togglePin(pid); });
      host.appendChild(card);
    });
  }

  function prettyLabel(id){
    const str=String(id||'');
    const b=findBase(str); if(b) return b.label;
    for(const base of BASES){ const s=findSecondary(base,str); if(s) return `${base.label} › ${capitalise(s.label)}`; const sec=(base.secondary||[]).find(x=>x.tertiary?.includes(str)); if(sec && sec.tertiary.includes(str)) return `${base.label} › ${capitalise(sec.label)} › ${capitalise(str)}`; }
    return capitalise(str);
  }

  function parsePinToPath(id){
    const str=String(id||'');
    if(str.includes(':')){
      const [secId, t]=str.split(':');
      for(const base of BASES){ const s=findSecondary(base,secId); if(s) return [base.id, s.id, t]; }
    }
    const b=findBase(str); if(b) return [b.id];
    for(const base of BASES){ const s=findSecondary(base,str); if(s) return [base.id, s.id]; }
    return [str];
  }

  function getInfoForId(id){
    const path=parsePinToPath(id); const idsLower=path.map(x=>String(x).toLowerCase());
    for(const key of idsLower.slice().reverse()){ if(EMOTION_INFO[key]) return EMOTION_INFO[key]; }
    return EMOTION_INFO[idsLower[0]]||null;
  }

  function titleForId(id){
    const path=parsePinToPath(id); const base=findBase(path[0]); if(!base) return prettyLabel(id);
    if(path.length===1) return base.label;
    if(path.length===2){ const s=findSecondary(base,path[1]); return `${base.label} › ${capitalise(s?.label||path[1])}`; }
    const s=findSecondary(base,path[1]); return `${base.label} › ${capitalise(s?.label||path[1])} › ${capitalise(path[2])}`;
  }

  function show(){
    const el=document.getElementById('app-content'); if(!el) return; window.applyFullWidthLayout(); ensureStyles();
    el.innerHTML=`
      <div class="px-4 md:px-6 py-6">
        <div class="flex items-end justify-between flex-wrap gap-2 mb-4">
          <h2 class="text-xl font-semibold">Emotion Compass</h2>
          <div class="text-xs opacity-70">Explore the wheel and pin what fits.</div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-8 xl:col-span-9">
            <div id="compass-graph" class="relative w-full overflow-hidden" style="height:520px"></div>
          </div>
          <aside class="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-16 self-start">
            <div id="compass-details"></div>
          </aside>
        </div>
      </div>`;
    selectedPath=[]; expandedBase=null; expandedSecondary=null; renderGraph(); renderDetails();
  }

  function onVisibility(){ }
  function start(){ }
  function stop(){ }

  window.addEventListener('resize',()=>{ const host=document.getElementById('compass-graph'); if(host){ renderGraph(); } });
  document.addEventListener('themechange',()=>{ const host=document.getElementById('compass-graph'); if(host){ renderGraph(); } });

  window.CompassModule={ show, onVisibility, start, stop };
})();
