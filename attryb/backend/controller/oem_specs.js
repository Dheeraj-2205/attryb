const oemSpecs = require('../models/OEM_Specs');
const ApiFeature = require('../utils/apiFeature.js');
exports.createProduct = async(req,res) =>{
    try {

        const product = await oemSpecs.create(req.body)
        return res.status(201).json({
            success : true,
            product
        })

    } catch (error) {

        return res.status(500).json({
            success : false,
            error : error.message
        })

    }
}

exports.getAllProducts = async(req,res)=>{
    try {
        const OemCount = await oemSpecs.countDocuments();

        const apiFeature = new ApiFeature(oemSpecs.find() , req.query)
            .search();
        
        let products = await apiFeature.query;
        return res.status(200).json({
            success : true,
            products,
            OemCount
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

exports.adminGetAllProducts = async(req,res)=>{
    try {
        const products = await oemSpecs.find();
        const OemCount = await oemSpecs.countDocuments();

        return res.status(200).json({
            success : true,
            products,
            OemCount
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

exports.updateProducts = async(req,res)=>{
    try {

        let product = await oemSpecs.findById(req.params.id);
        
        if(!product){
            return res.status(400).json({
                success : false,
                message : "Product Not Found"
            })
        };
    
        product = await oemSpecs.findByIdAndUpdate( req.params.id ,req.body, {
            new : true,
            runValidators : true,
            useFindAndModify: false,
        });
    
        return res.status(200).json({
            success : true,
            product
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
};


exports.deleteProducts = async(req,res) =>{
    try {
        console.log("object")
        const product = await oemSpecs.findByIdAndDelete(req.params.id);
        console.log(product)
        if (!product) {
          return res.status(400).json({
            success : false,
            error : "Product Is Not Found"
          })
        }
      
        
        // for (let i = 0; i < product.images.length; i++) {
        //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        // }
      
      
        res.status(200).json({
          success: true,
          message: "Product Delete Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}