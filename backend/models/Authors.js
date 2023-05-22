const mongoose = require('mongoose')

const AuthorsSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    avatar: {
        type: String
    }
})

module.exports = mongoose.model('AuthorsModel', AuthorsSchema, 'Authors')