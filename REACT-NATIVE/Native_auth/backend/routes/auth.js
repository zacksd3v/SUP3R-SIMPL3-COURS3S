const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,              
      pass: process.env.GMAIL_PASS,  
    }
  });
  
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "This email is already registered!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 1. Samar da lambobi 6 na OTP (Random 6-digit number)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 2. Saita lokacin dainawa aiki (Minti 1 daga yanzu)
    const expires = new Date(Date.now() + 1 * 60 * 1000);

    // 3. Ajiye user tare da OTP
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otpCode: otp,
      otpExpires: expires
    });
    await newUser.save();

    // 4. Tsara Wasika ta Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Account - OTP Code 🔑',
      text: `Hello ${name},\n\nYour OTP code for verification is: ${otp}.\nIt will expire in 1 minutes.\n\nBest regards!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Email failed: ", error);
      else console.log("Email sent: " + info.response);
    });

    res.status(201).json({ message: "Registration successful! Please check your email for the OTP code." });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Account is already verified. Please login." });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP code!" });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({ message: "OTP code has expired! Please request a new one." });
    }

    // 4. Idan komai ya yi daidai, mayar da shi Verified
    user.isVerified = true;
    user.otpCode = null; // Goge lambar tunda an riga an yi amfani da ita
    user.otpExpires = null;
    await user.save();

    res.json({ message: "Account verified successfully! You can now login." });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email before logging in!" });
    }

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

router.get('/me', async (req, res) => {
  try {
    // Karbo token daga Header na request din da React Native ya turo
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided, authorization denied!" });
    }

    // Tabbatar da ingancin Token (Verify JWT)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Nemo user a database amma ka cire masa password saboda tsaro (.select('-password'))
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(user);

  } catch (error) {
    res.status(401).json({ message: "Token is not valid!", error: error.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 1 * 60 * 1000);

    // Ajiye OTP ɗin a jikin user na ɗan lokaci
    user.otpCode = otp;
    user.otpExpires = expires;
    await user.save();

    // Tura OTP ta Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password - OTP Code 🔑',
      text: `Hello ${user.name},\n\nYou requested to reset your password. Your OTP code is: ${otp}.\nIt will expire in 15 minutes.\n\nIf you didn't request this, please ignore this email.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Email failed: ", error);
      else console.log("Reset Email sent: " + info.response);
    });

    res.json({ message: "OTP code sent to your email! 🎉" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP code!" });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({ message: "OTP code has expired!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.otpCode = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "Password reset successful! You can now login with your new password." });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;