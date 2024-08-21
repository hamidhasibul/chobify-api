import { db } from "../../db/index.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const addCategory = async (req, res) => {
  const { name } = req.body;
  const image = req.file;

  try {
    if (!name) {
      return res.status(400).json({ success: false, message: "name required" });
    }

    // TODO: Duplicate name check && add category slug maybe?

    let imageLocalPath;
    if (image) {
      imageLocalPath = image.path;
    }
    const imageRes = await uploadOnCloudinary(imageLocalPath);

    // TODO: name trimming ?

    const category = await db.category.create({
      data: {
        name,
        image: imageRes?.url,
      },
    });

    res.status(201).json({
      success: true,
      message: `category ${category.name} has been created`,
    });
  } catch (error) {
    console.error("category controller error: ", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await db.category.findMany();

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("category controller error: ", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error("category controller error: ", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

export const updateCategory = async (req, res) => {
  const { name } = req.body;
  const { categoryId } = req.params;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "category updated successfully" });
  } catch (error) {
    console.error("category controller error: ", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};
