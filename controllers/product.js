const Product = require('../models/product');

exports.getProduct = async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json({success:true ,products:products});
    } catch (err) {
        res.status(500).json({success:false ,message:"something went wrong!"});
    }

}

exports.postProduct = async(req,res)=>{
    try {
        const {name , price} = req.body;
        const product =  new Product({name:name , price:price});
        await product.save();
        res.status(201).json({success:true , product:product})
        
    } catch (err) {
        res.status(500).json({success:false ,message:"something went wrong!"});
    }
}