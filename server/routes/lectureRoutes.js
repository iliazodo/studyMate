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

router.post('/', createLecture);
router.get('/', getAllLectures);
router.get('/:id', getLectureById);
router.put('/', protectRoute , updateLecture);
router.delete('/', protectRoute , deleteLecture);


export default router;