import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { name, userName, email, password } = req.body;
  console.log(req.body);
  try {
    // Validate User Data
    if (!name || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Validate Email

    const existingUserEmail = await User.findOne({email});

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

    // Hash Password
    const salt = await bcrypt.genSalt(10);
   const hasedPassword=  await bcrypt.hash(password, salt);

    // Create User

     User.create({ name, userName, email, password: hasedPassword });
    res.status(201).json({ message: "User created successfully"});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
