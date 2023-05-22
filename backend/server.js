const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 5050;
const authorsRoute = require('./routes/Authors')
const app = express()

app.use(express.json())
app.use(cors())
app.use('/', authorsRoute)

mongoose.connect('mongodb+srv://likafrankolav:61MOKzEruAa8XwKo@testepicode.e2s6bwi.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore di connessione al database'))
db.once('open', () => {
    console.log('Database connesso correttamente')
})

app.listen(PORT, () => console.log(`server avviato su porta ${PORT}`))