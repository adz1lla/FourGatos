document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  const form = document.querySelector("#contact-form");
  if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const required = form.querySelectorAll("[required]");
      let valid = true;
      required.forEach((field) => {
        if (!field.value.trim()) valid = false;
      });

      status.classList.remove("ok", "err");
      if (!valid) {
        status.textContent = "Please fill in the required fields before sending.";
        status.classList.add("err", "visible");
        return;
      }

      // NOTE: This form has no backend wired up yet. Point the <form action>
      // at a form service (e.g. Formspree, Netlify Forms) or your own
      // endpoint, then replace this block with a real submit / fetch call.
      status.textContent =
        "Thanks — this is a placeholder confirmation. Connect this form to an email or CRM endpoint to start receiving submissions.";
      status.classList.add("ok", "visible");
      form.reset();
    });
  }
});
