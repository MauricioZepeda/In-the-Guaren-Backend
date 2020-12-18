const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
require("dotenv").config();

const Product = require("../models/product");
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

        let product = new Product(fields);

        // 1kb = 1000
        // 1mb = 1000000
        if (files.photo) {
            if (files.photo.size > 1000000) {
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
    });
};

exports.list = (req, res) => {
    Product.find()
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
 
exports.read = (req, res) => {
    return res.json(req.product);
};

exports.update = (req, res) => { 
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        let product = req.product;
        product = _.extend(product, fields);
 
        if (files.photo) {
            if (files.photo.size > 1000000 * 2) { // 2mb = (1000000  * 2)
                return res.status(400).json({
                    error: "Image should be less than 2mb in size"
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
};

exports.remove = (req, res) => {
    const product = req.product;
    product.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Product deleted"
        });
    });
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};
