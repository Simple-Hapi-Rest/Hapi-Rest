const mongoose = require('mongoose');

const config = require(__dirname + '/config');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://' + config.database.host + '/' + config.database.db);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connection with database successful');
});

exports.db = db;
