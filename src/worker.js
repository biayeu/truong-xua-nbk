// Máy chủ "Về thăm trường xưa – THPT Nguyễn Bỉnh Khiêm"
// Một Durable Object duy nhất ("nbk") giữ toàn bộ dữ liệu trong SQLite:
// người dùng, lưu bút, tin nhắn, phòng lớp, ảnh (ảnh đại diện, ảnh lớp, ảnh chụp chung), bình chọn đồng phục,
// phương tiện đi học (trong look.veh), hẹn giờ gặp nhau (meets), chữ ký sổ vàng cổng trường (sigs);
// và giữ các kết nối trực tiếp (ai đang online).

const DAY = 86400000;
// lửa trại sân trường: 12 cụm trại, 6 kiểu trang trí; nhả trại sau 15 phút không hoạt động; nhạc chỉ chọn trong danh sách MV chính chủ
const CAMPS = 12, CAMP_STYLES = 6, CAMP_IDLE = 15 * 60000;
const MUSIC = {
  'ArmDp-zijuc': 'NewJeans – Super Shy', 'ekr2nIex040': 'ROSÉ & Bruno Mars – APT.', 'gQlMMD8auMs': 'BLACKPINK – Pink Venom',
  'abPmZCZZrFA': 'Sơn Tùng M-TP – Đừng làm trái tim anh đau', 'OiC1rgCPmUQ': 'Dua Lipa – Dance The Night', 'JGwWNGJdvx8': 'Ed Sheeran – Shape of You'
};
const CHAT_KEEP = 30 * DAY;
const MAX_NOTE = 200, MAX_MSG = 300;
const MAX_AVATAR = 80 * 1024;      // ảnh đại diện sau khi trang tự thu nhỏ
const MAX_SIG = 40 * 1024;         // chữ ký vẽ tay (ảnh PNG nhỏ)
const MAX_PHOTO = 700 * 1024;      // ảnh lớp / ảnh chụp chung sau khi thu nhỏ
const KHOA_RE = /^(19|20)\d\d – (19|20)\d\d$/;

