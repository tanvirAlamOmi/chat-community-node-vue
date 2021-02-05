const monk  = require('monk');
const connectionString  = 'localhost/chat_community';
const db = monk(connectionString);

module.exports = db;