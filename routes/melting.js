const { sequelize, MeltingEntry, Customer, ScrapInventory, ScrapEntry } = require('../models')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const t = await sequelize.transaction()
    try {
        // Find or create row in the 'customer' table
        let custObj = {
            name: req.body.customer_name,
            city: req.body.customer_city
        }
        let cust = await Customer.findOne({ where: custObj })
        if (cust === null) { cust = await Customer.create(custObj, { transaction: t }) }

        // Create Melting entry
        const entry = await MeltingEntry.create({
            date: req.body.date,
            customer_id: cust.id,
            total_scrap: req.body.total_scrap,
            rate: req.body.rate,
            tax_rate: req.body.tax_rate,
            total_amount: req.body.total_amount
        }, { transaction: t })

        // Iterate over scrap object
        for (const type in req.body.scrap) {
            // Find scrap in inventory
            const scrapInv = await ScrapInventory.findOne({ 
                where: {
                    material: req.body.material,
                    type: type
                } 
            })

            // Create scrap entry
            const scrapEntry = await ScrapEntry.create({
                scrap_id: scrapInv.id,
                melting_id: entry.id,
                weight_change: -req.body.scrap[type]
            }, { transaction: t })

            // Decrement corresponding weight in scrap inventory
            await scrapInv.decrement({ weight: -scrapEntry.weight_change }, { transaction: t })
        }

        res.status(201).send({ success: true })
        await t.commit()
    } catch (e) {
        let code = 500, message = e

        if (e instanceof TypeError) { 
            code = 409; 
            message = "No scrap was found in the inventory for the values provided" 
        }

        res.status(code).send({ success: false, msg: message })
        await t.rollback()
    }
})

module.exports = router