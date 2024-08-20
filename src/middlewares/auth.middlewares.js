import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  } else if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "");
  } else if (req.headers && req.headers.Authorization) {
    token = req.headers.Authorization.replace("Bearer ", "");
  }

  if (!token) {
    return res.status(401).json({ status: "error", message: "unauthorized" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ status: "error", message: "forbidden" });
    }

    console.log(decoded);
    req.user = decoded.userId;
    next();
  });
};
