const Order = require("../models/order"); 
const { errorHandler } = require("../helpers/dbErrorHandler"); 

exports.orderById = (req, res, next, id) => { 
    Order
    .findById(id)
    .populate('table')
    .populate('chairs.items.product')
    .populate('chairs.items.waiter')
    .exec((err, order) => { 
        if (err) { 
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
};

exports.getOrderByBill = (req, res, next) => {   
    Order.findById(req.bill.order._id).exec((err, data) => {
        if (err || !data) {
            return res.status(404).json({
                error: "Order not found"
            });
        }
 
        if(data.closed){
            return res.status(404).json({
                error: "This order was pay before"
            });
        }

        req.order = data;  
        next();  
    }); 
};

exports.confirmOrder = (req, res) => {
    const { order } = req; 
    
    order.chairs.forEach(chair => { 
        chair.items.forEach(item => { 
            if(item.status === 'Ingresed'){
               item.status='Ordered';
            }
        })
    });

    order.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }  
     
        res.json({message: `Order confirmed successfully`});
    }); 
};

exports.listOpen = (req, res) => {
    Order.find({ closed:false }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
 
exports.listClosed = (req, res) => {
    Order.find({ closed:true }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.listAll = (req, res) => {
    Order.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
 
 
exports.remove = (req, res) => {
    const { order, table } = req;  
    
    const isProcessed = order.chairs.some(chair => chair.items.some(item => item.status !== 'Ingresed'))
    
    if(isProcessed){
        res.status(404).json({ error: `Can not delete, order has items processed.` })
    }else{ 
        order.remove((err, data) => {
            if (err) {
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
 
            table.status = 'Open'; 
            table.save((error, data)=>{
                if(err){
                    return res.status(400).json({
                        error: errorHandler(error)
                    });
                }   
            }); 
 
            res.json({message: `Order deleted successfully`});
        });
    } 
};

