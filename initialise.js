const { sequelize, Config } = require('./models')

async function init() {
    await sequelize.sync()

    const configInit = await Config.create({
        material_val: 'Aluminium,Copper,Brass',
        form_val: 'Sheet,Strip',
        scrap_type_val: 'Patti,Tikli,Cut Washer'
    })
}

init()