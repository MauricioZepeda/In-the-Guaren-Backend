const Chair = require("../models/chair"); 
const Item = require("../models/item"); 
const Product = require("../models/product"); 
const {errorHandler} = require("../helpers/dbErrorHandler"); 

exports.chairById = (req, res, next, id) => {
    Chair
    .findById(id)
    .populate("orders")
    .exec((err, chair) => { 
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        if (!chair) {
            return res.status(404).json({
                error: "Chair does not exist"
            });
        } 

        req.chair = chair;
        next();
    });
};
 
exports.read = (req, res) => {
    return res.json(req.chair);
};

exports.remove = (req, res) => {
    let chair = req.chair;
    chair.remove((err, data) => {
        if (err) {
            return res
                .status(400)
                .json({error: errorHandler(err)});
        }
        res.json({message: `Chair ${data.number} deleted successfully`});
    });
};

exports.list = (req, res) => {
    Chair
    .find()
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
  
exports.addOrder = (req, res) => {  
    const { profile, chair, body } = req; 
  
    Product
        .findById(body.product)
        .exec((err, data) => {
            if(err || !data){
                return res
                    .status(400)
                    .json({error: "Product not found"});
            }  

            const item = new Item({
                chair: chair._id,
                product: data._id,
                price: data.price,
                waiter: profile._id
            })
 
            item.save((err, data)=>{
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                } 
                res.json({
                    message: `Product ingresed`
                });
            })
        }) 
};


exports.getChair = (req, res, next) => {
    const { order, body } = req; 
 
    const chair = {
        order:  order._id,
        number: body.number 
    }
  
    Chair.findOne(chair).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        if(data){
            req.chair = data; 
            next();
        }else{
            new Chair(chair).save((err, newChair)=>{
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                } 
                req.chair = newChair; 
                next(); 
            }); 
        }  
    }); 
}