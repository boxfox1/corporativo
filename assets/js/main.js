// assets/js/main.js
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Mobile nav toggle
  const toggle = $(".nav__toggle");
  const menu = $("#navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close on link click (mobile)
    $$(".nav__link", menu).forEach((a) => {
      a.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click (mobile)
    document.addEventListener("click", (e) => {
      const target = e.target;
      const clickedInside = menu.contains(target) || toggle.contains(target);
      if (!clickedInside) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Smooth scroll for in-page anchors
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      // Keep hash clean
      history.replaceState(null, "", href);
    });
  });

  // News dots (demo only)
  const dots = $$(".news__dot");
  if (dots.length) {
    dots.forEach((btn) => {
      btn.addEventListener("click", () => {
        dots.forEach((d) => d.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });
  }
})();
// =========================
// Modal system (robusto)
// =========================
document.querySelectorAll("[data-modal]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = btn.dataset.modal;
    const modal = document.getElementById("modal-" + id);
    if (!modal) return;

    modal.classList.add("is-open");
    document.documentElement.classList.add("is-locked");
  });
});

document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    if (!modal) return;

    modal.classList.remove("is-open");
    document.documentElement.classList.remove("is-locked");
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("is-open");
      document.documentElement.classList.remove("is-locked");
    }
  });
});
// ===== Scroll recovery (arranque) =====
window.addEventListener("load", () => {
  // Cierra cualquier modal que haya quedado abierto
  document
    .querySelectorAll(".modal.is-open")
    .forEach((m) => m.classList.remove("is-open"));

  // Quita cualquier “lock” si existiera
  document.documentElement.classList.remove("is-locked");
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";

  // Si algún overlay accidental existe, evita que capture eventos
  document.querySelectorAll(".modal").forEach((m) => {
    if (!m.classList.contains("is-open")) m.style.pointerEvents = "none";
  });
});
