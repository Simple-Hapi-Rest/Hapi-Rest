const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
process.env.MONGODB_URI = 'mongodb://localhost/hapi_test_db';
require('should');
var server = require(__dirname + '/../server');
const mongoose = require('mongoose');
const Hero = require(__dirname + '/../models/hero');

function inject(options) {
  return new Promise((resolve, reject) => {
    server.inject(options, resolve);
  });
}

describe('gets', () => {
  it('should have this route', () => {
    return inject({ method: 'GET', url: '/hero' }).then((response) => {
      response.statusCode.should.eql(200);
    });
  });
});

describe('posts', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should make post requests', () => {
    return inject({ method: 'POST', url: '/hero', payload: {
      name: 'Hulk',
      powerLevel: 10,
      archNemesis: 'radiation',
      superPower: 'Super-strength' }
      }).then((response) => {
        response.statusCode.should.eql(200);
        expect(response.result).to.have.deep.property('name', 'Hulk');
      });
  });
});

describe('methods that have current items in db - Delete/Put', () => {
  beforeEach((done) => {
    var testHero = new Hero({
      name: 'testhero',
      powerLevel: 0,
      superPower: ['testing'],
      archNemesis: 'bugs' });
    testHero.save((err, data) => {
      if (err) console.log(err);
      this.hero = data;
      done();
    });
  });

  afterEach((done) => {
    this.hero.remove((err) => {
      if (err) console.log(err);
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should make delete requests', () => {
    return inject({ method: 'DELETE', url: '/hero/' + this.hero._id }).then((response) => {
      response.statusCode.should.eql(200);
      expect(response.payload).to.eql('deleted');
    });
  });

  it('should make put requests', () => {
    return inject({ method: 'put', url: '/hero/' + this.hero._id, payload: {
      name: 'Hulk',
      powerLevel: 10,
      archNemesis: 'radiation',
      superPower: 'Super-strength' }
      }).then((response) => {
        response.statusCode.should.eql(200);
        expect(response.payload).to.eql('updated');
      });
  });
});
