const { User, Product } = require('../models');

module.exports = {
    getProduct: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: 'Product not found!' });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    },

    editProduct: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (product) {
                await product.update({
                    name: req.body.name,
                    price: req.body.price,
                    stock: req.body.stock,
                    description: req.body.description,
                    image: req.body.image,
                });
                res.json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    },

    getAllProduct: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.json(products);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    },

    addProduct: async (req, res) => {
        try {
            const product = await Product.create({
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                description: req.body.description,
                image: req.body.image,
            });
            res.json(product);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (product) {
                await product.destroy();
                res.json({ message: 'Product deleted' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    }
};
