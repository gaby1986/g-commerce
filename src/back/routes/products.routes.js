const express = require('express');
//con router defino rutas de mis servidores
const router = express.Router();
const Product = require('../models/products')

router.get('/', async (req,res) =>{
    const products = await Product.find()
    res.json(products)
})
router.get('/:id', async (req,res)=>{
   const product = await Product.findById(req.params.id)
    res.json(product)
})
router.post('/', async (req,res) =>{
    const {title, description,price} = req.body;
    const product = new Product({title,description,price})
    await product.save()
    res.json({status: 'Product saved'})
})
router.put('/:id', async (req,res)=>{
    const {title,description,price} = req.body
    const newProduct = {title, description,price}
    await Product.findByIdAndUpdate(req.params.id, newProduct)
    console.log(req.params.id)
    res.json({status: 'Product update'})
})
router.delete('/:id', async (req,res)=>{
    await Product.findByIdAndRemove(req.params.id)
    res.json({status: "Product delete"})
})

module.exports = router;