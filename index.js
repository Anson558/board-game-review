const express = require('express')
const mongodb = require('mongodb')
const path = require('path')
const db = require('./data/database')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/browse', async function(req, res) {
    const games = await db.getDb().collection('games').find().toArray()
    
    res.render('browse', {games: games})
})

app.get('/share-games', function(req, res) {
    res.render('share-games')
})

app.post('/share-games', async function(req, res) {
    const game = {
        name: req.body.title,
        description: req.body.description,
        price: req.body.price,
        details: {
            age: req.body.age,
            players: {
                min: req.body.minplayers,
                max: req.body.maxplayers
            },
            time: req.body.time
        }
    }

    const result = await db.getDb().collection('games').insertOne(game)
    res.redirect('/')
})

app.get('/share-reviews', async function(req, res) {
    const games = await db.getDb().collection('games').find().toArray()

    res.render('share-reviews', {games: games})
})

app.post('/share-reviews', async function(req, res) {
    const review = {
        game: new mongodb.ObjectId(req.body.game),
        rating: parseInt(req.body.rating),
        content: req.body.content,
        author: req.body.author
    }

    const result = await db.getDb().collection('reviews').insertOne(review)
    res.redirect('/')
})

app.get('/reviews/:id', async function(req, res) {
    const reviews = await db.getDb().collection('reviews').find({ game: new mongodb.ObjectId(req.params.id) }).toArray()
    const game = await db.getDb().collection('games').findOne({ _id: new mongodb.ObjectId(req.params.id) })

    console.log(reviews)

    res.render('reviews', {reviews: reviews, game: game})
})

db.connectToDb().then(function () {
    app.listen(3000)
});
