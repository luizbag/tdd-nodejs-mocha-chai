var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.post('/products', function(req, res, next) {
    var newProduct = new Product({
        name: req.body.name
    });
    newProduct.save(function(err, product){
        if (err){
            res.json({'ERROR': err});
        }
        else{
            res.json({'SUCCESS': product});
        }
    });
});

router.get('/products', function(req, res, next) {
    Product.find(function(err, products) {
        if(err) {
            res.json({'ERROR': err});
        } else {
            res.json({'SUCCESS': products});
        }
    });
});

module.exports = router;
