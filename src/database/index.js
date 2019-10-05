
const mongoose = require('mongoose');
const connection = require('../config/db_connection')


strConnection = connection.strConnection;

//Conectar ao banco
mongoose.connect(strConnection ,{ useNewUrlParser: true,
                                    useUnifiedTopology: true,
                                    useCreateIndex: true })
mongoose.Promise = global.Promise;

module.exports = mongoose;