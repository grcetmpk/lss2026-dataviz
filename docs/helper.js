document.addEventListener("DOMContentLoaded", function() {
  const initPersistence = () => {
    const notes = document.querySelectorAll('.persistent-notes');
    notes.forEach(note => {
      const storageKey = 'reveal-note-' + note.id;

      // 1. Load saved content
      const savedContent = localStorage.getItem(storageKey);
      if (savedContent) {
        note.innerText = savedContent;
      }

      // 2. Save content on input (if not already attached)
      if (!note.dataset.listenerAttached) {
        note.addEventListener('input', () => {
          localStorage.setItem(storageKey, note.innerText);
        });
        note.dataset.listenerAttached = "true";
      }
    });
  };

  // Run when the presentation is ready and every time the slide changes
  if (typeof Reveal !== 'undefined') {
    Reveal.on('ready', initPersistence);
    Reveal.on('slidechanged', initPersistence);
  } else {
    // Fallback if Reveal isn't ready yet
    setTimeout(initPersistence, 500);
  }
});