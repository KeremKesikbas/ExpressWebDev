function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    var loginUsername = "";
    var loginPassword = "";

    var signupEmail = "";
    var signupUsername = "";
    var signupPassword = "";
    var signupCPassword = "";

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        sendJSON("/login-signup", {username: loginUsername, password: loginPassword});

        $.getJSON("/login-signup", function(result) {
            $.each(result, function(i, field) {
                setFormMessage(loginForm, "error", i);
            });
        });
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        sendJSON("/login-signup", {
            username: signupUsername, 
            password: signupPassword,
            confirmPassword: signupCPassword,
            email: signupEmail});
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "loginUsername") {
                loginUsername = e.target.value;
            }
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "loginPassword") {
                loginPassword = e.target.value;
            }
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername") {
                signupUsername = e.target.value;
            }
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupEmail") {
                signupEmail = e.target.value;
            }
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupPassword") {
                signupPassword = e.target.value;
            }
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "sigunpCPassword") {
                signupCPassword = e.target.value;
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});