// ===== STATE =====
const STORE_KEY = 'copa2026_counts';
const FILTER_KEY = 'copa2026_filter';

let counts = {}; // { stickerNum: count }
let currentView = 'album';
let searchQuery = '';
let albumFilter = 'all'; // all | missing | collected | duplicate
let modalStickerNum = null;

function loadState() {
  try { counts = JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch { counts = {}; }
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(counts));
}

function getCount(num) { return counts[num] || 0; }

function setCount(num, val) {
  if (val <= 0) delete counts[num];
  else counts[num] = val;
  saveState();
}

// ===== STATS =====
function computeStats() {
  let total = TOTAL_STICKERS, collected = 0, duplicate = 0, missing = 0;
  for (const s of STICKERS) {
    const c = getCount(s.id);
    if (c === 0) missing++;
    else if (c === 1) collected++;
    else { collected++; duplicate += (c - 1); }
  }
  return { total, collected, missing, duplicate };
}

// ===== HEADER =====
function renderHeader() {
  const { total, collected, missing, duplicate } = computeStats();
  document.getElementById('stat-collected').textContent = `✓ ${collected}/${total}`;
  document.getElementById('stat-duplicate').textContent = `🔁 ${duplicate} rep.`;
  document.getElementById('stat-missing').textContent = `✗ ${missing}`;
}

// ===== STICKER CARD =====
function stickerCard(s) {
  const c = getCount(s.id);
  const cls = c === 0 ? '' : c === 1 ? 'collected' : 'duplicate';
  const flagOrIcon = s.type === 'special' ? '🏆'
    : s.type === 'stadium' ? '🏟️'
    : s.type === 'city' ? '📍'
    : s.type === 'group-header' ? '📋'
    : s.type === 'star' ? '⭐'
    : s.teamCode ? TEAMS[s.teamCode].flag : '⚽';
  const statusTxt = c === 0 ? '' : c === 1 ? '✓' : `✓ +${c - 1}`;
  const dupBadge = c > 1 ? `<div class="dup-badge">${c - 1}</div>` : '';
  return `<div class="sticker-card ${cls}" data-id="${s.id}" onclick="openModal(${s.id})">
    ${dupBadge}
    <div class="sticker-num">${s.id}</div>
    <div class="sticker-flag">${flagOrIcon}</div>
    <div class="sticker-status">${statusTxt}</div>
  </div>`;
}

// ===== ALBUM VIEW =====
function renderAlbum() {
  const q = searchQuery.toLowerCase();
  const container = document.getElementById('view-album');
  let html = `<div class="search-bar">
    <input id="search-input" type="search" placeholder="Buscar por número ou nome..." value="${q}" oninput="onSearch(this.value)">
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
      if (albumFilter === 'missing' && c > 0) return false;
      if (albumFilter === 'collected' && c !== 1) return false;
      if (albumFilter === 'duplicate' && c < 2) return false;
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

    if (sec.teams) {
      // Group section: render per team
      html += `<div class="sticker-grid">`;
      // Group header sticker
      const header = filtered.find(s => s.type === 'group-header');
      if (header) html += stickerCard(header);

      for (const code of sec.teams) {
        const teamStickers = filtered.filter(s => s.teamCode === code);
        if (teamStickers.length === 0) continue;
        const t = TEAMS[code];
        html += `<div class="team-header" style="color:${t.color}20;">${t.flag} ${t.name}</div>`;
        teamStickers.forEach(s => { html += stickerCard(s); });
      }
      html += `</div>`;
    } else {
      html += `<div class="sticker-grid">`;
      filtered.forEach(s => { html += stickerCard(s); });
      html += `</div>`;
    }
  }

  if (html.indexOf('sticker-card') === -1) {
    html += `<div class="empty-state"><div class="empty-icon">🔍</div><p>Nenhuma figurinha encontrada.</p></div>`;
  }

  container.innerHTML = html;
  // Re-attach search input listener after re-render
  const inp = document.getElementById('search-input');
  if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
}

// ===== NEEDED VIEW =====
function renderNeeded() {
  const container = document.getElementById('view-needed');
  const needed = STICKERS.filter(s => getCount(s.id) === 0);
  if (needed.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🎉</div><p>Álbum completo! Parabéns!</p></div>`;
    return;
  }
  let bySection = {};
  needed.forEach(s => {
    if (!bySection[s.sectionIdx]) bySection[s.sectionIdx] = [];
    bySection[s.sectionIdx].push(s);
  });
  let html = `<p style="color:var(--text-muted);font-size:.8rem;margin-bottom:12px;">Faltam <strong style="color:var(--text)">${needed.length}</strong> figurinhas para completar o álbum.</p>`;
  for (const secIdx in bySection) {
    const sec = SECTIONS[secIdx];
    html += `<div class="list-section"><h3>${sec.icon} ${sec.name}</h3>`;
    bySection[secIdx].forEach(s => {
      html += `<div class="sticker-row" onclick="openModal(${s.id})">
        <span class="row-num">#${s.id}</span>
        <span class="row-name">${s.name}</span>
        <span class="row-badge red">Falta</span>
      </div>`;
    });
    html += `</div>`;
  }
  container.innerHTML = html;
}

