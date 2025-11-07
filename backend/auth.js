import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const JWT_SECRET = process.env.JWT_SECRET;

// --- LOGIN HANDLER ---
export const login = (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USER)
    return res.status(401).json({ error: "Unauthorized" });

  const isValid = bcrypt.compareSync(password, ADMIN_PASS);
  if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};

// --- TOKEN VERIFIER ---
export const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(403).json({ error: "No token" });

  const token = header.split(" ")[1];
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
