(function(){
	const KEY = 'journalEntries';
	const EMOTIONS = ['Calm','Anxious','Sad','Angry','Tired','Grateful','Lonely','Happy','Stressed','Neutral'];
	const state = { filterMood: '', search: '', editingId: null };

	// font preference
	const FONT_KEY = 'journalFont';
	function getFontPref(){
		try{ const v=(localStorage.getItem(FONT_KEY)||'').toLowerCase(); return (v==='serif'||v==='mono'||v==='sans')?v:'sans'; }catch(_){ return 'sans'; }
	}
	function setFontPref(v){ try{ localStorage.setItem(FONT_KEY, String(v||'sans')); }catch(_){} }
	function fontClass(){ const v=getFontPref(); return v==='serif'?'font-serif':(v==='mono'?'font-mono':'font-sans'); }
	function applyFontToElement(el){ if(!el) return; el.classList.remove('font-sans','font-serif','font-mono'); el.classList.add(fontClass()); }

	// storage helpers
	function readRaw(){
		try{
			if(typeof window.safeReadJSON === 'function') return window.safeReadJSON(KEY, []);
			return JSON.parse(localStorage.getItem(KEY) || '[]') || [];
		}catch(e){ return []; }
	}
	function write(v){ localStorage.setItem(KEY, JSON.stringify(v)); }
	function normaliseEntry(it){
		const tagsArr = Array.isArray(it.tags) ? it.tags.filter(Boolean) : [];
		return {
			id: it.id || Date.now(),
			text: String(it.text || ''),
			createdAt: it.createdAt || new Date().toISOString(),
			mood: String(it.mood || ''),
			tags: tagsArr
		};
	}
	function read(){ return readRaw().map(normaliseEntry); }
	function parseTags(s){ return String(s||'').split(',').map(x=>x.trim()).filter(Boolean); }

	// migration (map older scales to new emotion labels; keep old feelings as tags)
	function upgradeEntry(obj){
		const e = normaliseEntry(obj);
		let changed = false;
		let mood = String(e.mood||'');
		const tags = Array.isArray(e.tags) ? e.tags.slice() : [];
		const addTag=(t)=>{ const tl=tags.map(x=>String(x).toLowerCase()); if(!tl.includes(String(t).toLowerCase())){ tags.push(t); changed=true; } };
		switch(mood.toLowerCase()){
			case 'very low': mood='Sad'; changed=true; break;
			case 'low': mood='Tired'; changed=true; break;
			case 'ok': mood='Neutral'; changed=true; break;
			case 'good': mood='Calm'; changed=true; break;
			case 'great': mood='Happy'; changed=true; break;
			case 'calm': addTag('calm'); mood='Calm'; break;
			case 'anxious': addTag('anxious'); mood='Anxious'; break;
			case 'stressed': addTag('stressed'); mood='Stressed'; break;
			default: break;
		}
		if(e.mood!==mood) changed=true;
		e.mood = mood; e.tags = tags;
		return { entry:e, changed };
	}
	function migrateAll(){
		const raw = readRaw();
		let any=false;
		const upgraded = raw.map(it=>{ const {entry, changed} = upgradeEntry(it); if(changed) any=true; return entry; });
		if(any) write(upgraded);
		return upgraded;
	}

	// UI helpers
	function moodEmoji(m){
		switch(String(m||'').toLowerCase()){
			case 'calm': return '😌';
			case 'anxious': return '😰';
			case 'sad': return '😢';
			case 'angry': return '😠';
			case 'tired': return '😴';
			case 'grateful': return '🙏';
			case 'lonely': return '😔';
			case 'happy': return '🙂';
			case 'stressed': return '😫';
			case 'neutral': return '😐';
			default: return '';
		}
	}
	function moodChipColor(m){
		switch(String(m||'').toLowerCase()){
			case 'calm': return 'bg-emerald-600/80';
			case 'anxious': return 'bg-amber-600/80';
			case 'sad': return 'bg-rose-600/80';
			case 'angry': return 'bg-red-600/80';
			case 'tired': return 'bg-slate-600/80';
			case 'grateful': return 'bg-emerald-500/80';
			case 'lonely': return 'bg-purple-600/80';
			case 'happy': return 'bg-indigo-600/80';
			case 'stressed': return 'bg-orange-600/80';
			case 'neutral': return 'bg-slate-500/80';
			default: return 'bg-slate-600/60';
		}
	}
	function moodFilterButton(label){
		const emoji = moodEmoji(label);
		return `${emoji?emoji+' ':''}${label||'All'}`;
	}

	// Formatting + rendering helpers
	function escapeHTML(s){
		return String(s)
			.replace(/&/g,'&amp;')
			.replace(/</g,'&lt;')
			.replace(/>/g,'&gt;')
			.replace(/"/g,'&quot;')
			.replace(/'/g,'&#39;');
	}
	function renderFormattedText(txt){
		let s = escapeHTML(String(txt||''));
		// Headings (start of line): ###, ##, # → h3,h2,h1
		s = s.replace(/^###\s+(.+)$/gm, '<h3>$1<\/h3>');
		s = s.replace(/^##\s+(.+)$/gm, '<h2>$1<\/h2>');
		s = s.replace(/^#\s+(.+)$/gm, '<h1>$1<\/h1>');
		// Bold **text**
		s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
		// Italic *text*
		s = s.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
		// Underline ++text++ (custom)
		s = s.replace(/\+\+(.+?)\+\+/g, '<u>$1<\/u>');
		return s;
	}
	function isLikelyHTML(s){ return /<\w+[^>]*>/.test(String(s||'')); }
	function sanitizeHTMLBasic(html){
		if(typeof window.sanitizeHTML === 'function') return window.sanitizeHTML(html);
		const allowed = new Set(['STRONG','B','EM','I','U','H1','H2','H3','P','BR','DIV','SPAN']);
		const tpl = document.createElement('template'); tpl.innerHTML = String(html||'');
		const walk = (node)=>{
			const children = Array.from(node.childNodes);
			for(const ch of children){
				if(ch.nodeType === 1){ // element
					if(!allowed.has(ch.tagName)){
						// unwrap: move children before, then remove
						while(ch.firstChild){ node.insertBefore(ch.firstChild, ch); }
						node.removeChild(ch);
						continue;
					}
					// strip all attributes
					Array.from(ch.attributes).forEach(a=> ch.removeAttribute(a.name));
					walk(ch);
				} else if(ch.nodeType === 3){
					// text node ok
				} else {
					node.removeChild(ch);
				}
			}
		};
		walk(tpl.content);
		return tpl.innerHTML;
	}
	function renderRichText(s){
		const str = String(s||'');
		if(isLikelyHTML(str)) return sanitizeHTMLBasic(str);
		return renderFormattedText(str);
	}
	function applyInlineFormat(textarea, action){
		if(!textarea) return;
		const val = textarea.value;
		const start = textarea.selectionStart ?? 0;
		const end = textarea.selectionEnd ?? 0;
		const hasSel = end>start;
		const wrap = (pre, post)=>{
			if(hasSel){
				const before = val.slice(0,start);
				const mid = val.slice(start,end);
				const after = val.slice(end);
				textarea.value = before + pre + mid + post + after;
				const caretStart = start + pre.length;
				const caretEnd = caretStart + mid.length;
				textarea.setSelectionRange(caretStart, caretEnd);
			} else {
				const before = val.slice(0,start);
				const after = val.slice(start);
				textarea.value = before + pre + post + after;
				const caret = start + pre.length;
				textarea.setSelectionRange(caret, caret);
			}
			textarea.focus();
		};
		const toggleHeading = (prefix)=>{
			// Apply to selected lines or current line
			let selStart = start, selEnd = end;
			// Expand to line boundaries
			const lineStart = val.lastIndexOf('\n', selStart-1) + 1;
			let lineEnd = val.indexOf('\n', selEnd);
			if(lineEnd === -1) lineEnd = val.length;
			const block = val.slice(lineStart, lineEnd);
			const lines = block.split('\n');
			const updated = lines.map(ln => {
				const re = /^(#{1,3}\s+)/;
				if(ln.startsWith(prefix)) return ln.replace(/^#{1,3}\s+/, '');
				if(re.test(ln)) return ln.replace(/^#{1,3}\s+/, prefix);
				return ln.trim() ? (prefix + ln) : ln;
			}).join('\n');
			const before = val.slice(0, lineStart);
			const after = val.slice(lineEnd);
			textarea.value = before + updated + after;
			const newStart = lineStart;
			const newEnd = lineStart + updated.length;
			textarea.setSelectionRange(newStart, newEnd);
			textarea.focus();
		};
		switch(action){
			case 'bold': return wrap('**','**');
			case 'italic': return wrap('*','*');
			case 'underline': return wrap('++','++');
			case 'h1': return toggleHeading('# ');
			case 'h2': return toggleHeading('## ');
			default: return;
		}
	}
	function attachFormattingToolbar(toolbarEl, targetEl){
		if(!toolbarEl||!targetEl) return;
		const exec = (cmd, val=null)=>{ targetEl.focus(); try{ document.execCommand(cmd, false, val); }catch(_){} };
		const click = (sel, action)=>{
			toolbarEl.querySelector(sel)?.addEventListener('click',(e)=>{
				e.preventDefault();
				if(targetEl.isContentEditable){
					switch(action){
						case 'bold': return exec('bold');
						case 'italic': return exec('italic');
						case 'underline': return exec('underline');
						case 'h1': return exec('formatBlock','H1');
						case 'h2': return exec('formatBlock','H2');
						default: return;
					}
				} else {
					applyInlineFormat(targetEl, action);
				}
			});
		};
		click('[data-fmt="bold"]','bold');
		click('[data-fmt="italic"]','italic');
		click('[data-fmt="underline"]','underline');
		click('[data-fmt="h1"]','h1');
		click('[data-fmt="h2"]','h2');
	}

	// Inline typeahead for emotion inputs (replace datalists)
	function getEmotionSource(){
		const src = (window.COMPASS_EMOTIONS && Array.isArray(window.COMPASS_EMOTIONS)) ? window.COMPASS_EMOTIONS : EMOTIONS;
		return src || EMOTIONS;
	}
	function setupEmotionTypeahead(inputEl){
		if(!inputEl) return;
		let composing=false; let lastKey=''; let prevValue=inputEl.value||'';
		inputEl.addEventListener('compositionstart',()=>{ composing=true; });
		inputEl.addEventListener('compositionend',()=>{ composing=false; prevValue=inputEl.value||''; });
		inputEl.addEventListener('keydown',(e)=>{
			lastKey = (e.ctrlKey||e.metaKey||e.altKey) ? '' : (e.key||'');
		});
		inputEl.addEventListener('input',(e)=>{
			if(composing) { prevValue=inputEl.value||''; return; }
			const inputType = e.inputType || '';
			if(inputType.startsWith('delete')) { prevValue=inputEl.value||''; return; }
			const selStart = inputEl.selectionStart ?? 0;
			const selEnd = inputEl.selectionEnd ?? 0;
			if(selStart !== selEnd) { prevValue=inputEl.value||''; return; }
			if(selStart !== (inputEl.value||'').length) { prevValue=inputEl.value||''; return; }
			// Only autocomplete on likely character insertions
			const isInsert = inputType ? inputType.startsWith('insert') : (lastKey && lastKey.length===1);
			if(!isInsert) { prevValue=inputEl.value||''; return; }
			const raw = inputEl.value || '';
			const q = raw.trim();
			if(!q) { prevValue=raw; return; }
			const src = getEmotionSource();
			const match = src.find(m => String(m).toLowerCase().startsWith(q.toLowerCase()));
			if(match && match !== raw){
				inputEl.value = match;
				try{ inputEl.setSelectionRange(q.length, match.length); }catch(_){}
			}
			prevValue=inputEl.value||'';
		});
	}



	function applyTemplate(e){
		const val=e.target.value; e.target.value=''; if(!val) return;
		const ed=document.getElementById('j-text'); if(!ed) return;
		ed.focus();
		const prefix = ed.textContent.trim() ? '\n' : '';
		try{
			document.execCommand('insertText', false, prefix + val + ' ');
		}catch(_){
			ed.innerText += prefix + val + ' ';
		}
	}

	function add(){
		const textEl=document.getElementById('j-text'); const moodEl=document.getElementById('j-emotion'); const tagsEl=document.getElementById('j-tags');
		if(!textEl||!moodEl||!tagsEl) return;
		const rawHTML = textEl.innerHTML || '';
		const rawText = textEl.textContent.trim();
		if(!rawText) return (window.showMessage && window.showMessage('Please write something first.'));
		const mood=(moodEl.value||''); const tags=parseTags(tagsEl.value);
		const items=read(); items.push(normaliseEntry({ id:Date.now(), text: rawHTML, createdAt:new Date().toISOString(), mood, tags })); write(items);
		textEl.innerHTML=''; tagsEl.value=''; moodEl.value=''; render();
	}

		function filterItems(items){
			return items; // left filters removed; show all
		}

	function renderList(items){
		const host=document.getElementById('j-list'); if(!host) return; host.innerHTML='';
		const filtered=filterItems(items).slice().reverse();
		if(filtered.length===0){ host.innerHTML='<div class="text-sm opacity-70">No entries yet.</div>'; return; }
		filtered.forEach(it=>{
			const isEditing = state.editingId === it.id;
			const row=document.createElement('div'); row.className='p-3 rounded-md bg-black/5 dark:bg-white/10';
			if(isEditing){
				row.innerHTML=`
					<div class="flex justify-between items-start gap-2">
						<div class="flex-1 space-y-2">
							<div class="flex items-center gap-2">
									<input class="j-edit-emotion rounded-md px-2 py-1 bg-transparent border border-black/10 dark:border-white/20 text-sm" autocomplete="off" inputmode="text" value="${window.sanitizeHTML?window.sanitizeHTML(it.mood||''):(it.mood||'')}">
								<input class="j-edit-tags rounded-md px-2 py-1 bg-transparent border border-black/10 dark:border-white/20 text-sm" placeholder="tags (comma‑separated)" value="${(it.tags||[]).join(', ')}">
								<span class="text-xs opacity-60">${new Date(it.createdAt).toLocaleString('en-GB')}</span>
							</div>
							<div class="flex items-center gap-1 text-xs opacity-80">
								<select class="j-font rounded-md px-2 py-1 bg-transparent border border-black/10 dark:border-white/20 text-xs" title="Font">
									<option value="sans">Sans</option>
									<option value="serif">Serif</option>
									<option value="mono">Mono</option>
								</select>
								<button class="px-2 py-1 rounded bg-black/10 dark:bg-white/10" data-fmt="bold"><strong>B</strong></button>
								<button class="px-2 py-1 rounded bg-black/10 dark:bg-white/10" data-fmt="italic"><em>I</em></button>
								<button class="px-2 py-1 rounded bg-black/10 dark:bg-white/10" data-fmt="underline"><span style="text-decoration:underline">U</span></button>
								<button class="px-2 py-1 rounded bg-black/10 dark:bg-white/10" data-fmt="h1">H1</button>
								<button class="px-2 py-1 rounded bg-black/10 dark:bg-white/10" data-fmt="h2">H2</button>
							</div>
							<div class="j-edit-text w-full rounded-md px-3 py-2 bg-transparent border border-black/10 dark:border-white/20" contenteditable="true">${renderRichText(it.text)}</div>
						</div>
						<div class="flex flex-col gap-1">
							<button class="j-save px-2 py-1 rounded bg-emerald-600 text-white text-sm">Save</button>
							<button class="j-cancel px-2 py-1 rounded bg-black/20 dark:bg-white/20 text-sm">Cancel</button>
						</div>
					</div>`;
				row.querySelector('.j-save')?.addEventListener('click',()=>saveEdit(it.id,row));
				row.querySelector('.j-cancel')?.addEventListener('click',()=>{ state.editingId=null; render(); });
				// bind typeahead for edit emotion input
				const editEmotionInput = row.querySelector('.j-edit-emotion');
				if(editEmotionInput) setupEmotionTypeahead(editEmotionInput);
				// bind formatting toolbar in edit row (contentEditable target)
				const editCE = row.querySelector('.j-edit-text');
				attachFormattingToolbar(row, editCE);
				applyFontToElement(editCE);
				const editFontSel = row.querySelector('.j-font');
				if(editFontSel){ editFontSel.value=getFontPref(); editFontSel.addEventListener('change',(e)=>{ setFontPref(e.target.value); applyFontToElement(editCE); renderList(read()); }); }
			} else {
				const tagChips=(it.tags||[]).map(t=>`<span class="px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-xs">#${window.sanitizeHTML?window.sanitizeHTML(t):t}</span>`).join(' ');
				const moodLabel = it.mood||'';
				const moodSpan = moodLabel ? `<span class="px-2 py-0.5 rounded-full ${moodChipColor(moodLabel)} text-white text-xs">${moodEmoji(moodLabel)} ${window.sanitizeHTML?window.sanitizeHTML(moodLabel):moodLabel}</span>` : '';
				row.innerHTML=`
					<div class="flex justify-between items-start gap-2">
						<div class="flex-1">
							<div class="flex items-center gap-2 mb-1">
								${moodSpan}
								<div class="flex gap-1 flex-wrap">${tagChips}</div>
								<span class="text-xs opacity-60 ml-auto">${new Date(it.createdAt).toLocaleString('en-GB')}</span>
							</div>
							<div class="text-sm whitespace-pre-wrap ${fontClass()}">${renderRichText(it.text)}</div>
						</div>
						<div class="flex flex-col gap-1">
							<button class="j-edit px-2 py-1 rounded bg-black/20 dark:bg-white/20 text-sm">Edit</button>
							<button class="j-del px-2 py-1 rounded bg-red-600 text-white hover:bg-red-500 text-sm">Delete</button>
						</div>
					</div>`;
				row.querySelector('.j-edit')?.addEventListener('click',()=>{ state.editingId=it.id; render(); });
				row.querySelector('.j-del')?.addEventListener('click',()=>{ const rest=read().filter(x=>x.id!==it.id); write(rest); render(); });
			}
			host.appendChild(row);
		});
	}

	function saveEdit(id,row){
		const editNode = row.querySelector('.j-edit-text');
		const html = editNode ? sanitizeHTMLBasic(editNode.innerHTML||'') : '';
		const text = html;
		const mood=row.querySelector('.j-edit-emotion')?.value||'';
		const tags=parseTags(row.querySelector('.j-edit-tags')?.value||'');
		const items=read(); const idx=items.findIndex(x=>x.id===id); if(idx<0) return;
		items[idx]=normaliseEntry({ ...items[idx], text, mood, tags }); write(items);
		state.editingId=null; render();
	}

	function exportJSON(){
		const data = read();
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		triggerDownload(blob, 'journal.json');
	}
	function exportCSV(){
		const data = read();
		const rows = [['id','createdAt','mood','tags','text']];
		data.forEach(it=>rows.push([it.id, it.createdAt, it.mood||'', (it.tags||[]).join('|'), String(it.text||'').replace(/\n/g,'\\n')]));
		const csv = rows.map(r=> r.map(cell=>`"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\n');
		const blob = new Blob([csv], { type: 'text/csv' });
		triggerDownload(blob, 'journal.csv');
	}
	function triggerDownload(blob, filename){
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
		setTimeout(()=>URL.revokeObjectURL(url), 5000);
	}

	function render(){
		const el=document.getElementById('app-content'); if(!el) return; if(window.applyFullWidthLayout) window.applyFullWidthLayout();
		const entries=migrateAll();
			el.innerHTML = `
				<div class="px-4 md:px-6 py-6">
					<div class="flex items-end justify-between flex-wrap gap-2 mb-4">
						<h2 class="text-xl font-semibold">Journal</h2>
						<div class="text-xs opacity-70">${entries.length} entries</div>
					</div>
					<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
						<main class="lg:col-span-12 space-y-6">
						<div class="p-4 rounded-lg bg-black/5 dark:bg-white/10 space-y-3">
							<div class="flex flex-wrap items-center gap-2">
								<select id="j-template" class="rounded-md px-2 py-2 bg-transparent border border-black/10 dark:border-white/20 text-sm">
									<option value="">Templates…</option>
									<option>Grateful for…</option>
									<option>One win today…</option>
									<option>What drained me…</option>
									<option>What I need…</option>
									<option>A kind note to self…</option>
								</select>
									<input id="j-emotion" autocomplete="off" inputmode="text" class="rounded-md px-2 py-2 bg-transparent border border-black/10 dark:border-white/20 text-sm" style="min-width:240px;width:260px" placeholder="Start typing an emotion...">
								<input id="j-tags" class="rounded-md px-3 py-2 bg-transparent border border-black/10 dark:border-white/20 text-sm" placeholder="tags (comma‑separated)">
							</div>
							<div id="j-toolbar" class="flex items-center gap-2 text-xs opacity-80">
								<select id="j-font" class="rounded-md px-2 py-1 bg-transparent border border-black/10 dark:border-white/20 text-xs" title="Font">
									<option value="sans">Sans</option>
									<option value="serif">Serif</option>
									<option value="mono">Mono</option>
								</select>
								<button class="px-2 py-1 rounded bg-black/10 dark:bg-white/10" data-fmt="bold"><strong>B</strong></button>
								<button class="px-2 py-1 rounded bg-black/10 dark:bg-white/10" data-fmt="italic"><em>I</em></button>
								<button class="px-2 py-1 rounded bg-black/10 dark:bg-white/10" data-fmt="underline"><span style="text-decoration:underline">U</span></button>
								<button class="px-2 py-1 rounded bg-black/10 dark:bg-white/10" data-fmt="h1">H1</button>
								<button class="px-2 py-1 rounded bg-black/10 dark:bg-white/10" data-fmt="h2">H2</button>
							</div>
							<div class="flex gap-2">
								<div id="j-text" contenteditable="true" class="flex-1 rounded-md px-3 py-2 bg-transparent border border-black/10 dark:border-white/20 min-h-[120px]" data-placeholder="Write a quick note…"></div>
								<button id="j-add" class="self-start rounded-md px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-500">Add</button>
							</div>
						</div>
						<div>
							<h3 class="font-medium mb-2">Entries</h3>
							<div id="j-list" class="space-y-2"></div>
						</div>
					</main>
				</div>
			</div>`;

		// bind top-level events
		el.querySelector('#j-add')?.addEventListener('click', add);
		el.querySelector('#j-template')?.addEventListener('change', applyTemplate);
		// bind typeahead for composer emotion input
		const emoInput = el.querySelector('#j-emotion');
		if(emoInput) setupEmotionTypeahead(emoInput);
		// bind formatting toolbar for composer (contentEditable)
		const composer = el.querySelector('#j-text');
		attachFormattingToolbar(el.querySelector('#j-toolbar'), composer);
		// init font selector and apply
		const fontSel = el.querySelector('#j-font');
		if(fontSel){ fontSel.value = getFontPref(); fontSel.addEventListener('change', (e)=>{ setFontPref(e.target.value); render(); }); }
		applyFontToElement(composer);
		// contentEditable placeholder
		const placeholder = composer?.getAttribute('data-placeholder')||'';
		if(composer && !composer.innerText.trim()){ composer.setAttribute('data-empty','1'); composer.classList.add('placeholder'); composer.innerHTML=''; }
		composer?.addEventListener('input', ()=>{
			if(!composer) return;
			if(composer.textContent.trim()){ composer.removeAttribute('data-empty'); composer.classList.remove('placeholder'); }
			else { composer.setAttribute('data-empty','1'); }
		});
		// sidebar removed; no search or export buttons at top level

		renderList(entries);
	}

	function show(){ if(window.restoreDefaultLayout) window.restoreDefaultLayout(); render(); }

	window.JournalModule = { show, migrateAll };
})();

