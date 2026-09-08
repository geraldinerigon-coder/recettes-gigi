const fs = require('fs');

const payload = JSON.parse(fs.readFileSync('payload.json', 'utf8'));
const recipe = payload.recipe;
const rating = payload.rating;

const data = JSON.parse(fs.readFileSync('ratings.json', 'utf8'));

if (!data[recipe]) {
    data[recipe] = { votes: 0, total: 0 };
}

data[recipe].votes += 1;
data[recipe].total += rating;

fs.writeFileSync('ratings.json', JSON.stringify(data, null, 2));
