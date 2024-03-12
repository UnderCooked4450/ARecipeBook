require('dotenv').config();
const cv = require('@techstark/opencv-js')
const { createCanvas, loadImage } = require('canvas');
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

router.post('/lensapi',async (req,res)=>{   
    // Performs label detection on the image file
    const key1="vert"
        const [result]= await client.objectLocalization(req);
        const objects = result.localizedObjectAnnotations;
        const image = await loadImage(req);
         // Create a canvas with the same dimensions as the image
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
    
        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0, image.width, image.height);
    
        // Set bounding box properties
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.font = '20px Arial';


        let boxes={}
        let boxkey="box"
        boxes[boxkey]=[]
    try{
        const [result]= await client.objectLocalization(req);
        const objects = result.localizedObjectAnnotations;
        objects.forEach(object => {
            let verts={}
            verts[key1]=[]
            console.log(`Name: ${object.name}`);
            console.log(`Confidence: ${object.score}`);
            const vertices = object.boundingPoly.normalizedVertices;

            let i=0;
            vertices.forEach(v=> {
                let pt= new cv.Point(v.x,v.y)
            
                switch(i)
                {
                    case 0:
                    verts[key1].push({TopLeft:pt})
                    break;
                    case 1:verts[key1].push({TopRight:pt})
                    break;
                    case 2:verts[key1].push({BottomLeft:pt})
                    break;
                    case 3:verts[key1].push({BottomRight:pt})
                    break; 
                }
                i++})
                const TopLeftpt=verts[key1].find(point=>'TopLeft' in point).TopLeft
                const TopRightpt=verts[key1].find(point=>'TopRight' in point).TopRight
                const BottomRightpt=verts[key1].find(point=>'BottomRight' in point).BottomRight
                const BottomLeftpt=verts[key1].find(point=>'BottomLeft' in point).BottomLeft

                ctx.beginPath();
                ctx.moveTo(TopLeftpt.x*image.width, TopLeftpt.y*image.height)
                ctx.lineTo(TopRightpt.x*image.width,TopRightpt.y*image.height)
                ctx.lineTo(BottomLeftpt.x*image.width,BottomLeftpt.y*image.height)
                ctx.lineTo(BottomRightpt.x*image.width,BottomRightpt.y*image.height)
                ctx.lineTo(TopLeftpt.x*image.width,TopLeftpt.y*image.height)
                ctx.closePath();
                ctx.stroke()
                const textWidth = ctx.measureText(object.name).width;
                const textHeight = parseInt(ctx.font, 10); // Font size

                ctx.fillStyle = 'red';
                ctx.fillRect(TopLeftpt.x*image.width, TopLeftpt.y*image.height - textHeight - 10, textWidth + 10, textHeight + 10);
                ctx.fillStyle = 'white'; 
                ctx.fillText(object.name, TopLeftpt.x*image.width, TopLeftpt.y*image.height - 5);
          });
        console.log(foods);
        const buffer = canvas.toBuffer('image/png');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': buffer.length
        });
        res.end(buffer, 'binary');
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