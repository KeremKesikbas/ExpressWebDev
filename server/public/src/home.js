document.addEventListener("DOMContentLoaded", () => {

    var searchText = "";

    $(document).on("click", "#loginButton", function() {
        changeURL("/home", "/login-signup");
    });

    $(document).on("click", "#foundationsTab", function() {
        changeURL("/home", "/foundations");
    });

    $(document).on("click", "#eventsTab", function() {
        changeURL("/home", "/events");
    });

    $(document).on("click", "#contactTab", function() {
        changeURL("/home", "/contact");
    });

    $(document).on("click", "#careerTab", function() {
        changeURL("/home", "/career");
    });

    $(document).on("click", "#announcementsTab", function() {
        changeURL("/home", "/announcements");
    });

    $(document).on("click", "#aboutUsTab", function() {
        changeURL("/home", "/aboutUs");
    });

    $(document).on("click", "#searchButton", function() {
        searchText = document.getElementById("searchBox").value;

        alert(searchText + "a");
    });

    /////////////

    document.querySelectorAll('.navbar .nav-item').forEach(function(everyitem) {

		everyitem.addEventListener('mouseover', function(e) {

			let el_link = this.querySelector('a[data-bs-toggle]');

			if(el_link != null){
				let nextEl = el_link.nextElementSibling;
				el_link.classList.add('show');
				nextEl.classList.add('show');
			}
		});

		everyitem.addEventListener('mouseleave', function(e){
			let el_link = this.querySelector('a[data-bs-toggle]');

			if(el_link != null) {
				let nextEl = el_link.nextElementSibling;
				el_link.classList.remove('show');
				nextEl.classList.remove('show');
			}
		})
    });
});