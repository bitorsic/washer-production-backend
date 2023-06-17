const { Auth } = require('../../models')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const user = await Auth.findByPk(req.body.email)

    try {
        // User not found
        if (user == null) { throw 400 }

        // Success
        if (await bcrypt.compare(req.body.password, user.pass)) {
            var userType = () => {
                if (user.type === 1) return 'superUser'
                else return 'user'
            }

            res.send({ 
                success: true, 
                email: user.email,
                type: user.type,
                msg: "Logged In as " + userType()
            })

        // Incorrect password
        } else { throw 403 }
    } catch (e) {
        let code = 500, message = e

        if (e == 400 || e == 403) { code = e; message = "Could not log in" }
        
        res.status(code).send({
            success: false, 
            email: null,
            type: null,
            msg: message
        })
    }
})

module.exports = router