process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();
var server = require('../app');

chai.use(chaiHttp);

var Product = require('../models/product');

describe('Products', function() {
    Product.collection.drop();

    beforeEach(function(done) {
        var newProduct = new Product({
            name: 'iPhoneTest'
        });

        newProduct.save(function(err) {
            done();
        });
    });

    afterEach(function(done) {
        Product.collection.drop();
        done();
    });

    it('Should create a SINGLE product in /products POST', function(done) {
        chai.request(server)
            .post('/api/products')
            .send({name: 'iPhone'})
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.have.property('name');
                res.body.SUCCESS.name.should.equal('iPhone');
                done();
            });
    });

    it('Should get ALL products in /products GET', function(done) {
        chai.request(server)
            .get('/api/products')
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('iPhoneTest');
                done();
            });
    });
    it('Should get a SINGLE product in /products/:id GET');
    it('Should update a SINGLE product in /product/:id PUT');
    it('Should delete a SINGLE product in /product/:id DELETE');
});
