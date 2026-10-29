// Skip the intro loader after the first page in a browser session, and on
// phones, where the page should show at once.
var skip = window.matchMedia && matchMedia('(max-width: 767px)').matches
try {
  if (sessionStorage.getItem('nim-intro')) skip = true
} catch (e) {}
if (skip) document.documentElement.classList.add('no-intro', 'is-ready')

// Chrome (and other Chromium browsers) on macOS can't paint blur inside the
// big rounded panels fast enough and flicker while scrolling; mark them so
// the stylesheet drops blur there. Safari and other platforms keep it.
if (/Macintosh/.test(navigator.userAgent) && /Chrome\//.test(navigator.userAgent)) document.documentElement.classList.add('mac-chrome')
