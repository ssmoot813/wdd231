// ===== Activity 3: Form validation =====

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function submitForm(event) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const errorDisplay = document.querySelector("#form-error");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    let error = "";

    if (name === "") {
        error += "Name is required.\n";
    }

    if (email === "") {
        error += "Email is required.\n";
    } else if (!validateEmail(email)) {
        error += "Please enter a valid email address.\n";
    }

    if (error) {
        event.preventDefault(); // stop the form from submitting
        errorDisplay.textContent = error;
    } else {
        errorDisplay.textContent = ""; // clear old errors and let it submit
    }
}

document.querySelector("#contact-form").addEventListener("submit", submitForm);