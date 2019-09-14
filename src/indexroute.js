const express = require('express');
const router = express.Router();

//Rota padrão da api
router.get('/' , (req, res) => {
    res.send('I am working hooman!');
});


module.exports = app => app.use('', router);