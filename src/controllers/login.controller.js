import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../db/index.js";
import { cookieOptions } from "../configs/cookie-options.js";

const generateAccessToken = async (userId) => {
  try {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
  } catch (error) {
    console.error("Access token generation error: ", error);
    throw new Error("Something went wrong");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "email is required" });
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const accessToken = await generateAccessToken(user.id);

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .json({ success: true, accessToken });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
