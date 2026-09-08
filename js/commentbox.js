document.addEventListener("DOMContentLoaded", function () {

    const page = window.location.pathname.split("/").pop().replace(".html", "");

    const recettes = [
        "suzy",
        "houmous",
        "cookies-laura-todd",
        "merveilleux",
        "riz-au-lait-stephane-jego",
        "creme-renversee-caramel",
        "biscuits-a-la-cuiller",
        "pate-a-tartiner-michalak",
        "noisettes-caramelisees",
        "gateau-chocolat-lenotre",
        "focaccia-sans-petrissage",
        "meringue-suisse"
    ];

    if (recettes.includes(page)) {

        /* ⭐⭐⭐⭐⭐ SYSTÈME DE NOTATION */
        const stars = document.querySelectorAll(".stars span");
        const ratingCount = document.querySelector(".rating-count");

        const storageKey = "rating-" + page;

        const savedRating = localStorage.getItem(storageKey);
        const savedVotes = localStorage.getItem(storageKey + "-votes");

        if (savedRating) {
            highlightStars(savedRating);
        }

        if (savedVotes) {
            ratingCount.textContent = savedVotes + " votes";
        }

        stars.forEach(star => {
            star.addEventListener("click", function () {
                const value = this.getAttribute("data-value");

                localStorage.setItem(storageKey, value);

                let votes = localStorage.getItem(storageKey + "-votes");
                votes = votes ? parseInt(votes) + 1 : 1;
                localStorage.setItem(storageKey + "-votes", votes);

                ratingCount.textContent = votes + " votes";

                highlightStars(value);
            });
        });

        function highlightStars(value) {
            stars.forEach(star => {
                star.classList.toggle("active", star.getAttribute("data-value") <= value);
            });
        }

        /* 💬 COMMENTBOX AUTOMATIQUE */
        commentBox('5716894526996480-proj', {
            className: 'commentbox',
            defaultBoxId: page,
            backgroundColor: '#F7F3EC'
        });
    }
});
