import express from 'express'

import {
    createLecture,
    getAllLectures,
    getLectureById,
    updateLecture,
    deleteLecture
} from '../controllers/lectureController.js';

import { protect } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/', createLecture);
router.get('/', getAllLectures);
router.get('/:id', getLectureById);
router.put('/', protect , updateLecture);
router.delete('/', protect , deleteLecture);


export default router;