const express = require('express');

const router = express();
const apiController = require('../controllers/apiController');
const productsController = require('../controllers/productsController');

// test route
router.get('/', apiController.landingPage);

// user routes
router.get('/user/:id', apiController.getUser);
router.post('/user/:id', apiController.editUser);
router.get('/users', apiController.getAllUser);

// product routes
router.get('/product/:id', productsController.getProduct);
router.post('/product/:id', productsController.editProduct);
router.post('/product', productsController.addProduct);
router.delete('/product/:id', productsController.deleteProduct);

router.get('/products', productsController.getAllProduct);

module.exports = router;
