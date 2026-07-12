(() => {
  const tabs = [...document.querySelectorAll("[data-install-method]")];
  const panels = [...document.querySelectorAll("[data-install-panel]")];
  const notes = [...document.querySelectorAll("[data-install-note]")];

  const select = (method) => {
    tabs.forEach((tab) => {
      const selected = tab.dataset.installMethod === method;
      tab.classList.toggle("is-selected", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.installPanel !== method;
    });
    notes.forEach((note) => {
      note.hidden = note.dataset.installNote !== method;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab.dataset.installMethod));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus();
      select(tabs[next].dataset.installMethod);
    });
  });

  document.querySelectorAll("[data-copy-command]").forEach((button) => {
    button.addEventListener("click", async () => {
      const command = button.closest(".command-row").querySelector("code").textContent.replace(/^\$\s*/, "");
      try {
        await navigator.clipboard.writeText(command);
        button.classList.add("is-copied");
        button.setAttribute("aria-label", "Copied");
        window.setTimeout(() => {
          button.classList.remove("is-copied");
          button.setAttribute("aria-label", `Copy ${button.closest("[role=tabpanel]").getAttribute("aria-labelledby") === "go-tab" ? "Go" : "curl"} install command`);
        }, 1800);
      } catch {
        button.setAttribute("aria-label", "Unable to copy; select the command text instead");
      }
    });
  });
})();
