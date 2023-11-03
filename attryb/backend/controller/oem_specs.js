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

exports.adminGetAllProducts = async(req,res)=>{
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
        const product = await oemSpecs.findById(req.params.id);
        console.log(product)

        if (!product) {
          return res.status(400).json({
            success : true,
            error : "Product Is Not Found"
          })
        }
      
        
        // for (let i = 0; i < product.images.length; i++) {
        //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        // }
      
        await product.deleteOne();
      
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