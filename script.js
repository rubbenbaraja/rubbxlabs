/* Logika halaman: kelopak, musik, amplop, timeline, WhatsApp.
   Untuk ganti isi cukup edit config.js, berkas ini tidak perlu diubah. */
(function () {
  'use strict';

  // Data (nama, foto, timeline, surat) ada di config.js

  var $ = function (id) { return document.getElementById(id); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HEART = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.500-4.600-9.600-9.300C.9 8.300 2.800 4.500 6.500 4.500c2.200 0 4.100 1.200 5.500 3.200 1.400-2 3.300-3.200 5.500-3.200 3.700 0 5.600 3.800 4.100 7.200C19.500 16.400 12 21 12 21z"/></svg>';

  /* ---- Isi teks dari CONFIG ---- */
  $('cover-name').textContent = 'Sayang';
  $('letter-greet').textContent = 'Untuk Amelia Syafitri,';
  $('letter-from').textContent = CONFIG.pengirim;
  $('end-note').textContent = 'Dibuat dengan sepenuh hati untuk Amelia Syafitri AKA Mba Fit.';

  var body = $('letter-body');
  CONFIG.surat.forEach(function (t) {
    var p = document.createElement('p');
    p.textContent = t;
    body.appendChild(p);
  });

  function formatTanggal(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return iso;
    try { return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch (e) { return iso; }
  }

  var tl = $('timeline');
  CONFIG.kenangan.forEach(function (m) {
    var li = document.createElement('li');
    li.className = 'memory';
    var fig = document.createElement('figure');
    fig.className = 'polaroid';
    function placeholder() {
      var ph = document.createElement('div');
      ph.className = 'ph';
      ph.innerHTML = HEART + '<span>Foto kenangan</span>';
      return ph;
    }
    if (m.foto) {
      var img = document.createElement('img');
      img.className = 'photo';
      img.alt = m.judul;
      img.loading = 'lazy';
      img.onerror = function () { if (img.parentNode) img.parentNode.replaceChild(placeholder(), img); };
      img.src = m.foto;
      fig.appendChild(img);
    } else {
      fig.appendChild(placeholder());
    }
    var cap = document.createElement('figcaption');
    var time = document.createElement('time');
    time.setAttribute('datetime', m.tanggal);
    time.textContent = formatTanggal(m.tanggal);
    cap.appendChild(time);
    fig.appendChild(cap);
    var h = document.createElement('h3');
    h.textContent = m.judul;
    var p = document.createElement('p');
    p.textContent = m.cerita;
    li.appendChild(fig);
    li.appendChild(h);
    li.appendChild(p);
    tl.appendChild(li);
  });

  if (CONFIG.mulaiBersama) {
    var start = new Date(CONFIG.mulaiBersama + 'T00:00:00');
    var n = Math.floor((Date.now() - start.getTime()) / 86400000);
    if (!isNaN(n) && n >= 0) {
      $('days-num').textContent = n.toLocaleString('id-ID');
      $('days').hidden = false;
    }
  }

  /* ---- Kotak harapan ke WhatsApp ---- */
  var wish = $('wish-text'), wa = $('wa-link'), cnt = $('wish-count');
  function updateWa() {
    var msg = wish.value.trim() || 'Terima kasih untuk kejutannya!';
    var num = String(CONFIG.waNumber || '').replace(/\D/g, '');
    wa.href = 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg);
    cnt.textContent = wish.value.length + ' / 600';
  }
  wish.addEventListener('input', updateWa);
  updateWa();

  /* ---- Kanvas: kelopak gugur dan kilauan ---- */
  var cv = $('petals'), ctx = cv.getContext('2d');
  var W = 0, H = 0, petals = [], sparks = [], colors = [], sparkColor = '#d9a05b';

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    colors = ['--petal-a', '--petal-b', '--petal-c'].map(function (k) { return cs.getPropertyValue(k).trim() || '#f3b3c4'; });
    sparkColor = cs.getPropertyValue('--spark').trim() || '#d9a05b';
  }

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function resetPetal(p, fromTop) {
    p.x = rnd(0, W);
    p.y = fromTop ? rnd(-60, -10) : rnd(-20, H);
    p.s = rnd(6, 13);
    p.vy = reduceMotion ? 0 : rnd(0.5, 1.3);
    p.vx = reduceMotion ? 0 : rnd(-0.25, 0.25);
    p.rot = rnd(0, Math.PI * 2);
    p.vr = reduceMotion ? 0 : rnd(-0.02, 0.02);
    p.phase = rnd(0, Math.PI * 2);
    p.col = colors[Math.floor(Math.random() * colors.length)];
    p.a = rnd(0.55, 0.9);
  }

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.max(14, Math.min(34, Math.round(W / 30)));
    if (reduceMotion) count = 10;
    petals = [];
    for (var i = 0; i < count; i++) { var p = {}; resetPetal(p, false); petals.push(p); }
    if (reduceMotion) draw();
  }

  function drawPetal(p) {
    var s = p.s;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.a;
    ctx.fillStyle = p.col;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.9, -s * 0.6, s * 0.8, s * 0.7, 0, s);
    ctx.bezierCurveTo(-s * 0.8, s * 0.7, -s * 0.9, -s * 0.6, 0, -s);
    ctx.fill();
    ctx.restore();
  }

  function drawSpark(k) {
    var r = k.r * (0.4 + 0.6 * k.life);
    ctx.save();
    ctx.translate(k.x, k.y);
    ctx.rotate(k.rot);
    ctx.globalAlpha = Math.max(0, k.life);
    ctx.fillStyle = sparkColor;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(r * 0.15, -r * 0.15, r, 0);
    ctx.quadraticCurveTo(r * 0.15, r * 0.15, 0, r);
    ctx.quadraticCurveTo(-r * 0.15, r * 0.15, -r, 0);
    ctx.quadraticCurveTo(-r * 0.15, -r * 0.15, 0, -r);
    ctx.fill();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < petals.length; i++) drawPetal(petals[i]);
  }

  var last = 0;
  function frame(t) {
    var dt = Math.min(40, t - last) / 16.67;
    last = t;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < petals.length; i++) {
      var p = petals[i];
      p.phase += 0.012 * dt;
      p.x += (p.vx + Math.sin(p.phase) * 0.5) * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      if (p.y > H + 20) resetPetal(p, true);
      if (p.x > W + 20) p.x = -20;
      if (p.x < -20) p.x = W + 20;
      drawPetal(p);
    }
    for (var j = sparks.length - 1; j >= 0; j--) {
      var k = sparks[j];
      k.x += k.vx * dt;
      k.y += k.vy * dt;
      k.vy += 0.04 * dt;
      k.rot += 0.05 * dt;
      k.life -= 0.022 * dt;
      if (k.life <= 0) { sparks.splice(j, 1); continue; }
      drawSpark(k);
    }
    requestAnimationFrame(frame);
  }

  function burst(x, y, n) {
    if (reduceMotion) return;
    for (var i = 0; i < n; i++) {
      var a = rnd(0, Math.PI * 2), v = rnd(0.8, 3);
      sparks.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 0.8, r: rnd(3, 7), rot: rnd(0, 3), life: 1 });
    }
    if (sparks.length > 120) sparks.splice(0, sparks.length - 120);
  }

  document.addEventListener('pointerdown', function (e) { burst(e.clientX, e.clientY, 9); });

  readColors();
  resize();
  window.addEventListener('resize', resize);
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onTheme = function () { readColors(); petals.forEach(function (p) { p.col = colors[Math.floor(Math.random() * colors.length)]; }); if (reduceMotion) draw(); };
  if (mq.addEventListener) mq.addEventListener('change', onTheme);
  new MutationObserver(onTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (!reduceMotion) requestAnimationFrame(frame);

  /* ---- Musik: kotak musik bawaan, atau lagu sendiri lewat CONFIG.audioSrc ---- */
  var Music = (function () {
    var ac = null, master = null, timer = null, nextTime = 0, idx = 0, el = null, playing = false;
    var EIGHTH = 0.44;
    var chords = [[0, 4, 7], [-3, 0, 4], [-7, -3, 0], [-5, -1, 2]];
    function freq(s) { return 261.63 * Math.pow(2, s / 12); }

    function note(f, t, dur, vol) {
      var o = ac.createOscillator(), o2 = ac.createOscillator(), g = ac.createGain(), g2 = ac.createGain();
      o.type = 'sine'; o.frequency.value = f;
      o2.type = 'sine'; o2.frequency.value = f * 4;
      g2.gain.value = 0.12;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); o2.connect(g2); g2.connect(g); g.connect(master);
      o.start(t); o2.start(t);
      o.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
    }

    function schedule() {
      while (nextTime < ac.currentTime + 0.5) {
        var bar = Math.floor(idx / 8) % 4, pos = idx % 8, c = chords[bar];
        var arp = [c[0], c[1], c[2], c[1] + 12, c[2], c[1], c[2] + 12, c[1]];
        note(freq(arp[pos]), nextTime, 1.5, 0.16);
        if (pos === 0) {
          note(freq(c[0] - 12), nextTime, 2.4, 0.14);
          note(freq(c[2] + 12), nextTime, 2.2, 0.07);
        }
        nextTime += EIGHTH;
        idx++;
      }
    }

    function build() {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ac = new AC();
      master = ac.createGain();
      master.gain.value = 0;
      var delay = ac.createDelay(1), fb = ac.createGain(), wet = ac.createGain();
      delay.delayTime.value = 0.3; fb.gain.value = 0.32; wet.gain.value = 0.35;
      master.connect(ac.destination);
      master.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(ac.destination);
      return true;
    }

    var api = {
      get playing() { return playing; },
      start: function () {
        if (playing) return;
        if (CONFIG.audioSrc) {
          if (!el) {
            el = new Audio(CONFIG.audioSrc);
            el.addEventListener('error', function () {
              el = null; CONFIG.audioSrc = ''; playing = false;
              api.start(); syncFab();
            });
          }
          el.loop = true;
          var pr = el.play();
          if (pr && pr.catch) pr.catch(function () {});
          playing = true;
          return;
        }
        if (!ac && !build()) return;
        ac.resume();
        nextTime = ac.currentTime + 0.05;
        timer = setInterval(schedule, 120);
        master.gain.cancelScheduledValues(ac.currentTime);
        master.gain.setTargetAtTime(0.6, ac.currentTime, 0.6);
        playing = true;
      },
      stop: function () {
        if (!playing) return;
        playing = false;
        if (el) el.pause();
        if (timer) { clearInterval(timer); timer = null; }
        if (master) master.gain.setTargetAtTime(0, ac.currentTime, 0.15);
      }
    };
    return api;
  })();

  var fab = $('fab');
  function syncFab() {
    fab.setAttribute('aria-pressed', Music.playing ? 'true' : 'false');
    fab.setAttribute('aria-label', Music.playing ? 'Jeda musik' : 'Putar musik');
  }
  fab.addEventListener('click', function () {
    if (Music.playing) Music.stop(); else Music.start();
    syncFab();
  });

  /* ---- Buka kejutan ---- */
  var cover = $('cover'), main = $('main');
  $('open-btn').addEventListener('click', function () {
    main.hidden = false;
    fab.hidden = false;
    cover.classList.add('leaving');
    Music.start();
    syncFab();
    burst(window.innerWidth / 2, window.innerHeight / 2, 40);
    window.scrollTo({ top: 0, behavior: 'auto' });
    setTimeout(function () {
      cover.hidden = true;
      var t = $('hero-title');
      if (t && t.focus) t.focus({ preventScroll: true });
    }, 950);
  });

  /* ---- Amplop surat ---- */
  var env = $('env'), letter = $('letter'), wrap = $('paper-wrap'), hint = $('env-hint');
  env.addEventListener('click', function () {
    var open = env.getAttribute('aria-expanded') === 'true';
    env.setAttribute('aria-expanded', open ? 'false' : 'true');
    env.setAttribute('aria-label', open ? 'Buka amplop surat' : 'Tutup amplop surat');
    wrap.classList.toggle('open', !open);
    if (open) { letter.setAttribute('inert', ''); if (hint) hint.textContent = 'Ketuk amplop untuk membukanya'; }
    else {
      letter.removeAttribute('inert');
      if (hint) hint.textContent = 'Ketuk lagi untuk menutup';
      burst(env.getBoundingClientRect().left + env.offsetWidth / 2, env.getBoundingClientRect().top + env.offsetHeight / 2, 24);
      setTimeout(function () { wrap.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' }); }, 500);
    }
  });
})();
