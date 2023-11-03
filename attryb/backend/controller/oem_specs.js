const oemSpecs = require('../models/OEM_Specs');

exports.createProduct = async(req,res) =>{
    try {

        const product = await oemSpecs.create(req.body)

        return res.status(201).json({
            success : true,
            product
        })

    } catch (error) {

        return res.status(500).json({
            success : true,
            error : error.message
        })

    }
}

exports.getAllProducts = async(req,res)=>{
    try {
        const products = await oemSpecs.find();

        return res.status(200).json({
            success : true,
            products
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}