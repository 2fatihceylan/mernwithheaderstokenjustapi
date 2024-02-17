const express = require('express');
const {createPost, getPosts, getDetail, updatePost, deletePost, searchPost} = require('../controllers/post.js');
const auth = require('../middleware/auth.js');

const router = express.Router();


router.post('/createPost',auth, createPost);
router.get('/getPosts', getPosts);
router.get('/getDetail/:id', getDetail);
router.patch('/updatePost/:id',auth, updatePost);
router.delete('/deletePost/:id',auth, deletePost);
router.get('/searchPost', searchPost)



module.exports = router;