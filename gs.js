const scriptURL =
  "https://script.google.com/macros/s/AKfycbya6gBPKZkPnA59vm6tJqQkNGWWxejkw0OLlwoWmAtVzT7E8z43QWPZOuHSeCyXSzBf/exec";

const form = document.forms["contact-form"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Check if the form is valid
  if (validateForm()) {
    // If valid, proceed with the fetch request
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) =>
        alert("Thank you! We received your feedback.")
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.error("Error!", error.message));
  } 
});
