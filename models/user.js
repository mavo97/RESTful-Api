'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    avatar: String,
    password: { type: String, select: false },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})

UserSchema.pre('save', (next) => {
    let user = this
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next()

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next()
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.gravatar = function() {
    if (!this.email) return `http://www.gravatar.com/avatar/?d=identicon`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `http://www.gravatar.com/avatar/${md5}?d=identicon`

}

module.exports = mongoose.model('User', UserSchema)