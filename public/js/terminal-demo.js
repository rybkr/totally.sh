(() => {
  const demo = document.querySelector('.terminal-demo');
  const command = demo?.querySelector('.terminal-command');
  if (!demo || !command || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const commands = [
    'totally show --latest',
    'totally sessions --since 1w',
    'totally stats --by model',
    'totally stats --cwd .',
  ];
  let commandIndex = 0;
  let characterIndex = 0;

  const type = () => {
    const current = commands[commandIndex];
    if (characterIndex < current.length) {
      characterIndex += 1;
      command.textContent = current.slice(0, characterIndex);
      window.setTimeout(type, 42);
      return;
    }
    window.setTimeout(erase, 1700);
  };

  const erase = () => {
    if (characterIndex > 0) {
      characterIndex -= 1;
      command.textContent = commands[commandIndex].slice(0, characterIndex);
      window.setTimeout(erase, 24);
      return;
    }
    commandIndex = (commandIndex + 1) % commands.length;
    window.setTimeout(type, 450);
  };

  command.textContent = '';
  window.setTimeout(type, 600);
})();
