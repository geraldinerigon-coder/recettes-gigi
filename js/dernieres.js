fetch("data/recettes.json")
    .then(response => response.json())
    .then(recettes => {

        // Trier par date (plus récente en premier)
        recettes.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Limiter à 3 dernières recettes
        const dernieres = recettes.slice(0, 3);

        const container = document.getElementById("liste-dernieres");

        dernieres.forEach(recette => {
            const card = document.createElement("a");
            card.href = recette.url;
            card.className = "carte-derniere";

            card.innerHTML = `
                <img src="${recette.image}" alt="${recette.titre}">
                <h3>${recette.titre}</h3>
                <p class="date">Ajoutée le ${new Date(recette.date).toLocaleDateString("fr-FR")}</p>
            `;

            container.appendChild(card);
        });
    });
