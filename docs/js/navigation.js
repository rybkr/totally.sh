(() => {
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('#main-navigation');
  if (!toggle || !navigation) return;

  const setOpen = (open) => {
    navigation.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!navigation.classList.contains('is-open')));
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('pointerdown', (event) => {
    if (navigation.classList.contains('is-open') && !navigation.contains(event.target) && !toggle.contains(event.target)) {
      setOpen(false);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  window.matchMedia('(min-width: 721px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
})();
