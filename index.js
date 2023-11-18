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
    res.render('browse');
});

app.get('/share', function (req, res) {
    res.render('share');
});

app.post('/share', function (req, res) {
    const filePath = path.join(__dirname, 'data', 'games.json')
    const fileData = fs.readFileSync(filePath)
    const storedGame = JSON.parse(fileData)
    const gameData = req.body;

    storedGame.push(gameData)

    fs.writeFileSync(filePath, JSON.stringify(storedGame))

    res.redirect('/confirm')
})

app.get('/confirm', function(req, res) {
    res.render('confirm');
})


app.listen(3000);
