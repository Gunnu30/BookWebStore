const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// 1. Unified Token Generator Helper
// Using a helper ensures your token structure is IDENTICAL across the whole app
const generateToken = (res, user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

exports.getMe = async (req, res) => {
  // Now req.user.id will be available here thanks to verifyToken middleware
  const { username, role, id } = req.user;
  return res.status(200).json({
    authenticated: true,
    username,
    role,
    id
  });
};

exports.registerUser = async (req, res) => {
  console.log(req.body)
  try {
    const { username, email, password } = req.body;
    const existingUser = await userModel.findByEmailOrUserName(username, email);
    
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("hased pass",hashedPassword);
    const newUser = await userModel.createUser(username, email, hashedPassword, "user");
    console.log("new User",newUser);
    // Use helper to set cookie with ID
    generateToken(res, newUser);

    return res.status(201).json({ 
      message: "User registered successfully", 
      username: newUser.username,
      role: newUser.role 
    });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ error: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    const user = await userModel.findUserByEmail(email);
    console.log(user);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Use helper to set cookie with ID
    generateToken(res, user);

    return res.status(200).json({ 
      message: "Login successful", 
      username: user.username,
      role: user.role
    });
  } catch (err) {
    return res.status(500).json({ error: "Login failed" });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await userModel.findByEmailOrUserName(username, email);
    if (existingUser) return res.status(400).json({ message: "Username or Email Already Exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await userModel.createUser(username, email, hashedPassword, 'admin');

    // Use helper to set cookie with ID
    generateToken(res, newAdmin);

    return res.status(200).json({
      message: "Admin Registered Successfully!",
      username: newAdmin.username,
      role: newAdmin.role
    });
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminExist = await userModel.findUserByEmail(email);
    
    if (!adminExist) return res.status(400).json({ message: "Invalid Credentials!" });

    const match = await bcrypt.compare(password, adminExist.password_hash);
    if (!match) return res.status(401).json({ message: "Incorrect Password!" });

    // FIX: Included ID in the helper call
    generateToken(res, adminExist);

    return res.status(200).json({
      message: "Login Successfull",
      username: adminExist.username,
      role: adminExist.role
    });
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.removeToken = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout Successfully." });
  } catch (e) {
    return res.status(500).json({ message: "Logout Failed" });
  }
};