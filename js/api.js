// ═══════════════════════════════════════════════════
//  Oracle ORDS — API Client
//  Endpoints usados:
//    GET/POST/PUT/DELETE  {base}/users/{id}
//    GET/POST/PUT         {base}/userdata/{user_id}
// ═══════════════════════════════════════════════════

const ORACLE_CFG_KEY = 'copa2026_oracle';

let _ordsBase = null;   // ex: https://xxx.adb.region.oraclecloudapps.com/ords/copa2026
let _syncTimer = null;
let _pendingSync = false;
let _syncStatus = 'idle'; // idle | syncing | ok | error

// ── Config ──────────────────────────────────────────
function getOracleCfg() {
  try { return JSON.parse(localStorage.getItem(ORACLE_CFG_KEY) || '{}'); } catch { return {}; }
}
function saveOracleCfg(cfg) {
  localStorage.setItem(ORACLE_CFG_KEY, JSON.stringify(cfg));
  _ordsBase = (cfg.url || '').replace(/\/$/, '') || null;
}
function isOracleOn() { return !!_ordsBase; }

function initOracle() {
  const cfg = getOracleCfg();
  _ordsBase = (cfg.url || '').replace(/\/$/, '') || null;
}

// ── HTTP helpers ────────────────────────────────────
function _headers(method = 'GET') {
  const cfg = getOracleCfg();
  const h = { 'Accept': 'application/json' };
  if (method !== 'GET') h['Content-Type'] = 'application/json';
  if (cfg.user && cfg.pass) h['Authorization'] = 'Basic ' + btoa(`${cfg.user}:${cfg.pass}`);
  return h;
}

async function _fetch(method, path, body) {
  const url = `${_ordsBase}${path}`;
  const opts = { method, headers: _headers(method) };
  if (body !== undefined) opts.body = JSON.stringify(body);
  const r = await fetch(url, opts);
  if (!r.ok) {
    const txt = await r.text().catch(() => r.status);
    throw new Error(`${method} ${path} → HTTP ${r.status}: ${txt}`);
  }
  const ct = r.headers.get('content-type') || '';
  if (r.status === 204 || !ct.includes('json')) return {};
  return r.json();
}

// ── Users ───────────────────────────────────────────
async function apiGetUsers() {
  const data = await _fetch('GET', '/users/?limit=200');
  return (data.items || []).map(normalizeUser);
}

async function apiCreateUser(u) {
  await _fetch('POST', '/users/', {
    id: u.id, name: u.name, emoji: u.emoji, color: u.color
  });
  // Cria linha de dados vazia
  try { await _fetch('POST', '/userdata/', { user_id: u.id, counts: '{}' }); } catch {}
}

async function apiUpdateUser(u) {
  await _fetch('PUT', `/users/${u.id}`, {
    id: u.id, name: u.name, emoji: u.emoji, color: u.color
  });
}

async function apiDeleteUser(id) {
  await _fetch('DELETE', `/users/${id}`);
}

function normalizeUser(u) {
  return {
    id:      u.id,
    name:    u.name,
    emoji:   u.emoji  || '⚽',
    color:   u.color  || '#1976D2',
    created: u.created_at ? new Date(u.created_at).getTime() : Date.now(),
  };
}

// ── Counts ──────────────────────────────────────────
async function apiGetCounts(userId) {
  try {
    const data = await _fetch('GET', `/userdata/${userId}`);
    return JSON.parse(data.counts || '{}');
  } catch {
    return {};
  }
}

async function apiSaveCounts(userId, counts) {
  const body = { user_id: userId, counts: JSON.stringify(counts) };
  try {
    await _fetch('PUT', `/userdata/${userId}`, body);
  } catch {
    // Se não existe (404), cria
    await _fetch('POST', '/userdata/', body);
  }
}

// ── Test ────────────────────────────────────────────
async function apiTest() {
  try {
    await _fetch('GET', '/users/?limit=1');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ── Sync status UI ──────────────────────────────────
function setSyncStatus(s) {
  _syncStatus = s;
  const el = document.getElementById('sync-status');
  if (!el) return;
  const icons = { idle:'', syncing:'🔄', ok:'☁️✓', error:'⚠️' };
  el.textContent = icons[s] || '';
  el.title = s === 'error' ? 'Erro ao sincronizar com Oracle' :
             s === 'ok'    ? 'Sincronizado com Oracle'       :
             s === 'syncing'? 'Sincronizando…'               : '';
}

// ── Debounced save ──────────────────────────────────
function scheduleSave(userId, counts) {
  if (!isOracleOn()) return;
  _pendingSync = true;
  clearTimeout(_syncTimer);
  setSyncStatus('syncing');
  _syncTimer = setTimeout(async () => {
    try {
      await apiSaveCounts(userId, counts);
      _pendingSync = false;
      setSyncStatus('ok');
    } catch (e) {
      setSyncStatus('error');
      console.warn('Oracle sync error:', e.message);
    }
  }, 2500);
}

function flushSave(userId, counts) {
  if (!isOracleOn() || !_pendingSync) return;
  clearTimeout(_syncTimer);
  _pendingSync = false;
  apiSaveCounts(userId, counts).catch(() => {});
}

// Boot
initOracle();
