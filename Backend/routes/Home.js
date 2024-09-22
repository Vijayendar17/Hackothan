import jwt from 'jsonwebtoken';
import UserModel from '../models/index.js';

export const Home = async (req, res) => {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Denied: No Token Provided!");
  }

  try {
    
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded User:", decodedUser);

    
    const users = await UserModel.find({ email: decodedUser.ipmemail });
    
    res.send(users);
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(400).send("Invalid Token");
  }
};
