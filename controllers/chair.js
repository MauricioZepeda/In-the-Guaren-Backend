const Product = require("../models/product");
const {errorHandler} = require("../helpers/dbErrorHandler");  
  
exports.getChair = (req, res, next) => {
    const { order: { chairs } } = req;
    const { chair: chairId } = req.body; 
    
    const chair = chairs.find(chair => chair._id == chairId)
    
    if(chair){
         req.chair = chair;
         next();
    }else{
       return res.status(404).json({ error: 'Chair not found' })
    }  
}

exports.getItem = (req, res, next) => { 
    const { item: itemId } = req.body;  
    const item = req.chair.items.find(item => item._id == itemId)
    
    if(item){
        req.item = item;
        next();
    }else{
       return res.status(404).json({ error: 'Item not found' })
    }  
}
 
exports.readChair = (req, res) => res.json(req.chair);

exports.listChairs = (req, res) => res.json(req.order.chairs);  

exports.removeChair = (req, res) => {
    const { order, chair } = req;  
    const isProcessed = chair.items.some(item => item.status !== 'Ingresed') 
    
    if(isProcessed){
        res.status(404).json({ error: `Can not delete, chair has items processed.` })
    }else{  
        order.chairs = order.chairs.filter(ch => ch._id !== chair._id); 
        order.save((err, data)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            } 
            return  res.json({message: 'Chair deleted successfully.' }); 
        }); 
    } 
};
  
exports.addItem = (req, res) => {  
    const { order, product, body: { number }, profile } = req; 

    const item = { 
        product: product._id,
        price: product.price,
        waiter: profile._id
    }

    let chair = order.chairs.find(chair =>  chair.number == number);
   
    if(!chair){
        const newChair = {
            number,
            items : [ item ]
        }
        order.chairs.push(newChair);
    }else{
        chair.items.push(item);
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

exports.removeItem = (req, res) => {
    const { order, chair, item } = req;
    const { item: itemId } = req.body;  
 
    if(item.status === 'Ingresed'){
        chair.items = chair.items.filter(item => item._id != itemId); 
        order.save((err, data)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            } 
            return  res.json({message: `Item deleted successfully.`}); 
        }); 
    }else{
        res.status(404).json({ error: `Can not delete, item has processed.` })
    } 
}
