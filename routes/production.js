const { ValidationError } = require('sequelize')
const { sequelize, RMInventory, ProductionEntry, SubContractor, ScrapInventory, ScrapEntry, WasherInventory } = require('../models')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const t = await sequelize.transaction()
    try {
        // Find row in rm_inventory
        const rmInv = await RMInventory.findOne({
            where: {
                material: req.body.material,
                form: req.body.form,
                thickness: req.body.thickness,
                length: req.body.length
            }
        })

        let entryObj = {
            date: req.body.date,
            raw_material_id: rmInv.id,
            rm_quantity: req.body.rm_quantity,
            rm_weight: req.body.rm_weight,
        }

        // Find or create row in the 'washer_inventory' table
        let washerInv = await WasherInventory.findByPk(req.body.part_no)
        if (washerInv === null) {
            let washerInvObj = {
                part_no: req.body.part_no,
                raw_material_id: rmInv.id,
                size: req.body.size,
                quantity: 0,
                weight: 0
            }
            washerInv = await WasherInventory.create(washerInvObj, { transaction: t })
        }

        Object.assign(entryObj, {
            part_no: req.body.part_no,
            return_rm_quantity: req.body.return_rm_quantity,
            return_rm_weight: req.body.return_rm_weight,
            washer_quantity: req.body.washer_quantity,
            washer_weight: req.body.washer_weight,
            total_scrap: req.body.total_scrap
        })

        const entry = await ProductionEntry.create(entryObj, { transaction: t })

        // Iterate over scrap object
        for (const type in req.body.scrap) {
            // Find or create scrap in inventory
            let scrapObj = {
                material: req.body.material,
                type: type
            }
            let scrapInv = await ScrapInventory.findOne({ where: scrapObj })
            if (scrapInv == null) {
                Object.assign(scrapObj, { weight: 0 })
                scrapInv = await ScrapInventory.create(scrapObj, { transaction: t })
            }

            // Create scrap entry
            const scrapEntry = await ScrapEntry.create({
                scrap_id: scrapInv.id,
                production_id: entry.id,
                weight_change: req.body.scrap[type]
            }, { transaction: t })

            // Increment scrap weight in scrap_inventory
            await scrapInv.increment({ weight: scrapEntry.weight_change }, { transaction: t })
        }

        // Increment and decrement corresponding values
        await rmInv.decrement({
            quantity: entry.rm_quantity - entry.return_rm_quantity,
            weight: entry.rm_weight - entry.return_rm_weight
        }, { transaction: t })
        await washerInv.increment({
            quantity: entry.washer_quantity,
            weight: entry.washer_weight
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

module.exports = router