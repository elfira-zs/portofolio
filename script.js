// Teks mengetik
const words = ['Calon Programmer', 'MC & Public Speaker', 'Duta Kesehatan Kawan SMK 2026', 'Desainer Konten'];
const el = document.getElementById('typing');
let w = 0, c = 0, del = false;
(function type() {
  const t = words[w];
  el.textContent = t.slice(0, c);
  if (!del && c === t.length) { del = true; return setTimeout(type, 1400); }
  if (del && c === 0) { del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 40 : 80);
})();

// Muncul saat di-scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach((n, i) => {
  n.style.transitionDelay = (i % 3) * 120 + 'ms';
  io.observe(n);
});

// Progress bar scroll
const bar = document.getElementById('progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
});

// Kartu miring mengikuti kursor
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// Menu mobile
const menu = document.getElementById('menu');
document.getElementById('burger').onclick = () => menu.classList.toggle('open');
menu.querySelectorAll('a').forEach(a => a.onclick = () => menu.classList.remove('open'));

// Perbesar poster dan sertifikat
const lb = document.getElementById('lb'), lbImg = lb.querySelector('img'), note = lb.querySelector('.nofile');
function openLb(src, alt) {
  note.style.display = 'none'; lbImg.style.display = ''; lbImg.alt = alt;
  lbImg.onerror = () => { lbImg.style.display = 'none'; note.textContent = 'Foto belum ditambahkan. Simpan di ' + src; note.style.display = 'block'; };
  lbImg.src = src; lb.classList.add('on');
}
document.querySelectorAll('.poster').forEach(p => p.addEventListener('click', () => {
  const im = p.querySelector('img');
  if (im) openLb(im.getAttribute('src'), im.alt);
}));
document.querySelectorAll('.cert').forEach(b => b.addEventListener('click', () => openLb(b.dataset.img, 'Sertifikat ' + b.textContent)));
lb.onclick = () => lb.classList.remove('on');
addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('on'); });
