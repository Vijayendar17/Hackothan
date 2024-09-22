import UserModel from "../models/index.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!email) return res.status(400).send({ message: "Please enter your email" });
    if (!password) return res.status(400).send({ message: "Please enter your password" });

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(401).send({ message: "Invalid email or password" });

    const isMatch =  bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: "Invalid email or password" });

    const ipmemail = user.email;
    const name = user.name;
    const token = jwt.sign({ name,ipmemail }, process.env.JWT_SECRET);

    return res.status(200).send({ message: "Logged in successfully", token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};
