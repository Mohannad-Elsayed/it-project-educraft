const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signInBtn = document.getElementById('signIn');

localStorage.setItem("x", "false");
signInBtn.addEventListener('click', () => {
    localStorage.setItem("x", "true");
});

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
const form = document.querySelector("form"),
    emailField = form.querySelector(".email-field"),
    emailInput = emailField.querySelector(".email"),
    passField = form.querySelector(".create-password"),
    passInput = passField.querySelector(".password"),
    cPassField = form.querySelector(".confirm-password"),
    cPassInput = cPassField.querySelector(".cPassword"),
    emailError = emailField.querySelector(".error"),
    passError = passField.querySelector(".error"),
    cPassError = cPassField.querySelector(".error");

// Email Validation
function checkEmail() {
    const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(emaiPattern)) {
        return emailField.classList.add("invalid"), emailError.textContent = "Please enter a valid email address.";
    }
    emailField.classList.remove("invalid"), emailError.textContent = "";
}

// Hide and show password
const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
        const pInput = eyeIcon.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input
        if (pInput.type === "password") {
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return pInput.type = "text";
        }
        eyeIcon.classList.replace("bx-show", "bx-hide");
        pInput.type = "password";
    });
});

// Password Validation
function createPass() {
    const passPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passInput.value.match(passPattern)) {
        return passField.classList.add("invalid"), passError.textContent = "Invalid, enter a valid password.";
    }
    passField.classList.remove("invalid"), passError.textContent = "";
}

// Confirm Password Validtion
function confirmPass() {
    if (passInput.value !== cPassInput.value || cPassInput.value === "") {
        return cPassField.classList.add("invalid"), cPassError.textContent = "Passwords do not match.";
    }
    cPassField.classList.remove("invalid"), cPassError.textContent = "";
}

// Calling Funtion on Form Sumbit
form.addEventListener("submit", (e) => {
    e.preventDefault(); //preventing form submitting
    checkEmail();
    createPass();
    confirmPass();

    //calling function on key up
    emailInput.addEventListener("keyup", checkEmail);
    passInput.addEventListener("keyup", createPass);
    cPassInput.addEventListener("keyup", confirmPass);

    if (
        !emailField.classList.contains("invalid") &&
        !passField.classList.contains("invalid") &&
        !cPassField.classList.contains("invalid")
    ) {
        form.removeEventListener("submit", arguments.callee); //removing event listener after form is submitted
        location.href = form.getAttribute("action");
    }
});



registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Register functionality
registerBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passInput.value;

    // Store user credentials in local storage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    console.log(localStorage.getItem("userEmail"), "   here\n");

    // Optionally, you can add more validation logic here before storing the credentials
});

// Sign-in Functionality
signInBtn.addEventListener('click', () => {
    clearErrors();

    const email = emailInput.value;
    const password = passInput.value;

    // Retrieve user credentials from local storage
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
        // Sign in successful
        console.log('Sign-in successful');
        // Here you can redirect the user to another page or perform other actions
    } else {
        // Sign in failed
        console.log('Sign-in failed');
        // Display error message
        emailError.textContent = 'Invalid email or password';
        console.log("invalid");
    }
});

// Form Submission Validation
form.addEventListener("submit", (e) => {
    e.preventDefault(); //preventing form submitting
    checkEmail();
    createPass();
    confirmPass();

    //calling function on key up
    emailInput.addEventListener("keyup", checkEmail);
    passInput.addEventListener("keyup", createPass);
    cPassInput.addEventListener("keyup", confirmPass);

    if (
        !emailField.classList.contains("invalid") &&
        !passField.classList.contains("invalid") &&
        !cPassField.classList.contains("invalid")
    ) {
        form.removeEventListener("submit", arguments.callee); //removing event listener after form is submitted
        // location.href = form.getAttribute("action");
    }
});

function clearErrors() {
    emailError.textContent = '';
    passError.textContent = '';
    cPassError.textContent = '';
}