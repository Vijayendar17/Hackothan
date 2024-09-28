import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import UserModel from '../models/UserModel.js'; 

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).send({ message: "Invalid email or password" });


    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: "Invalid email or password" });


    const token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });


    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600000, 
    });

    return res.status(200).send({ message: "Logged in successfully", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ message: "Server error" });
  }
};


