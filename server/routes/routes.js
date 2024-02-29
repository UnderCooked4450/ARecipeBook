require('dotenv').config();
const express = require('express');
const Model = require('../model/model');
const vision = require('@google-cloud/vision');
const router = express.Router()
const visionCreds= JSON.parse(process.env.VISION_CREDENTIALS)
const visionConfig={
    credentials:{
        private_key: visionCreds.private_key,
        client_email: visionCreds.client_email
    }
};
const client = new vision.ImageAnnotatorClient(visionConfig);

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

router.get('/lensapi',async (req,res)=>{   
    // Performs label detection on the image file
    try{
        const [result]= await client.objectLocalization(req);
        const objects = result.localizedObjectAnnotations;
        objects.forEach(object => {
            console.log(`Name: ${object.name}`);
            console.log(`Confidence: ${object.score}`);
            const vertices = object.boundingPoly.normalizedVertices;
            vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
          });

        let foods={}
        const key="Food"
        foods[key]=[]
        objects.forEach(object => {
            if(object.name!="Food")
            {
                let data={
                    name:object.name,
                    score:object.score
                }
                foods[key].push(data)
            }
        });
    
        console.log(foods);
    }
    catch(error){
        console.log(error)
    }
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