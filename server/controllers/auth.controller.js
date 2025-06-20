import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const findedUser = await User.findOne({ email });

    if (findedUser) {
      res.status(400).json({ error: "Email already exist" });
    }

    if (findedUser.username === username) {
      res.status(400).json({ error: "User already exist" });
    }

    const newUser = await User.create({ username, email, password });

    if (newUser) {
      res.status(201).json({
        username: newUser.username,
        email: newUser.email,
      });
    }
  } catch (error) {
    console.log("Error in auth.controller: " , error.message);
    res.status(500).json({error: "Interval server error"});
  }
};

export const login = async (req, res) => {};

export const logout = async (req, res) => {};
