const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search_recipes', async (req, res) => {
  try {
    const response = await axios.get(`https://www.allrecipes.com/search?q=${req.query.q}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
