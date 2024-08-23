import { db } from "../../db/index.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import AppError from "../../utils/app-error.js";

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, categoryId } = req.body;
    const image = req.file;

    if (!name || !description || !categoryId) {
      return next(new AppError("name, description and category required", 400));
    }

    let imageLocalPath = image?.path;

    if (!imageLocalPath) {
      return next(new AppError("Image is required", 400));
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
    next(error);
  }
};

export const getProducts = async (_, res, next) => {
  try {
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        category: {
          select: {
            name: true,
          },
        },
        image: true,
      },
    });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("product controller error: ", error);
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("product controller error: ", error);
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const { name, description } = req.body;
  const { productId } = req.params;

  try {
    if (!name || !description) {
      return next(new AppError("Name & Description required", 400));
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
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
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
    next(error);
  }
};
