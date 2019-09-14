const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const User = require('../models/User');

const router = express.Router();

function generateToken( params = {}){
  return jwt.sign({ params }, authConfig.secret, {
    expiresIn: 86400,
  });
}

//Criar novo Usuario
router.post('/register', async (req, res) => {

  const { tx_email } = req.body;
  const { tx_username } = req.body;

  try{
    if(await User.findOne({ tx_email }) || await User.findOne({ tx_username })){
      res.status(400).send({ error : 'This user already exists.'});
    }

    const user = await User.create( req.body );

    user.tx_pass = undefined;

    return res.send({ user,
      token : generateToken({ id: user.id}),
    });

  }catch( err ){
    return res.status(400).send({ error: 'Error creating a new user.' });
  }
});

//Autentica o Usuário
router.post('/authenticate', async (req, res) => {
  const { tx_username, tx_pass } = req.body;

  try{

    const user = await User.findOne({ tx_username }).select('+tx_pass');

    if(!user){
      return res.status(400).send({ error: 'User not found.'});
    }

    if(!await bcrypt.compare(tx_pass, user.tx_pass)){
      return res.status(400).send({ error: 'Invalid password' });
    }

    user.tx_pass = undefined;
    
    res.send({ 
      user, 
      token : generateToken({ id: user.id}),
     });

  }catch(err){
    return res.status(400).send({ error: 'Error authenticating to api'});
  }
});

//Seleciona o usuário que tiver o username ou nome...
router.get('/:tx_query', async (req , res) => {
  try{
    const users = await User.find( { $or: [{'tx_username': req.params.tx_query}, { 'tx_name':{ $regex: '.*' + req.params.tx_query + '.*' }}] });
    res.send({ users });
  }catch( err ){
    return res.status(400).send({ error: 'Error querying for users.' });
  }
});

//Rota de teste de users
router.get('/', async (req , res) => {
  try{
    res.send("I'm working Users!");
  }catch( err ){
    return res.status(400).send({ error: 'Error querying for users.' });
  }
});

module.exports = app => app.use('/User', router);
