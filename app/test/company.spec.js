const { chai,chaiHttp,assert,server,knex,should , dummytoken} = require('./baseconfig');
const event = require('events');

event.EventEmitter.prototype._maxListeners = 100;

describe('API Routes', () => {
    beforeEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                knex.migrate.latest()
                    .then(function () {
                        return knex.seed.run()
                            .then(function () {
                                done();
                            });
                    });
            }).catch((error) => { done(error) });
    });

    afterEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                done();
            }).catch(error => done(error));
    });

    describe('GET /api/v1/company/shows', () => {
        it('Should return http code : 403 (no token)', (done) => {
            chai.request(server)
                .get('/api/v1/company/shows')
                .end(function (err, res) {
                    res.should.have.status(403);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.success.should.equal(false);
                    done();
                });
        });
    });

    describe('GET /api/v1/company/shows', () => {
        it('Should return http code : 500 (wrong token)', (done) => {
            chai.request(server)
                .get('/api/v1/company/shows')
                .set('x-access-token', '123')
                .end(function (err, res) {
                    res.should.have.status(500);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.success.should.equal(false);
                    done();
                });
        });
    });

    describe('GET /api/v1/company/shows', () => {
        it('Should return all companies', (done) => {
            chai.request(server)
                .get('/api/v1/company/shows')
                .set('x-access-token', dummytoken)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');

                    res.body.data[0].should.have.property('name');
                    res.body.data[0].name.should.equal('PT. Maju Makmur');
                    res.body.data[0].should.have.property('tdp');
                    res.body.data[0].tdp.should.equal('0001-1111-1111-1111');
                    res.body.data[0].should.have.property('phone');
                    res.body.data[0].phone.should.equal('+628777');
                    res.body.data[0].should.have.property('address');
                    res.body.data[0].address.should.equal('Jalan. Senang Raya No. 13 Bandung');
                    
                    assert(res.body.success, true);
                    assert(res.body.data.length, 3);
                    done();
                });
        });
    });

    describe('POST /api/v1/company/create', () => {
        it('Should validate the input when name empty', (done) => {
            chai.request(server)
                .post('/api/v1/company/create')
                .set('x-access-token', dummytoken)
                .send({
                    name: '',
                    tdp: 'alksjdklasd3',
                    phone: '+62888888888',
                    address: 'Jalan. Sebrang Jauh. No. 555'
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('name company should be filled or cannot be empty');

                    done();
                });
        });
        it('Should validate the input when tdp empty', (done) => {
            chai.request(server)
                .post('/api/v1/company/create')
                .set('x-access-token', dummytoken)
                .send({
                    name: 'PT. Itu itu aja',
                    tdp: '',
                    phone: '+62888888888',
                    address: 'Jalan. Sebrang Jauh. No. 555'
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('tdp company should be filled or cannot be empty');

                    done();
                });
        });
        it('Should validate the input when name and tdp empty', (done) => {
            chai.request(server)
                .post('/api/v1/company/create')
                .set('x-access-token', dummytoken)
                .send({
                    name: '',
                    tdp: '',
                    phone: '+62888888888',
                    address: 'Jalan. Sebrang Jauh. No. 555'
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('name company and tdp company should be filled or cannot be empty');

                    done();
                });
        });
        it('Should return unique name', (done) => {
            chai.request(server)
                .post('/api/v1/company/create')
                .set('x-access-token', dummytoken)
                .send({
                    name: "PT. Maju Makmur",
                    tdp: "0001-1111-1111-1111",
                    phone: "+628777",
                    address: "Jalan. Senang Raya No. 13 Bandung"
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(500);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Company name should be unique');

                    done();
                });
        });


        it('Should successfully create company', (done) => {
            chai.request(server)
                .post('/api/v1/company/create')
                .set('x-access-token', dummytoken)
                .send({
                    name: 'PT. Perusahaan Test',
                    tdp: '0001-1111-1111-111y',
                    phone: '+62888888888',
                    address: 'Jalan. Sebrang Jauh. No. 555'
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Company successfully created!');

                    done();
                });
        });
    });

    describe('PATCH /api/v1/company/update', () => {
        it('Should return success when update', (done) => {
            chai.request(server)
                .patch('/api/v1/company/update')
                .set('x-access-token', dummytoken)
                .send({
                    id: 1,
                    name: "PT. Maju Makmur 1",
                    tdp: "0001-1111-1111-111y",
                    phone: "+628777",
                    address: "Jalan. Senang Raya No. 13 Jakarta"
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Company successfully updated!');
                    res.body.should.have.property('data');
                    res.body.data.should.equal(1);

                    chai.request(server)
                        .get('/api/v1/company/get/1')
                        .set('x-access-token', dummytoken)
                        .set('Content-Type', 'application/json')
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.should.be.json;
                            res.body.should.be.a('object');
                            res.body.should.have.property('success');
                            res.body.success.should.equal(true);
                            res.body.should.have.property('message');
                            res.body.message.should.equal('Data found.');
                            res.body.should.have.property('data');
                            res.body.data[0].name.should.equal('PT. Maju Makmur 1');

                            done();
                        });
                });
        });
    });

    describe('GET /api/v1/company/get/:id', () => {
        it('Should return company by ID', (done) => {
            chai.request(server)
                .get('/api/v1/company/get/1')
                .set('x-access-token', dummytoken)
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Data found.');
                    res.body.should.have.property('data');
                    res.body.data.length.should.equal(1);

                    done();
                });
        });
    });

    describe('DELETE /api/v1/company/delete/:id', () => {
        it('Should delete company by ID', (done) => {
            chai.request(server)
                .delete('/api/v1/company/delete/1')
                .set('x-access-token', dummytoken)
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Data successfully deleted.');

                    chai.request(server)
                        .get('/api/v1/company/shows')
                        .set('x-access-token', dummytoken)
                        .set('Content-Type', 'application/json')
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.should.be.json;
                            res.body.should.be.a('object');
                            res.body.should.have.property('success');
                            res.body.success.should.equal(true);
                            res.body.should.have.property('data');
                            res.body.data.length.should.equal(2);
                        });

                    done();
                });
        });
    });

});
