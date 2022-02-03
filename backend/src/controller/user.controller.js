const {request, response} = require("express")
const { encryptPassword } = require("../helpers/auth.helpers")
const { deleteImg } = require("../helpers/deleteImg.helpers")
const { uploadFile } = require("../helpers/imgUpload.helpers")
const userModel = require("../models/user.model")


const createUser = async(req=request, res=response) => {
    const {name, contact, email, password, rol} = req.body
    try {
        const user = new userModel({name, contact, email, password, rol})
        user.password = await encryptPassword(password)
        const fileName = await uploadFile(req.files)
        user.saveUrlImg(fileName)
        await user.save()
        res.status(201).json({ok: true, status: 201, user})
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message})        
    }
}

const listUsers = async(req=request, res=response) => {
    try {
        const {limit=10, page=1} = req.query
        const options = {
            limit, page
        }
        const {docs:users,...data} = await userModel.paginate(options)
        res.status(200).json({ok: true, status: 200, users, data})
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message})
    }
}

const deleteUser = async (req = request, res = response) => {
    try {
        const {id} = req.params
        const user = await userModel.findById({_id:id})
        if(!user){
            return res.status(404).json({ok:false, status: 404, message: "User not found"})
        }
        if(user.imageName){
            deleteImg(user.imageName)
        }
        await user.deleteOne();
        res.status(200).json({ok:true, status: 200, message: "User deleted"})
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message})
    }
}

const updateUser = async (req = request, res = response) => {
    const {name, contact, email, password} = req.body
    const {id} = req.params

    try {
        const user = await userModel.findById({_id:id})

        user.name = name || user.name
        user.contact = contact || user.contact
        user.email = email || user.email
        user.password = password || user.password

        if(req.files){
            const fileName = await uploadFile(req.files)
            await deleteImg(user.imageName)
            user.saveUrlImg(fileName)
        }
        await user.save()
        res.status(200).json({ok: true, status: 200, message:"User updated", user})
        
    } catch (error) {
        res.status(500).json({ ok: false, status: 500, message: error.message });
    }
}

module.exports = {createUser, listUsers, deleteUser, updateUser}