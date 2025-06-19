import express from 'express';

import{
    createQuestion,
    getAllQuestions,
    getQuestionById,
    addAnswer,
    addCommentToAnswer
}from '../controllers/questionController.js';

const router = express.Router();

router.post('/',createQuestion);
router.get('/',getAllQuestions);
router.get('/:id',getQuestionById);
router.post('/:id/answers',addAnswer);
router.post('/:questionId/answers/:answerIndex/comments',addCommentToAnswer);

export default router;