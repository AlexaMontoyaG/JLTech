const { request, response } = require("express");
const customerModel = require("../models/customer.model");



const createCustomer = async(req=request, res=response) => {
    const {name, contact, email} = req.body

    try {
        const customer = new customerModel({name, contact, email})
        await customer.save()
        res.status(201).json({ok:true, status: 201, customer})
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message})  
    }
}

const listCustomers = async(req=request, res=response) => {
    try {
        const {limit=10, page=1} = req.query
        const options = {
            limit, page, populate: "sale"
        }
        const {docs: customers,...data} = await customerModel.paginate(options)
        res.status(200).json({ok: true, status: 200, customers, data})
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message})
    }
}

const deleteCustomer = async(req=request, res=response) => {
    try {
        const {id} = req.params
        const customer = await customerModel.findById({_id:id})
        if(!customer){
            return res.status(404).json({ok: false, status: 404, message: "Customer not found"})
        }        
        await customer.deleteOne()
        res.status(200).json({ok: true, status: 200, message: "Customer deleted"})
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message})
    }
}

const updateCustomer = async(req=request, res=response) => {
    const {name, contact, email} = req.body
    const {id} = req.params

    try {
        const customer = await customerModel.findById({_id: id})

        customer.name = name || customer.name
        customer.contact = contact || customer.contact
        customer.email = email || customer.email

        await customer.save()
        res.status(200).json({ok: true, status: 200, message: "Customer updated", customer})
        
    } catch (error) {
        res.status(500).json({ ok: false, status: 500, message: error.message });
    }
}


module.exports = {createCustomer, listCustomers, deleteCustomer, updateCustomer}