const scriptURL =
  "https://script.google.com/macros/s/AKfycbxwRJJ4I817MiWduFYqzaeXr1Lyots83fKjv8V6e9SOhfUEzqma_ygSZZhzBVhqFhXp/exec";

document.getElementById("staffName").value = localStorage.getItem("staffName");

const form = document.getElementById("form");
const loader = document.getElementById("loader");
const success = document.getElementById("successMsg");
const phone = document.getElementById("phone");
const btn = document.getElementById("submitBtn");

/* PHONE VALIDATION */

phone.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

/* FORM SUBMIT */

form.addEventListener("submit", function (e) {
  e.preventDefault();

  /* PHONE CHECK */

  if (phone.value.length !== 10) {
    alert("Enter valid 10 digit phone number");
    return;
  }

  btn.disabled = true;
  btn.innerText = "Submitting...";

  loader.style.display = "block";

  /* FORM DATA */

  const formData = new FormData(form);

  /* API TYPE */

  formData.append("type", "student");

  /* STAFF NAME */

  formData.append("staff", localStorage.getItem("staffName"));

  fetch(scriptURL, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((data) => {
      setTimeout(() => {
        loader.style.display = "none";

        success.style.display = "block";

        form.reset();

        btn.disabled = false;
        btn.innerText = "Submit";
      }, 1500);
    })
    .catch((err) => {
      loader.style.display = "none";

      alert("Submission Failed");

      btn.disabled = false;
      btn.innerText = "Submit";
    });
});
