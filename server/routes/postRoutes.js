import express from 'express'

import{
    createPost,
    getAllPosts,
    getPostById,
    toggleLikePost,
    deletePost
} from '../controllers/postController.js'

import {protect} from '../middlewares/protectRoute.js'

const Router = express.router ();

router.post('/addPost', protect, createPost);            
router.get('/getAllPosts', getAllPosts);                  
router.get('/getPostById/:id', getPostById);             
router.post('/toggleLikePost/:id', protect, toggleLikePost);
router.delete('/deletePost/:id', protect, deletePost);

export default router;