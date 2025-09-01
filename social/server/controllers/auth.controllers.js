import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  const { name, userName, email, password } = req.body;
  try {
    // Validate User Data
    if (!name || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Validate Email

    const existingUserEmail = await User.findOne(email);

    if (existingUserEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Validate for userName

    const existingUserName = await User.findOne({ userName });

    if (existingUserName) {
      return res.status(400).json({ message: "Username already in use" });
    }

    // password length
    if (password.length<=6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Create User

    const newUser = User.create({ name, userName, email, password });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
