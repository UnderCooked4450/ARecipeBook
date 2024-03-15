require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { client, connectToMongoDB } = require('./mongodb.js');
const bcrypt = require('bcryptjs'); // Require bcryptjs
const ML= require('./routes/ml');

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

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const database = client.db('user_auth');
    const collection = database.collection('users');

    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
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
        message: 'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.',
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds


    await connectToMongoDB(); 
    const database = client.db('user_auth');
    const collection = database.collection('users');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    await collection.insertOne({ email, password: hashedPassword });
    res.json({ success: true, message: 'Sign-up successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/lensapi', async(req,res)=>{
try{
  const buffer=await ML.send2google(req.body.image)
  //console.log(buffer[0])
  res.json({success:true, imageAsDataUrl:buffer[0], list:buffer[1]});
}
catch(error)
{
  console.log(error)
  res.status(400).json({success:false, message:'Add an image'});
}
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Server start error:', err);
});
