// Récupère la catégorie dans l'URL
const params = new URLSearchParams(window.location.search);
const categorieURL = params.get("categorie"); // ex: "Pizza"

// Toutes les cartes de recettes
const cartes = document.querySelectorAll(".carte-recette");

// Fonction de filtrage
function filtrerRecettes(categorie) {
    cartes.forEach(carte => {
        const categoriesCarte = (carte.dataset.categorie || "")
            .toLowerCase()
            .split(",")
            .map(c => c.trim());

        const match = (categorie === "toutes" || categoriesCarte.includes(categorie.toLowerCase()));

        carte.style.display = match ? "" : "none";
    });
}

// Si une catégorie est dans l'URL → on filtre
if (categorieURL) {
    filtrerRecettes(categorieURL);
} else {
    filtrerRecettes("toutes");
}
