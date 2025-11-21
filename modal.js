// Modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("appointmentModal");
  const openModalBtn = document.getElementById("openModal");
  const openModalBtn2 = document.getElementById("openModal2");
  const closeModalBtn = document.querySelector(".modal-close");
  const form = document.getElementById("appointmentForm");
  const phoneInput = document.getElementById("clientPhone");

  // Phone mask
  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("8")) {
      value = "7" + value.substring(1);
    }
    if (!value.startsWith("7") && value.length > 0) {
      value = "7" + value;
    }

    let formattedValue = "";
    if (value.length > 0) {
      formattedValue = "+7";
      if (value.length > 1) {
        formattedValue += " (" + value.substring(1, 4);
      }
      if (value.length >= 4) {
        formattedValue += ") " + value.substring(4, 7);
      }
      if (value.length >= 7) {
        formattedValue += "-" + value.substring(7, 9);
      }
      if (value.length >= 9) {
        formattedValue += "-" + value.substring(9, 11);
      }
    }
    e.target.value = formattedValue;
  });

  // Open modal
  function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close modal
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    form.reset();
  }

  // Event listeners
  if (openModalBtn) {
    openModalBtn.addEventListener("click", openModal);
  }

  if (openModalBtn2) {
    openModalBtn2.addEventListener("click", openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();

    if (!name || !phone) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    // Here you can add your form submission logic
    // For example, send data to server via fetch API
    console.log("Form submitted:", { name, phone });

    // Show success message
    alert(
      "Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время."
    );

    // Close modal and reset form
    closeModal();
  });
});

