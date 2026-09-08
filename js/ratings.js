async function loadRating(recipe) {
    const response = await fetch("https://raw.githubusercontent.com/geraldinerigon-coder/recettes-gigi/main/ratings.json");
    const data = await response.json();

    if (!data[recipe]) return { votes: 0, average: 0 };

    const votes = data[recipe].votes;
    const total = data[recipe].total;
    const average = votes > 0 ? (total / votes).toFixed(1) : 0;

    return { votes, average };
}

async function sendRating(recipe, rating) {
    await fetch("https://api.github.com/repos/geraldinerigon-coder/recettes-gigi/dispatches", {
        method: "POST",
        headers: {
            "Accept": "application/vnd.github.everest-preview+json",
            "Authorization": "token YOUR_GITHUB_TOKEN",
        },
        body: JSON.stringify({
            event_type: "update-rating",
            client_payload: { recipe, rating }
        })
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const recipe = window.location.pathname.split("/").pop().replace(".html", "");

    const stars = document.querySelectorAll(".stars span");
    const ratingCount = document.querySelector(".rating-count");
    const ratingAverage = document.querySelector(".rating-average");

    const { votes, average } = await loadRating(recipe);

    ratingCount.textContent = `${votes} votes`;
    ratingAverage.textContent = `⭐ ${average} / 5`;

    stars.forEach(star => {
        star.addEventListener("click", async () => {
            const value = parseInt(star.dataset.value);

            await sendRating(recipe, value);

            const updated = await loadRating(recipe);
            ratingCount.textContent = `${updated.votes} votes`;
            ratingAverage.textContent = `⭐ ${updated.average} / 5`;
        });
    });
});
