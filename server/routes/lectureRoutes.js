import express from 'express'

import {
    createLecture,
    getAllLectures,
    getLectureById,
    updateLecture,
    deleteLecture
} from '../controllers/lectureController.js';

import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/addLecture', createLecture);         
router.get('/getAllLectures', getAllLectures);     
router.get('/getLectureById/:id', getLectureById); 
router.put('/updateLecture/:id', protectRoute, updateLecture); 
router.delete('/deleteLecture/:id', protectRoute, deleteLecture);


export default router;