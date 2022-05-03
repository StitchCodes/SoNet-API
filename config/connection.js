// Create connection to Moongoose
const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGOFB_URI || 'mongodb://localhost:27017/sonetDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;