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
    const { order, body, profile } = req; 

    Product
        .findById(body.product)
        .exec((err, data) => {
            if(err || !data){
                return res
                    .status(400)
                    .json({error: "Product not found"});
            }
 
            const item = { 
                product: data._id,
                price: data.price,
                waiter: profile._id
            }
 
            let chair = order.chairs.filter(chair => {
                console.log( chair.number == body.number)
                return chair.number == body.number
            })

            console.log(order.chairs);
            if(chair.length === 0){
                const chair = {
                    number : body.number,
                    items : [ item ]
                }
                order.chairs.push(chair)
            }else{
                chair[0].items.push(item)
            }

            order.save((err, data)=>{
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                } 
                return res.json(data);
            }); 
 
        }
    );
}

