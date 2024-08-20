export const logoutUser = async (req, res) => {
  const cookies = req.cookies;

  try {
    if (!cookies?.accessToken) {
      return res.status(204).end(); // No content
    }

    res
      .status(204)
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .end();
  } catch (error) {
    console.error("logout controller error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
