// Récupère la catégorie dans l'URL
const params = new URLSearchParams(window.location.search);
const categorieURL = params.get("categorie");

// Toutes les cartes de recettes
const cartes = document.querySelectorAll(".carte-recette");

// Fonction de filtrage par catégorie
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

// Filtrage par URL
if (categorieURL) {
    filtrerRecettes(categorieURL);
} else {
    filtrerRecettes("toutes");
}

// 🔥 Filtrage par recherche
document.getElementById("recherche").addEventListener("input", function () {
    const terme = this.value.toLowerCase();

    cartes.forEach(carte => {
        const titre = carte.querySelector("h3").textContent.toLowerCase();
        carte.style.display = titre.includes(terme) ? "" : "none";
    });
});

// 🔥 Filtrage par catégorie (select)
document.getElementById("filtre-categorie").addEventListener("change", function () {
    const categorie = this.value.toLowerCase();
    filtrerRecettes(categorie);
});
