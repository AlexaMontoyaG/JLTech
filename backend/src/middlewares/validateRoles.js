const { request, response } = require("express")

const validateRoleAdminOrRh = (req = request, res = response, next) => {
    const {rol} = req.body.payload
    if (rol == "admin" || rol == "rh") {
        next()
        return
    }
    return res.status(401).json({ok: false, status: 401, message: "Unauthorization user"})
}

const validateRoleAdminOrSellerOrRh = (req = request, res = response, next) => {
    const {rol} = req.body.payload
    if (rol == "admin" || rol == "rh" || rol == "seller") {
        next()
        return
    }
    return res.status(401).json({ok: false, status: 401, message: "Unauthorization user"})
}

const validateRoleAdminOrGrocer = (req = request, res = response, next) => {
    const {rol} = req.body.payload
    if (rol == "admin" || rol == "grocer") {
        next()
        return
    }
    return res.status(401).json({ok: false, status: 401, message: "Unauthorization user"})
}

const validateRoleAdminOrSeller = (req = request, res = response, next) => {
    const {rol} = req.body.payload
    if (rol == "admin" || rol == "seller") {
        next()
        return
    }
    return res.status(401).json({ok: false, status: 401, message: "Unauthorization user"})
}


module.exports = {validateRoleAdminOrRh, validateRoleAdminOrSellerOrRh, validateRoleAdminOrGrocer, validateRoleAdminOrSeller}