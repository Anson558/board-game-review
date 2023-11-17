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

app.get('/browse', function(req, res) {
    res.render('browse')
})

app.listen(3000);
