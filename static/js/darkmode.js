document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const html = document.documentElement;

  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);
  }

  // Apply theme
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (darkModeToggle) {
      darkModeToggle.checked = theme === 'dark';
    }
    
    // Force redraw for canvas elements
    document.querySelectorAll('canvas').forEach(canvas => {
      const display = canvas.style.display;
      canvas.style.display = 'none';
      canvas.offsetHeight; // Trigger reflow
      canvas.style.display = display;
    });
  }

  // Toggle theme
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', function() {
      const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // System preference listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  initTheme();
});