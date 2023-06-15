const { WasherInventory, RMInventory } = require('../models')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    let entries = await WasherInventory.findAll({
      include: {
        model: RMInventory,
        attributes: ['material', 'thickness']
      },
      attributes: { exclude: ['raw_material_id', 'createdAt', 'updatedAt'] }
    })

    for (let i=0; i<entries.length; i++) {
      entries[i] = JSON.parse(JSON.stringify(entries[i]))
      Object.assign(entries[i], entries[i].RMInventory)
      delete entries[i].RMInventory
    }

    res.send(entries)
  } catch (e) { res.status(500).send(e) }
})

module.exports = router