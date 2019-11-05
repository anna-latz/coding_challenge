process.env.NODE_ENV = 'test';

const Driver = require('../models/driver');
const Session = require('../models/session');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const uuidv1 = require('uuid/v1');
const staticUuid = uuidv1();

chai.use(chaiHttp);

describe('test session endpoints', function () {

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
                    isActive: true,
                });
                newDriver.save().then(() => {
                    newSession.save().then(() => {
                        done();
                    });
                });
            });
        });
    });

    // test the GET locations for active sessions route for success 
    describe('/sessions/locations', function () {
        it('it should GET locations for an active session', function (done) {
            let agent = chai.request.agent(server);

            agent.post('/api/auth/login')
                .send({ driverId: staticUuid })
                .then(function (res) {
                    agent.get('/api/session/locations')
                        .then(function (res2) {
                            chai.assert.equal(200, res2.status);
                            chai.assert.equal(2, res2.body.length);
                            done();
                        });
                });

        });
    });

    // test the GET locations for active sessions route for failure 
    describe('/sessions/locations', function () {
        it('it should GET locations for an active session', function (done) {
            let agent = chai.request.agent(server);

            agent.get('/api/session/locations')
            .then(function (res2) {
                chai.assert.equal(401, res2.status);
                done();
            });

        });
    });

      // test the POST location to an active sessions route for success 
      describe('/sessions/locations', function () {
        it('it should POST a location to an active session', function (done) {
            let agent = chai.request.agent(server);

            location = {
                'longitude': 180,
                'latitude': 60
                }

            agent.post('/api/auth/login')
                .send({ driverId: staticUuid })
                .then(function (res) {
                    agent.post('/api/session/locations')
                    .send(location)
                        .then(function (res2) {
                            chai.assert.equal(200, res2.status);
                            chai.assert.equal('{"msg":"Location submitted successfully"}', res2.text)
                            done();
                        });
                });

        });
    });

          // test the POST location to an active sessions route for failure 
          describe('/sessions/locations', function () {
            it('it should POST a location to an active session', function (done) {
                let agent = chai.request.agent(server);
    
                location = {
                    'longitude': 190,
                    'latitude': 60
                    }
    
                agent.post('/api/auth/login')
                    .send({ driverId: staticUuid })
                    .then(function (res) {
                        agent.post('/api/session/locations')
                        .send(location)
                            .then(function (res2) {
                                chai.assert.equal(400, res2.status);
                                done();
                            });
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