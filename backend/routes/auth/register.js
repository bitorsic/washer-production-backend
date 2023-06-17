const { ValidationError } = require('sequelize')
const { Auth } = require('../../models')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const user = await Auth.create({
            email: req.body.email,
            pass: await bcrypt.hash(req.body.password, 10)
        })

        res.status(201).send({
            success: true,
            msg: "Registration Successful"
        })
    } catch (e) {
        let code = 500, message = e

        if (e instanceof ValidationError) { code = 409; message = "User with email id already exists" }

        res.status(code).send({ success: false, msg: message })
    }
})

module.exports = router