const caseNumbers = document.querySelectorAll("[data-case-count]");
const caseMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!caseMotionPreference.matches && "IntersectionObserver" in window) {
  const caseObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const number = entry.target;
      const target = Number(number.dataset.caseCount);
      const start = performance.now();
      const update = (now) => {
        const progress = Math.min((now - start) / 1400, 1);
        number.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))).toLocaleString("en-US");
        if (progress < 1 && !caseMotionPreference.matches) requestAnimationFrame(update);
        else number.textContent = target.toLocaleString("en-US");
      };
      requestAnimationFrame(update);
    });
  }, { threshold: 0.5 });

  caseNumbers.forEach((number) => {
    number.textContent = "0";
    caseObserver.observe(number);
  });
}