// ===== DUPLICATES VIEW =====
function renderDuplicates() {
  const container = document.getElementById('view-duplicates');
  const dups = STICKERS.filter(s => getCount(s.id) > 1);
  if (dups.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📦</div><p>Nenhuma figurinha repetida ainda.</p></div>`;
    return;
  }
  let bySection = {};
  dups.forEach(s => {
    if (!bySection[s.sectionIdx]) bySection[s.sectionIdx] = [];
    bySection[s.sectionIdx].push(s);
  });
  const totalExtras = dups.reduce((acc, s) => acc + getCount(s.id) - 1, 0);
  let html = `<p style="color:var(--text-muted);font-size:.8rem;margin-bottom:12px;"><strong style="color:var(--text)">${totalExtras}</strong> repetidas para trocar de <strong style="color:var(--text)">${dups.length}</strong> figurinhas diferentes.</p>`;
  for (const secIdx in bySection) {
    const sec = SECTIONS[secIdx];
    html += `<div class="list-section"><h3>${sec.icon} ${sec.name}</h3>`;
    bySection[secIdx].forEach(s => {
      const extras = getCount(s.id) - 1;
      html += `<div class="sticker-row" onclick="openModal(${s.id})">
        <span class="row-num">#${s.id}</span>
        <span class="row-name">${s.name}</span>
        <span class="row-badge orange">+${extras}</span>
      </div>`;
    });
    html += `</div>`;
  }
  container.innerHTML = html;
}

// ===== STATS VIEW =====
function renderStats() {
  const container = document.getElementById('view-stats');
  const { total, collected, missing, duplicate } = computeStats();
  const pct = Math.round((collected / total) * 100);

  let html = `<div class="stats-card">
    <h3>Progresso Geral</h3>
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
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
    </div>
  </div>`;

  // Per-section
  html += `<div class="stats-card"><h3>Por Seção</h3>`;
  for (const sec of SECTIONS) {
    const secStickers = STICKERS.filter(s => s.sectionIdx === sec.id);
    const secCollected = secStickers.filter(s => getCount(s.id) > 0).length;
    const secPct = Math.round((secCollected / secStickers.length) * 100);
    html += `<div style="padding:8px 0;border-bottom:1px solid var(--border)">
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;margin-bottom:4px">
        <span>${sec.icon} ${sec.name}</span>
        <span style="color:var(--text-muted)">${secCollected}/${secStickers.length}</span>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width:${secPct}%"></div>
      </div>
    </div>`;
  }
  html += `</div>`;

  // Per-team
  html += `<div class="stats-card"><h3>Por Seleção</h3>`;
  for (const code in TEAMS) {
    const t = TEAMS[code];
    const teamStickers = STICKERS.filter(s => s.teamCode === code);
    if (teamStickers.length === 0) continue;
    const teamCollected = teamStickers.filter(s => getCount(s.id) > 0).length;
    html += `<div class="team-stat-row">
      <span class="flag">${t.flag}</span>
      <span class="name">${t.name}</span>
      <span class="count">${teamCollected}/${teamStickers.length}</span>
    </div>`;
  }
  html += `</div>`;

  container.innerHTML = html;
}

// ===== TRADE VIEW =====
function renderTrade() {
  const container = document.getElementById('view-trade');
  const dups = STICKERS.filter(s => getCount(s.id) > 1);
  const missing = STICKERS.filter(s => getCount(s.id) === 0);

  let html = `<div class="trade-section">
    <h3>Compartilhar para Troca</h3>
    <button class="share-btn" onclick="shareList('duplicates')"><span class="icon">📤</span> Compartilhar minhas repetidas (${dups.length})</button>
    <button class="share-btn" onclick="shareList('needed')"><span class="icon">📋</span> Compartilhar minha lista de faltantes (${missing.length})</button>
    <div id="share-text" class="copy-area"></div>
  </div>`;

  html += `<div class="trade-section">
    <h3>Dados do Álbum</h3>
    <div class="io-row">
      <button class="btn btn-ghost" onclick="exportData()">⬆ Exportar</button>
      <label class="btn btn-ghost" style="cursor:pointer;text-align:center">⬇ Importar<input type="file" accept=".json" style="display:none" onchange="importData(event)"></label>
    </div>
    <p style="color:var(--text-muted);font-size:.75rem;text-align:center;">Salve ou carregue seus dados em outro dispositivo.</p>
  </div>`;

  html += `<div class="trade-section">
    <h3>Limpar Dados</h3>
    <button class="btn btn-danger" onclick="resetConfirm()" style="width:100%">🗑 Apagar todos os dados</button>
  </div>`;

  container.innerHTML = html;
}

function shareList(type) {
  const area = document.getElementById('share-text');
  const list = type === 'duplicates'
    ? STICKERS.filter(s => getCount(s.id) > 1)
    : STICKERS.filter(s => getCount(s.id) === 0);

  if (list.length === 0) {
    area.textContent = type === 'duplicates' ? 'Sem repetidas ainda.' : 'Álbum completo!';
    area.classList.add('visible');
    return;
  }

  const title = type === 'duplicates' ? '🔁 Minhas figurinhas repetidas (Copa 2026):' : '📋 Figurinhas que me faltam (Copa 2026):';
  const lines = list.map(s => {
    const extra = type === 'duplicates' ? ` (x${getCount(s.id) - 1})` : '';
    return `#${s.id} ${s.name}${extra}`;
  });
  const text = `${title}\n${lines.join('\n')}`;

  area.textContent = text;
  area.classList.add('visible');

  if (navigator.share) {
    navigator.share({ title: 'Copa 2026 - Panini', text }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      area.textContent = '✓ Copiado!\n\n' + text;
    });
  }
}

