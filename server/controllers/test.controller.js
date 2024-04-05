import jwt from "jsonwebtoken";

export const users = async (req, res) => {
  console.log(req.userId);

  res.status(200).json({ message: "You are Authenticated" });
};

export const admin = async (req, res) => {
  const token = req.cookies.user;
  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valied" });
    if (!payload.isAdmin) {
      return res
        .status(403)
        .json({ message: "Only Admin can access this route" });
    }
  });
  res.status(200).json({ message: "You are Authenticated" });
};
