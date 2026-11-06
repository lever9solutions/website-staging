const caseTablist = document.querySelector(".case-tabs");
const caseTabs = [...document.querySelectorAll('.case-tabs [role="tab"]')];
const caseMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const caseFrames = new WeakMap();

const animateCaseNumber = (panel) => {
  const number = panel.querySelector("[data-case-count]");
  const target = Number(number.dataset.caseCount);
  cancelAnimationFrame(caseFrames.get(number));
  if (caseMotionPreference.matches) {
    number.textContent = target.toLocaleString("en-US");
    return;
  }
  const start = performance.now();
  number.textContent = "0";
  const update = (now) => {
    const progress = Math.min((now - start) / 800, 1);
    number.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))).toLocaleString("en-US");
    if (progress < 1 && !caseMotionPreference.matches) caseFrames.set(number, requestAnimationFrame(update));
    else number.textContent = target.toLocaleString("en-US");
  };
  caseFrames.set(number, requestAnimationFrame(update));
};

const selectCase = (selected, focus = false) => {
  caseTabs.forEach((tab) => {
    const active = tab === selected;
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    panel.hidden = !active;
    panel.classList.toggle("is-entering", active);
    if (active) animateCaseNumber(panel);
  });
  if (focus) selected.focus();
};

if (caseTablist && caseTabs.length) {
  caseTablist.hidden = false;
  caseTabs.forEach((tab, index) => {
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = 0;
    tab.addEventListener("click", () => selectCase(tab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % caseTabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + caseTabs.length) % caseTabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = caseTabs.length - 1;
      else return;
      event.preventDefault();
      selectCase(caseTabs[next], true);
    });
  });
  selectCase(caseTabs[0]);
}
