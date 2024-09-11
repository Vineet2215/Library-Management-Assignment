const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "adhafhfahfahfhffhfhfhffafafahb";

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render("signup", {
        user: null,
        error: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/books"); 
  } catch (error) {
    console.log(error);
    res.render("signup", { user: null, error: "Error signing up" });
  }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
    //   console.log('User found:', user);
  
      if (!user) {
        // console.log('User not found');
        return res.status(401).render('login', { user: null, error: 'Invalid credentials' });
      }
  
    //   console.log('Stored hashed password:', user.password);
    //   console.log('Password being compared:', password);
      const isMatch = await bcrypt.compare(password, user.password);
    //   console.log('Password match:', isMatch);
  
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        // console.log('JWT Token:', token);
        res.redirect('/books');
      } else {
        // console.log('Password does not match');
        return res.status(401).render('login', { user: null, error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
};
