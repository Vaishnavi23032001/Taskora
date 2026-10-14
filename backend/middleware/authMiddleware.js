import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please log in.",
    });
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "string"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    req.user = {
      userId: decoded.userId,
      _id: decoded.userId,
      id: decoded.userId,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Token is invalid or has expired. Please log in again.",
    });
  }
};
