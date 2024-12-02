const Product = require('../models/products.model');

const getAll = async (req, res, next) => {
    try {
        const products = await Product.find().populate('creator', '-_id username email');
        res.json(products);
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

const getByPrice = async (req, res, next) => {
    const { min, max } = req.params;

    try {
        // select * from products where price >= min AND price <= max
        const products = await Product.find({
            price: {
                $gte: min, // $gt, $gte
                $lte: max
            }
        });
        res.json(products)
    } catch (error) {
        next(error);
    }
}

const getActives = async (req, res, next) => {
    try {
        const products = await Product.find({
            available: true,
            stock: { $gte: 10 }
        });
        res.json(products);
    } catch (error) {
        next();
    }
}

const create = async (req, res, next) => {
    req.body.creator = req.user._id;

    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const prod = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(prod);
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const prod = await Product.findByIdAndDelete(productId);
        res.json(prod);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll, create, update, remove, getById, getByPrice, getActives
}