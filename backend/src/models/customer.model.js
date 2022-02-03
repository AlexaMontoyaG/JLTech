const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

customerSchema.plugin(mongoosePaginate)

module.exports = model('customer', customerSchema)