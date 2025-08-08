document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input, textarea, select");

  inputs.forEach(input => {
    input.addEventListener("input", () => validateInput(input));
    input.addEventListener("blur", () => validateInput(input));
  });

  function validateInput(input) {
    if (input.type === "email") {
      const valid = /^\S+@\S+\.\S+$/.test(input.value);
      updateClasses(input, valid);
    } else if (input.type === "password") {
      updateClasses(input, input.value.length >= 4);
    } else if (input.tagName === "SELECT") {
      updateClasses(input, input.value.trim() !== "");
    } else {
      updateClasses(input, input.value.trim() !== "");
    }
  }

  function updateClasses(input, isValid) {
    input.classList.remove("is-valid", "is-invalid");
    if (input.value !== "") {
      input.classList.add(isValid ? "is-valid" : "is-invalid");
    }
  }
});
