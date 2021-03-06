'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
require(__dirname + '/database');
const Hero = require(__dirname + '/models/hero');
const config = require(__dirname + '/config');

server.connection({ port: config.server.port });

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
    var newHero = new Hero(request.payload);
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
    Hero.remove({ _id: request.params.id }, (err) => {
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
