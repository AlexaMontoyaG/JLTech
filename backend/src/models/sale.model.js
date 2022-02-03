const {Schema, model, now} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const saleSchema = new Schema({
    invoiceNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: now()
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "customer",
        required: true
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true       
    }],
    amount:{
        type: Number,
        required: true
    },
    value: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

saleSchema.plugin(mongoosePaginate)

module.exports = model('sale', saleSchema)