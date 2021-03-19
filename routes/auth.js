const Joi = require('joi')
const {User} = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')
const route = express.Router()

// creating the password post request
route.post('/', async (req, res) => {
    const {error} = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // finding if the user exist
    let user = await User.findOne({email : req.body.email})
    if (!user) return res.status(400).send('Invalid email or password')
    
    // comparing the password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password')

    // for now 
    res.send(true)
})

const validation = (req) => {
    const schema = {
        email : Joi.string().email().min(3).max(50).required(),
        password: Joi.string().min(10).max(255).required()
    }

    return Joi.validate(req, schema)
}

module.exports = route