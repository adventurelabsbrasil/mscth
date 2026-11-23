// leitor mínimo de Standard MIDI File (formato 0 e 1), sem dependências.
// devolve { notes: [{m, s, d, v, ch}] em tempos (semínimas), bpm, beatsPerBar, length }
function parseMidi(buf){
  const b = new Uint8Array(buf); let p = 0;
  const u32 = () => { const v = (b[p]<<24 | b[p+1]<<16 | b[p+2]<<8 | b[p+3]) >>> 0; p += 4; return v; };
  const u16 = () => { const v = b[p]<<8 | b[p+1]; p += 2; return v; };
  const str = n => { let s = ''; for(let i=0;i<n;i++) s += String.fromCharCode(b[p+i]); p += n; return s; };
  const vlq = () => { let v = 0, c; do { c = b[p++]; v = (v << 7) | (c & 0x7f); } while(c & 0x80); return v; };
  if(str(4) !== 'MThd') throw new Error('não é um arquivo MIDI (cabeçalho MThd ausente)');
  const hl = u32(), fmt = u16(), ntr = u16(), div = u16(); p += hl - 6;
  if(div & 0x8000) throw new Error('MIDI com tempo SMPTE não suportado');
  const notes = []; let bpm = null, beatsPerBar = 4;
  for(let t = 0; t < ntr && p < b.length; t++){
    if(str(4) !== 'MTrk'){ throw new Error('trilha inválida'); }
    const len = u32(), end = p + len; let tick = 0, run = 0; const open = {};
    while(p < end){
      tick += vlq();
      let st = b[p];
      if(st & 0x80) p++; else st = run;              // running status
      const type = st & 0xf0, ch = st & 0x0f;
      if(st === 0xff){
        const mt = b[p++], ml = vlq();
        if(mt === 0x51 && bpm === null) bpm = 60000000 / (b[p]<<16 | b[p+1]<<8 | b[p+2]);
        if(mt === 0x58) beatsPerBar = b[p] * 4 / Math.pow(2, b[p+1]);
        p += ml;
      } else if(st === 0xf0 || st === 0xf7){ p += vlq(); }
      else {
        run = st;
        const d1 = b[p++], d2 = (type === 0xc0 || type === 0xd0) ? 0 : b[p++];
        const key = ch + ':' + d1;
        if(type === 0x90 && d2 > 0){ (open[key] = open[key] || []).push([tick, d2]); }
        else if(type === 0x80 || (type === 0x90 && d2 === 0)){
          const q = open[key]; if(q && q.length){ const [t0, v] = q.shift();
            if(ch !== 9) notes.push({ m: d1, s: t0/div, d: Math.max(0.05, (tick - t0)/div), v: v/127, ch, tr: t }); }
        }
      }
    }
    p = end;
  }
  notes.sort((x, y) => x.s - y.s || x.m - y.m);
  const last = notes.reduce((mx, n) => Math.max(mx, n.s + n.d), 0);
  return { notes, bpm: Math.round(bpm || 120), beatsPerBar, length: Math.ceil(last / beatsPerBar) * beatsPerBar, format: fmt };
}
if(typeof module !== 'undefined') module.exports = { parseMidi };
