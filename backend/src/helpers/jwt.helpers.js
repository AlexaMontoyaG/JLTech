const jwt = require("jsonwebtoken")

const generateToken = async(payload) => {
    try {
        return jwt.sign(payload, process.env.PRIVATE_KEY,{expiresIn: "24h"})
    } catch (error) {
        throw new Error("The token could not be generated")        
    }
}

const verifyJWT = async(token) => {
    try {
        return jwt.verify(token, process.env.PRIVATE_KEY)
    } catch (error) {
        throw new Error("Invalid token")        
    }
}

module.exports = {generateToken, verifyJWT}