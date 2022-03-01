document.addEventListener("DOMContentLoaded", () => {

    $(document).on("click", "#loginButton", function() {
        changeURL("/home", "/login-signup");
    });
});