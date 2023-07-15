import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const checkIfValidField = (field) => {
  // Check if Null or Undefined
  if (field === null || field === undefined) {
    return false;
  }
  return true;
};

// Generate our JWT Token for our session
export const generateJWT = async (userID) => {
  const maxAge = 7 * 24 * 60 * 60 * 1000;

  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    expires_in: maxAge,
    expires_on: Date.now() + maxAge,
  };
};

// Verify our JWT Token for our session
export const verifyJWT = async (token) => {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return error;
  }
};

// Hash password
export const hashPassword = async (password) => {
  return await bcryptjs.hash(password, process.env.BCRYPT_SALT);
};
