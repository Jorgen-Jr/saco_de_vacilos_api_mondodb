
const mongoose = require('mongoose');
const connection = require('../models/connection')


strConnection = connection.strConnection;

//Conectar ao banco
mongoose.connect(strConnection ,{ useNewUrlParser: true,
                                    useUnifiedTopology: true,
                                    useCreateIndex: true })
mongoose.Promise = global.Promise;

module.exports = mongoose;