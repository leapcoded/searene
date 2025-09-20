(function(){
  /*
    Somatic exercises instructions expansion plan
    - Short: current one-line "How to" descriptions (quick cue). Good for fast scanning.
    - Medium: 2–3 sentence guidance with optional timing and safety note (recommended default).
    - Long: full step-by-step instructions with variations, contraindications, and suggested duration.
    Implementation options:
    - Add fields to ITEMS: `how_short`, `how_medium`, `how_long`, and a UI toggle to expand level.
    - Or keep compact list and open a detail pane when a row is clicked showing Medium/Long text.
  */
  const KEY='somatic_pins';
  const VERSION_KEY='somatic_version';
  const CURRENT_VERSION='v2';
  const ITEMS=[
    // Self-Skills: Prepared and Grounded (1–7)
    {id:'t01-body-snapshot', title:'Taking a Body Snapshot for the Day', cat:'self-skill', desc:'Pause for a minute with eyes closed and a slow breath. Ask: How is my body today? What sensations are present? If a body part could speak, what would it say? Note your baseline.', how_medium:`Pause for a minute with eyes closed and a slow breath. Ask: How is my body today? What sensations are present? If a body part could speak, what would it say? Note your baseline. Try this for 1–2 minutes and gently observe any changes in breath, tension, or ease; stop if anything feels uncomfortable.`},
    {id:'t02-back-body-awareness', title:'Back-Body Awareness for Therapy Readiness', cat:'self-skill', desc:'Sit aligned (head over shoulders/hips), tuck chin slightly, close your eyes. Sense the whole back and spine supported by the chair to settle and align.', how_medium:`Sit with a relaxed alert posture, head stacked over shoulders and hips. Tuck your chin slightly and close your eyes. Bring awareness to the full length of your back and feel the chair supporting your spine. Stay here for 1–2 minutes and notice any softening or shifts in breath; pause if you feel strain.`},
    {id:'t03-grounding-through-body', title:'Grounding Through the Body', cat:'self-skill', desc:'Check-in: name your current state without judgment. Grounding: place a hand where agitation is, breathe, press feet into the floor with slow rhythmic steps; pause and notice change.', how_medium:`Begin with a quick non-judgmental check-in naming your state. Place a hand over the area of agitation and breathe into that spot; then press your feet gently into the floor and make slow, small steps as if pushing into the ground. Continue for 1–3 minutes, noticing any settling; if sensations intensify, reduce intensity or stop.`},
    {id:'t04-shaking-it-off-lying', title:'Shaking It Off (Laying Down)', cat:'self-skill', desc:'Lie with knees bent, feet on floor. Gently press into feet to create a soft rocking; let any shakiness move through and into the ground. Up to 5 minutes; then rest and notice the after-effect.', how_medium:`Lie on your back with knees bent and feet flat. Soften and notice any internal shakiness, then allow gentle rhythmic rocking by pressing into the feet and letting motion move through the body. Continue gently for up to 3–5 minutes, then pause and notice how you feel; stop if movement increases distress.`},
    {id:'t05-internal-support-team', title:'Calling the Internal Support Team', cat:'self-skill', desc:'Sit quietly, close eyes, breathe. Visualize 3–5 unconditional supports seated behind you, sending strength. Notice posture and breath deepen as you feel their presence.', how_medium:`Sit comfortably and take a centering breath. Visualize 3–5 people (real or imagined) who provide unconditional support seated behind you; imagine them offering qualities like warmth, steadiness, or courage. Breathe for 1–2 minutes while sensing their presence and notice any change in posture or breath; return to the present slowly.`},
    {id:'t06-self-resourcing-floor', title:'Self-Resourcing — Floor Work', cat:'self-skill', desc:'Lie on your side and feel the support of the ground. Slowly sweep the top arm across the floor and overhead, creating a gentle torso twist; switch sides. Move slowly with breath.', how_medium:`Lie on your side and feel the ground supporting you. With slow, deliberate breaths, drag the top arm across the floor and overhead, creating a gentle twist through the upper torso; move slowly and with intention. Repeat on the other side for 1–2 minutes each, watching for any discomfort and pausing if needed.`},
    {id:'t07-burnout-somatic-inventory', title:'Somatic Inventory of Burnout Signs', cat:'self-skill', desc:'Review a burnout checklist; then sit/lie down, visualize a stressful scene, locate agitation in the body, sketch it, and name three qualities your body needs right now.', how_medium:`Start by scanning a checklist of common burnout signs (fatigue, irritability, disconnection). Then sit or lie down, bring to mind a mildly stressful scene, and notice where agitation shows up in the body. Sketch or note that area and name three supportive qualities your body needs (rest, warmth, boundary). Spend 5–10 minutes reflecting and avoid pushing into intense distress.`},

    // Therapeutic Attitude When Working with the Body (8–20)
    {id:'t08-open-attention', title:'Open Attention Technique', cat:'attitude', desc:'Sit comfortably; let attention soften and widen in 360°. Let focus rest where it lands, then gently widen again, simply being with what is present.', how_medium:`Sit with a soft posture and allow your attention to rest broadly across the whole field of experience. Notice sensations, sounds, and thoughts without fixating; when something draws attention, let it be and then widen again. Practice for 1–3 minutes, noticing how the quality of attention shifts without forcing change.`},
    {id:'t09-focused-attention', title:'Focused Attention', cat:'attitude', desc:'Choose one focus (breath at nostrils, chest sensation, or a thought). Keep attention there, returning gently whenever it wanders, until a shift occurs.', how_medium:`Choose a single anchor—breath at the nostrils, a chest sensation, or a simple image. Rest your attention there and gently return whenever the mind wanders. Continue for 2–5 minutes or until you notice increased steadiness; stop if you feel tense and switch to open attention.`},
    {id:'t10-attention-shifting', title:'Moving Between Open and Focused Attention', cat:'attitude', desc:'Alternate: wide open attention → one specific body spot with a full breath → back to open. Repeat and notice any still point between modes.', how_medium:`Begin with wide open attention, sensing everything. Then narrow to a specific spot in the body and take a full breath there. Cycle back to open attention and repeat several times, looking for the still point between modes. Do 4–6 cycles and notice any changes in clarity or calm.`},
    {id:'t11-experiential-invitation', title:'“Let’s Experiment” Experiential Invitation', cat:'attitude', desc:'Invite exploration with non-judgmental questions: What quality does that have? What movement fits? Where is it in your body? What impulse goes with this feeling?', how_medium:`Use open, curious questions to invite exploration rather than analysis. Ask: What quality does this feeling have? What movement, if any, wants to happen? Where is the sensation located? Allow short, safe experiments for 1–2 minutes and reflect on what emerges.`},
    {id:'t12-empathic-statements', title:'Making Empathic Statements', cat:'attitude', desc:'Use short present-moment reflections to validate: “You seem sad.” “There’s a lot of energy there.” “I sense something challenging.” “That is painful for you.”', how_medium:`Practice brief, present-tense reflections that name observable experience. Keep statements concise and grounded in what you see or sense (e.g., “You seem tired” or “There’s a lot happening in your chest”). Use this approach for immediate validation in sessions and notice if the person relaxes or adjusts.`},
    {id:'t13-right-questions', title:'Asking the Right Questions', cat:'attitude', desc:'Aim questions at the body: “What kind of sadness is this?” “How deep does that tension go?” “What sound would this feeling make?”', how_medium:`Frame questions so they invite inward attention to bodily experience rather than intellectual answers. Ask one question at a time and give space for sensations to arise. Use follow-up prompts if needed and observe whether insight or movement appears over several breaths.`},
    {id:'t14-guiding-into-soma', title:'Guiding into the Soma', cat:'attitude', desc:'Five steps: Tune in → Stay with it → Explore → Notice what wants to happen → Reflect: is it easier to be with now?', how_medium:`Guide the client step-by-step: tune into the sensation, stay with it, explore qualities, sense what wants to happen, then reflect together. Pause between steps to allow slow sensing. Use this formula for 5–10 minutes to deepen somatic inquiry while monitoring safety.`},
    {id:'t15-what-else', title:'What Else?', cat:'attitude', desc:'After a report, ask “What else?” a few times. Notice new sensations, images, or insights that emerge beyond the first description.', how_medium:`After someone names an experience, simply ask “What else?” and wait. Repeat a few times, allowing layers of sensation or image to surface. Limit to 3–4 prompts and notice whether new information arises or the person becomes overwhelmed.`},
    {id:'t16-listening-to-body', title:'Listening to the Body', cat:'attitude', desc:'Get comfortable, do a quick body scan, then open attention to the whole body. Optionally bring a simple life question and notice the body’s response.', how_medium:`Settle the person comfortably, guide a brief body scan, then open attention to the whole body. Optionally invite a simple question (e.g., “What do I need now?”) and notice bodily responses. Spend 3–5 minutes and reflect on subtle signals that arise.`},
    {id:'t17-five-kinds-tracking', title:'5 Kinds of Tracking', cat:'attitude', desc:'Track: (1) story content, (2) body cues, (3) autonomic signs (breath/skin), (4) underlying meaning, (5) what’s unspoken.', how_medium:`Use this five-fold framework to notice different channels: story, body expression, autonomic cues, underlying meaning, and what remains unspoken. Practice tracking each briefly during a short interaction and note patterns. Use findings to inform gentle interventions rather than judgments.`},
    {id:'t18-tracking-body-checklist', title:'Tracking the Body Checklist', cat:'attitude', desc:'Use a checklist to observe posture, tensions, eyes, face, gestures, voice during sessions to reveal patterns.' , how_medium:`Keep a simple checklist handy during sessions to mark posture, tension hotspots, eye behavior, gestures, and voice. Afterward, reflect on recurring patterns and consider small interventions to test changes. Use this as a training tool rather than a strict diagnostic form.`},
    {id:'t19-trauma-cues-tracking', title:'Tracking for Trauma Cues', cat:'attitude', desc:'Watch early signs of hyper/hypo-arousal across body, eyes, mind, and emotion—subtle shifts in skin tone, eye contact, and breathing.' , how_medium:`Learn to notice early trauma cues: breath changes, gaze aversion, muscle bracing, or dissociative flattening. Gently document these signs and use grounding or orienting interventions when arousal increases. Prioritize safety and avoid pushing for memory retrieval.`},
    {id:'t20-tracking-my-body-chart', title:'Tracking My Body Chart', cat:'attitude', desc:'Choose one body area to track for 5 days: note feelings, triggers, what helps; reflect on changes in awareness.' , how_medium:`Select one body part to observe daily for five days. Note how it feels, triggers, and helpful actions (breath, touch, movement). After the tracking period, review patterns and small steps that produced change; stop if tracking increases distress.`},

    // Mindfulness and Body (21–27)
    {id:'t21-induce-mindfulness', title:'How to Induce Mindfulness', cat:'mindfulness', desc:'Guide via imagery (safe place) or body sensation (contact, breath). Use a soothing voice to anchor attention in the present.', how_medium:`Lead with a gentle instruction: choose an imagery anchor (safe place) or a body contact anchor (feet on floor, breath). Use a calm, steady voice and invite simple observation without analysis. Practice for 3–5 minutes and notice whether attention steadies.`},
    {id:'t22-suspend-the-moment', title:'Cultivating Self-Witnessing — Suspend the Moment', cat:'mindfulness', desc:'Hit an imaginary pause before acting; notice body and mind without judgment; then resume and observe any difference.' , how_medium:`Use a quick internal pause when you notice reactivity—take one breath, scan the body, note a single sensation, then proceed. Try this a few times during the day to test whether reflexive actions shift. Keep it brief and non-judgmental.`},
    {id:'t23-befriending-body', title:'Befriending the Body', cat:'mindfulness', desc:'Lie down, slow your breath, move attention through the body and breathe kindness into tense areas (“I welcome you”).', how_medium:`Lie comfortably, slow the breath, and guide attention gently through the body. When you find tension, breathe into it and offer kind phrases silently (e.g., “I welcome you”). Spend 5–10 minutes if time allows and stop if you feel overwhelmed.`},
    {id:'t24-relaxing-rest', title:'Relaxing Rest', cat:'mindfulness', desc:'Lie with knees bent, melt into the floor, imagine a resting animal, and let go of effort as you breathe.' , how_medium:`Lie comfortably with knees bent and let the body soften into the floor. Use imagery of a relaxed animal (a resting lion) to invite surrender of effort. Stay here for 5–10 minutes, focusing on gentle breath and allowing release to happen gradually.`},
    {id:'t25-moving-body-scan', title:'Moving Body Scan', cat:'mindfulness', desc:'Make tiny, slow “micro-movements” from head downward (like seaweed). Track internal sensations as you move.' , how_medium:`Stand or sit and make very small, slow movements starting at the head and moving down the body. Notice how subtle motion changes internal sensation without forcing range. Practice for 2–4 minutes and observe subtle shifts in attention and comfort.`},
    {id:'t26-walking-meditation', title:'Walking Meditation', cat:'mindfulness', desc:'Walk slowly with eyes lowered, attend to the rhythm and sensation of each step; let thoughts pass.' , how_medium:`Walk slowly and deliberately, attending closely to the sensation of each step and the rhythm of the feet. Keep the gaze soft and allow thoughts to pass without grabbing them. Continue for 5–10 minutes or a shorter period if needed.`},
    {id:'t27-earth-mindfulness', title:'Simple Earth Mindfulness', cat:'mindfulness', desc:'Lie on the floor; feel the ground hold you. Imagine the Earth breathing with you, meeting you at the back of your lungs.' , how_medium:`Lie on the floor and feel the contact points where the ground supports you. Imagine the Earth breathing with you, meeting each exhale at the back of the lungs. Stay present for a few minutes, softening with each breath and returning gently if the mind wanders.`},

    // Body Awareness and Body Reading (28–34)
    {id:'t28-global-awareness-body', title:'Global Awareness of Body', cat:'body-awareness', desc:'Lie down 3–5 minutes, eyes closed. Let attention roam freely through the body, noticing whatever arises without directing it.' , how_medium:`Set a 3–5 minute timer and lie down with eyes closed. Allow attention to roam naturally through the body and notice sensations that arise without trying to fix or change them. After the period, take a slow breath and note one insight or shift.`},
    {id:'t29-body-awareness-inventory', title:'Body Awareness Inventory', cat:'body-awareness', desc:'Use descriptive words (e.g., pulsing, calm, burning) to label current body sensations and feelings.' , how_medium:`Use a word bank of sensations (pulsing, calm, burning, tight) to describe what you notice in the body right now. Spend a few minutes listing and locating these sensations, then choose one and breathe into it for a minute to see if it changes.`},
    {id:'t30-naming-present-experience', title:'Naming Your Present-Moment Experience', cat:'body-awareness', desc:'Complete prompts like “I feel (emotion) and sense (sensation)” to link feelings with bodily experience.' , how_medium:`Fill in simple prompts such as “I feel ___ and sense ___ in my body.” Take a minute to sit with each pairing and notice how language changes felt experience. Use this practice for 1–3 minutes to strengthen mind–body connection.`},
    {id:'t31-identifying-body-themes', title:'Identifying Body Themes', cat:'body-awareness', desc:'Ask different body areas, “If this part could talk, what would it say?” Repeat slowly to uncover deeper themes.' , how_medium:`Slowly attend to different body areas and ask, “If this part could speak, what would it say?” Allow short, evocative phrases to emerge and note patterns across regions. Spend 5–10 minutes and reflect on any recurring messages.`},
    {id:'t32-somatic-beliefs-self', title:'Somatic Beliefs of Self', cat:'body-awareness', desc:'Map sensations, then note related emotional beliefs (“heavy burden”) and thoughts (“It’s my fault”).' , how_medium:`Map current sensations on a page and next to each write related emotional beliefs and thoughts. Notice how the physical and narrative parts connect. Use this as a short reflective exercise (10–15 minutes) and avoid pushing into painful memories without support.`},
    {id:'t33-mapping-body', title:'Mapping the Body', cat:'body-awareness', desc:'On a body outline, draw or color areas of interest (pain, tension, flow) to externalize your inner landscape.' , how_medium:`Use a simple body outline and color or mark areas that feel notable (pain, tension, warmth). Label each area with a word or short phrase and sit with what you mapped for a few minutes. This externalization helps reveal patterns and is helpful before planning interventions.`},
    {id:'t34-body-reading-therapist', title:'Body Reading for the Therapist', cat:'body-awareness', desc:'With soft eyes, note body facts; playfully imagine what the body communicates (animal, shape), then relate themes and feelings.' , how_medium:`Observe a client's posture and gestures with soft eyes, noting concrete facts (shape, tension, breath). Use a playful metaphor (animal, landscape) to surface themes, then check hypotheses with gentle questions. Keep this as an observational tool rather than a fixed interpretation.`},

    // The Somagram and Body Parts (35–40)
    {id:'t35-somagram-1', title:'Somagram #1', cat:'somagram', desc:'On a body outline, shade areas of sensation with colors. Title the drawing with the first phrase that comes to mind.' , how_medium:`Take a body outline and shade areas where sensations are strong using colors. Give the drawing a short title that captures your first impression and spend a minute reflecting on the labeled areas. Use this as a visual anchor for further work.`},
    {id:'t36-somagram-2-free-charting', title:'Somagram #2 — Free Charting', cat:'somagram', desc:'On one page, chart how you feel inside vs. how you see your outer body; reflect on differences and links.' , how_medium:`On a single page, draw inner sensations on one side and the outer body image on the other. Compare differences and note any surprises or connections. Spend 10–15 minutes and use findings to guide compassionate inquiry.`},
    {id:'t37-left-right-split', title:'Left/Right Body Split', cat:'somagram', desc:'Notice differences between left and right sides (sensation, tension). Chart what each side is “saying.”' , how_medium:`Slowly scan left and right sides of the body, noting asymmetries in sensation, tension, or energy. Write down brief descriptors for each side and consider whether different experiences map to different roles or memories. Do this for 5 minutes and be curious rather than corrective.`},
    {id:'t38-upper-lower-split', title:'Upper/Lower Body Split', cat:'somagram', desc:'Tune into upper vs. lower halves; list differing qualities (e.g., mind active, legs numb).', how_medium:`Attend to upper and lower halves separately, noting qualities (e.g., upper: busy, lower: grounded or numb). Jot down observations and breathe into any areas that feel disconnected. Spend several minutes to notice shifts and integrate findings.`},
    {id:'t39-front-back-split', title:'Front/Back Body Split', cat:'somagram', desc:'Sense front, then back body. Chart differences and any areas of bracing or holding back.' , how_medium:`Alternately sense the front and back of your body, noting where you brace or hold. Mark these on a quick sketch and reflect on what each side might be protecting or expressing. Use this as a short inquiry tool for 5–10 minutes.`},
    {id:'t40-body-splits', title:'Body Splits', cat:'somagram', desc:'List areas that feel disconnected (e.g., feel arm but not hand) and draw them on a body outline to acknowledge them.' , how_medium:`Identify areas that feel split or disconnected and draw them on a body outline. Name the differences and consider small movements or attention shifts to reconnect them. Practice gentle reconnection for a few minutes and stop if it feels aversive.`},

    // Presence, Perception and Sensations (41–48)
    {id:'t41-soft-vision', title:'Soft Vision', cat:'perception', desc:'Focus, then soften your gaze to a gentle blur. Rest eyes closed, reopen, and practice a wide, relaxed view.' , how_medium:`Focus on an object and then soften your gaze until the edges blur. Close your eyes to rest and then reopen, maintaining a wider, gentler visual field. Practice for 1–2 minutes to reduce eye strain and invite calm.`},
    {id:'t42-gentle-head-lift', title:'Gentle Head Lift', cat:'perception', desc:'Seated or standing, slowly lift head as if floating, then bow toward heart. Move slowly without strain.' , how_medium:`With slow, supported movement, lift the head as if it were floating and then bow toward the heart. Move with the breath and avoid force. Repeat 3–5 times, noticing release in the neck and upper back.`},
    {id:'t43-hands-over-eye-sockets', title:'Hands Over Eye Sockets', cat:'perception', desc:'Elbows on knees, cup palms over eyes without pressure. Feel darkness and warmth; take three deep breaths.' , how_medium:`Sit comfortably, rest elbows on knees, and cup palms over your eye sockets without pressing. Breathe deeply three times and notice warmth, darkness, and relaxation across the face. Use this as a quick reset for 30–60 seconds.`},
    {id:'t44-sensing-fluid-brain', title:'Sensing Your Fluid Brain', cat:'perception', desc:'Hands on sides of head; gentle squeeze on exhale, release on inhale. Make tiny internal head movements to ease strain.' , how_medium:`Place hands gently on the sides of your head and on each exhale provide a light, soothing squeeze, releasing on the inhale. Then make very small, internal head movements to sense fluidity and ease. Practice for 1–2 minutes; discontinue if it causes dizziness.`},
    {id:'t45-spaces-in-between', title:'The Spaces In-Between', cat:'perception', desc:'Notice space between objects, then between your fingers. Close eyes and sense that space to enhance proprioception.' , how_medium:`Gently shift attention to the space between objects and then between your fingers. With eyes closed, try to sense that spacing internally and notice any change in proprioceptive awareness. Spend 1–2 minutes exploring this wide, invitational attention.`},
    {id:'t46-dual-awareness', title:'Dual Awareness', cat:'perception', desc:'Attend to breath, then include ambient sounds. Practice holding both in awareness without overwhelm.' , how_medium:`Start by focusing on the breath, then widen to include sounds around you while keeping the breath as an anchor. Practice holding both channels for short periods (1–3 minutes) and notice whether you feel more grounded and tolerant of complexity.`},
    {id:'t47-bumper-stickers', title:'Bumper Stickers — Body Reminders', cat:'perception', desc:'Place simple reminder notes (“Be present with your body”) where you’ll see them to prompt check-ins.' , how_medium:`Create small reminder notes with short cues like “Be present with your body” and place them where you’ll see them throughout the day. Use these prompts to pause for 30 seconds and check in with breath and posture. Over time, these cues can help build habitual awareness.`},
    {id:'t48-sensing-space', title:'Sensing Space', cat:'perception', desc:'Attend to space in front, above, and all around you. If in pain, attend to space around the area, as if circling it.' , how_medium:`Bring attention to the space in front of, above, and around your body. If an area is painful, imagine moving around its perimeter and sensing the space around it rather than pushing into the pain. Spend a few minutes allowing space to soften reactivity.`},

    // Movement Interventions (49–58)
    {id:'t49-unfurling', title:'Unfurling', cat:'movement', desc:'Start curled forward; slowly unfurl the spine to upright, savoring the opening to evoke confidence.' , how_medium:`Begin curled and allow an intentional unfolding of the spine to upright in slow, mindful increments. Move with breath and notice sensations of opening; do this for 1–2 minutes and let confidence arise naturally rather than forcing posture.`},
    {id:'t50-wet-sandbag', title:'Wet Sandbag', cat:'movement', desc:'Lie down and roll slowly by shifting your body’s “sand” weight, letting gravity guide the motion.' , how_medium:`Lie on your back and imagine your body as a wet sandbag; slowly initiate rolls by shifting weight and letting gravity lead. Move gently without force, noticing how the body yields and shifts. Continue for several slow rolls and pause if any sharp pain arises.`},
    {id:'t51-micro-movement-neck', title:'Micro-Movement in Neck', cat:'movement', desc:'Make tiny nose circles or figure-eights, as if on fogged glass—barely visible, easing neck tension.' , how_medium:`Make extremely small, slow circles or figure-eights with the head, as if drawing on fogged glass with the nose. Keep movements small enough to avoid strain and notice internal release rather than range. Practice for 1–2 minutes and stop if there is discomfort.`},
    {id:'t52-opening-horizon', title:'Opening the Horizon', cat:'movement', desc:'Stand rooted; inhale lifting gaze/arms, exhale lowering gaze/arms like compressing an air bubble; repeat slowly.' , how_medium:`Stand with feet rooted and coordinate inhalation with lifting gaze and arms, exhaling as you lower. Move slowly and with awareness of the breath-body link. Do 6–10 cycles and notice how the chest and throat shift with breath.`},
    {id:'t53-walking-with-aim', title:'Walking with Aim', cat:'movement', desc:'Pick a focal point; walk there with clear intention, then choose another. Harness single-focused attention.' , how_medium:`Choose a small target in the room and walk toward it with clear intention, noticing foot contact and rhythm. Pause, pick another target, and repeat. Use this as a short practice (2–5 minutes) to channel restlessness into focused movement.`},
    {id:'t54-mirror-mirror', title:'Mirror, Mirror', cat:'movement', desc:'With a partner, one moves slowly while the other mirrors exactly, evoking connection and being seen.' , how_medium:`Sit or stand facing a partner and take turns leading slow, simple movements while the other mirrors. Keep actions gentle and non-competitive; notice how mirroring cultivates attunement and safety. Practice for 3–5 minutes and debrief briefly.`},
    {id:'t55-movement-play-beliefs', title:'Movement Play and Beliefs', cat:'movement', desc:'Partners alternate small hand movements and variations to explore boundaries and playful beliefs safely.' , how_medium:`With a partner, take turns making small hand or arm movements and inviting playful variation. Notice beliefs or stories that arise about what is allowed in movement and experiment with gentle alternatives. Keep this short and light—2–5 minutes—and check in about feelings afterward.`},
    {id:'t56-figure-8-resource', title:'Figure 8 Resource Movement', cat:'movement', desc:'Feet wide; imagine sit bones painting a figure eight. Let hips find a soothing rhythm.' , how_medium:`Stand with feet wider than hip-width and imagine the sit bones tracing a slow figure-eight on the floor. Follow the rhythm and feel the bilateral, calming pattern in the pelvis. Continue for 1–3 minutes and let breath guide the rhythm.`},
    {id:'t57-defending-arms', title:'Defending Arms', cat:'movement', desc:'Practice “halt” hands and pushing motions to contact assertiveness and safe boundaries.' , how_medium:`Practice simple defensive arm shapes—hands out in a stop position or a gentle push—while noticing the felt sense of boundary. Keep movements small and controlled, exploring how the body organizes for protection. Use for a few minutes and breathe steadily.`},
    {id:'t58-orienting-movements', title:'Orienting Movements', cat:'movement', desc:'Slowly turn head to scan the room; return to center; repeat sides to re-establish safety and presence.' , how_medium:`Slowly turn the head and eyes to the left and right, letting the body follow the gaze. Pause between sides and notice how orientation to the environment shifts felt safety. Repeat 3–6 times and use this as a quick safety reset.`},

    // Boundaries (59–67)
    {id:'t59-body-boundary', title:'Body Boundary', cat:'boundary', desc:'Slowly contract a muscle group (hands, belly), then slowly release to feel your boundary and relaxation.' , how_medium:`Gently contract a muscle group such as the hands or belly for a few seconds, then release slowly and notice the edge of your body boundary. Repeat across different groups to sense where boundary and containment live. Practice 1–2 rounds for grounding.`},
    {id:'t60-extending-physical-boundary', title:'Extending a Physical Boundary', cat:'boundary', desc:'With a partner, practice extending arm, turning head, or saying “no,” sensing assertive space.' , how_medium:`With a willing partner, practice small assertive gestures—extending an arm, turning the head, or practicing a brief verbal boundary like “no.” Notice bodily sensations that accompany assertiveness and practice until it feels embodied. Keep exercises short and consensual.`},
    {id:'t61-muscle-tone-boundary', title:'Muscle Tone Boundary', cat:'boundary', desc:'Contract and release various muscle groups 1–2 times, emphasizing the slow, controlled release for inner strength.' , how_medium:`Systematically contract and slowly release muscle groups (hands, arms, abdomen) one or two times each. Focus on slow control and the felt boundary between contraction and release. Use this as a 2–5 minute practice to cultivate internal tone and presence.`},
    {id:'t62-wrapping-own-space', title:'Wrapping Yourself into Your Own Space', cat:'boundary', desc:'Wrap a light blanket/shawl around shoulders or torso; sense pressure and the comfort of containment.' , how_medium:`Wrap a light shawl or blanket around your shoulders and notice the gentle pressure. Breathe into the contained feeling and observe sensations of safety and containment. Use for a few minutes as a comforting practice, especially after stressful moments.`},
    {id:'t63-personal-space-exploration', title:'Personal Space Exploration', cat:'boundary', desc:'On a worksheet, draw where you’d place yourself relative to another across relationships; reflect on distances.' , how_medium:`On paper, draw circles representing comfortable distances for different relationships (friend, partner, stranger). Reflect on why distances vary and how your body responds in each zone. Spend 10–15 minutes exploring and journaling insights.`},
    {id:'t64-boundary-homework', title:'Boundary Homework for Personal Space', cat:'boundary', desc:'Answer questions about your boundaries and draw your personal space; imagine its color or material.' , how_medium:`Complete a brief worksheet about your ideal personal space, noting colors, materials, and limits. Practice imagining and then acting within that boundary in small, safe scenarios. Use this as a reflective homework task over several days.`},
    {id:'t65-redrawing-boundary', title:'When Boundary Is Violated — Re-drawing the Territory', cat:'boundary', desc:'Visualize your body boundary and the violator. Write a statement reclaiming space and motivation to assert boundaries.' , how_medium:`If a boundary is violated, find a quiet moment to visualize your body boundary and then imagine redrawing it firmly. Write a short statement reclaiming your territory and a small action you can take to assert it. Keep actions safe and incremental.`},
    {id:'t66-personal-space-relation', title:'Personal Space in Relation', cat:'boundary', desc:'Visualize someone easy and someone challenging; draw ideal distances and reflect on differences.' , how_medium:`Visualize two people—one you feel comfortable with and one you find challenging. Draw ideal distances for each and reflect on sensations, history, and expectations that shape those distances. Spend 10 minutes on this mapping and note one small experiment you might try.`},
    {id:'t67-string-exercise-relationship', title:'String Exercise in Relationship', cat:'boundary', desc:'Facing a partner, each makes a circle with a string to mark space; experiment with distance and felt sense.' , how_medium:`With a partner, use a string to create personal space circles. Experiment with stepping in and out and notice felt responses—where you feel safe or exposed. Use this playfully and stop if someone feels discomfort.`},

    // Posture (68–73)
    {id:'t68-lengthy-spine', title:'The Lengthy Spine', cat:'posture', desc:'Stand, then imagine a gentle lift through the crown, lengthening (not straightening) the spine for ease.' , how_medium:`Stand and imagine a gentle upward lift from the crown, lengthening the spine without rigid straightening. Allow the pelvis and ribs to stay soft and breathe into the expansion. Do this for 30–60 seconds and notice subtle postural ease.`},
    {id:'t69-grounding-through-spine', title:'Grounding Through the Spine', cat:'posture', desc:'Stack vertebrae from base to neck, mindfully straightening; pause and note mood/attention shift.' , how_medium:`Slowly stack the vertebrae by tilting the pelvis and lengthening upward through the torso, pausing at each small adjustment. Notice changes in mood and breath as you align. Practice briefly (30–90 seconds) and avoid forcing the spine.`},
    {id:'t70-inner-alignment', title:'Inner Alignment', cat:'posture', desc:'Sit upright; gently rock to find center; visualize a column of light from crown to seat and organize around it.' , how_medium:`Sit upright, rock gently to find a centered balance, and visualize a column of light from crown to seat. Organize micro-adjustments around this axis and breathe into alignment. Practice for 1–2 minutes and observe internal steadiness.`},
    {id:'t71-somatic-strength-posture', title:'Somatic Strength Posture', cat:'posture', desc:'Stand with feet grounded; lift shoulders and arms overhead for 1–2 minutes, sensing strength.' , how_medium:`Stand with feet firmly grounded and lift arms overhead, sensing strength throughout the body. Hold for 30–90 seconds with steady breath, noticing internal sensations of power and support. Lower slowly and notice energetic changes.`},
    {id:'t72-posture-snapshot', title:'Posture Snapshot', cat:'posture', desc:'Briefly close eyes; take a quick inner snapshot of posture; write first impressions. Repeat two more times.' , how_medium:`Close your eyes briefly and take an inner snapshot of your posture—how is your head, spine, and shoulders? Jot down first impressions and repeat two more times to notice small changes. Use this quick check multiple times per day to recalibrate.`},
    {id:'t73-draw-your-skeleton', title:'Draw Your Skeleton', cat:'posture', desc:'Draw front/side/back of your skeleton. Reflect on inner support and a word for your alignment.' , how_medium:`Sketch a simple front/side/back skeleton and reflect on how it supports your posture. Choose a word that captures inner alignment and use it as a prompt to adjust posture gently. Spend 10–15 minutes on this reflective drawing.`},

    // Gesture and Non-Verbal Communication (74–77)
    {id:'t74-nonverbal-communications-chart', title:'Non-Verbal Communications Chart', cat:'gesture', desc:'Use a chart to track posture, tone, gestures, facial expressions to reveal patterns.' , how_medium:`Use a simple chart to record nonverbal signals—posture, gestures, facial expressions, and voice quality—during a short interaction. Review patterns and consider subtle behavioral adjustments. Keep observations descriptive and compassionate.`},
    {id:'t75-tracking-meaning-gestures', title:'Tracking the Meaning of Gestures', cat:'gesture', desc:'Observe a gesture, note context and emotion, form a compassionate hunch, then confirm with the client.' , how_medium:`Observe a client's gesture in context, note associated emotion and story, and form a tentative, compassionate hypothesis. Check your hunch with a gentle question rather than asserting interpretation. Use this as an exploratory tool for better attunement.`},
    {id:'t76-centered-hands', title:'Centered Hands', cat:'gesture', desc:'Stretch arms wide, then bring them slowly to the center of the chest; dwell at the meeting point to center.' , how_medium:`Stretch arms out and slowly bring them to meet at the center of the chest, dwelling for a few breaths. Notice how the meeting point feels and use it as a grounding midline anchor. Repeat 2–3 times.`},
    {id:'t77-midline-gestures', title:'Midline Gestures', cat:'gesture', desc:'Touch crown, solar plexus, navel, lower abdomen; gently pivot around the midline to organize energy.' , how_medium:`Touch the midline points—crown, solar plexus, navel—and gently pivot around the axis to sense organization. Notice how energy shifts as you move around the midline and use slow breaths to anchor.`},

    // Emotions and Self-Regulation (78–83)
    {id:'t78-meaning-making-high-low', title:'Meaning Making: High-Road vs. Low-Road', cat:'emotions', desc:'Journal about a rational vs. body-based decision; compare outcomes and values in your process.' , how_medium:`Write briefly about one rational and one body-based decision, comparing outcomes and values. Reflect on how each mode influenced action and what you learned. Spend 10–15 minutes on this reflective practice.`},
    {id:'t79-emotions-chart-self-assessment', title:'Emotions Chart — Self-Assessment and Themes', cat:'emotions', desc:'Rate themes (e.g., safety, worth), circle core beliefs, and reflect on body impacts.' , how_medium:`Rate emotional themes on a simple scale and circle core beliefs that stand out. Note how each rating maps onto body sensations and consider small experiments to shift unhelpful beliefs. Use this as a short self-assessment exercise.`},
    {id:'t80-lean-back-lean-in', title:'Lean Back to Lean In', cat:'emotions', desc:'When agitated, physically lean back to interrupt reactivity, then re-engage from a calmer stance.' , how_medium:`When you notice agitation, take a moment to physically lean back—change posture to interrupt reactivity. After a breath or two, lean back in with renewed calm and observe the difference in response. Repeat as needed to reset.`},
    {id:'t81-managing-too-much', title:'Managing the “Too Much”', cat:'emotions', desc:'With eyes open, take a room “snapshot,” close eyes, note one detail. Repeat to focus on bite-sized inputs.' , how_medium:`Take a quick visual snapshot of the room, close your eyes, and note one detail that stands out. Repeat this narrowing process two or three times to reduce overwhelm and bring focus back to present-moment details. Use for 1–2 minutes during high stress.`},
    {id:'t82-sailing-midline', title:'Sailing the Midline', cat:'emotions', desc:'Cross right arm to left, then left to right, exhaling each time to return to center.' , how_medium:`Cross one arm over the midline to the opposite side and exhale as you do, then switch sides. Use slow, deliberate motion to re-center and integrate breath with movement. Continue for 1–2 minutes.`},
    {id:'t83-sitting-run', title:'Sitting Run', cat:'emotions', desc:'Seated, alternately press feet into the ground to walk-in-place, calming energy and shifting focus.' , how_medium:`While seated, alternately press feet into the floor to simulate a gentle walking rhythm, coordinating with breath. Use this to calm nervous energy and re-engage body sensation for 30–90 seconds.`},

    // Body and Self-Image (84–87)
    {id:'t84-body-image-inside-out', title:'Body Image — Inside-Out vs. Outside-In', cat:'body-image', desc:'Journal on external vs. internal body perception; notice effects after mirror/social media critique.' , how_medium:`Journal briefly on how external appearance and internal felt sense differ for you. Notice emotional tone and body reactions to each perspective and reflect on how you might privilege inner experience. Spend 10 minutes and be kind to yourself.`},
    {id:'t85-shifting-perception', title:'Shifting the Perception', cat:'body-image', desc:'Stand at a mirror; peek, then close eyes and focus on internal sensations, prioritizing felt sense over looks.' , how_medium:`Stand in front of a mirror briefly, then close your eyes and attend to internal sensations rather than appearance. Practice alternating a few times to strengthen inward attention and reduce evaluative checking. Do this for 2–5 minutes with curiosity.`},
    {id:'t86-body-drawing', title:'Body Drawing', cat:'body-image', desc:'Make a quick drawing of your body; choose one element to magnify in a second drawing; reflect on insights.' , how_medium:`Quickly sketch your body and then choose one part to expand in a second drawing. Reflect on feelings and associations that emerge and note any surprising insights. Spend 10–15 minutes on this creative inquiry.`},
    {id:'t87-seven-energy-centers', title:'Breathing into the Seven Energy Centers', cat:'body-image', desc:'Seated, place a hand at each center from base to crown, breathing and visualizing its color.' , how_medium:`Seated, place a hand briefly at each of the seven centers from base to crown and imagine breathing color into each center. Move slowly and notice subtle sensations as you progress. Spend 5–10 minutes and avoid forcing imagery if it feels alien.`},

    // Breath Awareness and Techniques (88–94)
    {id:'t88-round-wave-breath', title:'Round-Wave Breath', cat:'breath', desc:'Inhale with a rounded “crest,” exhale like a wave rolling over—smooth and continuous to relax.' , how_medium:`Practice a smooth rounded inhale and a long, rolling exhale like a wave falling. Keep breath soft and steady for 1–3 minutes, noticing how tension softens with rhythmic breathing.`},
    {id:'t89-breathing-towards-calm', title:'Breathing Towards Calm', cat:'breath', desc:'Full inhale down to the pubic bone; exhale with a long soft “Ahhhh” to release tension.' , how_medium:`Take a full inhale down toward the lower belly and exhale with a long, soft “Ahhh” sound. Repeat 6–10 times and observe release in the throat and chest; discontinue if it feels over activating.`},
    {id:'t90-lateral-breathing-sequence', title:'Lateral Breathing Sequence', cat:'breath', desc:'Hands on ribs; inhale into the sides like gills; exhale to center, softening the ribs.' , how_medium:`Place hands on the sides of your ribs and inhale laterally so the ribcage expands sideways. Exhale to the center and allow the ribs to soften. Practice for 1–3 minutes to increase thoracic mobility and calm.`},
    {id:'t91-three-part-breath', title:'Three-Part Breathing Sequence', cat:'breath', desc:'Breathe sequentially into lower belly → mid-chest → upper chest with a smooth flow.' , how_medium:`Guide breath into three parts: lower belly, mid-chest, then upper chest, keeping the motion smooth and connected. Practice slowly for several cycles and notice enhanced awareness of breath mechanics.`},
    {id:'t92-cellular-breathing', title:'Cellular Breathing', cat:'breath', desc:'Curl into a ball and imagine breath diffusing through skin in all directions, as if a single cell.' , how_medium:`Curl into a comfortable ball, soften the belly, and imagine breath permeating every cell and the skin boundary. Slowly expand the sensation of breath radiating outward and inward; practice for a few minutes if it feels grounding.`},
    {id:'t93-deflating-tire-anxiety', title:'Deflating the Tire of Anxiety', cat:'breath', desc:'Find the “hot zone”; exhale imagining it deflating; inhale into a neutral, safe zone (e.g., lower belly).', how_medium:`Identify where anxiety feels most present and as you exhale imagine the tightness deflating like air from a tire. Inhale into a neutral safe zone such as the lower belly and stabilize breath there. Repeat for several cycles and pause if sensations spike.`},
    {id:'t94-lunar-breath', title:'Lunar Breath — Diffusing the Tension', cat:'breath', desc:'Tongue to back of front teeth; exhale a long gentle “TH” sound from the back of the throat to melt tension.' , how_medium:`Rest the tongue near the back of the front teeth and exhale a soft “TH” or gentle hiss from the throat. Keep the exhale long and unforced to encourage relaxation. Practice briefly and stop if it causes throat discomfort.`},

    // Working with Sound and Voice (95–98)
    {id:'t95-listening-bell', title:'Listening Bell', cat:'sound-voice', desc:'Close eyes and follow a bell’s sound until it fades completely to train stillness and focus.' , how_medium:`Close your eyes and listen to a bell or chime, tracking the sound until it fades completely. Notice subtle changes in attention and the quality of silence between sounds. Use for 1–3 minutes to cultivate focused listening.`},
    {id:'t96-sounding-into-body', title:'Sounding into the Body', cat:'sound-voice', desc:'Place hands on a body area and make a soft vowel (“O”/“Ahh”), feeling soothing resonance.' , how_medium:`Place hands on a resonant area (chest or belly) and make a soft vowel sound, feeling vibration in the body. Keep volume gentle and notice how the sound moves attention inward. Practice for a few breaths and stop if it feels activating.`},
    {id:'t97-hmmm-sound', title:'“Hmmm” Sound', cat:'sound-voice', desc:'With mouth closed, hum a gentle “Hmmm,” imagining vibration in chest or belly for comfort.' , how_medium:`With mouth closed, hum a soft “hmmm” and sense vibration in chest or belly. Use this as a short soothing anchor for 30–60 seconds and notice calming effects in the body.`},
    {id:'t98-corridor-of-sound', title:'Corridor of Sound', cat:'sound-voice', desc:'Eyes closed, move voice up/down like an elevator, freeing range and releasing throat/chest tension.' , how_medium:`Close your eyes and explore moving your voice up and down across pitch like an elevator. Keep sounds playful and free, focusing on release rather than performance. Practice briefly and stop if it feels uncomfortable.`},

    // Working with Safe Touch (99)
    {id:'t99-self-touch-tapping', title:'Self-Touch — Tapping', cat:'safe-touch', desc:'With a cupped hand, gently and rhythmically tap arms, legs, back, and chest to increase body awareness and presence.', how_medium:`Using a cupped hand, gently tap different parts of the body—arms, legs, chest, and back—in a slow rhythmic pattern. Notice shifts in attention and warmth that arise from touch. Practice for 30–90 seconds and stop if any area feels painful.`},
  ];
  function pins(){ return window.safeReadJSON(KEY,[]); }
  function savePins(v){ localStorage.setItem(KEY, JSON.stringify(v)); }
  function ensureVersion(){
    const v=localStorage.getItem(VERSION_KEY);
    if(v!==CURRENT_VERSION){
      // clear incompatible pins once on version bump
      localStorage.removeItem(KEY);
      localStorage.setItem(VERSION_KEY,CURRENT_VERSION);
    }
  }
  const PREF_KEY='somatic_prefs';
  function getPrefs(){ return window.safeReadJSON(PREF_KEY,{ detailLevel:'medium' }); }
  function savePrefs(p){ localStorage.setItem(PREF_KEY, JSON.stringify(p)); }
  function autoGenerateMedium(desc){
    // Simple generator: expand short desc into 2 sentences when possible
    if(!desc) return '';
    const s=desc.replace(/\s+/g,' ').trim();
    if(s.length<80) return s + ' Do this for a minute or two, notice how your body responds. If anything feels uncomfortable, stop.';
    return s + ' Notice any shift and pause to reflect on the sensation.';
  }

  function render(){
    const el=document.getElementById('app-content'); if(!el) return;
    ensureVersion();
    const ps=pins();
    el.innerHTML=`
      <div class="px-4 py-6 space-y-4" style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0;">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <h2 class="text-xl font-semibold">Somatic Techniques</h2>
          <div class="flex items-center gap-2 text-sm">
            <label class="flex items-center gap-1"><input id="s-only-pinned" type="checkbox"> Pinned only</label>
          </div>
        </div>
        <div class="flex items-center gap-3 w-full">
          <input id="s-q" class="flex-1 rounded-md px-3 py-2 bg-transparent border border-black/10 dark:border-white/20" placeholder="Search tools…">
          <div class="flex items-center gap-2 text-sm">
            <div class="text-xs opacity-80 mr-2">Description length:</div>
            <label class="flex items-center gap-1"><input id="s-detail-medium" type="radio" name="s-detail" value="medium">Medium</label>
            <label class="flex items-center gap-1"><input id="s-detail-short" type="radio" name="s-detail" value="short">Short</label>
          </div>
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <div class="flex gap-2 flex-wrap" id="s-sections"></div>
          <div class="flex gap-2">
            <button id="s-expand-all" class="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-sm">Expand all</button>
            <button id="s-collapse-all" class="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-sm">Collapse all</button>
          </div>
        </div>
        
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <div class="grid gap-3" id="s-list"></div>
          </div>
          <aside class="lg:col-span-1">
            <div class="p-4 rounded-lg bg-black/5 dark:bg-white/10 sticky top-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium">Pinned</h3>
                <button id="s-filter-pinned" class="px-2 py-1 rounded bg-emerald-600 text-white text-xs">Filter</button>
              </div>
              <div id="s-pins" class="flex flex-wrap gap-2"></div>
            </div>
          </aside>
        </div>
      </div>`;
    // Human-friendly section filters mapped to categories
    const SECTION_MAP={
      'Self-Skills': ['self-skill'],
      'Attitude': ['attitude'],
      'Mindfulness': ['mindfulness'],
      'Body Awareness': ['body-awareness'],
      'Somagram': ['somagram'],
      'Perception': ['perception'],
      'Movement': ['movement'],
      'Boundaries': ['boundary'],
      'Posture': ['posture'],
      'Gesture': ['gesture'],
      'Emotions': ['emotions'],
      'Body Image': ['body-image'],
      'Breath': ['breath'],
      'Sound & Voice': ['sound-voice'],
      'Safe Touch': ['safe-touch'],
    };
  const sectionHost=document.getElementById('s-sections');
    const allSectionBtn=document.createElement('button');
    allSectionBtn.className='px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-sm';
    allSectionBtn.textContent='All';
    allSectionBtn.dataset.section='__all__';
    sectionHost.appendChild(allSectionBtn);
    const sortedSectionKeys = Object.keys(SECTION_MAP).sort((a,b)=> a.localeCompare(b));
    sortedSectionKeys.forEach(label=>{
      const b=document.createElement('button'); b.className='px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-sm'; b.textContent=label; b.dataset.section=label; sectionHost.appendChild(b);
    });

  // category chips removed — use section filters only
  const listHost=document.getElementById('s-list'); const pinHost=document.getElementById('s-pins');

    function sectionLabelFor(cat){
      for(const k of Object.keys(SECTION_MAP)) if((SECTION_MAP[k]||[]).includes(cat)) return k;
      return 'Other';
    }
    function makeItemRow(i, compact, detailLevel){
      const isPinned=pins().includes(i.id);
      if(compact){
        const row=document.createElement('div'); row.className='flex justify-between items-center gap-2 px-3 py-2 rounded bg-black/5 dark:bg-white/10';
  row.innerHTML=`<div class="truncate"><span class="font-medium">${window.sanitizeHTML(i.title)}</span> <span class="opacity-70 text-xs">(${window.sanitizeHTML(i.cat)})</span></div><div class="flex items-center gap-2"><button class="details px-2 py-1 rounded bg-black/10 text-xs">Details</button><button class="pin px-2 py-1 rounded ${isPinned?'bg-rose-600':'bg-emerald-600'} text-white text-xs">${isPinned?'Unpin':'Pin'}</button></div>`;
        row.querySelector('.pin').addEventListener('click',()=>{ let p=pins(); if(isPinned){ p=p.filter(x=>x!==i.id);} else { p.push(i.id);} savePins(p); render(); });
        row.querySelector('.details').addEventListener('click',()=>{
          const d=document.createElement('div'); d.className='mt-2 text-sm opacity-90';
          const text=(detailLevel==='short'? i.desc : (i.how_medium || autoGenerateMedium(i.desc)));
          // Break into readable paragraphs by splitting on sentence boundaries
          d.innerHTML = text.split(/(?<=\.|\?|!)\s+/).map(s => `<p class="mb-2">${window.sanitizeHTML(s.trim())}</p>`).join('');
          if(row.nextSibling && row.nextSibling.classList && row.nextSibling.classList.contains('detail-row')){ row.parentNode.removeChild(row.nextSibling); } else { const dr=document.createElement('div'); dr.className='detail-row px-3 py-2'; dr.appendChild(d); row.parentNode.insertBefore(dr,row.nextSibling); }
        });
        return row;
      }
      const card=document.createElement('div'); card.className='p-4 rounded-lg bg-black/5 dark:bg-white/10';
  card.innerHTML=`<div class="flex justify-between items-start gap-2"><div class="min-w-0"><div class="font-medium truncate">${window.sanitizeHTML(i.title)}</div><div class="opacity-80 text-sm">${window.sanitizeHTML(i.desc)}</div></div><div class="flex flex-col items-end gap-2"><button class="details px-3 py-1 rounded bg-black/10 text-sm">Details</button><button class="pin px-3 py-1 rounded ${isPinned?'bg-rose-600':'bg-emerald-600'} text-white">${isPinned?'Unpin':'Pin'}</button></div></div>`;
      card.querySelector('.pin').addEventListener('click',()=>{ let p=pins(); if(isPinned){ p=p.filter(x=>x!==i.id);} else { p.push(i.id);} savePins(p); render(); });
      card.querySelector('.details').addEventListener('click',()=>{
        if(card.querySelector('.detail-row')){ card.querySelector('.detail-row').remove(); return; }
        const dr=document.createElement('div'); dr.className='detail-row mt-3 p-3 rounded bg-black/0 dark:bg-white/3 text-sm';
        const text=(detailLevel==='short'? i.desc : (i.how_medium || autoGenerateMedium(i.desc)));
        dr.innerHTML = text.split(/(?<=\.|\?|!)\s+/).map(s=>`<p class="mb-2">${window.sanitizeHTML(s.trim())}</p>`).join('');
        card.appendChild(dr);
      });
      return card;
    }
    // Check for a pick index set by Home's Random Somatic action.
    const PICK_KEY='somatic_pick_index';
    function consumePick(){
      const v=localStorage.getItem(PICK_KEY); if(!v) return null; localStorage.removeItem(PICK_KEY); const n=parseInt(v,10); if(isNaN(n)) return null; return n; }

    function rerender(){
      const q=(document.getElementById('s-q').value||'').toLowerCase();
  const onlyPinned=document.getElementById('s-only-pinned').checked;
  const compact=true; // force compact view
  const activeCat=null;
      const activeSection=sectionHost.querySelector('.active')?.dataset.section;
      const inSection=(it)=>{
        if(!activeSection||activeSection==='__all__') return true;
        const catsFor=SECTION_MAP[activeSection]||[]; return catsFor.includes(it.cat);
      };
      const isMatch=(i)=> (i.title.toLowerCase().includes(q)||i.desc.toLowerCase().includes(q));
      const isPinned=(i)=> pins().includes(i.id);

      const filtered=ITEMS.filter(i=>
        inSection(i) &&
        (!onlyPinned || isPinned(i)) &&
        isMatch(i)
      );

      // Group by section label
      const groups={};
      filtered.forEach(it=>{ const label=sectionLabelFor(it.cat); if(!groups[label]) groups[label]=[]; groups[label].push(it); });
      listHost.innerHTML='';
  const sectionOrder=[...sortedSectionKeys];
  // By default keep all sections collapsed. Only open when an active section is selected.
      const prefs=getPrefs();
  // set radio selection
  document.getElementById('s-detail-medium').checked=(prefs.detailLevel==='medium');
  document.getElementById('s-detail-short').checked=(prefs.detailLevel==='short');

  sectionOrder.forEach(label=>{
        const items=groups[label]||[]; if(items.length===0) return;
        const details=document.createElement('details');
        details.className='rounded-lg bg-black/5 dark:bg-white/10';
  if(activeSection===label){ details.setAttribute('open',''); }
        const summary=document.createElement('summary');
        summary.className='cursor-pointer select-none px-4 py-2 font-medium flex items-center justify-between';
        summary.innerHTML=`<span>${label}</span><span class="text-xs opacity-70">${items.length}</span>`;
        details.appendChild(summary);
        const container=document.createElement('div'); container.className='p-3 grid gap-2';
        items.forEach(i=> container.appendChild(makeItemRow(i, true, prefs.detailLevel)) );
        details.appendChild(container);
        listHost.appendChild(details);
      });

      // If a pick index exists, open its containing section and expand the details row for that item
      const pickIndex=consumePick();
      if(pickIndex!==null){
        const it=ITEMS[pickIndex]; if(it){
          // activate corresponding section button
          const targetLabel=sectionLabelFor(it.cat);
          const btn=[...sectionHost.querySelectorAll('button')].find(x=>x.dataset.section===targetLabel);
          if(btn){ btn.classList.add('active'); }
          // expand the section and reveal the item details
          const detailsEl=[...listHost.querySelectorAll('details')].find(d=> d.querySelector('summary') && d.querySelector('summary').textContent.trim().startsWith(targetLabel));
          if(detailsEl) detailsEl.setAttribute('open','');
          // find the item's row and click its Details button
          const rowBtn=[...listHost.querySelectorAll('.pin')].find(b=> b && b.parentNode && b.parentNode.textContent && b.parentNode.textContent.includes(it.title));
          if(rowBtn){ const detailsBtn=rowBtn.parentNode.querySelector('.details'); if(detailsBtn) detailsBtn.click(); }
        }
      }

      // Pinned panel
      pinHost.innerHTML='';
      pins().forEach(id=>{
        const it=ITEMS.find(x=>x.id===id); if(!it) return;
        const chip=document.createElement('div'); chip.className='flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600 text-white text-sm';
        const btn=document.createElement('button'); btn.className='font-medium truncate max-w-[12rem] text-left'; btn.textContent=it.title; btn.title=it.title;
        btn.addEventListener('click',()=>{
          // Quick filter to section containing this item
          sectionHost.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
          const label=sectionLabelFor(it.cat); const b=[...sectionHost.querySelectorAll('button')].find(x=>x.dataset.section===label);
          if(b){ b.classList.add('active'); }
          document.getElementById('s-only-pinned').checked=false;
          document.getElementById('s-q').value='';
          rerender();
        });
        const unpin=document.createElement('button'); unpin.className='px-2 py-0.5 rounded bg-rose-700 text-white text-xs'; unpin.textContent='Unpin';
        unpin.addEventListener('click',()=>{ let p=pins().filter(x=>x!==id); savePins(p); render(); });
        chip.appendChild(btn); chip.appendChild(unpin);
        pinHost.appendChild(chip);
      });
    }

    sectionHost.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{ sectionHost.querySelectorAll('button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); rerender(); }));
    document.getElementById('s-q').addEventListener('input',rerender);
  document.getElementById('s-only-pinned').addEventListener('change',rerender);
  document.getElementById('s-detail-medium').addEventListener('change',()=>{ savePrefs({detailLevel:'medium'}); rerender(); });
  document.getElementById('s-detail-short').addEventListener('change',()=>{ savePrefs({detailLevel:'short'}); rerender(); });
    document.getElementById('s-expand-all').addEventListener('click',()=>{ document.querySelectorAll('#s-list details').forEach(d=>d.setAttribute('open','')); });
    document.getElementById('s-collapse-all').addEventListener('click',()=>{ document.querySelectorAll('#s-list details').forEach(d=>d.removeAttribute('open')); });
    document.getElementById('s-filter-pinned').addEventListener('click',()=>{ const cb=document.getElementById('s-only-pinned'); cb.checked=!cb.checked; rerender(); });
    rerender();
  }

  function show(){ window.restoreDefaultLayout(); render(); }
  window.SomaticModule={ show, ITEMS };
})();
