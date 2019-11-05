process.env.NODE_ENV = 'test';

const Driver = require('../models/driver');
const Session = require('../models/session');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const uuidv1 = require('uuid/v1');
const staticUuid = uuidv1();

chai.use(chaiHttp);

describe('test driver endpoints', function () {

    // clear db an seed collections
    before(function (done) {
        Session.deleteMany().then(() => {
            Driver.deleteMany().then(() => {
                const newDriver = new Driver({
                    driverId: staticUuid,
                    firstName: 'Frodo',
                    lastName: 'Baggins'
                });
                const newSession = new Session({
                    locations: [
                        {
                            id: '5dbfb0f1c242c8060301b6f5',
                            location: {
                                type: 'Point',
                                coordinates: [
                                    170,
                                    70
                                ]
                            },
                            timestamp: '2019-11-04T05:02:41.696Z'
                        },
                        {
                            id: '5dbfb124c242c8060301b6f6',
                            location: {
                                type: 'Point',
                                coordinates: [
                                    160,
                                    60
                                ]
                            },
                            timestamp: '2019-11-04T05:03:32.093Z'
                        },
                    ],
                    driverId: staticUuid,
                    isActive: false,
                });
                newDriver.save().then(() => {
                    newSession.save().then(() => {
                        done();
                    });
                });
            });
        });
    });

    // test the GET driver by id route for success 
    describe('/drivers/:id', function () {
        it('it should GET a specific driver', function (done) {
            chai.request(server)
                .get('/api/drivers/' + staticUuid)
                .end((err, res) => {
                    chai.assert.equal(200, res.status);
                    chai.assert.equal('Frodo', res.body.firstName);
                    done();
                });
        });
    });

    // test the GET driver by id route for failure 
    describe('/drivers/:id', function () {
        it('it should NOT GET a specific driver', function (done) {
            chai.request(server)
                .get('/api/drivers/wronguuidformat')
                .end((err, res) => {
                    chai.assert.equal(400, res.status);
                    done();
                });
        });
    });

    // test the GET driver sessions by id route for success 
    describe('/drivers/:id/sessions', function () {
        it('it should GET inactive sessions for a specific driver', function (done) {
            chai.request(server)
                .get('/api/drivers/' + staticUuid + '/sessions')
                .end((err, res) => {
                    chai.assert.equal(200, res.status);
                    chai.assert.equal(false, res.body[0].isActive);
                    done();
                });
        });
    });

    // test the GET driver sessions by id route for failure 
    describe('/drivers/:id/sessions', function () {
        it('it should NOT GET inactive sessions for a specific driver', function (done) {
            chai.request(server)
                .get('/api/drivers/wronguuidformat/sessions')
                .end((err, res) => {
                    chai.assert.equal(400, res.status);
                    done();
                });
        });
    });

    // test the GET drivers route for success 
    describe('/drivers', function () {
        it('it should GET a list of drivers', function (done) {
            chai.request(server)
                .get('/api/drivers')
                .end((err, res) => {
                    chai.assert.equal(200, res.status);
                    chai.assert.equal('Frodo', res.body[0].firstName);
                    done();
                });
        });
    });

    // clear db
    after(function (done) {
        Session.deleteMany().then(() => {
            Driver.deleteMany().then(() => {
                done();
            });
        });
    });
});