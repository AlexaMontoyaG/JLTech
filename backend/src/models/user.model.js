const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    imageName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    rol: {
        type: String,
        enum: [
            "admin", "rh", "seller", "grocer"
        ],
        default: "admin",
        required: true
    }
}, {timestamps: true})


userSchema.methods.toJSON = function () {
    const {
        __v,
        password,
        ...user
    } = this.toObject()
    return user
}

userSchema.plugin(mongoosePaginate)

userSchema.methods.saveUrlImg = function (fileName = null) {
    const url = process.env.URL_BASE
    this.img = `${url}/public/${fileName}`
    this.imageName = fileName
}

module.exports = model('user', userSchema)
