const {request, response} = require("express")
const { validatePassword } = require("../helpers/auth.helpers")
const { generateToken } = require("../helpers/jwt.helpers")
const userModel = require("../models/user.model")

const login = async(req=request, res=response) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({ok: false, status: 400, message: "User or password are incorrect"})
        }
        const verifyPassword = await validatePassword(password, user.password)
        if(verifyPassword){
            const payload = {id: user._id, name: user.name, email: user.email, rol: user.rol}
            const token = await generateToken(payload)
            res.status(200).json({ok: true, status: 200, token, name: payload.name, id: payload.id, rol: payload.rol})
        }
        else{
            return res.status(400).json({ok: false, status: 400, message: "User or password are incorrect"})
        }        
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message})        
    }
}

module.exports = {login}