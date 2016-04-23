'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const db = require(__dirname + '/database')
const Hero = require(__dirname + '/models/hero');
const Jedi = require(__dirname + '/models/jedi');
const config = require(__dirname + '/config');

server.connection({ port: config.server.port });

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('hello world!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: (request, reply) => {
    reply('hello ' + encodeURIComponent(request.params.name) + '!');
  }
});

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

server.start((err) => {
  if (err) throw err;

  console.log('Server running at:', server.info.uri);
});
