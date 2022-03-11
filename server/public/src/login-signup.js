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

    var lang = document.getElementById("lang").dataset.lang;
    var not_match = document.getElementById("not_match").dataset.not_match;
    var empty_area = document.getElementById("empty_area").dataset.empty_area;

    var checkLoginData = [false, false];
    var checkSignupData = [false, false, false, false];

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

        var sendable = true;

        checkLoginData.forEach(function(e) {
            if (!e) {
                sendable = false;
            }
        });

        if (sendable) {
            sendJSON("/login-signup/json", {type: "login", username: loginUsername, password: loginPassword});
        }
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        var sendable = true;

        checkSignupData.forEach(function(e) {
            if (!e) {
                sendable = false;
            }
        });

        if(sendable) {
            sendJSON("/login-signup/json", {
                type: "signup",
                username: signupUsername, 
                password: signupPassword,
                confirmPassword: signupCPassword,
                email: signupEmail});
        }
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "loginUsername") {
                loginUsername = e.target.value;

                if (e.target.value == "") {
                    setInputError(e.target, empty_area);
                    checkLoginData[0] = false;
                }

                else {
                    checkLoginData[0] = true;
                }
            }
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "loginPassword") {
                loginPassword = e.target.value;

                if (e.target.value == "") {
                    setInputError(e.target, empty_area);
                    checkLoginData[1] = false;
                }

                else {
                    checkLoginData[1] = true;
                }
            }
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername") {
                signupUsername = e.target.value;

                if (e.target.value == "") {
                    setInputError(e.target, empty_area);
                    checkSignupData[0] = false;
                }

                else {
                    checkSignupData[0] = true;
                }
            }
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupEmail") {
                signupEmail = e.target.value;

                if (e.target.value == "") {
                    setInputError(e.target, empty_area);
                    checkSignupData[1] = false;
                }

                else {
                    checkSignupData[1] = true;
                }
            }
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupPassword") {
                signupPassword = e.target.value;

                if (e.target.value == "") {
                    setInputError(e.target, empty_area);
                    checkSignupData[2] = false;
                }

                else {
                    checkSignupData[2] = true;
                }
            }
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupCPassword") {
                signupCPassword = e.target.value;

                if (e.target.value == "") {
                    setInputError(e.target, empty_area);
                    checkSignupData[3] = false;
                }

                else if (e.target.value != signupPassword) {
                    setInputError(e.target, not_match);
                    checkSignupData[3] = false;
                }

                else {
                    checkSignupData[3] = true;
                }
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});