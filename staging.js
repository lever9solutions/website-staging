document.documentElement.dataset.environment = "staging";

if (!document.title.startsWith("Staging / ")) {
  document.title = `Staging / ${document.title}`;
}

const addStagingChip = () => {
  const brand = document.querySelector(".brand");
  if (!brand || brand.querySelector(".staging-chip")) return;

  const chip = document.createElement("em");
  chip.className = "staging-chip";
  chip.setAttribute("aria-label", "Staging environment");
  chip.textContent = "Staging";
  brand.appendChild(chip);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addStagingChip);
} else {
  addStagingChip();
}
