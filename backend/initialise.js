const { sequelize, Config } = require('./models')

async function init() {
    await sequelize.sync({ force: true })

    const configInit = await Config.create({
        material_val: 'Aluminium,Copper,Brass',
        form_val: 'Sheet,Strip',
        scrap_type_val: 'Patti,Tikli,Cut Washer'
    })
    console.log("Database reset")
}

init()