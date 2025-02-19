const express = require('express');
const fs = require('fs');
const seedrandom = require('seedrandom');


function pickRandomInteger(max) {
    const rng = seedrandom();
    return Math.floor(rng() * Math.floor(max));
}

function loadPeopleFromFile(filepath) {
    let peopleText = '';

    try {
        peopleText = fs.readFileSync(filepath, 'utf-8');
    } catch (e) {
        console.log('Failed to open file: ', filepath);
        return [];
    }

    if (!peopleText) {
        return [];
    }

    const people = peopleText.split('\n');
    return people.filter(Boolean);
}

const app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));
app.get('/', (req, res) => {
    const people = loadPeopleFromFile('./people.txt');
    const peopleEntries = people.map(person => ({ name: person }));
    const randomPersonIndex = pickRandomInteger(peopleEntries.length);
    peopleEntries[randomPersonIndex].selected = true;
    res.render('index', {
        people: peopleEntries,
    });
});
console.log('Listening on http://localhost:9001');
app.listen(9001);
