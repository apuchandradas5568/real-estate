import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create a new user and save to do

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User Created Successcully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Create User" });
  }
};
export const login = async (req, res) => {

  const { email, password } = req.body;
  const age = 1000 * 24 * 60 * 60 * 30 ; // 30 days in seconds
  try {
    // checking the user is exist or not
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    //    checking the passwor is correct or not
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    // generating token
    const token = jwt.sign(
      { userId: user.id, isAdmin: false },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // seperating password
    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("user", token, {
        httpOnly: true,
          maxAge: age,
        // secure: true
      })
      .status(200)
      .json({
        userInfo,
      });
  } catch (error) {
    res.status(500).json({ message: "Failed to Login" });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("user").status(200).json({ message: "Logout Successfull" });
};
