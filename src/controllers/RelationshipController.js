const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

const Relationship = require('../models/Relationship');

//Captar os usuários que contem relacionamento com o usuário logado.
router.get('/', async (req, res) => {
    try{
        
        const user_relationships = await Relationship.find({ $or:[{ 'User_1': req.userId }, { 'User_2': req.userId } ] }).populate('User_1').populate('User_2');
  
        return res.send({ user_relationships });
    }catch( err ){
        res.status(400).send({ error: 'Error querying relationships' + err });
    }
});

//Captar relationamentos de um certo usuário
router.get('/:user_id', async (req, res) =>{
    try{

        const user_relationships = await Relationship.find({ $or:[{ 'User_1': req.userId }, { 'User_2': req.userId } ] }).populate('User_1').populate('User_2');

        return res.send({ user_relationships });
    }catch( err ){
        res.status(400).send({ error: 'Error querying relationships' });
    }
});

//Criar novos relationamentos
router.post('/', async (req, res) => {
    try{
        req.body.User_1 = req.userId;

        //Se já existir relationamento
        if(await Relationship.findOne({ $or:[{ 'User_1': req.userId }, { 'User_2': req.userId }] })){
            return res.status(400).send({ error: 'This relationship already exists.' });
        }

        const relationship = await Relationship.create( req.body );

        return res.send({ relationship });
    }catch( err ){
        res.status(400).send({ error: 'Erro creating relationship.' });
    }
});

//Remover relacionamentos
//TODO Refazer a query
router.delete('/:user_id', async (req, res) =>{
    try{

        //Relationship.findByIdAndUpdate({ $or:[{ 'User_1': req.userId }, { 'User_2': req.userId }] });

        // res.send('Relationship deleted.');
        res.send('Code not implemented');
    }catch( err ){
        res.status(400).send({ error: 'Erro deleting the relationship.' });
    }
});

module.exports = app => app.use('/Relationship', router);