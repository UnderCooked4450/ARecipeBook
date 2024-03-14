require('dotenv').config();
const express = require('express');
const Model = require('../model/model');
const router = express.Router()
const ML= require('./ml');

//Post Method
router.post('/post', async (req, res) => {
    const data= new Model({
        name: req.query.name,
        ingredients: req.query.ingredients,
        vegetarian: req.query.vegetarian,
        filters: req.query.filters
    })

    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }catch(e)
    {
        res.status(400).json({message: error.message})
    }   
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:name', async (req, res) => {
    try{
        const data = await Model.findById(req.params.name);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/getOneId/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/searchForName/:name', async (req, res) => {
    var regexQuery = {
        name: new RegExp(req.params.name, 'i')
      }
   console.log(regexQuery)
    try{
        const data = await Model.find(regexQuery);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/searchForIngredients/:ingredients', async (req, res) => {
    var regexQuery = {
        ingredients: new RegExp(req.params.ingredients, 'i')
      }
   console.log(regexQuery)
    try{
        const data = await Model.find(regexQuery);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/lensapi',async (req,res)=>{   
    // Performs label detection on the image file
    const buffer=await ML.send2google(req)
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length
    });
    res.end(buffer, 'binary');
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;