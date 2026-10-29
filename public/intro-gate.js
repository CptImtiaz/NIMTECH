// Skip the intro loader after the first page in a browser session, and on
// phones, where the page should show at once.
var skip = window.matchMedia && matchMedia('(max-width: 767px)').matches
try {
  if (sessionStorage.getItem('nim-intro')) skip = true
} catch (e) {}
if (skip) document.documentElement.classList.add('no-intro', 'is-ready')
