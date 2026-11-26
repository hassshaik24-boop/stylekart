const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

function httpError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

async function registerUser({ name, email, password }) {
  // 1. Type check: {"$ne": null} jaise objects ko rokta hai (Mongo injection)
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw httpError("Invalid input", 400);
  }

  // 2. Password length HASH SE PEHLE (hash hamesha 60 chars ka hota hai)
  if (password.length < 8) {
    throw httpError("Password must be at least 8 characters", 400);
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw httpError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      // role kabhi body se nahi, default "user" schema se
    });

    const user = newUser.toObject();
    delete user.password;
    return user;
  } catch (err) {
    // Race condition: do requests ek saath, unique index duplicate pakadta hai
    if (err.code === 11000) {
      throw httpError("Email already exists", 409);
    }
    throw err;
  }
}

module.exports = { registerUser };