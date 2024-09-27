import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password here

    const user = await UserModel.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    
    if (!isMatch) return res.status(401).send({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure:true,
      sameSite: 'strict', 
      maxAge: 3600000, 
    });

    return res.status(200).send({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ message: "Server error" });
  }
};
