'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const db = require(__dirname + '/database');
const Hero = require(__dirname + '/models/hero');
const Jedi = require(__dirname + '/models/jedi');
const config = require(__dirname + '/config');

server.connection({ port: config.server.port });

server.route({
  method: 'GET',
  path: '/jedi',
  handler: (request, reply) => {
    Jedi.find(null, (err, Jedi) => {
      if (err) console.log('error getting heroes');

      reply(Jedi);
    });
  }
});

server.route({
  method: 'GET',
  path: '/hero',
  handler: (request, reply) => {
    Hero.find(null, (err, Hero) => {
      if (err) console.log('error getting heroes');

      reply(Hero);
    });
  }
});

server.route({
  method: 'GET',
  path: '/hero/{id}',
  handler: (request, reply) => {
    Hero.findOne({ _id: request.params.id }, (err, Hero) => {
      if (err) console.log('error getting single hero');

      reply(Hero);
    });
  }
});

server.route({
  method: 'POST',
  path: '/hero',
  handler: (request, reply) => {
    var newHero = new Hero(request.payload)
    newHero.save((err, data) => {
      if (err) console.log('error posting to heroes');

      reply(data);
    });
  }
});

server.route({
  method: 'DELETE',
  path: '/hero/{id}',
  handler: (request, reply) => {
    Hero.remove({ _id: request.params.id}, (err) => {
      if (err) console.log('error deleting from heroes');

      reply('deleted');
    });
  }
});

server.route({
  method: 'PUT',
  path: '/hero/{id}',
  handler: (request, reply) => {
    var heroData = request.payload;
    delete heroData._id;
    Hero.findByIdAndUpdate({ _id: request.params.id }, heroData, (err) => {
      if (err) console.log('error updating');

      reply('updated');
    });
  }
});

server.start((err) => {
  if (err) throw err;

  console.log('Server running at:', server.info.uri);
});

module.exports = server;
