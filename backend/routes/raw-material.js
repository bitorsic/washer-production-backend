const { ValidationError } = require('sequelize')
const { sequelize, RMEntry, RMInventory } = require('../models')
const express = require('express')
const router = express.Router()

router.post('/entry', async (req, res) => {
    const t = await sequelize.transaction()
    try {
        // Find or create row in the 'rm_inventory' table
        let invObj = {
            material: req.body.material,
            form: req.body.form,
            thickness: req.body.thickness,
            length: req.body.length
        }
        let inv = await RMInventory.findOne({ where: invObj })
        if (inv === null) {
            Object.assign(invObj, { quantity: 0, weight: 0 })
            inv = await RMInventory.create(invObj, { transaction: t })
        }

        // Create RM Entry
        const entry = await RMEntry.create({
            date: req.body.date,
            lot_no: req.body.lot_no,
            raw_material_id: inv.id,
            quantity: req.body.quantity,
            weight: req.body.weight
        }, { transaction: t })

        // Increment corresponding values in the RM Inventory 
        await inv.increment({
            quantity: entry.quantity,
            weight: entry.weight
        }, { transaction: t })

        res.status(201).send({ success: true, msg: "Entry successful" })
        await t.commit()
    } catch (e) {
        let code = 500, message = e

        if (e instanceof ValidationError) { 
            code = 409; 
            message = "An entry with the lot no. " + req.body.lot_no + " already exists" 
        }

        res.status(code).send({ success: false, msg: message })
        await t.rollback()
    }
})

router.get('/entry', async (req, res) => {
    try {
        let entries = await RMEntry.findAll({ 
            include: {
                model: RMInventory,
                attributes: ['material', 'form', 'thickness', 'length']
            },
            attributes: ['date', 'lot_no', 'quantity', 'weight']
        })
        
        for (let i=0; i<entries.length; i++) {
            entries[i] = JSON.parse(JSON.stringify(entries[i]))
            Object.assign(entries[i], entries[i].RMInventory)
            delete entries[i].RMInventory
        }

        res.send(entries)

        
    } catch (e) { res.status(500).send(e) }
})

router.get('/inventory', async (req, res) => {
    try {
        let data = await RMInventory.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })

        res.send(data)
    } catch (e) { res.status(500).send(e) }
})
module.exports = router