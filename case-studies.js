const casePanels = [...document.querySelectorAll(".case-entry")];
const caseControls = document.querySelector(".case-selector");
const caseMarkers = [...document.querySelectorAll("[data-case-index]")];
const caseMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const caseFrames = new WeakMap();
const caseStage = document.querySelector(".case-stage");
const caseMarkerTrack = document.querySelector(".case-markers");
let selectedCase = 0;
let caseTransition = null;
let caseSelection = 0;

const animateCaseNumber = (panel) => {
  const number = panel.querySelector("[data-case-count]");
  const target = Number(number.dataset.caseCount);
  cancelAnimationFrame(caseFrames.get(number));
  if (caseMotionPreference.matches) {
    number.textContent = "$" + target.toLocaleString("en-US");
    return;
  }
  const start = performance.now();
  number.textContent = "$0";
  const update = (now) => {
    const progress = Math.min((now - start) / 800, 1);
    number.textContent = "$" + Math.round(target * (1 - Math.pow(1 - progress, 3))).toLocaleString("en-US");
    if (progress < 1 && !caseMotionPreference.matches) caseFrames.set(number, requestAnimationFrame(update));
    else number.textContent = "$" + target.toLocaleString("en-US");
  };
  caseFrames.set(number, requestAnimationFrame(update));
};

const selectCase = (index) => {
  const direction = index < selectedCase ? -1 : 1;
  selectedCase = (index + casePanels.length) % casePanels.length;
  const nextIndex = selectedCase;
  const next = casePanels[nextIndex];
  const previous = casePanels.find((panel) => !panel.hidden);
  const selection = ++caseSelection;
  if (caseTransition) caseTransition.cancel();
  const activate = () => {
    if (selection !== caseSelection) return;
    casePanels.forEach((panel) => {
      panel.hidden = panel !== next;
      panel.classList.toggle("is-entering", panel === next);
    });
    caseMarkers.forEach((marker, i) => marker.setAttribute("aria-pressed", String(i === nextIndex)));
    caseMarkerTrack.style.setProperty("--case-index", String(nextIndex));
    caseStage.style.height = next.offsetHeight + "px";
    document.querySelector(".case-position").textContent = String(nextIndex + 1).padStart(2, "0") + " / " + String(casePanels.length).padStart(2, "0");
    animateCaseNumber(next);
    if (!caseMotionPreference.matches) {
      caseTransition = next.animate([{ opacity: 0, transform: `translateX(${direction * 18}px)` }, { opacity: 1, transform: "translateX(0)" }], { duration: 420, easing: "cubic-bezier(.22, 1, .36, 1)" });
    }
  };
  if (previous && previous !== next && !caseMotionPreference.matches) {
    caseTransition = previous.animate([{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: `translateX(${direction * -10}px)` }], { duration: 140, easing: "ease-out", fill: "forwards" });
    caseTransition.finished.then(() => {
      if (selection !== caseSelection) return;
      caseTransition.cancel();
      activate();
    }).catch(() => {});
  } else activate();
};

if (caseControls && casePanels.length) {
  caseControls.hidden = false;
  document.querySelector(".case-markers").hidden = false;
  casePanels.forEach((panel, index) => {
    panel.setAttribute("role", "group");
    panel.setAttribute("aria-roledescription", "slide");
    panel.setAttribute("aria-label", String(index + 1) + " of " + String(casePanels.length));
  });
  document.querySelector("[data-case-prev]").addEventListener("click", () => selectCase(selectedCase - 1));
  document.querySelector("[data-case-next]").addEventListener("click", () => selectCase(selectedCase + 1));
  caseMarkers.forEach((marker, index) => marker.addEventListener("click", () => selectCase(index)));
  document.querySelectorAll(".case-arrow").forEach((arrow) => {
    arrow.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse" || caseMotionPreference.matches) return;
      const rect = arrow.getBoundingClientRect();
      arrow.style.setProperty("--pointer-x", ((event.clientX - rect.left - rect.width / 2) * 0.12) + "px");
      arrow.style.setProperty("--pointer-y", ((event.clientY - rect.top - rect.height / 2) * 0.12) + "px");
    });
    arrow.addEventListener("pointerleave", () => {
      arrow.style.removeProperty("--pointer-x");
      arrow.style.removeProperty("--pointer-y");
    });
  });
  if ("ResizeObserver" in window) {
    const caseResizeObserver = new ResizeObserver(() => {
      const visible = casePanels.find((panel) => !panel.hidden);
      if (visible) caseStage.style.height = visible.offsetHeight + "px";
    });
    casePanels.forEach((panel) => caseResizeObserver.observe(panel));
  }
  document.querySelector(".case-collection").addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    selectCase(selectedCase + (event.key === "ArrowRight" ? 1 : -1));
  });
  let touchOrigin = null;
  const stage = document.querySelector(".case-stage");
  stage.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) { touchOrigin = null; return; }
    touchOrigin = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  stage.addEventListener("touchend", (event) => {
    if (!touchOrigin) return;
    const dx = event.changedTouches[0].clientX - touchOrigin.x;
    const dy = event.changedTouches[0].clientY - touchOrigin.y;
    touchOrigin = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) selectCase(selectedCase + (dx < 0 ? 1 : -1));
  }, { passive: true });
  stage.addEventListener("touchcancel", () => { touchOrigin = null; }, { passive: true });
  selectCase(0);
}
