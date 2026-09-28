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
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitLabel = submitBtn ? submitBtn.innerHTML : "";

    form.addEventListener("submit", async (e) => {
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

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.textContent = "Thanks — your message has been sent. We'll follow up within two business days.";
          status.classList.add("ok", "visible");
          form.reset();
        } else {
          status.textContent = "Something went wrong sending your message. Please try again or email us directly.";
          status.classList.add("err", "visible");
        }
      } catch (err) {
        status.textContent = "Something went wrong sending your message. Please try again or email us directly.";
        status.classList.add("err", "visible");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitLabel;
        }
      }
    });
  }
});
