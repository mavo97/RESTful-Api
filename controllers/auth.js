'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')

function SignUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName
    })

    user.save((err) => {
        if (err) res.status(500).send({ message: `Error al crear el usuario: ${user}` })

        return res.status(200).send({ token: service.createToken(user) })
    })
}

function SignIn(req, res) {

}

module.exports = {
    SignUp,
    SignIn
}