function exportData() {
  const data = { version: 1, counts, exported: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `copa2026_${new Date().toISOString().slice(0,10)}.json`;
  a.click(); URL.revokeObjectURL(url);
}

function importData(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (data.counts) {
        counts = data.counts;
        saveState();
        refreshAll();
        alert('Dados importados com sucesso!');
      }
    } catch { alert('Arquivo inválido.'); }
  };
  reader.readAsText(file);
}

function resetConfirm() {
  if (confirm('Apagar TODOS os dados do álbum? Esta ação não pode ser desfeita.')) {
    counts = {}; saveState(); refreshAll();
  }
}

// ===== MODAL =====
function openModal(num) {
  modalStickerNum = num;
  const s = STICKERS.find(x => x.id === num);
  if (!s) return;
  const c = getCount(num);
  document.getElementById('modal-title').textContent = `Figurinha #${num}`;
  document.getElementById('modal-name').textContent = s.name;
  document.getElementById('modal-count').textContent = c;
  document.getElementById('modal-label').textContent =
    c === 0 ? 'Não tenho' : c === 1 ? 'Tenho (sem repetidas)' : `Tenho ${c} cópias (+${c-1} para trocar)`;
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  modalStickerNum = null;
}

function modalChange(delta) {
  if (modalStickerNum === null) return;
  const cur = getCount(modalStickerNum);
  const next = Math.max(0, cur + delta);
  setCount(modalStickerNum, next);
  document.getElementById('modal-count').textContent = next;
  document.getElementById('modal-label').textContent =
    next === 0 ? 'Não tenho' : next === 1 ? 'Tenho (sem repetidas)' : `Tenho ${next} cópias (+${next-1} para trocar)`;
  refreshViews();
}

function modalClear() {
  if (modalStickerNum === null) return;
  setCount(modalStickerNum, 0);
  document.getElementById('modal-count').textContent = 0;
  document.getElementById('modal-label').textContent = 'Não tenho';
  refreshViews();
}

// ===== NAVIGATION =====
function showView(name) {
  currentView = name;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`view-${name}`).classList.add('active');
  document.querySelector(`[data-view="${name}"]`).classList.add('active');
  renderView(name);
}

function renderView(name) {
  if (name === 'album') renderAlbum();
  else if (name === 'needed') renderNeeded();
  else if (name === 'duplicates') renderDuplicates();
  else if (name === 'stats') renderStats();
  else if (name === 'trade') renderTrade();
  renderHeader();
}

function refreshViews() {
  renderHeader();
  if (currentView === 'album') renderAlbum();
  else if (currentView === 'needed') renderNeeded();
  else if (currentView === 'duplicates') renderDuplicates();
  else if (currentView === 'stats') renderStats();
  else if (currentView === 'trade') renderTrade();
}

function refreshAll() {
  renderView(currentView);
}

// ===== SEARCH & FILTER =====
function onSearch(val) {
  searchQuery = val;
  renderAlbum();
}

function setAlbumFilter(f) {
  albumFilter = f;
  renderAlbum();
}

// ===== KEYBOARD =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (document.getElementById('modal-overlay').classList.contains('open')) {
    if (e.key === '+' || e.key === '=') modalChange(1);
    if (e.key === '-') modalChange(-1);
  }
});

// Close modal on overlay click
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// ===== INIT =====
loadState();
showView('album');

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
