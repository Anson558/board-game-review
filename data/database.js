mongodb = require('mongodb')

let database;

MongoClient = mongodb.MongoClient

async function connect() {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    database = client.db('boardgamereview');
}

function getDb() {
    if (!database) {
        throw { message: "Could not Connect to Database" }
    }
    return database
}

module.exports = {
    connectToDb: connect,
    getDb: getDb
}