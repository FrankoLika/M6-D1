const express = require('express')
const router = express.Router()
const authorsModel = require('../models/Authors')

router.get('/authors', async (req, res) => {
    try {
        const authors = await authorsModel.find()
        res.status(200).send(authors)
    } catch (error) {
        res.status(500)
            .send({
                message: 'Errore interno del server'
            })
    }
})

router.get('/authors/:id', async (req, res) => {
    try {
        const { id } = req.params
        const author = await authorsModel.findById(id)
        res.status(200).send(author)
    } catch (error) {
        res.status(500)
            .send({
                message: 'Errore interno del server'
            })
    }
})

router.post('/authors/new', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const dateOfBirth = req.body.dateOfBirth;
    const avatar = req.body.avatar;

    try {
        const authorsExist = await authorsModel.findOne({ email: email })
        if (authorsExist) {
            return res.status(409).json({ message: 'author already exist' })
        }
        const author = new authorsModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            dateOfBirth: dateOfBirth,
            avatar: avatar
        })
        await author.save()
        return res.status(201).json({
            message: 'autore aggiunto!', author
        })
    } catch (error) {
        res.status(500)
            .send({
                message: "Errore interno del server"
            })
    }
})

router.patch('/authors/:id', async (req, res) => {
    const { id } = req.params
    const authorExist = await authorsModel.findById(id)

    if (!authorExist) {
        return res.status(404).send({ message: 'autore inesistente' })
    }
    try {
        const authorId = id;
        const dataUpdate = req.body;
        const options = { new: true }

        const result = await authorsModel.findByIdAndUpdate(authorId, dataUpdate, options)
        res.status(200)
            .send({
                message: 'utente aggiornato con successo',
                payload: result
            })

    } catch (error) {
        res.status(500)
            .send({
                message: 'Errore interno del server'
            })
    }
})

router.delete('/authors/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const author = await authorsModel.findByIdAndDelete(id);
        if (!author) {
            return res(404).send({
                message: 'autore inesistente'
            })
        }
        res.status(200).send({
            message: ` autore con id:${id} è stato rimosso `
        })
    } catch (error) {
        res.status(400).send({
            message: 'Errore interno del server'
        })
    }
})

module.exports = router