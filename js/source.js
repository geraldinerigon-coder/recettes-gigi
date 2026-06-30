const page = window.location.pathname.split("/").pop();

fetch("data/recettes.json")
    .then(response => response.json())
    .then(recettes => {

        const recette = recettes.find(r => r.url === page);
        if (!recette || !recette.source) return;

        const bloc = document.getElementById("bloc-source");

        // Si une URL existe → lien cliquable
        if (recette.source_url) {
            bloc.innerHTML = `
                <p><strong>Source :</strong> 
                    <a href="${recette.source_url}" target="_blank">${recette.source}</a>
                </p>
            `;
        } 
        // Sinon → texte simple
        else {
            bloc.innerHTML = `
                <p><strong>Source :</strong> ${recette.source}</p>
            `;
        }
    });
