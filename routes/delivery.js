const { ValidationError } = require('sequelize')
const { sequelize, RMInventory, WasherInventory, Customer, DeliveryEntry } = require('../models')
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
          include: {
              model: Customer,
              attributes: ['name']
          },
          attributes: ['date', 'invoice_no', 'part_no', 'quantity', 'weight']
      })
      
      for (let i=0; i<entries.length; i++) {
          entries[i] = JSON.parse(JSON.stringify(entries[i]))
          Object.assign(entries[i], entries[i].Customer)
          delete entries[i].Customer
      }

      res.send(entries)
  } catch (e) { res.status(500).send(e) }
})

module.exports = router