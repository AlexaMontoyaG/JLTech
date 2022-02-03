const bcrypt = require("bcrypt")

const encryptPassword = async(password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt)
    } catch (error) {
        throw new Error(error.message)        
    }
}

const validatePassword = async(password, hash) => {
    try {
        return bcrypt.compareSync(password, hash)
    } catch (error) {
        throw new Error(error.message)        
    }
}

module.exports = {encryptPassword, validatePassword}