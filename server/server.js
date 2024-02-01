require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { client, connectToMongoDB } = require('./mongodb.js');


const { MongoClient ,ServerApiVersion } = require('mongodb');

const app = express();

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

// Use your existing MongoDB Atlas URI in the MongoClient constructor

// Define routes for login and sign-up
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Replace 'your_database_name' and 'your_collection_name' with your actual database and collection names
    const database = client.db('user_auth');
    const collection = database.collection('users');

    const user = await collection.findOne({ email, password });
    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/signup', async (req, res) => {
  
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

    await connectToMongoDB(); 
    const database = client.db('user_auth');
    const collection = database.collection('users');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    await collection.insertOne({ email, password });
    res.json({ success: true, message: 'Sign-up successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Server start error:', err);
});
