import express from 'express'

import{
    createPost,
    getAllPosts,
    getPostById,
    toggleLikePost,
    deletePost
} from '../controllers/postController.js'

import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router ();

router.post('/addPost', protectRoute, createPost);            
router.get('/getAllPosts', getAllPosts);                  
router.get('/getPostById/:id', getPostById);             
router.post('/toggleLikePost/:id', protectRoute, toggleLikePost);
router.delete('/deletePost/:id', protectRoute, deletePost);

export default router;