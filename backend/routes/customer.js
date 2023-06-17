const { Customer } = require('../models')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    let entries = await Customer.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

    res.send(entries)
  } catch (e) { res.status(500).send(e) }
})

module.exports = router