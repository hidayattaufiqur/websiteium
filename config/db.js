const { connect } = require('mongoose');
require('dotenv').config()

const database = {
    authenticate: () =>
      connect(process.env.MONGO_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
      }),
};

module.exports = { database };