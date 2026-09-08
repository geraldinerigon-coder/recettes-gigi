document.addEventListener("DOMContentLoaded", function () {

    // Récupère le nom de la page (ex: suzy.html → suzy)
    const page = window.location.pathname.split("/").pop().replace(".html", "");

    // Liste des recettes
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
        "focaccia-peppe",
        "meringue-suisse"
    ];

    // Si la page est une recette → activer étoiles + CommentBox
    if (recettes.includes(page)) {

        /* ⭐⭐⭐⭐⭐ SYSTÈME DE NOTATION */
        const stars = document.querySelectorAll(".stars span");
        const ratingCount = document.querySelector(".rating-count");

        // Identifiant unique pour chaque recette
        const storageKey = "rating-" + page;

        // Charger la note existante
        const savedRating = localStorage.getItem(storageKey);
        const savedVotes = localStorage.getItem(storageKey + "-votes");

        if (savedRating) {
            highlightStars(savedRating);
        }

        if (savedVotes) {
            ratingCount.textContent = savedVotes + " votes";
        }

        // Gestion du clic sur les étoiles
        stars.forEach(star => {
            star.addEventListener("click", function () {
                const value = this.getAttribute("data-value");

                // Sauvegarde locale
                localStorage.setItem(storageKey, value);

                // Compteur de votes
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
