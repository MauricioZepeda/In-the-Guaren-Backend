const Bill = require("../models/bill"); 
const { errorHandler } = require("../helpers/dbErrorHandler");
 
exports.billById = (req, res, next, id) => {
    Bill
    .findById(id)
    .exec((err, bill) => { 
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        if (!bill) {
            return res.status(404).json({
                error: "Bill does not exist"
            });
        }
        
        req.bill = bill;
        next();
    });
};

exports.getBillDetailForChair = (req, res, next) => {
    const { chair } = req;
    
    const itemsOrdered = chair.items.filter(item => item.status === 'Ordered')
    
    let total = 0;
    const chairsDetail = itemsOrdered.map(item => {
        total += item.price;
        return {
            itemId: item._id,  
            chair: chair.number,
            productName: item.product.name,
            price: item.price,
            time: item.createdAt,
            waiter: item.waiter.name
        }
    });
 
    req.chairDetail = {
        type: 'Chair',
        number: chair.number,
        detail: chairsDetail,
        total
    }

    next();
};

exports.getBillDetailForTable = (req, res, next) => {
    const { order } = req;
     
    const itemsOrdered = order.chairs.filter(chair => chair.items.filter(item=> item.status === 'Ordered'))
    
    let total = 0;
    const detailItems = itemsOrdered.map(chair => { 
        const chairDetail = chair.items.map(item => {
            total += item.price;
            return {
                itemId: item._id,  
                chair: chair.number,
                productName: item.product.name,
                price: item.price,
                time: item.createdAt,
                waiter: item.waiter.name
            }
        });
        return chairDetail
    })

    req.tableDetail = {
        type: 'Table',
        number: order.table.number,
        detail: detailItems,
        total
    }

    next();
};
 
exports.deletePreviousUnpayedBillForTable = (req, res, next) => {
    Bill.findOneAndRemove({ type: 'Table', number: req.order.table.number, status: 'Unpaid' })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            } 
            next();  
        }); 
}

exports.deletePreviousUnpayedBillForChair = (req, res, next) => {
    Bill.findOneAndRemove({ type: 'Chair', number: req.chair.number, status: 'Unpaid' })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            } 
            next();  
        }); 
    
}

exports.read = (req, res) => {
    return res.json(req.bill);
};

exports.list = (req, res) => {
    Bill.find({ status: 'Unpaid' })
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
    Bill.find()
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};

exports.createForOneChair = (req, res) => {
    const { order, chairDetail, profile } = req;
    
    const bill = new Bill({
        type: chairDetail.type,
        number: chairDetail.number,
        order: order._id,
        detail: chairDetail.detail,
        total: chairDetail.total,
        cashier: profile._id
    });
 
    bill.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.createForTable = (req, res) => {
    const { order, tableDetail, profile } = req;

    const bill = new Bill({
        type: tableDetail.type,
        number: order.table.number,
        order: order._id,
        detail: tableDetail.detail,
        total: tableDetail.total,
        cashier: profile._id
    });
 
    bill.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
 
exports.getPayMethodsValues = (req, res) => {
    res.json(Bill.schema.path("payMethod").enumValues);
};
