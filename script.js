const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Nav scroll state
const nav = document.getElementById("nav");
if (nav) {
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Add staggered reveal timing to related content groups.
const staggerGroups = [
  ".hero .reveal",
  ".projects-grid > *",
  ".entry-list > *",
  ".case-hero > *",
  ".case-intro > *",
  ".case-pillars > *",
  ".case-flow > *",
  ".case-section-heading > *",
  ".case-media-pair > *",
  ".case-build > *",
  ".case-tech-grid > *",
  ".case-lessons > *",
  ".case-next > *"
];

staggerGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add("motion-reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 80}ms`);
  });
});

const revealElements = document.querySelectorAll(".reveal, .motion-reveal");
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -4%" }
  );
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("in-view"));
}

// Work section tabs with a single sliding active indicator.
const tabBar = document.querySelector(".tab-bar");
const tabButtons = document.querySelectorAll(".tab-btn");
const workSectionNumber = document.querySelector("#work .section-num");
const workSectionTitle = document.querySelector("#work .section-head h2");
const workHeadings = {
  projects: { number: "01.", title: "PROJECTS" },
  internships: { number: "02.", title: "INTERNSHIPS" },
  research: { number: "03.", title: "RESEARCH PAPERS" }
};
let tabIndicator;

const syncTabIndicator = () => {
  if (!tabBar || !tabIndicator) return;
  const active = tabBar.querySelector(".tab-btn.active");
  if (!active) return;
  tabIndicator.style.width = `${active.offsetWidth}px`;
  tabIndicator.style.transform = `translateX(${active.offsetLeft}px)`;
};

if (tabBar) {
  tabIndicator = document.createElement("span");
  tabIndicator.className = "tab-indicator";
  tabIndicator.setAttribute("aria-hidden", "true");
  tabBar.appendChild(tabIndicator);
  requestAnimationFrame(syncTabIndicator);
  if (document.fonts) document.fonts.ready.then(syncTabIndicator);
  window.addEventListener("resize", syncTabIndicator, { passive: true });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;
    const heading = workHeadings[target];

    tabButtons.forEach((candidate) => {
      candidate.classList.toggle("active", candidate === button);
      candidate.setAttribute("aria-selected", String(candidate === button));
    });

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      const isActive = panel.id === `panel-${target}`;
      panel.hidden = !isActive;
      panel.classList.toggle("active", isActive);
    });

    if (heading && workSectionNumber && workSectionTitle) {
      workSectionNumber.textContent = heading.number;
      workSectionTitle.textContent = heading.title;
      workSectionTitle.dataset.ghost = heading.title;
    }

    syncTabIndicator();
  });
});

// Let each project idea gradient respond subtly to the pointer.
const ideaPanel = document.querySelector(".case-intro");
if (ideaPanel && !prefersReducedMotion) {
  let frame;
  const updateSpotlight = (event) => {
    const rect = ideaPanel.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      ideaPanel.style.setProperty("--spot-x", `${x}%`);
      ideaPanel.style.setProperty("--spot-y", `${y}%`);
      ideaPanel.style.setProperty("--spot-x-alt", `${100 - x}%`);
      ideaPanel.style.setProperty("--spot-y-alt", `${Math.max(12, 100 - y)}%`);
    });
  };

  ideaPanel.addEventListener("pointermove", updateSpotlight);
  ideaPanel.addEventListener("pointerleave", () => {
    cancelAnimationFrame(frame);
    ideaPanel.style.removeProperty("--spot-x");
    ideaPanel.style.removeProperty("--spot-y");
    ideaPanel.style.removeProperty("--spot-x-alt");
    ideaPanel.style.removeProperty("--spot-y-alt");
  });
}
