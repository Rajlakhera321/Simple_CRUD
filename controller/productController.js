const { model } = require("mongoose");
const Product = require("../model/Product");

//Get All products
const product_all = async (req,res) =>{
    try {
        const products = await Product.find();
        res.json(products);
    }catch (error){
        res.json({message:error});
    }
};
//Single product
const product_details = async (req,res) =>{
    try {
        const product =await Product.findById(req.params.productId);
        res.json(product);
    } catch (error){
        res.json({message:error});
    }
};
//Add New product
const product_create = async (req,res) =>{
    const product = new Product({
        title: "new list",
        price: "14,000",
        details: "This is new product."
    });
    try{
        const savedProduct = await product.save();
        res.send(savedProduct);
    } catch(error){
        res.status(400).send(error);
    }
};
//Update product
const product_update = async (req,res) =>{
    try{
        const product = {
            title: "This is updated title"
        }
        const updatedproduct= await Product.findByIdAndUpdate(
            { _id: req.params.productId },
            product
        );
        res.json(updatedproduct);
    } catch (error){
        res.json({message:error});
    }
};
//Delete product
const product_delete = async (req,res) =>{
    try{
        const removeProduct = await Product.findByIdAndDelete(req.params.productId);
        res.json(removeProduct);
    } catch(error){
        res.json({message:error});
    }
};

module.exports = {
    product_all,
    product_create,
    product_delete,
    product_update,
    product_details
}