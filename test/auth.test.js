process.env.NODE_ENV = 'test';

const Driver = require('../models/driver');
const Session = require('../models/session');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const uuidv1 = require('uuid/v1');
const staticUuid = uuidv1();

chai.use(chaiHttp);

describe('test auth endpoints', function () {

  // clear db an seed collections
  before(function (done) {
    Session.deleteMany().then(() => {
      Driver.deleteMany().then(() => {
        const newDriver = new Driver({
          driverId: staticUuid,
          firstName: 'Frodo',
          lastName: 'Baggins'
        });
        newDriver.save().then(() => {
          done();
        });
      });
    });
  });

  // test the register route for success 
  describe('auth/register', function () {
    it('it should POST a new driver', function (done) {
      const driverDetails = {
        driverId: uuidv1(),
        firstName: 'Aragorn',
        lastName: 'Elessar'
      }
      chai.request(server)
        .post('/api/auth/register')
        .send(driverDetails)
        .end((err, res) => {
          chai.assert.equal(200, res.status);
          chai.assert.equal('{"msg":"Successfully Registered"}', res.text)
          done();
        });
    });
  });

  // test the register route for failure 
  describe('auth/register', function () {
    it('it should NOT POST a new driver', function (done) {
      const driverDetails = {
        driverId: staticUuid,
        firstName: 'Aragorn',
        lastName: 'Elessar',
      }
      chai.request(server)
        .post('/api/auth/register')
        .send(driverDetails)
        .end((err, res) => {
          chai.assert.equal(422, res.status);
          chai.assert.equal('{"msg":"Driver already exists"}', res.text)
          done();
        });
    });
  });

  // test the login route for success 
  describe('auth/login', function () {
    it('it should login a driver', function (done) {
      const loginDetails = {
        driverId: staticUuid,
      }
      chai.request(server)
        .post('/api/auth/login')
        .send(loginDetails)
        .end((err, res) => {
          chai.assert.equal(200, res.status);
          chai.assert.equal('{"msg":"Logged in successfully"}', res.text)
          done();
        });
    });
  });

  // test the login route for failure 
  describe('auth/login', function () {
    it('it should NOT login a driver', function (done) {
      const loginDetails = {
        driverId: uuidv1(),
      }
      chai.request(server)
        .post('/api/auth/login')
        .send(loginDetails)
        .end((err, res) => {
          chai.assert.equal(422, res.status);
          chai.assert.equal('{"msg":"Driver not found"}', res.text)
          done();
        });
    });
  });


  // test the logout route for success 
  describe('auth/logout', function () {
    it('it should logout a driver', function (done) {

      let agent = chai.request.agent(server);


      agent.post('/api/auth/login')
        .send({ driverId: staticUuid })
        .then(function (res) {
          agent.post('/api/auth/logout')
            .then(function (res2) {
              chai.assert.equal(200, res2.status);
              chai.assert.equal('{"msg":"Logged out successfully"}', res2.text)
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