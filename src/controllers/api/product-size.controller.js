import { db } from "../../db/index.js";

export const addProductSize = async (req, res) => {
  const { size } = req.body;
  try {
    if (!size) {
      return res
        .status(400)
        .json({ success: false, message: "size is required" });
    }

    await db.productSize.create({
      data: {
        size,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "product size has been added" });
  } catch (error) {
    console.error("product size controller error: ", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

export const getProductSizes = async (req, res) => {
  try {
    const productSizes = await db.productSize.findMany();

    res.status(200).json({ success: true, data: productSizes });
  } catch (error) {
    console.error("product size controller error: ", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

export const updateProductSize = async (req, res) => {
  const { size } = req.body;
  const { productSizeId } = req.params;

  try {
    if (!size) {
      return res
        .status(400)
        .json({ success: false, message: "size is required" });
    }

    await db.productSize.update({
      where: {
        id: productSizeId,
      },
      data: {
        size,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "product size has been updated" });
  } catch (error) {
    console.error("product size controller error: ", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};
