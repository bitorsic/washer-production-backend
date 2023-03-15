const { MeltingEntry, ProductionEntry, Customer, ScrapInventory, ScrapEntry, Config } = require('../models')
const express = require('express')
const router = express.Router()

router.get('/history', async (req, res) => {
    try {
        let entries = await ScrapEntry.findAll({
            include: [
                { 
                    model: ScrapInventory,
                    attributes: ['material', 'type', 'weight']
                },
                { 
                    model: MeltingEntry,
                    attributes: ['date'],
                    include: {
                        model: Customer,
                        attributes: ['name']
                    }
                },
                { 
                    model: ProductionEntry, 
                    attributes: ['date']
                }
            ],
            attributes: ['weight_change']
        })

        for (let i=0; i<entries.length; i++) {
            entries[i] = JSON.parse(JSON.stringify(entries[i]))

            if (entries[i].MeltingEntry != null) {
                entries[i].process = "Melting"
                Object.assign(entries[i], entries[i].MeltingEntry.Customer)
                delete entries[i].MeltingEntry.Customer
                Object.assign(entries[i], entries[i].MeltingEntry)
            } else {
                entries[i].process = "Production"
            }
            delete entries[i].MeltingEntry
            delete entries[i].ProductionEntry

            Object.assign(entries[i], entries[i].ScrapInventory)
            delete entries[i].ScrapInventory
        }

        res.send(entries)
    } catch (e) { res.status(500).send(e); console.log(e) }
})

router.get('/inventory', async (req, res) => {
    try {
        let invRows = []

        const configRows = await Config.findAll() // To get the materials and scrap types values

        // Get rows from the scrap_inventory table
        const scrapInv = await ScrapInventory.findAll({
            attributes: ['material', 'type', 'weight']
        })

        // Getting materials values
        let materials = configRows[0].material_val
        materials = materials.split(',')

        // Getting scrap types values
        let scrapTypes = configRows[0].scrap_type_val
        scrapTypes = scrapTypes.split(',')

        for (var i=0; i<materials.length; i++) {
            let total = 0 // Total weight per material
            let invObj = { material: materials[i] }
            
            for (var j=0; j<scrapTypes.length; j++) {
                // Find row with corresponding material and scrap type
                obj = scrapInv.find(
                    o => o.material == materials[i]
                    && o.type == scrapTypes[j]
                )

                if (obj !== undefined) {
                    // Add key value pair e.g Tikli: 24.5, for each scrap type
                    invObj[scrapTypes[j]] = obj.weight
                    total += obj.weight 
                }
            }

            invObj.total_weight = total
            invRows.push(invObj)
        }

        res.send(invRows)
    } catch (e) { res.status(500).send(e) }
})

module.exports = router