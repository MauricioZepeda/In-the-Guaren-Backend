const Product = require("../models/product");
const {errorHandler} = require("../helpers/dbErrorHandler"); 
 
exports.chairById = (req, res, next, id) => { 
    category.findById(id)
        .populate("items")
        .exec((err, chair) => {
            if (err || !chair) {
                return res.status(404).json({
                    error: "Chair does not exist"
                });
            } 

            req.chair = chair;
            next();
    });
};

exports.read = (req, res) => {
    const { order, body : {number} } = req;   
    const chair = order.chairs.find(chair => chair.number == number);

    if(!chair){
        return res.status(404).json({ error: "Chair not found" });
    }

    return res.json(chair);
};

exports.remove = (req, res) => {
    const { order, body : {number} } = req; 
     
    const chair = order.chairs.find(chair => chair.number == number)
     
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
    const { order } = req; 
    return res.json(order.chairs); 
};

exports.addOrder = (req, res) => {  
    const { order, profile, product, body: {number} } = req; 
  
    const item = { 
        product: product._id,
        price: product.price,
        waiter: profile._id
    }

    let chair = order.chairs.find(chair => chair.number == number)

    if(!chair){
        chair = {
            number,
            items : [item]
        }
        order.chairs.push(chair)
    } 

    chair.items.push(item); 

    order.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        } 
        return res.json(data);
    });  
};