const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const config = require('config')

mongoose.connect(config.get('DB_URL'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error',() => console.error.bind(console, 'connection error'));

db.once('open', () => console.info('Connection to Database is successful'));

module.exports = db;