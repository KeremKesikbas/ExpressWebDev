document.addEventListener("DOMContentLoaded", () => {

    var searchText = "";

    $(document).on("click", "#loginButton", function() {
        changeURL("/login-signup");
    });

    $(document).on("click", "#foundationsTab", function() {
        changeURL("/foundations");
    });

    $(document).on("click", "#eventsTab", function() {
        changeURL("/events");
    });

    $(document).on("click", "#contactTab", function() {
        changeURL("/contact");
    });

    $(document).on("click", "#careerTab", function() {
        changeURL("/career");
    });

    $(document).on("click", "#announcementsTab", function() {
        changeURL("/announcements");
    });

    $(document).on("click", "#aboutUsTab", function() {
        changeURL("/aboutUs");
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

    var map = document.getElementById("germany");

    map.addEventListener("click", function(data) {
        var title = data.target.title;

        sendJSON("/home/cp", {state: title});

        $.getJSON("/home/cg", function(data) {
            document.getElementById("StateModalTitle").textContent = data["name"];
            document.getElementById("StateModalInfo").textContent = data["info"];
            document.getElementById("StateModalImage").src = "images/map/" + data["name"] + ".png";

            var uns = data["universities"];

            for (var i = 0; i < uns.length; i++) {
                var e = document.createElement("td");

                e.textContent = uns[i]["name"];

                document.getElementById("StateModalTable").appendChild(e);
            }
        });
    });
});