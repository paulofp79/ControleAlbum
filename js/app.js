// ─────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────
const USERS_KEY   = 'copa2026_users';
const CUR_KEY     = 'copa2026_current';

const EMOJI_OPTS  = ['⚽','🏆','⭐','🔥','👑','🦁','🎯','🏅'];
const COLOR_OPTS  = ['#1976D2','#E53935','#43A047','#FB8C00','#8E24AA','#00838F','#795548','#546E7A'];

// ─────────────────────────────────────────────
//  USER STORE
// ─────────────────────────────────────────────
let users = [];
let currentUserId = null;

function loadUsers() {
  try { users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { users = []; }
  currentUserId = localStorage.getItem(CUR_KEY) || null;
  // migrate old single-user data
  const oldData = localStorage.getItem('copa2026_counts');
  if (oldData && users.length === 0) {
    const u = makeUser('Meu Álbum', '⚽', COLOR_OPTS[0]);
    users.push(u);
    localStorage.setItem(`copa2026_counts_${u.id}`, oldData);
    localStorage.removeItem('copa2026_counts');
    saveUsers();
  }
}

function saveUsers() {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function makeUser(name, emoji, color) {
  return { id: 'u' + Date.now() + Math.random().toString(36).slice(2,6), name, emoji, color, created: Date.now() };
}

function getUser(id) { return users.find(u => u.id === id); }

function currentUser() { return getUser(currentUserId); }

function selectUser(id) {
  currentUserId = id;
  localStorage.setItem(CUR_KEY, id);
  loadState();
  updateUserPill();
  enterApp();
}

function deleteUser(id) {
  if (!confirm(`Apagar o usuário "${getUser(id)?.name}" e todos os seus dados? Esta ação não pode ser desfeita.`)) return;
  localStorage.removeItem(`copa2026_counts_${id}`);
  users = users.filter(u => u.id !== id);
  saveUsers();
  if (currentUserId === id) {
    currentUserId = null;
    localStorage.removeItem(CUR_KEY);
  }
  renderUserScreen();
}

function editUser(id) {
  openUserModal(id);
}

// ─────────────────────────────────────────────
//  STICKER STATE  (per-user)
// ─────────────────────────────────────────────
let counts = {};

function storageKey() { return `copa2026_counts_${currentUserId}`; }

function loadState() {
  if (!currentUserId) { counts = {}; return; }
  try { counts = JSON.parse(localStorage.getItem(storageKey()) || '{}'); } catch { counts = {}; }
}

function saveState() {
  if (!currentUserId) return;
  localStorage.setItem(storageKey(), JSON.stringify(counts));
}

function getCount(num)      { return counts[num] || 0; }
function setCount(num, val) { if (val <= 0) delete counts[num]; else counts[num] = val; saveState(); }

// ─────────────────────────────────────────────
//  STATS
// ─────────────────────────────────────────────
function computeStats() {
  let collected = 0, duplicate = 0, missing = 0;
  for (const s of STICKERS) {
    const c = getCount(s.id);
    if (c === 0) missing++;
    else if (c === 1) collected++;
    else { collected++; duplicate += (c - 1); }
  }
  return { total: TOTAL_STICKERS, collected, missing, duplicate };
}

// ─────────────────────────────────────────────
//  HEADER
// ─────────────────────────────────────────────
function renderHeader() {
  const { total, collected, missing, duplicate } = computeStats();
  document.getElementById('stat-collected').textContent = `✓ ${collected}/${total}`;
  document.getElementById('stat-duplicate').textContent = `🔁 ${duplicate}`;
  document.getElementById('stat-missing').textContent   = `✗ ${missing}`;
}

function updateUserPill() {
  const u = currentUser();
  if (!u) return;
  document.getElementById('pill-emoji').textContent = u.emoji;
  document.getElementById('pill-name').textContent  = u.name;
  document.getElementById('pill-emoji').parentElement.style.borderColor = u.color + '88';
}

// ─────────────────────────────────────────────
//  USER SCREEN
// ─────────────────────────────────────────────
function renderUserScreen() {
  const list = document.getElementById('user-list');
  if (users.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:var(--text-muted);font-size:.85rem;padding:12px 0">
      Nenhum usuário ainda. Crie o primeiro abaixo!</p>`;
    return;
  }
  list.innerHTML = users.map(u => {
    const uc = getUserCounts(u.id);
    const pct = Math.round((uc.collected / TOTAL_STICKERS) * 100);
    return `<div class="user-card" onclick="selectUser('${u.id}')">
      <div class="user-avatar" style="background:${u.color}33;color:${u.color}">${u.emoji}</div>
      <div class="user-card-info">
        <div class="user-card-name">${escHtml(u.name)}</div>
        <div class="user-card-stats">${uc.collected}/${TOTAL_STICKERS} coletadas · ${pct}% completo</div>
      </div>
      <div class="user-card-actions" onclick="event.stopPropagation()">
        <button class="uc-btn" onclick="editUser('${u.id}')">✏️</button>
        <button class="uc-btn danger" onclick="deleteUser('${u.id}')">🗑</button>
      </div>
    </div>`;
  }).join('');
}

function getUserCounts(userId) {
  let c = {};
  try { c = JSON.parse(localStorage.getItem(`copa2026_counts_${userId}`) || '{}'); } catch {}
  let collected = 0;
  for (const k in c) { if (c[k] > 0) collected++; }
  return { collected };
}

function showUserScreen() {
  renderUserScreen();
  document.getElementById('user-screen').classList.remove('hidden');
}

function goUserScreen() {
  showUserScreen();
}

function enterApp() {
  document.getElementById('user-screen').classList.add('hidden');
  updateUserPill();
  renderHeader();
  renderView(currentView);
}

// ─────────────────────────────────────────────
//  CREATE / EDIT USER MODAL
// ─────────────────────────────────────────────
let editingUserId = null;
let selectedEmoji = EMOJI_OPTS[0];
let selectedColor = COLOR_OPTS[0];

function openUserModal(editId = null) {
  editingUserId = editId || null;
  const u = editId ? getUser(editId) : null;
  selectedEmoji = u ? u.emoji : EMOJI_OPTS[0];
  selectedColor = u ? u.color : COLOR_OPTS[0];

  document.getElementById('user-modal-heading').textContent = u ? 'Editar Usuário' : 'Novo Usuário';
  document.getElementById('user-name-input').value = u ? u.name : '';

  // Emoji grid
  document.getElementById('emoji-grid').innerHTML = EMOJI_OPTS.map(e =>
    `<div class="avatar-opt ${e === selectedEmoji ? 'selected' : ''}"
          onclick="pickEmoji('${e}')">${e}</div>`
  ).join('');

  // Color grid
  document.getElementById('color-grid').innerHTML = COLOR_OPTS.map(c =>
    `<div class="color-opt ${c === selectedColor ? 'selected' : ''}"
          style="background:${c}"
          onclick="pickColor('${c}')"></div>`
  ).join('');

  document.getElementById('user-modal-overlay').classList.add('open');
  setTimeout(() => document.getElementById('user-name-input').focus(), 50);
}

function showCreateUser() { openUserModal(); }

function closeUserModal(e) {
  if (e && e.target !== document.getElementById('user-modal-overlay')) return;
  document.getElementById('user-modal-overlay').classList.remove('open');
}

function pickEmoji(e) {
  selectedEmoji = e;
  document.querySelectorAll('.avatar-opt').forEach(el => {
    el.classList.toggle('selected', el.textContent === e);
  });
}

function pickColor(c) {
  selectedColor = c;
  document.querySelectorAll('.color-opt').forEach(el => {
    el.classList.toggle('selected', el.style.background === hexToRgb(c) || el.style.background === c);
  });
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `rgb(${r}, ${g}, ${b})`;
}

function confirmUserModal() {
  const name = document.getElementById('user-name-input').value.trim();
  if (!name) { document.getElementById('user-name-input').focus(); return; }

  if (editingUserId) {
    const u = getUser(editingUserId);
    if (u) { u.name = name; u.emoji = selectedEmoji; u.color = selectedColor; }
  } else {
    const u = makeUser(name, selectedEmoji, selectedColor);
    users.push(u);
  }
  saveUsers();
  document.getElementById('user-modal-overlay').classList.remove('open');
  renderUserScreen();
  if (editingUserId && editingUserId === currentUserId) updateUserPill();
  editingUserId = null;
}

// ─────────────────────────────────────────────
//  STICKER CARD
// ─────────────────────────────────────────────
function shortLabel(s) {
  if (s.type === 'badge')        return 'Escudo';
  if (s.type === 'group-header') return s.name.replace(' — Cabeçalho','');
  if (s.type === 'stadium' || s.type === 'city') return s.name;
  if (s.type === 'special' || s.type === 'star') return s.name.replace(/^.+— /,'').replace(/^[^\s]+ /,'');
  const parts = s.name.replace(/^[^\s]+ /,'').split(' ');
  return parts[parts.length - 1];
}

function stickerCard(s) {
  const c   = getCount(s.id);
  const cls = c === 0 ? '' : c === 1 ? 'collected' : 'duplicate';
  const isTeam   = s.teamCode && s.teamNum !== null;
  const topCode  = isTeam ? s.teamCode : '';
  const mainNum  = isTeam ? s.teamNum : `#${s.id}`;
  const flag = s.teamCode ? TEAMS[s.teamCode].flag
    : s.type === 'special' ? '🏆' : s.type === 'stadium' ? '🏟️'
    : s.type === 'city'    ? '📍' : s.type === 'group-header' ? '📋'
    : s.type === 'star'    ? '⭐' : '⚽';
  const label    = shortLabel(s);
  const dupBadge = c > 1  ? `<span class="dup-badge">+${c-1}</span>` : '';
  const overlay  = c > 0  ? `<div class="card-overlay ${c > 1 ? 'dup' : 'got'}"></div>` : '';
  const check    = c > 0  ? `<div class="card-check">${c > 1 ? '🔁' : '✓'}</div>` : '';
  return `<div class="sticker-card ${cls}" data-id="${s.id}" onclick="openModal(${s.id})">
    ${overlay}${dupBadge}
    ${topCode ? `<div class="s-code">${topCode}</div>` : ''}
    <div class="s-num">${mainNum}</div>
    <div class="s-flag">${flag}</div>
    <div class="s-name">${label}</div>
    ${check}
  </div>`;
}

// ─────────────────────────────────────────────
//  ALBUM VIEW
// ─────────────────────────────────────────────
let searchQuery = '';
let albumFilter = 'all';
let currentView = 'album';

function renderAlbum() {
  const q = searchQuery.toLowerCase();
  const container = document.getElementById('view-album');
  let html = `<div class="search-bar">
    <input id="search-input" type="search" placeholder="Buscar por número ou nome…" value="${escHtml(q)}" oninput="onSearch(this.value)">
  </div>
  <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;">
    ${['all','missing','collected','duplicate'].map(f =>
      `<button class="filter-btn ${albumFilter === f ? 'active' : ''}" onclick="setAlbumFilter('${f}')">
        ${f==='all'?'Todas':f==='missing'?'Faltam':f==='collected'?'Tenho':'Repetidas'}
      </button>`
    ).join('')}
  </div>`;

  for (const sec of SECTIONS) {
    const secStickers = STICKERS.filter(s => s.sectionIdx === sec.id);
    const filtered = secStickers.filter(s => {
      const c = getCount(s.id);
      if (albumFilter === 'missing'   && c > 0)  return false;
      if (albumFilter === 'collected' && c !== 1) return false;
      if (albumFilter === 'duplicate' && c < 2)  return false;
      if (q && !String(s.id).includes(q) && !s.name.toLowerCase().includes(q)) return false;
      return true;
    });
    if (filtered.length === 0) continue;

    const secCollected = secStickers.filter(s => getCount(s.id) > 0).length;
    html += `<div class="section-header">
      <span class="sec-icon">${sec.icon}</span>
      <span class="sec-name">${sec.name}</span>
      <span class="sec-prog">${secCollected}/${secStickers.length}</span>
    </div>`;

    html += `<div class="sticker-grid">`;
    if (sec.teams) {
      const header = filtered.find(s => s.type === 'group-header');
      if (header) html += stickerCard(header);
      for (const code of sec.teams) {
        const ts = filtered.filter(s => s.teamCode === code);
        if (ts.length === 0) continue;
        html += `<div class="team-header">${TEAMS[code].flag} ${TEAMS[code].name}</div>`;
        ts.forEach(s => { html += stickerCard(s); });
      }
    } else {
      filtered.forEach(s => { html += stickerCard(s); });
    }
    html += `</div>`;
  }

  if (!html.includes('sticker-card')) {
    html += `<div class="empty-state"><div class="empty-icon">🔍</div><p>Nenhuma figurinha encontrada.</p></div>`;
  }

  container.innerHTML = html;
  const inp = document.getElementById('search-input');
  if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
}

// ─────────────────────────────────────────────
//  NEEDED VIEW
// ─────────────────────────────────────────────
function renderNeeded() {
  const container = document.getElementById('view-needed');
  const needed = STICKERS.filter(s => getCount(s.id) === 0);
  if (needed.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🎉</div><p>Álbum completo! Parabéns!</p></div>`;
    return;
  }
  let bySection = {};
  needed.forEach(s => { (bySection[s.sectionIdx] = bySection[s.sectionIdx] || []).push(s); });
  let html = `<p style="color:var(--text-muted);font-size:.8rem;margin-bottom:12px;">Faltam <strong style="color:var(--text)">${needed.length}</strong> figurinhas.</p>`;
  for (const secIdx in bySection) {
    const sec = SECTIONS[secIdx];
    html += `<div class="list-section"><h3>${sec.icon} ${sec.name}</h3>`;
    bySection[secIdx].forEach(s => {
      const label = s.teamCode ? `${s.teamCode} ${s.teamNum} — ${shortLabel(s)}` : s.name;
      html += `<div class="sticker-row" onclick="openModal(${s.id})">
        <span class="row-num">#${s.id}</span>
        <span class="row-name">${label}</span>
        <span class="row-badge red">Falta</span>
      </div>`;
    });
    html += `</div>`;
  }
  container.innerHTML = html;
}

// ─────────────────────────────────────────────
//  DUPLICATES VIEW
// ─────────────────────────────────────────────
function renderDuplicates() {
  const container = document.getElementById('view-duplicates');
  const dups = STICKERS.filter(s => getCount(s.id) > 1);
  if (dups.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📦</div><p>Nenhuma repetida ainda.</p></div>`;
    return;
  }
  let bySection = {};
  dups.forEach(s => { (bySection[s.sectionIdx] = bySection[s.sectionIdx] || []).push(s); });
  const totalExtras = dups.reduce((a, s) => a + getCount(s.id) - 1, 0);
  let html = `<p style="color:var(--text-muted);font-size:.8rem;margin-bottom:12px;"><strong style="color:var(--text)">${totalExtras}</strong> repetidas de <strong style="color:var(--text)">${dups.length}</strong> figurinhas diferentes.</p>`;
  for (const secIdx in bySection) {
    const sec = SECTIONS[secIdx];
    html += `<div class="list-section"><h3>${sec.icon} ${sec.name}</h3>`;
    bySection[secIdx].forEach(s => {
      const extras = getCount(s.id) - 1;
      const label  = s.teamCode ? `${s.teamCode} ${s.teamNum} — ${shortLabel(s)}` : s.name;
      html += `<div class="sticker-row" onclick="openModal(${s.id})">
        <span class="row-num">#${s.id}</span>
        <span class="row-name">${label}</span>
        <span class="row-badge orange">+${extras}</span>
      </div>`;
    });
    html += `</div>`;
  }
  container.innerHTML = html;
}

// ─────────────────────────────────────────────
//  STATS VIEW
// ─────────────────────────────────────────────
function renderStats() {
  const container = document.getElementById('view-stats');
  const { total, collected, missing, duplicate } = computeStats();
  const pct = Math.round((collected / total) * 100);

  let html = `<div class="stats-card"><h3>Progresso Geral</h3>
    <div class="stats-grid">
      <div class="stat-box green"><div class="val">${collected}</div><div class="lbl">Coletadas</div></div>
      <div class="stat-box red"><div class="val">${missing}</div><div class="lbl">Faltam</div></div>
      <div class="stat-box orange"><div class="val">${duplicate}</div><div class="lbl">Repetidas</div></div>
      <div class="stat-box blue"><div class="val">${pct}%</div><div class="lbl">Completo</div></div>
    </div>
    <div style="margin-top:12px">
      <div style="display:flex;justify-content:space-between;font-size:.75rem;color:var(--text-muted);margin-bottom:4px">
        <span>Progresso</span><span>${collected}/${total}</span>
      </div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    </div>
  </div>`;

  html += `<div class="stats-card"><h3>Por Seção</h3>`;
  for (const sec of SECTIONS) {
    const ss = STICKERS.filter(s => s.sectionIdx === sec.id);
    const sc = ss.filter(s => getCount(s.id) > 0).length;
    const sp = Math.round((sc / ss.length) * 100);
    html += `<div style="padding:8px 0;border-bottom:1px solid var(--border)">
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;margin-bottom:4px">
        <span>${sec.icon} ${sec.name}</span><span style="color:var(--text-muted)">${sc}/${ss.length}</span>
      </div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${sp}%"></div></div>
    </div>`;
  }
  html += `</div>`;

  html += `<div class="stats-card"><h3>Por Seleção</h3>`;
  for (const code in TEAMS) {
    const t  = TEAMS[code];
    const ts = STICKERS.filter(s => s.teamCode === code);
    if (!ts.length) continue;
    const tc = ts.filter(s => getCount(s.id) > 0).length;
    html += `<div class="team-stat-row">
      <span class="flag">${t.flag}</span>
      <span class="name">${t.name}</span>
      <span class="count">${tc}/${ts.length}</span>
    </div>`;
  }
  html += `</div>`;
  container.innerHTML = html;
}

// ─────────────────────────────────────────────
//  TRADE VIEW
// ─────────────────────────────────────────────
function renderTrade() {
  const container = document.getElementById('view-trade');
  const dups    = STICKERS.filter(s => getCount(s.id) > 1);
  const missing = STICKERS.filter(s => getCount(s.id) === 0);

  let html = `<div class="trade-section"><h3>Compartilhar para Troca</h3>
    <button class="share-btn" onclick="shareList('duplicates')"><span class="icon">📤</span> Minhas repetidas (${dups.length})</button>
    <button class="share-btn" onclick="shareList('needed')"><span class="icon">📋</span> Minhas faltantes (${missing.length})</button>
    <div id="share-text" class="copy-area"></div>
  </div>`;

  html += `<div class="trade-section"><h3>Dados do Álbum</h3>
    <div class="io-row">
      <button class="btn btn-ghost" onclick="exportData()">⬆ Exportar</button>
      <label class="btn btn-ghost" style="cursor:pointer;text-align:center">⬇ Importar
        <input type="file" accept=".json" style="display:none" onchange="importData(event)">
      </label>
    </div>
    <p style="color:var(--text-muted);font-size:.75rem;text-align:center;">Salve ou carregue seus dados em outro dispositivo.</p>
  </div>`;

  html += `<div class="trade-section"><h3>Gerenciar Usuários</h3>
    <button class="share-btn" onclick="goUserScreen()"><span class="icon">👤</span> Trocar de usuário</button>
    <button class="btn btn-danger" onclick="resetConfirm()" style="width:100%;margin-top:8px">🗑 Apagar meus dados</button>
  </div>`;

  container.innerHTML = html;
}

function shareList(type) {
  const area = document.getElementById('share-text');
  const list = type === 'duplicates'
    ? STICKERS.filter(s => getCount(s.id) > 1)
    : STICKERS.filter(s => getCount(s.id) === 0);
  const u = currentUser();
  const who = u ? u.name : 'Eu';

  if (!list.length) {
    area.textContent = type === 'duplicates' ? 'Sem repetidas ainda.' : 'Álbum completo!';
    area.classList.add('visible'); return;
  }

  const title = type === 'duplicates'
    ? `🔁 Repetidas de ${who} — Copa 2026:`
    : `📋 Faltantes de ${who} — Copa 2026:`;
  const lines = list.map(s => {
    const id = s.teamCode ? `${s.teamCode} ${s.teamNum}` : `#${s.id}`;
    const extra = type === 'duplicates' ? ` (x${getCount(s.id)-1})` : '';
    return `${id} ${shortLabel(s)}${extra}`;
  });
  const text = `${title}\n${lines.join('\n')}`;
  area.textContent = text;
  area.classList.add('visible');
  if (navigator.share) { navigator.share({ title: 'Copa 2026', text }).catch(()=>{}); }
  else if (navigator.clipboard) { navigator.clipboard.writeText(text).then(()=>{ area.textContent = '✓ Copiado!\n\n'+text; }); }
}

function exportData() {
  const data = { version: 2, user: currentUser()?.name, counts, exported: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data,null,2)], { type:'application/json' });
  const url  = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `copa2026_${(currentUser()?.name||'album').replace(/\s+/g,'_')}_${new Date().toISOString().slice(0,10)}.json`;
  a.click(); URL.revokeObjectURL(url);
}

function importData(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (data.counts) { counts = data.counts; saveState(); refreshAll(); alert('Dados importados!'); }
    } catch { alert('Arquivo inválido.'); }
  };
  reader.readAsText(file);
}

