const Table = require("../models/table");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.tableById = (req, res, next, id) => {
    Table
    .findById(id)
    .exec((err, table) => { 
        if (err) {
            return res.status(400).json({
                error: errorHandler(err, 'Table')
            });
        }

        if (!table) {
            return res.status(404).json({
                error: "Table does not exist"
            });
        } 
        req.table = table;
        next();
    });
};
 
exports.getTable = (req, res, next) => {
    const { order: {table} } = req;
      
    Table
    .findById(table)
    .exec((err, data) => { 
        if (err) {
            return res.status(400).json({
                error: errorHandler(err, 'Table')
            });
        }

        if (!data) {
            return res.status(404).json({
                error: "Table does not exist"
            });
        } 
        req.table = data;
        next();
    });
}

exports.list = (req, res) => {
    const { area } = req.body

    Table.find({ area, enabled: true, deleted: false }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.listAll = (req, res) => {
    Table.find()
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};
 
exports.create = (req, res) => {
    const table = new Table(req.body);
    table.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { data });
    });
};

exports.read = (req, res) => {
    return res.json(req.table);
}; 

exports.updateWaiter = (req, res) => {
    const { table, body } = req;   
    const updateTable = _.omit(body, 'deleted', 'enabled'); 

    Table.findOneAndUpdate(
        { _id: table._id },
        { $set: updateTable }, 
        { new: true }, 
        (err, table) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            } 

            if (!table) {
                return res.status(404).json({
                    error: "Table not found"
                });
            };

            res.json(table);
        }); 
};
 
exports.updateAdmin = (req, res) => {  
    Table.findOneAndUpdate(
        { _id: req.table._id },
        { $set: req.body }, 
        { new: true }, 
        (err, table) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            } 

            if (!table) {
                return res.status(404).json({
                    error: "Table not found"
                });
            };

            res.json(table);
        }); 
};

exports.getAreasValues = (req, res) => {
    res.json(Table.schema.path("area").enumValues);
};

exports.openTable = (req, res) => {
    const { table } = req;

    if(table.status !== 'Closed'){
        return res.status(404).json({
            error: "A table can only be opened when it closed"
        });
    }

    table.status = "Open";
    table.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { message: "Table opened successfully" });
    });
};