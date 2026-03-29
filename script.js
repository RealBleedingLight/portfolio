// ── CROSSWORD FILL ──
const fillOrder = ['c-B','c-U','c-I','c-S','c-O','c-V','c-E','c-D','c-L'];
let fi = 0;
function fillNext() {
  if (fi >= fillOrder.length) return;
  const el = document.getElementById(fillOrder[fi++]);
  if (el) el.classList.add('vis');
  setTimeout(fillNext, fillOrder[fi-1] === 'c-D' ? 260 : 85);
}
setTimeout(fillNext, 500);

// ── CIPHER DECODE ──
const target = "Solve problems. Build better things.";
const syms = ['▲','■','◆','●','▼','◇','□','○','△','◈','◉','◎','◐','◑','◒','◓','◔','◕','◖','◗'];
const tagEl = document.getElementById('heroTagline');
let frame = 0, total = 32, decoding = false;

function decode() {
  if (!decoding) return;
  if (frame >= total) {
    tagEl.textContent = target;
    decoding = false;
    tagEl.style.opacity = '1';
    return;
  }
  let s = '';
  for (let j = 0; j < target.length; j++) {
    const revealed = j / target.length < (frame / total) - 0.04;
    s += (revealed || target[j] === ' ') ? target[j] : syms[Math.floor(Math.random() * syms.length)];
  }
  tagEl.textContent = s;
  frame++;
  setTimeout(decode, 50);
}

function startDecode() {
  if (decoding) return;
  frame = 0;
  decoding = true;
  decode();
}

setTimeout(startDecode, 1100);

tagEl.style.cursor = 'pointer';
tagEl.title = 'Click to decode';
tagEl.addEventListener('click', startDecode);

// ── SCROLL CARD REVEAL ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }});
}, { threshold: 0.1 });
document.querySelectorAll('.pcard').forEach(c => io.observe(c));

// ── DUSK TOGGLE ──
const btn = document.getElementById('modeBtn');
btn.addEventListener('click', () => {
  const isDusk = document.documentElement.classList.toggle('dusk');
  btn.textContent = isDusk ? '◑ Paper' : '◐ Chalk';
  localStorage.setItem('theme', isDusk ? 'dusk' : 'light');
});
if (localStorage.getItem('theme') === 'dusk') {
  document.documentElement.classList.add('dusk');
  btn.textContent = '◑ Paper';
}
