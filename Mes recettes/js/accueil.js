fetch("data/recettes.json")
    .then(response => response.json())
    .then(recettes => {

        recettes.sort((a, b) => new Date(b.date) - new Date(a.date));

        const dernieres = recettes.slice(0, 3);

        const container = document.getElementById("accueil-dernieres");

        dernieres.forEach((recette, index) => {
            const card = document.createElement("a");
            card.href = recette.url;
            card.className = "carte-recette fade-in";

            // Optionnel : petit délai pour un effet cascade
            card.style.animationDelay = `${index * 0.15}s`;

            card.innerHTML = `
                <img src="${recette.image}" alt="${recette.titre}">
                <h3>${recette.titre}</h3>
            `;

            container.appendChild(card);
        });
    });
