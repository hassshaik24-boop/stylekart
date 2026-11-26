const { registerUser } = require("../services/authService");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Missing field check (har field ke aage !)
    if (!name || !email || !password) {
      const err = new Error("Name, email and password are required");
      err.statusCode = 400;
      throw err;
    }

    const user = await registerUser({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register };