// Skip the intro loader after the first page in a browser session.
try {
  if (sessionStorage.getItem('nim-intro')) document.documentElement.classList.add('no-intro', 'is-ready')
} catch (e) {}