function resetConfirm() {
  if (confirm('Apagar TODOS os seus dados de figurinhas? Isso não pode ser desfeito.')) {
    counts = {}; saveState(); refreshAll();
  }
}

// ─────────────────────────────────────────────
//  STICKER MODAL
// ─────────────────────────────────────────────
let modalStickerNum = null;

function openModal(num) {
  modalStickerNum = num;
  const s = STICKERS.find(x => x.id === num);
  if (!s) return;
  const c = getCount(num);
  const titleLabel = s.teamCode ? `${s.teamCode} ${s.teamNum}` : `Figurinha #${num}`;
  document.getElementById('modal-title').textContent = titleLabel;
  document.getElementById('modal-name').textContent  = s.name.replace(/^[^\s]+ /,'');
  document.getElementById('modal-count').textContent = c;
  document.getElementById('modal-label').textContent = modalLabel(c);
  document.getElementById('modal-overlay').classList.add('open');
}

function modalLabel(c) {
  if (c === 0) return 'Não tenho';
  if (c === 1) return 'Tenho (sem repetidas)';
  return `Tenho ${c} cópias · +${c-1} para trocar`;
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  modalStickerNum = null;
}

function modalChange(delta) {
  if (modalStickerNum === null) return;
  const next = Math.max(0, getCount(modalStickerNum) + delta);
  setCount(modalStickerNum, next);
  document.getElementById('modal-count').textContent = next;
  document.getElementById('modal-label').textContent = modalLabel(next);
  refreshViews();
}

