require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { spawn } = require('child_process'); 
const { client, connectToMongoDB } = require("./mongodb.js");
const bcrypt = require("bcryptjs"); // Require bcryptjs
const fs = require('fs');
const ML= require('./routes/ml.js')
const { MongoClient, ServerApiVersion } = require("mongodb");


const app = express();

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
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

//recipe search
const puppeteer = require("puppeteer");
const { hostname } = require("os");

app.post("/search", async (req, res) => {
  try {
    const ingredients = req.body.ingredients.join(" ");
    const query = encodeURIComponent(`${ingredients} recipe`);
    const url = `https://www.google.com/search?q=${query}`;
    console.log("url: " + url);

    const browser = await puppeteer.launch({ headless: true }); // headless mode prevents new browser from opening
    const page = await browser.newPage();
    //now the link is fixed
    await page.goto(url);
    // Scrape the first 5 search result links and titles
    const links = await page.evaluate(() => {
      const searchResults = [];
      const title = document.querySelectorAll("h3");

      title.forEach((h3, index) => {
        if (index < 5) {
          const title = h3.innerText;
          const url = h3.parentElement.href;
          searchResults.push({ title, url });
        }
      });
      return searchResults;
    });
    console.log("hi again here");
    res.json(links);
    await browser.close();
    console.log("hiiii here");
  } catch (error) {
    console.error("Error in /search route:", error);
    res.status(500).send("Internal server error");
  }
});
app.get("/search", (req, res) => {
  res.send("Search route is accessible");
});

// Load the JSON file containing website URLs
const data = './recipe_cites.json';
const websiteData = JSON.parse(fs.readFileSync(data, 'utf8'));

// Function to extract titles from the websites in json
const extractTitlesFromJson = () => {
  const titles = [];
  websiteData.websites.forEach(website => {
      const title = website.split('//')[1].split('/')[0];
      titles.push(title);
  });
  return titles;
  
};

//generate recipe links
app.post("/generateRecipe", async (req, res) => {
  try {
      const ingredients = req.body.ingredients.join(" ");
      const query = encodeURIComponent(`${ingredients} recipe`);
      const url = `https://www.google.com/search?q=${query}`;

      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url);

      // Scrape the search result host names and URLs
      const scrapedHosts = await page.evaluate(() => {
        const Hosts = [];
        const anchors = document.querySelectorAll('a');
        

        anchors.forEach(anchor => {
          const url = anchor.href;
          try {
              const title = anchor.innerText;
              const hostname = new URL(url).hostname;
              Hosts.push({ title, url, hostname });
          } catch (error) {
              console.error(`Invalid URL: ${url}`);
          }
      });
  
      return Hosts;
    },);
    
      console.log(scrapedHosts);
      await browser.close();

      // Extract titles from the JSON file
      const jsonTitles = extractTitlesFromJson();
    
      const matchedTitles = [];
      scrapedHosts.forEach(scrapedHost => {
      if (scrapedHost.title.trim() !== '' && //removing links with empty titles
          jsonTitles.some(jsonTitle => scrapedHost.hostname.includes(jsonTitle)) && //adding links that match domain of json file
          !scrapedHost.url.endsWith('.html')) //removing html links 
          { matchedTitles.push({ title: scrapedHost.title, url: scrapedHost.url });
      }
});

console.log(matchedTitles);
      res.json( matchedTitles );
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
  }
});


//post to web scraper to retrieve recipe info ex. ingredients, instructions etc. 
app.post('/scrape-recipe', (req, res) => {
  const { url } = req.body;

  const pythonProcess = spawn('python', ['./webscraper.py', url]);

  pythonProcess.stdout.on('data', (data) => {
    
      const scrapedData = JSON.parse(data.toString());
      
      // Send the scraped data as a JSON response
      res.json(scrapedData);
  });

  // Handle errors from the Python script
  pythonProcess.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
      res.status(500).send('Internal Server Error');
  });
});



app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const database = client.db("user_auth");
    const collection = database.collection("users");

    const user = await collection.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



app.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    // Check password complexity (at least one letter, one number, and one symbol)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and contain at least one letter, one number, and one special character.",
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    await connectToMongoDB();
    const database = client.db("user_auth");
    const collection = database.collection("users");

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    await collection.insertOne({ email, password: hashedPassword });
    res.json({ success: true, message: "Sign-up successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
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

