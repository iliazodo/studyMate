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

router.post('/',protect, createPost)
router.get('/',getAllPosts)
router.get('/:id/' , getPostById)
router.post('/:id/like',protect, toggleLikePost)
router.delete('/:id',protect, deletePost)

export default router;