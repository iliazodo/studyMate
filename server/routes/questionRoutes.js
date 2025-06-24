import express from 'express';

import{
    createQuestion,
    getAllQuestions,
    getQuestionById,
    addAnswer,
    addCommentToAnswer
}from '../controllers/questionController.js';

const router = express.Router();
router.post('/addQuestion', createQuestion);                 
router.get('/getAllQuestions', getAllQuestions);             
router.get('/getQuestionById/:id', getQuestionById);         
router.post('/addAnswerToQuestion/:id', addAnswer);        
router.post('/addCommentToAnswer/:questionId/:answerIndex', addCommentToAnswer);

export default router;