const json = (d, s = 200) => new Response(JSON.stringify(d), {
  status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
});
const clean = (s, n) => String(s ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n);
const normLop = s => clean(s, 10).toUpperCase().replace(/\s+/g, '');
const rnd = n => { const a = new Uint8Array(n); crypto.getRandomValues(a); return [...a].map(b => b.toString(16).padStart(2, '0')).join(''); };
const pin6 = () => String(100000 + (crypto.getRandomValues(new Uint32Array(1))[0] % 900000));
async function sha(s) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
const okRoom = r => r === 'truong' || KHOA_RE.test(r) || /^quan-(bia|mori|che|net|dem|doi|vien1|vien2)$/.test(r);
const LOOK_KEYS = { hair: 12, shoes: 12, acc: 40, uni: 12, skin: 8, veh: 12 };
function cleanLook(l) {
  const o = {}; if (!l || typeof l !== 'object') return o;
  for (const k in LOOK_KEYS) if (l[k] != null) o[k] = clean(l[k], LOOK_KEYS[k]).replace(/[^a-z0-9,_-]/gi, '');
  if (l.nick != null) { const n = clean(l.nick, 16).replace(/[<>&"'`\\]/g, ''); if (n) o.nick = n; }  // biệt danh (đợt 11)
  return o;
}
function dataUrlBytes(d, max, only) {
  const re = only === 'png' ? /^data:image\/(png);base64,([A-Za-z0-9+/=]+)$/ : /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/;
  const m = re.exec(String(d || ''));
  if (!m) return null;
  const bin = atob(m[2]); if (bin.length > max) return 'big';
  const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return { type: 'image/' + m[1], bytes: u };
}

// Âm thanh thật (Freesound, giấy phép CC0 = ai cũng được dùng tự do). Máy chủ lấy một lần rồi nhớ lại 30 ngày.
const AM = {
  d1: '666/666730_1171107', d2: '835/835521_14222808', d3: '748/748468_1315742', d4: '574/574661_97550', d5: '854/854365_16878885', d6: '769/769713_15722114',
  s1: '96/96348_384438', s2: '826/826877_17291018', s3: '264/264045_4632327', s4: '751/751349_11318300', s5: '870/870555_18412227', s6: '737/737170_9617223', s7: '438/438422_2524442',
  b1: '474/474740_3902754', b2: '648/648547_13716703',
  c1: '403/403066_4940561', c2: '457/457895_2741562', c3: '404/404478_5200244',
  n1: '412/412823_4451798', n3: '399/399823_5902878', n4: '572/572167_10680262', n5: '363/363721_6142149',
  ve: '717/717588_97550',
  // miền Bắc / Việt Nam thêm ngày 15/11/2026 (CC0): h1 ếch nhái dế Gia Lâm Hà Nội, h2 làng quê miền Bắc, h3 chùa Bạch Mã Hà Nội, h4 đường Hồ Thiền Quang Hà Nội, h5 phố cổ Hà Nội, h6 còi xe Hà Nội, h7 làng quê xe máy, h8 đêm Cát Tiên, m1 chợ Bến Thành
  h1: '136/136471_2495229', h2: '854/854389_16878885', h3: '842/842051_16719305', h4: '149/149762_756500', h5: '842/842036_16719305', h6: '574/574662_97550', h7: '402/402960_7794234', h8: '806/806575_5417386', m1: '447/447777_8816488', l1: '806/806542_5417386'
};
const AM_CAP = 1600000;
async function amProxy(url, ctx) {
  const id = url.pathname.slice(4).replace(/\.mp3$/, '');
  const path = AM[id];
  if (!path) return new Response('khong co', { status: 404 });
  const key = new Request(url.origin + '/am/' + id + '.mp3');
  const cache = caches.default;
  const hit = await cache.match(key);
  if (hit) return hit;
  for (const q of ['hq', 'lq']) {
    try {
      const f = await fetch('https://cdn.freesound.org/previews/' + path + '-' + q + '.mp3', { headers: { Range: 'bytes=0-' + AM_CAP } });
      if (f.ok || f.status === 206) {
        let buf = await f.arrayBuffer();
        if (buf.byteLength > AM_CAP) buf = buf.slice(0, AM_CAP);
        const r = new Response(buf, { status: 200, headers: { 'content-type': 'audio/mpeg', 'cache-control': 'public, max-age=2592000' } });
        ctx.waitUntil(cache.put(key, r.clone()));
        return r;
      }
    } catch (e) { /* thử bản thấp hơn */ }
  }
  return new Response('loi nguon', { status: 502 });
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    if (url.pathname.startsWith('/am/') && /^\/am\/[a-z0-9]+\.mp3$/.test(url.pathname)) return amProxy(url, ctx);
    if (url.pathname.startsWith('/api/')) {
      const stub = env.SCHOOL.get(env.SCHOOL.idFromName('nbk'));
      return stub.fetch(req);
    }
    if (url.pathname === '/quan-ly') return env.ASSETS.fetch(new Request(new URL('/quan-ly.html', url), req));
    return env.ASSETS.fetch(req);
  }
};

import { DurableObject } from 'cloudflare:workers';

export class School extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(`
      CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY, key TEXT UNIQUE, pin TEXT, name TEXT, base TEXT, lop TEXT, khoa TEXT,
        role TEXT, sex TEXT, season TEXT, look TEXT DEFAULT '{}', av INTEGER DEFAULT 0, banned INTEGER DEFAULT 0, ip TEXT, ts INTEGER);
      CREATE INDEX IF NOT EXISTS users_name ON users(name);
      CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT, text TEXT, ts INTEGER);
      CREATE TABLE IF NOT EXISTS msgs(id INTEGER PRIMARY KEY AUTOINCREMENT, room TEXT, uid TEXT, text TEXT, ts INTEGER);
      CREATE INDEX IF NOT EXISTS msgs_room ON msgs(room, ts);
      CREATE TABLE IF NOT EXISTS rooms(lop TEXT PRIMARY KEY, idx INTEGER, khoa TEXT, ts INTEGER);
      CREATE TABLE IF NOT EXISTS rclaims(room TEXT, khoa TEXT, lop TEXT, uid TEXT, ts INTEGER, PRIMARY KEY(room, khoa));
      CREATE UNIQUE INDEX IF NOT EXISTS rclaims_lop ON rclaims(lop, khoa);
      CREATE TABLE IF NOT EXISTS avatars(uid TEXT PRIMARY KEY, type TEXT, data BLOB);
      CREATE TABLE IF NOT EXISTS photos(id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT, kind TEXT, lop TEXT, khoa TEXT, cap TEXT,
        type TEXT, data BLOB, ok INTEGER DEFAULT 0, ts INTEGER);
      CREATE TABLE IF NOT EXISTS uvote(uid TEXT PRIMARY KEY, khoa TEXT, he TEXT, dong TEXT);
      CREATE TABLE IF NOT EXISTS meta(k TEXT PRIMARY KEY, v TEXT);
      CREATE TABLE IF NOT EXISTS meets(id INTEGER PRIMARY KEY AUTOINCREMENT, room TEXT, title TEXT, at INTEGER, uid TEXT, ts INTEGER, done INTEGER DEFAULT 0);
      CREATE INDEX IF NOT EXISTS meets_at ON meets(done, at);
      CREATE TABLE IF NOT EXISTS sigs(uid TEXT PRIMARY KEY, type TEXT, data BLOB, ts INTEGER);
      CREATE TABLE IF NOT EXISTS camps(id INTEGER PRIMARY KEY, uid TEXT, style INTEGER, ts INTEGER, seen INTEGER);
      CREATE TABLE IF NOT EXISTS hits(k TEXT, ts INTEGER);
      CREATE INDEX IF NOT EXISTS hits_k ON hits(k, ts);
    `);
  }
  row(q, ...a) { const r = this.sql.exec(q, ...a).toArray(); return r[0] || null; }
  campList() {
    this.sql.exec('DELETE FROM camps WHERE seen<?', Date.now() - CAMP_IDLE);
    return this.all('SELECT c.id,c.uid,c.style,c.ts,u.name FROM camps c LEFT JOIN users u ON u.id=c.uid ORDER BY c.id');
  }
  campMusic() { const r = this.row("SELECT v FROM meta WHERE k='campmusic'"); try { return r ? JSON.parse(r.v) : null; } catch (e) { return null; } }
  all(q, ...a) { return this.sql.exec(q, ...a).toArray(); }
  // giới hạn số lần làm một việc trong một khoảng thời gian (chống phá)
  limit(k, n, ms) {
    const now = Date.now();
    if (Math.random() < 0.02) this.sql.exec('DELETE FROM hits WHERE ts<?', now - DAY);
    const c = this.row('SELECT COUNT(*) c FROM hits WHERE k=? AND ts>?', k, now - ms).c;
    if (c >= n) return false;
    this.sql.exec('INSERT INTO hits(k,ts) VALUES(?,?)', k, now); return true;
  }
  pub(u) {
    let look = {}; try { look = JSON.parse(u.look || '{}'); } catch (e) { }
    return { id: u.id, name: u.name, lop: u.lop, khoa: u.khoa, role: u.role, sex: u.sex, season: u.season, look, av: u.av || 0 };
  }
  me(key) { if (!key) return null; const u = this.row('SELECT * FROM users WHERE key=?', String(key)); return u && !u.banned ? u : (u ? 'banned' : null); }
  broadcast(o, except) {
    const s = JSON.stringify(o);
    for (const ws of this.ctx.getWebSockets()) { if (ws === except || ws.readyState !== 1) continue; try { ws.send(s); } catch (e) { } }
  }
  // từ 15/11/2026 không tự xếp phòng nữa: ai đến trước thì tự nhận phòng (xem /rooms/claim)
  claimRoom(p) { }
  roomClaims() {
    return this.all('SELECT c.room,c.khoa,c.lop,c.uid,c.ts,u.name FROM rclaims c LEFT JOIN users u ON u.id=c.uid ORDER BY c.ts');
  }
  noteOut(r) { return { id: r.id, uid: r.uid, text: r.text, ts: r.ts, name: r.name, lop: r.lop, khoa: r.khoa, role: r.role }; }
  msgOut(r) { return { id: r.id, room: r.room, uid: r.uid, text: r.text, ts: r.ts, name: r.name, lop: r.lop, khoa: r.khoa, role: r.role }; }
  photoOut(r) { return { id: r.id, uid: r.uid, kind: r.kind, lop: r.lop, khoa: r.khoa, cap: r.cap, ts: r.ts, ok: r.ok, name: r.name }; }
  meetOut(r) { return { id: r.id, room: r.room, title: r.title, at: r.at, uid: r.uid, name: r.name, lop: r.lop, khoa: r.khoa }; }
  meetRows(extra) {
    return this.all("SELECT m.*,u.name,u.lop,u.khoa FROM meets m JOIN users u ON u.id=m.uid WHERE u.banned=0 AND m.at>? " + (extra || '') + " ORDER BY m.at LIMIT 80", Date.now() - 2 * 3600000).map(r => this.meetOut(r));
  }
  // đặt báo thức của máy chủ vào giờ hẹn gần nhất chưa báo
  async schedule() {
    const n = this.row('SELECT MIN(at) a FROM meets WHERE done=0');
    if (n && n.a) await this.ctx.storage.setAlarm(Math.max(n.a, Date.now() + 1000));
  }
  // tới giờ hẹn: báo cho mọi người đang online (trang của khóa đó sẽ đánh trống và hiện thông báo)
  async alarm() {
    const now = Date.now();
    for (const r of this.all("SELECT m.*,u.name,u.lop,u.khoa FROM meets m JOIN users u ON u.id=m.uid WHERE m.done=0 AND m.at<=?", now)) {
      this.sql.exec('UPDATE meets SET done=1 WHERE id=?', r.id);
      if (now - r.at < 10 * 60000) this.broadcast({ t: 'meetnow', meet: this.meetOut(r) });
    }
    this.sql.exec('DELETE FROM meets WHERE at<?', now - 7 * DAY);
    await this.schedule();
  }
  vehicleStats() {
    const out = {};
    for (const r of this.all("SELECT khoa, COALESCE(json_extract(look,'$.veh'),'xedap') v, COUNT(*) n FROM users WHERE banned=0 AND role='hs' AND khoa<>'' AND json_valid(look) AND json_extract(look,'$.veh') IS NOT NULL GROUP BY khoa, v")) {
      (out[r.khoa] = out[r.khoa] || {})[r.v] = r.n;
    }
    return out;
  }
  uniformVotes() {
    const out = {};
    for (const v of this.all('SELECT v.khoa,v.he,v.dong FROM uvote v JOIN users u ON u.id=v.uid WHERE u.banned=0')) {
      const o = out[v.khoa] = out[v.khoa] || { he: {}, dong: {} };
      if (v.he) o.he[v.he] = (o.he[v.he] || 0) + 1;
      if (v.dong) o.dong[v.dong] = (o.dong[v.dong] || 0) + 1;
    }
    return out;
  }
  peerInfo(ws) { const a = ws.deserializeAttachment(); return a && a.u ? Object.assign({}, a.u, { p: a.p || null }) : null; }
  refreshPeer(u) {
    // cập nhật thông tin người này trên mọi kết nối đang mở của họ và báo cho mọi người
    const pu = this.pub(u);
    for (const ws of this.ctx.getWebSockets()) { const a = ws.deserializeAttachment(); if (a && a.u && a.u.id === u.id) { a.u = pu; ws.serializeAttachment(a); } }
    this.broadcast({ t: 'look', peer: pu });
  }

  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname.slice(4);
    const ip = req.headers.get('cf-connecting-ip') || 'local';
    try {
      if (path === '/live') return this.live(req, url);
      if (req.method === 'GET') {
        if (path === '/ping') return json({ ok: true });
        if (path === '/notes') {
          return json({ notes: this.all("SELECT n.*,u.name,u.lop,u.khoa,u.role FROM notes n JOIN users u ON u.id=n.uid WHERE u.banned=0 ORDER BY n.id DESC LIMIT 500").map(r => this.noteOut(r)) });
        }
        if (path === '/msgs') {
          const room = String(url.searchParams.get('room') || 'truong'); if (!okRoom(room)) return json({ msgs: [] });
          const rows = this.all("SELECT m.*,u.name,u.lop,u.khoa,u.role FROM msgs m JOIN users u ON u.id=m.uid WHERE m.room=? AND m.ts>? AND u.banned=0 ORDER BY m.id DESC LIMIT 100", room, Date.now() - CHAT_KEEP);
          return json({ msgs: rows.reverse().map(r => this.msgOut(r)) });
        }
        if (path === '/rooms') {
          const people = this.all("SELECT lop,khoa,COUNT(*) n FROM users WHERE banned=0 AND role='hs' AND lop<>'' GROUP BY lop,khoa");
          return json({ claims: this.roomClaims(), people });
        }
        if (path === '/camps') return json({ camps: this.campList(), music: this.campMusic(), now: Date.now() });
        if (path === '/solop') {
          const people = this.all("SELECT u.id,u.name,u.lop,u.khoa,u.role,u.av,(SELECT COUNT(*) FROM notes n WHERE n.uid=u.id) nc FROM users u WHERE u.banned=0 AND u.khoa<>'' ORDER BY u.name");
          return json({ people });
        }
        if (path === '/uniform') return json({ votes: this.uniformVotes() });
        if (path === '/vehicles') return json({ stats: this.vehicleStats() });
        if (path === '/meets') return json({ meets: this.meetRows(), now: Date.now() });
        if (path === '/book') {
          // sổ vàng cổng trường: tất cả người đã từng vào (kèm chữ ký nếu có)
          const people = this.all("SELECT u.id,u.name,u.lop,u.khoa,u.role,u.ts,s.ts sg FROM users u LEFT JOIN sigs s ON s.uid=u.id WHERE u.banned=0 ORDER BY u.ts DESC LIMIT 400");
          const total = this.row('SELECT COUNT(*) c FROM users WHERE banned=0').c;
          return json({ people, total });
        }
        if (path === '/sig') {
          const r = this.row('SELECT s.type,s.data FROM sigs s JOIN users u ON u.id=s.uid WHERE s.uid=? AND u.banned=0', String(url.searchParams.get('id') || ''));
          if (!r) return new Response('', { status: 404 });
          return new Response(r.data, { headers: { 'content-type': r.type, 'cache-control': 'public, max-age=3600' } });
        }
        if (path === '/avatar') {
          const r = this.row('SELECT a.type,a.data FROM avatars a JOIN users u ON u.id=a.uid WHERE a.uid=? AND u.banned=0', String(url.searchParams.get('id') || ''));
          if (!r) return new Response('', { status: 404 });
          return new Response(r.data, { headers: { 'content-type': r.type, 'cache-control': 'public, max-age=86400' } });
        }
        if (path === '/photos') {
          // ảnh đã duyệt của một lớp (hoặc cả trường nếu không ghi lớp)
          const lop = normLop(url.searchParams.get('lop') || ''), khoa = String(url.searchParams.get('khoa') || '');
          const rows = lop
            ? this.all("SELECT p.id,p.uid,p.kind,p.lop,p.khoa,p.cap,p.ts,p.ok,u.name FROM photos p JOIN users u ON u.id=p.uid WHERE p.ok=1 AND p.lop=? AND (?='' OR p.khoa=?) ORDER BY p.id DESC LIMIT 60", lop, khoa, khoa)
            : this.all("SELECT p.id,p.uid,p.kind,p.lop,p.khoa,p.cap,p.ts,p.ok,u.name FROM photos p JOIN users u ON u.id=p.uid WHERE p.ok=1 ORDER BY p.id DESC LIMIT 60");
          return json({ photos: rows.map(r => this.photoOut(r)) });
        }
        if (path === '/photo') {
          const id = Number(url.searchParams.get('id')), pass = url.searchParams.get('pass');
          const r = this.row('SELECT type,data,ok FROM photos WHERE id=?', id);
          if (!r) return new Response('', { status: 404 });
          if (!r.ok && !(pass && await this.isAdmin(pass))) return new Response('', { status: 403 });
          return new Response(r.data, { headers: { 'content-type': r.type, 'cache-control': r.ok ? 'public, max-age=86400' : 'no-store' } });
        }
        return json({ error: 'Không có trang này' }, 404);
      }

      // ---------- các yêu cầu gửi lên (POST) ----------
      if (req.method !== 'POST') return json({ error: 'Sai cách gọi' }, 405);
      const len = Number(req.headers.get('content-length') || 0);
      if (len > 1200 * 1024) return json({ error: 'Ảnh quá lớn.' }, 413);
      let b = {}; try { b = await req.json(); } catch (e) { return json({ error: 'Dữ liệu không đúng' }, 400); }

      if (path === '/join') {
        const p = { base: clean(b.name, 40), lop: normLop(b.lop), khoa: KHOA_RE.test(b.khoa) ? b.khoa : '', role: b.role === 'gv' ? 'gv' : 'hs',
          sex: b.sex === 'nu' ? 'nu' : 'nam', season: ['he', 'dong', 'td', 'auto'].includes(b.season) ? b.season : 'he', look: JSON.stringify(cleanLook(b.look)) };
        if (p.base.length < 2) return json({ error: 'Bạn nhập họ tên đầy đủ nhé.' }, 400);
        if (p.role === 'gv') p.lop = '';
        const old = b.key ? this.row('SELECT * FROM users WHERE key=?', String(b.key)) : null;
        if (old && old.banned) return json({ error: 'Tên này đã bị chặn.' }, 403);
        // cùng tên + lớp + khóa với người khác thì thêm (2), (3)
        const uniq = (base, selfId) => {
          let name = base, i = 1;
          while (this.row('SELECT id FROM users WHERE name=? AND lop=? AND khoa=? AND id<>?', name, p.lop, p.khoa, selfId || '')) name = base + ' (' + (++i) + ')';
          return name;
        };
        if (old) {
          const name = (old.base === p.base && old.lop === p.lop && old.khoa === p.khoa) ? old.name : uniq(p.base, old.id);
          this.sql.exec('UPDATE users SET name=?,base=?,lop=?,khoa=?,role=?,sex=?,season=?,look=? WHERE id=?', name, p.base, p.lop, p.khoa, p.role, p.sex, p.season, p.look, old.id);
          const me = this.row('SELECT * FROM users WHERE id=?', old.id);
          this.claimRoom(p); this.refreshPeer(me);
          return json({ user: this.pub(me), key: me.key, pin: me.pin });
        }
        if (!this.limit('join:' + ip, 40, 3600000)) return json({ error: 'Mạng này tạo nhiều tên quá, bạn đợi một lúc nhé.' }, 429);
        const id = 'u' + rnd(6), key = rnd(16), pin = pin6(), name = uniq(p.base);
        this.sql.exec('INSERT INTO users(id,key,pin,name,base,lop,khoa,role,sex,season,look,ip,ts) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
          id, key, pin, name, p.base, p.lop, p.khoa, p.role, p.sex, p.season, p.look, ip, Date.now());
        this.claimRoom(p);
        return json({ user: this.pub(this.row('SELECT * FROM users WHERE id=?', id)), key, pin, isNew: true });
      }
      if (path === '/recover') {
        if (!this.limit('rec:' + ip, 10, 3600000)) return json({ error: 'Thử nhiều lần quá, bạn đợi một lúc nhé.' }, 429);
        const u = this.row('SELECT * FROM users WHERE (name=? OR base=?) AND pin=? AND banned=0', clean(b.name, 44), clean(b.name, 44), String(b.pin || ''));
        if (!u) return json({ error: 'Không thấy tên và mã này. Bạn kiểm tra lại nhé.' }, 404);
        return json({ key: u.key, user: this.pub(u) });
      }
      if (path === '/admin') return this.admin(b);

      // các việc dưới đây cần đã vào trường
      const me = this.me(b.key);
      if (me === 'banned') return json({ error: 'Tên này đã bị chặn.' }, 403);
      if (!me) return json({ error: 'Bạn bấm "Vào trường" và nhập tên trước nhé.' }, 401);

      if (path === '/notes') {
        const text = clean(b.text, MAX_NOTE); if (!text) return json({ error: 'Bạn chưa viết gì.' }, 400);
        if (!this.limit('note:' + me.id, 6, 3600000)) return json({ error: 'Mỗi giờ treo tối đa 6 lời nhắn thôi nhé.' }, 429);
        const r = this.row('INSERT INTO notes(uid,text,ts) VALUES(?,?,?) RETURNING id,ts', me.id, text, Date.now());
        const note = this.noteOut(Object.assign({}, me, { id: r.id, uid: me.id, text, ts: r.ts }));
        this.broadcast({ t: 'note', note });
        return json({ note });
      }
      if (path === '/notes/del') {
        const id = Number(b.id); const n = this.row('SELECT uid FROM notes WHERE id=?', id);
        if (!n || n.uid !== me.id) return json({ error: 'Không gỡ được lời nhắn này.' }, 403);
        this.sql.exec('DELETE FROM notes WHERE id=?', id); this.broadcast({ t: 'delnote', id });
        return json({ ok: true });
      }
      if (path === '/avatar') {
        if (b.data === null) { this.sql.exec('DELETE FROM avatars WHERE uid=?', me.id); this.sql.exec('UPDATE users SET av=0 WHERE id=?', me.id); }
        else {
          const img = dataUrlBytes(b.data, MAX_AVATAR);
          if (!img) return json({ error: 'Ảnh không đúng định dạng.' }, 400);
          if (img === 'big') return json({ error: 'Ảnh quá lớn.' }, 413);
          if (!this.limit('av:' + me.id, 10, DAY)) return json({ error: 'Hôm nay bạn đổi ảnh nhiều quá, mai đổi tiếp nhé.' }, 429);
          this.sql.exec('INSERT OR REPLACE INTO avatars(uid,type,data) VALUES(?,?,?)', me.id, img.type, img.bytes.buffer);
          this.sql.exec('UPDATE users SET av=? WHERE id=?', Date.now(), me.id);
        }
        const u = this.row('SELECT * FROM users WHERE id=?', me.id); this.refreshPeer(u);
        return json({ user: this.pub(u) });
      }
      if (path === '/photos') {
        const kind = b.kind === 'chung' ? 'chung' : 'lop';
        const img = dataUrlBytes(b.data, MAX_PHOTO);
        if (!img) return json({ error: 'Ảnh không đúng định dạng.' }, 400);
        if (img === 'big') return json({ error: 'Ảnh quá lớn.' }, 413);
        if (!this.limit('ph:' + me.id, 8, DAY)) return json({ error: 'Mỗi ngày gửi tối đa 8 ảnh thôi nhé.' }, 429);
        const lop = normLop(b.lop || me.lop), khoa = KHOA_RE.test(b.khoa) ? b.khoa : me.khoa;
        const r = this.row('INSERT INTO photos(uid,kind,lop,khoa,cap,type,data,ok,ts) VALUES(?,?,?,?,?,?,?,0,?) RETURNING id', me.id, kind, lop, khoa, clean(b.cap, 120), img.type, img.bytes.buffer, Date.now());
        return json({ ok: true, id: r.id });
      }
      if (path === '/photos/mine') {
        return json({ photos: this.all("SELECT p.id,p.uid,p.kind,p.lop,p.khoa,p.cap,p.ts,p.ok,'' name FROM photos p WHERE p.uid=? ORDER BY id DESC LIMIT 30", me.id).map(r => this.photoOut(r)) });
      }
      if (path === '/photos/del') {
        const p = this.row('SELECT uid FROM photos WHERE id=?', Number(b.id));
        if (!p || p.uid !== me.id) return json({ error: 'Không gỡ được ảnh này.' }, 403);
        this.sql.exec('DELETE FROM photos WHERE id=?', Number(b.id)); this.broadcast({ t: 'photos' });
        return json({ ok: true });
      }
      // nhận phòng: mỗi phòng, mỗi niên khóa một lớp; mỗi lớp của một khóa chỉ một phòng; người nhận sửa/bỏ trong 24 giờ
      if (path === '/rooms/claim' || path === '/rooms/edit' || path === '/rooms/unclaim') {
        const room = String(b.room || ''); if (!/^[A-Z][1-3]-\d{1,2}$/.test(room)) return json({ error: 'Phòng không đúng.' }, 400);
        const khoa = String(b.khoa || ''); if (!KHOA_RE.test(khoa)) return json({ error: 'Bạn chọn niên khóa nhé.' }, 400);
        const cur = this.row('SELECT * FROM rclaims WHERE room=? AND khoa=?', room, khoa);
        if (path === '/rooms/unclaim') {
          if (!cur || cur.uid !== me.id || Date.now() - cur.ts > DAY) return json({ error: 'Chỉ người nhận phòng mới bỏ được, trong 24 giờ. Quá hạn thì nhờ người lập trang.' }, 403);
          this.sql.exec('DELETE FROM rclaims WHERE room=? AND khoa=?', room, khoa); this.broadcast({ t: 'rooms' }); return json({ ok: true });
        }
        const lop = normLop(b.lop); if (!/^\d{1,2}[A-ZĐ0-9]{1,6}$/.test(lop)) return json({ error: 'Bạn ghi tên lớp kiểu 12A1, 10C3 nhé.' }, 400);
        const other = this.row('SELECT room FROM rclaims WHERE lop=? AND khoa=? AND room<>?', lop, khoa, room);
        if (path === '/rooms/edit') {
          if (!cur || cur.uid !== me.id || Date.now() - cur.ts > DAY) return json({ error: 'Chỉ người nhận phòng mới sửa được, trong 24 giờ. Quá hạn thì nhờ người lập trang.' }, 403);
          if (other) return json({ error: `Lớp ${lop} khóa ${khoa} đã nhận phòng khác rồi (mã ${other.room}).` }, 409);
          this.sql.exec('UPDATE rclaims SET lop=? WHERE room=? AND khoa=?', lop, room, khoa); this.broadcast({ t: 'rooms' }); return json({ ok: true });
        }
        if (cur) return json({ error: `Phòng này khóa ${khoa} đã có lớp ${cur.lop} nhận trước rồi.` }, 409);
        if (other) return json({ error: `Lớp ${lop} khóa ${khoa} đã nhận phòng khác rồi. Bạn bấm "Tìm lớp" để tới đó nhé.` }, 409);
        if (!this.limit('rc:' + me.id, 10, DAY)) return json({ error: 'Hôm nay bạn nhận phòng nhiều quá, mai thử lại nhé.' }, 429);
        this.sql.exec('INSERT INTO rclaims(room,khoa,lop,uid,ts) VALUES(?,?,?,?,?)', room, khoa, lop, me.id, Date.now());
        this.broadcast({ t: 'rooms' }); return json({ ok: true });
      }
      // cụm trại lửa trại: ai đến trước nhận trước, mỗi người một cụm
      if (path === '/camps/claim' || path === '/camps/style' || path === '/camps/leave' || path === '/camps/ping') {
        const list = this.campList(); const mine = list.find(c => c.uid === me.id);
        if (path === '/camps/leave') { if (mine) { this.sql.exec('DELETE FROM camps WHERE id=?', mine.id); this.broadcast({ t: 'camps' }); } return json({ ok: true }); }
        if (path === '/camps/ping') { if (mine) this.sql.exec('UPDATE camps SET seen=? WHERE id=?', Date.now(), mine.id); return json({ ok: true, held: !!mine }); }
        const style = Number(b.style); if (!(style >= 0 && style < CAMP_STYLES)) return json({ error: 'Kiểu trang trí không đúng.' }, 400);
        if (path === '/camps/style') {
          if (!mine) return json({ error: 'Bạn chưa giữ cụm trại nào (có thể đã hết 15 phút không hoạt động).' }, 409);
          this.sql.exec('UPDATE camps SET style=?,seen=? WHERE id=?', style, Date.now(), mine.id); this.broadcast({ t: 'camps' }); return json({ ok: true });
        }
        const id = Number(b.id); if (!(id >= 0 && id < CAMPS)) return json({ error: 'Cụm trại không đúng.' }, 400);
        const cur = list.find(c => c.id === id);
        if (cur && cur.uid === me.id) { this.sql.exec('UPDATE camps SET style=?,seen=? WHERE id=?', style, Date.now(), id); this.broadcast({ t: 'camps' }); return json({ ok: true }); }
        if (cur) return json({ error: `Cụm này ${cur.name || 'một bạn'} nhận trước rồi. Bạn chọn cụm khác nhé.` }, 409);
        if (mine) return json({ error: 'Bạn đang giữ một cụm trại rồi. Bấm "Trả trại" trước nếu muốn đổi chỗ.' }, 409);
        const t = Date.now(); this.sql.exec('INSERT INTO camps(id,uid,style,ts,seen) VALUES(?,?,?,?,?)', id, me.id, style, t, t);
        this.broadcast({ t: 'camps' }); return json({ ok: true });
      }
      // nhạc lửa trại: ai chọn thì bài đó phát cho mọi người gần lửa; mỗi người chọn 1 bài / 5 phút
      if (path === '/music/pick') {
        const vid = String(b.vid || ''); if (!MUSIC[vid]) return json({ error: 'Bài này không có trong danh sách.' }, 400);
        if (!this.limit('mu:' + me.id, 1, 300000)) return json({ error: 'Bạn vừa chọn bài rồi, 5 phút sau chọn tiếp nhé (để mọi người cùng được chọn).' }, 429);
        const m = { vid, title: MUSIC[vid], uid: me.id, name: me.name, ts: Date.now() };
        this.sql.exec("INSERT INTO meta(k,v) VALUES('campmusic',?) ON CONFLICT(k) DO UPDATE SET v=excluded.v", JSON.stringify(m));
        this.broadcast({ t: 'music' }); return json({ ok: true });
      }
      if (path === '/meets') {
        const room = String(b.room || ''); if (!okRoom(room)) return json({ error: 'Bạn chọn khóa nhé.' }, 400);
        const title = clean(b.title, 60) || 'Gặp nhau ở sân trường';
        const at = Number(b.at), now = Date.now();
        if (!isFinite(at) || at < now - 60000 || at > now + 30 * DAY) return json({ error: 'Giờ hẹn phải từ bây giờ tới 30 ngày nữa nhé.' }, 400);
        if (this.row('SELECT COUNT(*) c FROM meets WHERE uid=? AND at>?', me.id, now - 2 * 3600000).c >= 3) return json({ error: 'Mỗi người đang có tối đa 3 hẹn, bạn gỡ bớt một hẹn cũ nhé.' }, 429);
        if (!this.limit('meet:' + me.id, 6, DAY)) return json({ error: 'Hôm nay bạn đặt nhiều hẹn quá, mai đặt tiếp nhé.' }, 429);
        const r = this.row('INSERT INTO meets(room,title,at,uid,ts) VALUES(?,?,?,?,?) RETURNING id', room, title, Math.round(at), me.id, now);
        await this.schedule();
        const meet = this.meetOut(Object.assign({}, me, { id: r.id, room, title, at: Math.round(at), uid: me.id }));
        this.broadcast({ t: 'meet', meet });
        return json({ meet });
      }
      if (path === '/meets/del') {
        const id = Number(b.id), m = this.row('SELECT uid FROM meets WHERE id=?', id);
        if (!m || m.uid !== me.id) return json({ error: 'Không gỡ được hẹn này.' }, 403);
        this.sql.exec('DELETE FROM meets WHERE id=?', id); this.broadcast({ t: 'delmeet', id });
        return json({ ok: true });
      }
      if (path === '/sig') {
        if (b.data === null) { this.sql.exec('DELETE FROM sigs WHERE uid=?', me.id); return json({ ok: true }); }
        const img = dataUrlBytes(b.data, MAX_SIG, 'png');
        if (!img) return json({ error: 'Chữ ký không đúng định dạng.' }, 400);
        if (img === 'big') return json({ error: 'Chữ ký quá lớn, bạn ký đơn giản hơn nhé.' }, 413);
        if (!this.limit('sg:' + me.id, 12, DAY)) return json({ error: 'Hôm nay bạn ký nhiều lần quá, mai ký tiếp nhé.' }, 429);
        const now = Date.now();
        this.sql.exec('INSERT OR REPLACE INTO sigs(uid,type,data,ts) VALUES(?,?,?,?)', me.id, img.type, img.bytes.buffer, now);
        this.broadcast({ t: 'sig', id: me.id, ts: now });
        return json({ ok: true, ts: now });
      }
      if (path === '/uniform') {
        if (!me.khoa) return json({ error: 'Bạn chưa chọn niên khóa.' }, 400);
        const he = clean(b.he, 12).replace(/[^a-z0-9_-]/gi, ''), dong = clean(b.dong, 12).replace(/[^a-z0-9_-]/gi, '');
        this.sql.exec('INSERT OR REPLACE INTO uvote(uid,khoa,he,dong) VALUES(?,?,?,?)', me.id, me.khoa, he, dong);
        const votes = this.uniformVotes(); this.broadcast({ t: 'uniform', votes });
        return json({ votes });
      }
      return json({ error: 'Không có trang này' }, 404);
    } catch (e) {
      return json({ error: 'Máy chủ gặp lỗi, bạn thử lại nhé.' }, 500);
    }
  }

  // ---------- trang quản lý ----------
  async isAdmin(pass) {
    const h = this.row("SELECT v FROM meta WHERE k='admin'"); if (!h || !pass) return false;
    const [salt, hash] = h.v.split(':'); return (await sha(salt + String(pass))) === hash;
  }
  async admin(b) {
    if (b.action === 'status') return json({ claimed: !!this.row("SELECT v FROM meta WHERE k='admin'") });
    if (b.action === 'claim') {
      if (this.row("SELECT v FROM meta WHERE k='admin'")) return json({ error: 'Mật khẩu quản lý đã được đặt rồi.' }, 403);
      if (String(b.pass || '').length < 8) return json({ error: 'Mật khẩu cần ít nhất 8 ký tự.' }, 400);
      const salt = rnd(8); this.sql.exec("INSERT INTO meta(k,v) VALUES('admin',?)", salt + ':' + await sha(salt + String(b.pass)));
      return json({ ok: true });
    }
    if (!this.limit('admin', 120, 60000)) return json({ error: 'Thử nhiều quá, đợi chút nhé.' }, 429);
    if (!(await this.isAdmin(b.pass))) return json({ error: 'Sai mật khẩu.' }, 401);
    const q = clean(b.q, 40), like = '%' + q + '%';
    switch (b.action) {
      case 'login': return json({ ok: true });
      case 'list': {
        const notes = this.all("SELECT n.*,u.name,u.lop,u.khoa,u.role FROM notes n JOIN users u ON u.id=n.uid WHERE (?='' OR n.text LIKE ? OR u.name LIKE ?) ORDER BY n.id DESC LIMIT 200", q, like, like).map(r => this.noteOut(r));
        const msgs = this.all("SELECT m.*,u.name,u.lop,u.khoa,u.role FROM msgs m JOIN users u ON u.id=m.uid WHERE (?='' OR m.text LIKE ? OR u.name LIKE ?) ORDER BY m.id DESC LIMIT 200", q, like, like).map(r => this.msgOut(r));
        const users = this.all("SELECT id,name,lop,khoa,role,sex,season,look,banned,av,ts,(SELECT COUNT(*) FROM notes n WHERE n.uid=users.id) nc,(SELECT COUNT(*) FROM msgs m WHERE m.uid=users.id) mc,(SELECT COUNT(*) FROM photos p WHERE p.uid=users.id) pc FROM users WHERE (?='' OR name LIKE ? OR lop LIKE ?) ORDER BY ts DESC LIMIT 300", q, like, like);
        const photos = this.all("SELECT p.id,p.uid,p.kind,p.lop,p.khoa,p.cap,p.ts,p.ok,u.name FROM photos p JOIN users u ON u.id=p.uid ORDER BY p.ok ASC, p.id DESC LIMIT 200").map(r => this.photoOut(r));
        const pending = this.row('SELECT COUNT(*) c FROM photos WHERE ok=0').c;
        const sigs = this.all('SELECT uid,ts FROM sigs');
        return json({ notes, msgs, users, photos, pending, claims: this.roomClaims(), meets: this.meetRows(), sigs });
      }
      case 'delNote': this.sql.exec('DELETE FROM notes WHERE id=?', Number(b.id)); this.broadcast({ t: 'delnote', id: Number(b.id) }); return json({ ok: true });
      case 'delMsg': this.sql.exec('DELETE FROM msgs WHERE id=?', Number(b.id)); this.broadcast({ t: 'delmsg', id: Number(b.id) }); return json({ ok: true });
      case 'photoOk': this.sql.exec('UPDATE photos SET ok=1 WHERE id=?', Number(b.id)); this.broadcast({ t: 'photos' }); return json({ ok: true });
      case 'photoDel': this.sql.exec('DELETE FROM photos WHERE id=?', Number(b.id)); this.broadcast({ t: 'photos' }); return json({ ok: true });
      case 'delAvatar': {
        this.sql.exec('DELETE FROM avatars WHERE uid=?', String(b.id)); this.sql.exec('UPDATE users SET av=0 WHERE id=?', String(b.id));
        const u = this.row('SELECT * FROM users WHERE id=?', String(b.id)); if (u) this.refreshPeer(u); return json({ ok: true });
      }
      case 'ban': {
        const id = String(b.id);
        this.sql.exec('UPDATE users SET banned=1 WHERE id=?', id);
        this.sql.exec('DELETE FROM notes WHERE uid=?', id); this.sql.exec('DELETE FROM msgs WHERE uid=?', id);
        this.sql.exec('DELETE FROM photos WHERE uid=?', id); this.sql.exec('DELETE FROM avatars WHERE uid=?', id); this.sql.exec('DELETE FROM uvote WHERE uid=?', id);
        this.sql.exec('DELETE FROM sigs WHERE uid=?', id); this.sql.exec('DELETE FROM meets WHERE uid=?', id);
        this.broadcast({ t: 'banned', id });
        for (const ws of this.ctx.getWebSockets()) { const a = ws.deserializeAttachment(); if (a && a.u && a.u.id === id) try { ws.close(4003, 'banned'); } catch (e) { } }
        return json({ ok: true });
      }
      case 'delSig': this.sql.exec('DELETE FROM sigs WHERE uid=?', String(b.id)); this.broadcast({ t: 'sig', id: String(b.id), ts: 0 }); return json({ ok: true });
      case 'delMeet': this.sql.exec('DELETE FROM meets WHERE id=?', Number(b.id)); this.broadcast({ t: 'delmeet', id: Number(b.id) }); return json({ ok: true });
      case 'roomDel': this.sql.exec('DELETE FROM rclaims WHERE room=? AND khoa=?', String(b.room), String(b.khoa)); this.broadcast({ t: 'rooms' }); return json({ ok: true });
      case 'roomEdit': {
        const lop = normLop(b.lop); if (!lop) return json({ error: 'Thiếu tên lớp.' }, 400);
        if (this.row('SELECT room FROM rclaims WHERE lop=? AND khoa=? AND room<>?', lop, String(b.khoa), String(b.room))) return json({ error: 'Lớp này của khóa này đã có phòng khác.' }, 409);
        this.sql.exec('UPDATE rclaims SET lop=? WHERE room=? AND khoa=?', lop, String(b.room), String(b.khoa)); this.broadcast({ t: 'rooms' }); return json({ ok: true });
      }
      case 'campFree': this.sql.exec('DELETE FROM camps WHERE id=?', Number(b.id)); this.broadcast({ t: 'camps' }); return json({ ok: true });
      case 'musicSet': {
        const vid = String(b.vid || '');
        if (!vid) this.sql.exec("DELETE FROM meta WHERE k='campmusic'");
        else { if (!MUSIC[vid]) return json({ error: 'Bài không có trong danh sách.' }, 400); this.sql.exec("INSERT INTO meta(k,v) VALUES('campmusic',?) ON CONFLICT(k) DO UPDATE SET v=excluded.v", JSON.stringify({ vid, title: MUSIC[vid], uid: '', name: 'Người lập trang', ts: Date.now() })); }
        this.broadcast({ t: 'music' }); return json({ ok: true });
      }
      case 'unban': this.sql.exec('UPDATE users SET banned=0 WHERE id=?', String(b.id)); return json({ ok: true });
      case 'resetPass': {
        if (String(b.newPass || '').length < 8) return json({ error: 'Mật khẩu mới cần ít nhất 8 ký tự.' }, 400);
        const salt = rnd(8); this.sql.exec("UPDATE meta SET v=? WHERE k='admin'", salt + ':' + await sha(salt + String(b.newPass)));
        return json({ ok: true });
      }
    }
    return json({ error: 'Không rõ việc cần làm' }, 400);
  }

  // ---------- kết nối trực tiếp: ai đang online, vị trí, chat, vẫy tay ----------
  live(req, url) {
    if (req.headers.get('Upgrade') !== 'websocket') return json({ error: 'Cần kết nối trực tiếp' }, 426);
    const u = this.me(url.searchParams.get('key'));
    const pair = new WebSocketPair(); const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server);
    if (!u || u === 'banned') { server.close(4003, 'no'); return new Response(null, { status: 101, webSocket: client }); }
    const pu = this.pub(u);
    server.serializeAttachment({ u: pu, p: null, c: [] });
    const seen = new Map();
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === server || ws.readyState !== 1) continue;
      const pi = this.peerInfo(ws); if (pi && pi.id !== u.id) seen.set(pi.id, pi);
    }
    server.send(JSON.stringify({ t: 'hello', me: pu, peers: [...seen.values()], votes: this.uniformVotes() }));
    this.broadcast({ t: 'join', peer: Object.assign({}, pu, { p: null }) }, server);
    return new Response(null, { status: 101, webSocket: client });
  }
  webSocketMessage(ws, raw) {
    let m; try { m = JSON.parse(raw); } catch (e) { return; }
    const a = ws.deserializeAttachment(); if (!a || !a.u) return;
    if (m.t === 'pos') {
      const n = v => (typeof v === 'number' && isFinite(v)) ? Math.max(-5000, Math.min(5000, v)) : 0;
      a.p = { x: n(m.x), z: n(m.z), y: n(m.yaw), m: m.m ? 1 : 0, r: m.r ? 1 : 0, h: m.h ? 1 : 0, k: Number.isInteger(m.k) && m.k >= -1 && m.k < 500 ? m.k : -1, f: Math.max(0, Math.min(30, n(m.f))), u: m.u ? 1 : 0, a: m.a ? 1 : 0 };
      ws.serializeAttachment(a);
      this.broadcast({ t: 'pos', id: a.u.id, p: a.p }, ws);
      return;
    }
    if (m.t === 'wave' || m.t === 'pose') {
      const now = Date.now(); if (a.w && now - a.w < 1500) return; a.w = now; ws.serializeAttachment(a);
      this.broadcast({ t: m.t, id: a.u.id }, ws);
      return;
    }
    if (m.t === 'chat') {
      const room = String(m.room || 'truong'); if (!okRoom(room)) return;
      const text = clean(m.text, MAX_MSG); if (!text) return;
      const now = Date.now(); a.c = (a.c || []).filter(t => t > now - 60000);
      if (a.c.length >= 15) { ws.send(JSON.stringify({ t: 'err', text: 'Bạn nhắn nhanh quá, đợi một chút nhé.' })); return; }
      a.c.push(now); ws.serializeAttachment(a);
      const me = this.row('SELECT * FROM users WHERE id=?', a.u.id); if (!me || me.banned) return;
      const r = this.row('INSERT INTO msgs(room,uid,text,ts) VALUES(?,?,?,?) RETURNING id', room, me.id, text, now);
      if (Math.random() < 0.05) this.sql.exec('DELETE FROM msgs WHERE ts<?', now - CHAT_KEEP);
      this.broadcast({ t: 'chat', msg: this.msgOut(Object.assign({}, me, { id: r.id, room, uid: me.id, text, ts: now })) });
      return;
    }
    if (m.t === 'ping') { try { ws.send('{"t":"pong"}'); } catch (e) { } }
  }
  webSocketClose(ws) { this.left(ws); }
  webSocketError(ws) { this.left(ws); }
  left(ws) {
    const a = ws.deserializeAttachment(); if (!a || !a.u) return;
    const still = this.ctx.getWebSockets().some(o => o !== ws && o.readyState === 1 && (o.deserializeAttachment() || {}).u?.id === a.u.id);
    if (!still) this.broadcast({ t: 'leave', id: a.u.id }, ws);
    try { ws.close(1000, 'bye'); } catch (e) { }
  }
}
