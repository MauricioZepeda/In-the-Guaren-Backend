const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
require("dotenv").config();

const Product = require("../models/product");
const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");
 
exports.productById = (req, res, next, id) => { 
    Product.findById(id) 
        .select("-photo")
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
    
            if (!product) {
                return res.status(404).json({
                    error: "Product not found"
                });
            }
 
            req.product = product;
            next();
        });
};

exports.getProduct = (req, res, next) => {  
    Product.findById(req.body.product)
        .select("-photo")    
        .exec((err,product)=>{
            if (err || !product) {  
                return res.status(404).json({
                    error: "Product not found"
                })
            }
 
            req.product = product;
            next();
        })
}
  
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const {
            name,
            description,
            price,
            category
        } = fields;

        if (
            !name ||
            !description ||
            !price ||
            !category  
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

         Category.findById(category)
            .exec((err, data)=>{
                if(err || !data){
                    return res.status(404).json({
                        error: 'Category not found'
                    })
                }

                let product = new Product(fields);

                // 1kb = 1000
                // 1mb = 1000000
                if (files.photo) {
                    const size = Number(process.env.MAX_IMG_SIZE_MB) || 1;
                    if (files.photo.size > size * 1000000) { // example: 1mb = (1 * 1000000) 
                        return res.status(400).json({
                            error: "Image should be less than 1mb in size"
                        });
                    }
                    product.photo.data = fs.readFileSync(files.photo.path);
                    product.photo.contentType = files.photo.type;
                }

                product.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    res.json(result);
                }); 
            }) 
    });
};

exports.list = (req, res) => {  
    Product.find({ 
        category: req.category._id, 
        enabled: true, 
        deleted: false 
    })
    .select("-photo")
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
 
exports.listAll = (req, res) => {
    Product.find({ category: req.category._id })
            .select("-photo")
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json(data);
            });
};

exports.read = (req, res) =>  res.json(req.product);
 
exports.update = (req, res) => { 
    const { product } = req; 
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        const category = fields.category ? fields.category : product.category; 
        Category.findById(category)
            .exec((err, data)=>{
                if(err || !data){
                    return res.status(404).json({
                        error: 'Category not found'
                    })
                }  
                    let product = req.product;
                    product = _.extend(product, fields);
            
                    if (files.photo) {
                        const size = Number(process.env.MAX_IMG_SIZE_MB) || 1;
                        if (files.photo.size > size * 100000) { // example: 1mb = (1 * 1000000) 
                            return res.status(400).json({
                                error: `Image should be less than ${size}mb in size` 
                            });
                        }
                        product.photo.data = fs.readFileSync(files.photo.path);
                        product.photo.contentType = files.photo.type;
                    } 
                
                    product.save((err, data) => {
                        if (err) {
                            return res.status(400).json({
                                error: errorHandler(err)
                            });
                        }
                        res.json(data);
                    }); 
                });  
        }) 
};

exports.remove = (req, res) => {
    const product = req.product;

    if(product.deleted){
        res.json({
            message: "Product is already deleted"
        });
    }else{
        product.deleted = true;
    
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json({
                message: "Product deleted"
            });
        });   
    } 
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}; 