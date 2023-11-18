const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/browse', function (req, res) {
    const filePath = path.join(__dirname, 'data', 'games.json')
    const fileData = fs.readFileSync(filePath)
    const storedGames = JSON.parse(fileData)

    res.render('browse', {games: storedGames});
});

app.get('/share', function (req, res) {
    res.render('share');
});

app.post('/share', function (req, res) {
    const filePath = path.join(__dirname, 'data', 'games.json')
    const fileData = fs.readFileSync(filePath)
    const storedGames = JSON.parse(fileData)
    const gameData = req.body;

    storedGames.sort(function(itemA, itemB) {
        if (itemA.name > itemB.name) {
            return 1
        }
        else {
            return -1
        }
    })

    storedGames.push(gameData)

    fs.writeFileSync(filePath, JSON.stringify(storedGames))

    res.redirect('/confirm')
})

app.get('/confirm', function(req, res) {
    res.render('confirm');
})


app.listen(3000);
