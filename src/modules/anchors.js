(function(){
	const KEY='emotionAnchors';
	function read(){ try{ return JSON.parse(localStorage.getItem(KEY)||'[]'); }catch(_){ return []; } }
	function write(v){ try{ localStorage.setItem(KEY, JSON.stringify(v)); }catch(_){} }
	function uid(){ return Date.now() + Math.floor(Math.random()*1000); }
	function normalise(a){ return { id:a.id||uid(), pinned:!!a.pinned, title:String(a.title||''), type:String(a.type||''), emotion:String(a.emotion||''), cue:String(a.cue||''), note:String(a.note||''), url:String(a.url||''), createdAt:a.createdAt||new Date().toISOString() }; }

	function add(anchor){ const items=read(); items.push(normalise(anchor||{})); write(items); }
	function togglePin(id){ const items=read(); const idx=items.findIndex(x=>x.id===id); if(idx<0) return; items[idx].pinned = !items[idx].pinned; write(items); }
	function remove(id){ const items=read().filter(x=>x.id!==id); write(items); }
	function getAll(){ return read().map(normalise); }

	function render(){ const el=document.getElementById('app-content'); if(!el) return; if(window.applyFullWidthLayout) window.applyFullWidthLayout(); const anchors=getAll();
		const pinned=anchors.filter(a=>a.pinned); const rest=anchors.filter(a=>!a.pinned);
		el.innerHTML = `
		<div class="px-4 md:px-6 py-6">
			<div class="flex items-end justify-between flex-wrap gap-2 mb-4">
				<h2 class="text-xl font-semibold">Emotion Anchors</h2>
				<div class="text-xs opacity-70">${anchors.length} total${pinned.length?` • ${pinned.length} pinned`:''}</div>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
				<main class="lg:col-span-8 space-y-6">
					<div class="p-4 rounded-lg bg-black/5 dark:bg-white/10 space-y-3">
						<div class="flex flex-wrap items-center gap-2">
							<select id="a-type" class="rounded-md px-2 py-2 bg-transparent border border-black/10 dark:border-white/20 text-sm">
								<option value="">Type…</option>
								<option>Sensory</option>
								<option>People</option>
								<option>Action</option>
								<option>Idea/Object</option>
							</select>
							<input id="a-emotion" placeholder="Emotion" class="rounded-md px-2 py-2 bg-transparent border border-black/10 dark:border-white/20 text-sm" style="min-width:160px">
							<input id="a-title" placeholder="Title (e.g., Song: Morning Light)" class="rounded-md px-2 py-2 bg-transparent border border-black/10 dark:border-white/20 text-sm" style="min-width:220px">
							<input id="a-url" placeholder="URL (optional)" class="rounded-md px-2 py-2 bg-transparent border border-black/10 dark:border-white/20 text-sm" style="min-width:200px">
						</div>
						<textarea id="a-note" rows="3" class="w-full rounded-md px-3 py-2 bg-transparent border border-black/10 dark:border-white/20 text-sm" placeholder="Cue or how to use this anchor (e.g., play this song + breathe 4x)"></textarea>
						<div class="flex items-center gap-2"><button id="a-add" class="rounded-md px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-500">Add Anchor</button><label class="text-sm opacity-80"><input type="checkbox" id="a-pin-initial"> Pin</label></div>
					</div>
					<div>
						<h3 class="font-medium mb-2">Pinned</h3>
						<div id="a-pinned" class="space-y-2"></div>
					</div>
					<div>
						<h3 class="font-medium mb-2">All Anchors</h3>
						<div id="a-list" class="space-y-2"></div>
					</div>
				</main>
				<aside class="lg:col-span-4 space-y-3">
					<div class="p-4 rounded-lg bg-black/5 dark:bg-white/10 text-sm">
						<div class="font-medium mb-1">What are Emotion Anchors?</div>
						<div class="opacity-80">Triggers like smells, songs, people, gestures, or objects that help you shift or stabilize your state. Create anchors and pin your go‑tos.</div>
					</div>
				</aside>
			</div>
		</div>`;

		function card(a){
			const emoji = a.type.toLowerCase().includes('sensory')? '🎧' : a.type.toLowerCase().includes('people')? '🫶' : a.type.toLowerCase().includes('action')? '🤲' : '📷';
			const urlBtn = a.url ? `<a href="${a.url}" target="_blank" rel="noopener" class="text-xs rounded px-2 py-1 button-muted">Open</a>` : '';
			return `<div class="p-3 rounded-md bg-black/5 dark:bg-white/10">
				<div class="flex items-start justify-between gap-2">
					<div class="flex-1">
						<div class="flex items-center gap-2 mb-1">
							<span class="text-sm">${emoji}</span>
							<span class="px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-xs">${window.sanitizeHTML?window.sanitizeHTML(a.type):a.type}</span>
							${a.emotion?`<span class="px-2 py-0.5 rounded-full bg-indigo-600/80 text-white text-xs">${window.sanitizeHTML?window.sanitizeHTML(a.emotion):a.emotion}</span>`:''}
						</div>
						<div class="text-sm font-medium">${window.sanitizeHTML?window.sanitizeHTML(a.title):a.title}</div>
						${a.note?`<div class="text-sm opacity-80 mt-1">${window.sanitizeHTML?window.sanitizeHTML(a.note):a.note}</div>`:''}
					</div>
					<div class="flex flex-col gap-1">
						<button data-act="pin" data-id="${a.id}" class="px-2 py-1 rounded ${a.pinned?'bg-emerald-600 text-white':'bg-black/10 dark:bg-white/10'} text-sm">${a.pinned?'Unpin':'Pin'}</button>
						${urlBtn}
						<button data-act="del" data-id="${a.id}" class="px-2 py-1 rounded bg-red-600 text-white text-sm">Delete</button>
					</div>
				</div>
			</div>`;
		}

		const pinHost = el.querySelector('#a-pinned');
		pinHost.innerHTML = pinned.length? pinned.map(card).join('') : '<div class="text-sm opacity-70">No pinned anchors yet.</div>';
		const listHost = el.querySelector('#a-list');
		listHost.innerHTML = rest.length? rest.map(card).join('') : '<div class="text-sm opacity-70">No anchors yet.</div>';

		el.addEventListener('click', (e)=>{
			const btn = e.target.closest('button'); if(!btn) return;
			const act = btn.getAttribute('data-act'); const id = Number(btn.getAttribute('data-id'));
			if(act==='pin'){ togglePin(id); render(); }
			else if(act==='del'){ if(confirm('Delete this anchor?')){ remove(id); render(); } }
		});

		el.querySelector('#a-add')?.addEventListener('click', ()=>{
			const type = document.getElementById('a-type').value.trim();
			const emotion = document.getElementById('a-emotion').value.trim();
			const title = document.getElementById('a-title').value.trim();
			const url = document.getElementById('a-url').value.trim();
			const note = document.getElementById('a-note').value.trim();
			const pin = !!document.getElementById('a-pin-initial').checked;
			if(!title){ return (window.showMessage && window.showMessage('Please add a title for your anchor.')); }
			add({ type, emotion, title, url, note, pinned: pin }); render();
		});
	}

	function show(){ if(window.restoreDefaultLayout) window.restoreDefaultLayout(); render(); }
	window.AnchorsModule = { show, getAll, add, togglePin };
})();
