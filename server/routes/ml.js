
const cv = require('@techstark/opencv-js')
const { createCanvas, loadImage } = require('canvas');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient(visionConfig);
async function send2google(req)
{
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
    return canvas
    }
    catch(error){
    return(error)
    }
}
