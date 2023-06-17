const { ValidationError } = require('sequelize')
const { sequelize, RMInventory, WasherInventory, Customer, DeliveryEntry } = require('../models')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const t = await sequelize.transaction()
    try {
        // Find row in the 'washer_inventory' table
        let washerInv = await WasherInventory.findByPk(req.body.part_no)
        if (washerInv === null) { throw ValidationError }

        // Find or create row in the 'customer' table
        let custObj = {
            name: req.body.customer_name,
            city: req.body.customer_city
        }
        let cust = await Customer.findOne({ where: custObj })
        if (cust === null) { cust = await Customer.create(custObj, { transaction: t }) }

        // Create delivery entry
        const entry = await DeliveryEntry.create({
            date: req.body.date,
            invoice_no: req.body.invoice_no,
            part_no: washerInv.part_no,
            customer_id: cust.id,
            quantity: req.body.quantity,
            weight: req.body.weight,
            rate: req.body.rate,
            tax_rate: req.body.tax_rate,
            total_amount: req.body.total_amount
        }, { transaction: t })

        // Decrement washers
        await washerInv.decrement({
            quantity: entry.quantity,
            weight: entry.weight
        }, { transaction: t })

        res.status(201).send({ success: true })
        await t.commit()
    } catch (e) {
        let code = 500, message = e
        if (e instanceof TypeError || e instanceof ValidationError) { code = 409 }
        res.status(code).send({ success: false, msg: message })
        await t.rollback()
    }
})

router.get('/', async (req, res) => {
    try {
        let entries = await DeliveryEntry.findAll({
            include: [{
                model: Customer,
                attributes: ['name']
            },
            {
                model: WasherInventory,
                include: {
                    model: RMInventory,
                    attributes: ['material', 'thickness']
                },
                attributes: ['size']
            }],
            attributes: { exclude: ['customer_id', 'createdAt', 'updatedAt'] }
        })

        for (let i = 0; i < entries.length; i++) {
            entries[i] = JSON.parse(JSON.stringify(entries[i]))
            entries[i].customer_name = entries[i].Customer.name
            delete entries[i].Customer
            Object.assign(entries[i], entries[i].WasherInventory)
            delete entries[i].WasherInventory
            Object.assign(entries[i], entries[i].RMInventory)
            delete entries[i].RMInventory
        }

        res.send(entries)
    } catch (e) { res.status(500).send(e) }
})

module.exports = router