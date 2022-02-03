const {response, request} = require("express")
const {verifyJWT} = require("../helpers/jwt.helpers")
const userModel = require("../models/user.model")

const validateUser = async (req = request, res = response, next) => {
    try {
        const {email} = req.body.payload
        const user = await userModel.findOne({email})
        if (!user) {
            return res.status(400).json({ok: false, status: 400, message: "User or password are incorrect"})
        }
        req.body.user = user
    } catch (error) {
        return res.status(500).json({ok: false, status: 500, message: error.message})
    }
    next()
}

const validateJWT = async (req = request, res = response, next) => {
    try {
        if (!req.header("Authorization")) {
            return res.status(401).json({ok: false, status: 401, message: "Unauthorization"})
        }
        const token = req.header("Authorization").split(" ")[1]
        const payload = await verifyJWT(token)
        req.body.payload = payload
    } catch (error) {
        return res.status(401).json({ok: false, status: 401, message: error.message})
    }
    next()
}

const validateFile = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.img) {
        return res.status(400).json({ok: false, status: 400, message: "No file was uploaded."})
    }
    next()
}

module.exports = {
    validateUser,
    validateJWT,
    validateFile
}
