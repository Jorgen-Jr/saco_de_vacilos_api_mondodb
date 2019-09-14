const express = require('express');
const bodyParser = require('body-parser');

//Iniciando o app
const app = express();

//Permitir que a aplicação receba informações em formato json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Instalar middleware do Body Parser

//Referenciar as controllers
require('./controllers/UserController')(app);
require('./controllers/PostController')(app);
require('./controllers/RelationshipController')(app);
require('./indexroute')(app);


//Porta que será usada pela API.
app.listen(process.end.PORT);