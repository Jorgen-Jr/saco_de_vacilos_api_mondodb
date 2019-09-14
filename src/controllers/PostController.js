const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

const Post = require('../models/Post');

  //CRUD
  //Criar novo Post
  router.post('/', async (req, res) => {
    try{

      req.body.id_author = req.userId;

      const post = await Post.create( req.body );

      return res.send({ post });
    }catch( err ){
      return res.status(400).send({ error: 'Error creating a new post.' });
    }
  });

  //Selecionar todos os posts do usuário vacilão
  router.get('/Guilty/:id_guilty', async (req, res) => {
    try{

      req.body.id_author = req.userId;

      const post = await Post.find({ 'id_guilty': req.params.id_guilty }).populate('id_author', 'id_guilty');

      return res.send({ post });
    }catch( err ){
      return res.status(400).send({ error: 'Error querying post.' });
    }
  });

  //Selecionar todos os posts do usuário atual
  router.get('/Mine', async (req, res) => {
    try{

      const post = await Post.find({ 'id_author': req.userId }).populate('id_author').populate('id_guilty');

      return res.send({ post });
    }catch( err ){
      return res.status(400).send({ error: 'Error querying post.' });
    }
  });

module.exports = app => app.use('/Post', router);
