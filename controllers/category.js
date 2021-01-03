const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");
 
exports.categoryById = (req, res, next, id) => {
    Category
    .findById(id)
    .exec((err, category) => { 
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        if (!category) {
            return res.status(404).json({
                error: "Category does not exist"
            });
        }
        
        req.category = category;
        next();
    });
};
 
exports.list = (req, res) => {
    Category.find({ enabled: true, deleted: false })
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
    Category.find()
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
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { data });
    });
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.update = (req, res) => {
    const { name, enabled, deleted } = req.body
    const category = req.category;
    category.name = name;
    if(enabled !== undefined) category.enabled = enabled;
    if(deleted !== undefined) category.deleted = deleted; 
    
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    }); 
};

exports.remove = (req, res) => {
    const category = req.category;
    category.deleted = true;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Category deleted"
        });
    });
}; 