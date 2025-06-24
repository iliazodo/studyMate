import Question from "../models/question.model.js";

export const createQuestion = async (req, res) => {
  try {
    const { questionText, lecture, tags } = req.body;
    const userId = req.user._id;
    const newQuestion = new Question({
      askedBy: userId,
      questionText,
      lecture: lecture || null,
      tags,
    });
    const saved = await newQuestion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("askedBy", "username")
      .populate("lecture", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("askedBy", "username")
      .populate("lecture", "name")
      .populate("answers.answerText", "username")
      .populate("answers.Comments.commentedBy", "username");

    if (!question) return res.status(404).json({ message: "Not Found" });

    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    const newAnswer = {
      answerText: req.body.answerText,
      createdAt: new Date(),
      Comments: [],
    };

    question.answers.push(newAnswer);
    await question.save();
    res.status(201).json({ message: "Answer added", question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCommentToAnswer = async (req, res) => {
  try {
    const { questionId, answerIndex } = req.params;
    const { text, commentedBy } = req.body;

    const question = await Question.findById(questionId);
    if (!question || !question.answers[answerIndex]) {
      return res.status(404).json({ message: "Answer not found" });
    }

    question.answers[answerIndex].Comments.push({
      text,
      commentedBy,
      createdAt: new Date(),
    });

    await question.save();
    res.status(201).json({ message: "Comment added", question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
