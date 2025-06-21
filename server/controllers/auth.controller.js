import User from "../models/user.model.js";
import generateToken from "../tokens/generateToken.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const findedUser = await User.findOne({ $or: [{ email }, { username }] });

    if (findedUser) {
      return res.status(400).json({ error: "Email or Username already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        message: "Siggned up successfully",
      });
    }
  } catch (error) {
    console.log("Error in auth.controller: ", error.message);
    res.status(500).json({ error: "Interval server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findedUser = await User.findOne({ email });

    const isPassCorrect = await bcrypt.compare(password, findedUser.password);

    if (!findedUser || !isPassCorrect) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    generateToken(findedUser._id, res);
    res.status(200).json({
      email: findedUser.email,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log("Error in auth.controller: ", error.message);
    res.status(500).json({ error: "Interval server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in auth.controller: ", error.message);
    res.status(500).json({ error: "Interval server error" });
  }
};
