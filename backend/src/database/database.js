const mongoose = require('mongoose')
require('dotenv').config()

const URI = `${
    process.env.CONNECTION_STRING
}${
    process.env.DATABASE_NAME
}`

const dbConnection = async()=>{
    try {
        return await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        throw new Error("Error al conectar a la base de datos", error.message)

    }
}

module.exports = {
    dbConnection
}
