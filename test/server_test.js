const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const assert = require('chai').assert;
const Hapi = require('Hapi');
// const mongoose = require('mongoose');
// const Hero = require(__dirname + '/../models/hero');
// const Jedi = require(__dirname + '/../models/jedi');
// var server = require(__dirname + '/../server');
var port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongodb://localhost/hapi_test_db';
require(__dirname + '/../server');

// const hapiTest = require('hapi-test');
// var plugin = require(__dirname + 'plugin');
// var server;


// before((done) => {
//   server = new Hapi.Server();
//   server.connection({
//     port:8888
//   });
//
//   server.register({
//     name: 'plugin',
//     version: '0.0.1'
//     register: plugin.register
//   }, done);
// });
//
// it('can now be used', (done) => {
//   hapiTest({ server: server })
//       .get('/person')
//       .assert(200, done);
// });
//

//
// const reqOpts = {
//   method: 'GET',
//   url: '/hero'
// };
//
// describe('Server', () => {
//   it('gives me the work', () => {
//     Server.inject(reqOpts, (res) => {
//       expect(res.statusCode).to.equal(200);
//       expect(res.result).to.equal();
//     });
//   });
// });
//
//
//
//
describe('the GET requests to our servers', () => {
  it('should bring all the contents from the DB', (done) => {
    request('localhost:' + port)
    .get('/hero')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      console.log(res.body);
      expect(res.body.length).to.eql(0);
      done();
    });
  });
});
//
// describe('the POST to the database', () => {
//   it('should send some test info to the database', (done) => {
//     request('localhost:' + port)
//     .post('/hero')
//     .send({
//       name: 'testman',
//       powerLevel: 'over 9000',
//       superPower: 'break shit',
//       archNemesis: 'Javascript'
//     })
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       expect(res.body.name).to.eql('testman');
//       expect(res.body.powerLevel).to.eql('over 9000');
//       expect(res.body.superPower).to.eql('break shit');
//       expect(res.body.archNemesis).to.eql('Javascript');
//       done();
//     });
//   });
// });
