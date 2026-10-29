// Skip the intro loader after the first page in a browser session, and on
// phones, where the page should show at once.
var skip = window.matchMedia && matchMedia('(max-width: 767px)').matches
try {
  if (sessionStorage.getItem('nim-intro')) skip = true
} catch (e) {}
if (skip) document.documentElement.classList.add('no-intro', 'is-ready')

// Temporary test switches for tracking down a Chrome-on-Mac flicker:
// ?test=noscroll,noblur,noround,no3d each turn one effect off for the visit.
try {
  var t = new URLSearchParams(location.search).get('test')
  if (t) t.split(',').forEach(function (k) { if (/^(noscroll|noblur|noround|no3d)$/.test(k)) document.documentElement.classList.add('t-' + k) })
} catch (e) {}
