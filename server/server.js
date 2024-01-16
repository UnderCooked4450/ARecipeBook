
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT;
//const mdbURL = process.env.MONGODB_URL;

app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/user_auth');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Define a user schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
  })

  //  adding paramter to user schema, 
  userSchema.pre("save", async function(next) {
    const user = this; 
    if (user.isModified("password")) {
      // hashing password with a factor of 8 (8 rounds)
      //bcrypt automatically generates a unique salt for each pswd
      user.password = await bcrypt.hash(user.password, 8); 
    }
    next(); 
  })

const User = mongoose.model('User', userSchema);

// Define routes for login and sign-up
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user && (await bcrypt.compare(password, user.password))) {
          res.json({ success: true, message: 'Login successful' });
        } else {
          res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
});

app.post('/signup',async  (req, res) => {
  const { email, password, confirmPassword } = req.body;
 
  try {
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }
    // Check password complexity (at least one letter, one number, and one symbol)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }
 
  const newUser = new User({ email, password });
  await newUser.save();
    res.json({ success: true, message: 'Sign-up successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  }).on('error', (err) => {
    console.error('Server start error:', err);
  });
  

