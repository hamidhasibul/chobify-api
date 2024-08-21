import { db } from "../../db/index.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const image = req.file;

    if (!(name || description || categoryId)) {
      return res.status(400).json({
        success: false,
        message: "name, description and category required",
      });
    }

    let imageLocalPath = image.path;

    if (!imageLocalPath) {
      return res
        .status(400)
        .json({ success: false, message: "image is required" });
    }

    const imageRes = await uploadOnCloudinary(imageLocalPath);

    const product = await db.product.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        image: imageRes?.url,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: `product ${product.name} has been added`,
    });
  } catch (error) {
    console.error("product controller error: ", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

export const getProducts = async (_, res) => {
  try {
    const products = await db.product.findMany();

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("product controller error: ", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

export const getProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("product controller error: ", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

export const updateProduct = async (req, res) => {
  const { name, description } = req.body;
  const { productId } = req.params;

  try {
    if (!(name || description)) {
      return res
        .status(400)
        .json({ success: false, message: "name & description required" });
    }

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        name: name.trim(),
        description: description.trim(),
      },
    });

    res.status(200).json({ success: true, message: "product updated" });
  } catch (error) {
    console.error("product controller error: ", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    await db.product.delete({
      where: { id: productId },
    });

    res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    console.error("product controller error: ", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};
