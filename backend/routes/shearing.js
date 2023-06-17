const { sequelize, ShearingEntry, RMInventory } = require('../models')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const t = await sequelize.transaction()
    try {
        // Find the sheet row
        const sheet = await RMInventory.findOne({
            where: {
                material: req.body.material,
                form: 'Sheet',
                thickness: req.body.thickness
            }
        })

        // Find or create row in the 'rm_inventory' table for the strip
        let stripObj = {
            material: sheet.material,
            form: 'Strip',
            thickness: sheet.thickness,
            length: req.body.length
        }

        let strip = await RMInventory.findOne({ where: stripObj })

        if (strip === null) {
            Object.assign(stripObj, { quantity: 0, weight: 0 })
            strip = await RMInventory.create(stripObj, { transaction: t })
        }

        // Create Shearing Entry
        const entry = await ShearingEntry.create({
            date: req.body.date,
            sheet_rm_id: sheet.id,
            strip_rm_id: strip.id,
            weight: req.body.weight,
            sheet_quantity: req.body.sheet_quantity,
            strip_quantity: req.body.strip_quantity
        }, { transaction: t })

        // Decrement and Increment corresponding values
        await sheet.decrement({
            'quantity': entry.sheet_quantity,
            'weight': entry.weight
        }, { transaction: t })

        await strip.increment({
            'quantity': entry.strip_quantity,
            'weight': entry.weight
        }, { transaction: t })

        res.status(201).send({ success: true })
        await t.commit()
    } catch (e) {
        let code = 500, message = e

        if (e instanceof TypeError) { 
            code = 409; 
            message = "No sheets were found in the inventory for the values provided" 
        }

        res.status(code).send({ success: false, msg: message })
        await t.rollback()
    }
})

router.get('/', async (req, res) => {
    try {
        let entries = await ShearingEntry.findAll({ 
            include: {
                model: RMInventory,
                as: 'StripRM',
                attributes: ['material', 'thickness', 'length']
            },
            attributes: ['id', 'date', 'weight', 'sheet_quantity', 'strip_quantity']
        })
        
        for (let i=0; i<entries.length; i++) {
            entries[i] = JSON.parse(JSON.stringify(entries[i]))
            Object.assign(entries[i], entries[i].StripRM)
            delete entries[i].StripRM
        }

        res.send(entries)
    } catch (e) { res.status(500).send(e) }
})

module.exports = router