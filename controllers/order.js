const Order = require("../models/order"); 
const {errorHandler} = require("../helpers/dbErrorHandler"); 

exports.orderById = (req, res, next, id) => { 
    Order
    .findById(id) 
    .exec((err, order) => { 
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: errorHandler(err, 'Order')
            });
        }

        if (!order) {
            return res.status(404).json({
                error: "Order does not exist"
            });
        } 

        req.order = order;
        next();
    });   
};
 
exports.read = (req, res) => {
    return res.json(req.order);
};

exports.remove = (req, res) => {
    const order = req.order; 
    
    order.remove((err, data) => {
        if (err) {
            return res
                .status(400)
                .json({error: errorHandler(err)});
        }
        res.json({message: `Order deleted successfully`});
    });
};
 
exports.getOrder = (req, res, next) => {   
    const order = {
        table:  req.table._id,
        closed: false  
    }

    Order.findOne(order).exec((err, data) => {
        if (err) {
            return res.status(404).json({
                error: "Order not found"
            });
        }

        if(!data){ 
            new Order(order).save((err, newOrder)=>{
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                } 
                req.order = newOrder; 
                next(); 
            }); 
        }else{
            req.order = data; 
            next();
        }  
    }); 
}