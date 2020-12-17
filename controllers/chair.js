const Product = require("../models/product");
const {errorHandler} = require("../helpers/dbErrorHandler");  
  
exports.read = (req, res) => {
    const { order, body : {number} } = req;  
    
    const chair = order.chairs.find(chair => chair.number == number)

    if(!chair){
        return res.status(404).json({ error: "Chair not found" })
    }

    return res.json(chair);
};

exports.remove = (req, res) => {
    const { order, body: { number } } = req;
    const chair = order.chairs.find(chair => chair.number == number)
  
    if(chair){
        const isProcessed = chair.items.some(item => item.status !== 'Ingresed') 
       
        if(isProcessed){
            res.status(404).json({ error: `Can not delete, chair has items processed.` })
        }else{  
            order.chairs = order.chairs.filter(chair => chair.number != number); 
            order.save((err, data)=>{
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                } 
                return  res.json({message: `Chair ${number} deleted successfully.`}); 
            }); 
        } 
    }else{
        res.status(404).json({ error: 'Chair not found' })
    } 
};

exports.list = (req, res) => {
    const { order } = req; 
    return res.json(order.chairs); 
};

exports.addItem = (req, res) => {  
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

exports.removeItem = (req, res) => {
    const { order } = req;
    const { chair: chairId, item: itemID } = req.body;
    const chairFound = order.chairs.find(chair => chair._id === chairId)

    if(chairFound){
        const itemFound = chair.items.find(item => item._id === itemID)
        if(itemFound){
            if(itemFound.status === 'Ingresed'){
                order.chairs = order.chairs.filter(chair => chair.number != number); 
                order.save((err, data)=>{
                    if(err){
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    } 
                    return  res.json({message: `Chair ${number} deleted successfully.`}); 
                }); 
            }else{
                res.status(404).json({ error: `Can not delete, item has processed.` })
            }
        }else{
            res.status(404).json({ error: 'Item not found' })
        }
    }else{
        res.status(404).json({ error: 'Chair not found' })
    } 
}
