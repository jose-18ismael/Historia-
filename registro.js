const menuToggle = document.querySelector("#menuToggle");
const siteNav = document.querySelector("#siteNav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

const emailService = {
  serviceId: "",
  templateId: "",
  publicKey: ""
};

const registrationForm = document.querySelector("#registrationForm");
const registrationStatus = document.querySelector("#registrationStatus");
const registrationSubmit = document.querySelector("#registrationSubmit");
const registrationFields = registrationForm.querySelectorAll("input");
const isConfigured = Object.values(emailService).every((value) => value.trim().length > 0);

if (isConfigured && window.emailjs) {
  registrationFields.forEach((field) => {
    field.disabled = false;
  });
  registrationSubmit.disabled = false;
  registrationStatus.textContent = "Ingresa tus datos solo si aceptas el aviso de privacidad.";
} else if (isConfigured) {
  registrationStatus.textContent = "No se pudo cargar el servicio de registro. No se ha enviado ningún dato.";
}

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!isConfigured || !window.emailjs) {
    registrationStatus.textContent = "El formulario no está conectado; no se ha enviado ningún dato.";
    return;
  }

  if (!registrationForm.reportValidity()) return;

  const firstName = registrationForm.elements.first_name.value.trim();
  const lastName = registrationForm.elements.last_name.value.trim();
  if (firstName.length < 2 || lastName.length < 2) {
    registrationStatus.textContent = "Escribe un nombre y un apellido válidos.";
    return;
  }

  registrationSubmit.disabled = true;
  registrationStatus.textContent = "Enviando el registro al profesor…";

  try {
    await window.emailjs.send(emailService.serviceId, emailService.templateId, {
      first_name: firstName,
      last_name: lastName,
      participation_date: new Date().toLocaleDateString("es-NI"),
      activity: "Exposición de historia: Nicaragua"
    }, {
      publicKey: emailService.publicKey
    });

    registrationForm.reset();
    registrationStatus.textContent = "Tu participación quedó registrada. Gracias.";
  } catch {
    registrationStatus.textContent = "No se pudo enviar el registro. Inténtalo otra vez o avisa al profesor.";
  } finally {
    registrationSubmit.disabled = false;
  }
});