function modalClear() {
  if (modalStickerNum === null) return;
  setCount(modalStickerNum, 0);
  document.getElementById('modal-count').textContent = 0;
  document.getElementById('modal-label').textContent = modalLabel(0);
  refreshViews();
}

// ─────────────────────────────────────────────
//  NAVIGATION
// ─────────────────────────────────────────────
function showView(name) {
  currentView = name;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`view-${name}`).classList.add('active');
  document.querySelector(`[data-view="${name}"]`).classList.add('active');
  renderView(name);
}

function renderView(name) {
  if (name === 'album')      renderAlbum();
  else if (name === 'needed')      renderNeeded();
  else if (name === 'duplicates')  renderDuplicates();
  else if (name === 'stats')       renderStats();
  else if (name === 'trade')       renderTrade();
  renderHeader();
}

function refreshViews() { renderHeader(); renderView(currentView); }
function refreshAll()   { renderView(currentView); }

// ─────────────────────────────────────────────
//  SEARCH & FILTER
// ─────────────────────────────────────────────
function onSearch(val)      { searchQuery = val; renderAlbum(); }
function setAlbumFilter(f)  { albumFilter = f; renderAlbum(); }

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─────────────────────────────────────────────
//  KEYBOARD
// ─────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); document.getElementById('user-modal-overlay').classList.remove('open'); }
  if (document.getElementById('modal-overlay').classList.contains('open')) {
    if (e.key === '+' || e.key === '=') modalChange(1);
    if (e.key === '-') modalChange(-1);
  }
});
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
loadUsers();

if (users.length === 0 || !currentUserId || !getUser(currentUserId)) {
  // Show user selection screen
  renderUserScreen();
} else {
  // Re-enter app for returning user
  loadState();
  document.getElementById('user-screen').classList.add('hidden');
  updateUserPill();
  renderHeader();
  renderView(currentView);
}

// PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
