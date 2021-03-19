const {User, validate} = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const _ = require('lodash')


// User registration post request
router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send('The user already exists')

    
    user = new User(_.pick(req.body, ['id', 'name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    // modifying what we want the user to get
    res.send(_.pick(user, ['id', 'name', 'email']))
})

module.exports = router