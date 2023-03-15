const { sequelize, Auth, RMInventory, RMEntry, ShearingEntry, Config } = require('./models')
// const bcrypt = require('bcrypt')

async function main() {
    await sequelize.sync()

    // const inv = await RMInventory.create({
    //     material: 'Aluminium',
    //     form: 'Sheet',
    //     thickness: 4.5,
    //     quantity: 55,
    //     weight: 23.4
    // })

    // const inv = await RMInventory.create({
    //     material: 'Aluminium',
    //     form: 'Strip',
    //     thickness: 4.5,
    //     length: 3.2,
    //     quantity: 12,
    //     weight: 7.8
    // })

    // const entry = await RMEntry.create({
    //     date: '2022-01-17',
    //     lot_no: 327,
    //     raw_material_id: 1,
    //     quantity: 72,
    //     weight: 25.7
    // })

    // const entry = await RMEntry.create({
    //     date: '2022-01-18',
    //     lot_no: 329,
    //     raw_material_id: 2,
    //     quantity: 52,
    //     weight: 35.7
    // })
}

// const hehe = await Config.create({
//     material_val: 'aluminium,copper,brass',
//     form_val: 'sheet,strip',
//     scrap_type_val: 'tikli,patti,cut washer'
// })

// const umm = await Config.findAll()
// let values = umm[0].material_val
// console.log(values.split(','))

// let entries = await RMEntry.findAll({ 
//     attributes: ['date', 'lot_no', 'quantity', 'weight'],
//     include: {
//         model: RMInventory,
//         attributes: ['material', 'form', 'thickness', 'length']
//     }
// })
// console.log(JSON.stringify(entries))

// let user = await Auth.create({
//     first_name: "Yash",
//     last_name: "Jaiswal",
//     email: "bitorsic@gmail.com",
//     pass: await bcrypt.hash("heheVeryStrongPass", 10),
//     type: 1
// })


// const shearing = await ShearingEntry.create({
//     date: '2022-01-17',
//     sheet_rm_id: 1,
//     strip_rm_id: 2,
//     weight: 25.7,
//     sheet_quantity: 72,
//     strip_quantity: 47,
//     received: true
// })

// const finder = await ShearingEntry.findOne({
//     where: {
//         shearing_id: 1
//     }, include: ['SheetRM', 'StripRM']
// })

// console.log(finder.SheetRM.form)
// console.log(finder.StripRM.form)

main()