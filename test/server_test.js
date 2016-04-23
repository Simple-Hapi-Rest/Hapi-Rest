const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const Hero = require(__dirname + '/../models/hero');

var port = process.env.PORT = 1234;
process.env.MONGO.URI = 'mongodb://localhost/heroes_test_db'

require(__dirname + '/../server');
