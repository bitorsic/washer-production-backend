const { Config } = require('../../models')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const rows = await Config.findAll()
        let values

        // Fetch CSV string from specific column of 'config' table
        if (req.query.col == 'materials') { values = rows[0].material_val }
        else if (req.query.col == 'forms') { values = rows[0].form_val }
        else if (req.query.col == 'scrap_types') { values = rows[0].scrap_type_val }
        else { throw 400 }
        
        // Split the string into an array
        res.send(values.split(','))
    } catch (e) {
        let code = 500, message = e
        if (e == 400) { code = e; message = "Invalid query parameters" }
        res.status(code).send(message)
    }
})

module.exports = router