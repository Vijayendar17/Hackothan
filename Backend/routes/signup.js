import UserModel from "../models/index.js";
import bcryptjs from 'bcryptjs'
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email) res.send({status: 401, message:"Please enter your email address"})
    if (!password) res.send({status: 401, message:"Please enter your password"})
    if (!name) res.send({status: 401, message:"Please enter your name"})
      const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User is already registered" });
    }


    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();


    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}