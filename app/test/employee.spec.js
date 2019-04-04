const { chai,chaiHttp,assert,server,knex,should , dummytoken} = require('./baseconfig');
const event = require('events');

event.EventEmitter.prototype._maxListeners = 100;

let existing_user = [{
    full_name: "Ahmad Ginanjar",
    nik: "3211-1111-1111-1111",
    nationality: "Indonesian",
    phone: "+628777",
    address: "Jalan. Senang Raya No. 13 Bandung"
},
{
    full_name: "Dan Abramov",
    nik: "3221-1111-1111-1111",
    nationality: "Non-Indonesian",
    phone: "+18777",
    address: "Silicon Valley Street"
},
{
    full_name: "Ryan Dahl",
    nik: "3231-1111-1111-1111",
    nationality: "Non-Indonesian",
    phone: "+18787",
    address: "Nevada"
}];

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

    describe('GET /api/v1/employee/shows', () => {
        it('Should return http code : 403 (no token)', (done) => {
            chai.request(server)
                .get('/api/v1/employee/shows')
                .end(function (err, res) {
                    res.should.have.status(403);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.success.should.equal(false);
                    done();
                });
        });
    });

    describe('GET /api/v1/employee/shows', () => {
        it('Should return http code : 500 (wrong token)', (done) => {
            chai.request(server)
                .get('/api/v1/employee/shows')
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

    describe('GET /api/v1/employee/shows', () => {
        it('Should return all companies', (done) => {
            chai.request(server)
                .get('/api/v1/employee/shows')
                .set('x-access-token', dummytoken)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');

                    existing_user.forEach((value, index) => {
                        res.body.data[index].should.have.property('full_name');
                        res.body.data[index].full_name.should.equal(value.full_name);
                        res.body.data[index].should.have.property('nik');
                        res.body.data[index].nik.should.equal(value.nik);
                        res.body.data[index].should.have.property('phone');
                        res.body.data[index].phone.should.equal(value.phone);
                        res.body.data[index].should.have.property('address');
                        res.body.data[index].address.should.equal(value.address);
                        res.body.data[index].should.have.property('nationality');
                        res.body.data[index].nationality.should.equal(value.nationality);
                    });

                    assert(res.body.success, true);
                    assert(res.body.data.length, 3);
                    done();
                });
        });
    });

    describe('POST /api/v1/employee/create', () => {
        it('Should validate the input when name empty', (done) => {
            chai.request(server)
                .post('/api/v1/employee/create')
                .set('x-access-token', dummytoken)
                .send({
                    full_name: "",
                    nik: "3211-1111-1111-1111",
                    nationality: "Indonesian",
                    phone: "+628777",
                    address: "Jalan. Senang Raya No. 13 Bandung"
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('full_name employee should be filled or cannot be empty');

                    done();
                });
        });
        it('Should validate the input when nik empty', (done) => {
            chai.request(server)
                .post('/api/v1/employee/create')
                .set('x-access-token', dummytoken)
                .send({
                    full_name: "Ahmad Ginanjar",
                    nik: "",
                    nationality: "Indonesian",
                    phone: "+628777",
                    address: "Jalan. Senang Raya No. 13 Bandung"
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('nik employee should be filled or cannot be empty');

                    done();
                });
        });
        it('Should validate the input when name and tdp empty', (done) => {
            chai.request(server)
                .post('/api/v1/employee/create')
                .set('x-access-token', dummytoken)
                .send({
                    full_name: "",
                    nik: "",
                    nationality: "Indonesian",
                    phone: "+628777",
                    address: "Jalan. Senang Raya No. 13 Bandung"
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('full_name employee and nik employee should be filled or cannot be empty');

                    done();
                });
        });

        it('Should successfully create employee', (done) => {
            chai.request(server)
                .post('/api/v1/employee/create')
                .set('x-access-token', dummytoken)
                .send({
                    full_name: "Ayyubi Ghozi",
                    nik: "3211-1111-1111-1122",
                    nationality: "Indonesian",
                    phone: "+628777",
                    address: "Jalan. Senang Raya No. 13 Bandung"
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Employee successfully created!');

                    done();
                });
        });
    });

    describe('PATCH /api/v1/employee/update', () => {
        it('Should return success when update', (done) => {
            chai.request(server)
                .patch('/api/v1/employee/update')
                .set('x-access-token', dummytoken)
                .send({
                    id: 1,
                    full_name: "Ahmad Ginanjar",
                    nik: "3211-1111-1111-1111",
                    nationality: "Indonesian",
                    phone: "+628777",
                    address: "Jalan. Senang Raya No. 1-2 Bandung"
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Employee successfully updated!');
                    res.body.should.have.property('data');
                    res.body.data.should.equal(1);

                    chai.request(server)
                        .get('/api/v1/employee/get/1')
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
                            res.body.data[0].address.should.equal('Jalan. Senang Raya No. 1-2 Bandung');

                            done();
                        });
                });
        });
    });

    describe('GET /api/v1/employee/get/:id', () => {
        it('Should return employee by ID', (done) => {
            chai.request(server)
                .get('/api/v1/employee/get/1')
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

    describe('DELETE /api/v1/employee/delete/:id', () => {
        it('Should delete employee by ID', (done) => {
            chai.request(server)
                .delete('/api/v1/employee/delete/1')
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
                        .get('/api/v1/employee/shows')
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
