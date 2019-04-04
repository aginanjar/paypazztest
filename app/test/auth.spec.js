let { chai, chaiHttp, assert, server, jwt, should, config,dummytoken } = require('./baseconfig');
describe('API Routes', () => {
    // Test failed login
    describe('POST /api/v1/sigin-in', () => {
        it('Login should failed', (done) => {
            chai.request(server)
                .post('/api/v1/sign-in')
                .send({
                    username: 'admin',
                    password: 'ldajslda'
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Username or Password not match');

                    done();
                });
        });

        it('Login should success', (done) => {
            const payload = {
                admin: config.admin.username
            };
            const token = jwt.sign(payload, config.secret, {
                expiresIn: 86400 
            });

            chai.request(server)
                .post('/api/v1/sign-in')
                .send({
                    username: 'admin',
                    password: 'adminpassword'
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Congratz, you already signed-in.');
                    res.body.should.have.property('token');
                    res.body.token.should.equal(token);

                    done();
                });
        });
    });
});