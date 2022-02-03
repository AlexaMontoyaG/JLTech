const {request, response} = require("express");
const {deleteImg} = require("../helpers/deleteImg.helpers");
const {uploadFilesProducts} = require("../helpers/imgUpload.helpers");
const productModel = require("../models/product.model");

const createProduct = async (req = request, res = response) => {
    const {name, price} = req.body;

    try {
        const product = new productModel({name, price});
        const fileName = await uploadFilesProducts(req.files);
        product.saveUrlImg(fileName);
        await product.save();
        res.status(201).json({ok: true, status: 201, product});
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message});
    }
};

const listProducts = async (req = request, res = response) => {
    try {
        const {
            limit = 10,
            page = 1
        } = req.query;
        const options = {
            limit,
            page
        };
        const {
            docs: products,
            ...data
        } = await productModel.paginate(options);
        res.status(200).json({ok: true, status: 200, products, data});
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message});
    }
};

const deleteProduct = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const product = await productModel.findById({_id: id});
        if (! product) {
            return res.status(404).json({ok: false, status: 404, message: "Product not found"});
        }
        if (product.imageName.length > 0) {
            for (let i = 0; i < product.imageName.length; i++) {
                deleteImg(product.imageName[i]);
            }
        }
        await product.deleteOne();
        res.status(200).json({ok: true, status: 200, message: "Product deleted"});
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message});
    }
};

const updateProduct = async (req = request, res = response) => {
    const {name, price, stock} = req.body;
    const {id} = req.params;

    try {
        const product = await productModel.findById({_id: id});

        product.name = name || product.name;
        product.price = price || product.price;
        product.stock = stock || product.stock;

        if (req.files) {
            fileName = await uploadFilesProducts(req.files);               

            for (let i = 0; i < product.imageName.length; i++) {                
                await deleteImg(product.imageName[i]);
            }

            product.imageName = []  
            product.img = [] 
            
            product.saveUrlImg(fileName);
        }

        await product.save();
        res.status(200).json({ok: true, status: 200, message: "Product updated", product});
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message});
    }
};

module.exports = {
    createProduct,
    listProducts,
    deleteProduct,
    updateProduct
};
