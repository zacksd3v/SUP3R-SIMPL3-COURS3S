const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "This Email is already Exist! Try another one." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "New User is Create Successfully!" });

  } catch (error) {
    res.status(500).json({ message: "An Error Occur on Your Server", error: error.message });
  }
});

// LOGIC DA ZACKS ZAI SAMU JWT TOKEN :(
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email OR Password Is InCorrect!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email OR Password Is InCorrect!" });
    }

    // 3. Samar da JWT Token idan komai ya yi daidai
    // Muna sanya 'id' na user a cikin token din domin mu rinka gane ko wanene
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // 4. Mayar da token din da bayanan user zuwa Frontend
    res.json({
      message: "Login Successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
});

module.exports = router;