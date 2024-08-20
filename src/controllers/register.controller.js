import bcrypt from "bcrypt";
import { db } from "../db/index.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const { image } = req.files;

  try {
    // TODO: Validation

    const userExists = await db.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (userExists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    let imageLocalPath;
    if (req.files && Array.isArray(image) && image.length > 0) {
      imageLocalPath = image[0].path;
    }
    const imageRes = await uploadOnCloudinary(imageLocalPath);

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPwd,
        phone,
        image: imageRes?.url,
      },
    });

    res
      .status(201)
      .json({ success: true, message: `user ${user.name} has been added` });
  } catch (error) {
    console.error("register controller error: ", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
